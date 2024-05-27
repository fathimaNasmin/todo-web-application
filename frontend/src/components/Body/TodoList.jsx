import styles from "./todolist.module.css";

import TodoItem from "./TodoItem";
import Menu from "./Menu";
import { useEffect, useContext } from "react";
import { TodoContext } from "../Hooks/todoContext";
import axiosInstance from "../../api";
import {taskUrl } from "../../urls";
import { AuthContext } from "../Hooks/authContext";


export default function TodoList() {
  const { todoList,updateTodoList  } = useContext(TodoContext);
   const { token, setCurrentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   const sortedData = todoList.sort((a, b) => {
  //     if (a.done !== b.done) {
  //       return a.done - b.done;
  //     }
  //     return b.createdAt - a.createdAt;
  //   });
  //   setFilteredTodoList(sortedData);
  // }, [todoList]);


  return (
    <div className={styles.todoListContainer}>
      {/* list out the todos */}
      <div className={styles.todoListContent}>
        {todoList.length <= 0 ? (
          <h1>No task</h1>
        ) : (
          todoList.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
            />
          ))
        )}
      </div>

      {/* footer */}
      <Menu />
    </div>
  );
}
