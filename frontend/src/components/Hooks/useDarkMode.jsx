import { useState, useEffect,createContext } from "react";

export const DarkModeContext = createContext();

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    // Get Initial value from local storage or default value to false
    const storedValue = localStorage.getItem("isDark");
    const initialValue = JSON.parse(storedValue) || false;
    return initialValue;
  });

  // set the value in state and local storage
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleDarkMode };
};
