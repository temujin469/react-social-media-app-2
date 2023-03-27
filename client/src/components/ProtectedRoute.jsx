import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuth = useSelector((state) => state.token);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
