import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '../../contexts/ThemeContext';
import { Trophy, Star, Award, Medal, Crown, Zap } from 'lucide-react';
// 🏆 Icon mapping por tipo
const achievementIcons = {
    bronze: Medal,
    silver: Award,
    gold: Trophy,
    platinum: Star,
    diamond: Crown
};
// 🎨 Color mapping por tipo
const achievementColors = {
    bronze: {
        bg: 'from-orange-400 to-orange-600',
        border: 'border-orange-300',
        glow: 'shadow-[0_0_20px_rgba(251,146,60,0.4)]',
        text: 'text-orange-700'
    },
    silver: {
        bg: 'from-gray-400 to-gray-600',
        border: 'border-gray-300',
        glow: 'shadow-[0_0_20px_rgba(156,163,175,0.4)]',
        text: 'text-gray-700'
    },
    gold: {
        bg: 'from-yellow-400 to-yellow-600',
        border: 'border-yellow-300',
        glow: 'shadow-[0_0_20px_rgba(251,191,36,0.4)]',
        text: 'text-yellow-700'
    },
    platinum: {
        bg: 'from-indigo-400 to-indigo-600',
        border: 'border-indigo-300',
        glow: 'shadow-[0_0_20px_rgba(129,140,248,0.4)]',
        text: 'text-indigo-700'
    },
    diamond: {
        bg: 'from-purple-400 to-purple-600',
        border: 'border-purple-300',
        glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
        text: 'text-purple-700'
    }
};
export function AchievementCard({ title, description, icon, type = 'bronze', progress, unlocked = false, role, philosophy = 'kaizen', className = '', onClick }) {
    const { isDark } = useTheme();
    const DefaultIcon = achievementIcons[type];
    const colors = achievementColors[type];
    // 🧘 Philosophy animations
    const getPhilosophyClasses = () => {
        switch (philosophy) {
            case 'kaizen':
                return 'hover:animate-scale-gentle transform-gpu';
            case 'wabi-sabi':
                return 'hover:animate-wave-gentle';
            case 'zen':
                return 'hover:animate-zen-breath';
            default:
                return '';
        }
    };
    // 👤 Role-based enhancements
    const getRoleClasses = () => {
        if (!role)
            return '';
        const roleMap = {
            student: 'hover:shadow-student',
            professor: 'hover:shadow-professor',
            admin: 'hover:shadow-admin'
        };
        return roleMap[role] || '';
    };
    return (_jsxs("div", { className: `
        relative group cursor-pointer
        bg-white dark:bg-nipo-zen-800
        border-2 ${unlocked ? colors.border : 'border-nipo-zen-300 dark:border-nipo-zen-600'}
        rounded-zen overflow-hidden
        transition-all duration-500 ease-in-out
        ${unlocked ? colors.glow : 'shadow-zen'}
        ${unlocked ? 'hover:scale-105' : 'hover:scale-102'}
        ${getPhilosophyClasses()}
        ${getRoleClasses()}
        ${!unlocked ? 'opacity-60 grayscale' : ''}
        ${className}
      `, onClick: onClick, children: [_jsx("div", { className: `
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-br ${colors.bg}
        ${unlocked ? 'opacity-10' : 'opacity-0'}
      ` }), unlocked && (_jsx("div", { className: "absolute top-2 right-2", children: _jsx(Zap, { className: "w-5 h-5 text-yellow-400 animate-pulse" }) })), _jsxs("div", { className: "relative p-6", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("div", { className: `
            w-16 h-16 rounded-full flex items-center justify-center
            ${unlocked ? `bg-gradient-to-br ${colors.bg}` : 'bg-nipo-zen-200 dark:bg-nipo-zen-700'}
            ${unlocked ? 'shadow-lg' : ''}
            transition-all duration-300
          `, children: icon ? (_jsx("div", { className: `w-8 h-8 ${unlocked ? 'text-white' : 'text-nipo-zen-500'}`, children: icon })) : (_jsx(DefaultIcon, { className: `w-8 h-8 ${unlocked ? 'text-white' : 'text-nipo-zen-500'}` })) }), progress !== undefined && (_jsxs("div", { className: "relative w-12 h-12", children: [_jsxs("svg", { className: "w-12 h-12 transform -rotate-90", children: [_jsx("circle", { cx: "24", cy: "24", r: "20", stroke: "currentColor", strokeWidth: "3", fill: "none", className: "text-nipo-zen-200 dark:text-nipo-zen-700" }), _jsx("circle", { cx: "24", cy: "24", r: "20", stroke: "currentColor", strokeWidth: "3", fill: "none", strokeLinecap: "round", strokeDasharray: `${2 * Math.PI * 20}`, strokeDashoffset: `${2 * Math.PI * 20 * (1 - progress / 100)}`, className: unlocked ? colors.text : 'text-nipo-zen-400', style: {
                                                    transition: 'stroke-dashoffset 1s ease-in-out'
                                                } })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("span", { className: "text-xs font-zen font-bold text-nipo-zen-700 dark:text-nipo-zen-300", children: [progress, "%"] }) })] }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: `
            font-zen font-bold text-lg
            ${unlocked ? colors.text + ' dark:text-white' : 'text-nipo-zen-600 dark:text-nipo-zen-400'}
            group-hover:text-nipo-zen-900 dark:group-hover:text-white
            transition-colors duration-300
          `, children: title }), _jsx("p", { className: `
            text-sm font-zen leading-relaxed
            ${unlocked ? 'text-nipo-zen-700 dark:text-nipo-zen-300' : 'text-nipo-zen-500 dark:text-nipo-zen-500'}
            group-hover:text-nipo-zen-800 dark:group-hover:text-nipo-zen-200
            transition-colors duration-300
          `, children: description })] }), !unlocked && (_jsx("div", { className: "absolute inset-0 bg-black/5 dark:bg-black/20 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-8 h-8 mx-auto mb-2 text-nipo-zen-400", children: "\uD83D\uDD12" }), _jsx("span", { className: "text-xs font-zen text-nipo-zen-500", children: "Bloqueado" })] }) })), _jsx("div", { className: `
          absolute inset-0 rounded-zen opacity-0 group-hover:opacity-100
          bg-gradient-to-r ${colors.bg}
          transition-opacity duration-300
          pointer-events-none
        `, style: { padding: '2px' }, children: _jsx("div", { className: "w-full h-full bg-white dark:bg-nipo-zen-800 rounded-zen" }) })] })] }));
}
// 🎌 Componentes especializados por role
export function StudentAchievementCard(props) {
    return _jsx(AchievementCard, { ...props, role: "student", philosophy: "kaizen" });
}
export function ProfessorAchievementCard(props) {
    return _jsx(AchievementCard, { ...props, role: "professor", philosophy: "zen" });
}
export function AdminAchievementCard(props) {
    return _jsx(AchievementCard, { ...props, role: "admin", philosophy: "wabi-sabi" });
}
export function AchievementGrid({ children, columns = 3, className = '' }) {
    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    };
    return (_jsx("div", { className: `
      grid ${gridCols[columns]} gap-6
      ${className}
    `, children: children }));
}
