import React, { useState } from "react";

const ClockInOut = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleClockIn = () => {
    const now = new Date();
    setLogs([...logs, { type: "IN", time: now }]);
    setClockedIn(true);
  };

  const handleClockOut = () => {
    const now = new Date();
    setLogs([...logs, { type: "OUT", time: now }]);
    setClockedIn(false);
  };

  return (
    <div className="clock-in-out">
      <h1>Clock In/Out</h1>
      <button onClick={clockedIn ? handleClockOut : handleClockIn}>
        {clockedIn ? "Clock Out" : "Clock In"}
      </button>
    </div>
  );
};

export default ClockInOut;
