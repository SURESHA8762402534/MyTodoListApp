import React, { useEffect, useMemo, useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import EditForm from './EditForm.web';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoAction, setTodos, sortTodos } from '../store/actions';
import { loadTodos } from '../utils/storage';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TodoList: React.FC = () => {
    const { deleteTodo, } = useTodoContext();
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

    //Sorting using context

    // const [sortCriteria, setSortCriteria] = useState<'title' | 'dueDate' | 'createdAt'>('createdAt');
    // const handleSortChange = (criteria: 'title' | 'dueDate' | 'createdAt') => {
    //     setSortCriteria(criteria);
    //     sortTodos(criteria);
    // };

    //Sorting using redux
    const todos1 = useSelector((state: RootState) => state.todo.todos);
    const [sort, setSort] = useState(false)
    const dispatch = useDispatch();
    const [sortCriteria1, setSortCriteria1] = useState<'title' | 'dueDate' | 'createdAt'>('createdAt');

    const handleSortChange1 = (criteria: 'title' | 'dueDate' | 'createdAt') => {
        setSortCriteria1(criteria);
        dispatch(sortTodos(criteria));
    };

    const handleSortBtn = () => {
        setSort((prev) => !prev)
    }
    const memoizedLoadTodos = useMemo(() => {
        return async () => {
            try {
                const storedTodos = await loadTodos();
                if (storedTodos) {
                    dispatch(setTodos(storedTodos));
                }
            } catch (error) {
                console.error('Error loading todos from AsyncStorage', error);
            }
        };
    }, [dispatch]);

    useEffect(() => {
        memoizedLoadTodos();
    }, [memoizedLoadTodos]);

    return (

        <View>
            <View style={{ marginBottom: 10, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 700 }}>Sort by:</Text>
                <TouchableOpacity style={{ width: 100, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, marginLeft: 16 }} onPress={handleSortBtn}>
                    <Text>{sortCriteria1}</Text>
                </TouchableOpacity>

            </View>
            {sort && <View style={styles.sortOptions}>
                <TouchableOpacity
                    onPress={() => handleSortChange1('title')}
                    style={{ marginVertical: 5, borderBottomColor: 'lightblue' }}>
                    <Text>Task Title</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSortChange1('dueDate')}
                    style={{ marginVertical: 5, borderBottomColor: 'lightblue' }}>
                    <Text>Due date</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSortChange1('createdAt')}
                    style={{ marginVertical: 5, borderBottomColor: 'lightblue' }}>
                    <Text>Created Date</Text>
                </TouchableOpacity>
            </View>}
            {todos1.map((todo) =>
                editingTodoId === todo.id ? (
                    <EditForm
                        key={todo.id}
                        todoId={todo.id}
                        initialTitle={todo.title}
                        initialDescription={todo.description}
                        initialDueDate={todo.dueDate}
                        onCancel={() => setEditingTodoId(null)}
                    />
                ) : (
                    <View style={{
                        width: '100%',
                        marginBottom: 10,
                        backgroundColor: 'lightcyan',
                        paddingLeft: 20,
                        paddingRight: 20,
                        padding: 10,
                        borderRadius: 20,

                    }} key={todo.id}>
                        <Text style={{ fontWeight: 700, fontSize: 16 }}>{todo.title}</Text>
                        <Text>{todo.description && <Text style={{ fontWeight: 700 }}>Description:</Text>} {todo.description}</Text>
                        {todo.dueDate && <Text><Text style={{ fontWeight: 700 }}>Due date:</Text> {todo.dueDate}</Text>}
                        {todo.createdAt && <Text><Text style={{ fontWeight: 700 }}>Created at:</Text> {todo.createdAt}</Text>}

                        <View style={{ flexDirection: 'row', width: 250, justifyContent: 'space-between', marginTop: 10 }}>
                            <View style={{ width: 100 }}>
                                <Button title='edit' color={'blue'} onPress={() => setEditingTodoId(todo.id)} />
                            </View>
                            <View style={{ width: 100 }}>
                                <Button title='delete'
                                    color={'lightcoral'}
                                    onPress={() => { deleteTodo(todo.id); dispatch(deleteTodoAction(todo.id)) }} />
                            </View>
                        </View>
                    </View>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sortOptions: { width: 115, borderColor: 'gray', borderWidth: 1, borderRadius: 10, flexDirection: 'column', paddingHorizontal: 10, justifyContent: 'space-evenly', marginLeft: 65 }
})

export default TodoList;
