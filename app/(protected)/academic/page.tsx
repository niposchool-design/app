'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const db = supabase as any

/* Cartões editoriais do hub — cada domínio com kanji, cor própria e rota. */
const CARDS = [
  {
    key: 'history',
    href: '/history',
    kanji: '史',
    eyebrow: '史 · História',
    title: 'História da Música',
    desc: 'Períodos, compositores, obras, gêneros e movimentos numa linha do tempo viva.',
    color: '#b45309',
    countLabel: 'períodos',
  },
  {
    key: 'library',
    href: '/academic/library',
    kanji: '書',
    eyebrow: '書 · Biblioteca',
    title: 'Biblioteca',
    desc: 'Artigos, guias, teoria musical e capítulos do método — todo o acervo pedagógico.',
    color: '#7c3aed',
    countLabel: 'materiais',
  },
  {
    key: 'curriculum',
    href: '/academic/curriculum',
    kanji: '道',
    eyebrow: '道 · Currículo',
    title: 'Currículo',
    desc: 'Metodologias, competências, módulos e sequências didáticas do Método Alpha.',
    color: '#4f46e5',
    countLabel: 'metodologias',
  },
  {
    key: 'repertoire',
    href: '/repertoire',
    kanji: '曲',
    eyebrow: '曲 · Repertório',
    title: 'Repertório',
    desc: 'Partituras, cifras, playbacks e tutoriais das peças que a escola estuda e toca.',
    color: '#0d9488',
    countLabel: 'peças',
  },
  {
    key: 'instruments',
    href: '/instruments',
    kanji: '楽器',
    eyebrow: '楽器 · Instrumentos',
    title: 'Instrumentos',
    desc: 'Som, técnica, curiosidades e cultura de cada instrumento da galeria.',
    color: '#dc2626',
    countLabel: 'instrumentos',
  },
] as const

type CardKey = (typeof CARDS)[number]['key']

export default function AcademicPage() {
  const [counts, setCounts] = useState<Partial<Record<CardKey, number>>>({})

  useEffect(() => {
    async function load() {
      const head = (table: string) =>
        db.from(table).select('id', { count: 'exact', head: true })
      try {
        const [history, library, curriculum, repertoire, instruments] = await Promise.all([
          head('v_history_periods'),
          head('v_library_items'),
          head('v_methodologies'),
          head('v_repertoire'),
          head('v_instruments'),
        ])
        setCounts({
          history: history.count ?? 0,
          library: library.count ?? 0,
          curriculum: curriculum.count ?? 0,
          repertoire: repertoire.count ?? 0,
          instruments: instruments.count ?? 0,
        })
      } catch (e) {
        console.error('Erro ao carregar contagens do acadêmico:', e)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-8 pb-12">
      {/* ===== Masthead editorial ===== */}
      <header className="relative overflow-hidden rounded-3xl bg-stone-950 text-white px-6 py-12 md:px-12 md:py-16">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-extrabold text-white/[0.05] select-none leading-none"
          style={{ writingMode: 'vertical-rl', fontSize: '11rem' }}
        >
          学び
        </span>
        <div className="pointer-events-none absolute -left-16 -top-16 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <p className="text-indigo-300 tracking-[0.35em] text-xs font-semibold uppercase mb-4">学び · Acadêmico</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">
            O conhecimento
            <br />
            da Nipo School.
          </h1>
          <p className="mt-5 text-stone-400 text-lg">
            História, biblioteca, currículo, repertório e instrumentos — todo o saber da escola num só lugar.
          </p>
        </div>
      </header>

      {/* ===== Cartões dos domínios ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CARDS.map((card, i) => {
          const count = counts[card.key]
          return (
            <Link key={card.key} href={card.href} className="group nw-rise">
              <article
                className="nw-card relative h-full overflow-hidden rounded-3xl border border-stone-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderTopWidth: 3, borderTopColor: card.color }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -bottom-4 font-extrabold select-none leading-none opacity-[0.07]"
                  style={{ color: card.color, fontSize: '7rem' }}
                >
                  {card.kanji}
                </span>
                <p
                  className="tracking-[0.3em] text-[11px] font-semibold uppercase mb-4"
                  style={{ color: card.color }}
                >
                  {card.eyebrow}
                </p>
                <h2 className="text-2xl font-extrabold text-stone-900 leading-tight">{card.title}</h2>
                <p className="mt-3 text-sm text-stone-500 leading-relaxed relative z-10">{card.desc}</p>
                <div className="mt-6 flex items-center justify-between relative z-10">
                  <span className="text-sm text-stone-400">
                    {count != null ? (
                      <>
                        <span className="nw-tabular text-lg font-bold text-stone-900">{count}</span>{' '}
                        {card.countLabel}
                      </>
                    ) : (
                      <span className="inline-block h-5 w-20 rounded bg-stone-100 animate-pulse align-middle" />
                    )}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-0.5"
                    style={{ color: card.color }}
                  >
                    Explorar <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
                <span className="nw-tabular absolute top-6 right-7 text-xs text-stone-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </article>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
