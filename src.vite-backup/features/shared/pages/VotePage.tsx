import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { supabase } from '../../../lib/supabase/client'

interface VoteOption {
  id: string
  label: string
  description: string
  image?: string
  votes: number
}

export function VotePage() {
  const { user } = useAuth()
  const [hasVoted, setHasVoted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [votingType, setVotingType] = useState<'logo' | 'feature'>('logo')
  const [selectedVote, setSelectedVote] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)

  // Opções de votação de Logo
  const logoOptions: VoteOption[] = [
    {
      id: 'logo_1',
      label: 'Logo Tradicional',
      description: 'Design clássico com elementos japoneses e musicais',
      image: '/logos/option1.png',
      votes: 45
    },
    {
      id: 'logo_2',
      label: 'Logo Moderno',
      description: 'Design minimalista e contemporâneo',
      image: '/logos/option2.png',
      votes: 32
    },
    {
      id: 'logo_3',
      label: 'Logo Criativo',
      description: 'Fusão de elementos orientais e ocidentais',
      image: '/logos/option3.png',
      votes: 58
    }
  ]

  // Opções de votação de Features
  const featureOptions: VoteOption[] = [
    {
      id: 'feature_1',
      label: 'Chat entre Alunos',
      description: 'Sistema de mensagens para colaboração entre estudantes',
      votes: 78
    },
    {
      id: 'feature_2',
      label: 'Gravação de Áudio',
      description: 'Gravar e compartilhar suas práticas musicais',
      votes: 92
    },
    {
      id: 'feature_3',
      label: 'Aulas ao Vivo',
      description: 'Transmissões ao vivo de aulas e masterclasses',
      votes: 125
    },
    {
      id: 'feature_4',
      label: 'Biblioteca de Partituras',
      description: 'Acesso a partituras e materiais didáticos',
      votes: 67
    }
  ]

  const currentOptions = votingType === 'logo' ? logoOptions : featureOptions

  useEffect(() => {
    checkIfUserVoted()
  }, [user])

  const checkIfUserVoted = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      
      // Verificar na tabela profiles se já votou
      const { data, error } = await supabase
        .from('profiles')
        .select('has_voted, voted_logo, voted_feature')
        .eq('id', user.id)
        .single()

      if (error) throw error

      if (data) {
        setHasVoted(data.has_voted || false)
      }
    } catch (error) {
      console.error('Erro ao verificar voto:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async () => {
    if (!selectedVote || !user) return

    try {
      // Salvar voto no banco
      const voteData = {
        user_id: user.id,
        vote_type: votingType,
        vote_value: selectedVote,
        created_at: new Date().toISOString()
      }

      // Atualizar profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          has_voted: true,
          [`voted_${votingType}`]: selectedVote
        })
        .eq('id', user.id)

      if (profileError) throw profileError

      setHasVoted(true)
      setShowResults(true)
      alert('Voto registrado com sucesso!')
    } catch (error) {
      console.error('Erro ao registrar voto:', error)
      alert('Erro ao registrar voto. Tente novamente.')
    }
  }

  const getTotalVotes = () => {
    return currentOptions.reduce((sum, option) => sum + option.votes, 0)
  }

  const getPercentage = (votes: number) => {
    const total = getTotalVotes()
    return total > 0 ? ((votes / total) * 100).toFixed(1) : '0'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando votação...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🗳️ Votação Nipo School</h1>
          <p className="text-gray-600">
            Sua opinião é importante! Vote e ajude a moldar o futuro da plataforma
          </p>
        </div>

        {/* Tipo de Votação */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setVotingType('logo')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                votingType === 'logo'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🎨 Votação de Logo
            </button>
            <button
              onClick={() => setVotingType('feature')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                votingType === 'feature'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ✨ Votação de Features
            </button>
          </div>
        </div>

        {/* Aviso se já votou */}
        {hasVoted && !showResults && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <p className="font-semibold text-yellow-800">Você já votou!</p>
                <p className="text-sm text-yellow-700">
                  Cada usuário pode votar apenas uma vez. Obrigado pela participação!
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowResults(true)}
              className="mt-3 text-sm text-yellow-800 hover:text-yellow-900 underline"
            >
              Ver resultados →
            </button>
          </div>
        )}

        {/* Opções de Votação */}
        {!hasVoted && !showResults && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {votingType === 'logo' ? '🎨 Escolha o Logo' : '✨ Escolha a Feature Prioritária'}
            </h2>
            <p className="text-gray-600 mb-6">
              {votingType === 'logo'
                ? 'Qual design de logo você prefere para o Nipo School?'
                : 'Qual funcionalidade você gostaria de ver implementada primeiro?'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentOptions.map(option => (
                <div
                  key={option.id}
                  onClick={() => setSelectedVote(option.id)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                    selectedVote === option.id
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  {option.image && (
                    <div className="mb-3 bg-gray-100 h-32 rounded flex items-center justify-center">
                      <span className="text-4xl">🎨</span>
                    </div>
                  )}
                  <h3 className="font-bold text-gray-800 mb-1">{option.label}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                  {selectedVote === option.id && (
                    <div className="mt-2 flex items-center gap-2 text-orange-600">
                      <span>✓</span>
                      <span className="font-semibold">Selecionado</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleVote}
              disabled={!selectedVote}
              className="mt-6 w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedVote ? '✓ Confirmar Voto' : 'Selecione uma opção'}
            </button>
          </div>
        )}

        {/* Resultados */}
        {(hasVoted || showResults) && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Resultados</h2>
            <p className="text-gray-600 mb-6">
              Total de votos: <span className="font-bold">{getTotalVotes()}</span>
            </p>

            <div className="space-y-4">
              {currentOptions.map(option => (
                <div key={option.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{option.label}</span>
                    <span className="font-bold text-orange-600">
                      {getPercentage(option.votes)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-orange-600 h-3 rounded-full transition-all"
                      style={{ width: `${getPercentage(option.votes)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{option.votes} votos</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
