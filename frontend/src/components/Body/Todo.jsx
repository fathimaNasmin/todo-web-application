import styles from "./todo.module.css";
export default function Todo() {
  return (
    <div className={styles.todoContainer}>
      <div className={styles.heading}>
        <p>T O D O</p>
        <button>
          <i class="fa-solid fa-moon"></i>
        </button>
      </div>
      <input type="text" placeholder="Add new Task" />
    </div>
  );
}
