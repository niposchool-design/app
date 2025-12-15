import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Trophy, Lock, CheckCircle, Star, ArrowLeft, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NipoCard, NipoCardBody, NipoCardStat } from '../../../components/shared/NipoCard';
import { NipoInput } from '../../../components/shared/NipoInput';
export function ConquistasPage() {
    const [filtroStatus, setFiltroStatus] = useState('todas');
    const [filtroCategoria, setFiltroCategoria] = useState('todas');
    const [busca, setBusca] = useState('');
    const conquistas = [
        {
            id: '1',
            titulo: 'Primeiro Passo',
            descricao: 'Complete seu primeiro desafio',
            icone: '���',
            categoria: 'iniciante',
            pontos: 10,
            progresso: 100,
            meta: 1,
            atual: 1,
            desbloqueado: true,
            data_desbloqueio: '2025-10-01',
            raridade: 'comum'
        },
        {
            id: '2',
            titulo: 'Sequência de 7 Dias',
            descricao: 'Acesse a plataforma por 7 dias seguidos',
            icone: '���',
            categoria: 'social',
            pontos: 50,
            progresso: 57,
            meta: 7,
            atual: 4,
            desbloqueado: false,
            raridade: 'raro'
        },
        {
            id: '3',
            titulo: 'Mestre do Piano',
            descricao: 'Complete 10 desafios de piano',
            icone: '���',
            categoria: 'intermediario',
            pontos: 100,
            progresso: 30,
            meta: 10,
            atual: 3,
            desbloqueado: false,
            raridade: 'epico'
        },
        {
            id: '4',
            titulo: 'Prodígio Musical',
            descricao: 'Atinja 1000 pontos totais',
            icone: '���',
            categoria: 'especial',
            pontos: 200,
            progresso: 15,
            meta: 1000,
            atual: 150,
            desbloqueado: false,
            raridade: 'lendario'
        },
        {
            id: '5',
            titulo: 'Compositor Iniciante',
            descricao: 'Crie sua primeira composição',
            icone: '���',
            categoria: 'iniciante',
            pontos: 25,
            progresso: 0,
            meta: 1,
            atual: 0,
            desbloqueado: false,
            raridade: 'comum'
        }
    ];
    const conquistasFiltradas = conquistas.filter((conquista) => {
        const matchStatus = filtroStatus === 'todas' ||
            (filtroStatus === 'desbloqueadas' && conquista.desbloqueado) ||
            (filtroStatus === 'bloqueadas' && !conquista.desbloqueado);
        const matchCategoria = filtroCategoria === 'todas' || conquista.categoria === filtroCategoria;
        const matchBusca = busca === '' ||
            conquista.titulo.toLowerCase().includes(busca.toLowerCase()) ||
            conquista.descricao.toLowerCase().includes(busca.toLowerCase());
        return matchStatus && matchCategoria && matchBusca;
    });
    const totalConquistas = conquistas.length;
    const desbloqueadas = conquistas.filter((c) => c.desbloqueado).length;
    const pontosGanhos = conquistas
        .filter((c) => c.desbloqueado)
        .reduce((acc, c) => acc + c.pontos, 0);
    const percentualCompleto = Math.round((desbloqueadas / totalConquistas) * 100);
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 space-y-8", children: [_jsxs("div", { children: [_jsxs(Link, { to: "/aluno", className: "inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), "Voltar ao Dashboard"] }), _jsxs("div", { className: "bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl p-8 text-white", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("div", { className: "w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center", children: _jsx(Trophy, { className: "w-8 h-8" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Conquistas" }), _jsx("p", { className: "text-yellow-100", children: "Continue desbloqueando novas conquistas!" })] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-6", children: [_jsx(NipoCardStat, { label: "Desbloqueadas", value: `${desbloqueadas}/${totalConquistas}`, className: "bg-white/10 backdrop-blur-sm border-white/20 text-white" }), _jsx(NipoCardStat, { label: "Progresso", value: `${percentualCompleto}%`, className: "bg-white/10 backdrop-blur-sm border-white/20 text-white" }), _jsx(NipoCardStat, { label: "Pontos Ganhos", value: pontosGanhos, className: "bg-white/10 backdrop-blur-sm border-white/20 text-white" }), _jsx(NipoCardStat, { label: "Pr\u00F3xima", value: `${conquistas.find((c) => !c.desbloqueado)?.progresso || 0}%`, className: "bg-white/10 backdrop-blur-sm border-white/20 text-white" })] })] })] }), _jsx(NipoCard, { children: _jsxs(NipoCardBody, { children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Filter, { className: "w-5 h-5 text-gray-600" }), _jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Filtros" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(NipoInput, { type: "text", placeholder: "Buscar conquista...", value: busca, onChange: (e) => setBusca(e.target.value), leftIcon: _jsx(Search, { className: "w-5 h-5" }) }), _jsxs("select", { value: filtroStatus, onChange: (e) => setFiltroStatus(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none cursor-pointer", children: [_jsx("option", { value: "todas", children: "Todas as conquistas" }), _jsx("option", { value: "desbloqueadas", children: "Desbloqueadas" }), _jsx("option", { value: "bloqueadas", children: "Bloqueadas" })] }), _jsxs("select", { value: filtroCategoria, onChange: (e) => setFiltroCategoria(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none cursor-pointer", children: [_jsx("option", { value: "todas", children: "Todas as categorias" }), _jsx("option", { value: "iniciante", children: "Iniciante" }), _jsx("option", { value: "intermediario", children: "Intermedi\u00E1rio" }), _jsx("option", { value: "avancado", children: "Avan\u00E7ado" }), _jsx("option", { value: "social", children: "Social" }), _jsx("option", { value: "especial", children: "Especial" })] })] })] }) }), conquistasFiltradas.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: conquistasFiltradas.map((conquista) => (_jsx(ConquistaCard, { conquista: conquista }, conquista.id))) })) : (_jsx(NipoCard, { children: _jsxs(NipoCardBody, { className: "text-center py-12", children: [_jsx(Trophy, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Nenhuma conquista encontrada" }), _jsx("p", { className: "text-gray-600", children: "Tente ajustar os filtros ou limpar a busca" })] }) }))] }) }));
}
function ConquistaCard({ conquista }) {
    const raridadeConfig = {
        comum: { bg: 'from-gray-100 to-gray-200', text: 'text-gray-700', border: 'border-gray-300' },
        raro: { bg: 'from-blue-100 to-blue-200', text: 'text-blue-700', border: 'border-blue-300' },
        epico: { bg: 'from-purple-100 to-purple-200', text: 'text-purple-700', border: 'border-purple-300' },
        lendario: { bg: 'from-yellow-100 to-orange-200', text: 'text-orange-700', border: 'border-orange-300' }
    };
    const config = raridadeConfig[conquista.raridade];
    return (_jsx("div", { className: `bg-gradient-to-br ${config.bg} rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-2 ${config.border} ${conquista.desbloqueado ? '' : 'opacity-60'}`, children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsx("div", { className: `w-16 h-16 rounded-xl flex items-center justify-center text-4xl ${conquista.desbloqueado ? 'bg-white shadow-md' : 'bg-white/50'}`, children: conquista.desbloqueado ? conquista.icone : _jsx(Lock, { className: "w-8 h-8 text-gray-400" }) }), _jsxs("div", { className: "flex flex-col items-end gap-1", children: [conquista.desbloqueado && (_jsx("div", { className: "bg-green-500 text-white rounded-full p-1.5", children: _jsx(CheckCircle, { className: "w-4 h-4" }) })), _jsx("span", { className: `text-xs font-medium ${config.text} uppercase tracking-wide`, children: conquista.raridade })] })] }), _jsx("h3", { className: "text-lg font-bold text-gray-900 mb-2", children: conquista.titulo }), _jsx("p", { className: "text-sm text-gray-700 mb-4", children: conquista.descricao }), !conquista.desbloqueado && (_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex items-center justify-between text-sm mb-1", children: [_jsx("span", { className: "text-gray-700 font-medium", children: "Progresso" }), _jsxs("span", { className: "text-gray-900 font-bold", children: [conquista.progresso, "%"] })] }), _jsx("div", { className: "w-full bg-white/50 rounded-full h-2.5 overflow-hidden", children: _jsx("div", { className: "bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500", style: { width: `${conquista.progresso}%` } }) }), _jsxs("p", { className: "text-xs text-gray-600 mt-1", children: [conquista.atual, "/", conquista.meta] })] })), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-gray-300/50", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-600" }), _jsxs("span", { className: "text-sm font-bold text-gray-900", children: [conquista.pontos, " pts"] })] }), conquista.desbloqueado && conquista.data_desbloqueio && (_jsx("span", { className: "text-xs text-gray-600", children: new Date(conquista.data_desbloqueio).toLocaleDateString('pt-BR') }))] })] }) }));
}
