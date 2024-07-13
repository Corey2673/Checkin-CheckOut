import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const CsvExample = ({ dataSet, fileName }) => {
  const [csvData, setCSVData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from localStorage if available
        const storedData = localStorage.getItem(dataSet);
        if (storedData) {
          setCSVData(JSON.parse(storedData));
        } else {
          // Fetch data from your API endpoint if not in localStorage
          const response = await fetch("/api/auth/" + dataSet);
          if (response.ok) {
            const data = await response.json();
            setCSVData(data);
            // Store fetched data in localStorage
            localStorage.setItem(dataSet, JSON.stringify(data));
          } else {
            throw new Error("Failed to fetch data");
          }
        }
      } catch (error) {
        console.error("Error fetching or storing data:", error);
      }
    };

    fetchData();
  }, [dataSet]);

  return (
    <div>
      <CSVLink
        data={csvData}
        filename={fileName + ".csv"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default CsvExample;
