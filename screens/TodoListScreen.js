import { View, Text, StyleSheet } from "react-native";

import AddItemButton from "../customComponents/AddItemButton";
import TodoList from "../customComponents/TodoList";
import { useTodoItemContext } from "../context/TodoItemContext";

const TodoListScreen = () => {
    const { todoItems, setTodoItems } = useTodoItemContext();

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>To Do</Text>
            <TodoList todoItem={todoItems} />
            <AddItemButton />
        </View>
    );
};

export default TodoListScreen;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#EBF3E8",
        backgroundColor: "white",
        flex: 1,
        paddingTop: 80,
    },
    titleText: {
        fontSize: 42,
        paddingLeft: 20,
        marginBottom: 10,
        fontWeight: "500",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
    },
});
