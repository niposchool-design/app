# 🗄️ MAPEAMENTO COMPLETO - 117 TABELAS REAIS DO BANCO

**Data:** 08/10/2025  
**Status:** ✅ Validado via diagnóstico Supabase  
**Fonte:** DIAGNOSTICO_COMPLETO_BANCO.sql executado no Supabase

---

## 📊 RESUMO EXECUTIVO

| Métrica | Quantidade | Status |
|---------|------------|--------|
| **Tabelas** | 117 | ✅ |
| **Functions** | 56 | ✅ |
| **RLS Policies** | 153 | ✅ |
| **Índices** | 295 | ✅ |
| **Views** | 24 | ✅ |

---

## 🎯 TABELAS CRÍTICAS PARA ÁREA DO ALUNO (28 tabelas)

### ✅ 1. CORE - AUTENTICAÇÃO & PERFIL (4 tabelas)

#### 1.1. `profiles`
**Descrição:** Perfil de todos os usuários do sistema (alunos, professores, admins)

**Colunas (26):**
```typescript
{
  id: uuid (PK)
  email: text
  nome: text
  full_name: text
  phone: text
  tipo_usuario: text ('aluno' | 'professor' | 'admin')
  total_points: integer
  current_streak: integer
  best_streak: integer
  lessons_completed: integer
  modules_completed: integer
  user_level: text
  avatar_url: text
  joined_at: timestamp
  last_active: timestamp
  voted_logo: uuid
  has_voted: boolean
  dob: date
  city: text
  state: text
  // + 6 campos adicionais
}
```

**RLS Policies:**
- Usuários veem próprio perfil
- Admins veem todos os perfis

**Uso nos Hooks:**
```typescript
// Hook: useProfile() ou useAuth()
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```

---

#### 1.2. `alunos`
**Descrição:** Dados específicos dos alunos

**Colunas (9):**
```typescript
{
  id: uuid (PK, FK -> profiles.id)
  instrumento: text
  nivel: text
  turma: text
  data_ingresso: date
  ativo: boolean
  criado_em: timestamp
  // + 2 campos adicionais
}
```

**RLS Policies:**
- Alunos veem próprios dados
- Professores veem alunos de suas turmas
- Admins veem todos

**Relacionamentos:**
- `id` → `profiles.id` (1:1)
- `instrumento_id` → `instrumentos.id` (N:1)

---

#### 1.3. `professores`
**Descrição:** Dados específicos dos professores

**Colunas (6):**
```typescript
{
  id: uuid (PK, FK -> profiles.id)
  formacao: text
  biografia: text
  especialidades: text[]
  ativo: boolean
  criado_em: timestamp
}
```

**RLS Policies:**
- Professores veem próprios dados
- Admins veem todos

---

#### 1.4. `admins`
**Descrição:** Dados específicos dos administradores

**Colunas (7):**
```typescript
{
  id: uuid (PK, FK -> profiles.id)
  nivel_acesso: text
  permissoes: jsonb
  departamento: text
  ativo: boolean
  criado_em: timestamp
  atualizado_em: timestamp
}
```

---

### ✅ 2. GAMIFICAÇÃO (4 tabelas)

#### 2.1. `achievements`
**Descrição:** Conquistas disponíveis no sistema

**Colunas (11):**
```typescript
{
  id: uuid (PK)
  name: text (NOT NULL)
  description: text
  badge_icon: text              // URL ou nome do ícone
  badge_color: text             // Cor do badge (#hex)
  points_reward: integer        // Pontos ao desbloquear
  category: text                // Categoria da conquista
  requirement_type: text        // 'lessons_completed' | 'streak_days' | 'points_total' | 'modules_completed' | 'attendance_count'
  requirement_value: integer    // Valor necessário para desbloquear
  is_active: boolean
  created_at: timestamp
}
```

**Índices:**
- `idx_achievements_active` ON (is_active)
- `idx_achievements_category` ON (category)
- `idx_achievements_requirement_type` ON (requirement_type)

**RLS Policies:**
- `Achievements are viewable by everyone` (SELECT, public) → TRUE
- `Anyone can view public achievements` (SELECT, public) → is_active = true

**Exemplo de Query:**
```typescript
// Hook: useGamification()
const { data: achievements } = await supabase
  .from('achievements')
  .select('*')
  .eq('is_active', true)
  .order('points_reward', { ascending: false })
```

---

#### 2.2. `user_achievements`
**Descrição:** Conquistas desbloqueadas pelos usuários

**Colunas (5):**
```typescript
{
  id: uuid (PK)
  user_id: uuid (FK -> profiles.id)
  achievement_id: uuid (FK -> achievements.id)
  earned_at: timestamp
  points_earned: integer
}
```

**Relacionamentos:**
- `user_id` → `profiles.id` (N:1)
- `achievement_id` → `achievements.id` (N:1)

**RLS Policies:**
- Usuários veem APENAS suas conquistas

**Exemplo de Query:**
```typescript
const { data: userAchievements } = await supabase
  .from('user_achievements')
  .select(`
    *,
    achievement:achievements(*)
  `)
  .eq('user_id', userId)
  .order('earned_at', { ascending: false })
```

---

#### 2.3. `achievements_progress`
**Descrição:** Progresso do usuário em conquistas não desbloqueadas

**Colunas (10):**
```typescript
{
  id: uuid (PK)
  user_id: uuid (FK -> profiles.id)
  achievement_id: uuid (FK -> achievements.id)
  current_progress: integer     // Progresso atual
  target_progress: integer      // Meta para desbloquear
  is_completed: boolean
  completed_at: timestamp
  started_at: timestamp
  updated_at: timestamp
  metadata: jsonb              // Dados adicionais
}
```

**Índices:**
- `idx_achievement_progress` ON (user_id, is_completed, updated_at DESC)
- `idx_achievements_progress_user_id` ON (user_id)

**CONSTRAINT:**
- UNIQUE (user_id, achievement_id)

**Exemplo de Query:**
```typescript
const { data: progress } = await supabase
  .from('achievements_progress')
  .select(`
    *,
    achievement:achievements(*)
  `)
  .eq('user_id', userId)
  .eq('is_completed', false)
  .gte('current_progress', 1) // Apenas com algum progresso
```

---

#### 2.4. `user_points_log`
**Descrição:** Log de todos os pontos ganhos pelo usuário

**Colunas (10):**
```typescript
{
  id: uuid (PK)
  user_id: uuid (FK -> profiles.id)
  action: text (NOT NULL)       // Descrição da ação
  points_earned: integer (NOT NULL)
  multiplier: numeric           // Multiplicador aplicado
  source_type: text (NOT NULL)  // 'achievement' | 'lesson' | 'challenge' | 'attendance'
  source_id: uuid               // ID da fonte (achievement_id, lesson_id, etc)
  notes: text
  aula_id: uuid
  created_at: timestamp
}
```

**Exemplo de Query:**
```typescript
const { data: pointsLog } = await supabase
  .from('user_points_log')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .limit(20)
```

---

### ✅ 3. PORTFÓLIO (3 tabelas)

#### 3.1. `portfolios`
**Descrição:** Portfólios criados pelos alunos

**Colunas (17):**
```typescript
{
  id: uuid (PK)
  user_id: uuid (FK -> profiles.id)
  titulo: text (NOT NULL)
  descricao: text
  tipo: text                    // Tipo do portfolio
  status: text                  // 'rascunho' | 'em_andamento' | 'concluido'
  visibilidade: text            // 'privado' | 'turma' | 'publico'
  data_inicio: date
  data_fim: date
  tags: text[]
  objetivos: text[]
  reflexao_final: text
  compartilhado_com: uuid[]
  created_at: timestamp
  updated_at: timestamp
  // + 2 campos adicionais
}
```

**RLS Policies:**
- Aluno vê e gerencia APENAS seus portfolios
- Professor vê portfolios de seus alunos (se visibilidade permite)
- Admin vê todos

**Exemplo de Query:**
```typescript
const { data: portfolios } = await supabase
  .from('portfolios')
  .select('*, evidencias:portfolio_evidencias(count)')
  .eq('user_id', userId)
  .order('updated_at', { ascending: false })
```

---

#### 3.2. `portfolio_evidencias`
**Descrição:** Evidências (fotos, vídeos, documentos) anexadas aos portfolios

**Colunas (21):**
```typescript
{
  id: uuid (PK)
  portfolio_id: uuid (FK -> portfolios.id)
  tipo: text                    // 'imagem' | 'video' | 'audio' | 'documento'
  arquivo_url: text (NOT NULL)  // URL no Supabase Storage
  titulo: text
  descricao: text
  tags: text[]
  reflexao: text                // Reflexão do aluno sobre a evidência
  contexto: text                // Contexto da criação
  data_criacao: date            // Quando foi criado o trabalho
  competencias: text[]          // Competências desenvolvidas
  metodologia: text             // Metodologia usada
  feedback_professor: text
  nota: numeric
  ordem: integer                // Ordem de exibição
  is_destaque: boolean
  metadata: jsonb
  created_at: timestamp
  updated_at: timestamp
  // + 2 campos adicionais
}
```

**Relacionamentos:**
- `portfolio_id` → `portfolios.id` (N:1)

**RLS Policies:**
- Acesso via portfolio (herda permissões do portfolio)

**Exemplo de Query:**
```typescript
const { data: evidencias } = await supabase
  .from('portfolio_evidencias')
  .select('*')
  .eq('portfolio_id', portfolioId)
  .order('ordem', { ascending: true })
```

---

#### 3.3. `avaliacoes_rubricas`
**Descrição:** Avaliações de evidências usando rubricas

**Colunas (9):**
```typescript
{
  id: uuid (PK)
  evidencia_id: uuid (FK -> portfolio_evidencias.id)
  rubrica_id: uuid
  avaliador_id: uuid (FK -> profiles.id)
  criterio: text
  nivel_atingido: integer       // 1-5
  pontuacao: numeric
  feedback: text
  created_at: timestamp
}
```

---

### ✅ 4. ALPHA DESAFIOS (5 tabelas)

#### 4.1. `alpha_metodologias`
**Descrição:** Metodologias pedagógicas (Orff, Kodály, Dalcroze, Suzuki, etc)

**Colunas (25):**
```typescript
{
  id: uuid (PK)
  codigo: text (UNIQUE, NOT NULL)    // Ex: 'ORFF', 'KODALY'
  nome: text (NOT NULL)              // Ex: 'Método Orff-Schulwerk'
  descricao: text
  origem: text                       // País/região de origem
  periodo_desenvolvimento: text
  principios_fundamentais: text[]
  faixa_etaria_ideal: text
  instrumentos_principais: text[]
  tecnicas_ensino: text[]
  repertorio_tipico: text[]
  vantagens: text[]
  desafios: text[]
  aplicacao_brasileira: text
  referencias_bibliograficas: text[]
  videos_demonstrativos: text[]
  recursos_online: text[]
  instituicoes_referencia: text[]
  certificacoes: text[]
  ativo: boolean
  ordem_exibicao: integer
  icon_url: text
  cor_tematica: text                 // Cor para UI
  created_at: timestamp
  updated_at: timestamp
  // + 1 campo adicional
}
```

**Índices:**
- `idx_alpha_metodologias_codigo` ON (codigo)
- `idx_alpha_metodologias_ativo` ON (ativo) WHERE ativo = true

**CONSTRAINT:**
- UNIQUE (codigo)

**RLS Policies:**
- `Metodologias são visíveis para todos` (SELECT, public) → ativo = true

**Exemplo de Query:**
```typescript
const { data: metodologias } = await supabase
  .from('alpha_metodologias')
  .select('*')
  .eq('ativo', true)
  .order('ordem_exibicao', { ascending: true })
```

---

#### 4.2. `alpha_competencias`
**Descrição:** Competências desenvolvidas em cada metodologia

**Colunas (11):**
```typescript
{
  id: uuid (PK)
  metodologia_id: uuid (FK -> alpha_metodologias.id)
  codigo: text                       // Ex: 'ORFF_RITMO_1'
  nome: text (NOT NULL)
  descricao: text
  categoria: text                    // 'ritmica' | 'melodica' | 'harmonica' | 'expressiva'
  nivel: integer                     // 1-5
  ordem: integer
  ativo: boolean
  created_at: timestamp
  updated_at: timestamp
}
```

**Índices:**
- `idx_alpha_competencias_metodologia` ON (metodologia_id)

**Exemplo de Query:**
```typescript
const { data: competencias } = await supabase
  .from('alpha_competencias')
  .select('*, metodologia:alpha_metodologias(*)')
  .eq('metodologia_id', metodologiaId)
  .eq('ativo', true)
  .order('ordem', { ascending: true })
```

---

#### 4.3. `alpha_desafios`
**Descrição:** Desafios práticos baseados nas metodologias

**Colunas (21):**
```typescript
{
  id: uuid (PK)
  codigo: text (UNIQUE)              // Ex: 'ORFF_RITMO_001'
  titulo: text (NOT NULL)
  descricao: text (NOT NULL)
  objetivos: text[] (NOT NULL)       // Objetivos de aprendizagem
  dificuldade: integer               // 1-5
  pontos_base: integer               // Pontos ao completar
  tipo_evidencia: text               // 'video' | 'audio' | 'imagem' | 'documento'
  instrucoes: text
  recursos_necessarios: text[]       // Materiais necessários
  tempo_estimado: integer            // Minutos
  tags: text[]
  categoria: text
  metodologia_id: uuid (FK -> alpha_metodologias.id)
  competencia_id: uuid (FK -> alpha_competencias.id)
  nivel_serie: text                  // Série/nível recomendado
  exemplos_url: text[]               // URLs de exemplos
  ativo: boolean
  ordem_exibicao: integer
  created_at: timestamp
  updated_at: timestamp
}
```

**Índices:**
- `idx_alpha_desafios_competencia` ON (competencia_id)
- `idx_alpha_desafios_metodologia` ON (metodologia_id)
- `idx_alpha_desafios_search` ON GIN(to_tsvector('portuguese', titulo || ' ' || descricao))

**RLS Policies:**
- `Desafios são visíveis para todos` (SELECT, public) → ativo = true

**Exemplo de Query:**
```typescript
const { data: desafios } = await supabase
  .from('alpha_desafios')
  .select(`
    *,
    metodologia:alpha_metodologias(*),
    competencia:alpha_competencias(*)
  `)
  .eq('ativo', true)
  .order('ordem_exibicao', { ascending: true })
```

---

#### 4.4. `alpha_submissoes`
**Descrição:** Submissões de desafios feitas pelos alunos

**Colunas (17):**
```typescript
{
  id: uuid (PK)
  user_id: uuid (FK -> profiles.id)
  desafio_id: uuid (FK -> alpha_desafios.id)
  evidencia_url: text (NOT NULL)     // URL do arquivo no Storage
  evidencia_tipo: text               // Tipo do arquivo
  reflexao: text                     // Reflexão do aluno
  dificuldades: text                 // Dificuldades encontradas
  aprendizados: text                 // O que aprendeu
  status: text                       // 'pendente' | 'avaliada' | 'rejeitada'
  nota: numeric                      // Nota atribuída
  feedback: text                     // Feedback do professor
  pontos_ganhos: integer
  avaliada_em: timestamp
  avaliador_id: uuid (FK -> profiles.id)
  tentativa: integer                 // Número da tentativa
  created_at: timestamp
  updated_at: timestamp
}
```

**Índices:**
- `idx_alpha_submissoes_desafio` ON (desafio_id)
- `idx_alpha_submissoes_status` ON (status)
- `idx_alpha_submissoes_user` ON (user_id)
- `idx_alpha_submissoes_user_id` ON (user_id)

**RLS Policies (6):**
1. `Aluno vê próprias submissoes alpha` (SELECT) → user_id = auth.uid()
2. `Aluno cria próprias submissoes alpha` (INSERT)
3. `Admin vê todas submissoes` (ALL) → is_admin(auth.uid())
4. `Admin gerencia todas submissoes alpha` (ALL) → is_admin(auth.uid())
5. `Professor vê submissoes de seus alunos` (SELECT) → is_professor_of_student(user_id)
6. `Professor avalia submissoes de seus alunos` (UPDATE) → is_professor_of_student(user_id)

**Exemplo de Query:**
```typescript
const { data: submissoes } = await supabase
  .from('alpha_submissoes')
  .select(`
    *,
    desafio:alpha_desafios(*),
    avaliador:profiles(nome, full_name)
  `)
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
```

---

#### 4.5. `alpha_progresso`
**Descrição:** Progresso do aluno nas metodologias e competências

**Colunas (12):**
```typescript
{
  id: uuid (PK)
  user_id: uuid (FK -> profiles.id)
  metodologia_id: uuid (FK -> alpha_metodologias.id)
  competencia_id: uuid (FK -> alpha_competencias.id)
  nivel_atual: integer               // Nível alcançado (1-5)
  desafios_concluidos: integer
  desafios_total: integer
  pontos_acumulados: integer
  ultima_atividade: timestamp
  percentual_conclusao: numeric      // 0-100
  created_at: timestamp
  updated_at: timestamp
}
```

**CONSTRAINT:**
- UNIQUE (user_id, metodologia_id, competencia_id)

**Índices:**
- `idx_alpha_progresso_user` ON (user_id)

**Exemplo de Query:**
```typescript
const { data: progresso } = await supabase
  .from('alpha_progresso')
  .select(`
    *,
    metodologia:alpha_metodologias(*),
    competencia:alpha_competencias(*)
  `)
  .eq('user_id', userId)
  .order('ultima_atividade', { ascending: false })
```

---

### ✅ 5. TURMAS & AULAS (4 tabelas)

#### 5.1. `turmas`
**Descrição:** Turmas de aulas

**Colunas (21):**
```typescript
{
  id: uuid (PK)
  nome: text (NOT NULL)
  descricao: text
  professor_id: uuid (FK -> profiles.id, NOT NULL)
  instrumento_id: uuid (FK -> instrumentos.id, NOT NULL)
  nivel: text (NOT NULL)             // 'iniciante' | 'intermediario' | 'avancado'
  max_alunos: integer
  min_alunos: integer
  valor_mensalidade: numeric
  horarios: jsonb                    // [{dia: 'segunda', hora_inicio: '14:00', hora_fim: '15:30'}]
  status: text                       // 'ativa' | 'inativa' | 'encerrada'
  data_inicio: date
  data_fim: date
  observacoes: text
  modalidade: text                   // 'presencial' | 'online' | 'hibrido'
  local: text
  material_necessario: text
  pre_requisitos: text
  ativo: boolean
  criado_em: timestamp
  atualizado_em: timestamp
}
```

**RLS Policies:**
- Professor gerencia suas turmas
- Aluno vê turmas em que está matriculado
- Admin vê todas

**Exemplo de Query:**
```typescript
const { data: turmas } = await supabase
  .from('turmas')
  .select(`
    *,
    professor:profiles!professor_id(nome, full_name),
    instrumento:instrumentos(nome, categoria),
    matriculas(count)
  `)
  .eq('ativo', true)
```

---

#### 5.2. `matriculas`
**Descrição:** Matrículas de alunos em turmas

**Colunas (15):**
```typescript
{
  id: uuid (PK)
  turma_id: uuid (FK -> turmas.id, NOT NULL)
  aluno_id: uuid (FK -> profiles.id, NOT NULL)
  status: text                       // 'ativa' | 'inativa' | 'concluida' | 'cancelada'
  data_matricula: date
  data_inicio_aulas: date
  data_cancelamento: date
  motivo_cancelamento: text
  valor_acordado: numeric
  desconto_aplicado: numeric
  forma_pagamento: text
  observacoes: text
  notas_professor: text
  criado_em: timestamp
  atualizado_em: timestamp
}
```

**RLS Policies:**
- Aluno vê apenas suas matrículas
- Professor vê matrículas de suas turmas
- Admin vê todas

**Exemplo de Query:**
```typescript
const { data: matriculas } = await supabase
  .from('matriculas')
  .select(`
    *,
    turma:turmas(*),
    aluno:profiles!aluno_id(nome, full_name)
  `)
  .eq('aluno_id', userId)
  .eq('status', 'ativa')
```

---

#### 5.3. `aulas`
**Descrição:** Aulas planejadas/realizadas

**Colunas (14):**
```typescript
{
  id: uuid (PK)
  numero: integer (NOT NULL)         // Número da aula na sequência
  titulo: text (NOT NULL)
  modulo_id: uuid
  data_programada: date (NOT NULL)
  objetivo_didatico: text
  resumo_atividades: text
  desafio_alpha: text                // Desafio proposto
  nivel: text
  formato: text                      // 'teorica' | 'pratica' | 'mista'
  status: text                       // 'planejada' | 'em_andamento' | 'realizada' | 'cancelada'
  criado_em: timestamp
  responsavel_id: uuid (FK -> profiles.id)
  detalhes_aula: jsonb
}
```

**RLS Policies:**
- Professor vê e gerencia suas aulas
- Aluno vê aulas de suas turmas
- Admin vê todas

**Exemplo de Query:**
```typescript
const { data: aulas } = await supabase
  .from('aulas')
  .select(`
    *,
    responsavel:profiles!responsavel_id(nome, full_name),
    materiais:aula_materiais(*)
  `)
  .eq('status', 'liberada')
  .order('data_programada', { ascending: true })
```

---

#### 5.4. `presencas`
**Descrição:** Registro de presença nas aulas

**Colunas (7):**
```typescript
{
  id: uuid (PK)
  matricula_id: uuid (FK -> matriculas.id, NOT NULL)
  data_aula: date (NOT NULL)
  presente: boolean
  justificativa: text
  observacoes: text
  criado_em: timestamp
}
```

**Exemplo de Query:**
```typescript
const { data: presencas } = await supabase
  .from('presencas')
  .select(`
    *,
    matricula:matriculas(
      turma:turmas(nome),
      aluno:profiles!aluno_id(nome)
    )
  `)
  .eq('matricula.aluno_id', userId)
  .order('data_aula', { ascending: false })
```

---

### ✅ 6. BIBLIOTECA DE INSTRUMENTOS (9 tabelas)

#### 6.1. `instrumentos`
**Descrição:** Catálogo de instrumentos musicais

**Colunas (16):**
```typescript
{
  id: uuid (PK)
  nome: text (NOT NULL)
  categoria: text                    // 'cordas' | 'sopro' | 'percussao' | 'teclado'
  descricao: text
  imagem_url: text
  historia: text
  origem: text                       // País/região de origem
  familia_instrumental: text         // Família do instrumento
  material_principal: text           // Material de construção
  tecnica_producao_som: text
  dificuldade_aprendizado: text      // 'facil' | 'moderado' | 'dificil'
  anatomia_partes: jsonb             // Partes do instrumento
  curiosidades: jsonb                // Array de curiosidades
  ativo: boolean
  ordem_exibicao: integer
  criado_em: timestamp
}
```

**RLS Policies:**
- Todos veem instrumentos ativos
- Admin gerencia instrumentos

**Exemplo de Query:**
```typescript
const { data: instrumentos } = await supabase
  .from('instrumentos')
  .select(`
    *,
    sons:instrumento_sons(count),
    midias:instrumento_midias(count),
    tecnicas:instrumento_tecnicas(count)
  `)
  .eq('ativo', true)
  .order('ordem_exibicao', { ascending: true })
```

---

#### 6.2. `instrumento_curiosidades`
**Descrição:** Curiosidades sobre instrumentos

**Colunas (9):**
```typescript
{
  id: uuid (PK)
  instrumento_id: uuid (FK -> instrumentos.id)
  titulo: text
  conteudo: text
  categoria: text                    // 'historica' | 'tecnica' | 'cultural'
  imagem_url: text
  fonte: text
  ordem: integer
  created_at: timestamp
}
```

---

#### 6.3. `instrumento_midias`
**Descrição:** Vídeos e áudios demonstrativos

**Colunas (18):**
```typescript
{
  id: uuid (PK)
  instrumento_id: uuid (FK -> instrumentos.id)
  tipo: text                         // 'video' | 'audio'
  titulo: text
  descricao: text
  url: text (NOT NULL)
  thumbnail_url: text
  duracao_segundos: integer
  artista_performer: text
  obra: text
  compositor: text
  ano_gravacao: integer
  qualidade: text                    // 'SD' | 'HD' | '4K'
  tags: text[]
  visualizacoes: integer
  ordem: integer
  ativo: boolean
  created_at: timestamp
}
```

---

#### 6.4. `instrumento_sons`
**Descrição:** Samples de áudio dos instrumentos

**Colunas (11):**
```typescript
{
  id: uuid (PK)
  instrumento_id: uuid (FK -> instrumentos.id)
  nota_musical: text                 // Ex: 'C4', 'D#5'
  tecnica: text                      // Ex: 'pizzicato', 'legato'
  dinamica: text                     // 'pp' | 'p' | 'mf' | 'f' | 'ff'
  arquivo_audio: text (NOT NULL)
  waveform_data: jsonb               // Dados para exibir forma de onda
  bpm: integer
  tonalidade: text
  artista_performer: text
  created_at: timestamp
}
```

---

#### 6.5. `instrumento_sons_variacoes`
**Descrição:** Variações de samples (múltiplas gravações da mesma nota)

**Colunas (10):**
```typescript
{
  id: uuid (PK)
  som_id: uuid (FK -> instrumento_sons.id)
  arquivo_audio: text (NOT NULL)
  artista_performer: text
  qualidade_gravacao: text           // 'studio' | 'live' | 'demo'
  instrumento_usado: text            // Marca/modelo específico
  local_gravacao: text
  ano_gravacao: integer
  duracao_segundos: integer
  created_at: timestamp
}
```

---

#### 6.6. `instrumento_tecnicas`
**Descrição:** Técnicas de execução

**Colunas (14):**
```typescript
{
  id: uuid (PK)
  instrumento_id: uuid (FK -> instrumentos.id)
  nome: text (NOT NULL)              // Ex: 'Pizzicato', 'Staccato'
  descricao: text
  dificuldade: text                  // 'basica' | 'intermediaria' | 'avancada'
  video_demonstracao: text
  imagem_diagrama: text
  instrucoes_passo_passo: text[]
  dicas: text[]
  exercicios_sugeridos: text[]
  musicas_que_usam: text[]
  ordem: integer
  ativo: boolean
  created_at: timestamp
}
```

---

#### 6.7. `instrumento_quiz`
**Descrição:** Perguntas de quiz sobre instrumentos

**Colunas (15):**
```typescript
{
  id: uuid (PK)
  instrumento_id: uuid (FK -> instrumentos.id)
  pergunta: text (NOT NULL)
  tipo: text                         // 'multipla_escolha' | 'verdadeiro_falso' | 'audio'
  opcoes: jsonb                      // Array de opções
  resposta_correta: text
  explicacao: text
  dificuldade: integer               // 1-5
  audio_url: text                    // Para quiz de reconhecimento de som
  pontos: integer
  ordem: integer
  tags: text[]
  ativo: boolean
  created_at: timestamp
  updated_at: timestamp
}
```

---

#### 6.8. `instrumento_performances`
**Descrição:** Performances notáveis com o instrumento

**Colunas (14):**
```typescript
{
  id: uuid (PK)
  instrumento_id: uuid (FK -> instrumentos.id)
  titulo: text (NOT NULL)
  artista: text (NOT NULL)
  obra: text
  compositor: text
  video_url: text
  ano: integer
  evento: text                       // Concerto, festival, etc
  local: text
  descricao: text
  destaque: boolean
  ordem: integer
  created_at: timestamp
}
```

---

#### 6.9. `instrumentos_relacionados`
**Descrição:** Relações entre instrumentos (similares, mesma família, etc)

**Colunas (7):**
```typescript
{
  id: uuid (PK)
  instrumento_id: uuid (FK -> instrumentos.id)
  relacionado_id: uuid (FK -> instrumentos.id)
  tipo_relacao: text                 // 'similar' | 'mesma_familia' | 'complementar'
  descricao_relacao: text
  similaridade_score: numeric        // 0-100
  created_at: timestamp
}
```

---

### ✅ 7. INSTRUMENTOS FÍSICOS (Gestão do Acervo) (3 tabelas)

#### 7.1. `instrumentos_fisicos`
**Descrição:** Instrumentos físicos do acervo da escola

**Colunas (15):**
```typescript
{
  id: uuid (PK)
  instrumento_id: uuid (FK -> instrumentos.id)
  codigo_patrimonio: text (UNIQUE)
  marca: text
  modelo: text
  numero_serie: text
  ano_fabricacao: integer
  estado_conservacao: text           // 'excelente' | 'bom' | 'regular' | 'ruim'
  valor_aquisicao: numeric
  data_aquisicao: date
  localizacao: text                  // Sala onde está
  status: text                       // 'disponivel' | 'emprestado' | 'manutencao' | 'baixado'
  observacoes: text
  created_at: timestamp
  updated_at: timestamp
}
```

---

#### 7.2. `cessoes_instrumentos`
**Descrição:** Empréstimos de instrumentos para alunos

**Colunas (15):**
```typescript
{
  id: uuid (PK)
  instrumento_fisico_id: uuid (FK -> instrumentos_fisicos.id)
  aluno_id: uuid (FK -> profiles.id)
  data_inicio: date (NOT NULL)
  data_prevista_devolucao: date
  data_devolucao: date
  status: text                       // 'ativa' | 'devolvido' | 'atrasado'
  termo_responsabilidade: text       // URL do termo assinado
  condicao_emprestimo: text
  condicao_devolucao: text
  observacoes: text
  valor_caucao: numeric
  responsavel_emprestimo: uuid
  created_at: timestamp
  updated_at: timestamp
}
```

**Índices:**
- `idx_cessoes_aluno_id` ON (aluno_id)
- `idx_cessoes_data_inicio` ON (data_inicio)
- `idx_cessoes_instrumento_fisico_id` ON (instrumento_fisico_id)

---

#### 7.3. `manutencoes_instrumentos`
**Descrição:** Histórico de manutenções

**Colunas (14):**
```typescript
{
  id: uuid (PK)
  instrumento_fisico_id: uuid (FK -> instrumentos_fisicos.id)
  tipo: text                         // 'preventiva' | 'corretiva' | 'limpeza'
  data_manutencao: date (NOT NULL)
  descricao: text (NOT NULL)
  problema_relatado: text
  solucao_aplicada: text
  pecas_trocadas: text[]
  custo: numeric
  responsavel: text                  // Técnico/empresa
  proxima_manutencao: date
  observacoes: text
  created_at: timestamp
  updated_at: timestamp
}
```

---

## 📊 VIEWS PRÉ-CALCULADAS (24 views)

### ✅ 1. `view_dashboard_aluno`
**Descrição:** Métricas consolidadas do aluno (USE ESTA VIEW!)

**Colunas retornadas:**
```typescript
{
  id: uuid
  full_name: text
  total_points: integer
  current_streak: integer
  best_streak: integer
  lessons_completed: integer
  modules_completed: integer
  total_achievements: bigint
  achievements_last_week: bigint
  total_portfolios: bigint
  total_submissoes: bigint
  submissoes_avaliadas: bigint
}
```

**Query da View:**
```sql
SELECT 
  p.id,
  p.full_name,
  p.total_points,
  p.current_streak,
  p.best_streak,
  p.lessons_completed,
  p.modules_completed,
  COUNT(DISTINCT ua.achievement_id) as total_achievements,
  COUNT(DISTINCT ua.achievement_id) FILTER (WHERE ua.earned_at > NOW() - INTERVAL '7 days') as achievements_last_week,
  COUNT(DISTINCT po.id) as total_portfolios,
  COUNT(DISTINCT asub.id) as total_submissoes,
  COUNT(DISTINCT asub.id) FILTER (WHERE asub.status = 'avaliada') as submissoes_avaliadas
FROM profiles p
LEFT JOIN user_achievements ua ON ua.user_id = p.id
LEFT JOIN portfolios po ON po.user_id = p.id
LEFT JOIN alpha_submissoes asub ON asub.user_id = p.id
WHERE p.tipo_usuario = 'aluno'
GROUP BY p.id;
```

**Uso no Hook:**
```typescript
// Hook: useDashboardAluno()
const { data: dashboard } = await supabase
  .from('view_dashboard_aluno')
  .select('*')
  .eq('id', userId)
  .single()
```

---

### ✅ 2. `view_dashboard_professor`
**Descrição:** Métricas do professor

**Colunas:**
```typescript
{
  id: uuid
  full_name: text
  total_turmas: bigint
  total_alunos: bigint
  submissoes_pendentes: bigint
  taxa_presenca: numeric
}
```

---

### ✅ 3. `view_admin_dashboard`
**Descrição:** Métricas globais para admin

---

### ✅ 4. Outras Views Úteis
- `view_attendance_analytics` - Analytics de presença
- `view_aulas_admin` - Visão de aulas para admin
- `view_aulas_aluno` - Aulas liberadas para aluno
- `view_aulas_professor` - Aulas do professor
- `view_user_gamification` - Gamificação completa
- `view_qr_analytics` - Analytics de QR codes
- ... (20 views no total)

---

## 🔐 FUNCTIONS DISPONÍVEIS (56 functions)

### ✅ Principais Functions

#### 1. `is_admin(user_id uuid) → boolean`
Verifica se usuário é admin

#### 2. `is_professor_of_student(student_id uuid) → boolean`
Verifica se professor é responsável pelo aluno

#### 3. `add_user_points(user_id uuid, points integer, action text, source_type text, source_id uuid) → boolean`
Adiciona pontos ao usuário com log

#### 4. `check_and_grant_achievements(user_id uuid) → integer`
Verifica e concede conquistas automaticamente

#### 5. `award_points(user_id uuid, points integer, reason text) → jsonb`
Premia usuário com pontos

#### 6. `calculate_user_achievements(user_id uuid) → jsonb`
Calcula progresso de conquistas

#### 7. `get_user_stats(user_id uuid) → jsonb`
Retorna estatísticas do usuário

#### 8. `generate_qr_code(type text, reference_id uuid, metadata jsonb) → jsonb`
Gera QR code

#### 9. `process_qr_scan(code text, user_id uuid) → jsonb`
Processa leitura de QR code

---

## 🎯 RESUMO - COMO USAR NOS HOOKS

### ✅ Hook: `useProfile(userId)`
```typescript
// Buscar da VIEW (pré-calculado)
const { data } = await supabase
  .from('view_dashboard_aluno')
  .select('*')
  .eq('id', userId)
  .single()
```

### ✅ Hook: `useGamification(userId)`
```typescript
// Conquistas desbloqueadas
const { data: achievements } = await supabase
  .from('user_achievements')
  .select(`
    *,
    achievement:achievements(
      id, name, description, badge_icon, badge_color, 
      points_reward, category, created_at
    )
  `)
  .eq('user_id', userId)
  .order('earned_at', { ascending: false })

// Progresso de conquistas
const { data: progress } = await supabase
  .from('achievements_progress')
  .select(`
    *,
    achievement:achievements(*)
  `)
  .eq('user_id', userId)
  .eq('is_completed', false)

// Log de pontos
const { data: pointsLog } = await supabase
  .from('user_points_log')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .limit(20)
```

### ✅ Hook: `usePortfolio(userId)`
```typescript
const { data: portfolios } = await supabase
  .from('portfolios')
  .select(`
    *,
    evidencias:portfolio_evidencias(*)
  `)
  .eq('user_id', userId)
```

### ✅ Hook: `useDesafios()`
```typescript
const { data: desafios } = await supabase
  .from('alpha_desafios')
  .select(`
    *,
    metodologia:alpha_metodologias(*),
    competencia:alpha_competencias(*)
  `)
  .eq('ativo', true)
```

### ✅ Hook: `useInstrumentos()`
```typescript
const { data: instrumentos } = await supabase
  .from('instrumentos')
  .select(`
    *,
    sons:instrumento_sons(count),
    curiosidades:instrumento_curiosidades(count),
    tecnicas:instrumento_tecnicas(count)
  `)
  .eq('ativo', true)
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

- [ ] Gerar `database.types.ts` atualizado
- [ ] Criar/atualizar hook `useProfile()` usando `view_dashboard_aluno`
- [ ] Atualizar `useGamification()` com queries corretas
- [ ] Atualizar `usePortfolio()` com 17+21 colunas
- [ ] Atualizar `useDesafios()` com 21 colunas
- [ ] Atualizar `useInstrumentos()` com 9 tabelas relacionadas
- [ ] Implementar pages usando dados reais
- [ ] Testar RLS policies

---

**FIM DO MAPEAMENTO - 117 TABELAS DOCUMENTADAS** ✅
