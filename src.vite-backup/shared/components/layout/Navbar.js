import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🧭 NAVBAR - Header Premium de Classe Mundial
 *
 * Design moderno e profissional para landing page
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ROUTES } from '../../lib/constants/routes';
export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navLinks = [
        { name: 'Recursos', path: '#recursos' },
        { name: 'Benefícios', path: '#beneficios' },
        { name: 'Depoimentos', path: '#depoimentos' },
    ];
    const handleSmoothScroll = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            setMobileMenuOpen(false);
        }
    };
    return (_jsx("nav", { className: `
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-white/80 backdrop-blur-sm'}
    `, children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex items-center justify-between h-20", children: [_jsxs(Link, { to: ROUTES.HOME, className: "flex items-center gap-3 group", children: [_jsx("div", { className: "relative", children: _jsx("img", { src: "/logo-icon.svg", alt: "Nipo School", className: "w-11 h-11 transform group-hover:scale-110 transition-transform" }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors", children: "Nipo School" }), _jsx("span", { className: "text-xs text-gray-500 font-medium hidden sm:block", children: "Sistema Oriental de M\u00FAsica" })] })] }), _jsx("div", { className: "hidden lg:flex items-center gap-1", children: navLinks.map((link) => (_jsx("a", { href: link.path, onClick: (e) => handleSmoothScroll(e, link.path), className: "px-4 py-2 text-gray-600 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-all", children: link.name }, link.path))) }), _jsxs("div", { className: "hidden lg:flex items-center gap-3", children: [_jsx(Link, { to: ROUTES.LOGIN, className: "px-6 py-2.5 text-gray-700 font-semibold hover:text-gray-900 transition-colors", children: "Entrar" }), _jsxs(Link, { to: ROUTES.SIGNUP, className: "group relative px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold rounded-full overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all", children: [_jsxs("span", { className: "relative z-10 flex items-center gap-2", children: ["Come\u00E7ar Gr\u00E1tis", _jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-red-700 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity" })] })] }), _jsx("button", { onClick: () => setMobileMenuOpen(!mobileMenuOpen), className: "lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors", children: mobileMenuOpen ? _jsx(X, { className: "w-6 h-6" }) : _jsx(Menu, { className: "w-6 h-6" }) })] }), mobileMenuOpen && (_jsx("div", { className: "lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6", children: [_jsx("div", { className: "flex flex-col gap-2 mb-6", children: navLinks.map((link) => (_jsx("a", { href: link.path, onClick: (e) => handleSmoothScroll(e, link.path), className: "px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors", children: link.name }, link.path))) }), _jsxs("div", { className: "flex flex-col gap-3 pt-4 border-t border-gray-100", children: [_jsx(Link, { to: ROUTES.LOGIN, onClick: () => setMobileMenuOpen(false), className: "px-6 py-3 text-center text-gray-700 font-semibold border-2 border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all", children: "Entrar" }), _jsx(Link, { to: ROUTES.SIGNUP, onClick: () => setMobileMenuOpen(false), className: "px-6 py-3 text-center bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold rounded-full shadow-lg", children: "Come\u00E7ar Gr\u00E1tis" })] })] }) }))] }) }));
};
