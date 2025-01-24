import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Errore ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (url) {
            fetchData();
        } else {
            setIsLoading(false);
            setError("URL non fornita")
        }
    }, [url])

    return { data, isLoading, error };
};

export default useFetch;