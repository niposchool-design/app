'use client';

import { useState, useEffect } from 'react';
import { PlayCircle, Clock, Video, Sparkles, Search, Filter, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoItem {
    id: string;
    titulo: string;
    descricao: string;
    thumbnail_url?: string;
    video_url: string;
    duracao?: number;
    categoria: string;
    isJapones?: boolean;
}

export default function VideosPage() {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [filtro, setFiltro] = useState<'todos' | 'japoneses' | 'teoria'>('japoneses');

    useEffect(() => {
        // Mock data - substituir por API real
        const videosData = [
            {
                id: '1',
                titulo: 'Como Tocar Koto - Fundamentos',
                descricao: 'Aprenda as t\u00e9cnicas b\u00e1sicas do koto tradicional japon\u00eas',
                thumbnail_url: 'https://placehold.co/640x360/ef4444/ffffff?text=Koto',
                video_url: '#',
                duracao: 840,
                categoria: 'Koto',
                isJapones: true,
            },
            {
                id: '2',
                titulo: 'Shamisen - Postura e Bachi',
                descricao: 'Dom\u00ednio do instrumento de 3 cordas',
                thumbnail_url: 'https://placehold.co/640x360/f97316/ffffff?text=Shamisen',
                video_url: '#',
                duracao: 600,
                categoria: 'Shamisen',
                isJapones: true,
            },
            {
                id: '3',
                titulo: 'Shakuhachi - Respira\u00e7\u00e3o Zen',
                descricao: 'A arte da flauta de bambu e medita\u00e7\u00e3o',
                thumbnail_url: 'https://placehold.co/640x360/fb923c/ffffff?text=Shakuhachi',
                video_url: '#',
                duracao: 720,
                categoria: 'Shakuhachi',
                isJapones: true,
            },
            {
                id: '4',
                titulo: 'Sakura Sakura - Tutorial Completo',
                descricao: 'Aprenda a can\u00e7\u00e3o mais ic\u00f4nica do Jap\u00e3o',
                thumbnail_url: 'https://placehold.co/640x360/ec4899/ffffff?text=Sakura',
                video_url: '#',
                duracao: 960,
                categoria: 'Repert\u00f3rio',
                isJapones: true,
            },
            {
                id: '5',
                titulo: 'Teoria Musical - Escalas Ocidentais',
                descricao: 'Fundamentos da teoria musical cl\u00e1ssica',
                thumbnail_url: 'https://placehold.co/640x360/3b82f6/ffffff?text=Teoria',
                video_url: '#',
                duracao: 480,
                categoria: 'Teoria',
                isJapones: false,
            },
            {
                id: '6',
                titulo: 'Piano B\u00e1sico - Primeiros Acordes',
                descricao: 'Introdu\u00e7\u00e3o ao piano para iniciantes',
                thumbnail_url: 'https://placehold.co/640x360/06b6d4/ffffff?text=Piano',
                video_url: '#',
                duracao: 540,
                categoria: 'Piano',
                isJapones: false,
            },
        ];
        
        setVideos(videosData);
    }, []);

    const videosJaponeses = videos.filter(v => v.isJapones);
    const videosTeoria = videos.filter(v => !v.isJapones);

    const videosFiltrados =
        filtro === 'japoneses' ? videosJaponeses :
        filtro === 'teoria' ? videosTeoria :
        videos;

    const formatDuration = (seconds?: number) => {
        if (!seconds) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-8">
            {/* Hero Japon\u00eas */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 opacity-10">
                    <Video size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-red-100 font-bold tracking-widest text-sm uppercase">\u52d5\u753b Video</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4">\ud83c\udfac V\u00eddeos e Tutoriais</h1>
                    <p className="text-red-100 text-lg md:text-xl max-w-3xl leading-relaxed">
                        Aprenda com v\u00eddeos exclusivos dos mestres. T\u00e9cnicas tradicionais japonesas e muito mais.
                    </p>
                    
                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                            \ud83c\udf8c {videosJaponeses.length} V\u00eddeos Japoneses
                        </div>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                            \ud83c\udfb9 {videosTeoria.length} Teoria & T\u00e9cnica
                        </div>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                            \ud83c\udfa5 {videos.length} V\u00eddeos Totais
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
                <span className="text-gray-600 font-bold text-sm flex items-center gap-2">
                    <Filter size={16} />
                    Filtrar por:
                </span>
                
                <button
                    onClick={() => setFiltro('japoneses')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${
                        filtro === 'japoneses'
                            ? 'bg-red-600 text-white shadow-red-200 ring-4 ring-red-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200'
                    }`}
                >
                    \ud83c\udf8c Japoneses ({videosJaponeses.length})
                </button>
                
                <button
                    onClick={() => setFiltro('todos')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${
                        filtro === 'todos'
                            ? 'bg-gray-800 text-white shadow-gray-200 ring-4 ring-gray-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200'
                    }`}
                >
                    \ud83c\udfac Todos ({videos.length})
                </button>
                
                <button
                    onClick={() => setFiltro('teoria')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${
                        filtro === 'teoria'
                            ? 'bg-blue-600 text-white shadow-blue-200 ring-4 ring-blue-100'
                            : 'bg-white text-gray-600 border-2 border-gray-200'
                    }`}
                >
                    \ud83c\udfb9 Teoria ({videosTeoria.length})
                </button>
            </motion.div>

            {/* Grid de V\u00eddeos */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={filtro}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {videosFiltrados.map((video, idx) => {
                        const isJapones = video.isJapones;
                        
                        return (
                            <motion.a
                                key={video.id}
                                href={video.video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                                    isJapones 
                                        ? 'border-red-200 hover:border-red-400 hover:shadow-red-100/50' 
                                        : 'border-blue-200 hover:border-blue-400 hover:shadow-blue-100/50'
                                }`}
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                                    {video.thumbnail_url ? (
                                        <img
                                            src={video.thumbnail_url}
                                            alt={video.titulo}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <PlayCircle size={64} className="text-white/30" />
                                        </div>
                                    )}
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                                    
                                    {/* Badge Japon\u00eas */}
                                    {isJapones && (
                                        <div className="absolute top-3 left-3 px-3 py-1.5 bg-red-600 text-white rounded-full text-xs font-black shadow-lg">
                                            \ud83c\udf8c JAPON\u00caS
                                        </div>
                                    )}
                                    
                                    {/* Dura\u00e7\u00e3o */}
                                    {video.duracao && (
                                        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5">
                                            <Clock size={12} />
                                            {formatDuration(video.duracao)}
                                        </div>
                                    )}
                                    
                                    {/* Play Button Hover */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className={`w-16 h-16 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform ${
                                            isJapones ? 'bg-red-600/90' : 'bg-blue-600/90'
                                        }`}>
                                            <PlayCircle size={32} className="text-white ml-1" fill="white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Conte\u00fado */}
                                <div className="p-6">
                                    <div className="mb-2">
                                        <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                                            isJapones ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                            {video.categoria}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-red-600 transition-colors">
                                        {video.titulo}
                                    </h3>
                                    
                                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                                        {video.descricao}
                                    </p>
                                </div>
                            </motion.a>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {videosFiltrados.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200"
                >
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Video className="w-10 h-10 text-red-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Nenhum v\u00eddeo encontrado</h3>
                    <p className="text-gray-500 mt-2">Tente outro filtro ou aguarde novos conte\u00fados.</p>
                </motion.div>
            )}
        </div>
    );
}
