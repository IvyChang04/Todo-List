import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TodoListScreen from "./screens/TodoListScreen";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="TodoList" component={TodoListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
