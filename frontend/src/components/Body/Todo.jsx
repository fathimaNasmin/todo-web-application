import styles from "./todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
export default function Todo() {
  return (
    <div className={styles.todoContainer}>
      <div className={styles.heading}>
        <p>T O D O</p>
        <button>
          <FontAwesomeIcon icon={faMoon} inverse />
        </button>
      </div>
      <input type="text" placeholder="Add new Task" />
    </div>
  );
}
