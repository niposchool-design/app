'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Music, Search, Volume2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Instrument = Tables<'v_instruments'>

export default function InstrumentsPage() {
  const [instruments, setInstruments] = useState<Instrument[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeFamily, setActiveFamily] = useState<string>('Todos')

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from('v_instruments').select('*').order('display_order')
        if (data) setInstruments(data as Instrument[])
      } catch (error) {
        console.error('Error loading instruments:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const families = useMemo(
    () => [...new Set(instruments.map(i => i.family).filter(Boolean))] as string[],
    [instruments]
  )

  const filtered = useMemo(() => instruments.filter(i => {
    const q = search.toLowerCase()
    const matchSearch = !q || i.name.toLowerCase().includes(q) || (i.family || '').toLowerCase().includes(q) || (i.origin || '').toLowerCase().includes(q)
    const matchFamily = activeFamily === 'Todos' || i.family === activeFamily
    return matchSearch && matchFamily
  }), [instruments, search, activeFamily])

  const grouped = useMemo(() => {
    const fams = activeFamily === 'Todos' ? families : [activeFamily]
    return fams
      .map(f => ({ family: f, items: filtered.filter(i => i.family === f) }))
      .filter(g => g.items.length > 0)
  }, [filtered, families, activeFamily])

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 text-white p-7 md:p-8 shadow-lg">
        <div className="absolute -top-16 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/15 backdrop-blur px-3 py-1 rounded-full mb-3">
            <Music className="w-3.5 h-3.5" /> Galeria de Instrumentos
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-1">Instrumentos</h1>
          <p className="text-purple-100">
            Explore <span className="nw-tabular font-semibold">{instruments.length}</span> instrumentos — sons, curiosidades e história.
          </p>
        </div>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nome, família ou origem..."
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
      </div>

      {/* Filtro por família */}
      {families.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <FamilyChip label="Todos" active={activeFamily === 'Todos'} onClick={() => setActiveFamily('Todos')} />
          {families.map(f => (
            <FamilyChip key={f} label={f} active={activeFamily === f} onClick={() => setActiveFamily(f)} />
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Music className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>Nenhum instrumento encontrado.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(({ family, items }) => (
            <div key={family}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-base font-bold text-gray-700 capitalize">{family}</h2>
                <span className="nw-tabular text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{items.length}</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map(instrument => <InstrumentCard key={instrument.id} instrument={instrument} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FamilyChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
        active ? 'bg-purple-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
      }`}
    >
      {label}
    </button>
  )
}

function InstrumentCard({ instrument }: { instrument: Instrument }) {
  const thumb = (instrument as any).thumbnail_url || instrument.image_url
  return (
    <Link href={`/instruments/${instrument.id}`} className="group">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 hover:border-purple-200 transition-all duration-300">
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50">
          {thumb ? (
            <img src={thumb} alt={instrument.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"><Music className="w-12 h-12 text-purple-300" /></div>
          )}
        </div>
        <div className="p-3.5">
          <h3 className="font-bold text-sm text-gray-900 group-hover:text-purple-700 transition-colors truncate">{instrument.name}</h3>
          <p className="text-xs text-gray-400 truncate">{instrument.origin || instrument.category}</p>
          <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-400">
            {instrument.sounds_count > 0 && (
              <span className="inline-flex items-center gap-1"><Volume2 className="w-3 h-3" /><span className="nw-tabular">{instrument.sounds_count}</span></span>
            )}
            {instrument.difficulty_level != null && (
              <span className="inline-flex items-center gap-1"><Sparkles className="w-3 h-3" /><span className="nw-tabular">{instrument.difficulty_level}</span>/5</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
