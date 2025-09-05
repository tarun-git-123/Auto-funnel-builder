'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

const PreviewTheme = () => {
    const { template, theme } = useParams();
    const [ThemeComponent, setThemeComponent] = useState<ComponentType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!template || !theme) return;

        const loadTheme = async () => {
            try {
                const mod = await import(`@/templates/${template}/themes/${theme}/index`);
                setThemeComponent(() => mod.default);
            } catch (err) {
                console.error('Failed to load theme:', err);
                setError('Theme not found or failed to load.');
            }
        };

        loadTheme();
    }, [template, theme]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!ThemeComponent) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ThemeComponent />
        </div>
    );
};

export default PreviewTheme;
