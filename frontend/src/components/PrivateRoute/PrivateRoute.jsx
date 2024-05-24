import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Hooks/authContext";
import { useContext } from "react";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/" />;
}
