'use client';

import { useEffect, useState } from 'react';
import { AlunosList } from './_components/AlunosList';
import AdminPageLayout from '../_components/AdminPageLayout';
import { StatsCard, StatsGrid } from '../_components/StatsCard';
import { ViewToggle, useViewMode, ViewMode } from '../_components/ViewToggle';
import { Pagination, usePagination } from '../_components/Pagination';
import { GraduationCap, UserPlus, Download, TrendingUp, Users, Award, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { UserProfile } from '@/lib/types/users_turmas';
import { motion } from 'framer-motion';

export default function AdminAlunosPage() {
  const [alunos, setAlunos] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useViewMode('admin-alunos-view', 'table');

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    getPaginatedItems,
  } = usePagination(alunos.length, 10);

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

  // Dados paginados
  const paginatedAlunos = getPaginatedItems(alunos);

  return (
    <AdminPageLayout
      title="Gestão de Alunos"
      subtitle="Visualize, gerencie e acompanhe todos os estudantes matriculados na instituição"
      icon={GraduationCap}
      badge={`${alunos.length} ${alunos.length === 1 ? 'ativo' : 'ativos'}`}
      actions={
        <>
          <ViewToggle
            currentView={viewMode}
            onViewChange={setViewMode}
            storageKey="admin-alunos-view"
          />
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

      {/* Lista de Alunos - Múltiplas visualizações */}
      <div className="mt-8">
        {viewMode === 'table' && (
          <div className="admin-card overflow-hidden p-0">
            <AlunosList alunos={paginatedAlunos} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={alunos.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        )}

        {viewMode === 'cards' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedAlunos.map((aluno) => (
              <motion.div
                key={aluno.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-purple-200 transition-all duration-300 relative overflow-hidden"
              >
                {/* Gradiente decorativo */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full -mr-8 -mt-8"></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center text-purple-600 font-bold text-lg border-2 border-purple-200 overflow-hidden shadow-sm flex-shrink-0">
                      {aluno.avatar_url ? (
                        <img src={aluno.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        aluno.full_name?.charAt(0) || 'A'
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-lg mb-1 truncate group-hover:text-purple-700 transition-colors">
                        {aluno.full_name || 'Nome não informado'}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        aluno.ativo !== false
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {aluno.ativo !== false ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-4">
                    {aluno.email && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{aluno.email}</span>
                      </div>
                    )}
                    {aluno.telefone && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{aluno.telefone}</span>
                      </div>
                    )}
                    {aluno.endereco && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{aluno.endereco}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Cadastrado em {new Date(aluno.created_at || 0).toLocaleDateString('pt-BR')}
                    </span>
                    <Link
                      href={`/admin/alunos/${aluno.id}`}
                      className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg text-xs font-semibold hover:bg-purple-100 transition-colors border border-purple-200"
                    >
                      Ver Perfil
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
            <div className="admin-card p-0 overflow-hidden mt-5">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={alunos.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </div>
          </>
        )}

        {viewMode === 'grid' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {paginatedAlunos.map((aluno) => (
              <motion.div
                key={aluno.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-white rounded-xl p-5 shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-purple-200 transition-all duration-300 text-center"
              >
                <Link href={`/admin/alunos/${aluno.id}`} className="block">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center text-purple-600 font-bold text-xl border-2 border-purple-200 overflow-hidden shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    {aluno.avatar_url ? (
                      <img src={aluno.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      aluno.full_name?.charAt(0) || 'A'
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-2 truncate group-hover:text-purple-700 transition-colors">
                    {aluno.full_name || 'Nome não informado'}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                    aluno.ativo !== false
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {aluno.ativo !== false ? 'Ativo' : 'Inativo'}
                  </span>
                </Link>
              </motion.div>
            ))}
            </div>
            <div className="admin-card p-0 overflow-hidden mt-5">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={alunos.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </div>
          </>
        )}
      </div>
    </AdminPageLayout>
  );
}
