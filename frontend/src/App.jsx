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

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  // use the custom hook to get the values.
  const { isDark, toggleDarkMode } = useDarkMode();
  return (
    <>
      <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route
              path="/todopage"
              element={<TodoPage />}
            />
          </Routes>
        </BrowserRouter>
      </DarkModeContext.Provider>
    </>
  );
}

export default App;
