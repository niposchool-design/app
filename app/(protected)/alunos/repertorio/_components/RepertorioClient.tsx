'use client';

import { useState, useEffect } from 'react';
import { Music2, Search, Play, FileText, Download, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Musica {
    id: string;
    titulo: string;
    compositor: string;
    categoria: string;
    nivel_dificuldade: string;
    duracao?: number;
    isJaponesa?: boolean;
}

interface RepertorioClientProps {
    initialRepertorio: any[];
}

export default function RepertorioClient({ initialRepertorio }: RepertorioClientProps) {
    const [musicas, setMusicas] = useState<Musica[]>([]);
    const [filtro, setFiltro] = useState<'todas' | 'japonesas' | 'ocidentais'>('japonesas');
    const [busca, setBusca] = useState('');

    useEffect(() => {
        const mappedData = (initialRepertorio || []).map(r => ({
            id: r.id,
            titulo: r.titulo,
            compositor: r.compositor || 'Desconhecido',
            categoria: r.categoria?.nome || 'Geral',
            nivel_dificuldade: r.nivel_dificuldade || 'iniciante',
            duracao: r.duracao,
            isJaponesa: r.categoria?.nome?.toLowerCase().includes('japon') ||
                ['sakura', 'koto', 'shamisen', 'shakuhachi', 'tradicional'].some(j =>
                    r.titulo.toLowerCase().includes(j) ||
                    r.compositor?.toLowerCase().includes(j)
                ),
        }));
        setMusicas(mappedData);
    }, [initialRepertorio]);

    const musicasJaponesas = musicas.filter(m => m.isJaponesa);
    const musicasOcidentais = musicas.filter(m => !m.isJaponesa);

    const musicasFiltradas =
        filtro === 'japonesas' ? musicasJaponesas :
            filtro === 'ocidentais' ? musicasOcidentais :
                musicas;

    const musicasBuscadas = busca.trim()
        ? musicasFiltradas.filter(m =>
            m.titulo.toLowerCase().includes(busca.toLowerCase()) ||
            m.compositor.toLowerCase().includes(busca.toLowerCase())
        )
        : musicasFiltradas;

    const getNivelColor = (nivel: string) => {
        switch (nivel) {
            case 'iniciante': return 'bg-green-100 text-green-700';
            case 'intermediário': return 'bg-yellow-100 text-yellow-700';
            case 'avançado': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
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
                    <Music2 size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-red-100 font-bold tracking-widest text-sm uppercase">レパートリー Repertoire</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4">🎼 Meu Repertório</h1>
                    <p className="text-red-100 text-lg md:text-xl max-w-3xl leading-relaxed">
                        Sua biblioteca pessoal de partituras e músicas tradicionais japonesas.
                        Pratique com disciplina e paixão.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-6">
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                            🎌 {musicasJaponesas.length} Músicas Japonesas
                        </div>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                            🌍 {musicasOcidentais.length} Músicas Ocidentais
                        </div>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                            📚 {musicas.length} Total
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filtros e Busca */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
            >
                {/* Filtros */}
                <div className="flex flex-wrap gap-3 items-center">
                    <span className="text-gray-600 font-bold text-sm">Filtrar por:</span>

                    <button
                        onClick={() => setFiltro('japonesas')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'japonesas'
                                ? 'bg-red-600 text-white shadow-red-200 ring-4 ring-red-100'
                                : 'bg-white text-gray-600 border-2 border-gray-200'
                            }`}
                    >
                        🎌 Japonesas ({musicasJaponesas.length})
                    </button>

                    <button
                        onClick={() => setFiltro('todas')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'todas'
                                ? 'bg-gray-800 text-white shadow-gray-200 ring-4 ring-gray-100'
                                : 'bg-white text-gray-600 border-2 border-gray-200'
                            }`}
                    >
                        📚 Todas ({musicas.length})
                    </button>

                    <button
                        onClick={() => setFiltro('ocidentais')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 ${filtro === 'ocidentais'
                                ? 'bg-blue-600 text-white shadow-blue-200 ring-4 ring-blue-100'
                                : 'bg-white text-gray-600 border-2 border-gray-200'
                            }`}
                    >
                        🎹 Ocidentais ({musicasOcidentais.length})
                    </button>
                </div>

                {/* Busca */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        placeholder="Pesquisar por título ou compositor..."
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-red-100 focus:border-red-500 outline-none shadow-sm transition-all text-gray-900 placeholder-gray-400 font-medium"
                    />
                </div>
            </motion.div>

            {/* Grid de Músicas */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={filtro + busca}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {musicasBuscadas.map((musica, idx) => {
                        const isJaponesa = musica.isJaponesa;

                        return (
                            <motion.div
                                key={musica.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col border-2 hover:-translate-y-2 ${isJaponesa
                                        ? 'border-red-200 hover:border-red-400 hover:shadow-red-100/50'
                                        : 'border-blue-200 hover:border-blue-400 hover:shadow-blue-100/50'
                                    }`}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform ${isJaponesa ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        <Music2 size={24} />
                                    </div>

                                    {isJaponesa && (
                                        <div className="px-2.5 py-1 bg-red-600 text-white rounded-full text-xs font-black">
                                            🎌 JAPONESA
                                        </div>
                                    )}
                                </div>

                                {/* Título e Compositor */}
                                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
                                    {musica.titulo}
                                </h3>
                                <p className="text-gray-500 text-sm mb-3 font-medium">
                                    {musica.compositor}
                                </p>

                                {/* Categoria e Nível */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isJaponesa ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                                        }`}>
                                        {musica.categoria}
                                    </span>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${getNivelColor(musica.nivel_dificuldade)}`}>
                                        {musica.nivel_dificuldade}
                                    </span>
                                </div>

                                {/* Duração */}
                                {musica.duracao && (
                                    <div className="text-xs text-gray-500 mb-4 font-medium">
                                        ⏱️ {Math.floor(musica.duracao / 60)}:{(musica.duracao % 60).toString().padStart(2, '0')} min
                                    </div>
                                )}

                                {/* Ações */}
                                <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                                    <button className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-sm ${isJaponesa
                                            ? 'bg-red-600 text-white hover:bg-red-700'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}>
                                        <Play size={16} />
                                        Praticar
                                    </button>
                                    <button className="p-2.5 border-2 border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
                                        <Download size={16} />
                                    </button>
                                    <button className="p-2.5 border-2 border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
                                        <FileText size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {musicasBuscadas.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200"
                >
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Music2 className="w-10 h-10 text-red-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Nenhuma música encontrada</h3>
                    <p className="text-gray-500 mt-2">Tente ajustar os filtros ou a busca.</p>
                </motion.div>
            )}
        </div>
    );
}
