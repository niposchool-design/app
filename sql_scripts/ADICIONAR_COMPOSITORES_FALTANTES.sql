-- ========================================
-- ADICIONAR COMPOSITORES FALTANTES
-- Para as obras sem compositor
-- ========================================

-- 1. Johann Pachelbel (1653-1706) - Canon em Ré maior
INSERT INTO historia_compositores (
  nome_completo,
  nome_artistico,
  data_nascimento,
  data_falecimento,
  pais_nascimento,
  cidade_nascimento,
  periodo_id,
  biografia_curta,
  biografia_completa,
  principais_obras,
  estilo_musical,
  instrumentos_tocados,
  curiosidades,
  nivel_importancia,
  tags,
  ativo
) VALUES (
  'Johann Pachelbel',
  'Pachelbel',
  '1653-09-01',
  '1706-03-09',
  'Alemanha',
  'Nuremberg',
  (SELECT id FROM historia_periodos WHERE nome = 'Barroco' LIMIT 1),
  'Compositor e organista alemão do período Barroco. Conhecido principalmente por seu famoso Canon em Ré maior.',
  'Johann Pachelbel foi um compositor e organista alemão do período Barroco. Nasceu em Nuremberg em 1653. Foi um dos compositores mais importantes de sua época, especialmente famoso por suas obras para órgão e música de câmara. Seu Canon em Ré maior é uma das peças mais conhecidas da música clássica, embora tenha sido redescoberta apenas no século XX. Trabalhou em várias cidades alemãs e foi professor de Johann Christoph Bach, irmão mais velho de J.S. Bach. Sua música influenciou profundamente o desenvolvimento da fuga e do coral luterano.',
  ARRAY['Canon em Ré maior', 'Hexachordum Apollinis', 'Chaconne em Fá menor'],
  'Barroco Alemão',
  ARRAY['órgão', 'cravo'],
  '{"fatos": [
    {"titulo": "Sucesso Póstumo", "texto": "O Canon em Ré maior só se tornou popular 200 anos após sua morte, sendo redescoberto no século XX."},
    {"titulo": "Influência em Bach", "texto": "Foi professor do irmão mais velho de J.S. Bach e influenciou muito o estilo do grande compositor."}
  ]}'::jsonb,
  4,
  ARRAY['barroco', 'órgão', 'canon'],
  true
);

-- 2. Antonio Vivaldi (1678-1741) - As Quatro Estações
INSERT INTO historia_compositores (
  nome_completo,
  nome_artistico,
  data_nascimento,
  data_falecimento,
  pais_nascimento,
  cidade_nascimento,
  periodo_id,
  biografia_curta,
  biografia_completa,
  principais_obras,
  estilo_musical,
  instrumentos_tocados,
  curiosidades,
  nivel_importancia,
  tags,
  ativo
) VALUES (
  'Antonio Lucio Vivaldi',
  'Vivaldi',
  '1678-03-04',
  '1741-07-28',
  'Itália',
  'Veneza',
  (SELECT id FROM historia_periodos WHERE nome = 'Barroco' LIMIT 1),
  'Compositor e violinista italiano. Conhecido como "Il Prete Rosso" (O Padre Ruivo), autor de As Quatro Estações.',
  'Antonio Vivaldi foi um compositor e virtuoso violinista italiano do período Barroco. Nasceu em Veneza em 1678. Ordenado sacerdote católico, ficou conhecido como "Il Prete Rosso" devido aos seus cabelos ruivos. Trabalhou como professor de violino no Ospedale della Pietà, um orfanato para meninas. Compôs mais de 500 concertos, sendo As Quatro Estações sua obra mais famosa. Revolucionou o concerto barroco, estabelecendo a forma de três movimentos (rápido-lento-rápido). Sua música influenciou profundamente Bach, que transcreveu vários de seus concertos.',
  ARRAY['As Quatro Estações', 'Gloria em Ré maior', 'Concerto para Mandolim'],
  'Barroco Veneziano',
  ARRAY['violino', 'cravo'],
  '{"fatos": [
    {"titulo": "O Padre Ruivo", "texto": "Era sacerdote católico, mas raramente celebrava missa devido a problemas de saúde. Seus cabelos ruivos lhe renderam o apelido de Il Prete Rosso."},
    {"titulo": "Mestre das Meninas", "texto": "Ensinou música para meninas órfãs em Veneza, criando uma das melhores orquestras femininas da Europa."}
  ]}'::jsonb,
  5,
  ARRAY['barroco', 'violino', 'concerto'],
  true
);

-- 3. George Frideric Handel (1685-1759) - Messias
INSERT INTO historia_compositores (
  nome_completo,
  nome_artistico,
  data_nascimento,
  data_falecimento,
  pais_nascimento,
  cidade_nascimento,
  periodo_id,
  biografia_curta,
  biografia_completa,
  principais_obras,
  estilo_musical,
  instrumentos_tocados,
  curiosidades,
  nivel_importancia,
  tags,
  ativo
) VALUES (
  'Georg Friedrich Händel',
  'Handel',
  '1685-02-23',
  '1759-04-14',
  'Alemanha',
  'Halle',
  (SELECT id FROM historia_periodos WHERE nome = 'Barroco' LIMIT 1),
  'Compositor barroco alemão naturalizado britânico. Mestre dos oratórios, autor de Messias e Music for the Royal Fireworks.',
  'George Frideric Handel foi um compositor barroco alemão que se naturalizou britânico. Nasceu em Halle, Alemanha, em 1685, mesmo ano que Bach e Scarlatti. Mudou-se para Londres onde fez carreira brilhante. Foi o maior compositor de óperas italianas na Inglaterra e revolucionou o gênero do oratório em inglês. Seu Messias é uma das obras corais mais executadas da história. Compôs também música instrumental como Water Music e Music for the Royal Fireworks. Teve vida longa e produtiva, sendo enterrado na Abadia de Westminster com honras de estado.',
  ARRAY['Messias', 'Water Music', 'Music for the Royal Fireworks', 'Zadok the Priest'],
  'Barroco Inglês',
  ARRAY['cravo', 'órgão'],
  '{"fatos": [
    {"titulo": "Rival de Bach", "texto": "Nasceu no mesmo ano que Bach (1685), mas teve carreiras muito diferentes. Bach era mais tradicional, Handel mais cosmopolita e internacional."},
    {"titulo": "Hallelujah!", "texto": "O coro Hallelujah do Messias é tão famoso que o público britânico se levanta ao ouvi-lo, tradição iniciada pelo rei George II."}
  ]}'::jsonb,
  5,
  ARRAY['barroco', 'oratório', 'ópera'],
  true
);

-- ========================================
-- VINCULAR OBRAS AOS COMPOSITORES
-- ========================================

-- Vincular Canon em Ré maior a Pachelbel
UPDATE historia_obras
SET compositor_id = (SELECT id FROM historia_compositores WHERE nome_artistico = 'Pachelbel' LIMIT 1)
WHERE titulo = 'Canon em Ré maior';

-- Vincular As Quatro Estações a Vivaldi
UPDATE historia_obras
SET compositor_id = (SELECT id FROM historia_compositores WHERE nome_artistico = 'Vivaldi' LIMIT 1)
WHERE titulo = 'As Quatro Estações';

-- Vincular Messias a Handel
UPDATE historia_obras
SET compositor_id = (SELECT id FROM historia_compositores WHERE nome_artistico = 'Handel' LIMIT 1)
WHERE titulo = 'Messias';

-- ========================================
-- VERIFICAR RESULTADOS
-- ========================================

SELECT '=== NOVOS COMPOSITORES ADICIONADOS ===' AS status;
SELECT nome_artistico, pais_nascimento, 
       EXTRACT(YEAR FROM data_nascimento) AS ano_nascimento,
       (SELECT nome FROM historia_periodos WHERE id = periodo_id) AS periodo
FROM historia_compositores
WHERE nome_artistico IN ('Pachelbel', 'Vivaldi', 'Handel');

| nome_artistico | pais_nascimento | ano_nascimento | periodo |
| -------------- | --------------- | -------------- | ------- |
| Pachelbel      | Alemanha        | 1653           | Barroco |
| Vivaldi        | Itália          | 1678           | Barroco |
| Handel         | Alemanha        | 1685           | Barroco |


SELECT '=== OBRAS AGORA COM COMPOSITOR ===' AS status;
SELECT titulo, ano_composicao,
       (SELECT nome_artistico FROM historia_compositores WHERE id = compositor_id) AS compositor
FROM historia_obras
WHERE titulo IN ('Canon em Ré maior', 'As Quatro Estações', 'Messias');

| titulo             | ano_composicao | compositor |
| ------------------ | -------------- | ---------- |
| As Quatro Estações | 1725           | Vivaldi    |
| Canon em Ré maior  | 1680           | Pachelbel  |
| Messias            | 1741           | Handel     |


SELECT '=== TODAS AS OBRAS TÊM COMPOSITOR? ===' AS status;
SELECT COUNT(*) AS obras_sem_compositor
FROM historia_obras
WHERE compositor_id IS NULL;

| obras_sem_compositor |
| -------------------- |
| 0                    |

