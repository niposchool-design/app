# 🏗️ Nova Estrutura de Áreas - Nipo School

## 📁 Estrutura Completa

```
src/
├── areas/                          # Áreas isoladas por role
│   ├── admin/                      # Área administrativa
│   │   ├── dashboard/
│   │   │   ├── page.tsx           # Página principal do dashboard admin
│   │   │   └── components/        # Componentes específicos do dashboard admin
│   │   ├── aulas/
│   │   │   ├── page.tsx           # Gerenciamento de aulas
│   │   │   └── components/        # Componentes de gestão de aulas
│   │   ├── professores/
│   │   │   ├── page.tsx           # Gerenciamento de professores
│   │   │   └── components/        # Componentes de gestão de professores
│   │   ├── alunos/
│   │   │   ├── page.tsx           # Gerenciamento de alunos
│   │   │   └── components/        # Componentes de gestão de alunos
│   │   └── qr/
│   │       ├── page.tsx           # Sistema de QR Code
│   │       └── components/        # Componentes de QR
│   │
│   ├── professores/                # Área dos professores
│   │   ├── dashboard/
│   │   │   ├── page.tsx           # Dashboard do professor
│   │   │   └── components/        # Componentes do dashboard
│   │   ├── aulas/
│   │   │   ├── page.tsx           # Minhas aulas
│   │   │   └── components/        # Componentes de aulas
│   │   └── alunos/
│   │       ├── page.tsx           # Meus alunos
│   │       └── components/        # Componentes de alunos
│   │
│   └── alunos/                     # Área dos alunos
│       ├── dashboard/
│       │   ├── page.tsx           # Dashboard do aluno
│       │   └── components/        # Componentes do dashboard
│       ├── portfolio/
│       │   ├── page.tsx           # Portfólio do aluno
│       │   └── components/        # Componentes de portfólio
│       └── aulas/
│           ├── page.tsx           # Minhas aulas
│           └── components/        # Componentes de aulas
│
├── shared/                         # Código compartilhado
│   └── components/                 # Componentes reutilizáveis
│       ├── ui/                    # Componentes de UI básicos
│       │   ├── Button.tsx
│       │   ├── Card.tsx
│       │   ├── Modal.tsx
│       │   └── ...
│       ├── layout/                # Componentes de layout
│       │   ├── Header.tsx
│       │   ├── Sidebar.tsx
│       │   ├── Footer.tsx
│       │   └── ...
│       └── common/                # Componentes comuns
│           ├── Loading.tsx
│           ├── ErrorBoundary.tsx
│           └── ...
│
├── lib/                           # Utilities e helpers
│   ├── utils.ts                   # Funções utilitárias
│   ├── constants.ts               # Constantes da aplicação
│   ├── validators.ts              # Validadores
│   └── formatters.ts              # Formatadores
│
├── services/                      # Lógica de negócio e API
│   ├── auth/                      # Serviços de autenticação
│   │   ├── authService.ts
│   │   └── sessionService.ts
│   ├── api/                       # Chamadas de API
│   │   ├── alunosApi.ts
│   │   ├── professoresApi.ts
│   │   ├── aulasApi.ts
│   │   └── ...
│   └── supabase/                  # Cliente Supabase
│       ├── client.ts
│       └── queries.ts
│
├── context/                       # Contextos React
│   └── AuthContext.tsx
│
└── routes/                        # Configuração de rotas
    ├── AreaGuard.tsx             # Guard para proteger áreas
    └── RoleBasedRedirect.tsx     # Redirect baseado em role
```

## 🎯 Princípios da Organização

### 1. **Isolamento por Área**
- Cada role tem sua própria área isolada
- Impossível acessar área de outro role acidentalmente
- Auth guard no nível de área (não por rota)

### 2. **Módulos Granulares**
- Cada funcionalidade é um módulo com `page.tsx`
- Componentes específicos do módulo em `components/`
- Componentes próximos ao código que os usa

### 3. **Componentes Compartilhados**
- `src/shared/components/` para componentes reutilizáveis
- Organizados por categoria (ui, layout, common)
- Evita duplicação de código

### 4. **Separação de Responsabilidades**
- **lib/**: Funções puras, utilities, helpers
- **services/**: Lógica de negócio, API calls, Supabase
- **context/**: Estado global da aplicação

## 🔒 Sistema de Guards

### AreaGuard
```tsx
// Protege área inteira, não rotas individuais
<Route path="/admin/*" element={<AreaGuard allowedRole="admin" />}>
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="aulas" element={<AdminAulas />} />
  // ...
</Route>
```

### Benefícios
- ✅ Um único ponto de validação por área
- ✅ Impossível acessar rota errada
- ✅ Role não muda durante navegação
- ✅ Código mais limpo e seguro

## 📦 Padrão de Import

```tsx
// Componentes compartilhados
import { Button } from '@/shared/components/ui/Button'
import { Sidebar } from '@/shared/components/layout/Sidebar'

// Services
import { alunosApi } from '@/services/api/alunosApi'
import { authService } from '@/services/auth/authService'

// Lib
import { formatDate } from '@/lib/formatters'
import { validateEmail } from '@/lib/validators'

// Componentes locais do módulo
import { DashboardCard } from './components/DashboardCard'
import { StatisticsChart } from './components/StatisticsChart'
```

## 🚀 Vantagens da Nova Estrutura

1. **Segurança**: Isolamento completo entre roles
2. **Manutenibilidade**: Código organizado e fácil de encontrar
3. **Escalabilidade**: Fácil adicionar novos módulos
4. **Reusabilidade**: Componentes compartilhados centralizados
5. **Clareza**: Estrutura intuitiva tipo Next.js
6. **Performance**: Imports mais precisos

## 🔄 Próximos Passos

1. ✅ Criar estrutura de diretórios
2. 🔄 Mover componentes compartilhados para `shared/`
3. ⏳ Migrar páginas atuais para nova estrutura
4. ⏳ Criar AreaGuard
5. ⏳ Atualizar router
6. ⏳ Testar isolamento de roles
