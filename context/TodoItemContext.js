import { Children, createContext, useContext, useState } from "react";

const TodoItemContext = createContext();

export const useTodoItemContext = () => {
    return useContext(TodoItemContext);
};

export const TodoItemContextProvider = ({ children, currentTodos }) => {
    const [todoItems, setTodoItems] = useState(currentTodos);

    return (
        <TodoItemContext.Provider value={{ todoItems, setTodoItems }}>
            {children}
        </TodoItemContext.Provider>
    );
};
