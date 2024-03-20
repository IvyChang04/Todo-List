import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useTodoItemContext } from "../context/TodoItemContext";
import {
    checkTodoItems,
    deleteTodoItems,
    renameTodoItems,
} from "../localStorageFunction";
import ContextMenu from "react-native-context-menu-view";
import { Feather } from "@expo/vector-icons";

const TodoListItem = ({ todoItem }) => {
    const { todoItems, setTodoItems } = useTodoItemContext();
    const [renameTitle, setRenameTitle] = useState(todoItem.title);
    const [renameing, setRenaming] = useState(false);
    const renameRef = useRef(null);

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

            case "Rename":
                handleRenamePress();
                break;
        }
    };

    const handleRenamePress = () => {
        setRenaming(true);
    };

    const handleSavePress = async () => {
        const updatedTodos = todoItems.map((item) =>
            item.title === todoItem.title
                ? { ...item, title: renameTitle }
                : item
        );
        setTodoItems(updatedTodos);
        setRenaming(false);
        await renameTodoItems(todoItem.title, renameTitle);
    };

    useEffect(() => {
        if (renameing && renameRef.current) {
            renameRef.current.focus();
        }
    }, [renameing]);

    return (
        <ContextMenu
            actions={[
                { title: "Delete", systemIcon: "trash.fill" },
                { title: "Rename", systemIcon: "pencil" },
            ]}
            onPress={(event) => {
                handleMenuPress(event);
            }}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={[
                        styles.checkButton,
                        !todoItem.checked
                            ? { borderWidth: 2, borderColor: "#607274" }
                            : null,
                    ]}
                    onPress={handleCheckPress}
                >
                    {todoItem.checked ? (
                        <AntDesign
                            name="checkcircle"
                            size={24}
                            color="#607274"
                        />
                    ) : null}
                </TouchableOpacity>

                {renameing ? (
                    <>
                        <TextInput
                            style={styles.textInput}
                            value={renameTitle}
                            onChangeText={(title) => setRenameTitle(title)}
                            ref={renameRef}
                        />
                        <TouchableOpacity onPress={handleSavePress}>
                            <Feather name="save" size={25} color="black" />
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text style={styles.text}>{todoItem.title}</Text>
                )}
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
        backgroundColor: "#D2E3C8",
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
        color: "black",
        marginLeft: 20,
    },
    textInput: {
        fontSize: 22,
        marginLeft: 15,
        flex: 1,
    },
});
