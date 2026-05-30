'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { PermissionGate } from '@/components/auth/PermissionGate'
import { CheckCircle, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Submission = Tables<'v_challenge_submissions'>
type Portfolio = Tables<'v_portfolios'>

export default function EvaluatePage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'submissions' | 'portfolios'>('submissions')

  useEffect(() => {
    async function load() {
      try {
        const [subRes, portRes] = await Promise.all([
          supabase.from('v_challenge_submissions').select('*').in('status', ['submitted', 'under_review']).order('created_at', { ascending: false }),
          supabase.from('v_portfolios').select('*').in('status', ['submitted', 'in_review']).order('created_at', { ascending: false }),
        ])
        if (subRes.data) setSubmissions(subRes.data as Submission[])
        if (portRes.data) setPortfolios(portRes.data as Portfolio[])
      } catch (error) {
        console.error('Error loading evaluations:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <PermissionGate anyPermission={['challenges.evaluate', 'portfolios.evaluate']} fallback={<div className="text-center py-16"><p className="text-gray-500">Sem permissão.</p></div>}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            SpeedGrader
          </h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-lg font-bold">
              <span className="nw-tabular">{submissions.length + portfolios.length}</span> pendentes
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button onClick={() => setTab('submissions')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${tab === 'submissions' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            Desafios (<span className="nw-tabular">{submissions.length}</span>)
          </button>
          <button onClick={() => setTab('portfolios')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${tab === 'portfolios' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            Portfólios (<span className="nw-tabular">{portfolios.length}</span>)
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />)}</div>
        ) : tab === 'submissions' ? (
          submissions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tudo corrigido!</h3>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map(sub => (
                <Link key={sub.id} href={`/evaluate/${sub.id}`} className="block group">
                  <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-green-200 transition-all flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold">
                      {sub.student_name?.[0] || '?'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-900">{sub.student_name}</h3>
                      <p className="text-xs text-gray-400">{sub.challenge_title}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {new Date(sub.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-green-500" />
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : (
          portfolios.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhum portfólio pendente!</h3>
            </div>
          ) : (
            <div className="space-y-3">
              {portfolios.map(p => (
                <Link key={p.id} href={`/evaluate/${p.id}`} className="block group">
                  <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-teal-200 transition-all flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 font-bold">
                      {p.student_name?.[0] || '?'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-900">{p.student_name}</h3>
                      <p className="text-xs text-gray-400">{p.title}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500" />
                  </div>
                </Link>
              ))}
            </div>
          )
        )}
      </div>
    </PermissionGate>
  )
}
