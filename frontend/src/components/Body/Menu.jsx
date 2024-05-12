import { useRef } from "react";
import styles from "./menu.module.css";
export default function Menu({ todoList, setTodoList, setFilteredTodoList }) {
  const allRef = useRef(null);
  const activeRef = useRef(null);
  const completedRef = useRef(null);
  const clearRef = useRef(null);

  const handleMenu = (e) => {
    let current = e.target.textContent;
    if (current === "All") {
      allRef.current.classList.add(styles.selectedMenu);
      activeRef.current.classList.remove(styles.selectedMenu);
      completedRef.current.classList.remove(styles.selectedMenu);
      clearRef.current.classList.remove(styles.selectedMenu);
      setFilteredTodoList(todoList);
    }
    if (current === "Active") {
      allRef.current.classList.remove(styles.selectedMenu);
      activeRef.current.classList.add(styles.selectedMenu);
      completedRef.current.classList.remove(styles.selectedMenu);
      clearRef.current.classList.remove(styles.selectedMenu);
      let activeItems = todoList.filter((item) => item.done === false);
      setFilteredTodoList(activeItems);
    }
    if (current === "Completed") {
      allRef.current.classList.remove(styles.selectedMenu);
      activeRef.current.classList.remove(styles.selectedMenu);
      completedRef.current.classList.add(styles.selectedMenu);
      clearRef.current.classList.remove(styles.selectedMenu);
      let completedItems = todoList.filter((item) => item.done === true);
      setFilteredTodoList(completedItems);
    }
    if (current === "Clear all") {
      allRef.current.classList.remove(styles.selectedMenu);
      activeRef.current.classList.remove(styles.selectedMenu);
      completedRef.current.classList.remove(styles.selectedMenu);
      clearRef.current.classList.add(styles.selectedMenu);
      setTodoList([]);
      setFilteredTodoList([]);
    }
  };
  return (
    <div className={styles.menuItems}>
      <label>
        Total:{todoList.length} {todoList.length > 1 ? "items" : "item"}
      </label>
      <p onClick={handleMenu} ref={allRef}>
        All
      </p>
      <p onClick={handleMenu} ref={activeRef}>
        Active
      </p>
      <p onClick={handleMenu} ref={completedRef}>
        Completed
      </p>
      <p onClick={handleMenu} ref={clearRef}>
        Clear all
      </p>
    </div>
  );
}
