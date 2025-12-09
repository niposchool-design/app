import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getAulaPorNumero } from '@/lib/supabase/queries/aulas';
import { MaterialList } from '@/components/aulas/MaterialList';
import { LevelBadge } from '@/components/aulas/LevelBadge';
import { Calendar, Clock, BookOpen, CheckCircle, Play, Download } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ numero: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const numero = parseInt(resolvedParams.numero);
  const aula = await getAulaPorNumero(numero);

  if (!aula) {
    return {
      title: 'Aula não encontrada | Nipo School',
    };
  }

  return {
    title: `Aula ${aula.numero}: ${aula.titulo} | Nipo School`,
    description: aula.objetivo_didatico,
  };
}

async function AulaDetalhesContent({ numero }: { numero: number }) {
  const aula = await getAulaPorNumero(numero);

  if (!aula) {
    notFound();
  }

  const dataFormatada = new Date(aula.data_programada).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/alunos/dashboard" className="hover:text-gray-900">
          Dashboard
        </Link>
        <span>/</span>
        <Link href={`/alunos/aulas/${aula.nivel}`} className="hover:text-gray-900">
          Aulas {aula.nivel}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Aula {aula.numero}</span>
      </nav>

      {/* Header da Aula */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/20 backdrop-blur text-white font-bold text-2xl">
                  {aula.numero}
                </div>
                <LevelBadge nivel={aula.nivel} size="lg" />
              </div>
              <h1 className="text-4xl font-bold mb-3">{aula.titulo}</h1>
              <p className="text-xl text-gray-200 mb-6">{aula.objetivo_didatico}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{dataFormatada}</span>
                </div>
                {aula.duracao_minutos && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{aula.duracao_minutos} minutos</span>
                  </div>
                )}
                {aula.formato && (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full capitalize">
                      {aula.formato}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Metodologia */}
          {aula.metodologia_principal && (
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Metodologia: {aula.metodologia_principal}</span>
              {aula.metodologias_secundarias && aula.metodologias_secundarias.length > 0 && (
                <span className="text-gray-300">
                  + {aula.metodologias_secundarias.join(', ')}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Barra de progresso (placeholder - pode ser conectado ao banco depois) */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Seu progresso nesta aula</span>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm font-medium">
              <Play className="w-4 h-4" />
              Iniciar Aula
            </button>
          </div>
        </div>
      </div>

      {/* Grid de Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-8">
          {/* Resumo das Atividades */}
          {aula.resumo_atividades && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📋 Resumo das Atividades
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>{aula.resumo_atividades}</p>
              </div>
            </div>
          )}

          {/* Seções da Aula */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="grid grid-cols-3">
                <button className="px-6 py-4 text-sm font-medium text-gray-900 border-b-2 border-gray-900 bg-gray-50">
                  Antes da Aula
                </button>
                <button className="px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                  Durante a Aula
                </button>
                <button className="px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                  Depois da Aula
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📚 O que estudar</h3>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Revise os materiais disponíveis abaixo</li>
                    <li>Assista aos vídeos introdutórios</li>
                    <li>Prepare seu instrumento</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🎯 Materiais Necessários</h3>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Instrumento musical</li>
                    <li>Partituras (disponíveis para download)</li>
                    <li>Caderno de anotações</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🎥 Vídeos Preparatórios</h3>
                  <p className="text-sm text-gray-600">
                    Vídeos estarão disponíveis 48h antes da aula.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Materiais de Apoio */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📁 Materiais de Apoio
            </h2>
            <MaterialList materiais={aula.materiais || []} />
          </div>

          {/* Desafio Alpha */}
          {aula.desafio_alpha && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Desafio Alpha
                  </h2>
                  <p className="text-gray-700">{aula.desafio_alpha}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Entregue seu desafio e ganhe pontos!</span>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm font-medium">
                    <Download className="w-4 h-4" />
                    Enviar Desafio
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Checklist */}
          {aula.checklist && aula.checklist.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                ✅ Checklist da Aula
              </h2>
              <div className="space-y-3">
                {aula.checklist.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 border-2 ${
                      item.concluido ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}>
                      {item.concluido && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${item.concluido ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {item.descricao}
                      </p>
                      <span className="text-xs text-gray-500 capitalize">
                        {item.tipo.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Próxima Aula */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">⏭️ Próxima Aula</h3>
            {aula.numero < 29 ? (
              <Link
                href={`/alunos/aulas/${aula.numero + 1}`}
                className="block p-4 bg-white rounded-lg hover:shadow-md transition-all border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold">
                    {aula.numero + 1}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Aula {aula.numero + 1}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Complete esta aula para desbloquear
                </p>
              </Link>
            ) : (
              <p className="text-sm text-gray-600">
                Esta é a última aula! 🎉
              </p>
            )}
          </div>

          {/* Informações Adicionais */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">ℹ️ Informações</h3>
            <div className="space-y-3 text-sm">
              {aula.modulo && (
                <div>
                  <p className="text-gray-500 mb-1">Módulo</p>
                  <p className="font-medium text-gray-900">{aula.modulo}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500 mb-1">Status</p>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium capitalize">
                  {aula.status.replace('_', ' ')}
                </span>
              </div>
              {aula.professor_responsavel_id && (
                <div>
                  <p className="text-gray-500 mb-1">Professor Responsável</p>
                  <p className="font-medium text-gray-900">Prof. Nipo School</p>
                </div>
              )}
            </div>
          </div>

          {/* Dúvidas */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
            <h3 className="font-bold text-gray-900 mb-2">💬 Dúvidas?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Entre em contato com seu professor para esclarecer qualquer questão.
            </p>
            <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium">
              Enviar Mensagem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function AulaDetalhesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const numero = parseInt(resolvedParams.numero);

  if (isNaN(numero)) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando aula...</p>
          </div>
        </div>
      }
    >
      <AulaDetalhesContent numero={numero} />
    </Suspense>
  );
}
