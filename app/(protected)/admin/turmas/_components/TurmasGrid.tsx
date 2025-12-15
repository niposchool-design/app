'use client';

import { useState } from 'react';
import { School, Users, Clock, Plus, Search, MoreVertical, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Turma {
    id: string;
    nome: string;
    descricao?: string;
    horario_padrao?: string;
    ativo?: boolean;
    qtd_alunos?: number; // Fetched via count
    professor_id?: string;
    // Add other fields as needed from your Types
}

interface TurmasGridProps {
    turmas: Turma[];
}

export default function TurmasGrid({ turmas }: TurmasGridProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTurmas = turmas.filter(turma =>
        (turma.nome?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-8">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative flex-1 w-full sm:max-w-md ml-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar turma..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all outline-none"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto p-1">
                    <Link
                        href="/admin/turmas/nova"
                        className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-purple-200 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Nova Turma
                    </Link>
                </div>
            </div>

            {/* Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence>
                    {filteredTurmas.length > 0 ? (
                        filteredTurmas.map(turma => (
                            <motion.div
                                key={turma.id}
                                variants={item}
                                layout
                                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-100 transition-all duration-300 group relative overflow-hidden"
                            >
                                {/* Decorative Gradient */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 pointer-events-none"></div>

                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3.5 bg-orange-50 rounded-2xl group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                                        <School className="w-6 h-6 text-orange-600 group-hover:text-white" />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${turma.ativo ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}>
                                            {turma.ativo ? 'Ativa' : 'Inativa'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-purple-700 transition-colors line-clamp-1">{turma.nome}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2">{turma.descricao || 'Sem descrição definida.'}</p>
                                </div>

                                <div className="flex flex-col gap-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium bg-gray-50 p-2 rounded-lg">
                                        <Clock className="w-4 h-4 text-purple-400" />
                                        <span>{turma.horario_padrao || 'A definir'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium bg-gray-50 p-2 rounded-lg">
                                        <Users className="w-4 h-4 text-blue-400" />
                                        <span>{turma.qtd_alunos || 0} alunos matriculados</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Detalhes
                                    </span>
                                    <Link
                                        href={`/admin/turmas/${turma.id}`}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-50 text-purple-700 text-sm font-bold hover:bg-purple-100 transition-colors"
                                    >
                                        Gerenciar
                                        <MoreVertical className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full py-16 text-center text-gray-400 bg-white rounded-3xl border-2 border-dashed border-gray-100"
                        >
                            <School className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p className="font-medium">Nenhuma turma encontrada.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
