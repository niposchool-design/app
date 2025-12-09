import { Suspense } from 'react';
import { getAulasPorNivel, getEstatisticasProgresso } from '@/lib/supabase/queries/aulas';
import { getUser } from '@/lib/supabase/server';
import { AulaCard } from '@/components/aulas/AulaCard';
import { StatsCard } from '@/components/aulas/StatsCard';
import { LevelBadge } from '@/components/aulas/LevelBadge';
import { Music, Users, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Aulas Intermediário | Nipo School',
  description: 'Desenvolvimento técnico: leitura musical, repertório brasileiro e criatividade',
};

async function AulasIntermediarioContent() {
  const user = await getUser();
  const aulas = await getAulasPorNivel('intermediario');
  const stats = await getEstatisticasProgresso(user?.id || '', 'intermediario');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="mb-3">
              <LevelBadge nivel="intermediario" size="lg" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Nível Intermediário
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Aprofunde sua técnica musical, explore repertório brasileiro e desenvolva 
              sua criatividade através de melodias e harmonias.
            </p>
          </div>
          <div className="hidden lg:block text-8xl">🌿</div>
        </div>

        {/* Objetivos do nível */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Music className="w-5 h-5 text-yellow-700" />
              </div>
              <h3 className="font-semibold text-gray-900">Leitura Musical</h3>
            </div>
            <p className="text-sm text-gray-600">
              Domine a notação musical e desenvolva fluência na leitura de partituras
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-yellow-700" />
              </div>
              <h3 className="font-semibold text-gray-900">Prática de Conjunto</h3>
            </div>
            <p className="text-sm text-gray-600">
              Toque em grupo com repertório brasileiro: samba, baião e gospel
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-yellow-700" />
              </div>
              <h3 className="font-semibold text-gray-900">Melodia Criativa</h3>
            </div>
            <p className="text-sm text-gray-600">
              Crie suas próprias melodias e explore possibilidades harmônicas
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
            Aulas do Nível Intermediário
          </h2>
          <span className="text-sm text-gray-600">
            {aulas.length} aulas disponíveis
          </span>
        </div>

        {aulas.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Music className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma aula encontrada
            </h3>
            <p className="text-gray-600">
              Complete o nível iniciante para desbloquear as aulas intermediárias.
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
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Kodály
            </h3>
            <p className="text-sm text-gray-600">
              Alfabetização musical avançada com foco em leitura fluente e teoria aplicada.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Experiências Brasileiras
            </h3>
            <p className="text-sm text-gray-600">
              Repertório nacional: samba, baião, gospel e música popular brasileira.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Gordon Music Learning
            </h3>
            <p className="text-sm text-gray-600">
              Desenvolvimento auditivo, afinação e criação de melodias.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Musical Futures
            </h3>
            <p className="text-sm text-gray-600">
              Aprendizado colaborativo através de prática de conjunto e apresentações.
            </p>
          </div>
        </div>
      </div>

      {/* Pré-requisitos */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Music className="w-6 h-6 text-blue-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              💡 Dica: Pré-requisitos
            </h3>
            <p className="text-sm text-gray-700">
              Para aproveitar melhor este nível, certifique-se de ter concluído as aulas do 
              <strong> nível iniciante</strong>, especialmente as aulas de alfabetização musical 
              e iniciação instrumental. Isso garantirá uma base sólida para os conceitos mais avançados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AulasIntermediarioPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando aulas...</p>
          </div>
        </div>
      }
    >
      <AulasIntermediarioContent />
    </Suspense>
  );
}
