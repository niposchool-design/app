/**
 * 🔐 LOGIN PAGE - Página de Autenticação
 * 
 * Design premium com:
 * - Validação com React Hook Form + Zod
 * - Estados de loading e erro
 * - Design consistente com Landing Page
 * - Responsivo mobile-first
 */

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { ROUTES } from '../../../../lib/constants/routes'
import { NipoButton } from '../../../../components/shared/NipoButton'
import { NipoInput } from '../../../../components/shared/NipoInput'
import { useAuth } from '../../../../contexts/AuthContext'
import { useTheme } from '../../../../contexts/ThemeContext' // 🌙 NOVO
import { NipoLogo } from '../../../../components/nipo/NipoLogo' // 🎌 NOVO
import { ThemeToggle } from '../../../../components/nipo/ThemeToggle' // 🎨 NOVO
import { useRoleBasedRedirect } from '../../../../hooks/useRoleBasedRedirect' // 🔄 NOVO

// Schema de validação
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { signIn, user } = useAuth()
  const { isDark } = useTheme() // 🌙 Dark mode state
  const { redirectBasedOnRole } = useRoleBasedRedirect() // 🔄 Hook de redirecionamento
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setApiError(null)

    try {
      // Usar o AuthContext para fazer login
      await signIn(data.email, data.password)
      
      // Aguardar um pouco para garantir que o user foi atualizado
      setTimeout(() => {
        redirectBasedOnRole()
      }, 100)
    } catch (error) {
      setApiError('Email ou senha incorretos. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative max-w-md w-full mx-4">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to={ROUTES.HOME} className="inline-flex items-center justify-center gap-2 mb-4 group">
              <NipoLogo variant="icon" size="lg" theme={isDark ? 'dark' : 'auto'} />
            </Link>
            <h1 className={`text-3xl font-zen font-bold mb-2 ${
              isDark ? 'text-white' : 'text-white'
            }`}>
              おかえりなさい！
            </h1>
            <p className={`font-zen ${
              isDark ? 'text-nipo-zen-400' : 'text-gray-400'
            }`}>
              Continue sua jornada musical japonesa
            </p>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{apiError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Input */}
            <div>
              <NipoInput
                label="Email"
                type="email"
                placeholder="seu@email.com"
                error={errors.email?.message}
                leftIcon={<Mail className="w-5 h-5" />}
                {...register('email')}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <NipoInput
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  error={errors.password?.message}
                  leftIcon={<Lock className="w-5 h-5" />}
                  {...register('password')}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm text-gray-400">Lembrar de mim</span>
              </label>
              <Link
                to={ROUTES.PASSWORD_RESET}
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Submit Button */}
            <NipoButton
              type="submit"
              fullWidth
              isLoading={isLoading}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </NipoButton>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900/50 text-gray-400">ou</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Não tem uma conta?{' '}
              <Link
                to={ROUTES.SIGNUP}
                className="text-red-400 hover:text-red-300 font-medium transition-colors"
              >
                Cadastre-se gratuitamente
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  )
}
