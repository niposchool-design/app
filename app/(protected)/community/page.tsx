'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { MessageSquare, Plus, Heart, MessageCircle, X, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { createTopic } from '@/app/actions/community-actions'
import type { Tables } from '@/lib/supabase/database.types'

type Topic = Tables<'v_forum_topics'>

export default function CommunityPage() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // New topic form
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')

  async function loadTopics() {
    const { data } = await supabase
      .from('v_forum_topics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30)
    if (data) setTopics(data as Topic[])
  }

  useEffect(() => {
    loadTopics().finally(() => setLoading(false))
  }, [])

  async function handleCreateTopic(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    setSaving(true)
    setError('')

    const result = await createTopic({
      title: title.trim(),
      content: content.trim(),
      category: category.trim() || undefined,
    })

    if ('error' in result) {
      setError(result.error)
    } else {
      setShowForm(false)
      setTitle('')
      setContent('')
      setCategory('')
      await loadTopics()
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-violet-500" />
          Comunidade
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Fechar' : 'Novo Tópico'}
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">{error}</div>}

      {showForm && (
        <form onSubmit={handleCreateTopic} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Sobre o que você quer conversar?"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <input
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Ex: Dúvida, Dica, Discussão"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo *</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={4}
              placeholder="Escreva seu tópico..."
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>
          <button
            type="submit"
            disabled={!title.trim() || !content.trim() || saving}
            className="w-full py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            {saving ? 'Publicando...' : 'Criar Tópico'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />)}</div>
      ) : topics.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Fórum vazio</h3>
          <p className="text-sm text-gray-500 mb-4">Inicie uma conversa!</p>
          <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-violet-600 text-white rounded-xl font-bold">
            Criar Primeiro Tópico
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {topics.map(topic => (
            <Link key={topic.id} href={`/community/${topic.id}`} className="block group">
              <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-violet-200 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold flex-shrink-0">
                    {topic.author_name?.[0] || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 group-hover:text-violet-700 transition-colors">{topic.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {topic.author_name} • {new Date(topic.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> <span className="nw-tabular">{topic.reply_count}</span></span>
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> <span className="nw-tabular">{topic.like_count}</span></span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
