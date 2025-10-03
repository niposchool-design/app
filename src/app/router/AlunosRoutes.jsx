import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 👨‍🎓 Import das páginas dos alunos
import AlunoDashboard from '@/features/alunos/pages/AlunoDashboard';
import BibliotecaInstrumentos from '@/features/alunos/pages/BibliotecaInstrumentos';
import BibliotecaRepertorio from '@/features/alunos/pages/BibliotecaRepertorio';
import BibliotecaVideos from '@/features/alunos/pages/BibliotecaVideos';
import CentroEstudos from '@/features/alunos/pages/CentroEstudosPadronizado';
import DetalheInstrumento from '@/features/alunos/pages/DetalheInstrumento';
import MetodologiasEnsino from '@/features/alunos/pages/MetodologiasEnsino';
import MeuInstrumento from '@/features/alunos/pages/MeuInstrumento';
import NovaPergunta from '@/features/alunos/pages/NovaPergunta';
import ProgressoAluno from '@/features/alunos/pages/ProgressoAluno';
import SistemaDuvidas from '@/features/alunos/pages/SistemaDuvidas';

// 📚 Import das páginas de conteúdo especializado
import ModulosPage from '@/features/modulos/pages/ModulosPage';
import ConquistasPage from '@/features/conquistas/pages/ConquistasPage';
import DevocionalPage from '@/features/devocional/pages/DevocionalPage';

// 🎵 Import das páginas de instrumentos
import InstrumentosLayout from '@/features/instrumentos/pages/InstrumentosLayout';
import InstrumentosList from '@/features/instrumentos/pages/InstrumentosList';
import InstrumentoPagina from '@/features/instrumentos/pages/InstrumentoPagina';

// 📱 Import do Scanner QR
import { QRScannerPage } from '@/features/alunos/pages/QRScannerPage';

// 🧪 Import para debug/teste
import TestDevotionalQuery from '@/components/debug/TestDevotionalQuery';

// 🛡️ Import do componente de proteção
import { ProtectedRoute } from './AuthRoutes';

/**
 * AlunosRoutes - Módulo de rotas da área dos alunos
 * Responsável por: dashboard, biblioteca, estudos, instrumentos, gamificação
 */
const AlunosRoutes = () => {
  return (
    <Routes>
      {/* Rota inicial dos alunos - dashboard */}
      <Route 
        index
        element={
          <ProtectedRoute>
            <AlunoDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Dashboard direto dos alunos */}
      <Route 
        path="dashboard" 
        element={
          <ProtectedRoute>
            <AlunoDashboard />
          </ProtectedRoute>
        } 
      />

      {/* ===== ROTAS PRINCIPAIS DE ALUNOS ===== */}
      <Route 
        path="centro-estudos" 
        element={
          <ProtectedRoute>
            <CentroEstudos />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="meu-instrumento" 
        element={
          <ProtectedRoute>
            <MeuInstrumento />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="progresso" 
        element={
          <ProtectedRoute>
            <ProgressoAluno />
          </ProtectedRoute>
        } 
      />

      {/* ===== BIBLIOTECA ===== */}
      <Route 
        path="biblioteca/instrumentos" 
        element={
          <ProtectedRoute>
            <BibliotecaInstrumentos />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="biblioteca/repertorio" 
        element={
          <ProtectedRoute>
            <BibliotecaRepertorio />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="biblioteca/videos" 
        element={
          <ProtectedRoute>
            <BibliotecaVideos />
          </ProtectedRoute>
        } 
      />

      {/* ===== SISTEMA DE DÚVIDAS ===== */}
      <Route 
        path="duvidas" 
        element={
          <ProtectedRoute>
            <SistemaDuvidas />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="duvidas/nova" 
        element={
          <ProtectedRoute>
            <NovaPergunta />
          </ProtectedRoute>
        } 
      />

      {/* ===== INSTRUMENTOS ===== */}
      <Route 
        path="instrumentos" 
        element={
          <ProtectedRoute>
            <InstrumentosLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<InstrumentosList />} />
        <Route path=":instrumentId" element={<InstrumentoPagina />} />
      </Route>

      <Route 
        path="instrumento/:id" 
        element={
          <ProtectedRoute>
            <DetalheInstrumento />
          </ProtectedRoute>
        } 
      />

      {/* ===== CONTEÚDO E GAMIFICAÇÃO ===== */}
      <Route 
        path="modulos" 
        element={
          <ProtectedRoute>
            <ModulosPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="conquistas" 
        element={
          <ProtectedRoute>
            <ConquistasPage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="devocional" 
        element={
          <ProtectedRoute>
            <DevocionalPage />
          </ProtectedRoute>
        } 
      />

      {/* ===== OUTROS ===== */}
      <Route 
        path="metodologias-ensino" 
        element={
          <ProtectedRoute>
            <MetodologiasEnsino />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="scanner" 
        element={
          <ProtectedRoute>
            <QRScannerPage />
          </ProtectedRoute>
        } 
      />

      {/* ===== DEBUG (temporário) ===== */}
      <Route 
        path="test-devotional" 
        element={
          <ProtectedRoute>
            <TestDevotionalQuery />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AlunosRoutes;