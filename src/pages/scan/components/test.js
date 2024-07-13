import React, { useState, useEffect } from "react";

import Badge_Scan from "../../components/inputs/badge_scan";

const UserList = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const [location, setLocation] = useState(null);
  const [badgeID, setBadgeID] = useState("");

  const [foundUser, setFoundUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  const handleSearch = () => {
    const user = users.find((user) => user.badgeID === badgeID);
    if (user) {
      setClockedIn(() => {
        const savedLogs = localStorage.getItem(`logs-${user.id}`);
        if (savedLogs) {
          const logs = JSON.parse(savedLogs);
          const lastLog = logs.find((log) => log.type === "IN");
          return !!lastLog;
        }
        return false;
      });

      setFoundUser(user);
      setShowQuestions(user.questions !== null);
    } else {
      setFoundUser(null);
      setShowQuestions(false);
    }
  };

  const saveUsers = () => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-3">
      <div className="container mx-auto">
        <div
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('auth/log.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-1 gap-4 justify-center">
              <Badge_Scan />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
