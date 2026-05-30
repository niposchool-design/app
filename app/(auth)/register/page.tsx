'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, User, AlertCircle, ArrowLeft, Phone, Music, GraduationCap, Building2 } from 'lucide-react'
import { useAuth } from '@/app/providers/AuthProvider'
import { supabase } from '@/lib/supabase/client'

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
  instrumentIds: z.array(z.string()),
  unitId: z.string().optional(),
  role: z.enum(['student', 'teacher']),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
})

type RegisterFormData = z.infer<typeof registerSchema>

interface Instrument { id: string; name: string }
interface Unit { id: string; name: string; city: string | null }

const INPUT = 'w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-stone-500 focus:ring-2 focus:ring-student/30 focus:border-student transition-all outline-none'
const ICON = 'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500 group-focus-within:text-student transition-colors'
const LABEL = 'block text-sm font-medium text-stone-300 mb-2'

export default function RegisterPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [instruments, setInstruments] = useState<Instrument[]>([])
  const [units, setUnits] = useState<Unit[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'student', instrumentIds: [] },
  })

  const selectedRole = watch('role')
  const selectedInstrumentIds = watch('instrumentIds') || []

  useEffect(() => {
    async function loadData() {
      const [instRes, unitsRes] = await Promise.all([
        supabase.from('instruments').select('id, name').eq('is_active', true).order('name'),
        supabase.from('units').select('id, name, city').eq('is_active', true).order('name'),
      ])
      if (instRes.data) setInstruments(instRes.data)
      if (unitsRes.data) setUnits(unitsRes.data)
    }
    loadData()
  }, [])

  function toggleInstrument(instrumentId: string) {
    const current = selectedInstrumentIds || []
    if (current.includes(instrumentId)) {
      setValue('instrumentIds', current.filter((id) => id !== instrumentId))
    } else {
      setValue('instrumentIds', [...current, instrumentId])
    }
  }

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setApiError(null)
    try {
      await signUp(data.email, data.password, {
        full_name: data.name,
        role: data.role,
        phone: data.phone || null,
        primary_instrument_id: data.instrumentIds?.[0] || null,
        unit_id: data.unitId || null,
      })
      router.push('/login?registered=true')
    } catch (error: any) {
      console.error('Register error:', error)
      setApiError(error.message || 'Erro ao criar conta. Tente novamente.')
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
            <Image src="/logo-white.png" alt="Nipo School" width={110} height={133} priority className="w-24 h-auto" />
          </div>
          <h1 className="text-2xl font-bold text-white">Criar sua conta</h1>
          <p className="text-stone-400 text-sm mt-1">Junte-se à comunidade Nipo School 🎵</p>
        </div>
      </div>

      {/* API Error */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{apiError}</p>
        </div>
      )}

      {/* Role Toggle */}
      <div className="mb-6">
        <div className="flex rounded-xl border border-white/10 overflow-hidden">
          <button
            type="button"
            onClick={() => setValue('role', 'student')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all ${
              selectedRole === 'student' ? 'bg-student text-white' : 'bg-white/5 text-stone-400 hover:bg-white/10'
            }`}
          >
            <Music className="w-4 h-4" />
            Sou Aluno
          </button>
          <button
            type="button"
            onClick={() => setValue('role', 'teacher')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all ${
              selectedRole === 'teacher' ? 'bg-teacher text-white' : 'bg-white/5 text-stone-400 hover:bg-white/10'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Sou Professor
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className={LABEL}>Nome Completo</label>
          <div className="relative group">
            <User className={ICON} />
            <input type="text" placeholder="Seu nome" {...register('name')} className={INPUT} />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
        </div>

        <div>
          <label className={LABEL}>Email</label>
          <div className="relative group">
            <Mail className={ICON} />
            <input type="email" placeholder="seu@email.com" {...register('email')} className={INPUT} />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label className={LABEL}>Telefone <span className="text-stone-500 font-normal">(opcional)</span></label>
          <div className="relative group">
            <Phone className={ICON} />
            <input type="tel" placeholder="(11) 99999-9999" {...register('phone')} className={INPUT} />
          </div>
        </div>

        {units.length > 0 && (
          <div>
            <label className={LABEL}>Unidade</label>
            <div className="relative group">
              <Building2 className={ICON} />
              <select {...register('unitId')} className={`${INPUT} appearance-none [&>option]:text-stone-900`}>
                <option value="">Selecione a unidade</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>{unit.name}{unit.city ? ` (${unit.city})` : ''}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div>
          <label className={LABEL}>
            {selectedRole === 'teacher' ? 'Instrumentos que leciona' : 'Instrumentos de interesse'}
            <span className="text-stone-500 font-normal ml-1">(um ou mais)</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {instruments.map((inst) => {
              const active = selectedInstrumentIds.includes(inst.id)
              const activeCls = selectedRole === 'teacher' ? 'border-teacher/40 bg-teacher/10 text-teacher-light' : 'border-student/40 bg-student/10 text-student-light'
              return (
                <label
                  key={inst.id}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all text-sm ${
                    active ? `${activeCls} font-medium` : 'border-white/10 hover:border-white/20 text-stone-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleInstrument(inst.id)}
                    className="rounded border-white/20 bg-white/5 text-student focus:ring-student/40"
                  />
                  <Music className="w-3.5 h-3.5" />
                  {inst.name}
                </label>
              )
            })}
          </div>
        </div>

        <div>
          <label className={LABEL}>Senha</label>
          <div className="relative group">
            <Lock className={ICON} />
            <input type="password" placeholder="••••••••" {...register('password')} className={INPUT} />
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
        </div>

        <div>
          <label className={LABEL}>Confirmar Senha</label>
          <div className="relative group">
            <Lock className={ICON} />
            <input type="password" placeholder="••••••••" {...register('confirmPassword')} className={INPUT} />
          </div>
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full ${selectedRole === 'teacher' ? 'bg-teacher hover:bg-teacher-dark' : 'bg-student hover:bg-student-dark'} text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Criar Conta'
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-stone-400">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-student hover:text-student-light font-medium transition-colors">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}
