// 📚 MINHAS AULAS PAGE - NIPO SCHOOL
import { useState, useEffect } from 'react'
import { Calendar, Clock, BookOpen, PlayCircle, CheckCircle } from 'lucide-react'
import { OrientalContainer } from '../../../components/oriental/OrientalContainer'
import { NipoCard } from '../../../components/ui/NipoCard'
import { supabase } from '../../../lib/supabase/client'
import { useAuth } from '../../../contexts/AuthContext'

export const MinhasAulasPage = () => {
  const { user } = useAuth()
  const [progress, setProgress] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'em_andamento' | 'concluidas'>('em_andamento')

  useEffect(() => {
    buscarProgresso()
  }, [viewMode, user?.id])

  const buscarProgresso = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('user_progress')
        .select(`
          *,
          lessons (
            id, title, description, video_url, video_duration_seconds, thumbnail_url,
            modules (title, slug)
          )
        `)
        .eq('user_id', user.id)
        .eq('is_completed', viewMode === 'concluidas')
        .order('started_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setProgress(data || [])
    } catch (err) {
      console.error('Erro ao buscar progresso:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatarDuracao = (segundos: number) => {
    const minutos = Math.floor(segundos / 60)
    return `${minutos} min`
  }

  const formatarProgresso = (watchTime: number, totalTime: number) => {
    if (!totalTime) return 0
    return Math.min(100, Math.round((watchTime / totalTime) * 100))
  }

  return (
    <OrientalContainer title="Meu Progresso nas Aulas" icon={BookOpen}>
      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setViewMode('em_andamento')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            viewMode === 'em_andamento'
              ? 'bg-[#8B4513] text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Em Andamento
        </button>
        <button
          onClick={() => setViewMode('concluidas')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            viewMode === 'concluidas'
              ? 'bg-[#8B4513] text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Concluídas
        </button>
      </div>

      {/* Lista de Progresso */}
      {loading ? (
        <div className="text-center py-8">Carregando progresso...</div>
      ) : progress.length === 0 ? (
        <NipoCard className="p-8 text-center">
          <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">
            {viewMode === 'em_andamento' 
              ? 'Comece uma aula para ver seu progresso aqui!'
              : 'Nenhuma aula concluída ainda'}
          </p>
        </NipoCard>
      ) : (
        <div className="space-y-4">
          {progress.map(item => {
            const lesson = item.lessons
            const module = lesson?.modules
            const progressPercent = formatarProgresso(item.watch_time_seconds, lesson?.video_duration_seconds)
            
            return (
              <NipoCard key={item.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  {lesson?.thumbnail_url && (
                    <div className="w-32 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={lesson.thumbnail_url} 
                        alt={lesson.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 uppercase">
                        {module?.title || 'Módulo'}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#8B4513] mb-2">
                      {lesson?.title || 'Aula'}
                    </h3>
                    
                    {lesson?.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {lesson.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {lesson?.video_duration_seconds && (
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          <span>{formatarDuracao(lesson.video_duration_seconds)}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <PlayCircle size={16} className="mr-1" />
                        <span>Assistido: {formatarDuracao(item.watch_time_seconds)}</span>
                      </div>

                      {item.is_completed && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle size={16} className="mr-1" />
                          <span>Concluída</span>
                        </div>
                      )}
                    </div>

                    {/* Barra de Progresso */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#8B4513] h-2 rounded-full transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {progressPercent}% concluído
                      </span>
                    </div>
                  </div>
                </div>
              </NipoCard>
            )
          })}
        </div>
      )}
    </OrientalContainer>
  )
}


export default MinhasAulasPage
