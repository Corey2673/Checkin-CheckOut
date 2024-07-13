import React, { useEffect, useState } from "react";

const ActiveOnsitePersonnelDashboard = () => {
  // State to hold the onsite clock data
  const [onsiteClockData, setOnsiteClockData] = useState([]);

  // State to hold the selected role
  const [selectedRole, setSelectedRole] = useState("All");

  // useEffect hook to fetch data from local storage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("onsite_clock")) || [];
    setOnsiteClockData(storedData);
  }, []);

  // Filter the data
  const filteredEntries = onsiteClockData.filter(
    (entry) =>
      entry.timestampOUT === null &&
      (selectedRole === "All" || entry.role === selectedRole)
  );

  console.log(filteredEntries);

  const roles = [
    "All",
    "Shop Floor",
    "Client Team",
    "Control Room",
    "Management",
    "Vendor",
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-7">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
          <div className="col-span-full text-center">
            <h1 className="text-4xl font-bold mb-5">Onsite Personnel</h1>
            <div className="mb-10">
              <div className="mb-5">
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
              </div>
            </div>
          </div>
          {filteredEntries.map((entry, index) => (
            <div
              key={index}
              className="col-span-full sm:col-span-1 md:col-span-2 lg:col-span-1"
            >
              <div className="bg-white shadow-md rounded-md p-5 transition-transform duration-300 transform hover:translate-x-5">
                <div className="flex items-center mb-3">
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
                  <div className="ml-3">
                    <h2 className="text-lg font-semibold">
                      Active till {entry.endTime}
                    </h2>
                    <p className="text-sm">{entry.role}</p>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    {`${entry.firstname} ${entry.lastname}`}
                  </p>
                  <p className="text-lg font-semibold">{entry.siteLocation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveOnsitePersonnelDashboard;
