/**
 * 🗂️ SIDEBAR - Barra Lateral de Navegação
 * 
 * Sidebar para páginas protegidas
 * - Navegação baseada no role do usuário
 * - Responsive (drawer no mobile)
 */

import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  X, Home, BookOpen, Trophy, Briefcase, Users, Settings, HelpCircle, 
  Music, Calendar, Award, Library, TrendingUp, QrCode, Vote, 
  Columns, List, FileText, UserCheck, GraduationCap, BarChart3, LogOut 
} from 'lucide-react'
import { ROUTES } from '../../../lib/constants/routes'
import { useAuth } from '../../../contexts/AuthContext'
import clsx from 'clsx'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  // 🔧 CORRIGIDO: Usar role do contexto AuthContext
  const userRole = user?.role || 'aluno'
  
  // 🔍 DEBUG DETALHADO
  console.log('🗂️ Sidebar - RENDERIZOU com:', {
    userRole,
    userEmail: user?.email,
    userId: user?.id,
    userCompleto: user,
    temUser: !!user
  })

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
      onClose()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  // Navegação baseada no role
  const getNavigationItems = () => {
    const common = [
      { name: 'Ajuda', path: ROUTES.HELP, icon: HelpCircle },
      { name: 'Configurações', path: ROUTES.SETTINGS, icon: Settings },
    ]

    if (userRole === 'aluno') {
      return [
        { name: 'Dashboard', path: ROUTES.ALUNO.INDEX, icon: Home },
        { name: 'Portfólio', path: ROUTES.ALUNO.PORTFOLIO.INDEX, icon: Briefcase },
        { name: 'Conquistas', path: ROUTES.ALUNO.ACHIEVEMENTS.INDEX, icon: Trophy },
        { name: 'Desafios', path: ROUTES.ALUNO.CHALLENGES.INDEX, icon: Award },
        { name: 'Instrumentos', path: ROUTES.ALUNO.INSTRUMENTS.INDEX, icon: Music },
        { name: 'Minhas Aulas', path: ROUTES.ALUNO.CLASSES, icon: Calendar },
        { name: 'Progresso', path: ROUTES.ALUNO.PROGRESS, icon: TrendingUp },
        { name: 'História da Música', path: ROUTES.HISTORIA.INDEX, icon: BookOpen },
        { name: 'Scanner QR', path: ROUTES.SCANNER, icon: QrCode },
        { name: 'Votação', path: ROUTES.VOTE, icon: Vote },
        ...common,
      ]
    }

    if (userRole === 'professor') {
      return [
        { name: 'Dashboard', path: ROUTES.PROFESSOR.INDEX, icon: Home },
        { name: 'Turmas', path: ROUTES.PROFESSOR.CLASSES, icon: Users },
        { name: 'Conteúdos', path: ROUTES.PROFESSOR_CONTEUDOS, icon: Library },
        { name: 'Estatísticas', path: ROUTES.PROFESSOR_ESTATISTICAS, icon: BarChart3 },
        { name: 'Avaliações', path: ROUTES.PROFESSOR.REPORTS, icon: Award },
        { name: 'Scanner QR', path: ROUTES.SCANNER, icon: QrCode },
        ...common,
      ]
    }

    if (userRole === 'admin') {
      return [
        { name: 'Dashboard', path: ROUTES.ADMIN.INDEX, icon: Home },
        
        // Gestão de Aulas
        { name: 'Aulas - Kanban', path: ROUTES.ADMIN_AULAS_KANBAN, icon: Columns },
        { name: 'Aulas - Lista', path: ROUTES.ADMIN_AULAS, icon: List },
        
        // Gestão de Pessoas
        { name: 'Professores', path: ROUTES.ADMIN_PROFESSORES, icon: UserCheck },
        { name: 'Alunos', path: ROUTES.ADMIN_ALUNOS, icon: GraduationCap },
        
        // QR Code
        { name: 'Gerenciar QR Codes', path: ROUTES.QR_MANAGER, icon: QrCode },
        { name: 'Scanner QR', path: ROUTES.SCANNER, icon: QrCode },
        
        // Outras funcionalidades
        { name: 'Banco de Dados', path: '/admin/database', icon: FileText },
        { name: 'Diagnóstico', path: '/admin/diagnostic', icon: Music },
        
        // Debug (desenvolvimento)
        ...(process.env.NODE_ENV === 'development' ? [
          { name: '🔍 Debug Role', path: '/debug/role', icon: HelpCircle },
        ] : []),
        
        ...common,
      ]
    }

    return common
  }

  const navigationItems = getNavigationItems()

  return (
    <>
      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sakura-500 to-cherry-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">音</span>
            </div>
            <span className="text-xl font-zen font-bold text-gray-900">Nipo School</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {/* Badge de Role - SEMPRE VISÍVEL */}
          <div className="mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
            <p className="text-xs text-indigo-700 font-medium mb-1">Perfil Ativo:</p>
            <div className="flex items-center gap-2">
              <div className={clsx(
                "w-2 h-2 rounded-full",
                userRole === 'admin' ? 'bg-red-500' : 
                userRole === 'professor' ? 'bg-blue-500' : 'bg-green-500'
              )}></div>
              <p className="text-sm font-bold text-indigo-900 uppercase">{userRole}</p>
            </div>
            <p className="text-xs text-indigo-600 mt-1 truncate">{user?.email}</p>
          </div>

          {/* Debug Info - Apenas para desenvolvimento */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-700 font-medium">🔧 Debug Mode:</p>
              <p className="text-xs text-yellow-600">Role: {userRole}</p>
              <p className="text-xs text-yellow-600">Items: {navigationItems.length}</p>
              <p className="text-xs text-yellow-600">User ID: {user?.id?.slice(0, 8)}...</p>
            </div>
          )}
          
          {navigationItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  active
                    ? 'bg-[var(--color-indigo)] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}

          {/* Debug Quick Access - SEMPRE VISÍVEL EM DEV */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-medium px-4 mb-2">🔧 FERRAMENTAS DE DEBUG</p>
              <Link
                to="/debug/role"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors bg-yellow-50 hover:bg-yellow-100 border border-yellow-300"
              >
                <HelpCircle className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-yellow-900">Verificar Role</span>
              </Link>
            </div>
          )}

          {/* Logout Button - SEMPRE NO FINAL */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-700 hover:bg-red-50 border border-red-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}
