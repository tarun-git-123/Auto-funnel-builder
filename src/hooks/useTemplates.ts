import { useEffect, useState } from 'react'

const useTemplates = () => {
    const [templates, setTemplates] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchTemplates = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/templates'); // Replace with your actual API
                const data = await res.json();
                setTemplates(data.templates);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching templates:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);
    return {
        templates,
        loading
    }
}

export default useTemplates
