'use client'

/**
 * 🔴 ADMIN SIDEBAR - Next.js 14
 */

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  X, Home, Columns, List, UserCheck, GraduationCap, QrCode,
  FileText, Music, Settings, HelpCircle, LogOut, Calendar, Users, Trophy, BookOpen, Activity
} from 'lucide-react'
import { useAuth } from '@/app/providers/AuthProvider'
import clsx from 'clsx'

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
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

  /* Navigation Groups */
  const navigationGroups = [
    {
      title: 'Gestão Escolar',
      items: [
        { name: 'Dashboard', path: '/admin', icon: Home },
        { name: 'Alunos', path: '/admin/alunos', icon: GraduationCap },
        { name: 'Professores', path: '/admin/professores', icon: UserCheck },
        { name: 'Turmas & Matrículas', path: '/admin/turmas', icon: Users },
      ]
    },
    {
      title: 'Acadêmico & Conteúdo',
      items: [
        { name: 'Aulas', path: '/admin/aulas', icon: Columns },
        { name: 'Instrumentos', path: '/admin/instrumentos', icon: Music },
        { name: 'Repertório', path: '/admin/repertorio', icon: FileText },
        { name: 'História da Música', path: '/admin/historia', icon: BookOpen },
      ]
    },
    {
      title: 'Engajamento',
      items: [
        { name: 'Gamificação & XP', path: '/admin/gamificacao', icon: Trophy },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { name: 'QR Codes', path: '/admin/qr/gerenciar', icon: QrCode },
        { name: 'Diagnóstico', path: '/admin/diagnostico', icon: Activity },
        { name: 'Configurações', path: '/admin/configuracoes', icon: Settings },
        { name: 'Ajuda', path: '/admin/ajuda', icon: HelpCircle },
      ]
    }
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
                <p className="text-xs text-red-600 font-medium">Admin</p>
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
          <div className="p-4 border-b bg-red-50">
            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
            <p className="text-xs text-red-600 mt-1">Administrador</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {navigationGroups.map((group, index) => (
                <div key={index}>
                  <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {group.title}
                  </h3>
                  <ul className="space-y-1">
                    {group.items.map((item) => {
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
                                ? 'bg-red-100 text-red-700 font-medium'
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
                </div>
              ))}
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
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
