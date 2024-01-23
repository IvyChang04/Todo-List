import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeTodoItem = async (todoItem) => {
    try {
        const storedTodos = await getTodoItems();
        storedTodos.push(todoItem);
        await AsyncStorage.setItem("@todoItems", JSON.stringify(storedTodos));
    } catch (error) {
        console.error("error: ", error);
    }
};

export const getTodoItems = async () => {
    try {
        const todoItems = await AsyncStorage.getItem("@todoItems");
        return todoItems ? JSON.parse(todoItems) : [];
    } catch (error) {
        console.error("error: ", error);
    }
};

export const checkTodoItems = async (title) => {
    try {
        const storedTodos = await getTodoItems();
        const updatedTodos = storedTodos.map((item) =>
            item.title === title
                ? {
                      ...item,
                      checked: !item.checked,
                  }
                : item
        );
        await AsyncStorage.setItem("@todoItems", JSON.stringify(updatedTodos));
    } catch (error) {
        console.error("error: ", error);
    }
};

export const deleteTodoItems = async (title) => {
    try {
        const storedTodos = await getTodoItems();
        const updatedTodos = storedTodos.filter((item) => item.title !== title);
        await AsyncStorage.setItem("@todoItems", JSON.stringify(updatedTodos));
    } catch (error) {
        console.error("error: ", error);
    }
};

export const renameTodoItems = async (title, newTitle) => {
    try {
        const storedTodos = await getTodoItems();
        const updatedTodos = storedTodos.map((item) => {
            item.title === title ? { ...item, title: newTitle } : item;
        });
        await AsyncStorage.setItem("@todoItems", JSON.stringify(updatedTodos));
    } catch (error) {
        console.error("error on renaming item: ", error);
    }
};
