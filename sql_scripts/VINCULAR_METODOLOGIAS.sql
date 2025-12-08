-- ======================================
-- VINCULAR DESAFIOS ÀS METODOLOGIAS
-- Baseado em características pedagógicas
-- ======================================

-- ESTRATÉGIA DE VINCULAÇÃO:
-- 
-- Método Suzuki (suzuki): Foco em técnica, escalas, arpejos, imitação
-- Dalcroze (dalcroze): Exercícios rítmicos, movimento, corporalidade
-- Kodály (kodaly): Leitura musical, solfejo, teoria
-- Orff Schulwerk (orff_schulwerk): Improvisação, criatividade, composição
-- Musical Futures (musical_futures): Experimentação livre, escolha do aluno
-- Gordon (gordon): Padrões melódicos/rítmicos, audição interior
-- Waldorf (waldorf): Expressão artística, reflexão, diários
-- Berklee Method (berklee): Performance, técnica avançada, demonstrações
-- Lincoln Center Education (LCE): Cultura musical, compositores, história

-- ======================================
-- 1. MÉTODO SUZUKI - Técnica e Escalas
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = '8622a0d3-c389-47bf-a3a9-843bfcc293a2'
WHERE titulo LIKE '%Escala%' 
   OR titulo LIKE '%Arpejo%'
   OR titulo LIKE '%Técnica%'
   OR codigo IN ('AUDIO-001', 'AUDIO-004');

-- ======================================
-- 2. DALCROZE - Exercícios Rítmicos
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = '99551ce6-bdc4-4cd2-b72f-728cc09f36ae'
WHERE titulo LIKE '%Rítmico%'
   OR titulo LIKE '%Ritmo%'
   OR codigo = 'AUDIO-003';

-- ======================================
-- 3. KODÁLY - Leitura e Teoria
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = 'a5a5b85d-bace-4415-90bb-01c80cb1564c'
WHERE titulo LIKE '%Leitura%'
   OR titulo LIKE '%Solfejo%'
   OR titulo LIKE '%Teoria%'
   OR tipo_desafio = 'quiz';

-- ======================================
-- 4. ORFF SCHULWERK - Improvisação e Criação
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = 'd64dac55-ed34-4f4d-93c7-d6fca955eff5'
WHERE titulo LIKE '%Improviso%'
   OR titulo LIKE '%Criação%'
   OR titulo LIKE '%Composição%'
   OR titulo LIKE '%Crie sua%'
   OR codigo = 'AUDIO-005';

-- ======================================
-- 5. MUSICAL FUTURES - Experimentação Livre
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = '68632b58-86b0-44e7-becc-69099e78764d'
WHERE titulo LIKE '%Livre%'
   OR titulo LIKE '%Experimente%'
   OR titulo LIKE '%Explore%';

-- ======================================
-- 6. WALDORF - Reflexão e Expressão
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = 'a8a09c03-0771-4b2a-911b-8a357f312b63'
WHERE tipo_desafio = 'diario'
   OR titulo LIKE '%Significa%'
   OR titulo LIKE '%Reflexão%'
   OR titulo LIKE '%Diário%'
   OR codigo = 'TEXTO-001';

-- ======================================
-- 7. LINCOLN CENTER EDUCATION - Cultura e História
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = '28ff3697-1df2-48a6-a961-2f10054a3720'
WHERE titulo LIKE '%Compositor%'
   OR titulo LIKE '%História%'
   OR titulo LIKE '%Cultura%'
   OR titulo LIKE '%Favorito%'
   OR codigo IN ('TEXTO-002', 'ALPHA_2025');

-- ======================================
-- 8. BERKLEE METHOD - Performance e Demonstração
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = '5122d3b5-3f1e-4cb0-bc9b-ff6e140a51a2'
WHERE titulo LIKE '%Apresentação%'
   OR titulo LIKE '%Demonstração%'
   OR titulo LIKE '%Performance%'
   OR codigo IN ('VIDEO-001', 'VIDEO-002');

-- ======================================
-- 9. GORDON - Padrões e Audição
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = 'eaf8c6d8-d709-4b2a-8b6e-8ecdbbc772b0'
WHERE titulo LIKE '%Padrão%'
   OR titulo LIKE '%Audição%'
   OR titulo LIKE '%Memória%';

-- ======================================
-- 10. DESAFIOS MUSICAIS GERAIS → SUZUKI (fallback)
-- ======================================
-- Para músicas específicas que não se encaixaram
UPDATE alpha_desafios 
SET metodologia_id = '8622a0d3-c389-47bf-a3a9-843bfcc293a2'
WHERE metodologia_id IS NULL
  AND (titulo LIKE '%Toque%' 
       OR titulo LIKE '%Articulação%'
       OR titulo LIKE '%Acorde%'
       OR titulo LIKE '%Dinâmica%'
       OR titulo LIKE '%Velocidade%'
       OR titulo LIKE '%Ornamentos%'
       OR titulo LIKE '%Precisão%'
       OR codigo IN ('AUDIO-007', 'AUDIO-008', 'AUDIO-009', 'AUDIO-011', 'AUDIO-013', 'AUDIO-014'));

-- ======================================
-- 11. MPB e INTERPRETAÇÃO → MUSICAL FUTURES
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = '68632b58-86b0-44e7-becc-69099e78764d'
WHERE metodologia_id IS NULL
  AND (titulo LIKE '%MPB%'
       OR codigo = 'AUDIO-010');

-- ======================================
-- 12. TEORIA MUSICAL (QUIZ) → KODÁLY
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = 'a5a5b85d-bace-4415-90bb-01c80cb1564c'
WHERE metodologia_id IS NULL
  AND (titulo LIKE '%Intervalos%'
       OR titulo LIKE '%Acordes%'
       OR titulo LIKE '%Harmonia%'
       OR codigo IN ('QUIZ-003', 'QUIZ-005'));

-- ======================================
-- 13. CRIAÇÃO E EXPLORAÇÃO → ORFF SCHULWERK
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = 'd64dac55-ed34-4f4d-93c7-d6fca955eff5'
WHERE metodologia_id IS NULL
  AND (titulo LIKE '%Crie%'
       OR titulo LIKE '%Explor%'
       OR titulo LIKE '%Original%'
       OR titulo LIKE '%Gênero Musical%'
       OR codigo IN ('TEXTO-005', 'TEXTO-006'));

-- ======================================
-- 14. PERFORMANCE EM GRUPO → BERKLEE
-- ======================================
UPDATE alpha_desafios 
SET metodologia_id = '5122d3b5-3f1e-4cb0-bc9b-ff6e140a51a2'
WHERE metodologia_id IS NULL
  AND (titulo LIKE '%Duo%'
       OR titulo LIKE '%Colega%'
       OR titulo LIKE '%Emoção%'
       OR titulo LIKE '%Recital%'
       OR codigo IN ('VIDEO-005', 'VIDEO-006', 'VIDEO-007'));

-- ======================================
-- VERIFICAÇÃO FINAL
-- ======================================
SELECT 
  'RESULTADO' as status,
  COUNT(*) as total_desafios,
  COUNT(metodologia_id) as com_metodologia,
  COUNT(*) - COUNT(metodologia_id) as ainda_sem_metodologia
FROM alpha_desafios;

| status    | total_desafios | com_metodologia | ainda_sem_metodologia |
| --------- | -------------- | --------------- | --------------------- |
| RESULTADO | 41             | 41              | 0                     |


-- Distribuição por metodologia
SELECT 
  m.nome as metodologia,
  m.codigo,
  COUNT(d.id) as total_desafios
FROM alpha_metodologias m
LEFT JOIN alpha_desafios d ON d.metodologia_id = m.id
GROUP BY m.id, m.nome, m.codigo
ORDER BY total_desafios DESC;

| metodologia                    | codigo          | total_desafios |
| ------------------------------ | --------------- | -------------- |
| Método Suzuki                  | suzuki          | 13             |
| Berklee Method                 | berklee         | 9              |
| Método Kodály                  | kodaly          | 7              |
| Pedagogia Waldorf Musical      | waldorf         | 4              |
| Lincoln Center Education       | LCE             | 3              |
| Orff Schulwerk                 | orff_schulwerk  | 2              |
| Musical Futures                | musical_futures | 2              |
| Dalcroze Eurythmics            | dalcroze        | 1              |
| Music Learning Theory (Gordon) | gordon          | 0              |


-- Listar desafios que ainda não têm metodologia (se houver)
SELECT 
  codigo,
  titulo,
  tipo_desafio,
  dificuldade
FROM alpha_desafios
WHERE metodologia_id IS NULL
ORDER BY codigo;

