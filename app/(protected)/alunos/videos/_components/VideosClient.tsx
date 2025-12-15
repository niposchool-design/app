'use client';

import { useState } from 'react';
import { PlayCircle, Clock, Video, Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoType {
    id: string;
    titulo: string;
    descricao?: string;
    thumbnail_url?: string;
    video_url: string;
    duracao?: number;
    categoria: string;
    isJapones: boolean;
}

export default function VideosClient({ videos }: { videos: VideoType[] }) {
    const [filtro, setFiltro] = useState<'japoneses' | 'ocidentais' | 'todos'>('japoneses');
    const [busca, setBusca] = useState('');

    const videosJaponeses = videos.filter(v => v.isJapones);
    const videosOcidentais = videos.filter(v => !v.isJapones);

    const videosFiltrados = videos.filter(v => {
        const matchFiltro =
            filtro === 'japoneses' ? v.isJapones :
                filtro === 'ocidentais' ? !v.isJapones :
                    true;

        const matchBusca = busca === '' || v.titulo.toLowerCase().includes(busca.toLowerCase());

        return matchFiltro && matchBusca;
    });

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                            <Video className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-red-100 font-bold tracking-widest text-sm uppercase">📹 Videos</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4">🎬 Biblioteca de Vídeos</h1>
                    <p className="text-red-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                        Aprenda assistindo demonstrações e tutoriais de mestres da música japonesa.
                    </p>

                    <div className="flex gap-4 mt-6">
                        <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                            <div className="text-3xl font-black">🎌 {videosJaponeses.length}</div>
                            <div className="text-xs text-red-100 uppercase tracking-wider font-bold mt-1">Japoneses</div>
                        </div>
                        <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                            <div className="text-3xl font-black">🌍 {videosOcidentais.length}</div>
                            <div className="text-xs text-red-100 uppercase tracking-wider font-bold mt-1">Ocidentais</div>
                        </div>
                        <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                            <div className="text-3xl font-black">{videos.length}</div>
                            <div className="text-xs text-red-100 uppercase tracking-wider font-bold mt-1">Total</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2">
                    {[
                        { key: 'japoneses', label: '🎌 Japoneses', count: videosJaponeses.length },
                        { key: 'ocidentais', label: '🌍 Ocidentais', count: videosOcidentais.length },
                        { key: 'todos', label: '📚 Todos', count: videos.length },
                    ].map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFiltro(f.key as any)}
                            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${filtro === f.key
                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                                }`}
                        >
                            {f.label} ({f.count})
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar vídeos..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-full focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Grid de Vídeos */}
            <AnimatePresence mode="wait">
                {videosFiltrados.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">📹</div>
                        <p className="text-gray-500 text-lg font-medium">Nenhum vídeo encontrado</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {videosFiltrados.map((video, index) => (
                            <motion.a
                                key={video.id}
                                href={video.video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-red-300"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video bg-gradient-to-br from-red-100 to-pink-100 overflow-hidden">
                                    <img
                                        src={video.thumbnail_url}
                                        alt={video.titulo}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
                                    </div>

                                    {video.duracao && video.duracao > 0 && (
                                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {formatDuration(video.duracao)}
                                        </div>
                                    )}

                                    {video.isJapones && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                            🎌 Japonês
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <h3 className="font-black text-lg mb-2 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                                        {video.titulo}
                                    </h3>
                                    {video.descricao && (
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.descricao}</p>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                                            {video.categoria}
                                        </span>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
