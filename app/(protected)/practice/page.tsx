'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Clock, Plus, Calendar, Music, X, Loader2, TrendingUp, Flame, Guitar, BarChart3, Award } from 'lucide-react'
import { logPracticeSession, deletePracticeSession } from '@/app/actions/practice-actions'
import type { Tables } from '@/lib/supabase/database.types'

type PracticeSession = Tables<'v_practice_sessions'>

interface PracticeStats {
  total_sessions: number
  total_minutes: number
  avg_minutes: number
  unique_days: number
  instruments_practiced: number
  last_practice_date: string | null
}

export default function PracticePage() {
  const [sessions, setSessions] = useState<PracticeSession[]>([])
  const [stats, setStats] = useState<PracticeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Form state
  const [duration, setDuration] = useState('30')
  const [practiceType, setPracticeType] = useState('exercise')
  const [mood, setMood] = useState('')
  const [notes, setNotes] = useState('')

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const sessionsRes = await supabase
      .from('v_practice_sessions')
      .select('*')
      .eq('student_id', user.id)
      .order('session_date', { ascending: false })
      .limit(30)

    // v_practice_stats is an aggregate view - query separately
    const { data: statsData } = await supabase
      .from('v_practice_stats')
      .select('*')
      .eq('student_id', user.id) as { data: any[] | null }

    if (sessionsRes.data) setSessions(sessionsRes.data as PracticeSession[])
    if (statsData && statsData.length > 0) {
      const s = statsData[0]
      setStats({
        total_sessions: s.total_sessions ?? 0,
        total_minutes: s.total_minutes ?? 0,
        avg_minutes: s.avg_minutes_per_session ?? 0,
        unique_days: s.unique_days ?? 0,
        instruments_practiced: s.instruments_practiced ?? 0,
        last_practice_date: s.last_practice_date ?? null,
      })
    }
  }

  useEffect(() => {
    loadData().finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccessMsg('')

    const result = await logPracticeSession({
      duration_minutes: Number(duration),
      practice_type: practiceType,
      mood: mood || undefined,
      notes: notes.trim() || undefined,
    })

    if ('error' in result) {
      setError(result.error)
      setSaving(false)
    } else {
      setSuccessMsg(result.message || 'Registrado!')
      setShowForm(false)
      setDuration('30')
      setPracticeType('exercise')
      setMood('')
      setNotes('')
      setSaving(false)
      await loadData()
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  }

  async function handleDelete(sessionId: string) {
    const result = await deletePracticeSession(sessionId)
    if (!('error' in result)) {
      await loadData()
    }
  }

  const moodEmoji: Record<string, string> = {
    easy: 'Tranquilo',
    challenging: 'Desafiador',
    breakthrough: 'Descoberta!',
    frustrating: 'Dificil',
  }

  const practiceTypeLabels: Record<string, string> = {
    exercise: 'Exercicio',
    repertoire: 'Repertorio',
    improvisation: 'Improvisacao',
    technique: 'Tecnica',
    warmup: 'Aquecimento',
  }

  // Calculate streak from sessions
  const currentStreak = (() => {
    if (sessions.length === 0) return 0
    const dates = [...new Set(sessions.map(s => s.session_date))].sort().reverse()
    let streak = 0
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    if (dates[0] !== today && dates[0] !== yesterday) return 0

    for (let i = 0; i < dates.length; i++) {
      const expected = new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
      if (dates[i] === expected) {
        streak++
      } else {
        break
      }
    }
    return streak
  })()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-500" />
          Diario de Pratica
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Fechar' : 'Registrar Pratica'}
        </button>
      </div>

      {/* Stats Dashboard */}
      {stats && stats.total_sessions > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 nw-tabular">{stats.total_sessions}</p>
            <p className="text-xs text-gray-500">Sessoes</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 nw-tabular">
              {stats.total_minutes >= 60
                ? `${Math.floor(stats.total_minutes / 60)}h${stats.total_minutes % 60 > 0 ? ` ${stats.total_minutes % 60}m` : ''}`
                : `${stats.total_minutes}m`
              }
            </p>
            <p className="text-xs text-gray-500">Tempo Total</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Flame className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 nw-tabular">{currentStreak}</p>
            <p className="text-xs text-gray-500">Dias seguidos</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Guitar className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 nw-tabular">{stats.instruments_practiced}</p>
            <p className="text-xs text-gray-500">Instrumentos</p>
          </div>
        </div>
      )}

      {/* Extra stats */}
      {stats && stats.total_sessions > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">
              Media: <span className="font-bold text-gray-900 nw-tabular">{Math.round(stats.avg_minutes)} min</span> por sessao
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">
              <span className="font-bold text-gray-900 nw-tabular">{stats.unique_days}</span> dias unicos
            </span>
          </div>
          {stats.last_practice_date && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-gray-600">
                Ultima: <span className="font-bold text-gray-900 nw-tabular">
                  {new Date(stats.last_practice_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                </span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Gamification hint */}
      {!loading && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-sm text-amber-800">
            Cada sessao de pratica vale <span className="font-bold">+5 pontos</span> na gamificacao!
          </p>
        </div>
      )}

      {error && <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">{error}</div>}
      {successMsg && <div className="bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3 text-sm">{successMsg}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h3 className="font-bold text-gray-900">Nova Sessao de Pratica</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duracao (minutos) *</label>
              <input
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                min="1"
                max="480"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                value={practiceType}
                onChange={e => setPracticeType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="exercise">Exercicio</option>
                <option value="repertoire">Repertorio</option>
                <option value="improvisation">Improvisacao</option>
                <option value="technique">Tecnica</option>
                <option value="warmup">Aquecimento</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Como foi?</label>
            <div className="flex gap-2">
              {Object.entries(moodEmoji).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMood(mood === key ? '' : key)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mood === key ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              placeholder="O que voce praticou? Observacoes..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            {saving ? 'Salvando...' : 'Registrar Pratica (+5 pts)'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />)}
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhuma pratica registrada</h3>
          <p className="text-sm text-gray-500 mb-6">Comece registrando sua primeira sessao de pratica!</p>
          <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">
            Registrar Primeira Pratica
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Historico</h2>
          {sessions.map(session => (
            <div key={session.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Music className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900 nw-tabular">{session.duration_minutes} min</p>
                  <span className="text-xs text-gray-400">-</span>
                  <span className="text-xs font-medium text-gray-500">{practiceTypeLabels[session.practice_type] || session.practice_type}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  {session.instrument_name && <span>{session.instrument_name}</span>}
                  {session.mood && (
                    <>
                      <span>-</span>
                      <span>{moodEmoji[session.mood] || session.mood}</span>
                    </>
                  )}
                  {session.notes && (
                    <>
                      <span>-</span>
                      <span className="truncate max-w-[200px]">{session.notes}</span>
                    </>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-400 nw-tabular">
                {new Date(session.session_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
              </span>
              <button onClick={() => handleDelete(session.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
