import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    // console.log(typeof authToken);
    if (authToken !== null && authToken !== undefined && authToken.length > 0) {
      setIsAuthenticated(true);
      setToken(authToken);
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

  return { isAuthenticated, token, setAuth, setCurrentUser, currentUser };
};

// AuthProvider to wrap around the component tree
export const AuthProvider = ({ children }) => {
  const auth = useAuthContext();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
