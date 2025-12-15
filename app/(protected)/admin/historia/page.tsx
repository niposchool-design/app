'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Plus, Clock, Users, Music as MusicIcon } from 'lucide-react';
import AdminPageLayout from '../_components/AdminPageLayout';

export default function HistoriaMusicaPage() {
    const [periodos, setPeriodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPeriodos() {
            try {
                const response = await fetch('/api/historia/periodos');
                const data = await response.json();
                setPeriodos(data);
            } catch (error) {
                console.error('Erro ao carregar períodos:', error);
            } finally {
                setLoading(false);
            }
        }
        loadPeriodos();
    }, []);

    if (loading) {
        return (
            <AdminPageLayout title="História da Música" icon={BookOpen}>
                <div className="admin-card p-8 text-center">
                    <p className="text-slate-600">Carregando...</p>
                </div>
            </AdminPageLayout>
        );
    }

    return (
        <AdminPageLayout
            title="História da Música"
            subtitle="Gerencie períodos históricos, compositores e obras musicais"
            icon={BookOpen}
            badge={`${periodos.length} períodos`}
            actions={
                <>
                    <Link href="/admin/historia/timeline" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Timeline
                    </Link>
                    <Link href="/admin/historia/novo-periodo" className="admin-btn-primary flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Novo Período
                    </Link>
                </>
            }
        >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Link href="/admin/historia/compositores" className="admin-card p-6 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                            <Users className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Compositores</h3>
                            <p className="text-sm text-gray-500">Gerenciar biografias e perfis</p>
                        </div>
                    </div>
                </Link>

                <Link href="/admin/historia/obras" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                            <Music className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Obras Musicais</h3>
                            <p className="text-sm text-gray-500">Catálogo de obras e áudios</p>
                        </div>
                    </div>
                </Link>

                <Link href="/admin/historia/timeline" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-100 text-amber-600 rounded-lg group-hover:scale-110 transition-transform">
                            <Clock className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Linha do Tempo</h3>
                            <p className="text-sm text-gray-500">Eventos e marcos históricos</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Períodos Históricos</h2>

                {periodos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {periodos.map((periodo: any) => (
                            <div key={periodo.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                                <div
                                    className="h-24 relative"
                                    style={{ backgroundColor: periodo.cor_tematica || '#e5e7eb' }}
                                >
                                    {periodo.imagem_capa && (
                                        <img src={periodo.imagem_capa} alt={periodo.nome} className="w-full h-full object-cover mix-blend-overlay opacity-50" />
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-900 shadow-sm">
                                        {periodo.data_inicio} - {periodo.data_fim || 'Presente'}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{periodo.nome}</h3>
                                        {periodo.ativo ? (
                                            <span className="w-2 h-2 rounded-full bg-green-500" title="Ativo"></span>
                                        ) : (
                                            <span className="w-2 h-2 rounded-full bg-gray-300" title="Inativo"></span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">{periodo.descricao || 'Sem descrição.'}</p>

                                    <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                                        <span className="flex items-center gap-1">
                                            <Users size={14} />
                                            {periodo.compositores?.[0]?.count || 0} compositores
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Music size={14} />
                                            {periodo.obras?.[0]?.count || 0} obras
                                        </span>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                                        <Link
                                            href={`/admin/historia/periodos/${periodo.id}`}
                                            className="flex-1 text-center px-4 py-2.5 bg-gray-50 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm"
                                        >
                                            Gerenciar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">Nenhum período cadastrado</h3>
                        <p className="text-gray-500 mb-4">Comece cadastrando os períodos musicais (ex: Barroco, Clássico).</p>
                        <Link href="/admin/historia/novo-periodo" className="text-red-600 font-medium hover:underline">
                            Cadastrar primeiro período
                        </Link>
                    </div>
                )}
            </div>
        </AdminPageLayout>
    );
}
