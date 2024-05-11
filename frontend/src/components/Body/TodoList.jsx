import styles from "./todolist.module.css";

import TodoItem from "./TodoItem";
import { useEffect } from "react";

export default function TodoList({
  todoList,
  setTodoList,
  todo,
  setTodo,
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
    console.log(todoList);
  }, [todoList]);

  const handleMenu = (e) => {
    let current = e.target.textContent;
    if (current === "All") {
      setFilteredTodoList(todoList);
    }
    if (current === "Active") {
      let activeItems = todoList.filter((item) => item.done === false);
      setFilteredTodoList(activeItems);
    }
    if (current === "Completed") {
      let completedItems = todoList.filter((item) => item.done === true);
      setFilteredTodoList(completedItems);
    }
    if (current === "Clear all") {
      setTodoList([]);
      setFilteredTodoList([]);
    }
  };

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
      <div className={styles.menuItems}>
        <label>
          Total:{todoList.length} {todoList.length > 1 ? "items" : "item"}
        </label>
        <p onClick={handleMenu}>All</p>
        <p onClick={handleMenu}>Active</p>
        <p onClick={handleMenu}>Completed</p>
        <p onClick={handleMenu}>Clear all</p>
      </div>
    </div>
  );
}
