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
        <div className="space-y-6">
            {/* Toolbar - Executivo */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-4 justify-between admin-card p-4"
            >
                <div className="relative flex-1 group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-purple-600 transition-colors" strokeWidth={2} />
                    <input
                        type="text"
                        placeholder="Buscar turma por nome..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="admin-input pl-10"
                    />
                </div>
            </motion.div>

            {/* Grid Executivo de Turmas */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
                <AnimatePresence>
                    {filteredTurmas.length > 0 ? (
                        filteredTurmas.map(turma => (
                            <motion.div
                                key={turma.id}
                                variants={item}
                                layout
                                className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-purple-200 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Gradiente decorativo sutil */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-5">
                                        <div className="p-2.5 bg-violet-50 rounded-lg group-hover:bg-violet-100 transition-all">
                                            <School className="w-5 h-5 text-violet-600" strokeWidth={2} />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${turma.ativo ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
                                                {turma.ativo ? 'Ativa' : 'Inativa'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-purple-700 transition-colors line-clamp-1">{turma.nome}</h3>
                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{turma.descricao || 'Sem descrição definida.'}</p>
                                    </div>

                                    <div className="space-y-2.5 mb-5">
                                        <div className="flex items-center gap-2.5 text-sm text-slate-600 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                            <Clock className="w-4 h-4 text-purple-400" strokeWidth={2} />
                                            <span className="text-xs">{turma.horario_padrao || 'Horário a definir'}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-sm text-slate-600 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                            <Users className="w-4 h-4 text-blue-400" strokeWidth={2} />
                                            <span className="text-xs">{turma.qtd_alunos || 0} alunos matriculados</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100">
                                        <Link
                                            href={`/admin/turmas/${turma.id}`}
                                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-purple-600 transition-all shadow-sm"
                                        >
                                            Gerenciar Turma
                                            <MoreVertical className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full"
                        >
                            <div className="admin-card py-16 text-center">
                                <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <School className="w-7 h-7 text-slate-300" strokeWidth={1.5} />
                                </div>
                                <p className="font-semibold text-slate-900 text-base">Nenhuma turma encontrada</p>
                                <p className="text-sm text-slate-500 mt-1">Tente ajustar os filtros de busca</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
