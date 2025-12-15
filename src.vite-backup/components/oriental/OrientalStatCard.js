import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DESIGN_UTILS, ROLE_CONFIG } from '../../lib/constants/design';
export const OrientalStatCard = ({ level, title, value, subtitle, icon: Icon, trend, className = '', onClick }) => {
    const config = ROLE_CONFIG[level];
    const cardPadding = DESIGN_UTILS.cardSizes[level];
    // Tamanhos diferentes por nível
    const sizes = {
        student: {
            iconSize: 'w-12 h-12',
            titleSize: 'text-sm',
            valueSize: 'text-3xl',
            subtitleSize: 'text-xs',
        },
        professor: {
            iconSize: 'w-8 h-8',
            titleSize: 'text-xs',
            valueSize: 'text-2xl',
            subtitleSize: 'text-xs',
        },
        admin: {
            iconSize: 'w-6 h-6',
            titleSize: 'text-xs',
            valueSize: 'text-xl',
            subtitleSize: 'text-xs',
        }
    };
    const size = sizes[level];
    return (_jsxs("div", { className: `
        bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl 
        ${cardPadding} shadow-lg hover:shadow-xl transition-all duration-300
        hover:-translate-y-1 cursor-pointer group
        ${className}
      `, onClick: onClick, style: {
            boxShadow: `0 4px 16px ${config.shadowColor}`
        }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [Icon && (_jsx("div", { className: `${size.iconSize} rounded-lg flex items-center justify-center`, style: { backgroundColor: `${config.color}20` }, children: _jsx(Icon, { className: `w-2/3 h-2/3`, style: { color: config.color } }) })), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: `font-medium text-gray-700 ${size.titleSize}`, children: title }), subtitle && (_jsx("p", { className: `text-gray-500 ${size.subtitleSize} mt-1`, children: subtitle }))] })] }), _jsx("div", { className: "mb-2", children: _jsx("p", { className: `font-bold ${size.valueSize} group-hover:scale-105 transition-transform`, style: { color: config.color }, children: value }) }), trend && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: `
              flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
              ${trend.value >= 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'}
            `, children: [_jsx("span", { className: "text-xs", children: trend.value >= 0 ? '↗' : '↘' }), Math.abs(trend.value), "%"] }), trend.label && (_jsx("span", { className: "text-xs text-gray-500", children: trend.label }))] }))] }));
};
