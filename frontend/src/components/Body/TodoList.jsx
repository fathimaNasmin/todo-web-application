import styles from "./todolist.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function TodoList() {
  return (
    <div className={styles.todoListContainer}>
      {/* list out the todos */}
      <div className={styles.todoListContent}>
        <table>
          <tbody>
            <tr>
              <td>
                <input className={styles.checkbox} type="checkbox" />
                <label>Alfreds Futterkiste</label>
                <button>
                  <FontAwesomeIcon icon={faTrashCan} size="xs"/>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
