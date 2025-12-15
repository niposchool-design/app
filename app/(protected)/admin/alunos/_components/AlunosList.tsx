'use client';

import { useState } from 'react';
import { Search, Filter, MoreHorizontal, GraduationCap, Eye, Edit, Mail, Award, Calendar, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { UserProfile } from '@/src/lib/types/users_turmas';
import { motion, AnimatePresence } from 'framer-motion';

interface AlunosListProps {
    alunos: UserProfile[];
}

export function AlunosList({ alunos }: AlunosListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterNivel, setFilterNivel] = useState('todos');

    const filteredAlunos = alunos.filter(aluno => {
        const matchesSearch = (aluno.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (aluno.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());

        // Simulação de filtro de nível (assumindo que nivel_atual existe ou vamos mockar se for null)
        const nivel = (aluno as any).nivel_atual || 'iniciante';
        const matchesFilter = filterNivel === 'todos' || nivel.toLowerCase() === filterNivel.toLowerCase();

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
                        placeholder="Buscar aluno por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="admin-input pl-10"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" strokeWidth={2} />
                        <select
                            value={filterNivel}
                            onChange={(e) => setFilterNivel(e.target.value)}
                            className="pl-10 pr-8 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 cursor-pointer appearance-none hover:bg-slate-50 transition-colors"
                        >
                            <option value="todos">Todos os Níveis</option>
                            <option value="iniciante">Iniciante</option>
                            <option value="intermediário">Intermediário</option>
                            <option value="avançado">Avançado</option>
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
                                <th>Aluno</th>
                                <th>Contato</th>
                                <th>Nível</th>
                                <th>Matrícula</th>
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
                                {filteredAlunos.length > 0 ? (
                                    filteredAlunos.map((aluno: any) => (
                                        <motion.tr
                                            key={aluno.id}
                                            variants={item}
                                            layout
                                            className="hover:bg-purple-50/20 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center text-purple-700 font-semibold text-sm shadow-sm">
                                                        {aluno.avatar_url ? (
                                                            <img src={aluno.avatar_url} alt="" className="w-full h-full object-cover rounded-full" />
                                                        ) : (
                                                            aluno.full_name?.charAt(0) || 'A'
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">{aluno.full_name}</div>
                                                        <div className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                                                            <Calendar className="w-3 h-3" strokeWidth={2} />
                                                            {new Date(aluno.created_at || Date.now()).toLocaleDateString('pt-BR')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-600 group-hover:text-slate-900 transition-colors text-sm">
                                                    <Mail className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                                                    {aluno.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`inline-flex items-center w-fit px-2.5 py-1 rounded-lg text-xs font-semibold ${(aluno.nivel_atual || 'iniciante') === 'avançado' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                                        (aluno.nivel_atual || 'iniciante') === 'intermediário' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                                            'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        }`}>
                                                        <Award className="w-3 h-3 mr-1" strokeWidth={2} />
                                                        {(aluno.nivel_atual || 'Iniciante').charAt(0).toUpperCase() + (aluno.nivel_atual || 'iniciante').slice(1)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs text-slate-500 font-semibold tracking-wider">
                                                #{aluno.matricula || '---'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                                                    <Link
                                                        href={`/admin/alunos/${aluno.id}`}
                                                        className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                        title="Ver Detalhes"
                                                    >
                                                        <Eye className="w-4 h-4" strokeWidth={2} />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/alunos/${aluno.id}`}
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
                                                    <p className="font-semibold text-slate-900 text-base">Nenhum aluno encontrado</p>
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
                    <span>Exibindo <span className="text-slate-900 font-semibold">{filteredAlunos.length}</span> de {alunos.length} alunos</span>
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
