import { Suspense } from 'react';
import { getAulasPorNivel, getEstatisticasProgresso } from '@/lib/supabase/queries/aulas';
import { getUser } from '@/lib/supabase/server';
import { AulaCard } from '@/components/aulas/AulaCard';
import { StatsCard } from '@/components/aulas/StatsCard';
import { LevelBadge } from '@/components/aulas/LevelBadge';
import { Zap, Palette, Globe } from 'lucide-react';

export const metadata = {
  title: 'Aulas Avançado | Nipo School',
  description: 'Domínio musical: harmonia, composição, tecnologia e performance',
};

async function AulasAvancadoContent() {
  const user = await getUser();
  const aulas = await getAulasPorNivel('avancado');
  const stats = await getEstatisticasProgresso(user?.id || '', 'avancado');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8 border border-red-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="mb-3">
              <LevelBadge nivel="avancado" size="lg" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Nível Avançado
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Alcance o domínio musical através de harmonia avançada, composição coletiva, 
              tecnologia musical e preparação para performance profissional.
            </p>
          </div>
          <div className="hidden lg:block text-8xl">🌳</div>
        </div>

        {/* Objetivos do nível */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-red-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Palette className="w-5 h-5 text-red-700" />
              </div>
              <h3 className="font-semibold text-gray-900">Composição</h3>
            </div>
            <p className="text-sm text-gray-600">
              Crie composições originais e desenvolva arranjos colaborativos
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-red-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-red-700" />
              </div>
              <h3 className="font-semibold text-gray-900">Tecnologia Musical</h3>
            </div>
            <p className="text-sm text-gray-600">
              Domine gravação, looping e produção de vídeos musicais
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-red-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Globe className="w-5 h-5 text-red-700" />
              </div>
              <h3 className="font-semibold text-gray-900">Multiculturalismo</h3>
            </div>
            <p className="text-sm text-gray-600">
              Explore repertório japonês e músicas contemporâneas globais
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
            Aulas do Nível Avançado
          </h2>
          <span className="text-sm text-gray-600">
            {aulas.length} aulas disponíveis
          </span>
        </div>

        {aulas.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Zap className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma aula encontrada
            </h3>
            <p className="text-gray-600">
              Complete o nível intermediário para desbloquear as aulas avançadas.
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
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Berklee College of Music
            </h3>
            <p className="text-sm text-gray-600">
              Técnicas avançadas de improvisação, harmonia e composição profissional.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              PRESTO (Tecnologia Musical)
            </h3>
            <p className="text-sm text-gray-600">
              Gravação caseira, looping, uso de apps musicais e produção digital.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Musical Futures
            </h3>
            <p className="text-sm text-gray-600">
              Formação de bandas, arranjos colaborativos e performance de grupos.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Waldorf
            </h3>
            <p className="text-sm text-gray-600">
              Apreciação multicultural com foco em música japonesa e mundial.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Gordon Music Learning
            </h3>
            <p className="text-sm text-gray-600">
              Improvisação guiada e desenvolvimento auditivo avançado.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Orff Schulwerk
            </h3>
            <p className="text-sm text-gray-600">
              Criatividade avançada através de composição coletiva experimental.
            </p>
          </div>
        </div>
      </div>

      {/* Destaque: Projetos */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Palette className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              🎨 Projetos Criativos
            </h3>
            <p className="text-gray-700">
              No nível avançado, você terá a oportunidade de desenvolver projetos únicos:
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-1">Composição Coletiva</h4>
            <p className="text-sm text-gray-600">
              Crie uma música original com seu grupo, do conceito à gravação final.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-1">Vídeo Musical</h4>
            <p className="text-sm text-gray-600">
              Produza e grave um videoclipe com edição e trilha sonora original.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-1">Arranjo Pop</h4>
            <p className="text-sm text-gray-600">
              Transforme uma música popular em um arranjo único para seu instrumento.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-1">Performance de Banda</h4>
            <p className="text-sm text-gray-600">
              Forme uma banda ou dupla e prepare um repertório completo.
            </p>
          </div>
        </div>
      </div>

      {/* Pré-requisitos */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-blue-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              ⚡ Pré-requisitos
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              O nível avançado exige domínio completo dos conceitos anteriores:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Leitura fluente de partituras</li>
              <li>Técnica instrumental consolidada</li>
              <li>Conhecimento de harmonia básica</li>
              <li>Experiência em prática de conjunto</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AulasAvancadoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando aulas...</p>
          </div>
        </div>
      }
    >
      <AulasAvancadoContent />
    </Suspense>
  );
}
