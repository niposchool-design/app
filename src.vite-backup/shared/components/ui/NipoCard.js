import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { ROLE_CONFIG, DESIGN_UTILS, PHILOSOPHY } from '@/lib/constants/design';
export const NipoCard = ({ role, title, value, subtitle, icon, children, variant = 'content', showPhilosophy = false, showJapanese = false, className, onClick, }) => {
    const config = ROLE_CONFIG[role];
    const utils = DESIGN_UTILS;
    // Density-based styling
    const getDensityClasses = () => {
        const density = config.density;
        const sizes = utils.textSizes[role];
        const cardSize = utils.cardSizes[role];
        const iconSize = utils.iconSizes[role];
        return {
            cardSize,
            titleSize: sizes.title,
            valueSize: sizes.value,
            subtitleSize: sizes.subtitle,
            iconSize: variant === 'stat' ? iconSize.stat : iconSize.card,
        };
    };
    const { cardSize, titleSize, valueSize, subtitleSize, iconSize } = getDensityClasses();
    // Variant-specific styling
    const getVariantClasses = () => {
        switch (variant) {
            case 'stat':
                return 'border-l-4 border-current';
            case 'action':
                return 'hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1';
            case 'gamified':
                return 'border-2 border-dashed border-current/30 relative overflow-hidden';
            default:
                return '';
        }
    };
    // Role-based background and effects
    const getRoleClasses = () => {
        return cn('bg-white rounded-xl shadow-lg', `hover:shadow-${role === 'admin' ? 'purple' : role === 'professor' ? 'blue' : 'green'}-200`, 'border border-gray-100/50', 'backdrop-blur-sm');
    };
    return (_jsxs("div", { className: cn(getRoleClasses(), cardSize, getVariantClasses(), onClick && 'cursor-pointer', className), onClick: onClick, style: {
            boxShadow: `0 8px 32px ${config.shadowColor}`,
            color: config.color,
        }, children: [variant === 'gamified' && (_jsx("div", { className: "absolute top-2 right-2 text-xs px-2 py-1 bg-current/10 rounded-full", children: config.japanese.character })), _jsxs("div", { className: "flex items-start gap-4 mb-4", children: [icon && (_jsx("div", { className: cn('flex-shrink-0', iconSize), children: icon })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: cn('font-semibold text-gray-900', titleSize), children: title }), showJapanese && (_jsxs("p", { className: "text-sm text-gray-500 mt-1", children: [config.japanese.title, " \u2022 ", config.japanese.subtitle] })), subtitle && (_jsx("p", { className: cn('text-gray-600 mt-1', subtitleSize), children: subtitle }))] })] }), value && (_jsx("div", { className: "mb-4", children: _jsx("div", { className: cn('font-bold', valueSize), style: { color: config.color }, children: value }) })), children && (_jsx("div", { className: "space-y-4", children: children })), showPhilosophy && role === 'student' && (_jsx("div", { className: "mt-6 pt-4 border-t border-gray-100", children: _jsx("div", { className: "text-center", children: PHILOSOPHY.quotes.map((quote, index) => (quote.context === 'learning' && (_jsxs("div", { className: "text-xs text-gray-500 space-y-1", children: [_jsx("div", { className: "font-medium", children: quote.text }), _jsx("div", { className: "italic", children: quote.translation })] }, index)))) }) })), _jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1 rounded-b-xl", style: { backgroundColor: config.color } })] }));
};
// Componentes específicos por variante
export const NipoStatCard = (props) => (_jsx(NipoCard, { ...props, variant: "stat" }));
export const NipoActionCard = (props) => (_jsx(NipoCard, { ...props, variant: "action" }));
export const NipoGamifiedCard = (props) => (_jsx(NipoCard, { ...props, variant: "gamified", showPhilosophy: true, showJapanese: true }));
export const NipoGrid = ({ role, children, className }) => {
    const gridCols = DESIGN_UTILS.gridCols[role];
    const gridGap = DESIGN_UTILS.gridGaps[role];
    return (_jsx("div", { className: cn('grid', gridCols, gridGap, className), children: children }));
};
