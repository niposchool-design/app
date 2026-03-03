# Nipo School - Sistema Oriental de Ensino Musical

![Status](https://img.shields.io/badge/status-pilot%20ready-green)
![CI](https://github.com/YOUR_ORG/nipo-school/actions/workflows/ci.yml/badge.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)

## Sobre o Projeto

**Nipo School** e uma plataforma de ensino musical que combina disciplina da pedagogia japonesa com metodologias ativas.

## Tecnologias

### Frontend
- **Next.js 16** - App Router (React 19)
- **TypeScript 5**
- **TailwindCSS 3.4**
- **React Query**
- **React Hook Form + Zod**

### Backend / Infraestrutura
- **Supabase** - Auth + PostgreSQL + Storage
- **OpenAI** - Geracao de materiais e feedback
- **Vercel** - Deploy

### Arquitetura
- Multi-tenant (`iam`, `core`, `internal`, `public`)
- RBAC com permissoes granulares
- Navegacao orientada por banco
- Server Actions com validacao
- Proxy de autenticacao (`proxy.ts`)
- Feature flags por tenant
- AI cost control (logging, quotas, rate limiting)
- Audit trail para acoes administrativas

## Quick Start

### Pre-requisitos
- Node.js 18+
- npm
- Conta Supabase

### Instalacao

```bash
git clone <repo-url>
cd nipo_school
npm install
cp .env.local.example .env.local
npm run dev
```

Acesse: `http://localhost:4000`

## Estrutura do Projeto

```
nipo_school/
|-- app/                       # Next.js App Router
|   |-- (auth)/                # Login / registro
|   |-- (protected)/           # Rotas protegidas (RBAC)
|   |-- actions/               # Server Actions
|   `-- providers/             # Context providers
|-- lib/                       # Utilitarios e integracoes
|-- lib/
|   |-- ai/                    # AI client, rate-limiter, prompts
|   |-- features/              # Feature flags
|   |-- monitoring/            # Alertas do superadmin
|   |-- cache/                 # React Query cache config
|   `-- validations/           # Zod contracts
|-- database/
|   |-- schema/                # DDL base (00-16)
|   `-- migrations/            # Migracoes incrementais (001-063)
|-- docs/                      # Documentacao
|-- __tests__/                 # Testes (Vitest, 6 arquivos, 45 testes)
|-- scripts/                   # Load tests e utilitarios
`-- proxy.ts                   # Proxy de autenticacao
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
npm run test
```

## Pilot Readiness

A plataforma esta preparada para um piloto real de 1 ano em 1 escola. Sistemas implementados:

- **CI Pipeline** — Lint + type-check + testes automatizados em push/PR
- **Data Quality** — CHECK constraints, contratos Zod, dashboard de completude
- **AI Cost Control** — Logging de tokens/custo, quotas diarias/mensais, rate limiting
- **Superadmin** — Dashboard com metricas de uso, custo IA, audit trail, alertas
- **Feature Flags** — Controle granular de modulos por tenant
- **Observabilidade** — Runbook de incidentes, load tests basicos

Checklist completo: [PILOT_READINESS.md](./PILOT_READINESS.md)

## Documentacao

- [Estado Atual da Arquitetura](./docs/arquitetura/ESTADO_ATUAL.md)
- [Rotas e Navegacao](./docs/arquitetura/ROTAS_E_NAVEGACAO.md)
- [Banco de Dados](./docs/arquitetura/BANCO_DE_DADOS.md)
- [Status Geral](./docs/implementacao/STATUS_GERAL.md)
- [Migracoes](./docs/implementacao/MIGRACOES.md)
- [Runbook de Incidentes](./docs/operations/RUNBOOK.md)

### Onboarding
- [Guia do Admin](./docs/onboarding/ADMIN_GUIDE.md)
- [Guia do Professor](./docs/onboarding/TEACHER_GUIDE.md)
- [Guia do Aluno](./docs/onboarding/STUDENT_GUIDE.md)
- [Guia da Familia](./docs/onboarding/FAMILY_GUIDE.md)

## Contato

**ADNIPO Suzano**
- Website: [niposchool.com](https://niposchool.com)
- Email: contato@niposchool.com
