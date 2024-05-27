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

export default function TodoPage() {
  // Use custom context to access value.
  const { isDark } = useContext(DarkModeContext);
  const { token, setCurrentUser } = useContext(AuthContext);
  const { todo, setTodo, todoList, setTodoList, updateTodoList } =
    useContext(TodoContext);

  useEffect(() => {
    if (token) {
      const fetchData = () => {
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
            console.log(userInfo);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchData();
    }
  }, []);

    useEffect(() => {
      // GET api
      axiosInstance
        .get(taskUrl, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // console.log(response.data);
          updateTodoList(response.data);

          console.log(todoList);
        })
        .catch((error) => console.log(error));
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
