import { useEffect, useState } from "react";
import styles from "./body.module.css";
import Todo from "./Todo";
import TodoList from "./TodoList";

export default function Body() {
  const [todo, setTodo] = useState({
    id: "",
    name: "",
    done: false,
    createdAt: new Date(),
  });
  const [todoList, setTodoList] = useState([]);
  const [filteredTodoList, setFilteredTodoList] = useState([]);

  useEffect(() => {
    setFilteredTodoList(todoList);
  }, [todoList]);

  return (
    <div className={styles.bodyContainer}>
      <Todo
        todo={todo}
        setTodo={setTodo}
        todoList={todoList}
        setTodoList={setTodoList}
      />
      <TodoList
        todoList={todoList}
        setTodoList={setTodoList}
        todo={todo}
        setTodo={setTodo}
        filteredTodoList={filteredTodoList}
        setFilteredTodoList={setFilteredTodoList}
      />
    </div>
  );
}
