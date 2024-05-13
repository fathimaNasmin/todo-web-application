import "./App.css";
import Body from "./components/Body/Body";
import Footer from "./components/Body/Footer";
import TimeAgo from "javascript-time-ago";
import './global.css'
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import { useState } from "react";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <div className="base" data-theme={isDark ? "dark" : "light"}>
        <div className="container">
          <Body isDark={isDark} setIsDark={setIsDark}/>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
