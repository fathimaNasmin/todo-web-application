import styles from "./todolist.module.css";

import TodoItem from "./TodoItem";

export default function TodoList({ todoList, setTodoList, todo, setTodo }) {
  const data = todoList.sort((a, b) => {
    if(a.done !== b.done){
      return a.done - b.done;
    }
    return b.createdAt - a.createdAt;
  });

  return (
    <div className={styles.todoListContainer}>
      {/* list out the todos */}
      <div className={styles.todoListContent}>
        {data.length <= 0 ? (
          <h1>No task</h1>
        ) : (
          data.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              todoList={todoList}
              setTodoList={setTodoList}
              todo={todo}
              setTodo={setTodo}
            />
          ))
        )}
      </div>
      {/* footer */}
      <div className={styles.menuItems}>
        <label>
          Total:{todoList.length} {todoList.length > 1 ? "items" : "item"}
        </label>
        <p>All</p>
        <p>Active</p>
        <p>Completed</p>
        <p>Clear all</p>
      </div>
    </div>
  );
}
