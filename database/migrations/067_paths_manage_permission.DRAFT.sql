-- =============================================
-- Migration: 067_paths_manage_permission.sql  [RASCUNHO — NÃO APLICADO]
-- =============================================
-- STATUS: RASCUNHO. ESTE ARQUIVO NÃO FOI APLICADO EM NENHUM BANCO
--         (nem produção tqlwkgiytdikumtcnizf, nem local eehidnwlwrzqzgytbfsd).
--         Revisar e aplicar manualmente pelo responsável antes de ativar o gate
--         de servidor nas ações de gerenciamento de trilhas.
--
-- MOTIVO:
--   As ações de ESCALONAMENTO DE PRIVILÉGIO em
--   app/app/actions/learning-path-actions.ts
--     - createLearningPath
--     - updateLearningPath
--     - addPathStep
--     - deletePathStep
--   hoje NÃO possuem checkPermission no servidor (apenas getActionContext).
--   Não existe nenhuma permissão 'paths.*' no seed RBAC (09_seed.sql) nem nos
--   patches (036). Por isso NÃO foi adicionado gate "ao vivo" no código: usar
--   uma string de permissão inexistente faria checkPermission() retornar false
--   para TODOS os papéis (inclusive admin/professor), QUEBRANDO o fluxo atual
--   que está funcionando.
--
--   Esta migration cria a permissão 'paths.manage' e a concede a admin e
--   professor. SOMENTE DEPOIS de aplicada é seguro adicionar no código:
--
--     if (!(await checkPermission('paths.manage')))
--       return forbiddenError('Permissao paths.manage necessaria')
--
--   (mesmo padrão de evaluateSubmission / evaluatePortfolioV2).
--
-- IDs de papéis (ver MEMORY / 09_seed.sql):
--   admin    = 00000000-0000-0000-0000-000000000012
--   teacher  = 00000000-0000-0000-0000-000000000011
--   student  = 00000000-0000-0000-0000-000000000010  (NÃO recebe esta permissão)
-- =============================================

-- 1) Criar a permissão de gerenciamento de trilhas de aprendizagem
INSERT INTO iam.permissions (slug, display_name, resource, action) VALUES
    ('paths.manage',           'Manage learning paths',   'paths',       'manage')
ON CONFLICT (slug) DO NOTHING;

-- 2) Conceder ao papel admin
INSERT INTO iam.role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000012', p.id
FROM iam.permissions p
WHERE p.slug = 'paths.manage'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- 3) Conceder ao papel professor (teacher)
INSERT INTO iam.role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000011', p.id
FROM iam.permissions p
WHERE p.slug = 'paths.manage'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- FIM DO RASCUNHO. Aluno (role ...0010) intencionalmente NÃO recebe paths.manage.
