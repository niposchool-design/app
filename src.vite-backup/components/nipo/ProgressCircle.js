import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '../../contexts/ThemeContext';
export function ProgressCircle({ value, size = 'md', role, philosophy = 'zen', showValue = true, showLabel = false, label, strokeWidth, className = '', animated = true }) {
    const { isDark } = useTheme();
    // 📏 Size mappings
    const sizeMap = {
        sm: {
            dimension: 60,
            stroke: strokeWidth || 4,
            fontSize: 'text-xs',
            labelSize: 'text-xs'
        },
        md: {
            dimension: 80,
            stroke: strokeWidth || 6,
            fontSize: 'text-sm',
            labelSize: 'text-sm'
        },
        lg: {
            dimension: 120,
            stroke: strokeWidth || 8,
            fontSize: 'text-lg',
            labelSize: 'text-base'
        },
        xl: {
            dimension: 160,
            stroke: strokeWidth || 10,
            fontSize: 'text-xl',
            labelSize: 'text-lg'
        }
    };
    const config = sizeMap[size];
    const radius = (config.dimension - config.stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;
    // 🎨 Role-based colors
    const getRoleColor = () => {
        if (!role)
            return 'stroke-nipo-primary';
        const roleColorMap = {
            student: 'stroke-nipo-student-500',
            professor: 'stroke-nipo-professor-500',
            admin: 'stroke-nipo-admin-500'
        };
        return roleColorMap[role] || 'stroke-nipo-primary';
    };
    // 🧘 Philosophy animations
    const getPhilosophyClasses = () => {
        switch (philosophy) {
            case 'kaizen':
                return 'hover:animate-scale-gentle';
            case 'wabi-sabi':
                return 'hover:animate-wave-gentle';
            case 'zen':
                return 'hover:animate-zen-breath';
            default:
                return '';
        }
    };
    return (_jsxs("div", { className: `inline-flex flex-col items-center gap-2 ${getPhilosophyClasses()} ${className}`, children: [_jsxs("div", { className: "relative", children: [_jsxs("svg", { width: config.dimension, height: config.dimension, className: "transform -rotate-90", children: [_jsx("circle", { cx: config.dimension / 2, cy: config.dimension / 2, r: radius, stroke: "currentColor", strokeWidth: config.stroke, fill: "none", className: "text-nipo-zen-200 dark:text-nipo-zen-700" }), _jsx("circle", { cx: config.dimension / 2, cy: config.dimension / 2, r: radius, stroke: "currentColor", strokeWidth: config.stroke, fill: "none", strokeLinecap: "round", strokeDasharray: strokeDasharray, strokeDashoffset: strokeDashoffset, className: `${getRoleColor()} ${animated ? 'transition-all duration-1000 ease-in-out' : ''}`, style: {
                                    filter: 'drop-shadow(0 0 8px currentColor)',
                                } })] }), showValue && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("span", { className: `
              ${config.fontSize} font-zen font-bold
              ${isDark ? 'text-white' : 'text-nipo-zen-900'}
            `, children: [Math.round(value), "%"] }) }))] }), showLabel && label && (_jsx("span", { className: `
          ${config.labelSize} font-zen font-medium text-center
          ${isDark ? 'text-nipo-zen-300' : 'text-nipo-zen-700'}
        `, children: label }))] }));
}
// 🎌 Componentes especializados por role
export function StudentProgressCircle(props) {
    return _jsx(ProgressCircle, { ...props, role: "student", philosophy: "kaizen" });
}
export function ProfessorProgressCircle(props) {
    return _jsx(ProgressCircle, { ...props, role: "professor", philosophy: "zen" });
}
export function AdminProgressCircle(props) {
    return _jsx(ProgressCircle, { ...props, role: "admin", philosophy: "wabi-sabi" });
}
