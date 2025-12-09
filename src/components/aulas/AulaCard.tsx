import Link from 'next/link';
import { Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';
import type { Aula } from '@/lib/types/aulas';
import { CORES_NIVEL, STATUS_CONFIG } from '@/lib/types/aulas';

interface AulaCardProps {
  aula: Aula;
  progresso?: {
    status: 'nao_iniciada' | 'em_andamento' | 'concluida';
    porcentagem_completa: number;
  };
}

export function AulaCard({ aula, progresso }: AulaCardProps) {
  const nivelColors = CORES_NIVEL[aula.nivel];
  const statusConfig = STATUS_CONFIG[aula.status];

  const progressoStatus = progresso?.status || 'nao_iniciada';
  const porcentagem = progresso?.porcentagem_completa || 0;

  // Formatar data
  const dataFormatada = new Date(aula.data_programada).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <Link href={`/alunos/aulas/${aula.numero}`}>
      <div className="group relative bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 overflow-hidden">
        {/* Header com número e badge de nível */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 text-white font-bold text-lg">
              {aula.numero}
            </div>
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${nivelColors.bg} ${nivelColors.text}`}
              >
                {aula.nivel.charAt(0).toUpperCase() + aula.nivel.slice(1)}
              </span>
            </div>
          </div>

          {/* Status do progresso */}
          {progressoStatus === 'concluida' && (
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              Concluída
            </div>
          )}
          {progressoStatus === 'em_andamento' && (
            <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
              Em andamento
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="px-6 pb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
            {aula.titulo}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {aula.objetivo_didatico}
          </p>

          {/* Metodologia */}
          {aula.metodologia_principal && (
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">
                {aula.metodologia_principal}
              </span>
            </div>
          )}

          {/* Info da aula */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{dataFormatada}</span>
            </div>
            {aula.duracao_minutos && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{aula.duracao_minutos} min</span>
              </div>
            )}
          </div>

          {/* Barra de progresso */}
          {progressoStatus !== 'nao_iniciada' && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Progresso</span>
                <span className="font-medium">{porcentagem}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    progressoStatus === 'concluida' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${porcentagem}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {aula.modulo || 'Currículo Nipo School'}
            </span>
            <div className="flex items-center gap-1 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              Acessar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
