import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const SafetyAckExport = () => {
  const [ackData, setAckData] = useState([]);
  const [selectedFields, setSelectedFields] = useState({
    processID: true,
    text: true,
    siteLocation: true,
    role: true,
    comments: true,
    createAT: true,
  });

  useEffect(() => {
    // Simulating data fetching and storing in localStorage
    const data = JSON.parse(localStorage.getItem("process_changes"));
    if (data) {
      setAckData(data);
    }
  }, []);

  const getFilteredData = () => {
    return ackData.map((user) => {
      const filteredUser = {};
      Object.keys(selectedFields).forEach((field) => {
        if (selectedFields[field]) {
          filteredUser[field] = user[field];
        }
      });
      return filteredUser;
    });
  };

  return (
    <div className="p-">
      <CSVLink
        data={getFilteredData()}
        filename={"process_changes.csv"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default SafetyAckExport;
