import React, { useState } from "react";
import Papa from "papaparse";

const CsvImportButton = () => {
  const [csvData, setCsvData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log(results.data);
          setCsvData(results.data);
          localStorage.setItem("onsite_clock", JSON.stringify(results.data));
          alert("Local storage updated!");
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
          alert(
            "Error parsing CSV file. Please check the console for more details."
          );
        },
      });
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default CsvImportButton;
