import React, { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState({name: ""});
  const [todoList, setTodoList] = useState([]);

  const updateTodoList = (newData) => {
    const trandformedData = newData.map((item) => ({
      id: item.id,
      name: item.name,
      done: item.done,
      created_on: item.created_on,
      updated_on: item.updated_on,
    }));
    setTodoList(trandformedData);
  };

  const addToTodoList = (newData)=>{
    //object
    // update set of arrays
    const {user, ...data} = newData;
    setTodoList([...todoList, data]);
  }

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        todoList,
        setTodoList,
        updateTodoList,
        addToTodoList,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
