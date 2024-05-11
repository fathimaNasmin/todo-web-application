import styles from "./todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";

export default function Todo({ todo, setTodo, todoList, setTodoList }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList([...todoList, todo]);
    setTodo({ id: "", name: "", done: false, createdAt: new Date() });
  };
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
          value={todo.name}
          onChange={(e) => {
            setTodo({
              ...todo,
              id: shortid.generate(),
              name: e.target.value,
              createdAt: new Date(),
            });
          }}
        />
      </form>
    </div>
  );
}
