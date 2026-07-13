# Roteamento documental operacional

Antes de qualquer alteracao neste app, leia tambem:

D:\projetos\Cockpit\Apps\nipo_school\README.md

O app/codigo/filesystem e a verdade factual. O Cockpit e a fonte documental operacional. Se divergirem, o app vence e o Cockpit deve ser atualizado no mesmo turno.

---
# AGENTS.md â€” Nipo School

> **Porta de entrada padronizada** para qualquer agente IA (Claude, Cursor, Cline, Copilot, Aider) entrando neste app. ConvenÃ§Ã£o definida em [ADR-0024](../../Cockpit/ADR/ADR-0024-agents-md-por-app-aguardando-design-system.md).
>
> **Ler este arquivo ANTES de qualquer ediÃ§Ã£o neste app.**

---

## 1. O que Ã© (1 frase)

Plataforma multi-tenant de ensino musical (Next.js 16 + Supabase + OpenAI) que combina pedagogia japonesa (Kaizen, Wa, Shoshin) com 8 metodologias musicais ativas para escolas brasileiras com alunos 7-17 anos. Em piloto real desde 2026-03.

## 2. PosiÃ§Ã£o na DIGIAI

- **Verdade CanÃ´nica que rege:** "DIGIAI App Ã© infraestrutura interna, nÃ£o produto de mercado" (Nipo School Ã© a exceÃ§Ã£o institucional/filantrÃ³pica)
- **Fase atual do app:** v4.1 â€” piloto real prÃ³ximo de produÃ§Ã£o
- **Prioridade na matriz:** MÃ‰DIA (nÃ£o bloqueia produto-Ã¢ncora Clearix)
- **Categoria portfÃ³lio:** INSTITUCIONAL (camada 5 da arquitetura de marca DIGIAI)

## 3. Onde estÃ¡ a verdade (leituras obrigatÃ³rias antes de editar)

- **Spec:** [`../../Cockpit/Spec/nipo_school.md`](../../Cockpit/Spec/nipo_school.md) â€” fonte de verdade do produto
- **DocumentaÃ§Ã£o canÃ´nica do app:** [`docs/README.md`](docs/README.md) â€” lista os docs confiÃ¡veis e os histÃ³ricos
- **Arquitetura (READ-FIRST antes de mexer em cÃ³digo):**
  - [`docs/arquitetura/ESTADO_ATUAL.md`](docs/arquitetura/ESTADO_ATUAL.md) â€” 66 rotas, 17 actions, 8 RPCs
  - [`docs/arquitetura/BANCO_DE_DADOS.md`](docs/arquitetura/BANCO_DE_DADOS.md) â€” schemas iam/core/internal/public
  - [`docs/arquitetura/AUTH_E_SEGURANCA.md`](docs/arquitetura/AUTH_E_SEGURANCA.md) â€” proxy.ts + RLS + tenant_id JWT
- **Pedagogia (READ-FIRST antes de mexer em UX/copy):**
  - [`docs/pedagogia/ESSENCIA_PEDAGOGICA.md`](docs/pedagogia/ESSENCIA_PEDAGOGICA.md) â€” 8 metodologias + filosofia japonesa-brasileira
  - [`docs/pedagogia/LOGICA_APP.md`](docs/pedagogia/LOGICA_APP.md)
- **Pilot Readiness:** [`PILOT_READINESS.md`](PILOT_READINESS.md) e [`docs/operations/PRODUCTION_GAP_ANALYSIS.md`](docs/operations/PRODUCTION_GAP_ANALYSIS.md)
- **Regras Harness crÃ­ticas:**
  - **R-003** â€” nÃ£o commit sem pedido
  - **R-004** â€” aÃ§Ã£o destrutiva exige confirmaÃ§Ã£o humana
  - **R-005** â€” UI verificada no navegador antes de declarar pronto
  - **R-010** â€” Pergunta de Ouro filtra toda decisÃ£o
  - **R-014** â€” design system obrigatÃ³rio (Nipo School usa **Nipo Wa**, nÃ£o Clearix Lens â€” ver Â§7)
  - **R-024** â€” Baseline AppSec (OWASP Top 10): RLS Â· parametrized queries Â· webhooks com signature Â· headers de seguranÃ§a Â· `dangerouslySetInnerHTML` e `execute_sql` interpolado bloqueados por hook T-005

## 4. Stack + dev

- **Stack:** Next.js 16 (App Router, React 19, TypeScript 5) + TailwindCSS 3.4 + Supabase (PostgreSQL+Auth+Storage) + OpenAI (motor Alpha) + Radix UI + Heroicons/Lucide + framer-motion + React Hook Form + Zod + React Query
- **Porta dev:** 4000
- **URL produÃ§Ã£o:** `Precisa de validaÃ§Ã£o` (provavelmente Vercel)
- **Como rodar:** `npm run dev`
- **Hospedagem:** Vercel
- **CI/CD:** GitHub Actions (lint + type-check + Vitest em push/PR)

## 5. Banco + permissÃµes

- **Projeto Supabase:** `Precisa de validaÃ§Ã£o` (ref no `.env.local`)
- **MCP Supabase tem acesso direto?** Sim (MCP `90582afd-1ceb-4ebd-af94-0643a3ac3bd7` listado nas ferramentas disponÃ­veis)
- **PAT local em `.env`?** Sim â€” `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Schemas que o app toca:** `iam`, `core`, `internal`, `public`
- **Tabelas crÃ­ticas:** `iam.profiles`, `core.schools`, `lessons`, `portfolios`, `alpha_queue`, `practice_sessions`, `user_roles`, `role_permissions`
- **RLS por `tenant_id`:** **SIM** â€” toda escrita via `getActionContext()` que extrai tenant_id do JWT
- **Auth provider:** Supabase Auth + `proxy.ts` (renomeado de middleware.ts, convenÃ§Ã£o Next.js 16)

## 6. Comandos

### âœ… Verde (rodar sem confirmar)

- `npm run dev` â€” sobe dev server porta 4000
- `npm run test` â€” Vitest run (45 testes em 6 arquivos)
- `npm run test:watch` â€” Vitest em watch mode
- `npm run lint` â€” ESLint
- `npm run type-check` â€” `ensure-next-type-files.mjs` + `tsc --noEmit`
- `npm run build` â€” build produÃ§Ã£o (nÃ£o deploya)

### ðŸŸ¡ Confirma antes (mudanÃ§a no banco/estado)

- Aplicar migration nova em `database/migrations/` â€” confirmar com humano
- Rodar seed scripts em `scripts/` â€” confirmar (alguns reseteam dados)
- GeraÃ§Ã£o em lote AI via `/settings/ai-content` â€” consome quota OpenAI

### ðŸ”´ Nunca sem permissÃ£o explÃ­cita do humano (R-003, R-004)

- `git push` â€” exige instruÃ§Ã£o explÃ­cita
- `git commit` â€” sÃ³ com pedido
- Deploy em produÃ§Ã£o (Vercel) â€” confirmaÃ§Ã£o obrigatÃ³ria
- `npm run start` em produÃ§Ã£o
- Editar migration **jÃ¡ aplicada** (migrations sÃ£o append-only)
- Editar `proxy.ts` sem entender impacto RLS multi-tenant
- Apagar bucket Supabase Storage
- Resetar dados de tenant real
- `dangerouslySetInnerHTML` sem DOMPurify (hook T-005 bloqueia â€” R-024)
- `execute_sql` com template literal interpolado (hook T-005 bloqueia â€” R-024)

## 7. Design System â€” Nipo Wa (prÃ³prio, NÃƒO Clearix Lens)

**ExceÃ§Ã£o justificada Ã  R-014:** Nipo School Ã© camada 5 (institucional/filantrÃ³pica) com identidade pedagÃ³gica japonesa-brasileira prÃ³pria. Tem **DS dedicado**: **Nipo Wa**.

Caminho: [`D:\projetos\nipo_school_design\`](../../nipo_school_design/)

### Antes de criar/editar UI:

1. Ler [`nipo_school_design/assets/AGENT_GUIDE.md`](../../nipo_school_design/assets/AGENT_GUIDE.md) â€” ~5 min (serÃ¡ criado na Fase C do playbook)
2. Usar tokens de [`nipo_school_design/assets/tokens/`](../../nipo_school_design/assets/tokens/) â€” NUNCA hardcoded
3. Consultar componentes em [`nipo_school_design/assets/components/`](../../nipo_school_design/assets/components/) â€” HTML standalone copy-pasteable
4. Para nova ilustraÃ§Ã£o: estilo **"Sumi-Ãª Tropical"** (nÃ£o unDraw / nÃ£o anime / nÃ£o mascote)

### Regras inegociÃ¡veis Nipo Wa (recortes do AGENT_GUIDE):

1. **Primary Ã© VERMELHO** (nÃ£o roxo â€” roxo Ã© apenas do papel admin)
2. **Cores de papel:** admin violet `#8b5cf6` / professor sky `#0ea5e9` / aluno emerald `#10b981` â€” **NUNCA misturar**
3. **Tabular nums obrigatÃ³rio** em BPM, pontos, notas, datas, tempo de prÃ¡tica
4. **CartÃ£o "PrÃ³ximo passo IA"** SEMPRE com badge "Sugerido pela IA" + justificativa pedagÃ³gica
5. **Player de Ã¡udio** SEMPRE com waveform (nÃ£o barra plana)
6. **Tom musical humano em erros** ("perdeu o compasso" nÃ£o "Error 404", "desafinou" nÃ£o "Internal Server Error")
7. **PT-BR 100%** + sem ALL CAPS em tÃ­tulos (nÃ£o combina com disciplina japonesa)

### Status do DS (2026-05-23)

- [x] Brief aprovado: [`nipo_school_design/BRIEF.md`](../../nipo_school_design/BRIEF.md)
- [x] 10 prompts preparados em [`nipo_school_design/prompts/`](../../nipo_school_design/prompts/)
- [ ] Fase A â€” Stitch (prompts 01-04)
- [ ] Fase B â€” ConsolidaÃ§Ã£o (DESIGN_canonico.md)
- [ ] Fase C â€” Foundation as Code (tokens + SVGs + components)
- [ ] Fase D â€” Marketing + spec atualizada

**Enquanto Nipo Wa v1.0 nÃ£o estÃ¡ completo**, continuar usando o sistema atual em [`docs/design/`](docs/design/) (CONSTANTS.md + TAILWIND_CONFIG.md). NÃƒO migrar UI prematuramente â€” esperar tokens.json estÃ¡vel.

## 8. NÃƒO fazer (antipatterns especÃ­ficos)

- âŒ Query direto em `iam.*` ou `core.*` do client â€” sempre via `v_*` views
- âŒ Write direto do client â€” sempre via Server Action com `getActionContext()`
- âŒ Editar migration jÃ¡ aplicada (sempre criar nova append-only)
- âŒ Hardcoded de tenant_id (sempre extrair do JWT)
- âŒ Bypass do `proxy.ts` (auth + RLS dependem dele)
- âŒ `await` em `rpc_award_points()` / `rpc_check_achievements()` â€” sÃ£o fire-and-forget intencional
- âŒ Chamada OpenAI fora de `lib/ai/ai-client.ts` (sem logging/quota)
- âŒ UI fora do DS Nipo Wa (quando estiver pronto) â€” proibido por R-014
- âŒ Cadastrar tabela de pessoa sem schema R-013 (USUUID + BSUID se tocar pessoa)
- âŒ Roxo como cor principal (roxo Ã© do papel admin, primary Ã© vermelho)
- âŒ Confetti / glitter / cartoon (nÃ£o Ã© Duolingo)
- âŒ Cadastrar fonte alÃ©m de Inter + JetBrains Mono (R-014)

## 9. Secrets

- **Onde:** sempre via `.env.local` (nunca hardcoded â€” proibido)
- **VariÃ¡veis exigidas:**
  - `NEXT_PUBLIC_SUPABASE_URL` â€” URL do projeto Supabase
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` â€” chave anon (client-side OK)
  - `SUPABASE_SERVICE_ROLE_KEY` â€” server-side only (server actions)
  - `OPENAI_API_KEY` â€” motor Alpha
  - `AI_MODEL_FAST=gpt-4o-mini` â€” bulk generation
  - `AI_MODEL_SMART=gpt-4o` â€” feedback/anÃ¡lise
- **VariÃ¡veis opcionais:**
  - `VERCEL_*` (deploy automÃ¡tico)
- **NUNCA commitar `.env.local`** â€” verificar `.gitignore` antes de qualquer push

## 10. PendÃªncias conhecidas (gaps do Spec)

> Copiar da seÃ§Ã£o "Gaps e PendÃªncias" de [`Spec/nipo_school.md`](../../Cockpit/Spec/nipo_school.md). Quando resolver, marcar `[x]` aqui E lÃ¡.

- [ ] DS Nipo Wa em produÃ§Ã£o (fases A-D nÃ£o rodadas â€” sÃ³ brief + prompts prontos)
- [ ] Logo master vetorial â€” validar se existe atual ou criar do zero
- [ ] ValidaÃ§Ã£o de marca registrada "Nipo School"
- [ ] MigraÃ§Ã£o completa de `src.vite-backup/` legado React Router
- [ ] Landing page comercial (escopo v1.1 do DS)
- [ ] URL produÃ§Ã£o Vercel confirmada
- [ ] Project ref Supabase documentado

---

## Notas para quem mantÃ©m este arquivo

- **Atualizar este arquivo no mesmo turno** em que mudar Stack/banco/secrets/comandos do app
- **Quando Nipo Wa v1.0 ficar pronto**: atualizar Â§7 com link para AGENT_GUIDE concreto e remover "serÃ¡ criado"
- **VersÃ£o deste template base:** v1.0 (2026-05-22)
- **Owner deste arquivo:** SIS Vision

> Em caso de dÃºvida ou ambiguidade entre Spec, ADR, Harness, design system e este arquivo, **pause e pergunte ao humano**. NÃ£o invente.

