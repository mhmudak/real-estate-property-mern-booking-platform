import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        if (!url) return;
        let cancelled = false;
        const getData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(url);
                console.log('response', response)
                if (!cancelled) setData(response.data.data);
            } catch (err) {
                if (!cancelled) {
                    setError(err.message)
                }
            }
            finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }
        getData();
    }, [url])
    return { data, loading, error }
}