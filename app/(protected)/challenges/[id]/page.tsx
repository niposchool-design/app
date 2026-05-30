'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Star, Upload, ArrowLeft, Loader2, Send } from 'lucide-react'
import Link from 'next/link'
import { RoleView } from '@/components/auth/RoleView'
import { submitChallenge } from '@/app/actions/challenge-actions'
import FileUpload from '@/components/ui/file-upload'
import type { Tables } from '@/lib/supabase/database.types'

type Challenge = Tables<'v_challenges'>
type Submission = Tables<'v_challenge_submissions'>

export default function ChallengeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [response, setResponse] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const { data: ch } = await supabase.from('v_challenges').select('*').eq('id', id).single()
        if (ch) setChallenge(ch as Challenge)

        const { data: subs } = await supabase.from('v_challenge_submissions').select('*').eq('challenge_id', id).order('created_at', { ascending: false })
        if (subs) setSubmissions(subs as Submission[])
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!response.trim() && !fileUrl) return
    setSubmitting(true)
    setError('')

    const result = await submitChallenge({
      challenge_id: id,
      response: response.trim() || undefined,
      file_url: fileUrl || undefined,
    })

    if ('error' in result) {
      setError(result.error)
      setSubmitting(false)
    } else {
      setSuccess('Submissão enviada!')
      setShowForm(false)
      setResponse('')
      const { data: subs } = await supabase.from('v_challenge_submissions').select('*').eq('challenge_id', id).order('created_at', { ascending: false })
      if (subs) setSubmissions(subs as Submission[])
      setSubmitting(false)
    }
  }

  if (loading) return <div className="space-y-6 animate-pulse"><div className="h-48 bg-gray-200 rounded-2xl" /><div className="h-64 bg-gray-200 rounded-2xl" /></div>
  if (!challenge) return <div className="text-center py-16"><p className="text-gray-500">Desafio não encontrado.</p><Link href="/challenges" className="text-indigo-600 hover:underline mt-4 inline-block">Voltar</Link></div>

  const difficultyLabels = ['', 'Fácil', 'Médio', 'Difícil', 'Expert', 'Lendário']
  const difficultyColors = ['', 'bg-green-100 text-green-700', 'bg-blue-100 text-blue-700', 'bg-orange-100 text-orange-700', 'bg-red-100 text-red-700', 'bg-purple-100 text-purple-700']
  const statusLabels: Record<string, string> = { pending: 'Pendente', in_review: 'Em Revisão', evaluated: 'Avaliado', rejected: 'Rejeitado' }
  const statusColors: Record<string, string> = { pending: 'bg-yellow-100 text-yellow-700', in_review: 'bg-blue-100 text-blue-700', evaluated: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700' }

  return (
    <div className="space-y-6">
      <Link href="/challenges" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4" /> Voltar aos Desafios
      </Link>

      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              {challenge.code && <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{challenge.code}</span>}
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficultyColors[challenge.difficulty] || 'bg-white/20'}`}>
                {difficultyLabels[challenge.difficulty] || `Nível ${challenge.difficulty}`}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{challenge.title}</h1>
            {challenge.methodology_name && <p className="text-indigo-200 text-sm">{challenge.methodology_name}</p>}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-amber-300">
              <Star className="w-5 h-5" />
              <span className="text-2xl font-bold nw-tabular">{challenge.base_points}</span>
            </div>
            <p className="text-xs text-indigo-200">pontos</p>
          </div>
        </div>
      </div>

      {challenge.description && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-3">Descrição</h2>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{challenge.description}</p>
        </div>
      )}

      {challenge.objectives && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-3">Objetivos</h2>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{challenge.objectives}</p>
        </div>
      )}

      {error && <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3 text-sm">{success}</div>}

      <RoleView
        student={
          showForm ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
              <h3 className="font-bold text-gray-900">Sua Resposta</h3>
              <textarea
                value={response}
                onChange={e => setResponse(e.target.value)}
                rows={6}
                placeholder="Escreva sua resposta, descreva seu processo, reflexões..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <FileUpload
                bucket="challenges"
                accept={['image/*', 'audio/*', 'video/*', 'application/pdf']}
                maxSizeMB={50}
                label="Anexar arquivo (opcional)"
                hint="Vídeo, áudio, imagem ou documento"
                compact
                onUpload={(url) => setFileUrl(url)}
                onRemove={() => setFileUrl('')}
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={(!response.trim() && !fileUrl) || submitting}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {submitting ? 'Enviando...' : 'Enviar Submissão'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
              <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Enviar Submissão</h3>
              <p className="text-sm text-gray-500 mb-4">Escreva sua resposta para este desafio.</p>
              <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                Participar do Desafio
              </button>
            </div>
          )
        }
      />

      {submissions.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Submissões (<span className="nw-tabular">{submissions.length}</span>)</h2>
          <div className="space-y-3">
            {submissions.map(s => (
              <div key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-bold text-sm text-gray-900">{s.student_name}</p>
                  <p className="text-xs text-gray-400">{new Date(s.created_at).toLocaleDateString('pt-BR')}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold ${statusColors[s.status] || 'bg-gray-100 text-gray-600'}`}>
                  {statusLabels[s.status] || s.status}
                </span>
                {s.grade !== null && (
                  <span className="font-bold text-indigo-600 nw-tabular">{s.grade}/10</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
