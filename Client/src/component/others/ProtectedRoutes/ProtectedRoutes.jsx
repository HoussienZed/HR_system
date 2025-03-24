import React from "react";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  return (
    <div className="flex h-full w-full">
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
