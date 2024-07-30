import React, { useState } from "react";
import dateFormat from "../../utils/dateFormat";
import DateTimeSeparator from "../../utils/DateTimeSeparator";
import DottedDate from "../../utils/DottedDate";

const RegisterForm = (props) => {
  const { dataClock } = props;
  const [updatedData, setUpdatedData] = useState({
    timestampOUT: dateFormat(),
  });

  function updateClockData(userID, updatedData) {
    try {
      // Retrieve existing clock_data from localStorage
      const clockDataString = localStorage.getItem("clock_data");
      let clockData = clockDataString ? JSON.parse(clockDataString) : [];

      // Find the user data by userID and check if timestampOUT is null
      const userIndex = clockData.findIndex(
        (user) => user.userID === userID && user.timestampOUT === null
      );

      if (userIndex !== -1) {
        // Ensure timestampIN and updatedData.timestampOUT are Date objects
        const timestampIN = new Date(clockData[userIndex].timestampIN);
        const timestampOUT = new Date(updatedData.timestampOUT);

        // Calculate the duration in milliseconds
        const duration = timestampOUT - timestampIN;

        // Convert duration to desired format, e.g., minutes

        const durationInMinutes = Math.floor((duration % 3600000) / 60000);
        const durationInHours = Math.floor(duration / 3600000); // 1 hour = 3600000 milliseconds
        const { date, time } = DateTimeSeparator(
          clockData[userIndex].timestampIN
        );

        // Update the user data with the calculated duration
        clockData[userIndex] = {
          ...clockData[userIndex],
          ...updatedData,
          CAL_DATE: DottedDate(date),
          DURATION: durationInHours + "." + durationInMinutes,

          // Store the duration
        };
      } else {
        console.warn(`User with ID ${userID} and timestampOUT null not found.`);
      }

      // Save the updated data back to localStorage
      localStorage.setItem("clock_data", JSON.stringify(clockData));
    } catch (error) {
      console.error("Error updating data:", error);
    }

    // Optionally reload the window to reflect changes
    window.location.reload();
  }

  return (
    <section class="py-12 bg-white sm:py-16 lg:py-20 xl:py-24">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-7 gap-x-20 gap-y-12">
          <div class="lg:order-2 lg:col-span-4">
            <div class="max-w-lg lg:max-w-none">
              <h2 class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:pr-8">
                {dataClock[0].firstname} {dataClock[0].lastname}
              </h2>
              <p class="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:pr-24 lg:leading-8">
                <h4 class="text-3xl font-semibold tracking-tight text-gray-550 sm:text-4xl lg:text-3xl lg:pr-8">
                  {dataClock[0].role}
                </h4>
                <hr class="mt-5 mb-10 border-gray-200" />

                <div class="flex justify-center">
                  <h3 class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-4xl lg:pr-8">
                    Check Out
                  </h3>
                </div>

                <div class="flex justify-center space-x-8 bg-white rounded-lg px-8 pt-6 pb-8 mb-4 drop-shadow-2xl shadow-zinc-900">
                  <div class="font-semibold tracking-tight text-gray-550">
                    <div class="mt-8">
                      <button
                        onClick={() =>
                          updateClockData(dataClock[0].userID, updatedData)
                        }
                        class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                        role="button"
                      >
                        Check Out
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
