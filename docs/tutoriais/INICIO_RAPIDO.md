# 🚀 GUIA DE INÍCIO RÁPIDO - NIPO SCHOOL

**Data:** 05/10/2025  
**Status:** ✅ Pronto para começar  
**Tempo estimado:** 10 minutos

---

## ✅ PRÉ-REQUISITOS VALIDADOS

- [x] Node.js 18+ instalado
- [x] npm/yarn instalado
- [x] Git configurado
- [x] VSCode instalado
- [x] Conta Supabase criada
- [x] **Banco de dados validado** (117 tabelas) ✅
- [x] **Documentação consolidada** (3190 linhas) ✅

---

## 🎯 3 COMANDOS PARA COMEÇAR

### 1️⃣ Gerar Types TypeScript (2 min)

```bash
npx supabase gen types typescript \
  --project-id SEU_PROJECT_ID \
  > src/lib/supabase/database.types.ts
```

**O que faz:**
- Conecta no Supabase
- Lê estrutura das 117 tabelas
- Gera types TypeScript automaticamente
- Habilita autocompletar no VSCode

**Resultado esperado:**
```
✅ Arquivo src/lib/supabase/database.types.ts criado
✅ ~3000 linhas de types gerados
✅ Intellisense funcionando
```

---

### 2️⃣ Testar Conexão (5 min)

```bash
# Instalar tsx
npm install -D tsx

# Executar teste
npx tsx scripts/tests/test-connection.ts
```

**O que testa:**
- ✅ Conexão com Supabase
- ✅ 10 tabelas críticas
- ✅ Contagem de registros
- ✅ Políticas RLS

**Resultado esperado:**
```
🔌 TESTE DE CONEXÃO COM SUPABASE

📊 Teste 1: Tabela profiles
✅ profiles: X registros

🏆 Teste 2: Tabela achievements
✅ achievements: X registros

📚 Teste 3: Tabela portfolios
✅ portfolios: X registros

... (mais 7 testes)

🎉 TODOS OS TESTES PASSARAM!
✅ Sucessos: 10/10
```

---

### 3️⃣ Iniciar Dev Server (1 min)

```bash
npm run dev
```

**Acessar:** http://localhost:5173

**O que deve ver:**
- ✅ Landing page carregando
- ✅ Botão de Login visível
- ✅ Sem erros no console
- ✅ Tailwind funcionando

---

## 📁 ESTRUTURA ATUAL DO PROJETO

```
nipo_school/
├── docs/
│   ├── estrutura/
│   │   └── estrutura_completo_backend.md  ⭐ DOCUMENTO PRINCIPAL
│   ├── ANALISE_DOCUMENTO_CONSOLIDADO.md
│   ├── CHECKLIST_BACKEND_VALIDADO.md
│   └── INVENTARIO_COMPLETO_VALIDADO.md
│
├── sql_scripts/
│   └── DIAGNOSTICO_COMPLETO_BANCO.sql  ⭐ COM RESULTADOS
│
├── scripts/
│   └── tests/
│       └── test-connection.ts  ⭐ TESTE DE CONEXÃO
│
├── src/
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── database.types.ts  ⏳ SERÁ GERADO
│   │
│   ├── features/  (estrutura a criar)
│   ├── components/  (estrutura a criar)
│   ├── pages/  (estrutura a criar)
│   └── main.tsx
│
├── .env.local  ⭐ CONFIGURAR
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## 🔧 CONFIGURAR .env.local

### Criar arquivo `.env.local` na raiz:

```bash
# Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui

# Ambiente
VITE_APP_ENV=development
```

### Onde encontrar as credenciais:

1. Abrir https://supabase.com
2. Selecionar seu projeto
3. Settings → API
4. Copiar:
   - Project URL → `VITE_SUPABASE_URL`
   - anon public → `VITE_SUPABASE_ANON_KEY`

---

## 📚 DOCUMENTAÇÃO DE REFERÊNCIA

### 📖 Documento Principal (3190 linhas)
**Arquivo:** `docs/estrutura/estrutura_completo_backend.md`

**Contém:**
- Stack tecnológico completo
- Estrutura de pastas definitiva
- Tipos TypeScript globais
- Design system (tokens CSS)
- Sistema de rotas
- Fluxo de autenticação
- Dashboards por role
- **Diagnóstico do banco (117 tabelas)**
- Checklist de implementação
- Comandos úteis

**Como usar:**
```bash
# Abrir no VSCode
code docs/estrutura/estrutura_completo_backend.md

# Ou no navegador (preview Markdown)
# Instalar extensão: Markdown Preview Enhanced
```

---

## ✅ CHECKLIST DE VALIDAÇÃO

### Após executar os 3 comandos:

- [ ] Types TypeScript gerados (arquivo existe)
- [ ] Teste de conexão passou (10/10)
- [ ] Dev server iniciou (porta 5173)
- [ ] Landing page carrega
- [ ] Sem erros no console
- [ ] Tailwind funcionando (estilos aplicados)

### Se tudo OK:

```
🎉 AMBIENTE 100% FUNCIONAL!
🚀 PRONTO PARA DESENVOLVER!
```

---

## 🎨 PRÓXIMOS PASSOS (Desenvolvimento)

### Sprint 1: Autenticação (3 dias)

#### Dia 1: Context e Hooks
- [ ] Criar `AuthContext.tsx`
- [ ] Criar hook `useAuth()`
- [ ] Criar `ProtectedRoute.tsx`
- [ ] Criar `SmartRedirect.tsx`

#### Dia 2: Páginas de Auth
- [ ] Criar `LoginPage.tsx`
- [ ] Criar `SignUpPage.tsx`
- [ ] Estilizar com Tailwind
- [ ] Adicionar validação (Zod)

#### Dia 3: Testes e Ajustes
- [ ] Testar login → redirecionamento
- [ ] Testar logout
- [ ] Testar rotas protegidas
- [ ] Ajustar estilos

---

### Sprint 2: Dashboard Aluno (1 semana)

#### Features:
- [ ] Métricas gerais (pontos, streak, conquistas)
- [ ] Card de conquistas recentes
- [ ] Progresso em conquistas
- [ ] Lista de portfólios
- [ ] Lista de alphas disponíveis

#### Queries Supabase:
```typescript
// Buscar profile do aluno
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()

// Buscar conquistas desbloqueadas
const { data: achievements } = await supabase
  .from('user_achievements')
  .select('*, achievements(*)')
  .eq('user_id', userId)

// Buscar portfólios
const { data: portfolios } = await supabase
  .from('portfolios')
  .select('*')
  .eq('user_id', userId)
```

---

### Sprint 3: Dashboard Professor (1 semana)

#### Features:
- [ ] Visão geral (turmas, alunos, submissões)
- [ ] Lista de turmas
- [ ] Submissões pendentes
- [ ] Calendario de aulas
- [ ] Estatísticas de presença

---

### Sprint 4: Sistema de Portfólio (1 semana)

#### Features:
- [ ] Listagem de portfólios
- [ ] Upload de evidências
- [ ] Visualização de rubricas
- [ ] Sistema de avaliação
- [ ] Feedback visual

---

## 🐛 TROUBLESHOOTING

### Erro: "Cannot find module '@supabase/supabase-js'"

```bash
npm install @supabase/supabase-js
```

---

### Erro: "VITE_SUPABASE_URL is not defined"

**Solução:**
1. Verificar se `.env.local` existe
2. Verificar se variáveis estão corretas
3. Reiniciar dev server (`Ctrl+C` e `npm run dev`)

---

### Erro: "Table not found"

**Solução:**
```bash
# Regenerar types
npx supabase gen types typescript \
  --project-id SEU_PROJECT_ID \
  > src/lib/supabase/database.types.ts
```

---

### Erro: "RLS policy violation"

**Solução:**
1. Abrir Supabase Dashboard
2. Authentication → Policies
3. Verificar se RLS está habilitado
4. Adicionar política de SELECT para authenticated users

---

## 📊 MÉTRICAS DE SUCESSO

### Após Setup Completo:

| Métrica | Valor Esperado |
|---------|----------------|
| Types gerados | ✅ ~3000 linhas |
| Testes passando | ✅ 10/10 |
| Dev server | ✅ Rodando |
| Build time | ✅ < 3s |
| Erros no console | ✅ 0 |

### Após Sprint 1 (Auth):

| Métrica | Valor Esperado |
|---------|----------------|
| Login funciona | ✅ Sim |
| Logout funciona | ✅ Sim |
| Rotas protegidas | ✅ Funcionando |
| Redirecionamento | ✅ Por role |

---

## 🎯 RESUMO EXECUTIVO

### ✅ O que você tem AGORA:

1. **Banco de dados completo** (117 tabelas validadas)
2. **Documentação consolidada** (3190 linhas)
3. **Scripts de teste** prontos
4. **Estrutura do projeto** definida
5. **Checklist completo** de implementação

### 🚀 O que fazer AGORA:

1. **Gerar types** (2 min)
2. **Testar conexão** (5 min)
3. **Iniciar dev** (1 min)
4. **Seguir Sprint 1** (Auth - 3 dias)

---

## 📞 REFERÊNCIAS RÁPIDAS

### Documentação:
- **Principal:** `docs/estrutura/estrutura_completo_backend.md`
- **Checklist:** `docs/CHECKLIST_BACKEND_VALIDADO.md`
- **Inventário:** `docs/INVENTARIO_COMPLETO_VALIDADO.md`

### Comandos:
```bash
# Dev
npm run dev

# Build
npm run build

# Types
npx supabase gen types typescript --project-id ID > src/lib/supabase/database.types.ts

# Teste
npx tsx scripts/tests/test-connection.ts
```

### Links:
- Supabase: https://supabase.com
- React Query: https://tanstack.com/query
- Tailwind: https://tailwindcss.com

---

**🎯 EXECUTE OS 3 COMANDOS E COMECE A DESENVOLVER! 🚀**

**Tempo total:** 10 minutos  
**Resultado:** Ambiente 100% funcional

**Próximo passo:** Sprint 1 - Autenticação (3 dias)
