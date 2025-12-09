'use client'

/**
 * 🔵 ALUNO SIDEBAR - Next.js 14
 */

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  X, Home, Briefcase, Trophy, Award, Music, Calendar, TrendingUp,
  BookOpen, QrCode, Vote, Settings, HelpCircle, LogOut 
} from 'lucide-react'
import { useAuth } from '@/app/providers/AuthProvider'
import clsx from 'clsx'

interface AlunoSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AlunoSidebar({ isOpen, onClose }: AlunoSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/login')
      onClose()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  const navigationItems = [
    { name: 'Dashboard', path: '/alunos', icon: Home },
    { name: 'Portfólio', path: '/alunos/portfolio', icon: Briefcase },
    { name: 'Conquistas', path: '/alunos/conquistas', icon: Trophy },
    { name: 'Desafios', path: '/alunos/desafios', icon: Award },
    { name: 'Instrumentos', path: '/alunos/instrumentos', icon: Music },
    { name: 'Minhas Aulas', path: '/alunos/aulas', icon: Calendar },
    { name: 'Progresso', path: '/alunos/progresso', icon: TrendingUp },
    { name: 'História da Música', path: '/alunos/historia', icon: BookOpen },
    { name: 'Scanner QR', path: '/alunos/scanner', icon: QrCode },
    { name: 'Votação', path: '/alunos/votacao', icon: Vote },
    { name: 'Ajuda', path: '/alunos/ajuda', icon: HelpCircle },
    { name: 'Configurações', path: '/alunos/configuracoes', icon: Settings },
  ]

  return (
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
                    href={item.path}
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
  )
}
