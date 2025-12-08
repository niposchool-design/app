-- ==========================================
-- HABILITAR RLS E CRIAR GRANTS
-- Para caso as tabelas não tenham RLS ativo 
-- ==========================================

-- 1. Habilitar RLS nas tabelas Alpha
ALTER TABLE alpha_desafios ENABLE ROW LEVEL SECURITY;
ALTER TABLE alpha_submissoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE alpha_metodologias ENABLE ROW LEVEL SECURITY;
ALTER TABLE alpha_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE alpha_competencias ENABLE ROW LEVEL SECURITY;

-- 2. Garantir permissões básicas no schema public
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 3. Garantir permissões de SELECT nas tabelas
GRANT SELECT ON alpha_desafios TO anon, authenticated;
GRANT SELECT ON alpha_metodologias TO anon, authenticated;
GRANT SELECT ON alpha_badges TO anon, authenticated;
GRANT SELECT ON alpha_competencias TO anon, authenticated;

-- 4. Permissões completas para usuários autenticados nas submissões
GRANT SELECT, INSERT, UPDATE ON alpha_submissoes TO authenticated;

-- 5. Permissões em sequences (caso existam)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Verificar status
SELECT 
  tablename,
  rowsecurity as rls_ativo,
  (SELECT string_agg(privilege_type, ', ') 
   FROM information_schema.table_privileges 
   WHERE table_name = pg_tables.tablename 
   AND grantee = 'authenticated') as permissoes_authenticated,
  (SELECT string_agg(privilege_type, ', ') 
   FROM information_schema.table_privileges 
   WHERE table_name = pg_tables.tablename 
   AND grantee = 'anon') as permissoes_anon
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename LIKE 'alpha_%'
ORDER BY tablename;


| tablename                 | rls_ativo | permissoes_authenticated                                      | permissoes_anon                                               |
| ------------------------- | --------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| alpha_aluno_badges        | false     | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_aluno_desafios      | false     | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_badges              | true      | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_celebracoes         | false     | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_competencias        | true      | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_desafios            | true      | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_estudante_badges    | false     | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_mentorias           | false     | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_metodologias        | true      | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_niveis              | false     | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_progresso           | true      | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_progresso_estudante | false     | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_projetos_coletivos  | false     | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_ranking             | false     | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_submissoes          | true      | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |
| alpha_xp_historico        | false     | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER | INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER |

