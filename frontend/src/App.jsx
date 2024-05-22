import "./App.css";
import Body from "./components/Body/Body";
import Footer from "./components/Body/Footer";
import TimeAgo from "javascript-time-ago";
import "./global.css";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import useLocalStorage from "use-local-storage";
import Signup from "./components/Body/Signup";
import TodoPage from "./components/pages/TodoPage/TodoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeContext, useDarkMode } from "./components/Hooks/useDarkMode";
import { AuthContext, useAuthContext } from "./components/Hooks/authContext";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  // use the custom hook to get the values.
  const { isDark, toggleDarkMode } = useDarkMode();
  // use the custom auth context hook to check user is authenticated or not.
  const { isAuthenticated, token, setAuth } = useAuthContext();
  return (
    <>
      <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
        <AuthContext.Provider value={{ isAuthenticated, token, setAuth }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/todopage" element={<TodoPage />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </DarkModeContext.Provider>
    </>
  );
}

export default App;
