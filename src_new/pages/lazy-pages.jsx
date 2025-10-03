import React, { lazy } from 'react';

/**
 * Lazy Pages - Apenas arquivos que existem
 */

// ✅ PÁGINAS QUE EXISTEM
export const StructureBridgeLazy = lazy(() => import('./structure-bridge.jsx'));
export const NavigationTestLazy = lazy(() => import('./navigation-test.jsx'));
export const TestAdminDashboardLazy = lazy(() => import('./test-admin-dashboard.jsx'));
export const PerformanceDashboardLazy = lazy(() => import('./performance-dashboard.jsx'));

// ✅ FALLBACK COMPONENT
export const PageLoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Carregando página...</p>
    </div>
  </div>
);
