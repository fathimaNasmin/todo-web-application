import Body from "../../Body/Body";
import Footer from "../../Body/Footer";
import '../../../App.css';
import { DarkModeContext } from "../../Hooks/useDarkMode";
import { useContext } from "react";

export default function TodoPage() {
  // Use custom context to access value.
  const {isDark} = useContext(DarkModeContext);

  return (
    <>
      <div className="base" data-theme={isDark ? "dark" : "light"}>
        <div className="container">
          <Body />
          <Footer />
        </div>
      </div>
    </>
  );
}