import { Suspense } from 'react';
import { getAulasPorNivel, getEstatisticasProgresso } from '@/lib/supabase/queries/aulas';
import { getUser } from '@/lib/supabase/server';
import { AulaCard } from '@/components/aulas/AulaCard';
import { StatsCard } from '@/components/aulas/StatsCard';
import { LevelBadge } from '@/components/aulas/LevelBadge';
import { BookOpen, Target, Lightbulb } from 'lucide-react';

export const metadata = {
  title: 'Aulas Iniciante | Nipo School',
  description: 'Fundação musical: consciência corporal, ritmo básico e iniciação instrumental',
};

async function AulasInicianteContent() {
  const user = await getUser();
  const aulas = await getAulasPorNivel('iniciante');
  const stats = await getEstatisticasProgresso(user?.id || '', 'iniciante');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="mb-3">
              <LevelBadge nivel="iniciante" size="lg" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Nível Iniciante
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Desperte sua consciência musical através da exploração sonora, ritmo corporal 
              e os primeiros contatos com instrumentos musicais.
            </p>
          </div>
          <div className="hidden lg:block text-8xl">🌱</div>
        </div>

        {/* Objetivos do nível */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-green-700" />
              </div>
              <h3 className="font-semibold text-gray-900">Consciência Rítmica</h3>
            </div>
            <p className="text-sm text-gray-600">
              Desenvolva percepção de ritmo através de sons corporais e do dia a dia
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-700" />
              </div>
              <h3 className="font-semibold text-gray-900">Iniciação Instrumental</h3>
            </div>
            <p className="text-sm text-gray-600">
              Primeiros sons no instrumento com postura e técnica corretas
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-green-700" />
              </div>
              <h3 className="font-semibold text-gray-900">Alfabetização Musical</h3>
            </div>
            <p className="text-sm text-gray-600">
              Introdução à notação musical e leitura de partituras simples
            </p>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Seu Progresso</h2>
        <StatsCard stats={stats} />
      </div>

      {/* Lista de Aulas */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Aulas do Nível Iniciante
          </h2>
          <span className="text-sm text-gray-600">
            {aulas.length} aulas disponíveis
          </span>
        </div>

        {aulas.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma aula encontrada
            </h3>
            <p className="text-gray-600">
              As aulas do nível iniciante estarão disponíveis em breve.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aulas.map((aula) => (
              <AulaCard key={aula.id} aula={aula} />
            ))}
          </div>
        )}
      </div>

      {/* Dicas e Metodologias */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Metodologias Utilizadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Orff Schulwerk
            </h3>
            <p className="text-sm text-gray-600">
              Exploração sonora livre e criatividade através de sons corporais e instrumentos de percussão.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Método Suzuki
            </h3>
            <p className="text-sm text-gray-600">
              Postura correta, empunhadura e primeiros sons no instrumento com técnica adequada.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Kodály
            </h3>
            <p className="text-sm text-gray-600">
              Alfabetização musical com foco em leitura de partituras e figuras rítmicas.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Dalcroze
            </h3>
            <p className="text-sm text-gray-600">
              Euritmia e coordenação através de jogos rítmicos em grupo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AulasIniciantePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando aulas...</p>
          </div>
        </div>
      }
    >
      <AulasInicianteContent />
    </Suspense>
  );
}
