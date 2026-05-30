'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Mail, AlertCircle, CheckCircle2, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sentTo, setSentTo] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError('')

    try {
      const redirectTo = `${window.location.origin}/auth/callback?next=/set-password`
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo })

      if (error) {
        setError(error.message)
        return
      }

      setSentTo(email.trim())
      setEmail('')
    } catch (err: any) {
      setError(err?.message || 'Erro ao enviar email de recuperacao')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-stone-900/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 p-8 border border-white/10">
      <div className="mb-8">
        <Link href="/login" className="inline-flex items-center text-sm text-stone-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para login
        </Link>
        <div className="text-center">
          <div className="flex justify-center mb-4 lg:hidden">
            <Image src="/logo-white.png" alt="Nipo School" width={110} height={133} priority className="w-24 h-auto" />
          </div>
          <h1 className="text-2xl font-bold text-white">Recuperar acesso</h1>
          <p className="text-stone-400 text-sm mt-1">Vamos te ajudar a voltar pra sua jornada musical 🎵</p>
        </div>
      </div>

      {sentTo ? (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-emerald-200">
              <p className="font-medium mb-1">Email enviado</p>
              <p>Se existir uma conta para <span className="font-semibold">{sentTo}</span>, você receberá um link para redefinir a senha.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSentTo('')}
            className="w-full py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/15 transition-colors border border-white/10"
          >
            Enviar para outro email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500 group-focus-within:text-student transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-stone-500 focus:ring-2 focus:ring-student/30 focus:border-student transition-all outline-none"
              />
            </div>
            <p className="mt-2 text-sm text-stone-500">
              Enviaremos um link seguro para você criar uma nova senha.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full py-3 bg-student hover:bg-student-dark text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-student/20 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Enviando...' : 'Enviar link de recuperação'}
          </button>
        </form>
      )}
    </div>
  )
}
