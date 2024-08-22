import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const OnsiteExport = () => {
  const [clockData, setClockData] = useState([]);
  const [selectedFields, setSelectedFields] = useState({
    PAYROLL_NO: true,
    firstname: true,
    lastname: true,
    timestampIN: true,
    timestampOUT: true,
  });

  useEffect(() => {
    // Simulating data fetching and storing in localStorage
    const data = JSON.parse(localStorage.getItem("clock_data"));
    if (data) {
      setClockData(data);
    }
  }, []);

  const FilterFTEUsers = () => {
    const allUsers = clockData || [];
    return allUsers.filter((user) => user.employmentstatus === "FTE");
  };

  const handleFieldChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFields((prevFields) => ({
      ...prevFields,
      [name]: checked,
    }));
  };

  const getFilteredData = () => {
    return clockData.map((user) => {
      const filteredUser = {};
      Object.keys(selectedFields).forEach((field) => {
        if (selectedFields[field]) {
          filteredUser[field] = user[field];
        }
      });
      return filteredUser;
    });
  };

  return (
    <div className="p-">
      {/* <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Select Fields to Export:</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(selectedFields).map((field) => (
            <div key={field} className="flex items-center">
              <input
                type="checkbox"
                name={field}
                checked={selectedFields[field]}
                onChange={handleFieldChange}
                className="mr-2"
              />
              <label htmlFor={field} className="capitalize">
                {field.replace(/_/g, " ")}
              </label>
            </div>
          ))}
        </div>
      </div> */}
      <CSVLink
        data={getFilteredData()}
        filename={"DURATION_DATA.csv"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default OnsiteExport;
