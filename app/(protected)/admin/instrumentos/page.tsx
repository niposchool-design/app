
import { getInstrumentos } from '@/src/lib/supabase/queries/instrumentos';
import Link from 'next/link';
import { Plus, Search, Filter, Music } from 'lucide-react';

export default async function AdminInstrumentosPage() {
    const instrumentos = await getInstrumentos();

    return (
        <div className="p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestão de Instrumentos</h1>
                    <p className="text-gray-600 mt-1">Inventário e catálogo da biblioteca musical</p>
                </div>
                {/* Placeholder para botão de criar, sem funcionalidade ainda */}
                <Link
                    href="/admin/instrumentos/novo"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Novo Instrumento
                </Link>
            </div>

            {/* Filtros e Busca (Visual) */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar instrumento..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                    />
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtros
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Nome</th>
                                <th className="px-6 py-4">Categoria</th>
                                <th className="px-6 py-4">Origem</th>
                                <th className="px-6 py-4">Nível</th>
                                <th className="px-6 py-4 text-center">Disponível na Escola</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {instrumentos.length > 0 ? (
                                instrumentos.map((inst) => (
                                    <tr key={inst.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden">
                                                {inst.imagem_url ? (
                                                    <img src={inst.imagem_url} alt="" className="w-full h-full object-cover" />
                                                ) : <Music size={16} />}
                                            </div>
                                            {inst.nome}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                                                {inst.categoria?.nome || 'Geral'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{inst.origem || '-'}</td>
                                        <td className="px-6 py-4 capitalize">{inst.nivel_dificuldade || '-'}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-block w-2.5 h-2.5 rounded-full ${inst.disponivel_escola ? 'bg-green-500' : 'bg-red-300'}`} title={inst.disponivel_escola ? 'Sim' : 'Não'}></span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${inst.ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {inst.ativo ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        Nenhum instrumento cadastrado.
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
