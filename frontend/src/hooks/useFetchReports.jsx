import { useEffect, useState } from "react"

export const useFetchReports = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reports, setReports] = useState([]);

    const getReports = async() => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/denuncias.php`);
            if (!response.ok) throw new Error("Error fetching data");
            const result = await response.json();
            setReports(result);
        } catch (error) {
            setError(error);
            console.error("Error fetching reports: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getReports();
    }, []);

    return [getReports, loading, error, reports]
}
