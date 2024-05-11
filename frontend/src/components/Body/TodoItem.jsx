import styles from "./todoitem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ReactTimeAgo from "react-time-ago";

export default function TodoItem({ item, todoList, setTodoList}) {
  const day = item.createdAt.getDate();
  const month = item.createdAt.getMonth() + 1; // Adding 1 to get the correct month number
  const year = item.createdAt.getFullYear();

  function handleDelete(e) {
    const id = e.currentTarget.parentNode.id;
    const newtodoList = todoList.filter((item)=>item.id != id)
    setTodoList(newtodoList);
  }
  return (
    <div id={item.id} className={styles.todoItem}>
      <input className={styles.checkbox} type="checkbox" />
      <div className={styles.itemContent}>
        <label>{item.name}</label>
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
