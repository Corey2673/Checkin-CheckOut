import React, { useState } from "react";
import CSVExportButton from "../buttons/ExportButton.js";
import CAT2Report from "../buttons/CAT2ExportButton.js";
import OnsiteExport from "../buttons/OnsiteExport.js";
import SafetyAckExport from "../buttons/SafetyAckExport.js";

const App = () => {
  const removeCollection = (data) => {
    localStorage.removeItem(data);
    console.log("Collection removed from localStorage");
  };

  return (
    <div>
      <div class="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
        <div>
          <div class="relative flex items-center justify-center mx-auto"></div>
          <h3 class="mt-8 text-lg font-semibold text-black">Process Change</h3>

          <p class="mt-4 text-base text-gray-600">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2
            px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => removeCollection("process_changes")}
            >
              DELETE
            </button>
          </p>
        </div>

        <div>
          <div class="relative flex items-center justify-center mx-auto"></div>
          <h3 class="mt-8 text-lg font-semibold text-black">
            Safety Acknowledgment
          </h3>

          <p class="mt-4 text-base text-gray-600">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2
            px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => removeCollection("safety_questions")}
            >
              DELETE
            </button>
          </p>
        </div>

        <div>
          <div class="relative flex items-center justify-center mx-auto"></div>

          <h3 class="mt-8 text-lg font-semibold text-black">Employee</h3>

          <p class="mt-4 text-base text-gray-600">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2
            px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => removeCollection("users")}
            >
              DELETE
            </button>
          </p>
        </div>

        <div>
          <div class="relative flex items-center justify-center mx-auto"></div>

          <h3 class="mt-8 text-lg font-semibold text-black">
            Employee Process Acknowledgment
          </h3>

          <p class="mt-4 text-base text-gray-600">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2
            px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => removeCollection("change_acknowledgements")}
            >
              DELETE
            </button>
          </p>
        </div>

        <div>
          <div class="relative flex items-center justify-center mx-auto"></div>
          <h3 class="mt-8 text-lg font-semibold text-black">
            {" "}
            Employee Safety Acknowledgment
          </h3>

          <p class="mt-4 text-base text-gray-600">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2
            px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => removeCollection("acknowledgements")}
            >
              DELETE
            </button>
          </p>
        </div>
        <div>
          <div class="relative flex items-center justify-center mx-auto"></div>
          <h3 class="mt-8 text-lg font-semibold text-black">
            {" "}
            CheckIn/CheckOut
          </h3>

          <p class="mt-4 text-base text-gray-600">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2
            px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => removeCollection("clock_data")}
            >
              DELETE
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
