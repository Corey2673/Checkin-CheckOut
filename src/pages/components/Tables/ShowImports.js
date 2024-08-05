import React from "react";
import CSVExportButton from "../buttons/ExportButton.js";
import CAT2Report from "../buttons/CAT2ExportButton.js";
import OnsiteExport from "../buttons/OnsiteExport.js";
import SafetyAckExport from "../buttons/SafetyAckExport.js";
import ImportCSVButton from "../buttons/ImportCSVButton.js"; // Import the new component

const App = () => {
  return (
    <section class="py-10 bg-white sm:py-16 lg:py-2">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
          <div>
            <div class="relative flex items-center justify-center mx-auto"></div>
            <h3 class="mt-8 text-lg font-semibold text-black">
              Process Changes
            </h3>

            <p class="mt-4 text-base text-gray-600">
              <ImportCSVButton dataSet={"process_changes"} />{" "}
            </p>
          </div>
          <div>
            <div class="relative flex items-center justify-center mx-auto"></div>
            <h3 class="mt-8 text-lg font-semibold text-black">
              Safety Acknowledgments
            </h3>

            <p class="mt-4 text-base text-gray-600">
              <ImportCSVButton dataSet={"safety_questions"} />{" "}
            </p>
          </div>
          <div>
            <div class="relative flex items-center justify-center mx-auto"></div>
            <h3 class="mt-8 text-lg font-semibold text-black">Employee List</h3>

            <p class="mt-4 text-base text-gray-600">
              <ImportCSVButton dataSet={"users"} />{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
