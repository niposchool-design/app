import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { useTheme, useRoleColors } from '../../contexts/ThemeContext';
export const Card = forwardRef(({ children, variant = 'default', role, philosophy = 'none', interactive = false, glow = false, className = '', ...props }, ref) => {
    const { isDark } = useTheme();
    const roleColors = useRoleColors();
    // 🎨 Variant styles
    const getVariantClasses = () => {
        const baseClasses = 'rounded-zen transition-all duration-300 ease-in-out';
        switch (variant) {
            case 'elevated':
                return `
            ${baseClasses}
            bg-white dark:bg-nipo-zen-800
            shadow-zen hover:shadow-float
            border border-nipo-zen-200 dark:border-nipo-zen-700
            hover:translate-y-[-2px]
          `;
            case 'outlined':
                return `
            ${baseClasses}
            bg-transparent
            border-2 border-nipo-zen-300 dark:border-nipo-zen-600
            hover:border-nipo-zen-400 dark:hover:border-nipo-zen-500
            hover:bg-nipo-zen-50 dark:hover:bg-nipo-zen-800/50
          `;
            case 'glass':
                return `
            ${baseClasses}
            bg-white/80 dark:bg-nipo-zen-800/80
            backdrop-blur-zen backdrop-saturate-150
            border border-white/20 dark:border-nipo-zen-700/50
            shadow-zen
          `;
            case 'zen':
                return `
            ${baseClasses}
            bg-gradient-to-br from-nipo-zen-50 to-nipo-zen-100
            dark:from-nipo-zen-800 dark:to-nipo-zen-900
            border border-nipo-zen-200 dark:border-nipo-zen-700
            shadow-soft hover:shadow-zen
            relative overflow-hidden
            before:absolute before:inset-0
            before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
            before:translate-x-[-100%] before:skew-x-[-45deg]
            hover:before:translate-x-[100%] before:transition-transform before:duration-700
          `;
            case 'default':
            default:
                return `
            ${baseClasses}
            bg-white dark:bg-nipo-zen-800
            border border-nipo-zen-200 dark:border-nipo-zen-700
            shadow-soft hover:shadow-zen
          `;
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
    // 🧘 Philosophy animations
    const getPhilosophyClasses = () => {
        switch (philosophy) {
            case 'kaizen':
                return 'state-kaizen';
            case 'wabi-sabi':
                return 'state-wabi-sabi';
            case 'zen':
                return 'state-zen';
            default:
                return '';
        }
    };
    // ✨ Interactive states
    const getInteractiveClasses = () => {
        if (!interactive)
            return '';
        return `
        cursor-pointer
        hover:scale-[1.02]
        active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-nipo-primary focus:ring-offset-2
      `;
    };
    // 🌟 Glow effect
    const getGlowClasses = () => {
        if (!glow)
            return '';
        return `
        shadow-glow
        hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]
        dark:shadow-[0_0_20px_rgba(139,92,246,0.3)]
      `;
    };
    // 🎯 Final classes
    const finalClasses = `
      ${getVariantClasses()}
      ${getRoleClasses()}
      ${getPhilosophyClasses()}
      ${getInteractiveClasses()}
      ${getGlowClasses()}
      ${className}
    `.trim().replace(/\s+/g, ' ');
    return (_jsx("div", { ref: ref, className: finalClasses, ...props, children: children }));
});
Card.displayName = 'Card';
// 🎌 Componentes especializados por role
export function StudentCard(props) {
    return _jsx(Card, { ...props, role: "student", philosophy: "kaizen" });
}
export function ProfessorCard(props) {
    return _jsx(Card, { ...props, role: "professor", philosophy: "zen" });
}
export function AdminCard(props) {
    return _jsx(Card, { ...props, role: "admin", philosophy: "wabi-sabi" });
}
// 🎯 Card variants específicos
export function ElevatedCard(props) {
    return _jsx(Card, { ...props, variant: "elevated" });
}
export function GlassCard(props) {
    return _jsx(Card, { ...props, variant: "glass" });
}
export function ZenCard(props) {
    return _jsx(Card, { ...props, variant: "zen", philosophy: "zen" });
}
export function InteractiveCard(props) {
    return _jsx(Card, { ...props, interactive: true });
}
// 🏗️ Card compound components
export function CardHeader({ children, className = '', ...props }) {
    return (_jsx("div", { className: `px-6 py-4 border-b border-nipo-zen-200 dark:border-nipo-zen-700 ${className}`, ...props, children: children }));
}
export function CardContent({ children, className = '', ...props }) {
    return (_jsx("div", { className: `px-6 py-4 ${className}`, ...props, children: children }));
}
export function CardFooter({ children, className = '', ...props }) {
    return (_jsx("div", { className: `px-6 py-4 border-t border-nipo-zen-200 dark:border-nipo-zen-700 ${className}`, ...props, children: children }));
}
export function CardTitle({ children, className = '', ...props }) {
    return (_jsx("h3", { className: `text-lg font-zen font-semibold text-nipo-zen-900 dark:text-white ${className}`, ...props, children: children }));
}
export function CardDescription({ children, className = '', ...props }) {
    return (_jsx("p", { className: `text-sm text-nipo-zen-600 dark:text-nipo-zen-400 ${className}`, ...props, children: children }));
}
