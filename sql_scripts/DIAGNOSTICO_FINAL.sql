-- ======================================
-- DIAGNÓSTICO FINAL CORRIGIDO
-- Usando apenas estruturas que sabemos que funcionam
-- ======================================

-- ======================================
-- RESUMO EXECUTIVO RÁPIDO
-- ======================================
SELECT 
  'RESUMO GERAL' as sistema,
  
  -- Alpha (FUNCIONANDO)
  (SELECT COUNT(*) FROM alpha_metodologias) as metodologias,
  (SELECT COUNT(*) FROM alpha_desafios) as desafios,
  (SELECT COUNT(*) FROM alpha_badges) as badges,
  (SELECT COUNT(*) FROM alpha_competencias) as competencias,
  (SELECT COUNT(*) FROM alpha_submissoes) as submissoes,
  
  -- História (VERIFICAR)
  (SELECT COUNT(*) FROM historia_periodos) as periodos,
  (SELECT COUNT(*) FROM historia_compositores) as compositores,
  (SELECT COUNT(*) FROM historia_obras) as obras,
  (SELECT COUNT(*) FROM historia_generos) as generos,
  (SELECT COUNT(*) FROM historia_movimentos_artisticos) as movimentos,
  
  -- Instrumentos (FUNCIONANDO)
  (SELECT COUNT(*) FROM instrumentos) as instrumentos,
  
  -- Portfolio (VERIFICAR)
  (SELECT COUNT(*) FROM portfolios) as portfolios,
  (SELECT COUNT(*) FROM portfolio_evidencias) as evidencias,
  
  -- Módulos (VERIFICAR)
  (SELECT COUNT(*) FROM modulos) as modulos;
| sistema      | metodologias | desafios | badges | competencias | submissoes | periodos | compositores | obras | generos | movimentos | instrumentos | portfolios | evidencias | modulos |
| ------------ | ------------ | -------- | ------ | ------------ | ---------- | -------- | ------------ | ----- | ------- | ---------- | ------------ | ---------- | ---------- | ------- |
| RESUMO GERAL | 9            | 41       | 26     | 9            | 0          | 12       | 21           | 16    | 27      | 6          | 69           | 2          | 0          | 11      |


-- ======================================
-- ALPHA CHALLENGES - Colunas Corretas
-- ======================================

-- Metodologias
SELECT 
  'METODOLOGIAS' as tipo,
  COUNT(*) as total,
  json_agg(nome) as nomes
FROM alpha_metodologias
LIMIT 1;

| tipo         | total | nomes                                                                                                                                                                                               |
| ------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| METODOLOGIAS | 9     | ["Orff Schulwerk","Método Suzuki","Método Kodály","Musical Futures","Dalcroze Eurythmics","Music Learning Theory (Gordon)","Pedagogia Waldorf Musical","Berklee Method","Lincoln Center Education"] |


-- Desafios (coluna correta: "dificuldade", não "nivel_dificuldade")
SELECT 
  'DESAFIOS' as tipo,
  COUNT(*) as total,
  COUNT(CASE WHEN ativo = true THEN 1 END) as ativos,
  COUNT(DISTINCT metodologia_id) as metodologias_usadas,
  COUNT(DISTINCT dificuldade) as niveis_dificuldade,
  json_agg(DISTINCT tipo_desafio) as tipos
FROM alpha_desafios;

| tipo     | total | ativos | metodologias_usadas | niveis_dificuldade | tipos                                                                   |
| -------- | ----- | ------ | ------------------- | ------------------ | ----------------------------------------------------------------------- |
| DESAFIOS | 41    | 41     | 0                   | 5                  | ["audio","diario","especial","mensal","quiz","semanal","texto","video"] |


-- Competências (sem coluna "pilar_alpha")
SELECT 
  'COMPETENCIAS' as tipo,
  COUNT(*) as total,
  json_agg(DISTINCT categoria) as categorias
FROM alpha_competencias;

| tipo         | total | categorias                 |
| ------------ | ----- | -------------------------- |
| COMPETENCIAS | 9     | ["criativa","Fundamental"] |


-- Badges
SELECT 
  'BADGES' as tipo,
  COUNT(*) as total,
  COUNT(CASE WHEN visivel = true THEN 1 END) as visiveis,
  COUNT(CASE WHEN secreto = true THEN 1 END) as secretos,
  json_agg(DISTINCT categoria) as categorias,
  json_agg(DISTINCT raridade) as raridades
FROM alpha_badges;

| tipo   | total | visiveis | secretos | categorias                                                                 | raridades                           |
| ------ | ----- | -------- | -------- | -------------------------------------------------------------------------- | ----------------------------------- |
| BADGES | 26    | 26       | 2        | ["alpha","colaborativa","criativa","especial","social","streak","tecnica"] | ["comum","epico","lendario","raro"] |



-- ======================================
-- HISTÓRIA DA MÚSICA - Verificar dados
-- ======================================

-- Períodos (verificar se tem coluna "ordem")
SELECT COUNT(*) as total_periodos FROM historia_periodos;

| total_periodos |
| -------------- |
| 12             |


-- Se tem registros, pegar alguns nomes
SELECT nome, ano_inicio, ano_fim 
FROM historia_periodos 
ORDER BY ano_inicio 
LIMIT 5;
Error: Failed to run sql query: ERROR: 42703: column "ano_inicio" does not exist LINE 1: SELECT nome, ano_inicio, ano_fim ^




-- Compositores (verificar se foi populado)
SELECT COUNT(*) as total_compositores FROM historia_compositores;

| total_compositores |
| ------------------ |
| 21                 |


-- Pegar alguns compositores
SELECT nome_completo, pais_nascimento 
FROM historia_compositores 
LIMIT 5;

| nome_completo                      | pais_nascimento |
| ---------------------------------- | --------------- |
| Frédéric François Chopin           | Polônia         |
| Johann Strauss II                  | Áustria         |
| Pyotr Ilyich Tchaikovsky           | Rússia          |
| Johannes Brahms                    | Alemanha        |
| Giuseppe Fortunino Francesco Verdi | Itália          |


-- Obras
SELECT COUNT(*) as total_obras FROM historia_obras;

| total_obras |
| ----------- |
| 16          |


-- Gêneros
SELECT COUNT(*) as total_generos FROM historia_generos;

| total_generos |
| ------------- |
| 27            |


-- Movimentos (usar periodo_inicio/periodo_fim)
SELECT 
  COUNT(*) as total_movimentos,
  json_agg(DISTINCT periodo_inicio) as periodos_inicio
FROM historia_movimentos_artisticos;

| total_movimentos | periodos_inicio                             |
| ---------------- | ------------------------------------------- |
| 6                | ["1400","1600","1750","1820","1890","1900"] |


-- ======================================
-- INSTRUMENTOS
-- ======================================
SELECT 
  COUNT(*) as total,
  COUNT(DISTINCT categoria) as categorias,
  COUNT(DISTINCT familia_instrumental) as familias,
  COUNT(CASE WHEN ativo = true THEN 1 END) as ativos
FROM instrumentos;

| total | categorias | familias | ativos |
| ----- | ---------- | -------- | ------ |
| 69    | 12         | 24       | 69     |


-- ======================================
-- TABELAS QUE PRECISAM SER POPULADAS
-- ======================================
SELECT 
  'TABELAS VAZIAS' as info,
  (SELECT COUNT(*) FROM alpha_submissoes) as submissoes,
  (SELECT COUNT(*) FROM alpha_aluno_badges) as aluno_badges,
  (SELECT COUNT(*) FROM portfolios) as portfolios,
  (SELECT COUNT(*) FROM portfolio_evidencias) as evidencias;

| info           | submissoes | aluno_badges | portfolios | evidencias |
| -------------- | ---------- | ------------ | ---------- | ---------- |
| TABELAS VAZIAS | 0          | 0            | 2          | 0          |


-- ======================================
-- VALIDAR INTEGRIDADE
-- ======================================

-- Desafios vinculados a metodologias
SELECT 
  COUNT(*) as desafios_sem_metodologia
FROM alpha_desafios 
WHERE metodologia_id IS NULL;

| desafios_sem_metodologia |
| ------------------------ |
| 41                       |


-- Obras vinculadas a compositores
SELECT 
  COUNT(*) as obras_sem_compositor
FROM historia_obras 
WHERE compositor_id IS NULL;

| obras_sem_compositor |
| -------------------- |
| 4                    |


-- ======================================
-- MÓDULOS
-- ======================================
SELECT COUNT(*) as total_modulos FROM modulos;

| total_modulos |
| ------------- |
| 11            |


SELECT nome, ativo 
FROM modulos 
ORDER BY ordem 
LIMIT 10;


| nome                                          | ativo |
| --------------------------------------------- | ----- |
| Módulo 0 – Iniciação Sonora                   | true  |
| Ciclo Inicial                                 | true  |
| Módulo 1 – Primeiro Contato com o Instrumento | true  |
| Módulo Básico de Música                       | true  |
| Ciclo Fundamental                             | true  |
| Módulo 2 – Desenvolvimento Técnico            | true  |
| Ciclo Intermediário                           | true  |
| Módulo 3 – Repertório e Cultura Musical       | true  |
| Ciclo Avançado                                | true  |
| Módulo 4 – Criação Musical e Tecnologia       | true  |