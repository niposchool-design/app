import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ✅ AVALIAÇÕES PAGE - Área dos Professores
 *
 * Lista de submissões de alunos pendentes de avaliação
 * Permite avaliar trabalhos, dar feedback e atribuir notas
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle, AlertTriangle, Eye, Filter } from 'lucide-react';
import { NipoCard, NipoCardBody, NipoCardStat } from '../../../components/shared/NipoCard';
import { NipoButton } from '../../../components/shared/NipoButton';
export const AvaliacoesPage = () => {
    const [filtro, setFiltro] = useState('pendente');
    // Mock data
    const submissoes = [
        {
            id: '1',
            aluno: { nome: 'Yuki Tanaka' },
            desafio: 'Técnicas de Shamisen - Nível 1',
            tipo: 'desafio',
            data_submissao: '2024-12-03T10:00:00',
            urgencia: 'alta',
            status: 'pendente'
        },
        {
            id: '2',
            aluno: { nome: 'Kenji Suzuki' },
            desafio: 'História do Koto',
            tipo: 'portfolio',
            data_submissao: '2024-12-02T14:30:00',
            urgencia: 'media',
            status: 'pendente'
        },
        {
            id: '3',
            aluno: { nome: 'Sakura Yamamoto' },
            desafio: 'Composição Musical',
            tipo: 'portfolio',
            data_submissao: '2024-12-01T16:00:00',
            urgencia: 'baixa',
            status: 'em_avaliacao'
        }
    ];
    const getUrgenciaColor = (urgencia) => {
        switch (urgencia) {
            case 'alta':
                return 'bg-red-100 text-red-800';
            case 'media':
                return 'bg-yellow-100 text-yellow-800';
            case 'baixa':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const getUrgenciaIcon = (urgencia) => {
        switch (urgencia) {
            case 'alta':
                return _jsx(AlertTriangle, { className: "w-4 h-4" });
            case 'media':
                return _jsx(Clock, { className: "w-4 h-4" });
            case 'baixa':
                return _jsx(CheckCircle, { className: "w-4 h-4" });
            default:
                return _jsx(Clock, { className: "w-4 h-4" });
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'pendente':
                return 'bg-orange-100 text-orange-800';
            case 'em_avaliacao':
                return 'bg-blue-100 text-blue-800';
            case 'avaliado':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const getStatusLabel = (status) => {
        switch (status) {
            case 'pendente':
                return 'Pendente';
            case 'em_avaliacao':
                return 'Em Avaliação';
            case 'avaliado':
                return 'Avaliado';
            default:
                return status;
        }
    };
    const getTempoDecorrido = (data) => {
        const diff = Date.now() - new Date(data).getTime();
        const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        const horas = Math.floor(diff / (1000 * 60 * 60));
        if (dias > 0)
            return `${dias} dia${dias > 1 ? 's' : ''} atrás`;
        if (horas > 0)
            return `${horas} hora${horas > 1 ? 's' : ''} atrás`;
        return 'Agora mesmo';
    };
    const submissoesFiltradas = filtro === 'todos'
        ? submissoes
        : submissoes.filter(s => s.status === filtro);
    const stats = {
        pendentes: submissoes.filter(s => s.status === 'pendente').length,
        emAvaliacao: submissoes.filter(s => s.status === 'em_avaliacao').length,
        avaliados: submissoes.filter(s => s.status === 'avaliado').length,
        urgentes: submissoes.filter(s => s.urgencia === 'alta').length
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "\u2705 Avalia\u00E7\u00F5es Pendentes" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Avalie submiss\u00F5es de alunos e forne\u00E7a feedback construtivo" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(NipoCardStat, { label: "Pendentes", value: stats.pendentes.toString(), icon: _jsx(Clock, { className: "w-6 h-6" }), trend: "neutral" }), _jsx(NipoCardStat, { label: "Em Avalia\u00E7\u00E3o", value: stats.emAvaliacao.toString(), icon: _jsx(FileText, { className: "w-6 h-6" }), trend: "neutral" }), _jsx(NipoCardStat, { label: "Avaliados Hoje", value: stats.avaliados.toString(), icon: _jsx(CheckCircle, { className: "w-6 h-6" }), trend: "up", trendValue: "+5 hoje" }), _jsx(NipoCardStat, { label: "Urgentes", value: stats.urgentes.toString(), icon: _jsx(AlertTriangle, { className: "w-6 h-6" }), trend: "down", trendValue: "-2 desde ontem" })] }), _jsx(NipoCard, { children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Filter, { className: "w-5 h-5 text-gray-600" }), _jsx("div", { className: "flex gap-2", children: [
                                        { value: 'todos', label: 'Todos' },
                                        { value: 'pendente', label: 'Pendentes' },
                                        { value: 'em_avaliacao', label: 'Em Avaliação' },
                                        { value: 'avaliado', label: 'Avaliados' }
                                    ].map((f) => (_jsx("button", { onClick: () => setFiltro(f.value), className: `
                      px-4 py-2 rounded-lg font-medium text-sm transition-colors
                      ${filtro === f.value
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `, children: f.label }, f.value))) })] }) }) }), _jsx("div", { className: "space-y-4", children: submissoesFiltradas.length === 0 ? (_jsx(NipoCard, { children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "text-center py-12", children: [_jsx(CheckCircle, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Nenhuma submiss\u00E3o para avaliar" }), _jsx("p", { className: "text-gray-600", children: filtro === 'pendente'
                                            ? 'Ótimo trabalho! Você está em dia com as avaliações.'
                                            : 'Nenhuma submissão encontrada neste filtro.' })] }) }) })) : (submissoesFiltradas.map((submissao) => (_jsx(NipoCard, { children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex items-start gap-4 flex-1", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold", children: submissao.aluno.nome.charAt(0) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: submissao.aluno.nome }), _jsx("span", { className: `px-2 py-1 text-xs font-medium rounded flex items-center gap-1 ${getStatusColor(submissao.status)}`, children: getStatusLabel(submissao.status) }), _jsxs("span", { className: `px-2 py-1 text-xs font-medium rounded flex items-center gap-1 ${getUrgenciaColor(submissao.urgencia)}`, children: [getUrgenciaIcon(submissao.urgencia), submissao.urgencia] })] }), _jsx("p", { className: "text-gray-700 font-medium mb-1", children: submissao.desafio }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-500", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-4 h-4" }), getTempoDecorrido(submissao.data_submissao)] }), _jsx("span", { children: "\u2022" }), _jsx("span", { className: "capitalize", children: submissao.tipo })] })] })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx(Link, { to: `/professores/avaliacoes/${submissao.id}`, children: _jsxs(NipoButton, { variant: "primary", children: [_jsx(Eye, { className: "w-4 h-4 mr-2" }), "Avaliar"] }) }) })] }) }) }, submissao.id)))) })] }) }));
};
export default AvaliacoesPage;
