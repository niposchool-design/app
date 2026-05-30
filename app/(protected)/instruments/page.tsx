'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Music, Search } from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Instrument = Tables<'v_instruments'>

export default function InstrumentsPage() {
  const [instruments, setInstruments] = useState<Instrument[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from('v_instruments')
          .select('*')
          .order('display_order')
        if (data) setInstruments(data as Instrument[])
      } catch (error) {
        console.error('Error loading instruments:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = instruments.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    (i.family || '').toLowerCase().includes(search.toLowerCase())
  )

  const families = [...new Set(filtered.map(i => i.family).filter(Boolean))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Music className="w-6 h-6 text-purple-500" />
          Instrumentos
        </h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar instrumentos..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-8">
          {families.map(family => (
            <div key={family}>
              <h2 className="text-lg font-bold text-gray-700 mb-4 capitalize">{family}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.filter(i => i.family === family).map(instrument => (
                  <Link key={instrument.id} href={`/instruments/${instrument.id}`} className="group">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all">
                      <div className="aspect-square bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
                        {((instrument as any).thumbnail_url || instrument.image_url) ? (
                          <img src={(instrument as any).thumbnail_url || instrument.image_url} alt={instrument.name} className="w-full h-full object-cover" />
                        ) : (
                          <Music className="w-12 h-12 text-purple-300" />
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-sm text-gray-900 group-hover:text-purple-700 transition-colors">{instrument.name}</h3>
                        <p className="text-xs text-gray-400">{instrument.origin || instrument.category}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {instrument.sounds_count > 0 && (
                            <span className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded font-medium">
                              <span className="nw-tabular">{instrument.sounds_count}</span> sons
                            </span>
                          )}
                          {instrument.media_count > 0 && (
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
                              <span className="nw-tabular">{instrument.media_count}</span> mídia
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
