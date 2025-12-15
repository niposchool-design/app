import React from 'react'
import { 
  Card, CardHeader, CardContent, CardTitle, CardDescription,
  Button, Input 
} from '../../../components/ui'
import { 
  NipoLogo, ThemeToggle, ProgressCircle, AchievementCard, 
  StatsCard, PhilosophyQuote, AchievementGrid, StatsGrid,
  QRPresenceSystem, RealTimeCollaboration 
} from '../../../components/nipo'
import { 
  BookOpen, Users, Trophy, TrendingUp, Star, Award,
  Mail, Lock, User, Search 
} from 'lucide-react'

export default function ComponentShowcase() {
  return (
    <div className="min-h-screen bg-nipo-zen-50 dark:bg-nipo-zen-900 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* 🎌 Header */}
        <div className="text-center space-y-4">
          <NipoLogo variant="full" size="xl" />
          <h1 className="text-4xl font-zen font-bold text-nipo-zen-900 dark:text-white">
            Sistema de Design Japonês
          </h1>
          <p className="text-lg text-nipo-zen-600 dark:text-nipo-zen-400">
            Demonstração completa dos componentes Nipo School
          </p>
          <ThemeToggle variant="zen" size="lg" showLabel />
        </div>

        {/* 🎨 Cards Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-zen font-bold text-nipo-zen-900 dark:text-white">
            🎨 Sistema de Cards
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Default Card */}
            <Card>
              <CardHeader>
                <CardTitle>Card Padrão</CardTitle>
                <CardDescription>Design básico e limpo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-nipo-zen-700 dark:text-nipo-zen-300">
                  Este é um card padrão com bordas suaves e sombra zen.
                </p>
              </CardContent>
            </Card>

            {/* Student Card */}
            <Card role="student" philosophy="kaizen" interactive>
              <CardHeader>
                <CardTitle>Card Estudante</CardTitle>
                <CardDescription>Filosofia Kaizen</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-nipo-zen-700 dark:text-nipo-zen-300">
                  Card com cores de estudante e animação Kaizen.
                </p>
              </CardContent>
            </Card>

            {/* Zen Card */}
            <Card variant="zen" philosophy="zen" glow>
              <CardHeader>
                <CardTitle>Card Zen</CardTitle>
                <CardDescription>Variante zen com efeito de brilho</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-nipo-zen-700 dark:text-nipo-zen-300">
                  Design zen com gradientes sutis e animações suaves.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 🔲 Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-zen font-bold text-nipo-zen-900 dark:text-white">
            🔲 Sistema de Botões
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primário</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="zen" philosophy="zen">Zen</Button>
            <Button role="student" philosophy="kaizen">Estudante</Button>
            <Button role="professor" philosophy="zen">Professor</Button>
            <Button role="admin" philosophy="wabi-sabi">Admin</Button>
            <Button isLoading>Carregando...</Button>
          </div>
        </section>

        {/* 📝 Inputs Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-zen font-bold text-nipo-zen-900 dark:text-white">
            📝 Sistema de Inputs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Email" 
              placeholder="seu@email.com" 
              leftIcon={<Mail />}
              type="email"
            />
            <Input 
              label="Senha" 
              placeholder="Digite sua senha" 
              type="password"
              showPasswordToggle
              leftIcon={<Lock />}
            />
            <Input 
              label="Nome de usuário" 
              placeholder="Digite seu nome" 
              leftIcon={<User />}
              role="student"
              philosophy="kaizen"
            />
            <Input 
              label="Buscar" 
              placeholder="Buscar cursos..." 
              variant="zen"
              leftIcon={<Search />}
              philosophy="zen"
            />
          </div>
        </section>

        {/* 📊 Stats Cards Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-zen font-bold text-nipo-zen-900 dark:text-white">
            📊 Cards de Estatísticas
          </h2>
          
          <StatsGrid columns={4}>
            <StatsCard
              title="Estudantes Ativos"
              value="2,847"
              trend="up"
              trendValue="+12%"
              icon={<Users className="w-6 h-6" />}
              role="student"
            />
            <StatsCard
              title="Cursos Concluídos"
              value="156"
              trend="up"
              trendValue="+8%"
              icon={<BookOpen className="w-6 h-6" />}
              role="professor"
              variant="gradient"
            />
            <StatsCard
              title="Taxa de Aprovação"
              value="94.2%"
              trend="neutral"
              icon={<Trophy className="w-6 h-6" />}
              role="admin"
            />
            <StatsCard
              title="Crescimento Mensal"
              value="+23%"
              trend="up"
              trendValue="+5%"
              icon={<TrendingUp className="w-6 h-6" />}
              variant="detailed"
            />
          </StatsGrid>
        </section>

        {/* 🔄 Progress Circles Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-zen font-bold text-nipo-zen-900 dark:text-white">
            🔄 Círculos de Progresso
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-8">
            <ProgressCircle 
              value={75} 
              size="sm" 
              role="student" 
              label="Kaizen" 
              showLabel 
            />
            <ProgressCircle 
              value={92} 
              size="md" 
              role="professor" 
              label="Zen" 
              showLabel 
            />
            <ProgressCircle 
              value={68} 
              size="lg" 
              role="admin" 
              label="Wabi-Sabi" 
              showLabel 
            />
            <ProgressCircle 
              value={100} 
              size="xl" 
              philosophy="zen" 
              label="Perfeição" 
              showLabel 
            />
          </div>
        </section>

        {/* 🏆 Achievement Cards Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-zen font-bold text-nipo-zen-900 dark:text-white">
            🏆 Cards de Conquistas
          </h2>
          
          <AchievementGrid columns={3}>
            <AchievementCard
              title="Primeiro Curso"
              description="Complete seu primeiro curso de música"
              type="bronze"
              unlocked={true}
              role="student"
            />
            <AchievementCard
              title="Mestre do Ritmo"
              description="Domine 10 exercícios de ritmo consecutivos"
              type="gold"
              unlocked={true}
              progress={85}
              role="professor"
            />
            <AchievementCard
              title="Sensei Supremo"
              description="Alcance nível máximo de ensino"
              type="diamond"
              unlocked={false}
              progress={45}
              role="admin"
            />
          </AchievementGrid>
        </section>

        {/* 💭 Philosophy Quotes Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-zen font-bold text-nipo-zen-900 dark:text-white">
            💭 Citações Filosóficas
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PhilosophyQuote 
              philosophy="kaizen" 
              variant="card" 
              autoRotate={false}
            />
            <PhilosophyQuote 
              philosophy="zen" 
              variant="banner" 
              autoRotate={false}
            />
          </div>
        </section>

        {/* 🎨 Theme Variations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-zen font-bold text-nipo-zen-900 dark:text-white">
            🎨 Variações de Tema
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="glass" className="backdrop-blur-md">
              <CardContent className="text-center p-8">
                <h3 className="text-xl font-zen font-bold mb-2">Glass Morphism</h3>
                <p className="text-nipo-zen-600 dark:text-nipo-zen-400">
                  Efeito de vidro com blur de fundo
                </p>
              </CardContent>
            </Card>
            
            <Card variant="outlined" interactive>
              <CardContent className="text-center p-8">
                <h3 className="text-xl font-zen font-bold mb-2">Outlined</h3>
                <p className="text-nipo-zen-600 dark:text-nipo-zen-400">
                  Bordas marcadas, fundo transparente
                </p>
              </CardContent>
            </Card>
            
            <Card variant="elevated" philosophy="wabi-sabi">
              <CardContent className="text-center p-8">
                <h3 className="text-xl font-zen font-bold mb-2">Elevated</h3>
                <p className="text-nipo-zen-600 dark:text-nipo-zen-400">
                  Sombra elevada com hover suave
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 🚀 Semana 2 - Componentes Avançados */}
        <section className="space-y-8">
          <h2 className="text-3xl font-zen font-bold text-nipo-zen-900 dark:text-white text-center">
            🚀 Semana 2 - Componentes Avançados
          </h2>
          
          {/* QR Presence System */}
          <div className="space-y-4">
            <h3 className="text-2xl font-zen font-bold text-nipo-zen-900 dark:text-white">
              📱 Sistema QR de Presença
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Professor View */}
              <div className="space-y-4">
                <h4 className="text-lg font-zen font-semibold text-matcha-700">
                  👨‍🏫 Visão do Professor
                </h4>
                <QRPresenceSystem 
                  aulaId="demo-aula-1" 
                  professorId="demo-prof-1"
                  isStudent={false}
                />
              </div>
              
              {/* Student View */}
              <div className="space-y-4">
                <h4 className="text-lg font-zen font-semibold text-sakura-700">
                  🎓 Visão do Aluno
                </h4>
                <QRPresenceSystem 
                  aulaId="demo-aula-1"
                  isStudent={true}
                />
              </div>
            </div>
          </div>

          {/* Real-Time Collaboration */}
          <div className="space-y-4">
            <h3 className="text-2xl font-zen font-bold text-nipo-zen-900 dark:text-white">
              🔴 Colaboração em Tempo Real
            </h3>
            <p className="text-nipo-zen-600 dark:text-nipo-zen-400">
              Sistema completo de colaboração musical com chat, sincronização e controles de mídia
            </p>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl">
              <RealTimeCollaboration 
                sessionId="demo-session-1"
                userRole="professor"
              />
            </div>
          </div>

          {/* Dashboard Evolution Preview */}
          <div className="space-y-4">
            <h3 className="text-2xl font-zen font-bold text-nipo-zen-900 dark:text-white">
              📊 Evoluções dos Dashboards
            </h3>
            <p className="text-nipo-zen-600 dark:text-nipo-zen-400">
              Os dashboards foram evoluídos com design japonês específico por role
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-sakura-50 to-cherry-50 border-sakura-200">
                <CardHeader>
                  <CardTitle className="text-sakura-700 flex items-center gap-2">
                    🎓 AlunoDashboard
                  </CardTitle>
                  <CardDescription>Layout Ultra-Leve</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-sakura-700">
                    <li>• Design sakura com elementos zen</li>
                    <li>• Typography japonesa (こんにちは)</li>
                    <li>• Gamificação motivacional</li>
                    <li>• Animações suaves</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-matcha-50 to-emerald-50 border-matcha-200">
                <CardHeader>
                  <CardTitle className="text-matcha-700 flex items-center gap-2">
                    👨‍🏫 ProfessorDashboard
                  </CardTitle>
                  <CardDescription>Layout Pedagógico</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-matcha-700">
                    <li>• Tema matcha com ideografia (先生)</li>
                    <li>• Foco em ferramentas de ensino</li>
                    <li>• Layout 2-3 colunas pedagógico</li>
                    <li>• Controles funcionais zen</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-indigo-700 flex items-center gap-2">
                    👨‍💼 AdminDashboard
                  </CardTitle>
                  <CardDescription>Layout Alta Densidade</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-indigo-700">
                    <li>• Tema indigo com controle (管理)</li>
                    <li>• Layout 3-4 colunas denso</li>
                    <li>• Máxima informação organizada</li>
                    <li>• Controles precisos administrativos</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 🎌 Footer */}
        <footer className="text-center py-8 border-t border-nipo-zen-200 dark:border-nipo-zen-700">
          <p className="text-nipo-zen-600 dark:text-nipo-zen-400 font-zen">
            Sistema de Design Japonês - Nipo School © 2025
          </p>
        </footer>
      </div>
    </div>
  )
}