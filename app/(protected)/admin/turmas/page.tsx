'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Plus, Download, AlertCircle, School, Users, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import TurmasGrid from './_components/TurmasGrid';
import AdminPageLayout from '../_components/AdminPageLayout';
import { StatsCard, StatsGrid } from '../_components/StatsCard';

export default function AdminTurmasPage() {
    const [turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTurmas() {
            try {
                setError(null);
                const response = await fetch('/api/turmas');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setTurmas(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Erro ao carregar turmas:', error);
                setError(error instanceof Error ? error.message : 'Erro ao carregar turmas');
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

    if (error) {
        return (
            <AdminPageLayout title="Gestão de Turmas" icon={BookOpen}>
                <div className="admin-card p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">Erro ao carregar turmas</p>
                    <p className="text-sm text-red-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </AdminPageLayout>
        );
    }

    // Métricas executivas de turmas
    const turmasAtivas = turmas.filter((t: any) => t.ativo);
    const totalTurmas = turmas.length;
    const totalAlunos = turmas.reduce((acc: number, t: any) => acc + (t.qtd_alunos || 0), 0);
    const mediaAlunosPorTurma = totalTurmas > 0 ? Math.round(totalAlunos / totalTurmas) : 0;

    // Simulação de capacidade (pode ser substituída por dados reais)
    const capacidadeTotal = totalTurmas * 20; // Assumindo 20 alunos por turma
    const taxaOcupacao = capacidadeTotal > 0 ? Math.round((totalAlunos / capacidadeTotal) * 100) : 0;

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
            {/* KPIs Executivos - Turmas */}
            <StatsGrid cols={4}>
                <StatsCard
                    title="Total de Turmas"
                    value={totalTurmas}
                    icon={School}
                    color="purple"
                    subtitle={`${turmasAtivas.length} ativas`}
                />
                <StatsCard
                    title="Total de Alunos"
                    value={totalAlunos}
                    icon={Users}
                    color="emerald"
                    trend={{ value: 12, isPositive: true }}
                    subtitle="Matriculados em turmas"
                />
                <StatsCard
                    title="Média por Turma"
                    value={mediaAlunosPorTurma}
                    icon={TrendingUp}
                    color="blue"
                    subtitle="Alunos por turma"
                />
                <StatsCard
                    title="Taxa de Ocupação"
                    value={`${taxaOcupacao}%`}
                    icon={Clock}
                    color="orange"
                    trend={{ value: 5, isPositive: true }}
                    subtitle="Capacidade utilizada"
                />
            </StatsGrid>

            {/* Grid de Turmas */}
            <div className="mt-8">
                <TurmasGrid turmas={turmas} />
            </div>
        </AdminPageLayout>
    );
}
