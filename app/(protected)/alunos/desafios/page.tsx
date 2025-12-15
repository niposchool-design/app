'use client';

import { useState } from 'react';
import { Target, Trophy, Flame, Clock, Star, Zap, CheckCircle2, Lock, Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface Desafio {
    id: string;
    titulo: string;
    descricao: string;
    dificuldade: 'facil' | 'medio' | 'dificil';
    pontos: number;
    prazo: string;
    status: 'ativo' | 'concluido' | 'expirado';
    participantes: number;
    categoria: string;
    isJapones?: boolean;
}

export default function DesafiosPage() {
    const [filtro, setFiltro] = useState<'todos' | 'ativos' | 'concluidos'>('ativos');

    // Mock data
    const desafios: Desafio[] = [
        {
            id: '1',
            titulo: 'Domínio do Koto: Sakura Perfect',
            descricao: 'Toque Sakura Sakura no koto sem erros com 95% de precisão',
            dificuldade: 'medio',
            pontos: 200,
            prazo: '2025-12-31',
            status: 'ativo',
            participantes: 24,
            categoria: 'Koto',
            isJapones: true,
        },
        {
            id: '2',
            titulo: 'Mestre do Shamisen',
            descricao: 'Complete 3 músicas tradicionais no shamisen',
            dificuldade: 'dificil',
            pontos: 300,
            prazo: '2025-12-25',
            status: 'ativo',
            participantes: 12,
            categoria: 'Shamisen',
            isJapones: true,
        },
        {
            id: '3',
            titulo: 'Primeira Performance Pública',
            descricao: 'Grave e envie sua primeira apresentação musical completa',
            dificuldade: 'facil',
            pontos: 100,
            prazo: '2025-12-20',
            status: 'concluido',
            participantes: 45,
            categoria: 'Performance',
            isJapones: false,
        },
        {
            id: '4',
            titulo: 'Respiração Zen: Shakuhachi',
            descricao: 'Domine a técnica de respiração e toque 2 músicas completas',
            dificuldade: 'dificil',
            pontos: 350,
            prazo: '2026-01-15',
            status: 'ativo',
            participantes: 8,
            categoria: 'Shakuhachi',
            isJapones: true,
        },
        {
            id: '5',
            titulo: 'Teoria Musical Japonesa',
            descricao: 'Complete o quiz de escalas pentatônicas japonesas com 100%',
            dificuldade: 'medio',
            pontos: 150,
            prazo: '2025-12-28',
            status: 'ativo',
            participantes: 32,
            categoria: 'Teoria',
            isJapones: true,
        },
        {
            id: '6',
            titulo: 'Sequência de Ouro',
            descricao: 'Pratique por 7 dias consecutivos sem faltar',
            dificuldade: 'facil',
            pontos: 80,
            prazo: '2025-12-22',
            status: 'concluido',
            participantes: 56,
            categoria: 'Dedicação',
            isJapones: false,
        },
    ];

    const desafiosAtivos = desafios.filter(d => d.status === 'ativo');
    const desafiosConcluidos = desafios.filter(d => d.status === 'concluido');

    const desafiosFiltrados =
        filtro === 'ativos' ? desafiosAtivos :
        filtro === 'concluidos' ? desafiosConcluidos :
        desafios;

    const stats = {
        submetidos: desafiosConcluidos.length,
        aprovados: desafiosConcluidos.length,
        pontosGanhos: desafiosConcluidos.reduce((acc, d) => acc + d.pontos, 0),
    };

    const getDificuldadeColor = (dif: string) => {
        switch (dif) {
            case 'facil': return { bg: 'bg-green-500', text: 'text-green-700', badge: 'bg-green-100' };
            case 'medio': return { bg: 'bg-yellow-500', text: 'text-yellow-700', badge: 'bg-yellow-100' };
            case 'dificil': return { bg: 'bg-red-500', text: 'text-red-700', badge: 'bg-red-100' };
            default: return { bg: 'bg-gray-500', text: 'text-gray-700', badge: 'bg-gray-100' };
        }
    };

    const getDificuldadeLabel = (dif: string) => {
        switch (dif) {
            case 'facil': return 'Fácil';
            case 'medio': return 'Médio';
            case 'dificil': return 'Difícil';
            default: return dif;
        }
    };

    return (
        <div className="space-y-8">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 opacity-10">
                    <Target size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                            <Flame className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-red-100 font-bold tracking-widest text-sm uppercase">挑戦 Challenges</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4">⚔️ Meus Desafios</h1>
                    <p className="text-red-100 text-lg md:text-xl max-w-3xl leading-relaxed mb-6">
                        Aceite desafios musicais e prove sua dedicação. Cada vitória é uma conquista de honra.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                            <div className="text-3xl font-black mb-1">{stats.submetidos}</div>
                            <div className="text-xs text-red-100 uppercase tracking-wider font-bold">Submetidos</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                            <div className="text-3xl font-black mb-1">{stats.aprovados}</div>
                            <div className="text-xs text-red-100 uppercase tracking-wider font-bold">Aprovados</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                            <div className="text-3xl font-black mb-1">{stats.pontosGanhos}</div>
                            <div className="text-xs text-red-100 uppercase tracking-wider font-bold">XP Ganho</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filtros */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap gap-3 items-center"
            >
                <span className="text-gray-600 font-bold text-sm">Visualizar:</span>
                
                <button
                    onClick={() => setFiltro('ativos')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${
                        filtro === 'ativos'
                            ? 'bg-orange-600 text-white shadow-orange-200 ring-4 ring-orange-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200'
                    }`}
                >
                    🔥 Ativos ({desafiosAtivos.length})
                </button>
                
                <button
                    onClick={() => setFiltro('todos')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${
                        filtro === 'todos'
                            ? 'bg-gray-800 text-white shadow-gray-200 ring-4 ring-gray-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200'
                    }`}
                >
                    🎯 Todos ({desafios.length})
                </button>
                
                <button
                    onClick={() => setFiltro('concluidos')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${
                        filtro === 'concluidos'
                            ? 'bg-green-600 text-white shadow-green-200 ring-4 ring-green-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200'
                    }`}
                >
                    ✅ Concluídos ({desafiosConcluidos.length})
                </button>
            </motion.div>

            {/* Grid de Desafios */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                {desafiosFiltrados.map((desafio, idx) => {
                    const difColors = getDificuldadeColor(desafio.dificuldade);
                    const isConcluido = desafio.status === 'concluido';
                    const isJapones = desafio.isJapones;

                    return (
                        <motion.div
                            key={desafio.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                                isConcluido ? 'border-green-300 bg-green-50/30' : 
                                isJapones ? 'border-red-200 hover:border-red-400' : 
                                'border-gray-200 hover:border-gray-300'
                            } ${!isConcluido && 'hover:-translate-y-1'}`}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${
                                    isConcluido ? 'bg-green-100 text-green-600' :
                                    isJapones ? 'bg-red-50 text-red-600' :
                                    'bg-orange-50 text-orange-600'
                                }`}>
                                    {isConcluido ? <CheckCircle2 size={28} /> : <Target size={28} />}
                                </div>

                                <div className="flex gap-2">
                                    {isJapones && !isConcluido && (
                                        <div className="px-2.5 py-1 bg-red-600 text-white rounded-full text-xs font-black">
                                            🎌 JAPONÊS
                                        </div>
                                    )}
                                    <div className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${difColors.badge} ${difColors.text}`}>
                                        {getDificuldadeLabel(desafio.dificuldade)}
                                    </div>
                                </div>
                            </div>

                            {/* Conteúdo */}
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                                    {desafio.titulo}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    {desafio.descricao}
                                </p>
                                
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                    <span className="px-2.5 py-1 bg-gray-100 rounded-full font-bold">
                                        📂 {desafio.categoria}
                                    </span>
                                    <span className="px-2.5 py-1 bg-gray-100 rounded-full font-bold">
                                        👥 {desafio.participantes} participantes
                                    </span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 text-gray-600">
                                        <Clock size={16} />
                                        <span className="font-bold">{new Date(desafio.prazo).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 font-black text-yellow-600">
                                        <Star size={16} fill="currentColor" />
                                        <span>+{desafio.pontos} XP</span>
                                    </div>
                                </div>

                                {!isConcluido && (
                                    <button className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-md ${
                                        isJapones
                                            ? 'bg-red-600 text-white hover:bg-red-700'
                                            : 'bg-orange-600 text-white hover:bg-orange-700'
                                    }`}>
                                        Aceitar Desafio
                                    </button>
                                )}

                                {isConcluido && (
                                    <div className="px-6 py-2.5 bg-green-100 text-green-700 rounded-xl font-black text-sm flex items-center gap-2">
                                        <CheckCircle2 size={16} />
                                        Concluído
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
