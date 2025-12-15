import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/features/alunos/components/PortfolioCard.tsx
import { Calendar, Eye, Lock, Users, Globe } from 'lucide-react';
import { formatDate } from '@/lib/utils/formatters';
export function PortfolioCard({ portfolio, onClick, showActions = true }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'em_andamento':
                return 'bg-yellow-100 text-yellow-800';
            case 'concluido':
                return 'bg-green-100 text-green-800';
            case 'arquivado':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const getStatusLabel = (status) => {
        switch (status) {
            case 'em_andamento':
                return 'Em Andamento';
            case 'concluido':
                return 'Concluído';
            case 'arquivado':
                return 'Arquivado';
            default:
                return status;
        }
    };
    const getTipoLabel = (tipo) => {
        switch (tipo) {
            case 'projeto':
                return 'Projeto';
            case 'pesquisa':
                return 'Pesquisa';
            case 'performance':
                return 'Performance';
            case 'outro':
                return 'Outro';
            default:
                return tipo;
        }
    };
    const getVisibilityIcon = (visibilidade) => {
        switch (visibilidade) {
            case 'privado':
                return _jsx(Lock, { className: "w-4 h-4" });
            case 'turma':
                return _jsx(Users, { className: "w-4 h-4" });
            case 'publico':
                return _jsx(Globe, { className: "w-4 h-4" });
            default:
                return _jsx(Lock, { className: "w-4 h-4" });
        }
    };
    return (_jsxs("div", { className: `
        bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200
        ${onClick ? 'cursor-pointer hover:border-indigo-300' : ''}
      `, onClick: onClick, children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-1 line-clamp-2", children: portfolio.titulo }), _jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-500", children: [_jsx("span", { className: "capitalize", children: getTipoLabel(portfolio.tipo) }), _jsx("span", { children: "\u2022" }), _jsxs("div", { className: "flex items-center space-x-1", children: [getVisibilityIcon(portfolio.visibilidade), _jsx("span", { className: "capitalize", children: portfolio.visibilidade })] })] })] }), _jsx("span", { className: `
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${getStatusColor(portfolio.status)}
        `, children: getStatusLabel(portfolio.status) })] }), _jsx("p", { className: "text-gray-600 text-sm mb-4 line-clamp-3", children: portfolio.descricao }), _jsxs("div", { className: "flex items-center justify-between text-sm text-gray-500", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Calendar, { className: "w-4 h-4" }), _jsxs("span", { children: ["Criado em ", formatDate(new Date(portfolio.created_at))] })] }), portfolio.evidencias_count !== undefined && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Eye, { className: "w-4 h-4" }), _jsxs("span", { children: [portfolio.evidencias_count, " ", portfolio.evidencias_count === 1 ? 'evidência' : 'evidências'] })] }))] }), showActions && (_jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            // Handle edit action
                        }, className: "text-indigo-600 hover:text-indigo-700 text-sm font-medium", children: "Ver detalhes" }))] })] }));
}
export default PortfolioCard;
