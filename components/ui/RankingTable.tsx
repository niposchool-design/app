'use client';

import { Trophy, Crown, Medal, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface RankingEntry {
    position: number;
    userId: string;
    name: string;
    avatar: string;
    level: number;
    xp: number;
    points?: number;
    isCurrentUser?: boolean;
}

interface RankingTableProps {
    entries: RankingEntry[];
    title?: string;
    subtitle?: string;
    showXP?: boolean;
    showLevel?: boolean;
    highlightTop3?: boolean;
}

export default function RankingTable({
    entries,
    title = '🏆 Ranking Geral',
    subtitle = 'Top alunos da Nipo School',
    showXP = true,
    showLevel = true,
    highlightTop3 = true
}: RankingTableProps) {
    const getPositionIcon = (position: number) => {
        switch (position) {
            case 1:
                return <Crown className="w-6 h-6 text-yellow-500" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 3:
                return <Award className="w-6 h-6 text-orange-500" />;
            default:
                return <span className="text-gray-600 font-bold">#{position}</span>;
        }
    };

    const getPositionBadge = (position: number) => {
        const badges = {
            1: { emoji: '👑', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
            2: { emoji: '🥈', bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
            3: { emoji: '🥉', bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' }
        };
        return badges[position as keyof typeof badges] || null;
    };

    const getRowStyle = (entry: RankingEntry) => {
        if (entry.isCurrentUser) {
            return 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 shadow-lg';
        }
        if (highlightTop3 && entry.position <= 3) {
            const badge = getPositionBadge(entry.position);
            return `${badge?.bg} border-2 ${badge?.border}`;
        }
        return 'bg-white border border-gray-200 hover:shadow-md';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600">{subtitle}</p>
            </div>

            {/* Table */}
            <div className="space-y-3">
                {entries.map((entry, index) => {
                    const badge = highlightTop3 ? getPositionBadge(entry.position) : null;

                    return (
                        <motion.div
                            key={entry.userId}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`rounded-2xl p-4 md:p-6 transition-all ${getRowStyle(entry)}`}
                        >
                            <div className="flex items-center gap-4">
                                {/* Position */}
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                                    {highlightTop3 && entry.position <= 3 ? (
                                        <div className="text-3xl">{badge?.emoji}</div>
                                    ) : (
                                        getPositionIcon(entry.position)
                                    )}
                                </div>

                                {/* Avatar */}
                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                    {entry.avatar}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-gray-900 truncate text-lg">
                                            {entry.name}
                                        </h3>
                                        {entry.isCurrentUser && (
                                            <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full font-bold">
                                                VOCÊ
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        {showLevel && (
                                            <span className="flex items-center gap-1">
                                                <TrendingUp className="w-4 h-4" />
                                                Nível {entry.level}
                                            </span>
                                        )}
                                        {showXP && (
                                            <>
                                                <span>•</span>
                                                <span className="font-bold text-red-600">
                                                    {entry.xp.toLocaleString()} XP
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Points/Score */}
                                <div className="flex-shrink-0 text-right">
                                    <div className="flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-yellow-500" />
                                        <span className="text-2xl font-black text-gray-900">
                                            {(entry.points || entry.xp).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">pontos</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer Stats */}
            {entries.length > 0 && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-sm text-gray-600 font-medium mb-1">Total de Alunos</p>
                            <p className="text-2xl font-black text-gray-900">{entries.length}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-medium mb-1">XP Médio</p>
                            <p className="text-2xl font-black text-gray-900">
                                {Math.round(entries.reduce((acc, e) => acc + e.xp, 0) / entries.length).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-medium mb-1">Nível Médio</p>
                            <p className="text-2xl font-black text-gray-900">
                                {Math.round(entries.reduce((acc, e) => acc + e.level, 0) / entries.length)}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
