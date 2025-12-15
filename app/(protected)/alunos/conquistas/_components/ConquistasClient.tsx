'use client';

import { useState } from 'react';
import { Trophy, Star, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Conquista {
    id: string;
    titulo: string;
    descricao: string;
    icone: string;
    raridade: 'comum' | 'raro' | 'epico' | 'lendario';
    pontos: number;
    desbloqueada: boolean;
    data_desbloqueio?: string;
    progresso?: number;
    meta?: number;
}

export default function ConquistasClient({ conquistas }: { conquistas: Conquista[] }) {
    const [filtro, setFiltro] = useState<'todas' | 'desbloqueadas' | 'bloqueadas'>('todas');

    const conquistasDesbloqueadas = conquistas.filter(c => c.desbloqueada);
    const conquistasBloqueadas = conquistas.filter(c => !c.desbloqueada);

    const conquistasFiltradas =
        filtro === 'desbloqueadas' ? conquistasDesbloqueadas :
            filtro === 'bloqueadas' ? conquistasBloqueadas :
                conquistas;

    const totalPontos = conquistasDesbloqueadas.reduce((acc, c) => acc + c.pontos, 0);
    const progressoGeral = conquistas.length > 0 ? Math.round((conquistasDesbloqueadas.length / conquistas.length) * 100) : 0;

    const getRaridadeColors = (raridade: string) => {
        switch (raridade) {
            case 'comum': return { bg: 'from-slate-400 to-slate-500', border: 'border-slate-300', badge: 'bg-slate-200 text-slate-800' };
            case 'raro': return { bg: 'from-blue-400 to-blue-600', border: 'border-blue-300', badge: 'bg-blue-200 text-blue-900' };
            case 'epico': return { bg: 'from-purple-400 to-purple-600', border: 'border-purple-300', badge: 'bg-purple-200 text-purple-900' };
            case 'lendario': return { bg: 'from-amber-400 to-orange-600', border: 'border-amber-300', badge: 'bg-gradient-to-r from-amber-200 to-orange-200 text-amber-900' };
            default: return { bg: 'from-gray-400 to-gray-500', border: 'border-gray-300', badge: 'bg-gray-200 text-gray-800' };
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
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                                    <Trophy className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-red-100 font-bold tracking-widest text-sm uppercase">業績 Achievements</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black mb-4">🏆 Minhas Conquistas</h1>
                            <p className="text-red-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                                Sua jornada de honra e dedicação registrada em cada medalha.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-black/20 backdrop-blur-sm p-5 rounded-2xl border border-white/20 text-center min-w-[130px]">
                                <div className="text-4xl font-black text-yellow-300">{totalPontos}</div>
                                <div className="text-xs text-red-100 uppercase tracking-wider font-bold mt-1">Pontos de Honra</div>
                            </div>
                            <div className="bg-black/20 backdrop-blur-sm p-5 rounded-2xl border border-white/20 text-center min-w-[130px]">
                                <div className="text-4xl font-black text-white">{conquistasDesbloqueadas.length}/{conquistas.length}</div>
                                <div className="text-xs text-red-100 uppercase tracking-wider font-bold mt-1">Conquistas</div>
                            </div>
                        </div>
                    </div>

                    {/* Barra de Progresso */}
                    <div className="mt-8 bg-black/20 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-white/20">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressoGeral}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 relative"
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </motion.div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-red-100 font-bold">
                        <span>Iniciado</span>
                        <span>{progressoGeral}% Completo</span>
                        <span>Mestre</span>
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
                    onClick={() => setFiltro('todas')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'todas'
                            ? 'bg-gray-800 text-white shadow-gray-200 ring-4 ring-gray-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200'
                        }`}
                >
                    🏅 Todas ({conquistas.length})
                </button>

                <button
                    onClick={() => setFiltro('desbloqueadas')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'desbloqueadas'
                            ? 'bg-green-600 text-white shadow-green-200 ring-4 ring-green-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200'
                        }`}
                >
                    ✅ Desbloqueadas ({conquistasDesbloqueadas.length})
                </button>

                <button
                    onClick={() => setFiltro('bloqueadas')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'bloqueadas'
                            ? 'bg-red-600 text-white shadow-red-200 ring-4 ring-red-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200'
                        }`}
                >
                    🔒 Bloqueadas ({conquistasBloqueadas.length})
                </button>
            </motion.div>

            {/* Grid de Conquistas */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {conquistasFiltradas.map((conquista, idx) => {
                    const colors = getRaridadeColors(conquista.raridade);
                    const progresso = conquista.progresso && conquista.meta ? (conquista.progresso / conquista.meta) * 100 : 0;

                    return (
                        <motion.div
                            key={conquista.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${colors.border} ${conquista.desbloqueada ? 'hover:-translate-y-2' : 'opacity-75'
                                }`}
                        >
                            {/* Badge de Raridade */}
                            <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-black uppercase ${colors.badge}`}>
                                {conquista.raridade}
                            </div>

                            {/* Ícone */}
                            <div className={`relative w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg transform ${conquista.desbloqueada ? 'group-hover:scale-110 group-hover:rotate-6' : 'grayscale'
                                } transition-all duration-300`}>
                                {conquista.desbloqueada ? (
                                    <div className="text-5xl">{conquista.icone}</div>
                                ) : (
                                    <Lock className="w-12 h-12 text-white" />
                                )}

                                {conquista.desbloqueada && (
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                                        <Sparkles className="w-4 h-4 text-white" fill="white" />
                                    </div>
                                )}
                            </div>

                            {/* Conteúdo */}
                            <div className="text-center">
                                <h3 className="font-black text-gray-900 mb-2 text-lg">
                                    {conquista.desbloqueada ? conquista.titulo : '???'}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                    {conquista.desbloqueada ? conquista.descricao : 'Conquista bloqueada. Continue praticando!'}
                                </p>

                                {/* Progresso */}
                                {!conquista.desbloqueada && conquista.progresso !== undefined && conquista.meta && (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                                            <span>Progresso</span>
                                            <span>{conquista.progresso}/{conquista.meta}</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${colors.bg} rounded-full transition-all duration-500`}
                                                style={{ width: `${progresso}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Pontos */}
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-black text-sm ${conquista.desbloqueada ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    <Star className="w-4 h-4" fill="currentColor" />
                                    +{conquista.pontos} XP
                                </div>

                                {/* Data de Desbloqueio */}
                                {conquista.desbloqueada && conquista.data_desbloqueio && (
                                    <div className="text-xs text-gray-500 mt-3 font-medium">
                                        🎉 {new Date(conquista.data_desbloqueio).toLocaleDateString('pt-BR')}
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
