import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🎯 DASHBOARD DE STATUS DO SISTEMA - NIPO SCHOOL
 *
 * Página que centraliza informações sobre todo o sistema
 */
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import { testDatabaseHealth, testInstrumentosFeatures } from '../../../../services/database/connectionTest';
import { checkTablesExist, checkDataExists, setupBasicDatabase } from '../../../../services/database/sqlExecutor';
import { Database, Music, Users, BookOpen, Award, TrendingUp, Activity, CheckCircle, XCircle, RefreshCw, Settings, BarChart3, Calendar, MessageSquare } from 'lucide-react';
export default function SystemDashboardPage() {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [testing, setTesting] = useState(false);
    useEffect(() => {
        checkSystemStatus();
    }, []);
    const checkSystemStatus = async () => {
        setLoading(true);
        try {
            // Verificar status do banco
            const dbHealth = await testDatabaseHealth();
            const tablesCheck = await checkTablesExist();
            const dataCheck = await checkDataExists();
            const instrumentosCheck = await testInstrumentosFeatures();
            setStatus({
                database: {
                    connected: dbHealth.connected,
                    tablesOk: tablesCheck.success,
                    dataExists: dataCheck.success,
                    lastCheck: new Date()
                },
                features: {
                    instrumentos: dataCheck.data?.instrumentos || 0,
                    categorias: dataCheck.data?.categorias_instrumentos || 0,
                    usuarios: 12, // Mock data
                    turmas: 5 // Mock data
                },
                activity: {
                    activeUsers: 8, // Mock data
                    todayLogins: 15, // Mock data
                    weeklyActivity: 78 // Mock data
                }
            });
        }
        catch (error) {
            console.error('Erro ao verificar status:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const runSetup = async () => {
        setTesting(true);
        try {
            await setupBasicDatabase();
            await checkSystemStatus();
        }
        catch (error) {
            console.error('Erro no setup:', error);
        }
        finally {
            setTesting(false);
        }
    };
    const StatusIndicator = ({ status, label }) => (_jsxs("div", { className: "flex items-center gap-2", children: [status ? (_jsx(CheckCircle, { className: "w-4 h-4 text-green-500" })) : (_jsx(XCircle, { className: "w-4 h-4 text-red-500" })), _jsx("span", { className: "text-sm", children: label })] }));
    const MetricCard = ({ title, value, change, icon: Icon, color = 'purple' }) => (_jsx(Card, { children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: title }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: value }), change && (_jsxs("p", { className: "text-xs text-green-600 flex items-center gap-1 mt-1", children: [_jsx(TrendingUp, { className: "w-3 h-3" }), change] }))] }), _jsx("div", { className: `w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`, children: _jsx(Icon, { className: `w-6 h-6 text-${color}-600` }) })] }) }) }));
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Verificando status do sistema..." })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "bg-white border-b border-gray-200", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "\uD83C\uDFAF Dashboard do Sistema" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Status e m\u00E9tricas gerais do Nipo School" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [status?.database.lastCheck && (_jsxs("span", { className: "text-sm text-gray-500", children: ["\u00DAltima verifica\u00E7\u00E3o: ", status.database.lastCheck.toLocaleTimeString()] })), _jsxs(Button, { onClick: checkSystemStatus, disabled: loading, variant: "secondary", children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Atualizar"] }), _jsxs(Button, { onClick: runSetup, disabled: testing, children: [testing ? (_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" })) : (_jsx(Settings, { className: "w-4 h-4 mr-2" })), "Setup Sistema"] })] })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8 space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: `border-l-4 ${status?.database.connected && status?.database.tablesOk
                                    ? 'border-l-green-400'
                                    : 'border-l-red-400'}`, children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Database, { className: "w-5 h-5" }), "Status do Banco de Dados"] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsx(StatusIndicator, { status: status?.database.connected || false, label: "Conex\u00E3o estabelecida" }), _jsx(StatusIndicator, { status: status?.database.tablesOk || false, label: "Tabelas acess\u00EDveis" }), _jsx(StatusIndicator, { status: status?.database.dataExists || false, label: "Dados populados" })] })] }), _jsxs(Card, { className: "border-l-4 border-l-blue-400", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Music, { className: "w-5 h-5" }), "Biblioteca Musical"] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Instrumentos" }), _jsx(Badge, { variant: "default", children: status?.features.instrumentos || 0 })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Categorias" }), _jsx(Badge, { variant: "default", children: status?.features.categorias || 0 })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Usu\u00E1rios" }), _jsx(Badge, { variant: "default", children: status?.features.usuarios || 0 })] })] })] }), _jsxs(Card, { className: "border-l-4 border-l-purple-400", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "w-5 h-5" }), "Atividade do Sistema"] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Usu\u00E1rios Online" }), _jsx(Badge, { variant: "success", children: status?.activity.activeUsers || 0 })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Logins Hoje" }), _jsx(Badge, { variant: "default", children: status?.activity.todayLogins || 0 })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Atividade Semanal" }), _jsxs(Badge, { variant: "default", children: [status?.activity.weeklyActivity || 0, "%"] })] })] })] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "M\u00E9tricas Principais" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(MetricCard, { title: "Total de Instrumentos", value: status?.features.instrumentos || 0, change: "+2 esta semana", icon: Music, color: "purple" }), _jsx(MetricCard, { title: "Usu\u00E1rios Ativos", value: status?.activity.activeUsers || 0, change: "+15% vs semana passada", icon: Users, color: "blue" }), _jsx(MetricCard, { title: "Turmas Ativas", value: status?.features.turmas || 0, change: "+1 este m\u00EAs", icon: BookOpen, color: "green" }), _jsx(MetricCard, { title: "Engajamento", value: `${status?.activity.weeklyActivity || 0}%`, change: "+5% este m\u00EAs", icon: Award, color: "orange" })] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Acesso R\u00E1pido" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsx(Card, { className: "hover:shadow-lg transition-shadow cursor-pointer group", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform", children: _jsx(Music, { className: "w-8 h-8 text-purple-600" }) }), _jsx("h3", { className: "font-semibold text-lg mb-2", children: "Biblioteca de Instrumentos" }), _jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Explore nossa cole\u00E7\u00E3o completa de instrumentos japoneses" }), _jsx(Button, { className: "w-full", onClick: () => window.open('/instrumentos', '_blank'), children: "Acessar Biblioteca" })] }) }), _jsx(Card, { className: "hover:shadow-lg transition-shadow cursor-pointer group", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform", children: _jsx(Database, { className: "w-8 h-8 text-blue-600" }) }), _jsx("h3", { className: "font-semibold text-lg mb-2", children: "Administra\u00E7\u00E3o do Banco" }), _jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Gerencie e monitore o banco de dados" }), _jsx(Button, { className: "w-full", onClick: () => window.open('/admin/database', '_blank'), children: "Acessar Admin" })] }) }), _jsx(Card, { className: "hover:shadow-lg transition-shadow cursor-pointer group", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform", children: _jsx(BarChart3, { className: "w-8 h-8 text-green-600" }) }), _jsx("h3", { className: "font-semibold text-lg mb-2", children: "Analytics & Relat\u00F3rios" }), _jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Visualize dados e m\u00E9tricas detalhadas" }), _jsx(Button, { variant: "secondary", className: "w-full", children: "Em Breve" })] }) })] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Atividade Recente" }), _jsx(Card, { children: _jsx(CardContent, { className: "p-6", children: _jsx("div", { className: "space-y-4", children: [
                                            { icon: Users, text: "3 novos usuários se registraram", time: "2 horas atrás", color: "text-blue-600" },
                                            { icon: Music, text: "Novo instrumento adicionado: Koto", time: "4 horas atrás", color: "text-purple-600" },
                                            { icon: Calendar, text: "5 aulas agendadas para amanhã", time: "6 horas atrás", color: "text-green-600" },
                                            { icon: MessageSquare, text: "10 novos comentários em portfolios", time: "8 horas atrás", color: "text-orange-600" }
                                        ].map((activity, index) => (_jsxs("div", { className: "flex items-center gap-4 p-3 bg-gray-50 rounded-lg", children: [_jsx(activity.icon, { className: `w-5 h-5 ${activity.color}` }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium text-gray-900", children: activity.text }), _jsx("p", { className: "text-xs text-gray-500", children: activity.time })] })] }, index))) }) }) })] })] })] }));
}
