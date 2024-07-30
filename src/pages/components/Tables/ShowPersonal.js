import React, { useState, useEffect } from "react";

const ShowPersonal = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [editingUser, setEditingUser] = useState({});

  const editUser = (user) => {
    setEditingUser(user);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
          setAllUsers(JSON.parse(storedUsers));
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-full px-12 py-4">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {allUsers.map((user) => (
          <div
            key={user.id}
            className="rounded-md overflow-hidden border border-gray-200"
          >
            <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">
                  {user.firstname} {user.lastname}
                </h2>
                <p className="text-sm text-gray-600 mb-2">{user.role}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Badge ID: {user.PAYROLL_NO}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {user.employeestatus}
                </p>
              </div>
            </div>
            <div className="flex justify-end p-2">
              <button
                className="text-gray-500 hover:text-gray-600 focus:outline-none"
                onClick={() => editUser(user)}
              >
                Edit
              </button>
              <button className="text-red-500 hover:text-red-600 ml-2 focus:outline-none">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisterForm;
