import "./App.css";
import TimeAgo from "javascript-time-ago";
import "./global.css";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import Signup from "./components/Body/Signup";
import TodoPage from "./components/pages/TodoPage/TodoPage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { DarkModeContext, useDarkMode } from "./components/Hooks/useDarkMode";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./components/Hooks/authContext";
import AutoRedirect from "./components/AutoRedirect/AutoRedirect";
import { TodoProvider } from "./components/Hooks/todoContext";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <>
      <AuthProvider>
        <TodoProvider>
          <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
            <BrowserRouter>
              <AutoRedirect />
              <Routes>
                <Route path="/" element={<Signup />} />
                <Route
                  path="/todopage"
                  element={
                    <PrivateRoute>
                      <TodoPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </DarkModeContext.Provider>
        </TodoProvider>
      </AuthProvider>
    </>
  );
}

export default App;
