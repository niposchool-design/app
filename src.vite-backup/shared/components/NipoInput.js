import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🎨 NIPO INPUT - Componente de Input Reutilizável
 *
 * Input estilizado com label, error, ícones e validação visual
 * Segue o design system Nipo School
 */
import React from 'react';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';
export const NipoInput = React.forwardRef(({ label, error, helperText, leftIcon, rightIcon, isRequired, className, containerClassName, labelClassName, disabled, type = 'text', id, ...props }, ref) => {
    // Gerar ID único se não fornecido
    const inputId = id || `nipo-input-${Math.random().toString(36).substr(2, 9)}`;
    // Classes do container
    const wrapperClasses = clsx('w-full', containerClassName);
    // Classes do label
    const labelClasses = clsx('block text-sm font-medium text-gray-700 mb-1', disabled && 'opacity-50', labelClassName);
    // Classes do input
    const inputClasses = clsx('block w-full rounded-lg border transition-colors duration-200', 'focus:outline-none focus:ring-2 focus:ring-offset-0', 'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed', 
    // Com ícone à esquerda
    leftIcon ? 'pl-10' : 'pl-3', 
    // Com ícone à direita
    rightIcon || error ? 'pr-10' : 'pr-3', 'py-2', 
    // Estados
    error
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500', className);
    // Classes do container do input
    const inputContainerClasses = clsx('relative', error && 'mb-1');
    return (_jsxs("div", { className: wrapperClasses, children: [label && (_jsxs("label", { htmlFor: inputId, className: labelClasses, children: [label, isRequired && _jsx("span", { className: "text-red-500 ml-1", children: "*" })] })), _jsxs("div", { className: inputContainerClasses, children: [leftIcon && (_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("span", { className: "text-gray-400", children: leftIcon }) })), _jsx("input", { ref: ref, id: inputId, type: type, disabled: disabled, className: inputClasses, "aria-invalid": error ? 'true' : 'false', "aria-describedby": error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined, ...props }), (rightIcon || error) && (_jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: error ? (_jsx(AlertCircle, { className: "h-5 w-5 text-red-500" })) : (_jsx("span", { className: "text-gray-400", children: rightIcon })) }))] }), error && (_jsx("p", { id: `${inputId}-error`, className: "text-sm text-red-600 mt-1", children: error })), !error && helperText && (_jsx("p", { id: `${inputId}-helper`, className: "text-sm text-gray-500 mt-1", children: helperText }))] }));
});
NipoInput.displayName = 'NipoInput';
export const NipoTextarea = React.forwardRef(({ label, error, helperText, isRequired, className, containerClassName, labelClassName, disabled, id, rows = 4, ...props }, ref) => {
    const textareaId = id || `nipo-textarea-${Math.random().toString(36).substr(2, 9)}`;
    const textareaClasses = clsx('block w-full rounded-lg border transition-colors duration-200', 'focus:outline-none focus:ring-2 focus:ring-offset-0', 'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed', 'px-3 py-2', error
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500', className);
    return (_jsxs("div", { className: clsx('w-full', containerClassName), children: [label && (_jsxs("label", { htmlFor: textareaId, className: clsx('block text-sm font-medium text-gray-700 mb-1', disabled && 'opacity-50', labelClassName), children: [label, isRequired && _jsx("span", { className: "text-red-500 ml-1", children: "*" })] })), _jsx("textarea", { ref: ref, id: textareaId, rows: rows, disabled: disabled, className: textareaClasses, "aria-invalid": error ? 'true' : 'false', ...props }), error && (_jsx("p", { className: "text-sm text-red-600 mt-1", children: error })), !error && helperText && (_jsx("p", { className: "text-sm text-gray-500 mt-1", children: helperText }))] }));
});
NipoTextarea.displayName = 'NipoTextarea';
