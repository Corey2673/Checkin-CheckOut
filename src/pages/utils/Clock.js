import React, { useState, useRef } from "react";

const AnalogClockInput = () => {
  const [time, setTime] = useState(new Date());
  const clockRef = useRef(null);

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return; // Only respond to left mouse button

    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    const hours = (angle / 30 + 12) % 12 || 12;
    const minutes = Math.round(((hours % 1) * 60) / 5) * 5;

    const newTime = new Date(time);
    newTime.setHours(Math.floor(hours), minutes);
    setTime(newTime);
  };

  const hourHandStyle = {
    transform: `rotate(${
      (time.getHours() % 12) * 30 + time.getMinutes() / 2
    }deg)`,
  };

  const minuteHandStyle = {
    transform: `rotate(${time.getMinutes() * 6}deg)`,
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={clockRef}
        className="relative w-64 h-64 bg-white rounded-full border-2 border-gray-300"
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute w-1 h-16 bg-gray-700 origin-bottom transform translate-x-full left-1/2 top-1/2"
          style={hourHandStyle}
        ></div>
        <div
          className="absolute w-1 h-24 bg-gray-700 origin-bottom transform translate-x-full left-1/2 top-1/2"
          style={minuteHandStyle}
        ></div>
        <div className="absolute w-2 h-2 bg-gray-700 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="mt-4 text-xl font-semibold">
        Selected Time:{" "}
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
};

export default AnalogClockInput;
