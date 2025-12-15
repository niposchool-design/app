import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { useRoleColors } from '../../contexts/ThemeContext';
// 📏 Size mappings
const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
};
export const Button = forwardRef(({ children, variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, fullWidth = false, philosophy = 'none', role, className = '', disabled, ...props }, ref) => {
    const roleColors = useRoleColors();
    // 🎨 Variant styles
    const getVariantClasses = () => {
        const baseClasses = 'font-zen font-medium rounded-zen transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
        switch (variant) {
            case 'primary':
                if (role) {
                    return `
              ${baseClasses}
              bg-gradient-to-r from-nipo-${role}-500 to-nipo-${role}-600
              text-white
              hover:from-nipo-${role}-600 hover:to-nipo-${role}-700
              focus:ring-nipo-${role}-500
              shadow-md hover:shadow-lg
              active:scale-95
            `;
                }
                return `
            ${baseClasses}
            bg-gradient-to-r from-nipo-primary to-nipo-primary-hover
            text-white
            hover:from-nipo-primary-hover hover:to-red-700
            focus:ring-nipo-primary
            shadow-md hover:shadow-lg
            active:scale-95
          `;
            case 'secondary':
                return `
            ${baseClasses}
            bg-white dark:bg-nipo-zen-800
            text-nipo-zen-900 dark:text-nipo-zen-100
            border-2 border-nipo-zen-300 dark:border-nipo-zen-600
            hover:bg-nipo-zen-50 dark:hover:bg-nipo-zen-700
            hover:border-nipo-zen-400 dark:hover:border-nipo-zen-500
            focus:ring-nipo-zen-500
            active:scale-95
          `;
            case 'ghost':
                return `
            ${baseClasses}
            bg-transparent
            text-nipo-zen-700 dark:text-nipo-zen-300
            hover:bg-nipo-zen-100 dark:hover:bg-nipo-zen-800
            focus:ring-nipo-zen-500
            active:scale-95
          `;
            case 'zen':
                return `
            ${baseClasses}
            bg-gradient-to-r from-nipo-zen-500 to-nipo-zen-600
            text-white
            hover:from-nipo-zen-600 hover:to-nipo-zen-700
            focus:ring-nipo-zen-500
            shadow-zen hover:shadow-lg
            position-relative overflow-hidden
            before:absolute before:inset-0
            before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent
            before:translate-x-[-100%] before:skew-x-[-45deg]
            hover:before:translate-x-[100%] before:transition-transform before:duration-700
            active:scale-95
          `;
            default:
                return baseClasses;
        }
    };
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
    // 🔄 Loading state
    const LoadingSpinner = () => (_jsxs("svg", { className: "animate-spin h-4 w-4", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }));
    // 🎯 Final classes
    const finalClasses = `
      ${getVariantClasses()}
      ${sizeClasses[size]}
      ${getPhilosophyClasses()}
      ${fullWidth ? 'w-full' : ''}
      ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${className}
    `.trim().replace(/\s+/g, ' ');
    return (_jsx("button", { ref: ref, className: finalClasses, disabled: disabled || isLoading, ...props, children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [isLoading ? (_jsx(LoadingSpinner, {})) : (leftIcon && _jsx("span", { className: "flex-shrink-0", children: leftIcon })), children && (_jsx("span", { className: isLoading ? 'opacity-0' : '', children: children })), !isLoading && rightIcon && (_jsx("span", { className: "flex-shrink-0", children: rightIcon }))] }) }));
});
Button.displayName = 'Button';
// 🎌 Componentes especializados por role
export function StudentButton(props) {
    return _jsx(Button, { ...props, role: "student", philosophy: "kaizen" });
}
export function ProfessorButton(props) {
    return _jsx(Button, { ...props, role: "professor", philosophy: "zen" });
}
export function AdminButton(props) {
    return _jsx(Button, { ...props, role: "admin", philosophy: "wabi-sabi" });
}
// 🎯 Botões de ação comum
export function PrimaryButton(props) {
    return _jsx(Button, { ...props, variant: "primary" });
}
export function SecondaryButton(props) {
    return _jsx(Button, { ...props, variant: "secondary" });
}
export function ZenButton(props) {
    return _jsx(Button, { ...props, variant: "zen", philosophy: "zen" });
}
