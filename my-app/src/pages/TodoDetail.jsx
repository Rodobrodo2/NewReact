import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const TodoDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const post = location.state?.post;

    if (!post) {
        return <p>Nessun dettaglio trovato per il to-do con ID {id}</p>;
    }

    return (
        <div>
            <h1>Dettagli del To-Do</h1>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => navigate(-1)}>Torna indietro</button>
        </div>
    );
};

export default TodoDetail;
