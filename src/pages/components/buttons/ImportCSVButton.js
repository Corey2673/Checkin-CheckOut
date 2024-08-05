// ImportCSVButton.js
import React from "react";
import Papa from "papaparse";

const ImportCSVButton = ({ dataSet }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const existingData = JSON.parse(localStorage.getItem(dataSet)) || [];
        const newData = [...existingData, ...results.data];
        localStorage.setItem(dataSet, JSON.stringify(newData));
        alert("CSV imported successfully!");
      },
    });
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        id="csvInput"
      />
      <label htmlFor="csvInput" className="cursor-pointer text-blue-500">
        Import CSV
      </label>
    </div>
  );
};

export default ImportCSVButton;
