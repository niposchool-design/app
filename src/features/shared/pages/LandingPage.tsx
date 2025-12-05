/**
 * 🎌 LANDING PAGE - NIPO SCHOOL
 * 
 * Filosofia Alpha + Método Suzuki + Design Oriental
 * Kaizen (改善) | Wabi-Sabi (侘寂) | Zen (禅)
 */

import React from 'react'
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
  Smile
} from 'lucide-react'

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-white">

      {/* Hero Section - Ultra Moderno com Estética Japonesa */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-red-950 to-orange-950 pt-24">
        
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-600/30 via-transparent to-transparent"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-600/30 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-600/30 via-transparent to-transparent"></div>
        </div>

        {/* Caracteres Japoneses com Efeito Neon */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-[10%] text-9xl font-bold text-orange-500 opacity-20 animate-sakura-float" 
               style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.6), 0 0 40px rgba(251, 146, 60, 0.3)' }}>
            音
          </div>
          <div className="absolute top-60 right-[15%] text-8xl font-bold text-red-500 opacity-15 animate-sakura-float" 
               style={{ animationDelay: '0.8s', textShadow: '0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.3)' }}>
            楽
          </div>
          <div className="absolute bottom-40 left-[20%] text-[10rem] font-bold text-pink-500 opacity-10 animate-sakura-float" 
               style={{ animationDelay: '1.5s', textShadow: '0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(236, 72, 153, 0.3)' }}>
            和
          </div>
          <div className="absolute top-[30%] right-[8%] text-7xl font-bold text-orange-400 opacity-15 animate-pulse-zen">
            道
          </div>
          <div className="absolute bottom-[25%] left-[12%] text-6xl font-bold text-red-400 opacity-20 animate-bounce-slow">
            心
          </div>
        </div>

        {/* Partículas Flutuantes (Sakura Petals Simulation) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-pink-400/30 rounded-full blur-sm animate-sakura-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 7}s`
              }}
            />
          ))}
        </div>

        {/* Enso (Círculo Zen) - Símbolo de Iluminação */}
        <svg className="absolute top-20 right-[5%] w-64 h-64 opacity-20 animate-spin-slow" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="enso-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path d="M 30 100 Q 30 30, 100 30 Q 170 30, 170 100 Q 170 170, 100 170 Q 30 170, 30 100" 
                fill="none" 
                stroke="url(#enso-gradient)" 
                strokeWidth="8" 
                strokeLinecap="round"
                opacity="0.8"/>
        </svg>

        {/* Koi (Carpas) - Perseverança */}
        <svg className="absolute bottom-40 right-[10%] w-48 h-48 opacity-15 animate-float" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="koi-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#fb923c', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f87171', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          {/* Corpo do Koi */}
          <ellipse cx="100" cy="100" rx="60" ry="30" fill="url(#koi-gradient)" opacity="0.7"/>
          {/* Cauda */}
          <path d="M 40 100 Q 20 80, 10 100 Q 20 120, 40 100" fill="url(#koi-gradient)" opacity="0.6"/>
          {/* Nadadeiras */}
          <ellipse cx="90" cy="115" rx="15" ry="8" fill="url(#koi-gradient)" opacity="0.5" transform="rotate(-20 90 115)"/>
          <ellipse cx="90" cy="85" rx="15" ry="8" fill="url(#koi-gradient)" opacity="0.5" transform="rotate(20 90 85)"/>
          {/* Detalhes */}
          <circle cx="145" cy="95" r="3" fill="white" opacity="0.9"/>
          <circle cx="145" cy="95" r="1.5" fill="#1f2937"/>
        </svg>

        {/* Ondas Japonesas Modernas (Seigaiha) */}
        <svg className="absolute bottom-0 left-0 w-full h-32 opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <pattern id="seigaiha" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="100" r="48" fill="none" stroke="currentColor" strokeWidth="1" className="text-orange-500"/>
              <circle cx="50" cy="100" r="36" fill="none" stroke="currentColor" strokeWidth="1" className="text-red-500"/>
              <circle cx="50" cy="100" r="24" fill="none" stroke="currentColor" strokeWidth="1" className="text-pink-500"/>
            </pattern>
          </defs>
          <rect width="1200" height="120" fill="url(#seigaiha)"/>
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Badge Alpha com Glassmorphism */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl text-orange-300 px-8 py-4 rounded-full text-sm font-bold mb-8 border border-white/20 shadow-2xl hover:shadow-orange-500/30 transition-all animate-fade-in group hover:scale-105">
              <span className="text-3xl group-hover:scale-110 transition-transform">改善</span>
              <span className="w-px h-6 bg-orange-300/50"></span>
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-white">Kaizen | Melhoria Contínua Através da Música</span>
            </div>

            {/* Headline - 3D Text Effect */}
            <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight pb-2">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-red-300 to-pink-300 text-2xl md:text-4xl font-normal mb-6 drop-shadow-[0_0_30px_rgba(251,146,60,0.5)]">
                🌸 Método Alpha School: Onde todos podem aprender música
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-100 to-orange-300 drop-shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
                Educação Musical
              </span>
              <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 animate-gradient bg-[length:200%_auto] drop-shadow-[0_0_50px_rgba(251,146,60,0.8)] pb-2" 
                    style={{ 
                      textShadow: '0 0 80px rgba(251, 146, 60, 0.5), 0 0 120px rgba(239, 68, 68, 0.3)',
                      transform: 'perspective(1000px) rotateX(2deg)'
                    }}>
                8 Metodologias Integradas
              </span>
            </h1>
            
            {/* Subtítulo Moderno */}
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
              Integramos <span className="font-bold text-orange-400">Orff-Schulwerk</span>, 
              <span className="font-bold text-red-400"> Suzuki</span>, 
              <span className="font-bold text-pink-400"> Musical Futures</span>, 
              <span className="font-bold text-orange-400"> Kodály</span> e mais 4 metodologias.
              <br />
              <span className="text-lg text-gray-400 mt-3 block">
                Desafios semanais, peer learning, app integrado e celebração constante.
              </span>
            </p>

            {/* 3 Pilares - Neumorphism Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              
              {/* Card 1 - Glassmorphism Avançado */}
              <div className="group relative bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(251,146,60,0.3)]"
                   style={{ 
                     boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.1), 0 10px 40px rgba(0,0,0,0.3)',
                     transform: 'perspective(1000px) rotateY(0deg)'
                   }}>
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_20px_rgba(251,146,60,0.6)]">学</div>
                <div className="font-bold text-white text-lg mb-2">Aprendizagem Ativa</div>
                <div className="text-sm text-gray-300">Você protagoniza</div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Card 2 */}
              <div className="group relative bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(239,68,68,0.3)]"
                   style={{ 
                     boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.1), 0 10px 40px rgba(0,0,0,0.3)',
                     transform: 'perspective(1000px) rotateY(0deg)'
                   }}>
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]">共</div>
                <div className="font-bold text-white text-lg mb-2">Comunidade</div>
                <div className="text-sm text-gray-300">Juntos crescemos</div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Card 3 */}
              <div className="group relative bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(236,72,153,0.3)]"
                   style={{ 
                     boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.1), 0 10px 40px rgba(0,0,0,0.3)',
                     transform: 'perspective(1000px) rotateY(0deg)'
                   }}>
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]">祝</div>
                <div className="font-bold text-white text-lg mb-2">Celebração</div>
                <div className="text-sm text-gray-300">Cada conquista importa</div>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
            </div>

            {/* CTA Buttons - Holographic Style */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                to="/signup"
                className="group relative flex items-center gap-3 px-12 py-6 rounded-full font-bold text-xl shadow-2xl transform hover:scale-110 transition-all duration-500 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #ec4899 100%)',
                  boxShadow: '0 0 60px rgba(251, 146, 60, 0.6), 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                }}
              >
                <span className="relative z-10 flex items-center gap-3 text-white drop-shadow-lg">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  Iniciar Minha Jornada
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <button className="group relative flex items-center gap-3 bg-white/10 backdrop-blur-xl text-white px-12 py-6 rounded-full font-semibold text-xl border-2 border-white/20 hover:border-orange-400/50 hover:bg-white/20 hover:shadow-[0_0_40px_rgba(251,146,60,0.4)] transition-all duration-500 hover:scale-105">
                <Play className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
                Ver Como Funciona
              </button>
            </div>

            {/* Social Proof - Modern Pills */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm mb-20">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 hover:border-orange-400/50 transition-all hover:scale-105 group">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 border-2 border-gray-900 flex items-center justify-center text-white text-xs font-bold shadow-lg group-hover:scale-110 transition-transform">{i}</div>
                  ))}
                </div>
                <span className="font-semibold text-gray-200">Comunidade ativa de aprendizagem</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 hover:border-orange-400/50 transition-all hover:scale-105">
                <Trophy className="w-6 h-6 text-orange-400" />
                <span className="font-semibold text-gray-200">8 metodologias integradas</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 hover:border-pink-400/50 transition-all hover:scale-105">
                <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                <span className="font-semibold text-gray-200">Sistema 100% digital</span>
              </div>
            </div>

            {/* Hero Visual - Dashboard Preview com Wabi-Sabi */}
            <div className="relative max-w-5xl mx-auto">
              
              {/* Glow effect oriental */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl blur-3xl opacity-20 animate-pulse-zen"></div>
              
              {/* Main card com imperfeições propositais (Wabi-Sabi) */}
              <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-orange-100 overflow-hidden transform hover:scale-[1.02] transition-transform">
                
                {/* Header bar - Estilo japonês */}
                <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-white/40"></div>
                        <div className="w-3 h-3 rounded-full bg-white/60"></div>
                        <div className="w-3 h-3 rounded-full bg-white/80"></div>
                      </div>
                      <span className="text-white/90 text-sm font-bold flex items-center gap-2">
                        <span className="text-xl">🎌</span>
                        Meu Dashboard Alpha
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Target className="w-4 h-4 text-white" />
                      <span className="text-white text-xs font-semibold">Nível 5 | 350 XP</span>
                    </div>
                  </div>
                </div>
                
                {/* Content preview - Alpha Method em ação */}
                <div className="p-8 bg-gradient-to-br from-orange-50 via-white to-pink-50">
                  
                  {/* Cards de conquistas */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="group bg-white rounded-2xl p-5 shadow-sm border-2 border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div className="h-4 bg-orange-100 rounded-full mb-2 w-4/5"></div>
                      <div className="h-3 bg-orange-50 rounded-full w-3/5"></div>
                    </div>
                    <div className="group bg-white rounded-2xl p-5 shadow-sm border-2 border-red-100 hover:border-red-300 hover:shadow-lg transition-all">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div className="h-4 bg-red-100 rounded-full mb-2 w-4/5"></div>
                      <div className="h-3 bg-red-50 rounded-full w-3/5"></div>
                    </div>
                    <div className="group bg-white rounded-2xl p-5 shadow-sm border-2 border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="h-4 bg-pink-100 rounded-full mb-2 w-4/5"></div>
                      <div className="h-3 bg-pink-50 rounded-full w-3/5"></div>
                    </div>
                  </div>

                  {/* Desafio semanal (conceito Alpha) */}
                  <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-orange-200">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        🎯
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-4 bg-gradient-to-r from-orange-300 to-red-300 rounded-full w-48"></div>
                          <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">NOVO</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full w-32 mb-2"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full w-full"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full w-5/6"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full w-4/6"></div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <div className="h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl w-32"></div>
                      <div className="h-10 bg-gray-100 rounded-xl w-24"></div>
                    </div>
                  </div>

                </div>
              </div>
              
              {/* Elemento flutuante com conceito */}
              <div className="absolute -right-6 -bottom-6 bg-white rounded-2xl shadow-2xl p-4 border-2 border-pink-200 transform rotate-3 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white text-xl">
                    🎵
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-600">Peer Learning</div>
                    <div className="text-lg font-bold text-gray-900">+5 ajudas hoje</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 8 Pilares Alpha - DNA Metodológico */}
      <section className="py-24 bg-gradient-to-b from-white via-orange-50 to-white relative overflow-hidden">
        
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-10 right-10 text-9xl text-orange-200">八</div>
          <div className="absolute bottom-10 left-10 text-9xl text-red-200">道</div>
        </div>

        {/* Bamboo - Flexibilidade e Resistência */}
        <svg className="absolute top-20 left-10 w-24 h-96 opacity-20" viewBox="0 0 100 400">
          <defs>
            <linearGradient id="bamboo-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#fb923c', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#f87171', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          {/* Haste principal */}
          <rect x="40" y="0" width="20" height="400" fill="url(#bamboo-gradient)" rx="10"/>
          {/* Segmentos (nós) */}
          <line x1="35" y1="80" x2="65" y2="80" stroke="#dc2626" strokeWidth="3" opacity="0.6"/>
          <line x1="35" y1="160" x2="65" y2="160" stroke="#dc2626" strokeWidth="3" opacity="0.6"/>
          <line x1="35" y1="240" x2="65" y2="240" stroke="#dc2626" strokeWidth="3" opacity="0.6"/>
          <line x1="35" y1="320" x2="65" y2="320" stroke="#dc2626" strokeWidth="3" opacity="0.6"/>
          {/* Folhas */}
          <ellipse cx="25" cy="40" rx="15" ry="5" fill="#fb923c" opacity="0.5" transform="rotate(-45 25 40)"/>
          <ellipse cx="75" cy="120" rx="15" ry="5" fill="#f87171" opacity="0.5" transform="rotate(45 75 120)"/>
          <ellipse cx="20" cy="200" rx="15" ry="5" fill="#ec4899" opacity="0.5" transform="rotate(-45 20 200)"/>
          <ellipse cx="80" cy="280" rx="15" ry="5" fill="#fb923c" opacity="0.5" transform="rotate(45 80 280)"/>
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header com caractere japonês */}
          <div className="text-center mb-16">
            <div className="inline-flex flex-col items-center gap-3 mb-6">
              <div className="text-7xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text">八</div>
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm text-orange-600 px-6 py-3 rounded-full text-sm font-bold border-2 border-orange-200 shadow-lg">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span>Os 8 Pilares que guiam sua jornada</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Método Alpha
              <span className="block text-transparent bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text mt-2">
                DNA do Nipo School
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mais que aprender música, você desenvolve <span className="font-bold text-orange-600">protagonismo</span>,{' '}
              <span className="font-bold text-red-600">colaboração</span> e{' '}
              <span className="font-bold text-pink-600">celebração constante</span>
            </p>
          </div>

          {/* Grid dos 8 Pilares */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pilar 1 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="text-2xl">🎯</div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Desafios Semanais</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Receba missões práticas toda semana. Grave, pratique, compartilhe e evolua constantemente.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-200 hover:border-red-400 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="text-2xl">🚀</div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Protagonismo Ativo</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Você lidera, sugere repertório, forma bandas. O professor é seu mentor, não o centro.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div className="text-2xl">🤝</div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Peer Learning</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Quem sabe mais, ensina. Quem está aprendendo, recebe apoio. Todos crescem juntos.
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <div className="text-2xl">📱</div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">App + Aula Presencial</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                O aprendizado não para. App conecta você à comunidade, desafios e conteúdos 24/7.
              </p>
            </div>

            {/* Pilar 5 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-200 hover:border-red-400 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  5
                </div>
                <div className="text-2xl">🎭</div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Projetos Coletivos</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Gravações, festivais, bandas, apresentações. A música ganha vida em grupo.
              </p>
            </div>

            {/* Pilar 6 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  6
                </div>
                <div className="text-2xl">👁️</div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Acompanhamento Individual</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Professor monitora sua evolução, personaliza desafios e dá feedback contínuo.
              </p>
            </div>

            {/* Pilar 7 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  7
                </div>
                <div className="text-2xl">🎉</div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Celebração & Feedback</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Toda conquista é celebrada! Mural digital, badges, eventos. Feedback sempre positivo.
              </p>
            </div>

            {/* Pilar 8 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-200 hover:border-red-400 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  8
                </div>
                <div className="text-2xl">🙏</div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Valores & Espiritualidade</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                União, respeito, disciplina, alegria. Música como caminho de crescimento humano.
              </p>
            </div>

          </div>

          {/* CTA integrado */}
          <div className="mt-16 text-center">
            <Link
              to="/signup"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all"
            >
              <span className="text-2xl">🌸</span>
              Começar Minha Jornada Alpha
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-24 bg-white relative overflow-hidden">
        
        {/* Lanternas Japonesas - Iluminação e Guia */}
        <svg className="absolute top-10 right-20 w-32 h-48 opacity-15 animate-swing" viewBox="0 0 100 150">
          <defs>
            <linearGradient id="lantern-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
            </linearGradient>
            <radialGradient id="lantern-glow">
              <stop offset="0%" style={{ stopColor: '#fef3c7', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#fed7aa', stopOpacity: 0 }} />
            </radialGradient>
          </defs>
          {/* Corda */}
          <line x1="50" y1="0" x2="50" y2="20" stroke="#78716c" strokeWidth="2"/>
          {/* Topo da lanterna */}
          <path d="M 30 20 L 50 15 L 70 20 L 65 30 L 35 30 Z" fill="#dc2626" opacity="0.8"/>
          {/* Corpo principal */}
          <ellipse cx="50" cy="35" rx="22" ry="5" fill="#dc2626" opacity="0.6"/>
          <rect x="28" y="35" width="44" height="60" fill="url(#lantern-gradient)" opacity="0.7" rx="3"/>
          {/* Brilho interno */}
          <ellipse cx="50" cy="65" rx="30" ry="40" fill="url(#lantern-glow)" opacity="0.4"/>
          {/* Detalhes horizontais */}
          <line x1="28" y1="50" x2="72" y2="50" stroke="#991b1b" strokeWidth="1" opacity="0.5"/>
          <line x1="28" y1="65" x2="72" y2="65" stroke="#991b1b" strokeWidth="1" opacity="0.5"/>
          <line x1="28" y1="80" x2="72" y2="80" stroke="#991b1b" strokeWidth="1" opacity="0.5"/>
          {/* Base */}
          <ellipse cx="50" cy="95" rx="22" ry="5" fill="#dc2626" opacity="0.6"/>
          <path d="M 35 95 L 30 105 L 50 110 L 70 105 L 65 95" fill="#991b1b" opacity="0.7"/>
          {/* Pendente */}
          <circle cx="50" cy="115" r="5" fill="#fbbf24" opacity="0.8"/>
          <line x1="50" y1="120" x2="50" y2="135" stroke="#78716c" strokeWidth="1.5"/>
          <circle cx="50" cy="138" r="3" fill="#dc2626" opacity="0.7"/>
        </svg>

        <svg className="absolute bottom-20 left-10 w-28 h-44 opacity-15 animate-swing" style={{ animationDelay: '0.5s' }} viewBox="0 0 100 150">
          <defs>
            <linearGradient id="lantern-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          {/* Corda */}
          <line x1="50" y1="0" x2="50" y2="20" stroke="#78716c" strokeWidth="2"/>
          {/* Topo */}
          <path d="M 30 20 L 50 15 L 70 20 L 65 30 L 35 30 Z" fill="#be185d" opacity="0.8"/>
          {/* Corpo */}
          <ellipse cx="50" cy="35" rx="22" ry="5" fill="#be185d" opacity="0.6"/>
          <rect x="28" y="35" width="44" height="60" fill="url(#lantern-gradient-2)" opacity="0.7" rx="3"/>
          {/* Brilho */}
          <ellipse cx="50" cy="65" rx="30" ry="40" fill="url(#lantern-glow)" opacity="0.4"/>
          {/* Detalhes */}
          <line x1="28" y1="50" x2="72" y2="50" stroke="#9f1239" strokeWidth="1" opacity="0.5"/>
          <line x1="28" y1="65" x2="72" y2="65" stroke="#9f1239" strokeWidth="1" opacity="0.5"/>
          <line x1="28" y1="80" x2="72" y2="80" stroke="#9f1239" strokeWidth="1" opacity="0.5"/>
          {/* Base */}
          <ellipse cx="50" cy="95" rx="22" ry="5" fill="#be185d" opacity="0.6"/>
          <path d="M 35 95 L 30 105 L 50 110 L 70 105 L 65 95" fill="#9f1239" opacity="0.7"/>
          {/* Pendente */}
          <circle cx="50" cy="115" r="5" fill="#fbbf24" opacity="0.8"/>
          <line x1="50" y1="120" x2="50" y2="135" stroke="#78716c" strokeWidth="1.5"/>
          <circle cx="50" cy="138" r="3" fill="#be185d" opacity="0.7"/>
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap className="w-4 h-4" />
              <span>Recursos Completos</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para
              <span className="block text-red-600 mt-1">dominar a música</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Uma plataforma completa com ferramentas profissionais para sua evolução musical
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
              <div className="relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-all hover:shadow-xl">
                <div className="w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <img src="/logo-icon.svg" alt="Instrumentos" className="w-14 h-14" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Biblioteca de Instrumentos
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Catálogo completo com história, técnicas, vídeos, áudios e progressão por níveis
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
              <div className="relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-purple-200 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  20 Módulos Curriculares
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  De Iniciação Sonora a Produção Digital: currículo completo com 4 ciclos de aprendizagem
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
              <div className="relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-green-200 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Desafios Semanais
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Missões práticas, registro no app, peer feedback e celebração constante de conquistas
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
              <div className="relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-orange-200 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  App + Aula Presencial
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Plataforma conecta teoria, prática e comunidade 24/7 com acompanhamento individualizado
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        
        {/* Enso menor - Equilíbrio */}
        <svg className="absolute top-40 left-[8%] w-40 h-40 opacity-10 animate-pulse-zen" viewBox="0 0 200 200">
          <path d="M 35 100 Q 35 35, 100 35 Q 165 35, 165 100 Q 165 165, 100 165 Q 35 165, 35 100" 
                fill="none" 
                stroke="#f97316" 
                strokeWidth="6" 
                strokeLinecap="round"
                opacity="0.7"/>
        </svg>

        {/* Koi nadando - Progresso */}
        <svg className="absolute bottom-20 left-[15%] w-32 h-32 opacity-10 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 200 200">
          <ellipse cx="100" cy="100" rx="50" ry="25" fill="#ef4444" opacity="0.6" transform="rotate(15 100 100)"/>
          <path d="M 50 100 Q 35 85, 25 100 Q 35 115, 50 100" fill="#ef4444" opacity="0.5"/>
          <ellipse cx="92" cy="110" rx="12" ry="6" fill="#ef4444" opacity="0.4" transform="rotate(-10 92 110)"/>
          <ellipse cx="92" cy="90" rx="12" ry="6" fill="#ef4444" opacity="0.4" transform="rotate(10 92 90)"/>
          <circle cx="135" cy="95" r="2.5" fill="white" opacity="0.8"/>
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star className="w-4 h-4" />
                <span>Metodologia Comprovada</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Por que o Método Alpha funciona?
              </h2>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Integramos 8 metodologias pedagógicas reconhecidas mundialmente: Orff-Schulwerk, 
                Suzuki, Musical Futures, Kodály, Dalcroze, Gordon, Waldorf e Berklee.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Orff-Schulwerk + Suzuki</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Experiência precede teoria, corpo + voz + movimento, com progressão graduada e ambiente musical rico
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Peer Learning Ativo</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Quem sabe mais ensina, quem está aprendendo recebe apoio. Duplas, bandas e mentorias espontâneas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Registro Digital Semanal</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Compartilhe vídeos, fotos, conquistas e dúvidas no mural. Portfólio atualizado automaticamente
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Projetos Coletivos</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Gravações em grupo, festivais, bandas e apresentações. A música ganha vida em coletivo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Stats Card */}
            <div className="relative">
              {/* Decorative bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl transform rotate-3"></div>
              
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-10 transform -rotate-1 hover:rotate-0 transition-transform">
                
                <div className="flex items-center gap-4 mb-8 pb-8 border-b-2 border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Star className="w-8 h-8 text-white fill-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Excelência Musical</h3>
                    <p className="text-gray-600 font-medium">Resultados comprovados</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="group flex justify-between items-center p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-blue-600" />
                      <span className="text-gray-700 font-semibold">Ciclos de Aprendizagem</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-blue-600">4</span>
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>

                  <div className="group flex justify-between items-center p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3">
                      <img src="/logo-icon.svg" alt="Metodologias" className="w-6 h-6" />
                      <span className="text-gray-700 font-semibold">Metodologias</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-purple-600">8</span>
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>

                  <div className="group flex justify-between items-center p-5 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3">
                      <Star className="w-6 h-6 text-green-600" />
                      <span className="text-gray-700 font-semibold">Módulos Curriculares</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-green-600">20</span>
                      <Sparkles className="w-5 h-5 text-green-600" />
                    </div>
                  </div>

                  <div className="group flex justify-between items-center p-5 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-orange-600" />
                      <span className="text-gray-700 font-semibold">Pilares Alpha</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-orange-600">8</span>
                      <CheckCircle className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4 fill-yellow-600" />
              <span>Depoimentos</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              O que nossos alunos dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Histórias reais de transformação através da música
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-red-200 hover:shadow-xl transition-all">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "Os desafios semanais e o peer learning transformaram minha forma de estudar. 
                O app conecta tudo: teoria, prática, comunidade e feedback constante."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                <div>
                  <p className="font-bold text-gray-900">Ana Carolina</p>
                  <p className="text-sm text-gray-600">Ciclo Fundamental</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-red-200 hover:shadow-xl transition-all">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "Formar banda com meus colegas e gravar nossas músicas foi incrível! 
                Os projetos coletivos e a celebração constante mantêm a motivação alta."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"></div>
                <div>
                  <p className="font-bold text-gray-900">Rafael Mendes</p>
                  <p className="text-sm text-gray-600">Ciclo Intermediário</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-red-200 hover:shadow-xl transition-all">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "O professor monitora minha evolução pelo app e personaliza os desafios. 
                Sinto que tenho um plano feito especialmente pra mim."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                <div>
                  <p className="font-bold text-gray-900">Beatriz Oliveira</p>
                  <p className="text-sm text-gray-600">Ciclo Inicial</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-16 h-16 text-red-400 mx-auto mb-6" />
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para vivenciar o
            <span className="block text-transparent bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text mt-2">
              Método Alpha School?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Integração de 8 metodologias pedagógicas, desafios semanais, peer learning, 
            projetos coletivos e celebração constante. Tudo em uma plataforma digital completa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/signup"
              className="group bg-gradient-to-r from-red-500 to-rose-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition-all inline-flex items-center justify-center gap-3"
            >
              Criar Conta Gratuita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/login"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-3"
            >
              Já Tenho Conta
            </Link>
          </div>

          <p className="text-gray-400 text-sm">
            ✓ Sem cartão de crédito &nbsp; • &nbsp; ✓ Cancelamento gratuito &nbsp; • &nbsp; ✓ Acesso imediato
          </p>
        </div>
      </section>

    </div>
  )
}

export default LandingPage
