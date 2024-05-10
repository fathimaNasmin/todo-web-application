import styles from './todoitem.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function TodoItem({item}){
    return (
      <div className={styles.todoItem}>
        <input className={styles.checkbox} type="checkbox" />
        <label>{item}</label>
        <button>
          <FontAwesomeIcon icon={faTrashCan} size="xs" />
        </button>
      </div>
    );
}