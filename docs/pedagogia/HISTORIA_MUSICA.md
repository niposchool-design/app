# Historia da Musica (Historico de Referencia)

**Status:** historico de conteudo pedagogico

Este documento pode conter exemplos antigos de estrutura tecnica e nao deve ser usado como referencia de arquitetura do app.

Fonte tecnica atual: docs/arquitetura/ESTADO_ATUAL.md e docs/arquitetura/ROTAS_E_NAVEGACAO.md.

---

# Historia da Musica - Nipo School

Documento consolidado com toda a especificacao da funcionalidade de Historia da Musica: banco de dados, experiencia interativa, foco na tradicao oriental, componentes frontend, queries, gamificacao e roadmap.

---

## Sumario

1. [Visao Geral](#1-visao-geral)
2. [Banco de Dados - Schema Completo](#2-banco-de-dados---schema-completo)
3. [Dados Atuais no Banco](#3-dados-atuais-no-banco)
4. [Scripts SQL](#4-scripts-sql)
5. [Queries TypeScript (Supabase)](#5-queries-typescript-supabase)
6. [Experiencia Interativa (Estilo TikTok)](#6-experiencia-interativa-estilo-tiktok)
7. [Foco na Tradicao Oriental](#7-foco-na-tradicao-oriental)
8. [Componentes Frontend](#8-componentes-frontend)
9. [Rotas da Aplicacao](#9-rotas-da-aplicacao)
10. [Design System](#10-design-system)
11. [Responsividade](#11-responsividade)
12. [Performance](#12-performance)
13. [Gamificacao](#13-gamificacao)
14. [Pedagogia e Engajamento](#14-pedagogia-e-engajamento)
15. [Status de Implementacao](#15-status-de-implementacao)
16. [Troubleshooting](#16-troubleshooting)
17. [Roadmap - Proximos Passos](#17-roadmap---proximos-passos)
18. [Arquivos do Projeto](#18-arquivos-do-projeto)

---

## 1. Visao Geral

A funcionalidade de Historia da Musica do Nipo School oferece uma experiencia interativa que cobre **1.200 anos** de historia musical (794-2025), abrangendo **3 continentes** (Europa, Asia, America), **12 paises** e **32 generos musicais**.

O foco principal e a **tradicao musical japonesa** (Gagaku ate J-Pop), com conteudos europeus e brasileiros como **contexto cultural complementar**.

### Stack Tecnologico

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 (Server + Client Components) |
| Animacoes | Framer Motion 11 |
| Estilos | Tailwind CSS 3 + shadcn/ui |
| Icones | Lucide React |
| Banco de Dados | Supabase (PostgreSQL) |
| State | React useState (local) |
| Patterns | Composition, Atomic Design |

---

## 2. Banco de Dados - Schema Completo

### 2.1. Tabelas Principais

#### historia_periodos

```sql
CREATE TABLE historia_periodos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(100) NOT NULL,
  periodo_inicio INTEGER,
  periodo_fim INTEGER,
  descricao_curta TEXT,
  descricao_completa TEXT,
  contexto_historico TEXT,
  caracteristicas_principais JSONB,
  imagem_capa_url TEXT,
  cor_tematica VARCHAR(7),
  ordem_cronologica INTEGER,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### historia_compositores

```sql
CREATE TABLE historia_compositores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_completo VARCHAR(200) NOT NULL,
  nome_artistico VARCHAR(200),
  data_nascimento DATE,
  data_falecimento DATE,
  pais_nascimento VARCHAR(100),
  cidade_nascimento VARCHAR(100),
  periodo_id UUID REFERENCES historia_periodos(id),
  biografia_curta TEXT,
  biografia_completa TEXT,
  principais_obras TEXT[],
  estilo_musical VARCHAR(100),
  instrumentos_tocados TEXT[],
  curiosidades JSONB,
  foto_url TEXT,
  audio_assinatura_url TEXT,
  nivel_importancia INTEGER DEFAULT 1,
  tags TEXT[],
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### historia_obras

```sql
CREATE TABLE historia_obras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo VARCHAR(300) NOT NULL,
  titulo_original VARCHAR(300),
  compositor_id UUID REFERENCES historia_compositores(id),
  periodo_id UUID REFERENCES historia_periodos(id),
  ano_composicao INTEGER,
  tipo_obra VARCHAR(100),
  genero VARCHAR(100),
  duracao_minutos INTEGER,
  instrumentacao TEXT[],
  tonalidade VARCHAR(50),
  opus_numero VARCHAR(50),
  descricao TEXT,
  contexto_criacao TEXT,
  estrutura_formal JSONB,
  analise_musical TEXT,
  significado_historico TEXT,
  audio_url TEXT,
  partitura_url TEXT,
  video_performance_url TEXT,
  nivel_dificuldade INTEGER,
  popularidade INTEGER DEFAULT 0,
  tags TEXT[],
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### historia_generos

```sql
CREATE TABLE historia_generos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  periodo_origem_id UUID REFERENCES historia_periodos(id),
  decada_origem INTEGER,
  pais_origem VARCHAR(100),
  descricao TEXT,
  caracteristicas_musicais JSONB,
  generos_relacionados UUID[],
  compositores_principais UUID[],
  obras_representativas UUID[],
  influencias_culturais TEXT,
  imagem_url TEXT,
  cor_tematica VARCHAR(7),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 2.2. Tabelas de Apoio

#### historia_movimentos

```sql
CREATE TABLE historia_movimentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(200) NOT NULL,
  periodo_inicio INTEGER,
  periodo_fim INTEGER,
  locais_principais TEXT[],
  manifesto TEXT,
  caracteristicas JSONB,
  compositores UUID[],
  obras_iconicas UUID[],
  contexto_historico TEXT,
  legado TEXT,
  imagem_url TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### historia_instrumentos_evolucao

```sql
CREATE TABLE historia_instrumentos_evolucao (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instrumento_id UUID REFERENCES instrumentos(id),
  periodo_id UUID REFERENCES historia_periodos(id),
  versao_historica VARCHAR(200),
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
```

#### historia_conceitos_teoricos

```sql
CREATE TABLE historia_conceitos_teoricos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(200) NOT NULL,
  categoria VARCHAR(100),
  definicao_simples TEXT,
  definicao_tecnica TEXT,
  periodo_origem_id UUID REFERENCES historia_periodos(id),
  exemplos_auditivos JSONB,
  diagramas_url TEXT[],
  nivel_dificuldade INTEGER,
  pre_requisitos UUID[],
  exercicios JSONB,
  tags TEXT[],
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### historia_eventos_timeline

```sql
CREATE TABLE historia_eventos_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ano INTEGER NOT NULL,
  mes INTEGER,
  dia INTEGER,
  titulo VARCHAR(300) NOT NULL,
  tipo_evento VARCHAR(50),
  categoria VARCHAR(50),
  descricao TEXT,
  compositor_id UUID REFERENCES historia_compositores(id),
  obra_id UUID REFERENCES historia_obras(id),
  periodo_id UUID REFERENCES historia_periodos(id),
  imagem_url TEXT,
  importancia INTEGER DEFAULT 1,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### historia_contexto_cultural

```sql
CREATE TABLE historia_contexto_cultural (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periodo_id UUID REFERENCES historia_periodos(id),
  titulo VARCHAR(300) NOT NULL,
  tipo VARCHAR(50),
  descricao TEXT,
  impacto_na_musica TEXT,
  ano_inicio INTEGER,
  ano_fim INTEGER,
  imagens_url TEXT[],
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 2.3. Tabelas de Progresso e Quiz

#### historia_progresso_usuario

```sql
CREATE TABLE historia_progresso_usuario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  tipo_conteudo VARCHAR(50),
  conteudo_id UUID NOT NULL,
  progresso INTEGER DEFAULT 0,
  tempo_estudado_minutos INTEGER DEFAULT 0,
  concluido BOOLEAN DEFAULT false,
  data_conclusao TIMESTAMPTZ,
  notas_pessoais TEXT,
  favorito BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, tipo_conteudo, conteudo_id)
);
```

#### historia_quiz

```sql
CREATE TABLE historia_quiz (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo VARCHAR(300) NOT NULL,
  periodo_id UUID REFERENCES historia_periodos(id),
  nivel_dificuldade INTEGER,
  tipo VARCHAR(50),
  pergunta TEXT NOT NULL,
  opcoes JSONB,
  explicacao TEXT,
  audio_url TEXT,
  imagem_url TEXT,
  tags TEXT[],
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### historia_quiz_respostas

```sql
CREATE TABLE historia_quiz_respostas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  quiz_id UUID REFERENCES historia_quiz(id),
  resposta_escolhida TEXT,
  correta BOOLEAN,
  tempo_resposta_segundos INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### historia_playlists

```sql
CREATE TABLE historia_playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo VARCHAR(300) NOT NULL,
  descricao TEXT,
  tipo VARCHAR(50),
  tema VARCHAR(200),
  periodo_id UUID REFERENCES historia_periodos(id),
  criador_id UUID REFERENCES profiles(id),
  nivel_recomendado VARCHAR(50),
  ordem_obras JSONB,
  duracao_total_minutos INTEGER,
  visualizacoes INTEGER DEFAULT 0,
  publicada BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 3. Dados Atuais no Banco

### 3.1. Numeros Gerais

| Tabela | Total |
|--------|-------|
| Periodos historicos | 23 |
| Compositores | 40 |
| Obras musicais | 29 |
| Generos musicais | 32 |
| Duplicatas | 0 |
| Compositores sem periodo | 0 |
| Obras sem compositor | 0 |

### 3.2. Periodos por Ordem Cronologica

| # | Periodo | Anos | Regiao | Compositores | Obras |
|---|---------|------|--------|-------------|-------|
| 1 | Medieval | 500-1400 | Europa | - | - |
| 2 | Renascimento | 1400-1600 | Europa | - | - |
| 3 | Barroco | 1600-1750 | Europa | 10 | 9 |
| 4 | Classico | 1750-1820 | Europa | 3 | 5 |
| 5 | Romantico | 1820-1900 | Europa | 12 | - |
| 6 | Impressionismo | 1890-1920 | Europa | 1 | - |
| 7 | Modernismo | 1900-1950 | Europa | 3 | - |
| 8 | Contemporaneo | 1950-2024 | Europa | - | - |
| 9 | Jazz | 1895-2024 | Global | - | - |
| 10 | MPB | 1960-2024 | Brasil | - | - |
| 11 | Bossa Nova | 1958-1970 | Brasil | 3 | 2 |
| 12 | Rock | 1950-2024 | Global | - | - |
| 13 | Periodo Heian | 794-1185 | Japao | - | - |
| 14 | Periodo Kamakura | 1185-1333 | Japao | - | - |
| 15 | Periodo Edo | 1603-1868 | Japao | 1 | 1 |
| 16 | Era Meiji | 1868-1912 | Japao | 2 | 1 |
| 17 | Showa Pos-Guerra | 1945-1989 | Japao | 1 | 1 |
| 18 | J-Pop Contemporaneo | 1990-2025 | Japao | 3 | 3 |
| 19 | Brasil Colonial | 1500-1822 | Brasil | - | - |
| 20 | Brasil Imperial | 1822-1889 | Brasil | 2 | 2 |
| 21 | Era do Radio | 1930-1950 | Brasil | 1 | 1 |
| 22 | MPB e Tropicalia | 1965-1980 | Brasil | 3 | 3 |
| 23 | Musica Brasileira Contemporanea | 1980-2025 | Brasil | 1 | 1 |

### 3.3. Distribuicao por Regiao

- Europa: 8 periodos (Medieval ate Contemporaneo)
- Japao: 6 periodos (Heian ate J-Pop)
- Brasil: 5 periodos (Colonial ate Contemporaneo)
- Global: 4 periodos (Jazz, MPB, Bossa Nova, Rock)

### 3.4. Compositores por Pais

| Pais | Quantidade |
|------|-----------|
| Brasil | 10 |
| Japao | 7 |
| Alemanha | 6 |
| Austria | 3 |
| Russia | 3 |
| Italia | 3 |
| Hungria | 2 |
| Franca | 1 |
| Polonia | 1 |
| EUA | 1 |

### 3.5. Top Compositores (por numero de obras)

1. **J.S. Bach** (Alemanha, Barroco) - 3 obras
2. **Beethoven** (Alemanha, Classico) - 2 obras
3. **Tom Jobim** (Brasil, Bossa Nova) - 2 obras
4. **W.A. Mozart** (Austria, Classico) - 2 obras
5. Gilberto Gil, Takemitsu, Taki, Joe Hisaishi, Caetano, Chico - 1 obra cada

### 3.6. Integridade dos Dados

- Todos compositores possuem biografia completa
- Todos compositores possuem curiosidades (JSONB)
- Todos compositores possuem periodo definido
- Todas obras possuem compositor vinculado
- Todas obras possuem descricao

---

## 4. Scripts SQL

### 4.1. Scripts Executados (em ordem)

#### 1. LIMPAR_E_CORRIGIR_HISTORIA.sql

Removeu todas as duplicatas (periodos, compositores, obras) usando `ROW_NUMBER()` e `PARTITION BY` para evitar erro de `MIN(uuid)` no PostgreSQL.

#### 2. RELATORIO_COMPLETO_HISTORIA.sql

Gerou relatorio completo do banco. Identificou 6 compositores sem periodo, 3 obras sem compositor e 15 generos sem periodo.

#### 3. CORRIGIR_RELACIONAMENTOS.sql

Corrigiu vinculos pendentes:
- Yatsuhashi Kengyo -> Periodo Edo
- Rentaro Taki -> Era Meiji
- Kosaku Yamada -> Era Meiji
- Toru Takemitsu -> Showa Pos-Guerra
- Pixinguinha -> Era do Radio
- Milton Nascimento -> Musica Brasileira Contemporanea

#### 4. ADICIONAR_COMPOSITORES_FALTANTES.sql

Adicionou compositores barrocos faltantes e suas obras:
- Johann Pachelbel (1653-1706) -> "Canon em Re maior"
- Antonio Vivaldi (1678-1741) -> "As Quatro Estacoes"
- George Frideric Handel (1685-1759) -> "Messias"

#### 5. POPULAR_HISTORIA_MUSICA_COMPLETA.sql

Script original de populacao dos dados iniciais.

### 4.2. Verificacao via SQL

```sql
-- Total de registros
SELECT
  'Periodos' AS tabela, COUNT(*) AS total
FROM historia_periodos WHERE ativo = true
UNION ALL
SELECT 'Compositores', COUNT(*)
FROM historia_compositores WHERE ativo = true
UNION ALL
SELECT 'Obras', COUNT(*)
FROM historia_obras WHERE ativo = true;

-- Compositores por pais
SELECT pais_nascimento, COUNT(*)
FROM historia_compositores
WHERE ativo = true
GROUP BY pais_nascimento;
```

### 4.3. Dados de Exemplo para Insercao

```sql
INSERT INTO historia_periodos (nome, periodo_inicio, periodo_fim, descricao_curta, caracteristicas_principais, cor_tematica, ordem_cronologica) VALUES
('Medieval', 500, 1400, 'Musica da Idade Media, dominada pela Igreja Catolica', '["Cantochao", "Organum", "Monodia sacra"]', '#8B4513', 1),
('Renascimento', 1400, 1600, 'Polifonia vocal e surgimento da musica instrumental', '["Polifonia", "Madrigal", "Missa"]', '#DAA520', 2),
('Barroco', 1600, 1750, 'Ornamentacao, baixo continuo e nascimento da opera', '["Fuga", "Concerto Grosso", "Opera"]', '#4B0082', 3),
('Classico', 1750, 1820, 'Clareza, equilibrio e forma sonata', '["Sinfonia", "Sonata", "Quarteto de cordas"]', '#4169E1', 4),
('Romantico', 1820, 1900, 'Emocao, expressao individual e nacionalismo', '["Lied", "Poema Sinfonico", "Bale"]', '#DC143C', 5),
('Impressionismo', 1890, 1920, 'Cores sonoras e ambiguidade tonal', '["Escalas exoticas", "Timbres", "Atmosfera"]', '#9370DB', 6),
('Moderno', 1900, 1945, 'Atonalidade, dodecafonismo e experimentacao', '["Serialismo", "Politonalidade", "Atonalidade"]', '#FF6347', 7),
('Contemporaneo', 1945, 2024, 'Musica eletronica, minimalismo e fusoes', '["Eletronica", "Minimalismo", "Musica concreta"]', '#00CED1', 8),
('Jazz', 1900, 2024, 'Improvisacao, swing e blue notes', '["Improviso", "Swing", "Blue notes"]', '#FFD700', 9),
('Popular do Seculo XX', 1950, 2024, 'Rock, Pop, MPB, Samba e variantes', '["Groove", "Refrao", "Producao"]', '#FF1493', 10);
```

```sql
INSERT INTO historia_compositores (nome_completo, data_nascimento, data_falecimento, pais_nascimento, periodo_id, biografia_curta, principais_obras, estilo_musical, nivel_importancia) VALUES
('Johann Sebastian Bach', '1685-03-21', '1750-07-28', 'Alemanha',
  (SELECT id FROM historia_periodos WHERE nome='Barroco'),
  'Mestre do contraponto e da fuga, considerado um dos maiores compositores de todos os tempos.',
  ARRAY['Tocata e Fuga em Re menor', 'Missa em Si menor', 'Concertos de Brandemburgo'], 'Barroco', 5),
('Antonio Vivaldi', '1678-03-04', '1741-07-28', 'Italia',
  (SELECT id FROM historia_periodos WHERE nome='Barroco'),
  'Padre vermelho de Veneza, criador de centenas de concertos virtuosisticos.',
  ARRAY['As Quatro Estacoes', 'Gloria', 'L''Estro Armonico'], 'Barroco', 5),
('Wolfgang Amadeus Mozart', '1756-01-27', '1791-12-05', 'Austria',
  (SELECT id FROM historia_periodos WHERE nome='Classico'),
  'Genio precoce que dominou todas as formas musicais de sua epoca.',
  ARRAY['Requiem', 'Sinfonia n 40', 'Don Giovanni'], 'Classico', 5),
('Ludwig van Beethoven', '1770-12-17', '1827-03-26', 'Alemanha',
  (SELECT id FROM historia_periodos WHERE nome='Classico'),
  'Revolucionou a musica sinfonica e continuou compondo mesmo surdo.',
  ARRAY['Sinfonia n 9', 'Sinfonia n 5', 'Sonata ao Luar'], 'Classico/Romantico', 5),
('Antonio Carlos Jobim', '1927-01-25', '1994-12-08', 'Brasil',
  (SELECT id FROM historia_periodos WHERE nome='Popular do Seculo XX'),
  'Pai da Bossa Nova, revolucionou a musica popular brasileira.',
  ARRAY['Garota de Ipanema', 'Aguas de Marco', 'Chega de Saudade'], 'Bossa Nova', 5);
```

---

## 5. Queries TypeScript (Supabase)

### 5.1. Queries Otimizadas (`lib/supabase/queries/historia-completo.ts`)

#### Periodos

```typescript
getPeriodosHistoria()        // Lista todos ordenados por data
getPeriodoCompleto(id)       // Com compositores e obras
```

#### Compositores

```typescript
getCompositoresCompletos()     // Todos com periodo e obras
getCompositoresByPeriodo(id)   // Filtrar por periodo
getCompositorCompleto(id)      // Com periodo e obras
```

#### Obras

```typescript
getObrasCompletas()    // Todas com compositor e periodo
getObraCompleta(id)    // Com todas as relacoes
```

#### Timeline

```typescript
getTimelineCompleta()  // Periodos + compositores + obras agrupados
```

#### Estatisticas

```typescript
getHistoriaStats()     // Contagens gerais
getStatsByPais()       // Compositores por pais
getStatsByPeriodo()    // Compositores e obras por periodo
```

### 5.2. Queries com Filtros (`lib/supabase/queries/historia-musica.ts`)

```typescript
// Compositores com filtros
getCompositores({ periodoId?, paisNascimento?, limit? })

// Obras com filtros
getObras({ compositorId?, periodoId?, genero?, limit? })

// Timeline com filtros
getTimelineEventos({ anoInicio?, anoFim?, categoria?, importanciaMinima? })

// Progresso do usuario
getProgressoUsuario(userId)
marcarConteudoConcluido(userId, tipoConteudo, conteudoId)
registrarTempoEstudo(userId, tipoConteudo, conteudoId, minutosEstudados)

// Quiz
getQuizPorPeriodo(periodoId)
registrarRespostaQuiz(userId, quizId, respostaEscolhida, correta, tempoRespostaSegundos)
```

### 5.3. Verificacao via TypeScript

```typescript
import {
  getTimelineCompleta,
  getHistoriaStats,
  getStatsByPais
} from '@/lib/supabase/queries/historia-completo';

const stats = await getHistoriaStats();
const timeline = await getTimelineCompleta();
```

---

## 6. Experiencia Interativa (Estilo TikTok)

A pagina de Historia da Musica foi transformada de uma lista estatica para uma experiencia interativa com foco em **retencao e engajamento**.

### 6.1. Hero Section

- Gradiente vibrante roxo/rosa/laranja
- 4 Stats Pills animadas (23 Periodos, 40 Compositores, 29 Obras, 32 Generos)
- Wave decorativa SVG na base
- Animacoes de entrada escalonadas

### 6.2. View Switcher (sticky no topo)

Tres visualizacoes disponiveis:

| View | Descricao |
|------|-----------|
| Tradicao Japonesa | Timeline tipo TikTok Stories com periodos japoneses |
| Contexto Mundial | Cards organizados por regiao/continente |
| Mestres | Grid estilo Pinterest com filtros por pais |

### 6.3. Timeline Visual (View 1)

- Navegacao swipe-like com botoes prev/next e animacoes spring
- Card principal full-screen com gradientes vibrantes por regiao
- Barra de progresso (1 de 23)
- Mini dots navigation para saltar entre periodos
- Foco nos 6 periodos japoneses (Heian, Edo, Meiji, Showa, J-Pop)
- Cores: gradiente vermelho/rosa (cores imperiais)

### 6.4. Cards de Regiao (View 2)

- Banner explicativo sobre foco na tradicao japonesa
- Ordem: Japao (com badge "FOCO PRINCIPAL") -> Europa -> Brasil -> Global
- Header colorido com contagem de periodos
- Grid responsivo: 1 col mobile / 2 col tablet / 3 col desktop
- Badges com datas, pills de compositores (top 3), lista de obras (top 2)
- Hover effects: scale 1.05 + shadow-xl

### 6.5. Grid de Compositores (View 3)

- Filtro inicial: Japao (destacado em vermelho-rosa)
- Ordem dos filtros: Japao / Todos / Europa / Brasil
- Banner de destaque "Mestres da Musica Japonesa"
- Cards com gradiente roxo/rosa/laranja no topo
- Badge de pais (emoji bandeira + nome)
- Grid masonry: 1->2->3->4 colunas por breakpoint

### 6.6. Modal de Detalhes

- Overlay com backdrop-blur
- Scroll interno (max 90vh)
- Header fixo com gradiente
- Secoes: descricao, grid de compositores, lista de obras
- Botao X de fechar com animacao

### 6.7. Curiosidades (3 cards focados em Japao)

1. **Gagaku Imperial** - Musica mais antiga do Japao (1.200+ anos), instrumentos sho e biwa
2. **Tradicao & Modernidade** - Takemitsu: Zen + harmonias ocidentais, ponte Oriente-Ocidente
3. **J-Pop Mundial** - Enka -> J-Pop, identidade unica japonesa

---

## 7. Foco na Tradicao Oriental

O aplicativo prioriza a **tradicao musical japonesa**, com conteudos europeus e brasileiros como contexto complementar.

### 7.1. Pagina de Historia (`/alunos/historia`)

- Titulo: "Historia da Musica Japonesa"
- Descricao: foco em Gagaku -> J-Pop (1.200 anos)
- Timeline mostra APENAS periodos japoneses na View 1
- Regiao japonesa aparece em primeiro com badge "FOCO PRINCIPAL"
- Filtro de compositores inicia em "Japao"

### 7.2. Dashboard Principal (`/alunos`)

- **BannerTradicaoOriental**: hero com "Nipo School - Tradicao Musical Japonesa ao Alcance de Todos"
  - Pills: Cultura Autentica, Professores Certificados, Metodo Interativo, Certificacao
- **CulturaJaponesaNav**: grid de 4 cards de navegacao
  1. Historia Musical Japonesa (com ring dourado "FOCO PRINCIPAL")
  2. Instrumentos Tradicionais
  3. Aulas & Teoria
  4. Seu Progresso
- Exemplo de proxima aula: "Introducao ao Koto"
- Linguagem cultural: "Ganbatte kudasai!"

### 7.3. Hierarquia Visual

| Elemento | Tratamento |
|----------|-----------|
| Japao | Badge "FOCO PRINCIPAL", ring dourado, cores imperiais (vermelho-rosa) |
| Europa | Label "Contexto: Musica Classica Ocidental" |
| Brasil | Label "Contexto: Ritmos Brasileiros" |
| Global | Label "Contexto: Estilos Globais" |

### 7.4. Principios Pedagogicos do Foco Oriental

1. **Imersao Primaria**: aluno ve PRIMEIRO o conteudo japones
2. **Hierarquia Visual**: badges, rings dourados, cores imperiais
3. **Contextualizacao**: Europa/Brasil apresentados como "Contexto"
4. **Identidade Forte**: emojis culturais, gradientes especificos, linguagem cultural

---

## 8. Componentes Frontend

### 8.1. Arvore de Componentes

```
HistoriaPage (Root - Client Component)
|-- Hero Section
|   |-- Title Badge
|   |-- Stats Pills (4x)
|   +-- Wave Decoration
|-- View Switcher (Sticky)
|   +-- Tabs (3x)
|-- AnimatePresence (Route Changes)
|   |-- VisualTimeline
|   |   |-- Progress Bar
|   |   |-- Card Principal (animated)
|   |   |-- Pills de Compositores
|   |   |-- Lista de Obras
|   |   |-- Navigation Buttons
|   |   +-- Dots Navigation
|   |-- RegionSection (4x)
|   |   |-- Header Gradient
|   |   +-- Grid de Cards
|   +-- CompositoresGrid
|       |-- Filtros (4x)
|       +-- Masonry Grid
|-- PeriodoDetailModal (Conditional)
|   |-- Header Fixo
|   |-- Descricao
|   |-- Grid Compositores
|   +-- Lista Obras
+-- Curiosidades (3 cards)
```

### 8.2. Componentes de Navegacao (`components/cultura-japonesa-nav.tsx`)

- **BannerTradicaoOriental**: hero full-width com gradiente vermelho-rosa-laranja
- **CulturaJaponesaNav**: grid responsivo de 4 cards com destaque dourado

### 8.3. Feature Module (Estrutura Alvo)

```
src/features/historia-musica/
|-- pages/
|   |-- HistoriaHomePage.tsx
|   |-- PeriodosPage.tsx
|   |-- CompositoresPage.tsx
|   |-- ObrasPage.tsx
|   |-- GenerosMusicaisPage.tsx
|   |-- TimelinePage.tsx
|   |-- ConceitosTeoricosPage.tsx
|   |-- BibliotecaAudioPage.tsx
|   +-- QuizHistoriaPage.tsx
|-- components/
|   |-- PeriodoCard.tsx
|   |-- CompositorCard.tsx
|   |-- ObraCard.tsx
|   |-- TimelineInterativa.tsx
|   |-- AudioPlayer.tsx
|   |-- PartituraViewer.tsx
|   |-- MapaMundialMusica.tsx
|   |-- QuizCard.tsx
|   +-- ProgressTracker.tsx
|-- hooks/
|   |-- useHistoriaPeriodos.ts
|   |-- useCompositores.ts
|   |-- useObras.ts
|   |-- useHistoriaProgresso.ts
|   +-- useQuizHistoria.ts
+-- utils/
    |-- formatarPeriodo.ts
    +-- calcularProgressoTotal.ts
```

---

## 9. Rotas da Aplicacao

### 9.1. Rotas Atuais

```
app/(protected)/alunos/historia/page.tsx   -- Pagina principal
app/api/historia/timeline/route.ts         -- API endpoint
```

### 9.2. Rotas Planejadas

```
/alunos/historia                     -- Dashboard principal
/alunos/historia/periodo/[id]        -- Detalhes do periodo
/alunos/historia/compositor/[id]     -- Biografia completa
/alunos/historia/obra/[id]           -- Detalhes da obra com player

/historia/periodos                   -- Explorar periodos
/historia/periodos/:id               -- Detalhes do periodo
/historia/compositores               -- Galeria de compositores
/historia/compositores/:id           -- Detalhes do compositor
/historia/obras                      -- Catalogo de obras
/historia/obras/:id                  -- Detalhes da obra
/historia/timeline                   -- Linha do tempo interativa
/historia/generos                    -- Estilos e generos
/historia/generos/:id                -- Detalhes do genero
/historia/teoria                     -- Teoria musical
/historia/teoria/:id                 -- Detalhes do conceito
/historia/quiz                       -- Quiz de conhecimento
/historia/biblioteca                 -- Biblioteca de audios
/historia/playlists                  -- Playlists pedagogicas
/historia/progresso                  -- Progresso pessoal
```

---

## 10. Design System

### 10.1. Cores por Regiao

```tsx
europa: 'from-blue-500 to-indigo-600'
japao:  'from-red-500 to-pink-600'
brasil: 'from-green-500 to-emerald-600'
global: 'from-purple-500 to-violet-600'
```

### 10.2. Identidade Japonesa

```tsx
// Tradicao Japonesa (vermelho imperial)
'from-red-500 to-pink-600'

// Destaque dourado (foco principal)
'ring-4 ring-yellow-400'
'bg-yellow-400 text-red-700'

// Gradiente Hero
'from-red-600 via-pink-600 to-orange-600'
```

### 10.3. Filtro de Periodos Japoneses

```tsx
japao: periodos.filter(p =>
  p.nome.includes('Japao') ||
  p.nome.includes('Heian') ||
  p.nome.includes('Edo') ||
  p.nome.includes('Meiji') ||
  p.nome.includes('Showa') ||
  p.nome.includes('J-Pop')
)
```

### 10.4. Animacoes (Framer Motion)

| Tipo | Descricao |
|------|-----------|
| Entrada de cards | `opacity: 0, y: 20` -> `opacity: 1, y: 0` |
| Troca de periodo | `x: +-100` -> `x: 0` com spring |
| Pills de stats | Delays escalonados (0.1s cada) |
| Hero | Scale 0 -> 1 com spring stiffness: 200 |

### 10.5. Micro-interacoes

- Heart fill no hover das obras
- Scale 1.1 no botao de play
- Share button com hover scale
- Navigation dots expandem de 1.5px -> 8px
- Cards scale 1.05 + shadow-xl no hover

---

## 11. Responsividade

### 11.1. Breakpoints

| Dispositivo | Largura | Colunas | Comportamento |
|------------|---------|---------|---------------|
| Mobile | < 640px | 1 | Pills compactas, view switcher so icones, modal fullscreen |
| Tablet | 640-1024px | 2 | Labels visiveis, navegacao touch otimizada |
| Desktop | > 1024px | 3-4 | Experiencia completa, hover effects, cursor personalizado |

### 11.2. Adaptacoes Mobile

- Timeline ocupa tela cheia com barra de progresso completa
- View switcher mostra apenas icones
- Modal ocupa 100% da viewport
- Grid de compositores: 1 coluna centralizada
- Banner responsivo com texto compacto

---

## 12. Performance

### 12.1. Estrategias Implementadas

- **API Route Caching**: `/api/historia/timeline` com force-dynamic
- **Parallel fetching**: `Promise.all([timeline, stats])`
- **Lazy loading**: AnimatePresence desmonta componentes inativos
- **Limit inicial**: `slice(0, 3)` para obras/compositores
- **Event delegation**: dots navigation com map indexado
- **Animacoes GPU**: translateX, opacity, scale (nao left/right)
- **Queries otimizadas**: JOINs com indices no banco

### 12.2. Metricas Esperadas

| Metrica | Alvo |
|---------|------|
| First Paint | < 1.5s |
| Time to Interactive | < 3s |
| Layout Shift | 0 |
| FPS (animacoes) | 60 |

---

## 13. Gamificacao

### 13.1. Conquistas de Historia da Musica

```sql
INSERT INTO achievements (name, description, badge_icon, badge_color, points_reward,
  category, requirement_type, requirement_value, is_active) VALUES
-- Periodos
('Viajante do Tempo', 'Explorou todos os periodos da historia da musica', '???', '#6366F1', 100, 'historia', 'periodos_explorados', 10, true),
('Especialista Barroco', 'Estudou 10 compositores do periodo Barroco', '???', '#8B5CF6', 50, 'historia', 'compositores_periodo', 10, true),
('Mestre Classico', 'Completou 20 obras do periodo Classico', '???', '#EC4899', 50, 'historia', 'obras_periodo', 20, true),
-- Compositores
('Conhecedor de Genios', 'Estudou 20 compositores diferentes', '???', '#F59E0B', 75, 'historia', 'compositores_estudados', 20, true),
('Biografo Musical', 'Leu 50 biografias completas', '???', '#10B981', 100, 'historia', 'biografias_lidas', 50, true),
-- Obras
('Colecionador de Obras', 'Ouviu 100 obras diferentes', '???', '#EF4444', 150, 'historia', 'obras_ouvidas', 100, true),
('Maratonista Sinfonico', 'Ouviu 10 sinfonias completas', '???', '#06B6D4', 80, 'historia', 'sinfonias_completas', 10, true),
-- Quiz
('Historiador Iniciante', 'Acertou 50 perguntas de quiz', '???', '#84CC16', 30, 'historia', 'quiz_acertos', 50, true),
('Historiador Expert', 'Acertou 200 perguntas de quiz', '???', '#F59E0B', 100, 'historia', 'quiz_acertos', 200, true),
-- Timeline e Teoria
('Cronologista', 'Explorou toda a linha do tempo', '???', '#6366F1', 50, 'historia', 'timeline_completa', 1, true),
('Teorico Musical', 'Dominou 30 conceitos teoricos', '???', '#8B5CF6', 120, 'historia', 'conceitos_dominados', 30, true);
```

### 13.2. Integracao com Quiz

Quando o aluno acerta uma questao, o sistema chama:

```typescript
await supabase.rpc('award_points', {
  p_user_id: userId,
  p_points: 10,
  p_action_type: 'quiz_correto',
  p_reference_type: 'quiz',
  p_reference_id: quizId,
  p_description: 'Acertou quiz de historia da musica',
})
```

---

## 14. Pedagogia e Engajamento

### 14.1. Teoria da Aprendizagem

| Tecnica | Aplicacao |
|---------|----------|
| Spaced Repetition | Timeline revisa mesmos periodos em ordens diferentes |
| Active Recall | Modal forca lembrar compositores vistos no card |
| Chunking | Informacao agrupada (3 compositores, 2 obras por card) |
| Multimodal | Visual (cores) + Textual (descricoes) |

### 14.2. Engajamento Cognitivo

| Principio | Implementacao |
|-----------|--------------|
| Curiosity Gap | Preview incentiva clique "Ver Detalhes" |
| Dopamine Loops | Animacao -> Clique -> Recompensa visual |
| Progress Tracking | Barra mostra avanco concreto |
| Social Proof | Contadores (23 periodos, 40 compositores) |

### 14.3. Principios UX Aplicados

- **Lei de Hick**: Maximo 3 opcoes visiveis por vez
- **Efeito Zeigarnik**: Mostra preview, incentiva clique "Ver Detalhes"
- **Progressive Disclosure**: Informacao em camadas (card -> modal -> pagina)
- **Peak-End Rule**: Animacoes marcantes no inicio e fim de acoes

### 14.4. Estrategias de Retencao

1. Descoberta ativa: navegacao tipo stories incentiva exploracao
2. Feedback visual instantaneo: animacoes confirmam cada acao
3. Informacao dosada: top 3-6 itens visiveis, resto em "+X"
4. Cores vibrantes: gradientes chamam atencao
5. Gamificacao visual: progresso na timeline = sensacao de avanco
6. Microinteracoes: hover/click sempre tem resposta visual
7. Densidade controlada: cards nao sobrecarregam visualmente

### 14.5. Dicas de Uso

**Para Professores:**
- Use a Timeline Visual em aulas presenciais (projetor)
- Filtro de Compositores para busca rapida
- Modal ideal para mostrar relacionamentos entre periodos
- Destaque o foco japones em aulas inaugurais

**Para Alunos Iniciantes:**
- Comece pela Timeline Visual (View 1)
- Explore os 6 periodos japoneses cronologicamente
- Use o modal para detalhes de cada periodo

**Para Alunos Avancados:**
- Filtre "Mestres" por Japao
- Compare com contextos Europa/Brasil
- Identifique influencias cruzadas

---

## 15. Status de Implementacao

### 15.1. Concluido

- [x] Banco de dados: tabelas criadas e populadas
- [x] Limpeza de duplicatas
- [x] Correcao de todos os relacionamentos
- [x] Queries TypeScript otimizadas com JOINs
- [x] Frontend com timeline por regiao (Europa, Japao, Brasil)
- [x] Experiencia interativa estilo TikTok (3 views)
- [x] Timeline visual com navegacao tipo stories
- [x] Modal de detalhes
- [x] Grid de compositores com filtros
- [x] Animacoes Framer Motion (15+ micro-animacoes)
- [x] Responsividade mobile/tablet/desktop
- [x] Foco na tradicao oriental implementado
- [x] Banner de tradicao no dashboard
- [x] Componente CulturaJaponesaNav
- [x] API route `/api/historia/timeline`
- [x] Loading state com spinner
- [x] Error handling (try/catch)
- [x] Framer Motion instalado no projeto

### 15.2. Pendente

- [ ] Pagina de detalhes do periodo (`/periodo/[id]`)
- [ ] Pagina de detalhes do compositor (`/compositor/[id]`)
- [ ] Pagina de detalhes da obra (`/obra/[id]`)
- [ ] Audio player integrado (HTML5 `<audio>`)
- [ ] Sistema de favoritos (localStorage ou DB)
- [ ] Progresso de visualizacao (checkmarks)
- [ ] Quiz interativo por periodo
- [ ] Busca/filtro em tempo real
- [ ] Playlists pedagogicas
- [ ] Compartilhamento social (Open Graph)
- [ ] Sistema de XP/badges
- [ ] Ranking entre alunos
- [ ] PWA com modo offline
- [ ] Notificacoes push
- [ ] Testes E2E
- [ ] Lighthouse audit (alvo > 90)
- [ ] Acessibilidade (ARIA labels, screen reader)
- [ ] SEO metadata
- [ ] Popular tabela `historia_instrumentos_evolucao`
- [ ] Criar eventos para `historia_eventos_timeline`
- [ ] Adicionar conceitos teoricos
- [ ] Vincular 15 generos sem periodo

### 15.3. Metricas de Comparacao (Antes vs Depois)

| Metrica | Antes | Depois |
|---------|-------|--------|
| Interatividade | 1/10 | 9/10 |
| Navegacao | Linear | Multi-view |
| Animacoes | 0 | 15+ |
| Paletas de cor | Monocromatico | 4 tematicas |
| Mobile UX | Basico | Responsivo completo |
| Feedback visual | Nenhum | Constante |
| Tempo estimado na pagina | 2 min | 8-15 min |
| Foco principal | Musica mundial | Tradicao japonesa |

---

## 16. Troubleshooting

### Animacoes nao funcionam

```bash
npm install framer-motion@latest
```

### API retorna erro 500

- Verificar conexao com Supabase
- Rodar `sql_scripts/DIAGNOSTICO_COMPLETO_BANCO.sql`
- Checar se `historia-completo.ts` existe

### Cards nao aparecem

- Verificar se timeline tem dados: `console.log(timeline)`
- Checar se `periodos.length > 0`
- Ver console do navegador

### Modal nao fecha

- Confirmar que `onClose` esta sendo passado
- Verificar z-index conflicts

### Notas Importantes

1. **Duplicatas**: aconteceram porque o script foi executado multiplas vezes sem `ON CONFLICT DO NOTHING`
2. **Relacionamentos**: alguns compositores estavam sem `periodo_id` porque subqueries nao encontraram o periodo (por duplicatas)
3. **Ordem cronologica**: frontend deve ordenar por `periodo_inicio` (data real), nao por `ordem_cronologica` (numero sequencial)
4. **RLS**: politicas ativas - use anon key para leitura, service role para admin

---

## 17. Roadmap - Proximos Passos

### Fase 1 - Essenciais (1-2 semanas)

1. Criar pagina `/periodo/[id]` com detalhes completos
2. Criar pagina `/compositor/[id]` com biografia
3. Adicionar audio player nas obras (HTML5 `<audio>`)
4. Adicionar audios de Gagaku, Enka, J-Pop
5. Criar quiz "Qual periodo japones e esse?"

### Fase 2 - Engajamento (2-3 semanas)

6. Sistema de favoritos (localStorage ou DB)
7. Progresso de visualizacao
8. Quiz interativo por periodo
9. Busca/filtro em tempo real
10. Compartilhamento social (Open Graph)
11. Pagina de instrumentos (Koto, Shamisen, Shakuhachi)
12. Galeria de fotos de apresentacoes tradicionais

### Fase 3 - Gamificacao Avancada (1 mes+)

13. Sistema de XP por periodo explorado
14. Badges de conquista ("Conhecedor do Barroco", "Mestre da Tradicao")
15. Ranking de progresso entre alunos
16. Desafios semanais
17. PWA com modo offline
18. Notificacoes push
19. Certificado digital "Mestre da Musica Japonesa"
20. Playlist pedagogica "Viagem Sonora pelo Japao"
21. Live classes com mestres de instrumentos tradicionais

### Fase 4 - Conteudo Avancado

22. Popular tabela `historia_instrumentos_evolucao`
23. Criar eventos para `historia_eventos_timeline`
24. Adicionar conceitos teoricos
25. Vincular generos sem periodo (15 pendentes)
26. Visualizador de partituras
27. Mapa mundial de origens dos compositores
28. Comparador de estilos/obras

---

## 18. Arquivos do Projeto

### SQL Scripts

- `LIMPAR_E_CORRIGIR_HISTORIA.sql` - Limpeza de duplicatas
- `RELATORIO_COMPLETO_HISTORIA.sql` - Relatorio de diagnostico
- `CORRIGIR_RELACIONAMENTOS.sql` - Correcao de vinculos
- `ADICIONAR_COMPOSITORES_FALTANTES.sql` - Pachelbel, Vivaldi, Handel
- `POPULAR_HISTORIA_MUSICA_COMPLETA.sql` - Dados iniciais

### TypeScript - Queries

- `lib/supabase/queries/historia-completo.ts` - Queries otimizadas com JOINs
- `lib/supabase/queries/historia.ts` - Queries basicas

### Frontend - Paginas

- `app/(protected)/alunos/historia/page.tsx` - Pagina principal com 3 views
- `app/(protected)/alunos/page.tsx` - Dashboard com banner e navegacao cultural
- `app/api/historia/timeline/route.ts` - API endpoint

### Frontend - Componentes

- `components/cultura-japonesa-nav.tsx` - BannerTradicaoOriental + CulturaJaponesaNav

### Como Testar

```bash
npm install
npm run dev
# Acessar: http://localhost:4000/alunos/historia
```

Verificar:
- Estatisticas (23 periodos, 40 compositores, 29 obras, 32 generos)
- View switcher (Tradicao Japonesa, Contexto Mundial, Mestres)
- Navegacao prev/next na timeline
- Clique em "Ver Detalhes" -> Modal
- Filtros na view Compositores
- Hover effects nos cards
- Responsividade mobile/tablet/desktop

---

*Ultima atualizacao: Fevereiro 2026*
*Nipo School - Onde a tradicao encontra a tecnologia*

