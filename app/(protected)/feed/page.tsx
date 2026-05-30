'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/app/providers/AuthProvider'
import { Video, Heart, MessageCircle, Plus, Image as ImageIcon, Mic, X, Loader2, Send } from 'lucide-react'
import { createPost, likePost, commentOnPost } from '@/app/actions/feed-actions'
import FileUpload from '@/components/ui/file-upload'
import MediaPlayer from '@/components/ui/media-player'
import type { Tables } from '@/lib/supabase/database.types'

type FeedPost = Tables<'v_feed_posts'>

export default function FeedPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<FeedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // New post form
  const [caption, setCaption] = useState('')
  const [contentType, setContentType] = useState<'text' | 'video' | 'audio' | 'image'>('text')
  const [mediaUrl, setMediaUrl] = useState('')

  // Comment
  const [commentingOn, setCommentingOn] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')

  async function loadPosts() {
    const { data } = await supabase
      .from('v_feed_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
    if (data) setPosts(data as FeedPost[])
  }

  useEffect(() => {
    loadPosts().finally(() => setLoading(false))
  }, [])

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault()
    if (!caption.trim()) return
    setSaving(true)
    setError('')

    const result = await createPost({
      content_type: contentType,
      caption: caption.trim(),
      media_url: mediaUrl || undefined,
    })

    if ('error' in result) {
      setError(result.error)
    } else {
      setShowForm(false)
      setCaption('')
      setContentType('text')
      setMediaUrl('')
      await loadPosts()
    }
    setSaving(false)
  }

  async function handleLike(postId: string) {
    await likePost(postId)
    await loadPosts()
  }

  async function handleComment(postId: string) {
    if (!commentText.trim()) return
    const result = await commentOnPost({ post_id: postId, content: commentText.trim() })
    if (!('error' in result)) {
      setCommentingOn(null)
      setCommentText('')
      await loadPosts()
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Feed Musical</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Fechar' : 'Postar'}
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">{error}</div>}

      {showForm && (
        <form onSubmit={handleCreatePost} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div className="flex gap-2">
            {(['text', 'video', 'audio', 'image'] as const).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setContentType(type)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${contentType === type ? 'bg-pink-100 text-pink-700 ring-2 ring-pink-300' : 'bg-gray-100 text-gray-600'}`}
              >
                {type === 'text' ? 'Texto' : type === 'video' ? 'Vídeo' : type === 'audio' ? 'Áudio' : 'Foto'}
              </button>
            ))}
          </div>
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            rows={3}
            placeholder="O que você está praticando hoje?"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
          {contentType !== 'text' && (
            <FileUpload
              bucket="feed"
              accept={
                contentType === 'video' ? ['video/*'] :
                contentType === 'audio' ? ['audio/*'] :
                contentType === 'image' ? ['image/*'] :
                ['image/*', 'audio/*', 'video/*']
              }
              maxSizeMB={50}
              label={contentType === 'video' ? 'Upload de Vídeo' : contentType === 'audio' ? 'Upload de Áudio' : 'Upload de Imagem'}
              compact
              onUpload={(url) => setMediaUrl(url)}
              onRemove={() => setMediaUrl('')}
            />
          )}
          <button
            type="submit"
            disabled={!caption.trim() || saving}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {saving ? 'Publicando...' : 'Publicar'}
          </button>
        </form>
      )}

      {/* Post Type Filters */}
      <div className="flex gap-2">
        {[
          { icon: Video, label: 'Vídeos' },
          { icon: Mic, label: 'Áudio' },
          { icon: ImageIcon, label: 'Fotos' },
        ].map(({ icon: Icon, label }) => (
          <button key={label} className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
              <div className="h-48 bg-gray-200 rounded-xl" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <Video className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhum post ainda</h3>
          <p className="text-sm text-gray-500 mb-6">Seja o primeiro a compartilhar sua música!</p>
          <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold">
            Criar Primeiro Post
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 p-4 pb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold">
                  {post.author_name?.[0] || '?'}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">{post.author_display_name || post.author_name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(post.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
              </div>

              {post.caption && <p className="px-4 pb-3 text-sm text-gray-700">{post.caption}</p>}

              {post.media_url && (
                <div className="px-4 pb-2">
                  <MediaPlayer
                    url={post.media_url}
                    type={post.content_type === 'video' ? 'video' : post.content_type === 'audio' ? 'audio' : post.content_type === 'image' ? 'image' : undefined}
                  />
                </div>
              )}

              <div className="flex items-center gap-6 p-4">
                <button onClick={() => handleLike(post.id)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-pink-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium nw-tabular">{post.like_count}</span>
                </button>
                <button
                  onClick={() => setCommentingOn(commentingOn === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium nw-tabular">{post.comment_count}</span>
                </button>
              </div>

              {commentingOn === post.id && (
                <div className="px-4 pb-4 flex gap-2">
                  <input
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Escreva um comentário..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    onKeyDown={e => e.key === 'Enter' && handleComment(post.id)}
                  />
                  <button onClick={() => handleComment(post.id)} className="px-3 py-2 bg-pink-500 text-white rounded-lg text-sm font-bold hover:bg-pink-600">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
