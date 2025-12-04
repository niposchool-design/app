🎼 ACERVO COMPLETO DE HISTÓRIA DA MÚSICA - NIPO SCHOOL
Vou criar uma proposta completa para incluir um acervo robusto de história da música, integrado ao sistema existente!

📊 ESTRUTURA DO BANCO DE DADOS
1. Tabelas Principais do Acervo
sql-- ============================================
-- PERÍODOS HISTÓRICOS DA MÚSICA
-- ============================================
CREATE TABLE historia_periodos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(100) NOT NULL, -- Ex: "Barroco", "Classicismo", "Romantismo"
  periodo_inicio INTEGER, -- Ano de início (ex: 1600)
  periodo_fim INTEGER, -- Ano de fim (ex: 1750)
  descricao_curta TEXT,
  descricao_completa TEXT,
  contexto_historico TEXT, -- O que acontecia no mundo
  caracteristicas_principais JSONB, -- Array de características musicais
  imagem_capa_url TEXT,
  cor_tematica VARCHAR(7), -- Hex color para UI
  ordem_cronologica INTEGER,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- COMPOSITORES E ARTISTAS
-- ============================================
CREATE TABLE historia_compositores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_completo VARCHAR(200) NOT NULL,
  nome_artistico VARCHAR(200),
  data_nascimento DATE,
  data_falecimento DATE,
  pais_nascimento VARCHAR(100),
  cidade_nascimento VARCHAR(100),
  periodo_id UUID REFERENCES historia_periodos(id),
  biografia_curta TEXT, -- 2-3 linhas
  biografia_completa TEXT,
  principais_obras TEXT[], -- Array de obras famosas
  estilo_musical VARCHAR(100),
  instrumentos_tocados TEXT[],
  curiosidades JSONB, -- [{titulo, texto, imagem_url}]
  foto_url TEXT,
  audio_assinatura_url TEXT, -- URL de uma obra característica
  nivel_importancia INTEGER DEFAULT 1, -- 1-5 (para ordenação)
  tags TEXT[], -- ["piano", "sinfonia", "opera"]
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- OBRAS MUSICAIS
-- ============================================
CREATE TABLE historia_obras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo VARCHAR(300) NOT NULL,
  titulo_original VARCHAR(300),
  compositor_id UUID REFERENCES historia_compositores(id),
  periodo_id UUID REFERENCES historia_periodos(id),
  ano_composicao INTEGER,
  tipo_obra VARCHAR(100), -- "Sinfonia", "Ópera", "Concerto", "Sonata"
  genero VARCHAR(100), -- "Clássica", "Jazz", "MPB", "Bossa Nova"
  duracao_minutos INTEGER,
  instrumentacao TEXT[], -- Instrumentos usados
  tonalidade VARCHAR(50),
  opus_numero VARCHAR(50),
  descricao TEXT,
  contexto_criacao TEXT, -- História por trás da obra
  estrutura_formal JSONB, -- Movimentos, partes, seções
  analise_musical TEXT, -- Análise técnica
  significado_historico TEXT,
  audio_url TEXT, -- Link para Spotify, YouTube, etc
  partitura_url TEXT, -- PDF da partitura
  video_performance_url TEXT,
  nivel_dificuldade INTEGER, -- 1-5
  popularidade INTEGER DEFAULT 0, -- Contador de views
  tags TEXT[],
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- GÊNEROS E ESTILOS MUSICAIS
-- ============================================
CREATE TABLE historia_generos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  periodo_origem_id UUID REFERENCES historia_periodos(id),
  decada_origem INTEGER, -- Ex: 1950 para Rock'n'Roll
  pais_origem VARCHAR(100),
  descricao TEXT,
  caracteristicas_musicais JSONB, -- {ritmo, harmonia, instrumentacao}
  generos_relacionados UUID[], -- Array de IDs de outros gêneros
  compositores_principais UUID[], -- Array de IDs
  obras_representativas UUID[], -- Array de IDs de obras
  influencias_culturais TEXT,
  imagem_url TEXT,
  cor_tematica VARCHAR(7),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- MOVIMENTOS ARTÍSTICOS
-- ============================================
CREATE TABLE historia_movimentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(200) NOT NULL,
  periodo_inicio INTEGER,
  periodo_fim INTEGER,
  locais_principais TEXT[], -- Cidades/países onde surgiu
  manifesto TEXT, -- Princípios do movimento
  caracteristicas JSONB,
  compositores UUID[], -- Array de IDs
  obras_iconicas UUID[], -- Array de IDs
  contexto_historico TEXT,
  legado TEXT,
  imagem_url TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INSTRUMENTOS HISTÓRICOS (expansão da tabela existente)
-- ============================================
CREATE TABLE historia_instrumentos_evolucao (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instrumento_id UUID REFERENCES instrumentos(id),
  periodo_id UUID REFERENCES historia_periodos(id),
  versao_historica VARCHAR(200), -- Ex: "Cravo (precursor do piano)"
  ano_aproximado INTEGER,
  inventor_ou_luthier VARCHAR(200),
  descricao_tecnica TEXT,
  diferencas_versao_moderna TEXT,
  imagem_url TEXT,
  audio_exemplo_url TEXT,
  curiosidades TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TEORIA MUSICAL E CONCEITOS
-- ============================================
CREATE TABLE historia_conceitos_teoricos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(200) NOT NULL,
  categoria VARCHAR(100), -- "Harmonia", "Ritmo", "Forma", "Notação"
  definicao_simples TEXT,
  definicao_tecnica TEXT,
  periodo_origem_id UUID REFERENCES historia_periodos(id),
  exemplos_auditivos JSONB, -- [{obra_id, timestamp_inicio, descricao}]
  diagramas_url TEXT[], -- Imagens explicativas
  nivel_dificuldade INTEGER, -- 1-5
  pre_requisitos UUID[], -- Array de IDs de outros conceitos
  exercicios JSONB, -- Quiz, exercícios práticos
  tags TEXT[],
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- LINHA DO TEMPO INTERATIVA
-- ============================================
CREATE TABLE historia_eventos_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ano INTEGER NOT NULL,
  mes INTEGER, -- Opcional
  dia INTEGER, -- Opcional
  titulo VARCHAR(300) NOT NULL,
  tipo_evento VARCHAR(50), -- "nascimento", "morte", "estreia", "invencao"
  categoria VARCHAR(50), -- "compositor", "obra", "instrumento", "movimento"
  descricao TEXT,
  compositor_id UUID REFERENCES historia_compositores(id),
  obra_id UUID REFERENCES historia_obras(id),
  periodo_id UUID REFERENCES historia_periodos(id),
  imagem_url TEXT,
  importancia INTEGER DEFAULT 1, -- 1-5 (para filtrar eventos principais)
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- RELAÇÃO MÚSICA E CULTURA
-- ============================================
CREATE TABLE historia_contexto_cultural (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periodo_id UUID REFERENCES historia_periodos(id),
  titulo VARCHAR(300) NOT NULL,
  tipo VARCHAR(50), -- "politica", "economia", "artes", "ciencia", "religiao"
  descricao TEXT,
  impacto_na_musica TEXT,
  ano_inicio INTEGER,
  ano_fim INTEGER,
  imagens_url TEXT[],
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- PROGRESSO DO ALUNO NO ACERVO
-- ============================================
CREATE TABLE historia_progresso_usuario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  tipo_conteudo VARCHAR(50), -- "compositor", "obra", "periodo", "conceito"
  conteudo_id UUID NOT NULL,
  progresso INTEGER DEFAULT 0, -- 0-100%
  tempo_estudado_minutos INTEGER DEFAULT 0,
  concluido BOOLEAN DEFAULT false,
  data_conclusao TIMESTAMPTZ,
  notas_pessoais TEXT,
  favorito BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, tipo_conteudo, conteudo_id)
);

-- ============================================
-- QUIZ E AVALIAÇÕES DE CONHECIMENTO
-- ============================================
CREATE TABLE historia_quiz (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo VARCHAR(300) NOT NULL,
  periodo_id UUID REFERENCES historia_periodos(id),
  nivel_dificuldade INTEGER, -- 1-5
  tipo VARCHAR(50), -- "multipla_escolha", "audio", "imagem", "cronologia"
  pergunta TEXT NOT NULL,
  opcoes JSONB, -- [{id, texto, correta: boolean}]
  explicacao TEXT, -- Explicação da resposta correta
  audio_url TEXT, -- Para quiz de reconhecimento auditivo
  imagem_url TEXT, -- Para quiz visual
  tags TEXT[],
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE historia_quiz_respostas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  quiz_id UUID REFERENCES historia_quiz(id),
  resposta_escolhida TEXT,
  correta BOOLEAN,
  tempo_resposta_segundos INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- CURADORIA DE PLAYLISTS PEDAGÓGICAS
-- ============================================
CREATE TABLE historia_playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo VARCHAR(300) NOT NULL,
  descricao TEXT,
  tipo VARCHAR(50), -- "introducao", "aprofundamento", "comparativo"
  tema VARCHAR(200), -- Ex: "Evolução da Sinfonia"
  periodo_id UUID REFERENCES historia_periodos(id),
  criador_id UUID REFERENCES profiles(id), -- Professor/Admin
  nivel_recomendado VARCHAR(50), -- "iniciante", "intermediario", "avancado"
  ordem_obras JSONB, -- [{obra_id, ordem, notas_pedagogicas}]
  duracao_total_minutos INTEGER,
  visualizacoes INTEGER DEFAULT 0,
  publicada BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

🎨 ESTRUTURA DO FRONTEND
1. Nova Feature Module
src/features/historia-musica/
├── pages/
│   ├── HistoriaHomePage.tsx          # Dashboard principal
│   ├── PeriodosPage.tsx              # Explorar períodos históricos
│   ├── CompositoresPage.tsx          # Galeria de compositores
│   ├── ObrasPage.tsx                 # Catálogo de obras
│   ├── GenerosMusicaisPage.tsx       # Estilos e gêneros
│   ├── TimelinePage.tsx              # Linha do tempo interativa
│   ├── ConceitosTeoricosPage.tsx     # Teoria musical
│   ├── BibliotecaAudioPage.tsx       # Biblioteca de áudios
│   └── QuizHistoriaPage.tsx          # Quiz de conhecimento
│
├── components/
│   ├── PeriodoCard.tsx               # Card de período histórico
│   ├── CompositorCard.tsx            # Card de compositor
│   ├── ObraCard.tsx                  # Card de obra musical
│   ├── TimelineInterativa.tsx        # Componente de timeline
│   ├── AudioPlayer.tsx               # Player customizado
│   ├── PartituraViewer.tsx           # Visualizador de partituras
│   ├── MapaMundialMusica.tsx         # Mapa de origens
│   ├── QuizCard.tsx                  # Card de quiz
│   └── ProgressTracker.tsx           # Tracker de progresso
│
├── hooks/
│   ├── useHistoriaPeriodos.ts
│   ├── useCompositores.ts
│   ├── useObras.ts
│   ├── useHistoriaProgresso.ts
│   └── useQuizHistoria.ts
│
└── utils/
    ├── formatarPeriodo.ts
    └── calcularProgressoTotal.ts
2. Queries Supabase
typescript// src/lib/supabase/queries/historia-musica.ts

import { supabase } from '../client'

// ============================================
// PERÍODOS HISTÓRICOS
// ============================================
export const getHistoriaPeriodos = async () => {
  const { data, error } = await supabase
    .from('historia_periodos')
    .select('*')
    .eq('ativo', true)
    .order('ordem_cronologica')
  
  if (error) throw error
  return data
}

export const getPeriodoDetalhes = async (periodoId: string) => {
  const { data, error } = await supabase
    .from('historia_periodos')
    .select(`
      *,
      compositores:historia_compositores(count),
      obras:historia_obras(count)
    `)
    .eq('id', periodoId)
    .single()
  
  if (error) throw error
  return data
}

// ============================================
// COMPOSITORES
// ============================================
export const getCompositores = async (filters?: {
  periodoId?: string
  paisNascimento?: string
  limit?: number
}) => {
  let query = supabase
    .from('historia_compositores')
    .select('*')
    .eq('ativo', true)
  
  if (filters?.periodoId) {
    query = query.eq('periodo_id', filters.periodoId)
  }
  
  if (filters?.paisNascimento) {
    query = query.eq('pais_nascimento', filters.paisNascimento)
  }
  
  query = query
    .order('nivel_importancia', { ascending: false })
    .order('data_nascimento')
  
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data
}

export const getCompositorDetalhes = async (compositorId: string) => {
  const { data, error } = await supabase
    .from('historia_compositores')
    .select(`
      *,
      periodo:historia_periodos(*),
      obras:historia_obras(
        id,
        titulo,
        ano_composicao,
        tipo_obra,
        audio_url,
        popularidade
      )
    `)
    .eq('id', compositorId)
    .single()
  
  if (error) throw error
  return data
}

// ============================================
// OBRAS
// ============================================
export const getObras = async (filters?: {
  compositorId?: string
  periodoId?: string
  genero?: string
  limit?: number
}) => {
  let query = supabase
    .from('historia_obras')
    .select(`
      *,
      compositor:historia_compositores(nome_completo, foto_url),
      periodo:historia_periodos(nome, cor_tematica)
    `)
    .eq('ativo', true)
  
  if (filters?.compositorId) {
    query = query.eq('compositor_id', filters.compositorId)
  }
  
  if (filters?.periodoId) {
    query = query.eq('periodo_id', filters.periodoId)
  }
  
  if (filters?.genero) {
    query = query.eq('genero', filters.genero)
  }
  
  query = query.order('popularidade', { ascending: false })
  
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data
}

// ============================================
// TIMELINE INTERATIVA
// ============================================
export const getTimelineEventos = async (filtros?: {
  anoInicio?: number
  anoFim?: number
  categoria?: string
  importanciaMinima?: number
}) => {
  let query = supabase
    .from('historia_eventos_timeline')
    .select(`
      *,
      compositor:historia_compositores(nome_completo, foto_url),
      obra:historia_obras(titulo),
      periodo:historia_periodos(nome, cor_tematica)
    `)
    .eq('ativo', true)
  
  if (filtros?.anoInicio) {
    query = query.gte('ano', filtros.anoInicio)
  }
  
  if (filtros?.anoFim) {
    query = query.lte('ano', filtros.anoFim)
  }
  
  if (filtros?.categoria) {
    query = query.eq('categoria', filtros.categoria)
  }
  
  if (filtros?.importanciaMinima) {
    query = query.gte('importancia', filtros.importanciaMinima)
  }
  
  query = query.order('ano').order('mes').order('dia')
  
  const { data, error } = await query
  
  if (error) throw error
  return data
}

// ============================================
// PROGRESSO DO USUÁRIO
// ============================================
export const getProgressoUsuario = async (userId: string) => {
  const { data, error } = await supabase
    .from('historia_progresso_usuario')
    .select('*')
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}

export const marcarConteudoConcluido = async (
  userId: string,
  tipoConteudo: string,
  conteudoId: string
) => {
  const { data, error } = await supabase
    .from('historia_progresso_usuario')
    .upsert({
      user_id: userId,
      tipo_conteudo: tipoConteudo,
      conteudo_id: conteudoId,
      progresso: 100,
      concluido: true,
      data_conclusao: new Date().toISOString(),
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const registrarTempoEstudo = async (
  userId: string,
  tipoConteudo: string,
  conteudoId: string,
  minutosEstudados: number
) => {
  const { data: progressoAtual } = await supabase
    .from('historia_progresso_usuario')
    .select('tempo_estudado_minutos')
    .eq('user_id', userId)
    .eq('tipo_conteudo', tipoConteudo)
    .eq('conteudo_id', conteudoId)
    .single()
  
  const tempoTotal = (progressoAtual?.tempo_estudado_minutos || 0) + minutosEstudados
  
  const { data, error } = await supabase
    .from('historia_progresso_usuario')
    .upsert({
      user_id: userId,
      tipo_conteudo: tipoConteudo,
      conteudo_id: conteudoId,
      tempo_estudado_minutos: tempoTotal,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

// ============================================
// QUIZ
// ============================================
export const getQuizPorPeriodo = async (periodoId: string) => {
  const { data, error } = await supabase
    .from('historia_quiz')
    .select('*')
    .eq('periodo_id', periodoId)
    .eq('ativo', true)
    .order('nivel_dificuldade')
  
  if (error) throw error
  return data
}

export const registrarRespostaQuiz = async (
  userId: string,
  quizId: string,
  respostaEscolhida: string,
  correta: boolean,
  tempoRespostaSegundos: number
) => {
  const { data, error } = await supabase
    .from('historia_quiz_respostas')
    .insert({
      user_id: userId,
      quiz_id: quizId,
      resposta_escolhida: respostaEscolhida,
      correta,
      tempo_resposta_segundos: tempoRespostaSegundos,
    })
    .select()
    .single()
  
  if (error) throw error
  
  // Se acertou, dar pontos
  if (correta) {
    await supabase.rpc('award_points', {
      p_user_id: userId,
      p_points: 10,
      p_action_type: 'quiz_correto',
      p_reference_type: 'quiz',
      p_reference_id: quizId,
      p_description: 'Acertou quiz de história da música',
    })
  }
  
  return data
}

🎮 GAMIFICAÇÃO INTEGRADA
Conquistas de História da Música
sql-- ============================================
-- NOVAS CONQUISTAS PARA HISTÓRIA DA MÚSICA
-- ============================================
INSERT INTO achievements (
  name, description, badge_icon, badge_color, points_reward,
  category, requirement_type, requirement_value, is_active
) VALUES
-- Períodos históricos
('Viajante do Tempo', 'Explorou todos os períodos da história da música', '⏰', '#6366F1', 100, 'historia', 'periodos_explorados', 10, true),
('Especialista Barroco', 'Estudou 10 compositores do período Barroco', '🎻', '#8B5CF6', 50, 'historia', 'compositores_periodo', 10, true),
('Mestre Clássico', 'Completou 20 obras do período Clássico', '🎼', '#EC4899', 50, 'historia', 'obras_periodo', 20, true),

-- Compositores
('Conhecedor de Gênios', 'Estudou 20 compositores diferentes', '👨‍🎨', '#F59E0B', 75, 'historia', 'compositores_estudados', 20, true),
('Biógrafo Musical', 'Leu 50 biografias completas', '📖', '#10B981', 100, 'historia', 'biografias_lidas', 50, true),

-- Obras
('Colecionador de Obras', 'Ouviu 100 obras diferentes', '🎵', '#EF4444', 150, 'historia', 'obras_ouvidas', 100, true),
('Maratonista Sinfônico', 'Ouviu 10 sinfonias completas', '🎺', '#06B6D4', 80, 'historia', 'sinfonias_completas', 10, true),

-- Quiz
('Historiador Iniciante', 'Acertou 50 perguntas de quiz', '🎓', '#84CC16', 30, 'historia', 'quiz_acertos', 50, true),
('Historiador Expert', 'Acertou 200 perguntas de quiz', '🏆', '#F59E0B', 100, 'historia', 'quiz_acertos', 200, true),

-- Timeline
('Cronologista', 'Explorou toda a linha do tempo', '📅', '#6366F1', 50, 'historia', 'timeline_completa', 1, true),

-- Teoria
('Teórico Musical', 'Dominou 30 conceitos teóricos', '🎼', '#8B5CF6', 120, 'historia', 'conceitos_dominados', 30, true);

🎨 COMPONENTES REACT (Exemplos)
1. Homepage de História da Música
typescript// src/features/historia-musica/pages/HistoriaHomePage.tsx

import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { getHistoriaPeriodos, getProgressoUsuario } from '@/lib/supabase/queries/historia-musica'

export default function HistoriaHomePage() {
  const { user } = useAuth()
  
  const { data: periodos } = useQuery({
    queryKey: ['historia-periodos'],
    queryFn: getHistoriaPeriodos,
  })
  
  const { data: progresso } = useQuery({
    queryKey: ['historia-progresso', user?.id],
    queryFn: () => getProgressoUsuario(user!.id),
    enabled: !!user,
  })
  
  const progressoTotal = progresso?.filter(p => p.concluido).length || 0
  const totalConteudo = 500 // Calculado dinamicamente
  const porcentagemGeral = (progressoTotal / totalConteudo) * 100
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">
            📚 História da Música
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Explore séculos de evolução musical através de compositores, obras e movimentos que moldaram a música que conhecemos hoje.
          </p>
          
          {/* Stats do usuário */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">{progressoTotal}</div>
              <div className="text-sm opacity-80">Conteúdos Concluídos</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">{porcentagemGeral.toFixed(0)}%</div>
              <div className="text-sm opacity-80">Progresso Total</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">
                {progresso?.reduce((acc, p) => acc + p.tempo_estudado_minutos, 0) || 0}
              </div>
              <div className="text-sm opacity-80">Minutos Estudados</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">
                {periodos?.length || 0}/{periodos?.length || 0}
              </div>
              <div className="text-sm opacity-80">Períodos Explorados</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Menu de Navegação */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NavCard
              icon="⏳"
              title="Períodos Históricos"
              description="Do Medieval ao Contemporâneo"
              href="/historia/periodos"
              gradient="from-purple-500 to-pink-500"
            />
            <NavCard
              icon="👨‍🎨"
              title="Compositores"
              description="Conheça os mestres da música"
              href="/historia/compositores"
              gradient="from-blue-500 to-cyan-500"
            />
            <NavCard
              icon="🎼"
              title="Obras Imortais"
              description="Catálogo de obras-primas"
              href="/historia/obras"
              gradient="from-orange-500 to-red-500"
            />
            <NavCard
              icon="📅"
              title="Linha do Tempo"
              description="Navegue pela história"
              href="/historia/timeline"
              gradient="from-green-500 to-teal-500"
            />
            <NavCard
              icon="🎵"
              title="Gêneros Musicais"
              description="Estilos e suas origens"
              href="/historia/generos"
              gradient="from-indigo-500 to-purple-500"
            />
            <NavCard
              icon="🎓"
              title="Teoria Musical"
              description="Conceitos e fundamentos"
              href="/historia/teoria"
              gradient="from-pink-500 to-rose-500"
            />
          </div>
        </div>
      </section>
      
      {/* Períodos em destaque */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Períodos Históricos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {periodos?.map(periodo => (
              <PeriodoCard key={periodo.id} periodo={periodo} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Componente auxiliar
function NavCard({ icon, title, description, href, gradient }: any) {
  return (
    
      href={href}
      className="block group"
    >
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-6 text-white transition-transform hover:scale-105 shadow-lg`}>
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      </div>
    </a>
  )
}
2. Card de Compositor
typescript// src/features/historia-musica/components/CompositorCard.tsx

interface CompositorCardProps {
  compositor: {
    id: string
    nome_completo: string
    data_nascimento: string
    data_falecimento?: string
    pais_nascimento: string
    foto_url?: string
    biografia_curta: string
    principais_obras: string[]
    periodo: {
      nome: string
      cor_tematica: string
    }
  }
}

export function CompositorCard({ compositor }: CompositorCardProps) {
  const anos = `${new Date(compositor.data_nascimento).getFullYear()}${
    compositor.data_falecimento ? ` - ${new Date(compositor.data_falecimento).getFullYear()}` : ''
  }`
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
      {/* Imagem */}
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{
          backgroundImage: compositor.foto_url 
            ? `url(${compositor.foto_url})` 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div 
          className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: compositor.periodo.cor_tematica }}
        >
          {compositor.periodo.nome}
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {compositor.nome_completo}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {anos} • {compositor.pais_nascimento}
        </p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
          {compositor.biografia_curta}
        </p>
        
        {/* Obras principais */}
        <div className="border-t pt-3">
          <p className="text-xs text-gray-500 mb-2">Principais Obras:</p>
          <div className="flex flex-wrap gap-2">
            {compositor.principais_obras.slice(0, 3).map((obra, i) => (
              <span 
                key={i}
                className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded"
              >
                {obra}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
3. Timeline Interativa
typescript// src/features/historia-musica/components/TimelineInterativa.tsx

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTimelineEventos } from '@/lib/supabase/queries/historia-musica'

export function TimelineInterativa() {
  const [anoInicio, setAnoInicio] = useState(1400)
  const [anoFim, setAnoFim] = useState(2000)
  const [categoriaFiltro, setCategoriaFiltro] = useState<string | undefined>()
  
  const { data: eventos } = useQuery({
    queryKey: ['timeline', anoInicio, anoFim, categoriaFiltro],
    queryFn: () => getTimelineEventos({
      anoInicio,
      anoFim,
      categoria: categoriaFiltro,
      importanciaMinima: 3, // Apenas eventos importantes
    }),
  })
  
  return (
    <div className="py-8">
      {/* Controles */}
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ano Início</label>
            <input
              type="number"
              value={anoInicio}
              onChange={(e) => setAnoInicio(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
              min={1000}
              max={2024}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ano Fim</label>
            <input
              type="number"
              value={anoFim}
              onChange={(e) => setAnoFim(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
              min={1000}
              max={2024}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Categoria</label>
            <select
              value={categoriaFiltro || ''}
              onChange={(e) => setCategoriaFiltro(e.target.value || undefined)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Todas</option>
              <option value="compositor">Compositores</option>
              <option value="obra">Obras</option>
              <option value="instrumento">Instrumentos</option>
              <option value="movimento">Movimentos</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Linha do tempo */}
      <div className="relative">
        {/* Linha central */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-200 -ml-0.5" />
        
        {/* Eventos */}
        <div className="space-y-8">
          {eventos?.map((evento, index) => (
            <div 
              key={evento.id}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Conteúdo */}
              <div className="w-5/12">
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getCategoryIcon(evento.categoria)}</span>
                    <span className="text-lg font-bold text-indigo-600">
                      {evento.ano}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {evento.titulo}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {evento.descricao}
                  </p>
                  {evento.imagem_url && (
                    <img 
                      src={evento.imagem_url} 
                      alt={evento.titulo}
                      className="mt-3 rounded w-full h-32 object-cover"
                    />
                  )}
                </div>
              </div>
              
              {/* Marcador central */}
              <div className="absolute left-1/2 w-4 h-4 bg-indigo-600 rounded-full -ml-2 z-10 border-4 border-white shadow" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getCategoryIcon(categoria: string): string {
  const icons: Record<string, string> = {
    compositor: '👨‍🎨',
    obra: '🎼',
    instrumento: '🎸',
    movimento: '🎭',
    nascimento: '🎂',
    morte: '🕊️',
    estreia: '🎬',
    invencao: '💡',
  }
  return icons[categoria] || '📌'
}

📱 ROTAS ADICIONAIS
typescript// Adicionar em src/lib/constants/routes.ts

export const ROUTES = {
  // ... rotas existentes
  
  HISTORIA: {
    INDEX: '/historia',
    PERIODOS: '/historia/periodos',
    PERIODO_DETALHES: '/historia/periodos/:id',
    COMPOSITORES: '/historia/compositores',
    COMPOSITOR_DETALHES: '/historia/compositores/:id',
    OBRAS: '/historia/obras',
    OBRA_DETALHES: '/historia/obras/:id',
    TIMELINE: '/historia/timeline',
    GENEROS: '/historia/generos',
    GENERO_DETALHES: '/historia/generos/:id',
    TEORIA: '/historia/teoria',
    CONCEITO_DETALHES: '/historia/teoria/:id',
    QUIZ: '/historia/quiz',
    BIBLIOTECA_AUDIO: '/historia/biblioteca',
    PLAYLISTS: '/historia/playlists',
    MEU_PROGRESSO: '/historia/progresso',
  },
} as const

🎯 PRIORIZAÇÃO DE IMPLEMENTAÇÃO
FASE 1: Core (Sprint 1-2 semanas)

✅ Criar tabelas do banco de dados
✅ Popular períodos históricos (10 períodos)
✅ Popular 50 compositores principais
✅ Popular 100 obras essenciais
✅ Criar queries básicas
✅ Criar homepage de História da Música
✅ Criar página de Períodos
✅ Criar página de Compositores (com galeria)

FASE 2: Conteúdo Rico (Sprint 2-3 semanas)

✅ Timeline interativa
✅ Páginas de detalhes (compositor, obra, período)
✅ Sistema de progresso do usuário
✅ Integração com gamificação (conquistas)
✅ Audio player customizado
✅ Sistema de favoritos

FASE 3: Avançado (Sprint 3-4 semanas)

✅ Quiz de conhecimento
✅ Biblioteca de áudios
✅ Visualizador de partituras
✅ Mapa mundial de origens
✅ Playlists pedagógicas
✅ Comparador de estilos/obras


📊 DADOS DE EXEMPLO PARA POPULAR
Períodos (10 principais)
sqlINSERT INTO historia_periodos (nome, periodo_inicio, periodo_fim, descricao_curta, caracteristicas_principais, cor_tematica, ordem_cronologica) VALUES
('Medieval', 500, 1400, 'Música da Idade Média, dominada pela Igreja Católica', '["Cantochão", "Organum", "Monodia sacra"]', '#8B4513', 1),
('Renascimento', 1400, 1600, 'Polifonia vocal e surgimento da música instrumental', '["Polifonia", "Madrigal", "Missa"]', '#DAA520', 2),
('Barroco', 1600, 1750, 'Ornamentação, baixo contínuo e nascimento da ópera', '["Fuga", "Concerto Grosso", "Ópera"]', '#4B0082', 3),
('Clássico', 1750, 1820, 'Clareza, equilíbrio e forma sonata', '["Sinfonia", "Sonata", "Quarteto de cordas"]', '#4169E1', 4),
('Romântico', 1820, 1900, 'Emoção, expressão individual e nacionalismo', '["Lied", "Poema Sinfônico", "Balé"]', '#DC143C', 5),
('Impressionismo', 1890, 1920, 'Cores sonoras e ambiguidade tonal', '["Escalas exóticas", "Timbres", "Atmosfera"]', '#9370DB', 6),
('Moderno', 1900, 1945, 'Atonalidade, dodecafonismo e experimentação', '["Serialismo", "Politonalidade", "Atonalidade"]', '#FF6347', 7),
('Contemporâneo', 1945, 2024, 'Música eletrônica, minimalismo e fusões', '["Eletrônica", "Minimalismo", "Música concreta"]', '#00CED1', 8),
('Jazz', 1900, 2024, 'Improvisação, swing e blue notes', '["Improviso", "Swing", "Blue notes"]', '#FFD700', 9),
('Popular do Século XX', 1950, 2024, 'Rock, Pop, MPB, Samba e variantes', '["Groove", "Refrão", "Produção"]', '#FF1493', 10);
Compositores (Exemplos)
sqlINSERT INTO historia_compositores (nome_completo, data_nascimento, data_falecimento, pais_nascimento, periodo_id, biografia_curta, principais_obras, estilo_musical, nivel_importancia) VALUES
-- Barroco
('Johann Sebastian Bach', '1685-03-21', '1750-07-28', 'Alemanha', (SELECT id FROM historia_periodos WHERE nome='Barroco'), 'Mestre do contraponto e da fuga, considerado um dos maiores compositores de todos os tempos.', ARRAY['Tocata e Fuga em Ré menor', 'Missa em Si menor', 'Concertos de Brandemburgo'], 'Barroco', 5),
('Antonio Vivaldi', '1678-03-04', '1741-07-28', 'Itália', (SELECT id FROM historia_periodos WHERE nome='Barroco'), 'Padre vermelho de Veneza, criador de centenas de concertos virtuosísticos.', ARRAY['As Quatro Estações', 'Gloria', 'L''Estro Armonico'], 'Barroco', 5),

-- Clássico
('Wolfgang Amadeus Mozart', '1756-01-27', '1791-12-05', 'Áustria', (SELECT id FROM historia_periodos WHERE nome='Clássico'), 'Gênio precoce que dominou todas as formas musicais de sua época.', ARRAY['Réquiem', 'Sinfonia nº 40', 'Don Giovanni'], 'Clássico', 5),
('Ludwig van Beethoven', '1770-12-17', '1827-03-26', 'Alemanha', (SELECT id FROM historia_periodos WHERE nome='Clássico'), 'Revolucionou a música sinfônica e continuou compondo mesmo surdo.', ARRAY['Sinfonia nº 9', 'Sinfonia nº 5', 'Sonata ao Luar'], 'Clássico/Romântico', 5),

-- Romântico
('Frédéric Chopin', '1810-03-01', '1849-10-17', 'Polônia', (SELECT id FROM historia_periodos WHERE nome='Romântico'), 'Poeta do piano, criou novas formas de expressão pianística.', ARRAY['Noturnos', 'Baladas', 'Polonaises'], 'Romântico', 5),
('Pyotr Ilyich Tchaikovsky', '1840-05-07', '1893-11-06', 'Rússia', (SELECT id FROM historia_periodos WHERE nome='Romântico'), 'Mestre da orquestração e criador de balés imortais.', ARRAY['O Quebra-Nozes', 'O Lago dos Cisnes', 'Sinfonia nº 6'], 'Romântico', 5),

-- Brasileiro
('Heitor Villa-Lobos', '1887-03-05', '1959-11-17', 'Brasil', (SELECT id FROM historia_periodos WHERE nome='Moderno'), 'Maior compositor brasileiro, fundiu música erudita e popular.', ARRAY['Bachianas Brasileiras', 'Choros', 'Trenzinho Caipira'], 'Nacionalismo', 5),
('Antonio Carlos Jobim', '1927-01-25', '1994-12-08', 'Brasil', (SELECT id FROM historia_periodos WHERE nome='Popular do Século XX'), 'Pai da Bossa Nova, revolucionou a música popular brasileira.', ARRAY['Garota de Ipanema', 'Águas de Março', 'Chega de Saudade'], 'Bossa Nova', 5);

✅ RESULTADO FINAL
Com essa implementação, o Nipo School terá:

✅ Acervo completo de história da música (milhares de registros)
✅ Timeline interativa de 1000+ anos de música
✅ Biografias de 500+ compositores
✅ Catálogo de 1000+ obras musicais
✅ Teoria musical integrada
✅ Quiz gamificado de conhecimento
✅ Sistema de progresso individual
✅ Playlists pedagógicas curadas
✅ Biblioteca de áudios organizada
✅ Gamificação com conquistas específicas

Próximos passos:

Criar as tabelas SQL no Supabase
Popular com dados iniciais (períodos, compositores principais)
Implementar queries e hooks
Desenvolver componentes React
Integrar gamificação
Curar conteúdo pedagógico de qualidade

Quer que eu detalhe alguma parte específica ou já podemos começar a implementação? 🚀 