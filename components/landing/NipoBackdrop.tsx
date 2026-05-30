/**
 * Cena cinematográfica reutilizável do Nipo Wa (sol nascente + torii em silhueta
 * + montanhas + estrelas + notas musicais). Preenche o elemento pai (absolute inset-0).
 * Usada no hero e na entrada do app (auth) para manter o mesmo padrão visual.
 */
const NOTES = [
  { left: '14%', delay: '0s', dur: '19s', size: 20, glyph: '♪' },
  { left: '32%', delay: '6s', dur: '24s', size: 14, glyph: '♫' },
  { left: '54%', delay: '3s', dur: '21s', size: 22, glyph: '♩' },
  { left: '76%', delay: '9s', dur: '23s', size: 16, glyph: '♬' },
  { left: '88%', delay: '2s', dur: '20s', size: 18, glyph: '♪' },
]

export function NipoBackdrop({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full nw-scene-in" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="nb-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d0a18" />
            <stop offset="40%" stopColor="#241127" />
            <stop offset="72%" stopColor="#5e1a2a" />
            <stop offset="100%" stopColor="#7c1d1d" />
          </linearGradient>
          <radialGradient id="nb-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff8a6b" />
            <stop offset="45%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#c01818" />
          </radialGradient>
          <linearGradient id="nb-torii" x1="0" y1="0" x2="0.12" y2="1">
            <stop offset="0%" stopColor="#3c0f18" />
            <stop offset="60%" stopColor="#26090f" />
            <stop offset="100%" stopColor="#16060a" />
          </linearGradient>
          <filter id="nb-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="26" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="nb-soft"><feGaussianBlur stdDeviation="14" /></filter>
        </defs>

        <rect width="1440" height="820" fill="url(#nb-sky)" />

        <g fill="#ffffff">
          <circle cx="180" cy="90" r="1.5" className="nw-twinkle" style={{ animationDuration: '4s' }} />
          <circle cx="420" cy="140" r="1.2" className="nw-twinkle" style={{ animationDuration: '5.5s', animationDelay: '1s' }} />
          <circle cx="700" cy="70" r="1.3" className="nw-twinkle" style={{ animationDuration: '6s', animationDelay: '2s' }} />
          <circle cx="980" cy="120" r="1.4" className="nw-twinkle" style={{ animationDuration: '4.8s', animationDelay: '.6s' }} />
          <circle cx="1230" cy="90" r="1.3" className="nw-twinkle" style={{ animationDuration: '5s', animationDelay: '1.6s' }} />
          <circle cx="300" cy="250" r="1" className="nw-twinkle" style={{ animationDuration: '5.2s', animationDelay: '2.4s' }} />
          <circle cx="1080" cy="240" r="1.1" className="nw-twinkle" style={{ animationDuration: '4.4s', animationDelay: '3s' }} />
        </g>

        {/* sol */}
        <g className="nw-sun-pulse" filter="url(#nb-glow)">
          <circle cx="720" cy="492" r="165" fill="url(#nb-sun)" />
        </g>

        {/* serra distante */}
        <path d="M0 690 Q280 640 600 668 Q960 700 1440 648 L1440 820 L0 820 Z" fill="#2a1626" opacity="0.9" />
        <ellipse cx="720" cy="648" rx="980" ry="26" fill="#f8d2c0" opacity="0.07" filter="url(#nb-soft)" />

        {/* torii em silhueta */}
        <g fill="url(#nb-torii)">
          <path d="M596 436 L626 436 L640 812 L582 812 Z" />
          <path d="M814 436 L844 436 L858 812 L800 812 Z" />
          <path d="M544 556 L896 556 L896 592 L544 592 Z" />
          <rect x="710" y="436" width="20" height="120" />
          <path d="M536 408 L904 408 L892 436 L548 436 Z" />
          <path d="M488 406 Q506 356 600 348 Q720 336 840 348 Q934 356 952 406 Q912 380 840 372 Q720 360 600 372 Q528 380 488 406 Z" />
        </g>

        {/* água + reflexo */}
        <path d="M0 720 Q420 700 820 712 Q1120 722 1440 700 L1440 820 L0 820 Z" fill="#0e070f" />
        <ellipse cx="720" cy="746" rx="170" ry="13" fill="#ef4444" opacity="0.28" filter="url(#nb-soft)" />
      </svg>

      {/* notas musicais subindo */}
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
    </div>
  )
}
