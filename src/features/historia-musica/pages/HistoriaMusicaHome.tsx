// 🎼 PÁGINA PRINCIPAL - HISTÓRIA DA MÚSICA
// ========================================
// Dashboard principal do módulo de História da Música

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Music, 
  Users, 
  Clock, 
  TrendingUp,
  Play,
  Book,
  Search,
  Star,
  Award
} from 'lucide-react'

import { useHistoriaMusica } from '../hooks/useHistoriaMusica'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import type { PeriodoHistorico, CompositorDetalhado, ObraDetalhada } from '@/services'

const HistoriaMusicaHome: React.FC = () => {
  const {
    periodos,
    compositores,
    obras,
    estatisticas,
    carregando,
    erro,
    carregarCompositores,
    carregarObras,
    carregarEstatisticas
  } = useHistoriaMusica()

  const { play, pause, status } = useAudioPlayer()
  const [periodoSelecionado, setPeriodoSelecionado] = useState<string>('')

  // ========================================
  // 🚀 EFEITOS
  // ========================================

  useEffect(() => {
    carregarEstatisticas()
    carregarCompositores({ limit: 6, nivelImportancia: 3 })
    carregarObras({ limit: 8 })
  }, [carregarEstatisticas, carregarCompositores, carregarObras])

  // ========================================
  // 🎨 RENDERIZAÇÃO DE LOADING/ERRO
  // ========================================

  if (carregando && periodos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Carregando História da Música</h3>
          <p className="text-gray-600">Preparando uma jornada musical incrível...</p>
        </div>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <div className="text-red-500 mb-4">
            <Music className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Algo deu errado</h3>
          <p className="text-gray-600 mb-4">{erro}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  // ========================================
  // 🎵 COMPONENTE PRINCIPAL
  // ========================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header Principal */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl">
                <Music className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  História da Música
                </h1>
                <p className="text-gray-600">Explore séculos de evolução musical</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/historia-musica/busca"
                className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-xl hover:bg-purple-200 transition-colors"
              >
                <Search className="h-5 w-5" />
                <span>Buscar</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas Gerais */}
        {estatisticas && (
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Períodos</p>
                    <p className="text-3xl font-bold text-purple-600">{estatisticas.totalPeriodos}</p>
                  </div>
                  <Calendar className="h-12 w-12 text-purple-400" />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Compositores</p>
                    <p className="text-3xl font-bold text-blue-600">{estatisticas.totalCompositores}</p>
                  </div>
                  <Users className="h-12 w-12 text-blue-400" />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Obras</p>
                    <p className="text-3xl font-bold text-green-600">{estatisticas.totalObras}</p>
                  </div>
                  <Music className="h-12 w-12 text-green-400" />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Eventos</p>
                    <p className="text-3xl font-bold text-orange-600">{estatisticas.eventosPrincipais}</p>
                  </div>
                  <Clock className="h-12 w-12 text-orange-400" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Períodos Históricos */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Períodos Históricos</h2>
            <Link
              to="/historia-musica/periodos"
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-2"
            >
              <span>Ver todos</span>
              <TrendingUp className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {periodos.slice(0, 6).map((periodo: PeriodoHistorico) => (
              <Link
                key={periodo.id}
                to={`/historia-musica/periodo/${periodo.id}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200"
              >
                <div 
                  className="h-48 bg-gradient-to-br"
                  style={{
                    background: `linear-gradient(135deg, ${periodo.cor_tematica || '#8B5CF6'}, ${periodo.cor_tematica || '#8B5CF6'}80)`
                  }}
                >
                  <div className="h-full flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white text-center px-4">
                      {periodo.nome}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-3">
                    {periodo.periodo_inicio} - {periodo.periodo_fim}
                  </p>
                  <p className="text-gray-700 line-clamp-3">
                    {periodo.descricao_curta}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Compositores em Destaque */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Compositores em Destaque</h2>
            <Link
              to="/historia-musica/compositores"
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-2"
            >
              <span>Ver todos</span>
              <Users className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compositores.slice(0, 6).map((compositor: CompositorDetalhado) => (
              <Link
                key={compositor.id}
                to={`/historia-musica/compositor/${compositor.id}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  {compositor.foto_url ? (
                    <img 
                      src={compositor.foto_url} 
                      alt={compositor.nome_completo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                      <Users className="h-20 w-20 text-white/80" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {compositor.nome_artistico || compositor.nome_completo}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {compositor.data_nascimento} - {compositor.data_falecimento || 'presente'}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">{compositor.nivel_importancia}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-2">{compositor.pais_nascimento}</p>
                  <p className="text-gray-700 line-clamp-2">
                    {compositor.biografia_completa || 'Biografia em construção...'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Obras Populares */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Obras Mais Populares</h2>
            <Link
              to="/historia-musica/obras"
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-2"
            >
              <span>Ver todas</span>
              <Music className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {obras.slice(0, 8).map((obra: ObraDetalhada) => (
              <div
                key={obra.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                      {obra.titulo}
                    </h3>
                    <p className="text-purple-600 text-sm font-medium">
                      {obra.compositor?.nome_completo || 'Compositor desconhecido'}
                    </p>
                  </div>
                  {obra.audio_url && (
                    <button
                      onClick={() => play(obra)}
                      className="bg-purple-100 hover:bg-purple-200 text-purple-600 p-2 rounded-full transition-colors"
                    >
                      <Play className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{obra.ano_composicao}</span>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span>{obra.popularidade || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Links de Navegação Rápida */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Explore a História da Música
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/historia-musica/timeline"
              className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <Clock className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Timeline Interativa</h3>
              <p className="text-gray-600 text-center text-sm">
                Navegue pelos marcos históricos da música
              </p>
            </Link>

            <Link
              to="/historia-musica/quiz"
              className="flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <Book className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quiz Musical</h3>
              <p className="text-gray-600 text-center text-sm">
                Teste seus conhecimentos de história musical
              </p>
            </Link>

            <Link
              to="/historia-musica/playlist"
              className="flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <Music className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Playlists Temáticas</h3>
              <p className="text-gray-600 text-center text-sm">
                Ouça coletâneas organizadas por período e estilo
              </p>
            </Link>
          </div>
        </section>
      </main>

      {/* Player de Áudio Flutuante */}
      {status.obraAtual && (
        <div className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl p-4 border border-purple-100 z-50">
          <div className="flex items-center space-x-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate text-sm">
                {status.obraAtual.titulo}
              </h4>
              <p className="text-gray-600 text-xs truncate">
                {status.obraAtual.compositor?.nome_completo}
              </p>
            </div>
            <button
              onClick={() => status.isPlaying ? pause() : play()}
              className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              <Play className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default HistoriaMusicaHome