import React, { useState, useEffect } from "react";
import AddUserForm from "../../components/forms/AddUserForm";

export default function AddUser() {
  return (
    <div className="container mx-auto bg-gray-100 flex items-center justify-center ">
      <div className=" bg-white rounded-md shadow-md">
        <AddUserForm></AddUserForm>
      </div>
    </div>
  );
}
