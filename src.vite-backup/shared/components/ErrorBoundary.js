import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/shared/ErrorBoundary.tsx
// Componente para capturar erros de renderização
import { Component } from 'react';
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.handleReset = () => {
            this.setState({
                hasError: false,
                error: null,
            });
            window.location.href = '/';
        };
        this.state = {
            hasError: false,
            error: null,
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('❌ ErrorBoundary caught an error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-4", children: _jsxs("div", { className: "max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center", children: [_jsx("div", { className: "text-6xl mb-4", children: "\u26A0\uFE0F" }), _jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Ops! Algo deu errado" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Ocorreu um erro inesperado. Tente recarregar a p\u00E1gina." }), this.state.error && (_jsxs("details", { className: "mb-6 text-left", children: [_jsx("summary", { className: "cursor-pointer text-sm text-gray-500 hover:text-gray-700", children: "Detalhes t\u00E9cnicos" }), _jsx("pre", { className: "mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto", children: this.state.error.toString() })] })), _jsx("button", { onClick: this.handleReset, className: "w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition", children: "Voltar para Home" })] }) }));
        }
        return this.props.children;
    }
}
