import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Definisci l'azione asincrona per fare il fetch dei to-do
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

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    completeTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = true;
      }
    }
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

// Esporta le azioni sincrone
export const { addTodo, removeTodo, toggleTodo, completeTodo } = todoSlice.actions;

// Esporta il reducer
export default todoSlice.reducer;