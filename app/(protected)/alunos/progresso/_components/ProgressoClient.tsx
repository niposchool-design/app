'use client';

import { TrendingUp, Target, Trophy, Clock, Star, Flame, Music, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProgressoClientProps {
    stats: {
        licoesCompletadas: number;
        horasPraticadas: number;
        conquistasTotal: number;
        nivelAtual: number;
        pontosXP: number;
        sequenciaAtual: number;
    };
    instrumentosJaponeses: Array<{
        nome: string;
        progresso: number;
        nivel: string;
        cor: string;
        horas: number;
    }>;
    metasSemanais: Array<{
        titulo: string;
        atual: number;
        total: number;
        cor: string;
        icone: any;
    }>;
    conquistasRecentes: Array<{
        nome: string;
        data: string;
        pontos: number;
        icone: string;
        cor: string;
    }>;
}

export default function ProgressoClient({
    stats,
    instrumentosJaponeses,
    metasSemanais,
    conquistasRecentes
}: ProgressoClientProps) {

    const nivelXP = {
        atual: stats.pontosXP,
        proximo: 1000,
        progresso: (stats.pontosXP / 1000) * 100,
    };

    return (
        <div className="space-y-8">
            {/* Hero Japonês */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 opacity-10">
                    <TrendingUp size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-red-100 font-bold tracking-widest text-sm uppercase">進捷 Shinpo (Progresso)</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4">🎌 Meu Progresso</h1>
                    <p className="text-red-100 text-lg md:text-xl max-w-3xl leading-relaxed mb-6">
                        Acompanhe sua jornada na música japonesa. Cada passo é uma vitória.
                    </p>

                    {/* Nível e XP */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Star className="w-6 h-6 text-white" fill="white" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-red-100">NÍVEL</div>
                                    <div className="text-2xl font-black">{stats.nivelAtual}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-red-100">XP</div>
                                <div className="text-xl font-black">{nivelXP.atual}/{nivelXP.proximo}</div>
                            </div>
                        </div>
                        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${nivelXP.progresso}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full bg-white rounded-full shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {[
                    { label: 'Lições', value: stats.licoesCompletadas, icon: BookOpen, gradient: 'from-blue-500 to-blue-600' },
                    { label: 'Horas', value: `${stats.horasPraticadas}h`, icon: Clock, gradient: 'from-green-500 to-green-600' },
                    { label: 'Conquistas', value: stats.conquistasTotal, icon: Trophy, gradient: 'from-yellow-500 to-yellow-600' },
                    { label: 'Sequência', value: `${stats.sequenciaAtual} dias`, icon: Flame, gradient: 'from-red-500 to-orange-600' },
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 text-white shadow-lg`}
                    >
                        <stat.icon className="w-8 h-8 mb-3 opacity-80" />
                        <div className="text-3xl font-black mb-1">{stat.value}</div>
                        <div className="text-sm font-medium opacity-90">{stat.label}</div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Progresso por Instrumento Japonês */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl p-8 shadow-lg border-2 border-red-100"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-red-50 rounded-2xl">
                            <Music className="w-6 h-6 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">Instrumentos Japoneses</h2>
                    </div>

                    <div className="space-y-6">
                        {instrumentosJaponeses.map((inst, idx) => (
                            <motion.div
                                key={inst.nome}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <h3 className="font-black text-gray-900">{inst.nome}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full bg-${inst.cor}-50 text-${inst.cor}-700`}>
                                                {inst.nivel}
                                            </span>
                                            <span className="text-xs text-gray-500">• {inst.horas}h praticadas</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-3xl font-black text-${inst.cor}-600`}>{inst.progresso}%</div>
                                    </div>
                                </div>
                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${inst.progresso}%` }}
                                        transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                                        className={`h-full bg-gradient-to-r from-${inst.cor}-500 to-${inst.cor}-600 rounded-full`}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Metas Semanais */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-100"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-orange-50 rounded-2xl">
                            <Target className="w-6 h-6 text-orange-600" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">Metas Semanais</h2>
                    </div>

                    <div className="space-y-6">
                        {metasSemanais.map((meta, idx) => {
                            const progresso = (meta.atual / meta.total) * 100;
                            // We need access to the icon component. In client component, we can't easily pass the component itself if it's not serializable.
                            // But here we are passing it from props, so it should be fine if we handle it correctly.
                            // However, props from server to client need to be serializable.
                            // The Lucide icons are components. I will fix this by passing icon name or handling icon rendering inside Client component
                            // For now, let's assume `meta.icone` is passed as string 'BookOpen' or similar and mapped here, or we simplify.
                            // Wait, in the original code, `BookOpen` was imported.
                            // I will refactor to use a string identifier or handle mapping here.

                            // Let's use a simple mapping or just pass the component if it works (it won't work directly from server to client).
                            // Better solution: Pass a string type and render Icon component here.

                            const Icon =
                                meta.icone === 'BookOpen' ? BookOpen :
                                    meta.icone === 'Clock' ? Clock :
                                        meta.icone === 'Trophy' ? Trophy : Target;

                            return (
                                <motion.div
                                    key={meta.titulo}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icon className="w-5 h-5 text-gray-600" />
                                        <span className="font-bold text-gray-900">{meta.titulo}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progresso}%` }}
                                                transition={{ duration: 1, delay: 0.4 + idx * 0.1 }}
                                                className={`h-full ${meta.cor} rounded-full`}
                                            />
                                        </div>
                                        <span className="text-sm font-bold text-gray-600 min-w-[60px] text-right">
                                            {meta.atual}/{meta.total}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Conquistas Recentes */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border-2 border-yellow-200"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-yellow-100 rounded-2xl">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">🏆 Conquistas Recentes</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {conquistasRecentes.map((conquista, idx) => (
                        <motion.div
                            key={conquista.nome}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + idx * 0.05 }}
                            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-yellow-100"
                        >
                            <div className="text-5xl mb-3 text-center">{conquista.icone}</div>
                            <h3 className="font-black text-gray-900 text-center mb-2">{conquista.nome}</h3>
                            <div className={`text-center text-sm font-bold text-${conquista.cor}-600 bg-${conquista.cor}-50 px-3 py-1 rounded-full inline-block w-full`}>
                                +{conquista.pontos} XP
                            </div>
                            <div className="text-xs text-gray-500 text-center mt-2">
                                {new Date(conquista.data).toLocaleDateString('pt-BR')}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
