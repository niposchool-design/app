import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { supabase } from '../../../lib/supabase/client'

interface Stats {
  total_aulas: number
  total_alunos: number
  total_conteudos: number
  media_avaliacoes: number
  aulas_mes_atual: number
  crescimento_alunos: number
}

interface AulaEngajamento {
  titulo: string
  presencas: number
  total_alunos: number
  percentual: number
}

interface ConteudoPerformance {
  titulo: string
  visualizacoes: number
  downloads: number
  rating: number
}

export function EstatisticasPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<Stats>({
    total_aulas: 0,
    total_alunos: 0,
    total_conteudos: 0,
    media_avaliacoes: 0,
    aulas_mes_atual: 0,
    crescimento_alunos: 0
  })
  const [aulasEngajamento, setAulasEngajamento] = useState<AulaEngajamento[]>([])
  const [conteudosTop, setConteudosTop] = useState<ConteudoPerformance[]>([])
  const [loading, setLoading] = useState(true)
  const [periodo, setPeriodo] = useState<'mes' | 'trimestre' | 'ano'>('mes')

  useEffect(() => {
    loadStats()
  }, [periodo])

  const loadStats = async () => {
    try {
      setLoading(true)

      // Mock data - substituir por queries reais quando tabelas existirem
      const mockStats: Stats = {
        total_aulas: 24,
        total_alunos: 45,
        total_conteudos: 12,
        media_avaliacoes: 4.7,
        aulas_mes_atual: 8,
        crescimento_alunos: 12.5
      }

      const mockAulas: AulaEngajamento[] = [
        { titulo: 'Ritmo Básico', presencas: 42, total_alunos: 45, percentual: 93.3 },
        { titulo: 'Melodia Introdutória', presencas: 38, total_alunos: 45, percentual: 84.4 },
        { titulo: 'Harmonia Simples', presencas: 35, total_alunos: 45, percentual: 77.8 },
        { titulo: 'Prática de Conjunto', presencas: 40, total_alunos: 45, percentual: 88.9 },
        { titulo: 'Instrumentos Orff', presencas: 44, total_alunos: 45, percentual: 97.8 }
      ]

      const mockConteudos: ConteudoPerformance[] = [
        { titulo: 'Plano de Aula - Ritmo', visualizacoes: 127, downloads: 45, rating: 4.8 },
        { titulo: 'Exercícios de Melodia', visualizacoes: 98, downloads: 32, rating: 4.6 },
        { titulo: 'Jogos Musicais', visualizacoes: 156, downloads: 67, rating: 4.9 },
        { titulo: 'Partituras Iniciantes', visualizacoes: 88, downloads: 28, rating: 4.5 },
        { titulo: 'Teoria Musical Básica', visualizacoes: 112, downloads: 41, rating: 4.7 }
      ]

      setStats(mockStats)
      setAulasEngajamento(mockAulas)
      setConteudosTop(mockConteudos)
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando estatísticas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Estatísticas do Professor</h1>
          <p className="text-gray-600">Acompanhe seu desempenho e engajamento</p>
        </div>

        {/* Filtro de Período */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Período de análise
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setPeriodo('mes')}
                className={`px-4 py-2 rounded-lg transition ${
                  periodo === 'mes'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Último mês
              </button>
              <button
                onClick={() => setPeriodo('trimestre')}
                className={`px-4 py-2 rounded-lg transition ${
                  periodo === 'trimestre'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Último trimestre
              </button>
              <button
                onClick={() => setPeriodo('ano')}
                className={`px-4 py-2 rounded-lg transition ${
                  periodo === 'ano'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Último ano
              </button>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🎓</span>
              <span className="text-sm text-green-600 font-semibold">
                +{stats.crescimento_alunos}%
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.total_alunos}</p>
            <p className="text-sm text-gray-600">Alunos Atendidos</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">📚</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.total_aulas}</p>
            <p className="text-sm text-gray-600">Aulas Ministradas</p>
            <p className="text-xs text-gray-500 mt-1">
              {stats.aulas_mes_atual} este mês
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">📄</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.total_conteudos}</p>
            <p className="text-sm text-gray-600">Conteúdos Criados</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">⭐</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {stats.media_avaliacoes.toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">Avaliação Média</p>
          </div>
        </div>

        {/* Gráficos e Tabelas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engajamento das Aulas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📈 Engajamento por Aula
            </h2>
            <div className="space-y-4">
              {aulasEngajamento.map((aula, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{aula.titulo}</span>
                    <span className="text-sm font-bold text-gray-800">
                      {aula.percentual.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all"
                      style={{ width: `${aula.percentual}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {aula.presencas}/{aula.total_alunos} alunos presentes
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance dos Conteúdos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              🏆 Top Conteúdos
            </h2>
            <div className="space-y-4">
              {conteudosTop.map((conteudo, index) => (
                <div key={index} className="border-b border-gray-200 pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-orange-600">#{index + 1}</span>
                      <span className="font-medium text-gray-800">{conteudo.titulo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold text-sm">{conteudo.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <span>👁️</span>
                      <span>{conteudo.visualizacoes} views</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <span>📥</span>
                      <span>{conteudo.downloads} downloads</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights e Recomendações */}
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">💡 Insights</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-green-800">Excelente engajamento!</p>
                  <p className="text-sm text-gray-600">
                    Suas aulas têm uma média de presença de 88.4%, acima da média geral de 75%.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-semibold text-blue-800">Crescimento consistente</p>
                  <p className="text-sm text-gray-600">
                    Você ganhou {stats.crescimento_alunos}% mais alunos este período. Continue assim!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-semibold text-orange-800">Oportunidade</p>
                  <p className="text-sm text-gray-600">
                    Seus conteúdos sobre "Jogos Musicais" têm alta performance. Considere criar mais materiais similares.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EstatisticasPage
