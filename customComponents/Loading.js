import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} />
        </View>
    );
};

export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "cornflowerblue",
    },
});
