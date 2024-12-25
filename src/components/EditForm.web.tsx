import React, { useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { editTodoAction } from '../store/actions';

interface EditFormProps {
    todoId: number;
    initialTitle: string;
    initialDescription?: string;
    initialDueDate?: string;
    onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({
    todoId,
    initialTitle,
    initialDescription,
    initialDueDate,
    onCancel,
}) => {
    const { editTodo } = useTodoContext();
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription || '');
    const [dueDate, setDueDate] = useState(initialDueDate || '');
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            Alert.alert('Task Title is required!');
            return;
        }

        editTodo(todoId, { title, description, dueDate });
        dispatch(editTodoAction(todoId, { title, description, dueDate }))
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
            />
            <input
                type="text"
                style={{ marginLeft: 5 }}
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                placeholder="Description (optional)"
            />
            <input
                type="date"
                placeholder='due date'
                style={{ marginLeft: 5 }}
                value={dueDate}
                onChange={(e: any) => setDueDate(e.target.value)}
            />
            <button type="submit" style={{ margin: 5, backgroundColor: 'lightblue' }}>Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default EditForm;
