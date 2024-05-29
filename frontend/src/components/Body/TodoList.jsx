import styles from "./todolist.module.css";

import TodoItem from "./TodoItem";
import Menu from "./Menu";
import { useEffect, useContext, useState } from "react";
import { TodoContext } from "../Hooks/todoContext";
import axiosInstance from "../../api";
import { taskUrl } from "../../urls";
import { AuthContext } from "../Hooks/authContext";

export default function TodoList() {
  const { todoList } = useContext(TodoContext);
  const { token, setCurrentUser } = useContext(AuthContext);
  const [filteredTodoList, setFilteredTodoList] = useState([]);

  useEffect(() => {
    const sortedData = todoList.sort((a, b) => {
      if (a.done !== b.done) {
        return a.done - b.done;
      }
      return b.createdAt - a.createdAt;
    });
    setFilteredTodoList(sortedData);
  }, [todoList]);

  return (
    <div className={styles.todoListContainer}>
      {/* list out the todos */}
      <div className={styles.todoListContent}>
        {todoList.length <= 0 ? (
          <h1>No task</h1>
        ) : (
          filteredTodoList.map((item) => <TodoItem key={item.id} item={item} />)
        )}
      </div>

      {/* footer */}
      <Menu filteredTodoList={filteredTodoList} setFilteredTodoList={setFilteredTodoList}/>
    </div>
  );
}
