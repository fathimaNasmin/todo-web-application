import "./App.css";
import Body from "./components/Body/Body";
import Footer from "./components/Body/Footer";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  return (
    <>
      <div className="container">
        <Body />
        <Footer />
      </div>
    </>
  );
}

export default App;
