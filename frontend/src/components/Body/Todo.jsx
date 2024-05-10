import styles from "./todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
export default function Todo({ todo, setTodo, todoList, setTodoList }) {
  const handleSubmit = (e) =>{
    e.preventDefault();
    setTodoList([...todoList, todo])
    setTodo("")
    console.log(todoList);
  }
  return (
    <div className={styles.todoContainer}>
      <div className={styles.heading}>
        <p>T O D O</p>
        <button>
          <FontAwesomeIcon icon={faMoon} inverse />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new Task"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
