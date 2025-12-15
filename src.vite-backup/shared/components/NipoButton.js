import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🎨 NIPO BUTTON - Componente de Botão Reutilizável
 *
 * Botão estilizado com variantes, tamanhos e estados
 * Segue o design system Nipo School
 */
import React from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
export const NipoButton = React.forwardRef(({ variant = 'primary', size = 'md', isLoading = false, disabled = false, leftIcon, rightIcon, fullWidth = false, className, children, type = 'button', ...props }, ref) => {
    // Classes base
    const baseClasses = clsx('inline-flex items-center justify-center gap-2', 'font-medium rounded-lg transition-all duration-200', 'focus:outline-none focus:ring-2 focus:ring-offset-2', 'disabled:opacity-50 disabled:cursor-not-allowed', 'active:scale-95', fullWidth && 'w-full');
    // Classes de variante
    const variantClasses = {
        primary: clsx('bg-indigo-600 text-white', 'hover:bg-indigo-700', 'focus:ring-indigo-500', 'shadow-sm hover:shadow-md'),
        secondary: clsx('bg-gray-200 text-gray-900', 'hover:bg-gray-300', 'focus:ring-gray-400'),
        danger: clsx('bg-red-600 text-white', 'hover:bg-red-700', 'focus:ring-red-500', 'shadow-sm hover:shadow-md'),
        ghost: clsx('bg-transparent text-gray-700', 'hover:bg-gray-100', 'focus:ring-gray-400'),
        outline: clsx('bg-transparent border-2 border-indigo-600 text-indigo-600', 'hover:bg-indigo-50', 'focus:ring-indigo-500'),
    };
    // Classes de tamanho
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };
    // Classes combinadas
    const buttonClasses = clsx(baseClasses, variantClasses[variant], sizeClasses[size], className);
    return (_jsxs("button", { ref: ref, type: type, disabled: disabled || isLoading, className: buttonClasses, ...props, children: [isLoading && (_jsx(Loader2, { className: "animate-spin", size: size === 'sm' ? 14 : size === 'lg' ? 20 : 16 })), !isLoading && leftIcon && (_jsx("span", { className: "inline-flex", children: leftIcon })), _jsx("span", { children: children }), !isLoading && rightIcon && (_jsx("span", { className: "inline-flex", children: rightIcon }))] }));
});
NipoButton.displayName = 'NipoButton';
