import { useState } from 'react';
import styles from './body.module.css'
import Todo from './Todo'
import TodoList from './TodoList'

export default function Body(){
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
    return (
      <div className={styles.bodyContainer}>
        <Todo
          todo={todo}
          setTodo={setTodo}
          todoList={todoList}
          setTodoList={setTodoList}
        />
        <TodoList todoList={todoList} />
      </div>
    );
}