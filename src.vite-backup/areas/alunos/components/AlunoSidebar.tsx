/**
 * 🔵 ALUNO SIDEBAR - Navegação exclusiva para Alunos
 */

import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  X, Home, Briefcase, Trophy, Award, Music, Calendar, TrendingUp,
  BookOpen, QrCode, Vote, Settings, HelpCircle, LogOut 
} from 'lucide-react'
import { ROUTES } from '@/lib/constants/routes'
import { useAuth } from '@/contexts/AuthContext'
import clsx from 'clsx'

interface AlunoSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const AlunoSidebar: React.FC<AlunoSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

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

  const navigationItems = [
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
    { name: 'Ajuda', path: ROUTES.HELP, icon: HelpCircle },
    { name: 'Configurações', path: ROUTES.SETTINGS, icon: Settings },
  ]

  return (
    <>
      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NS</span>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Nipo School</h2>
                <p className="text-xs text-blue-600 font-medium">Aluno</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User info */}
          <div className="p-4 border-b bg-blue-50">
            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
            <p className="text-xs text-blue-600 mt-1">Aluno</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={clsx(
                        'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                        active
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Sair</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
