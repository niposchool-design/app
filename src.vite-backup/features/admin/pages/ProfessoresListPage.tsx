import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../lib/supabase/client'

interface Professor {
  id: string
  nome: string
  email: string
  especialidade: string
  ativo: boolean
  created_at: string
  total_aulas?: number
  total_alunos?: number
}

export function ProfessoresListPage() {
  const navigate = useNavigate()
  const [professores, setProfessores] = useState<Professor[]>([])
  const [filteredProfessores, setFilteredProfessores] = useState<Professor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    ativo: '',
    especialidade: ''
  })

  useEffect(() => {
    loadProfessores()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [searchTerm, filters, professores])

  const loadProfessores = async () => {
    try {
      setLoading(true)
      
      // Buscar profiles com role professor
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'professor')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Enriquecer com estatísticas (mock por enquanto)
      const professoresComStats = (profiles || []).map(prof => ({
        id: prof.id,
        nome: prof.nome || prof.email,
        email: prof.email,
        especialidade: prof.especialidade || 'Geral',
        ativo: true,
        created_at: prof.created_at,
        total_aulas: Math.floor(Math.random() * 30),
        total_alunos: Math.floor(Math.random() * 50)
      }))

      setProfessores(professoresComStats)
    } catch (error) {
      console.error('Erro ao carregar professores:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let result = professores

    // Search
    if (searchTerm) {
      result = result.filter(prof =>
        prof.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filters
    if (filters.ativo !== '') {
      const ativoBoolean = filters.ativo === 'true'
      result = result.filter(prof => prof.ativo === ativoBoolean)
    }
    if (filters.especialidade) {
      result = result.filter(prof => prof.especialidade === filters.especialidade)
    }

    setFilteredProfessores(result)
  }

  const handleToggleAtivo = async (id: string, currentAtivo: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ativo: !currentAtivo })
        .eq('id', id)

      if (error) throw error

      setProfessores(professores.map(prof =>
        prof.id === id ? { ...prof, ativo: !currentAtivo } : prof
      ))

      alert(`Professor ${!currentAtivo ? 'ativado' : 'desativado'} com sucesso!`)
    } catch (error) {
      console.error('Erro ao atualizar professor:', error)
      alert('Erro ao atualizar professor')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando professores...</p>
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">👨‍🏫 Professores</h1>
            <p className="text-gray-600">Gerencie os professores do Nipo School</p>
          </div>
          <button
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            onClick={() => alert('Funcionalidade em desenvolvimento')}
          >
            + Novo Professor
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
              placeholder="🔍 Buscar por nome, email ou especialidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={filters.ativo}
              onChange={(e) => setFilters({ ...filters, ativo: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todos os status</option>
              <option value="true">Ativos</option>
              <option value="false">Inativos</option>
            </select>

            <select
              value={filters.especialidade}
              onChange={(e) => setFilters({ ...filters, especialidade: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todas as especialidades</option>
              <option value="Geral">Geral</option>
              <option value="Piano">Piano</option>
              <option value="Violão">Violão</option>
              <option value="Flauta">Flauta</option>
              <option value="Percussão">Percussão</option>
            </select>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Mostrando {filteredProfessores.length} de {professores.length} professores
            </p>
            {(searchTerm || filters.ativo || filters.especialidade) && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilters({ ativo: '', especialidade: '' })
                }}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                🔄 Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Professores Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessores.map(professor => (
            <div
              key={professor.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{professor.nome}</h3>
                    <p className="text-xs text-gray-500">{professor.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  professor.ativo
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {professor.ativo ? '✓ Ativo' : '✗ Inativo'}
                </span>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>🎵</span>
                  <span>Especialidade: {professor.especialidade}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📅</span>
                  <span>Desde {new Date(professor.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b">
                <div className="text-center bg-blue-50 rounded-lg p-2">
                  <p className="text-xl font-bold text-blue-600">{professor.total_aulas}</p>
                  <p className="text-xs text-gray-600">Aulas</p>
                </div>
                <div className="text-center bg-green-50 rounded-lg p-2">
                  <p className="text-xl font-bold text-green-600">{professor.total_alunos}</p>
                  <p className="text-xs text-gray-600">Alunos</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => alert('Ver perfil - Em desenvolvimento')}
                  className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  👁️ Ver
                </button>
                <button
                  onClick={() => alert('Editar - Em desenvolvimento')}
                  className="flex-1 px-3 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleToggleAtivo(professor.id, professor.ativo)}
                  className={`px-3 py-2 text-sm rounded-lg transition ${
                    professor.ativo
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                  title={professor.ativo ? 'Desativar' : 'Ativar'}
                >
                  {professor.ativo ? '🔒' : '🔓'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProfessores.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-gray-600">Nenhum professor encontrado</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-800">{professores.length}</p>
              <p className="text-sm text-gray-600">Total de Professores</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {professores.filter(p => p.ativo).length}
              </p>
              <p className="text-sm text-gray-600">Ativos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {professores.reduce((sum, p) => sum + (p.total_aulas || 0), 0)}
              </p>
              <p className="text-sm text-gray-600">Total de Aulas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {professores.reduce((sum, p) => sum + (p.total_alunos || 0), 0)}
              </p>
              <p className="text-sm text-gray-600">Total de Alunos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
