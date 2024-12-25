import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    SET_TODOS,
    SORT_TODOS,
    Todo,
  } from './actions';

  
const loadInitialState = (): Todo[] => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  interface TodoState {
    todos: Todo[];
  }
  
  const initialState: TodoState = {
    todos: loadInitialState(),
  };
  
  export const todoReducer = (state = initialState, action: any): TodoState => {
    switch (action.type) {
        case ADD_TODO:
            return {
              ...state,
              todos: [...state.todos, action.payload],
            };
      
          case EDIT_TODO:
            return {
              ...state,
              todos: state.todos.map((todo) =>
                todo.id === action.payload.id
                  ? { ...todo, ...action.payload.updatedTodo }
                  : todo
              ),
            };
      
          case DELETE_TODO:
            return {
              ...state,
              todos: state.todos.filter((todo) => todo.id !== action.payload),
            };
  
      case SORT_TODOS:
        return {
          ...state,
          todos: [...state.todos].sort((a, b) => {
            const criteria = action.payload;
            if (criteria === 'title') {
              return a.title.localeCompare(b.title);
            } else if (criteria === 'dueDate') {
              return (a.dueDate || '').localeCompare(b.dueDate || '');
            } else if (criteria === 'createdAt') {
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            return 0;
          }),
        };

        case SET_TODOS:
          return { ...state, todos: action.payload }
      default:
        return state;
    }
  };
  