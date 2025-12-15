/**
 * 📝 SIGNUP PAGE - Página de Cadastro
 * 
 * Design com portal Torii japonês
 */

import React, { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { ROUTES } from '../../../../lib/constants/routes'
import { useAuth } from '../../../../contexts/AuthContext'

export const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [userType, setUserType] = useState<'aluno' | 'professor'>('aluno')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      const result = await signUp(email, password, fullName, userType)
      
      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }
      
      setSuccess(true)
      setTimeout(() => {
        navigate(ROUTES.LOGIN)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta')
    } finally {
      setLoading(false)
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

      {/* CAMADA 3: FORMULÁRIO DE CADASTRO DENTRO DO PORTAL */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-[280px] pt-[380px] pb-20">
        <div className="w-full max-w-md">
          <div className="bg-white/98 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-200">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                ようこそ
              </h1>
              <p className="text-gray-600 text-lg">
                Comece sua jornada musical
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <div className="w-5 h-5 text-green-600 flex-shrink-0">✓</div>
                <p className="text-sm text-green-600 font-medium">Conta criada! Redirecionando...</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Conta</label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value as 'aluno' | 'professor')}
                  className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white"
                >
                  <option value="aluno">🎓 Aluno - Aprender música</option>
                  <option value="professor">👨‍🏫 Professor - Ensinar música</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-4 bg-gradient-to-r from-orange-500 via-red-600 to-red-700 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Criando...
                  </span>
                ) : success ? (
                  '✓ Conta criada!'
                ) : (
                  <>
                    Criar Conta Gratuita
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">ou</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                Já tem uma conta?{' '}
                <Link to={ROUTES.LOGIN} className="text-red-600 hover:text-red-700 font-bold transition-colors">
                  Fazer login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
