# Refatoração Completa do Sistema de Gamificação

## 📋 Resumo

Sistema de gamificação **REFATORADO** para usar as tabelas **EXISTENTES** do banco de dados ao invés de criar novas tabelas duplicadas.

## 🎯 Mudanças Principais

### ❌ Removido (Tabelas que NÃO existem)
- `gamification_usuarios`
- `gamification_pontos`
- `gamification_badges`
- `gamification_conquistas`

### ✅ Usando (Tabelas que JÁ EXISTEM no banco)
- `user_progress` - Perfil de progresso do usuário
- `user_points_log` - Histórico de pontos
- `user_achievements` - Achievements conquistados pelo usuário
- `achievements` - Catálogo de achievements disponíveis
- `achievements_progress` - Progresso de achievements (opcional)

## 📊 Estrutura das Tabelas Reais

### `user_progress` (11 colunas)
```sql
- id (uuid)
- user_id (uuid) 
- total_points (integer)
- level (integer)
- badges_earned (integer)
- current_streak (integer)
- longest_streak (integer)
- lessons_completed (integer)
- achievements_unlocked (integer)
- updated_at (timestamp)
- created_at (timestamp)
```

### `user_points_log` (6 colunas)
```sql
- id (uuid)
- user_id (uuid)
- aula_id (uuid, nullable)
- points (integer)
- reason (text)
- created_at (timestamp)
```

### `achievements` (11 colunas)
```sql
- id (uuid)
- name (text)
- description (text)
- badge_icon (text)
- badge_color (text)
- points_reward (integer)
- category (text)
- requirement_type (text)
- requirement_value (integer)
- is_active (boolean)
- created_at (timestamp)
```

### `user_achievements` (4 colunas)
```sql
- id (uuid)
- user_id (uuid)
- achievement_id (uuid)
- earned_at (timestamp)
```

### `achievements_progress` (10 colunas)
```sql
- id (uuid)
- user_id (uuid)
- achievement_id (uuid)
- current_progress (integer)
- target_progress (integer)
- is_completed (boolean)
- completed_at (timestamp, nullable)
- metadata (jsonb)
- created_at (timestamp)
- updated_at (timestamp)
```

## 🔄 Mapeamento de Tipos

### Antes → Depois
- `GamificationUsuario` → `UserProgress`
- `GamificationPonto` → `UserPointsLog`
- `GamificationBadge` → `Achievement` (do catálogo)
- `GamificationConquista` → `UserAchievement` (com join de Achievement)

## 📁 Arquivos Refatorados

### 1. **Types** ✅
- **Arquivo**: `src/types/gamification.ts`
- **Status**: COMPLETO
- **Mudanças**: Tipos agora refletem as tabelas reais do banco

### 2. **Queries** ✅
- **Arquivo**: `src/lib/supabase/queries/gamificacao-real.ts`
- **Status**: COMPLETO
- **Funções principais**:
  - `getUserProgress()` - Busca perfil de progresso
  - `getUserPointsHistory()` - Busca histórico de pontos
  - `getUserAchievements()` - Busca achievements do usuário (com JOIN)
  - `getAllAchievements()` - Busca todos achievements disponíveis
  - `getGamificationStats()` - Retorna estatísticas completas
  - `calculateNextLevelProgress()` - Calcula progresso para próximo nível

### 3. **Mutations** ✅
- **Arquivo**: `src/lib/supabase/mutations/gamificacao-real.ts`
- **Status**: COMPLETO
- **Funções principais**:
  - `createOrGetUserProgress()` - Cria ou obtém perfil
  - `addUserPoints()` - Adiciona pontos ao usuário
  - `grantAchievement()` - Concede achievement ao usuário
  - `incrementLessonsCompleted()` - Incrementa contador de aulas
  - `pointsForCompletedLesson()` - Pontos por aula concluída
  - `pointsForSubmittedEvidence()` - Pontos por evidência
  - `pointsForCompletedSelfAssessment()` - Pontos por autoavaliação
  - `pointsForCompletedPortfolio()` - Pontos por portfólio

### 4. **Componentes** ✅
#### GamificationPanel.tsx ✅
- **Arquivo**: `src/components/gamification/GamificationPanel.tsx`
- **Status**: COMPLETO
- **Props atualizadas**:
  - `progress: UserProgress | null`
  - `pointsHistory: UserPointsLog[]`
  - `achievements: (UserAchievement & { achievement: Achievement })[]`
  - `nextLevelProgress?: { progress, pointsNeeded, pointsRemaining }`

#### GamificationWidget.tsx ✅
- **Arquivo**: `src/components/gamification/GamificationWidget.tsx`
- **Status**: COMPLETO
- **Props atualizadas**:
  - `progress: UserProgress | null`
  - `nextLevelProgress?: { progress, pointsRemaining }`

### 5. **Hooks** ✅
- **Arquivo**: `src/hooks/useGamification.ts`
- **Status**: COMPLETO
- **Retorna**:
  - `progress: UserProgress | null`
  - `pointsHistory: UserPointsLog[]`
  - `achievements: (UserAchievement & { achievement: Achievement })[]`
  - `loading, error, refresh()`

### 6. **Server Actions** ✅
- **Arquivo**: `app/actions/gamification.ts`
- **Status**: COMPLETO
- **Actions atualizadas**:
  - `addPointsAction()` - Adiciona pontos
  - `grantAchievementAction()` - Concede achievement
  - `awardPointsForCompletedLessonAction()` - Pontos por aula
  - `awardPointsForSubmittedEvidenceAction()` - Pontos por evidência
  - `awardPointsForCompletedSelfAssessmentAction()` - Pontos por autoavaliação
  - `awardPointsForCompletedPortfolioAction()` - Pontos por portfólio

### 7. **Páginas** ✅
- **Arquivo**: `app/(protected)/alunos/gamificacao/page.tsx`
- **Status**: COMPLETO
- **Mudanças**: Usa `getGamificationStats()` e `calculateNextLevelProgress()`

## 🗑️ Arquivos para Remover

### SQL Migration (NÃO USAR)
- **Arquivo**: `database/migrations/create-gamification-system.sql`
- **Status**: DEVE SER IGNORADO
- **Motivo**: Cria tabelas duplicadas que já existem no banco

## ✅ Checklist de Refatoração

- [x] Atualizar types para refletir tabelas reais
- [x] Refatorar queries para usar user_progress, user_points_log, achievements, user_achievements
- [x] Refatorar mutations para inserir/atualizar nas tabelas corretas
- [x] Atualizar GamificationPanel.tsx
- [x] Atualizar GamificationWidget.tsx
- [x] Refatorar useGamification hook
- [x] Refatorar server actions
- [x] Atualizar página de gamificação
- [x] Criar documentação de refatoração
- [ ] Testar integração completa
- [ ] Atualizar documentação geral

## 🎓 Como Usar

### Adicionar Pontos a um Usuário

```typescript
import { addUserPoints } from '@/src/lib/supabase/mutations/gamificacao-real';

const result = await addUserPoints({
  userId: 'uuid-do-usuario',
  points: 50,
  reason: 'Aula concluída',
  aulaId: 'uuid-da-aula' // opcional
});
```

### Conceder Achievement

```typescript
import { grantAchievement } from '@/src/lib/supabase/mutations/gamificacao-real';

const result = await grantAchievement({
  userId: 'uuid-do-usuario',
  achievementId: 'uuid-do-achievement'
});
```

### Buscar Progresso do Usuário

```typescript
import { getUserProgress } from '@/src/lib/supabase/queries/gamificacao-real';

const progress = await getUserProgress('uuid-do-usuario');
```

### Usar no Componente Client

```typescript
'use client';

import { useGamification } from '@/src/hooks/useGamification';

function MyComponent() {
  const { progress, pointsHistory, achievements, loading } = useGamification();
  
  if (loading) return <div>Carregando...</div>;
  
  return (
    <div>
      <p>Nível: {progress?.level}</p>
      <p>Pontos: {progress?.total_points}</p>
    </div>
  );
}
```

## 🔐 RLS (Row Level Security)

As tabelas já possuem políticas RLS configuradas:
- Usuários só podem ver/editar seus próprios registros
- Achievements são públicos (leitura para todos)

## 📝 Notas Importantes

1. **NÃO criar novas tabelas** - Usar sempre as existentes
2. **Achievements vs Badges** - No banco, "achievements" funcionam como "badges"
3. **user_achievements** - É a tabela de relacionamento entre usuários e achievements
4. **points_reward** - Campo em `achievements` define quantos pontos o achievement vale
5. **achievements_progress** - Tabela opcional para tracking de progresso de achievements complexos

## 🚀 Próximos Passos

1. ✅ Refatoração completa do código
2. ⏳ Popular tabela `achievements` com conquistas padrão
3. ⏳ Criar triggers para atualizar `user_progress` automaticamente
4. ⏳ Implementar sistema de badges especiais
5. ⏳ Adicionar verificação automática de achievements
6. ⏳ Criar dashboard de administração de achievements
7. ⏳ Implementar notificações de conquistas

---

**Última atualização**: $(date)
**Status**: Refatoração completa finalizada ✅
