'use client'

import { useState } from 'react'
// Navigation handled via Link component
import { Sparkles, BookOpen, Music, Users, Lightbulb, Send, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { submitPortfolioV2 } from '@/app/actions/portfolio-actions-v2'

/**
 * Templates de reflexão semanal conforme curriculum pedagógico.
 * Fonte: docs/pedagogia/ESSENCIA_PEDAGOGICA.md (Ficha Semanal)
 */
const REFLECTION_PROMPTS = [
  {
    id: 'progress',
    label: 'Meu Progresso',
    icon: <Sparkles className="w-5 h-5" />,
    prompt: 'Nesta semana, meu maior progresso foi:',
    placeholder: 'Ex: Consegui tocar a música inteira sem parar, aprendi um acorde novo...',
    color: 'emerald',
  },
  {
    id: 'challenges',
    label: 'Dificuldades',
    icon: <BookOpen className="w-5 h-5" />,
    prompt: 'Senti dificuldade em:',
    placeholder: 'Ex: Manter o ritmo na parte B, leitura de partitura...',
    color: 'amber',
  },
  {
    id: 'goals',
    label: 'Próximos Objetivos',
    icon: <Lightbulb className="w-5 h-5" />,
    prompt: 'O que quero desenvolver na próxima aula:',
    placeholder: 'Ex: Praticar mais a mão esquerda, trabalhar dinâmica...',
    color: 'blue',
  },
  {
    id: 'group',
    label: 'Contribuição ao Grupo',
    icon: <Users className="w-5 h-5" />,
    prompt: 'Minha contribuição para o grupo:',
    placeholder: 'Ex: Ajudei um colega com o ritmo, sugeri uma música nova...',
    color: 'purple',
  },
  {
    id: 'creativity',
    label: 'Ideia Nova',
    icon: <Music className="w-5 h-5" />,
    prompt: 'Ideia nova ou música que experimentei:',
    placeholder: 'Ex: Experimentei improvisar no blues, tentei compor uma melodia...',
    color: 'rose',
  },
]

const COLOR_MAP: Record<string, { bg: string; border: string; text: string }> = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700' },
}

export default function PortfolioReflectionPage() {
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(id: string, value: string) {
    setResponses(prev => ({ ...prev, [id]: value }))
  }

  const filledCount = Object.values(responses).filter(v => v.trim().length > 0).length

  async function handleSubmit() {
    if (filledCount === 0) return
    setSubmitting(true)
    setError('')

    // Build the reflection content
    const reflectionParts = REFLECTION_PROMPTS.filter(p => responses[p.id]?.trim())
      .map(p => `**${p.prompt}**\n${responses[p.id].trim()}`)

    const description = reflectionParts.join('\n\n')

    const result = await submitPortfolioV2({
      title: `Reflexão Semanal — ${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}`,
      description,
      type: 'reflection',
    })

    if (result.success) {
      setSuccess(true)
    } else {
      setError(result.error || 'Erro ao enviar reflexão')
    }
    setSubmitting(false)
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Reflexão Enviada!</h2>
        <p className="text-gray-500">
          Sua reflexão semanal foi adicionada ao portfólio. Continue assim!
        </p>
        <p className="text-sm text-emerald-600 font-bold">+15 pontos pela reflexão semanal</p>
        <div className="flex items-center justify-center gap-3 pt-4">
          <Link
            href="/portfolio"
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors"
          >
            Ver Portfólio
          </Link>
          <button
            onClick={() => { setSuccess(false); setResponses({}) }}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
          >
            Nova Reflexão
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Portfólio
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          Reflexão Semanal
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Registre seu progresso, dificuldades e metas. Cada reflexão vale <span className="font-bold text-emerald-600">+15 pontos</span>.
        </p>
      </div>

      {/* Reflection Prompts */}
      <div className="space-y-4">
        {REFLECTION_PROMPTS.map(prompt => {
          const colors = COLOR_MAP[prompt.color]
          return (
            <div key={prompt.id} className={`rounded-2xl border ${colors.border} ${colors.bg} p-5 space-y-3`}>
              <div className={`flex items-center gap-2 ${colors.text}`}>
                {prompt.icon}
                <h3 className="font-bold text-sm">{prompt.label}</h3>
              </div>
              <p className="text-sm text-gray-700 font-medium">{prompt.prompt}</p>
              <textarea
                value={responses[prompt.id] || ''}
                onChange={e => handleChange(prompt.id, e.target.value)}
                placeholder={prompt.placeholder}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
              />
            </div>
          )
        })}
      </div>

      {/* Submit */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {filledCount}/{REFLECTION_PROMPTS.length} campos preenchidos
        </p>
        <button
          onClick={handleSubmit}
          disabled={filledCount === 0 || submitting}
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {submitting ? 'Enviando...' : 'Enviar Reflexão'}
        </button>
      </div>
    </div>
  )
}
