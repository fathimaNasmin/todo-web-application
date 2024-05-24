import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Hooks/authContext";

export default function AutoRedirect() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todopage", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return null;
}


