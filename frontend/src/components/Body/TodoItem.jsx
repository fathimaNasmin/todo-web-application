import styles from "./todoitem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ReactTimeAgo from "react-time-ago";
import { useState } from "react";

export default function TodoItem({
  item,
  todoList,
  setTodoList,
  todo,
  setTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (e) => {
    const id = e.currentTarget.parentNode.id;
    const newtodoList = todoList.filter((item) => item.id != id);
    setTodoList(newtodoList);
  };

  const handleEditTodo = (e) => {
    const id = e.currentTarget.parentNode.parentNode.id;
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, name: e.target.value };
      }
      return item;
    });
    setTodoList(updatedTodoList);
  };

  return (
    <div id={item.id} className={styles.todoItem}>
      <input className={styles.checkbox} type="checkbox" />
      <div className={styles.itemContent}>
        {isEditing ? (
          <input
            value={item.name}
            onChange={handleEditTodo}
            onKeyDown={(e) => {
              e.key === "Enter" ? setIsEditing(false) : null;
            }}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <label
            onClick={() => {
              setIsEditing(true);
            }}
          >
            {item.name}
          </label>
        )}

        <p>
          created <ReactTimeAgo date={item.createdAt} locale="en-US" />
        </p>
      </div>

      <button onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrashCan} size="xs" />
      </button>
    </div>
  );
}
