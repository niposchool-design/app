
import { getPeriodoById } from '@/src/lib/supabase/queries/historia';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Calendar, Users, Music, Play, Trophy } from 'lucide-react';

interface PageProps {
    params: {
        id: string
    }
}

export default async function DetalhesPeriodoPage({ params }: PageProps) {
    const periodo = await getPeriodoById(params.id);

    if (!periodo) {
        notFound();
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header com Imagem de Capa e Cor Temática */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gray-900 h-64 md:h-80">
                {periodo.imagem_capa && (
                    <img
                        src={periodo.imagem_capa}
                        alt={periodo.nome}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute top-6 left-6 z-10">
                    <Link href="/admin/historia" className="flex items-center text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:bg-black/40">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Voltar
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/10">
                                {periodo.data_inicio} - {periodo.data_fim || 'Presente'}
                            </span>
                            {periodo.ativo && (
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30">
                                    Ativo
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-sm">
                            {periodo.nome}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl drop-shadow-sm">
                            {periodo.descricao}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Coluna Principal: Obras */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Music className="w-6 h-6 text-indigo-600" />
                            Obras Principais
                            <span className="text-sm font-normal text-gray-500 ml-2">({periodo.obras.length})</span>
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        {periodo.obras.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {periodo.obras.map((obra: any) => (
                                    <div key={obra.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start justify-between group">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg">
                                                {obra.popularidade > 80 ? '🔥' : <Music size={20} />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                    {obra.titulo}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {obra.compositor?.nome_artistico || obra.compositor?.nome_completo || 'Compositor Desconhecido'} • {obra.ano_composicao || '-'}
                                                </p>
                                                <div className="flex gap-2 mt-1">
                                                    {obra.genero && <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{obra.genero}</span>}
                                                    {obra.nivel_dificuldade && <span className="text-[10px] font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Nível {obra.nivel_dificuldade}</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {obra.audio_url && (
                                                <button className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transform active:scale-95 transition-all" title="Ouvir">
                                                    <Play size={16} fill="currentColor" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center text-gray-500">
                                Nenhuma obra cadastrada para este período.
                            </div>
                        )}
                    </div>
                </div>

                {/* Coluna Literal: Compositores */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        Compositores
                        <span className="text-sm font-normal text-gray-500 ml-2">({periodo.compositores.length})</span>
                    </h2>

                    <div className="space-y-4">
                        {periodo.compositores.length > 0 ? (
                            periodo.compositores.map((compositor: any) => (
                                <div key={compositor.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border-2 border-transparent group-hover:border-purple-300 transition-colors">
                                        {compositor.foto_url ? (
                                            <img src={compositor.foto_url} alt={compositor.nome_artistico} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 font-bold">
                                                {compositor.nome_artistico?.[0] || '?'}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 truncate group-hover:text-purple-700 transition-colors">
                                            {compositor.nome_artistico || compositor.nome_completo}
                                        </h4>
                                        <p className="text-xs text-gray-500 truncate">
                                            {compositor.pais_nascimento}
                                        </p>
                                    </div>
                                    {compositor.nivel_importancia > 8 && (
                                        <Trophy className="w-4 h-4 text-amber-400" />
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-lg">
                                Sem compositores.
                            </div>
                        )}
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
                        <h3 className="font-bold text-indigo-900 mb-2 text-sm">Contexto Histórico</h3>
                        <p className="text-xs text-indigo-800/70 leading-relaxed">
                            Aproveite este espaço para adicionar marcos históricos importantes da época. Use a ferramenta de Timeline para integrar eventos à visualização dos alunos.
                        </p>
                        <button className="mt-3 w-full py-2 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold uppercase rounded-lg hover:bg-indigo-50 transition-colors">
                            Gerenciar Timeline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
