import styles from "./todolist.module.css";

import TodoItem from "./TodoItem";
import Menu from "./Menu";
import { useEffect } from "react";

export default function TodoList({
  todoList,
  setTodoList,
  filteredTodoList,
  setFilteredTodoList,
}) {
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
          filteredTodoList.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              todoList={todoList}
              setTodoList={setTodoList}
            />
          ))
        )}
      </div>
      {/* footer */}
      <Menu todoList={todoList} setTodoList={setTodoList} setFilteredTodoList={setFilteredTodoList}/>
    </div>
  );
}
