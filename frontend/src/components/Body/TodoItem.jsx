import styles from "./todoitem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ReactTimeAgo from "react-time-ago";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Hooks/authContext";
import axiosInstance from '../../api'
import { taskUrl } from "../../urls";

export default function TodoItem({ item }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // state for checkbox
  //   useRef hook to get the div's id from DOM
  const parentNodeRef = useRef(null);
  const {token} = useContext(AuthContext)

  useEffect(()=>{
    
  },[])

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

  const handleCheckbox = () => {
    const id = parentNodeRef.current.id;
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setTodoList(updatedTodoList);
    setIsChecked(!isChecked);
  };

  return (
    <div id={item.id} className={styles.todoItem} ref={parentNodeRef}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={item.done}
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

        {/* <p>
          created <ReactTimeAgo date={item.created_on} locale="en-US" />
        </p> */}
      </div>

      <button onClick={handleDelete}>
        <FontAwesomeIcon
          icon={faTrashCan}
          size="xs"
          transform="grow-7"
          className={styles.trashIcon}
        />
      </button>
    </div>
  );
}
