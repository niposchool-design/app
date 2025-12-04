/**
 * 🚫 NOT FOUND PAGE - NIPO SCHOOL
 * 
 * Página 404 conforme blueprint
 */

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Página Não Encontrada</h2>
        <p className="text-gray-600 mb-8">A página que você procura não existe.</p>
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Voltar ao Início
        </a>
      </div>
    </div>
  )
}

export default NotFoundPage