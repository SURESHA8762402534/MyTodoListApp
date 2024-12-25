import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { useDispatch } from 'react-redux';
import { addOnTodo } from '../store/actions';


type InputFormProps = {
    onAddTodo: (title: string, description: string, dueDate: string) => void;
};

const InputForm: React.FC<InputFormProps> = ({ onAddTodo }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const { addTodo } = useContext(TodoContext);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (title.trim()) {
            onAddTodo(title.trim(), description.trim(), dueDate);
            addTodo(title, description, dueDate)
            dispatch(addOnTodo(title, description, dueDate));
            setTitle('');
            setDescription('')
            setDueDate("")
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                placeholder="Add a task"
                style={styles.input}
            />
            <input
                type="text"
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

            <button type="submit" style={{ backgroundColor: 'lightblue', borderRadius: 5, marginLeft: 10 }}>Add to list</button>
        </form>
    );
};

const styles = {
    form: { display: 'flex', margin: '10px 0' },
    input: { flex: 1, padding: '8px', marginRight: '10px' },
};

export default InputForm;
