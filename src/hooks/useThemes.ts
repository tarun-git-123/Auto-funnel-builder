import { useEffect, useState } from 'react'

const useThemes = (template: string) => {
    const [themes, setThemes] = useState<string[]>([]);
    useEffect(() => {
        const fetchThemes = async (template: string) => {
            try {
                const res = await fetch('/api/themes', { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ template }),
                }); // Replace with your actual API
                const data = await res.json();
                setThemes(data.themes);
            } catch (err) {
                console.error("Error fetching themes:", err);
            }
        };

        fetchThemes(template);
    }, []);
    return {
        themes
    }
}

export default useThemes
