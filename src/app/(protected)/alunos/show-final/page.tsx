import { Suspense } from 'react';
import { getAulasShowFinal } from '@/lib/supabase/queries/aulas';
import { Calendar, Users, Video, Music } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Show Final | Nipo School',
  description: 'Preparação e apresentação do show final - Dezembro 2025',
};

async function ShowFinalContent() {
  const aulas = await getAulasShowFinal();

  // Calcular dias até o show
  const dataShow = new Date('2025-12-20');
  const hoje = new Date();
  const diasRestantes = Math.ceil((dataShow.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-8">
      {/* Header com Countdown */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium mb-4">
                🎭 Evento Especial
              </div>
              <h1 className="text-5xl font-bold mb-3">
                Show Final 2025
              </h1>
              <p className="text-xl text-blue-100 mb-6 max-w-2xl">
                A culminação de meses de aprendizado, prática e dedicação. 
                Prepare-se para brilhar no palco!
              </p>
              <div className="flex items-center gap-4 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>20 de Dezembro, 2025</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block text-9xl">🎪</div>
          </div>

          {/* Countdown */}
          {diasRestantes > 0 ? (
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 mt-8">
              <div className="text-center">
                <p className="text-sm text-blue-100 mb-2">Faltam apenas</p>
                <div className="text-6xl font-bold mb-2">
                  {diasRestantes}
                </div>
                <p className="text-lg text-blue-100">
                  {diasRestantes === 1 ? 'dia' : 'dias'} para o show!
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 mt-8 text-center">
              <p className="text-2xl font-bold">🎉 O show já aconteceu! 🎉</p>
            </div>
          )}
        </div>
      </div>

      {/* Timeline das Aulas de Preparação */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Jornada de Preparação
        </h2>
        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="space-y-8">
            {aulas.map((aula, index) => {
              const isLast = index === aulas.length - 1;
              const dataFormatada = new Date(aula.data_programada).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
              });

              // Cores progressivas
              const cores = [
                'from-blue-500 to-blue-600',
                'from-indigo-500 to-indigo-600',
                'from-purple-500 to-purple-600',
                'from-pink-500 to-pink-600',
                'from-rose-500 to-rose-600',
              ];
              const corGradiente = cores[index % cores.length];

              return (
                <div key={aula.id} className="relative pl-20">
                  {/* Número na timeline */}
                  <div
                    className={`absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br ${corGradiente} text-white flex items-center justify-center font-bold text-xl shadow-lg z-10`}
                  >
                    {aula.numero}
                  </div>

                  {/* Card da aula */}
                  <Link href={`/alunos/aulas/${aula.numero}`}>
                    <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all p-6 group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-medium text-gray-500">
                              {dataFormatada}
                            </span>
                            {isLast && (
                              <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-xs font-bold">
                                SHOW FINAL 🎭
                              </span>
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                            {aula.titulo}
                          </h3>
                          <p className="text-gray-600">
                            {aula.objetivo_didatico}
                          </p>
                        </div>
                      </div>

                      {/* Tags das atividades */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {aula.numero === 25 && (
                          <>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              🎵 Ensaio Geral
                            </span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                              🎸 Prática de Grupos
                            </span>
                          </>
                        )}
                        {aula.numero === 26 && (
                          <>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                              🎹 Afinação
                            </span>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                              📝 Ajustes Finais
                            </span>
                          </>
                        )}
                        {aula.numero === 27 && (
                          <>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                              🎨 Avaliação Criativa
                            </span>
                            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                              📊 Portfolio
                            </span>
                          </>
                        )}
                        {aula.numero === 28 && (
                          <>
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                              🎭 Ensaio com Figurino
                            </span>
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                              🎬 Preparação de Palco
                            </span>
                          </>
                        )}
                        {aula.numero === 29 && (
                          <>
                            <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold">
                              🌟 SHOW AO VIVO
                            </span>
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-bold">
                              🎊 Celebração
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Informações Importantes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-blue-700" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Prática em Grupo</h3>
          <p className="text-sm text-gray-600">
            Ensaios colaborativos com sua banda ou dupla para sincronização perfeita.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
            <Video className="w-6 h-6 text-purple-700" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Gravação de Ensaios</h3>
          <p className="text-sm text-gray-600">
            Registros em vídeo para revisão e acompanhamento da evolução.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center mb-4">
            <Music className="w-6 h-6 text-pink-700" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Repertório Completo</h3>
          <p className="text-sm text-gray-600">
            Apresentação de todas as músicas aprendidas ao longo do ano.
          </p>
        </div>
      </div>

      {/* Checklist de Preparação */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          ✅ Checklist de Preparação
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Repertório Definido</h4>
              <p className="text-sm text-gray-600">Músicas selecionadas e ordem de apresentação</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">○</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Ensaios Completos</h4>
              <p className="text-sm text-gray-600">Mínimo de 3 ensaios gerais realizados</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">○</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Material Organizado</h4>
              <p className="text-sm text-gray-600">Partituras, instrumentos e figurino preparados</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">○</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Confirmação de Presença</h4>
              <p className="text-sm text-gray-600">Todos os membros confirmados para o show</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShowFinalPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando show final...</p>
          </div>
        </div>
      }
    >
      <ShowFinalContent />
    </Suspense>
  );
}
