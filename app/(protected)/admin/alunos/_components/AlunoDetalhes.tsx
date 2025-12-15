'use client';

import { useState } from 'react';
import { UserProfile, Turma, Matricula } from '@/lib/types/users_turmas';
import { ChevronLeft, Mail, QrCode, Calendar, BookOpen, GraduationCap, Award, Save, Edit2, Camera } from 'lucide-react';
import Link from 'next/link';
import { atualizarAluno } from '@/src/lib/supabase/mutations/alunos';
import { useRouter } from 'next/navigation';

interface AlunoDetalhesProps {
    aluno: UserProfile;
    matriculas: any[]; // Tipar melhor se possível
}

export function AlunoDetalhes({ aluno, matriculas }: AlunoDetalhesProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: aluno.full_name || '',
        email: aluno.email || '',
        matricula: aluno.matricula || '',
        nivel_atual: aluno.nivel_atual || 'iniciante'
    });

    const handleSave = async () => {
        setLoading(true);
        try {
            await atualizarAluno(aluno.id, formData);
            setIsEditing(false);
            router.refresh(); // Recarrega os dados do servidor
            alert('Perfil atualizado!');
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header / Hero */}
            <div className="relative bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <GraduationCap size={200} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Avatar */}
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full border-4 border-white/30 shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center text-4xl font-bold">
                            {aluno.avatar_url ? (
                                <img src={aluno.avatar_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <span>{aluno.full_name?.charAt(0)}</span>
                            )}
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-0 right-0 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                                <Camera size={18} />
                            </button>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            {isEditing ? (
                                <input
                                    value={formData.full_name}
                                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                                    className="bg-white/20 border border-white/30 rounded px-3 py-1 text-2xl font-bold w-full max-w-md outline-none focus:bg-white/30 placeholder-white/50"
                                    placeholder="Nome Completo"
                                />
                            ) : (
                                <h1 className="text-3xl font-bold">{aluno.full_name}</h1>
                            )}
                            {!isEditing && (
                                <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Editar Perfil">
                                    <Edit2 size={18} />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/80 text-sm">
                            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                                <Mail size={14} />
                                {aluno.email}
                            </span>
                            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full font-mono">
                                <QrCode size={14} />
                                MAT: {isEditing ? (
                                    <input
                                        value={formData.matricula}
                                        onChange={e => setFormData({ ...formData, matricula: e.target.value })}
                                        className="bg-transparent border-b border-white/30 w-24 outline-none"
                                    />
                                ) : (
                                    aluno.matricula || '---'
                                )}
                            </span>
                        </div>

                        <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-3">
                            <div className="bg-black/20 backdrop-blur-md rounded-xl px-4 py-2 flex flex-col items-center min-w-[100px]">
                                <span className="text-xs uppercase tracking-wider opacity-70">Nível</span>
                                {isEditing ? (
                                    <select
                                        value={formData.nivel_atual}
                                        onChange={e => setFormData({ ...formData, nivel_atual: e.target.value })}
                                        className="bg-transparent font-bold text-lg text-center outline-none border-b border-white/30"
                                    >
                                        <option value="iniciante" className="text-black">Iniciante</option>
                                        <option value="intermediário" className="text-black">Intermediário</option>
                                        <option value="avançado" className="text-black">Avançado</option>
                                    </select>
                                ) : (
                                    <span className="font-bold text-lg capitalize">{aluno.nivel_atual || 'Iniciante'}</span>
                                )}
                            </div>
                            <div className="bg-black/20 backdrop-blur-md rounded-xl px-4 py-2 flex flex-col items-center min-w-[100px]">
                                <span className="text-xs uppercase tracking-wider opacity-70">XP Total</span>
                                <span className="font-bold text-lg flex items-center gap-1">
                                    <Award size={16} className="text-yellow-400" />
                                    {aluno.xp_total || 0}
                                </span>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="pt-4 flex gap-3 justify-center md:justify-start">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Save size={18} />
                                    Salvar Alterações
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Esquerda: Turmas */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <BookOpen className="text-red-500" />
                            Turmas Matriculadas
                        </h2>
                        {/* <Link href="/admin/turmas/nova" className="text-sm text-red-600 font-medium hover:underline">
                            + Matricular
                        </Link> */}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {matriculas.length > 0 ? (
                            matriculas.map(m => (
                                <Link
                                    href={`/admin/turmas/${m.turma_id}`}
                                    key={m.id}
                                    className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                                            <BookOpen className="w-5 h-5 text-red-600" />
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${m.status === 'ativa' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {m.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{m.turma?.nome || 'Turma sem nome'}</h3>
                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                        <Calendar size={14} />
                                        {m.turma?.horario || 'Horário não definido'}
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-2 bg-gray-50 border border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-500">
                                Nenhuma turma encontrada.
                            </div>
                        )}
                    </div>
                </div>

                {/* Direita: Stats e Conquistas */}
                <div className="space-y-6">
                    {/* Activity (Mock por enquanto pois não temos logs) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Award className="text-yellow-500" />
                            Conquistas Recentes
                        </h3>
                        <div className="space-y-4">
                            {/* Placeholder items */}
                            <div className="flex items-center gap-3 opacity-60">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">🏆</div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Primeira Aula</p>
                                    <p className="text-xs text-gray-500">Completou a introdução</p>
                                </div>
                            </div>
                            <div className="text-center text-xs text-gray-400 mt-4">
                                Integração com Gamificação em breve...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
