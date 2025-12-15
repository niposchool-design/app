import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
export const NipoCard = ({ title, subtitle, header, children, footer, hoverable = false, bordered = true, padding = 'md', className, bodyClassName, onClick, }) => {
    // Classes base do card
    const cardClasses = clsx('bg-white rounded-lg transition-all duration-200', bordered && 'border border-gray-200', hoverable && 'hover:shadow-lg cursor-pointer', !hoverable && 'shadow-sm', onClick && 'cursor-pointer', className);
    // Classes de padding
    const paddingClasses = {
        none: '',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-6',
    };
    // Classes do body
    const bodyClasses = clsx(paddingClasses[padding], bodyClassName);
    return (_jsxs("div", { className: cardClasses, onClick: onClick, children: [(title || subtitle || header) && (_jsx("div", { className: clsx('border-b border-gray-100', paddingClasses[padding], 'pb-4'), children: header ? (header) : (_jsxs(_Fragment, { children: [title && (_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: title })), subtitle && (_jsx("p", { className: "text-sm text-gray-600 mt-1", children: subtitle }))] })) })), _jsx("div", { className: bodyClasses, children: children }), footer && (_jsx("div", { className: clsx('border-t border-gray-100', paddingClasses[padding], 'pt-4'), children: footer }))] }));
};
// Subcomponentes para composição flexível
export const NipoCardHeader = ({ children, className, }) => {
    return (_jsx("div", { className: clsx('px-5 py-4 border-b border-gray-100', className), children: children }));
};
export const NipoCardBody = ({ children, className, }) => {
    return (_jsx("div", { className: clsx('px-5 py-4', className), children: children }));
};
export const NipoCardFooter = ({ children, className, }) => {
    return (_jsx("div", { className: clsx('px-5 py-4 border-t border-gray-100', className), children: children }));
};
// Variantes especiais
export const NipoCardStat = ({ label, value, icon, trend, trendValue, className }) => {
    const trendColors = {
        up: 'text-green-600',
        down: 'text-red-600',
        neutral: 'text-gray-600',
    };
    return (_jsx(NipoCard, { padding: "md", className: className, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: label }), _jsx("p", { className: "text-3xl font-bold text-gray-900 mt-2", children: value }), trend && trendValue && (_jsxs("p", { className: clsx('text-sm mt-2', trendColors[trend]), children: [trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→', " ", trendValue] }))] }), icon && (_jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600", children: icon }))] }) }));
};
