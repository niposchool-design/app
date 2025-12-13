import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { 
  Calendar, 
  Clock, 
  Target, 
  Award, 
  BookOpen, 
  Music, 
  Video, 
  FileText,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  PlayCircle,
  Download,
  Sparkles,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { 
  getAulaPorNumero,
  getMetodologiasAula,
  getInstrumentosAula,
  getRepertorioAula,
  getVideosAula,
  getPreRequisitosAula,
  getProximasAulas,
  getProgressoAula
} from '@/src/lib/supabase/queries/aulas'
import { STATUS_CONFIG } from '@/src/lib/types/aulas'

interface PageProps {
  params: Promise<{ numero: string }>
}

/**
 * 📖 DETALHES DA AULA - Método Alpha
 * Página completa com todos os recursos de aprendizado
 */

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params
  const numero = parseInt(resolvedParams.numero)
  const aula = await getAulaPorNumero(numero)
  
  return {
    title: aula ? `Aula ${numero}: ${aula.titulo} | Nipo School` : 'Aula não encontrada',
    description: aula?.objetivo_didatico || 'Aprenda música com o Método Alpha',
  }
}

async function AulaDetalhesContent({ numero }: { numero: number }) {
  // Buscar todos os dados da aula
  const aula = await getAulaPorNumero(numero)
  
  if (!aula) {
    notFound()
  }

  // Buscar recursos complementares
  const [metodologias, instrumentos, repertorio, videos, preRequisitos, proximasAulas] = await Promise.all([
    getMetodologiasAula(aula.id),
    getInstrumentosAula(aula.id),
    getRepertorioAula(aula.id),
    getVideosAula(aula.id),
    getPreRequisitosAula(aula.id),
    getProximasAulas(numero)
  ])

  // Configuração do status
  const statusConfig = STATUS_CONFIG[aula.status as keyof typeof STATUS_CONFIG]
  const StatusIcon = statusConfig?.icon || CheckCircle

  return (
    <div className="space-y-8">
      {/* Header da Aula */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <Link href="/alunos/aulas" className="inline-flex items-center text-red-100 hover:text-white mb-4 transition-colors text-sm font-medium">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Voltar para Minhas Aulas
              </Link>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-bold text-3xl shadow-lg border border-white/10">
                  {numero}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-red-100 mb-1 text-sm font-medium uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    Aula {numero} de 29
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight">{aula.titulo}</h1>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mt-6">
                {/* Data */}
                {aula.data_programada && (
                  <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                    <Calendar className="w-4 h-4 text-red-200" />
                    <span className="text-sm font-medium">
                      {new Date(aula.data_programada).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                
                {/* Duração */}
                {aula.duracao_minutos && (
                  <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                    <Clock className="w-4 h-4 text-orange-200" />
                    <span className="text-sm font-medium">{aula.duracao_minutos} min</span>
                  </div>
                )}

                {/* Status */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm ${
                  aula.status === 'concluida' 
                    ? 'bg-green-500/20 border-green-400/30 text-green-100' 
                    : 'bg-white/10 border-white/10 text-white'
                }`}>
                  <StatusIcon className="w-4 h-4" />
                  <span className="text-sm font-medium capitalize">{aula.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Objetivo Didático */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-200" />
              Objetivo da Aula
            </h3>
            <p className="text-red-50 leading-relaxed text-lg">
              {aula.objetivo_didatico}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal - Conteúdo */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Metodologias */}
          {metodologias.length > 0 && (
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-xl">
                  <BookOpen className="w-6 h-6 text-red-600" />
                </div>
                Conteúdo Teórico
              </h2>
              <div className="space-y-4">
                {metodologias.map((metodologia) => (
                  <div key={metodologia.id} className="group p-4 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-700">{metodologia.titulo}</h3>
                    <p className="text-gray-600 leading-relaxed">{metodologia.descricao}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Repertório */}
          {repertorio.length > 0 && (
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-xl">
                  <Music className="w-6 h-6 text-orange-600" />
                </div>
                Repertório Prático
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repertorio.map((musica) => (
                  <div key={musica.id} className="p-4 rounded-2xl border border-gray-100 hover:shadow-lg hover:shadow-orange-100/50 hover:border-orange-100 transition-all group">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600">{musica.titulo}</h3>
                    <p className="text-sm text-gray-500 mb-4">{musica.compositor}</p>
                    
                    <div className="flex gap-2">
                      {musica.partitura_url && (
                        <a href={musica.partitura_url} target="_blank" className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-xl text-sm font-medium hover:bg-orange-50 hover:text-orange-700 transition-colors">
                          <FileText className="w-4 h-4" /> Partitura
                        </a>
                      )}
                      {musica.playback_url && (
                        <a href={musica.playback_url} target="_blank" className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-xl text-sm font-medium hover:bg-orange-50 hover:text-orange-700 transition-colors">
                          <PlayCircle className="w-4 h-4" /> Playback
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Vídeos */}
          {videos.length > 0 && (
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-xl">
                  <Video className="w-6 h-6 text-red-600" />
                </div>
                Vídeo Aulas
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {videos.map((video) => (
                  <div key={video.id} className="group">
                    <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative mb-3 shadow-lg">
                      {video.thumbnail_url ? (
                        <img src={video.thumbnail_url} alt={video.titulo} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <PlayCircle className="w-16 h-16 text-white/50 group-hover:text-red-500 transition-colors" />
                        </div>
                      )}
                      <a href={video.video_url} target="_blank" className="absolute inset-0 z-10" aria-label={`Assistir ${video.titulo}`}></a>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-red-600 transition-colors">{video.titulo}</h3>
                    <p className="text-gray-600">{video.descricao}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Lateral */}
        <div className="space-y-6">
          {/* Instrumentos Utilizados */}
          {instrumentos.length > 0 && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-red-500" />
                Instrumentos
              </h3>
              <div className="space-y-3">
                {instrumentos.map((inst) => (
                  <Link 
                    key={inst.id} 
                    href={`/alunos/instrumentos/${inst.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                      {inst.imagem_url ? (
                        <img src={inst.imagem_url} alt={inst.nome} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-red-700">{inst.nome}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Pré-requisitos */}
          {preRequisitos.length > 0 && (
            <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100">
              <h3 className="font-bold text-orange-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-600" />
                Pré-requisitos
              </h3>
              <ul className="space-y-2">
                {preRequisitos.map((req) => (
                  <li key={req.id} className="flex items-start gap-2 text-sm text-orange-800">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                    {req.descricao}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Próximas Aulas */}
          <div className="bg-gray-900 text-white rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Próximos Passos
            </h3>
            <div className="space-y-4">
              {proximasAulas.map((prox, idx) => (
                <Link 
                  key={prox.id} 
                  href={`/alunos/aulas/${prox.numero}`}
                  className="block p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/5"
                >
                  <div className="text-xs text-gray-400 mb-1">Aula {prox.numero}</div>
                  <div className="font-medium text-sm line-clamp-1">{prox.titulo}</div>
                </Link>
              ))}
              {proximasAulas.length === 0 && (
                <p className="text-sm text-gray-400">Você está na última aula disponível!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function AulaDetalhesPage({ params }: PageProps) {
  const resolvedParams = await params
  const numero = parseInt(resolvedParams.numero)

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    }>
      <AulaDetalhesContent numero={numero} />
    </Suspense>
  )
}
