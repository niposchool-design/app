# Sistema de Portfolio - Nipo School

**Ultima atualizacao:** 2026-03-02

---

## Escopo atual

O portfolio e implementado no App Router, com rotas:

- `/portfolio`
- `/portfolio/new`
- `/portfolio/[id]`

Escrita/avaliacao ocorre por server actions em `app/actions/portfolio-actions-v2.ts`.

---

## Stack efetiva

- Next.js App Router
- Supabase (views + tabelas de dominio)
- Server Actions para operacoes de escrita
- Componentes React em `app/(protected)/portfolio/*`

---

## Nota

Referencias antigas a React Router para portfolio nao se aplicam ao app atual.
