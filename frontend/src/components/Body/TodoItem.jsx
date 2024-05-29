import styles from "./todoitem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ReactTimeAgo from "react-time-ago";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Hooks/authContext";
import { TodoContext } from "../Hooks/todoContext";
import axiosInstance from "../../api";
import { taskUrl } from "../../urls";

export default function TodoItem({ item }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // state for checkbox
  //   useRef hook to get the div's id from DOM
  const parentNodeRef = useRef(null);
  const { token } = useContext(AuthContext);
  const { todoList, setTodoList, updateTodoList } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState({});

  // API :DELETE -> deletes task
  const sendDeleteRequest = (id) => {
    axiosInstance
      .delete(`${taskUrl}${id}/`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  // API :PATCH request on edit
  const sendPatchRequest = (id, valueObj) => {
    axiosInstance
      .patch(`${taskUrl}${id}/`, valueObj, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleEditTodo = (e) => {
    const id = parentNodeRef.current.id;
    const updatedValue = e.target.value;

    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, name: updatedValue };
      }
      return item;
    });
    setTodoList(updatedTodoList);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      const id = parentNodeRef.current.id;
      const updatedValue = e.target.value;
      sendPatchRequest(id, { name: updatedValue });
    }
  };

  const handleOnBlur = (e) => {
    setIsEditing(false);
    const updatedValue = e.target.value;
    const id = parentNodeRef.current.id;
    sendPatchRequest(id, { name: updatedValue });
  };

  const handleDelete = (e) => {
    const id = parentNodeRef.current.id;
    const newtodoList = todoList.filter((item) => item.id != id);
    setTodoList(newtodoList);
    sendDeleteRequest(id);
  };

  const handleCheckbox = () => {
    let doneStatus;
    const id = parentNodeRef.current.id;
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        doneStatus = item.done;
        return { ...item, done: !doneStatus };
      }
      return item;
    });
    setTodoList(updatedTodoList);
    setIsChecked(!isChecked);
    sendPatchRequest(id, { done: !doneStatus });
  };

  const latestUpdateTime = (created_on, updated_on) => {
    const createdDate = new Date(created_on);
    const updatedDate = new Date(updated_on);
    if (createdDate < updatedDate) {
      // console.log("updated date");
      return {tag:'Updated', date:updated_on};
    } else {
      // console.log("created date")
      return {tag:'Created', date:created_on};
    }
  };
  // console.log(latestUpdateTime("2024-05-29T15:41:26.482682Z", "2024-05-29T15:42:23.753319Z"));
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
            onKeyDown={handleKeyDown}
            onBlur={handleOnBlur}
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
          {latestUpdateTime(item.created_on, item.updated_on).tag}{'  '}
          <ReactTimeAgo
            date={latestUpdateTime(item.created_on, item.updated_on).date}
            locale="en-US"
          />
        </p>
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
