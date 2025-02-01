import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Azione asincrona per il fetch dei to-do da un'API
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (url, thunkAPI) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Errore ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Supponiamo che l'API restituisca un array di to-do
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // Aggiunge un nuovo to-do
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    // Rimuove un to-do per id
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    // Alterna lo stato "completed" di un to-do
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Esportiamo le azioni sincrone e il reducer
export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
