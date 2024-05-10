import styles from "./todolist.module.css";

import TodoItem from './TodoItem';

export default function TodoList({ todoList }) {
  return (
    <div className={styles.todoListContainer}>
      {/* list out the todos */}
      <div className={styles.todoListContent}>
        {todoList.map((item, index) => (
          <TodoItem key={index} item={item}/>
        ))}
      </div>
      {/* footer */}
      <div className={styles.menuItems}>
        <p>5 items left</p>
        <p>All</p>
        <p>Active</p>
        <p>Completed</p>
        <p>Clear all</p>
      </div>
    </div>
  );
}
