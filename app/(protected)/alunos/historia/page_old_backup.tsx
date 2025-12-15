'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Music, History, Sparkles, Globe, Users, Play, Heart, Share2, ChevronRight, Calendar, MapPin, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function HistoriaPage() {
  const [activeView, setActiveView] = useState<'timeline' | 'periodos' | 'compositores'>('timeline');
  const [selectedPeriodo, setSelectedPeriodo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalPeriodos: 0, totalCompositores: 0, totalObras: 0, totalGeneros: 0 });

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/historia/timeline');
        const data = await response.json();
        setTimeline(data.timeline || []);
        setStats(data.stats || {});
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const periodosPorRegiao = {
    europa: timeline.filter(p => !p.nome.includes('Japão') && !p.nome.includes('Brasil') && !p.nome.includes('Jazz') && !p.nome.includes('MPB') && !p.nome.includes('Bossa') && !p.nome.includes('Rock')),
    japao: timeline.filter(p => p.nome.includes('Japão') || p.nome.includes('J-Pop')),
    brasil: timeline.filter(p => p.nome.includes('Brasil') || p.nome.includes('MPB') || p.nome.includes('Bossa') || p.nome.includes('Tropicália')),
    global: timeline.filter(p => p.nome.includes('Jazz') || p.nome.includes('Rock'))
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-purple-700 font-medium animate-pulse">Carregando história musical...</p>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">História da Música</h1>
            </motion.div>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Uma jornada épica através de <strong>1.200 anos</strong> de evolução musical 🎵
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
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)" fillOpacity="1"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* View Switcher - Estilo Instagram Stories */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-2 border border-purple-100">
          <div className="flex gap-2">
            {[
              { id: 'timeline', icon: Calendar, label: 'Timeline Visual', color: 'purple' },
              { id: 'periodos', icon: Globe, label: 'Por Região', color: 'pink' },
              { id: 'compositores', icon: Users, label: 'Compositores', color: 'orange' }
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  activeView === view.id
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
          {/* Timeline Visual Interativa */}
          {activeView === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <VisualTimeline periodos={timeline} onSelectPeriodo={setSelectedPeriodo} />
            </motion.div>
          )}

          {/* Períodos por Região */}
          {activeView === 'periodos' && (
            <motion.div
              key="periodos"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <RegionSection titulo="🇪🇺 Europa Clássica" cor="blue" periodos={periodosPorRegiao.europa} />
              <RegionSection titulo="🎌 Tradição Japonesa" cor="red" periodos={periodosPorRegiao.japao} />
              <RegionSection titulo="🇧🇷 Ritmos Brasileiros" cor="green" periodos={periodosPorRegiao.brasil} />
              {periodosPorRegiao.global.length > 0 && (
                <RegionSection titulo="🌍 Estilos Globais" cor="purple" periodos={periodosPorRegiao.global} />
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
              <CompositoresGrid periodos={timeline} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de Detalhes do Período */}
        <AnimatePresence>
          {selectedPeriodo && (
            <PeriodoDetailModal periodo={selectedPeriodo} onClose={() => setSelectedPeriodo(null)} />
          )}
        </AnimatePresence>

        {/* Curiosidades Interativas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Influências Cruzadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90">
                Takemitsu (Japão) + Debussy (França) = Ponte única entre impressionismo e tradições zen
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white border-0 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                Bossa Nova & Jazz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90">
                Tom Jobim fusionou samba com harmonias jazzísticas, revolucionando a música mundial
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// Ícones para os períodos históricos
const periodIcons = ['🏯', '🎭', '🎌', '🌸', '🎸', '🎵', '🎼'];

async function HistoriaContent() {
  // Busca timeline completa com todos os períodos, compositores e obras
  const [timeline, stats] = await Promise.all([
    getTimelineCompleta(),
    getHistoriaStats()
  ]);

  // Agrupar períodos por região
  const periodosPorRegiao = {
    europa: timeline.filter(p => !p.nome.includes('Japão') && !p.nome.includes('Brasil')),
    japao: timeline.filter(p => p.nome.includes('Japão')),
    brasil: timeline.filter(p => p.nome.includes('Brasil'))
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <History className="w-10 h-10 text-amber-600" />
          História da Música Mundial
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Uma jornada pela evolução musical através de culturas e séculos - Europa, Japão e Brasil
        </p>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-700">Períodos</CardDescription>
            <CardTitle className="text-4xl text-blue-900">{stats.totalPeriodos}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-purple-700">Compositores</CardDescription>
            <CardTitle className="text-4xl text-purple-900">{stats.totalCompositores}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-green-700">Obras</CardDescription>
            <CardTitle className="text-4xl text-green-900">{stats.totalObras}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-amber-700">Gêneros</CardDescription>
            <CardTitle className="text-4xl text-amber-900">{stats.totalGeneros}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Introdução */}
      <Card className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900">
            <Globe className="w-6 h-6" />
            Uma Viagem Musical pelo Mundo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-amber-800 leading-relaxed">
            <strong className="text-amber-900">🎼 Europa:</strong> Do canto gregoriano medieval ao rock contemporâneo, 
            a música europeia estabeleceu os fundamentos da teoria musical ocidental.
          </p>
          <p className="text-amber-800 leading-relaxed">
            <strong className="text-amber-900">🎌 Japão:</strong> Mais de mil anos de tradição, desde o gagaku da 
            corte imperial até o J-Pop que conquista o mundo.
          </p>
          <p className="text-amber-800 leading-relaxed">
            <strong className="text-amber-900">🇧🇷 Brasil:</strong> A fusão única de ritmos africanos, melodias 
            portuguesas e harmonias indígenas criou gêneros icônicos como choro, samba e bossa nova.
          </p>
        </CardContent>
      </Card>

      {/* Timeline por Região */}
      <div className="space-y-8">
        {/* Europa */}
        {periodosPorRegiao.europa.length > 0 && (
          <RegionalTimeline 
            titulo="🇪🇺 Música Europeia Clássica"
            cor="blue"
            periodos={periodosPorRegiao.europa}
          />
        )}

        {/* Japão */}
        {periodosPorRegiao.japao.length > 0 && (
          <RegionalTimeline 
            titulo="🎌 Música Japonesa"
            cor="red"
            periodos={periodosPorRegiao.japao}
          />
        )}

        {/* Brasil */}
        {periodosPorRegiao.brasil.length > 0 && (
          <RegionalTimeline 
            titulo="🇧🇷 Música Brasileira"
            cor="green"
            periodos={periodosPorRegiao.brasil}
          />
        )}
      </div>

      {/* Curiosidades Expandidas */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-900">
            <Sparkles className="w-5 h-5" />
            Conexões Musicais Globais
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-indigo-800">
          <div className="space-y-2">
            <p className="font-semibold text-indigo-900">🌍 Influências Cruzadas:</p>
            <p className="text-sm">
              O compositor japonês Takemitsu foi profundamente influenciado por Debussy, 
              criando uma ponte única entre impressionismo francês e tradições japonesas.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-indigo-900">🎵 Bossa Nova & Jazz:</p>
            <p className="text-sm">
              Tom Jobim e João Gilberto revolucionaram a música mundial ao fundir samba com 
              harmonias jazzísticas, criando a sofisticada Bossa Nova.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-indigo-900">🎼 Gagaku Milenar:</p>
            <p className="text-sm">
              O gagaku japonês (séc. VIII) é a forma de música orquestral mais antiga do mundo 
              ainda praticada, preservando tradições há mais de 1200 anos.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-indigo-900">🎸 Tropicália Revolucionária:</p>
            <p className="text-sm">
              Caetano Veloso e Gilberto Gil mesclaram rock, samba, baião e experimentalismo, 
              criando movimento cultural que transcendeu a música.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Componente para exibir períodos por região
function RegionalTimeline({ 
  titulo, 
  cor, 
  periodos 
}: { 
  titulo: string; 
  cor: 'blue' | 'red' | 'green'; 
  periodos: any[];
}) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      badge: 'bg-blue-100 text-blue-800',
      hover: 'hover:border-blue-400'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900',
      badge: 'bg-red-100 text-red-800',
      hover: 'hover:border-red-400'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-900',
      badge: 'bg-green-100 text-green-800',
      hover: 'hover:border-green-400'
    }
  };

  const colors = colorClasses[cor];

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${colors.text}`}>
        <Users className="w-6 h-6" />
        {titulo}
      </h2>
      <div className="grid gap-4">
        {periodos.map((periodo) => (
          <Card 
            key={periodo.id} 
            className={`${colors.bg} ${colors.border} ${colors.hover} transition-all hover:shadow-lg`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className={`text-xl ${colors.text}`}>
                      {periodo.nome}
                    </CardTitle>
                    <Badge className={colors.badge}>
                      {periodo.periodo_inicio}-{periodo.periodo_fim}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {periodo.descricao_curta}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    📚 Compositores: {periodo.total_compositores}
                  </p>
                  {periodo.compositores && periodo.compositores.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {periodo.compositores.slice(0, 3).map((comp: any) => (
                        <Badge key={comp.id} variant="outline" className="text-xs">
                          {comp.nome_artistico}
                        </Badge>
                      ))}
                      {periodo.compositores.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{periodo.compositores.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    🎵 Obras: {periodo.total_obras}
                  </p>
                  {periodo.obras && periodo.obras.length > 0 && (
                    <div className="space-y-1">
                      {periodo.obras.slice(0, 2).map((obra: any) => (
                        <p key={obra.id} className="text-xs text-gray-600 truncate">
                          • {obra.titulo} ({obra.ano_composicao})
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Link 
                  href={`/alunos/historia/periodo/${periodo.id}`}
                  className={`${colors.text} hover:underline font-medium text-sm flex items-center gap-1`}
                >
                  Ver detalhes <span>→</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function HistoriaPage() {
  return (
    <Suspense fallback={<div className="p-8">Carregando conteúdo...</div>}>
      <HistoriaContent />
    </Suspense>
  );
}
