import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Music, 
  Users, 
  BookOpen, 
  Award, 
  Play, 
  Heart,
  Star,
  ChevronRight,
  Check,
  Volume2,
  Mic,
  Headphones
} from 'lucide-react';

// Componentes padronizados Nipo School
import { 
  NipoBackground, 
  NipoContainer, 
  NipoSection,
  NipoGrid,
  NipoCard,
  NipoButton
} from '../shared/components/ui/NipoUI'; 

// Logo oficial
import { NipoLandingLogo } from '../shared/components/ui/NipoLogo'; 

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Music,
      title: "Múltiplos Instrumentos",
      description: "Aprenda piano, violão, bateria, canto e muito mais com metodologias especializadas",
      emoji: "🎹"
    },
    {
      icon: Users,
      title: "Professores Especializados", 
      description: "Equipe qualificada com experiência em educação musical e metodologias ativas",
      emoji: "👨‍🎓"
    },
    {
      icon: BookOpen,
      title: "Metodologias Comprovadas",
      description: "Orff, Suzuki, Kodály e Musical Futures integradas em um só lugar",
      emoji: "📚"
    },
    {
      icon: Award,
      title: "Sistema Gamificado",
      description: "Conquistas, pontos e progressão que tornam o aprendizado mais divertido",
      emoji: "🏆"
    }
  ];

  const metodologias = [
    {
      nome: "Orff Schulwerk",
      descricao: "Aprendizado através do movimento, criatividade e instrumentos de percussão",
      emoji: "🎭",
      cor: "from-blue-500 to-indigo-500"
    },
    {
      nome: "Método Suzuki", 
      descricao: "Aprendizado natural como uma língua materna, começando pela escuta",
      emoji: "🎎",
      cor: "from-green-500 to-emerald-500"
    },
    {
      nome: "Musical Futures",
      descricao: "Aprendizado informal e colaborativo, baseado em música popular",
      emoji: "🎪",
      cor: "from-purple-500 to-pink-500"
    },
    {
      nome: "Kodály",
      descricao: "Desenvolvimento da musicalidade interior através do canto e solfejo",
      emoji: "🎨",
      cor: "from-orange-500 to-red-500"
    }
  ];

  const depoimentos = [
    {
      nome: "Maria Silva",
      papel: "Aluna de Piano",
      texto: "O Nipo School transformou minha relação com a música. As aulas são dinâmicas e o sistema de conquistas me motiva todos os dias!",
      estrelas: 5
    },
    {
      nome: "João Santos",
      papel: "Professor de Violão", 
      texto: "A plataforma facilita muito meu trabalho. Posso acompanhar o progresso dos alunos e usar diferentes metodologias de forma integrada.",
      estrelas: 5
    },
    {
      nome: "Ana Costa",
      papel: "Mãe de Aluna",
      texto: "Minha filha adora as aulas! O método japonês realmente funciona, ela está aprendendo de forma natural e divertida.",
      estrelas: 5
    }
  ];

  return (
    <NipoBackground>
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-red-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <NipoLandingLogo />
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#recursos" className="text-gray-600 hover:text-red-600 transition-colors">
                Recursos
              </a>
              <a href="#metodologias" className="text-gray-600 hover:text-red-600 transition-colors">
                Metodologias
              </a>
              <a href="#depoimentos" className="text-gray-600 hover:text-red-600 transition-colors">
                Depoimentos
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <NipoButton
                variant="ghost"
                onClick={() => navigate('/login')}
              >
                Entrar
              </NipoButton>
              <NipoButton
                variant="primary"
                onClick={() => navigate('/register')}
              >
                Começar Agora
              </NipoButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <NipoContainer>
          <div className="text-center">
            {/* Espaço para Logo da Escola */}
            <div className="mb-8">
              <div className="w-32 h-32 bg-white rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl border-4 border-gray-100">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎵</div>
                  <p className="text-xs text-gray-500 font-medium">LOGO DA</p>
                  <p className="text-xs text-gray-500 font-bold">ESCOLA</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Em parceria com sua escola de música
              </p>
            </div>

            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
              Transforme sua 
              <span className="block text-red-600 font-bold">
                Jornada Musical
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Plataforma completa de ensino musical que combina metodologias japonesas comprovadas 
              com tecnologia moderna para uma experiência de aprendizado única e envolvente.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <NipoButton
                size="large"
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto"
              >
                Começar Gratuitamente
                <ChevronRight className="w-5 h-5 ml-2" />
              </NipoButton>
              
              <button 
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => document.querySelector('#recursos').scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-5 h-5" />
                <span>Ver Demonstração</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">23+</div>
                <div className="text-sm text-gray-600">Instrumentos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Módulos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">4</div>
                <div className="text-sm text-gray-600">Metodologias</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Gamificado</div>
              </div>
            </div>
          </div>
        </NipoContainer>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 bg-white/50">
        <NipoContainer>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o Nipo School?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Uma plataforma completa que revoluciona o ensino musical
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <NipoCard
                key={index}
                className={`text-center p-8 transition-all duration-300 cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-red-500 shadow-xl' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="text-4xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </NipoCard>
            ))}
          </div>
        </NipoContainer>
      </section>

      {/* Metodologias Section */}
      <section id="metodologias" className="py-20">
        <NipoContainer>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Metodologias Integradas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              As melhores abordagens pedagógicas musicais do mundo em uma só plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {metodologias.map((metodologia, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${metodologia.cor} rounded-2xl flex items-center justify-center text-2xl`}>
                    {metodologia.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {metodologia.nome}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {metodologia.descricao}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </NipoContainer>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="py-20 bg-white/50">
        <NipoContainer>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que dizem sobre nós
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experiências reais de quem já faz parte da comunidade Nipo School
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <NipoCard key={index} className="p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(depoimento.estrelas)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{depoimento.texto}"
                </p>
                
                <div>
                  <p className="font-semibold text-gray-900">
                    {depoimento.nome}
                  </p>
                  <p className="text-sm text-gray-600">
                    {depoimento.papel}
                  </p>
                </div>
              </NipoCard>
            ))}
          </div>
        </NipoContainer>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <NipoContainer>
          <div className="text-center">
            <div className="text-6xl mb-6">🎵</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pronto para começar sua jornada musical?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Junte-se a milhares de estudantes que já transformaram suas vidas através da música
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <NipoButton
                size="large"
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto"
              >
                Criar Conta Gratuita
              </NipoButton>
              
              <NipoButton
                variant="outline"
                size="large"
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto"
              >
                Já tenho conta
              </NipoButton>
            </div>
          </div>
        </NipoContainer>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <NipoContainer>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e descrição */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <NipoLandingLogo color="#ffffff" />
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Revolucionando o ensino musical através da combinação de metodologias japonesas 
                comprovadas com tecnologia moderna.
              </p>
              <p className="text-red-400 font-medium text-sm">
                🎵 "Se não for divertido, ninguém aprende. Se não for fácil, ninguém começa."
              </p>
            </div>

            {/* Links úteis */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Recursos</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Instrumentos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Metodologias</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Centro de Estudos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sistema Gamificado</a></li>
              </ul>
            </div>

            {/* Suporte */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Nipo School. Todos os direitos reservados. • ADNIPO Suzano</p>
          </div>
        </NipoContainer>
      </footer>

      {/* Floating Musical Notes */}
      <div className="fixed top-1/4 left-4 text-red-200 text-2xl animate-bounce opacity-30 pointer-events-none">
        🎵
      </div>
      <div className="fixed top-1/3 right-8 text-red-200 text-xl animate-bounce opacity-30 pointer-events-none" style={{animationDelay: '1s'}}>
        🎶
      </div>
      <div className="fixed bottom-1/3 left-8 text-red-200 text-lg animate-bounce opacity-30 pointer-events-none" style={{animationDelay: '2s'}}>
        🎼
      </div>
    </NipoBackground>
  );
};

export default LandingPage;