import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
