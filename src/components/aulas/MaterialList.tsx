import { Download, ExternalLink, FileText, Video, Music, Headphones, ClipboardList, Presentation, Link as LinkIcon } from 'lucide-react';
import type { Material, TipoMaterial } from '@/lib/types/aulas';

interface MaterialListProps {
  materiais: Material[];
  showObrigatorio?: boolean;
}

const ICONES_MATERIAL: Record<TipoMaterial, React.ElementType> = {
  pdf: FileText,
  video: Video,
  partitura: Music,
  audio: Headphones,
  formulario: ClipboardList,
  slide: Presentation,
  link: LinkIcon,
};

const CORES_MATERIAL: Record<TipoMaterial, string> = {
  pdf: 'bg-red-100 text-red-700',
  video: 'bg-purple-100 text-purple-700',
  partitura: 'bg-blue-100 text-blue-700',
  audio: 'bg-green-100 text-green-700',
  formulario: 'bg-yellow-100 text-yellow-700',
  slide: 'bg-orange-100 text-orange-700',
  link: 'bg-gray-100 text-gray-700',
};

export function MaterialList({ materiais, showObrigatorio = true }: MaterialListProps) {
  if (!materiais || materiais.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>Nenhum material disponível ainda</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {materiais.map((material) => {
        const Icone = ICONES_MATERIAL[material.tipo];
        const corClasse = CORES_MATERIAL[material.tipo];

        return (
          <div
            key={material.id}
            className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all group"
          >
            {/* Ícone */}
            <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${corClasse} flex items-center justify-center`}>
              <Icone className="w-6 h-6" />
            </div>

            {/* Conteúdo */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {material.titulo}
                    {showObrigatorio && material.obrigatorio && (
                      <span className="ml-2 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">
                        Obrigatório
                      </span>
                    )}
                  </h4>
                  {material.descricao && (
                    <p className="text-sm text-gray-600 mb-2">{material.descricao}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="capitalize">{material.tipo}</span>
                    {!material.visivel_antes_aula && (
                      <span className="text-yellow-600">• Disponível após a aula</span>
                    )}
                  </div>
                </div>

                {/* Botão de ação */}
                {material.url && (
                  <a
                    href={material.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm font-medium group-hover:scale-105 transition-transform"
                  >
                    {material.tipo === 'link' ? (
                      <>
                        <ExternalLink className="w-4 h-4" />
                        Abrir
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download
                      </>
                    )}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
