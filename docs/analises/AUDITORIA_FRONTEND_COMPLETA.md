# 🔍 AUDITORIA COMPLETA DO FRONTEND

**Data**: 08/01/2025
**Objetivo**: Mapear TODAS as inconsistências entre frontend e banco de dados real (117 tabelas)

---

## ✅ HOOKS JÁ CORRIGIDOS (3/7)

### 1. ✅ `useGamification.ts` - CORRETO
- **Status**: React Query ✅
- **Tabelas**: `achievements`, `user_achievements`, `achievements_progress`, `user_points_log`
- **Colunas**: Todas corretas (11, 5, 10, 10 respectivamente)
- **Mutations**: `addPoints`, `checkAchievements`
- **Funções DB**: Usa `check_and_grant_achievements()`

### 2. ✅ `useTurmas.ts` - CORRETO
- **Status**: React Query ✅
- **Tabelas**: `turmas`, `matriculas`, `aulas`, `presencas`
- **Colunas Corrigidas**: 
  - ✅ `data_programada` (não `data_aula`)
  - ✅ `detalhes_aula` jsonb
- **Relacionamentos**: Corrigidos (aulas não tem turma_id direto)

### 3. ✅ `useInstrumentos.ts` - CORRETO
- **Status**: React Query ✅
- **Tabelas**: `instrumentos` (removido categorias_instrumentos)
- **Colunas**: Todas corretas (16 colunas)

### 4. ✅ `useDashboardAluno.ts` - CORRETO
- **Status**: React Query ✅
- **View**: `view_dashboard_aluno` (pré-calculada)
- **Retorno**: 12 métricas agregadas

---

## ⚠️ HOOKS COM PROBLEMAS (3/7)

### 5. ⚠️ `usePortfolio.ts` - PRECISA ATUALIZAÇÃO

**Problema**: Usa useState/useEffect, deveria usar React Query

**Tabelas Corretas**:
- ✅ `portfolios` (17 colunas)
- ✅ `portfolio_evidencias` (21 colunas)

**Interface vs. Banco**:
```typescript
// INTERFACE ATUAL (incompleta)
interface Portfolio {
  id: string
  user_id: string
  titulo: string
  descricao: string | null
  tipo: 'pessoal' | 'projeto' | 'metodologia' | 'competencia'
  status: 'ativo' | 'finalizado' | 'arquivado'
  visibilidade: 'privado' | 'turma' | 'publico'
  data_inicio: string | null
  data_fim: string | null
  metodologia_id: string | null
  competencia_id: string | null
  tags: string[] | null
  objetivos: string[] | null
  reflexoes_iniciais: string | null
  reflexoes_finais: string | null
  created_at: string
  updated_at: string
}

// BANCO REAL (portfolios - 17 colunas)
✅ Todas as colunas estão corretas!

// INTERFACE EVIDÊNCIAS (incompleta)
interface Evidencia {
  id: string
  portfolio_id: string
  titulo: string
  descricao: string | null
  tipo_evidencia: 'video' | 'audio' | 'foto' | 'texto' | 'arquivo' | 'link' | 'reflexao'
  arquivo_url: string | null
  // ... lista simplificada
}

// BANCO REAL (portfolio_evidencias - 21 colunas)
❌ FALTAM:
- tags: string[]
- reflexao: text
- contexto: text
- competencias: jsonb
- metodologia: string
- feedback_professor: text
- nota: numeric
- is_destaque: boolean
- data_criacao: date
```

**Ação**: Converter para React Query + adicionar colunas faltantes

### 6. ⚠️ `useDesafios.ts` - PRECISA ATUALIZAÇÃO

**Problema**: Usa useState/useEffect, deveria usar React Query

**Tabelas Corretas**:
- ✅ `alpha_desafios` (21 colunas)
- ✅ `alpha_submissoes` (17 colunas)
- ✅ `alpha_metodologias` (25 colunas)
- ✅ `alpha_competencias` (11 colunas)
- ✅ `alpha_progresso` (12 colunas)

**Interface vs. Banco**:
```typescript
// INTERFACE ATUAL
interface Desafio {
  id: string
  metodologia_id: string
  competencia_id: string | null
  titulo: string
  descricao: string
  objetivo: string
  instrucoes: string
  tempo_estimado_minutos: number | null
  dificuldade: number
  tipo_evidencia: string
  criterios_avaliacao: Record<string, unknown>
  pontos_base: number
  pontos_bonus: number
  materiais_necessarios: string[] | null
  tags: string[] | null
  ativo: boolean
  ordem: number | null
}

// BANCO REAL (alpha_desafios - 21 colunas)
❌ FALTAM:
- codigo: varchar(20)
- objetivos: text[] (array, não singular)
- recursos_necessarios: text[] (não materiais_necessarios)
- nivel_serie: integer
- exemplos_url: text[]
- ordem_exibicao: integer
```

**Ação**: Converter para React Query + corrigir nomes de colunas

---

## 🚫 PÁGINAS COM DADOS MOCKADOS (4/13)

### 1. 🚫 `AlunoDashboard.tsx` - USA MOCK DATA

**Linha 19**: `// Mock data - em produção virá da API`

```typescript
// CÓDIGO ATUAL (MOCK)
const stats = {
  totalPontos: 2450,
  conquistas: 12,
  desafiosConcluidos: 8,
  aulasAssistidas: 24,
}

const proximasAulas = [
  { id: 1, instrumento: 'Shamisen', data: '2024-01-15', horario: '14:00' },
  { id: 2, instrumento: 'Koto', data: '2024-01-16', horario: '15:30' },
]
```

**SOLUÇÃO**: Usar `useDashboardAluno()` que já existe!

```typescript
// CÓDIGO CORRETO
const { dashboard, isLoading } = useDashboardAluno()

// Dados disponíveis na view:
// - total_points
// - current_streak
// - best_streak
// - lessons_completed
// - modules_completed
// - total_achievements
// - achievements_last_week
// - total_portfolios
// - total_submissoes
```

### 2. 🚫 `ProgressoPage.tsx` - USA MOCK DATA

**Linha 4**: `// Mock data - substituir por hook useAlunoStats()`

**SOLUÇÃO**: Usar `useDashboardAluno()` + queries específicas

### 3. 🚫 `PortfolioDetailPage.tsx` - USA MOCK DATA

**Linha 29**: `// Mock data - substituir por hook usePortfolio(id)`

**SOLUÇÃO**: Hook já existe, só precisa ser chamado corretamente

### 4. 🚫 `DesafioDetailPage.tsx` - USA MOCK DATA

**Linha 34**: `// Mock data - substituir por hook useDesafio(id)`

**SOLUÇÃO**: Hook já existe, só precisa ser chamado corretamente

---

## 📊 RESUMO DA AUDITORIA

### Estatísticas
- **Total de Hooks**: 7
- ✅ **Hooks Corretos**: 4 (57%)
- ⚠️ **Hooks para Atualizar**: 3 (43%)
- **Total de Páginas**: 13
- 🚫 **Páginas com Mock**: 4 (31%)
- ✅ **Páginas usando Dados Reais**: 9 (69%)

### Priorização

**🔥 PRIORIDADE ALTA** (Bloqueiam teste completo):
1. Converter `AlunoDashboard.tsx` para usar `useDashboardAluno()`
2. Converter `usePortfolio.ts` para React Query
3. Converter `useDesafios.ts` para React Query

**📊 PRIORIDADE MÉDIA** (Melhorias):
4. Atualizar `ProgressoPage.tsx` para usar dados reais
5. Corrigir nomes de colunas em `useDesafios` (objetivos[], recursos_necessarios[])
6. Adicionar colunas faltantes em `usePortfolio` (tags, reflexao, competencias)

**✨ PRIORIDADE BAIXA** (Polimento):
7. Criar hooks para tabelas ainda não utilizadas (modulos, turma_modulos, etc.)
8. Adicionar loading states melhores
9. Adicionar error boundaries

---

## 📋 PLANO DE AÇÃO

### FASE 1: Corrigir Dashboard (30 min)
- [ ] Atualizar `AlunoDashboard.tsx` para usar `useDashboardAluno()`
- [ ] Remover todos os dados mockados
- [ ] Testar no navegador

### FASE 2: Converter Hooks para React Query (1h)
- [ ] Converter `usePortfolio.ts`
- [ ] Converter `useDesafios.ts`
- [ ] Adicionar colunas faltantes nas interfaces

### FASE 3: Atualizar Páginas (1h)
- [ ] Corrigir `ProgressoPage.tsx`
- [ ] Corrigir `PortfolioDetailPage.tsx`
- [ ] Corrigir `DesafioDetailPage.tsx`

### FASE 4: Teste Completo (30 min)
- [ ] Navegar por todas as páginas
- [ ] Verificar console (sem erros)
- [ ] Verificar network tab (200 OK)
- [ ] Verificar dados aparecem (não vazio)

**TEMPO TOTAL ESTIMADO**: 3 horas
