# Auditoria & Remediação de Segurança — Nipo School (2026-05-29)

> Trabalho conduzido conforme as travas do cockpit DIGIAI (R-009, R-012, R-024, R-021). App real/deploy: `D:\projetos\nipo_school\app` (repo `niposchool-design/app`). Banco de produção: projeto Supabase **`tqlwkgiytdikumtcnizf`** (não confundir com `eehidnwlwrzqzgytbfsd`, ver §6).

## 1. Resumo executivo

Encontrado e **corrigido em produção** um furo sistêmico de Broken Access Control (OWASP A01): ~58 tabelas `core.*` tinham RLS apenas por tenant (sem role), permitindo que **qualquer aluno lesse e escrevesse dados de toda a escola** — inclusive PII de menores, portfólios e pontos de colegas. Aplicada migration de hardening + defesa em profundidade nas server actions. Validado simulando RLS (aluno vê só o próprio; staff vê tudo; zero regressão).

## 2. ✅ Corrigido

### 2.1 RLS role-aware (migration `database/migrations/065_rls_role_hardening.sql`) — APLICADO no banco vivo
- Substituída a policy única `tenant_isolation` (FOR ALL, só-tenant) por policies separadas em ~58 tabelas `core.*` + `iam.profiles`:
  - **Conteúdo** (lessons, courses, instruments, history_*, repertoire, etc.): SELECT tenant-wide; escrita só admin/teacher.
  - **Pessoal** (portfolios, challenge_submissions, practice_sessions, etc.): SELECT dono+staff; escrita do próprio + staff.
  - **Gamificação/nota/presença** (points_log, user_progress, user_achievements, lesson_progress, attendance, enrollments): SELECT dono+staff; escrita **staff-only** (os RPCs de gamificação são `SECURITY DEFINER`, seguem funcionando).
  - **Social** (feed_*, forum_*, lesson_comments): SELECT tenant; escrita do autor + admin.
  - **`iam.profiles`**: SELECT passou de tenant-wide para **dono+staff** (protege PII de menores).
- **Validação:** aluno agora vê 1 perfil (era 31) e 1 registro de pontos (era 25); aulas seguem legíveis (78); admin/staff veem tudo. Rollback comentado no fim da migration.
- **Nota operacional:** aplicar via Management API SEM `BEGIN;/COMMIT;` explícito (o endpoint gerencia a transação).

### 2.2 Defesa em profundidade — `checkPermission` nas write actions (staff)
`lesson-actions` (create/edit/status), `course-actions` (create/enroll/attendance), `challenge-actions` (grade), `portfolio-actions-v2` (grade), `repertoire-actions` (create/edit), `unit-actions` (settings.manage). (ai-actions/ai-feedback/library já tinham.) Ações do próprio aluno (submit/practice) intactas.

### 2.3 Prompt injection (R-024 / LLM01)
`generatePortfolioFeedback` e `generateChallengeFeedback`: texto livre do aluno agora vai em `<ALUNO_INPUT>` + `sanitizeForPrompt()` (`lib/ai/sanitize.ts`), system com `INJECTION_GUARD` (`lib/ai/prompts.ts`).

### 2.4 Headers de segurança (R-024 A05)
`next.config.mjs`: CSP, X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. **HSTS só em produção** (em dev quebrava o localhost via HTTPS forçado).

### 2.5 Guard de rota
`/settings/ai-dashboard` ganhou `PermissionGate permission="settings.view"` (estava sem, ao contrário dos outros `/settings/*`).

> **Status de deploy:** itens 2.2–2.5 são edições no repo, **ainda não commitadas/deployadas** (R-003). Item 2.1 já está **no banco de produção**. type-check: ✅ exit 0.

## 3. Gaps abertos (recomendações)

| # | Severidade | Gap | Ação sugerida |
|---|---|---|---|
| 1 | 🚨 Alta (LGPD) | **Cadastro de menor sem consentimento parental** (auditoria cockpit QW-1): `/register` sem gate de idade, sem `parent_consent_at`/guardian. | Migration de schema (campos LGPD) + fluxo de consent. Aplicar antes de rollout comercial. |
| 2 | 🟠 | `.env.local` aponta pro projeto **errado** (`eehidnwlwrzqzgytbfsd` ≠ produção). | Decidir: apontar local pra produção, ou confirmar projeto de staging. Ver §6. |
| 3 | 🟡 | Rotas órfãs: `videos`, `family-report` (usa role `family` inexistente), `em-construcao` (só redireciona). | Decidir remover ou ligar à navegação. |
| 4 | 🟡 | `/progress` mapeado em 2 itens de nav (`progress` + `gamification`). | Limpar 1 item (migration de nav). |
| 5 | 🟡 | `settings.manage` usada como `required_permission` (nav superadmin) — confirmar se concedida a admin. | Verificar seed de role_permissions. |
| 6 | 🟡 | `unenrollStudent` e (se existir) criação de challenge sem `checkPermission`. RLS já protege; falta o erro limpo. | Adicionar checkPermission. |
| 7 | 🔐 | **R-021**: PAT `sbp_` (conta inteira) e GitHub `ghp_` em texto puro no `.env`. | **Rotacionar ambos.** |
| 8 | 🟠 | Upload de mídia de menor sem validação MIME/tamanho (ECA 17); base legal transferência OpenAI (LGPD 33). | Itens QW-3/QW-9 da auditoria cockpit. |

## 4. Já em conformidade (confirmado)
RLS habilitado em todas as tabelas; `audit_events` existe (A09); service role server-only; sem `dangerouslySetInnerHTML`/`execute_sql` interpolado; pagamentos não integrados; Next 16.0.10 (CVE-2025-29927 patched).

## 5. Próximos passos de análise (não iniciados)
- Passo 2: fluxos por nível (jornada student/teacher/admin/family).
- Passo 4: visual & usabilidade (estados, responsivo, acessibilidade, tom PT-BR).
- Passo 6: Design System próprio "Nipo Wa" (pegada japonesa) — base em `D:\projetos\nipo_school_design\` + playbook do cockpit.

## 6. Dois projetos Supabase (resolver)
- **Produção** (deploy Vercel): `tqlwkgiytdikumtcnizf`.
- **Local `.env.local`**: `eehidnwlwrzqzgytbfsd` (diferente). Por isso o login local batia em outro banco.
- Decidir qual é dev/staging e alinhar.

---
*Gerado por agente Claude sob autorização do dono (Junior). Mudança de banco aplicada após dry-run + análise de quebra + validação por simulação de RLS.*
