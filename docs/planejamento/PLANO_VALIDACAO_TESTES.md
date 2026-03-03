# Plano de Validacao de Testes (Historico)

**Status:** historico

Este documento contem exemplos antigos e nao e fonte de verdade da arquitetura atual.

Fonte de verdade atual: docs/implementacao/STATUS_GERAL.md, docs/arquitetura/ESTADO_ATUAL.md.

---

# ðŸŽ¯ PLANO DE VALIDAÃ‡ÃƒO E TESTES - NIPO SCHOOL

**Data:** 05/10/2025  
**Status:** ðŸš€ Pronto para validaÃ§Ã£o  
**Objetivo:** Validar banco de dados e iniciar testes do frontend

---

## ðŸ“‹ FASE 1: VALIDAÃ‡ÃƒO DO BANCO DE DADOS (30 min)

### ðŸ” Passo 1: Executar DiagnÃ³stico Completo

**Arquivo:** `sql_scripts/DIAGNOSTICO_COMPLETO_BANCO.sql`

#### No Supabase SQL Editor:

1. Abrir SQL Editor
2. Colar todo o conteÃºdo de `DIAGNOSTICO_COMPLETO_BANCO.sql`
3. Executar (Run)
4. Copiar todos os resultados

#### O que o script verifica:

âœ… **Total de tabelas** (esperado: 68)  
âœ… **Total de functions** (esperado: 50+)  
âœ… **Total de polÃ­ticas RLS** (esperado: 29)  
âœ… **Total de views** (esperado: 2+)  
âœ… **Total de Ã­ndices** (esperado: 100+)

#### Tabelas crÃ­ticas verificadas:

**AutenticaÃ§Ã£o:**
- profiles

**GamificaÃ§Ã£o:**
- achievements
- user_achievements
- achievements_progress
- user_points_log

**PortfÃ³lio:**
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

### ðŸ“Š Passo 2: Analisar Resultados

#### Se TUDO OK (â‰¥68 tabelas, â‰¥50 functions, â‰¥29 RLS):

âœ… **BANCO COMPLETO!** â†’ Prosseguir para Fase 2 (Testes Frontend)

#### Se FALTAM COMPONENTES:

âš ï¸ **Identificar o que falta:**

```sql
-- Ver lista completa de tabelas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

**AÃ§Ãµes possÃ­veis:**
1. Comparar lista com `docs/banco_de_dados_completo.md`
2. Executar scripts especÃ­ficos:
   - `create_alpha_system.sql`
   - `create_portfolio_system.sql`
   - `create-gamification-tables.sql`
3. Verificar se tabelas tÃªm nomes diferentes

---

## ðŸ§ª FASE 2: TESTES DO FRONTEND (2 horas)

### âœ… PrÃ©-requisitos

- [ ] Banco de dados validado (Fase 1 completa)
- [ ] `.env.local` configurado
- [ ] DependÃªncias instaladas (`npm install`)

---

### ðŸŽ¯ Teste 1: GeraÃ§Ã£o de Types TypeScript (5 min)

```bash
# Gerar types do Supabase
npx supabase gen types typescript \
  --project-id SEU_PROJECT_ID \
  > src/lib/supabase/database.types.ts
```

**Resultado esperado:**
- âœ… Arquivo `database.types.ts` criado
- âœ… Sem erros de compilaÃ§Ã£o
- âœ… Types para todas as 68 tabelas

**VerificaÃ§Ã£o:**
```bash
# Contar tabelas nos types
grep "export type" src/lib/supabase/database.types.ts | wc -l
```

---

### ðŸŽ¯ Teste 2: ConexÃ£o com Supabase (10 min)

**Criar script de teste:** `scripts/tests/test-connection.ts`

```typescript
import { supabase } from '../../src/lib/supabase/client'

async function testConnection() {
  console.log('ðŸ”Œ Testando conexÃ£o com Supabase...\n')

  try {
    // Teste 1: Buscar tabelas pÃºblicas
    const { data: tables, error: tablesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(0)

    if (tablesError) {
      console.error('âŒ Erro ao conectar:', tablesError.message)
      return
    }

    console.log('âœ… ConexÃ£o estabelecida!')

    // Teste 2: Contar profiles
    const { count: profileCount, error: countError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('âŒ Erro ao contar profiles:', countError.message)
      return
    }

    console.log(`âœ… Total de profiles: ${profileCount}`)

    // Teste 3: Verificar achievements
    const { count: achievementCount } = await supabase
      .from('achievements')
      .select('*', { count: 'exact', head: true })

    console.log(`âœ… Total de achievements: ${achievementCount}`)

    // Teste 4: Verificar portfolios
    const { count: portfolioCount } = await supabase
      .from('portfolios')
      .select('*', { count: 'exact', head: true })

    console.log(`âœ… Total de portfolios: ${portfolioCount}`)

    // Teste 5: Verificar alpha_desafios
    const { count: desafioCount } = await supabase
      .from('alpha_desafios')
      .select('*', { count: 'exact', head: true })

    console.log(`âœ… Total de alpha_desafios: ${desafioCount}`)

    console.log('\nðŸŽ‰ Todos os testes passaram!')
  } catch (error) {
    console.error('âŒ Erro inesperado:', error)
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
ðŸ”Œ Testando conexÃ£o com Supabase...

âœ… ConexÃ£o estabelecida!
âœ… Total de profiles: X
âœ… Total de achievements: X
âœ… Total de portfolios: X
âœ… Total de alpha_desafios: X

ðŸŽ‰ Todos os testes passaram!
```

---

### ðŸŽ¯ Teste 3: AutenticaÃ§Ã£o (15 min)

**Criar usuÃ¡rio de teste no Supabase:**

1. Ir para Authentication â†’ Users
2. Add user
   - Email: `teste.aluno@niposchool.com`
   - Password: `Teste123!`
   - Auto Confirm: âœ…

3. Ir para SQL Editor e executar:

```sql
-- Criar profile para o usuÃ¡rio
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
3. âœ… Deve redirecionar para `/aluno`
4. âœ… Deve ver dashboard do aluno

---

### ðŸŽ¯ Teste 4: React Query + Supabase (20 min)

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

**Criar pÃ¡gina de teste:** `src/pages/TestPage.tsx`

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
        <h2 className="font-bold mb-2">Perfil do UsuÃ¡rio</h2>
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
2. âœ… Deve carregar dados do usuÃ¡rio
3. âœ… Deve exibir JSON do profile

---

### ðŸŽ¯ Teste 5: Dashboard Aluno Completo (30 min)

**Testar componentes do dashboard:**

1. **MÃ©tricas gerais:**
   - [ ] Total de pontos exibido
   - [ ] Streak atual exibido
   - [ ] Total de conquistas
   - [ ] Total de portfÃ³lios

2. **Conquistas recentes:**
   - [ ] Lista de achievements desbloqueados
   - [ ] Badges visuais

3. **Progresso de conquistas:**
   - [ ] Barra de progresso
   - [ ] Porcentagem de conclusÃ£o

4. **PortfÃ³lios pendentes:**
   - [ ] Lista de portfÃ³lios
   - [ ] Status de cada um

5. **Alpha desafios:**
   - [ ] Lista de desafios disponÃ­veis
   - [ ] Status de submissÃµes

---

### ðŸŽ¯ Teste 6: Dashboard Professor (20 min)

**Criar usuÃ¡rio professor:**

```sql
-- No Supabase SQL Editor
INSERT INTO profiles (id, email, full_name, tipo_usuario)
SELECT id, email, 'Professor Teste', 'professor'
FROM auth.users
WHERE email = 'teste.professor@niposchool.com';
```

**Testar funcionalidades:**

1. **VisÃ£o geral:**
   - [ ] Total de turmas
   - [ ] Total de alunos
   - [ ] SubmissÃµes pendentes

2. **Turmas:**
   - [ ] Lista de turmas
   - [ ] Alunos por turma

3. **AvaliaÃ§Ãµes pendentes:**
   - [ ] Lista de portfÃ³lios para avaliar
   - [ ] Lista de alphas para avaliar

---

## ðŸ“Š FASE 3: CHECKLIST FINAL (30 min)

### âœ… ValidaÃ§Ã£o Completa

#### Backend (Supabase):
- [ ] 68 tabelas criadas
- [ ] 50+ functions criadas
- [ ] 29 RLS policies ativas
- [ ] Views criadas (dashboard_aluno, dashboard_professor)
- [ ] Storage bucket configurado

#### Frontend:
- [ ] Types TypeScript gerados
- [ ] ConexÃ£o com Supabase OK
- [ ] AutenticaÃ§Ã£o funcionando
- [ ] React Query funcionando
- [ ] Dashboard Aluno renderiza
- [ ] Dashboard Professor renderiza
- [ ] Rotas protegidas funcionando
- [ ] Redirecionamentos por role funcionando

#### Testes de IntegraÃ§Ã£o:
- [ ] Login â†’ Redireciona corretamente
- [ ] Aluno nÃ£o acessa `/professor`
- [ ] Professor nÃ£o acessa `/aluno`
- [ ] Dados carregam do Supabase
- [ ] RLS funciona (usuÃ¡rio sÃ³ vÃª prÃ³prios dados)

---

## ðŸš€ PRÃ“XIMOS PASSOS

### Se todos os testes passarem:

âœ… **SISTEMA VALIDADO!**

**Iniciar desenvolvimento:**

1. **Sprint 1: GamificaÃ§Ã£o** (1 semana)
   - VisualizaÃ§Ã£o de conquistas
   - Sistema de pontos
   - Ranking

2. **Sprint 2: PortfÃ³lio** (1 semana)
   - Upload de evidÃªncias
   - Sistema de avaliaÃ§Ã£o
   - Rubricas

3. **Sprint 3: Alpha Desafios** (1 semana)
   - Listagem de desafios
   - SubmissÃ£o de respostas
   - AvaliaÃ§Ã£o automÃ¡tica

4. **Sprint 4: Instrumentos** (1 semana)
   - CatÃ¡logo
   - Sistema de emprÃ©stimos
   - QR Code

---

## ðŸ› TROUBLESHOOTING

### Erro: "Table not found"
**SoluÃ§Ã£o:** Executar scripts SQL faltantes

### Erro: "Column does not exist"
**SoluÃ§Ã£o:** Regenerar types TypeScript

### Erro: "RLS policy violation"
**SoluÃ§Ã£o:** Verificar polÃ­ticas RLS no Supabase

### Erro: "Connection failed"
**SoluÃ§Ã£o:** Verificar `.env.local`

---

**ðŸ“Œ RESUMO: Validar banco â†’ Testar conexÃ£o â†’ Testar autenticaÃ§Ã£o â†’ Desenvolver features! ðŸš€**

