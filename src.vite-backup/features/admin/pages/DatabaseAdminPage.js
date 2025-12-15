import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🔧 PÁGINA DE ADMINISTRAÇÃO DO BANCO - NIPO SCHOOL
 *
 * Interface para testar, monitorar e gerenciar o banco de dados
 */
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs';
import { testDatabaseHealth, testBasicConnection, testTablesAccess, testInstrumentosFeatures, testTurmasFeatures, populateTestData } from '../../../services/database/connectionTest';
import { Database, Server, CheckCircle, XCircle, AlertCircle, Play, Loader2, RefreshCw, Plus, Table, Users, Music } from 'lucide-react';
export default function DatabaseAdminPage() {
    const [loading, setLoading] = useState(false);
    const [health, setHealth] = useState(null);
    const [testResults, setTestResults] = useState({});
    const [lastUpdate, setLastUpdate] = useState(null);
    // Executar teste completo de saúde
    const runHealthCheck = async () => {
        setLoading(true);
        try {
            const result = await testDatabaseHealth();
            setHealth(result);
            setLastUpdate(new Date());
        }
        catch (error) {
            console.error('Erro no teste de saúde:', error);
        }
        finally {
            setLoading(false);
        }
    };
    // Executar teste específico
    const runSpecificTest = async (testName, testFunction) => {
        setLoading(true);
        try {
            const result = await testFunction();
            setTestResults(prev => ({
                ...prev,
                [testName]: result
            }));
        }
        catch (error) {
            console.error(`Erro no teste ${testName}:`, error);
            setTestResults(prev => ({
                ...prev,
                [testName]: {
                    success: false,
                    message: 'Erro na execução do teste',
                    error: String(error)
                }
            }));
        }
        finally {
            setLoading(false);
        }
    };
    // Popular dados de teste
    const populateData = async () => {
        setLoading(true);
        try {
            const result = await populateTestData();
            setTestResults(prev => ({
                ...prev,
                populate: result
            }));
            // Atualizar teste de saúde após popular
            setTimeout(runHealthCheck, 1000);
        }
        catch (error) {
            console.error('Erro ao popular dados:', error);
        }
        finally {
            setLoading(false);
        }
    };
    // Executar teste inicial
    useEffect(() => {
        runHealthCheck();
    }, []);
    const StatusIcon = ({ success }) => (success ? (_jsx(CheckCircle, { className: "w-5 h-5 text-green-500" })) : (_jsx(XCircle, { className: "w-5 h-5 text-red-500" })));
    const ResultCard = ({ title, result, icon: Icon }) => (_jsxs(Card, { className: "border-l-4 border-l-purple-400", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icon, { className: "w-5 h-5 text-purple-600" }), _jsx(CardTitle, { className: "text-lg", children: title })] }), result && _jsx(StatusIcon, { success: result.success })] }) }), _jsx(CardContent, { children: result ? (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: result.success ? 'default' : 'destructive', children: result.success ? 'Sucesso' : 'Erro' }), _jsx("span", { className: "text-sm text-gray-600", children: result.message })] }), result.data && (_jsx("div", { className: "bg-gray-50 p-3 rounded-lg", children: _jsx("pre", { className: "text-xs overflow-auto max-h-32", children: JSON.stringify(result.data, null, 2) }) })), result.error && (_jsx("div", { className: "bg-red-50 border border-red-200 p-3 rounded-lg", children: _jsx("p", { className: "text-red-700 text-sm", children: result.error }) }))] })) : (_jsx("p", { className: "text-gray-500", children: "Teste n\u00E3o executado" })) })] }));
    return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "\uD83D\uDD27 Administra\u00E7\u00E3o do Banco" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Monitor e teste das conex\u00F5es e funcionalidades do banco de dados" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [lastUpdate && (_jsxs("span", { className: "text-sm text-gray-500", children: ["\u00DAltima atualiza\u00E7\u00E3o: ", lastUpdate.toLocaleTimeString()] })), _jsxs(Button, { onClick: runHealthCheck, disabled: loading, className: "flex items-center gap-2", children: [loading ? (_jsx(Loader2, { className: "w-4 h-4 animate-spin" })) : (_jsx(RefreshCw, { className: "w-4 h-4" })), "Testar Sa\u00FAde"] })] })] }), health && (_jsxs(Card, { className: `border-l-4 ${health.connected && health.tablesAccessible ? 'border-l-green-400' : 'border-l-red-400'}`, children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Database, { className: "w-6 h-6" }), "Status Geral do Banco"] }), _jsx(Badge, { variant: health.connected && health.tablesAccessible ? 'default' : 'destructive', children: health.connected && health.tablesAccessible ? 'Saudável' : 'Problemas' })] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(StatusIcon, { success: health.connected }), _jsx("span", { className: "text-sm", children: "Conex\u00E3o" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(StatusIcon, { success: health.tablesAccessible }), _jsx("span", { className: "text-sm", children: "Tabelas" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(StatusIcon, { success: health.authWorking }), _jsx("span", { className: "text-sm", children: "Autentica\u00E7\u00E3o" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(StatusIcon, { success: health.realTimeWorking }), _jsx("span", { className: "text-sm", children: "Real-time" })] })] }), health.errors.length > 0 && (_jsxs("div", { className: "mt-4 bg-red-50 border border-red-200 p-3 rounded-lg", children: [_jsx("h4", { className: "font-medium text-red-800 mb-2", children: "Erros Encontrados:" }), _jsx("ul", { className: "list-disc list-inside text-sm text-red-700 space-y-1", children: health.errors.map((error, index) => (_jsx("li", { children: error }, index))) })] }))] })] })), _jsxs(Tabs, { defaultValue: "connection", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsx(TabsTrigger, { value: "connection", children: "Conex\u00E3o" }), _jsx(TabsTrigger, { value: "tables", children: "Tabelas" }), _jsx(TabsTrigger, { value: "features", children: "Features" }), _jsx(TabsTrigger, { value: "populate", children: "Dados" })] }), _jsxs(TabsContent, { value: "connection", className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Testes de Conex\u00E3o" }), _jsxs(Button, { onClick: () => runSpecificTest('connection', testBasicConnection), disabled: loading, size: "sm", children: [_jsx(Play, { className: "w-4 h-4 mr-2" }), "Testar Conex\u00E3o"] })] }), _jsx(ResultCard, { title: "Conex\u00E3o B\u00E1sica", result: testResults.connection, icon: Server })] }), _jsxs(TabsContent, { value: "tables", className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Acesso \u00E0s Tabelas" }), _jsxs(Button, { onClick: () => runSpecificTest('tables', testTablesAccess), disabled: loading, size: "sm", children: [_jsx(Play, { className: "w-4 h-4 mr-2" }), "Testar Tabelas"] })] }), _jsx(ResultCard, { title: "Acesso \u00E0s Tabelas Principais", result: testResults.tables, icon: Table })] }), _jsxs(TabsContent, { value: "features", className: "space-y-6", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("h2", { className: "text-xl font-semibold", children: "Funcionalidades Espec\u00EDficas" }) }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "font-medium", children: "Sistema de Instrumentos" }), _jsxs(Button, { onClick: () => runSpecificTest('instrumentos', testInstrumentosFeatures), disabled: loading, size: "sm", variant: "secondary", children: [_jsx(Play, { className: "w-4 h-4 mr-2" }), "Testar"] })] }), _jsx(ResultCard, { title: "Biblioteca de Instrumentos", result: testResults.instrumentos, icon: Music })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "font-medium", children: "Sistema de Turmas" }), _jsxs(Button, { onClick: () => runSpecificTest('turmas', testTurmasFeatures), disabled: loading, size: "sm", variant: "secondary", children: [_jsx(Play, { className: "w-4 h-4 mr-2" }), "Testar"] })] }), _jsx(ResultCard, { title: "Turmas e Matr\u00EDculas", result: testResults.turmas, icon: Users })] })] })] }), _jsxs(TabsContent, { value: "populate", className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Dados de Teste" }), _jsxs(Button, { onClick: populateData, disabled: loading, className: "flex items-center gap-2", children: [loading ? (_jsx(Loader2, { className: "w-4 h-4 animate-spin" })) : (_jsx(Plus, { className: "w-4 h-4" })), "Popular Dados"] })] }), _jsx("div", { className: "bg-yellow-50 border border-yellow-200 p-4 rounded-lg", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-yellow-600 mt-0.5" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-yellow-800", children: "Aten\u00E7\u00E3o!" }), _jsx("p", { className: "text-sm text-yellow-700 mt-1", children: "Esta fun\u00E7\u00E3o ir\u00E1 criar dados de teste no banco. Use apenas em ambiente de desenvolvimento." })] })] }) }), _jsx(ResultCard, { title: "Popula\u00E7\u00E3o de Dados de Teste", result: testResults.populate, icon: Plus })] })] })] }) }));
}
