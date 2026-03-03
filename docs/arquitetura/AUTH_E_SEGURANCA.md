# Autenticacao e Seguranca - Nipo School

**Ultima atualizacao:** 2026-03-02
**Fonte de verdade:** codigo em `proxy.ts`, `app/providers/*`, `lib/supabase/*`, `lib/auth/*`, `app/actions/*`.

---

## Arquitetura de autenticacao

- Provedor: Supabase Auth.
- Sessao: cookies gerenciados por `@supabase/ssr`.
- Guard de rota: `proxy.ts`.
- Callback de auth: `app/auth/callback/route.ts`.

Fluxo principal:

1. Usuario autentica (login/signup/invite).
2. `proxy.ts` valida sessao nas rotas protegidas.
3. Actions server-side usam `getActionContext()` para obter `userId` e `tenant_id` via JWT.
4. RLS e permissoes em banco reforcam autorizacao.

---

## Autorizacao (RBAC)

- Fonte de permissao: RPC `rpc_get_user_rbac`.
- Checagem server-side: `checkPermission()` / `requirePermission()`.
- Navegacao dinamica por role: `PermissionsProvider` + `role_navigation`/`navigation_items`.

Principio:

- Controle visual no frontend (`PermissionGate`) e controle efetivo no backend (server actions + RLS).

---

## Seguranca de chaves

- `SUPABASE_SERVICE_ROLE_KEY`: uso exclusivo server-side.
- Proibido expor `service_role` em variaveis `NEXT_PUBLIC_*`.
- Cliente browser usa apenas `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## Checklist operacional

- [ ] Rotas sensiveis protegidas por `proxy.ts`
- [ ] Actions criticas com checagem de permissao
- [ ] RLS validado nas tabelas de escrita
- [ ] Nenhum segredo em `NEXT_PUBLIC_*`
- [ ] Documentacao atualizada apos mudancas de auth

---

## Nota

Referencias antigas a `src/features/*`, `ProtectedRoute` legado ou `middleware.ts` devem ser tratadas como historicas.
