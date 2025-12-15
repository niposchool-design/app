import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
export const FormLabel = ({ children, htmlFor, isRequired, disabled, className, }) => {
    return (_jsxs("label", { htmlFor: htmlFor, className: clsx('block text-sm font-medium text-gray-700 mb-1', disabled && 'opacity-50 cursor-not-allowed', className), children: [children, isRequired && _jsx("span", { className: "text-red-500 ml-1", "aria-label": "required", children: "*" })] }));
};
export const FormHelperText = ({ children, className, }) => {
    return (_jsx("p", { className: clsx('text-sm text-gray-500 mt-1', className), children: children }));
};
export const FormGroup = ({ children, className, }) => {
    return (_jsx("div", { className: clsx('mb-4', className), children: children }));
};
