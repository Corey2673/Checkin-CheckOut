import React from "react";
import { CSVLink } from "react-csv";

import CSVExportButton from "./ExportButton.js";
import CsvImporter from "./ImportButton.js";
import CAT2Report from "./CAT2Export.js";

const App = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-3">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4">Reports</h1>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Questions</h2>
            <CSVExportButton
              dataSet={"getquestions"}
              fileName={"safety_questions"}
            />
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Acknowledgments</h2>
            <CSVExportButton
              dataSet={"getacknowledgement"}
              fileName={"acknowledgments"}
            />
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <CSVExportButton dataSet={"getusers"} fileName={"users"} />
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">CAT2</h2>
            <CAT2Report />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
