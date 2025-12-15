/**
 * ⏱️ USE DEBOUNCE - NIPO SCHOOL
 *
 * Hook para debounce conforme blueprint
 */
import { useState, useEffect } from 'react';
export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
export default useDebounce;
