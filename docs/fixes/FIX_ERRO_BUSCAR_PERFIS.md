# 🔧 Solução para Erro "Erro ao buscar perfis: {}"

## Problema Identificado

O erro `Erro ao buscar perfis: {}` indica que a tabela `profiles` não existe ou o RLS (Row Level Security) está bloqueando o acesso.

---

## ✅ Soluções Implementadas

### 1. **Melhor Tratamento de Erros**
✅ Adicionado logs detalhados em `getProfiles()`  
✅ Adicionado try-catch em `getAdminStats()`  
✅ Página de alunos agora mostra erro amigável se falhar  

### 2. **Script SQL de Correção**
Criado: `sql_scripts/FIX_PROFILES_TABLE.sql`

Este script:
- Verifica se a tabela `profiles` existe
- Cria a tabela se não existir
- Configura RLS (Row Level Security)
- Cria triggers automáticos
- Adiciona políticas de acesso

### 3. **Página de Erro Informativa**
A página `/admin/alunos` agora mostra:
- Mensagem clara do problema
- Checklist de verificação
- Link para diagnóstico
- Detalhes técnicos do erro

---

## 🚀 Como Resolver

### Opção 1: Executar SQL no Supabase (RECOMENDADO)

1. Acesse seu projeto Supabase: https://app.supabase.com
2. Vá em **SQL Editor** (no menu lateral)
3. Clique em **+ New Query**
4. Cole o conteúdo do arquivo `sql_scripts/FIX_PROFILES_TABLE.sql`
5. Clique em **Run** (ou pressione Ctrl+Enter)
6. Verifique os logs/mensagens de sucesso

### Opção 2: Verificar Manualmente

Execute estes comandos SQL um por um:

```sql
-- 1. Verificar se a tabela existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'profiles';

-- 2. Se existir, verificar estrutura
\d profiles

-- 3. Se existir, verificar RLS
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles';

-- 4. Verificar políticas RLS
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- 5. Testar contagem
SELECT COUNT(*) FROM profiles;
```

---

## 📋 Checklist de Verificação

Execute este checklist para diagnosticar o problema:

- [ ] **Variáveis de ambiente configuradas?**
  - Verificar `.env.local` tem `NEXT_PUBLIC_SUPABASE_URL`
  - Verificar `.env.local` tem `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- [ ] **Tabela profiles existe?**
  - Ir no Supabase → Table Editor
  - Procurar tabela `profiles`

- [ ] **RLS está configurado corretamente?**
  - Ir no Supabase → Authentication → Policies
  - Verificar políticas da tabela `profiles`

- [ ] **Há usuários cadastrados?**
  - Ir no Supabase → Authentication → Users
  - Verificar se há usuários

- [ ] **Perfis estão sendo criados automaticamente?**
  - Criar um novo usuário de teste
  - Verificar se aparece em `profiles`

---

## 🔍 Diagnóstico Detalhado

### Verificar Logs do Console

Após as correções, ao acessar `/admin/alunos`, você verá logs como:

```
✅ Perfis encontrados (aluno): 5
📊 Stats carregadas: { totalAlunos: 5, ... }
```

Ou, se houver erro:

```
❌ Erro ao buscar alunos: { message: '...', code: '...' }
```

### Códigos de Erro Comuns

| Código | Significado | Solução |
|--------|-------------|---------|
| `42P01` | Tabela não existe | Executar `FIX_PROFILES_TABLE.sql` |
| `42501` | Permissão negada (RLS) | Verificar políticas RLS |
| `PGRST116` | Nenhum dado encontrado | Criar usuários/perfis |
| `{}` (vazio) | Erro de conexão | Verificar env vars |

---

## 🎯 Ações Imediatas

### 1. Execute o SQL de Correção
```bash
# Copie o arquivo FIX_PROFILES_TABLE.sql
# Cole no SQL Editor do Supabase
# Execute (Ctrl+Enter)
```

### 2. Reinicie o Dev Server
```bash
# Pare o servidor (Ctrl+C)
npm run dev
```

### 3. Teste Novamente
```
http://localhost:3000/admin/alunos
```

### 4. Verifique os Logs
Abra o **Console do Navegador** (F12) e veja:
- ✅ Logs de sucesso verdes
- ❌ Erros detalhados se houver

---

## 📊 Estrutura Esperada da Tabela

```sql
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY,              -- FK para auth.users
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT,                        -- 'admin', 'professor', 'aluno'
    matricula TEXT UNIQUE,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

---

## 🔐 Políticas RLS Necessárias

### 1. Leitura para Autenticados
```sql
CREATE POLICY "Usuários autenticados podem ler profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (true);
```

### 2. Atualização do Próprio Perfil
```sql
CREATE POLICY "Usuários podem atualizar próprio perfil"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);
```

### 3. Admins Gerenciam Tudo
```sql
CREATE POLICY "Admins podem gerenciar todos os profiles"
ON public.profiles FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);
```

---

## 🆘 Se Ainda Não Funcionar

### 1. Verificar Conexão com Supabase

Crie um teste rápido:

```typescript
// test-connection.ts
import { createClient } from '@/lib/supabase/server';

export async function testConnection() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .single();
    
    console.log('Teste de conexão:', { data, error });
}
```

### 2. Acessar Página de Diagnóstico

```
http://localhost:3000/admin/diagnostico
```

Esta página testa automaticamente todas as conexões.

### 3. Criar Perfil Manualmente

Se a tabela existe mas está vazia:

```sql
-- Inserir perfil admin de teste
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
    id,
    email,
    email,
    'admin'
FROM auth.users
LIMIT 1;
```

---

## 📞 Suporte

Se o problema persistir:

1. **Copie os logs completos** do console
2. **Tire um print** da página de erro
3. **Verifique** o SQL Editor do Supabase
4. **Compartilhe** os detalhes técnicos

---

## ✅ Sucesso!

Após executar as correções, você deve ver:

- ✅ Dashboard carregando normalmente
- ✅ Lista de alunos exibindo (mesmo que vazia)
- ✅ Stats mostrando números corretos
- ✅ Sem erros no console

**Pronto para usar!** 🚀
