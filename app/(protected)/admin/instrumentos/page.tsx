'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Music, Plus, Download, Search, Filter } from 'lucide-react';
import AdminPageLayout from '../_components/AdminPageLayout';

export default function AdminInstrumentosPage() {
    const [instrumentos, setInstrumentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadInstrumentos() {
            try {
                const response = await fetch('/api/instrumentos');
                const data = await response.json();
                setInstrumentos(data);
            } catch (error) {
                console.error('Erro ao carregar instrumentos:', error);
            } finally {
                setLoading(false);
            }
        }
        loadInstrumentos();
    }, []);

    if (loading) {
        return (
            <AdminPageLayout title="Gestão de Instrumentos" icon={Music}>
                <div className="admin-card p-8 text-center">
                    <p className="text-slate-600">Carregando...</p>
                </div>
            </AdminPageLayout>
        );
    }

    const ativos = instrumentos.filter((i: any) => i.ativo);

    return (
        <AdminPageLayout
            title="Gestão de Instrumentos"
            subtitle="Inventário e catálogo da biblioteca musical da instituição"
            icon={Music}
            badge={`${ativos.length} ${ativos.length === 1 ? 'ativo' : 'ativos'}`}
            actions={
                <>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                    <Link href="/admin/instrumentos/novo" className="admin-btn-primary flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Novo Instrumento
                    </Link>
                </>
            }
        >
            {/* Filtros e Busca */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar instrumento..."
                        className="admin-input w-full pl-10"
                    />
                </div>
                <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtros
                </button>
            </div>

            {/* Tabela de Instrumentos */}
            <div className="admin-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Família</th>
                                <th>Categoria</th>
                                <th className="text-center">Ordem</th>
                                <th className="text-center">Status</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {instrumentos.length > 0 ? (
                                instrumentos.map((inst) => (
                                    <tr key={inst.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden">
                                                {inst.imagem_url ? (
                                                    <img src={inst.imagem_url} alt="" className="w-full h-full object-cover" />
                                                ) : <Music size={16} />}
                                            </div>
                                            {inst.nome}
                                        </td>
                                        <td className="px-6 py-4 capitalized">{inst.familia || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                                                {inst.categoria || 'Geral'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">{inst.ordem}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${inst.ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {inst.ativo ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/instrumentos/${inst.id}`}
                                                className="text-gray-400 hover:text-red-600 font-medium inline-flex items-center gap-1"
                                            >
                                                <Edit className="w-4 h-4" />
                                                <span className="hidden sm:inline">Editar</span>
                                            </Link>
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
        </AdminPageLayout>
    );
}
