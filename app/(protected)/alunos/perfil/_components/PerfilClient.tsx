'use client';

import { User, Music, Target, Trophy, Clock, Edit, Calendar, BookOpen, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface PerfilClientProps {
    usuario: {
        nome: string;
        email: string;
        avatar: string;
        nivel: number;
        xp: number;
        dataInscricao: string;
        bio: string;
        matricula?: string;
    };
    instrumentos: Array<{
        nome: string;
        nivel: string;
        progresso: number;
        icone: string;
    }>;
    matriculas: any[]; // Tipar corretamente se possível
    metas: Array<{
        meta: string;
        prazo: string;
        progresso: number;
    }>;
    estatisticas: Array<{
        label: string;
        valor: number;
        icone: any; // We'll pass the icon name as string or handle it
    }>;
    atividadeRecente: Array<{
        acao: string;
        data: string;
        icone: string;
    }>;
}

export default function PerfilClient({ usuario, instrumentos, matriculas, metas, estatisticas, atividadeRecente }: PerfilClientProps) {
    const [editando, setEditando] = useState(false);

    // Helper to map icon names to components if needed, or just use the passed props if we fix the typing.
    // In this case, `estatisticas` uses Lucide icons in the original code. 
    // We will assume `estatisticas` props pass icon names and we map them here.

    const getIcon = (name: string) => {
        switch (name) {
            case 'BookOpen': return <User />; // Placeholder
            case 'Clock': return <Clock />;
            case 'Trophy': return <Trophy />;
            case 'Flame': return <div className="text-xl">🔥</div>;
            case 'Library': return <div className="text-xl">📚</div>; // '📚' was used in original
            case 'Stopwatch': return <div className="text-xl">⏱</div>; // '⏱'
            default: return <User />;
        }
    };

    return (
        <div className="space-y-8">
            {/* Hero com Info do Usuário */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 opacity-10">
                    <User size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-start gap-6 mb-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-6xl shadow-2xl border-4 border-white/30">
                            {usuario.avatar}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-black">{usuario.nome}</h1>
                                <button
                                    onClick={() => setEditando(!editando)}
                                    className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-all"
                                >
                                    <Edit className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-red-100 text-lg mb-3">{usuario.email}</p>
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold border border-white/30">
                                    Nível {usuario.nivel}
                                </span>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold border border-white/30">
                                    {usuario.xp.toLocaleString()} XP
                                </span>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold border border-white/30">
                                    Membro desde {usuario.dataInscricao}
                                </span>
                                {usuario.matricula && (
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold border border-white/30 flex items-center gap-2">
                                        <QrCode className="w-4 h-4" />
                                        {usuario.matricula}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                        <p className="text-red-50 leading-relaxed">{usuario.bio}</p>
                    </div>
                </div>
            </motion.div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {estatisticas.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-red-200 hover:-translate-y-1 transition-all"
                    >
                        <div className="text-4xl mb-2">
                            {/* If it's a string that is an emoji, render it directly. If it's a component name, render component */}
                            {typeof stat.icone === 'string' && (stat.icone.length <= 2 || stat.icone.startsWith('&#')) ? stat.icone : getIcon(stat.icone as string)}
                        </div>
                        <div className="text-3xl font-black text-gray-900">{stat.valor}</div>
                        <div className="text-sm text-gray-600 font-bold">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Turmas Matriculadas (Real Data) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-100 lg:col-span-2"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-100 rounded-2xl">
                        <BookOpen className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">📚 Minhas Turmas</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {matriculas && matriculas.length > 0 ? (
                        matriculas.map((mat, idx) => (
                            <div key={idx} className="p-4 bg-orange-50 rounded-2xl border border-orange-100 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-black text-gray-900 text-lg mb-1">{mat.turma?.nome || 'Turma sem nome'}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 font-bold">
                                            <Calendar className="w-4 h-4" />
                                            <span>{mat.turma?.horario || 'Horário a definir'}</span>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-black uppercase tracking-wider ${mat.status === 'ativa' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {mat.status}
                                    </span>
                                </div>
                                {mat.turma?.professor && (
                                    <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center text-xs font-bold text-orange-700">
                                            {mat.turma.professor.nome?.charAt(0) || 'P'}
                                        </div>
                                        <span>Prof. {mat.turma.professor.nome}</span>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-8 text-gray-500 bg-orange-50/50 rounded-2xl border-2 border-dashed border-orange-100">
                            <p>Nenhuma turma matriculada no momento.</p>
                        </div>
                    )}
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Instrumentos */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl p-8 shadow-lg border-2 border-red-100"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-red-100 rounded-2xl">
                            <Music className="w-6 h-6 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">🎌 Meus Instrumentos</h2>
                    </div>

                    <div className="space-y-4">
                        {instrumentos.map((inst, idx) => (
                            <div key={idx} className="p-4 bg-red-50 rounded-2xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="text-3xl">{inst.icone}</div>
                                    <div className="flex-1">
                                        <div className="font-black text-gray-900">{inst.nome}</div>
                                        <div className="text-sm text-gray-600 font-bold">{inst.nivel}</div>
                                    </div>
                                    <div className="text-xl font-black text-red-600">{inst.progresso}%</div>
                                </div>
                                <div className="h-2 bg-red-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${inst.progresso}%` }}
                                        transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
                                        className="h-full bg-gradient-to-r from-red-500 to-pink-600 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Metas */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-100"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 rounded-2xl">
                            <Target className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">🎯 Minhas Metas</h2>
                    </div>

                    <div className="space-y-4">
                        {metas.map((meta, idx) => (
                            <div key={idx} className="p-4 bg-blue-50 rounded-2xl">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="font-black text-gray-900 mb-1">{meta.meta}</div>
                                        <div className="text-sm text-gray-600 font-bold flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {meta.prazo}
                                        </div>
                                    </div>
                                    <div className="text-xl font-black text-blue-600">{meta.progresso}%</div>
                                </div>
                                <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${meta.progresso}%` }}
                                        transition={{ duration: 1, delay: 0.4 + idx * 0.1 }}
                                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Atividade Recente */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-purple-100"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-100 rounded-2xl">
                        <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">📊 Atividade Recente</h2>
                </div>

                <div className="space-y-3">
                    {atividadeRecente.map((ativ, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.05 }}
                            className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-all"
                        >
                            <div className="text-2xl">{ativ.icone}</div>
                            <div className="flex-1">
                                <div className="font-black text-gray-900">{ativ.acao}</div>
                                <div className="text-sm text-gray-600 font-bold">{ativ.data}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div >
    );
}
