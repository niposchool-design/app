-- ==========================================
-- CORRIGIR RLS POLICIES - SISTEMA ALPHA
-- Liberar acesso aos desafios e submissões
-- ==========================================

-- ==========================================
-- 1. ALPHA_DESAFIOS - Todos podem ler desafios ativos
-- ==========================================

-- Remover policies antigas se existirem
DROP POLICY IF EXISTS "Todos podem visualizar desafios ativos" ON alpha_desafios;
DROP POLICY IF EXISTS "Alunos podem visualizar desafios" ON alpha_desafios;
DROP POLICY IF EXISTS "Public read desafios" ON alpha_desafios;

-- Criar policy permissiva para leitura
CREATE POLICY "Permitir leitura de desafios ativos"
ON alpha_desafios
FOR SELECT
TO authenticated, anon
USING (ativo = true OR ativo IS NULL);

-- ==========================================
-- 2. ALPHA_SUBMISSOES - Controle por usuário
-- ==========================================

-- Remover policies antigas
DROP POLICY IF EXISTS "Usuários podem ver suas submissões" ON alpha_submissoes;
DROP POLICY IF EXISTS "Usuários podem criar submissões" ON alpha_submissoes;
DROP POLICY IF EXISTS "Professores podem ver todas submissões" ON alpha_submissoes;
DROP POLICY IF EXISTS "Professores podem avaliar submissões" ON alpha_submissoes;

-- Alunos podem ver suas próprias submissões
CREATE POLICY "Alunos veem próprias submissões"
ON alpha_submissoes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Alunos podem criar submissões
CREATE POLICY "Alunos criam submissões"
ON alpha_submissoes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Alunos podem atualizar suas submissões pendentes
CREATE POLICY "Alunos atualizam próprias submissões"
ON alpha_submissoes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND status = 'pendente')
WITH CHECK (auth.uid() = user_id);

-- Professores podem ver todas as submissões
CREATE POLICY "Professores veem todas submissões"
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

-- Professores podem avaliar submissões
CREATE POLICY "Professores avaliam submissões"
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
-- 3. ALPHA_METODOLOGIAS - Leitura pública
-- ==========================================

DROP POLICY IF EXISTS "Todos podem ler metodologias" ON alpha_metodologias;

CREATE POLICY "Permitir leitura de metodologias"
ON alpha_metodologias
FOR SELECT
TO authenticated, anon
USING (ativo = true OR ativo IS NULL);

-- ==========================================
-- 4. ALPHA_BADGES - Leitura pública
-- ==========================================

DROP POLICY IF EXISTS "Todos podem ler badges" ON alpha_badges;

CREATE POLICY "Permitir leitura de badges"
ON alpha_badges
FOR SELECT
TO authenticated, anon
USING (visivel = true OR visivel IS NULL);

-- ==========================================
-- 5. ALPHA_COMPETENCIAS - Leitura pública
-- ==========================================

DROP POLICY IF EXISTS "Todos podem ler competências" ON alpha_competencias;

CREATE POLICY "Permitir leitura de competências"
ON alpha_competencias
FOR SELECT
TO authenticated, anon
USING (true);

-- ==========================================
-- 6. USER_BADGES - TABELA NÃO EXISTE (PULADO)
-- ==========================================

-- A tabela user_badges não existe no banco
-- Provavelmente usa alpha_user_badges ou outro nome

-- ==========================================
-- VERIFICAÇÃO DAS POLICIES
-- ==========================================

-- Ver todas as policies criadas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN (
  'alpha_desafios',
  'alpha_submissoes', 
  'alpha_metodologias',
  'alpha_badges',
  'alpha_competencias'
)
ORDER BY tablename, policyname;


| schemaname | tablename          | policyname                                 | permissive | roles                | cmd    | qual                                                                                                                                                   | with_check             |
| ---------- | ------------------ | ------------------------------------------ | ---------- | -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| public     | alpha_badges       | Permitir leitura de badges                 | PERMISSIVE | {anon,authenticated} | SELECT | ((visivel = true) OR (visivel IS NULL))                                                                                                                | null                   |
| public     | alpha_badges       | alpha_badges_select_all                    | PERMISSIVE | {public}             | SELECT | true                                                                                                                                                   | null                   |
| public     | alpha_competencias | Competências são visíveis para todos       | PERMISSIVE | {public}             | SELECT | (ativo = true)                                                                                                                                         | null                   |
| public     | alpha_competencias | Permitir leitura de competências           | PERMISSIVE | {anon,authenticated} | SELECT | true                                                                                                                                                   | null                   |
| public     | alpha_desafios     | Permitir leitura de desafios ativos        | PERMISSIVE | {anon,authenticated} | SELECT | ((ativo = true) OR (ativo IS NULL))                                                                                                                    | null                   |
| public     | alpha_metodologias | Metodologias são visíveis para todos       | PERMISSIVE | {public}             | SELECT | (ativo = true)                                                                                                                                         | null                   |
| public     | alpha_metodologias | Permitir leitura de metodologias           | PERMISSIVE | {anon,authenticated} | SELECT | ((ativo = true) OR (ativo IS NULL))                                                                                                                    | null                   |
| public     | alpha_submissoes   | Admin gerencia todas submissoes alpha      | PERMISSIVE | {authenticated}      | ALL    | is_admin(auth.uid())                                                                                                                                   | null                   |
| public     | alpha_submissoes   | Admin vê todas submissoes                  | PERMISSIVE | {authenticated}      | ALL    | is_admin(auth.uid())                                                                                                                                   | null                   |
| public     | alpha_submissoes   | Aluno cria próprias submissoes alpha       | PERMISSIVE | {authenticated}      | INSERT | null                                                                                                                                                   | (user_id = auth.uid()) |
| public     | alpha_submissoes   | Aluno vê próprias submissoes               | PERMISSIVE | {authenticated}      | SELECT | (user_id = auth.uid())                                                                                                                                 | null                   |
| public     | alpha_submissoes   | Aluno vê próprias submissoes alpha         | PERMISSIVE | {authenticated}      | SELECT | (user_id = auth.uid())                                                                                                                                 | null                   |
| public     | alpha_submissoes   | Alunos atualizam próprias submissões       | PERMISSIVE | {authenticated}      | UPDATE | ((auth.uid() = user_id) AND ((status)::text = 'pendente'::text))                                                                                       | (auth.uid() = user_id) |
| public     | alpha_submissoes   | Alunos criam submissões                    | PERMISSIVE | {authenticated}      | INSERT | null                                                                                                                                                   | (auth.uid() = user_id) |
| public     | alpha_submissoes   | Alunos veem próprias submissões            | PERMISSIVE | {authenticated}      | SELECT | (auth.uid() = user_id)                                                                                                                                 | null                   |
| public     | alpha_submissoes   | Professor avalia submissoes de seus alunos | PERMISSIVE | {authenticated}      | UPDATE | is_professor_of_student(user_id)                                                                                                                       | null                   |
| public     | alpha_submissoes   | Professor vê submissoes de alunos          | PERMISSIVE | {authenticated}      | SELECT | is_professor_of_student(user_id)                                                                                                                       | null                   |
| public     | alpha_submissoes   | Professor vê submissoes de seus alunos     | PERMISSIVE | {authenticated}      | SELECT | is_professor_of_student(user_id)                                                                                                                       | null                   |
| public     | alpha_submissoes   | Professores avaliam submissões             | PERMISSIVE | {authenticated}      | UPDATE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.tipo_usuario = ANY (ARRAY['professor'::text, 'admin'::text]))))) | null                   |
| public     | alpha_submissoes   | Professores veem todas submissões          | PERMISSIVE | {authenticated}      | SELECT | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.tipo_usuario = ANY (ARRAY['professor'::text, 'admin'::text]))))) | null                   |
| public     | alpha_submissoes   | Usuários podem atualizar suas submissões   | PERMISSIVE | {public}             | UPDATE | (auth.uid() = user_id)                                                                                                                                 | null                   |
| public     | alpha_submissoes   | Usuários veem suas próprias submissões     | PERMISSIVE | {public}             | SELECT | (auth.uid() = user_id)                                                                                                                                 | null                   |



-- Verificar RLS está ativado
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename IN (
  'alpha_desafios',
  'alpha_submissoes',
  'alpha_metodologias', 
  'alpha_badges',
  'alpha_competencias'
);


| schemaname | tablename          | rowsecurity |
| ---------- | ------------------ | ----------- |
| public     | alpha_submissoes   | true        |
| public     | alpha_metodologias | true        |
| public     | alpha_desafios     | true        |
| public     | alpha_competencias | true        |
| public     | alpha_badges       | true        |
