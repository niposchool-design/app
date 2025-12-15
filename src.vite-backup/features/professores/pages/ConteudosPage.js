import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 📚 CONTEÚDOS PAGE - Área dos Professores
 *
 * Lista todos os conteúdos criados pelo professor
 * Permite filtrar, buscar e gerenciar conteúdos
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Video, BookOpen, Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { NipoCard, NipoCardBody } from '../../../components/shared/NipoCard';
import { NipoButton } from '../../../components/shared/NipoButton';
export const ConteudosPage = () => {
    const [filtroTipo, setFiltroTipo] = useState('todos');
    const [busca, setBusca] = useState('');
    // Mock data - substituir por dados reais do Supabase
    const conteudos = [
        {
            id: '1',
            titulo: '5 Sacadas para Melhorar sua Aula',
            tipo: 'sacada',
            descricao: 'Dicas práticas para tornar suas aulas mais dinâmicas',
            criado_em: '2024-12-01',
            visivel: true,
            visualizacoes: 45
        },
        {
            id: '2',
            titulo: 'Introdução ao Shamisen',
            tipo: 'video',
            descricao: 'Vídeo aula sobre técnicas básicas do Shamisen',
            criado_em: '2024-11-28',
            visivel: true,
            visualizacoes: 78
        },
        {
            id: '3',
            titulo: 'Devocional Semanal - Louvor e Música',
            tipo: 'devocional',
            descricao: 'Reflexão sobre o papel da música no louvor',
            criado_em: '2024-12-03',
            visivel: true,
            visualizacoes: 32
        }
    ];
    const getIconByType = (tipo) => {
        switch (tipo) {
            case 'video':
                return _jsx(Video, { className: "w-5 h-5" });
            case 'sacada':
                return _jsx(FileText, { className: "w-5 h-5" });
            case 'devocional':
                return _jsx(BookOpen, { className: "w-5 h-5" });
            default:
                return _jsx(FileText, { className: "w-5 h-5" });
        }
    };
    const getColorByType = (tipo) => {
        switch (tipo) {
            case 'video':
                return 'bg-red-100 text-red-800';
            case 'sacada':
                return 'bg-blue-100 text-blue-800';
            case 'devocional':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const conteudosFiltrados = conteudos.filter(conteudo => {
        const matchTipo = filtroTipo === 'todos' || conteudo.tipo === filtroTipo;
        const matchBusca = conteudo.titulo.toLowerCase().includes(busca.toLowerCase()) ||
            conteudo.descricao.toLowerCase().includes(busca.toLowerCase());
        return matchTipo && matchBusca;
    });
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "\uD83D\uDCDA Meus Conte\u00FAdos" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Gerencie seus materiais, v\u00EDdeos e recursos educacionais" })] }), _jsx(Link, { to: "/professores/novo", children: _jsxs(NipoButton, { variant: "primary", children: [_jsx(Plus, { className: "w-5 h-5 mr-2" }), "Novo Conte\u00FAdo"] }) })] }), _jsx(NipoCard, { children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }), _jsx("input", { type: "text", placeholder: "Buscar conte\u00FAdos...", value: busca, onChange: (e) => setBusca(e.target.value), className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Filter, { className: "w-5 h-5 text-gray-600" }), _jsxs("select", { value: filtroTipo, onChange: (e) => setFiltroTipo(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "todos", children: "Todos os Tipos" }), _jsx("option", { value: "video", children: "V\u00EDdeos" }), _jsx("option", { value: "sacada", children: "Sacadas" }), _jsx("option", { value: "devocional", children: "Devocionais" }), _jsx("option", { value: "material", children: "Materiais" })] })] })] }) }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Total de Conte\u00FAdos" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: conteudos.length })] }), _jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-500", children: [_jsx("p", { className: "text-sm text-gray-600", children: "V\u00EDdeos" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: conteudos.filter(c => c.tipo === 'video').length })] }), _jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Devocionais" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: conteudos.filter(c => c.tipo === 'devocional').length })] }), _jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Total de Visualiza\u00E7\u00F5es" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: conteudos.reduce((acc, c) => acc + (c.visualizacoes || 0), 0) })] })] }), _jsx("div", { className: "space-y-4", children: conteudosFiltrados.length === 0 ? (_jsx(NipoCard, { children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "text-center py-12", children: [_jsx(FileText, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Nenhum conte\u00FAdo encontrado" }), _jsx("p", { className: "text-gray-600 mb-4", children: busca || filtroTipo !== 'todos'
                                            ? 'Tente ajustar os filtros ou busca'
                                            : 'Comece criando seu primeiro conteúdo!' }), !busca && filtroTipo === 'todos' && (_jsx(Link, { to: "/professores/novo", children: _jsxs(NipoButton, { variant: "primary", children: [_jsx(Plus, { className: "w-5 h-5 mr-2" }), "Criar Primeiro Conte\u00FAdo"] }) }))] }) }) })) : (conteudosFiltrados.map((conteudo) => (_jsx(NipoCard, { children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-4 flex-1", children: [_jsx("div", { className: `p-3 rounded-lg ${getColorByType(conteudo.tipo)}`, children: getIconByType(conteudo.tipo) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: conteudo.titulo }), !conteudo.visivel && (_jsx("span", { className: "px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded", children: "Oculto" }))] }), _jsx("p", { className: "text-gray-600 text-sm mb-2", children: conteudo.descricao }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-500", children: [_jsxs("span", { children: ["Criado em ", new Date(conteudo.criado_em).toLocaleDateString('pt-BR')] }), _jsx("span", { children: "\u2022" }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "w-4 h-4" }), conteudo.visualizacoes || 0, " visualiza\u00E7\u00F5es"] })] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Link, { to: `/professores/conteudos/${conteudo.id}`, children: _jsx("button", { className: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors", children: _jsx(Eye, { className: "w-5 h-5" }) }) }), _jsx("button", { className: "p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors", children: _jsx(Edit, { className: "w-5 h-5" }) }), _jsx("button", { className: "p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors", children: _jsx(Trash2, { className: "w-5 h-5" }) })] })] }) }) }, conteudo.id)))) })] }) }));
};
export default ConteudosPage;
