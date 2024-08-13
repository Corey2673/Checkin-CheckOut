import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const OnsiteExport = () => {
  const [clockData, setClockData] = useState([]);
  const [selectedFields, setSelectedFields] = useState({
    userID: true,
    firstname: true,
    lastname: true,
    role: true,
    employeestatus: true,
    LOGIN_ID: true,
    PAYROLL_NO: true,
    NANCODE: true,

    SP_CODE: true,
    ACTIVITY: true,

    badgeID: true,

    createAT: true,
  });

  useEffect(() => {
    // Simulating data fetching and storing in localStorage
    const data = JSON.parse(localStorage.getItem("users"));
    if (data) {
      setClockData(data);
    }
  }, []);

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
        filename={"USERS.csv"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default OnsiteExport;
