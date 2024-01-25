import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    LayoutAnimation,
} from "react-native";
import { useEffect, useState } from "react";

import AppNavigator from "./navigation";
import { TodoItemContextProvider } from "./context/TodoItemContext";
import { getTodoItems } from "./localStorageFunction";
import Loading from "./customComponents/Loading";

export default function App() {
    const [todoItems, setTodoItems] = useState([]);

    useEffect(() => {
        const getCurrentTodos = async () => {
            const currentTodos = await getTodoItems();
            setTodoItems(currentTodos);
        };
        getCurrentTodos();
    }, []);

    if (!todoItems) {
        return <Loading />;
    }

    return (
        <TodoItemContextProvider currentTodos={todoItems}>
            <AppNavigator />
        </TodoItemContextProvider>
    );
}
