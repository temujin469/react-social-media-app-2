import useToken from "hooks/useToken";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuth = Boolean(useToken());

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
