/**
 * 🧪 DEBUG AUTH PAGE - Página para testar autenticação e navegação
 */

import React from 'react'
import { useAuth } from '../../../../contexts/AuthContext'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../../../lib/constants/routes'
import { NipoCard, NipoCardBody } from '../../../../components/shared/NipoCard'
import { NipoButton } from '../../../../components/shared/NipoButton'

export function DebugAuthPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const location = useLocation()

  const debugInfo = {
    user: user ? {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    } : null,
    isAuthenticated,
    loading,
    currentPath: location.pathname,
    timestamp: new Date().toLocaleString(),
  }

  const roleRoutes = {
    admin: ROUTES.ADMIN,
    professor: ROUTES.PROFESSOR,
    aluno: ROUTES.ALUNO,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧪 Debug Autenticação
          </h1>
          <p className="text-gray-600">
            Informações detalhadas sobre o estado de autenticação
          </p>
        </div>

        {/* Estado da Autenticação */}
        <NipoCard title="Estado da Autenticação">
          <NipoCardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Informações do Usuário</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  {JSON.stringify(debugInfo.user, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Estado da Sessão</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Autenticado:</span>
                    <span className={`font-medium ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
                      {isAuthenticated ? 'Sim' : 'Não'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carregando:</span>
                    <span className={`font-medium ${loading ? 'text-yellow-600' : 'text-green-600'}`}>
                      {loading ? 'Sim' : 'Não'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rota Atual:</span>
                    <span className="font-medium text-blue-600">{location.pathname}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Timestamp:</span>
                    <span className="font-medium text-gray-600">{debugInfo.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          </NipoCardBody>
        </NipoCard>

        {/* Rotas por Papel */}
        {user && (
          <NipoCard title={`Rotas para ${user.role.toUpperCase()}`}>
            <NipoCardBody>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Rotas disponíveis para o papel atual: <span className="font-semibold">{user.role}</span>
                </p>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(roleRoutes[user.role as keyof typeof roleRoutes], null, 2)}
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <NipoButton
                    onClick={() => window.location.href = ROUTES.ALUNO.INDEX}
                    variant="outline"
                    fullWidth
                  >
                    Dashboard Aluno
                  </NipoButton>
                  
                  <NipoButton
                    onClick={() => window.location.href = ROUTES.PROFESSOR.INDEX}
                    variant="outline"
                    fullWidth
                  >
                    Dashboard Professor
                  </NipoButton>
                  
                  <NipoButton
                    onClick={() => window.location.href = ROUTES.ADMIN.INDEX}
                    variant="outline"
                    fullWidth
                  >
                    Dashboard Admin
                  </NipoButton>
                </div>
              </div>
            </NipoCardBody>
          </NipoCard>
        )}

        {/* Debug Completo */}
        <NipoCard title="Debug Completo (JSON)">
          <NipoCardBody>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </NipoCardBody>
        </NipoCard>

        {/* Ações de Teste */}
        <NipoCard title="Ações de Teste">
          <NipoCardBody>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <NipoButton
                onClick={() => window.location.reload()}
                variant="outline"
                fullWidth
              >
                Recarregar Página
              </NipoButton>
              
              <NipoButton
                onClick={() => console.log('Debug Auth:', debugInfo)}
                variant="outline"
                fullWidth
              >
                Log no Console
              </NipoButton>
              
              <NipoButton
                onClick={() => window.location.href = '/dashboard'}
                variant="outline"
                fullWidth
              >
                Ir para /dashboard
              </NipoButton>
              
              <NipoButton
                onClick={() => window.location.href = '/'}
                variant="outline"
                fullWidth
              >
                Ir para Home
              </NipoButton>
            </div>
          </NipoCardBody>
        </NipoCard>
      </div>
    </div>
  )
}

export default DebugAuthPage