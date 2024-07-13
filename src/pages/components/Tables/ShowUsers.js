import React, { useState, useEffect } from "react";
import AutoID from "../../utils/autoID";
import dateFormat from "../../utils/dateFormat";

const UserForm = () => {
  //   const initialFormData = {
  //     userID: "",
  //     firstname: "",
  //     lastname: "",
  //     phone: "",
  //     emergencycontactname: "",
  //     emergencycontactnumber: "",
  //     employeeID: "",
  //     badgeID: "",
  //     role: "",
  //     employeestatus: "",
  //     createAT: "",
  //   };
  //   // Load users from localStorage on component mount
  //   useEffect(() => {
  //     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  //     setUsers(storedUsers);
  //   }, []);
  //   const [formData, setFormData] = useState(initialFormData);
  //   const [users, setUsers] = useState([]);
  //   const [showUsers, setShowUsers] = useState(false); // State to manage user list visibility
  //   const [filterRole, setFilterRole] = useState(""); // State to manage the selected role filter
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };
  //   const handleSave = () => {
  //     // Set badgeID to employeeID before saving
  //     const updatedFormData = {
  //       ...formData,
  //       badgeID: formData.employeeID,
  //       userID: AutoID(),
  //       createAT: dateFormat(),
  //     };
  //     // Add new user to state
  //     const updatedUsers = [...users, updatedFormData];
  //     setUsers(updatedUsers);
  //     // Save updated users to localStorage
  //     localStorage.setItem("users", JSON.stringify(updatedUsers));
  //     // Clear the form after saving
  //     setFormData(initialFormData);
  //   };
  //   const handleClear = () => {
  //     setFormData(initialFormData); // Clear the form
  //   };
  //   const handleDelete = (index) => {
  //     // Remove user from state
  //     const updatedUsers = [...users];
  //     updatedUsers.splice(index, 1);
  //     setUsers(updatedUsers);
  //     // Save updated users to localStorage
  //     localStorage.setItem("users", JSON.stringify(updatedUsers));
  //   };
  //   const handleEdit = (index) => {
  //     // Set form data to edit user
  //     const userToEdit = users[index];
  //     setFormData({ ...userToEdit });
  //   };
  //   const toggleShowUsers = () => {
  //     setShowUsers(!showUsers);
  //   };
  //   const filteredUsers = users.filter(
  //     (user) => !filterRole || user.role === filterRole
  //   );
  //   return (
  //     <section className="bg-white">
  //       <div className="grid grid-cols-1 lg:grid-cols-2">
  //         <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
  //           <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
  //             <div className="mb-6">
  //               <div>
  //                 <button
  //                   onClick={toggleShowUsers}
  //                   className="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md focus:outline-none hover:bg-green-700 focus:bg-green-700"
  //                 >
  //                   {showUsers ? "Hide Users" : "Show Users"}
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         {showUsers && (
  //           <div className="flex justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
  //             <div className="w-full max-w-2xl">
  //               <h3 className="text-2xl font-bold text-center text-black">
  //                 User List
  //               </h3>
  //               <div className="mt-4 mb-4">
  //                 <label
  //                   htmlFor="filterRole"
  //                   className="block text-base font-medium text-gray-900"
  //                 >
  //                   Filter by Role:
  //                 </label>
  //                 <select
  //                   id="filterRole"
  //                   name="filterRole"
  //                   value={filterRole}
  //                   onChange={(e) => setFilterRole(e.target.value)}
  //                   className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
  //                 >
  //                   <option value="">All Roles</option>
  //                   <option value="Client Team">Client Team</option>
  //                   <option value="Control Room">Control Room</option>
  //                   <option value="Shop Floor">Shop Floor</option>
  //                   <option value="Manager">Manager</option>
  //                   <option value="Vendor">Vendor</option>
  //                   <option value="Management">Management</option>
  //                 </select>
  //               </div>
  //               <ul className="mt-4 space-y-4">
  //                 {filteredUsers.map((user, index) => (
  //                   <li
  //                     key={user.userID}
  //                     className="p-4 bg-white border rounded-md shadow-sm"
  //                   >
  //                     <div className="flex justify-between">
  //                       <div>
  //                         <p className="text-lg font-semibold">
  //                           {user.firstname} {user.lastname}
  //                         </p>
  //                         <p className="text-gray-500">Role: {user.role}</p>
  //                       </div>
  //                       <div className="flex space-x-2">
  //                         <button
  //                           onClick={() => handleEdit(index)}
  //                           className="px-2 py-1 text-sm font-medium text-white bg-yellow-500 rounded-md focus:outline-none hover:bg-yellow-600"
  //                         >
  //                           Edit
  //                         </button>
  //                         <button
  //                           onClick={() => handleDelete(index)}
  //                           className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md focus:outline-none hover:bg-red-600"
  //                         >
  //                           Delete
  //                         </button>
  //                       </div>
  //                     </div>
  //                   </li>
  //                 ))}
  //               </ul>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </section>
  //   );
};

export default UserForm;
