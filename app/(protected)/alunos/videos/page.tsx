import { getVideos, getCategoriasVideos } from '@/src/lib/supabase/queries/videos';
import { PlayCircle, Clock, Search, Video, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function VideosAlunosPage() {
    const [videos, categorias] = await Promise.all([
        getVideos(),
        getCategoriasVideos()
    ]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                    <Video size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-red-100 font-medium tracking-wider text-sm uppercase">Videoteca</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Conteúdo Extra 🎬</h1>
                    <p className="text-red-100 text-lg max-w-2xl">
                        Aulas extras, dicas e tutoriais dos seus professores para complementar seus estudos.
                    </p>
                </div>
            </div>

            {/* Filtros de Categoria */}
            <div className="flex flex-wrap gap-2">
                <button className="px-5 py-2 bg-red-600 text-white rounded-full text-sm font-bold shadow-md shadow-red-200 transition-transform hover:scale-105">
                    Recentes
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

            {/* Grid de Vídeos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((vid) => (
                    <a // Usando anchor simples par link externo ou modal futuro
                        key={vid.id}
                        href={vid.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-red-100/50 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="relative aspect-video bg-gray-200 overflow-hidden">
                            {vid.thumbnail_url ? (
                                <img src={vid.thumbnail_url} alt={vid.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-600">
                                    <PlayCircle size={48} className="text-white/50 group-hover:text-red-600 transition-colors scale-90 group-hover:scale-110 duration-300" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            
                            {vid.duracao && (
                                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
                                    <Clock size={10} />
                                    {Math.floor(vid.duracao / 60)}:{(vid.duracao % 60).toString().padStart(2, '0')}
                                </div>
                            )}
                            
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                    <PlayCircle className="w-6 h-6 text-white fill-current" />
                                </div>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-bold text-red-600 uppercase tracking-wide bg-red-50 px-2 py-1 rounded-md">
                                    {vid.categoria?.nome || 'Geral'}
                                </span>
                                {vid.nivel_dificuldade && (
                                    <span className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded font-medium capitalize">
                                        {vid.nivel_dificuldade}
                                    </span>
                                )}
                            </div>

                            <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors text-lg">
                                {vid.titulo}
                            </h3>

                            <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                                {vid.descricao}
                            </p>
                        </div>
                    </a>
                ))}
                {videos.length === 0 && (
                    <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Video className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Biblioteca vazia</h3>
                        <p className="text-gray-500 mt-1">Nenhum vídeo disponível no momento.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
