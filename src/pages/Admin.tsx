
import React from "react";
import { Navigate } from "react-router-dom";

const Admin = () => {
  // Redireciona para o dashboard do admin
  return <Navigate to="/admin/dashboard" replace />;
};

export default Admin;
