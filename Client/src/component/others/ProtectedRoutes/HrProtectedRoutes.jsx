import React from "react";
import { Outlet } from "react-router-dom";

const HrProtectedRoutes = () => {
  return (
    <div className="flex h-full gap-8 hr-protected-routes-container">
      <Outlet />
    </div>
  );
};

export default HrProtectedRoutes;
