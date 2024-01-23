import { View, Text, StyleSheet } from "react-native";

import AddItemButton from "../customComponents/AddItemButton";
import TodoList from "../customComponents/TodoList";
import { useTodoItemContext } from "../context/TodoItemContext";

const TodoListScreen = () => {
    const { todoItems, setTodoItems } = useTodoItemContext();

    return (
        <View style={styles.container}>
            <TodoList todoItem={todoItems} />
            <AddItemButton />
        </View>
    );
};

export default TodoListScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingTop: 100,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
    },
});
