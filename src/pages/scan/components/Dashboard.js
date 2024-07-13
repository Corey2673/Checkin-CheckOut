import React, { useState } from "react";
import AddVendor from "../../components/forms/AddVendorForm.js";
import AddUser from "./AddUser";
import StatusTable from "../../components/Tables/ShowOnsiteStaff.js";
import TEST from "./test.js";
import SafetyQuestions from "./SafetyQuestions";
import CSVExport from "../../components/Tables/ShowExports.js";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeComponent, setActiveComponent] = useState("test");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const handleLogin = () => {
    // Perform login actions here (e.g., set authentication state)
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout actions here (e.g., reset authentication state)
    setIsLoggedIn(false);
    setActiveComponent("test"); // Reset active component on logout
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64">
        <div className="p-10">
          <img
            src="auth/a.png"
            alt="sidebar image"
            className="w-35 h-39 mb-2"
          />

          <nav className="mt-6">
            <ul>
              <>
                <li className="mb-4">
                  <button
                    className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                    onClick={() => handleComponentChange("test")}
                  >
                    <span>Safety Check In</span>
                  </button>
                </li>
                <li className="mb-4">
                  <button
                    className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                    onClick={() => handleComponentChange("statusTable")}
                  >
                    <span>Resorces Onsite</span>
                  </button>
                </li>
                <li className="mb-4">
                  <button
                    className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                    onClick={() => handleComponentChange("addVendor")}
                  >
                    <span>Visitors</span>
                  </button>
                </li>
              </>

              {isLoggedIn && (
                <li className="mb-4">
                  <button
                    className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                    onClick={() => handleComponentChange("addUser")}
                  >
                    <span>Users</span>
                  </button>
                </li>
              )}

              {isLoggedIn && (
                <li className="mb-4">
                  <button
                    className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                    onClick={() => handleComponentChange("safetyQuestions")}
                  >
                    <span>Safety Questions</span>
                  </button>
                </li>
              )}

              {isLoggedIn && (
                <li className="mb-4">
                  <button
                    className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                    onClick={() => handleComponentChange("exportData")}
                  >
                    <span>Reports</span>
                  </button>
                </li>
              )}

              {isLoggedIn ? (
                <li className="mb-4">
                  <button
                    className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                    onClick={handleLogout}
                  >
                    <span>Admin Logout</span>
                  </button>
                </li>
              ) : (
                <li className="mb-4">
                  <button
                    className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                    onClick={handleLogin}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                    <span>Admin Login</span>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300">
        {activeComponent === "test" && <TEST />}
        {activeComponent === "statusTable" && <StatusTable />}
        {activeComponent === "addVendor" && <AddVendor />}

        {isLoggedIn && (
          <>
            {activeComponent === "addUser" && <AddUser />}

            {activeComponent === "safetyQuestions" && <SafetyQuestions />}
            {activeComponent === "exportData" && <CSVExport />}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
