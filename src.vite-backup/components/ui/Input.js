import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
export const Input = forwardRef(({ variant = 'default', size = 'md', role, philosophy = 'none', label, description, error, success = false, leftIcon, rightIcon, showPasswordToggle = false, type = 'text', className = '', disabled, ...props }, ref) => {
    const { isDark } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    // 🔐 Password toggle logic
    const isPasswordField = type === 'password' || showPasswordToggle;
    const inputType = isPasswordField && showPassword ? 'text' : type;
    // 📏 Size classes
    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
    };
    // 🎨 Variant styles
    const getVariantClasses = () => {
        const baseClasses = `
        w-full font-zen rounded-zen transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
      `;
        // 🔴 Error state
        if (error) {
            return `
          ${baseClasses}
          border-2 border-red-300 dark:border-red-600
          bg-red-50 dark:bg-red-900/20
          text-red-900 dark:text-red-100
          placeholder:text-red-400 dark:placeholder:text-red-500
          focus:ring-red-500 focus:border-red-500
        `;
        }
        // 🟢 Success state
        if (success) {
            return `
          ${baseClasses}
          border-2 border-green-300 dark:border-green-600
          bg-green-50 dark:bg-green-900/20
          text-green-900 dark:text-green-100
          placeholder:text-green-400 dark:placeholder:text-green-500
          focus:ring-green-500 focus:border-green-500
        `;
        }
        // 👤 Role-based colors
        if (role) {
            const roleColorMap = {
                student: 'focus:ring-nipo-student-500 focus:border-nipo-student-500',
                professor: 'focus:ring-nipo-professor-500 focus:border-nipo-professor-500',
                admin: 'focus:ring-nipo-admin-500 focus:border-nipo-admin-500'
            };
            const roleColor = roleColorMap[role] || 'focus:ring-nipo-primary';
            return `
          ${baseClasses}
          border border-nipo-zen-300 dark:border-nipo-zen-600
          bg-white dark:bg-nipo-zen-800
          text-nipo-zen-900 dark:text-white
          placeholder:text-nipo-zen-500 dark:placeholder:text-nipo-zen-400
          ${roleColor}
        `;
        }
        // 🎨 Variants
        switch (variant) {
            case 'zen':
                return `
            ${baseClasses}
            border-2 border-nipo-zen-300 dark:border-nipo-zen-600
            bg-gradient-to-r from-nipo-zen-50 to-white
            dark:from-nipo-zen-800 dark:to-nipo-zen-700
            text-nipo-zen-900 dark:text-white
            placeholder:text-nipo-zen-500 dark:placeholder:text-nipo-zen-400
            focus:ring-nipo-zen-500 focus:border-nipo-zen-500
            hover:shadow-zen
          `;
            case 'outlined':
                return `
            ${baseClasses}
            border-2 border-nipo-zen-300 dark:border-nipo-zen-600
            bg-transparent
            text-nipo-zen-900 dark:text-white
            placeholder:text-nipo-zen-500 dark:placeholder:text-nipo-zen-400
            focus:ring-nipo-primary focus:border-nipo-primary
            hover:border-nipo-zen-400 dark:hover:border-nipo-zen-500
          `;
            case 'filled':
                return `
            ${baseClasses}
            border border-transparent
            bg-nipo-zen-100 dark:bg-nipo-zen-700
            text-nipo-zen-900 dark:text-white
            placeholder:text-nipo-zen-600 dark:placeholder:text-nipo-zen-300
            focus:ring-nipo-primary focus:border-nipo-primary
            focus:bg-white dark:focus:bg-nipo-zen-800
          `;
            case 'default':
            default:
                return `
            ${baseClasses}
            border border-nipo-zen-300 dark:border-nipo-zen-600
            bg-white dark:bg-nipo-zen-800
            text-nipo-zen-900 dark:text-white
            placeholder:text-nipo-zen-500 dark:placeholder:text-nipo-zen-400
            focus:ring-nipo-primary focus:border-nipo-primary
          `;
        }
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
    // 🎯 Final classes
    const finalClasses = `
      ${getVariantClasses()}
      ${sizeClasses[size]}
      ${getPhilosophyClasses()}
      ${leftIcon ? 'pl-12' : ''}
      ${rightIcon || isPasswordField ? 'pr-12' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ');
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { className: `
            block text-sm font-zen font-medium mb-2
            ${error ? 'text-red-700 dark:text-red-300' : ''}
            ${success ? 'text-green-700 dark:text-green-300' : ''}
            ${!error && !success ? 'text-nipo-zen-700 dark:text-nipo-zen-300' : ''}
          `, children: label })), _jsxs("div", { className: "relative", children: [leftIcon && (_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("div", { className: `
                w-5 h-5
                ${error ? 'text-red-400' : ''}
                ${success ? 'text-green-400' : ''}
                ${!error && !success ? 'text-nipo-zen-400' : ''}
              `, children: leftIcon }) })), _jsx("input", { ref: ref, type: inputType, className: finalClasses, disabled: disabled, onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), ...props }), _jsxs("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: [isPasswordField && (_jsx("button", { type: "button", className: `
                  w-5 h-5 transition-colors duration-200
                  ${error ? 'text-red-400 hover:text-red-600' : ''}
                  ${success ? 'text-green-400 hover:text-green-600' : ''}
                  ${!error && !success ? 'text-nipo-zen-400 hover:text-nipo-zen-600' : ''}
                `, onClick: () => setShowPassword(!showPassword), "aria-label": showPassword ? 'Hide password' : 'Show password', children: showPassword ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) })), !isPasswordField && (error || success) && (_jsx("div", { className: `w-5 h-5 ${error ? 'text-red-400' : 'text-green-400'}`, children: error ? _jsx(AlertCircle, { className: "w-5 h-5" }) : _jsx(CheckCircle, { className: "w-5 h-5" }) })), !isPasswordField && !error && !success && rightIcon && (_jsx("div", { className: "w-5 h-5 text-nipo-zen-400", children: rightIcon }))] })] }), description && !error && (_jsx("p", { className: "mt-2 text-sm text-nipo-zen-600 dark:text-nipo-zen-400", children: description })), error && (_jsx("p", { className: "mt-2 text-sm text-red-600 dark:text-red-400 font-zen", children: error }))] }));
});
Input.displayName = 'Input';
// 🎌 Componentes especializados por role
export function StudentInput(props) {
    return _jsx(Input, { ...props, role: "student", philosophy: "kaizen" });
}
export function ProfessorInput(props) {
    return _jsx(Input, { ...props, role: "professor", philosophy: "zen" });
}
export function AdminInput(props) {
    return _jsx(Input, { ...props, role: "admin", philosophy: "wabi-sabi" });
}
// 🎯 Input variants específicos
export function ZenInput(props) {
    return _jsx(Input, { ...props, variant: "zen", philosophy: "zen" });
}
export function OutlinedInput(props) {
    return _jsx(Input, { ...props, variant: "outlined" });
}
export function FilledInput(props) {
    return _jsx(Input, { ...props, variant: "filled" });
}
