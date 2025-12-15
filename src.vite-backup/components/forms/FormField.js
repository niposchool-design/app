import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🎨 FORM FIELD - Componente de Campo de Formulário
 *
 * Wrapper para React Hook Form com validação integrada
 * Segue o design system Nipo School
 */
import React from 'react';
import { NipoInput, NipoTextarea } from '../shared/NipoInput';
export const FormField = React.forwardRef(({ label, registration, error, type = 'text', placeholder, helperText, isRequired, disabled, leftIcon, rightIcon, className, }, ref) => {
    return (_jsx(NipoInput, { ref: ref, label: label, type: type, placeholder: placeholder, helperText: helperText, error: error?.message, isRequired: isRequired, disabled: disabled, leftIcon: leftIcon, rightIcon: rightIcon, className: className, ...registration }));
});
FormField.displayName = 'FormField';
export const FormTextarea = React.forwardRef(({ label, registration, error, placeholder, helperText, isRequired, disabled, rows = 4, className, }, ref) => {
    return (_jsx(NipoTextarea, { ref: ref, label: label, placeholder: placeholder, helperText: helperText, error: error?.message, isRequired: isRequired, disabled: disabled, rows: rows, className: className, ...registration }));
});
FormTextarea.displayName = 'FormTextarea';
export const FormSelect = React.forwardRef(({ label, registration, error, helperText, isRequired, disabled, placeholder, options, className, }, ref) => {
    const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;
    return (_jsxs("div", { className: "w-full", children: [_jsxs("label", { htmlFor: selectId, className: "block text-sm font-medium text-gray-700 mb-1", children: [label, isRequired && _jsx("span", { className: "text-red-500 ml-1", children: "*" })] }), _jsxs("select", { ref: ref, id: selectId, disabled: disabled, className: `
            block w-full rounded-lg border transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            px-3 py-2
            ${error
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
            ${className}
          `, ...registration, children: [placeholder && (_jsx("option", { value: "", disabled: true, children: placeholder })), options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] }), error && (_jsx("p", { className: "text-sm text-red-600 mt-1", children: error.message })), !error && helperText && (_jsx("p", { className: "text-sm text-gray-500 mt-1", children: helperText }))] }));
});
FormSelect.displayName = 'FormSelect';
