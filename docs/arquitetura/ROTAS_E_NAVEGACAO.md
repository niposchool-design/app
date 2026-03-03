# Rotas e Navegacao - Nipo School

**Ultima atualizacao:** 2026-03-03
**Framework:** Next.js 16 (App Router)
**Protecao:** `proxy.ts` + RBAC por permissoes

---

## Visao geral

A aplicacao usa App Router e organiza rotas em:

- `app/(auth)`: autenticacao (`/login`, `/register`, `/set-password`).
- `app/(protected)`: modulos protegidos.
- `app/auth/callback`: callback de autenticacao do Supabase.

A navegacao lateral e dinamica, carregada do banco via RBAC (`rpc_get_user_rbac`).

---

## Proxy de autenticacao

Arquivo: `proxy.ts`

Responsabilidades:

- Redirecionar usuario sem sessao para `/login` em rotas protegidas.
- Redirecionar usuario autenticado em `/` ou `/login` para `/dashboard`.
- Redirecionar rotas legadas (`/admin`, `/professores`, `/alunos`) para rotas unificadas.

---

## Rotas principais (protegidas)

- Dashboard e perfil: `/dashboard`, `/profile`, `/progress`, `/practice`
- Academico: `/academic`, `/academic/curriculum`, `/academic/library`
- Aulas e ensino: `/lessons/*`, `/courses/*`, `/evaluate/*`, `/schedule`
- Conteudo: `/instruments/*`, `/history/*`, `/repertoire/*`, `/videos`, `/documents`
- Engajamento: `/feed/*`, `/community/*`, `/challenges/*`, `/achievements`
- Gestao: `/students/*`, `/teachers/*`, `/settings/*`, `/diagnostics`
- Trilhas: `/paths/*`
- Superadmin: `/settings/superadmin` (custos IA, alertas, auditoria)
- Qualidade de Dados: `/settings/data-quality` (completude por tenant)

---

## Regras para novas rotas

1. Criar rota em `app/` seguindo App Router.
2. Definir permissao no RBAC (se aplicavel).
3. Incluir item em `iam.navigation_items` e `iam.role_navigation` via migration.
4. Atualizar este documento e `ESTADO_ATUAL.md`.

---

## Observacao

Qualquer referencia a `middleware.ts`, prefixos `/alunos|/professores|/admin` como arquitetura principal, ou React Router deve ser tratada como historica.
