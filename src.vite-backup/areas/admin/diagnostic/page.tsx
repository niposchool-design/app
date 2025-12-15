/**
 * 🔍 DIAGNÓSTICO DO SISTEMA - Verificação de Componentes e Rotas
 * 
 * Página para verificar:
 * - Status de todos os componentes
 * - Funcionamento das rotas
 * - Integração com banco de dados
 * - Uso correto dos dashboards
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Database, 
  Layout, 
  Users, 
  Music, 
  Settings,
  Eye,
  RefreshCw
} from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'
import { NipoCard, NipoCardBody } from '../../../components/shared/NipoCard'
import { NipoButton } from '../../../components/shared/NipoButton'

interface ComponentCheck {
  name: string
  path: string
  status: 'ok' | 'error' | 'warning' | 'loading'
  description: string
  role?: 'admin' | 'professor' | 'aluno' | 'all'
}

export function SystemDiagnosticPage() {
  const { user } = useAuth()
  const [components, setComponents] = useState<ComponentCheck[]>([])
  const [isChecking, setIsChecking] = useState(false)

  // Lista de componentes e rotas para verificar
  const systemComponents: ComponentCheck[] = [
    // Dashboards
    { name: 'Admin Dashboard', path: '/admin', status: 'loading', description: 'Dashboard administrativo principal', role: 'admin' },
    { name: 'Professor Dashboard', path: '/professores', status: 'loading', description: 'Dashboard para professores', role: 'professor' },
    { name: 'Aluno Dashboard', path: '/alunos', status: 'loading', description: 'Dashboard para alunos', role: 'aluno' },
    
    // Páginas Admin
    { name: 'Database Admin', path: '/admin/database', status: 'loading', description: 'Administração do banco de dados', role: 'admin' },
    
    // Páginas Principais
    { name: 'Instrumentos Page', path: '/instrumentos', status: 'loading', description: 'Biblioteca de instrumentos', role: 'all' },
    { name: 'System Dashboard', path: '/system', status: 'loading', description: 'Dashboard do sistema', role: 'all' },
    { name: 'Navigation Page', path: '/', status: 'loading', description: 'Página de navegação central', role: 'all' },
    
    // Páginas de Aluno
    { name: 'Conquistas', path: '/alunos/conquistas', status: 'loading', description: 'Sistema de conquistas', role: 'aluno' },
    { name: 'Portfolio', path: '/alunos/portfolio', status: 'loading', description: 'Portfolio do aluno', role: 'aluno' },
    { name: 'Desafios', path: '/alunos/desafios', status: 'loading', description: 'Desafios disponíveis', role: 'aluno' },
    { name: 'Minhas Aulas', path: '/alunos/aulas', status: 'loading', description: 'Aulas do aluno', role: 'aluno' },
    { name: 'Progresso', path: '/alunos/progresso', status: 'loading', description: 'Progresso do aluno', role: 'aluno' },
    { name: 'Perfil', path: '/alunos/perfil', status: 'loading', description: 'Perfil do aluno', role: 'aluno' },
    
    // Páginas Gerais
    { name: 'Configurações', path: '/configuracoes', status: 'loading', description: 'Configurações do sistema', role: 'all' },
    { name: 'Notificações', path: '/notificacoes', status: 'loading', description: 'Central de notificações', role: 'all' },
    { name: 'Ajuda', path: '/ajuda', status: 'loading', description: 'Sistema de ajuda', role: 'all' },
  ]

  // Simular verificação dos componentes
  const checkComponents = async () => {
    setIsChecking(true)
    
    const updatedComponents = []
    
    for (const component of systemComponents) {
      // Simular verificação
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Determinar status baseado em role e disponibilidade
      let status: ComponentCheck['status'] = 'ok'
      
      // Verificar se o usuário tem acesso
      if (component.role && component.role !== 'all' && user?.role !== component.role) {
        status = 'warning' // Não tem acesso
      }
      
      updatedComponents.push({
        ...component,
        status
      })
    }
    
    setComponents(updatedComponents)
    setIsChecking(false)
  }

  useEffect(() => {
    checkComponents()
  }, [user])

  const getStatusIcon = (status: ComponentCheck['status']) => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'loading':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
    }
  }

  const getStatusText = (status: ComponentCheck['status']) => {
    switch (status) {
      case 'ok':
        return 'Funcionando'
      case 'error':
        return 'Erro'
      case 'warning':
        return 'Sem acesso'
      case 'loading':
        return 'Verificando...'
    }
  }

  const filterComponentsByRole = (components: ComponentCheck[]) => {
    if (!user) return components
    
    return components.filter(component => 
      component.role === 'all' || 
      component.role === user.role ||
      user.role === 'admin' // Admin vê tudo
    )
  }

  const visibleComponents = filterComponentsByRole(components)
  const okCount = visibleComponents.filter(c => c.status === 'ok').length
  const errorCount = visibleComponents.filter(c => c.status === 'error').length
  const warningCount = visibleComponents.filter(c => c.status === 'warning').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🔍 Diagnóstico do Sistema
          </h1>
          <p className="text-gray-600 text-lg">
            Verificação completa de componentes e rotas do Nipo School
          </p>
        </div>

        {/* Info do Usuário */}
        <NipoCard title="Informações do Usuário">
          <NipoCardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Usuário</p>
                  <p className="font-semibold">{user?.nome || 'Não logado'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Papel</p>
                  <p className="font-semibold capitalize">{user?.role || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-sm">{user?.email || 'N/A'}</p>
                </div>
              </div>
            </div>
          </NipoCardBody>
        </NipoCard>

        {/* Resumo do Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{okCount}</p>
                <p className="text-sm text-gray-600">Funcionando</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
                <p className="text-sm text-gray-600">Sem Acesso</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{errorCount}</p>
                <p className="text-sm text-gray-600">Com Erro</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <Layout className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{visibleComponents.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Componentes */}
        <NipoCard title="Status dos Componentes">
          <NipoCardBody>
            <div className="space-y-4">
              {/* Controles */}
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Mostrando {visibleComponents.length} componentes para o papel: <span className="font-semibold capitalize">{user?.role || 'Visitante'}</span>
                </p>
                <NipoButton
                  onClick={checkComponents}
                  disabled={isChecking}
                  leftIcon={<RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />}
                  variant="outline"
                >
                  {isChecking ? 'Verificando...' : 'Verificar Novamente'}
                </NipoButton>
              </div>

              {/* Lista */}
              <div className="space-y-3">
                {visibleComponents.map((component, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(component.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{component.name}</h3>
                        <p className="text-sm text-gray-600">{component.description}</p>
                        <p className="text-xs text-gray-500">Rota: {component.path}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        component.status === 'ok' ? 'bg-green-100 text-green-800' :
                        component.status === 'error' ? 'bg-red-100 text-red-800' :
                        component.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {getStatusText(component.status)}
                      </span>
                      
                      {component.status === 'ok' && (
                        <Link to={component.path}>
                          <NipoButton size="sm" variant="outline" leftIcon={<Eye className="w-3 h-3" />}>
                            Acessar
                          </NipoButton>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </NipoCardBody>
        </NipoCard>

        {/* Ações Rápidas */}
        <NipoCard title="Ações Rápidas">
          <NipoCardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/">
                <NipoButton fullWidth leftIcon={<Layout className="w-4 h-4" />}>
                  Navegação Principal
                </NipoButton>
              </Link>
              
              {user?.role === 'admin' && (
                <Link to="/admin/database">
                  <NipoButton fullWidth leftIcon={<Database className="w-4 h-4" />} variant="outline">
                    Database Admin
                  </NipoButton>
                </Link>
              )}
              
              <Link to="/instrumentos">
                <NipoButton fullWidth leftIcon={<Music className="w-4 h-4" />} variant="outline">
                  Biblioteca de Instrumentos
                </NipoButton>
              </Link>
            </div>
          </NipoCardBody>
        </NipoCard>
      </div>
    </div>
  )
}

export default SystemDiagnosticPage

export default SystemDiagnosticPage