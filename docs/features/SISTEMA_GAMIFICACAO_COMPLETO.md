# 🎮 Sistema de Gamificação Completo - Nipo School

## 📋 Visão Geral

O sistema de gamificação do Nipo School foi desenvolvido para aumentar o engajamento dos alunos através de:
- **Pontos**: Ganhe pontos por completar aulas, submeter evidências, etc.
- **Níveis**: Progresso através de 7 níveis diferentes
- **Badges**: Conquiste badges especiais por marcos importantes
- **Conquistas**: Desbloqueie conquistas por realizar tarefas específicas

---

## 🗄️ Estrutura do Banco de Dados

### Tabelas Criadas

1. **`gamification_usuarios`**
   - Perfil de gamificação de cada usuário
   - Campos: `total_pontos`, `nivel_atual`, `nome_nivel`, `cor_nivel`

2. **`gamification_pontos`**
   - Histórico de todos os pontos ganhos
   - Campos: `pontos`, `fonte`, `descricao`, `metadata`

3. **`gamification_badges`**
   - Badges conquistados pelos usuários
   - Campos: `tipo_badge`, `nome_badge`, `icone`, `cor`

4. **`gamification_conquistas`**
   - Conquistas e marcos alcançados
   - Campos: `tipo_conquista`, `nome_conquista`, `valor_conquista`

---

## 🚀 Como Usar

### 1. Criar as Tabelas no Supabase

Execute o script SQL:
```bash
# Localização do script
database/migrations/create-gamification-system.sql
```

No Supabase Dashboard:
1. Vá para SQL Editor
2. Cole o conteúdo do arquivo
3. Execute o script
4. Verifique se todas as tabelas foram criadas

### 2. Integração no Código

#### Server-Side (Queries)

```typescript
import { 
  getEstatisticasGamificacao,
  calcularProgressoProximoNivel 
} from '@/src/lib/supabase/queries/gamificacao-real';

// Em um Server Component
const stats = await getEstatisticasGamificacao();
const progresso = calcularProgressoProximoNivel(stats.totalPontos);
```

#### Client-Side (Hook)

```typescript
'use client';

import { useGamification } from '@/src/hooks/useGamification';

export function MyComponent() {
  const { perfil, pontos, badges, loading } = useGamification();
  
  if (loading) return <div>Carregando...</div>;
  
  return (
    <div>
      <h1>Nível: {perfil?.nivel_atual}</h1>
      <p>Pontos: {perfil?.total_pontos}</p>
    </div>
  );
}
```

#### Server Actions

```typescript
import { 
  pontuarAulaConcluidaAction,
  pontuarEvidenciaSubmitidaAction,
  adicionarPontosAction,
  concederBadgeAction 
} from '@/app/actions/gamification';

// Quando aluno completa uma aula
await pontuarAulaConcluidaAction(aulaId);

// Quando aluno submete evidência
await pontuarEvidenciaSubmitidaAction(evidenciaId);

// Adicionar pontos customizados
await adicionarPontosAction({
  pontos: 100,
  fonte: 'alpha',
  descricao: 'Completou desafio especial',
  metadata: { desafio_id: 'xyz' }
});

// Conceder badge
await concederBadgeAction({
  tipoBadge: 'primeira_aula',
  nomeBadge: 'Primeira Aula',
  descricao: 'Completou sua primeira aula!',
  icone: '🎉',
  cor: '#10B981'
});
```

---

## 📊 Sistema de Níveis

```typescript
const NIVEIS = [
  { nivel: 1, nome: 'Iniciante', pontosMinimos: 0, cor: '#9CA3AF' },
  { nivel: 2, nome: 'Aprendiz', pontosMinimos: 100, cor: '#84CC16' },
  { nivel: 3, nome: 'Praticante', pontosMinimos: 250, cor: '#22D3EE' },
  { nivel: 4, nome: 'Experiente', pontosMinimos: 500, cor: '#A78BFA' },
  { nivel: 5, nome: 'Mestre', pontosMinimos: 1000, cor: '#F59E0B' },
  { nivel: 6, nome: 'Grande Mestre', pontosMinimos: 2000, cor: '#EF4444' },
  { nivel: 7, nome: 'Lenda', pontosMinimos: 5000, cor: '#EC4899' },
];
```

---

## 🎯 Pontos por Ação

| Ação | Pontos | Fonte |
|------|--------|-------|
| Completar Aula | 50 | alpha |
| Submeter Evidência | 30 | evidencia |
| Completar Autoavaliação | 20 | autoavaliacao |
| Completar Portfólio | 100 | portfolio |
| Ganhar Badge | 50 | badge |

---

## 🏆 Conquistas Automáticas

O sistema verifica e concede automaticamente estas conquistas:

### Por Pontos
- **Primeiros Passos**: 100 pontos totais (+10 pts bônus)
- **Caminhante Dedicado**: 500 pontos totais (+50 pts bônus)
- **Mil Pontos de Luz**: 1000 pontos totais (+100 pts bônus)
- **Estrela Brilhante**: 2500 pontos totais (+250 pts bônus)
- **Mestre dos Pontos**: 5000 pontos totais (+500 pts bônus)

### Customizadas
Você pode criar suas próprias conquistas:

```typescript
await registrarConquistaAction({
  tipoConquista: 'show_participante',
  nomeConquista: 'Artista do Show Final',
  descricao: 'Participou do Show Final 2025',
  valorConquista: 1,
  pontosRecompensa: 200
});
```

---

## 🎨 Componentes Disponíveis

### GamificationPanel (Página Completa)

```tsx
import { GamificationPanel } from '@/src/components/gamification/GamificationPanel';

<GamificationPanel
  perfil={perfil}
  pontos={pontos}
  badges={badges}
  conquistas={conquistas}
  progressoProximoNivel={progresso}
/>
```

### GamificationWidget (Dashboard)

```tsx
import { GamificationWidget } from '@/src/components/gamification/GamificationWidget';

<GamificationWidget
  perfil={perfil}
  totalBadges={5}
  totalConquistas={12}
  progressoProximoNivel={progresso}
/>
```

---

## 🔧 Casos de Uso Práticos

### 1. Dar Pontos Quando Aluno Completa Aula

```typescript
// app/(protected)/alunos/aulas/[id]/concluir/route.ts
import { pontuarAulaConcluidaAction } from '@/app/actions/gamification';

export async function POST(request: Request) {
  const { aulaId } = await request.json();
  
  // Marcar aula como concluída
  // ... seu código ...
  
  // Adicionar pontos
  await pontuarAulaConcluidaAction(aulaId);
  
  return Response.json({ success: true });
}
```

### 2. Badge por Completar Primeira Aula

```typescript
import { concederBadgeAction } from '@/app/actions/gamification';

// Verificar se é a primeira aula
const aulasCompletas = await contarAulasCompletas(userId);

if (aulasCompletas === 1) {
  await concederBadgeAction({
    tipoBadge: 'primeira_aula',
    nomeBadge: 'Primeira Nota Musical',
    descricao: 'Completou sua primeira aula!',
    icone: '🎵',
    cor: '#10B981'
  });
}
```

### 3. Exibir Progresso no Dashboard

```typescript
// app/(protected)/alunos/dashboard/page.tsx
import { getEstatisticasGamificacao, calcularProgressoProximoNivel } from '@/src/lib/supabase/queries/gamificacao-real';
import { GamificationWidget } from '@/src/components/gamification/GamificationWidget';

export default async function DashboardPage() {
  const stats = await getEstatisticasGamificacao();
  const progresso = stats.perfil 
    ? calcularProgressoProximoNivel(stats.perfil.total_pontos)
    : undefined;

  return (
    <div className="grid gap-6">
      <GamificationWidget
        perfil={stats.perfil}
        totalBadges={stats.totalBadges}
        totalConquistas={stats.totalConquistas}
        progressoProximoNivel={progresso}
      />
    </div>
  );
}
```

---

## 🔐 Segurança (RLS)

Todas as tabelas possuem Row Level Security habilitado:

- ✅ Usuários só veem seus próprios dados
- ✅ Inserções são controladas pelo sistema
- ✅ Service role pode fazer operações completas
- ✅ Sem possibilidade de fraude de pontos

---

## 📈 Próximos Passos

1. **Implementar no Dashboard do Aluno**
   - Adicionar `GamificationWidget` no dashboard principal

2. **Integrar com Aulas**
   - Chamar `pontuarAulaConcluidaAction` quando aula for concluída

3. **Integrar com Portfólio**
   - Chamar actions apropriadas quando evidências forem submetidas

4. **Criar Badges Personalizados**
   - Show Final, Instrumentos, etc.

5. **Ranking/Leaderboard** (Opcional)
   - Criar página de ranking de alunos

---

## 🐛 Troubleshooting

### "Tabelas não encontradas"
Execute o script SQL de criação das tabelas.

### "Erro de permissão"
Verifique se o RLS está configurado corretamente.

### "Pontos não atualizando"
Verifique se `revalidatePath()` está sendo chamado nas actions.

### "Perfil não criado automaticamente"
Chame `criarOuAtualizarPerfilGamificacao(userId)` ao fazer login do usuário.

---

## 📚 Arquivos Importantes

```
database/
  migrations/
    create-gamification-system.sql         # Script de criação das tabelas

src/
  types/
    gamification.ts                        # Tipos TypeScript
  
  lib/supabase/
    queries/
      gamificacao-real.ts                  # Queries de leitura
    mutations/
      gamificacao-real.ts                  # Mutations de escrita
  
  components/gamification/
    GamificationPanel.tsx                  # Painel completo
    GamificationWidget.tsx                 # Widget para dashboard
  
  hooks/
    useGamification.ts                     # Hook para client-side

app/
  actions/
    gamification.ts                        # Server Actions
  
  (protected)/alunos/
    gamificacao/
      page.tsx                             # Página de gamificação
```

---

**Pronto para gamificar! 🎮✨**
