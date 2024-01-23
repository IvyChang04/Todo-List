import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTodoItemContext } from "../context/TodoItemContext";
import {
    checkTodoItems,
    deleteTodoItems,
    renameTodoItems,
} from "../localStorageFunction";
import ContextMenu from "react-native-context-menu-view";

const TodoListItem = ({ todoItem }) => {
    const { todoItems, setTodoItems } = useTodoItemContext();

    const handleCheckPress = async () => {
        const updatedTodos = todoItems.map((item) =>
            item.title === todoItem.title
                ? { ...item, checked: !item.checked }
                : item
        );
        setTodoItems(updatedTodos);
        await checkTodoItems(todoItem.title);
    };

    const handleDeletePress = async () => {
        const updatedTodos = todoItems.filter(
            (item) => item.title !== todoItem.title
        );
        setTodoItems(updatedTodos);
        await deleteTodoItems(todoItem.title);
    };

    const handleMenuPress = async (event) => {
        switch (event.nativeEvent.name) {
            case "Delete":
                await handleDeletePress();
                break;
        }
    };

    const handleItemPress = async (newTitle) => {
        const updatedTodos = todoItems.map((item) =>
            item.title === todoItem.title ? { ...item, title: newTitle } : item
        );
        setTodoItems(updatedTodos);
        await renameTodoItems(todoItem.title, newTitle);
    };

    return (
        <ContextMenu
            actions={[{ title: "Delete", systemIcon: "trash.fill" }]}
            onPress={(event) => {
                handleMenuPress(event);
            }}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={[
                        styles.checkButton,
                        !todoItem.checked
                            ? { borderWidth: 2, borderColor: "black" }
                            : null,
                    ]}
                    onPress={handleCheckPress}
                >
                    {todoItem.checked ? (
                        <AntDesign name="checkcircle" size={24} color="black" />
                    ) : null}
                </TouchableOpacity>

                {/* change to TouchableOpacity so we can click it and rename title*/}

                <TouchableOpacity>
                    <Text style={styles.text}>{todoItem.title}</Text>
                </TouchableOpacity>
            </View>
        </ContextMenu>
    );
};

export default TodoListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        height: 60,
        backgroundColor: "#a1baff",
        paddingHorizontal: 20,
        borderRadius: 13,
        alignSelf: "center",
        marginVertical: 5,
    },
    checkButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    text: {
        fontSize: 20,
        color: "#314478",
        marginLeft: 20,
    },
});
