import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
export const PublicLayout = () => {
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-gray-50", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
};
