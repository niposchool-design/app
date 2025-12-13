import { Suspense } from 'react'
import { Calendar, Clock, Trophy, BookOpen, Flower2, Star } from 'lucide-react'
import { getTodasAulas, getProgressoGeralAluno, getEstatisticasProgresso } from '@/src/lib/supabase/queries/aulas'
import { AulaCard } from '@/src/components/aulas/AulaCard'
import { StatsCard } from '@/src/components/aulas/StatsCard'

/**
 * 📚 MINHAS AULAS - Método Alpha (Progressão Contínua)
 * Lista completa de 30 aulas sequenciais (0-29)
 * Maio a Dezembro 2025
 */

export const metadata = {
  title: 'Minhas Aulas | Nipo School',
  description: 'Acompanhe sua jornada musical com o Método Alpha - 30 aulas progressivas de música',
}

async function AulasContent() {
  // Buscar todas as aulas e progresso do aluno
  const aulas = await getTodasAulas()
  const progresso = await getProgressoGeralAluno('user-id') // TODO: pegar ID real do usuário
  const estatisticas = await getEstatisticasProgresso('user-id')

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-red-600" />
          Minhas Aulas
        </h1>
        <p className="text-gray-600">
          Seu caminho de aprendizado contínuo. Cada passo é uma vitória.
        </p>
      </div>

      {/* Estatísticas */}
      <StatsCard
        totalAulas={estatisticas?.totalAulas || 30}
        concluidas={estatisticas?.concluidas || 0}
        emAndamento={estatisticas?.emAndamento || 0}
        desafiosAprovados={estatisticas?.desafiosAprovados || 0}
      />

      {/* Info sobre o Método Alpha */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transform rotate-3">
            <Flower2 className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Método Alpha - Jornada Progressiva
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl">
              No Método Alpha, você cresce musicalmente de forma contínua e natural, como uma árvore que fortalece suas raízes. 
              Cada aula se constrói sobre a anterior, permitindo que você avance no seu próprio ritmo.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-red-100/50">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">30 Aulas</div>
                  <div className="text-xs text-gray-600">Jornada Completa</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-red-100/50">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Seu Ritmo</div>
                  <div className="text-xs text-gray-600">Progressão Natural</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-red-100/50">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Show Final</div>
                  <div className="text-xs text-gray-600">Grande Objetivo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Aulas */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-red-500 fill-current" />
            Trilha de Aprendizado
          </h2>
          <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
            {estatisticas?.concluidas || 0} / {estatisticas?.totalAulas || 30} concluídas
          </div>
        </div>

        {aulas && aulas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aulas.map((aula) => {
              const progressoAula = progresso?.find(p => p.aula_id === aula.id)
              return (
                <AulaCard
                  key={aula.id}
                  aula={aula}
                  progresso={progressoAula}
                />
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Nenhuma aula encontrada</h3>
            <p className="text-gray-500 mt-1">As aulas serão liberadas em breve.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MinhasAulasPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    }>
      <AulasContent />
    </Suspense>
  )
}
