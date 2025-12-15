import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
const badgeVariants = {
    default: 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200',
    destructive: 'bg-red-500 hover:bg-red-600 text-white border-red-500',
    outline: 'text-gray-900 border-gray-300 bg-transparent hover:bg-gray-50',
    success: 'bg-green-500 hover:bg-green-600 text-white border-green-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500'
};
const badgeSizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
};
export function Badge({ className, variant = 'default', size = 'md', children, ...props }) {
    return (_jsx("div", { className: cn('inline-flex items-center rounded-full border font-medium transition-colors', badgeVariants[variant], badgeSizes[size], className), ...props, children: children }));
}
// Badges especializados para diferentes contextos
export function StatusBadge({ status, className, ...props }) {
    const statusVariants = {
        active: 'success',
        inactive: 'secondary',
        pending: 'warning',
        completed: 'default'
    };
    const statusLabels = {
        active: 'Ativo',
        inactive: 'Inativo',
        pending: 'Pendente',
        completed: 'Concluído'
    };
    return (_jsx(Badge, { variant: statusVariants[status], className: className, ...props, children: statusLabels[status] }));
}
export function CountBadge({ count, className, ...props }) {
    return (_jsx(Badge, { variant: "default", size: "sm", className: cn('min-w-[20px] justify-center', className), ...props, children: count > 99 ? '99+' : count }));
}
export function LevelBadge({ level, className, ...props }) {
    const levelVariants = {
        iniciante: 'success',
        intermediario: 'warning',
        avancado: 'destructive'
    };
    const levelLabels = {
        iniciante: 'Iniciante',
        intermediario: 'Intermediário',
        avancado: 'Avançado'
    };
    return (_jsx(Badge, { variant: levelVariants[level], className: className, ...props, children: levelLabels[level] }));
}
export default Badge;
