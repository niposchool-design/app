'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/app/providers/AuthProvider'

const loginSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
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
      await new Promise((resolve) => setTimeout(resolve, 500))
      window.location.href = '/'
    } catch (error) {
      console.error('Login error:', error)
      setApiError('Email ou senha incorretos. Tente novamente.')
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-stone-900/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 p-8 border border-white/10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-stone-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar
        </Link>
        <div className="text-center">
          <div className="flex justify-center mb-4 lg:hidden">
            <Image src="/logo-white.png" alt="Nipo School" width={120} height={145} priority className="w-24 h-auto" />
          </div>
          <h1 className="text-2xl font-bold text-white">Bem-vindo de volta</h1>
          <p className="text-stone-400 text-sm mt-1">Entre para continuar sua jornada musical 🎵</p>
        </div>
      </div>

      {/* API Error */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{apiError}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-stone-300 mb-2">Email</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500 group-focus-within:text-student transition-colors" />
            <input
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-stone-500 focus:ring-2 focus:ring-student/30 focus:border-student transition-all outline-none"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-stone-300 mb-2">Senha</label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500 group-focus-within:text-student transition-colors" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-stone-500 focus:ring-2 focus:ring-student/30 focus:border-student transition-all outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
        </div>

        {/* Options */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-student focus:ring-student/40" />
            <span className="text-stone-400 group-hover:text-stone-200 transition-colors">Lembrar de mim</span>
          </label>
          <Link href="/forgot-password" className="text-student hover:text-student-light font-medium transition-colors">
            Esqueceu a senha?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-student hover:bg-student-dark text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-student/20 flex items-center justify-center gap-2"
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
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-stone-900 text-stone-500">ou</span>
        </div>
      </div>

      {/* Sign Up */}
      <div className="text-center text-sm">
        <p className="text-stone-400">
          Novo por aqui?{' '}
          <Link href="/register" className="text-student hover:text-student-light font-semibold transition-colors">
            Criar conta gratuita
          </Link>
        </p>
      </div>
    </div>
  )
}
