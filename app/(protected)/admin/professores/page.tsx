'use client';

import { useEffect, useState } from 'react';
import { ProfessoresList } from './_components/ProfessoresList';
import AdminPageLayout from '../_components/AdminPageLayout';
import { StatsCard, StatsGrid } from '../_components/StatsCard';
import { Users, UserPlus, Download, Shield, BookOpen, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { UserProfile } from '@/src/lib/types/users_turmas';

export default function AdminProfessoresPage() {
  const [professores, setProfessores] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfessores() {
      try {
        const response = await fetch('/api/profiles?tipo_usuario=professor');
        const data = await response.json();
        setProfessores(data);
      } catch (error) {
        console.error('Erro ao carregar professores:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProfessores();
  }, []);

  if (loading) {
    return (
      <AdminPageLayout title="Gestão de Professores" icon={Users}>
        <div className="admin-card p-8 text-center">
          <p className="text-slate-600">Carregando...</p>
        </div>
      </AdminPageLayout>
    );
  }

  // Métricas executivas do corpo docente
  const totalProfessores = professores.length;
  const professoresAtivos = professores.filter(p => p.ativo !== false).length;

  // Simulações de métricas (podem ser substituídas por dados reais da API)
  const horasLecaoadas = 320; // Exemplo: total de horas lecionadas no mês
  const avaliacaoMedia = 4.6; // Exemplo: avaliação média dos professores

  return (
    <AdminPageLayout
      title="Gestão de Professores"
      subtitle="Visualize e gerencie o corpo docente da instituição"
      icon={Users}
      badge={`${professores.length} ${professores.length === 1 ? 'ativo' : 'ativos'}`}
      actions={
        <>
          <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <Link href="/admin/professores/novo" className="admin-btn-primary flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Novo Professor
          </Link>
        </>
      }
    >
      {/* KPIs Executivos - Corpo Docente */}
      <StatsGrid cols={4}>
        <StatsCard
          title="Total de Professores"
          value={totalProfessores}
          icon={Shield}
          color="indigo"
          subtitle="No corpo docente"
        />
        <StatsCard
          title="Professores Ativos"
          value={professoresAtivos}
          icon={Users}
          color="emerald"
          trend={{ value: 2, isPositive: true }}
          subtitle="Lecionando atualmente"
        />
        <StatsCard
          title="Horas Lecionadas"
          value={horasLecaoadas}
          icon={Clock}
          color="blue"
          subtitle="Total no mês atual"
        />
        <StatsCard
          title="Avaliação Média"
          value={avaliacaoMedia.toFixed(1)}
          icon={Star}
          color="orange"
          trend={{ value: 8, isPositive: true }}
          subtitle="Satisfação dos alunos"
        />
      </StatsGrid>

      {/* Lista de Professores */}
      <div className="mt-8">
        <ProfessoresList professores={professores} />
      </div>
    </AdminPageLayout>
  );
}
