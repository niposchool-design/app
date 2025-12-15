import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🎵 PÁGINA DE INSTRUMENTOS - NIPO SCHOOL
 *
 * Página para visualizar e gerenciar a biblioteca de instrumentos
 */
import { useState, useEffect } from 'react';
import { Badge } from '../../../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { supabase } from '../../../../lib/supabase/client';
import { Music, Search, Filter, Heart, Star, Users, Plus, BookOpen } from 'lucide-react';
export default function InstrumentosPage() {
    const [instrumentos, setInstrumentos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
    // Carregar dados
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        setLoading(true);
        try {
            // Carregar categorias
            const { data: categoriasData, error: categoriasError } = await supabase
                .from('categorias_instrumentos')
                .select('*')
                .order('ordem_exibicao', { ascending: true });
            if (categoriasError) {
                console.error('Erro ao carregar categorias:', categoriasError);
            }
            else {
                setCategorias(categoriasData || []);
            }
            // Carregar instrumentos
            const { data: instrumentosData, error: instrumentosError } = await supabase
                .from('instrumentos')
                .select('*')
                .order('nome', { ascending: true });
            if (instrumentosError) {
                console.error('Erro ao carregar instrumentos:', instrumentosError);
            }
            else {
                setInstrumentos(instrumentosData || []);
            }
        }
        catch (error) {
            console.error('Erro geral:', error);
        }
        finally {
            setLoading(false);
        }
    };
    // Filtrar instrumentos
    const filteredInstrumentos = instrumentos.filter(instrumento => {
        const matchesSearch = instrumento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            instrumento.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || instrumento.categoria === selectedCategory;
        const matchesLevel = selectedLevel === 'all' || instrumento.nivel_dificuldade === selectedLevel;
        return matchesSearch && matchesCategory && matchesLevel;
    });
    const InstrumentCard = ({ instrumento }) => (_jsxs(Card, { className: "group hover:shadow-lg transition-all duration-300 hover:-translate-y-1", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center", children: _jsx(Music, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg group-hover:text-purple-600 transition-colors", children: instrumento.nome }), _jsx("p", { className: "text-sm text-gray-500", children: instrumento.categoria })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [instrumento.nivel_dificuldade && (_jsx(Badge, { variant: "secondary", children: instrumento.nivel_dificuldade })), _jsx(Button, { variant: "ghost", size: "sm", className: "opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(Heart, { className: "w-4 h-4" }) })] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [instrumento.descricao && (_jsx("p", { className: "text-sm text-gray-600 line-clamp-2", children: instrumento.descricao })), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-gray-100", children: [_jsxs("div", { className: "flex items-center gap-4 text-xs text-gray-500", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-3 h-3" }), _jsx("span", { children: "15 alunos" })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-3 h-3 fill-yellow-400 text-yellow-400" }), _jsx("span", { children: "4.8" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "secondary", size: "sm", children: [_jsx(BookOpen, { className: "w-4 h-4 mr-1" }), "Saiba Mais"] }), _jsxs(Button, { size: "sm", children: [_jsx(Plus, { className: "w-4 h-4 mr-1" }), "Come\u00E7ar"] })] })] })] })] }));
    const CategoryCard = ({ categoria }) => {
        const instrumentosDaCategoria = instrumentos.filter(i => i.categoria === categoria.nome);
        return (_jsx(Card, { className: "cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group", onClick: () => setSelectedCategory(categoria.nome), children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform", children: _jsx(Music, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors", children: categoria.nome }), _jsx("p", { className: "text-sm text-gray-500 mb-3", children: categoria.descricao }), _jsxs(Badge, { variant: "secondary", className: "text-xs", children: [instrumentosDaCategoria.length, " instrumentos"] })] }) }));
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Carregando instrumentos..." })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-12", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "\uD83C\uDFB5 Biblioteca de Instrumentos" }), _jsx("p", { className: "text-xl text-purple-100 mb-8", children: "Descubra a rica tradi\u00E7\u00E3o musical japonesa e explore instrumentos \u00FAnicos" }), _jsx("div", { className: "max-w-2xl mx-auto", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }), _jsx(Input, { placeholder: "Pesquise por instrumentos, categorias ou n\u00EDvel...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-12 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-purple-200" })] }) })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8", children: [_jsxs("div", { className: "flex flex-wrap gap-4 mb-8", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Filter, { className: "w-4 h-4 text-gray-500" }), _jsx("span", { className: "text-sm font-medium text-gray-700", children: "Filtros:" })] }), _jsxs("select", { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), className: "px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500", children: [_jsx("option", { value: "all", children: "Todas as Categorias" }), categorias.map((categoria) => (_jsx("option", { value: categoria.nome, children: categoria.nome }, categoria.id)))] }), _jsxs("select", { value: selectedLevel, onChange: (e) => setSelectedLevel(e.target.value), className: "px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500", children: [_jsx("option", { value: "all", children: "Todos os N\u00EDveis" }), _jsx("option", { value: "iniciante", children: "Iniciante" }), _jsx("option", { value: "intermediario", children: "Intermedi\u00E1rio" }), _jsx("option", { value: "avancado", children: "Avan\u00E7ado" })] }), _jsx(Button, { variant: "secondary", size: "sm", onClick: () => {
                                    setSelectedCategory('all');
                                    setSelectedLevel('all');
                                    setSearchTerm('');
                                }, children: "Limpar Filtros" })] }), searchTerm === '' && selectedCategory === 'all' && (_jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Explore por Categoria" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: categorias.map((categoria) => (_jsx(CategoryCard, { categoria: categoria }, categoria.id))) })] })), _jsx("div", { className: "mb-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: selectedCategory === 'all' ? 'Todos os Instrumentos' : `Instrumentos - ${selectedCategory}` }), _jsxs("span", { className: "text-sm text-gray-500", children: [filteredInstrumentos.length, " instrumento", filteredInstrumentos.length !== 1 ? 's' : '', " encontrado", filteredInstrumentos.length !== 1 ? 's' : ''] })] }) }), filteredInstrumentos.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Music, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-gray-600 mb-2", children: "Nenhum instrumento encontrado" }), _jsx("p", { className: "text-gray-500", children: "Tente ajustar os filtros ou termos de busca" })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredInstrumentos.map((instrumento) => (_jsx(InstrumentCard, { instrumento: instrumento }, instrumento.id))) })), _jsxs("div", { className: "mt-12 bg-white rounded-xl shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Estat\u00EDsticas da Biblioteca" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: instrumentos.length }), _jsx("div", { className: "text-sm text-gray-500", children: "Instrumentos" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: categorias.length }), _jsx("div", { className: "text-sm text-gray-500", children: "Categorias" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: instrumentos.filter(i => i.nivel_dificuldade === 'iniciante').length }), _jsx("div", { className: "text-sm text-gray-500", children: "Para Iniciantes" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: "24" }), _jsx("div", { className: "text-sm text-gray-500", children: "Professores" })] })] })] })] })] }));
}
