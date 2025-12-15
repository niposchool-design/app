
import { getInstrumentoById } from '@/src/lib/supabase/queries/instrumentos';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, BookOpen, Mic2, Star, Sparkles, Music, Video, Info } from 'lucide-react';

export default async function InstrumentoDetalhesPage({ params }: { params: { id: string } }) {
    const instrumento = await getInstrumentoById(params.id);

    if (!instrumento) {
        notFound();
    }

    // Combine curiosities from JSONB and Table
    const curiosidades = [
        ...(Array.isArray(instrumento?.curiosidades) ? instrumento.curiosidades : []),
        ...(instrumento?.curiosidades_lista || [])
    ];

    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Botão Voltar */}
            <Link
                href="/alunos/instrumentos"
                className="inline-flex items-center text-gray-500 hover:text-red-600 transition-colors mb-6 group font-medium"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Voltar para Instrumentos
            </Link>

            {/* Hero Section */}
            <div className="bg-white rounded-3xl shadow-xl shadow-red-900/5 border border-red-100 overflow-hidden mb-8 relative group">
                <div className="relative h-72 md:h-96 bg-gray-900">
                    {instrumento.imagem_url ? (
                        <>
                            <img
                                src={instrumento.imagem_url}
                                alt={instrumento.nome}
                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-black/40 to-transparent" />
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-900 to-orange-900">
                            <Music size={80} className="text-white/20" />
                        </div>
                    )}

                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                <Sparkles className="w-3 h-3" />
                                {instrumento?.categoria || 'Instrumento'}
                            </span>
                            {instrumento?.familia_instrumental && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                    {instrumento.familia_instrumental}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">{instrumento.nome}</h1>
                        {instrumento.descricao && (
                            <p className="text-red-100 text-lg md:text-xl font-light border-l-2 border-red-500 pl-4 max-w-2xl">
                                {instrumento.descricao}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna Principal */}
                <div className="lg:col-span-2 space-y-8">

                    {/* História e Origem */}
                    {(instrumento?.historia || instrumento?.origem) && (
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-red-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 blur-2xl opacity-50"></div>
                            
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                                    <BookOpen size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">História & Origem</h2>
                            </div>
                            
                            <div className="prose prose-red max-w-none text-gray-600 relative z-10">
                                {instrumento?.origem && (
                                    <div className="flex items-center gap-2 text-sm font-bold text-red-700 uppercase tracking-wide mb-4 bg-red-50 px-3 py-1 rounded-lg inline-block">
                                        🌏 Origem: {instrumento.origem}
                                    </div>
                                )}
                                <div dangerouslySetInnerHTML={{ __html: instrumento?.historia || '' }} />
                            </div>
                        </section>
                    )}

                    {/* Curiosidades */}
                    {curiosidades.length > 0 && (
                        <section className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 opacity-5">
                                <Star size={120} />
                            </div>
                            
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="p-3 bg-white text-orange-600 rounded-2xl shadow-sm">
                                    <Star size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Curiosidades</h2>
                            </div>

                            <div className="grid gap-4 relative z-10">
                                {curiosidades.map((curiosidade: any, index: number) => (
                                    <div key={index} className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-orange-100 hover:bg-white transition-colors">
                                        <h3 className="font-bold text-orange-800 mb-1">{curiosidade.titulo || 'Você sabia?'}</h3>
                                        <p className="text-gray-700 text-sm">
                                          {curiosidade.descricao || curiosidade.texto || (typeof curiosidade === 'string' ? curiosidade : 'Informação não disponível')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Mídias (Vídeos) */}
                    {instrumento.midias && instrumento.midias.length > 0 && (
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                    <Video size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Galeria de Mídia</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {instrumento.midias.map((midia) => (
                                    <a 
                                        key={midia.id} 
                                        href={midia.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="group relative aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200 block"
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                                            <PlayCircle className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-sm font-medium truncate">
                                            {midia.titulo}
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Detalhes Técnicos */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Info size={20} className="text-gray-400" />
                            Ficha Técnica
                        </h3>
                        <div className="space-y-4">
                            {instrumento?.material_principal && (
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Material Principal</span>
                                    <p className="text-gray-700 font-medium">{instrumento.material_principal}</p>
                                </div>
                            )}
                            {instrumento?.tecnica_producao_som && (
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Produção de Som</span>
                                    <p className="text-gray-700 font-medium">{instrumento.tecnica_producao_som}</p>
                                </div>
                            )}
                            {instrumento?.dificuldade_aprendizado && (
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dificuldade</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${
                                                    instrumento.dificuldade_aprendizado === 'iniciante' ? 'w-1/3 bg-green-500' :
                                                    instrumento.dificuldade_aprendizado === 'intermediário' ? 'w-2/3 bg-yellow-500' :
                                                    'w-full bg-red-500'
                                                }`}
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 capitalize">{instrumento.dificuldade_aprendizado}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sons / Samples */}
                    {instrumento.sons && instrumento.sons.length > 0 && (
                        <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-lg shadow-gray-900/20">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Mic2 size={20} className="text-red-400" />
                                Sons & Samples
                            </h3>
                            <div className="space-y-3">
                                {instrumento.sons.map((som) => (
                                    <div key={som.id} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                                            <PlayCircle size={16} className="text-white" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-sm truncate">{som.titulo || 'Som do instrumento'}</p>
                                            <p className="text-xs text-gray-400 capitalize">{som.tipo}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
