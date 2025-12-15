'use client';

import { Calendar, MapPin, Music, Users, Clock, CheckCircle2, Circle, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ShowFinalClientProps {
    initialRepertorio: any[];
}

export default function ShowFinalClient({ initialRepertorio }: ShowFinalClientProps) {
    const [tab, setTab] = useState<'detalhes' | 'repertorio' | 'preparacao'>('detalhes');
    const [repertorio, setRepertorio] = useState<any[]>([]);

    useEffect(() => {
        const mapped = (initialRepertorio || []).map((a, idx) => ({
            id: idx + 1,
            titulo: a.titulo || 'Peça Musical',
            instrumento: a.instrumento?.nome || a.modulo || 'Koto',
            tipo: idx % 3 === 0 ? 'Solo' : idx % 3 === 1 ? 'Ensemble' : 'Trio',
            duracao: `${Math.floor(Math.random() * 3 + 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            tradicao: ['koto', 'shamisen', 'shakuhachi', 'taiko'].some(j =>
                (a.titulo || '').toLowerCase().includes(j)
            ) ? 'japonesa' : 'fusão',
            status: a.status === 'concluida' ? 'pronto' : 'ensaiando',
        }));
        setRepertorio(mapped);
    }, [initialRepertorio]);

    const eventoInfo = {
        titulo: 'Show Final 2024',
        subtitulo: 'Grande Apresentação de Encerramento',
        data: '20 de Dezembro de 2024',
        horario: '19:00',
        local: 'Grande Auditório Nipo School',
        descricao: 'Apresentação especial com repertório de música tradicional japonesa e contemporânea.',
        participantes: 45,
        duracao: '2h30min',
    };

    const mockRepertorio = [
        {
            id: 1,
            titulo: 'Sakura Sakura',
            instrumento: 'Koto',
            tipo: 'Solo',
            duracao: '4:30',
            tradicao: 'japonesa',
            status: 'pronto',
        },
        {
            id: 2,
            titulo: 'Rokudan no Shirabe',
            instrumento: 'Koto',
            tipo: 'Ensemble',
            duracao: '6:00',
            tradicao: 'japonesa',
            status: 'pronto',
        },
        {
            id: 3,
            titulo: 'Tsuru no Sugomori',
            instrumento: 'Shakuhachi',
            tipo: 'Solo',
            duracao: '5:15',
            tradicao: 'japonesa',
            status: 'ensaiando',
        },
        {
            id: 4,
            titulo: 'Shika no Tōne',
            instrumento: 'Shakuhachi',
            tipo: 'Solo',
            duracao: '4:45',
            tradicao: 'japonesa',
            status: 'ensaiando',
        },
        {
            id: 5,
            titulo: 'Peça de Shamisen Clássico',
            instrumento: 'Shamisen',
            tipo: 'Trio',
            duracao: '5:30',
            tradicao: 'japonesa',
            status: 'pronto',
        },
        {
            id: 6,
            titulo: 'Fusão Oriente-Ocidente',
            instrumento: 'Koto + Piano',
            tipo: 'Duo',
            duracao: '4:00',
            tradicao: 'fusão',
            status: 'ensaiando',
        },
    ];

    const displayRepertorio = repertorio.length > 0 ? repertorio : mockRepertorio;

    const cronograma = [
        { etapa: 'Ensaios em Grupo', prazo: '30 Nov', status: 'concluído' },
        { etapa: 'Ensaio Geral no Palco', prazo: '10 Dez', status: 'concluído' },
        { etapa: 'Ajustes Finais', prazo: '15 Dez', status: 'em-andamento' },
        { etapa: 'Ensaio com Iluminação', prazo: '18 Dez', status: 'pendente' },
        { etapa: 'Show Final', prazo: '20 Dez', status: 'pendente' },
    ];

    return (
        <div className="space-y-8">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 opacity-10">
                    <Music size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                            <Music className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-red-100 font-bold tracking-widest text-sm uppercase">最終ショー Final Show</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4">🎭 {eventoInfo.titulo}</h1>
                    <p className="text-red-100 text-lg md:text-xl max-w-3xl leading-relaxed mb-6">
                        {eventoInfo.subtitulo}
                    </p>

                    {/* Info Pills */}
                    <div className="flex flex-wrap gap-3">
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span className="font-bold text-sm">{eventoInfo.data}</span>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span className="font-bold text-sm">{eventoInfo.horario}</span>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span className="font-bold text-sm">{eventoInfo.local}</span>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span className="font-bold text-sm">{eventoInfo.participantes} Participantes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl p-2 shadow-lg border-2 border-gray-100">
                <div className="flex gap-2">
                    {(['detalhes', 'repertorio', 'preparacao'] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${tab === t
                                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {t === 'detalhes' && '📋 Detalhes'}
                            {t === 'repertorio' && '🎵 Repertório'}
                            {t === 'preparacao' && '📅 Preparação'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {tab === 'detalhes' && (
                    <motion.div
                        key="detalhes"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-red-100">
                            <h3 className="text-2xl font-black text-gray-900 mb-4">📝 Sobre o Evento</h3>
                            <p className="text-gray-700 leading-relaxed mb-6">{eventoInfo.descricao}</p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                                    <Calendar className="w-5 h-5 text-red-600" />
                                    <div>
                                        <div className="text-xs font-bold text-gray-500">DATA</div>
                                        <div className="font-black text-gray-900">{eventoInfo.data}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl">
                                    <Clock className="w-5 h-5 text-pink-600" />
                                    <div>
                                        <div className="text-xs font-bold text-gray-500">HORÁRIO</div>
                                        <div className="font-black text-gray-900">{eventoInfo.horario} ({eventoInfo.duracao})</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                                    <MapPin className="w-5 h-5 text-orange-600" />
                                    <div>
                                        <div className="text-xs font-bold text-gray-500">LOCAL</div>
                                        <div className="font-black text-gray-900">{eventoInfo.local}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-8 border-2 border-red-200">
                            <h3 className="text-2xl font-black text-gray-900 mb-4">🎌 Tradição Japonesa</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Este show celebra a rica tradição musical japonesa, com performances de instrumentos clássicos como Koto, Shamisen e Shakuhachi.
                            </p>
                            <div className="bg-white rounded-2xl p-4 shadow-md">
                                <div className="text-4xl font-black text-red-600 mb-1">{eventoInfo.participantes}</div>
                                <div className="text-sm font-bold text-gray-600">Alunos Participando</div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {tab === 'repertorio' && (
                    <motion.div
                        key="repertorio"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        {displayRepertorio.map((peca, idx) => (
                            <motion.div
                                key={peca.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-red-200 transition-all hover:shadow-xl"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                        <Play className="w-8 h-8 text-white" fill="white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div>
                                                <h4 className="text-xl font-black text-gray-900">{peca.titulo}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {peca.tradicao === 'japonesa' && (
                                                        <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-lg">
                                                            🎌 JAPONESA
                                                        </span>
                                                    )}
                                                    {peca.tradicao === 'fusão' && (
                                                        <span className="px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-lg">
                                                            🌐 FUSÃO
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${peca.status === 'pronto' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {peca.status === 'pronto' ? '✅ Pronto' : '⏳ Ensaiando'}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Music className="w-4 h-4" />
                                                <span className="font-bold">{peca.instrumento}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span className="font-bold">{peca.tipo}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span className="font-bold">{peca.duracao}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {tab === 'preparacao' && (
                    <motion.div
                        key="preparacao"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-100"
                    >
                        <h3 className="text-2xl font-black text-gray-900 mb-6">📅 Cronograma de Preparação</h3>
                        <div className="space-y-4">
                            {cronograma.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${item.status === 'concluído' ? 'bg-green-500' :
                                            item.status === 'em-andamento' ? 'bg-yellow-500' :
                                                'bg-gray-300'
                                        }`}>
                                        {item.status === 'concluído' ? (
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        ) : (
                                            <Circle className="w-6 h-6 text-white" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-black text-gray-900">{item.etapa}</div>
                                        <div className="text-sm text-gray-500 font-bold">Prazo: {item.prazo}</div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'concluído' ? 'bg-green-100 text-green-700' :
                                            item.status === 'em-andamento' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-700'
                                        }`}>
                                        {item.status === 'concluído' && '✅ Concluído'}
                                        {item.status === 'em-andamento' && '⏳ Em Andamento'}
                                        {item.status === 'pendente' && '⏸ Pendente'}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
