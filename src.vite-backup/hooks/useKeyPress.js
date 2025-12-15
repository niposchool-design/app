/**
 * ⌨️ USE KEY PRESS - NIPO SCHOOL
 *
 * Hook para detectar teclas pressionadas conforme blueprint
 */
import { useState, useEffect } from 'react';
export function useKeyPress(targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);
    useEffect(() => {
        const downHandler = (event) => {
            if (event.key === targetKey) {
                setKeyPressed(true);
            }
        };
        const upHandler = (event) => {
            if (event.key === targetKey) {
                setKeyPressed(false);
            }
        };
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [targetKey]);
    return keyPressed;
}
export default useKeyPress;
