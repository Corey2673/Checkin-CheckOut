import React, { useState, useEffect } from "react";
import AutoID from "../../utils/autoID";
import dateFormat from "../../utils/dateFormat";

import avatarColor from "../../utils/avatarColor";

const UserForm = () => {
  const initialFormData = {
    userID: "",
    firstname: "",
    lastname: "",
    phone: "",
    emergencycontactname: "",
    emergencycontactnumber: "",
    PAYROLL_NO: "",
    badgeID: "",
    role: "",
    employeestatus: "",
    createAT: "",
    LOGIN_ID: "",
    SP_CODE: "",
    NANCODE: "",
    ACTIVITY: "",
    ATT_TYPE: "",
    CUSTOMER_NAME: "",
    LINE_NO: "",
    OT_ID: "",
    CUSTOMER_NAME: "",
    TEAM_NAME: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false); // State to manage user list visibility
  const [filterRole, setFilterRole] = useState("");
  const [avatarColors, setAvatarColors] = useState([]); // State to manage role filter
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [editing, setEditing] = useState(false); // State to track if we're editing a user
  const [editingIndex, setEditingIndex] = useState(null); // State to track the index of the user being edited

  const toggleShowUsers = () => {
    setShowUsers(!showUsers);
  };

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
    setAvatarColors(
      storedUsers.map(() => {
        return avatarColor();
      })
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (editing) {
      // Update the user data
      const updatedUser = {
        ...formData,

        createAT: dateFormat(),
      };
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = updatedUser;

      // Update local storage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Update the state
      setUsers(updatedUsers);

      // Clear the form
      setFormData(initialFormData);
      setEditing(false);
      setEditingIndex(null);
    } else {
      // Create a new user
      const newUser = {
        ...formData,

        createAT: dateFormat(),
        userID: AutoID(),
      };
      const updatedUsers = [...users, newUser];

      // Update local storage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Update the state
      setUsers(updatedUsers);

      // Clear the form
      setFormData(initialFormData);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData); // Clear the form
  };
  const DateTimeSeparator = () => {
    const dateTimeString = "07/12/2024, 11:48 AM";

    // Split the date and time
    const [date, time] = dateTimeString.split(", ");

    return (
      <div>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
      </div>
    );
  };

  const handleDelete = (userID) => {
    // Retrieve data from localStorage
    const storedData = JSON.parse(localStorage.getItem("users")) || [];

    // Filter out the data matching the userID
    const updatedItems = users.filter((item) => item.userID !== userID);

    // Update state and localStorage with the filtered data
    setUsers(updatedItems);
    localStorage.setItem("users", JSON.stringify(updatedItems));
  };

  const handleEdit = (index) => {
    handleClear();
    // Set form data to edit user
    const userToEdit = users[index];
    setFormData({ ...userToEdit });
    setEditing(true);
    setEditingIndex(index);
    toggleShowUsers();
  };

  const filteredUsers = filterRole
    ? users.filter((user) => user.role === filterRole)
    : users;

  return (
    <section className="bg-white">
      <div className="mb-4 ml-8 block text-base font-medium text-gray-900">
        <div className="justify-center mt-10 mb-4 ml-8 block">
          <button
            onClick={toggleShowUsers}
            className=" items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
          >
            {showUsers ? "Hide Accounts" : "Show All Accounts"}
          </button>
        </div>
      </div>
      {showUsers && (
        <section class=" bg-gray-50 sm:py-10 lg:py-10">
          <div className="ml-10 ">
            <label
              htmlFor="filterRole"
              className="block text-base font-medium text-gray-900"
            >
              Filter by Role:
            </label>
            <select
              id="filterRole"
              name="filterRole"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">All</option>
              <option value="Client Team">Client Team</option>
              <option value="Control Room">Control Room</option>
              <option value="Inventory">Inventory</option>
              <option value="Manager">Manager</option>
              <option value="Shop Floor">Shop Floor</option>
            </select>
            <hr className="mt-5 mb-1 border-gray-200" />
          </div>

          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="max-w-xl mx-auto text-center xl:max-w-3xl">
              <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                All Employees
              </h2>
            </div>
          </div>

          <div class="-my-4">
            <div class="w-full overflow-hidden">
              <div class="grid grid-cols-4 gap-3 mt-5 text-center lg:grid-cols-4 lg:gap-3 lg:mt-5 xl:mt-9 xl:gap-8">
                {filteredUsers.map((user, index) => (
                  <div key={index} className="mt-1 lg:mt-4">
                    <div className="overflow-hidden bg-white shadow-lg rounded-xl">
                      <div className="p-4 sm:p-15">
                        <div className="inline-flex items-center justify-center w-10 h-10 mx-auto rounded-full sm:w-20 sm:h-20 bg-blue-800">
                          <span className="text-white text-lg sm:text-3xl">
                            {user.firstname.charAt(0)} {user.lastname.charAt(0)}
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-bold text-gray-900 sm:mt-3 sm:text-lg md:text-xl">
                          {user.firstname} {user.lastname}
                        </p>
                        <p className="text-sm text-gray-900">{user.role}</p>

                        <button
                          onClick={() => handleEdit(index)}
                          className="mt-2 mr-2 px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.userID)}
                          className="mt-2 px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div class="px-4 mx-auto mt-12 lg:mt-20 max-w-7xl sm:px-6 lg:px-8">
            <div class="text-center">
              <a
                href="#"
                title=""
                class="pb-2 text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"
              >
                Total Number of User Accounts: {users.length}
              </a>
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              User Account Signup
            </h2>

            <hr className="mt-5 mb-5 border-gray-200" />
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="firstname"
                  className="text-base font-medium text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2.5">
                  <input
                    autoComplete="off"
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="text-base font-medium text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2.5">
                  <input
                    autoComplete="off"
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                </div>
              </div>

              <hr className="mt-16 mb-10 border-gray-200" />
              <div>
                <label
                  htmlFor="PAYROLL_NO"
                  className="text-base font-medium text-gray-900"
                >
                  Payroll No
                </label>
                <div className="mt-2.5">
                  <input
                    autoComplete="off"
                    type="text"
                    name="PAYROLL_NO"
                    value={formData.PAYROLL_NO}
                    onChange={handleChange}
                    placeholder="Enter Payroll No"
                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="badgeID"
                  className="text-base font-medium text-gray-900"
                >
                  Badge ID
                </label>
                <div className="mt-2.5">
                  <input
                    autoComplete="off"
                    type="text"
                    name="badgeID"
                    value={formData.badgeID}
                    onChange={handleChange}
                    placeholder="Enter Badge ID"
                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                </div>
              </div>
              <div className="mb-4 py-4">
                <label
                  htmlFor="role"
                  className="block text-base font-medium text-gray-900"
                >
                  Role:
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <option value="">Select</option>
                  <option value="Client Team">Client Team</option>
                  <option value="Control Room">Control Room</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Manager">Manager</option>
                  <option value="Shop Floor">Shop Floor</option>
                  <option value="Tech Bar">Tech Bar</option>
                </select>
              </div>
              <div className="mb-4 py-4">
                <label
                  htmlFor="employeestatus"
                  className="block text-base font-medium text-gray-900"
                >
                  Employment Status:
                </label>
                <select
                  id="employeestatus"
                  name="employeestatus"
                  value={formData.employeestatus}
                  onChange={handleChange}
                  className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <option value="">Select</option>
                  <option value="CTE">Contracted Employee</option>
                  <option value="FTE">Full Time Employee</option>
                </select>
              </div>

              {formData.employeestatus === "FTE" && (
                <>
                  <h2>CAT2 Report Information</h2>
                  <div>
                    <label
                      htmlFor="LOGIN_ID"
                      className="text-base font-medium text-gray-900"
                    >
                      LOGIN_ID
                    </label>
                    <div className="mt-2.5">
                      <input
                        autoComplete="off"
                        type="text"
                        name="LOGIN_ID"
                        value={formData.LOGIN_ID}
                        onChange={handleChange}
                        placeholder="Enter LOGIN_ID"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="SP_CODE"
                      className="text-base font-medium text-gray-900"
                    >
                      SP_CODE
                    </label>
                    <div className="mt-2.5">
                      <input
                        autoComplete="off"
                        type="text"
                        name="SP_CODE"
                        value={formData.SP_CODE}
                        onChange={handleChange}
                        placeholder="Enter SP_CODE"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="NANCODE"
                      className="text-base font-medium text-gray-900"
                    >
                      NANCODE
                    </label>
                    <div className="mt-2.5">
                      <input
                        autoComplete="off"
                        type="text"
                        name="NANCODE"
                        value={formData.NANCODE}
                        onChange={handleChange}
                        placeholder="Enter NANCODE"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="ACTIVITY"
                      className="text-base font-medium text-gray-900"
                    >
                      ACTIVITY
                    </label>
                    <div className="mt-2.5">
                      <input
                        autoComplete="off"
                        type="text"
                        name="ACTIVITY"
                        value={formData.ACTIVITY}
                        onChange={handleChange}
                        placeholder="Enter ACTIVITY"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="ATT_TYPE"
                      className="text-base font-medium text-gray-900"
                    >
                      ATT_TYPE
                    </label>
                    <div className="mt-2.5">
                      <input
                        autoComplete="off"
                        type="text"
                        name="ATT_TYPE"
                        value={formData.ATT_TYPE}
                        onChange={handleChange}
                        placeholder="Enter ATT Type"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="CUSTOMER_NAME"
                      className="text-base font-medium text-gray-900"
                    >
                      CUSTOMER_NAME
                    </label>
                    <div className="mt-2.5">
                      <input
                        autoComplete="off"
                        type="text"
                        name="CUSTOMER_NAME"
                        value={formData.CUSTOMER_NAME}
                        onChange={handleChange}
                        placeholder="Enter CUSTOMER NAME"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                {editing ? (
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                  >
                    Edit Account
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                  >
                    Create Account
                  </button>
                )}
              </div>
              <div>
                <button
                  onClick={handleClear}
                  className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md focus:outline-none hover:bg-zinc-700 focus:bg-red-700"
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  onClick={handleClear}
                  className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-amber-600 border border-transparent rounded-md focus:outline-none hover:bg-zinc-700 focus:bg-blue-700"
                >
                  Clear Form
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
          <div>
            <img className="w-full mx-auto" src="/auth/c1.jpg" alt="" />

            <div className="w-full max-w-md mx-auto xl:max-w-xl">
              <h3 className="text-2xl mt-10 font-bold text-center text-black">
                Signing Up Users Authorized by Computacenter
              </h3>

              <p className="leading-relaxed text-center text-gray-500 mt-2.5">
                Computacenter employees must enter their Payroll ID as their
                Employee ID. Contracted employees must create a 5-digit PIN
              </p>

              <hr className="mt-16 mb-10 border-gray-200" />
              <p className="leading-relaxed text-center text-gray-500 mt-2.5">
                This form is for signing up users authorized to work under the
                Computacenter name and logo. To sign up a vendor, please use the
                'Vendors' tab on the side panel.
              </p>

              <div className="flex items-center justify-center mt-10 space-x-3">
                <div className="bg-orange-500 rounded-full w-20 h-1.5"></div>

                <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>

                <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserForm;
