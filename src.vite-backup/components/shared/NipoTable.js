import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function NipoTable({ columns, data, loading = false, className = '' }) {
    if (loading) {
        return (_jsx("div", { className: `bg-white rounded-lg shadow-sm border border-gray-200 ${className}`, children: _jsx("div", { className: "p-4", children: _jsx("div", { className: "animate-pulse space-y-3", children: [...Array(5)].map((_, i) => (_jsx("div", { className: "h-4 bg-gray-200 rounded" }, i))) }) }) }));
    }
    return (_jsx("div", { className: `bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`, children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsx("tr", { children: columns.map((column) => (_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: column.label }, column.key))) }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: data.map((row, index) => (_jsx("tr", { className: "hover:bg-gray-50", children: columns.map((column) => (_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: row[column.key] }, column.key))) }, index))) })] }) }));
}
export default NipoTable;
