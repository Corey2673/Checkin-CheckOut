import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const CurrentlyOnsiteExport = () => {
  const [clockData, setClockData] = useState([]);

  useEffect(() => {
    // Simulating data fetching and storing in localStorage
    const data = JSON.parse(localStorage.getItem("clock_data"));
    if (data) {
      setClockData(data);
    }
  }, []);

  const FilterFTEUsers = () => {
    const allUsers = clockData || [];

    return allUsers.filter((user) => user.timestampOUT === null || undefined);
  };

  return (
    <div>
      <CSVLink
        data={FilterFTEUsers()}
        filename={"CAT2_FTE_REPORT.csv"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default CurrentlyOnsiteExport;
