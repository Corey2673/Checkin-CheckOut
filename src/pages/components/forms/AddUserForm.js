import React, { useState, useEffect } from "react";
import AutoID from "../../utils/autoID";
import dateFormat from "../../utils/dateFormat";
import getInitials from "../../utils/getInitials";
import avatarColor from "../../utils/avatarColor";

const UserForm = () => {
  const initialFormData = {
    userID: "",
    firstname: "",
    lastname: "",
    phone: "",
    emergencycontactname: "",
    emergencycontactnumber: "",
    employeeID: "",
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
    // Set badgeID to employeeID before saving
    const updatedFormData = {
      ...formData,
      badgeID: formData.employeeID,
      userID: AutoID(),
      createAT: dateFormat(),
    };

    // Add new user to state
    const updatedUsers = [...users, updatedFormData];
    setUsers(updatedUsers);

    // Save updated users to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Clear the form after saving
    setFormData(initialFormData);
  };

  const handleClear = () => {
    setFormData(initialFormData); // Clear the form
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleEdit = (index) => {
    // Set form data to edit user
    const userToEdit = users[index];
    setFormData({ ...userToEdit });
  };

  const filteredUsers = filterRole
    ? users.filter((user) => user.role === filterRole)
    : users;

  return (
    <section className="bg-white">
      <div className="mb-4 ml-8 block text-base font-medium text-gray-900">
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
        <section class=" bg-gray-50 sm:py-16 lg:py-20">
          <div className="mt-10 "></div>

          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="max-w-xl mx-auto text-center xl:max-w-3xl">
              <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                All User Accounts
              </h2>
            </div>

            <svg
              class="w-auto h-4 mx-auto mt-8 text-gray-300 lg:mt-12"
              viewBox="0 0 172 16"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)"
              />
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)"
              />
            </svg>
          </div>

          <div class="-my-4">
            <div class="w-full overflow-hidden">
              <div class="grid grid-cols-4 gap-3 mt-5 text-center lg:grid-cols-4 lg:gap-3 lg:mt-5 xl:mt-9 xl:gap-8">
                {filteredUsers.map((user, index) => (
                  <>
                    <div
                      key={user.userID}
                      onClick={() => {
                        handleEdit(index);
                        toggleShowUsers();
                      }}
                      class="mt-1 lg:mt-4"
                    >
                      <div class="overflow-hidden bg-white shadow-lg rounded-xl">
                        <div class="p-4 sm:p-15">
                          <div class="inline-flex items-center justify-center w-10 h-10 mx-autorounded-full sm:w-20 sm:h-20">
                            <div class="overflow-hidden rounded-xl">
                              <div class="sm:p-">
                                <div
                                  class={
                                    "inline-flex items-center justify-center w-15 h-10 mx-auto bg-blue-800 rounded-full sm:w-20 sm:h-20"
                                  }
                                >
                                  <span class="text-white  text-lg sm:text-4xl"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-2 text-sm font-bold text-gray-900 sm:mt-3 sm:text-lg md:text-xl font-pj">
                            {user.firstname} {user.lastname}
                          </p>
                          <p class="mt-2 text-sm  text-gray-900 sm:mt-3 sm:text-lg md:text-xl font-pj">
                            {user.role}
                          </p>
                          <p class="mt-2 text-sm  text-gray-900 sm:mt-3 sm:text-lg md:text-xl font-pj">
                            {user.employeestatus}
                          </p>
                          <p class="mt-2 text-sm  text-gray-900 sm:mt-3 sm:text-lg md:text-xl font-pj">
                            Employee ID: {user.employeeID}
                          </p>
                          <p class="mt-4 text-sm  text-gray-900 sm:mt-7 sm:text-lg md:text-xl font-pj">
                            <button
                              onClick={() => handleDelete(index)}
                              className="inline-flex items-center justify-center px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-red-700 border border-transparent rounded-md focus:outline-none hover:bg-red-400 focus:bg-red-200"
                            >
                              Delete
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
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
              {/* Your existing fields */}
              {/* ... */}
              {/* Additional fields for CAT2 Reporting */}
              <div>
                <label
                  htmlFor="firstname"
                  className="text-base font-medium text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2.5">
                  <input
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
                  htmlFor="employeeID"
                  className="text-base font-medium text-gray-900"
                >
                  Payroll ID
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="employeeID"
                    value={formData.employeeID}
                    onChange={handleChange}
                    placeholder="Enter Empolyee Number"
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
                        type="text"
                        name="Login_ID"
                        value={formData.LOGIN_ID}
                        onChange={handleChange}
                        placeholder="Enter LOGIN_ID"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="SP_Code"
                      className="text-base font-medium text-gray-900"
                    >
                      SP_Code
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="SP_Code"
                        value={formData.SP_CODE}
                        onChange={handleChange}
                        placeholder="Enter SP_Code"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="NANCODE"
                      className="text-base font-medium text-gray-900"
                    >
                      NANCode
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="NANCODE"
                        value={formData.NANCODE}
                        onChange={handleChange}
                        placeholder="Enter NANCode"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="ACTIVITY"
                      className="text-base font-medium text-gray-900"
                    >
                      Activity
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="ACTIVITY"
                        value={formData.ACTIVITY}
                        onChange={handleChange}
                        placeholder="Enter Activity"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="ATT_TYPE"
                      className="text-base font-medium text-gray-900"
                    >
                      ATT Type
                    </label>
                    <div className="mt-2.5">
                      <input
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
                      htmlFor="LINE_NO"
                      className="text-base font-medium text-gray-900"
                    >
                      Line No
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="LINE_NO"
                        value={formData.LINE_NO}
                        onChange={handleChange}
                        placeholder="Enter Line NO"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="OT_ID"
                      className="text-base font-medium text-gray-900"
                    >
                      OT ID
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="OT_ID"
                        value={formData.OT_ID}
                        onChange={handleChange}
                        placeholder="Enter OT ID"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="CUSTOMER_NAME"
                      className="text-base font-medium text-gray-900"
                    >
                      Team ID
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="CUSTOMER_NAME"
                        value={formData.CUSTOMER_NAME}
                        onChange={handleChange}
                        placeholder="Enter Team ID"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="TEAM_NAME"
                      className="text-base font-medium text-gray-900"
                    >
                      Team Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="TEAM_NAME"
                        value={formData.TEAM_NAME}
                        onChange={handleChange}
                        placeholder="Enter Team Name"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>
                  {/* Add more fields similarly */}
                </>
              )}
              <div>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                >
                  Create Account
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
