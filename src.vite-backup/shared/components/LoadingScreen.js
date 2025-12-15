import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
export const LoadingScreen = ({ variant = 'page', size = 'md', text = 'Carregando...', className, }) => {
    // Classes de tamanho do spinner
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-12 w-12',
        lg: 'h-16 w-16',
    };
    // Variante: Full Page Loading
    if (variant === 'page') {
        return (_jsx("div", { className: clsx('min-h-screen flex items-center justify-center', 'bg-gradient-to-br from-indigo-50 via-white to-pink-50', className), children: _jsxs("div", { className: "text-center", children: [_jsx(Loader2, { className: clsx('animate-spin text-indigo-600 mx-auto', sizeClasses[size]) }), text && (_jsx("p", { className: "mt-4 text-gray-600 font-medium", children: text }))] }) }));
    }
    // Variante: Inline Loading
    if (variant === 'inline') {
        return (_jsxs("div", { className: clsx('flex items-center justify-center p-4', className), children: [_jsx(Loader2, { className: clsx('animate-spin text-indigo-600', sizeClasses[size]) }), text && (_jsx("span", { className: "ml-3 text-gray-600", children: text }))] }));
    }
    // Variante: Skeleton Loading
    if (variant === 'skeleton') {
        return (_jsxs("div", { className: clsx('space-y-3', className), children: [_jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse w-3/4" }), _jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse w-full" }), _jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse w-5/6" })] }));
    }
    return null;
};
// Componente Spinner simples (para uso inline)
export const Spinner = ({ size = 'md', className, }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
    };
    return (_jsx(Loader2, { className: clsx('animate-spin text-indigo-600', sizeClasses[size], className) }));
};
// Componente Skeleton (para uso inline)
export const Skeleton = ({ className, count = 1, }) => {
    return (_jsx("div", { className: "space-y-3", children: Array.from({ length: count }).map((_, i) => (_jsx("div", { className: clsx('h-4 bg-gray-200 rounded animate-pulse', className) }, i))) }));
};
