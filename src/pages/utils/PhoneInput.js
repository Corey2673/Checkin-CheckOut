import React from "react";
import InputMask from "react-input-mask";

const PhoneInput = ({ value, onChange }) => {
  return (
    <InputMask
      className="block w-full p-4 mb-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
      mask="(999) 999-9999"
      value={value}
      onChange={onChange}
    >
      {() => <input type="text" placeholder="(205) 555-5555" />}
    </InputMask>
  );
};

export default PhoneInput;
