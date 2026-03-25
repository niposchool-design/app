'use client'

/**
 * Metodologias pedagógicas disponíveis no curriculum.
 * Fonte: docs/pedagogia/ESSENCIA_PEDAGOGICA.md
 */
export const METHODOLOGIES = {
  orff: {
    name: 'Orff Schulwerk',
    shortName: 'Orff',
    emoji: '🥁',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    description: 'Ritmo corporal, percussão e movimento criativo',
  },
  suzuki: {
    name: 'Suzuki',
    shortName: 'Suzuki',
    emoji: '🎻',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    description: 'Aprendizagem pelo ouvido, repetição e ambiente familiar',
  },
  kodaly: {
    name: 'Kodály',
    shortName: 'Kodály',
    emoji: '🎵',
    color: 'bg-green-100 text-green-700 border-green-200',
    description: 'Solfejo, canto e leitura musical progressiva',
  },
  dalcroze: {
    name: 'Dalcroze',
    shortName: 'Dalcroze',
    emoji: '💃',
    color: 'bg-pink-100 text-pink-700 border-pink-200',
    description: 'Euritmia — corpo como instrumento musical',
  },
  gordon: {
    name: 'Gordon',
    shortName: 'Gordon',
    emoji: '🧠',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    description: 'Audiação — pensar musicalmente antes de tocar',
  },
  berklee: {
    name: 'Berklee',
    shortName: 'Berklee',
    emoji: '🎸',
    color: 'bg-red-100 text-red-700 border-red-200',
    description: 'Performance contemporânea, harmonia e improvisação',
  },
  presto: {
    name: 'PRESTO',
    shortName: 'PRESTO',
    emoji: '⚡',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    description: 'Produção musical, tecnologia e criação digital',
  },
  waldorf: {
    name: 'Waldorf',
    shortName: 'Waldorf',
    emoji: '🌈',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    description: 'Arte integrada, pentatônica e expressão livre',
  },
  musicalFutures: {
    name: 'Musical Futures',
    shortName: 'M. Futures',
    emoji: '🤝',
    color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    description: 'Aprendizagem informal, bandas e repertório popular',
  },
  brasileiras: {
    name: 'Experiências Brasileiras',
    shortName: 'Brasil',
    emoji: '🇧🇷',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    description: 'Villa-Lobos, canto orfeônico, cultura brasileira',
  },
  alpha: {
    name: 'Princípio Alpha',
    shortName: 'Alpha',
    emoji: '🎌',
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    description: 'Sistema adaptativo Nipo School: disciplina + criatividade',
  },
} as const

export type MethodologyKey = keyof typeof METHODOLOGIES

interface MethodologyBadgeProps {
  methodology: MethodologyKey | string
  size?: 'sm' | 'md'
  showDescription?: boolean
}

export function MethodologyBadge({
  methodology,
  size = 'sm',
  showDescription = false,
}: MethodologyBadgeProps) {
  const key = methodology as MethodologyKey
  const config = METHODOLOGIES[key]

  if (!config) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs border border-gray-200">
        📎 {methodology}
      </span>
    )
  }

  if (size === 'sm') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${config.color}`}
        title={config.description}
      >
        {config.emoji} {config.shortName}
      </span>
    )
  }

  return (
    <div className={`rounded-xl border p-3 ${config.color}`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{config.emoji}</span>
        <div>
          <p className="font-bold text-sm">{config.name}</p>
          {showDescription && (
            <p className="text-xs opacity-80 mt-0.5">{config.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

interface MethodologyListProps {
  methodologies: (MethodologyKey | string)[]
  size?: 'sm' | 'md'
}

export function MethodologyList({ methodologies, size = 'sm' }: MethodologyListProps) {
  if (!methodologies || methodologies.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {methodologies.map(m => (
        <MethodologyBadge key={m} methodology={m} size={size} />
      ))}
    </div>
  )
}
