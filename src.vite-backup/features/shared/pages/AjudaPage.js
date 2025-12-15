import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ❓ AJUDA PAGE - NIPO SCHOOL EVOLUTION
 *
 * Central de ajuda com design japonês
 * Features: FAQ, Tutoriais, Contato, Recursos
 */
import { useState } from 'react';
import { HelpCircle, Search, Book, Video, MessageCircle, Phone, Mail, ExternalLink, ChevronDown, ChevronUp, Star, User, Music, Trophy } from 'lucide-react';
import { NipoCard, NipoCardBody } from '../../../components/shared/NipoCard';
import { NipoButton } from '../../../components/shared/NipoButton';
import { NipoInput } from '../../../components/shared/NipoInput';
export function AjudaPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const faqItems = [
        {
            id: '1',
            question: 'Como fazer login na plataforma?',
            answer: 'Acesse a página inicial e clique em "Entrar". Use seu email e senha cadastrados. Se esqueceu a senha, clique em "Esqueci minha senha" para redefinir.',
            category: 'login'
        },
        {
            id: '2',
            question: 'Como agendar uma aula?',
            answer: 'No seu dashboard, vá para "Aulas" e clique em "Agendar Nova Aula". Escolha o professor, instrumento, data e horário disponível.',
            category: 'aulas'
        },
        {
            id: '3',
            question: 'Como visualizar minhas conquistas?',
            answer: 'Acesse a seção "Conquistas" no menu lateral. Lá você verá todas as suas conquistas desbloqueadas e o progresso das próximas.',
            category: 'conquistas'
        },
        {
            id: '4',
            question: 'Posso trocar de instrumento durante o curso?',
            answer: 'Sim! Você pode adicionar novos instrumentos a qualquer momento. Vá em "Configurações" > "Instrumentos" para gerenciar suas preferências.',
            category: 'instrumentos'
        },
        {
            id: '5',
            question: 'Como funciona o sistema de avaliação?',
            answer: 'Utilizamos um sistema baseado em competências. Cada habilidade é avaliada através de práticas, apresentações e feedback dos professores.',
            category: 'avaliacao'
        }
    ];
    const categories = [
        { key: 'all', label: 'Todas', icon: _jsx(HelpCircle, { className: "w-4 h-4" }) },
        { key: 'login', label: 'Login & Acesso', icon: _jsx(User, { className: "w-4 h-4" }) },
        { key: 'aulas', label: 'Aulas', icon: _jsx(Music, { className: "w-4 h-4" }) },
        { key: 'conquistas', label: 'Conquistas', icon: _jsx(Trophy, { className: "w-4 h-4" }) },
        { key: 'instrumentos', label: 'Instrumentos', icon: _jsx(Music, { className: "w-4 h-4" }) },
        { key: 'avaliacao', label: 'Avaliação', icon: _jsx(Star, { className: "w-4 h-4" }) }
    ];
    const filteredFAQs = faqItems.filter(item => {
        const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    const toggleFAQ = (id) => {
        setExpandedFAQ(expandedFAQ === id ? null : id);
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto space-y-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("h1", { className: "text-4xl font-bold text-gray-900 mb-2", children: ["\u2753 ", _jsx("span", { className: "bg-gradient-to-r from-cherry-600 to-sakura-600 bg-clip-text text-transparent", children: "Central de Ajuda" })] }), _jsx("p", { className: "text-gray-600", children: "\u52A9\u3051 - Encontre respostas e suporte" })] }), _jsx(NipoCard, { title: "\uD83D\uDD0D Busca R\u00E1pida", children: _jsx(NipoCardBody, { children: _jsx(NipoInput, { placeholder: "Digite sua d\u00FAvida ou palavra-chave...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), leftIcon: _jsx(Search, { className: "w-4 h-4" }), className: "text-lg" }) }) }), _jsxs("div", { className: "grid lg:grid-cols-4 gap-8", children: [_jsxs("div", { className: "lg:col-span-1", children: [_jsx(NipoCard, { title: "\uD83D\uDCC2 Categorias", children: _jsx(NipoCardBody, { children: _jsx("div", { className: "space-y-2", children: categories.map((category) => (_jsxs("button", { onClick: () => setSelectedCategory(category.key), className: `w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${selectedCategory === category.key
                                                    ? 'bg-cherry-100 text-cherry-700 font-medium'
                                                    : 'hover:bg-gray-50 text-gray-600'}`, children: [category.icon, category.label] }, category.key))) }) }) }), _jsx(NipoCard, { title: "\uD83D\uDCDE Contato R\u00E1pido", className: "mt-6", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs(NipoButton, { variant: "outline", fullWidth: true, className: "justify-start", children: [_jsx(MessageCircle, { className: "w-4 h-4 mr-2" }), "Chat Online"] }), _jsxs(NipoButton, { variant: "outline", fullWidth: true, className: "justify-start", children: [_jsx(Phone, { className: "w-4 h-4 mr-2" }), "(11) 9999-9999"] }), _jsxs(NipoButton, { variant: "outline", fullWidth: true, className: "justify-start", children: [_jsx(Mail, { className: "w-4 h-4 mr-2" }), "suporte@niposchool.com"] })] }) }) })] }), _jsxs("div", { className: "lg:col-span-3 space-y-6", children: [_jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [_jsx(NipoCard, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "text-center", children: [_jsx(Book, { className: "w-12 h-12 text-blue-500 mx-auto mb-3" }), _jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Guia do Usu\u00E1rio" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Manual completo da plataforma" }), _jsxs(NipoButton, { variant: "outline", size: "sm", children: ["Acessar ", _jsx(ExternalLink, { className: "w-3 h-3 ml-1" })] })] }) }) }), _jsx(NipoCard, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "text-center", children: [_jsx(Video, { className: "w-12 h-12 text-purple-500 mx-auto mb-3" }), _jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Videotutoriais" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Aprenda assistindo passo a passo" }), _jsxs(NipoButton, { variant: "outline", size: "sm", children: ["Assistir ", _jsx(ExternalLink, { className: "w-3 h-3 ml-1" })] })] }) }) }), _jsx(NipoCard, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "text-center", children: [_jsx(MessageCircle, { className: "w-12 h-12 text-green-500 mx-auto mb-3" }), _jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Comunidade" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Converse com outros alunos" }), _jsxs(NipoButton, { variant: "outline", size: "sm", children: ["Participar ", _jsx(ExternalLink, { className: "w-3 h-3 ml-1" })] })] }) }) })] }), _jsx(NipoCard, { title: "\uD83D\uDCAC Perguntas Frequentes", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-4", children: [filteredFAQs.map((faq) => (_jsxs("div", { className: "border border-gray-200 rounded-lg overflow-hidden", children: [_jsxs("button", { onClick: () => toggleFAQ(faq.id), className: "w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between", children: [_jsx("span", { className: "font-medium text-gray-900", children: faq.question }), expandedFAQ === faq.id ? (_jsx(ChevronUp, { className: "w-5 h-5 text-gray-500" })) : (_jsx(ChevronDown, { className: "w-5 h-5 text-gray-500" }))] }), expandedFAQ === faq.id && (_jsx("div", { className: "p-4 border-t border-gray-200 bg-gray-50", children: _jsx("p", { className: "text-gray-700 leading-relaxed", children: faq.answer }) }))] }, faq.id))), filteredFAQs.length === 0 && (_jsxs("div", { className: "text-center py-8", children: [_jsx(HelpCircle, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Nenhuma resposta encontrada" }), _jsxs("p", { className: "text-gray-600 mb-4", children: ["N\u00E3o encontramos resultados para \"", searchTerm, "\"."] }), _jsxs(NipoButton, { children: [_jsx(MessageCircle, { className: "w-4 h-4 mr-2" }), "Falar com Suporte"] })] }))] }) }) }), _jsx(NipoCard, { children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "text-center p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "N\u00E3o encontrou o que procurava?" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Nossa equipe est\u00E1 pronta para ajudar voc\u00EA com qualquer d\u00FAvida" }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [_jsxs(NipoButton, { children: [_jsx(MessageCircle, { className: "w-4 h-4 mr-2" }), "Abrir Ticket de Suporte"] }), _jsxs(NipoButton, { variant: "outline", children: [_jsx(Phone, { className: "w-4 h-4 mr-2" }), "Agendar Liga\u00E7\u00E3o"] })] })] }) }) })] })] }), _jsx("div", { className: "text-center p-6 bg-gradient-to-r from-cherry-100 to-sakura-100 rounded-2xl", children: _jsx("p", { className: "text-gray-700 italic", children: "\"\u5B66\u3073 (Manabi) - O aprendizado \u00E9 uma jornada cont\u00EDnua de descoberta\"" }) })] }) }));
}
export default AjudaPage;
