import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { supabase } from '../../../lib/supabase/client'
import { ROUTES } from '../../../lib/constants/routes'

interface Aula {
  id: number
  numero: number
  titulo: string
  categoria: string
  nivel: string
  duracao: number
  responsavel: string
  descricao: string
  objetivos: string[]
  materiais: string[]
  created_at: string
}

export function AulasListPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [aulas, setAulas] = useState<Aula[]>([])
  const [filteredAulas, setFilteredAulas] = useState<Aula[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    nivel: '',
    categoria: '',
    responsavel: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    loadAulas()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [searchTerm, filters, aulas])

  const loadAulas = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('aulas')
        .select('*')
        .order('numero', { ascending: true })

      if (error) throw error
      setAulas(data || [])
    } catch (error) {
      console.error('Erro ao carregar aulas:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let result = aulas

    // Search
    if (searchTerm) {
      result = result.filter(aula =>
        aula.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aula.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aula.numero.toString().includes(searchTerm)
      )
    }

    // Filters
    if (filters.nivel) {
      result = result.filter(aula => aula.nivel === filters.nivel)
    }
    if (filters.categoria) {
      result = result.filter(aula => aula.categoria === filters.categoria)
    }
    if (filters.responsavel) {
      result = result.filter(aula => aula.responsavel === filters.responsavel)
    }

    setFilteredAulas(result)
    setCurrentPage(1)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta aula?')) return

    try {
      const { error } = await supabase
        .from('aulas')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setAulas(aulas.filter(aula => aula.id !== id))
      alert('Aula excluída com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir aula:', error)
      alert('Erro ao excluir aula')
    }
  }

  const handleDuplicate = async (aula: Aula) => {
    try {
      const { data: maxNumero } = await supabase
        .from('aulas')
        .select('numero')
        .order('numero', { ascending: false })
        .limit(1)
        .single()

      const novoNumero = (maxNumero?.numero || 0) + 1

      const { data, error } = await supabase
        .from('aulas')
        .insert({
          ...aula,
          id: undefined,
          numero: novoNumero,
          titulo: `${aula.titulo} (Cópia)`,
          created_at: undefined
        })
        .select()
        .single()

      if (error) throw error

      setAulas([...aulas, data])
      alert('Aula duplicada com sucesso!')
    } catch (error) {
      console.error('Erro ao duplicar aula:', error)
      alert('Erro ao duplicar aula')
    }
  }

  // Pagination
  const totalPages = Math.ceil(filteredAulas.length / itemsPerPage)
  const paginatedAulas = filteredAulas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 Aulas do Curriculum</h1>
            <p className="text-gray-600">Gerencie todas as aulas do programa</p>
          </div>
          <button
            onClick={() => navigate('/admin/aulas/kanban')}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            📊 Ver Kanban
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 Buscar por título, descrição ou número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.nivel}
              onChange={(e) => setFilters({ ...filters, nivel: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todos os níveis</option>
              <option value="iniciante">Iniciante</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
            </select>

            <select
              value={filters.categoria}
              onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todas as categorias</option>
              <option value="introducao">Introdução</option>
              <option value="ritmo">Ritmo</option>
              <option value="melodia">Melodia</option>
              <option value="harmonia">Harmonia</option>
            </select>

            <select
              value={filters.responsavel}
              onChange={(e) => setFilters({ ...filters, responsavel: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todos os professores</option>
              <option value="Prof. Yamamoto">Prof. Yamamoto</option>
              <option value="Prof. Tanaka">Prof. Tanaka</option>
            </select>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Mostrando {paginatedAulas.length} de {filteredAulas.length} aulas
            </p>
            {(searchTerm || filters.nivel || filters.categoria || filters.responsavel) && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilters({ nivel: '', categoria: '', responsavel: '' })
                }}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                🔄 Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Aulas Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nível</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duração</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsável</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedAulas.map(aula => (
                  <tr key={aula.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-orange-600">#{aula.numero}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{aula.titulo}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{aula.descricao}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {aula.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {aula.nivel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {aula.duracao} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {aula.responsavel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate(`${ROUTES.ADMIN_AULAS}/${aula.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Ver detalhes"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => navigate(`${ROUTES.ADMIN_AULAS}/editar/${aula.id}`)}
                          className="text-orange-600 hover:text-orange-900"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDuplicate(aula)}
                          className="text-green-600 hover:text-green-900"
                          title="Duplicar"
                        >
                          📋
                        </button>
                        <button
                          onClick={() => handleDelete(aula.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Excluir"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedAulas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">📭</p>
              <p className="text-gray-600">Nenhuma aula encontrada</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Anterior
              </button>
              <span className="text-sm text-gray-600">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próxima →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AulasListPage
