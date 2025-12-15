/**
 * 🎨 USE THEME - NIPO SCHOOL
 *
 * Hook para gerenciamento de tema conforme blueprint
 */
import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
export function useTheme() {
    const [storedTheme, setStoredTheme] = useLocalStorage('nipo-theme', 'system');
    const [theme, setTheme] = useState(storedTheme);
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            root.classList.add(systemTheme);
        }
        else {
            root.classList.add(theme);
        }
    }, [theme]);
    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        setStoredTheme(newTheme);
    };
    return {
        theme,
        setTheme: changeTheme,
        isDark: theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    };
}
export default useTheme;
