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
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const handleLogin = () => {
    // Open modal for password input
    setShowModal(true);
  };

  const handlePasswordSubmit = () => {
    // Replace 'yourPassword' with the actual password you want to use
    if (password === "safetyAdmin") {
      setIsLoggedIn(true);
      setShowModal(false);
    } else {
      alert("Incorrect password");
    }

    setPassword("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveComponent("test");
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
                    <span>Resources Onsite</span>
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

      {/* Modal for password input */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="mb-4 text-lg font-semibold">Enter Admin Password</h2>
            <input
              type="password"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-gray-300 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={handlePasswordSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
