'use client'

import React, { useState } from 'react'
import {
    HelpCircle,
    Search,
    Book,
    Video,
    MessageCircle,
    Phone,
    Mail,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Star,
    User,
    Music,
    Trophy
} from 'lucide-react'

interface FAQItem {
    id: string
    question: string
    answer: string
    category: string
}

export default function AjudaPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState('all')

    const faqItems: FAQItem[] = [
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
    ]

    const categories = [
        { key: 'all', label: 'Todas', icon: <HelpCircle className="w-4 h-4" /> },
        { key: 'login', label: 'Login & Acesso', icon: <User className="w-4 h-4" /> },
        { key: 'aulas', label: 'Aulas', icon: <Music className="w-4 h-4" /> },
        { key: 'conquistas', label: 'Conquistas', icon: <Trophy className="w-4 h-4" /> },
        { key: 'instrumentos', label: 'Instrumentos', icon: <Music className="w-4 h-4" /> },
        { key: 'avaliacao', label: 'Avaliação', icon: <Star className="w-4 h-4" /> }
    ]

    const filteredFAQs = faqItems.filter(item => {
        const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const toggleFAQ = (id: string) => {
        setExpandedFAQ(expandedFAQ === id ? null : id)
    }

    return (
        <div className="space-y-8">

            {/* Header Japonês */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    ❓ <span className="text-red-600">
                        Central de Ajuda
                    </span>
                </h1>
                <p className="text-gray-600">助け - Encontre respostas e suporte</p>
            </div>

            {/* Busca Rápida */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">🔍 Busca Rápida</h3>
                </div>
                <div className="p-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            placeholder="Digite sua dúvida ou palavra-chave..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">

                {/* Sidebar - Categorias */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">📂 Categorias</h3>
                        </div>
                        <div className="p-4 space-y-2">
                            {categories.map((category) => (
                                <button
                                    type="button"
                                    key={category.key}
                                    onClick={() => setSelectedCategory(category.key)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${selectedCategory === category.key
                                            ? 'bg-red-50 text-red-700 font-medium'
                                            : 'hover:bg-gray-50 text-gray-600'
                                        }`}
                                >
                                    {category.icon}
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contato Rápido */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">📞 Contato Rápido</h3>
                        </div>
                        <div className="p-4 space-y-3">
                            <button className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                Chat Online
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                <Phone className="w-4 h-4" />
                                (11) 9999-9999
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                <Mail className="w-4 h-4" />
                                suporte@niposchool.com
                            </button>
                        </div>
                    </div>
                </div>

                {/* Conteúdo Principal */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Recursos Rápidos */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer p-6 text-center">
                            <Book className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-900 mb-2">Guia do Usuário</h3>
                            <p className="text-sm text-gray-600 mb-3">Manual completo da plataforma</p>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center mx-auto">
                                Acessar <ExternalLink className="w-3 h-3 ml-1" />
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer p-6 text-center">
                            <Video className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-900 mb-2">Videotutoriais</h3>
                            <p className="text-sm text-gray-600 mb-3">Aprenda assistindo passo a passo</p>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center mx-auto">
                                Assistir <ExternalLink className="w-3 h-3 ml-1" />
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer p-6 text-center">
                            <MessageCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-900 mb-2">Comunidade</h3>
                            <p className="text-sm text-gray-600 mb-3">Converse com outros alunos</p>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center mx-auto">
                                Participar <ExternalLink className="w-3 h-3 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">💬 Perguntas Frequentes</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {filteredFAQs.map((faq) => (
                                <div
                                    key={faq.id}
                                    className="border border-gray-200 rounded-lg overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleFAQ(faq.id)}
                                        className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                                    >
                                        <span className="font-medium text-gray-900">{faq.question}</span>
                                        {expandedFAQ === faq.id ? (
                                            <ChevronUp className="w-5 h-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                        )}
                                    </button>

                                    {expandedFAQ === faq.id && (
                                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {filteredFAQs.length === 0 && (
                                <div className="text-center py-8">
                                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Nenhuma resposta encontrada
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Não encontramos resultados para "{searchTerm}".
                                    </p>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center mx-auto gap-2">
                                        <MessageCircle className="w-4 h-4" />
                                        Falar com Suporte
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Não encontrou? */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Não encontrou o que procurava?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Nossa equipe está pronta para ajudar você com qualquer dúvida
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Abrir Ticket de Suporte
                            </button>
                            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" />
                                Agendar Ligação
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            {/* Filosofia Japonesa */}
            <div className="text-center p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-100">
                <p className="text-gray-700 italic font-serif">
                    "学び (Manabi) - O aprendizado é uma jornada contínua de descoberta"
                </p>
            </div>

        </div>
    )
}
