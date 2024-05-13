import styles from "./todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon,faSun } from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";
import { useState } from "react";

export default function Todo({ todo, setTodo, todoList, setTodoList, isDark, setIsDark }) {
  const [inputError, setInputError] = useState("");
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
      setInputError("");
      setTodoList([...todoList, todo]);
      setTodo({ id: "", name: "", done: false, createdAt: new Date() });
    }
  };
  return (
    <div className={styles.todoContainer}>
      <div className={styles.heading}>
        <p>T O D O</p>
        <button
          onClick={() => {
            console.log(isDark);
            setIsDark(!isDark);
          }}
        >
          {isDark ? (
            <FontAwesomeIcon icon={faSun} className={styles.lightIcon}/>
          ) : (
            <FontAwesomeIcon icon={faMoon} inverse />
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
              id: shortid.generate(),
              name: e.target.value,
              createdAt: new Date(),
            });
          }}
        />
        {inputError ? <p className={styles.errorTag}>{inputError}</p> : ""}
      </form>
    </div>
  );
}
