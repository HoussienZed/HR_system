import React from "react";
import { Outlet } from "react-router-dom";

const HrProtectedRoutes = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default HrProtectedRoutes;
