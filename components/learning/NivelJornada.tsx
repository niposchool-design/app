'use client'

// =============================================================================
// NivelJornada — Jornada de niveis conectada (Nipo Wa)
// =============================================================================
// Componente de APRESENTACAO puro. NAO faz fetch, NAO conhece Supabase, NAO
// importa rotas vivas. Recebe tudo por props. Serve de base para o incremento
// "front por nivel" descrito em docs/arquitetura/FRONT_POR_NIVEL_SPEC.md.
//
// AINDA NAO ESTA LIGADO A NENHUMA ROTA EM PRODUCAO. Importacao deve ser
// puramente aditiva. Ate validar em navegador (R-005), tratar como rascunho
// visual seguro.
//
// Design System: Nipo Wa (design-system/AGENT_GUIDE.md)
//  - Cor por papel via prop `role` (aluno=vermelho, professor=azul,
//    admin=roxo, familia=ambar). Sem hex hardcoded — usa as escalas de papel
//    do Tailwind (student/teacher/admin/family) ja definidas em tailwind.config.ts.
//  - Numeros (nivel, contadores) usam a classe `.nw-tabular` (JetBrains Mono).
//  - Tom PT-BR, encorajador. Celebracao de progresso e metodologia (Eixo Alpha).
// =============================================================================

import type { ReactNode } from 'react'

// -----------------------------------------------------------------------------
// Tipos
// -----------------------------------------------------------------------------

/** Papel ativo — define a cor da jornada (tokens de papel do DS). */
export type JornadaRole = 'student' | 'teacher' | 'admin' | 'family'

/** Estado de um no (nivel) na jornada. */
export type NivelStatus =
  | 'completed' // todas as aulas do nivel concluidas
  | 'current'   // nivel em andamento (proximo passo do aluno)
  | 'available' // desbloqueado, ainda nao iniciado
  | 'locked'    // bloqueado por pre-requisito

/** Um no da jornada de niveis. */
export interface NivelNode {
  /** Chave estavel (ex.: 'iniciante', 'retomada'). */
  key: string
  /** Rotulo visivel (ex.: 'Iniciante'). PT-BR. */
  label: string
  /** Emoji opcional do nivel (ex.: '🌱'). */
  emoji?: string
  /** Descricao curta opcional. */
  description?: string
  /** Total de aulas do nivel. */
  total: number
  /** Aulas concluidas pelo aluno (0 em visoes sem aluno especifico). */
  completed: number
  /** Estado calculado pelo chamador. */
  status: NivelStatus
  /**
   * Destino opcional ao clicar. O componente NAO importa next/link nem rotas;
   * quem usa decide se passa href (renderiza <a>) ou onSelect (botao).
   */
  href?: string
  /** Texto auxiliar quando bloqueado (ex.: 'Requer 5 aulas'). PT-BR. */
  lockedHint?: string
  /** Slot livre para metrica extra (ex.: "12 alunos" na visao de professor). */
  badge?: ReactNode
}

export interface NivelJornadaProps {
  /** Papel ativo — controla a cor da trilha e dos nos. */
  role?: JornadaRole
  /** Nos em ordem de progressao (Ano1→Ano2, do primeiro ao ultimo). */
  niveis: NivelNode[]
  /** Orientacao do fluxo. Default: 'vertical'. */
  orientation?: 'vertical' | 'horizontal'
  /** Titulo opcional acima da jornada. PT-BR. */
  titulo?: string
  /** Handler de selecao (usado quando o no nao tem href). */
  onSelect?: (node: NivelNode) => void
  className?: string
}

// -----------------------------------------------------------------------------
// Mapas de estilo por papel (tokens do DS — sem hex solto)
// -----------------------------------------------------------------------------

const ROLE_LINE: Record<JornadaRole, string> = {
  student: 'bg-student',
  teacher: 'bg-teacher',
  admin: 'bg-admin',
  family: 'bg-family',
}

const ROLE_NODE_ACTIVE: Record<JornadaRole, string> = {
  student: 'bg-student text-white border-student',
  teacher: 'bg-teacher text-white border-teacher',
  admin: 'bg-admin text-white border-admin',
  family: 'bg-family text-white border-family',
}

const ROLE_NODE_CURRENT_RING: Record<JornadaRole, string> = {
  student: 'ring-student/30',
  teacher: 'ring-teacher/30',
  admin: 'ring-admin/30',
  family: 'ring-family/30',
}

const ROLE_TEXT: Record<JornadaRole, string> = {
  student: 'text-student-dark',
  teacher: 'text-teacher-dark',
  admin: 'text-admin-dark',
  family: 'text-family-dark',
}

// -----------------------------------------------------------------------------
// Subcomponente: marcador (no) da jornada
// -----------------------------------------------------------------------------

function NodeMarker({ node, role }: { node: NivelNode; role: JornadaRole }) {
  const base =
    'relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all'

  if (node.status === 'completed') {
    return (
      <div className={`${base} ${ROLE_NODE_ACTIVE[role]}`} aria-label="Nivel concluido">
        <span aria-hidden>{node.emoji ?? '✓'}</span>
      </div>
    )
  }
  if (node.status === 'current') {
    return (
      <div
        className={`${base} ${ROLE_NODE_ACTIVE[role]} ring-4 ${ROLE_NODE_CURRENT_RING[role]}`}
        aria-label="Nivel atual"
      >
        <span aria-hidden>{node.emoji ?? '▶'}</span>
      </div>
    )
  }
  if (node.status === 'locked') {
    return (
      <div
        className={`${base} bg-gray-100 border-gray-200 text-gray-400`}
        aria-label="Nivel bloqueado"
      >
        <span aria-hidden>🔒</span>
      </div>
    )
  }
  // available
  return (
    <div
      className={`${base} bg-white border-gray-300 ${ROLE_TEXT[role]}`}
      aria-label="Nivel disponivel"
    >
      <span aria-hidden>{node.emoji ?? '○'}</span>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Subcomponente: cartao de conteudo do no
// -----------------------------------------------------------------------------

function NodeCard({
  node,
  role,
  onSelect,
}: {
  node: NivelNode
  role: JornadaRole
  onSelect?: (node: NivelNode) => void
}) {
  const percent = node.total > 0 ? Math.round((node.completed / node.total) * 100) : 0
  const isLocked = node.status === 'locked'

  const inner = (
    <div
      className={`flex-1 nw-card p-4 transition-all ${
        node.status === 'current'
          ? 'shadow-md'
          : isLocked
            ? 'opacity-60'
            : 'hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className={`font-bold text-sm ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}>
          {node.label}
        </h3>
        {node.badge}
      </div>

      {node.description && (
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{node.description}</p>
      )}

      {isLocked ? (
        <p className={`text-xs font-medium ${ROLE_TEXT[role]}`}>
          {node.lockedHint ?? 'Bloqueado'}
        </p>
      ) : (
        <>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-500 nw-tabular">
              {node.completed}/{node.total} aulas
            </span>
            <span className={`font-bold nw-tabular ${ROLE_TEXT[role]}`}>{percent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className={`${ROLE_LINE[role]} h-2 rounded-full transition-all`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </>
      )}
    </div>
  )

  // Sem href: usa botao (acessivel) quando ha onSelect e nao esta bloqueado.
  if (!node.href && onSelect && !isLocked) {
    return (
      <button
        type="button"
        onClick={() => onSelect(node)}
        className="flex-1 text-left nw-focusable rounded-2xl"
      >
        {inner}
      </button>
    )
  }

  // Com href: renderiza <a> nativo (componente nao depende de next/link).
  if (node.href && !isLocked) {
    return (
      <a href={node.href} className="flex-1 nw-focusable rounded-2xl">
        {inner}
      </a>
    )
  }

  return inner
}

// -----------------------------------------------------------------------------
// Componente principal
// -----------------------------------------------------------------------------

export function NivelJornada({
  role = 'student',
  niveis,
  orientation = 'vertical',
  titulo,
  onSelect,
  className = '',
}: NivelJornadaProps) {
  if (niveis.length === 0) {
    return (
      <div className={`nw-card p-8 text-center text-sm text-gray-500 ${className}`}>
        Nenhum nivel para exibir ainda.
      </div>
    )
  }

  if (orientation === 'horizontal') {
    return (
      <section className={className} aria-label={titulo ?? 'Jornada de niveis'}>
        {titulo && <h2 className="text-lg font-bold text-gray-900 mb-4">{titulo}</h2>}
        <div className="flex items-stretch gap-3 overflow-x-auto pb-2">
          {niveis.map((node, i) => (
            <div key={node.key} className="flex items-center gap-3 flex-shrink-0">
              <div className="flex flex-col items-center w-44">
                <NodeMarker node={node} role={role} />
                <div className="mt-3 w-full">
                  <NodeCard node={node} role={role} onSelect={onSelect} />
                </div>
              </div>
              {i < niveis.length - 1 && (
                <div
                  className={`h-0.5 w-6 flex-shrink-0 ${
                    node.status === 'completed' ? ROLE_LINE[role] : 'bg-gray-200'
                  }`}
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }

  // vertical (default) — linha conectando os nos, estilo jornada
  return (
    <section className={className} aria-label={titulo ?? 'Jornada de niveis'}>
      {titulo && <h2 className="text-lg font-bold text-gray-900 mb-4">{titulo}</h2>}
      <div className="relative">
        {/* Linha vertical conectora */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden />
        <div className="space-y-3">
          {niveis.map((node) => (
            <div key={node.key} className="relative flex items-start gap-4 pl-1">
              <NodeMarker node={node} role={role} />
              <NodeCard node={node} role={role} onSelect={onSelect} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NivelJornada

// =============================================================================
// EXEMPLO DE USO (apenas referencia — nao executar, nao ligar em rota viva):
//
//   import { NivelJornada, type NivelNode } from '@/components/learning/NivelJornada'
//   import { LESSON_LEVELS } from '@/lib/lessons/constants'
//
//   // Derivar `niveis` no chamador (page/client) a partir de v_lessons +
//   // v_lesson_progress (mesma logica de levelStatsY1/Y2 ja existente em
//   // app/(protected)/lessons/page.tsx). O componente nao faz fetch.
//   const niveis: NivelNode[] = [
//     {
//       key: 'iniciante',
//       label: 'Iniciante',
//       emoji: '🌱',
//       description: LESSON_LEVELS.iniciante.description,
//       total: 7,
//       completed: 7,
//       status: 'completed',
//       href: '/lessons/iniciante',
//     },
//     {
//       key: 'intermediario',
//       label: 'Intermediario',
//       emoji: '🌿',
//       total: 8,
//       completed: 2,
//       status: 'current',
//       href: '/lessons/intermediario',
//     },
//     {
//       key: 'avancado',
//       label: 'Avancado',
//       emoji: '🌳',
//       total: 10,
//       completed: 0,
//       status: 'locked',
//       lockedHint: 'Requer 10 aulas concluidas',
//     },
//   ]
//
//   <NivelJornada role="student" titulo="Sua jornada — Ano 1" niveis={niveis} />
//
//   // Visao professor (visao "alunos por nivel"): role="teacher" e use `badge`
//   // para a contagem de alunos por nivel (depende de view nova — ver SPEC):
//   //   badge: <span className="nw-tabular text-xs ...">12 alunos</span>
// =============================================================================
