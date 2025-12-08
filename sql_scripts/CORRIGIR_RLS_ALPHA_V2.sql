-- ==========================================
-- CORRIGIR RLS POLICIES - VERSÃO SIMPLIFICADA
-- SEM DEPENDER DE COLUNA "ATIVO"
-- ==========================================

-- ==========================================
-- 1. ALPHA_DESAFIOS - Todos podem ler
-- ==========================================

DROP POLICY IF EXISTS "Todos podem visualizar desafios ativos" ON alpha_desafios;
DROP POLICY IF EXISTS "Alunos podem visualizar desafios" ON alpha_desafios;
DROP POLICY IF EXISTS "Public read desafios" ON alpha_desafios;
DROP POLICY IF EXISTS "Permitir leitura de desafios ativos" ON alpha_desafios;

CREATE POLICY "Permitir leitura de todos desafios"
ON alpha_desafios
FOR SELECT
TO authenticated, anon
USING (true);

-- ==========================================
-- 2. ALPHA_SUBMISSOES - Controle por usuário
-- ==========================================

DROP POLICY IF EXISTS "Usuários podem ver suas submissões" ON alpha_submissoes;
DROP POLICY IF EXISTS "Usuários podem criar submissões" ON alpha_submissoes;
DROP POLICY IF EXISTS "Professores podem ver todas submissões" ON alpha_submissoes;
DROP POLICY IF EXISTS "Professores podem avaliar submissões" ON alpha_submissoes;
DROP POLICY IF EXISTS "Alunos veem próprias submissões" ON alpha_submissoes;
DROP POLICY IF EXISTS "Alunos criam submissões" ON alpha_submissoes;
DROP POLICY IF EXISTS "Alunos atualizam próprias submissões" ON alpha_submissoes;

-- Alunos veem suas submissões
CREATE POLICY "Alunos veem próprias submissões"
ON alpha_submissoes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Alunos criam submissões
CREATE POLICY "Alunos criam submissões"
ON alpha_submissoes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Alunos atualizam submissões pendentes
CREATE POLICY "Alunos atualizam próprias submissões"
ON alpha_submissoes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND status = 'pendente')
WITH CHECK (auth.uid() = user_id);

-- Professores veem todas
CREATE POLICY "Professores veem todas submissoes"
ON alpha_submissoes
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.tipo_usuario IN ('professor', 'admin')
  )
);

-- Professores avaliam
CREATE POLICY "Professores avaliam submissoes"
ON alpha_submissoes
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.tipo_usuario IN ('professor', 'admin')
  )
);

-- ==========================================
-- 3. ALPHA_METODOLOGIAS - Leitura livre
-- ==========================================

DROP POLICY IF EXISTS "Todos podem ler metodologias" ON alpha_metodologias;
DROP POLICY IF EXISTS "Permitir leitura de metodologias" ON alpha_metodologias;

CREATE POLICY "Leitura livre de metodologias"
ON alpha_metodologias
FOR SELECT
TO authenticated, anon
USING (true);

-- ==========================================
-- 4. ALPHA_BADGES - Leitura livre
-- ==========================================

DROP POLICY IF EXISTS "Todos podem ler badges" ON alpha_badges;
DROP POLICY IF EXISTS "Permitir leitura de badges" ON alpha_badges;

CREATE POLICY "Leitura livre de badges"
ON alpha_badges
FOR SELECT
TO authenticated, anon
USING (true);

-- ==========================================
-- 5. ALPHA_COMPETENCIAS - Leitura livre
-- ==========================================

DROP POLICY IF EXISTS "Todos podem ler competências" ON alpha_competencias;
DROP POLICY IF EXISTS "Permitir leitura de competências" ON alpha_competencias;

CREATE POLICY "Leitura livre de competencias"
ON alpha_competencias
FOR SELECT
TO authenticated, anon
USING (true);

-- ==========================================
-- 6. USER_BADGES - Por usuário
-- ==========================================

DROP POLICY IF EXISTS "Usuários veem próprios badges" ON user_badges;

CREATE POLICY "Usuarios veem proprios badges"
ON user_badges
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- ==========================================
-- VERIFICAÇÃO
-- ==========================================

SELECT 
  tablename,
  policyname,
  cmd as operacao,
  roles as para_quem
FROM pg_policies
WHERE tablename IN (
  'alpha_desafios',
  'alpha_submissoes', 
  'alpha_metodologias',
  'alpha_badges',
  'alpha_competencias',
  'user_badges'
)
ORDER BY tablename, policyname;
