'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  GraduationCap, ChevronLeft, ChevronDown, ChevronUp, BookOpen,
  Music, Drum, Mic2, Move, Brain, Palette, Guitar, Users2,
  Star, Loader2, Sparkles,
} from 'lucide-react'
import Link from 'next/link'

// Methodology config with icons and colors
const METHODOLOGIES = [
  { key: 'orff', name: 'Orff Schulwerk', icon: Drum, color: 'bg-orange-50 text-orange-700 border-orange-200', gradient: 'from-orange-500 to-red-500',
    summary: 'Musica como experiencia corporal. Improvisacao, instrumentos simples, coletividade e inclusao.', lessonRange: [0, 5] },
  { key: 'suzuki', name: 'Metodo Suzuki', icon: Guitar, color: 'bg-blue-50 text-blue-700 border-blue-200', gradient: 'from-blue-500 to-cyan-500',
    summary: 'Educacao do talento por imitacao e repeticao. Ouvir primeiro, tocar depois. Envolvimento familiar.', lessonRange: [8, 9] },
  { key: 'kodaly', name: 'Metodo Kodaly', icon: Mic2, color: 'bg-green-50 text-green-700 border-green-200', gradient: 'from-green-500 to-emerald-500',
    summary: 'Canto como base universal. Solfejo, do movel, sinais de Curwen. Literacia musical a partir do repertorio local.', lessonRange: [6, 7] },
  { key: 'musical_futures', name: 'Musical Futures', icon: Music, color: 'bg-pink-50 text-pink-700 border-pink-200', gradient: 'from-pink-500 to-rose-500',
    summary: 'Aprendizagem informal. Repertorio popular escolhido pelo aluno. Bandas colaborativas e autoria.', lessonRange: [62, 69] },
  { key: 'dalcroze', name: 'Dalcroze Euritmia', icon: Move, color: 'bg-purple-50 text-purple-700 border-purple-200', gradient: 'from-purple-500 to-violet-500',
    summary: 'Corpo como instrumento primario. Movimento e musica integrados. Internalizacao ritmica.', lessonRange: [17, 17] },
  { key: 'gordon', name: 'Gordon MLT', icon: Brain, color: 'bg-teal-50 text-teal-700 border-teal-200', gradient: 'from-teal-500 to-cyan-500',
    summary: 'Audiacao: pensar musica internamente. Aprendizagem sequencial, reconhecimento de padroes.', lessonRange: [10, 13] },
  { key: 'waldorf', name: 'Waldorf / Steiner', icon: Palette, color: 'bg-amber-50 text-amber-700 border-amber-200', gradient: 'from-amber-500 to-yellow-500',
    summary: 'Educacao integral e artistica. Experiencia antes da teoria. Instrumentos pentatonicos.', lessonRange: [48, 53] },
  { key: 'berklee', name: 'Berklee Contemporanea', icon: Sparkles, color: 'bg-indigo-50 text-indigo-700 border-indigo-200', gradient: 'from-indigo-500 to-blue-500',
    summary: 'Criatividade, composicao, producao digital e empreendedorismo musical.', lessonRange: [14, 16] },
  { key: 'lincoln', name: 'Lincoln Center Education', icon: Users2, color: 'bg-rose-50 text-rose-700 border-rose-200', gradient: 'from-rose-500 to-pink-500',
    summary: 'Multiculturalismo, artes integradas, pratica experimental e engajamento comunitario.', lessonRange: [48, 53] },
]

const ALPHA_PILLARS = [
  { num: 1, title: 'Desafios Continuos + Registro Digital', desc: 'O aluno nunca para. Sempre ha um proximo passo.' },
  { num: 2, title: 'Aprendizagem Ativa e Protagonismo', desc: 'O aluno lidera, sugere, cria.' },
  { num: 3, title: 'Aprendizagem entre Pares', desc: 'Alunos avancados mentoram iniciantes.' },
  { num: 4, title: 'Integracao App + Presencial', desc: 'Videos, feedback, comunidade entre as aulas.' },
  { num: 5, title: 'Projetos Coletivos', desc: 'Gravacoes, festivais, bandas experimentais.' },
  { num: 6, title: 'Acompanhamento Individualizado', desc: 'Professor acompanha evolucao via app.' },
  { num: 7, title: 'Feedback e Celebracao Constante', desc: 'Reconhecimento publico, mural digital.' },
  { num: 8, title: 'Espiritualidade, Valores e Cultura Nipo-Brasileira', desc: 'Uniao, respeito, disciplina, alegria.' },
]

const LEARNING_CYCLES = [
  { name: 'Inicial', age: '6-7 anos', color: 'from-green-400 to-emerald-500', methods: ['Orff', 'Dalcroze', 'Waldorf'], desc: 'Exploracao sonora, corpo, jogos, ritmo.' },
  { name: 'Fundamental', age: '8-11 anos', color: 'from-blue-400 to-indigo-500', methods: ['Kodaly', 'Suzuki', 'Gordon', 'Musical Futures'], desc: 'Instrumentos, literacia, improvisacao, grupos.' },
  { name: 'Intermediario', age: '12-14 anos', color: 'from-purple-400 to-violet-500', methods: ['Berklee', 'Lincoln', 'PRESTO'], desc: 'Bandas, performance, digital, autoria.' },
  { name: 'Avancado', age: '15+ anos', color: 'from-rose-400 to-red-500', methods: ['Berklee', 'Digital', 'Mentoria'], desc: 'Producao, empreendedorismo, especializacao.' },
]

interface Lesson {
  id: string
  title: string
  number: number
  lesson_number: number
  status: string
}

export default function CurriculumPage() {
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null)
  const [methodContent, setMethodContent] = useState<Record<string, string>>({})
  const [loadingContent, setLoadingContent] = useState<string | null>(null)
  const [showPillars, setShowPillars] = useState(false)
  const [lessons, setLessons] = useState<Lesson[]>([])

  useEffect(() => {
    supabase.from('v_lessons').select('id, title, number, lesson_number, status').order('lesson_number').then(({ data }) => {
      if (data) setLessons(data as any[])
    })
  }, [])

  async function toggleMethod(key: string) {
    if (expandedMethod === key) {
      setExpandedMethod(null)
      return
    }
    setExpandedMethod(key)

    if (!methodContent[key]) {
      setLoadingContent(key)
      // Load content from database (library_items where subcategory = key)
      const { data } = await (supabase as any)
        .from('v_library_items')
        .select('content')
        .eq('subcategory', key)
        .eq('file_type', 'markdown')
        .not('content', 'is', null)
        .limit(1)
        .single()
      if (data?.content) {
        setMethodContent(prev => ({ ...prev, [key]: data.content }))
      }
      setLoadingContent(null)
    }
  }

  function getLessonsForMethod(m: typeof METHODOLOGIES[0]): Lesson[] {
    const [min, max] = m.lessonRange
    return lessons.filter(l => {
      const num = l.lesson_number ?? l.number
      return num >= min && num <= max
    })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/academic" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-500" />
            Curriculo Completo
          </h1>
          <p className="text-sm text-gray-500 mt-1">Metodo Alpha — 9 metodologias, 4 ciclos, 70 aulas</p>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold nw-tabular">9</p>
            <p className="text-sm text-indigo-200">Metodologias</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold nw-tabular">4</p>
            <p className="text-sm text-indigo-200">Ciclos</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold nw-tabular">70</p>
            <p className="text-sm text-indigo-200">Aulas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold nw-tabular">8</p>
            <p className="text-sm text-indigo-200">Pilares Alpha</p>
          </div>
        </div>
      </div>

      {/* Alpha Pillars */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <button
          onClick={() => setShowPillars(!showPillars)}
          className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h2 className="font-bold text-gray-900">Os 8 Pilares do Metodo Alpha</h2>
              <p className="text-xs text-gray-500">DNA da metodologia Nipo School — eixo transversal de todo o curriculo</p>
            </div>
          </div>
          {showPillars ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </button>
        {showPillars && (
          <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {ALPHA_PILLARS.map(p => (
              <div key={p.num} className="flex items-start gap-3 p-3 bg-red-50/50 rounded-lg border border-red-100">
                <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center text-red-700 font-bold text-xs flex-shrink-0 nw-tabular">
                  {p.num}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{p.title}</p>
                  <p className="text-xs text-gray-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Learning Cycles */}
      <div>
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          Ciclos de Aprendizagem
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {LEARNING_CYCLES.map(cycle => (
            <div key={cycle.name} className="bg-white rounded-xl border border-gray-100 p-4 overflow-hidden relative">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cycle.color}`} />
              <h3 className="font-bold text-gray-900 text-sm mt-1">{cycle.name}</h3>
              <p className="text-xs text-gray-400 mb-2">{cycle.age}</p>
              <p className="text-xs text-gray-600 mb-3">{cycle.desc}</p>
              <div className="flex flex-wrap gap-1">
                {cycle.methods.map(m => (
                  <span key={m} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded font-medium">{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Methodologies */}
      <div>
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Music className="w-5 h-5 text-indigo-500" />
          9 Metodologias
        </h2>
        <div className="space-y-3">
          {METHODOLOGIES.map(m => {
            const Icon = m.icon
            const isExpanded = expandedMethod === m.key
            const methodLessons = getLessonsForMethod(m)
            const isLoading = loadingContent === m.key

            return (
              <div key={m.key} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleMethod(m.key)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${m.color.split(' ').slice(0, 1).join('')} ${m.color.split(' ').slice(1, 2).join('')}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm">{m.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{m.summary}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0"><span className="nw-tabular">{methodLessons.length}</span> aulas</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100">
                    {/* Linked lessons */}
                    {methodLessons.length > 0 && (
                      <div className="px-4 py-3 bg-gray-50/50">
                        <p className="text-xs font-bold text-gray-500 mb-2">Aulas vinculadas:</p>
                        <div className="flex flex-wrap gap-2">
                          {methodLessons.map(l => (
                            <Link
                              key={l.id}
                              href={`/lessons/${l.id}`}
                              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-xs hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                            >
                              <span className="font-bold text-gray-400 nw-tabular">#{l.lesson_number ?? l.number}</span>
                              <span className="text-gray-700 truncate max-w-[200px]">{l.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Full content */}
                    <div className="px-4 py-4">
                      {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                        </div>
                      ) : methodContent[m.key] ? (
                        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                          {methodContent[m.key]}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 text-center py-4">Conteudo nao disponivel.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Complementary chapters */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Capitulos Complementares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            { label: 'PRESTO Project e Ensino Digital', num: 10 },
            { label: 'Experiencias Brasileiras Inovadoras', num: 11 },
            { label: 'Referenciais Internacionais', num: 12 },
            { label: 'Proposta Curricular e Roadmap', num: 13 },
            { label: 'Modelos de Sequencia Didatica', num: 14 },
            { label: 'Avaliacao, Portfolio e Impacto', num: 15 },
            { label: 'Documentos Institucionais', num: 16 },
            { label: 'Capacitacao Docente', num: 17 },
            { label: 'Guia de Adaptacao (ONGs, Igrejas)', num: 18 },
            { label: 'Comunicacao e Engajamento', num: 19 },
          ].map(ch => (
            <Link
              key={ch.num}
              href="/academic/library"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors group"
            >
              <span className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold group-hover:bg-indigo-100 group-hover:text-indigo-600 nw-tabular">
                {ch.num}
              </span>
              <span className="text-sm text-gray-700 group-hover:text-indigo-700">{ch.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
