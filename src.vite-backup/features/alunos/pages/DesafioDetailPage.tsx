// 🎯 DESAFIO DETAIL PAGE - NIPO SCHOOL
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, Clock, Star, Upload, CheckCircle } from 'lucide-react'
import { OrientalContainer } from '../../../components/oriental/OrientalContainer'
import { NipoCard } from '../../../components/ui/NipoCard'
import { NipoButton } from '../../../components/ui/NipoButton'
import { SubmissaoForm } from '../components/SubmissaoForm'
import { useDesafios } from '../hooks/useDesafios'
import { useAuth } from '../../../contexts/AuthContext'

export const DesafioDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { buscarDesafioPorId, submeterDesafio } = useDesafios(user?.id)
  const [desafio, setDesafio] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showSubmitForm, setShowSubmitForm] = useState(false)

  useEffect(() => {
    if (id) {
      buscarDesafioPorId(id).then(data => {
        setDesafio(data)
        setLoading(false)
      })
    }
  }, [id])

  const handleSubmit = async (data: any) => {
    if (id && user?.id) {
      await submeterDesafio(id, data)
      navigate('/alunos/desafios')
    }
  }

  if (loading) return <div className="p-8 text-center">Carregando...</div>
  if (!desafio) return <div className="p-8 text-center">Desafio não encontrado</div>

  const nivelColors = {
    facil: 'bg-green-100 text-green-800',
    medio: 'bg-yellow-100 text-yellow-800',
    dificil: 'bg-red-100 text-red-800'
  }

  return (
    <OrientalContainer title={desafio.titulo} icon={Trophy}>
      <NipoButton
        variant="ghost"
        onClick={() => navigate('/alunos/desafios')}
        className="mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar para Desafios
      </NipoButton>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações do Desafio */}
        <div className="lg:col-span-2 space-y-6">
          <NipoCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${nivelColors[desafio.nivel as keyof typeof nivelColors]}`}>
                {desafio.nivel.charAt(0).toUpperCase() + desafio.nivel.slice(1)}
              </span>
              <span className="flex items-center text-gray-600">
                <Trophy size={16} className="mr-1" />
                {desafio.pontos} pontos
              </span>
              <span className="flex items-center text-gray-600">
                <Clock size={16} className="mr-1" />
                {new Date(desafio.created_at).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#8B4513] mb-4">Descrição</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{desafio.descricao}</p>
          </NipoCard>

          {/* Formulário de Submissão */}
          {!showSubmitForm ? (
            <NipoButton
              onClick={() => setShowSubmitForm(true)}
              className="w-full"
            >
              <Upload size={20} className="mr-2" />
              Submeter Desafio
            </NipoButton>
          ) : (
            <NipoCard className="p-6">
              <h3 className="text-lg font-bold text-[#8B4513] mb-4">Submeter Solução</h3>
              <SubmissaoForm
                onSubmit={handleSubmit}
                onCancel={() => setShowSubmitForm(false)}
              />
            </NipoCard>
          )}
        </div>

        {/* Sidebar - Informações Adicionais */}
        <div className="space-y-4">
          <NipoCard className="p-6">
            <h3 className="text-lg font-bold text-[#8B4513] mb-4">Detalhes</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Tipo</p>
                <p className="font-medium">{desafio.tipo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nível</p>
                <p className="font-medium capitalize">{desafio.nivel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pontos</p>
                <p className="font-medium">{desafio.pontos} XP</p>
              </div>
            </div>
          </NipoCard>

          <NipoCard className="p-6 bg-yellow-50">
            <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center">
              <Star size={20} className="mr-2" />
              Dicas
            </h3>
            <ul className="text-sm text-yellow-900 space-y-2 list-disc list-inside">
              <li>Leia a descrição com atenção</li>
              <li>Revise seu trabalho antes de enviar</li>
              <li>Siga as orientações do professor</li>
            </ul>
          </NipoCard>
        </div>
      </div>
    </OrientalContainer>
  )
}
