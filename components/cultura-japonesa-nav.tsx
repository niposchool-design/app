import { Music, BookOpen, Award, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CulturaJaponesaNav() {
  const secoes = [
    {
      href: '/alunos/historia',
      icon: Music,
      titulo: '🎌 História Musical Japonesa',
      descricao: 'Do Gagaku imperial ao J-Pop moderno',
      cor: 'from-red-500 to-pink-600',
      destaque: true
    },
    {
      href: '/alunos/instrumentos',
      icon: Sparkles,
      titulo: '🎵 Instrumentos Tradicionais',
      descricao: 'Koto, Shamisen, Shakuhachi e mais',
      cor: 'from-purple-500 to-indigo-600'
    },
    {
      href: '/alunos/aulas',
      icon: BookOpen,
      titulo: '📚 Aulas & Teoria',
      descricao: 'Aprenda técnicas e teoria musical',
      cor: 'from-blue-500 to-cyan-600'
    },
    {
      href: '/alunos/portfolio',
      icon: Award,
      titulo: '⭐ Seu Progresso',
      descricao: 'Acompanhe sua jornada musical',
      cor: 'from-orange-500 to-yellow-500'
    }
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {secoes.map((secao) => (
        <Link key={secao.href} href={secao.href}>
          <Card className={`
            group hover:scale-105 transition-all cursor-pointer overflow-hidden
            ${secao.destaque ? 'ring-4 ring-yellow-400 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
          `}>
            <div className={`h-32 bg-gradient-to-br ${secao.cor} relative`}>
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <secao.icon className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform" />
              </div>
              {secao.destaque && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                  FOCO PRINCIPAL
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-bold">{secao.titulo}</CardTitle>
              <CardDescription>{secao.descricao}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function BannerTradicaoOriental() {
  return (
    <div className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 text-white rounded-3xl p-8 shadow-2xl mb-8">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black flex items-center justify-center gap-3">
          <span>🎌</span>
          <span>Nipo School</span>
          <span>🎵</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/95 font-medium">
          Tradição Musical Japonesa ao Alcance de Todos
        </p>
        <p className="text-white/80 max-w-2xl mx-auto">
          Mergulhe na rica herança da música japonesa - do Gagaku da corte imperial aos ritmos modernos do J-Pop.
          Aprenda com professores qualificados e explore instrumentos tradicionais em uma experiência completa.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {[
            { emoji: '🎎', text: 'Cultura Autêntica' },
            { emoji: '🎓', text: 'Professores Certificados' },
            { emoji: '🎼', text: 'Método Interativo' },
            { emoji: '🏆', text: 'Certificação' }
          ].map((item) => (
            <div key={item.text} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              {item.emoji} {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
