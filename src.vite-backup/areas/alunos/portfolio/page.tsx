// 💼 PORTFOLIO LIST PAGE - NIPO SCHOOL
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen, Plus, Filter, Search } from 'lucide-react'
import { OrientalContainer } from '../../../components/oriental/OrientalContainer'
import { NipoCard } from '../../../components/ui/NipoCard'
import { NipoButton } from '../../../components/ui/NipoButton'
import { PortfolioCard } from '../components/PortfolioCard'
import { supabase } from '../../../lib/supabase/client'
import { useAuth } from '../../../contexts/AuthContext'

export const PortfolioListPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [portfolios, setPortfolios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFiltro, setStatusFiltro] = useState<string | undefined>()

  useEffect(() => {
    buscarPortfolios()
  }, [statusFiltro, user?.id])

  const buscarPortfolios = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      let query = supabase
        .from('aluno_portfolios')
        .select('*')
        .eq('aluno_id', user.id)

      if (statusFiltro) {
        query = query.eq('status', statusFiltro)
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      
      if (error) throw error
      setPortfolios(data || [])
    } catch (err) {
      console.error('Erro ao buscar portfólios:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <OrientalContainer title="Meu Portfólio" icon={FolderOpen}>
      {/* Header com botão de criar */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Gerencie seus projetos e trabalhos acadêmicos
        </p>
        <NipoButton onClick={() => navigate('/alunos/portfolio/novo')}>
          <Plus size={20} className="mr-2" />
          Novo Portfólio
        </NipoButton>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setStatusFiltro(undefined)}
          className={`px-4 py-2 rounded-lg ${!statusFiltro ? 'bg-[#8B4513] text-white' : 'bg-gray-200'}`}
        >
          Todos
        </button>
        <button
          onClick={() => setStatusFiltro('em_andamento')}
          className={`px-4 py-2 rounded-lg ${statusFiltro === 'em_andamento' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
        >
          Em Andamento
        </button>
        <button
          onClick={() => setStatusFiltro('concluido')}
          className={`px-4 py-2 rounded-lg ${statusFiltro === 'concluido' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Concluídos
        </button>
        <button
          onClick={() => setStatusFiltro('arquivado')}
          className={`px-4 py-2 rounded-lg ${statusFiltro === 'arquivado' ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}
        >
          Arquivados
        </button>
      </div>

      {/* Lista de Portfólios */}
      {loading ? (
        <div className="text-center py-8">Carregando portfólios...</div>
      ) : portfolios.length === 0 ? (
        <NipoCard className="p-8 text-center">
          <FolderOpen size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">Você ainda não criou nenhum portfólio</p>
          <NipoButton onClick={() => navigate('/alunos/portfolio/novo')}>
            Criar Primeiro Portfólio
          </NipoButton>
        </NipoCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolios.map(portfolio => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              onClick={() => navigate(`/alunos/portfolio/${portfolio.id}`)}
            />
          ))}
        </div>
      )}
    </OrientalContainer>
  )
}


export default PortfolioListPage
