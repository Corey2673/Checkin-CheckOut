import React, { useState, useEffect } from "react";
import autoID from "../../utils/autoID";
import dateFormat from "../../utils/dateFormat";

const ProcessChangeForm = () => {
  const initialFormData = {
    processID: "",
    text: "",
    role: "",
    siteLocation: "",
    createAT: "",
  };

  useEffect(() => {
    const storedAcknowledgements =
      JSON.parse(localStorage.getItem("process_changes")) || [];
    setAcknowledgements(storedAcknowledgements);
  }, []);

  const [formData, setFormData] = useState(initialFormData);
  const [acknowledgements, setAcknowledgements] = useState([]);
  const [showUserReply, setShowUserReply] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "comments") {
      setFormData({
        ...formData,
        [name]: value,
      });
      setShowUserReply(value === "Yes");
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    const updatedFormData = {
      ...formData,
      processID: autoID(),
      createAT: dateFormat(),
    };

    const updatedAcknowledgements = [...acknowledgements, updatedFormData];

    setAcknowledgements(updatedAcknowledgements);
    localStorage.setItem(
      "process_changes",
      JSON.stringify(updatedAcknowledgements)
    );

    setFormData(initialFormData);
    setShowUserReply(false);
  };

  const handleDelete = (procesID) => {
    const updatedAcknowledgements = acknowledgements.filter(
      (ack) => ack.procesID !== procesID
    );
    setAcknowledgements(updatedAcknowledgements);
    localStorage.setItem(
      "process_changes",
      JSON.stringify(updatedAcknowledgements)
    );
  };

  const moveAcknowledgement = (index, direction) => {
    const newAcknowledgements = [...acknowledgements];
    const [movedAcknowledgement] = newAcknowledgements.splice(index, 1);
    newAcknowledgements.splice(index + direction, 0, movedAcknowledgement);

    setAcknowledgements(newAcknowledgements);
    localStorage.setItem(
      "process_changes",
      JSON.stringify(newAcknowledgements)
    );
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-5xl mx-auto">
          <div className="overflow-hidden bg-white rounded-xl">
            <div className="px-6 sm:p-12">
              <h3 className="text-3xl font-semibold text-center text-gray-900">
                Process Change
              </h3>
              <form className="mt-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  <div className="sm:col-span-2">
                    <div className="mt-2.5 relative">
                      <textarea
                        name="text"
                        id="text"
                        placeholder="Describe the Process Change"
                        value={formData.text}
                        onChange={handleChange}
                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-4 py-2">
                    <label htmlFor="role" className="block text-gray-700">
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
                      <option value="Shop Floor">Shop Floor</option>
                      <option value="Client Team">Client Team</option>
                      <option value="Inventory">Inventory</option>
                      <option value="Control Room">Control Room</option>
                      <option value="Management">Management</option>
                      <option value="All">All</option>
                    </select>
                  </div>

                  <div className="mb-4 py-2">
                    <label
                      htmlFor="siteLocation"
                      className="block text-gray-700"
                    >
                      Sites:
                    </label>
                    <select
                      id="siteLocation"
                      name="siteLocation"
                      value={formData.siteLocation}
                      onChange={handleChange}
                      className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      <option value="">Select</option>
                      <option value="Battery Plant">Battery Plant</option>
                      <option value="Vehicle Plant">Vehicle Plant</option>
                      <option value="All">All</option>
                    </select>
                  </div>

                  <div className="mb-4 py-2">
                    <label htmlFor="comments" className="block text-gray-700">
                      User Comments:
                    </label>
                    <select
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {/* {showUserReply && (
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="userReply"
                        className="text-base font-medium text-gray-900"
                      >
                        User Reply
                      </label>
                      <div className="mt-2.5 relative">
                        <textarea
                          name="userReply"
                          id="userReply"
                          placeholder="Enter your reply"
                          value={formData.userReply}
                          onChange={handleChange}
                          className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600"
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                  )} */}

                  <div className="sm:col-span-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                      onClick={handleSave}
                      type="button"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-center text-gray-900">
            Saved Process Change Acknowledgements
          </h3>
          <ul className="mt-4">
            {acknowledgements.map((ack, index) => (
              <li
                key={ack.procesID}
                className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-md mb-2"
              >
                <span>{ack.text}</span>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => moveAcknowledgement(index, -1)}
                    disabled={index === 0}
                  >
                    Up
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => moveAcknowledgement(index, 1)}
                    disabled={index === acknowledgements.length - 1}
                  >
                    Down
                  </button>
                  <button
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(ack.procesID)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProcessChangeForm;
