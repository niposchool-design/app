import type { NivelAula } from '@/lib/types/aulas';
import { CORES_NIVEL } from '@/lib/types/aulas';

interface LevelBadgeProps {
  nivel: NivelAula;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const ICONS = {
  iniciante: '🌱',
  intermediario: '🌿',
  avancado: '🌳',
  todos: '🎯',
};

const LABELS = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
  todos: 'Todos os Níveis',
};

export function LevelBadge({ nivel, size = 'md', showIcon = true }: LevelBadgeProps) {
  const cores = CORES_NIVEL[nivel];
  const icon = ICONS[nivel];
  const label = LABELS[nivel];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${cores.bg} ${cores.text} ${sizeClasses[size]}`}
    >
      {showIcon && <span>{icon}</span>}
      {label}
    </span>
  );
}
