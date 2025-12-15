-- ========================================
-- SCRIPT DE CORREÇÃO DE RELACIONAMENTOS
-- Preenche periodo_id e compositor_id faltantes
-- ========================================

-- ========================================
-- 1. CORRIGIR COMPOSITORES JAPONESES
-- ========================================

-- Yatsuhashi Kengyō → Período Edo
UPDATE historia_compositores
SET periodo_id = (SELECT id FROM historia_periodos WHERE nome = 'Período Edo (Japão)' LIMIT 1)
WHERE nome_completo = 'Yatsuhashi Kengyō' AND periodo_id IS NULL;

-- Rentarō Taki → Era Meiji
UPDATE historia_compositores
SET periodo_id = (SELECT id FROM historia_periodos WHERE nome = 'Era Meiji (Japão)' LIMIT 1)
WHERE nome_completo = 'Rentarō Taki' AND periodo_id IS NULL;

-- Kōsaku Yamada → Era Meiji
UPDATE historia_compositores
SET periodo_id = (SELECT id FROM historia_periodos WHERE nome = 'Era Meiji (Japão)' LIMIT 1)
WHERE nome_completo = 'Kōsaku Yamada' AND periodo_id IS NULL;

-- Tōru Takemitsu → Shōwa Pós-Guerra
UPDATE historia_compositores
SET periodo_id = (SELECT id FROM historia_periodos WHERE nome = 'Shōwa Pós-Guerra (Japão)' LIMIT 1)
WHERE nome_completo = 'Tōru Takemitsu' AND periodo_id IS NULL;

-- ========================================
-- 2. CORRIGIR COMPOSITORES BRASILEIROS
-- ========================================

-- Pixinguinha → Brasil Imperial (nasceu 1897, mas estilo do imperial)
UPDATE historia_compositores
SET periodo_id = (SELECT id FROM historia_periodos WHERE nome = 'Era do Rádio (Brasil)' LIMIT 1)
WHERE nome_completo = 'Alfredo da Rocha Viana Filho' AND periodo_id IS NULL;

-- Milton Nascimento → Música Brasileira Contemporânea
UPDATE historia_compositores
SET periodo_id = (SELECT id FROM historia_periodos WHERE nome = 'Música Brasileira Contemporânea' LIMIT 1)
WHERE nome_completo = 'Milton Silva Campos do Nascimento' AND periodo_id IS NULL;

-- ========================================
-- 3. CORRIGIR OBRAS SEM COMPOSITOR
-- ========================================

-- Canon em Ré maior → Johann Pachelbel (criar se não existir)
-- As Quatro Estações → Antonio Vivaldi (criar se não existir)
-- Messias → George Frideric Handel (criar se não existir)

-- Por enquanto vamos apenas verificar
SELECT 'Obras sem compositor que precisam ser corrigidas:' AS aviso;
SELECT titulo, ano_composicao
FROM historia_obras
WHERE compositor_id IS NULL;


| titulo             | ano_composicao |
| ------------------ | -------------- |
| As Quatro Estações | 1725           |
| Messias            | 1741           |
| Canon em Ré maior  | 1680           |

-- ========================================
-- 4. VERIFICAR RESULTADOS
-- ========================================

SELECT '=== COMPOSITORES AGORA COM PERÍODO ===' AS status;
SELECT nome_completo, pais_nascimento,
       (SELECT nome FROM historia_periodos WHERE id = periodo_id) AS periodo
FROM historia_compositores
WHERE nome_completo IN (
  'Yatsuhashi Kengyō',
  'Rentarō Taki',
  'Kōsaku Yamada',
  'Tōru Takemitsu',
  'Alfredo da Rocha Viana Filho',
  'Milton Silva Campos do Nascimento'
);

| nome_completo                     | pais_nascimento | periodo                         |
| --------------------------------- | --------------- | ------------------------------- |
| Yatsuhashi Kengyō                 | Japão           | Período Edo (Japão)             |
| Rentarō Taki                      | Japão           | Era Meiji (Japão)               |
| Kōsaku Yamada                     | Japão           | Era Meiji (Japão)               |
| Tōru Takemitsu                    | Japão           | Shōwa Pós-Guerra (Japão)        |
| Alfredo da Rocha Viana Filho      | Brasil          | Era do Rádio (Brasil)           |
| Milton Silva Campos do Nascimento | Brasil          | Música Brasileira Contemporânea |


SELECT '=== COMPOSITORES AINDA SEM PERÍODO ===' AS status;
SELECT nome_completo, pais_nascimento, EXTRACT(YEAR FROM data_nascimento) AS ano
FROM historia_compositores
WHERE periodo_id IS NULL
ORDER BY data_nascimento;

Success. No rows returned


