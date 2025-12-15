import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function EmptyState({ icon: Icon, title, description, action }) {
    return (_jsxs("div", { className: "text-center py-12", children: [Icon && (_jsx(Icon, { className: "mx-auto h-12 w-12 text-gray-400 mb-4" })), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: title }), _jsx("p", { className: "text-gray-500 mb-6 max-w-sm mx-auto", children: description }), action && (_jsx("button", { onClick: action.onClick, className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700", children: action.label }))] }));
}
export default EmptyState;
