-- 🎌 NIPO SCHOOL - EXPLORAÇÃO COMPLETA DO BANCO DE DADOS
-- Execute estas queries no Supabase SQL Editor e me envie os resultados

-- ========================================
-- 1️⃣ MAPEAMENTO GERAL DA ESTRUTURA
-- ========================================

-- 📊 Listar todas as tabelas do banco
SELECT 
    table_schema,
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;


| table_schema | table_name                            | table_type |
| ------------ | ------------------------------------- | ---------- |
| public       | achievements                          | BASE TABLE |
| public       | achievements_progress                 | BASE TABLE |
| public       | admins                                | BASE TABLE |
| public       | alunos                                | BASE TABLE |
| public       | audit_activities                      | BASE TABLE |
| public       | aula_atividades                       | BASE TABLE |
| public       | aula_checklist                        | BASE TABLE |
| public       | aula_criterios_avaliacao              | BASE TABLE |
| public       | aula_desafio_alpha                    | BASE TABLE |
| public       | aula_desafios                         | BASE TABLE |
| public       | aula_feedback                         | BASE TABLE |
| public       | aula_feedbacks                        | BASE TABLE |
| public       | aula_materiais                        | BASE TABLE |
| public       | aula_permissoes                       | BASE TABLE |
| public       | aula_registros                        | BASE TABLE |
| public       | aula_status_log                       | BASE TABLE |
| public       | aula_tags                             | BASE TABLE |
| public       | aulas                                 | BASE TABLE |
| public       | cessoes_instrumentos                  | BASE TABLE |
| public       | devotional_content                    | BASE TABLE |
| public       | historico_instrumentos                | BASE TABLE |
| public       | hook_cache                            | BASE TABLE |
| public       | instrumento_curiosidades              | BASE TABLE |
| public       | instrumento_midias                    | BASE TABLE |
| public       | instrumento_performances              | BASE TABLE |
| public       | instrumento_quiz                      | BASE TABLE |
| public       | instrumento_sons                      | BASE TABLE |
| public       | instrumento_sons_variacoes            | BASE TABLE |
| public       | instrumento_tecnicas                  | BASE TABLE |
| public       | instrumentos                          | BASE TABLE |
| public       | instrumentos_alunos                   | BASE TABLE |
| public       | instrumentos_fisicos                  | BASE TABLE |
| public       | instrumentos_relacionados             | BASE TABLE |
| public       | lessons                               | BASE TABLE |
| public       | logos                                 | BASE TABLE |
| public       | manutencoes_instrumentos              | BASE TABLE |
| public       | matriculas                            | BASE TABLE |
| public       | migration_log                         | BASE TABLE |
| public       | modules                               | BASE TABLE |
| public       | modulos                               | BASE TABLE |
| public       | permission_templates                  | BASE TABLE |
| public       | permissions                           | BASE TABLE |
| public       | presencas                             | BASE TABLE |
| public       | professor_instrumentos                | BASE TABLE |
| public       | professores                           | BASE TABLE |
| public       | professores_categorias                | BASE TABLE |
| public       | professores_conteudos                 | BASE TABLE |
| public       | professores_dashboard_stats           | VIEW       |
| public       | profiles                              | BASE TABLE |
| public       | qr_codes                              | BASE TABLE |
| public       | qr_scans                              | BASE TABLE |
| public       | role_permissions                      | BASE TABLE |
| public       | roles                                 | BASE TABLE |
| public       | trigger_logs                          | BASE TABLE |
| public       | turma_alunos                          | BASE TABLE |
| public       | turmas                                | BASE TABLE |
| public       | user_achievements                     | BASE TABLE |
| public       | user_devotional_progress              | BASE TABLE |
| public       | user_notifications                    | BASE TABLE |
| public       | user_points_log                       | BASE TABLE |
| public       | user_progress                         | BASE TABLE |
| public       | user_roles                            | BASE TABLE |
| public       | usuarios                              | BASE TABLE |
| public       | view_admin_dashboard                  | VIEW       |
| public       | view_attendance_analytics             | VIEW       |
| public       | view_aulas_admin                      | VIEW       |
| public       | view_aulas_aluno                      | VIEW       |
| public       | view_aulas_professor                  | VIEW       |
| public       | view_placar_logos                     | VIEW       |
| public       | view_professor_dashboard              | VIEW       |
| public       | view_qr_analytics                     | VIEW       |
| public       | view_user_gamification                | VIEW       |
| public       | vw_violin_ids                         | VIEW       |
| public       | vw_violino_instrumento_sons           | VIEW       |
| public       | vw_violino_instrumento_sons_variacoes | VIEW       |
| public       | vw_violino_instrumentos               | VIEW       |
| public       | vw_violino_instrumentos_relacionados  | VIEW       |
| public       | vw_violino_palestra                   | VIEW       |

-- 📋 Detalhes de todas as colunas por tabela
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'public' 
ORDER BY table_name, ordinal_position;


| table_name               | column_name            | data_type                   | is_nullable | column_default    | character_maximum_length |
| ------------------------ | ---------------------- | --------------------------- | ----------- | ----------------- | ------------------------ |
| achievements             | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| achievements             | name                   | text                        | NO          | null              | null                     |
| achievements             | description            | text                        | YES         | null              | null                     |
| achievements             | badge_icon             | text                        | YES         | null              | null                     |
| achievements             | badge_color            | text                        | YES         | '#E53E3E'::text   | null                     |
| achievements             | points_reward          | integer                     | YES         | 0                 | null                     |
| achievements             | category               | text                        | YES         | null              | null                     |
| achievements             | requirement_type       | text                        | YES         | null              | null                     |
| achievements             | requirement_value      | integer                     | YES         | null              | null                     |
| achievements             | is_active              | boolean                     | YES         | true              | null                     |
| achievements             | created_at             | timestamp with time zone    | YES         | now()             | null                     |
| achievements_progress    | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| achievements_progress    | user_id                | uuid                        | YES         | null              | null                     |
| achievements_progress    | achievement_id         | uuid                        | YES         | null              | null                     |
| achievements_progress    | current_progress       | integer                     | YES         | 0                 | null                     |
| achievements_progress    | target_progress        | integer                     | NO          | null              | null                     |
| achievements_progress    | is_completed           | boolean                     | YES         | false             | null                     |
| achievements_progress    | completed_at           | timestamp with time zone    | YES         | null              | null                     |
| achievements_progress    | metadata               | jsonb                       | YES         | '{}'::jsonb       | null                     |
| achievements_progress    | created_at             | timestamp with time zone    | YES         | now()             | null                     |
| achievements_progress    | updated_at             | timestamp with time zone    | YES         | now()             | null                     |
| admins                   | id                     | uuid                        | NO          | null              | null                     |
| admins                   | ativo                  | boolean                     | YES         | true              | null                     |
| admins                   | nivel_acesso           | text                        | YES         | 'admin'::text     | null                     |
| admins                   | permissoes             | jsonb                       | YES         | '{}'::jsonb       | null                     |
| admins                   | criado_em              | timestamp without time zone | YES         | CURRENT_TIMESTAMP | null                     |
| admins                   | departamento           | text                        | YES         | null              | null                     |
| admins                   | cargo                  | text                        | YES         | null              | null                     |
| alunos                   | id                     | uuid                        | NO          | null              | null                     |
| alunos                   | instrumento            | text                        | YES         | null              | null                     |
| alunos                   | nivel                  | text                        | YES         | null              | null                     |
| alunos                   | turma                  | text                        | YES         | null              | null                     |
| alunos                   | data_ingresso          | date                        | YES         | CURRENT_DATE      | null                     |
| alunos                   | ativo                  | boolean                     | YES         | true              | null                     |
| alunos                   | criado_em              | timestamp without time zone | YES         | now()             | null                     |
| alunos                   | instrumento_id         | uuid                        | YES         | null              | null                     |
| alunos                   | turma_principal_id     | uuid                        | YES         | null              | null                     |
| audit_activities         | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| audit_activities         | user_id                | uuid                        | YES         | null              | null                     |
| audit_activities         | action                 | text                        | NO          | null              | null                     |
| audit_activities         | resource               | text                        | NO          | null              | null                     |
| audit_activities         | resource_id            | text                        | YES         | null              | null                     |
| audit_activities         | old_values             | jsonb                       | YES         | null              | null                     |
| audit_activities         | new_values             | jsonb                       | YES         | null              | null                     |
| audit_activities         | details                | jsonb                       | YES         | '{}'::jsonb       | null                     |
| audit_activities         | ip_address             | inet                        | YES         | null              | null                     |
| audit_activities         | user_agent             | text                        | YES         | null              | null                     |
| audit_activities         | session_id             | text                        | YES         | null              | null                     |
| audit_activities         | hook_name              | text                        | YES         | null              | null                     |
| audit_activities         | component_name         | text                        | YES         | null              | null                     |
| audit_activities         | severity               | text                        | YES         | 'info'::text      | null                     |
| audit_activities         | created_at             | timestamp with time zone    | YES         | now()             | null                     |
| aula_atividades          | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| aula_atividades          | aula_id                | uuid                        | NO          | null              | null                     |
| aula_atividades          | tipo                   | text                        | YES         | null              | null                     |
| aula_atividades          | descricao              | text                        | YES         | null              | null                     |
| aula_checklist           | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| aula_checklist           | aula_id                | uuid                        | YES         | null              | null                     |
| aula_checklist           | item                   | text                        | YES         | null              | null                     |
| aula_checklist           | tipo                   | text                        | YES         | null              | null                     |
| aula_checklist           | feito                  | boolean                     | YES         | false             | null                     |
| aula_criterios_avaliacao | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| aula_criterios_avaliacao | aula_id                | uuid                        | NO          | null              | null                     |
| aula_criterios_avaliacao | criterio               | text                        | YES         | null              | null                     |
| aula_desafio_alpha       | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| aula_desafio_alpha       | aula_id                | uuid                        | NO          | null              | null                     |
| aula_desafio_alpha       | descricao              | text                        | YES         | null              | null                     |
| aula_desafios            | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| aula_desafios            | aula_id                | uuid                        | YES         | null              | null                     |
| aula_desafios            | titulo                 | text                        | NO          | null              | null                     |
| aula_desafios            | descricao              | text                        | YES         | null              | null                     |
| aula_desafios            | publico_alvo           | text                        | YES         | 'aluno'::text     | null                     |
| aula_desafios            | criterios_avaliacao    | text                        | YES         | null              | null                     |
| aula_desafios            | criado_em              | timestamp without time zone | YES         | now()             | null                     |
| aula_feedback            | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| aula_feedback            | aula_id                | uuid                        | NO          | null              | null                     |
| aula_feedback            | professor_id           | uuid                        | NO          | null              | null                     |
| aula_feedback            | texto                  | text                        | YES         | null              | null                     |
| aula_feedback            | created_at             | timestamp without time zone | YES         | CURRENT_TIMESTAMP | null                     |
| aula_feedbacks           | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| aula_feedbacks           | aula_id                | uuid                        | YES         | null              | null                     |
| aula_feedbacks           | professor_id           | uuid                        | YES         | null              | null                     |
| aula_feedbacks           | texto                  | text                        | YES         | null              | null                     |
| aula_feedbacks           | criado_em              | timestamp without time zone | YES         | now()             | null                     |
| aula_materiais           | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| aula_materiais           | aula_id                | uuid                        | YES         | null              | null                     |
| aula_materiais           | tipo                   | text                        | YES         | null              | null                     |
| aula_materiais           | descricao              | text                        | YES         | null              | null                     |
| aula_materiais           | url                    | text                        | NO          | null              | null                     |
| aula_permissoes          | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| aula_permissoes          | aula_id                | uuid                        | YES         | null              | null                     |
| aula_permissoes          | professor_id           | uuid                        | YES         | null              | null                     |
| aula_permissoes          | visivel_para_professor | boolean                     | YES         | false             | null                     |
| aula_permissoes          | visivel_para_aluno     | boolean                     | YES         | false             | null                     |
| aula_registros           | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| aula_registros           | aula_id                | uuid                        | YES         | null              | null                     |
| aula_registros           | tipo                   | text                        | YES         | null              | null                     |
| aula_registros           | url                    | text                        | YES         | null              | null                     |
| aula_status_log          | id                     | uuid                        | NO          | gen_random_uuid() | null                     |
| aula_status_log          | aula_id                | uuid                        | YES         | null              | null                     |

-- 🔗 Relacionamentos e chaves estrangeiras
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public'
ORDER BY tc.table_name;

| constraint_name                                     | table_name                 | column_name           | foreign_table_name     | foreign_column_name |
| --------------------------------------------------- | -------------------------- | --------------------- | ---------------------- | ------------------- |
| achievements_progress_user_id_fkey                  | achievements_progress      | user_id               | profiles               | id                  |
| achievements_progress_achievement_id_fkey           | achievements_progress      | achievement_id        | achievements           | id                  |
| admins_id_fkey                                      | admins                     | id                    | profiles               | id                  |
| alunos_turma_principal_id_fkey                      | alunos                     | turma_principal_id    | turmas                 | id                  |
| alunos_instrumento_id_fkey                          | alunos                     | instrumento_id        | instrumentos           | id                  |
| fk_aluno_profile                                    | alunos                     | id                    | profiles               | id                  |
| audit_activities_user_id_fkey                       | audit_activities           | user_id               | profiles               | id                  |
| aula_atividades_aula_id_fkey                        | aula_atividades            | aula_id               | aulas                  | id                  |
| aula_checklist_aula_id_fkey                         | aula_checklist             | aula_id               | aulas                  | id                  |
| aula_criterios_avaliacao_aula_id_fkey               | aula_criterios_avaliacao   | aula_id               | aulas                  | id                  |
| aula_desafio_alpha_aula_id_fkey                     | aula_desafio_alpha         | aula_id               | aulas                  | id                  |
| aula_desafios_aula_id_fkey                          | aula_desafios              | aula_id               | aulas                  | id                  |
| aula_feedback_professor_id_fkey                     | aula_feedback              | professor_id          | profiles               | id                  |
| aula_feedback_aula_id_fkey                          | aula_feedback              | aula_id               | aulas                  | id                  |
| aula_feedbacks_aula_id_fkey                         | aula_feedbacks             | aula_id               | aulas                  | id                  |
| aula_materiais_aula_id_fkey                         | aula_materiais             | aula_id               | aulas                  | id                  |
| aula_permissoes_aula_id_fkey                        | aula_permissoes            | aula_id               | aulas                  | id                  |
| aula_registros_aula_id_fkey                         | aula_registros             | aula_id               | aulas                  | id                  |
| aula_status_log_aula_id_fkey                        | aula_status_log            | aula_id               | aulas                  | id                  |
| aula_status_log_alterado_por_fkey                   | aula_status_log            | alterado_por          | profiles               | id                  |
| aula_tags_aula_id_fkey                              | aula_tags                  | aula_id               | aulas                  | id                  |
| aulas_responsavel_id_fkey                           | aulas                      | responsavel_id        | usuarios               | id                  |
| cessoes_instrumentos_instrumento_fisico_id_fkey     | cessoes_instrumentos       | instrumento_fisico_id | instrumentos_fisicos   | id                  |
| cessoes_instrumentos_aluno_id_fkey                  | cessoes_instrumentos       | aluno_id              | alunos                 | id                  |
| cessoes_instrumentos_responsavel_entrega_fkey       | cessoes_instrumentos       | responsavel_entrega   | professores            | id                  |
| cessoes_instrumentos_responsavel_devolucao_fkey     | cessoes_instrumentos       | responsavel_devolucao | professores            | id                  |
| historico_instrumentos_instrumento_fisico_id_fkey   | historico_instrumentos     | instrumento_fisico_id | instrumentos_fisicos   | id                  |
| historico_instrumentos_aluno_afetado_id_fkey        | historico_instrumentos     | aluno_afetado_id      | alunos                 | id                  |
| hook_cache_user_id_fkey                             | hook_cache                 | user_id               | profiles               | id                  |
| instrumento_curiosidades_instrumento_id_fkey        | instrumento_curiosidades   | instrumento_id        | instrumentos           | id                  |
| instrumento_midias_instrumento_id_fkey              | instrumento_midias         | instrumento_id        | instrumentos           | id                  |
| instrumento_performances_instrumento_id_fkey        | instrumento_performances   | instrumento_id        | instrumentos           | id                  |
| instrumento_quiz_instrumento_id_fkey                | instrumento_quiz           | instrumento_id        | instrumentos           | id                  |
| instrumento_sons_instrumento_id_fkey                | instrumento_sons           | instrumento_id        | instrumentos           | id                  |
| instrumento_sons_variacoes_som_id_fkey              | instrumento_sons_variacoes | som_id                | instrumento_sons       | id                  |
| instrumento_tecnicas_instrumento_id_fkey            | instrumento_tecnicas       | instrumento_id        | instrumentos           | id                  |
| instrumentos_alunos_aluno_id_fkey                   | instrumentos_alunos        | aluno_id              | alunos                 | id                  |
| instrumentos_alunos_instrumento_id_fkey             | instrumentos_alunos        | instrumento_id        | instrumentos           | id                  |
| instrumentos_fisicos_instrumento_id_fkey            | instrumentos_fisicos       | instrumento_id        | instrumentos           | id                  |
| instrumentos_relacionados_instrumento_id_fkey       | instrumentos_relacionados  | instrumento_id        | instrumentos           | id                  |
| instrumentos_relacionados_relacionado_id_fkey       | instrumentos_relacionados  | relacionado_id        | instrumentos           | id                  |
| lessons_module_id_fkey                              | lessons                    | module_id             | modules                | id                  |
| manutencoes_instrumentos_instrumento_fisico_id_fkey | manutencoes_instrumentos   | instrumento_fisico_id | instrumentos_fisicos   | id                  |
| matriculas_aluno_id_fkey                            | matriculas                 | aluno_id              | alunos                 | id                  |
| matriculas_turma_id_fkey                            | matriculas                 | turma_id              | turmas                 | id                  |
| presencas_matricula_id_fkey                         | presencas                  | matricula_id          | matriculas             | id                  |
| professor_instrumentos_professor_id_fkey            | professor_instrumentos     | professor_id          | professores            | id                  |
| professor_instrumentos_instrumento_id_fkey          | professor_instrumentos     | instrumento_id        | instrumentos           | id                  |
| fk_professor_profile                                | professores                | id                    | profiles               | id                  |
| professores_conteudos_categoria_id_fkey             | professores_conteudos      | categoria_id          | professores_categorias | id                  |
| qr_codes_created_by_fkey                            | qr_codes                   | created_by            | profiles               | id                  |
| qr_codes_aula_id_fkey                               | qr_codes                   | aula_id               | aulas                  | id                  |
| qr_codes_instrument_id_fkey                         | qr_codes                   | instrument_id         | instrumentos           | id                  |
| qr_scans_qr_code_id_fkey                            | qr_scans                   | qr_code_id            | qr_codes               | id                  |
| qr_scans_user_id_fkey                               | qr_scans                   | user_id               | profiles               | id                  |
| role_permissions_permission_id_fkey                 | role_permissions           | permission_id         | permissions            | id                  |
| role_permissions_role_id_fkey                       | role_permissions           | role_id               | roles                  | id                  |
| turma_alunos_turma_id_fkey                          | turma_alunos               | turma_id              | turmas                 | id                  |
| turma_alunos_aluno_id_fkey                          | turma_alunos               | aluno_id              | usuarios               | id                  |
| turmas_professor_id_fkey                            | turmas                     | professor_id          | professores            | id                  |
| turmas_instrumento_id_fkey                          | turmas                     | instrumento_id        | instrumentos           | id                  |
| user_achievements_achievement_id_fkey               | user_achievements          | achievement_id        | achievements           | id                  |
| user_devotional_progress_devotional_id_fkey         | user_devotional_progress   | devotional_id         | devotional_content     | id                  |
| user_notifications_user_id_fkey                     | user_notifications         | user_id               | profiles               | id                  |
| user_points_log_user_id_fkey                        | user_points_log            | user_id               | profiles               | id                  |
| user_points_log_aula_id_fkey                        | user_points_log            | aula_id               | aulas                  | id                  |
| user_progress_lesson_id_fkey                        | user_progress              | lesson_id             | lessons                | id                  |
| user_roles_granted_by_fkey                          | user_roles                 | granted_by            | profiles               | id                  |
| user_roles_user_id_fkey                             | user_roles                 | user_id               | profiles               | id                  |

-- ========================================
-- 2️⃣ ANÁLISE DE USUÁRIOS E AUTENTICAÇÃO
-- ========================================

-- 👥 Contar usuários totais por status
SELECT 
    COUNT(*) as total_usuarios,
    COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as usuarios_confirmados,
    COUNT(CASE WHEN email_confirmed_at IS NULL THEN 1 END) as usuarios_pendentes
FROM auth.users;


| total_usuarios | usuarios_confirmados | usuarios_pendentes |
| -------------- | -------------------- | ------------------ |
| 26             | 23                   | 3                  |

-- 👤 Últimos usuários cadastrados
SELECT 
    id,
    email,
    created_at,
    email_confirmed_at,
    last_sign_in_at
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 20;


| id                                   | email                           | created_at                    | email_confirmed_at            | last_sign_in_at               |
| ------------------------------------ | ------------------------------- | ----------------------------- | ----------------------------- | ----------------------------- |
| e64310ba-69bb-41e5-8174-b8d52432f735 | cavalcante.karen@hotmail.com    | 2025-07-01 16:50:59.550148+00 | 2025-07-01 16:51:19.047897+00 | 2025-07-01 16:51:19.053424+00 |
| 46e25388-417a-4d84-9f3d-fb59c804304d | rabelodamanivalda@gmail.com     | 2025-06-21 16:48:50.607924+00 | 2025-06-21 16:49:05.531348+00 | 2025-06-21 16:49:26.564972+00 |
| ae514bfc-c915-473d-bb40-de3b0323e79e | jomigas30@gmail.com             | 2025-06-20 01:21:07.760718+00 | 2025-06-20 01:28:00.495016+00 | 2025-06-20 01:36:55.643425+00 |
| a5f0b00a-4c68-4c01-b459-ea55d3ab6907 | ph1goleiro@gmail.com            | 2025-06-19 15:18:01.174011+00 | 2025-06-19 15:19:41.285892+00 | 2025-06-28 19:02:43.179441+00 |
| 9bbcbdbd-b478-43ab-afa5-ddec11d3a63c | malu.apfernandes23@gmail.com    | 2025-06-14 15:32:26.287695+00 | 2025-06-14 15:33:06.462024+00 | 2025-08-08 00:58:03.216845+00 |
| 550a3a3f-9898-4e9c-b620-dd4b6ebaa8c4 | cavalcante.gustavo@hotmail.com  | 2025-06-11 01:02:14.154476+00 | 2025-06-11 01:08:47.947963+00 | 2025-06-11 01:08:51.284909+00 |
| 07f4a049-faf4-4852-8512-6ef64f2966ff | larissa.nunesds0505@gmail.com   | 2025-06-11 00:50:26.879006+00 | 2025-06-11 00:51:20.909776+00 | 2025-06-11 00:59:33.39298+00  |
| 953666c4-4b76-4d52-8332-6be7323c0f55 | gianne.formis@gmail.com         | 2025-06-09 20:16:03.832046+00 | 2025-06-09 20:16:54.256153+00 | 2025-06-09 20:17:03.494566+00 |
| 1dc09e87-282c-47a9-b0b8-6f84d79f300c | monicaquagliarelo@gmail.com     | 2025-06-09 20:11:56.983797+00 | 2025-06-10 21:22:52.765939+00 | 2025-07-01 16:50:33.470844+00 |
| 491b7c68-00d0-4154-adb7-80fcb73a72e4 | oticastatymello@gmail.com       | 2025-06-09 19:45:22.301244+00 | null                          | null                          |
| 7558a9c8-67c7-4c88-968e-f6a5e193d48c | tgjphotos@gmail.com             | 2025-06-09 17:11:05.927293+00 | 2025-06-09 17:12:32.072315+00 | 2025-09-20 11:42:17.324482+00 |
| 509052e4-5f3a-41df-bf48-f46b6f3cc108 | junior_sax@hotmail.com          | 2025-06-09 16:00:37.991955+00 | 2025-06-09 16:06:53.641595+00 | 2025-09-19 12:36:48.587485+00 |
| 41f409ee-1614-4bc6-8cce-a02086601dc9 | nilsondepereira@gmail.com       | 2025-05-31 01:41:53.970073+00 | 2025-05-31 01:42:13.42973+00  | 2025-05-31 01:42:26.86463+00  |
| 5e31da6f-9ce6-4345-a056-efc5719039f0 | priscilasouza.musica@gmail.com  | 2025-05-30 13:18:25.529455+00 | 2025-05-30 13:20:04.554624+00 | 2025-05-30 13:43:48.958361+00 |
| 229c0858-c758-4993-abb3-cb7d13b01b76 | silasdiego49@gmail.com          | 2025-05-29 18:30:33.111767+00 | 2025-05-29 18:31:27.549623+00 | 2025-05-29 18:31:27.553335+00 |
| 4d0b00fd-dbb6-4941-9093-61ab7d7b1122 | reinaldo23carla@gmail.com       | 2025-05-29 15:07:38.528604+00 | null                          | null                          |
| 5697f078-c2f5-4da6-bb6c-db9ec9764d41 | jessica.silva23101108@gmail.com | 2025-05-29 14:35:35.382339+00 | 2025-05-29 14:35:54.342196+00 | 2025-05-29 14:35:54.346477+00 |
| c91f1974-e102-46dd-b1c3-ba3f06c039af | bbacelar05@gmail.com            | 2025-05-29 13:26:14.291021+00 | 2025-05-29 13:26:38.501819+00 | 2025-05-31 13:39:22.347321+00 |
| b37a40d9-ba6c-465f-abfc-c441b47edb4d | mleonoroliver@gmail.com         | 2025-05-28 03:45:05.105614+00 | null                          | null                          |
| 1f63bfc3-62d7-48cb-b497-6699cb7d2037 | barrosmariana708@gmail.com      | 2025-05-28 00:36:11.827381+00 | 2025-05-28 00:36:58.917526+00 | 2025-05-28 00:37:13.043721+00 |

-- 🎭 Roles/Perfis de usuários (se existir tabela profiles)
SELECT 
    table_name
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND (table_name LIKE '%profile%' OR table_name LIKE '%user%' OR table_name LIKE '%role%');

    | table_name               |
| ------------------------ |
| user_devotional_progress |
| user_achievements        |
| user_points_log          |
| user_roles               |
| view_user_gamification   |
| profiles                 |
| user_notifications       |
| user_progress            |
| role_permissions         |
| roles                    |

-- ========================================
-- 3️⃣ ANÁLISE DE DADOS EDUCACIONAIS
-- ========================================

-- 📚 Buscar tabelas relacionadas a aulas/cursos
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name AND table_schema = 'public') as num_colunas
FROM information_schema.tables t
WHERE table_schema = 'public' 
    AND (table_name LIKE '%aula%' 
         OR table_name LIKE '%curso%' 
         OR table_name LIKE '%lesson%' 
         OR table_name LIKE '%class%'
         OR table_name LIKE '%instrumento%'
         OR table_name LIKE '%instrument%')
ORDER BY table_name;


| table_name                            | num_colunas |
| ------------------------------------- | ----------- |
| aula_atividades                       | 4           |
| aula_checklist                        | 5           |
| aula_criterios_avaliacao              | 3           |
| aula_desafio_alpha                    | 3           |
| aula_desafios                         | 7           |
| aula_feedback                         | 5           |
| aula_feedbacks                        | 5           |
| aula_materiais                        | 5           |
| aula_permissoes                       | 5           |
| aula_registros                        | 4           |
| aula_status_log                       | 5           |
| aula_tags                             | 4           |
| aulas                                 | 14          |
| cessoes_instrumentos                  | 15          |
| historico_instrumentos                | 7           |
| instrumento_curiosidades              | 9           |
| instrumento_midias                    | 18          |
| instrumento_performances              | 14          |
| instrumento_quiz                      | 15          |
| instrumento_sons                      | 11          |
| instrumento_sons_variacoes            | 10          |
| instrumento_tecnicas                  | 14          |
| instrumentos                          | 16          |
| instrumentos_alunos                   | 11          |
| instrumentos_fisicos                  | 15          |
| instrumentos_relacionados             | 7           |
| lessons                               | 16          |
| manutencoes_instrumentos              | 14          |
| professor_instrumentos                | 8           |
| view_aulas_admin                      | 13          |
| view_aulas_aluno                      | 5           |
| view_aulas_professor                  | 9           |
| vw_violino_instrumento_sons           | 11          |
| vw_violino_instrumento_sons_variacoes | 10          |
| vw_violino_instrumentos               | 16          |
| vw_violino_instrumentos_relacionados  | 9           |

-- 🎵 Buscar tabelas relacionadas a instrumentos
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name AND table_schema = 'public') as num_colunas
FROM information_schema.tables t
WHERE table_schema = 'public' 
    AND (table_name LIKE '%instrument%' OR table_name LIKE '%instrumento%')
ORDER BY table_name;

| table_name                            | num_colunas |
| ------------------------------------- | ----------- |
| cessoes_instrumentos                  | 15          |
| historico_instrumentos                | 7           |
| instrumento_curiosidades              | 9           |
| instrumento_midias                    | 18          |
| instrumento_performances              | 14          |
| instrumento_quiz                      | 15          |
| instrumento_sons                      | 11          |
| instrumento_sons_variacoes            | 10          |
| instrumento_tecnicas                  | 14          |
| instrumentos                          | 16          |
| instrumentos_alunos                   | 11          |
| instrumentos_fisicos                  | 15          |
| instrumentos_relacionados             | 7           |
| manutencoes_instrumentos              | 14          |
| professor_instrumentos                | 8           |
| vw_violino_instrumento_sons           | 11          |
| vw_violino_instrumento_sons_variacoes | 10          |
| vw_violino_instrumentos               | 16          |
| vw_violino_instrumentos_relacionados  | 9           |

-- 📈 Buscar tabelas relacionadas a progresso/gamificação
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name AND table_schema = 'public') as num_colunas
FROM information_schema.tables t
WHERE table_schema = 'public' 
    AND (table_name LIKE '%progress%' 
         OR table_name LIKE '%progresso%'
         OR table_name LIKE '%achievement%'
         OR table_name LIKE '%conquista%'
         OR table_name LIKE '%score%'
         OR table_name LIKE '%point%'
         OR table_name LIKE '%level%'
         OR table_name LIKE '%nivel%')
ORDER BY table_name;

| table_name               | num_colunas |
| ------------------------ | ----------- |
| achievements             | 11          |
| achievements_progress    | 10          |
| user_achievements        | 5           |
| user_devotional_progress | 6           |
| user_points_log          | 10          |
| user_progress            | 9           |

-- 👨‍🏫 Buscar tabelas relacionadas a professores/turmas
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name AND table_schema = 'public') as num_colunas
FROM information_schema.tables t
WHERE table_schema = 'public' 
    AND (table_name LIKE '%professor%' 
         OR table_name LIKE '%teacher%'
         OR table_name LIKE '%turma%'
         OR table_name LIKE '%class%'
         OR table_name LIKE '%student%'
         OR table_name LIKE '%aluno%')
ORDER BY table_name;

| table_name                  | num_colunas |
| --------------------------- | ----------- |
| alunos                      | 9           |
| instrumentos_alunos         | 11          |
| professor_instrumentos      | 8           |
| professores                 | 6           |
| professores_categorias      | 8           |
| professores_conteudos       | 21          |
| professores_dashboard_stats | 10          |
| turma_alunos                | 3           |
| turmas                      | 21          |
| view_aulas_aluno            | 5           |
| view_aulas_professor        | 9           |
| view_professor_dashboard    | 11          |

-- ========================================
-- 4️⃣ CONTAGEM DE REGISTROS POR TABELA
-- ========================================

-- 📊 Esta query precisa ser adaptada baseada nas tabelas encontradas acima
-- Execute depois de identificar as tabelas principais

-- Exemplo de como contar registros (adapte os nomes):
/*
SELECT 'usuarios' as tabela, COUNT(*) as total FROM auth.users
UNION ALL
SELECT 'profiles', COUNT(*) FROM profiles
UNION ALL  
SELECT 'aulas', COUNT(*) FROM aulas
UNION ALL
SELECT 'instrumentos', COUNT(*) FROM instrumentos
ORDER BY total DESC;
*/

-- ========================================
-- 5️⃣ ANÁLISE DE DADOS ESPECÍFICOS
-- ========================================

-- 🔍 Verificar se existem dados de exemplo/teste
-- Execute para cada tabela principal encontrada:

-- Exemplo para tabela de usuários (se profiles existir):
/*
SELECT * FROM profiles LIMIT 10;
*/

-- Exemplo para tabela de aulas:
/*
SELECT * FROM aulas ORDER BY created_at DESC LIMIT 10;
*/

-- Exemplo para tabela de instrumentos:
/*
SELECT * FROM instrumentos LIMIT 10;
*/

-- ========================================
-- 6️⃣ VERIFICAÇÃO DE POLÍTICAS RLS
-- ========================================

-- 🔒 Verificar Row Level Security
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

| schemaname | tablename                  | rowsecurity |
| ---------- | -------------------------- | ----------- |
| public     | achievements               | true        |
| public     | achievements_progress      | true        |
| public     | admins                     | true        |
| public     | alunos                     | true        |
| public     | audit_activities           | true        |
| public     | aula_atividades            | true        |
| public     | aula_checklist             | true        |
| public     | aula_criterios_avaliacao   | true        |
| public     | aula_desafio_alpha         | true        |
| public     | aula_desafios              | true        |
| public     | aula_feedback              | true        |
| public     | aula_feedbacks             | true        |
| public     | aula_materiais             | true        |
| public     | aula_permissoes            | true        |
| public     | aula_registros             | true        |
| public     | aula_status_log            | true        |
| public     | aula_tags                  | true        |
| public     | aulas                      | true        |
| public     | cessoes_instrumentos       | true        |
| public     | devotional_content         | true        |
| public     | historico_instrumentos     | true        |
| public     | hook_cache                 | true        |
| public     | instrumento_curiosidades   | true        |
| public     | instrumento_midias         | true        |
| public     | instrumento_performances   | true        |
| public     | instrumento_quiz           | true        |
| public     | instrumento_sons           | true        |
| public     | instrumento_sons_variacoes | true        |
| public     | instrumento_tecnicas       | true        |
| public     | instrumentos               | true        |
| public     | instrumentos_alunos        | true        |
| public     | instrumentos_fisicos       | true        |
| public     | instrumentos_relacionados  | true        |
| public     | lessons                    | true        |
| public     | logos                      | true        |
| public     | manutencoes_instrumentos   | true        |
| public     | matriculas                 | true        |
| public     | migration_log              | true        |
| public     | modules                    | true        |
| public     | modulos                    | true        |
| public     | permission_templates       | true        |
| public     | permissions                | true        |
| public     | presencas                  | true        |
| public     | professor_instrumentos     | true        |
| public     | professores                | true        |
| public     | professores_categorias     | true        |
| public     | professores_conteudos      | true        |
| public     | profiles                   | true        |
| public     | qr_codes                   | true        |
| public     | qr_scans                   | true        |
| public     | role_permissions           | true        |
| public     | roles                      | true        |
| public     | trigger_logs               | true        |
| public     | turma_alunos               | true        |
| public     | turmas                     | true        |
| public     | user_achievements          | true        |
| public     | user_devotional_progress   | true        |
| public     | user_notifications         | true        |
| public     | user_points_log            | true        |
| public     | user_progress              | true        |
| public     | user_roles                 | true        |
| public     | usuarios                   | true        |

-- 📋 Listar políticas existentes
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

| schemaname | tablename                  | policyname                                           | permissive | roles           | cmd    | qual                                                                                                                                                                                                                                                                                                                                       |
| ---------- | -------------------------- | ---------------------------------------------------- | ---------- | --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| public     | achievements               | Achievements are viewable by everyone                | PERMISSIVE | {public}        | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | achievements               | Anyone can view public achievements                  | PERMISSIVE | {public}        | SELECT | (is_active = true)                                                                                                                                                                                                                                                                                                                         |
| public     | achievements_progress      | achievements_progress_access                         | PERMISSIVE | {authenticated} | ALL    | ((user_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                            |
| public     | admins                     | admins_full_access                                   | PERMISSIVE | {authenticated} | ALL    | (EXISTS ( SELECT 1
   FROM admins admins_1
  WHERE ((admins_1.id = auth.uid()) AND (admins_1.ativo = true))))                                                                                                                                                                                                                              |
| public     | alunos                     | estudantes_own_data                                  | PERMISSIVE | {authenticated} | ALL    | (auth.uid() = id)                                                                                                                                                                                                                                                                                                                          |
| public     | audit_activities           | admin_full_access_audit                              | PERMISSIVE | {authenticated} | ALL    | ((detect_user_role(auth.uid()) ->> 'role'::text) = 'admin'::text)                                                                                                                                                                                                                                                                          |
| public     | aula_atividades            | aula_atividades_access                               | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       |
| public     | aula_checklist             | aula_checklist_access                                | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      |
| public     | aula_criterios_avaliacao   | aula_criterios_avaliacao_access                      | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      |
| public     | aula_desafio_alpha         | aula_desafio_alpha_access                            | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       |
| public     | aula_desafios              | aula_desafios_access                                 | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       |
| public     | aula_feedback              | aula_feedback_access                                 | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       |
| public     | aula_feedbacks             | aula_feedbacks_access                                | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       |
| public     | aula_materiais             | aula_materiais_access                                | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       |
| public     | aula_permissoes            | aula_permissoes_admin                                | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      |
| public     | aula_registros             | aula_registros_access                                | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM matriculas m
  WHERE (m.aluno_id = auth.uid()))))                                       |
| public     | aula_status_log            | aula_status_log_staff                                | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      |
| public     | aula_tags                  | aula_tags_read                                       | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | aulas                      | aulas_modify_staff                                   | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      |
| public     | aulas                      | aulas_read_all                                       | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | cessoes_instrumentos       | cessoes_instrumentos_access                          | PERMISSIVE | {authenticated} | ALL    | ((aluno_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                           |
| public     | devotional_content         | Anyone can view published devotionals                | PERMISSIVE | {public}        | SELECT | (is_published = true)                                                                                                                                                                                                                                                                                                                      |
| public     | devotional_content         | Published devotional content is viewable by everyone | PERMISSIVE | {public}        | SELECT | (is_published = true)                                                                                                                                                                                                                                                                                                                      |
| public     | historico_instrumentos     | historico_instrumentos_access                        | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      |
| public     | hook_cache                 | users_own_cache                                      | PERMISSIVE | {authenticated} | ALL    | (user_id = auth.uid())                                                                                                                                                                                                                                                                                                                     |
| public     | instrumento_curiosidades   | instrumento_curiosidades_read                        | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | instrumento_midias         | instrumento_midias_read                              | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | instrumento_performances   | instrumento_performances_read                        | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | instrumento_quiz           | instrumento_quiz_read                                | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | instrumento_sons           | instrumento_sons_read                                | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | instrumento_sons_variacoes | instrumento_sons_variacoes_read                      | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | instrumento_tecnicas       | instrumento_tecnicas_read                            | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | instrumentos               | instrumentos_modify_staff                            | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      |
| public     | instrumentos               | instrumentos_read_all                                | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | instrumentos_alunos        | instrumentos_alunos_access                           | PERMISSIVE | {authenticated} | ALL    | ((aluno_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                           |
| public     | instrumentos_fisicos       | instrumentos_fisicos_access                          | PERMISSIVE | {authenticated} | ALL    | true                                                                                                                                                                                                                                                                                                                                       |
| public     | instrumentos_relacionados  | instrumentos_relacionados_read                       | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | lessons                    | Anyone can view lessons from active modules          | PERMISSIVE | {public}        | SELECT | (EXISTS ( SELECT 1
   FROM modules
  WHERE ((modules.id = lessons.module_id) AND (modules.is_active = true))))                                                                                                                                                                                                                             |
| public     | lessons                    | Authenticated users can manage lessons               | PERMISSIVE | {public}        | ALL    | (auth.role() = 'authenticated'::text)                                                                                                                                                                                                                                                                                                      |
| public     | lessons                    | Lessons are viewable by everyone                     | PERMISSIVE | {public}        | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | lessons                    | Only admins can modify lessons                       | PERMISSIVE | {public}        | ALL    | ((auth.jwt() ->> 'role'::text) = 'admin'::text)                                                                                                                                                                                                                                                                                            |
| public     | logos                      | logos_modify_admin                                   | PERMISSIVE | {authenticated} | ALL    | (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true))))                                                                                                                                                                                                                                           |
| public     | logos                      | logos_read_all                                       | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | manutencoes_instrumentos   | manutencoes_instrumentos_access                      | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      |
| public     | matriculas                 | matriculas_access                                    | PERMISSIVE | {authenticated} | ALL    | ((aluno_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                           |
| public     | migration_log              | migration_log_admin_only                             | PERMISSIVE | {authenticated} | ALL    | (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true))))                                                                                                                                                                                                                                           |
| public     | modules                    | Anyone can view active modules                       | PERMISSIVE | {public}        | SELECT | (is_active = true)                                                                                                                                                                                                                                                                                                                         |
| public     | modules                    | Authenticated users can manage modules               | PERMISSIVE | {public}        | ALL    | (auth.role() = 'authenticated'::text)                                                                                                                                                                                                                                                                                                      |
| public     | modules                    | Modules are viewable by everyone                     | PERMISSIVE | {public}        | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | modules                    | Only admins can modify modules                       | PERMISSIVE | {public}        | ALL    | ((auth.jwt() ->> 'role'::text) = 'admin'::text)                                                                                                                                                                                                                                                                                            |
| public     | modules                    | modules_modify_staff                                 | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      |
| public     | modules                    | modules_read_all                                     | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | modulos                    | modulos_modify_staff                                 | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      |
| public     | modulos                    | modulos_read_all                                     | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | permission_templates       | permission_templates_admin_only                      | PERMISSIVE | {authenticated} | ALL    | (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true))))                                                                                                                                                                                                                                           |
| public     | permissions                | Allow admin full access                              | PERMISSIVE | {public}        | ALL    | is_admin(auth.uid())                                                                                                                                                                                                                                                                                                                       |
| public     | permissions                | Allow authenticated read access                      | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | presencas                  | presencas_access                                     | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM matriculas m
  WHERE ((m.id = presencas.matricula_id) AND (m.aluno_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true))))) |
| public     | professor_instrumentos     | professor_instrumentos_access                        | PERMISSIVE | {authenticated} | ALL    | ((professor_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))))                                                                                                                                                                                                          |
| public     | professores                | professores_own_data                                 | PERMISSIVE | {authenticated} | ALL    | (auth.uid() = id)                                                                                                                                                                                                                                                                                                                          |
| public     | professores_categorias     | Todos podem ver categorias                           | PERMISSIVE | {public}        | SELECT | (ativo = true)                                                                                                                                                                                                                                                                                                                             |
| public     | professores_conteudos      | Admins_podem_deletar                                 | PERMISSIVE | {public}        | DELETE | (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.tipo_usuario = ANY (ARRAY['pastor'::text, 'admin'::text])))))                                                                                                                                                                                        |
| public     | professores_conteudos      | Autores podem atualizar próprios conteúdos           | PERMISSIVE | {public}        | UPDATE | (auth.uid() = criado_por)                                                                                                                                                                                                                                                                                                                  |
| public     | professores_conteudos      | Autores podem deletar próprios conteúdos             | PERMISSIVE | {public}        | DELETE | (auth.uid() = criado_por)                                                                                                                                                                                                                                                                                                                  |
| public     | professores_conteudos      | Autores podem ver próprios conteúdos                 | PERMISSIVE | {public}        | SELECT | (auth.uid() = criado_por)                                                                                                                                                                                                                                                                                                                  |
| public     | professores_conteudos      | Conteudos_visivel_para_todos                         | PERMISSIVE | {public}        | SELECT | ((visivel = true) AND (ativo = true))                                                                                                                                                                                                                                                                                                      |
| public     | professores_conteudos      | Professores podem criar conteúdos                    | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       |
| public     | professores_conteudos      | Professores_podem_criar                              | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       |
| public     | professores_conteudos      | Todos podem ver conteúdos visíveis                   | PERMISSIVE | {public}        | SELECT | ((visivel = true) AND (ativo = true))                                                                                                                                                                                                                                                                                                      |
| public     | professores_conteudos      | Usuarios_editam_proprio_conteudo                     | PERMISSIVE | {public}        | UPDATE | ((criado_por = auth.uid()) OR (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.tipo_usuario = ANY (ARRAY['pastor'::text, 'admin'::text]))))))                                                                                                                                                         |
| public     | profiles                   | profiles_insert_service_simple                       | PERMISSIVE | {service_role}  | INSERT | null                                                                                                                                                                                                                                                                                                                                       |
| public     | profiles                   | profiles_insert_simple                               | PERMISSIVE | {authenticated} | INSERT | null                                                                                                                                                                                                                                                                                                                                       |
| public     | profiles                   | profiles_select_simple                               | PERMISSIVE | {authenticated} | SELECT | (auth.uid() = id)                                                                                                                                                                                                                                                                                                                          |
| public     | profiles                   | profiles_update_simple                               | PERMISSIVE | {authenticated} | UPDATE | (auth.uid() = id)                                                                                                                                                                                                                                                                                                                          |
| public     | qr_codes                   | admin_full_access_qr                                 | PERMISSIVE | {authenticated} | ALL    | ((detect_user_role(auth.uid()) ->> 'role'::text) = 'admin'::text)                                                                                                                                                                                                                                                                          |
| public     | qr_codes                   | professor_qr_codes                                   | PERMISSIVE | {authenticated} | ALL    | ((created_by = auth.uid()) OR has_permission(auth.uid(), 'qr.generate'::text))                                                                                                                                                                                                                                                             |
| public     | qr_scans                   | users_scan_qr                                        | PERMISSIVE | {authenticated} | INSERT | null                                                                                                                                                                                                                                                                                                                                       |
| public     | role_permissions           | Allow admin full access                              | PERMISSIVE | {public}        | ALL    | is_admin(auth.uid())                                                                                                                                                                                                                                                                                                                       |
| public     | role_permissions           | Allow authenticated read access                      | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | roles                      | Allow admin full access                              | PERMISSIVE | {public}        | ALL    | is_admin(auth.uid())                                                                                                                                                                                                                                                                                                                       |
| public     | roles                      | Allow authenticated read access                      | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | trigger_logs               | trigger_logs_admin_only                              | PERMISSIVE | {authenticated} | ALL    | (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true))))                                                                                                                                                                                                                                           |
| public     | turma_alunos               | turma_alunos_access                                  | PERMISSIVE | {authenticated} | ALL    | ((aluno_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                           |
| public     | turmas                     | turmas_modify_staff                                  | PERMISSIVE | {authenticated} | ALL    | ((EXISTS ( SELECT 1
   FROM admins
  WHERE ((admins.id = auth.uid()) AND (admins.ativo = true)))) OR (EXISTS ( SELECT 1
   FROM professores
  WHERE ((professores.id = auth.uid()) AND (professores.ativo = true)))))                                                                                                                      |
| public     | turmas                     | turmas_read_all                                      | PERMISSIVE | {authenticated} | SELECT | true                                                                                                                                                                                                                                                                                                                                       |
| public     | user_achievements          | Users can insert own achievements                    | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       |
| public     | user_achievements          | Users can insert their own achievements              | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       |
| public     | user_achievements          | Users can view own achievements                      | PERMISSIVE | {public}        | SELECT | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     |
| public     | user_achievements          | Users can view their own achievements                | PERMISSIVE | {public}        | SELECT | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     |
| public     | user_devotional_progress   | Users can insert own devotional progress             | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       |
| public     | user_devotional_progress   | Users can insert their own devotional progress       | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       |
| public     | user_devotional_progress   | Users can update their own devotional progress       | PERMISSIVE | {public}        | UPDATE | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     |
| public     | user_devotional_progress   | Users can view own devotional progress               | PERMISSIVE | {public}        | SELECT | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     |
| public     | user_devotional_progress   | Users can view their own devotional progress         | PERMISSIVE | {public}        | SELECT | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     |
| public     | user_notifications         | users_own_notifications                              | PERMISSIVE | {authenticated} | ALL    | (user_id = auth.uid())                                                                                                                                                                                                                                                                                                                     |
| public     | user_points_log            | users_own_points                                     | PERMISSIVE | {authenticated} | SELECT | (user_id = auth.uid())                                                                                                                                                                                                                                                                                                                     |
| public     | user_progress              | Users can insert their own progress                  | PERMISSIVE | {public}        | INSERT | null                                                                                                                                                                                                                                                                                                                                       |
| public     | user_progress              | Users can update their own progress                  | PERMISSIVE | {public}        | UPDATE | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     |
| public     | user_progress              | Users can view their own progress                    | PERMISSIVE | {public}        | SELECT | (auth.uid() = user_id)                                                                                                                                                                                                                                                                                                                     |
| public     | user_roles                 | admin_full_access_user_roles                         | PERMISSIVE | {authenticated} | ALL    | ((detect_user_role(auth.uid()) ->> 'role'::text) = 'admin'::text)                                                                                                                                                                                                                                                                          |


-- ========================================
-- 7️⃣ ANÁLISE DE PERFORMANCE
-- ========================================

-- 📈 Verificar índices existentes
SELECT 
    t.relname as table_name,
    i.relname as index_name,
    ix.indisprimary as is_primary,
    ix.indisunique as is_unique,
    array_to_string(array_agg(a.attname), ', ') as column_names
FROM pg_class t
JOIN pg_index ix ON t.oid = ix.indrelid
JOIN pg_class i ON i.oid = ix.indexrelid
JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ANY(ix.indkey)
WHERE t.relkind = 'r'
    AND t.relname NOT LIKE 'pg_%'
    AND i.relname NOT LIKE 'pg_%'
GROUP BY t.relname, i.relname, ix.indisprimary, ix.indisunique
ORDER BY t.relname, i.relname;

| table_name                 | index_name                                                  | is_primary | is_unique | column_names                      |
| -------------------------- | ----------------------------------------------------------- | ---------- | --------- | --------------------------------- |
| achievements               | achievements_pkey                                           | true       | true      | id                                |
| achievements               | idx_achievements_active                                     | false      | false     | is_active                         |
| achievements               | idx_achievements_category                                   | false      | false     | category                          |
| achievements               | idx_achievements_requirement_type                           | false      | false     | requirement_type                  |
| achievements_progress      | achievements_progress_pkey                                  | true       | true      | id                                |
| achievements_progress      | achievements_progress_user_id_achievement_id_key            | false      | true      | user_id, achievement_id           |
| achievements_progress      | idx_achievement_progress                                    | false      | false     | is_completed, user_id, updated_at |
| admins                     | admins_pkey                                                 | true       | true      | id                                |
| alunos                     | aluno_id_unique                                             | false      | true      | id                                |
| alunos                     | alunos_pkey                                                 | true       | true      | id                                |
| alunos                     | idx_alunos_instrumento                                      | false      | false     | instrumento_id                    |
| audit_activities           | audit_activities_pkey                                       | true       | true      | id                                |
| audit_activities           | idx_audit_action_time                                       | false      | false     | action, created_at                |
| audit_activities           | idx_audit_resource                                          | false      | false     | resource_id, resource             |
| audit_activities           | idx_audit_severity                                          | false      | false     | created_at, severity              |
| audit_activities           | idx_audit_user_time                                         | false      | false     | created_at, user_id               |
| audit_log_entries          | audit_log_entries_pkey                                      | true       | true      | id                                |
| audit_log_entries          | audit_logs_instance_id_idx                                  | false      | false     | instance_id                       |
| aula_atividades            | aula_atividades_pkey                                        | true       | true      | id                                |
| aula_atividades            | idx_aula_atividades_aula_id                                 | false      | false     | aula_id                           |
| aula_checklist             | aula_checklist_pkey                                         | true       | true      | id                                |
| aula_checklist             | idx_aula_checklist_aula_id                                  | false      | false     | aula_id                           |
| aula_criterios_avaliacao   | aula_criterios_avaliacao_pkey                               | true       | true      | id                                |
| aula_criterios_avaliacao   | idx_aula_criterios_aula_id                                  | false      | false     | aula_id                           |
| aula_desafio_alpha         | aula_desafio_alpha_pkey                                     | true       | true      | id                                |
| aula_desafio_alpha         | idx_aula_desafio_alpha_aula_id                              | false      | false     | aula_id                           |
| aula_desafios              | aula_desafios_pkey                                          | true       | true      | id                                |
| aula_desafios              | idx_aula_desafios_aula_id                                   | false      | false     | aula_id                           |
| aula_feedback              | aula_feedback_pkey                                          | true       | true      | id                                |
| aula_feedback              | idx_aula_feedback_aula_id                                   | false      | false     | aula_id                           |
| aula_feedbacks             | aula_feedbacks_pkey                                         | true       | true      | id                                |
| aula_feedbacks             | idx_aula_feedbacks_aula_id                                  | false      | false     | aula_id                           |
| aula_materiais             | aula_materiais_pkey                                         | true       | true      | id                                |
| aula_materiais             | idx_aula_materiais_aula_id                                  | false      | false     | aula_id                           |
| aula_permissoes            | aula_permissoes_pkey                                        | true       | true      | id                                |
| aula_permissoes            | idx_aula_permissoes_aula_id                                 | false      | false     | aula_id                           |
| aula_registros             | aula_registros_pkey                                         | true       | true      | id                                |
| aula_registros             | idx_aula_registros_aula_id                                  | false      | false     | aula_id                           |
| aula_status_log            | aula_status_log_pkey                                        | true       | true      | id                                |
| aula_status_log            | idx_aula_status_log_aula_id                                 | false      | false     | aula_id                           |
| aula_tags                  | aula_tags_pkey                                              | true       | true      | id                                |
| aula_tags                  | idx_aula_tags_aula_id                                       | false      | false     | aula_id                           |
| aulas                      | aulas_pkey                                                  | true       | true      | id                                |
| buckets                    | bname                                                       | false      | true      | name                              |
| buckets                    | buckets_pkey                                                | true       | true      | id                                |
| buckets_analytics          | buckets_analytics_pkey                                      | true       | true      | id                                |
| cessoes_instrumentos       | cessoes_instrumentos_pkey                                   | true       | true      | id                                |
| cessoes_instrumentos       | idx_cessoes_aluno_id                                        | false      | false     | aluno_id                          |
| cessoes_instrumentos       | idx_cessoes_data_inicio                                     | false      | false     | data_inicio                       |
| cessoes_instrumentos       | idx_cessoes_instrumento_fisico_id                           | false      | false     | instrumento_fisico_id             |
| devotional_content         | devotional_content_pkey                                     | true       | true      | id                                |
| devotional_content         | idx_devotional_content_category                             | false      | false     | category                          |
| devotional_content         | idx_devotional_content_published                            | false      | false     | is_published                      |
| devotional_content         | idx_devotional_content_published_date                       | false      | false     | published_date                    |
| flow_state                 | flow_state_created_at_idx                                   | false      | false     | created_at                        |
| flow_state                 | flow_state_pkey                                             | true       | true      | id                                |
| flow_state                 | idx_auth_code                                               | false      | false     | auth_code                         |
| flow_state                 | idx_user_id_auth_method                                     | false      | false     | authentication_method, user_id    |
| historico_instrumentos     | historico_instrumentos_pkey                                 | true       | true      | id                                |
| historico_instrumentos     | idx_historico_instrumento_fisico_id                         | false      | false     | instrumento_fisico_id             |
| hook_cache                 | hook_cache_cache_key_key                                    | false      | true      | cache_key                         |
| hook_cache                 | hook_cache_pkey                                             | true       | true      | id                                |
| hook_cache                 | idx_cache_cleanup                                           | false      | false     | expires_at                        |
| hook_cache                 | idx_cache_lookup                                            | false      | false     | cache_key, expires_at             |
| hook_cache                 | idx_cache_user_hook                                         | false      | false     | hook_name, user_id                |
| identities                 | identities_email_idx                                        | false      | false     | email                             |
| identities                 | identities_pkey                                             | true       | true      | id                                |
| identities                 | identities_provider_id_provider_unique                      | false      | true      | provider_id, provider             |
| identities                 | identities_user_id_idx                                      | false      | false     | user_id                           |
| instances                  | instances_pkey                                              | true       | true      | id                                |
| instrumento_curiosidades   | idx_instrumento_curiosidades_categoria                      | false      | false     | categoria                         |
| instrumento_curiosidades   | idx_instrumento_curiosidades_instrumento                    | false      | false     | instrumento_id                    |
| instrumento_curiosidades   | instrumento_curiosidades_pkey                               | true       | true      | id                                |
| instrumento_midias         | idx_instrumento_midias_categoria                            | false      | false     | categoria                         |
| instrumento_midias         | idx_instrumento_midias_instrumento                          | false      | false     | instrumento_id                    |
| instrumento_midias         | idx_instrumento_midias_tipo                                 | false      | false     | tipo                              |
| instrumento_midias         | instrumento_midias_pkey                                     | true       | true      | id                                |
| instrumento_performances   | idx_instrumento_performances_artista                        | false      | false     | artista                           |
| instrumento_performances   | idx_instrumento_performances_instrumento                    | false      | false     | instrumento_id                    |
| instrumento_performances   | instrumento_performances_pkey                               | true       | true      | id                                |
| instrumento_quiz           | idx_instrumento_quiz_instrumento                            | false      | false     | instrumento_id                    |
| instrumento_quiz           | idx_instrumento_quiz_tipo                                   | false      | false     | tipo_pergunta                     |
| instrumento_quiz           | instrumento_quiz_pkey                                       | true       | true      | id                                |
| instrumento_sons           | idx_instrumento_sons_instrumento                            | false      | false     | instrumento_id                    |
| instrumento_sons           | idx_instrumento_sons_tecnica                                | false      | false     | tecnica                           |
| instrumento_sons           | instrumento_sons_pkey                                       | true       | true      | id                                |
| instrumento_sons_variacoes | instrumento_sons_variacoes_pkey                             | true       | true      | id                                |
| instrumento_tecnicas       | idx_instrumento_tecnicas_instrumento                        | false      | false     | instrumento_id                    |
| instrumento_tecnicas       | idx_instrumento_tecnicas_nivel                              | false      | false     | nivel                             |
| instrumento_tecnicas       | idx_instrumento_tecnicas_tipo                               | false      | false     | tipo_tecnica                      |
| instrumento_tecnicas       | instrumento_tecnicas_pkey                                   | true       | true      | id                                |
| instrumentos               | idx_instrumentos_categoria                                  | false      | false     | categoria                         |
| instrumentos               | instrumentos_nome_key                                       | false      | true      | nome                              |
| instrumentos               | instrumentos_pkey                                           | true       | true      | id                                |
| instrumentos_alunos        | instrumentos_alunos_pkey                                    | true       | true      | id                                |
| instrumentos_fisicos       | instrumentos_fisicos_codigo_patrimonio_key                  | false      | true      | codigo_patrimonio                 |
| instrumentos_fisicos       | instrumentos_fisicos_pkey                                   | true       | true      | id                                |
| instrumentos_relacionados  | idx_instrumentos_relacionados_instrumento                   | false      | false     | instrumento_id                    |
| instrumentos_relacionados  | idx_instrumentos_relacionados_tipo                          | false      | false     | tipo_relacao                      |
| instrumentos_relacionados  | instrumentos_relacionados_instrumento_id_relacionado_id_key | false      | true      | relacionado_id, instrumento_id    |

-- ========================================
-- 8️⃣ DADOS REAIS ENCONTRADOS - PRÓXIMAS QUERIES
-- ========================================

-- 📊 CONTAGEM CONFIRMADA:
/*
| tabela       | total |
| ------------ | ----- |
| aulas        | 30    |
| profiles     | 25    |
| achievements | 24    |
| instrumentos | 24    |
| alunos       | 21    |
| professores  | 4     |
| turmas       | 3     |
*/

-- 🔧 QUERIES CORRIGIDAS - Execute estas:

-- 🎵 INSTRUMENTOS DISPONÍVEIS (correção da estrutura)
SELECT nome, categoria, ativo, criado_em FROM instrumentos ORDER BY nome LIMIT 10;

| nome                 | categoria | ativo | criado_em                  |
| -------------------- | --------- | ----- | -------------------------- |
| Baixo                | corda     | true  | 2025-05-30 00:04:22.250942 |
| Bateria              | percussao | true  | 2025-05-30 00:04:22.250942 |
| Canto                | vocal     | true  | 2025-06-07 12:30:07.547523 |
| Clarinete            | sopro     | true  | 2025-05-30 00:04:22.250942 |
| Contrabaixo Acústico | corda     | true  | 2025-05-30 00:04:22.250942 |
| Eufônio              | sopro     | true  | 2025-05-30 00:04:22.250942 |
| Fagote               | sopro     | true  | 2025-05-30 00:04:22.250942 |
| Flauta               | sopro     | true  | 2025-05-30 00:04:22.250942 |
| Guitarra             | corda     | true  | 2025-05-30 00:04:22.250942 |
| Oboé                 | sopro     | true  | 2025-05-30 00:04:22.250942 |

-- 📚 AULAS RECENTES (correção dos campos)
SELECT titulo, status, responsavel_id, criado_em FROM aulas ORDER BY criado_em DESC LIMIT 10;


| titulo                         | status        | responsavel_id | criado_em                 |
| ------------------------------ | ------------- | -------------- | ------------------------- |
| Oficina de Composição Coletiva | Em Preparação | null           | 2025-05-31 03:39:31.72478 |
| Semana Criativa                | Em Preparação | null           | 2025-05-31 03:39:31.72478 |
| Tecnologia na Música           | Em Preparação | null           | 2025-05-31 03:39:31.72478 |
| Improvisação Guiada            | Em Preparação | null           | 2025-05-31 03:39:31.72478 |
| Músicas do Japão               | Em Preparação | null           | 2025-05-31 03:39:31.72478 |
| Repertório Brasileiro II       | A Fazer       | null           | 2025-05-31 03:39:31.72478 |
| Revisão e Mostra de Grupos     | A Fazer       | null           | 2025-05-31 03:39:31.72478 |
| Aula Inaugural                 | Concluída     | null           | 2025-05-31 03:39:31.72478 |
| Iniciação Instrumental II      | Concluída     | null           | 2025-05-31 03:39:31.72478 |
| Harmonia na Prática            | Em Preparação | null           | 2025-05-31 03:39:31.72478 |

-- 👤 PROFILES COM INFORMAÇÕES (correção dos campos)
SELECT nome, email, criado_em FROM profiles ORDER BY criado_em DESC LIMIT 10;

ERROR:  42703: column "criado_em" does not exist
LINE 1: SELECT nome, email, criado_em FROM profiles ORDER BY criado_em DESC LIMIT 10;
                            ^

-- 🎭 VERIFICAR ROLES DOS USUÁRIOS
SELECT * FROM user_roles LIMIT 10;

| id                                   | user_id                              | role_type | role_level | permissions | granted_by | granted_at                    | expires_at | is_active | metadata | created_at                    | updated_at                    |
| ------------------------------------ | ------------------------------------ | --------- | ---------- | ----------- | ---------- | ----------------------------- | ---------- | --------- | -------- | ----------------------------- | ----------------------------- |
| ad4b1e1d-86a2-4dd2-b163-5fb0c1e3ea21 | 2becf8d3-866a-4948-a4dd-d80395372ce1 | admin     | 4          | {}          | null       | 2025-06-22 13:34:17.309904+00 | null       | true      | {}       | 2025-06-22 13:34:17.309904+00 | 2025-06-22 13:34:17.309904+00 |
| 4979f440-cf1a-4ca8-9143-2f23ac97d014 | 840f99c4-7479-4098-9c2e-474a695178f0 | estudante | 1          | {}          | null       | 2025-06-22 13:35:04.19275+00  | null       | true      | {}       | 2025-06-22 13:35:04.19275+00  | 2025-06-22 13:35:04.19275+00  |
| 683eb907-5fbf-433c-9b75-f6acbd3f1ebf | 9064ab32-12ce-415a-8c19-51b566608ee5 | estudante | 1          | {}          | null       | 2025-06-22 13:35:04.19275+00  | null       | true      | {}       | 2025-06-22 13:35:04.19275+00  | 2025-06-22 13:35:04.19275+00  |
| 8a52d8c7-d6df-4902-b44a-40b64bbea26b | a57eeb22-a246-4243-8e32-98297c6f3bad | estudante | 1          | {}          | null       | 2025-06-22 13:35:04.19275+00  | null       | true      | {}       | 2025-06-22 13:35:04.19275+00  | 2025-06-22 13:35:04.19275+00  |
| 8483ec4e-387e-4c36-9453-35e19529d6e4 | 54e79a05-59f7-4cc8-b67f-f522a1b452e4 | estudante | 1          | {}          | null       | 2025-06-22 13:35:04.19275+00  | null       | true      | {}       | 2025-06-22 13:35:04.19275+00  | 2025-06-22 13:35:04.19275+00  |
| 069531a5-9ad7-4eec-b3e8-bda1020f7e36 | c91f1974-e102-46dd-b1c3-ba3f06c039af | estudante | 1          | {}          | null       | 2025-06-22 13:35:04.19275+00  | null       | true      | {}       | 2025-06-22 13:35:04.19275+00  | 2025-06-22 13:35:04.19275+00  |
| b5479e59-e0ed-4c16-9d6c-4caccb5b3128 | b37a40d9-ba6c-465f-abfc-c441b47edb4d | estudante | 1          | {}          | null       | 2025-06-22 13:35:04.19275+00  | null       | true      | {}       | 2025-06-22 13:35:04.19275+00  | 2025-06-22 13:35:04.19275+00  |
| d170971c-743d-4216-b2a4-13e2e9283bfa | 1f63bfc3-62d7-48cb-b497-6699cb7d2037 | estudante | 1          | {}          | null       | 2025-06-22 13:35:04.19275+00  | null       | true      | {}       | 2025-06-22 13:35:04.19275+00  | 2025-06-22 13:35:04.19275+00  |
| 6510afae-44cf-4116-aea3-f98d937923dc | 5697f078-c2f5-4da6-bb6c-db9ec9764d41 | estudante | 1          | {}          | null       | 2025-06-22 13:35:04.19275+00  | null       | true      | {}       | 2025-06-22 13:35:04.19275+00  | 2025-06-22 13:35:04.19275+00  |
| d0e8c39f-a4f1-478e-a065-cf68eb3eb9f7 | 8483907a-5521-43b1-b824-5068b02a2872 | estudante | 1          | {}          | null       | 2025-06-22 13:35:04.19275+00  | null       | true      | {}       | 2025-06-22 13:35:04.19275+00  | 2025-06-22 13:35:04.19275+00  |

-- 📊 DETALHES DAS TURMAS
SELECT * FROM turmas LIMIT 5;

| id                                   | nome                       | descricao                                                                                       | professor_id                         | instrumento_id                       | nivel     | max_alunos | min_alunos | valor_mensalidade | horarios                                                                                                               | status    | data_inicio | data_fim | observacoes | modalidade | local                   | material_necessario                                              | pre_requisitos | ativo | criado_em                  | atualizado_em              |
| ------------------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------ | --------- | ---------- | ---------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------- | --------- | ----------- | -------- | ----------- | ---------- | ----------------------- | ---------------------------------------------------------------- | -------------- | ----- | -------------------------- | -------------------------- |
| 6b144088-27f3-421a-92be-24a1e4a05661 | Flauta Iniciante - Turma A | Turma para iniciantes na flauta transversal. Aprenda desde a postura até as primeiras melodias. | 8483907a-5521-43b1-b824-5068b02a2872 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | iniciante | 8          | 3          | 120.00            | [{"dia":"segunda","hora_fim":"20:00","hora_inicio":"19:00"},{"dia":"quarta","hora_fim":"20:00","hora_inicio":"19:00"}] | planejada | 2025-06-06  | null     | null        | presencial | Sala de Música - Igreja | Flauta transversal, estante de partitura, método para iniciantes | null           | true  | 2025-05-30 00:15:50.762508 | 2025-05-30 00:15:50.762508 |
| fc0750bd-9ce4-4f1d-8003-3daed93e872a | Violino Básico             | Fundamentos do violino para iniciantes                                                          | 229c0858-c758-4993-abb3-cb7d13b01b76 | 80436b4f-15c1-452f-9442-34e42b5117e4 | iniciante | 6          | 3          | 150.00            | [{"dia":"terca","hora_fim":"21:00","hora_inicio":"20:00"}]                                                             | ativa     | 2025-05-30  | null     | null        | presencial | Sala de Cordas          | null                                                             | null           | true  | 2025-05-30 00:15:50.762508 | 2025-05-30 00:15:50.762508 |
| b04e30ed-0c0f-4daf-ad97-fb74475646c7 | Bateria Iniciante          | Fundamentos da bateria e ritmos básicos                                                         | 8483907a-5521-43b1-b824-5068b02a2872 | 86f83611-c0db-470c-87e7-31ee81b1a009 | iniciante | 4          | 3          | 180.00            | [{"dia":"quinta","hora_fim":"20:30","hora_inicio":"19:30"}]                                                            | ativa     | null        | null     | null        | presencial | Sala de Percussão       | null                                                             | null           | true  | 2025-05-30 00:15:50.762508 | 2025-05-30 00:15:50.762508 |

-- 👨‍🎓 DETALHES DOS ALUNOS
SELECT * FROM alunos LIMIT 10;

| id                                   | instrumento | nivel    | turma | data_ingresso | ativo | criado_em                  | instrumento_id                       | turma_principal_id                   |
| ------------------------------------ | ----------- | -------- | ----- | ------------- | ----- | -------------------------- | ------------------------------------ | ------------------------------------ |
| 840f99c4-7479-4098-9c2e-474a695178f0 | trompete    | beginner | null  | 2025-05-27    | true  | 2025-05-27 18:56:17.453178 | 509d6a26-159a-4976-aa46-83f914f930aa | null                                 |
| 9064ab32-12ce-415a-8c19-51b566608ee5 | violoncelo  | beginner | null  | 2025-05-27    | true  | 2025-05-27 20:38:51.625846 | 412c40b6-f4fc-4379-9d6f-5ce0ec2d669d | null                                 |
| a57eeb22-a246-4243-8e32-98297c6f3bad | teclado     | beginner | null  | 2025-05-27    | true  | 2025-05-27 22:08:47.91411  | 8bd473f1-7b35-4b9e-869a-17fb73c6e047 | null                                 |
| 54e79a05-59f7-4cc8-b67f-f522a1b452e4 | flauta      | beginner | null  | 2025-05-27    | true  | 2025-05-27 15:52:58.712165 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | 6b144088-27f3-421a-92be-24a1e4a05661 |
| c91f1974-e102-46dd-b1c3-ba3f06c039af | flauta      | beginner | null  | 2025-05-29    | true  | 2025-05-29 13:26:14.287741 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | 6b144088-27f3-421a-92be-24a1e4a05661 |
| b37a40d9-ba6c-465f-abfc-c441b47edb4d | flauta      | beginner | null  | 2025-05-28    | true  | 2025-05-28 03:45:05.105179 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | 6b144088-27f3-421a-92be-24a1e4a05661 |
| 1f63bfc3-62d7-48cb-b497-6699cb7d2037 | flauta      | beginner | null  | 2025-05-28    | true  | 2025-05-28 00:36:11.827056 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | 6b144088-27f3-421a-92be-24a1e4a05661 |
| 5697f078-c2f5-4da6-bb6c-db9ec9764d41 | violino     | beginner | null  | 2025-05-29    | true  | 2025-05-29 14:35:35.381988 | 80436b4f-15c1-452f-9442-34e42b5117e4 | fc0750bd-9ce4-4f1d-8003-3daed93e872a |
| 8483907a-5521-43b1-b824-5068b02a2872 | null        | beginner | null  | 2025-05-27    | true  | 2025-05-27 22:55:28.357311 | 86f83611-c0db-470c-87e7-31ee81b1a009 | null                                 |
| 41f409ee-1614-4bc6-8cce-a02086601dc9 | null        | beginner | null  | 2025-05-31    | true  | 2025-05-31 01:41:53.968269 | 26cadf44-6d7b-4f9b-85d6-6b2c40715f45 | null                                 |

-- 👨‍🏫 DETALHES DOS PROFESSORES  
SELECT * FROM professores LIMIT 5;

| id                                   | formacao         | biografia            | especialidades      | ativo | criado_em                  |
| ------------------------------------ | ---------------- | -------------------- | ------------------- | ----- | -------------------------- |
| 8483907a-5521-43b1-b824-5068b02a2872 | null             | null                 | ["bateria"]         | true  | 2025-05-27 22:55:28.357311 |
| 229c0858-c758-4993-abb3-cb7d13b01b76 | null             | null                 | ["violino"]         | true  | 2025-05-29 18:30:33.11142  |
| 509052e4-5f3a-41df-bf48-f46b6f3cc108 | null             |                      | null                | true  | 2025-06-09 16:00:40.395572 |
| 5e31da6f-9ce6-4345-a056-efc5719039f0 | Educação Musical | Professora de música | ["música","ensino"] | true  | 2025-07-21 01:56:04.691582 |

-- 🏆 ACHIEVEMENTS DISPONÍVEIS
SELECT name, description, points_reward, category FROM achievements LIMIT 10;

| name                 | description                               | points_reward | category    |
| -------------------- | ----------------------------------------- | ------------- | ----------- |
| Primeiro Passo       | Complete sua primeira aula                | 10            | progress    |
| Dedicado             | Complete 10 aulas                         | 50            | progress    |
| Persistente          | Estude por 7 dias seguidos                | 30            | consistency |
| Músico Completo      | Complete um módulo inteiro                | 100           | progress    |
| Primeiro Passo       | Complete sua primeira aula no Nipo School | 10            | progress    |
| Estudante Dedicado   | Complete 5 aulas consecutivas             | 25            | progress    |
| Aprendiz Persistente | Complete 10 aulas no total                | 50            | progress    |
| Acadêmico            | Complete 25 aulas no total                | 100           | progress    |
| Mestre Músico        | Complete 50 aulas no total                | 200           | progress    |
| Fogo Sagrado         | Acesse o sistema por 3 dias consecutivos  | 30            | consistency |

-- 🎮 PROGRESSO DOS USUARIOS
SELECT user_id, achievement_id, current_progress, is_completed FROM achievements_progress LIMIT 10;

Success. No rows returned




-- ========================================
-- 📝 INSTRUÇÕES DE USO:
-- ========================================
-- 1. Execute cada seção sequencialmente
-- 2. Copie e cole os resultados aqui nos comentários
-- 3. Para tabelas com muitos dados, use LIMIT 10-20
-- 4. Se alguma query der erro, me informe o erro exato
-- 5. Priorize as seções 1, 2 e 3 primeiro 