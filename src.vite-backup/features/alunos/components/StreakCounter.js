import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/features/gamificacao/components/StreakCounter.tsx
import { Flame, Calendar } from 'lucide-react';
export function StreakCounter({ currentStreak, bestStreak, size = 'md', showBest = true }) {
    const sizeClasses = {
        sm: {
            container: 'text-sm',
            icon: 'w-4 h-4',
            number: 'text-lg',
        },
        md: {
            container: 'text-base',
            icon: 'w-5 h-5',
            number: 'text-xl',
        },
        lg: {
            container: 'text-lg',
            icon: 'w-6 h-6',
            number: 'text-2xl',
        },
    };
    const getStreakColor = (streak) => {
        if (streak === 0)
            return 'text-gray-400';
        if (streak < 3)
            return 'text-yellow-500';
        if (streak < 7)
            return 'text-orange-500';
        if (streak < 30)
            return 'text-red-500';
        return 'text-purple-500';
    };
    const getStreakMessage = (streak) => {
        if (streak === 0)
            return 'Comece sua sequência hoje!';
        if (streak === 1)
            return 'Primeiro dia! Continue assim!';
        if (streak < 3)
            return 'Bom começo!';
        if (streak < 7)
            return 'Está pegando fogo! 🔥';
        if (streak < 30)
            return 'Sequência incrível!';
        return 'Você é imparável! ⚡';
    };
    return (_jsxs("div", { className: `${sizeClasses[size].container}`, children: [_jsxs("div", { className: "flex items-center justify-center space-x-2 mb-2", children: [_jsx(Flame, { className: `${sizeClasses[size].icon} ${getStreakColor(currentStreak)}`, fill: currentStreak > 0 ? 'currentColor' : 'none' }), _jsx("span", { className: `font-bold ${sizeClasses[size].number} ${getStreakColor(currentStreak)}`, children: currentStreak }), _jsx("span", { className: "text-gray-600", children: currentStreak === 1 ? 'dia' : 'dias' })] }), _jsx("p", { className: "text-center text-gray-600 text-sm mb-3", children: getStreakMessage(currentStreak) }), showBest && bestStreak > 0 && (_jsxs("div", { className: "flex items-center justify-center space-x-1 text-gray-500 text-sm", children: [_jsx(Calendar, { className: "w-4 h-4" }), _jsxs("span", { children: ["Melhor: ", bestStreak, " ", bestStreak === 1 ? 'dia' : 'dias'] })] })), currentStreak > 0 && currentStreak < 30 && (_jsxs("div", { className: "mt-3", children: [_jsxs("div", { className: "text-xs text-gray-500 mb-1", children: ["Pr\u00F3xima conquista em ", getNextMilestone(currentStreak) - currentStreak, " ", getNextMilestone(currentStreak) - currentStreak === 1 ? 'dia' : 'dias'] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: `h-2 rounded-full transition-all duration-300 ${getStreakColor(currentStreak)}`, style: {
                                width: `${(currentStreak / getNextMilestone(currentStreak)) * 100}%`,
                                backgroundColor: 'currentColor'
                            } }) })] }))] }));
}
// Helper para calcular próximo marco
function getNextMilestone(streak) {
    if (streak < 3)
        return 3;
    if (streak < 7)
        return 7;
    if (streak < 14)
        return 14;
    if (streak < 30)
        return 30;
    return 60;
}
export default StreakCounter;
