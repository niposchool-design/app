'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, Trophy, Calendar, Clock, Music, Play, CheckCircle2, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Aula {
    id: string;
    numero: number;
    titulo: string;
    descricao: string;
    duracao_estimada: number;
    nivel_dificuldade: string;
    status?: 'concluida' | 'em-andamento' | 'bloqueada';
}

interface AulasClientProps {
    aulas: Aula[];
}

export default function AulasClient({ aulas }: AulasClientProps) {
    const [filtro, setFiltro] = useState<'todas' | 'disponiveis' | 'concluidas'>('disponiveis');

    const aulasDisponiveis = aulas.filter(a => a.status !== 'bloqueada');
    const aulasConcluidas = aulas.filter(a => a.status === 'concluida');

    const aulasFiltradas =
        filtro === 'disponiveis' ? aulasDisponiveis :
            filtro === 'concluidas' ? aulasConcluidas :
                aulas;

    const progressoPorcentagem = aulas.length > 0 ? (aulasConcluidas.length / aulas.length) * 100 : 0;

    return (
        <div className="space-y-8">
            {/* Hero Japonês */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 opacity-10">
                    <BookOpen size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-red-100 font-bold tracking-widest text-sm uppercase">授業 Jugyō</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4">🎌 Minhas Aulas</h1>
                    <p className="text-red-100 text-lg md:text-xl max-w-3xl leading-relaxed mb-6">
                        Sua jornada na música tradicional japonesa. Aprenda no seu ritmo, domine cada técnica.
                    </p>

                    {/* Progresso Visual */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-sm">SEU PROGRESSO</span>
                            <span className="font-black text-xl">{Math.round(progressoPorcentagem)}%</span>
                        </div>
                        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressoPorcentagem}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full bg-white rounded-full shadow-lg"
                            />
                        </div>
                        <div className="flex gap-4 mt-4 flex-wrap">
                            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                                📚 {aulas.length} Aulas Totais
                            </div>
                            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                                ✅ {aulasConcluidas.length} Concluídas
                            </div>
                            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                                🔓 {aulasDisponiveis.length} Disponíveis
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Método Alpha Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border-2 border-red-100"
            >
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3">
                        <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-black text-gray-900 mb-3">
                            🌸 Método Alpha - Jornada Progressiva
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            No Método Alpha, você cresce musicalmente de forma contínua e natural, como uma cerejeira que floresce.
                            Cada aula se constrói sobre a anterior, permitindo domínio completo antes de avançar.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                                <Calendar className="w-5 h-5 text-red-600" />
                                <div>
                                    <div className="text-sm font-bold">30 Aulas</div>
                                    <div className="text-xs text-gray-600">Jornada Completa</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                                <Clock className="w-5 h-5 text-orange-600" />
                                <div>
                                    <div className="text-sm font-bold">Seu Ritmo</div>
                                    <div className="text-xs text-gray-600">Progressão Natural</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                                <Music className="w-5 h-5 text-pink-600" />
                                <div>
                                    <div className="text-sm font-bold">Show Final</div>
                                    <div className="text-xs text-gray-600">Grande Objetivo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filtros */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-3 items-center"
            >
                <span className="text-gray-600 font-bold text-sm">Visualizar:</span>

                <button
                    onClick={() => setFiltro('disponiveis')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'disponiveis'
                            ? 'bg-red-600 text-white shadow-red-200 ring-4 ring-red-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200'
                        }`}
                >
                    🔓 Disponíveis ({aulasDisponiveis.length})
                </button>

                <button
                    onClick={() => setFiltro('todas')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'todas'
                            ? 'bg-gray-800 text-white shadow-gray-200 ring-4 ring-gray-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200'
                        }`}
                >
                    📚 Todas ({aulas.length})
                </button>

                <button
                    onClick={() => setFiltro('concluidas')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'concluidas'
                            ? 'bg-green-600 text-white shadow-green-200 ring-4 ring-green-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200'
                        }`}
                >
                    ✅ Concluídas ({aulasConcluidas.length})
                </button>
            </motion.div>

            {/* Grid de Aulas */}
            {aulasFiltradas.length > 0 && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filtro}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {aulasFiltradas.map((aula, idx) => {
                            const isConcluida = aula.status === 'concluida';
                            const isBloqueada = aula.status === 'bloqueada';
                            const isEmAndamento = aula.status === 'em-andamento';

                            return (
                                <motion.div
                                    key={aula.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link
                                        href={isBloqueada ? '#' : `/alunos/aulas/${aula.numero}`} // Updated to use numero as per detail page
                                        className={`group block bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border-2 ${isConcluida ? 'border-green-200 hover:border-green-400' :
                                                isEmAndamento ? 'border-yellow-200 hover:border-yellow-400' :
                                                    isBloqueada ? 'border-gray-200 opacity-60 cursor-not-allowed' :
                                                        'border-red-200 hover:border-red-400'
                                            } ${!isBloqueada && 'transform hover:-translate-y-2'}`}
                                        onClick={(e) => isBloqueada && e.preventDefault()}
                                    >
                                        {/* Header da Aula */}
                                        <div className={`h-32 relative overflow-hidden ${isConcluida ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                                                isEmAndamento ? 'bg-gradient-to-br from-yellow-500 to-orange-600' :
                                                    isBloqueada ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                                                        'bg-gradient-to-br from-red-500 to-pink-600'
                                            }`}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {isBloqueada ? (
                                                    <Lock size={48} className="text-white/40" />
                                                ) : isConcluida ? (
                                                    <CheckCircle2 size={48} className="text-white/90" fill="white" />
                                                ) : (
                                                    <Play size={48} className="text-white/40 group-hover:text-white/90 transition-all group-hover:scale-110" />
                                                )}
                                            </div>

                                            {/* Número da Aula */}
                                            <div className="absolute top-3 left-3 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <span className="text-white font-black text-sm">{aula.numero}</span>
                                            </div>

                                            {/* Badge Status */}
                                            {!isBloqueada && (
                                                <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-black">
                                                    {isConcluida ? '✅ COMPLETA' : isEmAndamento ? '⏳ EM ANDAMENTO' : '🆕 NOVA'}
                                                </div>
                                            )}
                                        </div>

                                        {/* Conteúdo */}
                                        <div className="p-6">
                                            <div className="mb-3">
                                                <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${isBloqueada ? 'bg-gray-100 text-gray-500' :
                                                        'bg-red-50 text-red-600'
                                                    }`}>
                                                    {aula.nivel_dificuldade}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                                                {aula.titulo}
                                            </h3>

                                            <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                                                {aula.descricao}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <Clock size={14} />
                                                    <span className="font-medium">{aula.duracao_estimada}min</span>
                                                </div>

                                                {!isBloqueada && (
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${isConcluida ? 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white' :
                                                            'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                                                        }`}>
                                                        <Play size={18} className="ml-0.5" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            )}

            {aulasFiltradas.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200"
                >
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-10 h-10 text-red-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Nenhuma aula encontrada</h3>
                    <p className="text-gray-500 mt-2">Tente outro filtro ou aguarde novas aulas.</p>
                </motion.div>
            )}
        </div>
    );
}
