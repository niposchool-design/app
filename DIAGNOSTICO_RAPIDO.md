# 🔍 Diagnóstico Rápido - Erro Profiles

## Execute este teste AGORA:

### 1. Pare o servidor Next.js (Ctrl+C no terminal)

### 2. Execute o script de teste:

```bash
npx tsx scripts/test-supabase-connection.ts
```

**Este script vai mostrar:**
- ✅ Se a conexão com Supabase funciona
- ✅ Quais tabelas existem
- ✅ Se `profiles` está acessível
- ❌ Erros específicos com códigos

---

## Enquanto isso, verifique no Supabase:

### Opção A: Via Dashboard (MAIS RÁPIDO)

1. Acesse https://app.supabase.com
2. Selecione seu projeto: `eehidnwlwrzqzgytbfsd`
3. Vá em **Table Editor** (menu lateral)
4. Procure a tabela `profiles`

**Se NÃO aparecer:**
- Execute o SQL: `sql_scripts/FIX_PROFILES_TABLE.sql`

**Se aparecer:**
- Clique na tabela
- Veja se tem dados
- Vá em "⚙️ Settings" da tabela → "Policies"
- Verifique se RLS está habilitado

### Opção B: Via SQL Editor

Execute este SQL:

```sql
-- Ver todas as tabelas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Ver estrutura da tabela profiles
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles';

-- Contar registros
SELECT COUNT(*) as total FROM profiles;

-- Ver RLS
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles';
```

---

## Possíveis Causas do Erro `{}`

### 1. Tabela não existe
**Sintoma:** Erro vazio ou `relation "profiles" does not exist`  
**Solução:** Executar `FIX_PROFILES_TABLE.sql`

### 2. RLS bloqueando tudo
**Sintoma:** Erro vazio ou `permission denied`  
**Solução:** Adicionar política:
```sql
CREATE POLICY "Allow all for authenticated users"
ON profiles FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

### 3. Schema errado
**Sintoma:** Tabela existe mas não é encontrada  
**Solução:** Especificar schema:
```typescript
supabase.from('public.profiles') // ❌ Não funciona no JS
supabase.schema('public').from('profiles') // ✅ Correto
```

### 4. Problema nos tipos
**Sintoma:** TypeScript compila mas runtime falha  
**Solução:** Remover tipagem temporariamente para testar

---

## Teste Manual Rápido

Abra o console do navegador (F12) e execute:

```javascript
// Na página do seu app
const { createClient } = await import('@supabase/supabase-js');

const supabase = createClient(
  'https://eehidnwlwrzqzgytbfsd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlaGlkbndsd3J6cXpneXRiZnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMzA1MjQsImV4cCI6MjA2MzgwNjUyNH0.SawTk_G0H8CYFEQ7h62Wsv35uNqZz0Q5rsLNT5wCcUM'
);

const { data, error } = await supabase.from('profiles').select('*').limit(1);
console.log('Teste direto:', { data, error });
```

---

## Depois de executar o teste, me informe:

1. **O que o script mostrou?**
   - Tabelas encontradas
   - Erros específicos
   - Códigos de erro

2. **A tabela profiles existe no Supabase?**
   - Sim/Não
   - Tem dados? Quantos?

3. **RLS está habilitado?**
   - Sim/Não
   - Quais políticas existem?

Com essas informações, posso dar a solução exata! 🎯
