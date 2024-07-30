import React, { useState, useEffect } from "react";
import ProfileComfirm from "../forms/ProfileComfirm";
import Departure from "./departure";
import "../../utils/styles.css";
import FaceRecognition from "./FaceRecognition";

const RegisterForm = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchBadgeID, setSearchBadgeID] = useState("");
  const [allClockData, setAllClockData] = useState([]);

  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setAllUsers(storedUsers);
    } catch (error) {
      console.error("Failed to parse users from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const clockData = JSON.parse(localStorage.getItem("clock_data")) || [];
      setAllClockData(clockData);
    } catch (error) {
      console.error("Failed to parse clockData from localStorage:", error);
    }
  }, []);

  const filteredUsers = allUsers.filter(
    (user) =>
      user.badgeID && user.badgeID.toLowerCase() === searchBadgeID.toLowerCase()
  );
  const foundUser = filteredUsers.length === 1;

  if (foundUser) {
    const filteredClockData = allClockData.filter(
      (data1) =>
        filteredUsers[0].userID === data1.userID && data1.timestampOUT === null
    );

    if (filteredClockData.length === 1) {
      return <Departure dataClock={filteredClockData} />;
    } else {
      return <ProfileComfirm data={filteredUsers} />;
    }
  }

  const handleSearchChange = (e) => {
    setSearchBadgeID(e.target.value);
  };

  return (
    <div className="w-full py-4 flex flex-col items-center justify-center space-y-4">
      <div className="text-center w-full max-w-md px-4">
        <img
          src="/auth/m3.png"
          alt="Badge"
          className="w-32 h-32 mb-4 mx-auto spin-horizontal"
        />
        <h1 className="text-4xl font-extrabold mb-4 text-white">
          Safety Check In
        </h1>
        {/* <FaceRecognition /> */}
        <input
          type="password"
          placeholder="Enter Badge ID"
          value={searchBadgeID}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {filteredUsers.length === 0 && searchBadgeID && (
          <p className="text-red-500 mt-2">No matching user found</p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
