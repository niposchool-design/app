'use client'

import { ReactNode, useState, useEffect } from 'react'
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
  ChevronDown,
  ChevronLeft,
  X,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react'
import { useAuth } from '@/app/providers/AuthProvider'

type RoleType = 'aluno' | 'professor' | 'admin'

interface NavItem {
  label: string
  href: string
}

interface NavGroup {
  title?: string
  items: NavItem[]
}

interface ThemeConfig {
  name: string
  kanji: string
  meaning: string
  primaryColor: string
  secondaryColor: string
  gradient: string
  pattern: string
  icon: any
  navItems?: NavItem[]
  groups?: NavGroup[]
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
      { label: 'Progresso', href: '/alunos/progresso' },
      { label: 'Portfólio', href: '/alunos/portfolio' },
      { label: 'Show Final', href: '/alunos/show-final' },
      { label: 'Repertório', href: '/alunos/repertorio' },
      { label: 'Instrumentos', href: '/alunos/instrumentos' },
      { label: 'Vídeos', href: '/alunos/videos' },
      { label: 'Desafios', href: '/alunos/desafios' },
      { label: 'História', href: '/alunos/historia' },
      { label: 'Conquistas', href: '/alunos/conquistas' },
      { label: 'Gamificação', href: '/alunos/gamificacao' },
      { label: 'Meu Perfil', href: '/alunos/perfil' },
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
    groups: [
      {
        title: 'Gestão Escolar',
        items: [
          { label: 'Dashboard', href: '/admin' },
          { label: 'Alunos', href: '/admin/alunos' },
          { label: 'Professores', href: '/admin/professores' },
          { label: 'Turmas & Matrículas', href: '/admin/turmas' },
        ]
      },
      {
        title: 'Acadêmico & Conteúdo',
        items: [
          { label: 'Aulas', href: '/admin/aulas' },
          { label: 'Instrumentos', href: '/admin/instrumentos' },
          { label: 'Repertório', href: '/admin/repertorio' },
          { label: 'História da Música', href: '/admin/historia' },
        ]
      },
      {
        title: 'Engajamento',
        items: [
          { label: 'Gamificação & XP', href: '/admin/gamificacao' },
        ]
      },
      {
        title: 'Sistema',
        items: [
          { label: 'QR Codes', href: '/admin/qr/gerenciar' },
          { label: 'Diagnóstico', href: '/admin/diagnostico' },
          { label: 'Configurações', href: '/admin/configuracoes' },
          { label: 'Ajuda', href: '/admin/ajuda' },
        ]
      }
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // State for expanded groups - defaulting to all expanded for admin
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Gestão Escolar': true,
    'Acadêmico & Conteúdo': true,
    'Engajamento': true,
    'Sistema': true
  })

  // Persist sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState) {
      setIsSidebarCollapsed(savedState === 'true')
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed
    setIsSidebarCollapsed(newState)
    localStorage.setItem('sidebarCollapsed', String(newState))
  }

  const theme = THEMES[role]
  const Icon = theme.icon

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const isActive = pathname === item.href
      return (
        <Link
          key={item.href}
          href={item.href}
          title={isSidebarCollapsed ? item.label : undefined}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-2.5 rounded-xl transition-all duration-200 group ${isActive
            ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md`
            : 'text-gray-600 hover:bg-black/5 hover:text-gray-900'
            }`}
        >
          <div className="flex items-center gap-3">
            {/* Note: In a real app we'd map icons to items dynamically. 
                 For now, reusing the theme icon or relying on the text structure. 
                 Since items don't have individual icons in the config yet, 
                 we will assume the 'label' is sufficient for desktop, but for collapsed state
                 we ideally need icons. 
                 
                 Fix: Re-mapping basic icons based on label keywords for better visualization if specific icons aren't in config.
                 In a production refactor, NavItem should have an `icon` property.
             */}
            <span className={`${isSidebarCollapsed ? 'text-xs font-bold' : 'font-medium text-sm'} truncate`}>
              {isSidebarCollapsed ? item.label.substring(0, 2).toUpperCase() : item.label}
            </span>
          </div>
          {!isSidebarCollapsed && isActive && <ChevronRight className="w-4 h-4 opacity-80" />}
        </Link>
      )
    })
  }

  const renderContent = () => {
    if (theme.navItems) {
      return (
        <div className="space-y-1">
          {renderNavItems(theme.navItems)}
        </div>
      )
    }

    if (theme.groups) {
      return (
        <div className="space-y-4">
          {theme.groups.map((group, idx) => {
            // Force expand if sidebar is collapsed to ensure items are accessible via icons/short text
            const isExpanded = isSidebarCollapsed ? true : (group.title ? expandedGroups[group.title] : true)

            return (
              <div key={idx} className="space-y-1">
                {group.title && !isSidebarCollapsed && (
                  <button
                    onClick={() => group.title && toggleGroup(group.title)}
                    className={`w-full flex items-center justify-between px-4 py-2 text-xs font-bold uppercase tracking-wider ${theme.primaryColor} hover:opacity-80 transition-opacity`}
                  >
                    <span className="truncate">{group.title}</span>
                    {isExpanded ? (
                      <ChevronDown className="w-3 h-3 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    )}
                  </button>
                )}

                {/* Divider for collapsed state */}
                {group.title && isSidebarCollapsed && (
                  <div className="border-b border-gray-100 mx-4 my-2" title={group.title}></div>
                )}

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-1">
                    {renderNavItems(group.items)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
    return null
  }

  const sidebarWidth = isSidebarCollapsed ? 'w-20' : 'w-64'
  const mainPadding = isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'

  return (
    <div className={`min-h-screen ${theme.pattern} transition-colors duration-500`}>
      {/* Sidebar Desktop */}
      <aside className={`fixed inset-y-0 left-0 ${sidebarWidth} bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl hidden md:flex flex-col z-50 transition-all duration-300 ease-in-out`}>
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 text-gray-500 z-50"
        >
          {isSidebarCollapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
        </button>

        {/* Logo Area */}
        <div className={`p-6 text-center border-b border-gray-100/50 flex flex-col items-center justify-center transition-all duration-300 ${isSidebarCollapsed ? 'gap-0' : 'gap-2'}`}>
          <div className={`rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg transition-all duration-300 group
             ${isSidebarCollapsed ? 'w-10 h-10' : 'w-14 h-14 transform rotate-3 hover:rotate-0'}`}>
            <Icon className={`${isSidebarCollapsed ? 'w-5 h-5' : 'w-7 h-7'} text-white group-hover:scale-110 transition-transform`} />
          </div>

          <div className={`overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'}`}>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight whitespace-nowrap">Nipo School</h1>
            <div className={`text-[10px] font-medium uppercase tracking-widest ${theme.primaryColor} whitespace-nowrap`}>
              {theme.kanji} • {theme.name}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 overflow-x-hidden">
          {renderContent()}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-100/50 bg-white/30 backdrop-blur-sm">
          <div className={`flex items-center gap-3 mb-3 p-2 rounded-xl transition-all duration-300 ${isSidebarCollapsed ? 'justify-center bg-transparent group relative' : 'hover:bg-white/50'}`}>
            <div className={`w-9 h-9 flex-shrink-0 rounded-full ${theme.secondaryColor} flex items-center justify-center shadow-sm`}>
              <span className={`font-bold ${theme.primaryColor}`}>
                {user?.email?.[0].toUpperCase()}
              </span>
            </div>

            <div className={`flex-1 min-w-0 overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'w-0 opacity-0 absolute' : 'w-auto opacity-100'}`}>
              <p className="text-sm font-bold text-gray-900 truncate">
                {user?.email?.split('@')[0]}
              </p>
              <p className="text-xs text-gray-500 truncate capitalize">
                {role}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut()}
            title="Sair"
            className={`w-full flex items-center justify-center gap-2 px-4 ${isSidebarCollapsed ? 'py-2' : 'py-2.5'} text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all hover:shadow-sm active:scale-95`}
          >
            <LogOut className="w-4 h-4" />
            {!isSidebarCollapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${theme.secondaryColor}`}>
            <Icon className={`w-5 h-5 ${theme.primaryColor}`} />
          </div>
          <span className="font-bold text-gray-900 text-lg">Nipo School</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl p-6 overflow-y-auto flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-900">Menu</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                {/* Re-using rendering logic but forcing expanded view for mobile */}
                {theme.navItems && renderNavItems(theme.navItems)}
                {theme.groups && theme.groups.map((group, idx) => (
                  <div key={idx} className="space-y-2">
                    {group.title && (
                      <h3 className={`px-4 text-xs font-bold uppercase tracking-wider ${theme.primaryColor} opacity-70`}>{group.title}</h3>
                    )}
                    <div className="space-y-1">
                      {renderNavItems(group.items)}
                    </div>
                  </div>
                ))}
              </div>
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-4 px-2">
                <div className={`w-10 h-10 rounded-full ${theme.secondaryColor} flex items-center justify-center`}>
                  <span className={`font-bold ${theme.primaryColor}`}>
                    {user?.email?.[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => signOut()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-md"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`${mainPadding} pt-16 md:pt-0 min-h-screen transition-all duration-300 ease-in-out`}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-fade-in pb-20 md:pb-8">
          {children}
        </div>
      </main>
    </div>
  )
}
