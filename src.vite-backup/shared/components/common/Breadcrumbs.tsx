import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import { ROUTES } from '../../lib/constants/routes'
import { generateSlug, slugToTitle } from '../../lib/utils/slug'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  isActive?: boolean
}

interface BreadcrumbsProps {
  /**
   * Itens customizados de breadcrumb. Se fornecido, substitui a geração automática
   */
  items?: BreadcrumbItem[]
  
  /**
   * Se deve mostrar o ícone de home no primeiro item
   */
  showHomeIcon?: boolean
  
  /**
   * Se deve gerar breadcrumbs automaticamente baseado na URL
   */
  autoGenerate?: boolean
  
  /**
   * Mapeamento customizado de segmentos de URL para labels
   */
  customLabels?: Record<string, string>
  
  /**
   * Classe CSS adicional para o container
   */
  className?: string
}

/**
 * Mapeamento padrão de rotas para labels em português
 */
const DEFAULT_ROUTE_LABELS: Record<string, string> = {
  // Área do Aluno
  'student': 'Área do Aluno',
  'dashboard': 'Dashboard',
  'portfolio': 'Portfólio',
  'challenges': 'Desafios',
  'achievements': 'Conquistas',
  'instruments': 'Instrumentos',
  'history': 'História da Música',
  'profile': 'Perfil',
  
  // Área do Professor
  'teacher': 'Área do Professor',
  'classes': 'Turmas',
  'submissions': 'Envios',
  'reports': 'Relatórios',
  'students': 'Alunos',
  
  // Área Admin
  'admin': 'Administração',
  'users': 'Usuários',
  'system': 'Sistema',
  'settings': 'Configurações',
  
  // Gerais
  'edit': 'Editar',
  'new': 'Novo',
  'view': 'Visualizar',
  'create': 'Criar',
  'details': 'Detalhes'
}

/**
 * Gera breadcrumbs automaticamente baseado na URL atual
 */
function generateBreadcrumbsFromPath(
  pathname: string, 
  customLabels: Record<string, string> = {}
): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []
  
  // Sempre adicionar o home
  breadcrumbs.push({
    label: 'Início',
    href: ROUTES.HOME,
    icon: <HomeIcon className="h-4 w-4" />
  })
  
  let currentPath = ''
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1
    
    // Verificar se é um UUID ou slug
    let label = segment
    
    // Tentar obter label customizado
    if (customLabels[segment]) {
      label = customLabels[segment]
    } 
    // Tentar obter label padrão
    else if (DEFAULT_ROUTE_LABELS[segment]) {
      label = DEFAULT_ROUTE_LABELS[segment]
    }
    // Se parece com um slug, converter para título
    else if (segment.includes('-')) {
      label = slugToTitle(segment)
    }
    // Se parece com UUID, buscar contexto (isso seria expandido com dados reais)
    else if (segment.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      // Por enquanto, usar um label genérico
      // Em implementação real, isso faria uma consulta para obter o nome real
      label = 'Item'
    }
    
    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
      isActive: isLast
    })
  })
  
  return breadcrumbs
}

/**
 * Componente de breadcrumbs inteligente e responsivo
 */
export default function Breadcrumbs({
  items,
  showHomeIcon = true,
  autoGenerate = true,
  customLabels = {},
  className = ''
}: BreadcrumbsProps) {
  const location = useLocation()
  
  // Determinar quais itens usar
  const breadcrumbItems = React.useMemo(() => {
    if (items) {
      return items
    }
    
    if (autoGenerate) {
      return generateBreadcrumbsFromPath(location.pathname, customLabels)
    }
    
    return []
  }, [items, autoGenerate, location.pathname, customLabels])
  
  // Não renderizar se não há itens ou apenas um item (home)
  if (breadcrumbItems.length <= 1) {
    return null
  }
  
  return (
    <nav 
      className={`flex ${className}`} 
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon 
                className="flex-shrink-0 h-4 w-4 text-gray-400 mx-2" 
                aria-hidden="true" 
              />
            )}
            
            {item.href ? (
              <Link
                to={item.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center space-x-1"
              >
                {index === 0 && showHomeIcon && item.icon}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span 
                className="text-sm font-medium text-gray-900 flex items-center space-x-1"
                aria-current="page"
              >
                {index === 0 && showHomeIcon && item.icon}
                <span>{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * Hook para usar breadcrumbs de forma programática
 */
export function useBreadcrumbs(customLabels?: Record<string, string>) {
  const location = useLocation()
  
  return React.useMemo(
    () => generateBreadcrumbsFromPath(location.pathname, customLabels),
    [location.pathname, customLabels]
  )
}

/**
 * HOC para adicionar breadcrumbs automaticamente a uma página
 */
export function withBreadcrumbs<P extends object>(
  Component: React.ComponentType<P>,
  breadcrumbConfig?: {
    customLabels?: Record<string, string>
    showHomeIcon?: boolean
    className?: string
  }
) {
  return function BreadcrumbWrappedComponent(props: P) {
    return (
      <div>
        <Breadcrumbs
          autoGenerate={true}
          showHomeIcon={breadcrumbConfig?.showHomeIcon}
          customLabels={breadcrumbConfig?.customLabels}
          className={breadcrumbConfig?.className}
        />
        <Component {...props} />
      </div>
    )
  }
}

/**
 * Componente de breadcrumbs específico para páginas de instrumento
 */
export function InstrumentBreadcrumbs({ 
  instrumentSlug, 
  instrumentName 
}: { 
  instrumentSlug: string
  instrumentName?: string 
}) {
  const items: BreadcrumbItem[] = [
    {
      label: 'Início',
      href: ROUTES.HOME,
      icon: <HomeIcon className="h-4 w-4" />
    },
    {
      label: 'Instrumentos',
      href: ROUTES.ALUNO.INSTRUMENTS.INDEX
    },
    {
      label: instrumentName || slugToTitle(instrumentSlug),
      isActive: true
    }
  ]
  
  return <Breadcrumbs items={items} />
}

/**
 * Componente de breadcrumbs específico para histórias da música
 */
export function HistoryBreadcrumbs({ 
  periodSlug, 
  periodName,
  topicSlug,
  topicName 
}: { 
  periodSlug?: string
  periodName?: string
  topicSlug?: string
  topicName?: string
}) {
  const items: BreadcrumbItem[] = [
    {
      label: 'Início',
      href: ROUTES.HOME,
      icon: <HomeIcon className="h-4 w-4" />
    },
    {
      label: 'História da Música',
      href: ROUTES.HISTORIA.INDEX
    }
  ]
  
  if (periodSlug) {
    items.push({
      label: periodName || slugToTitle(periodSlug),
      href: topicSlug ? ROUTES.HISTORIA.PERIODO_DETAIL(periodSlug) : undefined,
      isActive: !topicSlug
    })
  }
  
  if (topicSlug && topicName) {
    items.push({
      label: topicName,
      isActive: true
    })
  }
  
  return <Breadcrumbs items={items} />
}