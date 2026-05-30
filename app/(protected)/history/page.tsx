'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { BookOpen, Clock, Music, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Period = Tables<'v_history_periods'>

export default function HistoryPage() {
  const [periods, setPeriods] = useState<Period[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from('v_history_periods')
          .select('*')
          .order('chronological_order')
        if (data) setPeriods(data as Period[])
      } catch (error) {
        console.error('Error loading history periods:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-emerald-500" />
        História da Música
      </h1>

      {/* Navigation tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['Períodos', 'Compositores', 'Gêneros', 'Timeline'].map(tab => (
          <button key={tab} className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap">
            {tab}
          </button>
        ))}
      </div>

      {/* Timeline */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-6">
            {periods.map(period => (
              <Link key={period.id} href={`/history/${period.id}`} className="block group">
                <div className="flex gap-4 relative">
                  {/* Timeline dot */}
                  <div
                    className="nw-tabular w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs z-10 flex-shrink-0 shadow-md"
                    style={{ backgroundColor: period.theme_color || '#6B7280' }}
                  >
                    {period.start_year}
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:border-emerald-200 transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {period.name}
                        </h3>
                        <p className="nw-tabular text-sm text-gray-400">
                          {period.start_year}{period.end_year ? ` - ${period.end_year}` : ' - presente'}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    {period.description && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{period.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                      <span><span className="nw-tabular">{period.composer_count}</span> compositores</span>
                      <span><span className="nw-tabular">{period.work_count}</span> obras</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
