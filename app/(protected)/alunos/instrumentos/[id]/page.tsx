
import { getInstrumentoById } from '@/src/lib/supabase/queries/instrumentos';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, BookOpen, Mic2, Star, Sparkles, Music } from 'lucide-react';

export default async function InstrumentoDetalhesPage({ params }: { params: { id: string } }) {
    const instrumento = await getInstrumentoById(params.id);

    if (!instrumento) {
        notFound();
    }

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
                                {instrumento.categoria?.nome || 'Instrumento'}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">{instrumento.nome}</h1>
                        {instrumento.classificacao && (
                            <p className="text-red-100 text-lg md:text-xl font-light border-l-2 border-red-500 pl-4">
                                {instrumento.classificacao}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna Principal */}
                <div className="lg:col-span-2 space-y-8">

                    {/* História e Origem */}
                    {(instrumento.historia || instrumento.origem) && (
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-red-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 blur-2xl opacity-50"></div>
                            
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                                    <BookOpen size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">História & Origem</h2>
                            </div>
                            
                            <div className="prose prose-red max-w-none text-gray-600 relative z-10">
                                {instrumento.origem && (
                                    <div className="flex items-center gap-2 text-sm font-bold text-red-700 uppercase tracking-wide mb-4 bg-red-50 inline-block px-3 py-1 rounded-lg">
                                        Origem: {instrumento.origem}
                                    </div>
                                )}
                                <div dangerouslySetInnerHTML={{ __html: instrumento.historia || '' }} />
                            </div>
                        </section>
                    )}

                    {/* Curiosidades - Updated to Red/Orange Theme */}
                    {instrumento.curiosidades && (
                        <section className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 opacity-5">
                                <Star size={120} />
                            </div>
                            
                            <div className="flex items-center gap-3 mb-4 relative z-10">
                                <div className="p-3 bg-white text-orange-600 rounded-2xl shadow-sm">
                                    <Star size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Curiosidades</h2>
                            </div>
                            
                            <div className="text-gray-700 leading-relaxed italic relative z-10 bg-white/60 p-6 rounded-2xl border border-orange-100/50 backdrop-blur-sm">
                                "{instrumento.curiosidades}"
                            </div>
                        </section>
                    )}

                    {/* Técnicas */}
                    {instrumento.tecnicas_basicas && (
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                Técnicas Básicas
                            </h3>
                            <p className="text-gray-600 leading-relaxed">{instrumento.tecnicas_basicas}</p>
                        </section>
                    )}

                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Card de Status/Info Adicional se houver */}
                    <div className="bg-gray-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full -mr-10 -mt-10 blur-3xl opacity-20"></div>
                        
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Mic2 className="w-5 h-5 text-red-400" />
                            Ficha Técnica
                        </h3>
                        
                        <div className="space-y-4 relative z-10">
                            <div>
                                <span className="text-gray-400 text-xs uppercase tracking-wider">Classificação</span>
                                <p className="font-medium text-red-50">{instrumento.classificacao || 'Não informada'}</p>
                            </div>
                            <div>
                                <span className="text-gray-400 text-xs uppercase tracking-wider">Categoria</span>
                                <p className="font-medium text-red-50">{instrumento.categoria?.nome || 'Geral'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
