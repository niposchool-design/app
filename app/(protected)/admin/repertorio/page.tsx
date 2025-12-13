
import { getRepertorio } from '@/src/lib/supabase/queries/repertorio';
import Link from 'next/link';
import { Plus, Search, Music2, FileText, Mic2, Video } from 'lucide-react';

export default async function AdminRepertorioPage() {
    const repertorio = await getRepertorio();

    return (
        <div className="p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestão de Repertório</h1>
                    <p className="text-gray-600 mt-1">Acervo de músicas, partituras e materiais didáticos.</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm opacity-50 cursor-not-allowed">
                    <Plus className="w-5 h-5" />
                    Nova Música
                </button>
            </div>

            {/* Filtros e Busca (Visual) */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar por título ou compositor..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Título / Compositor</th>
                                <th className="px-6 py-4">Categoria</th>
                                <th className="px-6 py-4">Nível</th>
                                <th className="px-6 py-4 text-center">Recursos</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {repertorio.length > 0 ? (
                                repertorio.map((musica) => (
                                    <tr key={musica.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                    <Music2 size={16} />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{musica.titulo}</div>
                                                    <div className="text-xs text-gray-500">{musica.compositor || 'Desconhecido'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                                                style={musica.categoria?.cor_tema ? { backgroundColor: `${musica.categoria.cor_tema}20`, color: musica.categoria.cor_tema } : {}}
                                            >
                                                {musica.categoria?.nome || 'Geral'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 capitalize">{musica.nivel_dificuldade || '-'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                {musica.partitura_url && <FileText className="w-4 h-4 text-gray-400" title="Partitura" />}
                                                {musica.letra_url && <FileText className="w-4 h-4 text-gray-400" title="Letra" />}
                                                {musica.playback_url && <Mic2 className="w-4 h-4 text-gray-400" title="Playback" />}
                                                {musica.video_tutorial_url && <Video className="w-4 h-4 text-gray-400" title="Vídeo" />}
                                                {(!musica.partitura_url && !musica.letra_url && !musica.playback_url && !musica.video_tutorial_url) &&
                                                    <span className="text-xs text-gray-400">-</span>
                                                }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${musica.ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {musica.ativo ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        Nenhuma música cadastrada no repertório.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
