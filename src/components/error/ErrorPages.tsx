import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ExclamationTriangleIcon, HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ROUTES } from '../../lib/constants/routes'
import { useAuth } from '../../contexts/AuthContext'

interface ErrorPageProps {
  /**
   * Código do erro (404, 403, 500, etc.)
   */
  errorCode?: number
  
  /**
   * Título customizado do erro
   */
  title?: string
  
  /**
   * Mensagem customizada do erro
   */
  message?: string
  
  /**
   * Se deve mostrar botão de voltar
   */
  showBackButton?: boolean
  
  /**
   * Se deve mostrar sugestões de navegação
   */
  showSuggestions?: boolean
  
  /**
   * Ações customizadas
   */
  customActions?: React.ReactNode
}

/**
 * Componente de página de erro 404 contextual
 */
export function NotFoundPage({
  title = "Página não encontrada",
  message = "A página que você está procurando não existe ou foi movida.",
  showBackButton = true,
  showSuggestions = true,
  customActions
}: Omit<ErrorPageProps, 'errorCode'>) {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile } = useAuth()
  
  // Gerar sugestões baseadas no tipo de usuário e URL atual
  const getSuggestions = () => {
    const suggestions = []
    
    // Sugestões baseadas no tipo de usuário
    if (profile?.tipo_usuario === 'aluno') {
      suggestions.push(
        { label: 'Meu Dashboard', href: ROUTES.ALUNO.INDEX },
        { label: 'Meu Portfólio', href: ROUTES.ALUNO.PORTFOLIO.INDEX },
        { label: 'Desafios', href: ROUTES.ALUNO.CHALLENGES.INDEX },
        { label: 'Instrumentos', href: ROUTES.ALUNO.INSTRUMENTS.INDEX }
      )
    } else if (profile?.tipo_usuario === 'professor') {
      suggestions.push(
        { label: 'Dashboard Professor', href: ROUTES.PROFESSOR.INDEX },
        { label: 'Minhas Turmas', href: ROUTES.PROFESSOR.CLASSES },
        { label: 'Relatórios', href: ROUTES.PROFESSOR.REPORTS }
      )
    } else if (profile?.tipo_usuario === 'admin') {
      suggestions.push(
        { label: 'Administração', href: ROUTES.ADMIN.INDEX },
        { label: 'Usuários', href: ROUTES.ADMIN.USERS },
        { label: 'Auditoria', href: ROUTES.ADMIN.AUDIT }
      )
    }
    
    // Sugestões baseadas na URL atual
    const path = location.pathname
    if (path.includes('/instruments/')) {
      suggestions.unshift({ label: 'Todos os Instrumentos', href: ROUTES.ALUNO.INSTRUMENTS.INDEX })
    } else if (path.includes('/history/')) {
      suggestions.unshift({ label: 'História da Música', href: ROUTES.HISTORIA.INDEX })
    } else if (path.includes('/portfolio/')) {
      suggestions.unshift({ label: 'Meu Portfólio', href: ROUTES.ALUNO.PORTFOLIO.INDEX })
    }
    
    return suggestions.slice(0, 4) // Máximo 4 sugestões
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md w-full">
        <div className="text-center">
          {/* Ícone de erro */}
          <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-gray-400" />
          
          {/* Código do erro */}
          <h1 className="mt-4 text-6xl font-bold text-gray-900">404</h1>
          
          {/* Título */}
          <h2 className="mt-4 text-2xl font-bold text-gray-900">{title}</h2>
          
          {/* Mensagem */}
          <p className="mt-2 text-gray-600">{message}</p>
        </div>
        
        {/* Ações */}
        <div className="mt-8 space-y-4">
          {/* Botão de voltar */}
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Voltar
            </button>
          )}
          
          {/* Botão home */}
          <Link
            to={ROUTES.HOME}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Ir para Início
          </Link>
          
          {/* Ações customizadas */}
          {customActions}
        </div>
        
        {/* Sugestões de navegação */}
        {showSuggestions && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Você pode estar procurando por:
            </h3>
            <div className="space-y-2">
              {getSuggestions().map((suggestion, index) => (
                <Link
                  key={index}
                  to={suggestion.href}
                  className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  {suggestion.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Componente de página de erro 403 (acesso negado)
 */
export function ForbiddenPage({
  title = "Acesso negado",
  message = "Você não tem permissão para acessar esta página.",
  showBackButton = true,
  showSuggestions = true,
  customActions
}: Omit<ErrorPageProps, 'errorCode'>) {
  const navigate = useNavigate()
  const { profile } = useAuth()
  
  // Sugestões baseadas no tipo de usuário
  const getSuggestions = () => {
    if (profile?.tipo_usuario === 'aluno') {
      return [
        { label: 'Minha Área', href: ROUTES.ALUNO.INDEX },
        { label: 'Meu Portfólio', href: ROUTES.ALUNO.PORTFOLIO.INDEX },
        { label: 'Desafios', href: ROUTES.ALUNO.CHALLENGES.INDEX }
      ]
    } else if (profile?.tipo_usuario === 'professor') {
      return [
        { label: 'Área do Professor', href: ROUTES.PROFESSOR.INDEX },
        { label: 'Minhas Turmas', href: ROUTES.PROFESSOR.CLASSES }
      ]
    }
    return [{ label: 'Página Inicial', href: ROUTES.HOME }]
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md w-full">
        <div className="text-center">
          {/* Ícone de acesso negado */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
          
          {/* Código do erro */}
          <h1 className="mt-4 text-6xl font-bold text-gray-900">403</h1>
          
          {/* Título */}
          <h2 className="mt-4 text-2xl font-bold text-gray-900">{title}</h2>
          
          {/* Mensagem */}
          <p className="mt-2 text-gray-600">{message}</p>
          
          {/* Informação sobre o usuário atual */}
          {profile && (
            <p className="mt-2 text-sm text-gray-500">
              Logado como: {profile.full_name} ({profile.tipo_usuario})
            </p>
          )}
        </div>
        
        {/* Ações */}
        <div className="mt-8 space-y-4">
          {/* Botão de voltar */}
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Voltar
            </button>
          )}
          
          {/* Ações customizadas */}
          {customActions}
        </div>
        
        {/* Sugestões de páginas permitidas */}
        {showSuggestions && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Páginas que você pode acessar:
            </h3>
            <div className="space-y-2">
              {getSuggestions().map((suggestion, index) => (
                <Link
                  key={index}
                  to={suggestion.href}
                  className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  {suggestion.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Componente de página de erro 500 (erro interno)
 */
export function ServerErrorPage({
  title = "Algo deu errado",
  message = "Ocorreu um erro interno no servidor. Tente novamente em alguns instantes.",
  showBackButton = true,
  customActions
}: Omit<ErrorPageProps, 'errorCode' | 'showSuggestions'>) {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md w-full">
        <div className="text-center">
          {/* Ícone de erro do servidor */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
          
          {/* Código do erro */}
          <h1 className="mt-4 text-6xl font-bold text-gray-900">500</h1>
          
          {/* Título */}
          <h2 className="mt-4 text-2xl font-bold text-gray-900">{title}</h2>
          
          {/* Mensagem */}
          <p className="mt-2 text-gray-600">{message}</p>
        </div>
        
        {/* Ações */}
        <div className="mt-8 space-y-4">
          {/* Botão de recarregar */}
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Tentar Novamente
          </button>
          
          {/* Botão de voltar */}
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Voltar
            </button>
          )}
          
          {/* Botão home */}
          <Link
            to={ROUTES.HOME}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Ir para Início
          </Link>
          
          {/* Ações customizadas */}
          {customActions}
        </div>
      </div>
    </div>
  )
}

/**
 * Boundary de erro para capturar erros React e mostrar página de erro amigável
 */
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <ServerErrorPage
          title="Erro na aplicação"
          message="Ocorreu um erro inesperado. A página será recarregada automaticamente."
          customActions={
            <button
              onClick={() => this.setState({ hasError: false })}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Tentar Novamente
            </button>
          }
        />
      )
    }
    
    return this.props.children
  }
}