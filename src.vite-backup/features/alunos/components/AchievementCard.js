import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/features/gamificacao/components/AchievementCard.tsx
import { Badge, Star, Lock } from 'lucide-react';
export function AchievementCard({ achievement, onClick }) {
    const isUnlocked = achievement.is_unlocked;
    const progress = achievement.progress;
    return (_jsxs("div", { "data-testid": "achievement-card", className: `
        relative p-6 rounded-lg border transition-all duration-200 cursor-pointer
        ${isUnlocked
            ? 'border-green-200 bg-green-50 hover:shadow-md'
            : 'border-gray-200 bg-gray-50 opacity-75'}
        ${onClick ? 'hover:shadow-lg' : ''}
      `, onClick: onClick, children: [_jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-full bg-white mb-4 mx-auto", children: achievement.badge_icon ? (_jsx("span", { className: "text-2xl", children: achievement.badge_icon })) : isUnlocked ? (_jsx(Star, { className: "w-6 h-6 text-yellow-500" })) : (_jsx(Lock, { className: "w-6 h-6 text-gray-400" })) }), _jsxs("div", { className: "text-center", children: [_jsx("h3", { className: `font-semibold mb-2 ${isUnlocked ? 'text-gray-900' : 'text-gray-600'}`, children: achievement.name }), _jsx("p", { className: `text-sm mb-4 ${isUnlocked ? 'text-gray-700' : 'text-gray-500'}`, children: achievement.description }), !isUnlocked && progress && (_jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-indigo-600 h-2 rounded-full transition-all duration-300", style: { width: `${(progress.current / progress.target) * 100}%` } }) }), _jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [progress.current, " / ", progress.target] })] })), _jsxs("div", { className: `
          inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
          ${isUnlocked
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'}
        `, children: [_jsx(Badge, { className: "w-4 h-4 mr-1" }), achievement.points_reward, " pts"] })] }), isUnlocked && (_jsx("div", { className: "absolute top-2 right-2", children: _jsx("div", { className: "w-6 h-6 bg-green-500 rounded-full flex items-center justify-center", children: _jsx(Star, { className: "w-4 h-4 text-white", fill: "currentColor" }) }) }))] }));
}
export default AchievementCard;
