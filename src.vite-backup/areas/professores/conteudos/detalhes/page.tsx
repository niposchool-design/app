import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../../lib/supabase/client'
import { ROUTES } from '../../../lib/constants/routes'

interface Conteudo {
  id: string
  titulo: string
  descricao: string
  tipo: string
  categoria: string
  nivel: string
  duracao: number
  conteudo_url?: string
  thumbnail_url?: string
  created_by: string
  created_at: string
  visualizacoes: number
  downloads: number
  rating: number
}

interface Comentario {
  id: string
  user_id: string
  usuario_nome: string
  comentario: string
  rating: number
  created_at: string
}

export function ConteudoDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [conteudo, setConteudo] = useState<Conteudo | null>(null)
  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const [loading, setLoading] = useState(true)
  const [novoComentario, setNovoComentario] = useState('')
  const [rating, setRating] = useState(5)

  useEffect(() => {
    if (id) {
      loadConteudo()
      loadComentarios()
      incrementarVisualizacao()
    }
  }, [id])

  const loadConteudo = async () => {
    try {
      setLoading(true)
      // Mock data - substituir por query real quando tabela existir
      const mockConteudo: Conteudo = {
        id: id!,
        titulo: 'Plano de Aula - Ritmo Básico',
        descricao: 'Material completo para ensinar conceitos básicos de ritmo usando método Orff',
        tipo: 'plano_aula',
        categoria: 'ritmo',
        nivel: 'iniciante',
        duracao: 45,
        conteudo_url: '/uploads/plano-ritmo-basico.pdf',
        thumbnail_url: '/thumbnails/ritmo.jpg',
        created_by: 'Prof. Yamamoto',
        created_at: new Date().toISOString(),
        visualizacoes: 127,
        downloads: 45,
        rating: 4.5
      }
      setConteudo(mockConteudo)
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadComentarios = async () => {
    try {
      // Mock data - substituir por query real
      const mockComentarios: Comentario[] = [
        {
          id: '1',
          user_id: 'user1',
          usuario_nome: 'Prof. Tanaka',
          comentario: 'Excelente material! Usei com minha turma e foi muito bem recebido.',
          rating: 5,
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '2',
          user_id: 'user2',
          usuario_nome: 'Prof. Silva',
          comentario: 'Muito bom, mas poderia ter mais exemplos práticos.',
          rating: 4,
          created_at: new Date(Date.now() - 172800000).toISOString()
        }
      ]
      setComentarios(mockComentarios)
    } catch (error) {
      console.error('Erro ao carregar comentários:', error)
    }
  }

  const incrementarVisualizacao = async () => {
    try {
      // Implementar quando tabela existir
      console.log('Visualização incrementada')
    } catch (error) {
      console.error('Erro ao incrementar visualização:', error)
    }
  }

  const handleDownload = () => {
    if (conteudo?.conteudo_url) {
      window.open(conteudo.conteudo_url, '_blank')
      // Incrementar contador de downloads
    }
  }

  const handleAddComentario = async () => {
    if (!novoComentario.trim()) return

    try {
      const novoComent: Comentario = {
        id: Date.now().toString(),
        user_id: 'current-user',
        usuario_nome: 'Você',
        comentario: novoComentario,
        rating: rating,
        created_at: new Date().toISOString()
      }

      setComentarios([novoComent, ...comentarios])
      setNovoComentario('')
      setRating(5)
      alert('Comentário adicionado!')
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error)
      alert('Erro ao adicionar comentário')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este conteúdo?')) return

    try {
      // Implementar exclusão quando tabela existir
      alert('Conteúdo excluído!')
      navigate(ROUTES.PROFESSOR.INDEX)
    } catch (error) {
      console.error('Erro ao excluir:', error)
      alert('Erro ao excluir conteúdo')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando conteúdo...</p>
        </div>
      </div>
    )
  }

  if (!conteudo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">❌</p>
          <p className="text-gray-600">Conteúdo não encontrado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2 mb-4"
          >
            ← Voltar
          </button>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                    {conteudo.tipo.replace('_', ' ')}
                  </span>
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    {conteudo.nivel}
                  </span>
                  <span className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-800">
                    {conteudo.categoria}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{conteudo.titulo}</h1>
                <p className="text-gray-600">{conteudo.descricao}</p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
              <div>
                <p className="text-sm text-gray-500">Criado por</p>
                <p className="font-semibold text-gray-800">👤 {conteudo.created_by}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duração</p>
                <p className="font-semibold text-gray-800">⏱️ {conteudo.duracao} min</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Criado em</p>
                <p className="font-semibold text-gray-800">
                  📅 {new Date(conteudo.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Avaliação</p>
                <p className="font-semibold text-gray-800">⭐ {conteudo.rating.toFixed(1)}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{conteudo.visualizacoes}</p>
                <p className="text-sm text-gray-600">Visualizações</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{conteudo.downloads}</p>
                <p className="text-sm text-gray-600">Downloads</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-orange-600">{comentarios.length}</p>
                <p className="text-sm text-gray-600">Comentários</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                📥 Download
              </button>
              <button
                onClick={() => navigate(`/professores/conteudos/editar/${id}`)}
                className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                ✏️ Editar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>

        {/* Comentários */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">💬 Comentários e Avaliações</h2>

          {/* Novo Comentário */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Deixe sua avaliação</h3>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nota: {rating} ⭐
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <textarea
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Escreva seu comentário sobre este conteúdo..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 mb-3"
              rows={3}
            />
            
            <button
              onClick={handleAddComentario}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              Enviar Comentário
            </button>
          </div>

          {/* Lista de Comentários */}
          <div className="space-y-4">
            {comentarios.map(coment => (
              <div key={coment.id} className="border-b border-gray-200 pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{coment.usuario_nome}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(coment.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">{coment.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700">{coment.comentario}</p>
              </div>
            ))}

            {comentarios.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-3xl mb-2">💬</p>
                <p>Seja o primeiro a comentar!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConteudoDetailPage
