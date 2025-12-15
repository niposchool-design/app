'use client';

import { useEffect, useState } from 'react';
import { AlunosList } from './_components/AlunosList';
import AdminPageLayout from '../_components/AdminPageLayout';
import { StatsCard, StatsGrid } from '../_components/StatsCard';
import { GraduationCap, UserPlus, Download, TrendingUp, Users, Award, Calendar } from 'lucide-react';
import Link from 'next/link';
import { UserProfile } from '@/lib/types/users_turmas';

export default function AdminAlunosPage() {
  const [alunos, setAlunos] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlunos() {
      try {
        const response = await fetch('/api/profiles?tipo_usuario=aluno');

        if (!response.ok) {
          const errorData = await response.json();
          console.error('❌ Erro HTTP:', response.status, errorData);
          setAlunos([]);
          return;
        }

        const data = await response.json();

        console.log('📦 Dados recebidos:', data);

        // Garantir que data é um array
        if (Array.isArray(data)) {
          setAlunos(data);
        } else {
          console.error('❌ API retornou dados inválidos (não é array):', data);
          setAlunos([]);
        }
      } catch (error) {
        console.error('💥 Erro ao carregar alunos:', error);
        setAlunos([]);
      } finally {
        setLoading(false);
      }
    }
    loadAlunos();
  }, []);

  if (loading) {
    return (
      <AdminPageLayout title="Gestão de Alunos" icon={GraduationCap}>
        <div className="admin-card p-8 text-center">
          <p className="text-slate-600">Carregando...</p>
        </div>
      </AdminPageLayout>
    );
  }

  // Cálculos de métricas executivas
  const totalAlunos = alunos.length;
  const alunosAtivos = alunos.filter(a => a.ativo !== false).length;
  const novosEsteMes = alunos.filter(a => {
    const created = new Date(a.created_at || 0);
    const now = new Date();
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;

  // Simulação de métricas (podem ser substituídas por dados reais)
  const taxaRetencao = totalAlunos > 0 ? Math.round((alunosAtivos / totalAlunos) * 100) : 0;

  return (
    <AdminPageLayout
      title="Gestão de Alunos"
      subtitle="Visualize, gerencie e acompanhe todos os estudantes matriculados na instituição"
      icon={GraduationCap}
      badge={`${alunos.length} ${alunos.length === 1 ? 'ativo' : 'ativos'}`}
      actions={
        <>
          <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <Link href="/admin/alunos/novo" className="admin-btn-primary flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Novo Aluno
          </Link>
        </>
      }
    >
      {/* KPIs Executivos */}
      <StatsGrid cols={4}>
        <StatsCard
          title="Total de Alunos"
          value={totalAlunos}
          icon={GraduationCap}
          color="purple"
          subtitle="Matriculados na instituição"
        />
        <StatsCard
          title="Alunos Ativos"
          value={alunosAtivos}
          icon={Users}
          color="emerald"
          trend={{ value: 5, isPositive: true }}
          subtitle="Frequentando regularmente"
        />
        <StatsCard
          title="Novos Este Mês"
          value={novosEsteMes}
          icon={Calendar}
          color="blue"
          subtitle="Matrículas recentes"
        />
        <StatsCard
          title="Taxa de Retenção"
          value={`${taxaRetencao}%`}
          icon={Award}
          color="orange"
          trend={{ value: 3, isPositive: true }}
          subtitle="Alunos que permanecem"
        />
      </StatsGrid>

      {/* Lista de Alunos */}
      <div className="mt-8">
        <AlunosList alunos={alunos} />
      </div>
    </AdminPageLayout>
  );
}
