import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Heart, Music, Clock, Star, Play, Volume2 } from 'lucide-react';
export function InstrumentoCard({ instrumento, isFavorite = false, isMyInstrument = false, hasAudio = false, hasVideo = false, onToggleFavorite, onAddToMyInstruments, onPlayAudio, onViewDetails, className = '' }) {
    const dificuldadeColors = {
        'Fácil': 'text-green-600 bg-green-100',
        'Médio': 'text-yellow-600 bg-yellow-100',
        'Difícil': 'text-red-600 bg-red-100'
    };
    return (_jsxs("div", { className: `
      bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200
      ${className}
    `, children: [_jsxs("div", { className: "relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden", children: [instrumento.imagem_url ? (_jsx("img", { src: instrumento.imagem_url, alt: instrumento.nome, className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center", children: _jsx(Music, { className: "w-12 h-12 text-gray-400" }) })), _jsxs("div", { className: "absolute top-2 left-2 flex gap-1", children: [hasAudio && (_jsx("div", { className: "bg-green-500 text-white p-1 rounded-full", children: _jsx(Volume2, { className: "w-3 h-3" }) })), hasVideo && (_jsx("div", { className: "bg-blue-500 text-white p-1 rounded-full", children: _jsx(Play, { className: "w-3 h-3" }) }))] }), _jsx("button", { onClick: () => onToggleFavorite?.(instrumento.id), className: `
            absolute top-2 right-2 p-2 rounded-full transition-colors
            ${isFavorite
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-gray-600 hover:bg-white'}
          `, children: _jsx(Heart, { className: `w-4 h-4 ${isFavorite ? 'fill-current' : ''}` }) })] }), _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsx("h3", { className: "text-lg font-bold text-gray-900 line-clamp-1", children: instrumento.nome }), isMyInstrument && (_jsx("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium", children: "Meu" }))] }), _jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("span", { className: "text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded", children: instrumento.categoria }), instrumento.dificuldade && (_jsx("span", { className: `
              text-xs px-2 py-1 rounded font-medium
              ${dificuldadeColors[instrumento.dificuldade] || 'text-gray-600 bg-gray-100'}
            `, children: instrumento.dificuldade }))] }), _jsxs("p", { className: "text-sm text-gray-600 mb-3", children: ["Origem: ", instrumento.origem] }), _jsx("p", { className: "text-gray-700 text-sm mb-4 line-clamp-2", children: instrumento.descricao }), instrumento.popularidade && (_jsxs("div", { className: "flex items-center gap-1 mb-4", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-500" }), _jsxs("span", { className: "text-sm text-gray-600", children: [instrumento.popularidade, "/5"] })] })), _jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-gray-100", children: [_jsxs("div", { className: "flex items-center gap-2", children: [hasAudio && (_jsx("button", { onClick: () => onPlayAudio?.(instrumento.id), className: "text-green-600 hover:text-green-700 p-1", title: "Reproduzir \u00E1udio", children: _jsx(Volume2, { className: "w-4 h-4" }) })), _jsx("button", { onClick: () => onViewDetails?.(instrumento.id), className: "text-blue-600 hover:text-blue-800 text-sm font-medium", children: "Ver Detalhes" })] }), !isMyInstrument && (_jsx("button", { onClick: () => onAddToMyInstruments?.(instrumento.id), className: "bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors", children: "Adicionar" })), isMyInstrument && (_jsxs("div", { className: "flex items-center gap-1 text-sm text-gray-500", children: [_jsx(Clock, { className: "w-4 h-4" }), _jsx("span", { children: "Praticando" })] }))] })] })] }));
}
export default InstrumentoCard;
