import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, CheckCircle, XCircle, RefreshCw, ArrowLeft } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../contexts/AuthContext'

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendError, setResendError] = useState<string | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending')

  // Verificar token de confirmação na URL
  useEffect(() => {
    const token = searchParams.get('token')
    const type = searchParams.get('type')

    if (token && type === 'signup') {
      handleTokenVerification(token)
    }
  }, [searchParams])

  // Verificar se email já está verificado
  useEffect(() => {
    if (user?.email_confirmed_at) {
      setVerificationStatus('success')
      // Redirecionar após 3 segundos
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
    }
  }, [user, navigate])

  const handleTokenVerification = async (token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'signup'
      })

      if (error) throw error

      setVerificationStatus('success')
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
    } catch (error) {
      console.error('Erro ao verificar email:', error)
      setVerificationStatus('error')
    }
  }

  const handleResendEmail = async () => {
    if (!user?.email) {
      setResendError('Email não encontrado. Faça login novamente.')
      return
    }

    setIsResending(true)
    setResendError(null)
    setResendSuccess(false)

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email
      })

      if (error) throw error

      setResendSuccess(true)
      setTimeout(() => setResendSuccess(false), 5000)
    } catch (error: any) {
      console.error('Erro ao reenviar email:', error)
      setResendError(error.message || 'Erro ao reenviar email. Tente novamente.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
          {/* Status: Pendente */}
          {verificationStatus === 'pending' && (
            <>
              {/* Ícone */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <Mail className="w-10 h-10 text-red-600" />
                </div>
              </div>

              {/* Título */}
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Verifique seu email
              </h1>

              {/* Descrição */}
              <p className="text-gray-600 text-center mb-6">
                Enviamos um link de verificação para{' '}
                <span className="font-semibold text-gray-900">
                  {user?.email || 'seu email'}
                </span>
              </p>

              {/* Instruções */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  📧 Como verificar:
                </h3>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                  <li>Abra seu email</li>
                  <li>Procure por "Nipo School - Verificação"</li>
                  <li>Clique no link de confirmação</li>
                  <li>Você será redirecionado automaticamente</li>
                </ol>
              </div>

              {/* Botão reenviar */}
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Reenviando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Reenviar email
                  </>
                )}
              </button>

              {/* Feedback de reenvio */}
              {resendSuccess && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-700">
                    Email reenviado com sucesso! Verifique sua caixa de entrada.
                  </p>
                </div>
              )}

              {resendError && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{resendError}</p>
                </div>
              )}

              {/* Dica */}
              <p className="text-xs text-gray-500 text-center mt-6">
                💡 Não encontrou o email? Verifique sua pasta de spam ou lixo eletrônico
              </p>
            </>
          )}

          {/* Status: Sucesso */}
          {verificationStatus === 'success' && (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Email verificado! 🎉
              </h1>

              <p className="text-gray-600 text-center mb-6">
                Sua conta foi verificada com sucesso. Você será redirecionado em instantes...
              </p>

              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              </div>
            </>
          )}

          {/* Status: Erro */}
          {verificationStatus === 'error' && (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Erro na verificação
              </h1>

              <p className="text-gray-600 text-center mb-6">
                Não foi possível verificar seu email. O link pode ter expirado ou já foi usado.
              </p>

              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors mb-3"
              >
                {isResending ? 'Reenviando...' : 'Solicitar novo email'}
              </button>

              <button
                onClick={() => navigate('/login')}
                className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar ao login
              </button>
            </>
          )}
        </div>

        {/* Link voltar */}
        {verificationStatus === 'pending' && (
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
