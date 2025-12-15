/**
 * 🔐 LOGIN PAGE - Página de Autenticação
 * 
 * Design com portal Torii japonês
 */

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, Music } from 'lucide-react'
import { ROUTES } from '../../../../lib/constants/routes'
import { useAuth } from '../../../../contexts/AuthContext'
import { useRoleBasedRedirect } from '../../../../hooks/useRoleBasedRedirect'

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
  const { signIn } = useAuth()
  const { redirectBasedOnRole } = useRoleBasedRedirect()
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
      await signIn(data.email, data.password)
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
    <div className="relative overflow-hidden min-h-screen">

      {/* CAMADA 1: PAISAGEM JAPONESA FIXA */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/paisagem.png" 
          alt="Paisagem Japonesa" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>

      {/* CAMADA 2: TORII FRAME */}
      <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="opacity-100">
          <defs>
            <linearGradient id="torii-frame-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#b91c1c', stopOpacity: 0.95 }} />
              <stop offset="100%" style={{ stopColor: '#991b1b', stopOpacity: 0.9 }} />
            </linearGradient>
            <linearGradient id="torii-wood-texture" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#7c2d12', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#7c2d12', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          <rect x="50" y="100" width="150" height="980" fill="url(#torii-wood-texture)" stroke="#7c2d12" strokeWidth="4"/>
          <rect x="1720" y="100" width="150" height="980" fill="url(#torii-wood-texture)" stroke="#7c2d12" strokeWidth="4"/>
          <path d="M 0 80 Q 960 50 1920 80 L 1920 140 Q 960 110 0 140 Z" fill="url(#torii-frame-gradient)" stroke="#7c2d12" strokeWidth="3"/>
          <rect x="30" y="240" width="1860" height="100" fill="url(#torii-wood-texture)" stroke="#7c2d12" strokeWidth="3" rx="10"/>
          <circle cx="100" cy="290" r="20" fill="#fbbf24" opacity="0.6"/>
          <circle cx="1820" cy="290" r="20" fill="#fbbf24" opacity="0.6"/>
        </svg>
      </div>

      {/* LOGO E BOTÃO VOLTAR NA FAIXA NUKI */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none" style={{ height: '340px' }}>
        <div className="absolute left-[280px] flex items-center gap-3 pointer-events-auto" style={{ top: '181px' }}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="/logo-icon.svg" 
                alt="Nipo School" 
                className="w-12 h-12 transform group-hover:scale-110 transition-transform drop-shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white drop-shadow-lg tracking-tight">Nipo School</span>
              <span className="text-xs text-white/95 drop-shadow-md font-medium">Alpha Method</span>
            </div>
          </Link>
        </div>

        <div className="absolute right-[280px] flex items-center gap-3 pointer-events-auto" style={{ top: '181px' }}>
          <Link to="/">
            <button className="px-6 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full hover:bg-white/30 transition-all shadow-lg">
              ← Voltar
            </button>
          </Link>
        </div>
      </div>

      {/* CAMADA 3: FORMULÁRIO DE LOGIN DENTRO DO PORTAL */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-[280px] pt-[380px] pb-20">
        <div className="w-full max-w-md">
          <div className="bg-white/98 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-200">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                おかえりなさい
              </h1>
              <p className="text-gray-600 text-lg">
                Bem-vindo de volta
              </p>
            </div>

            {/* API Error */}
            {apiError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{apiError}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    {...register('email')}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                </div>
                {errors.email && <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600 font-medium">{errors.password.message}</p>}
              </div>

              {/* Options */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"/>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Lembrar de mim</span>
                </label>
                <Link to={ROUTES.PASSWORD_RESET} className="text-sm text-red-600 hover:text-red-700 font-semibold transition-colors">
                  Esqueceu a senha?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-orange-500 via-red-600 to-red-700 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Entrando...
                  </span>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">ou</span>
              </div>
            </div>

            {/* Sign Up */}
            <div className="text-center">
              <p className="text-gray-600">
                Novo por aqui?{' '}
                <Link to={ROUTES.SIGNUP} className="text-red-600 hover:text-red-700 font-bold transition-colors">
                  Criar conta gratuita
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
