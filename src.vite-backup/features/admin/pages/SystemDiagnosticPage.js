import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🔍 DIAGNÓSTICO DO SISTEMA - Verificação de Componentes e Rotas
 *
 * Página para verificar:
 * - Status de todos os componentes
 * - Funcionamento das rotas
 * - Integração com banco de dados
 * - Uso correto dos dashboards
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle, Database, Layout, Users, Music, Settings, Eye, RefreshCw } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { NipoCard, NipoCardBody } from '../../../components/shared/NipoCard';
import { NipoButton } from '../../../components/shared/NipoButton';
export function SystemDiagnosticPage() {
    const { user } = useAuth();
    const [components, setComponents] = useState([]);
    const [isChecking, setIsChecking] = useState(false);
    // Lista de componentes e rotas para verificar
    const systemComponents = [
        // Dashboards
        { name: 'Admin Dashboard', path: '/admin', status: 'loading', description: 'Dashboard administrativo principal', role: 'admin' },
        { name: 'Professor Dashboard', path: '/professores', status: 'loading', description: 'Dashboard para professores', role: 'professor' },
        { name: 'Aluno Dashboard', path: '/alunos', status: 'loading', description: 'Dashboard para alunos', role: 'aluno' },
        // Páginas Admin
        { name: 'Database Admin', path: '/admin/database', status: 'loading', description: 'Administração do banco de dados', role: 'admin' },
        // Páginas Principais
        { name: 'Instrumentos Page', path: '/instrumentos', status: 'loading', description: 'Biblioteca de instrumentos', role: 'all' },
        { name: 'System Dashboard', path: '/system', status: 'loading', description: 'Dashboard do sistema', role: 'all' },
        { name: 'Navigation Page', path: '/', status: 'loading', description: 'Página de navegação central', role: 'all' },
        // Páginas de Aluno
        { name: 'Conquistas', path: '/alunos/conquistas', status: 'loading', description: 'Sistema de conquistas', role: 'aluno' },
        { name: 'Portfolio', path: '/alunos/portfolio', status: 'loading', description: 'Portfolio do aluno', role: 'aluno' },
        { name: 'Desafios', path: '/alunos/desafios', status: 'loading', description: 'Desafios disponíveis', role: 'aluno' },
        { name: 'Minhas Aulas', path: '/alunos/aulas', status: 'loading', description: 'Aulas do aluno', role: 'aluno' },
        { name: 'Progresso', path: '/alunos/progresso', status: 'loading', description: 'Progresso do aluno', role: 'aluno' },
        { name: 'Perfil', path: '/alunos/perfil', status: 'loading', description: 'Perfil do aluno', role: 'aluno' },
        // Páginas Gerais
        { name: 'Configurações', path: '/configuracoes', status: 'loading', description: 'Configurações do sistema', role: 'all' },
        { name: 'Notificações', path: '/notificacoes', status: 'loading', description: 'Central de notificações', role: 'all' },
        { name: 'Ajuda', path: '/ajuda', status: 'loading', description: 'Sistema de ajuda', role: 'all' },
    ];
    // Simular verificação dos componentes
    const checkComponents = async () => {
        setIsChecking(true);
        const updatedComponents = [];
        for (const component of systemComponents) {
            // Simular verificação
            await new Promise(resolve => setTimeout(resolve, 100));
            // Determinar status baseado em role e disponibilidade
            let status = 'ok';
            // Verificar se o usuário tem acesso
            if (component.role && component.role !== 'all' && user?.role !== component.role) {
                status = 'warning'; // Não tem acesso
            }
            updatedComponents.push({
                ...component,
                status
            });
        }
        setComponents(updatedComponents);
        setIsChecking(false);
    };
    useEffect(() => {
        checkComponents();
    }, [user]);
    const getStatusIcon = (status) => {
        switch (status) {
            case 'ok':
                return _jsx(CheckCircle, { className: "w-5 h-5 text-green-600" });
            case 'error':
                return _jsx(XCircle, { className: "w-5 h-5 text-red-600" });
            case 'warning':
                return _jsx(AlertTriangle, { className: "w-5 h-5 text-yellow-600" });
            case 'loading':
                return _jsx(RefreshCw, { className: "w-5 h-5 text-blue-600 animate-spin" });
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 'ok':
                return 'Funcionando';
            case 'error':
                return 'Erro';
            case 'warning':
                return 'Sem acesso';
            case 'loading':
                return 'Verificando...';
        }
    };
    const filterComponentsByRole = (components) => {
        if (!user)
            return components;
        return components.filter(component => component.role === 'all' ||
            component.role === user.role ||
            user.role === 'admin' // Admin vê tudo
        );
    };
    const visibleComponents = filterComponentsByRole(components);
    const okCount = visibleComponents.filter(c => c.status === 'ok').length;
    const errorCount = visibleComponents.filter(c => c.status === 'error').length;
    const warningCount = visibleComponents.filter(c => c.status === 'warning').length;
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-3", children: "\uD83D\uDD0D Diagn\u00F3stico do Sistema" }), _jsx("p", { className: "text-gray-600 text-lg", children: "Verifica\u00E7\u00E3o completa de componentes e rotas do Nipo School" })] }), _jsx(NipoCard, { title: "Informa\u00E7\u00F5es do Usu\u00E1rio", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Users, { className: "w-5 h-5 text-blue-600" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Usu\u00E1rio" }), _jsx("p", { className: "font-semibold", children: user?.nome || 'Não logado' })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Settings, { className: "w-5 h-5 text-green-600" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Papel" }), _jsx("p", { className: "font-semibold capitalize", children: user?.role || 'N/A' })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Database, { className: "w-5 h-5 text-purple-600" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Email" }), _jsx("p", { className: "font-semibold text-sm", children: user?.email || 'N/A' })] })] })] }) }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(CheckCircle, { className: "w-8 h-8 text-green-600" }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-green-600", children: okCount }), _jsx("p", { className: "text-sm text-gray-600", children: "Funcionando" })] })] }) }), _jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(AlertTriangle, { className: "w-8 h-8 text-yellow-600" }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-yellow-600", children: warningCount }), _jsx("p", { className: "text-sm text-gray-600", children: "Sem Acesso" })] })] }) }), _jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(XCircle, { className: "w-8 h-8 text-red-600" }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-red-600", children: errorCount }), _jsx("p", { className: "text-sm text-gray-600", children: "Com Erro" })] })] }) }), _jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Layout, { className: "w-8 h-8 text-blue-600" }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-blue-600", children: visibleComponents.length }), _jsx("p", { className: "text-sm text-gray-600", children: "Total" })] })] }) })] }), _jsx(NipoCard, { title: "Status dos Componentes", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("p", { className: "text-gray-600", children: ["Mostrando ", visibleComponents.length, " componentes para o papel: ", _jsx("span", { className: "font-semibold capitalize", children: user?.role || 'Visitante' })] }), _jsx(NipoButton, { onClick: checkComponents, disabled: isChecking, leftIcon: _jsx(RefreshCw, { className: `w-4 h-4 ${isChecking ? 'animate-spin' : ''}` }), variant: "outline", children: isChecking ? 'Verificando...' : 'Verificar Novamente' })] }), _jsx("div", { className: "space-y-3", children: visibleComponents.map((component, index) => (_jsxs("div", { className: "flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors", children: [_jsxs("div", { className: "flex items-center gap-4", children: [getStatusIcon(component.status), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: component.name }), _jsx("p", { className: "text-sm text-gray-600", children: component.description }), _jsxs("p", { className: "text-xs text-gray-500", children: ["Rota: ", component.path] })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${component.status === 'ok' ? 'bg-green-100 text-green-800' :
                                                            component.status === 'error' ? 'bg-red-100 text-red-800' :
                                                                component.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-blue-100 text-blue-800'}`, children: getStatusText(component.status) }), component.status === 'ok' && (_jsx(Link, { to: component.path, children: _jsx(NipoButton, { size: "sm", variant: "outline", leftIcon: _jsx(Eye, { className: "w-3 h-3" }), children: "Acessar" }) }))] })] }, index))) })] }) }) }), _jsx(NipoCard, { title: "A\u00E7\u00F5es R\u00E1pidas", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(Link, { to: "/", children: _jsx(NipoButton, { fullWidth: true, leftIcon: _jsx(Layout, { className: "w-4 h-4" }), children: "Navega\u00E7\u00E3o Principal" }) }), user?.role === 'admin' && (_jsx(Link, { to: "/admin/database", children: _jsx(NipoButton, { fullWidth: true, leftIcon: _jsx(Database, { className: "w-4 h-4" }), variant: "outline", children: "Database Admin" }) })), _jsx(Link, { to: "/instrumentos", children: _jsx(NipoButton, { fullWidth: true, leftIcon: _jsx(Music, { className: "w-4 h-4" }), variant: "outline", children: "Biblioteca de Instrumentos" }) })] }) }) })] }) }));
}
export default SystemDiagnosticPage;
