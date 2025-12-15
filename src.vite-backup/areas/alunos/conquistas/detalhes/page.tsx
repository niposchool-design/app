// 🏆 CONQUISTA DETAIL PAGE - NIPO SCHOOL
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, Star, Calendar, CheckCircle, Lock } from 'lucide-react'
import { OrientalContainer } from '../../../components/oriental/OrientalContainer'
import { NipoCard } from '../../../components/ui/NipoCard'
import { NipoButton } from '../../../components/ui/NipoButton'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase/client'
import { useAuth } from '../../../contexts/AuthContext'

export const ConquistaDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [conquista, setConquista] = useState<any>(null)
  const [userConquista, setUserConquista] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    buscarConquista()
  }, [id, user?.id])

  const buscarConquista = async () => {
    if (!id || !user?.id) return

    try {
      setLoading(true)
      
      // Buscar achievement (conquista)
      const { data: conquistaData, error: conquistaError } = await supabase
        .from('achievements')
        .select('*')
        .eq('id', id)
        .single()

      if (conquistaError) throw conquistaError
      setConquista(conquistaData)

      // Verificar se usuário possui esta conquista
      const { data: userConquistaData, error: userError } = await supabase
        .from('user_achievements')
        .select('*, earned_at, points_earned')
        .eq('user_id', user.id)
        .eq('achievement_id', id)
        .maybeSingle()

      if (userError && userError.code !== 'PGRST116') throw userError
      setUserConquista(userConquistaData)
    } catch (err) {
      console.error('Erro ao buscar conquista:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Carregando...</div>
  if (!conquista) return <div className="p-8 text-center">Conquista não encontrada</div>

  const isDesbloqueada = !!userConquista

  return (
    <OrientalContainer title={conquista.nome} icon={Trophy}>
      <NipoButton
        variant="ghost"
        onClick={() => navigate('/alunos/conquistas')}
        className="mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar para Conquistas
      </NipoButton>

      <div className="max-w-4xl mx-auto">
        <NipoCard className="p-8">
          <div className="text-center mb-8">
            <div className={`inline-block p-8 rounded-full mb-4 ${
              isDesbloqueada 
                ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                : 'bg-gray-300'
            }`}>
              {isDesbloqueada ? (
                <Trophy size={80} className="text-white" />
              ) : (
                <Lock size={80} className="text-gray-500" />
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-[#8B4513] mb-2">
              {conquista.nome}
            </h1>
            
            {isDesbloqueada && userConquista && (
              <div className="flex items-center justify-center text-green-600 font-medium">
                <CheckCircle size={20} className="mr-2" />
                Desbloqueada em {new Date(userConquista.earned_at).toLocaleDateString('pt-BR')}
              </div>
            )}
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 text-center">
              {conquista.descricao}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Star className="mx-auto mb-2 text-yellow-600" size={32} />
              <p className="text-sm text-gray-600">Pontos</p>
              <p className="text-2xl font-bold text-yellow-600">{conquista.points_reward || 0}</p>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Trophy className="mx-auto mb-2 text-purple-600" size={32} />
              <p className="text-sm text-gray-600">Categoria</p>
              <p className="text-lg font-medium text-purple-600 capitalize">
                {conquista.category || 'Geral'}
              </p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <span className="inline-block mx-auto mb-2 text-blue-600 text-3xl">{conquista.badge_icon || '🏆'}</span>
              <p className="text-sm text-gray-600">Ícone</p>
              <p className="text-lg font-medium text-blue-600">
                {conquista.name}
              </p>
            </div>
          </div>

          {!isDesbloqueada && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#8B4513] mb-3 flex items-center">
                <Lock size={20} className="mr-2" />
                Como Desbloquear
              </h3>
              <p className="text-gray-700">
                {conquista.description || 'Complete os requisitos necessários para desbloquear esta conquista.'}
              </p>
              {conquista.requirement_type && (
                <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Requisito:</strong> {conquista.requirement_type}
                    {conquista.requirement_value && ` - ${conquista.requirement_value}`}
                  </p>
                </div>
              )}
            </div>
          )}
        </NipoCard>

        {isDesbloqueada && (
          <NipoCard className="p-6 mt-6">
            <h3 className="text-lg font-bold text-[#8B4513] mb-4">Próximas Conquistas</h3>
            <p className="text-gray-600 text-center py-4">
              Continue praticando para desbloquear mais conquistas!
            </p>
          </NipoCard>
        )}
      </div>
    </OrientalContainer>
  )
}

export default ConquistaDetailPage
