import { TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import NewTodoModal from "./NewTodoModal";

const AddItemButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleModal = () => {
        setIsVisible(!isVisible);
    };
    return (
        <>
            <TouchableOpacity style={styles.container} onPress={toggleModal}>
                <AntDesign name="pluscircleo" size={65} color="darkseagreen" />
            </TouchableOpacity>
            <NewTodoModal isVisible={isVisible} toggleModal={toggleModal} />
        </>
    );
};

export default AddItemButton;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 60,
        right: 50,
    },
});
