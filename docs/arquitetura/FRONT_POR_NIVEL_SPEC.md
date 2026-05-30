---
title: Front por Nível — Especificação (camada visual de progressão)
created: 2026-05-30
updated: 2026-05-30
type: spec
status: rascunho
tags: [front, niveis, trilhas, design-system, nipo-wa, familia, professor, admin]
owner: frente-front
relacionados:
  - "[[LOGICA_TRILHAS_E_NIVEIS]]"
  - "[[PROPOSTA_INTEGRACAO_ALPHA_TRILHA_NIVEL]]"
  - "[[ROTAS_E_NAVEGACAO]]"
  - "[[BANCO_DE_DADOS]]"
  - design-system/AGENT_GUIDE.md
---

# Front por Nível — Especificação

> **Natureza deste documento:** SPEC + rascunho. Define o incremento visual
> "front por nível" sem reescrever páginas em produção. As mudanças propostas
> são **aditivas**. Nada aqui aplica migration ou altera comportamento existente.
> Conteúdo 100% PT-BR. Design System: **Nipo Wa** (`design-system/AGENT_GUIDE.md`).

## 0. Contexto e princípios

O app organiza o currículo em **11 níveis** distribuídos em 2 anos
(`lib/lessons/constants.ts`):

- **Ano 1 (2025) — 4 níveis:** Iniciante, Intermediário, Avançado, Show Final.
- **Ano 2 (2026) — 7 níveis:** Retomada, Aprofundamento, Criação, Cultura,
  Performance, Projetos, Formatura.

Hoje a página `/lessons` mostra os níveis como **cartões soltos** (grid 2 col),
e `/paths/[id]` mostra os steps de uma trilha como **timeline vertical**. Não há:
(1) sensação de **jornada conectada** entre níveis; (2) visão de **distribuição
de alunos por nível** para professor/admin; (3) nenhuma página para o papel
**Família** (âmbar 家族).

### Regras de DS herdadas (inegociáveis)
- Cor por **papel** via tokens: aluno=vermelho `student`, professor=azul `teacher`,
  admin=roxo `admin`, família=âmbar `family` (`#d97706`, padrão Kikkō 亀甲).
- Números (nível, contadores, %) sempre em `.nw-tabular`.
- Sem hex hardcoded — usar escalas Tailwind (`bg-student`, `text-family-dark`…)
  ou vars `--role-*`. Cards via `.nw-card`, foco via `.nw-focusable`.
- PT-BR, tom encorajador (Eixo Alpha: celebração de progresso é metodologia).
- Estados obrigatórios: **loading / vazio / erro / bloqueado (gated)**.

### Estado do código relevante (verificado)
- `ROLE_THEMES` em `components/layouts/OrientalDashboardLayout.tsx` define apenas
  **3 papéis** (student/teacher/admin). **Família NÃO está no mapa** → o shell
  cairia no fallback `student` para um usuário família. (Dependência D-5.)
- Token `family` **existe** em `tailwind.config.ts`; classe `bg-pattern-kikko` e
  theming `data-role="family"` documentados no DS. Falta apenas plugar no shell.
- Não existe view que relacione **família ↔ aluno (filho)** nos tipos gerados
  (`lib/supabase/database.types.ts`). (Dependência D-4.)

---

## 1. Inventário de dados (views `v_*`): existe vs falta

Fonte: `lib/supabase/database.types.ts` (tipos gerados do schema `public`).

| Dado necessário | View existente | Situação |
|---|---|---|
| Aulas (número, título, status, módulo) | `v_lessons` | ✅ existe |
| Progresso do aluno por aula | `v_lesson_progress` (`student_id`, `lesson_id`, `is_completed`, `progress_percent`) | ✅ existe |
| Trilhas | `v_learning_paths` | ✅ existe (consumida em `/paths`) |
| Steps da trilha | `v_learning_path_steps` | ✅ existe |
| Progresso do usuário na trilha | `v_user_path_progress` | ✅ existe |
| Conclusões de step | `user_step_completions` (passthrough) | ✅ existe |
| Perfil (nome, avatar, papéis) | `v_profiles` | ✅ existe |
| Dashboards por papel | `v_dashboard_student/teacher/admin` | ✅ existem |
| **Distribuição de alunos por nível** | — | ❌ **FALTA** (D-1) |
| **Relação família → aluno (filho)** | — | ❌ **FALTA** (D-4) |
| **Progresso agregado de um aluno (para a família ver)** | parcial via `v_lesson_progress` + `v_dashboard_student` | ⚠️ reutilizável, mas RLS hoje restringe ao próprio aluno (D-3) |

> **Nota de derivação:** as contagens "completas/total por nível" já são
> calculadas **client-side** em `app/(protected)/lessons/page.tsx`
> (`levelStatsY1`/`levelStatsY2`), cruzando `v_lessons` × `v_lesson_progress`.
> Os componentes desta SPEC **mantêm essa derivação no chamador** e recebem
> dados já mastigados por props.

---

## 2. Entrega (a) — Mapa visual da trilha em `/paths/[id]`

**Objetivo:** evoluir a *timeline* vertical atual para um **mapa/jornada
conectada** (sensação de "caminho" entre steps), sem reescrever a página.

### Abordagem (incremento aditivo)
- **Não** alterar a lógica de fetch, `completeStep`, `isStepUnlocked`,
  `getStepLink` nem os textos PT-BR já presentes.
- Extrair a aparência da timeline para um componente novo de apresentação
  (ex.: `components/learning/TrilhaMapa.tsx`, **a criar numa frente futura**),
  que recebe `steps`, `completedStepIds`, `progress` por props e devolve o
  visual de "mapa". A página passaria a renderizar esse componente no lugar do
  bloco `{/* Timeline */}` — troca **1:1**, mesmos dados, mesmos handlers.

### Layout do "mapa"
- Caminho serpenteante (zigue-zague) em telas largas; vertical conectado no
  mobile (degrada para a timeline atual).
- Conector entre nós: cor do papel (`bg-student` p/ aluno) nos trechos já
  concluídos; cinza (`bg-gray-200`) no restante — reforça a progressão.
- Nó = marcador circular reaproveitando a semântica atual:
  concluído (check, cor do papel) · próximo/atual (anel destacado) ·
  disponível (ícone do tipo) · bloqueado (cadeado).
- Marco de chegada (último step) com **Enso Badge** (`.nw-enso`) — celebração.

### Dados
- `v_learning_path_steps`, `v_user_path_progress`, `user_step_completions`
  (todos já consumidos pela página). **Sem novas views.**

### Estados
- loading (skeleton já existe) · vazio ("Nenhum step") · bloqueado (cadeado +
  hint PT-BR) · concluído (banner troféu já existe, manter).

### Cor por papel
- A página `/paths/[id]` é usada por aluno/professor/admin. O mapa deve aceitar
  `role` e tingir conectores/nós com o token do papel ativo (vindo de
  `usePermissions().role.slug`). Default seguro: `student`.

---

## 3. Entrega (b) — Fluxo conectado dos níveis em `/lessons`

**Objetivo:** transformar os cartões soltos de nível numa **jornada de níveis
conectada** Ano1→Ano2 (sensação de progressão contínua), preservando 100% da
página atual.

### Abordagem (aditiva, sem quebrar)
- **Scaffold já criado:** `components/learning/NivelJornada.tsx` — componente de
  apresentação puro (sem fetch), descrito na seção 6.
- A página `/lessons` **não precisa mudar agora**. Quando for integrar, o uso é
  aditivo: derivar `NivelNode[]` a partir do que a página **já tem em memória**
  (`lessons`, `progressMap`, `levelStatsY1/Y2`, `totalCompleted`, regra de
  `isGated`) e renderizar `<NivelJornada>` — opcionalmente atrás de um toggle
  "Cartões / Jornada" para não remover a visão atual.

### Mapeamento dos dados existentes → props do componente
Para cada nível (`Object.entries(LESSON_LEVELS)` / `...YEAR2`):
- `total` ← `levelStats[key].total`
- `completed` ← `levelStats[key].completed`
- `status`:
  - `'completed'` se `completed === total && total > 0`
  - `'locked'` se `totalCompleted < level.prerequisite` (mesma regra `isGated`)
  - `'current'` para o **primeiro** nível não concluído e desbloqueado
  - `'available'` para os demais desbloqueados
- `href` ← `levelRoutes[key]` (já definido na página)
- `lockedHint` ← texto PT-BR já usado: `Requer N aulas concluídas (M feitas)`
- `emoji`/`label`/`description` ← `LESSON_LEVELS[key]`

### Layout
- Vertical conectado (default) com a linha-guia tingida pelo papel; horizontal
  com scroll opcional para mostrar a continuidade Ano1→Ano2 numa faixa.
- Aluno: cor vermelha (`student`). Em `/lessons` o público primário é o aluno.

### Estados
- loading (skeleton já existe na página) · vazio (componente trata) ·
  bloqueado (hint) · concluído (marcador preenchido).

### Cor por papel
- `role="student"` em `/lessons` (aluno). Reutilizável por professor/admin se a
  jornada for exibida em contexto de gestão (ver entrega c).

---

## 4. Entrega (c) — Visão "alunos por nível" (professor/admin)

**Objetivo:** dar a professor/admin a **distribuição dos alunos pelos 11 níveis**
(quantos alunos estão em cada nível), para leitura rápida da turma.

### Layout
- Reaproveitar `NivelJornada` com `role="teacher"` (azul) ou `role="admin"`
  (roxo), usando o slot `badge` de cada nó para a **contagem de alunos**
  (ex.: `12 alunos`, em `.nw-tabular`).
- Complemento: barra/heatmap horizontal "quantos alunos por nível" + lista
  drill-down "alunos neste nível" (nome via `v_profiles`).
- Rota sugerida (nova, frente futura): `/lessons/turma` ou
  `/dashboard/turma` — **não** sobrescrever `/lessons` atual.

### Dados — **DEPENDÊNCIA: falta view (D-1)**
"Nível atual de um aluno" = nível do **maior número de aula concluída** (ou
do próximo a fazer). Hoje isso exigiria varrer `v_lessons` × `v_lesson_progress`
de **todos** os alunos no cliente — inviável e contra o padrão.

Proposta de view (a ser criada por **outra frente**, ver `database/migrations/`):

```
-- RASCUNHO conceitual (NÃO aplicar aqui):
-- public.v_student_levels
--   student_id, student_name, year (1|2),
--   level_key (ex.: 'intermediario'),
--   completed_in_level, total_in_level
-- Regra do nível: derivar de core.lessons.number via mesma faixa de
-- getLessonLevel()/getLessonLevelYear2() (constants.ts).
-- RLS: visível a quem tem permissão de gestão (teacher/admin) no tenant.

-- public.v_level_distribution  (agregado para o gráfico)
--   year, level_key, student_count
```

Enquanto a view não existir, a tela pode ficar **atrás de feature flag** ou
exibir estado vazio "Em breve" — **sem** consultas pesadas no cliente.

### Estados
- loading · vazio ("Nenhum aluno na turma ainda") · erro · sem-permissão
  (proteger com `PermissionGate`/`required_permission`).

### Cor por papel
- professor=azul (`teacher`), admin=roxo (`admin`).

---

## 5. Entrega (d) — Dashboard do papel **Família** (âmbar 家族)

**Objetivo:** dar à família uma área para **acompanhar o progresso do(s)
filho(s)** — hoje o papel família não tem nenhuma página.

### Rotas (novas, frente futura)
- `/familia` — visão geral (lista de filhos + resumo).
- `/familia/[studentId]` — progresso de um filho (níveis, aulas recentes,
  conquistas, presença).

### Guard / acesso
- **Navegação:** itens família entram via `iam.navigation_items` +
  `iam.role_navigation` (navegação é 100% DB-driven). Item com
  `required_permission` adequado (ex.: `family.view_child`) — **a criar pela
  frente de banco**, não aqui.
- **Proteção de página:** envolver com `PermissionGate` e validar no server
  action que o `studentId` pertence a um filho vinculado ao usuário família.
- **Shell:** registrar o tema **família** em `ROLE_THEMES` do
  `OrientalDashboardLayout` (hoje só student/teacher/admin). Incremento aditivo:
  acrescentar a chave `family` (cor âmbar, kanji 家族, padrão `bg-pattern-kikko`).
  Token `family` já existe no Tailwind. (Dependência D-5.)

### Layout
- Cabeçalho âmbar (`from-family to-family-dark`), padrão Kikkō, tom acolhedor
  ("Acompanhe a jornada de {nome}").
- Reuso de `NivelJornada` com `role="family"` (âmbar) para mostrar onde o filho
  está — **somente leitura** (sem botões de concluir; passar nós sem `href`/
  `onSelect` ou com `href` apenas informativo).
- Blocos: progresso do ano, últimas aulas concluídas, conquistas, presença.

### Dados — **DEPENDÊNCIA: faltam view + RLS (D-3, D-4)**
- **D-4:** relação família↔filho não existe nos tipos. Precisa de tabela/relação
  (ex.: `iam.guardianships(guardian_user_id, student_user_id)`) + view
  `v_guardian_children`.
- **D-3:** `v_lesson_progress`/`v_dashboard_student` hoje têm RLS centrada no
  próprio aluno. Para a família ler o progresso do filho é preciso política RLS
  que autorize o responsável vinculado — **definir pela frente de banco**.
- Enquanto não houver dados reais, a página pode renderizar com **mock/estado
  vazio** ("Vincule um aluno para acompanhar"), sem quebrar nada.

### Estados
- loading · vazio (sem filhos vinculados) · erro · sem-permissão.

### Cor por papel
- família=âmbar (`family` / `#d97706`), padrão Kikkō 亀甲.

---

## 6. Scaffold seguro entregue agora

### `components/learning/NivelJornada.tsx` (criado)
Componente de **apresentação puro**, isolado, **não importado por nenhuma página
em produção**. Características:
- **Sem fetch / sem Supabase / sem next/link** — recebe tudo por props
  (`NivelNode[]`, `role`, `orientation`, `titulo`, `onSelect`).
- Cor por papel via tokens (`bg-student|teacher|admin|family`,
  `text-*-dark`) — sem hex hardcoded.
- Números em `.nw-tabular`; cards em `.nw-card`; foco em `.nw-focusable`.
- Estados: `completed | current | available | locked` + estado vazio.
- Orientação vertical (jornada conectada) ou horizontal (faixa Ano1→Ano2).
- Acessibilidade: `<button>` quando há `onSelect`, `<a>` quando há `href`,
  `aria-label` nos marcadores.
- Tipos exportados (`NivelNode`, `NivelStatus`, `JornadaRole`,
  `NivelJornadaProps`) + exemplo de uso em comentário no rodapé do arquivo.

> Validação visual em navegador (R-005) e integração nas páginas ficam para a
> frente de integração — este scaffold **não altera** o comportamento atual.

### Componentes ainda **não** criados (frentes futuras)
- `TrilhaMapa.tsx` (entrega a) — extração visual do mapa de steps.
- Tela `/lessons/turma` (entrega c) — depende da view D-1.
- Páginas `/familia` e `/familia/[studentId]` (entrega d) — dependem de D-3/D-4/D-5.

---

## 7. Dependências (outra frente) — checklist

| ID | Tipo | Descrição | Bloqueia |
|----|------|-----------|----------|
| **D-1** | View nova | `v_student_levels` + `v_level_distribution` (alunos por nível) — derivar nível de `lessons.number` pela faixa de `constants.ts`; RLS p/ teacher/admin | Entrega (c) |
| **D-2** | (opcional) View | `v_level_overview` por aluno (nível atual + % do ano) para reuso em jornada | (b) reuso |
| **D-3** | RLS / Política | Permitir responsável ler progresso do filho (`v_lesson_progress`, `v_dashboard_student`) | Entrega (d) |
| **D-4** | Tabela + View | `iam.guardianships` + `v_guardian_children` (família ↔ filho) | Entrega (d) |
| **D-5** | Front (aditivo) | Registrar tema `family` em `ROLE_THEMES` (`OrientalDashboardLayout`) — âmbar, 家族, `bg-pattern-kikko`; token já existe | Entrega (d) shell |
| **D-6** | Navegação DB | Itens de menu para `/familia*` e `/lessons/turma` via `iam.navigation_items` + `role_navigation` + `required_permission` | (c) e (d) |

> Toda migration nova deve nascer como **arquivo `.sql` em
> `database/migrations/`**, claramente marcado como rascunho não aplicado, e ser
> revisada/aplicada por quem cuida do banco. **Esta frente de front não aplica
> nada em produção.**
