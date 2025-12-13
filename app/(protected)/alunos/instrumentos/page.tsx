import { getInstrumentos, getCategoriasInstrumentos } from '@/src/lib/supabase/queries/instrumentos';
import Link from 'next/link';
import { Music, ArrowRight, Info, Sparkles } from 'lucide-react';

export default async function InstrumentosPage() {
    const instrumentos = await getInstrumentos();
    const categorias = await getCategoriasInstrumentos();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                    <Music size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-red-100 font-medium tracking-wider text-sm uppercase">Gakki (Instrumentos)</span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-3">Biblioteca de Instrumentos 🎌</h1>
                    <p className="text-red-100 text-lg max-w-2xl">
                        Explore nossa coleção de instrumentos musicais tradicionais japoneses e ocidentais.
                        Descubra suas histórias, sons e a alma de cada um.
                    </p>
                </div>
            </div>

            {/* Categorias (Filtros Rápidos) */}
            <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2 bg-red-600 text-white rounded-full text-sm font-bold shadow-md shadow-red-200 transition-transform hover:scale-105">
                    Todos
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

            {/* Grid de Instrumentos */}
            {instrumentos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {instrumentos.map((inst) => (
                        <Link
                            key={inst.id}
                            href={`/alunos/instrumentos/${inst.id}`}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-red-100/50 transition-all duration-300 flex flex-col overflow-hidden h-full transform hover:-translate-y-1"
                        >
                            <div className="h-56 bg-gray-100 relative overflow-hidden">
                                {inst.imagem_url ? (
                                    <img
                                        src={inst.imagem_url}
                                        alt={inst.nome}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                                        <Music size={48} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Badge de Nível */}
                                {inst.nivel_dificuldade && (
                                    <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-red-600 shadow-sm">
                                        {inst.nivel_dificuldade}
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-2">
                                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider bg-red-50 px-2 py-1 rounded-md">
                                        {inst.categoria?.nome || 'Instrumento'}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                                    {inst.nome}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
                                    {inst.curiosidades || inst.historia || 'Conheça mais sobre este instrumento fascinante...'}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                                    <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
                                        <Info size={14} className="text-red-400" />
                                        Ver detalhes
                                    </span>
                                    <span className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                                        <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Music className="w-10 h-10 text-red-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Biblioteca vazia</h3>
                    <p className="text-gray-500 mt-2">Nenhum instrumento encontrado. O administrador está catalogando.</p>
                </div>
            )}
        </div>
    );
}
