import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, addTodo, removeTodo, toggleTodo } from '../store/slices/todosSlice';

const IntegratedTodo = () => {
  const dispatch = useDispatch();

  // Recupera lo stato dei to-do dallo store Redux
  const { todos, isLoading, error } = useSelector(state => state.todos);

  // Stato locale per gestire l'inserimento di un nuovo to-do e la selezione per i dettagli
  const [input, setInput] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Effettua il fetch dei to-do all'avvio del componente
  useEffect(() => {
    // Sostituisci l'URL con quello della tua API
    dispatch(fetchTodos('https://jsonplaceholder.typicode.com/posts'));
  }, [dispatch]);

  // Gestione dell'aggiunta di un nuovo to-do
  const handleAddTodo = () => {
    if (input.trim() === '') return;
    dispatch(addTodo({ id: Date.now(), text: input, completed: false }));
    setInput('');
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
      {/* Sezione della lista dei To-Do */}
      <div style={{ flex: 1 }}>
        <h2>Lista dei To-Do</h2>
        {isLoading && <p>Caricamento in corso...</p>}
        {error && <p>Errore: {error}</p>}
        
        {/* Input per aggiungere un nuovo to-do */}
        <div>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Inserisci un nuovo to-do" 
          />
          <button onClick={handleAddTodo}>Aggiungi</button>
        </div>

        {/* Lista dei To-Do */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li 
              key={todo.id} 
              style={{
                marginBottom: '1rem',
                padding: '0.5rem',
                borderBottom: '1px solid #ccc',
                cursor: 'pointer'
              }}
              // Cliccando sull'elemento, imposta il to-do selezionato per mostrare i dettagli
              onClick={() => setSelectedTodo(todo)}
            >
              <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={(e) => {
                  // Impedisci la propagazione per non attivare la selezione se si sta solo facendo toggle
                  e.stopPropagation();
                  dispatch(toggleTodo(todo.id));
                }}
              >
                {todo.text}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeTodo(todo.id));
                  // Se il to-do rimosso era quello selezionato, resetta la selezione
                  if (selectedTodo && selectedTodo.id === todo.id) {
                    setSelectedTodo(null);
                  }
                }}
                style={{ marginLeft: '1rem' }}
              >
                Elimina
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sezione dei dettagli del To-Do selezionato */}
      <div style={{ flex: 1 }}>
        {selectedTodo ? (
          <div>
            <h2>Dettagli del To-Do</h2>
            <p><strong>Testo:</strong> {selectedTodo.text}</p>
            <p>
              <strong>Stato:</strong> {selectedTodo.completed ? 'Completato' : 'In sospeso'}
            </p>
            <button onClick={() => setSelectedTodo(null)}>Chiudi dettagli</button>
          </div>
        ) : (
          <p>Seleziona un to-do dalla lista per vedere i dettagli.</p>
        )}
      </div>
    </div>
  );
};

export default IntegratedTodo;