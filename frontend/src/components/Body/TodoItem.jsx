import styles from "./todoitem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ReactTimeAgo from "react-time-ago";

export default function TodoItem({ item }) {
    const day = item.createdAt.getDate();
    const month = item.createdAt.getMonth() + 1; // Adding 1 to get the correct month number
    const year = item.createdAt.getFullYear();
  return (
    <div className={styles.todoItem}>
      <input className={styles.checkbox} type="checkbox" />
      <div className={styles.itemContent}>
        <label>{item.name}</label>
        <p>created on:<ReactTimeAgo date={item.createdAt} locale="en-US"/></p>
      </div>

      <button>
        <FontAwesomeIcon icon={faTrashCan} size="xs" />
      </button>
    </div>
  );
}
