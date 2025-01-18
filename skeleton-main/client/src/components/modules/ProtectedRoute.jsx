import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, userId }) => {
  if (!userId) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute; 