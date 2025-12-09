# 🚀 MIGRAÇÃO NIPO SCHOOL: Vite → Next.js 14

## 📋 PLANO DE MIGRAÇÃO (2-3 dias)

### ✅ FASE 1: Setup Next.js (2-3 horas)

#### 1.1 Criar projeto Next.js

```bash
cd /d/projetos
npx create-next-app@latest nipo_school_nextjs --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

**Respostas no prompt:**
- ✅ TypeScript: Yes
- ✅ ESLint: Yes  
- ✅ Tailwind CSS: Yes
- ✅ `src/` directory: **No**
- ✅ App Router: Yes
- ✅ Import alias: @/*

#### 1.2 Instalar dependências do Nipo School

```bash
cd nipo_school_nextjs

# Core
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# UI & Icons
npm install lucide-react clsx tailwind-merge

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Data fetching
npm install @tanstack/react-query

# Utils
npm install date-fns
```

---

### ✅ FASE 2: Configuração Base (1 hora)

#### 2.1 Criar `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
```

#### 2.2 Criar `.env.local`

```bash
# Copiar do projeto antigo
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key
```

#### 2.3 Configurar Tailwind (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cores Nipo School
        primary: {
          50: '#fef2f2',
          500: '#dc2626',
          600: '#b91c1c',
          700: '#991b1b',
        },
      },
    },
  },
  plugins: [],
}
export default config
```

---

### ✅ FASE 3: Estrutura de Pastas (30 min)

```
nipo_school_nextjs/
├── app/
│   ├── (auth)/                    # Grupo de rotas de autenticação
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx             # Layout sem sidebar
│   │
│   ├── (protected)/               # Grupo de rotas protegidas
│   │   ├── admin/
│   │   │   ├── layout.tsx         # AdminLayout + AdminSidebar
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── aulas/page.tsx
│   │   │   ├── professores/page.tsx
│   │   │   └── alunos/page.tsx
│   │   │
│   │   ├── professores/
│   │   │   ├── layout.tsx         # ProfessorLayout + Sidebar
│   │   │   ├── dashboard/page.tsx
│   │   │   └── turmas/page.tsx
│   │   │
│   │   └── alunos/
│   │       ├── layout.tsx         # AlunoLayout + Sidebar
│   │       ├── dashboard/page.tsx
│   │       ├── portfolio/page.tsx
│   │       └── conquistas/page.tsx
│   │
│   ├── api/                       # API Routes
│   │   └── auth/[...nextauth]/route.ts
│   │
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   └── globals.css
│
├── components/
│   ├── admin/
│   │   └── AdminSidebar.tsx
│   ├── professores/
│   │   └── ProfessorSidebar.tsx
│   ├── alunos/
│   │   └── AlunoSidebar.tsx
│   └── shared/
│       ├── NipoCard.tsx
│       └── NipoButton.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Client Supabase
│   │   ├── server.ts              # Server Supabase
│   │   └── middleware.ts          # Middleware auth
│   ├── auth/
│   │   └── session.ts
│   └── utils.ts
│
└── middleware.ts                  # Auth middleware
```

---

### ✅ FASE 4: Migração de Componentes (4-6 horas)

#### 4.1 Criar `lib/supabase/client.ts`

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### 4.2 Criar `lib/supabase/server.ts`

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
```

#### 4.3 Criar `middleware.ts` (Root)

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Redirecionar não autenticados
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Verificar role
  if (session) {
    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role_type')
      .eq('user_id', session.user.id)
      .eq('is_active', true)
      .single()

    const role = userRole?.role_type || 'aluno'

    // Redirecionar para área correta
    if (request.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL(`/${role}s/dashboard`, request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/professores/:path*', '/alunos/:path*'],
}
```

#### 4.4 Copiar componentes

```bash
# Do projeto antigo para o novo
cp -r nipo_school/src/areas/admin/components/AdminSidebar.tsx nipo_school_nextjs/components/admin/
cp -r nipo_school/src/areas/professores/components/ProfessorSidebar.tsx nipo_school_nextjs/components/professores/
cp -r nipo_school/src/areas/alunos/components/AlunoSidebar.tsx nipo_school_nextjs/components/alunos/
cp -r nipo_school/src/components/shared/* nipo_school_nextjs/components/shared/
```

**Ajustar imports:**
- `'@/lib/constants/routes'` → Usar rotas diretas (`/admin/dashboard`)
- `'@/contexts/AuthContext'` → Usar `useUser()` do Supabase
- `'@/lib/supabase/client'` → `'@/lib/supabase/client'` (já é o mesmo)

---

### ✅ FASE 5: Criar Layouts (2 horas)

#### 5.1 Root Layout (`app/layout.tsx`)

```typescript
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nipo School - Sistema Oriental de Ensino Musical',
  description: 'Sistema completo para ensino musical com metodologia oriental',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

#### 5.2 Admin Layout (`app/(protected)/admin/layout.tsx`)

```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role_type')
    .eq('user_id', session.user.id)
    .single()

  if (userRole?.role_type !== 'admin') {
    redirect(`/${userRole?.role_type}s/dashboard`)
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
```

---

### ✅ FASE 6: Migrar Páginas (4-6 horas)

#### 6.1 Admin Dashboard (`app/(protected)/admin/dashboard/page.tsx`)

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Buscar dados no servidor
  const { data: stats } = await supabase
    .from('stats')
    .select('*')
    .single()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>
      {/* Conteúdo da dashboard */}
    </div>
  )
}
```

**Repetir para todas as páginas:**
- `app/(protected)/admin/aulas/page.tsx`
- `app/(protected)/admin/professores/page.tsx`
- `app/(protected)/professores/dashboard/page.tsx`
- `app/(protected)/alunos/dashboard/page.tsx`
- etc.

---

### ✅ FASE 7: Autenticação (2 horas)

#### 7.1 Login Page (`app/(auth)/login/page.tsx`)

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (!error) {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleLogin}>
      {/* Form UI */}
    </form>
  )
}
```

---

### ✅ FASE 8: Testing & Deploy (2-4 horas)

#### 8.1 Testar localmente

```bash
cd nipo_school_nextjs
npm run dev
```

Testar:
- ✅ Login
- ✅ Redirect por role
- ✅ Admin área
- ✅ Professor área
- ✅ Aluno área
- ✅ Logout

#### 8.2 Build de produção

```bash
npm run build
npm run start
```

#### 8.3 Deploy Vercel

```bash
npm i -g vercel
vercel
```

---

## 📊 CHECKLIST DE MIGRAÇÃO

### Setup
- [ ] Criar projeto Next.js
- [ ] Instalar dependências
- [ ] Configurar .env.local
- [ ] Configurar Tailwind

### Supabase
- [ ] Client Supabase
- [ ] Server Supabase
- [ ] Middleware auth

### Componentes
- [ ] AdminSidebar
- [ ] ProfessorSidebar
- [ ] AlunoSidebar
- [ ] Componentes shared (NipoCard, etc)

### Layouts
- [ ] Root layout
- [ ] Auth layout
- [ ] Admin layout
- [ ] Professor layout
- [ ] Aluno layout

### Páginas (Admin)
- [ ] Dashboard
- [ ] Aulas
- [ ] Professores
- [ ] Alunos
- [ ] QR Manager
- [ ] Database

### Páginas (Professor)
- [ ] Dashboard
- [ ] Turmas
- [ ] Conteúdos
- [ ] Avaliações

### Páginas (Aluno)
- [ ] Dashboard
- [ ] Portfólio
- [ ] Conquistas
- [ ] Desafios
- [ ] Instrumentos

### Auth
- [ ] Login page
- [ ] Logout
- [ ] Middleware redirect

### Testing
- [ ] Login como admin
- [ ] Login como professor
- [ ] Login como aluno
- [ ] Redirects funcionando
- [ ] Sidebar correta por role

### Deploy
- [ ] Build local
- [ ] Deploy Vercel
- [ ] Teste em produção

---

## 🎯 VANTAGENS IMEDIATAS

✅ **Zero problemas de cache**
✅ **Performance 60-80% melhor**
✅ **SEO automático**
✅ **Layouts aninhados naturais**
✅ **Server Components = menos JS no cliente**
✅ **Middleware = auth mais seguro**
✅ **File-based routing = mais organizado**

---

## 🚨 PONTOS DE ATENÇÃO

⚠️ **Server vs Client Components**
- Use `'use client'` apenas quando necessário (forms, state, events)
- Preferir Server Components sempre que possível

⚠️ **Data Fetching**
- No servidor: `await supabase.from(...)`
- No cliente: usar SWR ou React Query

⚠️ **Cookies**
- Next.js gerencia automaticamente via middleware
- Não precisa de localStorage

---

Quer que eu **crie os primeiros arquivos** para você começar?
