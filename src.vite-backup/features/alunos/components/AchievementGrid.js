import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/features/gamificacao/components/AchievementGrid.tsx
import { useState } from 'react';
import { Filter } from 'lucide-react';
import AchievementCard from './AchievementCard';
export function AchievementGrid({ achievements, onAchievementClick }) {
    const [filter, setFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    // Filtrar conquistas
    const filteredAchievements = achievements.filter(achievement => {
        const statusMatch = filter === 'all' ||
            (filter === 'unlocked' && achievement.is_unlocked) ||
            (filter === 'locked' && !achievement.is_unlocked);
        const categoryMatch = categoryFilter === 'all' ||
            achievement.category === categoryFilter;
        return statusMatch && categoryMatch;
    });
    // Categorias únicas
    const categories = Array.from(new Set(achievements.map(a => a.category).filter(Boolean)));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Filter, { className: "w-5 h-5 text-gray-500" }), _jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "border border-gray-300 rounded-md px-3 py-2 text-sm", children: [_jsx("option", { value: "all", children: "Todas" }), _jsx("option", { value: "unlocked", children: "Desbloqueadas" }), _jsx("option", { value: "locked", children: "Bloqueadas" })] })] }), categories.length > 0 && (_jsxs("select", { value: categoryFilter, onChange: (e) => setCategoryFilter(e.target.value), className: "border border-gray-300 rounded-md px-3 py-2 text-sm", children: [_jsx("option", { value: "all", children: "Todas as categorias" }), categories.map(category => (_jsx("option", { value: category, children: category }, category)))] }))] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-gray-900", children: achievements.filter(a => a.is_unlocked).length }), _jsx("div", { className: "text-sm text-gray-600", children: "Desbloqueadas" })] }), _jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-gray-900", children: achievements.length }), _jsx("div", { className: "text-sm text-gray-600", children: "Total" })] }), _jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-indigo-600", children: achievements
                                    .filter(a => a.is_unlocked)
                                    .reduce((sum, a) => sum + a.points_reward, 0) }), _jsx("div", { className: "text-sm text-gray-600", children: "Pontos Ganhos" })] })] }), filteredAchievements.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredAchievements.map(achievement => (_jsx(AchievementCard, { achievement: achievement, onClick: () => onAchievementClick?.(achievement) }, achievement.id))) })) : (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "text-gray-500 mb-2", children: "Nenhuma conquista encontrada" }), _jsx("button", { onClick: () => {
                            setFilter('all');
                            setCategoryFilter('all');
                        }, className: "text-indigo-600 hover:text-indigo-700 text-sm", children: "Limpar filtros" })] }))] }));
}
export default AchievementGrid;
