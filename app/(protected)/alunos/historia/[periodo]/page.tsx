'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Music, Calendar, User, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data - será substituído por dados reais do banco
const getPeriodoData = (periodo: string) => {
    const periodos: Record<string, any> = {
        'heian': {
            nome: 'Período Heian',
            anos: '794-1185',
            descricao: 'Era dourada da cultura japonesa, marcada pelo refinamento estético e desenvolvimento da música de corte.',
            imagem: '🏯',
            cor: 'from-purple-600 to-pink-600',
            compositores: [
                {
                    id: 1,
                    nome: 'Yatsuhashi Kengyō',
                    anos: '1614-1685',
                    descricao: 'Considerado o pai do koto moderno.',
                    obras: ['Rokudan no Shirabe', 'Midare'],
                    avatar: '🎵'
                }
            ],
            instrumentos: [
                { nome: 'Koto', icone: '🎵', descricao: 'Instrumento de 13 cordas' },
                { nome: 'Biwa', icone: '🪕', descricao: 'Alaúde de 4 cordas' },
                { nome: 'Fue', icone: '🎋', descricao: 'Flauta transversal' }
            ],
            estilos: [
                'Gagaku - Música de corte',
                'Saibara - Canções folclóricas refinadas',
                'Imayō - Canções populares'
            ],
            curiosidades: [
                'O gagaku é a forma de música de orquestra mais antiga do mundo ainda em prática.',
                'A música era essencial nas cerimônias da corte imperial.',
                'O Genji Monogatari menciona várias performances musicais.'
            ]
        },
        'edo': {
            nome: 'Período Edo',
            anos: '1603-1868',
            descricao: 'Período de isolamento e florescimento cultural urbano, com desenvolvimento do teatro kabuki e bunraku.',
            imagem: '🎭',
            cor: 'from-red-600 to-orange-600',
            compositores: [
                {
                    id: 2,
                    nome: 'Miyagi Michio',
                    anos: '1894-1956',
                    descricao: 'Virtuoso do koto que modernizou a música tradicional.',
                    obras: ['Haru no Umi', 'Sakura Variations'],
                    avatar: '🌊'
                }
            ],
            instrumentos: [
                { nome: 'Shamisen', icone: '🎸', descricao: 'Bandolim de 3 cordas' },
                { nome: 'Shakuhachi', icone: '🎋', descricao: 'Flauta de bambu' },
                { nome: 'Taiko', icone: '🥁', descricao: 'Tambores tradicionais' }
            ],
            estilos: [
                'Nagauta - Música de kabuki',
                'Gidayū - Narrativa musical para bunraku',
                'Jiuta - Canções regionais'
            ],
            curiosidades: [
                'O shamisen tornou-se extremamente popular nas áreas urbanas.',
                'O kabuki desenvolveu seu próprio estilo musical característico.',
                'Muitos mestres cegos se tornaram virtuosos do shakuhachi.'
            ]
        },
        'meiji': {
            nome: 'Período Meiji',
            anos: '1868-1912',
            descricao: 'Era de modernização e abertura ao Ocidente, fusão de tradições musicais japonesas e ocidentais.',
            imagem: '🌅',
            cor: 'from-blue-600 to-cyan-600',
            compositores: [
                {
                    id: 3,
                    nome: 'Yamada Kōtō',
                    anos: '1757-1817',
                    descricao: 'Fundador da escola Yamada de koto.',
                    obras: ['Fuji', 'Yuki'],
                    avatar: '🗻'
                }
            ],
            instrumentos: [
                { nome: 'Koto Ocidentalizado', icone: '🎵', descricao: 'Koto adaptado com mais cordas' },
                { nome: 'Piano', icone: '🎹', descricao: 'Introduzido do Ocidente' },
                { nome: 'Violino', icone: '🎻', descricao: 'Adotado na música tradicional' }
            ],
            estilos: [
                'Shin Nihon Ongaku - Nova Música Japonesa',
                'Gunka - Canções militares',
                'Shōka - Canções escolares'
            ],
            curiosidades: [
                'O governo Meiji incentivou a educação musical ocidental.',
                'Surgiram as primeiras orquestras sinfônicas no Japão.',
                'Compositores começaram a combinar escalas japonesas com harmonia ocidental.'
            ]
        }
    };

    return periodos[periodo] || null;
};

export default function HistoriaPeriodoPage() {
    const params = useParams();
    const router = useRouter();
    const periodo = getPeriodoData(params.periodo as string);

    if (!periodo) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Período não encontrado</h1>
                    <button
                        onClick={() => router.push('/alunos/historia')}
                        className="text-red-600 hover:text-red-700"
                    >
                        Voltar para história
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Hero Header */}
            <div className="relative">
                <button
                    onClick={() => router.push('/alunos/historia')}
                    className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-lg transition-colors shadow-lg z-10"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-gradient-to-r ${periodo.cor} rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden`}
                >
                    <div className="absolute top-0 right-0 opacity-10 text-9xl">
                        {periodo.imagem}
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="w-6 h-6" />
                            <span className="text-white/90 font-bold text-lg">{periodo.anos}</span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-black mb-4">{periodo.nome}</h1>
                        <p className="text-white/90 text-xl md:text-2xl max-w-3xl leading-relaxed">
                            {periodo.descricao}
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna Principal */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Compositores */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                            <User className="w-8 h-8 text-red-600" />
                            Compositores Notáveis
                        </h2>
                        <div className="space-y-4">
                            {periodo.compositores.map((compositor: any) => (
                                <div
                                    key={compositor.id}
                                    className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-red-200 transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="text-5xl">{compositor.avatar}</div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900">{compositor.nome}</h3>
                                            <p className="text-red-600 font-bold mb-3">{compositor.anos}</p>
                                            <p className="text-gray-700 mb-4">{compositor.descricao}</p>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                                                    Obras Principais
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {compositor.obras.map((obra: string, idx: number) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-bold border border-red-200"
                                                        >
                                                            {obra}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Estilos Musicais */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                            <Music className="w-8 h-8 text-red-600" />
                            Estilos Musicais
                        </h2>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                            <ul className="space-y-4">
                                {periodo.estilos.map((estilo: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                                            {idx + 1}
                                        </span>
                                        <div className="pt-1">
                                            <p className="text-gray-900 font-bold text-lg">{estilo}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Curiosidades */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                            <Sparkles className="w-8 h-8 text-yellow-500" />
                            Curiosidades
                        </h2>
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-lg border-2 border-yellow-200">
                            <ul className="space-y-4">
                                {periodo.curiosidades.map((curiosidade: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="text-yellow-500 text-xl mt-1">💡</span>
                                        <p className="text-gray-700 leading-relaxed flex-1">{curiosidade}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Coluna Lateral */}
                <div className="space-y-6">
                    {/* Linha do Tempo */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 sticky top-4"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-red-600" />
                            Linha do Tempo
                        </h3>
                        <div className="flex items-center justify-center py-8">
                            <div className="text-center">
                                <div className="text-6xl mb-4">{periodo.imagem}</div>
                                <p className="text-3xl font-black text-gray-900 mb-2">{periodo.anos}</p>
                                <p className="text-gray-600 font-bold">{periodo.nome}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Instrumentos da Época */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Music className="w-5 h-5 text-red-600" />
                            Instrumentos
                        </h3>
                        <div className="space-y-3">
                            {periodo.instrumentos.map((instrumento: any, idx: number) => (
                                <div
                                    key={idx}
                                    className="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-2xl">{instrumento.icone}</span>
                                        <h4 className="font-bold text-gray-900">{instrumento.nome}</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">{instrumento.descricao}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Navegação */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4">🗺️ Explorar Mais</h3>
                        <button
                            onClick={() => router.push('/alunos/historia')}
                            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 px-4 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all shadow-lg"
                        >
                            Ver Todos os Períodos
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
