import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 👑 Import das páginas administrativas principais
import AdminDashboard from '@/features/admin/pages/AdminDashboard';
import AdminAlunoDetalhe from '@/features/admin/pages/AdminAlunoDetalhe';
import AdminProfessorDetalhe from '@/features/admin/pages/AdminProfessorDetalhe';

// 🎼 Import das páginas administrativas completas
import AdminAlunos from '@/features/admin/pages/AdminAlunos';
import AdminProfessores from '@/features/admin/pages/AdminProfessores';
import AdminDevocionais from '@/features/admin/pages/AdminDevocionais';
import AdminCurriculum from '@/features/admin/pages/AdminCurriculum';
import AdminTurmas from '@/features/turmas/pages/AdminTurmas';
import { QRCodeManager } from '@/features/admin/pages/QRCodeManager';
import AdminInstruments from '@/features/admin/pages/AdminInstruments';
import AdminInstrumentView from '@/features/admin/pages/AdminInstrumentView';
import AdminInstrumentForm from '@/features/admin/pages/AdminInstrumentForm';
import Kanban from '@/features/admin/pages/Kanban';
import AulaDetail from '@/features/admin/pages/AulaDetail';

// 🛡️ Import dos componentes de proteção
import { ProtectedRoute } from './AuthRoutes';

// Componente de rota específica para administradores
const AdminRoute = ({ children }) => {
  // Aqui poderia ter lógica específica de validação de admin
  // Por enquanto, usa a proteção básica
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

/**
 * AdminRoutes - Módulo de rotas da área administrativa
 * Responsável por: dashboard admin, detalhes de usuários, rotas diretas de admin
 */
const AdminRoutes = () => {
  return (
    <Routes>
      {/* Dashboard principal dos admins */}
      <Route 
        index
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } 
      />

      {/* ===== GESTÃO DE USUÁRIOS ===== */}
      <Route 
        path="alunos" 
        element={
          <AdminRoute>
            <AdminAlunos />
          </AdminRoute>
        } 
      />

      <Route 
        path="alunos/:id" 
        element={
          <AdminRoute>
            <AdminAlunoDetalhe />
          </AdminRoute>
        } 
      />

      <Route 
        path="professores" 
        element={
          <AdminRoute>
            <AdminProfessores />
          </AdminRoute>
        } 
      />
      
      <Route 
        path="professores/:id" 
        element={
          <AdminRoute>
            <AdminProfessorDetalhe />
          </AdminRoute>
        } 
      />

      {/* ===== GESTÃO DE CONTEÚDO ===== */}
      <Route 
        path="devocionais" 
        element={
          <AdminRoute>
            <AdminDevocionais />
          </AdminRoute>
        } 
      />

      <Route 
        path="curriculum" 
        element={
          <AdminRoute>
            <AdminCurriculum />
          </AdminRoute>
        } 
      />

      <Route 
        path="turmas" 
        element={
          <AdminRoute>
            <AdminTurmas />
          </AdminRoute>
        } 
      />

      <Route 
        path="qr-manager" 
        element={
          <AdminRoute>
            <QRCodeManager />
          </AdminRoute>
        } 
      />

      {/* ===== GESTÃO DE INSTRUMENTOS ===== */}
      <Route 
        path="instruments" 
        element={
          <AdminRoute>
            <AdminInstruments />
          </AdminRoute>
        } 
      />

      <Route 
        path="instruments/new" 
        element={
          <AdminRoute>
            <AdminInstrumentForm />
          </AdminRoute>
        } 
      />

      <Route 
        path="instruments/:id/edit" 
        element={
          <AdminRoute>
            <AdminInstrumentForm />
          </AdminRoute>
        } 
      />

      <Route 
        path="instruments/view/:instrumentId" 
        element={
          <AdminRoute>
            <AdminInstrumentView />
          </AdminRoute>
        } 
      />

      {/* ===== GESTÃO DE AULAS ===== */}
      <Route 
        path="kanban" 
        element={
          <AdminRoute>
            <Kanban />
          </AdminRoute>
        } 
      />

      <Route 
        path="aulas/:id" 
        element={
          <AdminRoute>
            <AulaDetail />
          </AdminRoute>
        } 
      />
    </Routes>
  );
};

export default AdminRoutes;
export { AdminRoute };