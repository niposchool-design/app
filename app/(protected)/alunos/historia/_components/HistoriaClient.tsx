'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Music, History, Sparkles, Globe, Users, Play, Heart, Share2, ChevronRight, Calendar, MapPin, Award, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoriaClientProps {
    initialPeriodos: any[];
}

export default function HistoriaClient({ initialPeriodos }: HistoriaClientProps) {
    const [activeView, setActiveView] = useState<'timeline' | 'periodos' | 'compositores'>('timeline');
    const [selectedPeriodo, setSelectedPeriodo] = useState<any>(null);
    const [timeline, setTimeline] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({ totalPeriodos: 0, totalCompositores: 0, totalObras: 0, totalGeneros: 0 });

    useEffect(() => {
        // Processamento inicial dos dados recebidos do servidor
        const periodos = initialPeriodos || [];
        const mappedTimeline = periodos.map(p => ({
            ...p, // Mantem todos os campos originais
            id: p.id,
            nome: p.nome || '',
            descricao: p.descricao || '',
            ano_inicio: p.ano_inicio || 0,
            ano_fim: p.ano_fim || null,
            compositores: p.compositores || [],
            obras: p.obras || []
        }));
        setTimeline(mappedTimeline);

        const generos = new Set(periodos.map(p => p.nome.split(' ')[0]));
        setStats({
            totalPeriodos: periodos.length,
            totalCompositores: periodos.filter(p => p.nome.toLowerCase().includes('compositor')).length || 12,
            totalObras: periodos.reduce((acc, p) => acc + (p.obras?.length || 0), 0),
            totalGeneros: generos.size,
        });
    }, [initialPeriodos]);

    const periodosPorRegiao = {
        japao: timeline.filter(p => p.nome.includes('Japão') || p.nome.includes('Heian') || p.nome.includes('Edo') || p.nome.includes('Meiji') || p.nome.includes('Shōwa') || p.nome.includes('J-Pop')),
        europa: timeline.filter(p => !p.nome.includes('Japão') && !p.nome.includes('Brasil') && !p.nome.includes('Jazz') && !p.nome.includes('MPB') && !p.nome.includes('Bossa') && !p.nome.includes('Rock') && !p.nome.includes('Heian') && !p.nome.includes('Edo') && !p.nome.includes('Meiji') && !p.nome.includes('Shōwa')),
        brasil: timeline.filter(p => p.nome.includes('Brasil') || p.nome.includes('MPB') || p.nome.includes('Bossa') || p.nome.includes('Tropicália')),
        global: timeline.filter(p => p.nome.includes('Jazz') || p.nome.includes('Rock'))
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            {/* Hero Section - Estilo TikTok */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative max-w-7xl mx-auto px-4 py-12 sm:py-16"
                >
                    <div className="text-center space-y-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full"
                        >
                            <History className="w-8 h-8" />
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">🎌 História da Música Japonesa</h1>
                        </motion.div>
                        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                            Da tradição imperial <strong>Gagaku</strong> ao moderno <strong>J-Pop</strong> - Explore 1.200 anos de rica herança musical japonesa 🎵
                        </p>
                        <p className="text-sm text-white/80 max-w-xl mx-auto">
                            + Influências da música clássica ocidental e ritmos brasileiros que enriquecem nossa compreensão cultural
                        </p>

                        {/* Stats Pills - Estilo moderno */}
                        <div className="flex flex-wrap justify-center gap-3 pt-4">
                            {[
                                { icon: Calendar, label: 'Períodos', value: stats.totalPeriodos, color: 'bg-blue-500' },
                                { icon: Users, label: 'Compositores', value: stats.totalCompositores, color: 'bg-purple-500' },
                                { icon: Music, label: 'Obras', value: stats.totalObras, color: 'bg-pink-500' },
                                { icon: Award, label: 'Gêneros', value: stats.totalGeneros, color: 'bg-orange-500' }
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`${stat.color} px-5 py-2 rounded-full flex items-center gap-2 shadow-lg`}
                                >
                                    <stat.icon className="w-4 h-4" />
                                    <span className="font-bold text-xl">{stat.value}</span>
                                    <span className="text-sm opacity-90">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Decorative wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)" fillOpacity="1" />
                    </svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                {/* View Switcher - Estilo Instagram Stories */}
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-2 border border-purple-100">
                    <div className="flex gap-2">
                        {[
                            { id: 'timeline', icon: Calendar, label: '🎌 Tradição Japonesa', color: 'red' },
                            { id: 'periodos', icon: Globe, label: 'Contexto Mundial', color: 'purple' },
                            { id: 'compositores', icon: Users, label: 'Mestres', color: 'orange' }
                        ].map((view) => (
                            <button
                                key={view.id}
                                onClick={() => setActiveView(view.id as any)}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${activeView === view.id
                                    ? `bg-gradient-to-r from-${view.color}-500 to-${view.color}-600 text-white shadow-lg scale-105`
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <view.icon className="w-5 h-5" />
                                <span className="hidden sm:inline">{view.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {/* Timeline Visual - Foco Japão */}
                    {activeView === 'timeline' && (
                        <motion.div
                            key="timeline"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <VisualTimeline periodos={periodosPorRegiao.japao} onSelectPeriodo={setSelectedPeriodo} titulo="🎌 Jornada pela Tradição Musical Japonesa" />
                        </motion.div>
                    )}

                    {/* Contexto Mundial por Região */}
                    {activeView === 'periodos' && (
                        <motion.div
                            key="periodos"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-8"
                        >
                            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-2xl mb-6 shadow-xl">
                                <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                                    🎌 Foco Principal: Tradição Japonesa
                                </h2>
                                <p className="text-white/90">
                                    Explore os períodos musicais do Japão em profundidade, desde o Gagaku imperial até o J-Pop contemporâneo.
                                    Os contextos europeu e brasileiro são apresentados para enriquecer sua compreensão cultural e mostrar influências mútuas.
                                </p>
                            </div>

                            <RegionSection titulo="🎌 Tradição Musical Japonesa" cor="red" periodos={periodosPorRegiao.japao} destaque={true} />
                            <RegionSection titulo="🇪🇺 Contexto: Música Clássica Ocidental" cor="blue" periodos={periodosPorRegiao.europa} />
                            <RegionSection titulo="🇧🇷 Contexto: Ritmos Brasileiros" cor="green" periodos={periodosPorRegiao.brasil} />
                            {periodosPorRegiao.global.length > 0 && (
                                <RegionSection titulo="🌍 Contexto: Estilos Globais" cor="purple" periodos={periodosPorRegiao.global} />
                            )}
                        </motion.div>
                    )}

                    {/* Compositores em Grid */}
                    {activeView === 'compositores' && (
                        <motion.div
                            key="compositores"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <CompositoresGrid periodos={timeline} focoJapones={true} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Modal de Detalhes do Período */}
                <AnimatePresence>
                    {selectedPeriodo && (
                        <PeriodoDetailModal periodo={selectedPeriodo} onClose={() => setSelectedPeriodo(null)} />
                    )}
                </AnimatePresence>

                {/* Curiosidades Culturais - Foco Japonês */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid md:grid-cols-3 gap-4"
                >
                    <Card className="bg-gradient-to-br from-red-500 to-pink-600 text-white border-0 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Gagaku Imperial
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-white/90">
                                A música mais antiga do Japão, tocada há mais de 1.200 anos na corte imperial com instrumentos tradicionais como o shō e biwa
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Music className="w-5 h-5" />
                                Tradição & Modernidade
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-white/90">
                                Takemitsu fusionou filosofia zen e instrumentos tradicionais com harmonias ocidentais, criando uma ponte única entre Oriente e Ocidente
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white border-0 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="w-5 h-5" />
                                J-Pop Mundial
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-white/90">
                                Do Enka nostálgico ao J-Pop vibrante - a música japonesa moderna conquista o mundo mantendo sua identidade única
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

// Timeline Visual Interativa - Estilo TikTok/Instagram
function VisualTimeline({ periodos, onSelectPeriodo, titulo }: { periodos: any[], onSelectPeriodo: (p: any) => void, titulo?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextPeriodo = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % periodos.length);
    };

    const prevPeriodo = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + periodos.length) % periodos.length);
    };

    const currentPeriodo = periodos[currentIndex];

    if (!currentPeriodo) return null;

    const colorMap: any = {
        'europa': 'from-blue-500 to-indigo-600',
        'japao': 'from-red-500 to-pink-600',
        'brasil': 'from-green-500 to-emerald-600',
        'global': 'from-purple-500 to-violet-600'
    };

    const getRegionColor = (nome: string) => {
        if (nome.includes('Japão') || nome.includes('J-Pop') || nome.includes('Heian') || nome.includes('Edo') || nome.includes('Meiji') || nome.includes('Shōwa')) return colorMap.japao;
        if (nome.includes('Brasil') || nome.includes('MPB') || nome.includes('Bossa')) return colorMap.brasil;
        if (nome.includes('Jazz') || nome.includes('Rock')) return colorMap.global;
        return colorMap.europa;
    };

    return (
        <div className="relative">
            {/* Título da Seção */}
            {titulo && (
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-black bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                        {titulo}
                    </h2>
                </div>
            )}

            {/* Progresso da Timeline */}
            <div className="mb-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Período {currentIndex + 1} de {periodos.length}</span>
                    <span>{currentPeriodo.periodo_inicio} - {currentPeriodo.periodo_fim || 'Presente'}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / periodos.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Card Principal - Estilo Full Screen Story */}
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative"
            >
                <div className={`bg-gradient-to-br ${getRegionColor(currentPeriodo.nome)} rounded-3xl p-8 text-white shadow-2xl min-h-[500px] flex flex-col`}>
                    {/* Header */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <Badge className="bg-white/20 text-white border-0 text-sm px-3 py-1">
                                    {currentPeriodo.periodo_inicio} - {currentPeriodo.periodo_fim || 'Presente'}
                                </Badge>
                                <h2 className="text-4xl font-black leading-tight">{currentPeriodo.nome}</h2>
                            </div>
                            <button
                                onClick={() => onSelectPeriodo(currentPeriodo)}
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
                            >
                                <Sparkles className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-white/90 text-lg leading-relaxed">{currentPeriodo.descricao}</p>
                    </div>

                    {/* Compositores em Pills */}
                    {currentPeriodo.compositores && currentPeriodo.compositores.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                {currentPeriodo.compositores.length} Compositores
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {currentPeriodo.compositores.slice(0, 6).map((comp: any) => (
                                    <span key={comp.id} className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                                        {comp?.nome || 'Compositor'}
                                    </span>
                                ))}
                                {currentPeriodo.compositores.length > 6 && (
                                    <span className="bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold">
                                        +{currentPeriodo.compositores.length - 6}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Obras Destacadas */}
                    {currentPeriodo.obras && currentPeriodo.obras.length > 0 && (
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                <Music className="w-4 h-4" />
                                Obras Icônicas
                            </h3>
                            <div className="space-y-2">
                                {currentPeriodo.obras.slice(0, 3).map((obra: any) => (
                                    <div key={obra.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 group hover:bg-white/20 transition-all cursor-pointer">
                                        <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                                            <Play className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold truncate">{obra?.titulo || 'Obra'}</p>
                                            {obra?.compositor?.nome && (
                                                <p className="text-sm text-white/70 truncate">{obra.compositor.nome}</p>
                                            )}
                                        </div>
                                        <Heart className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:fill-white transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Ações */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/20">
                        <button className="flex items-center gap-2 text-sm font-semibold hover:scale-105 transition-transform">
                            <Share2 className="w-4 h-4" />
                            Compartilhar
                        </button>
                        <button
                            onClick={() => onSelectPeriodo(currentPeriodo)}
                            className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                        >
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={prevPeriodo}
                    disabled={currentIndex === 0}
                    className="bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed p-4 rounded-full shadow-lg hover:scale-110 transition-all"
                >
                    <ChevronRight className="w-6 h-6 rotate-180 text-purple-600" />
                </button>
                <button
                    onClick={nextPeriodo}
                    disabled={currentIndex === periodos.length - 1}
                    className="bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed p-4 rounded-full shadow-lg hover:scale-110 transition-all"
                >
                    <ChevronRight className="w-6 h-6 text-purple-600" />
                </button>
            </div>

            {/* Mini Timeline Dots */}
            <div className="flex justify-center gap-1 mt-4">
                {periodos.slice(0, 15).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-purple-600' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
                {periodos.length > 15 && <span className="text-gray-400 text-xs">+{periodos.length - 15}</span>}
            </div>
        </div>
    );
}

// Cards de Região - Estilo Feed
function RegionSection({ titulo, cor, periodos, destaque }: { titulo: string, cor: string, periodos: any[], destaque?: boolean }) {
    const colorMap: any = {
        blue: { gradient: 'from-blue-500 to-indigo-600', light: 'bg-blue-50', border: 'border-blue-200' },
        red: { gradient: 'from-red-500 to-pink-600', light: 'bg-red-50', border: 'border-red-200' },
        green: { gradient: 'from-green-500 to-emerald-600', light: 'bg-green-50', border: 'border-green-200' },
        purple: { gradient: 'from-purple-500 to-violet-600', light: 'bg-purple-50', border: 'border-purple-200' }
    };

    const colors = colorMap[cor] || colorMap.blue;

    if (periodos.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            <div className={`bg-gradient-to-r ${colors.gradient} text-white px-6 py-4 rounded-2xl shadow-lg ${destaque ? 'border-4 border-yellow-400' : ''}`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black">{titulo}</h2>
                        <p className="text-white/80 text-sm">{periodos.length} períodos musicais</p>
                    </div>
                    {destaque && (
                        <div className="bg-yellow-400 text-red-700 px-4 py-2 rounded-full font-bold text-sm">
                            ⭐ FOCO PRINCIPAL
                        </div>
                    )}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {periodos.map((periodo, idx) => (
                    <motion.div
                        key={periodo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Card className={`${colors.light} ${colors.border} border-2 hover:shadow-xl hover:scale-105 transition-all cursor-pointer group`}>
                            <CardHeader>
                                <div className="flex items-start justify-between mb-2">
                                    <Badge className={`bg-gradient-to-r ${colors.gradient} text-white border-0`}>
                                        {periodo.periodo_inicio} - {periodo.periodo_fim || 'Hoje'}
                                    </Badge>
                                    <Globe className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                                </div>
                                <CardTitle className="text-xl font-bold line-clamp-2">{periodo.nome}</CardTitle>
                                <CardDescription className="line-clamp-2">{periodo.descricao}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {periodo.compositores && periodo.compositores.length > 0 && (
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {periodo.compositores.length} Compositores
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {periodo.compositores.slice(0, 3).map((comp: any) => {
                                                const sobrenome = comp?.nome?.split(' ').pop() || comp?.nome || 'Compositor';
                                                return (
                                                    <span key={comp.id} className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-700">
                                                        {sobrenome}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {periodo.obras && periodo.obras.length > 0 && (
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                                            <Music className="w-3 h-3" />
                                            {periodo.obras.length} Obras
                                        </p>
                                        <div className="space-y-1">
                                            {periodo.obras.slice(0, 2).map((obra: any) => (
                                                <p key={obra.id} className="text-xs text-gray-600 truncate">• {obra.titulo}</p>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <Link href={`/alunos/historia/periodo/${periodo.id}`}>
                                    <Button className={`w-full bg-gradient-to-r ${colors.gradient} text-white hover:opacity-90`} size="sm">
                                        Explorar <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// Grid de Compositores - Estilo Pinterest
function CompositoresGrid({ periodos, focoJapones }: { periodos: any[], focoJapones?: boolean }) {
    const todosCompositores = periodos.flatMap(p => p.compositores || []);
    const compositoresUnicos = Array.from(new Map(todosCompositores.map(c => [c.id, c])).values());
    const [filter, setFilter] = useState<string>(focoJapones ? 'japao' : 'todos');

    const compositoresFiltrados = filter === 'todos'
        ? compositoresUnicos
        : compositoresUnicos.filter(c => {
            const periodo = periodos.find(p => p.compositores?.some((comp: any) => comp.id === c.id));
            if (filter === 'europa') return periodo && !periodo.nome.includes('Japão') && !periodo.nome.includes('Brasil');
            if (filter === 'japao') return periodo && (periodo.nome.includes('Japão') || c.pais_nascimento === 'Japão');
            if (filter === 'brasil') return periodo && (periodo.nome.includes('Brasil') || c.pais_nascimento === 'Brasil');
            return true;
        });

    const paisEmoji: any = {
        'Alemanha': '🇩🇪', 'Áustria': '🇦🇹', 'França': '🇫🇷', 'Itália': '🇮🇹', 'Rússia': '🇷🇺',
        'Polônia': '🇵🇱', 'República Tcheca': '🇨🇿', 'Noruega': '🇳🇴', 'Hungria': '🇭🇺',
        'Inglaterra': '🇬🇧', 'Japão': '🎌', 'Brasil': '🇧🇷'
    };

    return (
        <div className="space-y-6">
            {/* Banner de Foco */}
            {focoJapones && (
                <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                        🎌 Mestres da Música Japonesa
                    </h2>
                    <p className="text-white/90">
                        Conheça os compositores e artistas que moldaram a tradição musical japonesa, desde os mestres clássicos até os ícones modernos.
                        Use os filtros para explorar também influências ocidentais e brasileiras.
                    </p>
                </div>
            )}

            {/* Filtros */}
            <div className="flex flex-wrap gap-2 justify-center">
                {['japao', 'todos', 'europa', 'brasil'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-2 rounded-full font-semibold transition-all ${filter === f
                            ? f === 'japao'
                                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105'
                                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {f === 'todos' && '🌍 Todos'}
                        {f === 'europa' && '🇪🇺 Europa'}
                        {f === 'japao' && '🎌 Japão'}
                        {f === 'brasil' && '🇧🇷 Brasil'}
                    </button>
                ))}
            </div>

            {/* Grid Masonry */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {compositoresFiltrados.map((compositor: any, idx) => (
                    <motion.div
                        key={compositor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                    >
                        <Card className="hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group overflow-hidden">
                            <div className="h-40 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 relative">
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <Users className="w-16 h-16 text-white/80" />
                                </div>
                                <Badge className="absolute top-3 right-3 bg-white/90 text-gray-800 border-0">
                                    {paisEmoji[compositor?.pais_nascimento] || '🌍'} {compositor?.pais_nascimento || 'Mundial'}
                                </Badge>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-lg font-bold line-clamp-2">{compositor?.nome || 'Compositor'}</CardTitle>
                                <CardDescription className="text-sm">
                                    {compositor?.ano_nascimento || '?'} - {compositor?.ano_falecimento || 'Presente'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href={`/alunos/historia/compositor/${compositor.id}`}>
                                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white" size="sm">
                                        Ver Biografia <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Modal de Detalhes - Estilo Popup Moderno
function PeriodoDetailModal({ periodo, onClose }: { periodo: any, onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
                <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl z-10">
                    <div className="flex items-start justify-between">
                        <div>
                            <Badge className="bg-white/20 text-white border-0 mb-2">
                                {periodo.periodo_inicio} - {periodo.periodo_fim || 'Presente'}
                            </Badge>
                            <h2 className="text-3xl font-black">{periodo.nome}</h2>
                        </div>
                        <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-full transition-all">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-2">Sobre o Período</h3>
                        <p className="text-gray-700">{periodo.descricao}</p>
                    </div>

                    {periodo.compositores && periodo.compositores.length > 0 && (
                        <div>
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Compositores ({periodo.compositores.length})
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {periodo.compositores.map((comp: any) => (
                                    <div key={comp.id} className="bg-purple-50 rounded-xl p-3 flex items-center gap-3">
                                        <div className="bg-purple-200 w-10 h-10 rounded-full flex items-center justify-center font-bold text-purple-700">
                                            {comp?.nome?.charAt(0) || 'C'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold truncate">{comp?.nome || 'Compositor'}</p>
                                            <p className="text-xs text-gray-600">{comp?.pais_nascimento || 'País desconhecido'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {periodo.obras && periodo.obras.length > 0 && (
                        <div>
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <Music className="w-5 h-5" />
                                Obras Principais ({periodo.obras.length})
                            </h3>
                            <div className="space-y-2">
                                {periodo.obras.map((obra: any) => (
                                    <div key={obra.id} className="bg-pink-50 rounded-xl p-4 flex items-center gap-3 hover:bg-pink-100 transition-colors">
                                        <div className="bg-pink-200 p-3 rounded-lg">
                                            <Music className="w-5 h-5 text-pink-700" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">{obra?.titulo || 'Obra'}</p>
                                            {obra?.compositor?.nome && (
                                                <p className="text-sm text-gray-600">{obra.compositor.nome}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
