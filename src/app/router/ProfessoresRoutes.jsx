import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 👨‍🏫 Import das páginas dos professores
import ProfessoresLayout from '@/features/professores/pages/ProfessoresLayout';
import ProfessoresDashboard from '@/features/professores/pages/ProfessoresDashboard';
import ProfessoresConteudos from '@/features/professores/pages/ProfessoresConteudos';
import ProfessoresMinhaArea from '@/features/professores/pages/ProfessoresMinhaArea';
import ProfessoresEstatisticas from '@/features/professores/pages/ProfessoresEstatisticas';
import ConteudoDetalhes from '@/features/professores/pages/ConteudoDetalhes';
import FormConteudo from '@/features/professores/components/FormConteudo';

// � Import das páginas específicas dos professores para aulas/kanban
import Kanban from '@/features/admin/pages/Kanban';
import AulaDetail from '@/features/admin/pages/AulaDetail';

// 🛡️ Import dos componentes de proteção
import { ProtectedRoute } from './AuthRoutes';

// Componente de rota específica para professores
const ProfessorRoute = ({ children }) => {
  // Aqui poderia ter lógica específica de validação de professor
  // Por enquanto, usa a proteção básica
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

/**
 * ProfessoresRoutes - Módulo de rotas da área dos professores
 * Responsável por: dashboard, conteúdos, administração, estatísticas
 */
const ProfessoresRoutes = () => {
  return (
    <Routes>
      {/* Dashboard principal dos professores */}
      <Route 
        index
        element={
          <ProfessorRoute>
            <ProfessoresDashboard />
          </ProfessorRoute>
        } 
      />

      <Route 
        path="dashboard"
        element={
          <ProfessorRoute>
            <ProfessoresDashboard />
          </ProfessorRoute>
        } 
      />

      {/* ===== CONTEÚDOS ===== */}
      <Route 
        path="conteudos" 
        element={
          <ProfessorRoute>
            <ProfessoresConteudos />
          </ProfessorRoute>
        } 
      />

      <Route 
        path="conteudos/:id" 
        element={
          <ProfessorRoute>
            <ConteudoDetalhes />
          </ProfessorRoute>
        } 
      />

      <Route 
        path="categoria/:categoriaId" 
        element={
          <ProfessorRoute>
            <ProfessoresConteudos />
          </ProfessorRoute>
        } 
      />

      <Route 
        path="tipo/:tipo" 
        element={
          <ProfessorRoute>
            <ProfessoresConteudos />
          </ProfessorRoute>
        } 
      />

      <Route 
        path="novo" 
        element={
          <ProfessorRoute>
            <FormConteudo />
          </ProfessorRoute>
        } 
      />

      <Route 
        path="editar/:id" 
        element={
          <ProfessorRoute>
            <FormConteudo />
          </ProfessorRoute>
        } 
      />

      {/* ===== ÁREA PESSOAL ===== */}
      <Route 
        path="minha-area" 
        element={
          <ProfessorRoute>
            <ProfessoresMinhaArea />
          </ProfessorRoute>
        } 
      />

      <Route 
        path="estatisticas" 
        element={
          <ProfessorRoute>
            <ProfessoresEstatisticas />
          </ProfessorRoute>
        } 
      />

      {/* ===== GERENCIAMENTO DE AULAS ===== */}
      <Route 
        path="aulas" 
        element={
          <ProfessorRoute>
            <Kanban />
          </ProfessorRoute>
        } 
      />

      <Route 
        path="aulas/:id" 
        element={
          <ProfessorRoute>
            <AulaDetail />
          </ProfessorRoute>
        } 
      />

      <Route 
        path="turmas" 
        element={
          <ProfessorRoute>
            <ProfessoresEstatisticas />
          </ProfessorRoute>
        } 
      />
    </Routes>
  );
};

export default ProfessoresRoutes;
export { ProfessorRoute };