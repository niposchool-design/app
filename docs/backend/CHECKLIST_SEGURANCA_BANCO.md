# ✅ CHECKLIST DE SEGURANÇA DO BANCO DE DADOS

## 📋 TABELA PROFILES

### RLS (Row Level Security)
- [ ] **RLS Habilitado** - `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;`

### Políticas Essenciais
- [ ] **select_own_profile** - Usuários leem apenas próprio perfil
  ```sql
  USING (auth.uid() = id)
  ```
- [ ] **update_own_profile** - Usuários atualizam apenas próprio perfil
  ```sql
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id)
  ```
- [ ] **insert_own_profile** - Permitir criação após signup
  ```sql
  WITH CHECK (auth.uid() = id)
  ```

### O que NÃO deve ter
- ❌ Política com `USING (true)` - Permite acesso a TUDO
- ❌ Política para role `public` - Permite acesso sem login
- ❌ Políticas duplicadas ou conflitantes

---

## 📋 TABELA ACHIEVEMENTS (Conquistas)

### RLS
- [ ] **RLS Habilitado**

### Políticas Recomendadas
- [ ] **SELECT** - Todos podem ver conquistas disponíveis
  ```sql
  TO authenticated USING (true)
  ```

---

## 📋 TABELA USER_ACHIEVEMENTS (Conquistas do Usuário)

### RLS
- [ ] **RLS Habilitado**

### Políticas Recomendadas
- [ ] **SELECT** - Usuário vê apenas suas conquistas
  ```sql
  USING (user_id = auth.uid())
  ```
- [ ] **INSERT** - Sistema pode adicionar conquistas
  ```sql
  TO authenticated WITH CHECK (user_id = auth.uid())
  ```

---

## 📋 TABELA PORTFOLIOS

### RLS
- [ ] **RLS Habilitado**

### Políticas Recomendadas
- [ ] **SELECT próprio** - Usuário vê seus portfolios
  ```sql
  USING (user_id = auth.uid())
  ```
- [ ] **SELECT públicos** - Todos veem portfolios públicos
  ```sql
  USING (visibilidade = 'publico')
  ```
- [ ] **INSERT** - Usuário cria próprio portfolio
  ```sql
  WITH CHECK (user_id = auth.uid())
  ```
- [ ] **UPDATE próprio** - Usuário edita seus portfolios
  ```sql
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid())
  ```
- [ ] **DELETE próprio** - Usuário deleta seus portfolios
  ```sql
  USING (user_id = auth.uid())
  ```

---

## 📋 TABELA LESSONS (Aulas)

### RLS
- [ ] **RLS Habilitado**

### Políticas Recomendadas
- [ ] **SELECT** - Todos usuários autenticados veem aulas
  ```sql
  TO authenticated USING (true)
  ```
- [ ] **INSERT/UPDATE/DELETE** - Apenas professores e admins
  ```sql
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND tipo_usuario IN ('professor', 'admin')
    )
  )
  ```

---

## 📋 TABELA LESSON_PROGRESS (Progresso das Aulas)

### RLS
- [ ] **RLS Habilitado**

### Políticas Recomendadas
- [ ] **SELECT** - Usuário vê apenas seu progresso
  ```sql
  USING (user_id = auth.uid())
  ```
- [ ] **INSERT/UPDATE** - Usuário atualiza apenas seu progresso
  ```sql
  WITH CHECK (user_id = auth.uid())
  ```

---

## 📋 TABELA INSTRUMENTS (Instrumentos)

### RLS
- [ ] **RLS Habilitado**

### Políticas Recomendadas
- [ ] **SELECT** - Todos usuários autenticados veem instrumentos
  ```sql
  TO authenticated USING (true)
  ```

---

## 📋 TABELA USER_INSTRUMENTS (Instrumentos do Usuário)

### RLS
- [ ] **RLS Habilitado**

### Políticas Recomendadas
- [ ] **SELECT** - Usuário vê apenas seus instrumentos
  ```sql
  USING (user_id = auth.uid())
  ```
- [ ] **INSERT/UPDATE/DELETE** - Usuário gerencia apenas seus instrumentos
  ```sql
  WITH CHECK (user_id = auth.uid())
  ```

---

## 📋 TABELA TURMAS

### RLS
- [ ] **RLS Habilitado**

### Políticas Recomendadas
- [ ] **SELECT** - Professores veem turmas que criaram
  ```sql
  USING (teacher_id = auth.uid())
  ```
- [ ] **SELECT** - Alunos veem turmas em que estão matriculados
  ```sql
  USING (
    EXISTS (
      SELECT 1 FROM turma_students 
      WHERE turma_id = turmas.id 
      AND student_id = auth.uid()
    )
  )
  ```

---

## 🔧 TRIGGERS AUTOMÁTICOS

### Profiles
- [ ] **Trigger de criação automática** - Cria profile após signup
  ```sql
  CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
  ```

### User Achievements
- [ ] **Trigger de pontuação** - Atualiza pontos ao ganhar conquista
  ```sql
  CREATE TRIGGER on_achievement_earned
  AFTER INSERT ON user_achievements
  FOR EACH ROW EXECUTE FUNCTION update_user_points();
  ```

---

## 🎯 FUNÇÕES DE SEGURANÇA

### auth.uid()
- [ ] **Função disponível** - Retorna ID do usuário autenticado
- [ ] **Usada em todas as políticas** - Base da segurança

### Funções Customizadas
- [ ] **handle_new_user()** - Cria profile após signup
- [ ] **update_user_points()** - Atualiza pontos do usuário
- [ ] **check_admin_role()** - Verifica se usuário é admin

---

## 🔍 TESTES DE SEGURANÇA

### Teste 1: Usuário Autenticado
```sql
-- Como usuário logado, deve ver APENAS próprio perfil
SELECT COUNT(*) FROM profiles; 
-- Esperado: 1 (apenas meu perfil)
```

### Teste 2: Usuário NÃO Autenticado
```sql
-- Sem login, NÃO deve ver nenhum perfil
SELECT COUNT(*) FROM profiles;
-- Esperado: 0 (nenhum resultado)
```

### Teste 3: Tentar Ver Outros Perfis
```sql
-- Mesmo logado, NÃO deve ver perfis de outros
SELECT * FROM profiles WHERE id != auth.uid();
-- Esperado: 0 resultados
```

### Teste 4: Tentar Atualizar Outro Perfil
```sql
-- NÃO deve conseguir atualizar perfil de outro usuário
UPDATE profiles 
SET nome = 'Hacker' 
WHERE id != auth.uid();
-- Esperado: 0 linhas afetadas
```

---

## ⚠️ PROBLEMAS COMUNS

### ❌ RLS Desabilitado
**Sintoma:** Todos veem todos os dados  
**Solução:** `ALTER TABLE [tabela] ENABLE ROW LEVEL SECURITY;`

### ❌ Política com USING (true)
**Sintoma:** Política permite acesso a tudo  
**Solução:** Adicionar condição `auth.uid() = [coluna]`

### ❌ Política para role 'public'
**Sintoma:** Dados acessíveis sem login  
**Solução:** Mudar para `TO authenticated`

### ❌ auth.uid() retorna NULL
**Sintoma:** Usuário logado mas não consegue acessar dados  
**Solução:** Verificar se token JWT está sendo enviado

### ❌ Políticas Conflitantes
**Sintoma:** Comportamento imprevisível  
**Solução:** Remover políticas antigas e manter apenas as necessárias

---

## 🎓 BOAS PRÁTICAS

1. **Princípio do Menor Privilégio**
   - Usuários só acessam o mínimo necessário
   - Sempre usar `auth.uid() = user_id`

2. **Sempre usar TO authenticated**
   - Nunca usar `TO public` em dados sensíveis
   - Público só para dados realmente públicos

3. **Separar Leitura e Escrita**
   - Política de SELECT pode ser mais permissiva
   - Políticas de INSERT/UPDATE/DELETE mais restritas

4. **Usar WITH CHECK em escrita**
   - Valida dados ANTES de inserir
   - Previne criação de dados incorretos

5. **Testar SEMPRE**
   - Testar como usuário autenticado
   - Testar como usuário não autenticado
   - Testar com diferentes roles

---

## 📊 RESUMO FINAL

Execute o script `VERIFICAR_SEGURANCA_COMPLETA.sql` para ver:
- ✅ Quais tabelas têm RLS habilitado
- ✅ Quais políticas estão ativas
- ✅ Se as 3 políticas essenciais de profiles existem
- ✅ Quantos triggers estão configurados
- ✅ Total de políticas no banco

**Status Ideal:**
- `profiles`: 3 políticas (select, update, insert)
- RLS habilitado em todas as tabelas críticas
- Triggers de automação funcionando
- Testes de segurança passando

---

**Última atualização:** 05/10/2025  
**Status:** Documentação Completa ✅
