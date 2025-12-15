'use client';

import { useEffect, useState } from 'react';
import { AlunosList } from './_components/AlunosList';
import AdminPageLayout from '../_components/AdminPageLayout';
import { GraduationCap, UserPlus, Download } from 'lucide-react';
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
      <AlunosList alunos={alunos} />
    </AdminPageLayout>
  );
}
