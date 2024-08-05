import React, { useState } from "react";

const TimeCalculator = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    try {
      const duration = calculateDuration(startTime, endTime);
      setResult(duration);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Time Calculator</h1>
      <div>
        <label>Start Time: </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label>End Time: </label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Calculate</button>
      {result && (
        <div>
          <p>Total Hours (6 AM - 7:59 PM): {result.totalHoursDay}</p>
          <p>Total Hours (8 PM - 5:59 AM): {result.totalHoursNight}</p>
        </div>
      )}
    </div>
  );
};

export default TimeCalculator;
