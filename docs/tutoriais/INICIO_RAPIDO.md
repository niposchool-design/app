# Guia de Inicio Rapido - Nipo School

**Ultima atualizacao:** 2026-03-02

---

## Pre-requisitos

- Node.js 18+
- npm
- Projeto Supabase configurado

---

## Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

App: `http://localhost:4000`

---

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
npm run test
```

---

## Estrutura importante

- Rotas: `app/`
- Actions: `app/actions/`
- Supabase: `lib/supabase/`
- Database: `database/schema/` e `database/migrations/`
- Docs canônicas: `docs/arquitetura/*` + `docs/implementacao/*`
