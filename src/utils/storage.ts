export const loadTodos = async (): Promise<Todo[]> => {
    try {
      const json = localStorage.getItem('todos');
      return json ? JSON.parse(json) : [];
    } catch (err) {
      console.error('Error loading todos:', err);
      return [];
    }
  };
  
  export const saveTodos = async (todos: Todo[]): Promise<void> => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (err) {
      console.error('Error saving todos:', err);
    }
  };
  
  type Todo = {
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
    completed: boolean;
    createdAt: string;
}