import { useState, useContext } from "react";
import styles from "./menu.module.css";
import { TodoContext } from "../Hooks/todoContext";

export default function Menu() {
  const [selectedMenu, setSelectedMenu] = useState("All");
  const {todo, setTodo, todoList, setTodoList} = useContext(TodoContext);

  // const handleMenu = (current) => {
  //   setSelectedMenu(current);
  //   switch (current) {
  //     case "All":
  //       setFilteredTodoList(todoList);
  //       break;
  //     case "Active":
  //       let activeItems = todoList.filter((item) => item.done === false);
  //       setFilteredTodoList(activeItems);
  //       break;
  //     case "Completed":
  //       let completedItems = todoList.filter((item) => item.done === true);
  //       setFilteredTodoList(completedItems);
  //       break;
  //     case "Clear all":
  //       setTodoList([]);
  //       setFilteredTodoList([]);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // function to determine menu selected or not.
  const isItemSelected = (menuItem)=> menuItem === selectedMenu?styles.selectedMenu:"";

  return (
    <div className={styles.menuItems}>
      <label>
        Total:{todoList.length} {todoList.length > 1 ? "items" : "item"}
      </label>
      <p
        onClick={() => {
          handleMenu("All");
        }}
        className={isItemSelected("All")}
      >
        All
      </p>
      <p
        onClick={() => {
          handleMenu("Active");
        }}
        className={isItemSelected("Active")}
      >
        Active
      </p>
      <p
        onClick={() => {
          handleMenu("Completed");
        }}
        className={isItemSelected("Completed")}
      >
        Completed
      </p>
      <p
        onClick={() => {
          handleMenu("Clear all");
        }}
        className={isItemSelected("Clear all")}
      >
        Clear all
      </p>
    </div>
  );
}
