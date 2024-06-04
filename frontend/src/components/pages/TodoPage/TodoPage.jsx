import Body from "../../Body/Body";
import Footer from "../../Body/Footer";
import Navbar from "../../Body/Navbar";
import "../../../App.css";
import { DarkModeContext } from "../../Hooks/useDarkMode";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../api";
import { userInfoUrl, taskUrl } from "../../../urls";
import { AuthContext } from "../../Hooks/authContext";
import { TodoContext } from "../../Hooks/todoContext";

export const getAllTodos = (token,setTodoList) => {
  // GET api
  axiosInstance
    .get(taskUrl, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      setTodoList(response.data);
    })
    .catch((error) => console.log(error));
};

export default function TodoPage() {
  // Use custom context to access value.
  const { isDark } = useContext(DarkModeContext);
  const { token, setCurrentUser } = useContext(AuthContext);
  const { setTodoList } =
    useContext(TodoContext);

  useEffect(() => {
    if (token) {
      const fetchUserData = () => {
        // api request with token to get user info
        axiosInstance
          .get(userInfoUrl, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            let userInfo = response.data;
            setCurrentUser(userInfo);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    getAllTodos(token, setTodoList);
  }, []);

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
