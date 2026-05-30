import Image from 'next/image'
import { NipoBackdrop } from '@/components/landing/NipoBackdrop'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-stone-950 lg:grid lg:grid-cols-2">
      {/* Painel cinematográfico (desktop, fixo enquanto o form rola) */}
      <aside className="relative hidden lg:flex flex-col items-center justify-center overflow-hidden p-12 lg:sticky lg:top-0 lg:h-screen">
        <NipoBackdrop />
        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          <Image src="/logo-white.png" alt="Nipo School" width={260} height={320} priority className="w-48 h-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]" />
          <p className="text-xl font-semibold text-white drop-shadow">Disciplina japonesa, alma brasileira.</p>
          <p className="text-sm text-white/60 tracking-wide">日伯神召会 · Assembleia de Deus Nipo Brasileira</p>
        </div>
      </aside>

      {/* Formulário */}
      <div className="relative flex items-center justify-center p-4 min-h-screen overflow-hidden bg-stone-950">
        {/* brilho vermelho sutil de fundo */}
        <div className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-student/10 blur-3xl" />
        {/* logo no topo (somente mobile, já que o painel some) */}
        <div className="w-full max-w-md relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}
