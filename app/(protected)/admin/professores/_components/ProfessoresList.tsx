'use client';

import { useState } from 'react';
import { Search, Mail, Phone, UserCheck, Eye, Plus, GraduationCap, Music } from 'lucide-react';
import Link from 'next/link';
import { UserProfile } from '@/src/lib/types/users_turmas';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfessoresListProps {
    professores: UserProfile[];
}

export function ProfessoresList({ professores }: ProfessoresListProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProfs = professores.filter(prof => {
        const matchesSearch = (prof.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (prof.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

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
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <div className="space-y-8">
            {/* Toolbar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-2 rounded-2xl border border-gray-100 shadow-sm items-center"
            >
                <div className="relative flex-1 w-full sm:max-w-md ml-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar professor por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    />
                </div>
                <div className="p-1">
                    <Link
                        href="/admin/professores/novo"
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-blue-200 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Novo Professor
                    </Link>
                </div>
            </motion.div>

            {/* Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                <AnimatePresence>
                    {filteredProfs.length > 0 ? (
                        filteredProfs.map((prof) => (
                            <motion.div
                                key={prof.id}
                                variants={item}
                                layout
                                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="h-28 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Music size={80} className="transform rotate-12" />
                                    </div>
                                </div>

                                <div className="px-6 relative">
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-white flex items-center justify-center text-2xl font-bold text-blue-600">
                                            {prof.avatar_url ? (
                                                <img src={prof.avatar_url} alt={prof.full_name} className="w-full h-full object-cover" />
                                            ) : (
                                                prof.full_name?.charAt(0) || 'P'
                                            )}
                                        </div>
                                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>

                                    <div className="pt-14 pb-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors line-clamp-1">
                                            {prof.full_name || 'Nome não definido'}
                                        </h3>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6 border border-blue-100">
                                            <GraduationCap size={14} />
                                            Professor
                                        </div>

                                        <div className="space-y-3 text-sm text-gray-600 text-left">
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-transparent group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-colors">
                                                <div className="p-2 bg-white rounded-lg text-blue-500 shadow-sm">
                                                    <Mail className="w-4 h-4" />
                                                </div>
                                                <span className="truncate flex-1 font-medium text-gray-700">{prof.email}</span>
                                            </div>
                                            {prof.telefone && (
                                                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-transparent group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-colors">
                                                    <div className="p-2 bg-white rounded-lg text-blue-500 shadow-sm">
                                                        <Phone className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium text-gray-700">{prof.telefone}</span>
                                                </div>
                                            )}
                                        </div>

                                        <Link
                                            href={`/admin/professores/${prof.id}`}
                                            className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-gray-200 hover:shadow-blue-200 group-hover:translate-y-1"
                                        >
                                            Ver Perfil
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full py-20 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserCheck className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="font-bold text-gray-900 text-lg">Nenhum professor encontrado.</p>
                            <p className="text-sm">Tente ajustar seus termos de busca.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div className="px-4 py-3 bg-white/50 backdrop-blur rounded-xl border border-gray-100 flex justify-between items-center text-sm font-medium text-gray-500">
                <span>Total de <span className="text-gray-900 font-bold">{professores.length}</span> professores</span>
            </div>
        </div>
    );
}
