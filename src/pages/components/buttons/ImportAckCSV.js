// ImportCSVButton.js
import React from "react";
import Papa from "papaparse";

const ImportUserCSV = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const existingData =
          JSON.parse(localStorage.getItem("safety_questions")) || [];
        const newData = [...existingData, ...results.data];

        console.log(results.data);
        localStorage.setItem("safety_questions", JSON.stringify(newData));
        alert("CSV imported successfully!");
      },
    });
  };

  return (
    <div>
      <button
        onClick={() => document.getElementById("csvInputSafety").click()}
        className="cursor-pointer text-blue-500"
      >
        Import CSV
      </button>
      <input
        id="csvInputUser"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImportUserCSV;
