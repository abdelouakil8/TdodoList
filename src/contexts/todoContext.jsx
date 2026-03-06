import { createContext, useReducer } from "react";
import todoReducer from "../assets/Reducers/todoReducer";

export const todosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  return (
    <todosContext.Provider value={{ todos, dispatch }}>
      {children}
    </todosContext.Provider>
  );
};

export default TodosProvider;
