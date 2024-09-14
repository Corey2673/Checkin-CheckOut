import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const CAT2Export = () => {
  const [clockData, setClockData] = useState([]);

  const [selectedFields, setSelectedFields] = useState({
    PAYROLL_NO: true,
    LOGIN_ID: true,
    SP_CODE: true,
    NANCODE: true,
    ACTIVITY: true,
    ATT_TYPE: true,
    CAL_DATE: true,
    DURATION: true,
    // CUSTOMER_NAME: true,
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

  const getFilteredData = () => {
    return FilterFTEUsers().map((user) => {
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
        filename={"CAT2_FTE_REPORT.csv"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default CAT2Export;
