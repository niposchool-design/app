import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '../../contexts/ThemeContext';
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
// 📊 Trend icons
const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus
};
// 🎨 Trend colors
const trendColors = {
    up: 'text-green-500 bg-green-100 dark:bg-green-900/30',
    down: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    neutral: 'text-nipo-zen-500 bg-nipo-zen-100 dark:bg-nipo-zen-800'
};
export function StatsCard({ title, value, subtitle, trend, trendValue, icon = _jsx(BarChart3, { className: "w-6 h-6" }), role, philosophy = 'zen', variant = 'default', className = '', onClick }) {
    const { isDark } = useTheme();
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
    // 👤 Role-based styling
    const getRoleClasses = () => {
        if (!role)
            return '';
        const roleMap = {
            student: 'hover:shadow-student hover:border-nipo-student-300',
            professor: 'hover:shadow-professor hover:border-nipo-professor-300',
            admin: 'hover:shadow-admin hover:border-nipo-admin-300'
        };
        return roleMap[role] || '';
    };
    // 🎨 Variant styling
    const getVariantClasses = () => {
        const baseClasses = `
      relative overflow-hidden rounded-zen p-6 transition-all duration-300
      ${onClick ? 'cursor-pointer' : ''}
      ${getPhilosophyClasses()}
      ${getRoleClasses()}
    `;
        switch (variant) {
            case 'gradient':
                const gradientMap = {
                    student: 'bg-gradient-to-br from-nipo-student-500 to-nipo-student-600',
                    professor: 'bg-gradient-to-br from-nipo-professor-500 to-nipo-professor-600',
                    admin: 'bg-gradient-to-br from-nipo-admin-500 to-nipo-admin-600'
                };
                return `
          ${baseClasses}
          ${role ? gradientMap[role] : 'bg-gradient-to-br from-nipo-primary to-nipo-primary-hover'}
          text-white border-0 shadow-lg hover:shadow-xl
        `;
            case 'minimal':
                return `
          ${baseClasses}
          bg-transparent border-0 p-4
          hover:bg-nipo-zen-50 dark:hover:bg-nipo-zen-800/50
        `;
            case 'detailed':
                return `
          ${baseClasses}
          bg-white dark:bg-nipo-zen-800 border-2 border-nipo-zen-200 dark:border-nipo-zen-700
          shadow-zen hover:shadow-float hover:translate-y-[-2px]
        `;
            case 'default':
            default:
                return `
          ${baseClasses}
          bg-white dark:bg-nipo-zen-800 border border-nipo-zen-200 dark:border-nipo-zen-700
          shadow-soft hover:shadow-zen
        `;
        }
    };
    // 📊 Trend component
    const TrendIcon = trend ? trendIcons[trend] : null;
    const trendColorClass = trend ? trendColors[trend] : '';
    return (_jsxs("div", { className: `${getVariantClasses()} ${className}`, onClick: onClick, children: [variant === 'gradient' && (_jsx("div", { className: "absolute top-0 right-0 w-32 h-32 opacity-20", children: _jsx("div", { className: "absolute inset-0 bg-white rounded-full transform translate-x-16 -translate-y-16" }) })), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `
              w-12 h-12 rounded-zen flex items-center justify-center
              ${variant === 'gradient'
                                            ? 'bg-white/20 text-white'
                                            : 'bg-nipo-zen-100 dark:bg-nipo-zen-700 text-nipo-zen-600 dark:text-nipo-zen-300'}
            `, children: icon }), _jsx("div", { children: _jsx("h3", { className: `
                font-zen font-medium text-sm
                ${variant === 'gradient'
                                                ? 'text-white/90'
                                                : 'text-nipo-zen-600 dark:text-nipo-zen-400'}
              `, children: title }) })] }), trend && TrendIcon && (_jsxs("div", { className: `
              flex items-center gap-1 px-2 py-1 rounded-full
              ${variant === 'gradient' ? 'bg-white/20 text-white' : trendColorClass}
            `, children: [_jsx(TrendIcon, { className: "w-4 h-4" }), trendValue && (_jsx("span", { className: "text-xs font-zen font-medium", children: trendValue }))] }))] }), _jsx("div", { className: "mb-2", children: _jsx("div", { className: `
            text-3xl font-zen font-bold
            ${variant === 'gradient'
                                ? 'text-white'
                                : 'text-nipo-zen-900 dark:text-white'}
          `, children: value }) }), subtitle && (_jsx("p", { className: `
            text-sm font-zen
            ${variant === 'gradient'
                            ? 'text-white/80'
                            : 'text-nipo-zen-600 dark:text-nipo-zen-400'}
          `, children: subtitle }))] }), onClick && (_jsx("div", { className: `
          absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300
          ${variant === 'gradient'
                    ? 'bg-white/10'
                    : 'bg-nipo-zen-50 dark:bg-nipo-zen-700/50'}
          rounded-zen pointer-events-none
        ` }))] }));
}
// 🎌 Componentes especializados por role
export function StudentStatsCard(props) {
    return _jsx(StatsCard, { ...props, role: "student", philosophy: "kaizen" });
}
export function ProfessorStatsCard(props) {
    return _jsx(StatsCard, { ...props, role: "professor", philosophy: "zen" });
}
export function AdminStatsCard(props) {
    return _jsx(StatsCard, { ...props, role: "admin", philosophy: "wabi-sabi" });
}
// 🎯 Variants específicos
export function GradientStatsCard(props) {
    return _jsx(StatsCard, { ...props, variant: "gradient" });
}
export function MinimalStatsCard(props) {
    return _jsx(StatsCard, { ...props, variant: "minimal" });
}
export function DetailedStatsCard(props) {
    return _jsx(StatsCard, { ...props, variant: "detailed" });
}
export function StatsGrid({ children, columns = 4, className = '' }) {
    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    };
    return (_jsx("div", { className: `
      grid ${gridCols[columns]} gap-6
      ${className}
    `, children: children }));
}
