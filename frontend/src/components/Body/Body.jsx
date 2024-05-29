import { useEffect, useState } from "react";
import styles from "./body.module.css";
import Todo from "./Todo";
import TodoList from "./TodoList";

export default function Body() {

  // useEffect(() => {
  //   setFilteredTodoList(todoList);
  // }, [todoList]);

  return (
    <div className={styles.bodyContainer}>
      <Todo />
      <TodoList />
    </div>
  );
}
