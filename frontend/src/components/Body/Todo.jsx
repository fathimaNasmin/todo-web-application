import styles from "./todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon,faSun } from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";
import { useState, useContext } from "react";
import { DarkModeContext } from "../Hooks/useDarkMode";
import { TodoContext } from "../Hooks/todoContext";

export default function Todo() {
  const [inputError, setInputError] = useState("");
  const {isDark, toggleDarkMode} = useContext(DarkModeContext);
  const {todo, setTodo, todoList, setTodoList} = useContext(TodoContext)

  const validateTodoForm = () => {
    // if (todo.name.length < 3) {
    //   setInputError("Task name should have more than 3 characters");
    //   return false;
    // }
    // return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateTodoForm()) {
      setInputError("");
      setTodoList([...todoList, todo]);
      setTodo({ name: ""});
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
              ...todo,
              name: e.target.value,
            });
          }}
        />
        {inputError ? <p className={styles.errorTag}>{inputError}</p> : ""}
      </form>
    </div>
  );
}
