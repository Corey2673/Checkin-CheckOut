import React, { useState, useEffect } from "react";
import dateFormat from "../../utils/dateFormat";
import autoID from "../../utils/autoID";
import TimePicker from "react-time-picker";

const DurationInput = (props) => {
  const { data, siteLocation } = props;

  const [shiftDuration, setShiftDuration] = useState(8); // Default to 8 hours
  const [departureTime, setDepartureTime] = useState("");
  const [phone, setPhone] = useState(""); // State for phone number
  const [escort, setEscort] = useState(""); // State for escort
  const [escorts, setEscorts] = useState([]); // State for escort dropdown options

  useEffect(() => {
    const existingClockActions =
      JSON.parse(localStorage.getItem("clock_data")) || [];
    const filteredEscorts = existingClockActions
      .filter((entry) => entry.timestampOUT === null)
      .map((entry) => entry.firstname + " " + entry.lastname);
    const uniqueEscorts = [...new Set(filteredEscorts)];
    setEscorts(uniqueEscorts);
  }, []);

  const handleSubmit = (
    userID,
    clockID,
    firstname,
    lastname,
    role,
    siteLocation,
    timestampIN,
    timestampOUT,
    employmentstatus,
    phone,
    departureTime,
    escort,
    company,
    LOGIN_ID,
    SP_CODE,
    NANCODE,
    ACTIVITY,
    ATT_TYPE,
    LINE_NO,
    OT_ID,
    CUSTOMER_NAME,
    TEAM_NAME // Include escort in the handleSubmit parameters
  ) => {
    const clockData = {
      userID,
      clockID,
      firstname,
      lastname,
      role,
      siteLocation,
      timestampIN,
      timestampOUT,
      employmentstatus,
      phone,
      departureTime,
      escort,
      company,
      LOGIN_ID,
      SP_CODE,
      NANCODE,
      ACTIVITY,
      ATT_TYPE,
      LINE_NO,
      OT_ID,
      CUSTOMER_NAME,
      TEAM_NAME, // Include escort in the clockData
    };

    const existingClockActions =
      JSON.parse(localStorage.getItem("clock_data")) || [];
    const updatedClockActions = [...existingClockActions, clockData];
    localStorage.setItem("clock_data", JSON.stringify(updatedClockActions));

    setPhone(""); // Reset phone state
    setEscort(""); // Reset escort state
    console.log(clockData);
    window.location.reload();
  };

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20 xl:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-x-20 gap-y-12">
          <div className="lg:order-2 lg:col-span-4">
            <div className="max-w-lg lg:max-w-none">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:pr-8">
                {data.firstname} {data.lastname}
              </h2>
              <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:pr-24 lg:leading-8">
                <h4 className="text-3xl font-semibold tracking-tight text-gray-550 sm:text-4xl lg:text-3xl lg:pr-8">
                  {data.role}
                </h4>
                <hr className="mt-5 mb-10 border-gray-200" />

                <div className="max-w-md mx-auto">
                  <form className="bg-white rounded-lg px-8 pt-6 pb-8 mb-4 drop-shadow-2xl shadow-zinc-900">
                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                      Visitor Onsite Details
                    </h2>

                    {shiftDuration && (
                      <>
                        <div>
                          <label
                            htmlFor="phone"
                            className="text-base font-medium text-gray-900"
                          >
                            Contact Number
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="tel" // Use type="tel" for phone numbers
                              name="phone"
                              value={phone} // Bind value to state
                              onChange={(e) => setPhone(e.target.value)} // Update phone state
                              placeholder="Enter your Contact Number"
                              className="block w-full p-4 mb-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                              required
                            />
                          </div>
                        </div>

                        {data.role === "Vendor" && (
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
                                {escorts.map((escortName, index) => (
                                  <option key={index} value={escortName}>
                                    {escortName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

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
                      </>
                    )}
                    {shiftDuration && phone && (
                      <div className="flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() =>
                            handleSubmit(
                              data.userID,
                              autoID(),
                              data.firstname,
                              data.lastname,
                              data.role,
                              siteLocation,
                              dateFormat(),
                              null,
                              data.employeestatus,
                              phone,
                              departureTime,
                              escort,
                              data.company,
                              data.LOGIN_ID,
                              data.SP_CODE,
                              data.NANCODE,
                              data.ACTIVITY,
                              data.ATT_TYPE,
                              data.LINE_NO,
                              data.OT_ID,
                              data.CUSTOMER_NAME,
                              data.TEAM_NAME // Pass escort to handleSubmit
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </p>
            </div>
            <div className="mt-14">
              <a
                title=""
                className="text-sm font-semibold text-red-600 transition-all duration-200 hover:text-blue-800 hover:underline"
                href="#"
              >
                {""}
                Click here to exit
              </a>
            </div>
          </div>

          <div className="grid p-12 bg-blue-100 lg:order-1 lg:col-span-3 rounded-3xl place-items-center">
            <img
              className="w-full shadow-xl rounded-xl sm:max-w-xs"
              src="/auth/computacenter.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DurationInput;
