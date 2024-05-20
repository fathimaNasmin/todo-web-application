import Body from "../../Body/Body";
import Footer from "../../Body/Footer";
import '../../../App.css';
export default function TodoPage({ isDark, setIsDark }) {
  return (
    <>
      <div className="base" data-theme={isDark ? "dark" : "light"}>
        <div className="container">
          <Body isDark={isDark} setIsDark={setIsDark} />
          <Footer />
        </div>
      </div>
    </>
  );
}