import React, { useState } from "react";
import CSVExportButton from "../buttons/ExportButton.js";
import CAT2Report from "../buttons/CAT2ExportButton.js";
import OnsiteExport from "../buttons/OnsiteExport.js";
import SafetyAckExport from "../buttons/SafetyAckExport.js";
import ShowDeletes from "../Tables/ShowDeletes.js";
import RU11ExportButton from "../buttons/RU11ExportButton.js";
import ProcessChangeExport from "../buttons/ProcessChangeExport.js";
import RU11Component from "../";

import ShowImports from "../Tables/ShowImports.js";

const App = () => {
  const [activeTab, setActiveTab] = useState("export");
  const renderContent = () => {
    switch (activeTab) {
      case "export":
        return (
          <div>
            <div class="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
              <div>
                <div class="relative flex items-center justify-center mx-auto"></div>
                <h3 class="mt-8 text-lg font-semibold text-black">
                  Process Change
                </h3>

                <p class="mt-4 text-base text-gray-600">
                  <ProcessChangeExport />
                </p>
              </div>

              <div>
                <div class="relative flex items-center justify-center mx-auto"></div>
                <h3 class="mt-8 text-lg font-semibold text-black">
                  Safety Acknowledgment
                </h3>

                <p class="mt-4 text-base text-gray-600">
                  <SafetyAckExport />
                </p>
              </div>

              {/* <div>
                <div class="relative flex items-center justify-center mx-auto"></div>

                <h3 class="mt-8 text-lg font-semibold text-black">Employee</h3>

                <p class="mt-4 text-base text-gray-600">
                  <OnsiteExport />
                </p>
              </div> */}

              <div>
                <div class="relative flex items-center justify-center mx-auto"></div>

                <h3 class="mt-8 text-lg font-semibold text-black">RU11</h3>

                <p class="mt-4 text-base text-gray-600">
                  <RU11ExportButton />
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
        );
      case "import":
        return <ShowImports />;
      case "delete":
        return <RU11Component />;
      //<ShowDeletes />;
      default:
        return null;
    }
  };

  return (
    <section class="py-10 bg-white sm:py-16 lg:py-24">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex justify-center mb-8">
          <button
            className={`px-4 py-2 mx-2 ${
              activeTab === "export" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("export")}
          >
            Export Report
          </button>
          <button
            className={`px-4 py-2 mx-2 ${
              activeTab === "import" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("import")}
          >
            Import Report
          </button>
          <button
            className={`px-4 py-2 mx-2 ${
              activeTab === "delete" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("delete")}
          >
            Delete Report
          </button>
        </div>
        {renderContent()}
      </div>
    </section>
  );
};

export default App;
