'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LogOut,
  Menu,
  Bell,
  Flower2, // Sakura (Aluno)
  Waves,   // Ondas (Professor)
  Crown,   // Coroa/Nobreza (Admin)
  ChevronRight,
  X
} from 'lucide-react'
import { useAuth } from '@/app/providers/AuthProvider'

type RoleType = 'aluno' | 'professor' | 'admin'

interface ThemeConfig {
  name: string
  kanji: string
  meaning: string
  primaryColor: string
  secondaryColor: string
  gradient: string
  pattern: string
  icon: any
  navItems: { label: string; href: string }[]
}

const THEMES: Record<RoleType, ThemeConfig> = {
  aluno: {
    name: 'Aluno',
    kanji: '生徒', // Seito
    meaning: 'Crescimento & Vitalidade',
    primaryColor: 'text-red-600',
    secondaryColor: 'bg-red-100',
    gradient: 'from-red-600 to-orange-600',
    pattern: 'bg-pattern-asanoha',
    icon: Flower2,
    navItems: [
      { label: 'Dashboard', href: '/alunos' },
      { label: 'Minhas Aulas', href: '/alunos/aulas' },
      { label: 'Show Final', href: '/alunos/show-final' },
      { label: 'Repertório', href: '/alunos/repertorio' },
      { label: 'Instrumentos', href: '/alunos/instrumentos' },
      { label: 'Vídeos', href: '/alunos/videos' },
      { label: 'História', href: '/alunos/historia' },
      { label: 'Conquistas', href: '/alunos/conquistas' }, // Se existir ou em-construcao
    ]
  },
  professor: {
    name: 'Sensei',
    kanji: '先生', // Sensei
    meaning: 'Sabedoria & Serenidade',
    primaryColor: 'text-blue-600',
    secondaryColor: 'bg-blue-100',
    gradient: 'from-blue-600 to-cyan-600',
    pattern: 'bg-pattern-seigaiha',
    icon: Waves,
    navItems: [
      { label: 'Dashboard', href: '/professores' },
      { label: 'Turmas', href: '/professores/turmas' },
      { label: 'Cronograma', href: '/professores/aulas' },
      { label: 'Conteúdos', href: '/em-construcao' },
      { label: 'Estatísticas', href: '/em-construcao' },
    ]
  },
  admin: {
    name: 'Administrador',
    kanji: '管理', // Kanri
    meaning: 'Nobreza & Estrutura',
    primaryColor: 'text-purple-600',
    secondaryColor: 'bg-purple-100',
    gradient: 'from-purple-600 to-indigo-600',
    pattern: 'bg-pattern-sayagata',
    icon: Crown,
    navItems: [
      { label: 'Dashboard', href: '/admin' },
      { label: 'Aulas', href: '/admin/aulas' },
      { label: 'Turmas', href: '/admin/turmas' },
      { label: 'Instrumentos', href: '/admin/instrumentos' },
      { label: 'Repertório', href: '/admin/repertorio' },
      { label: 'Gamificação & XP', href: '/admin/gamificacao' },
      { label: 'Professores', href: '/admin/professores' },
      { label: 'Alunos', href: '/admin/alunos' },
      { label: 'QR Codes', href: '/em-construcao' },
    ]
  }
}

interface OrientalDashboardLayoutProps {
  children: ReactNode
  role: RoleType
}

export default function OrientalDashboardLayout({ children, role }: OrientalDashboardLayoutProps) {
  const { signOut, user } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const theme = THEMES[role]
  const Icon = theme.icon

  return (
    <div className={`min-h-screen ${theme.pattern} transition-colors duration-500`}>
      {/* Sidebar Desktop */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl hidden md:flex flex-col z-50">
        {/* Logo Area */}
        <div className="p-8 text-center border-b border-gray-100/50">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Nipo School</h1>
          <div className={`text-xs font-medium uppercase tracking-widest mt-2 ${theme.primaryColor}`}>
            {theme.kanji} • {theme.name}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {theme.navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                  ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md`
                  : 'hover:bg-white/50 text-gray-600 hover:text-gray-900'
                  }`}
              >
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            )
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-6 border-t border-gray-100/50 bg-white/30">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full ${theme.secondaryColor} flex items-center justify-center`}>
              <span className={`font-bold ${theme.primaryColor}`}>
                {user?.email?.[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.email}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {theme.meaning}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair do Dojo
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <Icon className={`w-6 h-6 ${theme.primaryColor}`} />
          <span className="font-bold text-gray-900">Nipo School</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="absolute right-0 top-16 bottom-0 w-64 bg-white shadow-xl p-6 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <nav className="space-y-2">
              {theme.navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                      ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md`
                      : 'hover:bg-gray-50 text-gray-600'
                      }`}
                  >
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <button
                onClick={() => signOut()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="md:pl-64 pt-16 md:pt-0 min-h-screen">
        <div className="p-6 md:p-10 max-w-7xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  )
}
