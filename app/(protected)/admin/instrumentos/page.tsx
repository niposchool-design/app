'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Music, Plus, Download, Search, Filter, Edit, Package, Guitar, Disc, TrendingUp } from 'lucide-react';
import AdminPageLayout from '../_components/AdminPageLayout';
import { StatsCard, StatsGrid } from '../_components/StatsCard';

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
    const totalInstrumentos = instrumentos.length;

    // Contagem por família
    const familias = [...new Set(instrumentos.map((i: any) => i.familia).filter(Boolean))];
    const categorias = [...new Set(instrumentos.map((i: any) => i.categoria).filter(Boolean))];

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
            {/* KPIs Executivos - Acervo Musical */}
            <StatsGrid cols={4}>
                <StatsCard
                    title="Total no Acervo"
                    value={totalInstrumentos}
                    icon={Package}
                    color="fuchsia"
                    subtitle="Instrumentos cadastrados"
                />
                <StatsCard
                    title="Instrumentos Ativos"
                    value={ativos.length}
                    icon={Guitar}
                    color="emerald"
                    trend={{ value: 8, isPositive: true }}
                    subtitle="Disponíveis para uso"
                />
                <StatsCard
                    title="Famílias"
                    value={familias.length}
                    icon={Disc}
                    color="blue"
                    subtitle="Categorias diferentes"
                />
                <StatsCard
                    title="Diversidade"
                    value={`${categorias.length}`}
                    icon={TrendingUp}
                    color="orange"
                    subtitle="Tipos de instrumentos"
                />
            </StatsGrid>

            {/* Filtros e Busca - Executivo */}
            <div className="mt-8">
            <div className="admin-card p-4 mb-6">
                <div className="flex gap-4">
                    <div className="relative flex-1 max-w-md group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-purple-600 transition-colors" strokeWidth={2} />
                        <input
                            type="text"
                            placeholder="Buscar instrumento..."
                            className="admin-input pl-10"
                        />
                    </div>
                    <button className="px-4 py-2.5 border border-slate-200 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 flex items-center gap-2 transition-colors">
                        <Filter className="w-4 h-4" strokeWidth={2} />
                        Filtros
                    </button>
                </div>
            </div>

            {/* Tabela de Instrumentos - Design Executivo */}
            <div className="admin-card overflow-hidden p-0">
                <div className="overflow-x-auto admin-scrollbar">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Instrumento</th>
                                <th>Família</th>
                                <th>Categoria</th>
                                <th className="text-center">Ordem</th>
                                <th className="text-center">Status</th>
                                <th className="text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {instrumentos.length > 0 ? (
                                instrumentos.map((inst: any) => (
                                    <tr key={inst.id} className="hover:bg-purple-50/20 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 flex items-center justify-center overflow-hidden shadow-sm border border-fuchsia-100">
                                                    {inst.imagem_url ? (
                                                        <img src={inst.imagem_url} alt="" className="w-full h-full object-cover" />
                                                    ) : <Music className="w-4 h-4 text-fuchsia-600" strokeWidth={2} />}
                                                </div>
                                                <span className="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">{inst.nome}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-slate-600 text-sm capitalize">{inst.familia || '-'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                                                {inst.categoria || 'Geral'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-mono text-xs text-slate-600 font-semibold">{inst.ordem}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${inst.ativo ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                                                {inst.ativo ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/instrumentos/${inst.id}`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Edit className="w-4 h-4" strokeWidth={2} />
                                                <span className="hidden sm:inline text-xs">Editar</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center">
                                                <Music className="w-7 h-7 text-slate-300" strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900 text-base">Nenhum instrumento cadastrado</p>
                                                <p className="text-sm text-slate-500 mt-1">Adicione instrumentos ao acervo da escola</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 text-xs text-slate-500 flex justify-between items-center font-medium">
                    <span>Exibindo <span className="text-slate-900 font-semibold">{instrumentos.length}</span> instrumentos</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium" disabled>Anterior</button>
                        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium" disabled>Próxima</button>
                    </div>
                </div>
            </div>
        </AdminPageLayout>
    );
}
