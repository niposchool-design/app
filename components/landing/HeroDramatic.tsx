import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown, ArrowRight, PlayCircle } from 'lucide-react'

const NOTES = [
  { left: '12%', delay: '0s', dur: '18s', size: 24, glyph: '♪' },
  { left: '24%', delay: '7s', dur: '23s', size: 16, glyph: '♫' },
  { left: '40%', delay: '3s', dur: '20s', size: 28, glyph: '♩' },
  { left: '60%', delay: '10s', dur: '25s', size: 18, glyph: '♬' },
  { left: '74%', delay: '2s', dur: '19s', size: 22, glyph: '♪' },
  { left: '88%', delay: '6s', dur: '22s', size: 16, glyph: '♫' },
]

function SakuraOutline({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.4" className={className} aria-hidden>
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d="M50 52 C64 38 62 16 50 7 C38 16 36 38 50 52 Z" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="3.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function HeroDramatic() {
  return (
    <section className="bg-student p-2 sm:p-3 md:p-4">
      <div className="relative overflow-hidden rounded-[24px] md:rounded-[32px] bg-stone-950 min-h-[90vh] flex flex-col">
        {/* ---- Cena vetorial ---- */}
        <svg
          className="absolute inset-0 w-full h-full nw-scene-in"
          viewBox="0 0 1440 820"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d0a18" />
              <stop offset="40%" stopColor="#241127" />
              <stop offset="72%" stopColor="#5e1a2a" />
              <stop offset="100%" stopColor="#7c1d1d" />
            </linearGradient>
            <radialGradient id="sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff8a6b" />
              <stop offset="45%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#c01818" />
            </radialGradient>
            <linearGradient id="torii" x1="0" y1="0" x2="0.12" y2="1">
              <stop offset="0%" stopColor="#3c0f18" />
              <stop offset="60%" stopColor="#26090f" />
              <stop offset="100%" stopColor="#16060a" />
            </linearGradient>
            <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="26" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="soft"><feGaussianBlur stdDeviation="14" /></filter>
          </defs>

          {/* céu */}
          <rect width="1440" height="820" fill="url(#sky)" />

          {/* estrelas piscando */}
          <g fill="#ffffff">
            <circle cx="140" cy="90" r="1.6" className="nw-twinkle" style={{ animationDuration: '4s' }} />
            <circle cx="300" cy="150" r="1.2" className="nw-twinkle" style={{ animationDuration: '5.5s', animationDelay: '1s' }} />
            <circle cx="520" cy="70" r="1.4" className="nw-twinkle" style={{ animationDuration: '6s', animationDelay: '2s' }} />
            <circle cx="700" cy="58" r="1.2" className="nw-twinkle" style={{ animationDuration: '7s', animationDelay: '1.2s' }} />
            <circle cx="900" cy="108" r="1.3" className="nw-twinkle" style={{ animationDuration: '4.8s', animationDelay: '.5s' }} />
            <circle cx="1120" cy="80" r="1.6" className="nw-twinkle" style={{ animationDuration: '5s', animationDelay: '1.6s' }} />
            <circle cx="1300" cy="160" r="1.2" className="nw-twinkle" style={{ animationDuration: '6.5s', animationDelay: '.8s' }} />
            <circle cx="220" cy="250" r="1" className="nw-twinkle" style={{ animationDuration: '5.2s', animationDelay: '2.4s' }} />
            <circle cx="1000" cy="240" r="1.1" className="nw-twinkle" style={{ animationDuration: '4.4s', animationDelay: '3s' }} />
            <circle cx="1230" cy="300" r="1" className="nw-twinkle" style={{ animationDuration: '5.8s', animationDelay: '2.8s' }} />
          </g>

          {/* névoa alta (deslizando) */}
          <ellipse className="nw-mist" cx="380" cy="190" rx="320" ry="34" fill="#ffffff" opacity="0.05" filter="url(#soft)" />
          <ellipse className="nw-mist" cx="1080" cy="250" rx="380" ry="30" fill="#ffffff" opacity="0.04" filter="url(#soft)" style={{ animationDelay: '-9s' }} />

          {/* sol nascente brilhante (hinomaru) */}
          <g className="nw-sun-pulse" filter="url(#glow)">
            <circle cx="720" cy="492" r="165" fill="url(#sun)" />
          </g>

          {/* serra distante baixa (não cobre o sol) */}
          <path d="M0 690 Q280 640 600 668 Q960 700 1440 648 L1440 820 L0 820 Z" fill="#2a1626" opacity="0.9" />
          {/* névoa baixa diante do sol */}
          <ellipse cx="720" cy="648" rx="980" ry="26" fill="#f8d2c0" opacity="0.07" filter="url(#soft)" />

          {/* torii Myojin grande em SILHUETA escura (nítida contra o sol), fincado na água */}
          <g fill="url(#torii)">
            {/* pilares */}
            <path d="M596 436 L626 436 L640 812 L582 812 Z" />
            <path d="M814 436 L844 436 L858 812 L800 812 Z" />
            {/* nuki (travessa inferior, projeta além dos pilares) */}
            <path d="M544 556 L896 556 L896 592 L544 592 Z" />
            {/* gakuzuka (poste central) */}
            <rect x="710" y="436" width="20" height="120" />
            {/* shimaki (viga sob o telhado) */}
            <path d="M536 408 L904 408 L892 436 L548 436 Z" />
            {/* kasagi (telhado curvo com pontas erguidas) */}
            <path d="M488 406 Q506 356 600 348 Q720 336 840 348 Q934 356 952 406 Q912 380 840 372 Q720 360 600 372 Q528 380 488 406 Z" />
          </g>

          {/* primeiro plano (água escura) com reflexo */}
          <path d="M0 720 Q420 700 820 712 Q1120 722 1440 700 L1440 820 L0 820 Z" fill="#0e070f" />
          <ellipse cx="720" cy="746" rx="170" ry="13" fill="#ef4444" opacity="0.28" filter="url(#soft)" />
        </svg>

        {/* ---- Notas musicais subindo ---- */}
        {NOTES.map((n, i) => (
          <span
            key={i}
            className="nw-note select-none"
            aria-hidden
            style={{ left: n.left, fontSize: n.size, animationDelay: n.delay, animationDuration: n.dur }}
          >
            {n.glyph}
          </span>
        ))}

        {/* ---- Sakura em contorno (acento, como a referência) ---- */}
        <SakuraOutline className="pointer-events-none absolute top-24 left-8 w-20 text-white/[0.08]" />
        <SakuraOutline className="pointer-events-none absolute bottom-16 right-10 w-14 text-white/[0.07] rotate-[18deg]" />
        <SakuraOutline className="pointer-events-none absolute top-1/3 right-[22%] w-9 text-white/[0.06] -rotate-12" />

        {/* ---- Navegação (transparente sobre a cena) ---- */}
        <header className="relative z-10 flex items-center justify-between px-5 sm:px-8 md:px-12 h-20">
          <Image src="/logo-white.png" alt="Nipo School" width={140} height={70} priority className="h-9 w-auto" />
          <nav className="hidden md:flex items-center gap-9 text-sm text-white/80">
            <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
            <a href="#metodo" className="hover:text-white transition-colors">Método</a>
            <a href="#metodologias" className="hover:text-white transition-colors">Metodologias</a>
            <a href="#video" className="hover:text-white transition-colors">Vídeo</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline text-sm font-medium text-white/85 hover:text-white transition-colors">Entrar</Link>
            <Link href="/register" className="text-sm font-semibold bg-student hover:bg-student-dark text-white rounded-full px-5 py-2.5 transition-colors shadow-lg shadow-black/30">
              Criar conta
            </Link>
          </div>
        </header>

        {/* ---- Conteúdo (parte superior; torii ganha o palco abaixo) ---- */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 pt-[5vh] md:pt-[7vh]">
          <p className="nw-rise nw-rise-1 text-sm tracking-[0.4em] text-white/70 mb-6">
            こんにちは · 音楽 · MÚSICA
          </p>
          <h1 className="nw-rise nw-rise-2 text-white font-extrabold tracking-tight leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
            Disciplina japonesa,
            <br />
            <span className="text-white/95">alma brasileira.</span>
          </h1>
          <p className="nw-rise nw-rise-3 mt-7 max-w-xl text-base sm:text-lg text-white/80">
            Escola de música nipo-brasileira para crianças e jovens. Aprenda com o Método Alpha — protagonismo, comunidade e celebração.
          </p>
          <div className="nw-rise nw-rise-4 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register" className="inline-flex items-center gap-2 bg-white text-stone-900 font-bold py-3.5 px-8 rounded-full hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-xl">
              Começar agora <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#video" className="inline-flex items-center gap-2 text-white font-semibold py-3.5 px-7 rounded-full border border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm">
              <PlayCircle className="w-5 h-5" /> Ver o vídeo
            </a>
          </div>
        </div>

        {/* ---- Rodapé do hero: instituição + explorar ---- */}
        <div className="relative z-10 mt-auto flex items-end justify-between px-5 sm:px-8 md:px-12 pb-8 gap-4">
          <div className="text-left">
            <p className="text-white/50 text-[11px] uppercase tracking-[0.25em]">日伯神召会</p>
            <p className="text-white/75 text-xs sm:text-sm font-medium mt-1">Assembleia de Deus Nipo Brasileira</p>
          </div>
          <a href="#sobre" className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
            <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center animate-bounce-slow">
              <ArrowDown className="w-4 h-4" />
            </span>
            <span className="text-[11px] tracking-widest uppercase">explorar</span>
          </a>
          <div className="w-24 hidden sm:block" aria-hidden />
        </div>
      </div>
    </section>
  )
}
