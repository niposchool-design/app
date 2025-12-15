'use client';

import { Trophy, Star, Award, Zap, TrendingUp, Target, Sparkles, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GamificacaoPage() {
    // Mock data
    const playerStats = {
        nivel: 12,
        xpAtual: 2450,
        xpProximoNivel: 3000,
        pontosTotais: 12450,
        posicaoRanking: 8,
        totalJogadores: 156,
    };

    const ranking = [
        { pos: 1, nome: 'Yuki Tanaka', nivel: 18, xp: 18500, avatar: '👑' },
        { pos: 2, nome: 'Sakura Yamamoto', nivel: 16, xp: 16200, avatar: '🥈' },
        { pos: 3, nome: 'Kenji Sato', nivel: 15, xp: 15800, avatar: '🥉' },
        { pos: 4, nome: 'Hana Suzuki', nivel: 14, xp: 14500, avatar: '⭐' },
        { pos: 5, nome: 'Ryu Nakamura', nivel: 13, xp: 13200, avatar: '⭐' },
        { pos: 8, nome: 'Você', nivel: 12, xp: 12450, avatar: '🎵', isYou: true },
    ];

    const recompensasNivel = [
        { nivel: 13, recompensa: 'Badge: Mestre do Koto', icone: '🎵', bloqueado: true },
        { nivel: 15, recompensa: 'Acesso: Aulas Avançadas', icone: '📚', bloqueado: true },
        { nivel: 20, recompensa: 'Certificado Master', icone: '🏆', bloqueado: true },
    ];

    const atividadesRecentes = [
        { acao: 'Completou aula de Koto', xp: 150, icone: '📖', tempo: '2 horas atrás' },
        { acao: 'Conquistou "Sakura Dominada"', xp: 200, icone: '🏆', tempo: '1 dia atrás' },
        { acao: 'Completou desafio semanal', xp: 100, icone: '⚔️', tempo: '2 dias atrás' },
        { acao: 'Prática diária - 5 dias', xp: 50, icone: '🔥', tempo: '3 dias atrás' },
    ];

    const progressoNivel = (playerStats.xpAtual / playerStats.xpProximoNivel) * 100;

    return (
        <div className="space-y-8">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 opacity-10">
                    <Trophy size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-purple-100 font-bold tracking-widest text-sm uppercase">ゲーム Gaming</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4">🎮 Gamificação</h1>
                    <p className="text-purple-100 text-lg md:text-xl max-w-3xl leading-relaxed">
                        Acompanhe seu progresso, conquiste níveis e domine a arte da música japonesa.
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna Esquerda - Stats Principais */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Card de Nível */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-3xl p-8 shadow-lg border-2 border-purple-100"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <div className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Seu Nível</div>
                                <div className="text-5xl font-black text-purple-600">{playerStats.nivel}</div>
                            </div>
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Star className="w-10 h-10 text-white" fill="white" />
                            </div>
                        </div>

                        {/* Barra de XP */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm font-bold text-gray-600">
                                <span>Progresso para Nível {playerStats.nivel + 1}</span>
                                <span>{playerStats.xpAtual}/{playerStats.xpProximoNivel} XP</span>
                            </div>
                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressoNivel}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="text-center p-4 bg-purple-50 rounded-2xl">
                                <div className="text-2xl font-black text-purple-600">{playerStats.pontosTotais}</div>
                                <div className="text-xs text-gray-600 font-bold uppercase mt-1">XP Total</div>
                            </div>
                            <div className="text-center p-4 bg-pink-50 rounded-2xl">
                                <div className="text-2xl font-black text-pink-600">#{playerStats.posicaoRanking}</div>
                                <div className="text-xs text-gray-600 font-bold uppercase mt-1">Ranking</div>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-2xl">
                                <div className="text-2xl font-black text-red-600">{playerStats.totalJogadores}</div>
                                <div className="text-xs text-gray-600 font-bold uppercase mt-1">Jogadores</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Ranking */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 shadow-lg border-2 border-yellow-100"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-yellow-100 rounded-2xl">
                                <Trophy className="w-6 h-6 text-yellow-600" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900">🏆 Top Players</h2>
                        </div>

                        <div className="space-y-3">
                            {ranking.map((player, idx) => (
                                <motion.div
                                    key={player.pos}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.05 }}
                                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                                        player.isYou
                                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 shadow-md'
                                            : 'bg-gray-50 hover:bg-gray-100'
                                    }`}
                                >
                                    <div className="text-3xl">{player.avatar}</div>
                                    <div className="flex-1">
                                        <div className="font-black text-gray-900">{player.nome}</div>
                                        <div className="text-xs text-gray-500 font-bold">Nível {player.nivel} • {player.xp.toLocaleString()} XP</div>
                                    </div>
                                    <div className={`text-xl font-black ${
                                        player.pos === 1 ? 'text-yellow-500' :
                                        player.pos === 2 ? 'text-gray-400' :
                                        player.pos === 3 ? 'text-orange-600' :
                                        'text-gray-600'
                                    }`}>
                                        #{player.pos}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Coluna Direita */}
                <div className="space-y-6">
                    {/* Recompensas de Nível */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-3xl p-6 shadow-lg border-2 border-orange-100"
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <Crown className="w-5 h-5 text-orange-600" />
                            <h3 className="text-lg font-black text-gray-900">Próximas Recompensas</h3>
                        </div>

                        <div className="space-y-4">
                            {recompensasNivel.map((r, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="text-2xl">{r.icone}</div>
                                    <div className="flex-1">
                                        <div className="text-xs font-black text-orange-600 mb-1">NÍVEL {r.nivel}</div>
                                        <div className="text-sm font-bold text-gray-700">{r.recompensa}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Atividades Recentes */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-3xl p-6 shadow-lg border-2 border-blue-100"
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-black text-gray-900">Atividade Recente</h3>
                        </div>

                        <div className="space-y-3">
                            {atividadesRecentes.map((ativ, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                                    <div className="text-xl">{ativ.icone}</div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-gray-900">{ativ.acao}</div>
                                        <div className="text-xs text-gray-500 font-medium mt-0.5">{ativ.tempo}</div>
                                    </div>
                                    <div className="text-sm font-black text-yellow-600">+{ativ.xp}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
