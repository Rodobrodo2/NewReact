import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useFetch from '../hooks/useFetch';

const Home = () => {
    const { data, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');
    
    // Recupera i parametri della query per la ricerca
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

    // Funzione per gestire il cambiamento del termine di ricerca
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            setSearchParams({ search: value }); // Aggiunge il termine di ricerca come parametro query nell'URL
        } else {
            setSearchParams({}); // Rimuove il parametro di ricerca se il campo è vuoto
        }
    };

    // Verifica che 'data' sia disponibile prima di tentare di filtrare i risultati
    const filteredTodos = data ? data.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        todo.body.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

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
                            <Link to={`/todo/${post.id}`} state={{ post }}>Visualizza dettagli</Link>
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