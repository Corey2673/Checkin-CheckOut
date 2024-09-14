import React, { useEffect, useState } from "react";
import dateFormat from "../../utils/dateFormat";
import CSVExportButton from "../buttons/ExportButton.js";
import OnsiteExport from "../buttons/OnsiteExport.js";

const ActiveOnsitePersonnelDashboard = () => {
  // State to hold the onsite clock data
  const [onsiteClockData, setOnsiteClockData] = useState([]);

  // State to hold the selected role
  const [selectedRole, setSelectedRole] = useState("All");

  // useEffect hook to fetch data from local storage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("clock_data")) || [];
    setOnsiteClockData(storedData);
  }, []);

  // Save data to localStorage whenever onsiteClockData changes

  // Function to delete an entry by index

  const handleDelete = (userID) => {
    // Retrieve data from localStorage
    const storedData = JSON.parse(localStorage.getItem("clock_data")) || [];

    // Filter out the data matching the userID
    const updatedItems = onsiteClockData.filter(
      (item) => item.userID !== userID
    );

    // Update state and localStorage with the filtered data
    setOnsiteClockData(updatedItems);
    localStorage.setItem("clock_data", JSON.stringify(updatedItems));
  };
  // Filter the data
  const filteredEntries = onsiteClockData.filter(
    (entry) =>
      entry.timestampOUT === null &&
      (selectedRole === "All" || entry.role === selectedRole)
  );

  const roles = [
    "All",
    "Shop Floor",
    "Client Team",
    "Control Room",
    "Manager",
    "Vendor",
  ];

  return (
    <section className=" bg-gray-100 sm:py-10 lg:py-10">
      <h3 className=" ml-10 text-lg font-semibold text-black">
        Resources Onsite
      </h3>

      <p className="mt-4 ml-12 mb-text-base text-gray-600">
        <OnsiteExport />
      </p>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 mt-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Resources Onsite
          </h2>
          <p className="mx-auto mt-4 text-base leading-relaxed text-gray-600">
            <fieldset className="mb-5">
              <div className="flex flex-row">
                {roles.map((role) => (
                  <label key={role} className="mr-4">
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={selectedRole === role}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="mr-2"
                    />
                    {role}
                  </label>
                ))}
              </div>
            </fieldset>
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 lg:grid-cols-4 sm:grid-cols-2">
          {filteredEntries.map((entry, index) => (
            <div className="overflow-hidden bg-white rounded-md">
              <div className="px-5 py-6">
                <div className="flex items-center justify-between">
                  <div className="bg-green-500 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0 ml-3 mr-auto">
                    <p className="text-base font-semibold text-black truncate">
                      {`${entry.firstname} ${entry.lastname}`}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      Active Untill {entry.departureTime}
                    </p>
                  </div>
                </div>
                <blockquote key={entry.userID} className="mt-5">
                  <p className="text-base text-gray-800">
                    {entry.siteLocation}
                    <br />
                    {entry.role === "Vendor" && ` ${entry.company} `}
                    {entry.role}
                    <p className="text-base text-gray-800">
                      {entry.role === "Vendor" &&
                        `Escorted by  ${entry.escort} `}
                    </p>

                    <span className="block text-sky-500"># {entry.phone}</span>
                  </p>

                  {entry.role === "Vendor" && (
                    <button
                      onClick={() => handleDelete(entry.userID)}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Check Out Vendor
                    </button>
                  )}
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActiveOnsitePersonnelDashboard;
