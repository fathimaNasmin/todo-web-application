import React, { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState({name: ""});
  const [todoList, setTodoList] = useState([]);

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        todoList,
        setTodoList
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
