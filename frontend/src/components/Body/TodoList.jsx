import styles from "./todolist.module.css";
export default function TodoList() {
  return (
    <div className={styles.todoListContainer}>
      {/* list out the todos */}
      <div className={styles.todoListContent}>
        <table>
          <tr>
            <td>
              <input className={styles.checkbox} type="checkbox" />
              <label htmlFor="">Alfreds Futterkiste</label>
              <button>
                <i class="fa-solid fa-trash-can fa-xs"></i>
              </button>
            </td>
          </tr>
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
