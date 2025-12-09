# 🎯 PLANO DE VALIDAÇÃO E TESTES - NIPO SCHOOL

**Data:** 05/10/2025  
**Status:** 🚀 Pronto para validação  
**Objetivo:** Validar banco de dados e iniciar testes do frontend

---

## 📋 FASE 1: VALIDAÇÃO DO BANCO DE DADOS (30 min)

### 🔍 Passo 1: Executar Diagnóstico Completo

**Arquivo:** `sql_scripts/DIAGNOSTICO_COMPLETO_BANCO.sql`

#### No Supabase SQL Editor:

1. Abrir SQL Editor
2. Colar todo o conteúdo de `DIAGNOSTICO_COMPLETO_BANCO.sql`
3. Executar (Run)
4. Copiar todos os resultados

#### O que o script verifica:

✅ **Total de tabelas** (esperado: 68)  
✅ **Total de functions** (esperado: 50+)  
✅ **Total de políticas RLS** (esperado: 29)  
✅ **Total de views** (esperado: 2+)  
✅ **Total de índices** (esperado: 100+)

#### Tabelas críticas verificadas:

**Autenticação:**
- profiles

**Gamificação:**
- achievements
- user_achievements
- achievements_progress
- user_points_log

**Portfólio:**
- portfolios
- portfolio_evidencias
- portfolio_avaliacoes

**Alpha Desafios:**
- alpha_desafios
- alpha_submissoes
- alpha_avaliacoes

**Turmas & Aulas:**
- turmas
- matriculas
- aulas
- presencas

**Instrumentos:**
- instrumentos_musicais
- user_instruments
- emprestimos

---

### 📊 Passo 2: Analisar Resultados

#### Se TUDO OK (≥68 tabelas, ≥50 functions, ≥29 RLS):

✅ **BANCO COMPLETO!** → Prosseguir para Fase 2 (Testes Frontend)

#### Se FALTAM COMPONENTES:

⚠️ **Identificar o que falta:**

```sql
-- Ver lista completa de tabelas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

**Ações possíveis:**
1. Comparar lista com `docs/banco_de_dados_completo.md`
2. Executar scripts específicos:
   - `create_alpha_system.sql`
   - `create_portfolio_system.sql`
   - `create-gamification-tables.sql`
3. Verificar se tabelas têm nomes diferentes

---

## 🧪 FASE 2: TESTES DO FRONTEND (2 horas)

### ✅ Pré-requisitos

- [ ] Banco de dados validado (Fase 1 completa)
- [ ] `.env.local` configurado
- [ ] Dependências instaladas (`npm install`)

---

### 🎯 Teste 1: Geração de Types TypeScript (5 min)

```bash
# Gerar types do Supabase
npx supabase gen types typescript \
  --project-id SEU_PROJECT_ID \
  > src/lib/supabase/database.types.ts
```

**Resultado esperado:**
- ✅ Arquivo `database.types.ts` criado
- ✅ Sem erros de compilação
- ✅ Types para todas as 68 tabelas

**Verificação:**
```bash
# Contar tabelas nos types
grep "export type" src/lib/supabase/database.types.ts | wc -l
```

---

### 🎯 Teste 2: Conexão com Supabase (10 min)

**Criar script de teste:** `scripts/tests/test-connection.ts`

```typescript
import { supabase } from '../../src/lib/supabase/client'

async function testConnection() {
  console.log('🔌 Testando conexão com Supabase...\n')

  try {
    // Teste 1: Buscar tabelas públicas
    const { data: tables, error: tablesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(0)

    if (tablesError) {
      console.error('❌ Erro ao conectar:', tablesError.message)
      return
    }

    console.log('✅ Conexão estabelecida!')

    // Teste 2: Contar profiles
    const { count: profileCount, error: countError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('❌ Erro ao contar profiles:', countError.message)
      return
    }

    console.log(`✅ Total de profiles: ${profileCount}`)

    // Teste 3: Verificar achievements
    const { count: achievementCount } = await supabase
      .from('achievements')
      .select('*', { count: 'exact', head: true })

    console.log(`✅ Total de achievements: ${achievementCount}`)

    // Teste 4: Verificar portfolios
    const { count: portfolioCount } = await supabase
      .from('portfolios')
      .select('*', { count: 'exact', head: true })

    console.log(`✅ Total de portfolios: ${portfolioCount}`)

    // Teste 5: Verificar alpha_desafios
    const { count: desafioCount } = await supabase
      .from('alpha_desafios')
      .select('*', { count: 'exact', head: true })

    console.log(`✅ Total de alpha_desafios: ${desafioCount}`)

    console.log('\n🎉 Todos os testes passaram!')
  } catch (error) {
    console.error('❌ Erro inesperado:', error)
  }
}

testConnection()
```

**Executar:**
```bash
npx tsx scripts/tests/test-connection.ts
```

**Resultado esperado:**
```
🔌 Testando conexão com Supabase...

✅ Conexão estabelecida!
✅ Total de profiles: X
✅ Total de achievements: X
✅ Total de portfolios: X
✅ Total de alpha_desafios: X

🎉 Todos os testes passaram!
```

---

### 🎯 Teste 3: Autenticação (15 min)

**Criar usuário de teste no Supabase:**

1. Ir para Authentication → Users
2. Add user
   - Email: `teste.aluno@niposchool.com`
   - Password: `Teste123!`
   - Auto Confirm: ✅

3. Ir para SQL Editor e executar:

```sql
-- Criar profile para o usuário
INSERT INTO profiles (
  id, 
  email, 
  full_name, 
  tipo_usuario, 
  total_points,
  current_streak
)
SELECT 
  id,
  email,
  'Aluno Teste',
  'aluno',
  0,
  0
FROM auth.users
WHERE email = 'teste.aluno@niposchool.com';
```

**Testar login:**

```bash
# Iniciar dev server
npm run dev
```

Acessar: http://localhost:5173

1. Ir para `/login`
2. Login com `teste.aluno@niposchool.com` / `Teste123!`
3. ✅ Deve redirecionar para `/aluno`
4. ✅ Deve ver dashboard do aluno

---

### 🎯 Teste 4: React Query + Supabase (20 min)

**Criar hook de teste:** `src/features/alunos/hooks/useProfile.ts`

```typescript
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

export function useProfile(userId: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!userId
  })
}
```

**Criar página de teste:** `src/pages/TestPage.tsx`

```typescript
import { useAuth } from '@/contexts/AuthContext'
import { useProfile } from '@/features/alunos/hooks/useProfile'

export function TestPage() {
  const { user } = useAuth()
  const { data: profile, isLoading, error } = useProfile(user?.id || '')

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error.message}</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de Dados</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="font-bold mb-2">Perfil do Usuário</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(profile, null, 2)}
        </pre>
      </div>
    </div>
  )
}
```

**Adicionar rota em `App.tsx`:**

```typescript
<Route path="/test" element={<TestPage />} />
```

**Testar:**
1. Acessar http://localhost:5173/test
2. ✅ Deve carregar dados do usuário
3. ✅ Deve exibir JSON do profile

---

### 🎯 Teste 5: Dashboard Aluno Completo (30 min)

**Testar componentes do dashboard:**

1. **Métricas gerais:**
   - [ ] Total de pontos exibido
   - [ ] Streak atual exibido
   - [ ] Total de conquistas
   - [ ] Total de portfólios

2. **Conquistas recentes:**
   - [ ] Lista de achievements desbloqueados
   - [ ] Badges visuais

3. **Progresso de conquistas:**
   - [ ] Barra de progresso
   - [ ] Porcentagem de conclusão

4. **Portfólios pendentes:**
   - [ ] Lista de portfólios
   - [ ] Status de cada um

5. **Alpha desafios:**
   - [ ] Lista de desafios disponíveis
   - [ ] Status de submissões

---

### 🎯 Teste 6: Dashboard Professor (20 min)

**Criar usuário professor:**

```sql
-- No Supabase SQL Editor
INSERT INTO profiles (id, email, full_name, tipo_usuario)
SELECT id, email, 'Professor Teste', 'professor'
FROM auth.users
WHERE email = 'teste.professor@niposchool.com';
```

**Testar funcionalidades:**

1. **Visão geral:**
   - [ ] Total de turmas
   - [ ] Total de alunos
   - [ ] Submissões pendentes

2. **Turmas:**
   - [ ] Lista de turmas
   - [ ] Alunos por turma

3. **Avaliações pendentes:**
   - [ ] Lista de portfólios para avaliar
   - [ ] Lista de alphas para avaliar

---

## 📊 FASE 3: CHECKLIST FINAL (30 min)

### ✅ Validação Completa

#### Backend (Supabase):
- [ ] 68 tabelas criadas
- [ ] 50+ functions criadas
- [ ] 29 RLS policies ativas
- [ ] Views criadas (dashboard_aluno, dashboard_professor)
- [ ] Storage bucket configurado

#### Frontend:
- [ ] Types TypeScript gerados
- [ ] Conexão com Supabase OK
- [ ] Autenticação funcionando
- [ ] React Query funcionando
- [ ] Dashboard Aluno renderiza
- [ ] Dashboard Professor renderiza
- [ ] Rotas protegidas funcionando
- [ ] Redirecionamentos por role funcionando

#### Testes de Integração:
- [ ] Login → Redireciona corretamente
- [ ] Aluno não acessa `/professor`
- [ ] Professor não acessa `/aluno`
- [ ] Dados carregam do Supabase
- [ ] RLS funciona (usuário só vê próprios dados)

---

## 🚀 PRÓXIMOS PASSOS

### Se todos os testes passarem:

✅ **SISTEMA VALIDADO!**

**Iniciar desenvolvimento:**

1. **Sprint 1: Gamificação** (1 semana)
   - Visualização de conquistas
   - Sistema de pontos
   - Ranking

2. **Sprint 2: Portfólio** (1 semana)
   - Upload de evidências
   - Sistema de avaliação
   - Rubricas

3. **Sprint 3: Alpha Desafios** (1 semana)
   - Listagem de desafios
   - Submissão de respostas
   - Avaliação automática

4. **Sprint 4: Instrumentos** (1 semana)
   - Catálogo
   - Sistema de empréstimos
   - QR Code

---

## 🐛 TROUBLESHOOTING

### Erro: "Table not found"
**Solução:** Executar scripts SQL faltantes

### Erro: "Column does not exist"
**Solução:** Regenerar types TypeScript

### Erro: "RLS policy violation"
**Solução:** Verificar políticas RLS no Supabase

### Erro: "Connection failed"
**Solução:** Verificar `.env.local`

---

**📌 RESUMO: Validar banco → Testar conexão → Testar autenticação → Desenvolver features! 🚀**
