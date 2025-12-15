'use client';

import { useState } from 'react';
import { Search, Music2, FileText, Mic2, Video, Plus, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
// Using any for props to avoid import issues for now, matching the flexibility of the previous pages
// Ideally this should import { Repertorio } from '@/lib/types/repertorio';

interface RepertorioListProps {
    repertorio: any[];
}

export function RepertorioList({ repertorio }: RepertorioListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterFase, setFilterFase] = useState('todos');

    const filteredRepertorio = repertorio.filter(musica => {
        const matchesSearch = (musica.titulo?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (musica.compositor?.toLowerCase() || '').includes(searchTerm.toLowerCase());

        // Mocking 'nivel' filter logic if needed, or category based on ID
        return matchesSearch;
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-center"
            >
                <div className="relative flex-1 w-full sm:max-w-xl group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar por título, compositor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    />
                </div>

                <Link
                    href="/admin/repertorio/nova"
                    className="flex-none justify-center inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-purple-200 active:scale-95 whitespace-nowrap"
                >
                    <Plus className="w-5 h-5" />
                    Nova Música
                </Link>
            </motion.div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50/50 text-gray-900 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Título / Compositor</th>
                                <th className="px-6 py-4">Categoria</th>
                                <th className="px-6 py-4">Nível</th>
                                <th className="px-6 py-4 text-center">Recursos</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="divide-y divide-gray-100"
                        >
                            <AnimatePresence>
                                {filteredRepertorio.length > 0 ? (
                                    filteredRepertorio.map((musica) => (
                                        <motion.tr
                                            key={musica.id}
                                            variants={item}
                                            layout
                                            className="hover:bg-purple-50/30 transition-colors group cursor-pointer"
                                        >
                                            <td className="px-6 py-4">
                                                <Link href={`/admin/repertorio/${musica.id}`} className="block">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors shadow-sm">
                                                            <Music2 size={20} />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors text-base">{musica.titulo}</div>
                                                            <div className="text-xs text-gray-500 font-medium">{musica.compositor || 'Desconhecido'}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600 border border-gray-200"
                                                    style={musica.categoria?.cor_tema ? {
                                                        backgroundColor: `${musica.categoria.cor_tema}15`,
                                                        color: musica.categoria.cor_tema,
                                                        borderColor: `${musica.categoria.cor_tema}30`
                                                    } : {}}
                                                >
                                                    {musica.categoria?.nome || 'Geral'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`capitalize font-medium ${(musica.nivel_dificuldade === 'avançado') ? 'text-red-600' :
                                                        (musica.nivel_dificuldade === 'intermediário') ? 'text-orange-600' :
                                                            'text-green-600'
                                                    }`}>
                                                    {musica.nivel_dificuldade || '-'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    {musica.partitura_url && <div title="Partitura" className="p-1.5 rounded-lg bg-blue-50 text-blue-600"><FileText className="w-4 h-4" /></div>}
                                                    {musica.letra_url && <div title="Letra" className="p-1.5 rounded-lg bg-yellow-50 text-yellow-600"><FileText className="w-4 h-4" /></div>}
                                                    {musica.playback_url && <div title="Playback" className="p-1.5 rounded-lg bg-pink-50 text-pink-600"><Mic2 className="w-4 h-4" /></div>}
                                                    {musica.video_tutorial_url && <div title="Vídeo" className="p-1.5 rounded-lg bg-red-50 text-red-600"><Video className="w-4 h-4" /></div>}

                                                    {(!musica.partitura_url && !musica.letra_url && !musica.playback_url && !musica.video_tutorial_url) &&
                                                        <span className="text-xs text-gray-300 font-medium italic">Sem recursos</span>
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {musica.ativo ? (
                                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                                        <CheckCircle className="w-3 h-3" /> Ativo
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                                                        <XCircle className="w-3 h-3" /> Inativo
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/admin/repertorio/${musica.id}`} className="text-gray-400 hover:text-purple-600 transition-colors inline-block p-2 hover:bg-purple-50 rounded-full">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Link>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center text-gray-500">
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                            >
                                                <Music2 className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                                <p className="font-medium text-lg text-gray-900">Nenhuma música encontrada</p>
                                                <p className="text-sm">Explore o acervo ou adicione uma nova obra.</p>
                                            </motion.div>
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </motion.tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 text-xs text-gray-500 flex justify-between items-center font-medium">
                    <span>Total de <span className="text-gray-900 font-bold">{repertorio.length}</span> músicas</span>
                </div>
            </div>
        </div>
    );
}
