'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { RoleView } from '@/components/auth/RoleView'
import { PermissionGate } from '@/components/auth/PermissionGate'
import { Zap, Plus, ChevronRight, Star } from 'lucide-react'
import Link from 'next/link'
import type { Tables } from '@/lib/supabase/database.types'

type Challenge = Tables<'v_challenges'>

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from('v_challenges')
          .select('*')
          .order('created_at', { ascending: false })
        if (data) setChallenges(data as Challenge[])
      } catch (error) {
        console.error('Error loading challenges:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const difficultyColors: Record<number, string> = {
    1: 'bg-green-100 text-green-700',
    2: 'bg-blue-100 text-blue-700',
    3: 'bg-yellow-100 text-yellow-700',
    4: 'bg-orange-100 text-orange-700',
    5: 'bg-red-100 text-red-700',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500" />
          Desafios Alpha
        </h1>
        <PermissionGate permission="challenges.create">
          <Link href="/challenges/new" className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors">
            <Plus className="w-4 h-4" />
            Novo Desafio
          </Link>
        </PermissionGate>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />)}
        </div>
      ) : challenges.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <Zap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhum desafio disponível</h3>
          <p className="text-sm text-gray-500">Os desafios aparecerão aqui quando forem criados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map(ch => (
            <Link key={ch.id} href={`/challenges/${ch.id}`} className="group">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:border-amber-200 transition-all h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${difficultyColors[ch.difficulty] || 'bg-gray-100 text-gray-600'}`}>
                    Nível {ch.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold"><span className="nw-tabular">{ch.base_points}</span> pts</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">{ch.title}</h3>
                {ch.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 flex-1">{ch.description}</p>
                )}
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs text-gray-400"><span className="nw-tabular">{ch.submission_count}</span> submissões</span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-amber-500 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
