# Estado Atual do App — Nipo School

> Atualizado em: 2026-03-03 (v4 — Pilot readiness, AI cost control, superadmin, feature flags)

## Arquitetura de Dados

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   PÁGINAS   │     │  SERVER ACTIONS   │     │   SUPABASE DB   │
│  (React)    │     │  (Next.js)        │     │  (PostgreSQL)   │
│             │     │                   │     │                 │
│ READ:       │────>│                   │     │ v_* views       │
│ v_* views   │     │                   │     │ (enriched,      │
│ via client  │     │                   │     │  46+ views)     │
│             │     │                   │     │                 │
│ WRITE:      │────>│ getActionContext()│────>│ passthrough      │
│ call action │     │ → tenant_id JWT  │     │ views (34+)     │
│             │     │ → userId         │     │ → iam.* tables  │
│             │     │                   │     │ → core.* tables │
│             │     │ 17 action files   │     │ 71 migrations   │
│             │     │                   │     │ 8 RPCs          │
│ AI:         │────>│ ai-actions.ts    │────>│ ai_generated_   │
│ GPT-4o-mini │     │ alpha-engine.ts  │     │ content +       │
│ GPT-4o      │     │                   │     │ alpha_queue     │
└─────────────┘     └──────────────────┘     └─────────────────┘
```

- **Leitura**: Páginas usam `supabase.from('v_*')` diretamente (client-side)
- **Escrita**: Páginas chamam server actions → actions usam passthrough views → RLS aplica
- **Segurança**: Apenas schema `public` exposto. Views com `security_invoker = true`
- **Tenant isolation**: Todas as actions usam `getActionContext()` que extrai `tenant_id` do JWT
- **AI**: OpenAI SDK (GPT-4o-mini bulk, GPT-4o feedback) — conteúdo salvo em `core.ai_generated_content`
- **Storage**: Supabase Storage bucket `lessons` para upload de materiais (PDFs, áudios, vídeos, imagens)

### Fluxo de Autenticação nas Actions

```
getActionContext() → lib/utils/action-context.ts
  1. createClient() (server-side supabase)
  2. getUser() → userId
  3. getSession() → access_token
  4. decode JWT → claims.tenant_id
  5. return { supabase, userId, tenantId }
```

### Proxy (Auth Middleware)

```
proxy.ts (Next.js 16 convention, renamed from middleware.ts)
  - Redireciona rotas protegidas → /login se sem sessão
  - Redireciona /login → /dashboard se com sessão
  - Redireciona rotas legadas (/admin, /professores, /alunos)
```

---

## Páginas Funcionais (66 rotas total)

### Dashboard
| Rota | Status | Dados |
|---|---|---|
| `/dashboard` | FUNCIONAL | `v_dashboard_student` / `v_dashboard_teacher` / `v_dashboard_admin` |

### Aulas & Turmas (Teacher/Admin)
| Rota | Status | Action |
|---|---|---|
| `/lessons` | FUNCIONAL | Lista via `v_lessons` |
| `/lessons/new` | FUNCIONAL | `createLesson()` → `lesson-actions` |
| `/lessons/[id]` | FUNCIONAL | Detalhes + materiais com FileUpload + `completeLesson()` |
| `/lessons/[id]/edit` | FUNCIONAL | `updateLesson()` → `lesson-actions` |
| `/lessons/alpha` | FUNCIONAL | Motor Alpha contínuo com fila AI (`v_alpha_queue`) |
| `/lessons/iniciante` — `/lessons/show-final` | FUNCIONAL | 10 páginas de módulos do Year 2 |
| `/lessons/kanban` | FUNCIONAL | Visão kanban das aulas |
| `/courses` | FUNCIONAL | Lista via `v_courses` |
| `/courses/new` | FUNCIONAL | `createCourse()` → `course-actions` |
| `/courses/[id]` | FUNCIONAL | Detalhes + alunos |
| `/courses/[id]/students` | FUNCIONAL | Lista alunos matriculados |
| `/courses/[id]/attendance` | FUNCIONAL | `recordAttendance()` → `course-actions` |

### Desafios & Avaliação
| Rota | Status | Action |
|---|---|---|
| `/challenges` | FUNCIONAL | Lista via `v_challenges` |
| `/challenges/[id]` | FUNCIONAL | `submitChallenge()` + AI feedback |
| `/evaluate` | FUNCIONAL | SpeedGrader: lista pendentes |
| `/evaluate/[id]` | FUNCIONAL | `evaluateSubmission()` → professor avalia |

### Portfólio
| Rota | Status | Action |
|---|---|---|
| `/portfolio` | FUNCIONAL | Lista via `v_portfolios` |
| `/portfolio/new` | FUNCIONAL | `submitPortfolioV2()` → aluno envia |
| `/portfolio/[id]` | FUNCIONAL | Detalhes do trabalho |

### Progresso & Gamificação
| Rota | Status | Dados |
|---|---|---|
| `/progress` | FUNCIONAL | `v_user_progress` + `v_user_achievements` |
| `/achievements` | FUNCIONAL | `v_achievements` + `v_user_achievements` |
| `/practice` | FUNCIONAL | `logPracticeSession()` + `deletePracticeSession()` + gamificação |

### Social
| Rota | Status | Action |
|---|---|---|
| `/feed` | FUNCIONAL | `createPost()`, `likePost()`, `commentOnPost()` + media player |
| `/feed/[id]` | FUNCIONAL | Detalhe do post + comentários (`v_feed_comments`) |
| `/community` | FUNCIONAL | `createTopic()` → forum |
| `/community/[id]` | FUNCIONAL | `replyToTopic()`, `likeTopic()` |

### Conteúdo Educacional
| Rota | Status | Dados |
|---|---|---|
| `/instruments` | FUNCIONAL | `v_instruments` |
| `/instruments/[id]` | FUNCIONAL | Detalhes instrumento |
| `/history` | FUNCIONAL | `v_history_periods` |
| `/history/[id]` | FUNCIONAL | Detalhes período |
| `/repertoire` | FUNCIONAL | `v_repertoire` |
| `/repertoire/new` | FUNCIONAL | `createRepertoire()` |
| `/repertoire/[id]` | FUNCIONAL | Detalhes peça |
| `/videos` | FUNCIONAL | Feed filtrado por vídeo/áudio |

### Acadêmico (NOVO)
| Rota | Status | Dados |
|---|---|---|
| `/academic` | FUNCIONAL | Hub com links para currículo e biblioteca |
| `/academic/curriculum` | FUNCIONAL | 9 metodologias + 4 ciclos + 8 pilares Alpha. Conteúdo de `v_library_items` |
| `/academic/library` | FUNCIONAL | Biblioteca com 24 capítulos + FileUpload para novos itens. `library-actions` |

### Trilhas de Aprendizagem (NOVO)
| Rota | Status | Dados |
|---|---|---|
| `/paths` | FUNCIONAL | Lista de trilhas via `v_learning_paths` |
| `/paths/[id]` | FUNCIONAL | Detalhes + etapas + progresso. `learning-path-actions` |

### AI & Configurações (Admin)
| Rota | Status | Action |
|---|---|---|
| `/settings` | FUNCIONAL | Hub de navegação |
| `/settings/ai-content` | FUNCIONAL | Geração em lote de materiais AI para 70 aulas |
| `/settings/ai-dashboard` | FUNCIONAL | Analytics de feedback AI + métricas |
| `/settings/users` | FUNCIONAL | `listUsers()`, `inviteUser()`, RBAC |
| `/settings/roles` | FUNCIONAL | Permissions + Navigation config |
| `/settings/enrollments` | FUNCIONAL | Matrícula de alunos em turmas |
| `/settings/school` | FUNCIONAL | Dados da escola + unidades (CRUD) |
| `/diagnostics` | FUNCIONAL | Stats do sistema |

### Gerenciamento
| Rota | Status | Action |
|---|---|---|
| `/students` | FUNCIONAL | Lista via `v_profiles` (role filter) |
| `/students/[id]` | FUNCIONAL | Detalhes aluno |
| `/teachers` | FUNCIONAL | Lista via `v_profiles` (role filter) |
| `/teachers/[id]` | FUNCIONAL | Detalhes professor |

### Perfil & Outros
| Rota | Status | Action |
|---|---|---|
| `/profile` | FUNCIONAL | `updateProfile()` com modo edição + multi-instrumentos |
| `/register` | FUNCIONAL | Formulário de cadastro de aluno |
| `/schedule` | FUNCIONAL | Agenda via `v_lessons` |
| `/documents` | FUNCIONAL | `v_support_materials` |
| `/training` | FUNCIONAL | Materiais de formação |
| `/show-final` | ESTÁTICO | Info sobre show final |
| `/help` | ESTÁTICO | FAQ |
| `/references` | ESTÁTICO | Links externos |
| `/experiences` | ESTÁTICO | Projetos BR |
| `/strategies` | ESTÁTICO | Metodologias |
| `/spaces` | ESTÁTICO | Espaços da escola |

---

## Server Actions (17 arquivos)

### Helper compartilhado
| Arquivo | Descrição |
|---|---|
| `lib/utils/action-context.ts` | `getActionContext()` → extrai `userId` + `tenant_id` do JWT |

### Actions de escrita (13 arquivos — todos com tenant_id)

| Arquivo | Funções | Tabelas/RPCs |
|---|---|---|
| `lesson-actions.ts` | createLesson, updateLesson, completeLesson | lessons, rpc_complete_lesson, rpc_award_points |
| `course-actions.ts` | createCourse, enrollStudent, recordAttendance | courses, enrollments, attendance |
| `challenge-actions.ts` | submitChallenge, evaluateSubmission | challenge_submissions, rpc_award_points |
| `portfolio-actions-v2.ts` | submitPortfolioV2, evaluatePortfolioV2 | portfolios, rpc_award_points |
| `feed-actions.ts` | createPost, likePost, commentOnPost, deletePost | feed_posts, feed_likes, feed_comments |
| `community-actions.ts` | createTopic, replyToTopic, likeTopic | forum_topics, forum_replies, forum_likes |
| `practice-actions.ts` | logPracticeSession, deletePracticeSession | practice_sessions, rpc_award_points |
| `profile-actions.ts` | updateProfile | profiles |
| `repertoire-actions.ts` | createRepertoire, updateRepertoire | repertoire |
| `library-actions.ts` | createLibraryItem, updateLibraryItem, deleteLibraryItem | library_items |
| `learning-path-actions.ts` | createPath, enrollInPath, completeStep | learning_paths, path_steps, path_enrollments |
| `unit-actions.ts` | createUnit, updateUnit, deleteUnit | units |
| `ai-feedback-actions.ts` | submitAIFeedback | ai_feedback |

### Actions de AI (2 arquivos)

| Arquivo | Funções | Tabelas |
|---|---|---|
| `ai-actions.ts` | generateLessonMaterials, generateBatchMaterials, getLessonAIContent | ai_generated_content |
| `alpha-engine-actions.ts` | getAlphaQueue, completeAlphaItem, skipAlphaItem, generateNextSteps, generateDailyChallenge | alpha_queue |

### Actions de RBAC (2 arquivos)

| Arquivo | Funções | Tabelas |
|---|---|---|
| `rbac-admin-actions.ts` | listUsers, inviteUser, assignRole, +10 mais | user_roles, role_permissions, etc. |
| `rbac-actions.ts` | loadUserRBAC | rpc_get_user_rbac |

### Gamificação (fire-and-forget)

Pontos são atribuídos automaticamente após sucesso nas actions:

| Action | Evento | Pontos |
|---|---|---|
| `completeLesson()` | Aula concluída | +10 |
| `submitChallenge()` | Desafio submetido | +15 |
| `submitPortfolioV2()` | Portfólio submetido | +20 |
| `logPracticeSession()` | Prática registrada | +5 |

Padrão: `rpc_award_points()` → then → `rpc_check_achievements()` (não awaited)

---

## AI Integration

| Componente | Descrição |
|---|---|
| `lib/ai/ai-client.ts` | OpenAI SDK wrapper (provider-agnostic) |
| `lib/ai/prompts.ts` | System prompts para materiais, exercícios, feedback, next-steps |
| `lib/ai/curriculum-context.ts` | Mapeamento de 70 aulas → metodologias |
| Models | GPT-4o-mini (bulk generation), GPT-4o (feedback/análise) |
| Env vars | `OPENAI_API_KEY`, `AI_MODEL_FAST`, `AI_MODEL_SMART` |

---

## Componentes UI Novos

| Componente | Descrição |
|---|---|
| `components/ui/file-upload.tsx` | Upload de arquivos via Supabase Storage (drag & drop) |
| `components/ui/media-player.tsx` | Player de áudio com controles |
| `components/ui/youtube-embed.tsx` | Embed responsivo de YouTube |
| `components/alpha-next-step.tsx` | Card de próximo passo do Alpha Engine |

---

## RPCs no Banco (8)

| RPC | Chamado por | Status |
|---|---|---|
| `rpc_get_user_rbac()` | rbac-actions.ts | ATIVO |
| `rpc_complete_lesson()` | lesson-actions.ts | ATIVO |
| `rpc_award_points()` | lesson/challenge/portfolio/practice-actions | ATIVO |
| `rpc_check_achievements()` | lesson/challenge/portfolio/practice-actions | ATIVO |
| `rpc_submit_portfolio()` | (disponível, não usado — usamos INSERT direto) | RESERVA |
| `rpc_evaluate_portfolio()` | (disponível, não usado) | RESERVA |
| `rpc_submit_challenge()` | (disponível, não usado) | RESERVA |
| `rpc_evaluate_challenge()` | (disponível, não usado) | RESERVA |

---

## Migrations (055)

| # | Arquivo | Conteúdo | Status |
|---|---|---|---|
| 001-035 | Schema base + seed data | Tabelas, views, RLS, seeds | APLICADO |
| 036 | RBAC permissions patch | Permissões adicionais | APLICADO |
| 037 | Fix manage-teachers href | Correção de link | APLICADO |
| 038 | 24 passthrough views | Views passthrough | APLICADO |
| 039 | Extra passthrough views | challenges, repertoire, instruments, etc. | APLICADO |
| 040 | Lesson views + widen text columns | Views de aula, colunas text alargadas | APLICADO |
| 040b | Cleanup year 2 | Limpeza de dados Year 2 | APLICADO |
| 041-045 | Lessons, activities, materials, criteria, checklists 2026 | Seed de 70 aulas do Year 2 | APLICADO |
| 046 | Achievements year 2 | Conquistas do ano 2 | APLICADO |
| 047 | Resilient RBAC RPC | `rpc_get_user_rbac()` melhorado | APLICADO |
| 048 | Profile, instruments, signup | Multi-instrumentos, formulário registro | APLICADO |
| 049 | Units, multi-instruments, edit | CRUD de unidades, edição de perfil | APLICADO |
| 050 | AI content engine | `ai_generated_content`, `alpha_queue`, views, nav | APLICADO |
| 051 | Storage buckets | Bucket `lessons` para upload | APLICADO |
| 052 | Learning paths | `learning_paths`, `path_steps`, `path_enrollments` | APLICADO |
| 053 | AI feedback columns | Colunas de feedback AI em submissions, nav | APLICADO |
| 054 | Fix v_lessons alias | `lesson_number` alias em `v_lessons` | APLICADO |
| 055a | Library structure | Tabela `library_items`, RLS, views | APLICADO |
| 055b | Seed methodologies | Capítulos 0-9 (conteúdo completo em markdown) | APLICADO |
| 055c | Seed curriculum | Capítulos 10-23 (conteúdo completo) | APLICADO |
| 055d | Academic navigation | Nav items para academic hub | APLICADO |

---

## Fixes Aplicados

| Data | Fix | Causa | Arquivos |
|---|---|---|---|
| 2026-02-28 | tenant_id em todas as actions | RLS exige `tenant_id = fn_tenant_id()` do JWT | 9 action files + action-context.ts |
| 2026-02-28 | Deletar 4 actions legadas | Referenciavam tabelas antigas (`aulas`, `turmas`) | aluno/professor/admin/gamification-actions |
| 2026-02-28 | Conectar 12 páginas às actions | Forms com botões sem handler | 12 page files |
| 2026-02-28 | Gamification wiring | RPCs existiam mas não eram chamados | lesson/challenge/portfolio-actions |
| 2026-03-02 | middleware.ts → proxy.ts | Convenção Next.js 16 deprecou middleware | proxy.ts |
| 2026-03-02 | Sidebar icons | 5 ícones faltando no ICON_MAP | OrientalDashboardLayout.tsx |

---

## Novos Sistemas (v4 — Pilot Readiness)

### AI Cost Control
- `ai_usage_log`: Log de cada chamada AI (tokens, custo, latência, ação)
- `ai_quotas`: Limites diários/mensais por tenant e por usuário
- `rpc_check_ai_quota()`: Verifica quota antes de chamar API
- Rate limiting integrado em `lib/ai/ai-client.ts`
- Custo estimado: GPT-4o-mini ($0.15/$0.60 per 1M tokens), GPT-4o ($2.50/$10.00)

### Superadmin Dashboard (`/settings/superadmin`)
- Requisições e custo IA diário/mensal
- Erros e latência média
- Alertas visuais (pico de custo >200%, taxa de erros >10%, latência >10s)
- Tabela de auditoria (`audit_events`)

### Data Quality (`/settings/data-quality`)
- `rpc_data_completeness_report()`: Completude por tabela
- CHECK constraints em grades (0-10), counters (>=0), durations (>0)
- Dashboard visual com % de completude

### Feature Flags (`core.feature_flags`)
- Controle de módulos por tenant para rollout gradual
- Server: `isFeatureEnabled(key)`, Client: `useFeatureFlags()`
- 10 flags pré-configurados para o piloto

### CI Pipeline (`.github/workflows/ci.yml`)
- lint + type-check + test em push/PR
- 6 arquivos de teste, 45 testes

---

## O que Falta (Futuro)

- [x] ~~Upload de arquivos via Supabase Storage~~ (implementado)
- [x] ~~Testes automatizados~~ (45 testes via Vitest)
- [x] ~~CI/CD pipeline~~ (GitHub Actions)
- [ ] Upload de arquivos em portfólio e feed
- [ ] Timeline interativa de história da música
- [ ] Quiz nos instrumentos
- [ ] Notificações em tempo real
- [ ] QR Scanner funcional
- [ ] i18n (português/japonês)
- [ ] PWA / mobile app
- [ ] Integração com pagamento (matrículas)
- [ ] Relatórios PDF para pais/responsáveis
- [ ] TypeScript strict mode
- [ ] Monitoramento externo (Sentry/Datadog)
