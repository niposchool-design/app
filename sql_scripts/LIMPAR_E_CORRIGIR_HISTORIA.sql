-- ========================================
-- LIMPEZA E CORREÇÃO DO BANCO DE DADOS
-- ========================================
-- Este script remove duplicatas e corrige relacionamentos
-- ORDEM IMPORTANTE: Obras → Compositores → Períodos (por causa das FKs)
-- ========================================

-- 1. REMOVER OBRAS DUPLICADAS PRIMEIRO (não tem dependências)
WITH obras_unicas AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY titulo, COALESCE(ano_composicao, 0) ORDER BY created_at) AS rn
  FROM historia_obras
)
DELETE FROM historia_obras
WHERE id IN (SELECT id FROM obras_unicas WHERE rn > 1);

-- 2. REMOVER COMPOSITORES DUPLICADOS (depois das obras)
WITH compositores_unicos AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY nome_completo, COALESCE(data_nascimento, '1900-01-01'::date) ORDER BY created_at) AS rn
  FROM historia_compositores
)
DELETE FROM historia_compositores
WHERE id IN (SELECT id FROM compositores_unicos WHERE rn > 1);

-- 3. REMOVER PERÍODOS DUPLICADOS POR ÚLTIMO (tem compositores dependentes)
WITH periodos_unicos AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY nome, periodo_inicio ORDER BY created_at) AS rn
  FROM historia_periodos
)
DELETE FROM historia_periodos
WHERE id IN (SELECT id FROM periodos_unicos WHERE rn > 1);

-- 4. VERIFICAR RESULTADOS
SELECT '=== PERÍODOS ÚNICOS ===' AS status;
SELECT COUNT(*) as total, COUNT(DISTINCT ordem_cronologica) as unicos
FROM historia_periodos;

| total | unicos |
| ----- | ------ |
| 23    | 23     |


SELECT '=== COMPOSITORES ÚNICOS ===' AS status;
SELECT COUNT(*) as total, COUNT(DISTINCT nome_completo) as unicos
FROM historia_compositores;

| total | unicos |
| ----- | ------ |
| 37    | 37     |


SELECT '=== OBRAS ÚNICAS ===' AS status;
SELECT COUNT(*) as total, COUNT(DISTINCT titulo) as unicos
FROM historia_obras;

| total | unicos |
| ----- | ------ |
| 26    | 26     |
