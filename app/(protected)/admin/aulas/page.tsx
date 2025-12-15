'use client';

import { useEffect, useState } from 'react';
import { Calendar, Plus, Download } from 'lucide-react';
import Link from 'next/link';
import AdminPageLayout from '../_components/AdminPageLayout';
import { AulasManager } from './_components/AulasManager';

export default function AdminAulasPage() {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAulas() {
      try {
        const response = await fetch('/api/aulas');
        const data = await response.json();
        setAulas(data);
      } catch (error) {
        console.error('Erro ao carregar aulas:', error);
      } finally {
        setLoading(false);
      }
    }
    loadAulas();
  }, []);

  if (loading) {
    return (
      <AdminPageLayout title="Gestão de Aulas" icon={Calendar}>
        <div className="admin-card p-8 text-center">
          <p className="text-slate-600">Carregando...</p>
        </div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title="Gestão de Aulas"
      subtitle="Planejamento pedagógico e calendário de atividades"
      icon={Calendar}
      badge={`${aulas.length} ${aulas.length === 1 ? 'aula' : 'aulas'}`}
      actions={
        <>
          <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <Link href="/admin/aulas/nova" className="admin-btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Aula
          </Link>
        </>
      }
    >
      <AulasManager aulasIniciais={aulas} />
    </AdminPageLayout>
  );
}
