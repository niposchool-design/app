
import {
    getAulaById,
    getMateriaisAula,
    getVideosAula,
    getRepertorioAula,
    getInstrumentosAula
} from '@/src/lib/supabase/queries/aulas';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    ChevronLeft,
    Edit,
    Calendar,
    CheckCircle2,
    FileText,
    Video,
    Music,
    Mic2,
    Layout,
    Clock,
    Target
} from 'lucide-react';

interface PageProps {
    params: {
        id: string
    }
}

export default async function DetalhesAulaPage({ params }: PageProps) {
    const aula = await getAulaById(params.id);

    if (!aula) {
        notFound();
    }

    // Carregar dados relacionados em paralelo para performance
    const [materiais, videos, repertorio, instrumentos] = await Promise.all([
        getMateriaisAula(aula.id),
        getVideosAula(aula.id),
        getRepertorioAula(aula.id),
        getInstrumentosAula(aula.id)
    ]);

    const statusColors = {
        rascunho: 'bg-gray-100 text-gray-700 border-gray-200',
        agendada: 'bg-blue-50 text-blue-700 border-blue-100',
        concluida: 'bg-green-50 text-green-700 border-green-100',
        cancelada: 'bg-red-50 text-red-700 border-red-100',
    };

    const statusLabel = {
        rascunho: 'Rascunho',
        agendada: 'Agendada',
        concluida: 'Concluída',
        cancelada: 'Cancelada',
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-start gap-4">
                        <Link
                            href="/admin/aulas"
                            className="p-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 text-gray-500 mt-1"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                                    Aula {aula.numero}
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wide ${statusColors[aula.status as keyof typeof statusColors] || statusColors.rascunho}`}>
                                    {statusLabel[aula.status as keyof typeof statusLabel] || aula.status}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">{aula.titulo}</h1>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {aula.data_programada ? new Date(aula.data_programada).toLocaleDateString() : 'Data não definida'}
                                </span>
                                <span className="flex items-center gap-1 capitalize">
                                    <Layout className="w-4 h-4" />
                                    {aula.formato}
                                </span>
                                <span className="flex items-center gap-1 capitalize">
                                    <Target className="w-4 h-4" />
                                    Nível {aula.nivel}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link
                            href={`/admin/aulas/editar/${aula.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-all active:scale-95"
                        >
                            <Edit className="w-4 h-4" />
                            Editar Conteúdo
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Objetivos e Resumo */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5 text-red-500" />
                                Objetivo Didático
                            </h3>
                            <p className="text-gray-700 leading-relaxed bg-red-50/50 p-4 rounded-xl border border-red-50">
                                {aula.objetivo_didatico || <span className="text-gray-400 italic">Nenhum objetivo definido.</span>}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Resumo das Atividades
                            </h3>
                            <div className="text-gray-600 prose prose-sm max-w-none">
                                {aula.resumo_atividades ? (
                                    <p className="whitespace-pre-wrap">{aula.resumo_atividades}</p>
                                ) : (
                                    <span className="text-gray-400 italic">Sem descrição de atividades.</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Resources Section */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <Layout className="w-5 h-5 text-gray-500" />
                                Conteúdo & Mídia
                            </h3>
                            <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-white rounded border border-gray-200">
                                {videos.length + materiais.length} itens
                            </span>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Videos */}
                            {videos.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Vídeos Relacionados</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {videos.map(video => (
                                            <a
                                                key={video.id}
                                                href={video.video_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative block rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all"
                                            >
                                                <div className="aspect-video bg-gray-100 relative">
                                                    {video.thumbnail_url ? (
                                                        <img src={video.thumbnail_url} alt={video.titulo} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                                            <Video className="w-8 h-8" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <div className="bg-white/20 backdrop-blur rounded-full p-3">
                                                            <div className="bg-white rounded-full p-2">
                                                                <Video className="w-4 h-4 text-black" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-3">
                                                    <h5 className="font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{video.titulo}</h5>
                                                    <p className="text-xs text-gray-500 mt-1">{video.duracao ? `${video.duracao} min` : 'Duração N/A'}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Materiais */}
                            {materiais.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Materiais Complementares</h4>
                                    <div className="space-y-2">
                                        {materiais.map(material => (
                                            <div key={material.id} className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                                                <div className="p-2 bg-yellow-50 text-yellow-600 rounded mr-3">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">{material.titulo}</div>
                                                    <div className="text-xs text-gray-500 capitalize">{material.tipo}</div>
                                                </div>
                                                <a href={material.url} target="_blank" className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                                                    Abrir
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {videos.length === 0 && materiais.length === 0 && (
                                <div className="text-center py-8 text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    Nenhum material de mídia vinculado a esta aula.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Repertório Estudado */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Music className="w-5 h-5 text-purple-600" />
                            Repertório da Aula
                        </h3>
                        {repertorio.length > 0 ? (
                            <div className="space-y-3">
                                {repertorio.map((musica: any) => (
                                    <Link href={`/admin/repertorio/${musica.id}`} key={musica.id} className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg transition-colors group">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-bold">
                                            <Mic2 className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-gray-900 truncate group-hover:text-purple-700">{musica.titulo}</div>
                                            <div className="text-xs text-gray-500 truncate">{musica.compositor}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">Nenhuma música vinculada.</p>
                        )}
                    </div>

                    {/* Instrumentos Focus */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Layout className="w-5 h-5 text-indigo-600" />
                            Instrumentos Foco
                        </h3>
                        {instrumentos.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {instrumentos.map((inst: any) => (
                                    <span key={inst.id} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100">
                                        {inst.nome}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">Nenhum instrumento específico.</p>
                        )}
                    </div>

                    {/* Metadata Card */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-6">
                        <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-4">Metadados</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">ID</span>
                                <span className="font-mono text-xs text-gray-700 truncate max-w-[100px]" title={aula.id}>{aula.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Módulo</span>
                                <span className="font-medium text-gray-900">{aula.modulo_id || 'Geral'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Responsável</span>
                                <span className="font-medium text-gray-900">{aula.responsavel_id ? 'Definido' : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
