import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const CSVExport = ({ dataSet, fileName }) => {
  const [csvData, setCSVData] = useState([]);

  useEffect(() => {
    try {
      // Fetch data from localStorage if available
      const storedData = localStorage.getItem(dataSet) || [];
      if (storedData) {
        setCSVData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error fetching or storing data:", error);
    }
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

export default CSVExport;
