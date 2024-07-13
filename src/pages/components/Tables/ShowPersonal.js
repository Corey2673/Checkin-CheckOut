import React, { useState, useEffect } from "react";

const RegisterForm = (props) => {
  const [allUsers, setAllUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [editingUser, setEditingUser] = useState({
    firstname: "",
    lastname: "",
    role: "",
    employeeID: "",
    id: "",
    employeestatus: "",
  });

  const editUser = (user) => {
    setEditingUser(user);
  };

  const updateUser = () => {
    if (
      editingUser &&
      editingUser.firstname &&
      editingUser.lastname &&
      editingUser.employeeID &&
      editingUser.employeestatus
    ) {
      // Logic to update user in local storage
      const updatedUsers = allUsers.map((user) =>
        user.id === editingUser.id ? editingUser : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setEditingUser({
        firstname: "",
        lastname: "",
        role: "",
        employeeID: "",
        id: "",
        employeestatus: "",
      });
      setAllUsers(updatedUsers);
    }
  };

  useEffect(() => {
    const fetchUsers = () => {
      // Fetch users from local storage
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        setAllUsers(JSON.parse(storedUsers));
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-full px-12 py-4">
      {/* <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Create Personal
      </h2> */}
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
                  Badge ID: {user.employeeID}
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
