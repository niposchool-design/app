import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { HeroDramatic } from '@/components/landing/HeroDramatic'
import { Reveal } from '@/components/landing/Reveal'

const PILARES = [
  { n: '01', t: 'Desafios semanais', d: 'Práticas registradas no app e compartilhadas no mural digital.' },
  { n: '02', t: 'Protagonismo', d: 'O aluno lidera, sugere e cria; o professor é mentor.' },
  { n: '03', t: 'Aprender em grupo', d: 'Peer learning: avançados ajudam iniciantes — todos crescem juntos.' },
  { n: '04', t: 'App + presencial', d: 'A tecnologia conecta teoria, prática e comunidade entre as aulas.' },
  { n: '05', t: 'Projetos coletivos', d: 'Gravações, festivais, bandas e apresentações no centro do processo.' },
  { n: '06', t: 'Acompanhamento individual', d: 'Evolução monitorada, desafios sob medida, famílias envolvidas.' },
  { n: '07', t: 'Feedback e celebração', d: 'Cada conquista é reconhecida e comemorada — sempre.' },
  { n: '08', t: 'Cultura nipo-brasileira', d: 'União, respeito, disciplina e alegria permeiam a jornada.' },
]

const METODOLOGIAS: [string, string][] = [
  ['Orff-Schulwerk', 'Ritmo, corpo e percussão como ponto de partida.'],
  ['Suzuki', 'Aprender música como se aprende a língua materna.'],
  ['Kodály', 'Canto, solfejo e ouvido afinado.'],
  ['Musical Futures', 'Música popular e aprendizagem informal.'],
  ['Dalcroze', 'Movimento e euritmia — o corpo sente o som.'],
  ['Gordon', 'Audiation: pensar e ouvir internamente a música.'],
  ['Waldorf', 'Arte integral e desenvolvimento humano.'],
  ['Berklee', 'Abordagem contemporânea, criação e autoria.'],
  ['Lincoln Center', 'Artes integradas e imaginação criativa.'],
]

function KanjiAccent({ children, tone = 'dark' }: { children: string; tone?: 'dark' | 'light' }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 font-extrabold leading-none select-none ${tone === 'light' ? 'text-student/[0.06]' : 'text-student/[0.08]'}`}
      style={{ writingMode: 'vertical-rl', fontSize: '9rem' }}
    >
      {children}
    </span>
  )
}

export default function Home() {
  return (
    <main className="bg-stone-950 text-stone-200">
      <HeroDramatic />

      {/* ---- Sobre / Manifesto (IVORY) ---- */}
      <section id="sobre" className="relative py-28 px-6 overflow-hidden bg-ivory">
        <KanjiAccent tone="light">音楽</KanjiAccent>
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="text-student tracking-[0.35em] text-xs font-semibold uppercase mb-5">和 · Sobre</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
            Mais que aulas — um jeito de viver a música.
          </h2>
          <p className="mt-7 text-lg text-stone-600 leading-relaxed">
            A Nipo School é uma escola comunitária nipo-brasileira que une a pedagogia japonesa
            (Kaizen, Wa, Shoshin) a nove metodologias musicais ativas. Aqui, todo aluno tem um
            próximo passo — sempre — com protagonismo, colaboração, feedback e celebração.
          </p>
        </Reveal>
      </section>

      {/* ---- Método Alpha (DARK, 8 pilares) ---- */}
      <section id="metodo" className="relative py-28 px-6 bg-stone-950">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-student tracking-[0.35em] text-xs font-semibold uppercase mb-4">アルファ · Método</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">O Método Alpha</h2>
            <p className="mt-3 text-stone-400">O DNA pedagógico — oito pilares em cada aula.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] rounded-2xl overflow-hidden">
            {PILARES.map((p, i) => (
              <Reveal key={p.n} delay={(i % 4) * 90}>
                <div className="bg-stone-950 p-7 h-full hover:bg-stone-900 transition-colors duration-300">
                  <span className="nw-tabular text-student text-sm font-semibold">{p.n}</span>
                  <h3 className="mt-3 text-white font-bold text-lg">{p.t}</h3>
                  <p className="mt-2 text-sm text-stone-400 leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Metodologias (IVORY, lista editorial) ---- */}
      <section id="metodologias" className="relative py-28 px-6 overflow-hidden bg-ivory">
        <KanjiAccent tone="light">方法</KanjiAccent>
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <p className="text-student tracking-[0.35em] text-xs font-semibold uppercase mb-4">九 · Metodologias</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900">Nove metodologias, um caminho.</h2>
            <p className="mt-3 text-stone-600">A síntese das melhores abordagens musicais do mundo.</p>
          </Reveal>
          <div className="border-t border-stone-200">
            {METODOLOGIAS.map(([name, desc], i) => (
              <Reveal key={name} delay={(i % 3) * 70}>
                <div className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-6 border-b border-stone-200">
                  <span className="nw-tabular text-student/80 text-sm w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-stone-900 text-xl md:text-2xl font-bold sm:w-72 shrink-0 group-hover:text-student transition-colors">{name}</span>
                  <span className="text-stone-600 text-sm">{desc}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Vídeo (DARK) ---- */}
      <section id="video" className="py-28 px-6 bg-stone-950">
        <Reveal className="max-w-4xl mx-auto text-center">
          <p className="text-student tracking-[0.35em] text-xs font-semibold uppercase mb-4">映像 · Vídeo</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10">Veja a Nipo School em movimento</h2>
          <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/50">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/V9Q7RwJIxHQ"
              title="Nipo School"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>

      {/* ---- Celebração (IVORY/warm, sakura) ---- */}
      <section className="relative py-28 px-6 overflow-hidden bg-rose-50">
        <KanjiAccent tone="light">祝</KanjiAccent>
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="text-sakura-dark tracking-[0.35em] text-xs font-semibold uppercase mb-5">祝 · Celebração</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
            Cada conquista, uma flor que desabrocha.
          </h2>
          <p className="mt-7 text-lg text-stone-600 leading-relaxed">
            Feedback e celebração são constantes. Pontos, conquistas e o mural digital transformam
            cada pequeno avanço em motivo de orgulho — porque celebrar o progresso é parte do método.
          </p>
        </Reveal>
      </section>

      {/* ---- Instituição (DARK) ---- */}
      <section className="py-24 px-6 bg-stone-950 border-t border-white/5">
        <Reveal className="max-w-4xl mx-auto text-center">
          <p className="text-student/70 text-xs tracking-[0.35em] font-semibold">日伯神召会</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-3">
            Um projeto da Assembleia de Deus Nipo Brasileira
          </h2>
          <p className="mt-4 text-stone-400 leading-relaxed">
            Educação musical como missão comunitária — disciplina, fé e cultura nipo-brasileira
            ao alcance de cada criança e jovem.
          </p>
        </Reveal>
      </section>

      {/* ---- CTA final (VERMELHO) ---- */}
      <section className="relative py-28 px-6 text-center bg-student text-white overflow-hidden">
        <Reveal className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Pronto para começar sua jornada musical?</h2>
          <p className="mt-5 text-white/85 text-lg">Junte-se à comunidade Nipo School.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/register" className="inline-flex items-center gap-2 bg-white text-student font-bold py-3.5 px-8 rounded-full hover:bg-stone-100 transition-all hover:-translate-y-0.5">
              Criar conta gratuita <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login" className="inline-flex items-center text-white font-semibold py-3.5 px-7 rounded-full border border-white/40 hover:bg-white/10 transition-all">
              Entrar
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---- Rodapé (DARK) ---- */}
      <footer className="bg-stone-950 border-t border-white/5 py-12 px-6 text-stone-400 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo-white.png" alt="Nipo School" width={160} height={80} className="h-10 w-auto" />
            <div>
              <p className="text-white font-medium">Nipo School</p>
              <p className="text-xs text-stone-500">Disciplina japonesa, alma brasileira.</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-stone-500">日伯神召会 · Assembleia de Deus Nipo Brasileira</p>
            <div className="flex gap-6 mt-3 justify-center md:justify-end">
              <Link href="/login" className="hover:text-white transition-colors">Entrar</Link>
              <Link href="/register" className="hover:text-white transition-colors">Criar conta</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
