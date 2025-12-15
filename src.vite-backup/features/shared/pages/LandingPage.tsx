/**
 * 🎌 LANDING PAGE - NIPO SCHOOL
 * 
 * Filosofia Alpha + Método Suzuki + Design Oriental
 * Kaizen (改善) | Wabi-Sabi (侘寂) | Zen (禅)
 * 
 * CONCEITO: Portal Torii Fixo - Paisagem fixa + Conteúdo rolando DENTRO do portal
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Music, 
  Users, 
  Trophy, 
  BookOpen, 
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Play,
  Award,
  TrendingUp,
  Zap,
  Heart,
  Target,
  Smile,
  ChevronDown,
  Brain
} from 'lucide-react'

export const LandingPage: React.FC = () => {
  const [scrollLocked, setScrollLocked] = useState(true)

  // Lock/unlock scroll
  useEffect(() => {
    if (scrollLocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [scrollLocked])

  // Unlock on click or scroll attempt
  useEffect(() => {
    const handleUnlock = () => {
      setScrollLocked(false)
    }

    const handleWheel = (e: WheelEvent) => {
      if (scrollLocked) {
        e.preventDefault()
        handleUnlock()
      }
    }

    window.addEventListener('click', handleUnlock, { once: true })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleUnlock, { once: true })

    return () => {
      window.removeEventListener('click', handleUnlock)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleUnlock)
    }
  }, [scrollLocked])

  return (
    <div className="relative overflow-hidden min-h-screen">

      {/* ============================================
          CAMADA 1: PAISAGEM JAPONESA FIXA (z-0)
          ============================================ */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/paisagem.png" 
          alt="Paisagem Japonesa" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
      </div>

      {/* ============================================
          CAMADA 1.5: MONTE FUJI + PADRÕES (z-5)
          ============================================ */}
      <div className="fixed inset-0 z-5 pointer-events-none">
        {/* Monte Fuji Silhueta */}
        <svg className="absolute bottom-0 left-0 w-full h-[60%] opacity-20" viewBox="0 0 1920 600" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="fuji-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#7c2d12', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M 0 600 L 0 400 Q 400 200, 600 300 Q 800 200, 960 100 Q 1120 200, 1320 300 Q 1520 200, 1920 400 L 1920 600 Z" fill="url(#fuji-gradient)" />
        </svg>

        {/* Padrão Seigaiha (ondas) no canto inferior */}
        <svg className="absolute bottom-0 left-0 w-full h-40 opacity-5" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <pattern id="seigaiha-pattern" x="0" y="0" width="100" height="60" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="60" r="40" fill="none" stroke="#dc2626" strokeWidth="2"/>
              <circle cx="50" cy="60" r="30" fill="none" stroke="#dc2626" strokeWidth="2"/>
              <circle cx="50" cy="60" r="20" fill="none" stroke="#dc2626" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="1200" height="120" fill="url(#seigaiha-pattern)"/>
        </svg>

        {/* Sol Hinomaru */}
        <div className="absolute top-[15%] right-[20%] w-32 h-32 rounded-full bg-gradient-radial from-red-500/30 to-transparent blur-2xl animate-pulse-zen"></div>
      </div>

      {/* ============================================
          CAMADA 1.7: FLORES DE CEREJEIRA FLUTUANTES (z-8)
          ============================================ */}
      <div className="fixed inset-0 z-8 pointer-events-none overflow-hidden">
        {/* Pétalas caindo */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-pink-300 rounded-full opacity-40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}

        {/* Flores de cerejeira laterais - Esquerda */}
        <svg className="absolute top-[20%] left-[5%] w-32 h-32 opacity-30 animate-float" style={{ animationDelay: '0s' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="8" fill="#ec4899"/>
          <circle cx="40" cy="35" r="10" fill="#f9a8d4"/>
          <circle cx="60" cy="35" r="10" fill="#f9a8d4"/>
          <circle cx="35" cy="55" r="10" fill="#f9a8d4"/>
          <circle cx="65" cy="55" r="10" fill="#f9a8d4"/>
        </svg>

        <svg className="absolute top-[40%] left-[8%] w-24 h-24 opacity-25 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="8" fill="#ec4899"/>
          <circle cx="40" cy="35" r="10" fill="#f9a8d4"/>
          <circle cx="60" cy="35" r="10" fill="#f9a8d4"/>
          <circle cx="35" cy="55" r="10" fill="#f9a8d4"/>
          <circle cx="65" cy="55" r="10" fill="#f9a8d4"/>
        </svg>

        {/* Flores de cerejeira laterais - Direita */}
        <svg className="absolute top-[25%] right-[5%] w-28 h-28 opacity-30 animate-float" style={{ animationDelay: '0.5s' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="8" fill="#ec4899"/>
          <circle cx="40" cy="35" r="10" fill="#f9a8d4"/>
          <circle cx="60" cy="35" r="10" fill="#f9a8d4"/>
          <circle cx="35" cy="55" r="10" fill="#f9a8d4"/>
          <circle cx="65" cy="55" r="10" fill="#f9a8d4"/>
        </svg>

        <svg className="absolute top-[45%] right-[7%] w-20 h-20 opacity-25 animate-float" style={{ animationDelay: '1.5s' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="8" fill="#ec4899"/>
          <circle cx="40" cy="35" r="10" fill="#f9a8d4"/>
          <circle cx="60" cy="35" r="10" fill="#f9a8d4"/>
          <circle cx="35" cy="55" r="10" fill="#f9a8d4"/>
          <circle cx="65" cy="55" r="10" fill="#f9a8d4"/>
        </svg>

        {/* Galhos de cerejeira */}
        <svg className="absolute top-0 left-0 w-64 h-64 opacity-20" viewBox="0 0 200 200">
          <path d="M 10 10 Q 50 50, 80 100 T 150 190" stroke="#7c2d12" strokeWidth="3" fill="none" opacity="0.5"/>
          <circle cx="60" cy="70" r="6" fill="#f9a8d4"/>
          <circle cx="90" cy="110" r="6" fill="#f9a8d4"/>
          <circle cx="120" cy="150" r="6" fill="#f9a8d4"/>
        </svg>

        <svg className="absolute top-0 right-0 w-64 h-64 opacity-20 scale-x-[-1]" viewBox="0 0 200 200">
          <path d="M 10 10 Q 50 50, 80 100 T 150 190" stroke="#7c2d12" strokeWidth="3" fill="none" opacity="0.5"/>
          <circle cx="60" cy="70" r="6" fill="#f9a8d4"/>
          <circle cx="90" cy="110" r="6" fill="#f9a8d4"/>
          <circle cx="120" cy="150" r="6" fill="#f9a8d4"/>
        </svg>
      </div>

      {/* ============================================
          CAMADA 2: TORII COMO MOLDURA FIXA (z-40)
          ============================================ */}
      <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="opacity-100">
          <defs>
            <linearGradient id="torii-frame-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#b91c1c', stopOpacity: 0.95 }} />
              <stop offset="100%" style={{ stopColor: '#991b1b', stopOpacity: 0.9 }} />
            </linearGradient>
            <filter id="torii-frame-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="torii-wood-texture" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#7c2d12', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#7c2d12', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Pilar esquerdo */}
          <rect x="50" y="100" width="150" height="980" 
                fill="url(#torii-wood-texture)" 
                filter="url(#torii-frame-glow)" 
                stroke="#7c2d12" 
                strokeWidth="4"/>
          <rect x="60" y="110" width="130" height="960" 
                fill="none" 
                stroke="#fbbf24" 
                strokeWidth="2" 
                opacity="0.3"/>

          {/* Pilar direito */}
          <rect x="1720" y="100" width="150" height="980" 
                fill="url(#torii-wood-texture)" 
                filter="url(#torii-frame-glow)" 
                stroke="#7c2d12" 
                strokeWidth="4"/>
          <rect x="1730" y="110" width="130" height="960" 
                fill="none" 
                stroke="#fbbf24" 
                strokeWidth="2" 
                opacity="0.3"/>

          {/* Kasagi - Trave superior curvada */}
          <path
            d="M 0 80 Q 960 50 1920 80 L 1920 140 Q 960 110 0 140 Z"
            fill="url(#torii-frame-gradient)"
            filter="url(#torii-frame-glow)"
            stroke="#7c2d12"
            strokeWidth="3"
          />

          {/* Nuki - Trave horizontal central */}
          <rect x="30" y="240" width="1860" height="100" 
                fill="url(#torii-wood-texture)" 
                filter="url(#torii-frame-glow)" 
                stroke="#7c2d12" 
                strokeWidth="3"
                rx="10"/>

          {/* Ornamentos dourados */}
          <circle cx="100" cy="290" r="20" fill="#fbbf24" opacity="0.6"/>
          <circle cx="1820" cy="290" r="20" fill="#fbbf24" opacity="0.6"/>
        </svg>
      </div>

      {/* ============================================
          LOGO E BOTÕES NA FAIXA NUKI (z-50)
          Posicionados sobre a faixa vermelha horizontal
          ============================================ */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none" style={{ height: '340px' }}>
        <div className="absolute left-[280px] flex items-center gap-3 pointer-events-auto" style={{ top: '181px' }}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="/logo-icon.svg" 
                alt="Nipo School" 
                className="w-12 h-12 transform group-hover:scale-110 transition-transform drop-shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white drop-shadow-lg tracking-tight">Nipo School</span>
              <span className="text-xs text-white/95 drop-shadow-md font-medium">Alpha Method</span>
            </div>
          </Link>
        </div>

        {/* Botões de acesso */}
        <div className="absolute right-[280px] flex items-center gap-3 pointer-events-auto" style={{ top: '181px' }}>
          <Link to="/login">
            <button className="group relative px-8 py-3.5 bg-white text-gray-900 font-bold rounded-full overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Entrar</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </Link>
          <Link to="/signup">
            <button className="group relative px-8 py-3.5 bg-gradient-to-r from-orange-500 via-red-600 to-red-700 text-white font-bold rounded-full overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                Começar Agora
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </Link>
        </div>
      </div>

      {/* ============================================
          CAMADA 3: CONTEÚDO ROLÁVEL (z-10)
          px-[250px] respeita os pilares laterais do Torii
          pt-[420px] empurra conteúdo para baixo do Kasagi + Nuki
          Fundo branco semitransparente para legibilidade
          
          CONTROLE DE OPACIDADE:
          bg-white/30 = 30% branco (muito translúcido, paisagem bem visível)
          bg-white/50 = 50% branco (translúcido médio)
          bg-white/70 = 70% branco (menos translúcido)
          bg-white/85 = 85% branco (atual - pouco translúcido)
          ============================================ */}
      <div className="relative z-10 px-[250px] pt-[420px] pb-20 bg-white/40 backdrop-blur-sm">

        {/* ==========================================
            HERO SECTION
            ========================================== */}
        <section className="relative min-h-screen flex items-center justify-center">

          {/* Conteúdo principal */}
          <div className="relative max-w-7xl mx-auto px-8">
            <div className="text-center max-w-4xl mx-auto">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/90 backdrop-blur-sm border border-red-700 mb-8">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium text-white">Método Revolucionário Alpha + Suzuki</span>
              </div>

              {/* Headline */}
              <h1 className="text-7xl md:text-8xl font-bold mb-6 text-gray-900">
                Desperte o Músico
                <span className="block text-6xl md:text-7xl mt-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
                  que Habita em Você
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-800 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Aprenda música de forma natural, como aprendeu a falar.  
                <span className="block mt-2 text-gray-700">Filosofia Zen + Neurociência + Alegria</span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link to="/auth/signup" className="group">
                  <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 flex items-center gap-2 hover:gap-3">
                    Começar Jornada Musical
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button className="px-8 py-4 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-900 rounded-full text-lg font-semibold hover:bg-white transition-all duration-300">
                  Ver Como Funciona
                </button>
              </div>

              {/* Dashboard Preview */}
              <div className="relative max-w-5xl mx-auto">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 via-orange-500/20 to-red-600/20 rounded-3xl blur-3xl"></div>
                
                {/* Main card */}
                <div className="relative bg-white backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  {/* Header bar */}
                  <div className="bg-gradient-to-r from-red-600 to-orange-500 p-4 flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-white/30"></div>
                      <div className="w-3 h-3 rounded-full bg-white/30"></div>
                      <div className="w-3 h-3 rounded-full bg-white/30"></div>
                    </div>
                    <div className="flex-1 text-center text-white/90 text-sm font-medium">
                      Dashboard Alpha Method
                    </div>
                  </div>

                  {/* Content preview */}
                  <div className="p-8 bg-gradient-to-b from-gray-50 to-white">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <Music className="w-10 h-10 text-red-600 mb-3" />
                        <div className="text-sm text-gray-500 mb-1">Próxima Aula</div>
                        <div className="font-semibold text-gray-900">Ritmo Básico</div>
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <Trophy className="w-10 h-10 text-orange-500 mb-3" />
                        <div className="text-sm text-gray-500 mb-1">Sequência</div>
                        <div className="font-semibold text-gray-900">7 dias</div>
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <Target className="w-10 h-10 text-red-500 mb-3" />
                        <div className="text-sm text-gray-500 mb-1">Progresso</div>
                        <div className="font-semibold text-gray-900">73%</div>
                      </div>
                    </div>

                    <div className="mt-6 bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-100">
                      <div className="flex items-start gap-4">
                        <Zap className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Desafio semanal</div>
                          <div className="text-sm text-gray-600">Pratique 15 min por dia e desbloqueie novo instrumento!</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==========================================
            8 PILARES ALPHA METHOD
            ========================================== */}
        <section className="relative py-32">

          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-red-50 rounded-full mb-4">
                <span className="text-red-600 font-semibold text-sm">🎌 FILOSOFIA ALPHA</span>
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Os 8 Pilares da Transformação
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cada pilar representa um aspecto fundamental da jornada musical
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Music, title: 'Ouvir', desc: 'Treino auditivo profundo', color: 'red' },
                { icon: Users, title: 'Repetir', desc: 'Prática intencional', color: 'orange' },
                { icon: Heart, title: 'Sentir', desc: 'Conexão emocional', color: 'pink' },
                { icon: Brain, title: 'Pensar', desc: 'Compreensão musical', color: 'purple' },
                { icon: Play, title: 'Tocar', desc: 'Expressão criativa', color: 'blue' },
                { icon: BookOpen, title: 'Ler', desc: 'Notação e teoria', color: 'green' },
                { icon: Award, title: 'Criar', desc: 'Composição original', color: 'yellow' },
                { icon: Sparkles, title: 'Integrar', desc: 'Maestria holística', color: 'indigo' },
              ].map((pilar, idx) => (
                <div 
                  key={idx}
                  className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-2"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${pilar.color}-500 to-${pilar.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <pilar.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pilar.title}</h3>
                  <p className="text-gray-600">{pilar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            FEATURES SECTION
            ========================================== */}
        <section className="relative py-32 bg-gradient-to-b from-gray-50 to-white rounded-3xl">

          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Tecnologia que Respeita a Natureza
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ferramentas modernas integradas com sabedoria ancestral
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: 'Progressão Adaptativa',
                  desc: 'IA que entende seu ritmo único de aprendizado'
                },
                {
                  icon: Trophy,
                  title: 'Gamificação Zen',
                  desc: 'Motivação sem ansiedade, celebração sem competição'
                },
                {
                  icon: Users,
                  title: 'Comunidade Colaborativa',
                  desc: 'Aprenda junto, cresça junto, celebre junto'
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <feature.icon className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            BENEFITS SECTION
            ========================================== */}
        <section className="relative py-32">

          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Transformação Além da Música
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Benefícios que transcendem o instrumento
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Brain, title: 'Desenvolvimento Cognitivo', desc: 'Fortalece memória, foco e criatividade' },
                { icon: Heart, title: 'Bem-estar Emocional', desc: 'Reduz stress, aumenta autoestima' },
                { icon: Users, title: 'Conexão Social', desc: 'Constrói laços através da música' },
                { icon: Sparkles, title: 'Realização Pessoal', desc: 'Conquiste sonhos musicais' }
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-6 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            TESTIMONIALS
            ========================================== */}
        <section className="relative py-32 bg-gradient-to-br from-red-50 via-orange-50 to-red-50 rounded-3xl">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Histórias de Transformação
              </h2>
              <p className="text-xl text-gray-600">
                Vidas mudadas através da música
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Ana Silva', role: 'Iniciante', text: 'Nunca imaginei que aprenderia piano tão naturalmente!' },
                { name: 'Pedro Santos', role: 'Pai', text: 'Minha filha de 5 anos está florescendo musicalmente' },
                { name: 'Maria Costa', role: 'Professora', text: 'Método revolucionário, resultados incríveis' }
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            FINAL CTA
            ========================================== */}
        <section className="relative py-32">
          <div className="max-w-4xl mx-auto text-center px-8">
            <h2 className="text-6xl font-bold text-gray-900 mb-6">
              Pronto para Começar?
            </h2>
            <p className="text-2xl text-gray-600 mb-12">
              Sua jornada musical começa agora
            </p>
            <Link to="/auth/signup">
              <button className="px-12 py-5 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xl font-bold rounded-full hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 group flex items-center gap-3 mx-auto">
                Iniciar Transformação Musical
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        </section>

      </div>
      {/* FIM: Camada de Conteúdo Rolável */}

    </div>
    // FIM: Container principal
  )
}

export default LandingPage
