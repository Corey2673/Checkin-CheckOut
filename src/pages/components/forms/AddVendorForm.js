import React, { useState, useEffect } from "react";
import autoID from "../../utils/autoID";
import dateFormat from "../../utils/dateFormat";

const VendorForm = () => {
  const initialFormData = {
    firstname: "",
    lastname: "",
    phone: "",
    emergencycontactname: "",
    emergencycontactnumber: "",
    role: "Vendor",
    company: "",
    createAT: "",
    badgeID: "", // New field for Badge ID
    escort: "",
    siteLocation: "",
    departureTime: "",

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

  const [escort, setEscort] = useState(""); // State for escort
  const [escorts, setEscorts] = useState([]); // State for escort dropdown options
  const [siteLocation, setSiteLocation] = useState([]); // State for escort dropdown options
  const [departureTime, setDepartureTime] = useState("");
  useEffect(() => {
    const existingClockActions =
      JSON.parse(localStorage.getItem("clock_data")) || [];
    const filteredEscorts = existingClockActions
      .filter((entry) => entry.timestampOUT === null)
      .map((entry) => entry.firstname + " " + entry.lastname);
    const uniqueEscorts = [...new Set(filteredEscorts)];
    setEscorts(uniqueEscorts);
    setSiteLocation(["Vehicle Plant", "Battery Plant"]);
  }, []);
  // Load vendors from localStorage on component mount
  useEffect(() => {
    const storedVendors = JSON.parse(localStorage.getItem("users")) || [];
    setVendors(storedVendors);
  }, []);

  const [formData, setFormData] = useState(initialFormData);
  const [vendors, setVendors] = useState([]);
  const [showVendors, setShowVendors] = useState(false); // State to manage user list visibility
  const [selectedSiteLocation, setSelectedSiteLocation] = useState("");
  const handleSiteLocationChange = (location) => {
    setSelectedSiteLocation(location);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Set userID before saving
    const updatedFormData = {
      ...formData,
      userID: autoID(),
      createAT: dateFormat(),
      timestampOUT: null,
      timestampIN: dateFormat(),
      siteLocation: selectedSiteLocation,
      escort: escort,
      departureTime: departureTime,
    };
    const existingClockActions =
      JSON.parse(localStorage.getItem("clock_data")) || [];
    const updatedClockActions = [...existingClockActions, updatedFormData];
    localStorage.setItem("clock_data", JSON.stringify(updatedClockActions));

    // Add new user to state
    const updatedVendors = [...vendors, updatedFormData];
    setVendors(updatedVendors);

    // Clear the form after saving
    setFormData(initialFormData);
  };

  const handleClear = () => {
    setFormData(initialFormData); // Clear the form
  };

  const handleDelete = (index) => {
    // Remove user from state
    const updatedVendors = [...vendors];
    updatedVendors.splice(index, 1);
    setVendors(updatedVendors);

    // Save updated vendors to localStorage
    localStorage.setItem("users", JSON.stringify(updatedVendors));
  };

  const handleEdit = (index) => {
    // Set form data to edit user
    const userToEdit = vendors[index];
    setFormData({ ...userToEdit });
  };

  const toggleShowVendors = () => {
    setShowVendors(!showVendors);
  };

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Visitor Signup
            </h2>

            <hr className="mt-5 mb-5 border-gray-200" />
            <div className="space-y-5 ">
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
              <div>
                <label
                  htmlFor="phone"
                  className="text-base font-medium text-gray-900"
                >
                  Contact Number
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your Contact Number"
                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                </div>
              </div>
              <hr className="mt-16 mb-10 border-gray-200" />

              <div>
                <label
                  htmlFor="company"
                  className="text-base font-medium text-gray-900"
                >
                  Company
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter Company Name"
                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="emergencycontactname"
                  className="text-base font-medium text-gray-900"
                >
                  Emergency Contact Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="emergencycontactname"
                    value={formData.emergencycontactname}
                    onChange={handleChange}
                    placeholder="Enter Emergency Contact Full Name"
                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="emergencycontactnumber"
                  className="text-base font-medium text-gray-900"
                >
                  Emergency Contact Number
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="emergencycontactnumber"
                    value={formData.emergencycontactnumber}
                    onChange={handleChange}
                    placeholder="Enter Emergency Contact Number"
                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="escort"
                  className="text-base font-medium text-gray-900"
                >
                  Escort
                </label>

                <div className="mt-2.5">
                  <select
                    name="escort"
                    value={escort}
                    onChange={(e) => setEscort(e.target.value)}
                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    required
                  >
                    <option value="" disabled>
                      Select Escort
                    </option>
                    {escorts.map((escortName) => (
                      <option value={escortName}>{escortName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 mb-6">
                <label
                  htmlFor="departure-time"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Expected Departure Time
                </label>
                <input
                  id="departure-time"
                  type="time"
                  placeholder="Expected Departure Time"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
              </div>
              <hr className="ext-base font-medium text-gray-900 mt-5 mb-5 border-gray-200" />
              {selectedSiteLocation ? (
                <p>
                  <div className="mt-2.5">
                    Selected Location: {selectedSiteLocation}
                  </div>
                </p>
              ) : (
                <p>Select Location</p>
              )}

              <div class="flex justify-center space-x-8 rounded-lg px-8 pb-8">
                <div class="font-semibold tracking-tight text-gray-550">
                  <div class="mt-8">
                    <button
                      onClick={(e) => handleSiteLocationChange("Vehicle Plant")}
                      class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                      role="button"
                    >
                      Vehicle Plant
                    </button>
                  </div>
                </div>

                <div class="font-semibold tracking-tight text-gray-550">
                  <div class="mt-8">
                    <button
                      title=""
                      value="Battery Plant"
                      onClick={(e) => handleSiteLocationChange("Battery Plant")}
                      class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                      role="button"
                    >
                      Battery Plant
                    </button>
                  </div>
                </div>
              </div>

              <hr className="mt-5 mb-5 border-gray-200" />
              <div>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
          <div>
            <img className="w-full mx-auto" src="/auth/m3.png" alt="" />

            <div className="w-full max-w-md mx-auto xl:max-w-xl">
              <h3 className="text-2xl font-bold text-center text-black">
                Signing Up Vistors Authorized by Mercedes
              </h3>

              <p className="leading-relaxed text-center text-gray-500 mt-2.5">
                This form is for signing up vistors authorized to work on
                premise by Mercedes. To sign up a Employee, please use the
                'Users' tab on the side panel.
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

export default VendorForm;
