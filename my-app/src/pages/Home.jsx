import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../store/slices/todosSlice"; // Assicurati che il percorso sia corretto

const Home = () => {
  const dispatch = useDispatch();
  
  // Recupera i dati, lo stato di caricamento e gli errori dal Redux store
  const { todos: data, isLoading, error } = useSelector(state => state.todos);

  // Gestione dei parametri della query per la ricerca
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  // Effettua il fetch dei dati all'avvio del componente
  useEffect(() => {
    dispatch(fetchTodos('https://jsonplaceholder.typicode.com/posts'));
  }, [dispatch]);

  // Funzione per gestire il cambiamento del termine di ricerca
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  // Filtra i dati in modo sicuro, verificando che le proprietà title e body siano definite
  const filteredTodos = Array.isArray(data)
    ? data.filter(todo => {
        const title = todo.title || "";
        const body = todo.body || "";
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               body.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Lista dei To-Do</h1>
      
      {/* Campo di ricerca */}
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearchChange} 
        placeholder="Cerca nei To-Do" 
      />

      {/* Lista dei To-Do filtrata */}
      <ul>
        {filteredTodos.length > 0 ? (
          filteredTodos.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              {/* Link per andare alla pagina dei dettagli */}
              <Link to={`/todo/${post.id}`} state={{ post }}>
                Visualizza dettagli
              </Link>
            </li>
          ))
        ) : (
          <p>Nessun to-do trovato.</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
