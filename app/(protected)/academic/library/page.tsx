'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { PermissionGate } from '@/components/auth/PermissionGate'
import FileUpload from '@/components/ui/file-upload'
import {
  Library, Search, FileText, Video, Music2, Image, ExternalLink,
  BookOpen, Plus, X, Loader2, Star, ChevronLeft,
  Download, Trash2,
} from 'lucide-react'
import Link from 'next/link'
import { createLibraryItem, deleteLibraryItem } from '@/app/actions/library-actions'

interface LibraryItem {
  id: string
  title: string
  description: string | null
  category: string
  subcategory: string | null
  file_type: string
  file_url: string | null
  content: string | null
  tags: string[]
  is_featured: boolean
  order_index: number
  uploaded_by_name: string | null
  created_at: string
}

const CATEGORY_LABELS: Record<string, string> = {
  methodology: 'Metodologia',
  curriculum: 'Curriculo',
  resource: 'Recurso',
  template: 'Template',
  guide: 'Guia',
}

const CATEGORY_COLORS: Record<string, string> = {
  methodology: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  curriculum: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  resource: 'bg-blue-50 text-blue-700 border-blue-200',
  template: 'bg-amber-50 text-amber-700 border-amber-200',
  guide: 'bg-purple-50 text-purple-700 border-purple-200',
}

const TYPE_ICONS: Record<string, typeof FileText> = {
  pdf: FileText,
  video: Video,
  audio: Music2,
  markdown: BookOpen,
  link: ExternalLink,
  image: Image,
}


export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [readingItem, setReadingItem] = useState<LibraryItem | null>(null)
  const [readingContent, setReadingContent] = useState<string>('')

  useEffect(() => { loadItems() }, [])

  async function loadItems() {
    setLoading(true)
    const { data } = await (supabase as any)
      .from('v_library_items')
      .select('*')
      .order('is_featured', { ascending: false })
      .order('order_index')
      .order('created_at', { ascending: false })
    if (data) setItems(data)
    setLoading(false)
  }

  const filtered = items.filter(item => {
    if (filterCategory && item.category !== filterCategory) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        item.title.toLowerCase().includes(q) ||
        (item.description || '').toLowerCase().includes(q) ||
        (item.tags || []).some(t => t.toLowerCase().includes(q)) ||
        (item.subcategory || '').toLowerCase().includes(q)
      )
    }
    return true
  })

  function handleReadItem(item: LibraryItem) {
    setReadingItem(item)
    setReadingContent(item.content || '')
  }

  async function handleDelete(id: string) {
    if (!confirm('Remover este item da biblioteca?')) return
    const result = await deleteLibraryItem(id)
    if (result.success) loadItems()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/academic" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Library className="w-6 h-6 text-purple-600" />
              Biblioteca Metodologica
            </h1>
            <p className="text-sm text-gray-500 mt-1"><span className="nw-tabular">{items.length}</span> itens na biblioteca</p>
          </div>
        </div>
        <PermissionGate permission="lessons.create">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 transition-colors shadow-sm"
          >
            {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showAddForm ? 'Cancelar' : 'Adicionar'}
          </button>
        </PermissionGate>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <AddItemForm onSave={() => { setShowAddForm(false); loadItems() }} onCancel={() => setShowAddForm(false)} />
      )}

      {/* Search + Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por titulo, tag ou metodologia..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
          />
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setFilterCategory('')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${!filterCategory ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Todos
          </button>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilterCategory(filterCategory === key ? '' : key)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${filterCategory === key ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-lg mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Library className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum item encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(item => {
            const Icon = TYPE_ICONS[item.file_type] || FileText
            const catColor = CATEGORY_COLORS[item.category] || 'bg-gray-50 text-gray-700 border-gray-200'

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all p-5 cursor-pointer group relative"
                onClick={() => handleReadItem(item)}
              >
                {item.is_featured && (
                  <Star className="absolute top-3 right-3 w-4 h-4 text-amber-400 fill-amber-400" />
                )}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${catColor.split(' ').slice(0, 1).join('')} ${catColor.split(' ').slice(1, 2).join('')}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-purple-700 transition-colors truncate">
                      {item.title}
                    </h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full border ${catColor}`}>
                      {CATEGORY_LABELS[item.category] || item.category}
                    </span>
                  </div>
                </div>

                {item.description && (
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {item.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <PermissionGate permission="lessons.create">
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(item.id) }}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </PermissionGate>
              </div>
            )
          })}
        </div>
      )}

      {/* Reading Modal */}
      {readingItem && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setReadingItem(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{readingItem.title}</h2>
                {readingItem.description && (
                  <p className="text-sm text-gray-500 mt-1">{readingItem.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {readingItem.file_url && readingItem.file_url !== '#' && (
                  <a
                    href={readingItem.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                )}
                <button
                  onClick={() => setReadingItem(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {readingContent ? (
                <div className="prose prose-sm max-w-none whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {readingContent}
                </div>
              ) : readingItem.file_url && readingItem.file_url !== '#' ? (
                <div className="text-center py-8">
                  <a
                    href={readingItem.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Abrir arquivo
                  </a>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Conteudo nao disponivel.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// =============================================
// Add Item Form
// =============================================
function AddItemForm({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<string>('resource')
  const [fileType, setFileType] = useState<string>('pdf')
  const [fileUrl, setFileUrl] = useState('')
  const [tags, setTags] = useState('')
  const [saving, setSaving] = useState(false)

  const UPLOAD_ACCEPT: Record<string, string[]> = {
    pdf: ['application/pdf'],
    video: ['video/*'],
    audio: ['audio/*'],
    image: ['image/*'],
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const result = await createLibraryItem({
      title,
      description: description || undefined,
      category,
      file_type: fileType,
      file_url: fileUrl || undefined,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    })
    if (result.success) onSave()
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-purple-50/50 border border-purple-200 rounded-xl p-5 space-y-4">
      <h3 className="font-bold text-gray-900 text-sm">Novo item na biblioteca</h3>

      <div className="grid grid-cols-2 gap-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titulo *" required
          className="col-span-2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />

        <select value={category} onChange={e => setCategory(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200">
          <option value="resource">Recurso</option>
          <option value="methodology">Metodologia</option>
          <option value="curriculum">Curriculo</option>
          <option value="template">Template</option>
          <option value="guide">Guia</option>
        </select>

        <select value={fileType} onChange={e => setFileType(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200">
          <option value="pdf">PDF</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="image">Imagem</option>
          <option value="link">Link</option>
        </select>
      </div>

      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descricao (opcional)"
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />

      {/* File Upload */}
      {fileType !== 'link' ? (
        <div className="space-y-2">
          <FileUpload
            bucket="lessons"
            pathPrefix="library"
            accept={UPLOAD_ACCEPT[fileType] || ['application/pdf']}
            maxSizeMB={100}
            onUpload={(url) => setFileUrl(url)}
            compact
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">ou</span>
            <input value={fileUrl} onChange={e => setFileUrl(e.target.value)} placeholder="Cole a URL do arquivo"
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-200" />
          </div>
        </div>
      ) : (
        <input value={fileUrl} onChange={e => setFileUrl(e.target.value)} placeholder="URL do link *"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
      )}

      <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (separadas por virgula)"
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
          Cancelar
        </button>
        <button type="submit" disabled={saving || !title.trim()} className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1">
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
          Adicionar
        </button>
      </div>
    </form>
  )
}
