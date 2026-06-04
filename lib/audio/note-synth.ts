/* Sintetizador de notas leve (Web Audio API) — sem arquivos, sem rede.
   Toca a nota detectada no título do som (PT/EN). Fallback: tom neutro.
   Um único AudioContext (criado no 1º gesto do usuário). */

let ctx: AudioContext | null = null
function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

// semitom relativo a Dó (C=0)
const SEMI: Record<string, number> = {
  c: 0, 'do': 0, d: 2, re: 2, e: 4, mi: 4, f: 5, fa: 5, g: 7, sol: 7, a: 9, la: 9, b: 11, si: 11,
}

/** Extrai a frequência (Hz) a partir do título do som. */
export function freqFromTitle(title: string): number {
  const t = (title || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // remove acentos
  const octave = (t.match(/([1-7])\b/) || [])[1]
  const oct = octave ? parseInt(octave, 10) : 4

  // nota PT multi-letra primeiro (sol, do, re, mi, fa, la, si), depois EN (a-g)
  const m = t.match(/\b(sol|do|re|mi|fa|la|si)\b/) || t.match(/(?:^|[^a-z])([a-g])(?![a-z])/)
  let base = m ? SEMI[m[1]] : 9 // default A
  if (base == null) base = 9

  // acidente: #/sustenido sobe 1; b/bemol desce 1
  if (/#|sustenid/.test(t)) base += 1
  else if (/\bbemol\b|♭/.test(t)) base -= 1

  const midi = (oct + 1) * 12 + base // C4 => 60
  return 440 * Math.pow(2, (midi - 69) / 12)
}

/** Toca uma nota curta e agradável. Retorna a duração (ms) ou 0 se indisponível. */
export function playNote(title: string, durationMs = 1100): number {
  const ac = getCtx()
  if (!ac) return 0
  const now = ac.currentTime
  const dur = durationMs / 1000
  const freq = freqFromTitle(title)

  const master = ac.createGain()
  master.connect(ac.destination)
  // envelope: attack rápido, release suave
  master.gain.setValueAtTime(0.0001, now)
  master.gain.exponentialRampToValueAtTime(0.28, now + 0.02)
  master.gain.exponentialRampToValueAtTime(0.16, now + dur * 0.5)
  master.gain.exponentialRampToValueAtTime(0.0001, now + dur)

  // 2 osciladores levemente desafinados = timbre mais quente
  const o1 = ac.createOscillator()
  o1.type = 'triangle'; o1.frequency.value = freq
  const o2 = ac.createOscillator()
  o2.type = 'sine'; o2.frequency.value = freq; o2.detune.value = +6
  o1.connect(master); o2.connect(master)
  o1.start(now); o2.start(now)
  o1.stop(now + dur + 0.05); o2.stop(now + dur + 0.05)
  return durationMs
}

/** Se o audio_url for um arquivo real (http/https), devolve a URL; senão null. */
export function realAudioUrl(url: string | null): string | null {
  if (!url) return null
  return /^https?:\/\//i.test(url) ? url : null
}
