import React, { useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
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

    const handleSubmit = () => {
        if (!title.trim()) {
            Alert.alert('Task Title is required!');
            return;
        }

        editTodo(todoId, { title, description, dueDate });
        dispatch(editTodoAction(todoId, { title, description, dueDate }))
        onCancel();
    };

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TextInput
                testID='title-edit'
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                placeholder="Task Title"
                placeholderTextColor={'lightgray'}
                style={styles.textInput}
            />
            <TextInput
                testID='desc-edi'
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                placeholderTextColor={'lightgray'}
                style={styles.textInput}
            />
            <TextInput
                testID='due-edit'
                placeholder='due date'
                value={dueDate}
                onChange={(e: any) => setDueDate(e.target.value)}
                placeholderTextColor={'lightgray'}
                style={styles.textInput}
            />
            <View style={{ flexDirection: 'row', width: 130, justifyContent: 'space-between', }}>
                <Button testID='save-btn' title='Save' onPress={() => handleSubmit()} />
                <Button testID='cancel-btn' title='Cancel' onPress={onCancel} />
            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    form: { display: 'flex', margin: 10 },
    input: { flex: 1, padding: 8, marginRight: 10 },
    textInput: { borderColor: 'gray', borderWidth: 1, marginRight: 5, borderRadius: 5, paddingHorizontal: 10 }
});

export default EditForm;
