import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
const ThemeContext = createContext(undefined);
export function ThemeProvider({ children }) {
    // 🌙 Theme Mode State
    const [mode, setMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('nipo-theme') || 'system';
        }
        return 'system';
    });
    // 👤 User Role State  
    const [userRole, setUserRole] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('nipo-user-role') || 'student';
        }
        return 'student';
    });
    // 🧘 Zen Mode State
    const [isZenMode, setZenMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('nipo-zen-mode') === 'true';
        }
        return false;
    });
    // 🌙 Calculate if dark mode is active
    const [isDark, setIsDark] = useState(false);
    // 🔄 System theme detection
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const updateTheme = () => {
            const shouldBeDark = mode === 'dark' || (mode === 'system' && mediaQuery.matches);
            setIsDark(shouldBeDark);
            // Apply to document
            if (shouldBeDark) {
                document.documentElement.classList.add('dark');
                document.documentElement.setAttribute('data-theme', 'dark');
            }
            else {
                document.documentElement.classList.remove('dark');
                document.documentElement.setAttribute('data-theme', 'light');
            }
        };
        updateTheme();
        mediaQuery.addEventListener('change', updateTheme);
        return () => mediaQuery.removeEventListener('change', updateTheme);
    }, [mode]);
    // 💾 Persist theme mode
    useEffect(() => {
        localStorage.setItem('nipo-theme', mode);
    }, [mode]);
    // 💾 Persist user role
    useEffect(() => {
        localStorage.setItem('nipo-user-role', userRole);
        // Apply role class to document
        document.documentElement.setAttribute('data-role', userRole);
    }, [userRole]);
    // 💾 Persist zen mode
    useEffect(() => {
        localStorage.setItem('nipo-zen-mode', isZenMode.toString());
        // Apply zen class to document
        if (isZenMode) {
            document.documentElement.classList.add('zen-mode');
        }
        else {
            document.documentElement.classList.remove('zen-mode');
        }
    }, [isZenMode]);
    // 🔄 Toggle between light/dark
    const toggleTheme = () => {
        setMode(prev => prev === 'dark' ? 'light' : 'dark');
    };
    // 🎨 Get role-based colors
    const getRoleColors = () => {
        const roleColorMap = {
            student: {
                primary: '#10b981', // Verde - Crescimento
                secondary: '#34d399',
                accent: '#6ee7b7'
            },
            professor: {
                primary: '#0ea5e9', // Azul - Sabedoria  
                secondary: '#38bdf8',
                accent: '#7dd3fc'
            },
            admin: {
                primary: '#8b5cf6', // Roxo - Poder
                secondary: '#a78bfa',
                accent: '#c4b5fd'
            }
        };
        return roleColorMap[userRole];
    };
    // 🎌 Context value
    const value = {
        mode,
        isDark,
        setMode,
        toggleTheme,
        userRole,
        setUserRole,
        isZenMode,
        setZenMode,
        getRoleColors
    };
    return (_jsx(ThemeContext.Provider, { value: value, children: children }));
}
// 🪝 Hook para usar o tema
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
// 🎨 Hook para cores do role
export function useRoleColors() {
    const { getRoleColors } = useTheme();
    return getRoleColors();
}
// 🌙 Hook para detectar dark mode
export function useDarkMode() {
    const { isDark, toggleTheme } = useTheme();
    return [isDark, toggleTheme];
}
