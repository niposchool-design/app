import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
export function Toast({ type, message, onClose, className = '' }) {
    const icons = {
        success: _jsx(CheckCircle, { className: "w-5 h-5 text-green-500" }),
        error: _jsx(XCircle, { className: "w-5 h-5 text-red-500" }),
        warning: _jsx(AlertCircle, { className: "w-5 h-5 text-yellow-500" }),
        info: _jsx(Info, { className: "w-5 h-5 text-blue-500" })
    };
    const colors = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200',
        warning: 'bg-yellow-50 border-yellow-200',
        info: 'bg-blue-50 border-blue-200'
    };
    return (_jsxs("div", { className: `
      flex items-center p-4 rounded-lg border ${colors[type]} ${className}
    `, children: [icons[type], _jsx("span", { className: "ml-3 text-sm font-medium text-gray-900", children: message }), _jsxs("button", { onClick: onClose, className: "ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg hover:bg-gray-100", children: [_jsx("span", { className: "sr-only", children: "Fechar" }), _jsx(XCircle, { className: "w-4 h-4" })] })] }));
}
export default Toast;
