import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users, FileText, Calendar, BookOpen, Clock, Music, Award, TrendingUp } from 'lucide-react';
import { NipoCard, NipoCardBody, NipoCardStat } from '../../../components/shared/NipoCard';
import { NipoButton } from '../../../components/shared/NipoButton';
export const ProfessorDashboard = () => {
    const stats = {
        totalTurmas: 5,
        totalAlunos: 48,
        submissoesPendentes: 12,
        aulasSemana: 8
    };
    const submissoesPendentes = [
        {
            id: 1,
            aluno: 'Yuki Tanaka',
            desafio: 'Técnicas de Shamisen',
            tempo: '2 dias atrás',
            urgencia: 'alta'
        },
        {
            id: 2,
            aluno: 'Kenji Suzuki',
            desafio: 'História do Koto',
            tempo: '3 dias atrás',
            urgencia: 'media'
        }
    ];
    const getUrgenciaColor = (urgencia) => {
        switch (urgencia) {
            case 'alta': return 'bg-red-100 text-red-800';
            case 'media': return 'bg-yellow-100 text-yellow-800';
            case 'baixa': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("h1", { className: "text-4xl font-bold text-gray-900 mb-2", children: ["\uD83D\uDC68\u200D\uD83C\uDFEB ", _jsx("span", { className: "bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent", children: "Dashboard do Sensei" })] }), _jsx("p", { className: "text-gray-600", children: "\u5148\u751F (Sensei) - Portal do educador musical japon\u00EAs" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(NipoCardStat, { label: "Minhas Turmas", value: stats.totalTurmas.toString(), icon: _jsx(Users, { className: "w-6 h-6" }), trend: "neutral" }), _jsx(NipoCardStat, { label: "Total de Alunos", value: stats.totalAlunos.toString(), icon: _jsx(Users, { className: "w-6 h-6" }), trend: "up", trendValue: "+3 este m\u00EAs" }), _jsx(NipoCardStat, { label: "Avalia\u00E7\u00F5es Pendentes", value: stats.submissoesPendentes.toString(), icon: _jsx(FileText, { className: "w-6 h-6" }), trend: "down", trendValue: "-2 desde ontem" }), _jsx(NipoCardStat, { label: "Aulas Esta Semana", value: stats.aulasSemana.toString(), icon: _jsx(Calendar, { className: "w-6 h-6" }), trend: "neutral" })] }), _jsx(NipoCard, { title: "\uD83D\uDCDD Avalia\u00E7\u00F5es Pendentes", children: _jsx(NipoCardBody, { children: _jsx("div", { className: "space-y-4", children: submissoesPendentes.map((submissao) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "p-2 bg-white rounded-lg shadow-sm", children: _jsx(FileText, { className: "w-5 h-5 text-blue-600" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-gray-900", children: submissao.aluno }), _jsx("p", { className: "text-sm text-gray-600", children: submissao.desafio }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Clock, { className: "w-3 h-3 text-gray-400" }), _jsx("span", { className: "text-xs text-gray-500", children: submissao.tempo }), _jsx("span", { className: `px-2 py-1 text-xs rounded-full ${getUrgenciaColor(submissao.urgencia)}`, children: submissao.urgencia })] })] })] }), _jsx(NipoButton, { size: "sm", children: "Avaliar" })] }, submissao.id))) }) }) }), _jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(NipoCard, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "text-center", children: [_jsx(Music, { className: "w-12 h-12 text-blue-500 mx-auto mb-3" }), _jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Minhas Turmas" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Gerenciar alunos e atividades" }), _jsx(NipoButton, { size: "sm", fullWidth: true, children: "Acessar" })] }) }) }), _jsx(NipoCard, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "text-center", children: [_jsx(BookOpen, { className: "w-12 h-12 text-green-500 mx-auto mb-3" }), _jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Materiais" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Criar e organizar conte\u00FAdos" }), _jsx(NipoButton, { size: "sm", fullWidth: true, variant: "outline", children: "Gerenciar" })] }) }) }), _jsx(NipoCard, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "text-center", children: [_jsx(Award, { className: "w-12 h-12 text-yellow-500 mx-auto mb-3" }), _jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Conquistas" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Definir metas e pr\u00EAmios" }), _jsx(NipoButton, { size: "sm", fullWidth: true, variant: "outline", children: "Configurar" })] }) }) }), _jsx(NipoCard, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "text-center", children: [_jsx(TrendingUp, { className: "w-12 h-12 text-purple-500 mx-auto mb-3" }), _jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Relat\u00F3rios" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Acompanhar progresso" }), _jsx(NipoButton, { size: "sm", fullWidth: true, variant: "outline", children: "Visualizar" })] }) }) })] }), _jsx("div", { className: "text-center p-6 bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl", children: _jsx("p", { className: "text-gray-700 italic", children: "\"\u5148\u751F (Sensei) - Aquele que nasceu antes, guia o caminho com sabedoria e paci\u00EAncia\"" }) })] }) }));
};
