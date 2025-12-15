'use client';

import { useState } from 'react';
import { Search, Filter, Mail, Phone, UserCheck, Eye, ChevronRight, Calendar, Shield, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { UserProfile } from '@/src/lib/types/users_turmas';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfessoresListProps {
    professores: UserProfile[];
}

export function ProfessoresList({ professores }: ProfessoresListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('todos');

    const filteredProfs = professores.filter(prof => {
        const matchesSearch = (prof.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (prof.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());

        // Filtro de status (pode ser expandido com dados reais)
        const matchesFilter = filterStatus === 'todos' || filterStatus === 'ativo';

        return matchesSearch && matchesFilter;
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
        hidden: { opacity: 0, y: 10 },
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
                        placeholder="Buscar professor por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="admin-input pl-10"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" strokeWidth={2} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-10 pr-8 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 cursor-pointer appearance-none hover:bg-slate-50 transition-colors"
                        >
                            <option value="todos">Todos os Status</option>
                            <option value="ativo">Ativos</option>
                            <option value="inativo">Inativos</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Tabela Executiva */}
            <div className="admin-card overflow-hidden p-0">
                <div className="overflow-x-auto admin-scrollbar">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Professor</th>
                                <th>Contato</th>
                                <th>Telefone</th>
                                <th>Cadastro</th>
                                <th className="text-right">Ações</th>
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="divide-y divide-gray-100"
                        >
                            <AnimatePresence>
                                {filteredProfs.length > 0 ? (
                                    filteredProfs.map((prof: any) => (
                                        <motion.tr
                                            key={prof.id}
                                            variants={item}
                                            layout
                                            className="hover:bg-purple-50/20 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center text-indigo-700 font-semibold text-sm shadow-sm border border-indigo-100">
                                                        {prof.avatar_url ? (
                                                            <img src={prof.avatar_url} alt="" className="w-full h-full object-cover rounded-full" />
                                                        ) : (
                                                            prof.full_name?.charAt(0) || 'P'
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors flex items-center gap-2">
                                                            {prof.full_name}
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                                                                <Shield className="w-3 h-3" strokeWidth={2} />
                                                                Professor
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-slate-400 flex items-center gap-1 font-medium mt-0.5">
                                                            <BookOpen className="w-3 h-3" strokeWidth={2} />
                                                            Corpo Docente
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-600 group-hover:text-slate-900 transition-colors text-sm">
                                                    <Mail className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                                                    {prof.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                    {prof.telefone ? (
                                                        <>
                                                            <Phone className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                                                            {prof.telefone}
                                                        </>
                                                    ) : (
                                                        <span className="text-slate-400 text-xs">Não informado</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                                                    <Calendar className="w-3 h-3" strokeWidth={2} />
                                                    {new Date(prof.created_at || Date.now()).toLocaleDateString('pt-BR')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                                                    <Link
                                                        href={`/admin/professores/${prof.id}`}
                                                        className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                        title="Ver Detalhes"
                                                    >
                                                        <Eye className="w-4 h-4" strokeWidth={2} />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/professores/${prof.id}`}
                                                        className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                        title="Abrir"
                                                    >
                                                        <ChevronRight className="w-4 h-4" strokeWidth={2} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center">
                                            <motion.div
                                                initial={{ scale: 0.95, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="flex flex-col items-center justify-center gap-3"
                                            >
                                                <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center">
                                                    <Search className="w-7 h-7 text-slate-300" strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 text-base">Nenhum professor encontrado</p>
                                                    <p className="text-sm text-slate-500 mt-1">Tente ajustar os filtros de busca</p>
                                                </div>
                                            </motion.div>
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </motion.tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 text-xs text-slate-500 flex justify-between items-center font-medium">
                    <span>Exibindo <span className="text-slate-900 font-semibold">{filteredProfs.length}</span> de {professores.length} professores</span>
                    {/* Pagination placeholder */}
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium" disabled>Anterior</button>
                        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium" disabled>Próxima</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
