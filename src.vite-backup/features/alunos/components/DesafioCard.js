import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar, Star, Trophy, CheckCircle } from 'lucide-react';
export function DesafioCard({ desafio, isCompleted = false, isSubmitted = false, onSubmit, onView, className = '' }) {
    const nivelColors = {
        facil: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-700',
            badge: 'bg-green-100 text-green-800'
        },
        medio: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-700',
            badge: 'bg-yellow-100 text-yellow-800'
        },
        dificil: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-700',
            badge: 'bg-red-100 text-red-800'
        }
    };
    const nivelLabels = {
        facil: 'Fácil',
        medio: 'Médio',
        dificil: 'Difícil'
    };
    const colors = nivelColors[desafio.nivel];
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    return (_jsx("div", { className: `
      bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-lg
      ${colors.bg} ${colors.border}
      ${isCompleted ? 'ring-2 ring-green-400' : ''}
      ${className}
    `, children: _jsxs("div", { className: "p-6", children: [_jsx("div", { className: "flex items-start justify-between mb-4", children: _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h3", { className: "text-lg font-bold text-gray-900 line-clamp-1", children: desafio.titulo }), isCompleted && (_jsx(CheckCircle, { className: "w-5 h-5 text-green-500 flex-shrink-0" }))] }), _jsxs("div", { className: "flex items-center gap-3 text-sm text-gray-600 mb-3", children: [_jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.badge}`, children: nivelLabels[desafio.nivel] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-500" }), _jsxs("span", { className: "font-medium", children: [desafio.pontos, " pts"] })] })] })] }) }), _jsx("p", { className: "text-gray-700 mb-4 line-clamp-3", children: desafio.descricao }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-500 mb-4", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Calendar, { className: "w-4 h-4" }), _jsxs("span", { children: ["Criado em ", formatDate(desafio.created_at)] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Trophy, { className: "w-4 h-4" }), _jsx("span", { children: desafio.tipo })] })] }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-gray-200", children: [_jsx("button", { onClick: () => onView?.(desafio.id), className: "text-blue-600 hover:text-blue-800 font-medium transition-colors", children: "Ver Detalhes" }), !isCompleted && !isSubmitted && (_jsx("button", { onClick: () => onSubmit?.(desafio.id), className: "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium", children: "Submeter" })), isSubmitted && !isCompleted && (_jsx("span", { className: "text-yellow-600 font-medium", children: "Aguardando Avalia\u00E7\u00E3o" })), isCompleted && (_jsxs("span", { className: "text-green-600 font-medium flex items-center gap-1", children: [_jsx(CheckCircle, { className: "w-4 h-4" }), "Conclu\u00EDdo"] }))] })] }) }));
}
export default DesafioCard;
