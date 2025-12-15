'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Music, ArrowRight, Sparkles, Play, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InstrumentosClientProps {
    instrumentos: any[];
}

export default function InstrumentosClient({ instrumentos }: InstrumentosClientProps) {
    const [filtro, setFiltro] = useState<'todos' | 'japoneses' | 'ocidentais'>('japoneses');

    const instrumentosJaponeses = instrumentos.filter(i =>
        ['Koto', 'Shamisen', 'Shakuhachi', 'Taiko', 'Biwa', 'Shinobue', 'Tsuzumi', 'Fue'].some(j =>
            i.nome?.toLowerCase().includes(j.toLowerCase())
        )
    );

    const instrumentosOcidentais = instrumentos.filter(i =>
        !instrumentosJaponeses.find(j => j.id === i.id)
    );

    // Se não houver japoneses, pode ser que o filtro falhou ou não tem dados, default para todos
    const instrumentosFiltrados =
        filtro === 'japoneses' ? instrumentosJaponeses :
            filtro === 'ocidentais' ? instrumentosOcidentais :
                instrumentos;

    return (
        <div className="space-y-8">
            {/* Header Japonês */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                    <Music size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-red-100 font-bold tracking-widest text-sm uppercase">楽器 Gakki</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4">🎌 Instrumentos Japoneses</h1>
                    <p className="text-red-100 text-lg md:text-xl max-w-3xl leading-relaxed">
                        Descubra a alma da música tradicional japonesa através de seus instrumentos sagrados.
                        Cada som conta uma história de mil anos.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                            🎵 {instrumentosJaponeses.length} Instrumentos Tradicionais
                        </div>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                            🌏 {instrumentosOcidentais.length} Instrumentos Ocidentais
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filtros com Foco Japonês */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap gap-3 items-center"
            >
                <span className="text-gray-600 font-bold text-sm">Filtrar por:</span>

                <button
                    onClick={() => setFiltro('japoneses')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'japoneses'
                            ? 'bg-red-600 text-white shadow-red-200 ring-4 ring-red-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-red-200'
                        }`}
                >
                    🎌 Japoneses ({instrumentosJaponeses.length})
                </button>

                <button
                    onClick={() => setFiltro('todos')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'todos'
                            ? 'bg-gray-800 text-white shadow-gray-200 ring-4 ring-gray-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300'
                        }`}
                >
                    🌏 Todos ({instrumentos.length})
                </button>

                <button
                    onClick={() => setFiltro('ocidentais')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'ocidentais'
                            ? 'bg-blue-600 text-white shadow-blue-200 ring-4 ring-blue-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-200'
                        }`}
                >
                    🎻 Ocidentais ({instrumentosOcidentais.length})
                </button>
            </motion.div>

            {/* Grid de Instrumentos */}
            {instrumentosFiltrados.length > 0 && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filtro}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ staggerChildren: 0.05 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {instrumentosFiltrados.map((inst, idx) => {
                            const isJapones = instrumentosJaponeses.find(j => j.id === inst.id);

                            return (
                                <motion.div
                                    key={inst.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link
                                        href={`/alunos/instrumentos/${inst.id}`}
                                        className={`group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden h-full transform hover:-translate-y-2 ${isJapones
                                                ? 'border-2 border-red-200 hover:border-red-400 hover:shadow-red-100/50'
                                                : 'border border-gray-100 hover:shadow-blue-100/50'
                                            }`}
                                    >
                                        <div className="h-56 bg-gray-100 relative overflow-hidden">
                                            {inst.imagem_url ? (
                                                <img
                                                    src={inst.imagem_url}
                                                    alt={inst.nome}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gradient-to-br from-gray-50 to-gray-100">
                                                    <Music size={64} strokeWidth={1.5} />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            {/* Badge Japonês */}
                                            {isJapones && (
                                                <div className="absolute top-3 left-3 px-3 py-1.5 bg-red-600 text-white rounded-full text-xs font-black shadow-lg flex items-center gap-1.5">
                                                    🎌 TRADICIONAL JAPONÊS
                                                </div>
                                            )}

                                            {/* Nível de Dificuldade */}
                                            {inst.nivel_dificuldade && (
                                                <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-gray-700 shadow-sm">
                                                    {inst.nivel_dificuldade}
                                                </div>
                                            )}

                                            {/* Play Icon on Hover */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="mb-2">
                                                <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${isJapones
                                                        ? 'bg-red-50 text-red-600'
                                                        : 'bg-blue-50 text-blue-600'
                                                    }`}>
                                                    {inst.categoria || 'Instrumento'}
                                                </span>
                                            </div>
                                            <h3 className={`text-xl font-bold mb-2 group-hover:scale-105 transition-transform ${isJapones ? 'text-red-900' : 'text-gray-900'
                                                }`}>
                                                {inst.nome}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
                                                {inst.descricao || inst.historia || 'Descubra mais sobre este instrumento fascinante...'}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                                <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                                                    <Volume2 size={14} className={isJapones ? 'text-red-500' : 'text-blue-500'} />
                                                    Ouvir sons
                                                </span>
                                                <span className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${isJapones
                                                        ? 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                                                        : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                                                    }`}>
                                                    <ArrowRight size={18} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            )}

            {/* Empty State */}
            {instrumentosFiltrados.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200"
                >
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Music className="w-10 h-10 text-red-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Nenhum instrumento encontrado</h3>
                    <p className="text-gray-500 mt-2">Tente outro filtro ou aguarde novos instrumentos.</p>
                </motion.div>
            )}
        </div>
    );
}
