import React, { useEffect, useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import EditForm from './EditForm.web';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoAction, setTodos, sortTodos } from '../store/actions';
import { loadTodos } from '../utils/storage';

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
    const dispatch = useDispatch();
    const [sortCriteria1, setSortCriteria1] = useState<'title' | 'dueDate' | 'createdAt'>('createdAt');

    const handleSortChange1 = (criteria: 'title' | 'dueDate' | 'createdAt') => {
        setSortCriteria1(criteria);
        dispatch(sortTodos(criteria));
    };


    useEffect(() => {
        const load = async () => {
            try {
                const storedTodos = await loadTodos()
                if (storedTodos) {
                    dispatch(setTodos(storedTodos));
                }
            } catch (error) {
                console.error('Error loading todos from AsyncStorage', error);
            }
        };

        load();
    }, [dispatch]);
    return (
        <div>
            <div style={{ marginBottom: 20 }}>
                <label htmlFor="sortCriteria" style={{ fontWeight: 700 }}>Sort by:</label>
                <select
                    id="sortCriteria"
                    value={sortCriteria1}
                    onChange={(e: any) => handleSortChange1(e.target.value as 'title' | 'dueDate' | 'createdAt')}
                >
                    <option value="title">Task Title</option>
                    <option value="dueDate">Due Date</option>
                    <option value="createdAt">Creation Date</option>
                </select>
            </div>
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
                    <div style={{
                        marginBottom: 10,
                        backgroundColor: 'lightcyan',
                        paddingLeft: 20,
                        paddingRight: 20,
                        padding: 10,
                        borderRadius: 20
                    }} key={todo.id}>
                        <h3>{todo.title}</h3>
                        <p>{todo.description && <b>Description:</b>} {todo.description}</p>
                        <p>{todo.dueDate && <b>Due date:</b>} {todo.dueDate}</p>
                        <p>{todo.createdAt && <b>Created at:</b>} {todo.createdAt}</p>
                        <button style={{ marginRight: 20, backgroundColor: 'lightseagreen', borderRadius: 10 }} onClick={() => setEditingTodoId(todo.id)}>Edit</button>
                        <button style={{ backgroundColor: 'lightcoral', borderRadius: 10 }} onClick={() => { deleteTodo(todo.id); dispatch(deleteTodoAction(todo.id)) }}>Delete</button>
                    </div>
                )
            )}
        </div>
    );
};

export default TodoList;
