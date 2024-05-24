import Body from "../../Body/Body";
import Footer from "../../Body/Footer";
import Navbar from "../../Body/Navbar";
import '../../../App.css';
import { DarkModeContext } from "../../Hooks/useDarkMode";
import { useContext, useEffect } from "react";
import axiosInstance from '../../../api';
import {userInfoUrl} from '../../../urls'
import { AuthContext } from "../../Hooks/authContext";

export default function TodoPage() {
  // Use custom context to access value.
  const {isDark} = useContext(DarkModeContext);
  const { token, setCurrentUser } = useContext(AuthContext);

  useEffect(()=>{
    // api request with token to get user info
    axiosInstance
      .get(userInfoUrl, {
        headers: {
          'Authorization': token,
        },
      })
      .then((response) => {
        let userInfo = response.data;
        setCurrentUser(userInfo)
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  return (
    <>
      <div className="base" data-theme={isDark ? "dark" : "light"}>
        <div className="container">
          <Navbar />
          <Body />
          <Footer />
        </div>
      </div>
    </>
  );
}