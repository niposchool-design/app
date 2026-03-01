'use client'

import { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LogOut,
  Menu,
  ChevronRight,
  ChevronDown,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Home,
  Calendar,
  Users,
  PlusCircle,
  CheckCircle,
  Trophy,
  MessageSquare,
  Settings,
  HelpCircle,
  Music,
  BookOpen,
  Scroll,
  Star,
  Zap,
  Video,
  Target,
  Clock,
  BarChart3,
  Award,
  User,
  Building2,
  GraduationCap,
  Globe,
  Lightbulb,
  FileText,
  MapPin,
  QrCode,
  Wrench,
  Package,
  Flame,
  type LucideIcon,
} from 'lucide-react'
import { useAuth } from '@/app/providers/AuthProvider'
import { usePermissions } from '@/app/providers/PermissionsProvider'
import { useNavigationGroups } from '@/lib/hooks/use-navigation'
import type { NavigationItem, NavigationGroup, UserRole } from '@/lib/types/rbac'

/**
 * Maps icon_name from the database to Lucide icon components.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  home: Home,
  calendar: Calendar,
  users: Users,
  'plus-circle': PlusCircle,
  'check-circle': CheckCircle,
  trophy: Trophy,
  'message-square': MessageSquare,
  settings: Settings,
  'help-circle': HelpCircle,
  music: Music,
  'book-open': BookOpen,
  scroll: Scroll,
  star: Star,
  zap: Zap,
  video: Video,
  target: Target,
  clock: Clock,
  'bar-chart': BarChart3,
  award: Award,
  user: User,
  building: Building2,
  'graduation-cap': GraduationCap,
  globe: Globe,
  lightbulb: Lightbulb,
  'file-text': FileText,
  'map-pin': MapPin,
  'qr-code': QrCode,
  wrench: Wrench,
  package: Package,
  flame: Flame,
}

/**
 * Visual theme per role. Only styling - no navigation data.
 * Navigation comes 100% from the database via useNavigationGroups().
 */
const ROLE_THEMES: Record<UserRole, {
  name: string
  kanji: string
  meaning: string
  primaryColor: string
  secondaryColor: string
  gradient: string
  pattern: string
}> = {
  student: {
    name: 'Aluno',
    kanji: '生徒',
    meaning: 'Crescimento & Vitalidade',
    primaryColor: 'text-red-600',
    secondaryColor: 'bg-red-100',
    gradient: 'from-red-600 to-orange-600',
    pattern: 'bg-pattern-asanoha',
  },
  teacher: {
    name: 'Sensei',
    kanji: '先生',
    meaning: 'Sabedoria & Serenidade',
    primaryColor: 'text-blue-600',
    secondaryColor: 'bg-blue-100',
    gradient: 'from-blue-600 to-cyan-600',
    pattern: 'bg-pattern-seigaiha',
  },
  admin: {
    name: 'Administrador',
    kanji: '管理',
    meaning: 'Nobreza & Estrutura',
    primaryColor: 'text-purple-600',
    secondaryColor: 'bg-purple-100',
    gradient: 'from-purple-600 to-indigo-600',
    pattern: 'bg-pattern-sayagata',
  },
}

function getIcon(iconName: string | null): LucideIcon | null {
  if (!iconName) return null
  return ICON_MAP[iconName] || null
}

interface OrientalDashboardLayoutProps {
  children: ReactNode
}

export default function OrientalDashboardLayout({ children }: OrientalDashboardLayoutProps) {
  const { signOut, user } = useAuth()
  const { role, loading: permissionsLoading } = usePermissions()
  const navigationGroups = useNavigationGroups()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

  // Use role from database, fallback to defaults
  const roleSlug = (role?.slug || 'student') as UserRole
  const dbTheme = role ? {
    name: role.display_name || ROLE_THEMES[roleSlug].name,
    kanji: role.kanji || ROLE_THEMES[roleSlug].kanji,
    meaning: role.kanji_meaning || ROLE_THEMES[roleSlug].meaning,
    primaryColor: role.primary_color ? `text-${role.primary_color}` : ROLE_THEMES[roleSlug].primaryColor,
    secondaryColor: role.secondary_color ? `bg-${role.secondary_color}` : ROLE_THEMES[roleSlug].secondaryColor,
    gradient: role.gradient || ROLE_THEMES[roleSlug].gradient,
    pattern: role.pattern || ROLE_THEMES[roleSlug].pattern,
  } : ROLE_THEMES[roleSlug]

  // Use the CSS-safe fallback theme
  const theme = ROLE_THEMES[roleSlug]

  // Restore persisted states from localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed')
    if (savedCollapsed) {
      setIsSidebarCollapsed(savedCollapsed === 'true')
    }
    const savedGroups = localStorage.getItem('sidebarExpandedGroups')
    if (savedGroups) {
      try {
        setExpandedGroups(JSON.parse(savedGroups))
      } catch { /* ignore corrupt data */ }
    }
  }, [])

  // Expand all groups by default (only if no persisted state)
  useEffect(() => {
    if (navigationGroups.length > 0) {
      setExpandedGroups(prev => {
        if (Object.keys(prev).length > 0) return prev
        const initial: Record<string, boolean> = {}
        for (const g of navigationGroups) {
          if (g.title) initial[g.title] = true
        }
        return initial
      })
    }
  }, [navigationGroups])

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed
    setIsSidebarCollapsed(newState)
    localStorage.setItem('sidebarCollapsed', String(newState))
  }

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => {
      const next = { ...prev, [title]: !prev[title] }
      localStorage.setItem('sidebarExpandedGroups', JSON.stringify(next))
      return next
    })
  }

  const renderNavItem = (item: NavigationItem) => {
    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'))
    const IconComponent = getIcon(item.icon_name)

    return (
      <Link
        key={item.slug}
        href={item.href}
        title={isSidebarCollapsed ? item.label : undefined}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-2.5 rounded-xl transition-all duration-200 group ${
          isActive
            ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md`
            : 'text-gray-600 hover:bg-black/5 hover:text-gray-900'
        }`}
      >
        <div className="flex items-center gap-3">
          {IconComponent && (
            <IconComponent className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
          )}
          {!isSidebarCollapsed && (
            <span className="font-medium text-sm truncate">{item.label}</span>
          )}
        </div>
        {!isSidebarCollapsed && isActive && <ChevronRight className="w-4 h-4 opacity-80" />}
      </Link>
    )
  }

  const renderNavigation = () => {
    if (navigationGroups.length === 0 && !permissionsLoading) {
      return (
        <div className="px-4 py-8 text-center text-sm text-gray-400">
          Nenhum item de navegação
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {navigationGroups.map((group, idx) => {
          const isExpanded = isSidebarCollapsed ? true : (group.title ? expandedGroups[group.title] !== false : true)

          return (
            <div key={group.title || idx} className="space-y-1">
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

              {group.title && isSidebarCollapsed && (
                <div className="border-b border-gray-100 mx-4 my-2" title={group.title} />
              )}

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-1">
                  {group.items.map(renderNavItem)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
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
          <div className={`flex items-center justify-center transition-all duration-300 ${isSidebarCollapsed ? 'w-10 h-10' : 'w-14 h-14'}`}>
            <Image
              src="/logo-icon.svg"
              alt="Nipo School"
              width={isSidebarCollapsed ? 40 : 56}
              height={isSidebarCollapsed ? 40 : 56}
              className="transition-all duration-300"
            />
          </div>

          <div className={`overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'}`}>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight whitespace-nowrap">Nipo School</h1>
            <div className={`text-[10px] font-medium uppercase tracking-widest ${theme.primaryColor} whitespace-nowrap`}>
              {theme.kanji} • {theme.name}
            </div>
          </div>
        </div>

        {/* Navigation from Database */}
        <nav className="flex-1 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 overflow-x-hidden">
          {renderNavigation()}
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
                {theme.name}
              </p>
            </div>
          </div>

          <button
            onClick={async () => {
              await signOut()
              window.location.href = '/login'
            }}
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
          <Image
            src="/logo-icon.svg"
            alt="Nipo School"
            width={32}
            height={32}
          />
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
                {navigationGroups.map((group, idx) => (
                  <div key={group.title || idx} className="space-y-2">
                    {group.title && (
                      <h3 className={`px-4 text-xs font-bold uppercase tracking-wider ${theme.primaryColor} opacity-70`}>
                        {group.title}
                      </h3>
                    )}
                    <div className="space-y-1">
                      {group.items.map(renderNavItem)}
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
                onClick={async () => {
                  await signOut()
                  window.location.href = '/login'
                }}
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
