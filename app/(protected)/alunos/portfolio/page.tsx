'use client';

import { Music, Play, Share2, Download, Star, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PortfolioPage() {
    const [filtro, setFiltro] = useState<'todos' | 'japonesas' | 'ocidentais'>('japonesas');

    const obras = [
        {
            id: 1,
            titulo: 'Sakura Sakura',
            instrumento: 'Koto',
            tipo: 'japonesa',
            duracao: '4:30',
            nivel: 'intermediário',
            nota: 9.5,
            dataGravacao: '15 Nov 2024',
            plays: 45,
            thumbnail: '🌸',
        },
        {
            id: 2,
            titulo: 'Rokudan no Shirabe',
            instrumento: 'Koto',
            tipo: 'japonesa',
            duracao: '6:00',
            nivel: 'avançado',
            nota: 9.0,
            dataGravacao: '20 Out 2024',
            plays: 32,
            thumbnail: '🎵',
        },
        {
            id: 3,
            titulo: 'Tsuru no Sugomori',
            instrumento: 'Shakuhachi',
            tipo: 'japonesa',
            duracao: '5:15',
            nivel: 'avançado',
            nota: 8.5,
            dataGravacao: '10 Set 2024',
            plays: 28,
            thumbnail: '🦢',
        },
        {
            id: 4,
            titulo: 'Shika no Tōne',
            instrumento: 'Shakuhachi',
            tipo: 'japonesa',
            duracao: '4:45',
            nivel: 'intermediário',
            nota: 9.0,
            dataGravacao: '5 Ago 2024',
            plays: 38,
            thumbnail: '🦌',
        },
        {
            id: 5,
            titulo: 'Peça de Shamisen Clássico',
            instrumento: 'Shamisen',
            tipo: 'japonesa',
            duracao: '5:30',
            nivel: 'avançado',
            nota: 9.2,
            dataGravacao: '1 Jul 2024',
            plays: 41,
            thumbnail: '🎸',
        },
        {
            id: 6,
            titulo: 'Für Elise',
            instrumento: 'Piano',
            tipo: 'ocidental',
            duracao: '3:30',
            nivel: 'intermediário',
            nota: 8.8,
            dataGravacao: '20 Jun 2024',
            plays: 25,
            thumbnail: '🎹',
        },
        {
            id: 7,
            titulo: 'Ode à Alegria',
            instrumento: 'Piano',
            tipo: 'ocidental',
            duracao: '4:00',
            nivel: 'iniciante',
            nota: 8.0,
            dataGravacao: '10 Mai 2024',
            plays: 19,
            thumbnail: '🎼',
        },
    ];

    const stats = {
        obrasCompletas: obras.length,
        mediaNotas: (obras.reduce((acc, o) => acc + o.nota, 0) / obras.length).toFixed(1),
        totalPlays: obras.reduce((acc, o) => acc + o.plays, 0),
        instrumentos: [...new Set(obras.map(o => o.instrumento))].length,
    };

    const obrasFiltradas = obras.filter(obra => {
        if (filtro === 'todos') return true;
        return obra.tipo === filtro;
    });

    return (
        <div className="space-y-8">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 opacity-10">
                    <Music size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                            <Award className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-red-100 font-bold tracking-widest text-sm uppercase">ポートフォリオ Portfolio</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4">🎼 Meu Portfolio</h1>
                    <p className="text-red-100 text-lg md:text-xl max-w-3xl leading-relaxed">
                        Suas conquistas musicais e performances registradas.
                    </p>

                    {/* Stats Pills */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                        <div className="px-4 py-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
                            <div className="text-2xl font-black">{stats.obrasCompletas}</div>
                            <div className="text-xs font-bold text-red-100 uppercase">Obras</div>
                        </div>
                        <div className="px-4 py-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
                            <div className="text-2xl font-black">{stats.mediaNotas}</div>
                            <div className="text-xs font-bold text-red-100 uppercase">Média</div>
                        </div>
                        <div className="px-4 py-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
                            <div className="text-2xl font-black">{stats.totalPlays}</div>
                            <div className="text-xs font-bold text-red-100 uppercase">Plays</div>
                        </div>
                        <div className="px-4 py-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
                            <div className="text-2xl font-black">{stats.instrumentos}</div>
                            <div className="text-xs font-bold text-red-100 uppercase">Instrumentos</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filtros */}
            <div className="bg-white rounded-2xl p-2 shadow-lg border-2 border-gray-100">
                <div className="flex gap-2">
                    {(['japonesas', 'todos', 'ocidentais'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFiltro(f)}
                            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
                                filtro === f
                                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg ring-4 ring-red-100'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {f === 'japonesas' && '🎌 Japonesas'}
                            {f === 'todos' && '🌐 Todas'}
                            {f === 'ocidentais' && '🎻 Ocidentais'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid de Obras */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {obrasFiltradas.map((obra, idx) => (
                    <motion.div
                        key={obra.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-gray-100 hover:border-red-200 hover:-translate-y-2 hover:shadow-2xl transition-all group"
                    >
                        {/* Thumbnail */}
                        <div className="relative h-48 bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <div className="text-8xl">{obra.thumbnail}</div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                <motion.button
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1.1 }}
                                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Play className="w-8 h-8 text-red-600 ml-1" fill="currentColor" />
                                </motion.button>
                            </div>
                            {obra.tipo === 'japonesa' && (
                                <span className="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-lg">
                                    🎌 JAPONESA
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-black text-gray-900 mb-2">{obra.titulo}</h3>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm font-bold text-gray-600">{obra.instrumento}</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm font-bold text-gray-600">{obra.duracao}</span>
                            </div>

                            {/* Nota */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < Math.floor(obra.nota / 2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-lg font-black text-gray-900">{obra.nota}</span>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Play className="w-4 h-4" />
                                    <span className="font-bold">{obra.plays} plays</span>
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                    obra.nivel === 'avançado' ? 'bg-red-100 text-red-700' :
                                    obra.nivel === 'intermediário' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                }`}>
                                    {obra.nivel}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                                    <Share2 className="w-4 h-4 inline mr-1" />
                                    Compartilhar
                                </button>
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {obrasFiltradas.length === 0 && (
                <div className="text-center py-20">
                    <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold">Nenhuma obra encontrada nesta categoria</p>
                </div>
            )}
        </div>
    );
}
