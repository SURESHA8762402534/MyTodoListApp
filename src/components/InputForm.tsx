import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { useDispatch } from 'react-redux';
import { addOnTodo } from '../store/actions';
import { Button, StyleSheet, TextInput, View } from 'react-native';


type InputFormProps = {
    onAddTodo: (title: string, description: string, dueDate: string) => void;
};

const InputForm: React.FC<InputFormProps> = ({ onAddTodo }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const { addTodo } = useContext(TodoContext);
    const handleSubmit = () => {

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

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TextInput
                testID='title'
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                placeholder="Add a task"
                placeholderTextColor={'lightgray'}
                style={styles1.textInput}
            />
            <TextInput
                testID='desc'
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                placeholderTextColor={'lightgray'}
                style={styles1.textInput}
            />
            <TextInput
                testID='due-date'
                placeholder='due date'
                value={dueDate}
                onChange={(e: any) => setDueDate(e.target.value)}
                placeholderTextColor={'lightgray'}
                style={styles1.textInput}
            />

            <Button testID='add-btn' title="Add to list" onPress={() => handleSubmit()} />
        </View>
    );
};

const styles1 = StyleSheet.create({
    textInput: { borderColor: 'gray', borderWidth: 1, marginRight: 5, borderRadius: 5, paddingHorizontal: 10 }
});

export default InputForm;
