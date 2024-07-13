import React from "react";
import CSVExportButton from "../buttons/ExportButton.js";
import CAT2Report from "../buttons/CAT2ExportButton.js";

const App = () => {
  return (
    <section class="py-10 bg-white sm:py-16 lg:py-24">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
          <div>
            <div class="relative flex items-center justify-center mx-auto"></div>
            <h3 class="mt-8 text-lg font-semibold text-black">
              Safety Questions
            </h3>

            <p class="mt-4 text-base text-gray-600">
              <CSVExportButton
                dataSet={"safety_questions"}
                fileName={"safety_questions"}
              />
            </p>
          </div>

          <div>
            <div class="relative flex items-center justify-center mx-auto"></div>
            <h3 class="mt-8 text-lg font-semibold text-black">
              Safety Acknowledgment
            </h3>

            <p class="mt-4 text-base text-gray-600">
              <CSVExportButton
                dataSet={"acknowledgements"}
                fileName={"acknowledgements"}
              />
            </p>
          </div>

          <div>
            <div class="relative flex items-center justify-center mx-auto"></div>

            <h3 class="mt-8 text-lg font-semibold text-black">
              Resorces Onsite
            </h3>

            <p class="mt-4 text-base text-gray-600">
              <CSVExportButton
                dataSet={"clock_data"}
                fileName={"currently_onsite"}
              />
            </p>
          </div>

          <div>
            <div class="relative flex items-center justify-center mx-auto"></div>

            <h3 class="mt-8 text-lg font-semibold text-black">RU11</h3>

            <p class="mt-4 text-base text-gray-600">
              <CSVExportButton
                dataSet={"clock_data"}
                fileName={"currently_onsite"}
              />
            </p>
          </div>

          <div>
            <div class="relative flex items-center justify-center mx-auto"></div>
            <h3 class="mt-8 text-lg font-semibold text-black">CAT2</h3>

            <p class="mt-4 text-base text-gray-600">
              <CAT2Report />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
