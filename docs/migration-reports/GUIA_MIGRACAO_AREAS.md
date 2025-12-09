# 🔄 Guia de Migração - Nova Estrutura de Áreas

## ✅ O Que Foi Criado

### 1. Estrutura de Diretórios

```
src/
├── areas/                  ✅ CRIADO
│   ├── admin/
│   │   ├── dashboard/ (page.tsx + components/)
│   │   ├── aulas/
│   │   ├── professores/
│   │   ├── alunos/
│   │   └── qr/
│   ├── professores/
│   │   ├── dashboard/ (page.tsx + components/)
│   │   ├── aulas/
│   │   └── alunos/
│   └── alunos/
│       ├── dashboard/ (page.tsx + components/)
│       ├── portfolio/
│       └── aulas/
│
├── shared/                 ✅ CRIADO
│   └── components/         ✅ COPIADO
│       ├── ui/
│       ├── layout/
│       ├── common/
│       ├── nipo/
│       └── oriental/
│
├── lib/                    ✅ CRIADO
│   ├── utils.ts           ✅ CRIADO
│   ├── constants.ts       ✅ CRIADO
│   ├── validators.ts      ✅ CRIADO
│   └── formatters.ts      ✅ CRIADO
│
├── services/               ✅ EXISTENTE
│   └── supabase/
│       └── client.ts      ✅ CRIADO
│
└── routes/                 ✅ CRIADO
    └── AreaGuard.tsx      ✅ CRIADO
```

### 2. Arquivos Criados

#### Lib (Utilities)
- ✅ `src/lib/utils.ts` - Funções utilitárias (cn, debounce, delay, etc)
- ✅ `src/lib/constants.ts` - Constantes (roles, routes, validations)
- ✅ `src/lib/validators.ts` - Validadores (email, CPF, password, etc)
- ✅ `src/lib/formatters.ts` - Formatadores (data, moeda, telefone, etc)

#### Routes
- ✅ `src/routes/AreaGuard.tsx` - Guard para proteger áreas por role

#### Pages Exemplo
- ✅ `src/areas/admin/dashboard/page.tsx` - Dashboard admin com stats
- ✅ `src/areas/professores/dashboard/page.tsx` - Dashboard professor
- ✅ `src/areas/alunos/dashboard/page.tsx` - Dashboard aluno

#### Router
- ✅ `src/app/router-new.tsx` - Novo router com estrutura de áreas

#### Documentação
- ✅ `NOVA_ESTRUTURA_AREAS.md` - Documentação da estrutura completa

## 🔄 Como Ativar a Nova Estrutura

### Passo 1: Backup do Router Atual

```bash
# Fazer backup do router antigo
cp src/app/router.tsx src/app/router-old.tsx
```

### Passo 2: Ativar Novo Router

```bash
# Renomear novo router
mv src/app/router-new.tsx src/app/router.tsx
```

**OU** editar manualmente `src/app/App.tsx`:

```tsx
// Trocar esta linha:
import { router } from './router'

// Por esta:
import { router } from './router-new'
```

### Passo 3: Testar Acessos

1. **Login como Admin** (junior.sax@gmail.com)
   - Deve redirecionar para `/admin/dashboard`
   - Não pode acessar `/professores/*` ou `/alunos/*`

2. **Login como Professor**
   - Deve redirecionar para `/professores/dashboard`
   - Não pode acessar `/admin/*` ou `/alunos/*`

3. **Login como Aluno**
   - Deve redirecionar para `/alunos/dashboard`
   - Não pode acessar `/admin/*` ou `/professores/*`

## 📋 Próximos Passos de Migração

### 1. Migrar Páginas Admin

**De:**
```
src/features/admin/pages/
  ├── AulasKanbanPage.tsx
  ├── AulasListPage.tsx
  ├── ProfessoresListPage.tsx
  └── AlunosListPage.tsx
```

**Para:**
```
src/areas/admin/
  ├── aulas/page.tsx (combinar kanban + list)
  ├── professores/page.tsx
  └── alunos/page.tsx
```

### 2. Migrar Páginas Professores

**De:**
```
src/features/professores/pages/
  ├── ConteudosPage.tsx
  ├── TurmasPage.tsx
  └── AvaliacoesPage.tsx
```

**Para:**
```
src/areas/professores/
  ├── aulas/page.tsx
  └── alunos/page.tsx
```

### 3. Migrar Páginas Alunos

**De:**
```
src/features/alunos/pages/
  ├── PortfolioListPage.tsx
  ├── MinhasAulasPage.tsx
  └── ConquistasPage.tsx
```

**Para:**
```
src/areas/alunos/
  ├── portfolio/page.tsx
  └── aulas/page.tsx
```

### 4. Atualizar Sidebar

Atualizar links no `Sidebar.tsx` para usar novos paths:

```tsx
// Admin
{ name: 'Dashboard', path: '/admin/dashboard' }
{ name: 'Aulas', path: '/admin/aulas' }
{ name: 'Professores', path: '/admin/professores' }
{ name: 'Alunos', path: '/admin/alunos' }

// Professor
{ name: 'Dashboard', path: '/professores/dashboard' }
{ name: 'Minhas Aulas', path: '/professores/aulas' }
{ name: 'Meus Alunos', path: '/professores/alunos' }

// Aluno
{ name: 'Dashboard', path: '/alunos/dashboard' }
{ name: 'Portfólio', path: '/alunos/portfolio' }
{ name: 'Minhas Aulas', path: '/alunos/aulas' }
```

## 🎯 Benefícios Imediatos

### ✅ Problema Resolvido: Role não muda mais!

**Antes:**
```
Console: Role: admin
→ Redirect para /alunos
Console: Role: aluno ❌
```

**Depois:**
```
Console: Role: admin
→ AreaGuard verifica: allowedRole=admin, currentRole=admin ✅
→ Permanece em /admin/dashboard
Console: Role: admin ✅
```

### ✅ Isolamento Completo

- Admin **NUNCA** acessa `/professores` ou `/alunos`
- Professor **NUNCA** acessa `/admin` ou `/alunos`
- Aluno **NUNCA** acessa `/admin` ou `/professores`

### ✅ Guard Simplificado

**Antes:** Guard por ROTA (múltiplos pontos de verificação)
**Depois:** Guard por ÁREA (um único ponto)

### ✅ Código Mais Limpo

- Componentes próximos ao uso
- Imports mais claros
- Menos confusão de paths

## 🚨 Checklist de Ativação

- [ ] Fazer backup do router atual
- [ ] Ativar novo router
- [ ] Testar login com admin
- [ ] Verificar que admin não acessa /professores
- [ ] Verificar que admin não acessa /alunos
- [ ] Verificar console.log do AreaGuard
- [ ] Confirmar que role não muda

## 🔍 Debug

Se algo der errado, verificar:

1. **Console do navegador**
   ```
   🛡️ AreaGuard: { allowedRole, currentRole, hasUser, loading }
   ```

2. **Role do usuário**
   ```sql
   SELECT email, tipo_usuario FROM profiles WHERE email = 'junior.sax@gmail.com';
   ```

3. **AuthContext**
   - `profile?.tipo_usuario` deve ser 'admin', 'professor' ou 'aluno'
   - Não deve mudar durante navegação

## 📞 Suporte

Se precisar voltar para estrutura antiga:

```bash
# Restaurar router antigo
mv src/app/router-old.tsx src/app/router.tsx
```

## ✅ Status Final

- ✅ Estrutura criada
- ✅ AreaGuard implementado
- ✅ Pages exemplo criadas
- ✅ Router novo pronto
- ⏳ **Aguardando ativação para testes**
