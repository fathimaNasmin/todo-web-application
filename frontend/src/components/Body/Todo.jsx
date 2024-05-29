import styles from "./todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";
import { useState, useContext } from "react";
import { DarkModeContext } from "../Hooks/useDarkMode";
import { TodoContext } from "../Hooks/todoContext";
import axiosInstance from "../../api";
import { taskUrl } from "../../urls";
import { AuthContext } from "../Hooks/authContext";
import { getAllTodos } from "../pages/TodoPage/TodoPage";

export default function Todo() {
  const [inputError, setInputError] = useState("");
  const { isDark, toggleDarkMode } = useContext(DarkModeContext);
  const { todo, setTodo, setTodoList } =
    useContext(TodoContext);
  const { token } = useContext(AuthContext);

  const validateTodoForm = () => {
    if (todo.name.length < 3) {
      setInputError("Task name should have more than 3 characters");
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateTodoForm()) {
      const data = todo;
      // Call POST on task url
      axiosInstance
        .post(taskUrl, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setTodo({ name: "" });
          getAllTodos(token, setTodoList);
        })
        .catch((error) => {
          console.log(error);
        });
      setInputError("");
    }
  };
  return (
    <div className={styles.todoContainer}>
      <div className={styles.heading}>
        <p>T O D O</p>
        <button
          onClick={() => {
            toggleDarkMode();
          }}
        >
          {isDark ? (
            <FontAwesomeIcon
              icon={faSun}
              transform="grow-7"
              className={styles.lightIcon}
            />
          ) : (
            <FontAwesomeIcon icon={faMoon} transform="grow-7" inverse />
          )}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new Task"
          value={todo.name}
          onChange={(e) => {
            setInputError("");
            setTodo({
              name: e.target.value,
            });
          }}
        />
        {inputError ? <p className={styles.errorTag}>{inputError}</p> : ""}
      </form>
    </div>
  );
}
