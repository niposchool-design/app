'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Trophy, Clock, Users, Target, CheckCircle2, Star, Upload, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Mock data - será substituído por dados reais do banco
const getDesafioById = (id: string) => {
    const desafios = {
        '1': {
            id: '1',
            titulo: 'Domínio do Koto: Sakura Perfect',
            descricao: 'Toque Sakura Sakura no koto sem erros com 95% de precisão',
            descricaoCompleta: 'Este desafio testa sua habilidade técnica e interpretação da música tradicional japonesa mais icônica. Você deverá gravar sua execução da peça "Sakura Sakura" no instrumento koto, atingindo pelo menos 95% de precisão nas notas e mantendo o ritmo adequado.',
            dificuldade: 'medio' as const,
            pontos: 200,
            prazo: '2025-12-31',
            status: 'ativo' as const,
            participantes: 24,
            categoria: 'Koto',
            requisitos: [
                'Ter completado pelo menos 5 aulas de Koto',
                'Conhecer a partitura de Sakura Sakura',
                'Ter afinador disponível para verificar precisão'
            ],
            passos: [
                'Pratique a música até conseguir tocar sem erros',
                'Grave sua execução em vídeo ou áudio',
                'Faça upload da gravação',
                'Aguarde a avaliação do professor'
            ],
            recompensas: [
                '200 pontos XP',
                'Badge "Mestre do Sakura"',
                'Desbloqueio da aula avançada de Koto'
            ]
        },
        '2': {
            id: '2',
            titulo: 'Mestre do Shamisen',
            descricao: 'Complete 3 músicas tradicionais no shamisen',
            descricaoCompleta: 'Demonstre seu domínio do shamisen tocando três músicas tradicionais completas. Este desafio avalia sua versatilidade e capacidade de executar diferentes estilos e técnicas no instrumento.',
            dificuldade: 'dificil' as const,
            pontos: 300,
            prazo: '2025-12-25',
            status: 'ativo' as const,
            participantes: 12,
            categoria: 'Shamisen',
            requisitos: [
                'Ter completado pelo menos 8 aulas de Shamisen',
                'Dominar as três músicas escolhidas',
                'Gravar em boa qualidade de áudio'
            ],
            passos: [
                'Escolha três músicas do repertório tradicional',
                'Pratique cada uma até dominar completamente',
                'Grave as três execuções',
                'Envie todas as gravações juntas'
            ],
            recompensas: [
                '300 pontos XP',
                'Badge "Virtuoso do Shamisen"',
                'Certificado digital',
                'Acesso a aulas master class'
            ]
        }
    };

    return desafios[id as keyof typeof desafios] || null;
};

export default function DesafioDetalhesPage() {
    const params = useParams();
    const router = useRouter();
    const [enviado, setEnviado] = useState(false);
    const [arquivo, setArquivo] = useState<File | null>(null);

    const desafio = getDesafioById(params.id as string);

    if (!desafio) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Desafio não encontrado</h1>
                    <button
                        onClick={() => router.push('/alunos/desafios')}
                        className="text-red-600 hover:text-red-700"
                    >
                        Voltar para desafios
                    </button>
                </div>
            </div>
        );
    }

    const diasRestantes = Math.ceil(
        (new Date(desafio.prazo).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    const corDificuldade = {
        facil: 'bg-green-100 text-green-700 border-green-200',
        medio: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        dificil: 'bg-red-100 text-red-700 border-red-200',
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setArquivo(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implementar upload real
        setEnviado(true);
        setTimeout(() => {
            router.push('/alunos/desafios');
        }, 2000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push('/alunos/desafios')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${corDificuldade[desafio.dificuldade]}`}>
                            {desafio.dificuldade.charAt(0).toUpperCase() + desafio.dificuldade.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {diasRestantes} dias restantes
                        </span>
                    </div>
                    <h1 className="text-3xl font-black text-gray-900">{desafio.titulo}</h1>
                    <p className="text-gray-600 mt-2">{desafio.descricao}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Coluna Principal */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Descrição Completa */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Sobre o Desafio</h2>
                        <p className="text-gray-700 leading-relaxed">{desafio.descricaoCompleta}</p>
                    </motion.div>

                    {/* Requisitos */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-4">✅ Requisitos</h2>
                        <ul className="space-y-3">
                            {desafio.requisitos.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Como Participar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 Como Participar</h2>
                        <ol className="space-y-3">
                            {desafio.passos.map((passo, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                                        {idx + 1}
                                    </span>
                                    <span className="text-gray-700 mt-0.5">{passo}</span>
                                </li>
                            ))}
                        </ol>
                    </motion.div>

                    {/* Formulário de Submissão */}
                    {!enviado ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">📤 Enviar Submissão</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Arquivo de Áudio/Vídeo
                                    </label>
                                    <input
                                        type="file"
                                        accept="audio/*,video/*"
                                        onChange={handleFileChange}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none"
                                        required
                                    />
                                    {arquivo && (
                                        <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Arquivo selecionado: {arquivo.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Comentários (opcional)
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none"
                                        placeholder="Adicione algum comentário sobre sua execução..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Upload className="w-5 h-5" />
                                    Enviar Desafio
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-50 rounded-2xl p-8 border-2 border-green-200 text-center"
                        >
                            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Desafio Enviado! 🎉</h3>
                            <p className="text-gray-600">
                                Seu professor irá avaliar sua submissão em breve.
                            </p>
                        </motion.div>
                    )}
                </div>

                {/* Coluna Lateral */}
                <div className="space-y-6">
                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 font-medium">Pontos</span>
                            <div className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                <span className="text-2xl font-bold text-gray-900">{desafio.pontos}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 font-medium">Participantes</span>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-500" />
                                <span className="text-2xl font-bold text-gray-900">{desafio.participantes}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 font-medium">Prazo</span>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-red-500" />
                                <span className="text-sm font-bold text-gray-900">
                                    {new Date(desafio.prazo).toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Recompensas */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            Recompensas
                        </h3>
                        <ul className="space-y-3">
                            {desafio.recompensas.map((recompensa, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                    <span className="text-yellow-500 mt-0.5">✨</span>
                                    {recompensa}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Categoria */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
                    >
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Categoria</h3>
                        <p className="text-xl font-bold text-red-600">{desafio.categoria}</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
