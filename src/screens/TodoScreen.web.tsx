import React, { useContext } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import InputForm from '../components/InputForm.web';
import { TodoContext } from '../contexts/TodoContext';
import { AuthContext } from '../contexts/AuthContext';
import TodoList from '../components/TodoList.web';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoScreen: React.FC = () => {
    const { addTodo } = useContext(TodoContext);
    const { logout } = useContext(AuthContext);
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userSession');
        logout();
    };

    return (
        <View style={styles.container}>
            <View style={styles.logout}>
                <Button title='logout' color={'red'} onPress={handleLogout}></Button>
            </View>
            <InputForm onAddTodo={addTodo} />

            <TodoList />

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    logout: { width: 100, borderRadius: 20, marginVertical: 10 },
    filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
    activeFilter: { fontWeight: 'bold', textDecorationLine: 'underline' },
});

export default TodoScreen;
