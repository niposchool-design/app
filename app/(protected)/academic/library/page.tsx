'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase/client'
import { PermissionGate } from '@/components/auth/PermissionGate'
import FileUpload from '@/components/ui/file-upload'
import {
  Search, FileText, Video, Music2, Image as ImageIcon, ExternalLink,
  BookOpen, Plus, X, Loader2, Star, ArrowLeft,
  Download, Trash2,
} from 'lucide-react'
import Link from 'next/link'
import { createLibraryItem, deleteLibraryItem } from '@/app/actions/library-actions'

const db = supabase as any

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

/* Categorias canônicas — rótulo PT-BR, cor editorial e kanji. Fallback para qualquer outra. */
const CATEGORIES: Record<string, { label: string; color: string; kanji: string }> = {
  methodology: { label: 'Metodologia', color: '#4f46e5', kanji: '法' },
  curriculum: { label: 'Currículo', color: '#0d9488', kanji: '道' },
  theory: { label: 'Teoria Musical', color: '#0284c7', kanji: '理' },
  history: { label: 'História', color: '#b45309', kanji: '史' },
  resource: { label: 'Recurso', color: '#2563eb', kanji: '具' },
  template: { label: 'Modelo', color: '#d97706', kanji: '型' },
  guide: { label: 'Guia', color: '#7c3aed', kanji: '指' },
  reference: { label: 'Referência', color: '#0891b2', kanji: '参' },
  strategy: { label: 'Estratégia', color: '#db2777', kanji: '策' },
  experience: { label: 'Experiência', color: '#16a34a', kanji: '験' },
  faq: { label: 'Perguntas', color: '#78716c', kanji: '問' },
}
const catInfo = (c: string) => CATEGORIES[c] || { label: c, color: '#78716c', kanji: '書' }

const TYPE_ICONS: Record<string, typeof FileText> = {
  pdf: FileText,
  video: Video,
  audio: Music2,
  markdown: BookOpen,
  link: ExternalLink,
  image: ImageIcon,
}

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterSub, setFilterSub] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [readingItem, setReadingItem] = useState<LibraryItem | null>(null)

  useEffect(() => { loadItems() }, [])

  async function loadItems() {
    setLoading(true)
    const { data } = await db
      .from('v_library_items')
      .select('*')
      .order('is_featured', { ascending: false })
      .order('order_index')
      .order('created_at', { ascending: false })
    if (data) setItems(data as LibraryItem[])
    setLoading(false)
  }

  /* Categorias presentes nos dados, ordenadas pela ordem canônica. */
  const categories = useMemo(() => {
    const order = Object.keys(CATEGORIES)
    const present = [...new Set(items.map(i => i.category).filter(Boolean))]
    return present.sort((a, b) => {
      const ia = order.indexOf(a), ib = order.indexOf(b)
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
  }, [items])

  /* Subcategorias disponíveis dentro da categoria filtrada. */
  const subcategories = useMemo(() => {
    if (!filterCategory) return []
    return [...new Set(
      items.filter(i => i.category === filterCategory).map(i => i.subcategory).filter(Boolean),
    )] as string[]
  }, [items, filterCategory])

  const filtered = useMemo(() => items.filter(item => {
    if (filterCategory && item.category !== filterCategory) return false
    if (filterSub && item.subcategory !== filterSub) return false
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
  }), [items, filterCategory, filterSub, search])

  const featured = useMemo(() => filtered.filter(i => i.is_featured), [filtered])

  /* Agrupamento por categoria, na ordem canônica. */
  const groups = useMemo(() => {
    const cats = filterCategory ? [filterCategory] : categories
    return cats
      .map(c => ({ category: c, items: filtered.filter(i => i.category === c) }))
      .filter(g => g.items.length)
  }, [filtered, categories, filterCategory])

  async function handleDelete(id: string) {
    if (!confirm('Remover este item da biblioteca?')) return
    const result = await deleteLibraryItem(id)
    if (result.success) loadItems()
  }

  return (
    <div className="space-y-8 pb-12">
      {/* ===== Masthead editorial ===== */}
      <header className="relative overflow-hidden rounded-3xl bg-stone-950 text-white px-6 py-12 md:px-12 md:py-14">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-extrabold text-white/[0.05] select-none leading-none"
          style={{ writingMode: 'vertical-rl', fontSize: '11rem' }}
        >
          書庫
        </span>
        <div className="pointer-events-none absolute -left-16 -top-16 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <Link href="/academic" className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-white mb-5">
            <ArrowLeft className="w-4 h-4" /> Acadêmico
          </Link>
          <p className="text-purple-300 tracking-[0.35em] text-xs font-semibold uppercase mb-4">書庫 · Biblioteca</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.05]">O acervo da escola.</h1>
          <p className="mt-5 text-stone-400 text-lg">
            <span className="nw-tabular text-white font-semibold">{items.length}</span> materiais — artigos, guias,
            teoria musical, história e capítulos do método.
          </p>
        </div>
      </header>

      {/* ===== Busca + adicionar ===== */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por título, tag, categoria..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200 rounded-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
            />
          </div>
          <PermissionGate permission="lessons.create">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="shrink-0 flex items-center gap-2 px-4 py-3 bg-stone-900 text-white rounded-full font-semibold text-sm hover:bg-stone-800 transition-colors shadow-sm"
            >
              {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span className="hidden sm:inline">{showAddForm ? 'Cancelar' : 'Adicionar'}</span>
            </button>
          </PermissionGate>
        </div>

        {/* Filtro por categoria */}
        {categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <Chip label="Todas" active={!filterCategory} onClick={() => { setFilterCategory(''); setFilterSub('') }} />
            {categories.map(c => {
              const info = catInfo(c)
              return (
                <Chip
                  key={c}
                  label={info.label}
                  color={info.color}
                  active={filterCategory === c}
                  onClick={() => { setFilterCategory(filterCategory === c ? '' : c); setFilterSub('') }}
                />
              )
            })}
          </div>
        )}

        {/* Filtro por subcategoria (aparece ao escolher categoria) */}
        {subcategories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <Chip label="Tudo" small active={!filterSub} onClick={() => setFilterSub('')} />
            {subcategories.map(s => (
              <Chip key={s} label={s} small active={filterSub === s} onClick={() => setFilterSub(filterSub === s ? '' : s)} />
            ))}
          </div>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <AddItemForm onSave={() => { setShowAddForm(false); loadItems() }} onCancel={() => setShowAddForm(false)} />
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-stone-100 p-5 animate-pulse">
              <div className="h-10 w-10 bg-stone-200 rounded-lg mb-3" />
              <div className="h-4 bg-stone-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-stone-100 rounded w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>Nenhum item encontrado.</p>
        </div>
      ) : (
        <div className="space-y-14">
          {/* Destaques (só na visão geral) */}
          {!filterCategory && !filterSub && !search && featured.length > 0 && (
            <section>
              <div className="flex items-baseline gap-3 mb-6 pb-3 border-b-2 border-amber-400">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400 self-center" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">Destaques</h2>
                <span className="nw-tabular ml-auto text-sm text-stone-400">{featured.length}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featured.map(item => (
                  <ItemCard key={item.id} item={item} onOpen={setReadingItem} onDelete={handleDelete} />
                ))}
              </div>
            </section>
          )}

          {/* Grupos por categoria */}
          {groups.map(({ category, items: groupItems }, gi) => {
            const info = catInfo(category)
            return (
              <section key={category}>
                <div className="flex items-baseline gap-4 mb-6 pb-3 border-b-2" style={{ borderColor: info.color }}>
                  <span className="font-extrabold leading-none select-none" style={{ color: info.color, fontSize: '2rem' }} aria-hidden>
                    {info.kanji}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">{info.label}</h2>
                  <span className="nw-tabular ml-auto text-sm text-stone-400">
                    {String(gi + 1).padStart(2, '0')} · <span className="text-stone-600">{groupItems.length}</span>
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupItems.map(item => (
                    <ItemCard key={item.id} item={item} onOpen={setReadingItem} onDelete={handleDelete} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}

      {/* Reading Modal */}
      {readingItem && (
        <ReadingModal item={readingItem} onClose={() => setReadingItem(null)} />
      )}
    </div>
  )
}

/* ---------- componentes ---------- */
function Chip({ label, active, onClick, color, small }: { label: string; active: boolean; onClick: () => void; color?: string; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full font-medium transition-all border ${small ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} ${active ? 'text-white border-transparent' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'}`}
      style={active ? { background: color || '#0c0a09' } : undefined}
    >
      {label}
    </button>
  )
}

function ItemCard({ item, onOpen, onDelete }: { item: LibraryItem; onOpen: (i: LibraryItem) => void; onDelete: (id: string) => void }) {
  const Icon = TYPE_ICONS[item.file_type] || FileText
  const info = catInfo(item.category)
  return (
    <div
      className="nw-card group relative bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-5 cursor-pointer"
      style={{ borderTopWidth: 3, borderTopColor: info.color }}
      onClick={() => onOpen(item)}
    >
      {item.is_featured && <Star className="absolute top-3 right-3 w-4 h-4 text-amber-400 fill-amber-400" />}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${info.color}1a`, color: info.color }}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-stone-900 text-sm leading-tight group-hover:opacity-80 transition-opacity">{item.title}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full" style={{ background: `${info.color}1a`, color: info.color }}>
              {info.label}
            </span>
            {item.subcategory && <span className="text-[10px] text-stone-400 truncate">{item.subcategory}</span>}
          </div>
        </div>
      </div>

      {item.description && <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">{item.description}</p>}

      {item.tags && item.tags.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {item.tags.slice(0, 4).map(tag => (
            <span key={tag} className="px-1.5 py-0.5 bg-stone-100 text-stone-500 text-[10px] rounded">{tag}</span>
          ))}
        </div>
      )}

      <PermissionGate permission="lessons.create">
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={e => { e.stopPropagation(); onDelete(item.id) }}
            className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </PermissionGate>
    </div>
  )
}

function ReadingModal({ item, onClose }: { item: LibraryItem; onClose: () => void }) {
  const info = catInfo(item.category)
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl max-h-[88vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-stone-100" style={{ borderTopWidth: 4, borderTopColor: info.color }}>
          <div className="min-w-0">
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full mb-2" style={{ background: `${info.color}1a`, color: info.color }}>
              {info.label}{item.subcategory ? ` · ${item.subcategory}` : ''}
            </span>
            <h2 className="text-xl font-extrabold text-stone-900 leading-tight">{item.title}</h2>
            {item.description && <p className="text-sm text-stone-500 mt-1">{item.description}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {item.file_url && item.file_url !== '#' && (
              <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </a>
            )}
            <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg text-stone-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {item.content ? (
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-stone-700 leading-relaxed">{item.content}</div>
          ) : item.file_url && item.file_url !== '#' ? (
            <div className="text-center py-8">
              <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full font-bold transition-opacity hover:opacity-90" style={{ background: info.color }}>
                <Download className="w-5 h-5" /> Abrir arquivo
              </a>
            </div>
          ) : (
            <p className="text-stone-400 text-center py-8">Conteúdo não disponível.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// =============================================
// Add Item Form
// =============================================
function AddItemForm({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('resource')
  const [fileType, setFileType] = useState('pdf')
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
    <form onSubmit={handleSubmit} className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
      <h3 className="font-bold text-stone-900 text-sm">Novo item na biblioteca</h3>

      <div className="grid grid-cols-2 gap-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título *" required
          className="col-span-2 px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />

        <select value={category} onChange={e => setCategory(e.target.value)}
          className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200">
          <option value="resource">Recurso</option>
          <option value="methodology">Metodologia</option>
          <option value="curriculum">Currículo</option>
          <option value="theory">Teoria Musical</option>
          <option value="history">História</option>
          <option value="template">Modelo</option>
          <option value="guide">Guia</option>
        </select>

        <select value={fileType} onChange={e => setFileType(e.target.value)}
          className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200">
          <option value="pdf">PDF</option>
          <option value="video">Vídeo</option>
          <option value="audio">Áudio</option>
          <option value="image">Imagem</option>
          <option value="link">Link</option>
        </select>
      </div>

      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição (opcional)"
        className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />

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
            <span className="text-xs text-stone-400">ou</span>
            <input value={fileUrl} onChange={e => setFileUrl(e.target.value)} placeholder="Cole a URL do arquivo"
              className="flex-1 px-3 py-1.5 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-200" />
          </div>
        </div>
      ) : (
        <input value={fileUrl} onChange={e => setFileUrl(e.target.value)} placeholder="URL do link *"
          className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
      )}

      <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (separadas por vírgula)"
        className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-lg">
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
