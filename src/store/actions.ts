// Action Types
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const SORT_TODOS = 'SORT_TODOS';
export const SET_TODOS = 'SET_TODOS';

export const addOnTodo = (title: string, description: string, dueDate: string) => ({
  type: ADD_TODO,
  payload:  {
    id: Date.now(),
    title,
    description,
    createdAt: new Date().toISOString(),
    dueDate,
    completed: false,
  },
});

export const editTodoAction = (id: number, updatedTodo: Partial<Todo>) => ({
  type: EDIT_TODO,
  payload: { id, updatedTodo },
});

export const deleteTodoAction = (id: number) => ({
  type: DELETE_TODO,
  payload: id,
});

export const sortTodos = (criteria: 'title' | 'dueDate' | 'createdAt') => ({
  type: SORT_TODOS,
  payload: criteria,
});

export const setTodos = (todos: any[]) => ({
  type: SET_TODOS,
  payload: todos,
});

export interface Todo {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}
