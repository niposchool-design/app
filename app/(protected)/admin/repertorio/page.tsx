'use client';

import { useEffect, useState } from 'react';
import { Music2, Plus, Download } from 'lucide-react';
import Link from 'next/link';
import AdminPageLayout from '../_components/AdminPageLayout';
import { RepertorioList } from './_components/RepertorioList';

export default function AdminRepertorioPage() {
    const [repertorio, setRepertorio] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRepertorio() {
            try {
                const response = await fetch('/api/repertorio');
                const data = await response.json();
                setRepertorio(data);
            } catch (error) {
                console.error('Erro ao carregar repertório:', error);
            } finally {
                setLoading(false);
            }
        }
        loadRepertorio();
    }, []);

    if (loading) {
        return (
            <AdminPageLayout title="Gestão de Repertório" icon={Music2}>
                <div className="admin-card p-8 text-center">
                    <p className="text-slate-600">Carregando...</p>
                </div>
            </AdminPageLayout>
        );
    }

    return (
        <AdminPageLayout
            title="Gestão de Repertório"
            subtitle="Acervo de músicas, partituras e materiais didáticos"
            icon={Music2}
            badge={`${repertorio.length} ${repertorio.length === 1 ? 'música' : 'músicas'}`}
            actions={
                <>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                    <Link href="/admin/repertorio/nova" className="admin-btn-primary flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Nova Música
                    </Link>
                </>
            }
        >
            <RepertorioList repertorio={repertorio} />
        </AdminPageLayout>
    );
}
