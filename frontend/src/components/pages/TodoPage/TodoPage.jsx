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
  const { token, setCurrentUser, currentUser } = useContext(AuthContext);

  useEffect(()=>{
    const rawToken = token;
    // Remove the quotes from the token
    const cleanedToken = rawToken.replace(/["']/g, "");

    // Format the token by adding 'Token ' prefix
    const formattedToken = `Token ${cleanedToken}`;
    
    // api request with token to get user info
    axiosInstance
      .get(userInfoUrl, {
        headers: {
          'Authorization': formattedToken,
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