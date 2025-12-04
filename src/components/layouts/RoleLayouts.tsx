import React from 'react'
import { Outlet } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import { useAuth } from '../../contexts/AuthContext'

interface BaseLayoutProps {
  children?: React.ReactNode
  showBreadcrumbs?: boolean
  breadcrumbLabels?: Record<string, string>
  className?: string
}

/**
 * Layout base para todas as páginas autenticadas
 */
function BaseLayout({ 
  children, 
  showBreadcrumbs = true, 
  breadcrumbLabels,
  className = '' 
}: BaseLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header com breadcrumbs */}
      {showBreadcrumbs && (
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs 
              autoGenerate={true}
              customLabels={breadcrumbLabels}
              className="mb-0"
            />
          </div>
        </div>
      )}
      
      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children || <Outlet />}
      </main>
    </div>
  )
}

/**
 * Layout específico para páginas de alunos
 */
export function AlunoLayout({ 
  children, 
  showBreadcrumbs = true,
  className = '' 
}: BaseLayoutProps) {
  const { profile } = useAuth()
  
  // Labels customizados para área do aluno
  const breadcrumbLabels = {
    'student': 'Minha Área',
    'dashboard': 'Painel',
    'portfolio': 'Meu Portfólio',
    'challenges': 'Meus Desafios',
    'achievements': 'Minhas Conquistas',
    'instruments': 'Instrumentos',
    'history': 'História da Música',
    'profile': 'Meu Perfil'
  }
  
  return (
    <BaseLayout
      showBreadcrumbs={showBreadcrumbs}
      breadcrumbLabels={breadcrumbLabels}
      className={`aluno-layout ${className}`}
    >
      {/* Header específico do aluno */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-8 rounded-lg shadow-lg">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold">
            Olá, {profile?.full_name?.split(' ')[0] || 'Aluno'}! 👋
          </h1>
          <p className="text-blue-100 mt-1">
            Pronto para sua jornada musical hoje?
          </p>
        </div>
      </div>
      
      {children || <Outlet />}
    </BaseLayout>
  )
}

/**
 * Layout específico para páginas de professores
 */
export function ProfessorLayout({ 
  children, 
  showBreadcrumbs = true,
  className = '' 
}: BaseLayoutProps) {
  const { profile } = useAuth()
  
  // Labels customizados para área do professor
  const breadcrumbLabels = {
    'teacher': 'Área do Professor',
    'dashboard': 'Painel de Controle',
    'classes': 'Minhas Turmas',
    'students': 'Meus Alunos',
    'submissions': 'Envios dos Alunos',
    'reports': 'Relatórios',
    'profile': 'Meu Perfil'
  }
  
  return (
    <BaseLayout
      showBreadcrumbs={showBreadcrumbs}
      breadcrumbLabels={breadcrumbLabels}
      className={`professor-layout ${className}`}
    >
      {/* Header específico do professor */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white mb-8 rounded-lg shadow-lg">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold">
            Professor(a) {profile?.full_name?.split(' ')[0] || 'Professor'} 🎓
          </h1>
          <p className="text-green-100 mt-1">
            Gerencie suas turmas e acompanhe o progresso dos alunos
          </p>
        </div>
      </div>
      
      {children || <Outlet />}
    </BaseLayout>
  )
}

/**
 * Layout específico para páginas de administração
 */
export function AdminLayout({ 
  children, 
  showBreadcrumbs = true,
  className = '' 
}: BaseLayoutProps) {
  const { profile } = useAuth()
  
  // Labels customizados para área administrativa
  const breadcrumbLabels = {
    'admin': 'Administração',
    'dashboard': 'Painel Administrativo',
    'users': 'Gestão de Usuários',
    'system': 'Sistema',
    'settings': 'Configurações',
    'reports': 'Relatórios Gerais',
    'profile': 'Meu Perfil'
  }
  
  return (
    <BaseLayout
      showBreadcrumbs={showBreadcrumbs}
      breadcrumbLabels={breadcrumbLabels}
      className={`admin-layout ${className}`}
    >
      {/* Header específico do admin */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white mb-8 rounded-lg shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Administração ⚙️
            </h1>
            <p className="text-red-100 mt-1">
              Bem-vindo(a), {profile?.full_name?.split(' ')[0] || 'Admin'}
            </p>
          </div>
          
          {/* Indicador de modo admin */}
          <div className="bg-red-500/20 px-3 py-1 rounded-full">
            <span className="text-sm font-medium">Modo Admin</span>
          </div>
        </div>
      </div>
      
      {children || <Outlet />}
    </BaseLayout>
  )
}

/**
 * Layout específico para pastores (similar ao professor)
 */
export function PastorLayout({ 
  children, 
  showBreadcrumbs = true,
  className = '' 
}: BaseLayoutProps) {
  const { profile } = useAuth()
  
  // Labels customizados para área do pastor
  const breadcrumbLabels = {
    'pastor': 'Área Pastoral',
    'dashboard': 'Painel Pastoral',
    'classes': 'Grupos Musicais',
    'students': 'Membros',
    'submissions': 'Atividades',
    'reports': 'Relatórios Ministeriais',
    'profile': 'Meu Perfil'
  }
  
  return (
    <BaseLayout
      showBreadcrumbs={showBreadcrumbs}
      breadcrumbLabels={breadcrumbLabels}
      className={`pastor-layout ${className}`}
    >
      {/* Header específico do pastor */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white mb-8 rounded-lg shadow-lg">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold">
            Pastor(a) {profile?.full_name?.split(' ')[0] || 'Pastor'} ✝️
          </h1>
          <p className="text-purple-100 mt-1">
            Liderança musical e formação ministerial
          </p>
        </div>
      </div>
      
      {children || <Outlet />}
    </BaseLayout>
  )
}

/**
 * Layout para páginas de instrumentos com funcionalidades específicas
 */
export function InstrumentLayout({ 
  children,
  instrumentSlug,
  instrumentName,
  showBreadcrumbs = true,
  className = '' 
}: BaseLayoutProps & {
  instrumentSlug?: string
  instrumentName?: string
}) {
  return (
    <BaseLayout
      showBreadcrumbs={false} // Usaremos breadcrumbs customizados
      className={`instrument-layout ${className}`}
    >
      {/* Breadcrumbs específicos para instrumentos */}
      {showBreadcrumbs && instrumentSlug && (
        <div className="bg-white shadow-sm border-b border-gray-200 -mt-8 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs 
              items={[
                {
                  label: 'Início',
                  href: '/',
                  icon: <span>🏠</span>
                },
                {
                  label: 'Instrumentos',
                  href: '/student/instruments'
                },
                {
                  label: instrumentName || instrumentSlug,
                  isActive: true
                }
              ]}
            />
          </div>
        </div>
      )}
      
      {children || <Outlet />}
    </BaseLayout>
  )
}

/**
 * Layout para páginas de história da música
 */
export function HistoryLayout({ 
  children,
  periodSlug,
  periodName,
  topicSlug,
  topicName,
  showBreadcrumbs = true,
  className = '' 
}: BaseLayoutProps & {
  periodSlug?: string
  periodName?: string
  topicSlug?: string
  topicName?: string
}) {
  return (
    <BaseLayout
      showBreadcrumbs={false} // Usaremos breadcrumbs customizados
      className={`history-layout ${className}`}
    >
      {/* Breadcrumbs específicos para história */}
      {showBreadcrumbs && (
        <div className="bg-white shadow-sm border-b border-gray-200 -mt-8 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs 
              items={[
                {
                  label: 'Início',
                  href: '/',
                  icon: <span>🏠</span>
                },
                {
                  label: 'História da Música',
                  href: '/student/history'
                },
                ...(periodSlug ? [{
                  label: periodName || periodSlug,
                  href: topicSlug ? `/student/history/${periodSlug}` : undefined,
                  isActive: !topicSlug
                }] : []),
                ...(topicSlug && topicName ? [{
                  label: topicName,
                  isActive: true
                }] : [])
              ]}
            />
          </div>
        </div>
      )}
      
      {children || <Outlet />}
    </BaseLayout>
  )
}

export default BaseLayout