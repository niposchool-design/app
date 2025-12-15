'use client';

import { useEffect, useState } from 'react';
import { ProfessoresList } from './_components/ProfessoresList';
import AdminPageLayout from '../_components/AdminPageLayout';
import { Users, UserPlus, Download } from 'lucide-react';
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
      <ProfessoresList professores={professores} />
    </AdminPageLayout>
  );
}
