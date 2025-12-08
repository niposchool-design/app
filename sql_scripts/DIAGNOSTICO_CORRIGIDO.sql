-- ======================================
-- DIAGNÓSTICO RESGATE - VERSÃO CORRIGIDA
-- Baseado na estrutura REAL do banco de dados
-- ======================================

-- ======================================
-- 1. SISTEMA ALPHA CHALLENGES
-- ======================================

-- Metodologias (Orff, Kodály, etc.)
SELECT 
  'METODOLOGIAS' as tipo,
  COUNT(*) as total,
  COUNT(CASE WHEN ativa = true THEN 1 END) as ativas,
  json_agg(DISTINCT nome) as nomes
FROM alpha_metodologias;

nõa tem coluna ativa
| tipo         | total | nomes                                                                                                                                                                                               |
| ------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| METODOLOGIAS | 9     | ["Berklee Method","Dalcroze Eurythmics","Lincoln Center Education","Método Kodály","Método Suzuki","Musical Futures","Music Learning Theory (Gordon)","Orff Schulwerk","Pedagogia Waldorf Musical"] |



-- Desafios
SELECT 
  'DESAFIOS' as tipo,
  COUNT(*) as total,
  COUNT(CASE WHEN ativo = true THEN 1 END) as ativos,
  COUNT(DISTINCT metodologia_id) as metodologias_usadas,
  COUNT(DISTINCT nivel_dificuldade) as niveis_dificuldade
FROM alpha_desafios;

Error: Failed to run sql query: ERROR: 42703: column "nivel_dificuldade" does not exist LINE 6: COUNT(DISTINCT nivel_dificuldade) as niveis_dificuldade ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.


-- Competências
SELECT 
  'COMPETENCIAS' as tipo,
  COUNT(*) as total,
  json_agg(DISTINCT pilar_alpha) as pilares
FROM alpha_competencias;

Error: Failed to run sql query: ERROR: 42703: column "pilar_alpha" does not exist LINE 4: json_agg(DISTINCT pilar_alpha) as pilares ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.


-- Submissões (deve estar vazia)
SELECT 
  'SUBMISSOES' as tipo,
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'aprovada' THEN 1 END) as aprovadas,
  COUNT(DISTINCT aluno_id) as alunos_unicos
FROM alpha_submissoes;

Error: Failed to run sql query: ERROR: 42703: column "aluno_id" does not exist LINE 5: COUNT(DISTINCT aluno_id) as alunos_unicos ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.



-- Badges (sistema de conquistas do Alpha!)
SELECT 
  'ALPHA_BADGES' as tipo,
  COUNT(*) as total,
  COUNT(CASE WHEN visivel = true THEN 1 END) as visiveis,
  COUNT(CASE WHEN secreto = true THEN 1 END) as secretos,
  json_agg(DISTINCT categoria) as categorias,
  json_agg(DISTINCT raridade) as raridades
FROM alpha_badges;

| tipo         | total | visiveis | secretos | categorias                                                                 | raridades                           |
| ------------ | ----- | -------- | -------- | -------------------------------------------------------------------------- | ----------------------------------- |
| ALPHA_BADGES | 26    | 26       | 2        | ["alpha","colaborativa","criativa","especial","social","streak","tecnica"] | ["comum","epico","lendario","raro"] |


-- Alunos com badges
SELECT 
  'ALUNO_BADGES' as tipo,
  COUNT(*) as total,
  COUNT(DISTINCT aluno_id) as alunos_com_badges,
  COUNT(DISTINCT badge_id) as badges_diferentes_conquistados
FROM alpha_aluno_badges;

| tipo         | total | alunos_com_badges | badges_diferentes_conquistados |
| ------------ | ----- | ----------------- | ------------------------------ |
| ALUNO_BADGES | 0     | 0                 | 0                              |


-- ======================================
-- 2. HISTÓRIA DA MÚSICA
-- ======================================

-- Períodos históricos
SELECT 
  'PERIODOS' as tipo,
  COUNT(*) as total,
  json_agg(nome ORDER BY ordem) as periodos_cadastrados
FROM historia_periodos;

Error: Failed to run sql query: ERROR: 42703: column "ordem" does not exist LINE 4: json_agg(nome ORDER BY ordem) as periodos_cadastrados ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.



-- Compositores (CORRIGIDO - sem "nacionalidade")
SELECT 
  'COMPOSITORES' as tipo,
  COUNT(*) as total,
  COUNT(DISTINCT periodo_id) as periodos_representados
FROM historia_compositores;

| tipo         | total | periodos_representados |
| ------------ | ----- | ---------------------- |
| COMPOSITORES | 21    | 6                      |

-- Obras musicais
SELECT 
  'OBRAS' as tipo,
  COUNT(*) as total,
  COUNT(DISTINCT compositor_id) as compositores_com_obras,
  COUNT(DISTINCT periodo_id) as periodos_com_obras
FROM historia_obras;

| tipo  | total | compositores_com_obras | periodos_com_obras |
| ----- | ----- | ---------------------- | ------------------ |
| OBRAS | 16    | 4                      | 2                  |

-- Movimentos artísticos
SELECT 
  'MOVIMENTOS_ARTISTICOS' as tipo,
  COUNT(*) as total,
  COUNT(DISTINCT periodo_id) as periodos_com_movimentos
FROM historia_movimentos_artisticos;

Error: Failed to run sql query: ERROR: 42703: column "periodo_id" does not exist LINE 4: COUNT(DISTINCT periodo_id) as periodos_com_movimentos ^ HINT: Perhaps you meant to reference the column "historia_movimentos_artisticos.periodo_fim".

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.


-- Gêneros musicais
SELECT 
  'GENEROS' as tipo,
  COUNT(*) as total
FROM historia_generos;

| tipo    | total |
| ------- | ----- |
| GENEROS | 27    |


-- ======================================
-- 3. INSTRUMENTOS MUSICAIS
-- ======================================

-- Instrumentos (CORRIGIDO - campo é "familia_instrumental", não "familia")
SELECT 
  'INSTRUMENTOS' as tipo,
  COUNT(*) as total,
  COUNT(CASE WHEN ativo = true THEN 1 END) as ativos,
  json_agg(DISTINCT categoria) as categorias,
  json_agg(DISTINCT familia_instrumental) as familias
FROM instrumentos;

| tipo         | total | ativos | categorias                                                                                                           | familias                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------ | ----- | ------ | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| INSTRUMENTOS | 69    | 69     | ["corda","Corda","Eletrônico","outros","percussao","Percussão","sopro","Sopro","teclado","Teclado","teoria","vocal"] | ["Aerofone de Palheta","Aerofone de Palheta Livre","Cordas","Cordas Dedilhadas","Cordas dedilhadas amplificadas","cordas friccionadas","Cordas friccionadas","Cordas Friccionadas","Cordofones","Cordofones percutidos","Eletrônico","Madeiras","Metais","Percussão","Percussão de Corda","Percussão de Fricção","Percussão de Mão","Percussão de Membrana","Percussão de Metal","Percussão de Raspagem","Percussão Melódica","Sopro Livre","Teclado de Cordas","Teclado de Percussão",null] |


-- Evolução histórica dos instrumentos
SELECT 
  'INSTRUMENTOS_EVOLUCAO' as tipo,
  COUNT(*) as total,
  COUNT(DISTINCT instrumento_id) as instrumentos_com_evolucao
FROM historia_instrumentos_evolucao;


| tipo                  | total | instrumentos_com_evolucao |
| --------------------- | ----- | ------------------------- |
| INSTRUMENTOS_EVOLUCAO | 8     | 0                         |


-- ======================================
-- 4. SISTEMA DE PORTFÓLIO
-- ======================================

-- Portfólios (EXISTE!)
SELECT 
  'PORTFOLIOS' as tipo,
  COUNT(*) as total,
  COUNT(DISTINCT aluno_id) as alunos_com_portfolio
FROM portfolios;

Error: Failed to run sql query: ERROR: 42703: column "aluno_id" does not exist LINE 4: COUNT(DISTINCT aluno_id) as alunos_com_portfolio ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.


-- Evidências (EXISTE!)
SELECT 
  'PORTFOLIO_EVIDENCIAS' as tipo,
  COUNT(*) as total,
  COUNT(DISTINCT portfolio_id) as portfolios_com_evidencias,
  COUNT(CASE WHEN tipo = 'video' THEN 1 END) as videos,
  COUNT(CASE WHEN tipo = 'audio' THEN 1 END) as audios,
  COUNT(CASE WHEN tipo = 'imagem' THEN 1 END) as imagens
FROM portfolio_evidencias;

Error: Failed to run sql query: ERROR: 42703: column "tipo" does not exist LINE 5: COUNT(CASE WHEN tipo = 'video' THEN 1 END) as videos, ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.


-- ======================================
-- 5. CURADORIA (MÓDULOS)
-- ======================================

-- Módulos (CORRIGIDO - verificar colunas reais)
SELECT 
  'MODULOS' as tipo,
  COUNT(*) as total
FROM modulos;

| tipo    | total |
| ------- | ----- |
| MODULOS | 11    |


-- ======================================
-- 6. SISTEMA DE PROGRESSÃO (Alpha)
-- ======================================

-- Progresso dos estudantes
SELECT 
  'PROGRESSO_ESTUDANTE' as tipo,
  COUNT(*) as total,
  COUNT(DISTINCT estudante_id) as estudantes_com_progresso,
  AVG(xp_total)::int as media_xp,
  MAX(xp_total)::int as max_xp
FROM alpha_progresso_estudante;

| tipo                | total | estudantes_com_progresso | media_xp | max_xp |
| ------------------- | ----- | ------------------------ | -------- | ------ |
| PROGRESSO_ESTUDANTE | 1     | 1                        | 0        | 0      |


-- Ranking
SELECT 
  'RANKING' as tipo,
  COUNT(*) as total,
  COUNT(DISTINCT estudante_id) as estudantes_ranqueados
FROM alpha_ranking;

| tipo    | total | estudantes_ranqueados |
| ------- | ----- | --------------------- |
| RANKING | 0     | 0                     |


-- ======================================
-- 7. LISTA COMPLETA DE TABELAS EXISTENTES
-- ======================================
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as num_colunas
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;


| table_name                      | num_colunas |
| ------------------------------- | ----------- |
| achievements                    | 11          |
| achievements_educacionais       | 10          |
| achievements_progress           | 10          |
| adaptacoes_espacos_alternativos | 23          |
| admins                          | 7           |
| alpha_aluno_badges              | 12          |
| alpha_aluno_desafios            | 15          |
| alpha_badges                    | 18          |
| alpha_celebracoes               | 18          |
| alpha_competencias              | 11          |
| alpha_desafios                  | 34          |
| alpha_estudante_badges          | 13          |
| alpha_mentorias                 | 14          |
| alpha_metodologias              | 25          |
| alpha_niveis                    | 13          |
| alpha_progresso                 | 12          |
| alpha_progresso_estudante       | 42          |
| alpha_projetos_coletivos        | 21          |
| alpha_ranking                   | 19          |
| alpha_submissoes                | 17          |
| alpha_xp_historico              | 16          |
| alunos                          | 9           |
| audit_activities                | 15          |
| aula_atividades                 | 4           |
| aula_checklist                  | 5           |
| aula_criterios_avaliacao        | 3           |
| aula_desafio_alpha              | 3           |
| aula_desafios                   | 7           |
| aula_feedback                   | 5           |
| aula_feedbacks                  | 5           |
| aula_materiais                  | 5           |
| aula_permissoes                 | 5           |
| aula_registros                  | 4           |
| aula_status_log                 | 5           |
| aula_tags                       | 4           |
| aulas                           | 14          |
| autoavaliacoes                  | 18          |
| avaliacoes_rubricas             | 9           |
| capacitacao_docente             | 24          |
| cessoes_instrumentos            | 15          |
| comunicacao_engajamento         | 26          |
| desafios_alpha                  | 14          |
| desafios_alpha_respostas        | 10          |
| devotional_content              | 11          |
| documentos_institucionais       | 23          |
| experiencias_brasileiras        | 19          |
| feedback_pares                  | 13          |
| forum_likes                     | 4           |
| forum_perguntas                 | 11          |
| forum_respostas                 | 7           |
| historia_compositores           | 20          |
| historia_conceitos_teoricos     | 14          |
| historia_contexto_cultural      | 11          |
| historia_eventos_timeline       | 15          |
| historia_generos                | 16          |
| historia_instrumentos_evolucao  | 13          |
| historia_movimentos             | 14          |
| historia_movimentos_artisticos  | 21          |
| historia_obras                  | 25          |
| historia_periodos               | 13          |
| historia_playlists              | 14          |
| historia_progresso_usuario      | 12          |
| historia_quiz                   | 13          |
| historia_quiz_respostas         | 7           |
| historia_timeline               | 15          |
| historico_instrumentos          | 7           |
| hook_cache                      | 9           |
| indicadores_impacto             | 9           |
| instrumento_curiosidades        | 9           |
| instrumento_midias              | 18          |
| instrumento_performances        | 14          |
| instrumento_quiz                | 15          |
| instrumento_sons                | 11          |
| instrumento_sons_variacoes      | 10          |
| instrumento_tecnicas            | 14          |
| instrumentos                    | 16          |
| instrumentos_alunos             | 11          |
| instrumentos_fisicos            | 15          |
| instrumentos_relacionados       | 7           |
| lessons                         | 21          |
| logos                           | 6           |
| manutencoes_instrumentos        | 14          |
| materiais_apoio                 | 19          |
| matriculas                      | 15          |
| metodologias_ensino             | 17          |
| migration_log                   | 5           |
| modules                         | 14          |
| modulos                         | 6           |
| permission_templates            | 7           |
| permissions                     | 4           |
| portfolio_evidencias            | 21          |
| portfolios                      | 17          |
| presencas                       | 7           |
| professor_instrumentos          | 8           |
| professores                     | 6           |
| professores_categorias          | 8           |
| professores_conteudos           | 21          |
| profiles                        | 26          |
| proposta_curricular             | 22          |
| qr_codes                        | 13          |


-- ======================================
-- 8. RESUMO EXECUTIVO
-- ======================================
SELECT 
  'RESUMO GERAL' as sistema,
  
  -- Alpha
  (SELECT COUNT(*) FROM alpha_metodologias) as metodologias,
  (SELECT COUNT(*) FROM alpha_desafios) as desafios,
  (SELECT COUNT(*) FROM alpha_badges) as badges,
  (SELECT COUNT(*) FROM alpha_submissoes) as submissoes,
  
  -- História
  (SELECT COUNT(*) FROM historia_periodos) as periodos,
  (SELECT COUNT(*) FROM historia_compositores) as compositores,
  (SELECT COUNT(*) FROM historia_obras) as obras,
  
  -- Instrumentos
  (SELECT COUNT(*) FROM instrumentos) as instrumentos,
  
  -- Portfolio
  (SELECT COUNT(*) FROM portfolios) as portfolios,
  (SELECT COUNT(*) FROM portfolio_evidencias) as evidencias,
  
  -- Módulos
  (SELECT COUNT(*) FROM modulos) as modulos;

| sistema      | metodologias | desafios | badges | submissoes | periodos | compositores | obras | instrumentos | portfolios | evidencias | modulos |
| ------------ | ------------ | -------- | ------ | ---------- | -------- | ------------ | ----- | ------------ | ---------- | ---------- | ------- |
| RESUMO GERAL | 9            | 41       | 26     | 0          | 12       | 21           | 16    | 69           | 2          | 0          | 11      |


-- ======================================
-- 9. IDENTIFICAR TABELAS VAZIAS
-- ======================================
SELECT 
  t.table_name,
  CASE 
    WHEN t.table_name = 'alpha_metodologias' THEN (SELECT COUNT(*) FROM alpha_metodologias)
    WHEN t.table_name = 'alpha_desafios' THEN (SELECT COUNT(*) FROM alpha_desafios)
    WHEN t.table_name = 'alpha_badges' THEN (SELECT COUNT(*) FROM alpha_badges)
    WHEN t.table_name = 'alpha_submissoes' THEN (SELECT COUNT(*) FROM alpha_submissoes)
    WHEN t.table_name = 'historia_periodos' THEN (SELECT COUNT(*) FROM historia_periodos)
    WHEN t.table_name = 'historia_compositores' THEN (SELECT COUNT(*) FROM historia_compositores)
    WHEN t.table_name = 'historia_obras' THEN (SELECT COUNT(*) FROM historia_obras)
    WHEN t.table_name = 'instrumentos' THEN (SELECT COUNT(*) FROM instrumentos)
    WHEN t.table_name = 'portfolios' THEN (SELECT COUNT(*) FROM portfolios)
    WHEN t.table_name = 'portfolio_evidencias' THEN (SELECT COUNT(*) FROM portfolio_evidencias)
    WHEN t.table_name = 'modulos' THEN (SELECT COUNT(*) FROM modulos)
    ELSE -1
  END as registros
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name IN (
    'alpha_metodologias', 'alpha_desafios', 'alpha_badges', 'alpha_submissoes',
    'historia_periodos', 'historia_compositores', 'historia_obras',
    'instrumentos', 'portfolios', 'portfolio_evidencias', 'modulos'
  )
ORDER BY registros ASC;


| table_name            | registros |
| --------------------- | --------- |
| alpha_submissoes      | 0         |
| portfolio_evidencias  | 0         |
| portfolios            | 2         |
| alpha_metodologias    | 9         |
| modulos               | 11        |
| historia_periodos     | 12        |
| historia_obras        | 16        |
| historia_compositores | 21        |
| alpha_badges          | 26        |
| alpha_desafios        | 41        |
| instrumentos          | 69        |