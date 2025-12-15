'use client';

import { useState } from 'react';
import { UserProfile, Turma } from '@/src/lib/types/users_turmas';
import { ChevronLeft, Mail, Phone, Calendar, BookOpen, GraduationCap, Edit2, Save, Camera, MapPin, Users, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { updateProfile } from '@/src/lib/supabase/mutations/profiles';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface ProfessorDetalhesProps {
    professor: UserProfile;
    turmas: Turma[];
}

export function ProfessorDetalhes({ professor, turmas }: ProfessorDetalhesProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: professor.full_name || '',
        email: professor.email || '',
        telefone: professor.telefone || '',
    });

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateProfile(professor.id, formData);
            setIsEditing(false);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar (Verifique permissões).');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header / Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 lg:p-12 text-white overflow-hidden shadow-xl"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <GraduationCap size={300} className="transform -rotate-12 translate-x-10 -translate-y-10" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Avatar */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center text-5xl font-bold">
                            {professor.avatar_url ? (
                                <img src={professor.avatar_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <span>{professor.full_name?.charAt(0)}</span>
                            )}
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-2 right-2 bg-white text-blue-900 p-2.5 rounded-full shadow-lg hover:bg-blue-50 transition-colors">
                                <Camera size={20} />
                            </button>
                        )}
                    </motion.div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                            {isEditing ? (
                                <input
                                    value={formData.full_name}
                                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-3xl font-bold w-full max-w-lg outline-none focus:bg-white/20 focus:border-white/40 transition-all placeholder-white/40 text-center md:text-left"
                                    placeholder="Nome Completo"
                                />
                            ) : (
                                <h1 className="text-3xl md:text-4xl font-bold">{professor.full_name}</h1>
                            )}

                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm"
                                    title="Editar Perfil"
                                >
                                    <Edit2 size={18} />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3 text-blue-100 text-sm font-medium">
                            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full border border-white/5">
                                <Mail size={16} className="text-blue-300" />
                                {professor.email}
                            </div>
                            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full border border-white/5">
                                <Phone size={16} className="text-blue-300" />
                                {isEditing ? (
                                    <input
                                        value={formData.telefone}
                                        onChange={e => setFormData({ ...formData, telefone: e.target.value })}
                                        className="bg-transparent border-b border-white/30 w-32 outline-none focus:border-white"
                                        placeholder="+55 11..."
                                    />
                                ) : (
                                    professor.telefone || 'Sem telefone'
                                )}
                            </div>
                        </div>

                        <div className="pt-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-blue-500/20 text-blue-200 px-4 py-1.5 rounded-full border border-blue-400/30">
                                <GraduationCap size={14} />
                                Corpo Docente
                            </span>
                        </div>

                        {isEditing && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="pt-6 flex gap-3 justify-center md:justify-start"
                            >
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="bg-white text-blue-900 px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Save size={18} />
                                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2.5 rounded-xl font-bold text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                                >
                                    Cancelar
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Turmas Ministradas */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
            >
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        Turmas Ministradas
                        <span className="text-sm font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{turmas.length}</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {turmas.length > 0 ? (
                        turmas.map((turma, index) => (
                            <motion.div
                                key={turma.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Link
                                    href={`/admin/turmas/${turma.id}`}
                                    className="block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group h-full flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <BookOpen className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                            </div>
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${turma.ativo ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-50 text-gray-500 border border-gray-100'
                                                }`}>
                                                {turma.ativo ? 'Ativa' : 'Inativa'}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{turma.nome}</h3>

                                        <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg mb-4">
                                            <Calendar size={14} className="text-blue-400" />
                                            {turma.horario_padrao || 'Horário a definir'}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                                            <Users size={16} className="text-blue-300" />
                                            <span>{turma.qtd_alunos || 0} alunos</span>
                                        </div>
                                        <span className="text-blue-600 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 flex items-center gap-1">
                                            Ver Detalhes <ArrowRight size={12} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center text-gray-400">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="font-bold text-gray-900">Nenhuma turma atribuída</p>
                            <p className="text-sm mt-1">Este professor ainda não tem turmas registradas.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
