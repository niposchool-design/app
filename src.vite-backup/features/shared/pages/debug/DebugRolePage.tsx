/**
 * 🔍 DEBUG - Página para Verificar Role do Usuário
 * 
 * Mostra todas as informações do contexto de autenticação
 * para debug de problemas de role/permissões
 */

import React from 'react'
import { useAuth } from '../../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../../lib/supabase/client'

export default function DebugRolePage() {
  const { user, profile, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const [dbProfile, setDbProfile] = React.useState<any>(null)
  const [dbLoading, setDbLoading] = React.useState(false)

  // Buscar dados direto do banco
  const fetchDatabaseProfile = async () => {
    if (!user?.id) return

    setDbLoading(true)
    try {
      // @ts-ignore - Ignorar erro de tipo do Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      setDbProfile(data)
    } catch (error) {
      console.error('Erro ao buscar profile:', error)
      setDbProfile({ error: String(error) })
    } finally {
      setDbLoading(false)
    }
  }

  React.useEffect(() => {
    fetchDatabaseProfile()
  }, [user?.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p>Carregando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">⚠️ Não Autenticado</h1>
          <p className="text-gray-600 mb-6">
            Você precisa estar logado para acessar esta página de debug.
          </p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Fazer Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">🔍 Debug de Autenticação</h1>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Voltar
            </button>
          </div>
          <p className="text-gray-600">
            Informações detalhadas sobre o estado da autenticação e role do usuário
          </p>
        </div>

        {/* Status Geral */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">📊 Status Geral</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Autenticado?</p>
              <p className="text-lg font-bold">{isAuthenticated ? '✅ Sim' : '❌ Não'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Carregando?</p>
              <p className="text-lg font-bold">{loading ? '⏳ Sim' : '✅ Não'}</p>
            </div>
          </div>
        </div>

        {/* User do Contexto */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">👤 User (AuthContext)</h2>
          {user ? (
            <div className="space-y-2">
              <div className="p-3 bg-green-50 rounded">
                <p className="text-sm text-gray-600">ID</p>
                <p className="font-mono text-sm">{user.id}</p>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <p className="text-sm text-gray-600">Nome</p>
                <p className="font-medium">{user.nome}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded border-2 border-yellow-400">
                <p className="text-sm text-gray-600">⭐ ROLE (do contexto)</p>
                <p className="text-2xl font-bold uppercase">{user.role}</p>
              </div>
            </div>
          ) : (
            <p className="text-red-600">❌ Nenhum usuário no contexto</p>
          )}
        </div>

        {/* Profile do Contexto */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">📝 Profile (AuthContext)</h2>
          {profile ? (
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded">
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{profile.full_name || '(vazio)'}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded border-2 border-yellow-400">
                <p className="text-sm text-gray-600">⭐ TIPO_USUARIO (do profile)</p>
                <p className="text-2xl font-bold uppercase">{profile.tipo_usuario}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">⚠️ Nenhum profile no contexto</p>
          )}
        </div>

        {/* Dados do Banco */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">🗄️ Profile (Banco de Dados)</h2>
            <button
              onClick={fetchDatabaseProfile}
              disabled={dbLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {dbLoading ? 'Carregando...' : 'Recarregar'}
            </button>
          </div>
          
          {dbProfile ? (
            dbProfile.error ? (
              <div className="p-4 bg-red-50 rounded">
                <p className="text-red-600">❌ Erro: {dbProfile.error}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-3 bg-purple-50 rounded">
                  <p className="text-sm text-gray-600">ID</p>
                  <p className="font-mono text-sm">{dbProfile.id}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{dbProfile.email}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium">{dbProfile.full_name || '(vazio)'}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded border-2 border-yellow-400">
                  <p className="text-sm text-gray-600">⭐ TIPO_USUARIO (do banco)</p>
                  <p className="text-2xl font-bold uppercase">{dbProfile.tipo_usuario}</p>
                </div>
                <details className="p-3 bg-gray-50 rounded">
                  <summary className="cursor-pointer font-medium">Ver JSON completo</summary>
                  <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(dbProfile, null, 2)}</pre>
                </details>
              </div>
            )
          ) : (
            <p className="text-gray-600">⏳ Carregando dados do banco...</p>
          )}
        </div>

        {/* Comparação */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">🔍 Comparação</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600 mb-2">Role Atual:</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-gray-500">User Context</p>
                  <p className="font-bold">{user?.role || '(vazio)'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Profile Context</p>
                  <p className="font-bold">{profile?.tipo_usuario || '(vazio)'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Database</p>
                  <p className="font-bold">{dbProfile?.tipo_usuario || '(vazio)'}</p>
                </div>
              </div>
            </div>

            {user?.role !== dbProfile?.tipo_usuario && dbProfile?.tipo_usuario && (
              <div className="p-4 bg-red-50 border-2 border-red-400 rounded">
                <p className="text-red-800 font-bold">⚠️ DIVERGÊNCIA DETECTADA!</p>
                <p className="text-sm text-red-600 mt-2">
                  O role no contexto ({user?.role}) é diferente do role no banco ({dbProfile?.tipo_usuario}).
                  Isso pode causar problemas de permissão.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Recarregar Página
                </button>
              </div>
            )}

            {user?.role === dbProfile?.tipo_usuario && user?.role && (
              <div className="p-4 bg-green-50 border-2 border-green-400 rounded">
                <p className="text-green-800 font-bold">✅ SINCRONIZADO!</p>
                <p className="text-sm text-green-600 mt-2">
                  O role está correto em todos os lugares: <strong>{user.role}</strong>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Ações */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">🔧 Ações</h2>
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              🔄 Recarregar Página
            </button>
            <button
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
              className="w-full px-4 py-3 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              🗑️ Limpar Cache e Recarregar
            </button>
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                navigate('/login')
              }}
              className="w-full px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700"
            >
              🚪 Fazer Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
