import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// auth token -> local storage
// set isAUthenticated = true

export const useAuthContext = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken !== null || authToken !== undefined) {
      try {
        const storedValue = JSON.parse(authToken);
        if (storedValue) {
          setIsAuthenticated(true);
          setToken(storedValue);
        }
      } catch (error) {
        console.log("Failed to parse: ", error);
      }
    }
  }, []);

  // Function to set state and token
  const setAuth = (newToken, newIsAuthenticated = true) => {
    if (newToken) {
      localStorage.setItem("authToken", JSON.stringify(newToken));
    } else {
      localStorage.removeItem("authToken"); // clear token on logout
    }
    setIsAuthenticated(newIsAuthenticated);
    setToken(newToken);
  };

  return { isAuthenticated, token, setAuth };
};
