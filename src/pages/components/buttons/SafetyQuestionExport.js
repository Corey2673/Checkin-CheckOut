import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const SafetyAckExport = () => {
  const [ackData, setAckData] = useState([]);
  const [selectedFields, setSelectedFields] = useState({
    questionID: true,
    text: true,
    siteLocation: true,
    createAT: true,
    role: true,
    comments: true,
    userReply: true,
  });

  useEffect(() => {
    // Simulating data fetching and storing in localStorage
    const data = JSON.parse(localStorage.getItem("safety_questions"));
    if (data) {
      setAckData(data);
    }
  }, []);

  const getFilteredData = () => {
    return ackData.map((user) => {
      const filteredUser = {};
      Object.keys(selectedFields).forEach((field) => {
        if (selectedFields[field]) {
          filteredUser[field] = user[field];
        }
      });
      return filteredUser;
    });
  };

  return (
    <div className="p-">
      {/* <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Select Fields to Export:</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(selectedFields).map((field) => (
            <div key={field} className="flex items-center">
              <input
                type="checkbox"
                name={field}
                checked={selectedFields[field]}
                onChange={handleFieldChange}
                className="mr-2"
              />
              <label htmlFor={field} className="capitalize">
                {field.replace(/_/g, " ")}
              </label>
            </div>
          ))}
        </div>
      </div> */}
      <CSVLink
        data={getFilteredData()}
        filename={"safety_questions.csv"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default SafetyAckExport;
