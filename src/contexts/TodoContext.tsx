import React, { createContext, useState, useEffect, useContext } from 'react';
import { loadTodos, saveTodos } from '../utils/storage';

interface Todo {
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
    completed: boolean;
    createdAt: string;
}

type TodoContextType = {
    todos: Todo[];
    addTodo: (title: string, description: string, dueDate: string) => void;
    toggleComplete: (id: number) => void;
    deleteTodo: (id: number) => void;
    editTodo: (id: number, updatedTodo: Partial<Todo>) => void;
    sortTodos: (criteria: 'title' | 'dueDate' | 'createdAt') => void;
};

export const TodoContext = createContext<TodoContextType>(
    {
        todos: [],
        addTodo: () => { },
        toggleComplete: () => { },
        deleteTodo: () => { },
        editTodo: () => { },
        sortTodos: () => { }
    }
);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const TodoProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const load = async () => {
            const storedTodos = await loadTodos();
            setTodos(storedTodos || []);
        };
        load();
    }, []);

    const addTodo = (title: string, description: string, dueDate: string) => {
        const newTodo: Todo = { id: Date.now(), title, description, createdAt: new Date().toISOString(), dueDate: dueDate, completed: false };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
    };


    const toggleComplete = (id: number) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
    };

    const deleteTodo = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
    };

    const editTodo = (id: number, updatedTodo: Partial<Todo>) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, ...updatedTodo } : todo
            )
        );
    };

    const sortTodos = (criteria: 'title' | 'dueDate' | 'createdAt') => {
        setTodos((prev) =>
            [...prev].sort((a, b) => {
                if (criteria === 'title') {
                    return a.title.localeCompare(b.title);
                } else if (criteria === 'dueDate') {
                    return (a.dueDate || '').localeCompare(b.dueDate || '');
                } else if (criteria === 'createdAt') {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                }
                return 0;
            })
        );
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleComplete, deleteTodo, editTodo, sortTodos }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};