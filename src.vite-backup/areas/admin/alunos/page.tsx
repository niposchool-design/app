import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../lib/supabase/client'

interface Aluno {
  id: string
  nome: string
  email: string
  instrumento_principal: string
  nivel: string
  turma: string
  created_at: string
  pontos_total?: number
  conquistas_total?: number
}

export function AlunosListPage() {
  const navigate = useNavigate()
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [filteredAlunos, setFilteredAlunos] = useState<Aluno[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    instrumento: '',
    nivel: '',
    turma: ''
  })

  useEffect(() => {
    loadAlunos()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [searchTerm, filters, alunos])

  const loadAlunos = async () => {
    try {
      setLoading(true)
      
      // Buscar profiles com role aluno
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'aluno')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Enriquecer com estatísticas (mock por enquanto)
      const alunosComStats = (profiles || []).map(aluno => ({
        id: aluno.id,
        nome: aluno.nome || aluno.email,
        email: aluno.email,
        instrumento_principal: aluno.instrumento_principal || 'Não definido',
        nivel: aluno.nivel || 'iniciante',
        turma: aluno.turma || 'Turma A',
        created_at: aluno.created_at,
        pontos_total: Math.floor(Math.random() * 1000),
        conquistas_total: Math.floor(Math.random() * 20)
      }))

      setAlunos(alunosComStats)
    } catch (error) {
      console.error('Erro ao carregar alunos:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let result = alunos

    // Search
    if (searchTerm) {
      result = result.filter(aluno =>
        aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.instrumento_principal.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filters
    if (filters.instrumento) {
      result = result.filter(aluno => aluno.instrumento_principal === filters.instrumento)
    }
    if (filters.nivel) {
      result = result.filter(aluno => aluno.nivel === filters.nivel)
    }
    if (filters.turma) {
      result = result.filter(aluno => aluno.turma === filters.turma)
    }

    setFilteredAlunos(result)
  }

  const handleTransferirTurma = async (id: string) => {
    const novaTurma = prompt('Digite o nome da nova turma:')
    if (!novaTurma) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ turma: novaTurma })
        .eq('id', id)

      if (error) throw error

      setAlunos(alunos.map(aluno =>
        aluno.id === id ? { ...aluno, turma: novaTurma } : aluno
      ))

      alert('Aluno transferido com sucesso!')
    } catch (error) {
      console.error('Erro ao transferir aluno:', error)
      alert('Erro ao transferir aluno')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando alunos...</p>
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🎓 Alunos</h1>
            <p className="text-gray-600">Gerencie os alunos do Nipo School</p>
          </div>
          <button
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            onClick={() => alert('Funcionalidade em desenvolvimento')}
          >
            + Novo Aluno
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
              placeholder="🔍 Buscar por nome, email ou instrumento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.instrumento}
              onChange={(e) => setFilters({ ...filters, instrumento: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todos os instrumentos</option>
              <option value="Piano">Piano</option>
              <option value="Violão">Violão</option>
              <option value="Flauta">Flauta</option>
              <option value="Bateria">Bateria</option>
              <option value="Não definido">Não definido</option>
            </select>

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
              value={filters.turma}
              onChange={(e) => setFilters({ ...filters, turma: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todas as turmas</option>
              <option value="Turma A">Turma A</option>
              <option value="Turma B">Turma B</option>
              <option value="Turma C">Turma C</option>
            </select>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Mostrando {filteredAlunos.length} de {alunos.length} alunos
            </p>
            {(searchTerm || filters.instrumento || filters.nivel || filters.turma) && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilters({ instrumento: '', nivel: '', turma: '' })
                }}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                🔄 Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Alunos Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlunos.map(aluno => (
            <div
              key={aluno.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{aluno.nome}</h3>
                    <p className="text-xs text-gray-500">{aluno.email}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                  {aluno.turma}
                </span>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>🎵</span>
                  <span>Instrumento: {aluno.instrumento_principal}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📊</span>
                  <span>Nível: {aluno.nivel}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📅</span>
                  <span>Desde {new Date(aluno.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b">
                <div className="text-center bg-orange-50 rounded-lg p-2">
                  <p className="text-xl font-bold text-orange-600">{aluno.pontos_total}</p>
                  <p className="text-xs text-gray-600">Pontos</p>
                </div>
                <div className="text-center bg-green-50 rounded-lg p-2">
                  <p className="text-xl font-bold text-green-600">{aluno.conquistas_total}</p>
                  <p className="text-xs text-gray-600">Conquistas</p>
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
                  onClick={() => handleTransferirTurma(aluno.id)}
                  className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
                  title="Transferir turma"
                >
                  🔄
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAlunos.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-gray-600">Nenhum aluno encontrado</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-800">{alunos.length}</p>
              <p className="text-sm text-gray-600">Total de Alunos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {alunos.filter(a => a.nivel === 'iniciante').length}
              </p>
              <p className="text-sm text-gray-600">Iniciantes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {alunos.reduce((sum, a) => sum + (a.pontos_total || 0), 0)}
              </p>
              <p className="text-sm text-gray-600">Pontos Totais</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {alunos.reduce((sum, a) => sum + (a.conquistas_total || 0), 0)}
              </p>
              <p className="text-sm text-gray-600">Conquistas Totais</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlunosListPage
