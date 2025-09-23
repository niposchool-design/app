-- Script SQL para configurar RLS (Row Level Security) para todas as tabelas de instrumentos
-- Nipo School - Sistema de Instrumentos Musicais

-- ============================================
-- TABELAS REAIS IDENTIFICADAS RELACIONADAS A INSTRUMENTOS:
-- ============================================

-- Tabelas principais (verificadas no banco real):
-- 1. instrumentos (tabela principal) ✅
-- 2. professor_instrumentos (relacionamento professores x instrumentos) ✅
-- 3. instrumentos_alunos (relacionamento alunos x instrumentos) ✅
-- 4. instrumentos_fisicos (instrumentos físicos para empréstimo) ✅
-- 5. instrumento_midias (mídias/imagens/vídeos) ✅
-- 6. instrumento_tecnicas (técnicas de execução) ✅
-- 7. instrumento_sons (áudios/sons do instrumento) ✅
-- 8. instrumento_curiosidades (informações interessantes) ✅
-- 9. instrumento_quiz (quizzes educativos) ✅
-- 10. instrumento_performances (performances gravadas) ✅
-- 11. instrumento_sons_variacoes (variações de som) ✅
-- 12. instrumentos_relacionados (instrumentos similares) ✅
-- 13. cessoes_instrumentos (empréstimos) ✅
-- 14. manutencoes_instrumentos (manutenções) ✅
-- 15. historico_instrumentos (histórico de mudanças) ✅
-- 16. turmas (turmas de instrumentos) ✅
-- 17. matriculas (matrículas em turmas) ✅
-- 18. modules (módulos de ensino) ✅

-- ============================================
-- CONFIGURAÇÃO DE RLS - LEITURA PÚBLICA
-- ============================================

-- 1. Tabela principal: instrumentos
ALTER TABLE instrumentos DISABLE ROW LEVEL SECURITY;

-- 2. Professor_instrumentos (para mostrar quais professores ensinam cada instrumento)
ALTER TABLE professor_instrumentos DISABLE ROW LEVEL SECURITY;

-- 3. Instrumentos_alunos (relacionamento alunos x instrumentos)
ALTER TABLE instrumentos_alunos DISABLE ROW LEVEL SECURITY;

-- 4. Instrumentos_fisicos (instrumentos disponíveis para empréstimo)
ALTER TABLE instrumentos_fisicos DISABLE ROW LEVEL SECURITY;

-- 5. Instrumento_midias (imagens, vídeos, etc.)
ALTER TABLE instrumento_midias DISABLE ROW LEVEL SECURITY;

-- 6. Instrumento_tecnicas (técnicas de execução)
ALTER TABLE instrumento_tecnicas DISABLE ROW LEVEL SECURITY;

-- 7. Instrumento_sons (áudios e sons)
ALTER TABLE instrumento_sons DISABLE ROW LEVEL SECURITY;

-- 8. Instrumento_curiosidades (informações educativas)
ALTER TABLE instrumento_curiosidades DISABLE ROW LEVEL SECURITY;

-- 9. Instrumento_quiz (quizzes educativos)
ALTER TABLE instrumento_quiz DISABLE ROW LEVEL SECURITY;

-- 10. Instrumento_performances (performances e apresentações)
ALTER TABLE instrumento_performances DISABLE ROW LEVEL SECURITY;

-- 11. Instrumento_sons_variacoes (variações de som)
ALTER TABLE instrumento_sons_variacoes DISABLE ROW LEVEL SECURITY;

-- 12. Instrumentos_relacionados (instrumentos similares)
ALTER TABLE instrumentos_relacionados DISABLE ROW LEVEL SECURITY;

-- 13. Turmas (para mostrar turmas disponíveis por instrumento)
ALTER TABLE turmas DISABLE ROW LEVEL SECURITY;

-- 14. Modules (módulos educacionais por instrumento)
ALTER TABLE modules DISABLE ROW LEVEL SECURITY;

-- 15. Historico_instrumentos (histórico público)
ALTER TABLE historico_instrumentos DISABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS PARA TABELAS SENSÍVEIS
-- ============================================

-- Para matriculas (dados sensíveis de matrícula)
DROP POLICY IF EXISTS "Alunos podem ver suas próprias matrículas" ON matriculas;
CREATE POLICY "Alunos podem ver suas próprias matrículas" ON matriculas
  FOR SELECT USING (
    auth.uid()::text = aluno_id::text
    OR
    EXISTS (
      SELECT 1 FROM professores p 
      WHERE p.user_id = auth.uid()
    )
  );

-- Para cessoes_instrumentos (empréstimos - dados pessoais)
DROP POLICY IF EXISTS "Permitir leitura de cessões" ON cessoes_instrumentos;
CREATE POLICY "Permitir leitura de cessões" ON cessoes_instrumentos
  FOR SELECT USING (
    auth.uid()::text = aluno_id::text
    OR
    EXISTS (
      SELECT 1 FROM professores p 
      WHERE p.user_id = auth.uid()
    )
  );

-- Para manutencoes_instrumentos (dados administrativos)
ALTER TABLE manutencoes_instrumentos DISABLE ROW LEVEL SECURITY;

-- ============================================
-- GRANTS PARA USUÁRIOS ANÔNIMOS (se necessário)
-- ============================================

-- Grants para as principais tabelas de instrumentos
GRANT SELECT ON instrumentos TO anon;
GRANT SELECT ON professor_instrumentos TO anon;
GRANT SELECT ON instrumentos_alunos TO anon;
GRANT SELECT ON instrumentos_fisicos TO anon;
GRANT SELECT ON instrumento_midias TO anon;
GRANT SELECT ON instrumento_tecnicas TO anon;
GRANT SELECT ON instrumento_sons TO anon;
GRANT SELECT ON instrumento_curiosidades TO anon;
GRANT SELECT ON instrumento_quiz TO anon;
GRANT SELECT ON instrumento_performances TO anon;
GRANT SELECT ON instrumento_sons_variacoes TO anon;
GRANT SELECT ON instrumentos_relacionados TO anon;
GRANT SELECT ON turmas TO anon;
GRANT SELECT ON modules TO anon;
GRANT SELECT ON historico_instrumentos TO anon;
GRANT SELECT ON manutencoes_instrumentos TO anon;

-- ============================================
-- VERIFICAR TABELAS EXISTENTES
-- ============================================

-- Query para verificar quais tabelas existem:
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_name LIKE '%instrumento%' 
   OR table_name IN ('turmas', 'matriculas', 'modules', 'professores')
ORDER BY table_name;

-- ============================================
-- VERIFICAR RLS ATUAL
-- ============================================

-- Query para verificar status do RLS:
SELECT 
  schemaname,
  tablename,
  rowsecurity,
  (SELECT string_agg(policyname, ', ') 
   FROM pg_policies pp 
   WHERE pp.schemaname = t.schemaname 
   AND pp.tablename = t.tablename) as policies
FROM pg_tables t
WHERE tablename LIKE '%instrumento%' 
   OR tablename IN ('turmas', 'matriculas', 'modules', 'professores', 'alunos')
ORDER BY tablename;

-- ============================================
-- GRANTS PARA USUÁRIOS ANÔNIMOS (se necessário)
-- ============================================

-- Se usar tabelas com acesso público, garantir grants:
GRANT SELECT ON instrumentos TO anon;
GRANT SELECT ON professor_instrumentos TO anon;
GRANT SELECT ON instrumento_atividades TO anon;
GRANT SELECT ON instrumento_configuracoes TO anon;
GRANT SELECT ON turmas TO anon;
GRANT SELECT ON modules TO anon;
GRANT SELECT ON instrumentos_fisicos TO anon;

-- ============================================
-- REFRESH PARA APLICAR MUDANÇAS
-- ============================================

-- Refresh do schema para aplicar as mudanças
NOTIFY pgrst, 'reload schema';