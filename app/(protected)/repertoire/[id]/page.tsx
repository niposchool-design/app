'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import {
  ArrowLeft, Music, Headphones, Video, FileText, FileMusic, ScrollText,
  User, Users, KeyRound, Gauge, Clock, Tag, BookOpen, ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Repertoire = Tables<'v_repertoire'>

const ACCENT = '#dc2626'

const DIFF_LABEL: Record<string, string> = {
  beginner: 'Iniciante', intermediate: 'Intermediário', advanced: 'Avançado', expert: 'Expert',
  '1': 'Fácil', '2': 'Médio', '3': 'Difícil', '4': 'Expert', '5': 'Lendário',
}
const diffLabel = (d: unknown) => (d == null ? null : DIFF_LABEL[String(d)] || String(d))

function toStrList(raw: unknown): string[] {
  if (!raw) return []
  const arr = Array.isArray(raw) ? raw : [raw]
  return arr
    .map((v) => {
      if (typeof v === 'string') return v
      if (v && typeof v === 'object') return (v as any).name || (v as any).instrument || (v as any).label || ''
      return v == null ? '' : String(v)
    })
    .filter(Boolean)
}

/* heurística simples para detectar áudio por extensão na URL */
const isAudio = (url: string) => /\.(mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(url)
const isVideoFile = (url: string) => /\.(mp4|webm|ogv|mov)(\?|$)/i.test(url)

export default function RepertoireDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [item, setItem] = useState<Repertoire | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from('v_repertoire').select('*').eq('id', id).single()
        if (data) setItem(data as Repertoire)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  const instruments = useMemo(() => toStrList(item?.required_instruments), [item])
  const tags = useMemo(() => toStrList(item?.tags), [item])

  const hasMaterial = !!(item && (item.sheet_music_url || item.chord_chart_url || item.lyrics_url))
  const hasMedia = !!(item && (item.playback_url || item.tutorial_video_url))

  const tabs = useMemo(() => {
    if (!item) return [] as { key: string; label: string }[]
    const t: { key: string; label: string }[] = []
    t.push({ key: 'sobre', label: 'Sobre' })
    if (hasMaterial) t.push({ key: 'material', label: 'Material' })
    if (hasMedia) t.push({ key: 'midia', label: 'Áudio / Vídeo' })
    return t
  }, [item, hasMaterial, hasMedia])

  useEffect(() => {
    if (tabs.length && !tab) setTab(tabs[0].key)
  }, [tabs, tab])

  if (loading)
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-48 bg-stone-200 rounded-3xl" />
        <div className="h-64 bg-stone-200 rounded-3xl" />
      </div>
    )
  if (!item)
    return (
      <div className="text-center py-16">
        <p className="text-stone-500">Repertório não encontrado.</p>
        <Link href="/repertoire" className="mt-4 inline-block hover:underline" style={{ color: ACCENT }}>
          Voltar
        </Link>
      </div>
    )

  const diff = diffLabel(item.difficulty_level)

  return (
    <div className="space-y-6 pb-12">
      <Link href="/repertoire" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700">
        <ArrowLeft className="w-4 h-4" /> Voltar ao Repertório
      </Link>

      {/* ===== Masthead dark ===== */}
      <header className="relative overflow-hidden rounded-3xl bg-stone-950 text-white px-6 py-10 md:px-10 md:py-12">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-extrabold text-white/[0.06] select-none leading-none"
          style={{ writingMode: 'vertical-rl', fontSize: '8rem' }}
        >
          楽曲
        </span>
        <div className="pointer-events-none absolute -left-12 -top-12 w-56 h-56 rounded-full blur-3xl" style={{ background: `${ACCENT}33` }} />
        <div className="relative z-10 max-w-2xl">
          <p className="tracking-[0.35em] text-xs font-semibold uppercase mb-3" style={{ color: ACCENT }}>
            楽曲 · Repertório
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.05]">{item.title}</h1>
          {(item.composer || item.arranger) && (
            <p className="mt-3 text-stone-400">
              {item.composer}
              {item.arranger && <span> · arr. {item.arranger}</span>}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {item.category_name && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: ACCENT }}>
                {item.category_name}
              </span>
            )}
            {diff && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-white/10 backdrop-blur px-2.5 py-1 rounded-full">
                <Gauge className="w-3.5 h-3.5" />
                {diff}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ===== STATS ===== */}
      {(item.key_signature || item.tempo || item.estimated_duration || item.min_participants != null) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {item.key_signature && <Stat icon={KeyRound} value={item.key_signature} label="Tonalidade" />}
          {item.tempo && <Stat icon={Gauge} value={item.tempo} label="Andamento" />}
          {item.estimated_duration && <Stat icon={Clock} value={item.estimated_duration} label="Duração" />}
          {item.min_participants != null && <Stat icon={Users} value={`${item.min_participants}+`} label="Participantes" />}
        </div>
      )}

      {/* ===== ABAS ===== */}
      {tabs.length > 0 && (
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
          <div className="flex gap-1 overflow-x-auto border-b border-stone-100 px-2">
            {tabs.map((t) => {
              const on = tab === t.key
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`relative shrink-0 px-4 py-3.5 text-sm font-semibold transition-colors ${
                    on ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  {t.label}
                  {on && <span className="absolute left-3 right-3 -bottom-px h-0.5 rounded-full" style={{ background: ACCENT }} />}
                </button>
              )
            })}
          </div>

          <div className="p-6">
            {tab === 'sobre' && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {item.composer && <Field icon={User} label="Compositor" value={item.composer} />}
                  {item.arranger && <Field icon={User} label="Arranjador" value={item.arranger} />}
                  {item.key_signature && <Field icon={KeyRound} label="Tonalidade" value={item.key_signature} mono />}
                  {item.tempo && <Field icon={Gauge} label="Andamento" value={item.tempo} mono />}
                  {item.estimated_duration && <Field icon={Clock} label="Duração estimada" value={item.estimated_duration} mono />}
                  {diff && <Field icon={Gauge} label="Dificuldade" value={diff} />}
                  {item.min_participants != null && <Field icon={Users} label="Participantes mínimos" value={String(item.min_participants)} mono />}
                  {item.category_name && <Field icon={BookOpen} label="Categoria" value={item.category_name} />}
                </div>

                {instruments.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">Instrumentos necessários</p>
                    <div className="flex flex-wrap gap-1.5">
                      {instruments.map((ins, i) => (
                        <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${ACCENT}14`, color: ACCENT }}>
                          {ins}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {tags.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2 inline-flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> Tags
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((t, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full border border-stone-200 text-stone-500">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.notes && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">Observações</p>
                    <p className="text-sm text-stone-600 whitespace-pre-wrap leading-relaxed">{item.notes}</p>
                  </div>
                )}
              </div>
            )}

            {tab === 'material' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {item.sheet_music_url && (
                  <MaterialLink href={item.sheet_music_url} icon={FileText} title="Partitura" subtitle="Abrir documento" />
                )}
                {item.chord_chart_url && (
                  <MaterialLink href={item.chord_chart_url} icon={FileMusic} title="Cifra" subtitle="Abrir cifra" />
                )}
                {item.lyrics_url && (
                  <MaterialLink href={item.lyrics_url} icon={ScrollText} title="Letra" subtitle="Abrir letra" />
                )}
              </div>
            )}

            {tab === 'midia' && (
              <div className="space-y-5">
                {item.playback_url && (
                  <div className="rounded-2xl border border-stone-100 p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: ACCENT }}>
                        <Headphones className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900 text-sm">Playback</p>
                        <p className="text-xs text-stone-400">Acompanhamento</p>
                      </div>
                    </div>
                    {isAudio(item.playback_url) ? (
                      <audio controls className="w-full" src={item.playback_url} />
                    ) : (
                      <MaterialLink href={item.playback_url} icon={Headphones} title="Ouvir playback" subtitle="Abrir link" />
                    )}
                  </div>
                )}
                {item.tutorial_video_url && (
                  <div className="rounded-2xl border border-stone-100 p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: ACCENT }}>
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900 text-sm">Tutorial em vídeo</p>
                        <p className="text-xs text-stone-400">Aula / demonstração</p>
                      </div>
                    </div>
                    {isVideoFile(item.tutorial_video_url) ? (
                      <video controls className="w-full rounded-xl" src={item.tutorial_video_url} />
                    ) : (
                      <MaterialLink href={item.tutorial_video_url} icon={Video} title="Assistir tutorial" subtitle="Abrir vídeo" />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- auxiliares ---------- */
function Stat({ icon: Icon, value, label }: { icon: any; value: string | number; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 text-center">
      <div className="w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: `${ACCENT}1a`, color: ACCENT }}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="nw-tabular text-lg font-bold text-stone-900 break-words">{value}</p>
      <p className="text-xs text-stone-500">{label}</p>
    </div>
  )
}

function Field({ icon: Icon, label, value, mono }: { icon: any; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-2xl border border-stone-100">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${ACCENT}14`, color: ACCENT }}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-stone-400">{label}</p>
        <p className={`text-sm font-medium text-stone-900 ${mono ? 'nw-tabular' : ''}`}>{value}</p>
      </div>
    </div>
  )
}

function MaterialLink({ href, icon: Icon, title, subtitle }: { href: string; icon: any; title: string; subtitle: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-4 rounded-2xl border border-stone-100 hover:border-stone-300 hover:shadow-sm transition-all"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ACCENT}14`, color: ACCENT }}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-stone-900 text-sm truncate">{title}</p>
        <p className="text-xs text-stone-400 truncate">{subtitle}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-stone-500" />
    </a>
  )
}
