-- 🚨 CORREÇÃO URGENTE - POLÍTICAS RLS COM RECURSÃO INFINITA
-- Execute estas queries IMEDIATAMENTE no Supabase SQL Editor

-- ========================================
-- 1️⃣ CORREÇÃO IMEDIATA - REMOVER POLÍTICAS PROBLEMÁTICAS
-- ========================================

-- 🚨 REMOVER TODAS AS POLÍTICAS PROBLEMÁTICAS
DROP POLICY IF EXISTS "admins_full_access" ON admins;
DROP POLICY IF EXISTS "achievements_progress_access" ON achievements_progress;
DROP POLICY IF EXISTS "audit_activities_access" ON audit_activities;

-- ✅ CRIAR POLÍTICAS SIMPLES E SEGURAS

-- 🔒 Política segura para admins (sem recursão)
CREATE POLICY "admins_simple_access" ON admins
  FOR ALL 
  USING (id = auth.uid());

-- 🔒 Política segura para achievements_progress
CREATE POLICY "achievements_progress_simple" ON achievements_progress
  FOR ALL 
  USING (user_id = auth.uid());

-- 🔒 Política segura para audit_activities
CREATE POLICY "audit_activities_simple" ON audit_activities
  FOR SELECT 
  USING (user_id = auth.uid());

-- ========================================
-- 2️⃣ DESABILITAR RLS TEMPORARIAMENTE (SE NECESSÁRIO)
-- ========================================

-- 🚨 APENAS SE AS POLÍTICAS ACIMA NÃO FUNCIONAREM
-- Descomente as linhas abaixo apenas como ÚLTIMO RECURSO:

-- ALTER TABLE aulas DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE instrumentos DISABLE ROW LEVEL SECURITY;  
-- ALTER TABLE turmas DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE alunos DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE professores DISABLE ROW LEVEL SECURITY;

-- ========================================
-- 3️⃣ TESTAR ACESSO BÁSICO
-- ========================================

-- ✅ Testar se as tabelas estão acessíveis
SELECT COUNT(*) as total_profiles FROM profiles;

| total_profiles |
| -------------- |
| 25             |

SELECT COUNT(*) as total_achievements FROM achievements;

| total_achievements |
| ------------------ |
| 24                 |
SELECT COUNT(*) as total_user_roles FROM user_roles;

| total_user_roles |
| ---------------- |
| 25               |

-- ========================================
-- 4️⃣ LIBERAR ACESSO ÀS OUTRAS TABELAS (SE NECESSÁRIO)
-- ========================================

-- 🔓 Se as tabelas ainda estiverem com erro 500, execute estas:

-- Política simples para aulas
DROP POLICY IF EXISTS "aula_atividades_access" ON aula_atividades;
DROP POLICY IF EXISTS "aula_checklist_access" ON aula_checklist; 
DROP POLICY IF EXISTS "aula_criterios_avaliacao_access" ON aula_criterios_avaliacao;
DROP POLICY IF EXISTS "aula_desafio_alpha_access" ON aula_desafio_alpha;
DROP POLICY IF EXISTS "aula_desafios_access" ON aula_desafios;

-- Política para instrumentos (sem recursão)
CREATE POLICY "instrumentos_public_read" ON instrumentos
  FOR SELECT 
  USING (true);  -- Permite leitura pública

-- Política para turmas (sem recursão) 
CREATE POLICY "turmas_public_read" ON turmas
  FOR SELECT
  USING (true);  -- Permite leitura pública

-- Política para alunos (sem recursão)
CREATE POLICY "alunos_safe_access" ON alunos
  FOR SELECT
  USING (id = auth.uid() OR EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role_type IN ('admin', 'professor')
  ));

-- Política para professores (sem recursão)
CREATE POLICY "professores_safe_access" ON professores  
  FOR SELECT
  USING (id = auth.uid() OR EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role_type = 'admin'
  ));

-- ========================================
-- 5️⃣ TESTAR ACESSO ÀS OUTRAS TABELAS
-- ========================================

-- ✅ Testar se as outras tabelas funcionaram
SELECT COUNT(*) as total_aulas FROM aulas;
SELECT COUNT(*) as total_instrumentos FROM instrumentos;
SELECT COUNT(*) as total_turmas FROM turmas;
SELECT COUNT(*) as total_alunos FROM alunos;
SELECT COUNT(*) as total_professores FROM professores;

-- ========================================
-- 📝 INSTRUÇÕES DE EMERGÊNCIA:
-- ========================================
-- 1. Execute a Seção 1 PRIMEIRO (remove políticas problemáticas)
-- 2. Teste o dashboard - deve carregar dados básicos
-- 3. Se ainda der erro, execute a Seção 2 (desabilita RLS)
-- 4. Execute a Seção 3 para confirmar que funcionou
-- 5. Se outras tabelas ainda derem erro 500, execute a Seção 4