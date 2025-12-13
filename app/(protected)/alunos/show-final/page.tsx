import { getAulasShowFinal } from '@/src/lib/supabase/queries/aulas';
import Link from 'next/link';
import { Play, Calendar, Star, Music, Award, Sparkles } from 'lucide-react';

export default async function ShowFinalPage() {
    const aulasShow = await getAulasShowFinal();

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative bg-black rounded-3xl overflow-hidden text-center text-white py-20 px-6 shadow-2xl">
                <div className="absolute inset-0 z-0 opacity-60">
                    {/* Background Pattern Simulado */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-red-900/60 to-black" />
                    <div className="absolute top-10 left-10 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 text-red-400 border border-red-600/30 text-sm font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-red-900/20">
                        <Sparkles size={16} className="text-yellow-400" />
                        Evento Especial
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-white drop-shadow-sm">
                        Show Final Nipo
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        O momento de brilhar! Prepare-se para sua apresentação de encerramento do módulo Alpha com estas aulas exclusivas.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-6">
                        <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all hover:scale-105 cursor-default">
                            <Calendar className="text-red-400 w-5 h-5" />
                            <span className="font-bold text-white">20 de Dezembro</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all hover:scale-105 cursor-default">
                            <Music className="text-orange-400 w-5 h-5" />
                            <span className="font-bold text-white">Grande Auditório</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline de Preparação */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <Award className="text-red-600 w-6 h-6" />
                    </div>
                    Sua Jornada de Preparação
                </h2>

                <div className="space-y-8">
                    {aulasShow.length > 0 ? (
                        aulasShow.map((aula, index) => (
                            <div key={aula.id} className="group relative flex gap-6">
                                {/* Linha vertical conectora */}
                                {index !== aulasShow.length - 1 && (
                                    <div className="absolute left-[22px] top-14 bottom-[-32px] w-0.5 bg-gradient-to-b from-red-200 to-transparent group-last:hidden"></div>
                                )}

                                {/* Ícone Indicador */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-bold z-10 text-lg transform group-hover:scale-110 transition-transform duration-300">
                                    {index + 1}
                                </div>

                                {/* Card de Conteúdo */}
                                <Link
                                    href={`/alunos/aulas/${aula.numero}`}
                                    className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-red-100/50 hover:border-red-100 transition-all group-hover:-translate-y-1 block relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-xs font-bold text-red-600 uppercase tracking-wide bg-red-50 px-2 py-1 rounded-md">
                                                Aula {aula.numero}
                                            </span>
                                            {aula.status === 'concluida' && (
                                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                                                    <Star size={10} fill="currentColor" /> Concluída
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{aula.titulo}</h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">{aula.objetivo_didatico}</p>

                                        <div className="flex items-center text-sm font-bold text-red-600 group-hover:gap-2 transition-all">
                                            Ver detalhes da preparação <Play className="w-4 h-4 ml-1 fill-current" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Em breve</h3>
                            <p className="text-gray-500 mt-1">O roteiro do Show Final será liberado em breve!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
