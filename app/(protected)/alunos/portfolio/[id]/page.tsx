'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Music, Play, Star, Calendar, Clock, Award, Share2, Download, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Mock data - será substituído por dados reais do banco
const getObraById = (id: string) => {
    const obras = {
        '1': {
            id: '1',
            titulo: 'Sakura Sakura',
            instrumento: 'Koto',
            tipo: 'japonesa' as const,
            duracao: '4:30',
            nivel: 'intermediário',
            nota: 9.5,
            dataGravacao: '15 Nov 2024',
            plays: 45,
            thumbnail: '🌸',
            descricao: 'Interpretação tradicional da canção folclórica japonesa Sakura Sakura, tocada no koto de 13 cordas. Esta gravação captura a essência da primavera e a beleza efêmera das flores de cerejeira.',
            tecnicas: ['Pizzicato', 'Glissando', 'Tremolo'],
            avaliacaoProfessor: {
                nota: 9.5,
                comentario: 'Excelente interpretação! A técnica está muito boa e a expressividade está perfeita. Continue praticando os glissandos para torná-los ainda mais suaves.',
                professor: 'Prof. Yuki Tanaka',
                data: '16 Nov 2024'
            },
            conquistasDesbloqueadas: [
                { nome: 'Primeira Gravação', icone: '🎵' },
                { nome: 'Mestre do Sakura', icone: '🌸' }
            ]
        },
        '2': {
            id: '2',
            titulo: 'Rokudan no Shirabe',
            instrumento: 'Koto',
            tipo: 'japonesa' as const,
            duracao: '6:00',
            nivel: 'avançado',
            nota: 9.0,
            dataGravacao: '20 Out 2024',
            plays: 32,
            thumbnail: '🎵',
            descricao: 'Peça clássica de Yatsuhashi Kengyō. Uma das obras mais importantes do repertório de koto.',
            tecnicas: ['Arpejos complexos', 'Mudanças de afinação', 'Ornamentação tradicional'],
            avaliacaoProfessor: {
                nota: 9.0,
                comentario: 'Muito bom! As mudanças de seção estão bem executadas. Trabalhe um pouco mais na dinâmica para criar mais contraste.',
                professor: 'Prof. Kenji Sato',
                data: '22 Out 2024'
            },
            conquistasDesbloqueadas: [
                { nome: 'Peça Avançada', icone: '🏆' }
            ]
        }
    };

    return obras[id as keyof typeof obras] || null;
};

export default function PortfolioDetalhesPage() {
    const params = useParams();
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(false);

    const obra = getObraById(params.id as string);

    if (!obra) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Obra não encontrada</h1>
                    <button
                        onClick={() => router.push('/alunos/portfolio')}
                        className="text-red-600 hover:text-red-700"
                    >
                        Voltar para portfólio
                    </button>
                </div>
            </div>
        );
    }

    const corNota = (nota: number) => {
        if (nota >= 9) return 'text-green-600';
        if (nota >= 7) return 'text-yellow-600';
        return 'text-orange-600';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/alunos/portfolio')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">{obra.titulo}</h1>
                        <div className="flex items-center gap-3 mt-2 text-gray-600">
                            <span className="flex items-center gap-1">
                                <Music className="w-4 h-4" />
                                {obra.instrumento}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {obra.duracao}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {obra.dataGravacao}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors" title="Editar">
                        <Edit className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors" title="Compartilhar">
                        <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                        <Download className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-3 hover:bg-red-100 rounded-lg transition-colors text-red-600" title="Excluir">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Coluna Principal */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Player */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-6xl">{obra.thumbnail}</div>
                            <div className="text-right">
                                <div className={`text-5xl font-black ${corNota(obra.nota)} bg-white px-4 py-2 rounded-xl`}>
                                    {obra.nota}
                                </div>
                                <p className="text-white/80 text-sm mt-1">Nota do Professor</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all py-4 rounded-xl flex items-center justify-center gap-3 font-bold"
                            >
                                <Play className="w-6 h-6" fill={isPlaying ? 'currentColor' : 'none'} />
                                {isPlaying ? 'Pausar' : 'Reproduzir'}
                            </button>

                            {/* Progress bar (simulado) */}
                            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                                <div className="bg-white h-full w-1/3 rounded-full" />
                            </div>

                            <div className="flex justify-between text-sm text-white/80">
                                <span>1:30</span>
                                <span>{obra.duracao}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Descrição */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-4">📖 Sobre a Obra</h2>
                        <p className="text-gray-700 leading-relaxed">{obra.descricao}</p>
                    </motion.div>

                    {/* Técnicas Utilizadas */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 Técnicas Utilizadas</h2>
                        <div className="flex flex-wrap gap-2">
                            {obra.tecnicas.map((tecnica, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-bold border-2 border-red-200"
                                >
                                    {tecnica}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Avaliação do Professor */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Award className="w-6 h-6 text-blue-600" />
                            Avaliação do Professor
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-gray-900">{obra.avaliacaoProfessor.professor}</p>
                                    <p className="text-sm text-gray-600">{obra.avaliacaoProfessor.data}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(obra.avaliacaoProfessor.nota / 2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4">
                                <p className="text-gray-700 italic">"{obra.avaliacaoProfessor.comentario}"</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Conquistas Desbloqueadas */}
                    {obra.conquistasDesbloqueadas.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">🏆 Conquistas Desbloqueadas</h2>
                            <div className="flex flex-wrap gap-3">
                                {obra.conquistasDesbloqueadas.map((conquista, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm border border-yellow-200"
                                    >
                                        <span className="text-2xl">{conquista.icone}</span>
                                        <span className="font-bold text-gray-900">{conquista.nome}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Coluna Lateral */}
                <div className="space-y-6">
                    {/* Estatísticas */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Estatísticas</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Reproduções</span>
                                <span className="text-2xl font-bold text-gray-900">{obra.plays}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Nível</span>
                                <span className="text-sm font-bold text-red-600 px-3 py-1 bg-red-50 rounded-full">
                                    {obra.nivel}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Duração</span>
                                <span className="font-bold text-gray-900">{obra.duracao}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Informações Adicionais */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4">ℹ️ Informações</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-gray-500 font-medium">Tipo:</span>
                                <p className="text-gray-900 font-bold capitalize">{obra.tipo}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 font-medium">Instrumento:</span>
                                <p className="text-gray-900 font-bold">{obra.instrumento}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 font-medium">Data de Gravação:</span>
                                <p className="text-gray-900 font-bold">{obra.dataGravacao}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Ações Rápidas */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Ações Rápidas</h3>
                        <div className="space-y-2">
                            <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm">
                                <Share2 className="w-4 h-4" />
                                Compartilhar
                            </button>
                            <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm">
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
