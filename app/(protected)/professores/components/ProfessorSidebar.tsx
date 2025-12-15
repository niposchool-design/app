'use client'

/**
 * 🟢 PROFESSOR SIDEBAR - Next.js 14
 */

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  X, Home, Users, Library, BarChart3, Award, QrCode,
  Settings, HelpCircle, LogOut, Calendar, Music
} from 'lucide-react'
import { useAuth } from '@/app/providers/AuthProvider'
import clsx from 'clsx'

interface ProfessorSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfessorSidebar({ isOpen, onClose }: ProfessorSidebarProps) {
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
    { name: 'Dashboard', path: '/professores', icon: Home },
    { name: 'Turmas', path: '/professores/turmas', icon: Users },
    { name: 'Conteúdos', path: '/em-construcao', icon: Library },
    { name: 'Cronograma Aulas', path: '/professores/aulas', icon: Calendar },
    { name: 'Show Final', path: '/alunos/show-final', icon: Music }, // Professor acessando view de aluno ok
    { name: 'Estatísticas', path: '/em-construcao', icon: BarChart3 },
    { name: 'Avaliações', path: '/em-construcao', icon: Award },
    { name: 'Scanner QR', path: '/em-construcao', icon: QrCode },
    { name: 'Ajuda', path: '/em-construcao', icon: HelpCircle },
    { name: 'Configurações', path: '/em-construcao', icon: Settings },
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
          <div className="flex items-center gap-3">
            <Image 
              src="/logo-icon.svg" 
              alt="Nipo School" 
              width={32} 
              height={32}
              className="flex-shrink-0"
            />
            <div>
              <h2 className="font-bold text-gray-900">Nipo School</h2>
              <p className="text-xs text-green-600 font-medium">Professor</p>
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
        <div className="p-4 border-b bg-green-50">
          <p className="text-sm font-medium text-gray-900">{user?.email}</p>
          <p className="text-xs text-green-600 mt-1">Professor</p>
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
                        ? 'bg-green-100 text-green-700 font-medium'
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
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
