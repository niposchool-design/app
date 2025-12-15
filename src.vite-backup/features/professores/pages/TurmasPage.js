import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Users, Calendar, Clock, TrendingUp, Eye, BarChart3 } from 'lucide-react';
import { NipoCard, NipoCardBody, NipoCardStat } from '../../../components/shared/NipoCard';
import { NipoButton } from '../../../components/shared/NipoButton';
export const TurmasPage = () => {
    // Mock data - substituir por dados reais
    const turmas = [
        {
            id: '1',
            nome: 'Shamisen Iniciante - Turma A',
            instrumento: 'Shamisen',
            nivel: 'Iniciante',
            total_alunos: 12,
            dia_semana: 'Segunda',
            horario: '14:00 - 16:00',
            status: 'ativa'
        },
        {
            id: '2',
            nome: 'Koto Intermediário',
            instrumento: 'Koto',
            nivel: 'Intermediário',
            total_alunos: 8,
            dia_semana: 'Quarta',
            horario: '16:00 - 18:00',
            status: 'ativa'
        },
        {
            id: '3',
            nome: 'Taiko Avançado',
            instrumento: 'Taiko',
            nivel: 'Avançado',
            total_alunos: 6,
            dia_semana: 'Sexta',
            horario: '18:00 - 20:00',
            status: 'ativa'
        }
    ];
    const getStatusColor = (status) => {
        switch (status) {
            case 'ativa':
                return 'bg-green-100 text-green-800';
            case 'concluida':
                return 'bg-gray-100 text-gray-800';
            case 'pausada':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const getStatusLabel = (status) => {
        switch (status) {
            case 'ativa':
                return 'Ativa';
            case 'concluida':
                return 'Concluída';
            case 'pausada':
                return 'Pausada';
            default:
                return status;
        }
    };
    const totalAlunos = turmas.reduce((acc, t) => acc + t.total_alunos, 0);
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "\uD83D\uDC65 Minhas Turmas" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Gerencie suas turmas e acompanhe o progresso dos alunos" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(NipoCardStat, { label: "Total de Turmas", value: turmas.length.toString(), icon: _jsx(Users, { className: "w-6 h-6" }), trend: "neutral" }), _jsx(NipoCardStat, { label: "Total de Alunos", value: totalAlunos.toString(), icon: _jsx(Users, { className: "w-6 h-6" }), trend: "up", trendValue: "+3 este m\u00EAs" }), _jsx(NipoCardStat, { label: "Turmas Ativas", value: turmas.filter(t => t.status === 'ativa').length.toString(), icon: _jsx(TrendingUp, { className: "w-6 h-6" }), trend: "neutral" }), _jsx(NipoCardStat, { label: "M\u00E9dia por Turma", value: Math.round(totalAlunos / turmas.length).toString(), icon: _jsx(BarChart3, { className: "w-6 h-6" }), trend: "neutral" })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: turmas.map((turma) => (_jsx(NipoCard, { children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex items-start justify-between", children: _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: turma.nome }), _jsx("span", { className: `px-2 py-1 text-xs font-medium rounded ${getStatusColor(turma.status)}`, children: getStatusLabel(turma.status) })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-600", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-4 h-4" }), turma.total_alunos, " alunos"] }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: turma.nivel })] })] }) }), _jsxs("div", { className: "grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-600 mb-1", children: "Instrumento" }), _jsx("p", { className: "text-sm font-medium text-gray-900", children: turma.instrumento })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-600 mb-1", children: "Dia da Semana" }), _jsxs("p", { className: "text-sm font-medium text-gray-900 flex items-center gap-1", children: [_jsx(Calendar, { className: "w-4 h-4" }), turma.dia_semana] })] }), _jsxs("div", { className: "col-span-2", children: [_jsx("p", { className: "text-xs text-gray-600 mb-1", children: "Hor\u00E1rio" }), _jsxs("p", { className: "text-sm font-medium text-gray-900 flex items-center gap-1", children: [_jsx(Clock, { className: "w-4 h-4" }), turma.horario] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Link, { to: `/professores/turmas/${turma.id}`, className: "flex-1", children: _jsxs(NipoButton, { variant: "secondary", className: "w-full", children: [_jsx(Eye, { className: "w-4 h-4 mr-2" }), "Ver Detalhes"] }) }), _jsx(Link, { to: `/professores/turmas/${turma.id}/alunos`, className: "flex-1", children: _jsxs(NipoButton, { variant: "primary", className: "w-full", children: [_jsx(Users, { className: "w-4 h-4 mr-2" }), "Ver Alunos"] }) })] })] }) }) }, turma.id))) }), turmas.length === 0 && (_jsx(NipoCard, { children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "text-center py-12", children: [_jsx(Users, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Nenhuma turma encontrada" }), _jsx("p", { className: "text-gray-600", children: "Entre em contato com a administra\u00E7\u00E3o para ser alocado em turmas" })] }) }) }))] }) }));
};
export default TurmasPage;
