import Modal from "react-native-modal";
import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { storeTodoItem } from "../localStorageFunction";
import { useTodoItemContext } from "../context/TodoItemContext";

const NewTodoModal = ({ isVisible, toggleModal }) => {
    const [todoItemName, setTodoItemName] = useState("");
    const { todoItems, setTodoItems } = useTodoItemContext();

    const handleAddPress = async () => {
        const newTodo = {
            ckecked: false,
            title: todoItemName,
        };
        toggleModal();
        setTodoItemName("");
        setTodoItems([...todoItems, newTodo]);
        await storeTodoItem(newTodo);
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={toggleModal}
            style={styles.modalContainer}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationOutTiming={700}
            onSwipeComplete={toggleModal}
            swipeDirection="down"
            backdropOpacity={0.4}
        >
            <View style={styles.container}>
                <Text style={styles.titleText}>Add something</Text>
                <View style={styles.row}>
                    <TextInput
                        value={todoItemName}
                        onChangeText={(text) => setTodoItemName(text)}
                        style={styles.input}
                        placeholder="e.g. do the dishes"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleAddPress}
                    >
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default NewTodoModal;

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: "flex-end",
        margin: 0,
    },
    container: {
        backgroundColor: "darkseagreen",
        height: 200,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 15,
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "white",
        borderRadius: 10,
        fontSize: 18,
        padding: 10,
        width: "75%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    button: {
        width: "auto",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: "pink",
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "500",
    },
});
