import styles from "./todoitem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ReactTimeAgo from "react-time-ago";
import { useRef, useState } from "react";

export default function TodoItem({
  item,
  todoList,
  setTodoList,
  todo,
  setTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // state for checkbox
  //   useRef hook to get the div's id from DOM
  const parentNodeRef = useRef(null);

  const handleDelete = (e) => {
    const id = parentNodeRef.current.id;
    const newtodoList = todoList.filter((item) => item.id != id);
    setTodoList(newtodoList);
  };

  const handleEditTodo = (e) => {
    const id = parentNodeRef.current.id;
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, name: e.target.value };
      }
      return item;
    });
    setTodoList(updatedTodoList);
  };

  const handleCheckbox = () =>{
    const id = parentNodeRef.current.id;
    const updatedTodoList = todoList.map((item)=>{
        if (item.id === id){
            return {...item, done:!item.done}
        }
        return item;
    })
    setTodoList(updatedTodoList);
    setIsChecked(!isChecked);
  }

  return (
    <div id={item.id} className={styles.todoItem} ref={parentNodeRef}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckbox}
      />
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
