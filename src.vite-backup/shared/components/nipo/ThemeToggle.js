import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '../../contexts/ThemeContext';
export function ThemeToggle({ size = 'md', variant = 'zen', showLabel = false, className = '' }) {
    const { mode, isDark, toggleTheme } = useTheme();
    // 📏 Size classes
    const sizeClasses = {
        sm: 'h-6 w-12',
        md: 'h-8 w-16',
        lg: 'h-10 w-20'
    };
    // 🎨 Render different variants
    const renderVariant = () => {
        switch (variant) {
            case 'button':
                return (_jsx("button", { onClick: toggleTheme, className: `
              ${sizeClasses[size]}
              relative inline-flex items-center justify-center
              bg-nipo-zen-200 dark:bg-nipo-zen-700
              border border-nipo-zen-300 dark:border-nipo-zen-600
              rounded-full
              transition-all duration-300 ease-in-out
              hover:bg-nipo-zen-300 dark:hover:bg-nipo-zen-600
              focus:outline-none focus:ring-2 focus:ring-nipo-primary
              ${className}
            `, "aria-label": `Switch to ${isDark ? 'light' : 'dark'} mode`, children: isDark ? (_jsx("span", { className: "text-yellow-400 text-lg", children: "\u2600\uFE0F" })) : (_jsx("span", { className: "text-blue-400 text-lg", children: "\uD83C\uDF19" })) }));
            case 'switch':
                return (_jsxs("div", { className: `flex items-center gap-3 ${className}`, children: [showLabel && (_jsx("span", { className: "text-sm font-medium text-nipo-zen-700 dark:text-nipo-zen-300", children: isDark ? 'Dark' : 'Light' })), _jsx("button", { onClick: toggleTheme, className: `
                ${sizeClasses[size]}
                relative inline-flex
                bg-nipo-zen-300 dark:bg-nipo-zen-600
                border-2 border-transparent
                rounded-full
                cursor-pointer
                transition-colors duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-nipo-primary focus:ring-offset-2
              `, "aria-label": `Switch to ${isDark ? 'light' : 'dark'} mode`, children: _jsx("span", { className: `
                  ${size === 'sm' ? 'h-5 w-5' : size === 'md' ? 'h-7 w-7' : 'h-9 w-9'}
                  inline-block
                  bg-white dark:bg-nipo-zen-200
                  rounded-full
                  shadow-md
                  transform transition-transform duration-300 ease-in-out
                  ${isDark ? 'translate-x-full' : 'translate-x-0'}
                  flex items-center justify-center
                `, children: isDark ? (_jsx("span", { className: "text-xs", children: "\uD83C\uDF19" })) : (_jsx("span", { className: "text-xs", children: "\u2600\uFE0F" })) }) })] }));
            case 'zen':
            default:
                return (_jsxs("div", { className: `flex items-center gap-2 ${className}`, children: [showLabel && (_jsxs("span", { className: "text-sm font-zen text-nipo-zen-700 dark:text-nipo-zen-300", children: ["\u7985 ", isDark ? 'Dark' : 'Light'] })), _jsxs("button", { onClick: toggleTheme, className: `
                ${sizeClasses[size]}
                relative inline-flex items-center
                bg-gradient-to-r from-nipo-zen-200 to-nipo-zen-300
                dark:from-nipo-zen-700 dark:to-nipo-zen-600
                border border-nipo-zen-300 dark:border-nipo-zen-500
                rounded-full
                overflow-hidden
                transition-all duration-500 ease-in-out
                hover:shadow-zen
                focus:outline-none focus:ring-2 focus:ring-nipo-primary focus:ring-offset-2
                group
              `, "aria-label": `Toggle zen mode: ${isDark ? 'light' : 'dark'}`, children: [_jsx("div", { className: `
                absolute inset-0
                bg-gradient-to-r
                ${isDark
                                        ? 'from-blue-900 via-purple-900 to-indigo-900'
                                        : 'from-yellow-200 via-orange-200 to-pink-200'}
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500
              ` }), _jsx("div", { className: `
                ${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-6 w-6' : 'h-8 w-8'}
                relative z-10
                bg-white dark:bg-nipo-zen-800
                rounded-full
                shadow-md
                transform transition-all duration-500 ease-in-out
                ${isDark ? 'translate-x-full scale-110' : 'translate-x-1 scale-100'}
                flex items-center justify-center
                border border-nipo-zen-200 dark:border-nipo-zen-600
              `, children: _jsx("span", { className: `
                  ${size === 'sm' ? 'text-xs' : 'text-sm'}
                  font-zen font-bold
                  ${isDark ? 'text-indigo-600' : 'text-orange-500'}
                  transition-colors duration-300
                `, children: isDark ? '夜' : '日' }) }), _jsx("div", { className: "absolute inset-y-0 left-2 flex items-center", children: _jsx("span", { className: `
                  text-xs font-zen
                  ${isDark ? 'text-nipo-zen-400' : 'text-nipo-zen-600'}
                  transition-colors duration-300
                `, children: "\u2600\uFE0F" }) }), _jsx("div", { className: "absolute inset-y-0 right-2 flex items-center", children: _jsx("span", { className: `
                  text-xs font-zen
                  ${isDark ? 'text-nipo-zen-300' : 'text-nipo-zen-500'}
                  transition-colors duration-300
                `, children: "\uD83C\uDF19" }) })] })] }));
        }
    };
    return renderVariant();
}
// 🎌 Componentes especializados
export function ThemeToggleHeader() {
    return _jsx(ThemeToggle, { variant: "zen", size: "md" });
}
export function ThemeToggleMobile() {
    return _jsx(ThemeToggle, { variant: "button", size: "sm" });
}
export function ThemeToggleSettings() {
    return _jsx(ThemeToggle, { variant: "switch", size: "lg", showLabel: true });
}
