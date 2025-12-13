import { getRepertorio, getCategoriasRepertorio } from '@/src/lib/supabase/queries/repertorio';
import Link from 'next/link';
import { Music2, FileText, Mic2, Video, Search, PlayCircle, Sparkles } from 'lucide-react';

export default async function AlunoRepertorioPage() {
    const [musicas, categorias] = await Promise.all([
        getRepertorio(),
        getCategoriasRepertorio()
    ]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                    <Music2 size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-red-100 font-medium tracking-wider text-sm uppercase">Repertório Musical</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Minhas Músicas 🎼</h1>
                    <p className="text-red-100 text-lg max-w-2xl">
                        Sua biblioteca pessoal de partituras, playbacks e materiais de estudo.
                        Pratique com disciplina e paixão.
                    </p>
                </div>
            </div>

            {/* Categorias (Filtros Rápidos) */}
            <div className="flex flex-wrap gap-2">
                <button className="px-5 py-2 bg-red-600 text-white rounded-full text-sm font-bold shadow-md shadow-red-200 transition-transform hover:scale-105">
                    Todas
                </button>
                {categorias.map(cat => (
                    <button
                        key={cat.id}
                        className="px-5 py-2 bg-white text-gray-600 border border-gray-200 rounded-full text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                    >
                        {cat.nome}
                    </button>
                ))}
            </div>

            {/* Busca */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Pesquisar música por título ou compositor..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none shadow-sm transition-all"
                />
            </div>

            {/* Grid de Músicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {musicas.map(musica => (
                    <div key={musica.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-red-100/50 transition-all p-6 flex flex-col group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-100 transition-colors">
                                <Music2 size={24} />
                            </div>
                            {musica.nivel_dificuldade && (
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide
                  ${musica.nivel_dificuldade === 'iniciante' ? 'bg-green-100 text-green-700' : ''}
                  ${musica.nivel_dificuldade === 'intermediário' ? 'bg-yellow-100 text-yellow-700' : ''}
                  ${musica.nivel_dificuldade === 'avançado' ? 'bg-red-100 text-red-700' : ''}
                `}>
                                    {musica.nivel_dificuldade}
                                </span>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">{musica.titulo}</h3>
                        <p className="text-gray-500 text-sm mb-4">{musica.compositor || 'Compositor desconhecido'}</p>

                        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
                            <span className="text-xs font-medium text-gray-400 uppercase mr-auto">Recursos:</span>

                            {musica.partitura_url && (
                                <a href={musica.partitura_url} target="_blank" className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Partitura">
                                    <FileText size={18} />
                                </a>
                            )}
                            {musica.playback_url && (
                                <a href={musica.playback_url} target="_blank" className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Áudio/Playback">
                                    <PlayCircle size={18} />
                                </a>
                            )}
                            {musica.video_tutorial_url && (
                                <a href={musica.video_tutorial_url} target="_blank" className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Vídeo Aula">
                                    <Video size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
                {musicas.length === 0 && (
                    <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
                        <Music2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">Nenhuma música encontrada.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
