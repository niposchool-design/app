// 🎯 DESAFIOS LIST PAGE - NIPO SCHOOL
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Target, Filter, Trophy, Clock } from 'lucide-react'
import { OrientalContainer } from '../../../components/oriental/OrientalContainer'
import { NipoCard } from '../../../components/ui/NipoCard'
import { DesafioCard } from '../components/DesafioCard'
import { useDesafios } from '../hooks/useDesafios'
import { useAuth } from '../../../contexts/AuthContext'

console.log('🚀 ARQUIVO DesafiosListPage.tsx FOI CARREGADO!')

export const DesafiosListPage = () => {
  console.log('🎯 COMPONENTE DesafiosListPage COMEÇOU A RENDERIZAR!')
  
  const navigate = useNavigate()
  const { user } = useAuth()
  const { desafios, loading, buscarDesafios, obterEstatisticas } = useDesafios(user?.id)
  const [dificuldadeFiltro, setDificuldadeFiltro] = useState<string | undefined>()
  const [stats, setStats] = useState({ submetidos: 0, aprovados: 0, pontosGanhos: 0 })

  // 🔍 DEBUG
  console.log('🎯 DesafiosListPage RENDERIZOU', {
    userId: user?.id,
    userEmail: user?.email,
    totalDesafios: desafios.length,
    loading
  })

  useEffect(() => {
    console.log('🔄 useEffect chamado - buscando desafios', { dificuldadeFiltro, userId: user?.id })
    buscarDesafios(dificuldadeFiltro)
    if (user?.id) {
      obterEstatisticas().then(setStats)
    }
  }, [dificuldadeFiltro, user?.id])

  return (
    <OrientalContainer title="Desafios" icon={Target}>
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <NipoCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Desafios Submetidos</p>
              <p className="text-2xl font-bold text-[#8B4513]">{stats.submetidos}</p>
            </div>
            <Trophy className="text-yellow-600" size={32} />
          </div>
        </NipoCard>
        <NipoCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aprovados</p>
              <p className="text-2xl font-bold text-green-600">{stats.aprovados}</p>
            </div>
            <Target className="text-green-600" size={32} />
          </div>
        </NipoCard>
        <NipoCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pontos Ganhos</p>
              <p className="text-2xl font-bold text-purple-600">{stats.pontosGanhos}</p>
            </div>
            <Trophy className="text-purple-600" size={32} />
          </div>
        </NipoCard>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setDificuldadeFiltro(undefined)}
          className={`px-4 py-2 rounded-lg ${!dificuldadeFiltro ? 'bg-[#8B4513] text-white' : 'bg-gray-200'}`}
        >
          Todos
        </button>
        <button
          onClick={() => setDificuldadeFiltro('facil')}
          className={`px-4 py-2 rounded-lg ${dificuldadeFiltro === 'facil' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Fácil
        </button>
        <button
          onClick={() => setDificuldadeFiltro('medio')}
          className={`px-4 py-2 rounded-lg ${dificuldadeFiltro === 'medio' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
        >
          Médio
        </button>
        <button
          onClick={() => setDificuldadeFiltro('dificil')}
          className={`px-4 py-2 rounded-lg ${dificuldadeFiltro === 'dificil' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
        >
          Difícil
        </button>
      </div>

      {/* Lista de Desafios */}
      {loading ? (
        <div className="text-center py-8">Carregando desafios...</div>
      ) : desafios.length === 0 ? (
        <NipoCard className="p-8 text-center">
          <Clock size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Nenhum desafio disponível no momento</p>
        </NipoCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {desafios.map(desafio => (
            <DesafioCard
              key={desafio.id}
              desafio={desafio}
              onView={(id) => navigate(`/alunos/desafios/${id}`)}
            />
          ))}
        </div>
      )}
    </OrientalContainer>
  )
}

export default DesafiosListPage
