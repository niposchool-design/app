import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
  atividades: string[]
  vocabulario: string[]
  reflexao: string
  created_at: string
}

export function AulaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [aula, setAula] = useState<Aula | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    presencas: 0,
    qrScans: 0,
    feedback: 0
  })

  useEffect(() => {
    if (id) {
      loadAula(parseInt(id))
      loadStats(parseInt(id))
    }
  }, [id])

  const loadAula = async (aulaId: number) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('aulas')
        .select('*')
        .eq('id', aulaId)
        .single()

      if (error) throw error
      setAula(data)
    } catch (error) {
      console.error('Erro ao carregar aula:', error)
      alert('Erro ao carregar aula')
      navigate(ROUTES.ADMIN_AULAS)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async (aulaId: number) => {
    try {
      // Contar presenças
      const { count: presencasCount } = await supabase
        .from('presencas')
        .select('*', { count: 'exact', head: true })
        .eq('aula_id', aulaId)

      // Contar scans de QR Code
      const { data: qrCode } = await supabase
        .from('qr_codes')
        .select('id')
        .eq('tipo', 'aula')
        .eq('referencia_id', aulaId.toString())
        .single()

      let qrScansCount = 0
      if (qrCode) {
        const { count } = await supabase
          .from('qr_scans')
          .select('*', { count: 'exact', head: true })
          .eq('qr_code_id', qrCode.id)

        qrScansCount = count || 0
      }

      setStats({
        presencas: presencasCount || 0,
        qrScans: qrScansCount,
        feedback: 0 // Implementar quando houver tabela de feedback
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
  }

  const handleGenerateQR = async () => {
    if (!aula) return

    try {
      // Verificar se já existe QR Code
      const { data: existing } = await supabase
        .from('qr_codes')
        .select('id')
        .eq('tipo', 'aula')
        .eq('referencia_id', aula.id.toString())
        .single()

      if (existing) {
        navigate(`/admin/qr-display/${aula.id}`)
        return
      }

      // Criar novo QR Code
      const codigo = `AULA-${aula.id}-${Date.now()}`
      const { data, error } = await supabase
        .from('qr_codes')
        .insert({
          tipo: 'aula',
          referencia_id: aula.id.toString(),
          codigo,
          ativo: true
        })
        .select()
        .single()

      if (error) throw error

      navigate(`/admin/qr-display/${aula.id}`)
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error)
      alert('Erro ao gerar QR Code')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando aula...</p>
        </div>
      </div>
    )
  }

  if (!aula) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">❌</p>
          <p className="text-gray-600">Aula não encontrada</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(ROUTES.ADMIN_AULAS)}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← Voltar para lista
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleGenerateQR}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              📱 Gerar QR Code
            </button>
            <button
              onClick={() => navigate(`${ROUTES.ADMIN_AULAS}/editar/${aula.id}`)}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              ✏️ Editar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-orange-600">
                  Aula #{aula.numero}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  {aula.categoria}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                  {aula.nivel}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{aula.titulo}</h1>
              <p className="text-gray-600">{aula.descricao}</p>
            </div>
          </div>

          {/* Informações básicas */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 pb-6 border-b">
            <div>
              <p className="text-sm text-gray-500 mb-1">Duração</p>
              <p className="font-semibold text-gray-800">⏱️ {aula.duracao} minutos</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Responsável</p>
              <p className="font-semibold text-gray-800">👤 {aula.responsavel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Criada em</p>
              <p className="font-semibold text-gray-800">
                📅 {new Date(aula.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.presencas}</p>
              <p className="text-sm text-gray-600 mt-1">Presenças Registradas</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{stats.qrScans}</p>
              <p className="text-sm text-gray-600 mt-1">Scans de QR Code</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">{stats.feedback}</p>
              <p className="text-sm text-gray-600 mt-1">Feedbacks Recebidos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo da Aula */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Objetivos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🎯 Objetivos
          </h2>
          <ul className="space-y-2">
            {aula.objetivos && aula.objetivos.length > 0 ? (
              aula.objetivos.map((objetivo, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-gray-700">{objetivo}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum objetivo cadastrado</p>
            )}
          </ul>
        </div>

        {/* Materiais */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📦 Materiais Necessários
          </h2>
          <ul className="space-y-2">
            {aula.materiais && aula.materiais.length > 0 ? (
              aula.materiais.map((material, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-gray-700">{material}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum material cadastrado</p>
            )}
          </ul>
        </div>

        {/* Atividades */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🎨 Atividades
          </h2>
          <ul className="space-y-2">
            {aula.atividades && aula.atividades.length > 0 ? (
              aula.atividades.map((atividade, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">{index + 1}.</span>
                  <span className="text-gray-700">{atividade}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhuma atividade cadastrada</p>
            )}
          </ul>
        </div>

        {/* Vocabulário */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📚 Vocabulário Musical
          </h2>
          <ul className="space-y-2">
            {aula.vocabulario && aula.vocabulario.length > 0 ? (
              aula.vocabulario.map((termo, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-gray-700">{termo}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum termo cadastrado</p>
            )}
          </ul>
        </div>
      </div>

      {/* Reflexão */}
      {aula.reflexao && (
        <div className="max-w-5xl mx-auto mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              💭 Reflexão Pedagógica
            </h2>
            <p className="text-gray-700 leading-relaxed">{aula.reflexao}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AulaDetailPage
