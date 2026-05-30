'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { RoleView } from '@/components/auth/RoleView'
import { Briefcase, Plus, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Portfolio = Tables<'v_portfolios'>

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from('v_portfolios')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(30)
        if (data) setPortfolios(data as Portfolio[])
      } catch (error) {
        console.error('Error loading portfolios:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-600',
    submitted: 'bg-blue-100 text-blue-700',
    in_review: 'bg-amber-100 text-amber-700',
    evaluated: 'bg-green-100 text-green-700',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-teal-500" />
          Portfólio
        </h1>
        <RoleView
          student={
            <Link href="/portfolio/new" className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors">
              <Plus className="w-4 h-4" />
              Nova Entrada
            </Link>
          }
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{[1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-gray-200 rounded-xl animate-pulse" />)}</div>
      ) : portfolios.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Portfólio vazio</h3>
          <p className="text-sm text-gray-500">Comece adicionando seus trabalhos e performances.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolios.map(p => (
            <Link key={p.id} href={`/portfolio/${p.id}`} className="group">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-teal-200 transition-all h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusColors[p.status] || 'bg-gray-100'}`}>
                    {p.status}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">{p.work_type}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">{p.title}</h3>
                {p.description && <p className="text-sm text-gray-500 line-clamp-2 flex-1">{p.description}</p>}
                <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                  <span>{p.student_name}</span>
                  {p.grade !== null && <span className="font-bold text-gray-600">Nota: <span className="nw-tabular">{p.grade}</span></span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
