import React, { useState } from "react";
import DurationClock from "./DurationClock";
import AskQSafety from "../forms/AskQSafety";

import Badge_Scan from "../inputs/badge_scan";

const RegisterForm = (props) => {
  const { data } = props;
  const [selectedSiteLocation, setSelectedSiteLocation] = useState("");
  const [profileExit, setProfileExit] = useState(false);

  const handleSiteLocationChange = (location) => {
    setSelectedSiteLocation(location);
  };

  if (selectedSiteLocation) {
    return <AskQSafety data={data} siteLocation={selectedSiteLocation} />;
  }

  if (profileExit) {
    return <Badge_Scan />;
  }

  return (
    <section class="py-12 bg-white sm:py-16 lg:py-20 xl:py-24">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-7 gap-x-20 gap-y-12">
          <div class="lg:order-2 lg:col-span-4">
            <div class="max-w-lg lg:max-w-none">
              <h2 class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:pr-8">
                {data.firstname} {data.lastname}
              </h2>
              <p class="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:pr-24 lg:leading-8">
                <h4 class="text-3xl font-semibold tracking-tight text-gray-550 sm:text-4xl lg:text-3xl lg:pr-8">
                  {data.role}
                </h4>
                <hr class="mt-5 mb-10 border-gray-200" />

                <div class="flex justify-center">
                  <h3 class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-4xl lg:pr-8">
                    Choose Site Location
                  </h3>
                </div>

                <div class="flex justify-center space-x-8 bg-white rounded-lg px-8 pt-6 pb-8 mb-4 drop-shadow-2xl shadow-zinc-900">
                  <div class="font-semibold tracking-tight text-gray-550">
                    <div class="mt-8">
                      <button
                        onClick={(e) =>
                          handleSiteLocationChange("Vehicle Plant")
                        }
                        class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                        role="button"
                      >
                        Vehicle Plant
                      </button>
                    </div>
                  </div>

                  <div class="font-semibold tracking-tight text-gray-550">
                    <div class="mt-8">
                      <button
                        title=""
                        value="Battery Plant"
                        onClick={(e) =>
                          handleSiteLocationChange("Battery Plant")
                        }
                        class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                        role="button"
                      >
                        Battery Plant
                      </button>
                    </div>
                  </div>
                </div>
              </p>
            </div>
          </div>

          <div class="grid p-12 bg-blue-100 lg:order-1 lg:col-span-3 rounded-3xl place-items-center">
            <img
              class="w-full shadow-xl rounded-xl sm:max-w-xs"
              src="/auth/computacenter.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
