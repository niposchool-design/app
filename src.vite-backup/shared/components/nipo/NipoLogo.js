import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '../../contexts/ThemeContext';
// 📏 Sizes mapping
const sizeMap = {
    xs: { full: 'h-6', icon: 'h-4', text: 'h-5' },
    sm: { full: 'h-8', icon: 'h-6', text: 'h-7' },
    md: { full: 'h-12', icon: 'h-8', text: 'h-10' },
    lg: { full: 'h-16', icon: 'h-12', text: 'h-14' },
    xl: { full: 'h-20', icon: 'h-16', text: 'h-18' },
    '2xl': { full: 'h-24', icon: 'h-20', text: 'h-22' },
};
export function NipoLogo({ variant = 'full', size = 'md', theme = 'auto', className = '', onClick }) {
    const { isDark } = useTheme();
    // 🌙 Determinar tema a usar
    const effectiveTheme = theme === 'auto' ? (isDark ? 'dark' : 'light') : theme;
    // 📏 Obter classe de tamanho
    const sizeClass = sizeMap[size][variant];
    // 🎨 Classes base
    const baseClasses = `
    ${sizeClass}
    transition-all duration-300
    ${onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}
    ${className}
  `.trim();
    // 🖼️ Renderizar baseado na variante
    const renderLogo = () => {
        switch (variant) {
            case 'icon':
                return (_jsx("img", { src: "/logo.svg", alt: "Nipo School", className: baseClasses, style: {
                        filter: effectiveTheme === 'dark' ? 'brightness(0) invert(1)' : 'none'
                    } }));
            case 'text':
                return (_jsx("div", { className: `${baseClasses} flex items-center`, children: _jsx("span", { className: `
              font-zen font-bold text-lg
              ${effectiveTheme === 'dark' ? 'text-white' : 'text-nipo-zen-900'}
            `, children: "Nipo School" }) }));
            case 'full':
            default:
                return (_jsxs("div", { className: `${baseClasses} flex items-center gap-3`, children: [_jsx("img", { src: "/logo.svg", alt: "Nipo School Icon", className: "h-full w-auto", style: {
                                filter: effectiveTheme === 'dark' ? 'brightness(0) invert(1)' : 'none'
                            } }), _jsx("span", { className: `
              font-zen font-bold text-lg md:text-xl
              ${effectiveTheme === 'dark' ? 'text-white' : 'text-nipo-zen-900'}
            `, children: "Nipo School" })] }));
        }
    };
    return (_jsx("div", { className: onClick ? 'inline-block' : 'inline-flex items-center', onClick: onClick, role: onClick ? 'button' : undefined, tabIndex: onClick ? 0 : undefined, onKeyDown: onClick ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
            }
        } : undefined, children: renderLogo() }));
}
// 🎌 Componentes especializados para uso comum
export function NipoLogoHeader() {
    return _jsx(NipoLogo, { variant: "full", size: "lg" });
}
export function NipoLogoMobile() {
    return _jsx(NipoLogo, { variant: "icon", size: "md" });
}
export function NipoLogoFooter() {
    return _jsx(NipoLogo, { variant: "text", size: "sm" });
}
export function NipoLogoLogin() {
    return _jsx(NipoLogo, { variant: "full", size: "xl" });
}
