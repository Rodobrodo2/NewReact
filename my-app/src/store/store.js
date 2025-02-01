import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todosSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer, // Inserisci qui altri slice se necessario
  },
});

export default store;