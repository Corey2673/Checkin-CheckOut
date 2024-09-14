import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const OnsiteExport = () => {
  const [clockData, setClockData] = useState([]);
  const [selectedFields, setSelectedFields] = useState({
    firstname: true,
    lastname: true,
    siteLocation: true,
    role: true,
    timestampIN: true,
    phone: true,
    departureTime: true,
    escort: true,
  });

  useEffect(() => {
    // Retrieve data from localStorage
    const data = JSON.parse(localStorage.getItem("clock_data"));

    // Filter data where timestampOUT is null
    const filteredData = data
      ? data.filter((item) => item.timestampOUT === null)
      : [];

    // Set the filtered data
    setClockData(filteredData);
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
      <CSVLink
        data={getFilteredData()}
        filename={"CURRENT_ONSITE.csv"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default OnsiteExport;
