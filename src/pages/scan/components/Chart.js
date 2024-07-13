// src/components/UserProfile.js
import React from "react";

const UserProfile = ({ isActive }) => {
  const cardClasses = `max-w-md mx-auto mt-5 p-6 bg-white shadow-lg ${
    isActive ? "border-4 border-green-500" : "border-4 border-red-500"
  } rounded-lg`;

  return (
    <div className={cardClasses}>
      <img
        className="h-48 w-full object-cover rounded-t-lg"
        src="https://source.unsplash.com/random"
        alt="User Profile Background"
      />
      <img
        className="h-24 w-24 rounded-full border-4 border-white -mt-12 mx-auto"
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="User Avatar"
      />
      <div className="text-center">
        <h5 className="text-xl font-bold">John Doe</h5>
        <p className="text-sm text-gray-600">Software Engineer at XYZ Corp.</p>
      </div>
      <div className="mt-3">
        <div className="flex items-center mb-2">
          <svg
            className="w-5 h-5 mr-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p className="text-sm">johndoe@example.com</p>
        </div>
        <div className="flex items-center mb-2">
          <svg
            className="w-5 h-5 mr-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p className="text-sm">+1 234 567 890</p>
        </div>
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p className="text-sm">San Francisco, CA</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
