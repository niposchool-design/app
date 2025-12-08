-- 🔍 DIAGNÓSTICO COMPLETO - RESGATE DE FUNCIONALIDADES
-- Este script verifica o estado atual das tabelas e dados

-- ======================================
-- 1. VERIFICAR TABELAS ALPHA
-- ======================================
SELECT 
  'ALPHA METODOLOGIAS' as sistema,
  COUNT(*) as total_registros,
  COUNT(CASE WHEN ativo = true THEN 1 END) as ativos,
  json_agg(codigo ORDER BY codigo) as codigos
FROM alpha_metodologias;

| sistema            | total_registros | ativos | codigos                                                                                              |
| ------------------ | --------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| ALPHA METODOLOGIAS | 9               | 9      | ["berklee","dalcroze","gordon","kodaly","LCE","musical_futures","orff_schulwerk","suzuki","waldorf"] |


SELECT 
  'ALPHA DESAFIOS' as sistema,
  COUNT(*) as total_registros,
  COUNT(CASE WHEN ativo = true THEN 1 END) as ativos,
  COUNT(DISTINCT metodologia_id) as metodologias_com_desafios
FROM alpha_desafios;

| sistema        | total_registros | ativos | metodologias_com_desafios |
| -------------- | --------------- | ------ | ------------------------- |
| ALPHA DESAFIOS | 41              | 41     | 0                         |


SELECT 
  'ALPHA COMPETENCIAS' as sistema,
  COUNT(*) as total_registros,
  COUNT(DISTINCT metodologia_id) as metodologias_com_competencias
FROM alpha_competencias;

| sistema            | total_registros | metodologias_com_competencias |
| ------------------ | --------------- | ----------------------------- |
| ALPHA COMPETENCIAS | 9               | 9                             |


SELECT 
  'ALPHA SUBMISSOES' as sistema,
  COUNT(*) as total_registros,
  COUNT(CASE WHEN status = 'aprovado' THEN 1 END) as aprovadas,
  COUNT(CASE WHEN status = 'pendente' THEN 1 END) as pendentes
FROM alpha_submissoes;


| sistema          | total_registros | aprovadas | pendentes |
| ---------------- | --------------- | --------- | --------- |
| ALPHA SUBMISSOES | 0               | 0         | 0         |


-- ======================================
-- 2. VERIFICAR TABELAS HISTÓRIA DA MÚSICA
-- ======================================
SELECT 
  'HISTORIA PERIODOS' as sistema,
  COUNT(*) as total_registros
FROM historia_periodos;

| sistema           | total_registros |
| ----------------- | --------------- |
| HISTORIA PERIODOS | 12              |


SELECT 
  'HISTORIA COMPOSITORES' as sistema,
  COUNT(*) as total_registros,
  COUNT(CASE WHEN nacionalidade IS NOT NULL THEN 1 END) as com_nacionalidade
FROM historia_compositores;

Error: Failed to run sql query: ERROR: 42703: column "nacionalidade" does not exist LINE 4: COUNT(CASE WHEN nacionalidade IS NOT NULL THEN 1 END) as com_nacionalidade ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.


SELECT 
  'HISTORIA OBRAS' as sistema,
  COUNT(*) as total_registros,
  COUNT(DISTINCT compositor_id) as compositores_com_obras
FROM historia_obras;

| sistema        | total_registros | compositores_com_obras |
| -------------- | --------------- | ---------------------- |
| HISTORIA OBRAS | 16              | 4                      |


-- ======================================
-- 3. VERIFICAR INSTRUMENTOS
-- ======================================
SELECT 
  'INSTRUMENTOS' as sistema,
  COUNT(*) as total_registros,
  COUNT(CASE WHEN ativo = true THEN 1 END) as ativos,
  json_agg(DISTINCT familia) as familias
FROM instrumentos;

Error: Failed to run sql query: ERROR: 42703: column "familia" does not exist LINE 5: json_agg(DISTINCT familia) as familias ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.



-- ======================================
-- 4. VERIFICAR CONQUISTAS
-- ======================================
SELECT 
  'CONQUISTAS' as sistema,
  COUNT(*) as total_registros,
  COUNT(CASE WHEN ativa = true THEN 1 END) as ativas,
  COUNT(DISTINCT tipo) as tipos_diferentes
FROM conquistas;


Error: Failed to run sql query: ERROR: 42P01: relation "conquistas" does not exist LINE 6: FROM conquistas limit 100; ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.


-- ======================================
-- 5. VERIFICAR GAMIFICAÇÃO
-- ======================================
SELECT 
  'ALUNO CONQUISTAS' as sistema,
  COUNT(*) as total_registros,
  COUNT(DISTINCT aluno_id) as alunos_com_conquistas
FROM aluno_conquistas;


Error: Failed to run sql query: ERROR: 42P01: relation "aluno_conquistas" does not exist LINE 5: FROM aluno_conquistas limit 100; ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.


SELECT 
  'PORTFOLIO ITEMS' as sistema,
  COUNT(*) as total_registros,
  COUNT(CASE WHEN status = 'publicado' THEN 1 END) as publicados
FROM portfolio_items;


Error: Failed to run sql query: ERROR: 42P01: relation "portfolio_items" does not exist LINE 5: FROM portfolio_items limit 100; ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.


-- ======================================
-- 6. VERIFICAR CURADORIA (MÓDULOS/TRILHAS)
-- ======================================
SELECT 
  'MODULOS' as sistema,
  COUNT(*) as total_registros,
  COUNT(CASE WHEN publicado = true THEN 1 END) as publicados
FROM modulos;

Error: Failed to run sql query: ERROR: 42703: column "publicado" does not exist LINE 4: COUNT(CASE WHEN publicado = true THEN 1 END) as publicados ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.


SELECT 
  'TRILHAS' as sistema,
  COUNT(*) as total_registros,
  COUNT(CASE WHEN ativa = true THEN 1 END) as ativas
FROM trilhas;

Error: Failed to run sql query: ERROR: 42P01: relation "trilhas" does not exist LINE 5: FROM trilhas limit 100; ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.

-- ======================================
-- 7. LISTA DE TABELAS QUE EXISTEM
-- ======================================
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as num_colunas
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name LIKE ANY(ARRAY['alpha_%', 'historia_%', 'instrumentos', 'conquistas', 'portfolio_%', 'modulos', 'trilhas'])
ORDER BY table_name;


| table_name                     | num_colunas |
| ------------------------------ | ----------- |
| alpha_aluno_badges             | 12          |
| alpha_aluno_desafios           | 15          |
| alpha_badges                   | 18          |
| alpha_celebracoes              | 18          |
| alpha_competencias             | 11          |
| alpha_desafios                 | 34          |
| alpha_estudante_badges         | 13          |
| alpha_mentorias                | 14          |
| alpha_metodologias             | 25          |
| alpha_niveis                   | 13          |
| alpha_progresso                | 12          |
| alpha_progresso_estudante      | 42          |
| alpha_projetos_coletivos       | 21          |
| alpha_ranking                  | 19          |
| alpha_submissoes               | 17          |
| alpha_xp_historico             | 16          |
| historia_compositores          | 20          |
| historia_conceitos_teoricos    | 14          |
| historia_contexto_cultural     | 11          |
| historia_eventos_timeline      | 15          |
| historia_generos               | 16          |
| historia_instrumentos_evolucao | 13          |
| historia_movimentos            | 14          |
| historia_movimentos_artisticos | 21          |
| historia_obras                 | 25          |
| historia_periodos              | 13          |
| historia_playlists             | 14          |
| historia_progresso_usuario     | 12          |
| historia_quiz                  | 13          |
| historia_quiz_respostas        | 7           |
| historia_timeline              | 15          |
| instrumentos                   | 16          |
| modulos                        | 6           |
| portfolio_evidencias           | 21          |
| portfolios                     | 17          |



-- ======================================
-- 8. RESUMO FINAL
-- ======================================
SELECT 
  'RESUMO' as tipo,
  (SELECT COUNT(*) FROM alpha_metodologias) as alpha_metodologias,
  (SELECT COUNT(*) FROM alpha_desafios) as alpha_desafios,
  (SELECT COUNT(*) FROM historia_periodos) as historia_periodos,
  (SELECT COUNT(*) FROM historia_compositores) as historia_compositores,
  (SELECT COUNT(*) FROM instrumentos) as instrumentos,
  (SELECT COUNT(*) FROM conquistas) as conquistas,
  (SELECT COUNT(*) FROM portfolio_items) as portfolio_items,
  (SELECT COUNT(*) FROM modulos) as modulos;


Error: Failed to run sql query: ERROR: 42P01: relation "conquistas" does not exist LINE 8: (SELECT COUNT(*) FROM conquistas) as conquistas, ^

Note: A limit of 100 was applied to your query. If this was the cause of a syntax error, try selecting "No limit" instead and re-run the query.
