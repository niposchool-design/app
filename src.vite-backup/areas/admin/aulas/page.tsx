import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { supabase } from '../../../lib/supabase/client'
import { ROUTES } from '../../../lib/constants/routes'

type AulaStatus = 'planejada' | 'em_andamento' | 'concluida'

interface Aula {
  id: number
  numero: number
  titulo: string
  categoria: string
  nivel: string
  duracao: number
  responsavel: string
  data_prevista?: string
  status: AulaStatus
  created_at: string
}

export function AulasKanbanPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [aulas, setAulas] = useState<Aula[]>([])
  const [loading, setLoading] = useState(true)
  const [draggedItem, setDraggedItem] = useState<Aula | null>(null)
  const [filter, setFilter] = useState({
    nivel: '',
    responsavel: '',
    categoria: ''
  })

  useEffect(() => {
    loadAulas()
  }, [])

  const loadAulas = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('aulas')
        .select('*')
        .order('numero', { ascending: true })

      if (error) throw error

      // Mapear aulas com status baseado em alguma lógica
      const aulasComStatus = (data || []).map(aula => ({
        ...aula,
        status: determineStatus(aula) as AulaStatus
      }))

      setAulas(aulasComStatus)
    } catch (error) {
      console.error('Erro ao carregar aulas:', error)
    } finally {
      setLoading(false)
    }
  }

  const determineStatus = (aula: any): AulaStatus => {
    // Lógica simples - pode ser expandida
    if (aula.numero <= 5) return 'concluida'
    if (aula.numero <= 15) return 'em_andamento'
    return 'planejada'
  }

  const getAulasByStatus = (status: AulaStatus) => {
    return aulas.filter(aula => {
      const matchStatus = aula.status === status
      const matchNivel = !filter.nivel || aula.nivel === filter.nivel
      const matchResponsavel = !filter.responsavel || aula.responsavel === filter.responsavel
      const matchCategoria = !filter.categoria || aula.categoria === filter.categoria

      return matchStatus && matchNivel && matchResponsavel && matchCategoria
    })
  }

  const handleDragStart = (aula: Aula) => {
    setDraggedItem(aula)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (status: AulaStatus) => {
    if (!draggedItem) return

    try {
      // Atualizar status no banco (se houver campo de status)
      // Por enquanto, apenas atualizar localmente
      const updatedAulas = aulas.map(aula =>
        aula.id === draggedItem.id ? { ...aula, status } : aula
      )
      setAulas(updatedAulas)
      setDraggedItem(null)
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
    }
  }

  const columns: { status: AulaStatus; title: string; color: string }[] = [
    { status: 'planejada', title: '📋 Planejadas', color: 'bg-blue-500' },
    { status: 'em_andamento', title: '⚡ Em Andamento', color: 'bg-yellow-500' },
    { status: 'concluida', title: '✅ Concluídas', color: 'bg-green-500' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando aulas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Kanban de Aulas</h1>
            <p className="text-gray-600">Gerencie o status das aulas do curriculum</p>
          </div>
          <button
            onClick={() => navigate(ROUTES.ADMIN_AULAS)}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            📋 Ver Lista
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nível
              </label>
              <select
                value={filter.nivel}
                onChange={(e) => setFilter({ ...filter, nivel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Todos os níveis</option>
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                value={filter.categoria}
                onChange={(e) => setFilter({ ...filter, categoria: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Todas as categorias</option>
                <option value="introducao">Introdução</option>
                <option value="ritmo">Ritmo</option>
                <option value="melodia">Melodia</option>
                <option value="harmonia">Harmonia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsável
              </label>
              <select
                value={filter.responsavel}
                onChange={(e) => setFilter({ ...filter, responsavel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Todos os professores</option>
                <option value="Prof. Yamamoto">Prof. Yamamoto</option>
                <option value="Prof. Tanaka">Prof. Tanaka</option>
                <option value="Prof. Suzuki">Prof. Suzuki</option>
              </select>
            </div>
          </div>

          {(filter.nivel || filter.categoria || filter.responsavel) && (
            <button
              onClick={() => setFilter({ nivel: '', responsavel: '', categoria: '' })}
              className="mt-3 text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              🔄 Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => (
            <div
              key={column.status}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.status)}
            >
              {/* Column Header */}
              <div className={`${column.color} text-white p-4`}>
                <h3 className="font-bold text-lg">{column.title}</h3>
                <p className="text-sm opacity-90">
                  {getAulasByStatus(column.status).length} aula(s)
                </p>
              </div>

              {/* Cards Container */}
              <div className="p-4 space-y-3 min-h-[400px] max-h-[600px] overflow-y-auto">
                {getAulasByStatus(column.status).map(aula => (
                  <div
                    key={aula.id}
                    draggable
                    onDragStart={() => handleDragStart(aula)}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-move hover:shadow-lg transition transform hover:scale-105"
                  >
                    {/* Aula Card */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">
                          #{aula.numero}
                        </span>
                        <span className="text-xs text-gray-500">{aula.nivel}</span>
                      </div>
                    </div>

                    <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {aula.titulo}
                    </h4>

                    <div className="space-y-1 text-xs text-gray-600 mb-3">
                      <p>📁 {aula.categoria}</p>
                      <p>⏱️ {aula.duracao} min</p>
                      <p>👤 {aula.responsavel}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`${ROUTES.ADMIN_AULAS}/${aula.id}`)}
                        className="flex-1 text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        👁️ Ver
                      </button>
                      <button
                        onClick={() => navigate(`${ROUTES.ADMIN_AULAS}/editar/${aula.id}`)}
                        className="flex-1 text-xs px-3 py-1.5 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                      >
                        ✏️ Editar
                      </button>
                    </div>
                  </div>
                ))}

                {getAulasByStatus(column.status).length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <p className="text-3xl mb-2">📭</p>
                    <p className="text-sm">Nenhuma aula neste status</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-800">{aulas.length}</p>
              <p className="text-sm text-gray-600">Total de Aulas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {getAulasByStatus('planejada').length}
              </p>
              <p className="text-sm text-gray-600">Planejadas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {getAulasByStatus('em_andamento').length}
              </p>
              <p className="text-sm text-gray-600">Em Andamento</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {getAulasByStatus('concluida').length}
              </p>
              <p className="text-sm text-gray-600">Concluídas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AulasKanbanPage
