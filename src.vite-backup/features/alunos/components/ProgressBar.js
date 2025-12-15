import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ProgressBar({ progress, label, size = 'md', color = 'blue', showPercentage = true, className = '' }) {
    const clampedProgress = Math.max(0, Math.min(100, progress));
    const sizeClasses = {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4'
    };
    const colorClasses = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500',
        purple: 'bg-purple-500'
    };
    return (_jsxs("div", { className: `w-full ${className}`, children: [(label || showPercentage) && (_jsxs("div", { className: "flex justify-between items-center mb-1", children: [label && _jsx("span", { className: "text-sm font-medium text-gray-700", children: label }), showPercentage && (_jsxs("span", { className: "text-sm text-gray-500", children: [Math.round(clampedProgress), "%"] }))] })), _jsx("div", { className: `w-full bg-gray-200 rounded-full ${sizeClasses[size]}`, children: _jsx("div", { className: `${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300 ease-out`, style: { width: `${clampedProgress}%` } }) })] }));
}
export default ProgressBar;
