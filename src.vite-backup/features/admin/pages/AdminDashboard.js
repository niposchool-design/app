import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users, Music, Trophy, Activity, Database, Clock, CheckCircle, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NipoCard, NipoCardBody, NipoCardStat } from '../../../components/shared/NipoCard';
import { NipoButton } from '../../../components/shared/NipoButton';
export const AdminDashboard = () => {
    const stats = {
        totalUsuarios: 156,
        totalInstrumentos: 12,
        totalConquistas: 45,
        turmasAtivas: 18,
        aulasMes: 234
    };
    const atividadeRecente = [
        {
            id: 1,
            descricao: 'Novo aluno cadastrado: Yuki Tanaka',
            tempo: '5 min atrás',
            icone: _jsx(UserPlus, { className: "w-5 h-5 text-green-600" })
        },
        {
            id: 2,
            descricao: 'Nova conquista desbloqueada por 3 alunos',
            tempo: '1 hora atrás',
            icone: _jsx(Trophy, { className: "w-5 h-5 text-yellow-600" })
        }
    ];
    const usuariosRecentes = [
        {
            id: 1,
            nome: 'Yuki Tanaka',
            role: 'Aluno',
            status: 'Ativo',
            cadastro: '2024-01-15'
        },
        {
            id: 2,
            nome: 'Prof. Kenji Suzuki',
            role: 'Professor',
            status: 'Ativo',
            cadastro: '2024-01-14'
        }
    ];
    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'Admin': return 'bg-red-100 text-red-800';
            case 'Professor': return 'bg-blue-100 text-blue-800';
            case 'Aluno': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("h1", { className: "text-4xl font-bold text-gray-900 mb-2", children: ["\uD83C\uDFDB\uFE0F ", _jsx("span", { className: "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent", children: "Centro de Controle Admin" })] }), _jsx("p", { className: "text-gray-600", children: "\u7BA1\u7406 (Kanri) - Gerenciamento completo do sistema Nipo School" }), _jsxs("div", { className: "mt-4 flex items-center justify-center gap-2", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-500" }), _jsx("span", { className: "text-sm text-gray-600", children: "Sistema Online - Tudo funcionando" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(NipoCardStat, { label: "Usu\u00E1rios Totais", value: stats.totalUsuarios.toString(), icon: _jsx(Users, { className: "w-6 h-6" }), trend: "up", trendValue: "+12 este m\u00EAs" }), _jsx(NipoCardStat, { label: "Instrumentos", value: stats.totalInstrumentos.toString(), icon: _jsx(Music, { className: "w-6 h-6" }), trend: "neutral" }), _jsx(NipoCardStat, { label: "Conquistas", value: stats.totalConquistas.toString(), icon: _jsx(Trophy, { className: "w-6 h-6" }), trend: "up", trendValue: "+3 esta semana" }), _jsx(NipoCardStat, { label: "Turmas Ativas", value: stats.turmasAtivas.toString(), icon: _jsx(Activity, { className: "w-6 h-6" }), trend: "up", trendValue: "+2 esta semana" })] }), _jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [_jsx(NipoCard, { title: "\uD83D\uDCCA Atividade Recente", className: "lg:col-span-2", children: _jsx(NipoCardBody, { children: _jsx("div", { className: "space-y-4", children: atividadeRecente.map((atividade) => (_jsxs("div", { className: "flex items-start gap-4 p-4 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "p-2 bg-white rounded-lg shadow-sm", children: atividade.icone }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-gray-900 font-medium", children: atividade.descricao }), _jsxs("div", { className: "flex items-center gap-2 mt-1 text-sm text-gray-500", children: [_jsx(Clock, { className: "w-3 h-3" }), atividade.tempo] })] })] }, atividade.id))) }) }) }), _jsx(NipoCard, { title: "\u26A1 A\u00E7\u00F5es R\u00E1pidas", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs(NipoButton, { fullWidth: true, className: "justify-start", children: [_jsx(Users, { className: "w-4 h-4 mr-2" }), "Gerenciar Usu\u00E1rios"] }), _jsxs(NipoButton, { fullWidth: true, variant: "outline", className: "justify-start", children: [_jsx(Music, { className: "w-4 h-4 mr-2" }), "Instrumentos"] }), _jsx("div", { className: "pt-3 border-t border-gray-200", children: _jsx(Link, { to: "/admin/database", children: _jsxs(NipoButton, { fullWidth: true, variant: "outline", className: "justify-start text-indigo-600", children: [_jsx(Database, { className: "w-4 h-4 mr-2" }), "Admin Banco"] }) }) })] }) }) })] }), _jsx(NipoCard, { title: "\uD83D\uDC65 Usu\u00E1rios Recentes", children: _jsx(NipoCardBody, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-200", children: [_jsx("th", { className: "text-left p-3 font-medium text-gray-700", children: "Nome" }), _jsx("th", { className: "text-left p-3 font-medium text-gray-700", children: "Fun\u00E7\u00E3o" }), _jsx("th", { className: "text-left p-3 font-medium text-gray-700", children: "Status" }), _jsx("th", { className: "text-left p-3 font-medium text-gray-700", children: "A\u00E7\u00F5es" })] }) }), _jsx("tbody", { children: usuariosRecentes.map((usuario) => (_jsxs("tr", { className: "border-b border-gray-100 hover:bg-gray-50", children: [_jsx("td", { className: "p-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-cherry-400 to-sakura-400 rounded-full flex items-center justify-center text-white text-sm font-medium", children: usuario.nome.charAt(0) }), _jsx("span", { className: "font-medium text-gray-900", children: usuario.nome })] }) }), _jsx("td", { className: "p-3", children: _jsx("span", { className: `px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(usuario.role)}`, children: usuario.role }) }), _jsx("td", { className: "p-3", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsx("span", { className: "text-sm text-gray-600", children: usuario.status })] }) }), _jsx("td", { className: "p-3", children: _jsx(NipoButton, { size: "sm", variant: "outline", children: "Ver Perfil" }) })] }, usuario.id))) })] }) }) }) }), _jsx("div", { className: "text-center p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl", children: _jsx("p", { className: "text-gray-700 italic", children: "\"\u7BA1\u7406 (Kanri) - O verdadeiro controle vem da harmonia entre ordem e flexibilidade\"" }) })] }) }));
};
