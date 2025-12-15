import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle } from 'lucide-react';
import clsx from 'clsx';
export const FormError = ({ message, className, showIcon = true, }) => {
    if (!message)
        return null;
    return (_jsxs("div", { className: clsx('flex items-start gap-2 text-sm text-red-600 mt-1', className), role: "alert", children: [showIcon && _jsx(AlertCircle, { className: "h-4 w-4 mt-0.5 flex-shrink-0" }), _jsx("span", { children: message })] }));
};
export const FormErrorMessage = ({ title = 'Erro ao enviar formulário', errors, className, }) => {
    if (!errors)
        return null;
    const errorArray = Array.isArray(errors) ? errors : [errors];
    return (_jsx("div", { className: clsx('rounded-lg bg-red-50 border border-red-200 p-4', className), role: "alert", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-sm font-semibold text-red-800", children: title }), errorArray.length > 0 && (_jsx("ul", { className: "mt-2 space-y-1", children: errorArray.map((error, index) => (_jsxs("li", { className: "text-sm text-red-700", children: ["\u2022 ", error] }, index))) }))] })] }) }));
};
