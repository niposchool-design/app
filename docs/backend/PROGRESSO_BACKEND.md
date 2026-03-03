# Progresso Backend - Nipo School

**Ultima atualizacao:** 2026-03-02

Este documento resume o backend no estado atual do codigo.

---

## Estado atual

- Server Actions ativas: 17 (`app/actions/*.ts`)
- Contexto compartilhado de tenant/auth: `lib/utils/action-context.ts`
- Validacao: Zod (`lib/validations/*`)
- Respostas padrao: `lib/utils/action-response.ts`
- RBAC: RPC `rpc_get_user_rbac` + `checkPermission`

---

## Pontos consolidados

- Fluxo de escrita via actions server-side.
- Navegacao e permissao orientadas por banco.
- Modulos academico, AI e RBAC operacionais.

---

## Proximas melhorias tecnicas

1. Expandir suite de testes automatizados.
2. Cobrir cenarios de seguranca e regressao de RLS.
3. Medicao de performance de queries criticas por modulo.
