import { FlatList, StyleSheet } from "react-native";
import TodoListItem from "./TodoListItem";

const TodoList = ({todoItem}) => {
    return (
        <FlatList data={todoItem} renderItem={({item}) => <TodoListItem todoItem={item} />} />
    )
};

export default TodoList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})