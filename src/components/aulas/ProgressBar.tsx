interface ProgressBarProps {
  porcentagem: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'yellow' | 'red';
  animated?: boolean;
}

const SIZE_CLASSES = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

const COLOR_CLASSES = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
};

export function ProgressBar({
  porcentagem,
  showLabel = true,
  size = 'md',
  color = 'blue',
  animated = true,
}: ProgressBarProps) {
  const porcentagemSegura = Math.min(Math.max(porcentagem, 0), 100);

  // Determinar cor automática baseada na porcentagem
  let corFinal = color;
  if (porcentagemSegura === 100) {
    corFinal = 'green';
  } else if (porcentagemSegura >= 70) {
    corFinal = 'blue';
  } else if (porcentagemSegura >= 40) {
    corFinal = 'yellow';
  } else if (porcentagemSegura > 0) {
    corFinal = 'red';
  }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between text-sm text-gray-700 font-medium mb-2">
          <span>Progresso</span>
          <span>{porcentagemSegura}%</span>
        </div>
      )}
      <div className={`w-full ${SIZE_CLASSES[size]} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`${SIZE_CLASSES[size]} ${COLOR_CLASSES[corFinal]} ${
            animated ? 'transition-all duration-500 ease-out' : ''
          } rounded-full`}
          style={{ width: `${porcentagemSegura}%` }}
        ></div>
      </div>
    </div>
  );
}
