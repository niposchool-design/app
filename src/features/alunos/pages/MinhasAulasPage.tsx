// 📚 MINHAS AULAS PAGE - NIPO SCHOOL
import { useState, useEffect } from 'react'
import { Calendar, Clock, User, MapPin, Video } from 'lucide-react'
import { OrientalContainer } from '../../../components/oriental/OrientalContainer'
import { NipoCard } from '../../../components/ui/NipoCard'
import { supabase } from '../../../lib/supabase/client'
import { useAuth } from '../../../contexts/AuthContext'

export const MinhasAulasPage = () => {
  const { user } = useAuth()
  const [aulas, setAulas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'proximas' | 'passadas'>('proximas')

  useEffect(() => {
    buscarAulas()
  }, [viewMode, user?.id])

  const buscarAulas = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      const agora = new Date().toISOString()
      
      const { data, error } = await supabase
        .from('aulas')
        .select(`
          *,
          turmas!inner (
            nome,
            aluno_turmas!inner (
              aluno_id
            )
          )
        `)
        .eq('turmas.aluno_turmas.aluno_id', user.id)
        [viewMode === 'proximas' ? 'gte' : 'lt']('data_hora', agora)
        .order('data_hora', { ascending: viewMode === 'proximas' })
        .limit(20)

      if (error) throw error
      setAulas(data || [])
    } catch (err) {
      console.error('Erro ao buscar aulas:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatarDataHora = (dataHora: string) => {
    const data = new Date(dataHora)
    return {
      data: data.toLocaleDateString('pt-BR'),
      hora: data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      diaSemana: data.toLocaleDateString('pt-BR', { weekday: 'long' })
    }
  }

  return (
    <OrientalContainer title="Minhas Aulas" icon={Calendar}>
      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setViewMode('proximas')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            viewMode === 'proximas'
              ? 'bg-[#8B4513] text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Próximas Aulas
        </button>
        <button
          onClick={() => setViewMode('passadas')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            viewMode === 'passadas'
              ? 'bg-[#8B4513] text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Aulas Passadas
        </button>
      </div>

      {/* Lista de Aulas */}
      {loading ? (
        <div className="text-center py-8">Carregando aulas...</div>
      ) : aulas.length === 0 ? (
        <NipoCard className="p-8 text-center">
          <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">
            {viewMode === 'proximas' 
              ? 'Nenhuma aula agendada no momento'
              : 'Nenhuma aula passada encontrada'}
          </p>
        </NipoCard>
      ) : (
        <div className="space-y-4">
          {aulas.map(aula => {
            const { data, hora, diaSemana } = formatarDataHora(aula.data_hora)
            
            return (
              <NipoCard key={aula.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#8B4513] mb-2">
                      {aula.titulo}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        <span className="capitalize">{diaSemana}, {data}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        <span>{hora}</span>
                      </div>
                      {aula.professor_nome && (
                        <div className="flex items-center">
                          <User size={16} className="mr-2" />
                          <span>{aula.professor_nome}</span>
                        </div>
                      )}
                      {aula.local && (
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2" />
                          <span>{aula.local}</span>
                        </div>
                      )}
                      {aula.online && (
                        <div className="flex items-center">
                          <Video size={16} className="mr-2" />
                          <span className="text-blue-600">Aula Online</span>
                        </div>
                      )}
                    </div>

                    {aula.descricao && (
                      <p className="mt-3 text-gray-700">{aula.descricao}</p>
                    )}
                  </div>

                  {viewMode === 'proximas' && (
                    <div className="ml-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Agendada
                      </span>
                    </div>
                  )}
                </div>
              </NipoCard>
            )
          })}
        </div>
      )}
    </OrientalContainer>
  )
}
