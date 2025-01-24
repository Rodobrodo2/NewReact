import React from "react";
import useFetch from '../hooks/useFetch';

const Home = () => {
    const { data, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Home</h1>
            <ul>
                {data.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;