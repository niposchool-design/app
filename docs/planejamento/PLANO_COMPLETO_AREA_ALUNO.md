# 🎓 PLANO COMPLETO - ÁREA DO ALUNO
## Implementação Definitiva com Todos os Dados do Banco

**Data:** 08/10/2025  
**Status:** 🚀 Iniciando implementação completa  
**Objetivo:** Usar TODAS as 117 tabelas do banco para criar experiência rica

---

## 📊 O QUE TEMOS NO BANCO (Para Alunos)

### ✅ Tabelas Disponíveis (28 tabelas relacionadas ao aluno)

#### 1. **PERFIL & AUTENTICAÇÃO** (5 tabelas)
```typescript
- profiles (26 colunas) - Perfil completo do usuário
- alunos (9 colunas) - Dados específicos do aluno
- auth.users - Autenticação (Supabase Auth)
- user_roles - Papéis do usuário
- audit_activities - Log de atividades
```

#### 2. **GAMIFICAÇÃO** (4 tabelas)
```typescript
- gamification_usuarios (8 colunas) - Perfil de gamificação
  ├── total_pontos, nivel_atual, nome_nivel, cor_nivel
  
- gamification_badges (9 colunas) - Badges conquistados
  ├── tipo_badge, nome_badge, icone, cor, metadata
  
- gamification_conquistas (8 colunas) - Conquistas especiais
  ├── tipo_conquista, nome_conquista, valor_conquista
  
- gamification_pontos (7 colunas) - Histórico de pontos
  ├── pontos, fonte, descricao, metadata, data_conquista
```

#### 3. **PORTFÓLIO** (2 tabelas)
```typescript
- portfolios (17 colunas) - Portfólios do aluno
  ├── titulo, descricao, tipo, status, visibilidade
  ├── objetivos_aprendizagem, reflexao_inicial, reflexao_final
  ├── tags, competencias_desenvolvidas
  
- portfolio_evidencias (21 colunas) - Evidências de aprendizado
  ├── tipo_evidencia, titulo, descricao, arquivo_url
  ├── observacoes, data_criacao, metadata
```

#### 4. **ALPHA DESAFIOS** (4 tabelas)
```typescript
- alpha_metodologias (25 colunas) - Metodologias pedagógicas
  ├── Orff, Suzuki, Kodály, Dalcroze, Gordon, Willems
  
- alpha_desafios (21 colunas) - Desafios pedagógicos
  ├── codigo, titulo, descricao, objetivos
  ├── dificuldade (1-5), pontos_base, tipo_desafio
  ├── criterios_avaliacao, recursos_necessarios
  
- alpha_submissoes (17 colunas) - Submissões de alunos
  ├── resposta, evidencias, status, pontuacao
  ├── feedback_professor, data_submissao
  
- alpha_progresso (12 colunas) - Progresso nas metodologias
  ├── nivel_atual, xp_atual, xp_necessario, badges_conquistados
```

#### 5. **TURMAS & AULAS** (4 tabelas)
```typescript
- turmas (21 colunas) - Turmas ativas
  ├── nome, descricao, professor_id, instrumento_id
  ├── nivel, max_alunos, horario, dias_semana
  
- matriculas (15 colunas) - Matrículas do aluno
  ├── status (ativa/concluida/cancelada)
  ├── progresso_percentual, nota_final
  
- aulas (14 colunas) - Aulas agendadas
  ├── titulo, descricao, data_aula, duracao
  ├── tipo_aula, conteudo_programatico, materiais
  
- presencas (7 colunas) - Presenças do aluno
  ├── presente, justificativa, observacoes
```

#### 6. **BIBLIOTECA DE INSTRUMENTOS** (9 tabelas!!!)
```typescript
- biblioteca_instrumentos (36 colunas!!!) - Catálogo rico
  ├── nome, categoria, familia, origem
  ├── descricao_detalhada, historia, caracteristicas
  ├── tecnicas_basicas, repertorio_sugerido
  ├── nivel_dificuldade, faixa_etaria_recomendada
  ├── som_referencia_url, imagem_url, video_demonstracao_url
  
- categorias_instrumentos - Categorias organizadas
- tecnicas_instrumentos - Técnicas de execução
- curiosidades_instrumentos - Fatos interessantes
- midias_instrumentos - Galeria de mídias
- sons_instrumentos - Samples de áudio
- video_demonstracoes - Vídeos instrutivos
- repertorio_sugerido - Músicas para praticar
- instrumentos_fisicos - Instrumentos da escola
```

---

## 🎯 ÁREA DO ALUNO - ESTRUTURA COMPLETA

### 📱 **DASHBOARD** (`/app/aluno`)

#### Seções:
1. **Header de Boas-vindas**
   - Nome do aluno (`profiles.full_name`)
   - Avatar (`profiles.avatar_url`)
   - Nível atual (`gamification_usuarios.nome_nivel`)
   - Cor do nível (`gamification_usuarios.cor_nivel`)

2. **Cards de Estatísticas** (4 cards)
   ```typescript
   - Total de Pontos (gamification_usuarios.total_pontos)
   - Sequência Atual (profiles.current_streak + 🔥)
   - Conquistas (COUNT gamification_badges + gamification_conquistas)
   - Aulas Completadas (COUNT presencas WHERE presente = true)
   ```

3. **Próximas Aulas** (3-5 aulas)
   ```sql
   SELECT a.*, t.nome as turma, t.horario, p.full_name as professor
   FROM aulas a
   JOIN turmas t ON a.turma_id = t.id
   JOIN matriculas m ON m.turma_id = t.id
   JOIN profiles p ON t.professor_id = p.id
   WHERE m.aluno_id = current_user
     AND a.data_aula >= NOW()
   ORDER BY a.data_aula
   LIMIT 5
   ```

4. **Conquistas Recentes** (últimas 5)
   ```sql
   SELECT * FROM (
     SELECT nome_badge as nome, icone, data_conquista FROM gamification_badges
     UNION ALL
     SELECT nome_conquista, '🏆', data_conquista FROM gamification_conquistas
   ) conquistas
   WHERE usuario_id = current_user
   ORDER BY data_conquista DESC
   LIMIT 5
   ```

5. **Desafios Ativos**
   ```sql
   SELECT d.*, s.status, s.pontuacao
   FROM alpha_desafios d
   LEFT JOIN alpha_submissoes s ON s.desafio_id = d.id AND s.aluno_id = current_user
   WHERE d.ativo = true
     AND (s.status IS NULL OR s.status = 'em_avaliacao')
   ORDER BY d.ordem
   LIMIT 3
   ```

6. **Progresso nas Metodologias** (Gráfico de radar)
   ```sql
   SELECT m.nome, p.nivel_atual, p.xp_atual, p.xp_necessario
   FROM alpha_progresso p
   JOIN alpha_metodologias m ON p.metodologia_id = m.id
   WHERE p.aluno_id = current_user
   ```

---

### 🏆 **CONQUISTAS** (`/app/aluno/conquistas`)

#### Features:
1. **Filtros**
   - Todas / Desbloqueadas / Bloqueadas
   - Por tipo (badges / conquistas)
   - Por fonte (aula / desafio / portfolio / streak)

2. **Grid de Conquistas**
   ```typescript
   interface ConquistaCard {
     icone: string
     nome: string
     descricao: string
     cor: string
     data_conquista?: Date
     bloqueada: boolean
     metadata?: {
       nivel_desbloqueio?: number
       requisitos?: string[]
     }
   }
   ```

3. **Estatísticas no Topo**
   - Total desbloqueadas / Total disponíveis
   - Pontos ganhos com conquistas
   - Conquista mais rara desbloqueada

4. **Modal de Detalhe**
   - História da conquista
   - Como foi desbloqueada
   - Raridade (% de alunos que têm)
   - Conquistas relacionadas

---

### 📁 **PORTFÓLIO** (`/app/aluno/portfolio`)

#### Lista de Portfólios
```typescript
interface Portfolio {
  id: string
  titulo: string
  descricao: string
  tipo: 'projeto' | 'pesquisa' | 'performance' | 'reflexao'
  status: 'rascunho' | 'submetido' | 'em_avaliacao' | 'avaliado'
  visibilidade: 'privado' | 'turma' | 'publico'
  tags: string[]
  competencias_desenvolvidas: string[]
  nota_final?: number
  feedback?: string
  created_at: Date
  evidencias_count: number // JOIN COUNT
}
```

#### Criar/Editar Portfólio (`/app/aluno/portfolio/novo`)
```typescript
Formulário:
- Título (obrigatório)
- Descrição (obrigatório)
- Tipo (select)
- Objetivos de aprendizagem (textarea)
- Reflexão inicial (textarea)
- Tags (input com chips)
- Competências desenvolvidas (multi-select)
- Visibilidade (radio buttons)
- Metodologia relacionada (select opcional)
```

#### Visualizar Portfólio (`/app/aluno/portfolio/:id`)
```typescript
Seções:
1. Header
   - Título, tipo, tags
   - Status badge
   - Botões: Editar, Compartilhar, Excluir

2. Descrição e Objetivos
   - Descrição completa
   - Objetivos de aprendizagem
   - Competências desenvolvidas

3. Evidências (Grid/Lista)
   - Thumbnail
   - Título da evidência
   - Tipo (foto/vídeo/áudio/documento)
   - Data de upload
   - Observações
   - Botão: Ver/Download

4. Reflexões
   - Reflexão inicial
   - Reflexão final (ao concluir)

5. Avaliação (se avaliado)
   - Nota final
   - Feedback do professor
   - Rubrica detalhada
```

#### Upload de Evidências
```typescript
- Drag & drop ou click to upload
- Tipos aceitos: jpg, png, mp4, mp3, pdf, docx
- Preview antes do upload
- Compressão automática (imagens > 2MB)
- Progress bar
- Metadados: título, descrição, observações
```

---

### 🎯 **DESAFIOS ALPHA** (`/app/aluno/desafios`)

#### Lista de Desafios
```typescript
interface DesafioCard {
  id: string
  codigo: string // Ex: "ORFF-01"
  titulo: string
  descricao: string
  metodologia: {
    nome: string
    cor: string
    icone: string
  }
  dificuldade: 1 | 2 | 3 | 4 | 5 // ⭐
  pontos_base: number
  tipo_desafio: 'pratico' | 'teorico' | 'criativo' | 'colaborativo'
  status: 'nao_iniciado' | 'em_andamento' | 'submetido' | 'avaliado'
  pontuacao?: number
  prazo_submissao?: Date
}
```

#### Filtros
- Por metodologia (Orff, Suzuki, Kodály, etc.)
- Por dificuldade (1-5 estrelas)
- Por status (não iniciado / em andamento / concluído)
- Por tipo (prático / teórico / criativo)

#### Detalhe do Desafio (`/app/aluno/desafios/:id`)
```typescript
Seções:
1. Header
   - Badge da metodologia
   - Título e código
   - Dificuldade (estrelas)
   - Pontos base

2. Descrição Completa
   - Objetivos pedagógicos
   - Contexto do desafio
   - Competências trabalhadas

3. Critérios de Avaliação
   - Lista de critérios com pesos
   - Rubrica de avaliação

4. Recursos Necessários
   - Materiais
   - Tempo estimado
   - Pré-requisitos

5. Área de Submissão
   - Campo de resposta (rich text)
   - Upload de evidências
   - Botão: Submeter

6. Feedback (se avaliado)
   - Pontuação obtida
   - Comentário do professor
   - Sugestões de melhoria
```

---

### 🎸 **BIBLIOTECA DE INSTRUMENTOS** (`/app/aluno/instrumentos`)

#### Grid de Instrumentos
```typescript
interface InstrumentoCard {
  id: string
  nome: string
  categoria: 'cordas' | 'sopro' | 'percussao' | 'teclado' | 'eletronico'
  familia: string
  origem: string
  imagem_url: string
  nivel_dificuldade: 'iniciante' | 'intermediario' | 'avancado'
  disponivel_escola: boolean
}
```

#### Filtros
- Por categoria
- Por família
- Por nível de dificuldade
- Por origem geográfica
- Disponíveis na escola

#### Detalhe do Instrumento (`/app/aluno/instrumentos/:slug`)
```typescript
Seções:
1. Hero Section
   - Imagem grande
   - Nome e origem
   - Categoria e família
   - Ícone da metodologia principal

2. Sobre o Instrumento
   - Descrição detalhada
   - História e evolução
   - Características físicas
   - Curiosidades

3. Sons e Vídeos
   - Player de sons de referência
   - Vídeos de demonstração
   - Galeria de mídias

4. Técnicas
   - Técnicas básicas
   - Técnicas avançadas
   - Exercícios recomendados

5. Repertório Sugerido
   - Músicas para iniciantes
   - Músicas intermediárias
   - Músicas avançadas
   - Links para partituras

6. Metodologias
   - Como é usado em Orff
   - Como é usado em Suzuki
   - Como é usado em outras metodologias

7. Disponibilidade na Escola
   - Se há instrumentos físicos disponíveis
   - Como solicitar empréstimo
   - QR Code para mais informações
```

---

### 📅 **MINHAS AULAS** (`/app/aluno/aulas`)

#### Calendário de Aulas
```typescript
- Visualização: Mês / Semana / Dia
- Cores por turma
- Indicador de presença (✓ / ✗ / ?)
```

#### Lista de Aulas
```typescript
interface AulaCard {
  id: string
  titulo: string
  turma: {
    nome: string
    cor: string
  }
  professor: {
    nome: string
    avatar: string
  }
  data_aula: Date
  horario: string
  duracao: number // minutos
  tipo_aula: 'teorica' | 'pratica' | 'avaliacao'
  conteudo_programatico: string
  materiais: string[]
  presenca: boolean | null
  observacoes?: string
}
```

#### Filtros
- Por turma
- Por tipo de aula
- Por presença (presente / ausente / não registrada)
- Por período

#### Detalhe da Aula (`/app/aluno/aulas/:id`)
```typescript
Seções:
1. Header
   - Título
   - Professor
   - Data, horário, duração
   - Badge de presença

2. Conteúdo Programático
   - Tópicos abordados
   - Objetivos da aula

3. Materiais
   - Lista de materiais necessários
   - Downloads de materiais complementares

4. Atividades
   - Atividades realizadas
   - Anotações pessoais

5. Próxima Aula
   - Link para próxima aula da turma
```

---

### 👤 **PERFIL** (`/app/aluno/perfil`)

#### Seções:
1. **Informações Pessoais**
   ```typescript
   - Avatar (upload)
   - Nome completo
   - Email (não editável)
   - Data de nascimento
   - Telefone
   - Cidade / Estado
   - Bio
   ```

2. **Dados Musicais**
   ```typescript
   - Instrumento principal
   - Instrumentos secundários
   - Nível (iniciante/intermediário/avançado)
   - Gêneros preferidos
   - Experiência prévia
   ```

3. **Estatísticas Gerais**
   ```typescript
   - Membro desde
   - Total de pontos
   - Nível atual
   - Sequência atual
   - Melhor sequência
   - Aulas completadas
   - Desafios completados
   - Portfólios criados
   ```

4. **Conquistas em Destaque** (3-5 principais)

5. **Preferências**
   ```typescript
   - Tema (claro/escuro)
   - Notificações (email/push)
   - Sons (ativar/desativar)
   - Privacidade do perfil
   - Visibilidade do portfólio
   ```

6. **Segurança**
   ```typescript
   - Alterar senha
   - Ativar 2FA (futuro)
   - Sessões ativas
   ```

---

### 📈 **PROGRESSO** (`/app/aluno/progresso`)

#### Visão Geral
```typescript
1. Card Principal
   - Nível atual (com ícone e cor)
   - XP atual / XP necessário
   - Barra de progresso
   - Próximo nível

2. Gráfico de Pontos (Últimos 30 dias)
   - Line chart mostrando pontos ganhos por dia
   - Fonte: gamification_pontos

3. Gráfico de Radar (Metodologias)
   - 8 eixos (uma por metodologia)
   - Nível em cada metodologia (0-100)
   - Fonte: alpha_progresso

4. Estatísticas Detalhadas
   - Pontos por fonte:
     * Aulas: X pontos
     * Desafios: X pontos
     * Portfólio: X pontos
     * Streak: X pontos
   
5. Conquistas por Categoria
   - Badges: X/Y desbloqueados
   - Conquistas especiais: X/Y
   - Troféus: X/Y

6. Histórico de Atividades (Timeline)
   - Últimas 20 atividades
   - Fonte: gamification_pontos + audit_activities
```

---

## 🛠️ IMPLEMENTAÇÃO TÉCNICA

### Estrutura de Hooks

#### 1. `useGamification()` ✅ (JÁ CRIADO)
```typescript
Retorna:
- perfil: GamificationUser | null
- badges: Badge[]
- conquistas: Conquista[]
- historicoPontos: PontoHistorico[]
- loading: boolean
- error: string | null

Métodos:
- adicionarPontos(pontos, fonte, descricao, metadata)
- conquistarBadge(tipo, nome, descricao, icone, cor, metadata)
```

#### 2. `usePortfolio()` ✅ (JÁ CRIADO)
```typescript
Retorna:
- portfolios: Portfolio[]
- loading: boolean
- error: string | null

Métodos:
- getPortfolioById(id)
- createPortfolio(data)
- updatePortfolio(id, updates)
- deletePortfolio(id)
- addEvidencia(portfolioId, evidencia)
- deleteEvidencia(evidenciaId)
```

#### 3. `useDesafios()` ✅ (JÁ CRIADO)
```typescript
Retorna:
- desafios: Desafio[]
- loading: boolean
- error: string | null

Métodos:
- getDesafioById(id)
- submeterDesafio(desafioId, resposta, evidencias)
- getMinhasSubmissoes()
- getDesafiosPorMetodologia(metodologiaId)
```

#### 4. `useTurmas()` ✅ (JÁ CRIADO)
```typescript
Retorna:
- turmas: Turma[]
- loading: boolean
- error: string | null

Métodos:
- getTurmaById(id)
```

#### 5. `useAulas()` ✅ (JÁ CRIADO)
```typescript
Retorna:
- aulas: Aula[]
- loading: boolean
- error: string | null

Métodos:
- getAulaById(id)
```

#### 6. `useInstrumentos()` ⏳ (CRIAR AGORA!)
```typescript
Retorna:
- instrumentos: Instrumento[]
- categorias: Categoria[]
- loading: boolean
- error: string | null

Métodos:
- getInstrumentoById(id)
- getInstrumentoPorSlug(slug)
- getInstrumentosPorCategoria(categoria)
- getSonsDoInstrumento(instrumentoId)
- getVideosDemonstracao(instrumentoId)
- getCuriosidades(instrumentoId)
- getTecnicas(instrumentoId)
- getRepertorio(instrumentoId)
```

---

## 📝 PLANO DE IMPLEMENTAÇÃO

### **FASE 1: Foundation (1 semana)**

#### Sprint 1: Hooks Core
- [x] useGamification (COMPLETO)
- [x] usePortfolio (COMPLETO)
- [x] useDesafios (COMPLETO)
- [x] useTurmas (COMPLETO)
- [x] useAulas (COMPLETO)
- [ ] **useInstrumentos (CRIAR)**

#### Sprint 2: Dashboard Completo
- [ ] Header com perfil
- [ ] 4 Cards de estatísticas
- [ ] Próximas aulas (5)
- [ ] Conquistas recentes (5)
- [ ] Desafios ativos (3)
- [ ] Gráfico de progresso nas metodologias

---

### **FASE 2: Features Core (2 semanas)**

#### Sprint 3: Conquistas
- [x] ConquistasPage (lista) - COMPLETO
- [ ] ConquistaDetailPage (detalhe)
- [ ] Filtros e busca
- [ ] Estatísticas no topo
- [ ] Modal de detalhe

#### Sprint 4: Portfólio
- [x] PortfolioListPage - COMPLETO
- [ ] PortfolioDetailPage
- [ ] PortfolioCreatePage
- [ ] PortfolioEditPage
- [ ] Upload de evidências
- [ ] Sistema de tags

#### Sprint 5: Desafios
- [x] DesafiosListPage - COMPLETO
- [ ] DesafioDetailPage
- [ ] Formulário de submissão
- [ ] Upload de evidências
- [ ] Ver feedback

---

### **FASE 3: Features Avançadas (2 semanas)**

#### Sprint 6: Biblioteca de Instrumentos
- [ ] InstrumentosPage (grid)
- [ ] InstrumentoDetailPage (rico!)
- [ ] Player de sons
- [ ] Galeria de vídeos
- [ ] Sistema de curiosidades
- [ ] Técnicas e repertório

#### Sprint 7: Aulas
- [ ] MinhasAulasPage (lista) - JÁ CRIADO
- [ ] AulaDetailPage
- [ ] Calendário de aulas
- [ ] Sistema de presença

#### Sprint 8: Perfil & Progresso
- [ ] PerfilPage (completa)
- [ ] ProgressoPage (dashboards)
- [ ] Gráfico de radar
- [ ] Timeline de atividades

---

## 🎯 PRÓXIMO PASSO IMEDIATO

### **1. Criar `useInstrumentos()` Hook**

Vou criar AGORA este hook que vai buscar TODOS os dados ricos da biblioteca de instrumentos!

