import React from "react";
import UserStatusGrid from "./UserStatusGrid";

const StatusTable = () => {
  return (
    <div className="flex justify-center space-x-2">
      {/* Replace '123' with the actual userid */}
      <UserStatusGrid userid="123" />
    </div>
  );
};

export default StatusTable;
