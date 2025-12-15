import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export function Skeleton({ className = '', count = 1, height = 'h-4', width = 'w-full' }) {
    return (_jsx(_Fragment, { children: Array.from({ length: count }).map((_, i) => (_jsx("div", { className: `animate-pulse bg-gray-200 rounded ${height} ${width} ${className}`, style: { marginBottom: count > 1 ? '8px' : '0' } }, i))) }));
}
// Skeletons específicos para componentes comuns
export function SkeletonCard() {
    return (_jsxs("div", { className: "border rounded-lg p-6 space-y-4", children: [_jsx(Skeleton, { height: "h-6", width: "w-3/4" }), _jsx(Skeleton, { height: "h-4", count: 3 }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Skeleton, { height: "h-8", width: "w-20" }), _jsx(Skeleton, { height: "h-8", width: "w-16" })] })] }));
}
export function SkeletonTable({ rows = 5 }) {
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex space-x-4", children: [_jsx(Skeleton, { height: "h-6", width: "w-1/4" }), _jsx(Skeleton, { height: "h-6", width: "w-1/4" }), _jsx(Skeleton, { height: "h-6", width: "w-1/4" }), _jsx(Skeleton, { height: "h-6", width: "w-1/4" })] }), Array.from({ length: rows }).map((_, i) => (_jsxs("div", { className: "flex space-x-4", children: [_jsx(Skeleton, { height: "h-4", width: "w-1/4" }), _jsx(Skeleton, { height: "h-4", width: "w-1/4" }), _jsx(Skeleton, { height: "h-4", width: "w-1/4" }), _jsx(Skeleton, { height: "h-4", width: "w-1/4" })] }, i)))] }));
}
export default Skeleton;
