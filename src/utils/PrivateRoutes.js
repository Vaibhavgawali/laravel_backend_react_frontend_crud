import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  let auth = { token: token };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
