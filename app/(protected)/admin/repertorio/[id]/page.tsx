
import { getRepertorioById } from '@/src/lib/supabase/queries/repertorio'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Edit, Calendar, Music, Video, FileText, Mic2, Tag } from 'lucide-react'

interface PageProps {
    params: {
        id: string
    }
}

export default async function DetalhesRepertorioPage({ params }: PageProps) {
    const repertorio = await getRepertorioById(params.id)

    if (!repertorio) {
        notFound()
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/repertorio"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-500" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-gray-900">{repertorio.titulo}</h1>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${repertorio.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                {repertorio.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                        </div>
                        <p className="text-gray-600 mt-1 flex items-center gap-2">
                            <Music className="w-4 h-4" /> {repertorio.compositor || 'Compositor não informado'}
                        </p>
                    </div>
                </div>
                <div>
                    <Link
                        href={`/admin/repertorio/editar/${params.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm"
                    >
                        <Edit className="w-4 h-4" />
                        Editar
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Estats / Tags */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <span className="text-xs font-medium text-gray-500 uppercase">Dificuldade</span>
                            <div className="mt-1 font-bold text-gray-900 capitalize">{repertorio.nivel_dificuldade || '-'}</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <span className="text-xs font-medium text-gray-500 uppercase">Duração</span>
                            <div className="mt-1 font-bold text-gray-900">{repertorio.duracao_estimada ? `${repertorio.duracao_estimada} min` : '-'}</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <span className="text-xs font-medium text-gray-500 uppercase">Categoria</span>
                            <div className="mt-1 font-bold text-indigo-600">{repertorio.categoria?.nome || '-'}</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <span className="text-xs font-medium text-gray-500 uppercase">Visibilidade</span>
                            <div className="mt-1 font-bold text-gray-900">{repertorio.publico ? 'Público' : 'Restrito'}</div>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-semibold text-gray-900">Recursos & Mídias</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {repertorio.partitura_url ? (
                                <a href={repertorio.partitura_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group">
                                    <div className="p-2 bg-red-100 text-red-600 rounded-lg group-hover:scale-110 transition-transform">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">Partitura (PDF)</div>
                                        <div className="text-sm text-gray-500 truncate">{repertorio.partitura_url}</div>
                                    </div>
                                    <div className="text-indigo-600 text-sm font-medium">Abrir</div>
                                </a>
                            ) : (
                                <div className="text-sm text-gray-400 italic">Nenhuma partitura anexada.</div>
                            )}

                            {repertorio.playback_url ? (
                                <a href={repertorio.playback_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                        <Mic2 className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">Playback / Áudio</div>
                                        <div className="text-sm text-gray-500 truncate">{repertorio.playback_url}</div>
                                    </div>
                                    <div className="text-indigo-600 text-sm font-medium">Ouvir</div>
                                </a>
                            ) : null}

                            {repertorio.video_tutorial_url ? (
                                <a href={repertorio.video_tutorial_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group">
                                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                        <Video className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">Vídeo Tutorial</div>
                                        <div className="text-sm text-gray-500 truncate">{repertorio.video_tutorial_url}</div>
                                    </div>
                                    <div className="text-indigo-600 text-sm font-medium">Assistir</div>
                                </a>
                            ) : null}
                        </div>
                    </div>

                    {/* Observations */}
                    {repertorio.observacoes && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-semibold text-gray-900 mb-3 block">Observações</h3>
                            <div className="text-gray-600 text-sm leading-relaxed">
                                {repertorio.observacoes}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4">Metadata</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Criado em</span>
                                <span className="text-gray-900 font-medium">
                                    {repertorio.criado_em ? new Date(repertorio.criado_em).toLocaleDateString() : '-'}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Aprovação</span>
                                <span className="text-gray-900 font-medium">
                                    {repertorio.requer_aprovacao_professor ? 'Sim' : 'Não'}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Popularidade</span>
                                <span className="text-gray-900 font-medium">
                                    {repertorio.popularidade || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
