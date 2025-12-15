'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Plus, Download } from 'lucide-react';
import Link from 'next/link';
import TurmasGrid from './_components/TurmasGrid';
import AdminPageLayout from '../_components/AdminPageLayout';

export default function AdminTurmasPage() {
    const [turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTurmas() {
            try {
                const response = await fetch('/api/turmas');
                const data = await response.json();
                setTurmas(data);
            } catch (error) {
                console.error('Erro ao carregar turmas:', error);
            } finally {
                setLoading(false);
            }
        }
        loadTurmas();
    }, []);

    if (loading) {
        return (
            <AdminPageLayout title="Gestão de Turmas" icon={BookOpen}>
                <div className="admin-card p-8 text-center">
                    <p className="text-slate-600">Carregando...</p>
                </div>
            </AdminPageLayout>
        );
    }

    const turmasAtivas = turmas.filter((t: any) => t.ativo);

    return (
        <AdminPageLayout
            title="Gestão de Turmas"
            subtitle="Acompanhe as turmas ativas, horários e matrículas"
            icon={BookOpen}
            badge={`${turmasAtivas.length} ${turmasAtivas.length === 1 ? 'ativa' : 'ativas'}`}
            actions={
                <>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                    <Link href="/admin/turmas/nova" className="admin-btn-primary flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Nova Turma
                    </Link>
                </>
            }
        >
            <TurmasGrid turmas={turmas} />
        </AdminPageLayout>
    );
}
