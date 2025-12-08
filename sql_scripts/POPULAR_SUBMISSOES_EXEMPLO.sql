-- ======================================
-- POPULAR alpha_submissoes COM EXEMPLOS
-- Criar submissões de teste para validar o sistema
-- ======================================

-- IMPORTANTE: Você precisa ter IDs de usuários reais!
-- Substitua os UUIDs abaixo pelos IDs de alunos do seu sistema

-- ======================================
-- VERIFICAR USUÁRIOS DISPONÍVEIS
-- ======================================
-- Execute primeiro para pegar IDs reais:

-- OPÇÃO 1: Verificar structure da tabela alunos
-- OPÇÃO 1: Verificar IDs de alunos reais
SELECT * FROM alunos LIMIT 5;

| id                                   | instrumento | nivel    | turma | data_ingresso | ativo | criado_em                  | instrumento_id                       | turma_principal_id                   |
| ------------------------------------ | ----------- | -------- | ----- | ------------- | ----- | -------------------------- | ------------------------------------ | ------------------------------------ |
| 840f99c4-7479-4098-9c2e-474a695178f0 | trompete    | beginner | null  | 2025-05-27    | true  | 2025-05-27 18:56:17.453178 | 509d6a26-159a-4976-aa46-83f914f930aa | null                                 |
| 9064ab32-12ce-415a-8c19-51b566608ee5 | violoncelo  | beginner | null  | 2025-05-27    | true  | 2025-05-27 20:38:51.625846 | 412c40b6-f4fc-4379-9d6f-5ce0ec2d669d | null                                 |
| a57eeb22-a246-4243-8e32-98297c6f3bad | teclado     | beginner | null  | 2025-05-27    | true  | 2025-05-27 22:08:47.91411  | 8bd473f1-7b35-4b9e-869a-17fb73c6e047 | null                                 |
| 54e79a05-59f7-4cc8-b67f-f522a1b452e4 | flauta      | beginner | null  | 2025-05-27    | true  | 2025-05-27 15:52:58.712165 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | 6b144088-27f3-421a-92be-24a1e4a05661 |
| c91f1974-e102-46dd-b1c3-ba3f06c039af | flauta      | beginner | null  | 2025-05-29    | true  | 2025-05-29 13:26:14.287741 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | 6b144088-27f3-421a-92be-24a1e4a05661 |


-- OPÇÃO 2: Verificar auth.users (se necessário)
-- SELECT id, email FROM auth.users LIMIT 5;

-- OPÇÃO 3: Verificar profiles (se necessário)
-- SELECT id, email FROM profiles LIMIT 5;


-- ======================================
-- SUBMISSÕES DE EXEMPLO
-- ======================================

-- EXEMPLO 1: Submissão de áudio (Escala de Dó Maior)
-- Aluno: Jose Carlos Oliveira (trompete)
INSERT INTO alpha_submissoes (
  user_id,
  desafio_id,
  titulo,
  descricao,
  evidencia_url,
  evidencia_tipo,
  tempo_execucao_minutos,
  auto_avaliacao,
  status,
  pontos_obtidos
) VALUES (
  '840f99c4-7479-4098-9c2e-474a695178f0', -- Jose Carlos (trompete)
  '2f3d37b2-8a8f-468a-8ba2-cfb20acdeff6', -- Desafio: Grave sua Escala de Dó Maior
  'Minha Escala de Dó Maior no Trompete',
  'Pratiquei durante uma semana e consegui tocar sem erros!',
  'https://soundcloud.com/exemplo/escala-do-maior-trompete',
  'audio',
  15,
  '{
    "dificuldade_percebida": 3,
    "tempo_pratica": "1 semana",
    "pontos_fortes": ["Ritmo constante", "Notas limpas"],
    "pontos_melhorar": ["Velocidade", "Dinâmica"]
  }'::jsonb,
  'pendente',
  0
);

-- EXEMPLO 2: Submissão de vídeo (Parabéns pra Você)
-- Aluna: Nicolly Mello de Camargo (teclado)
INSERT INTO alpha_submissoes (
  user_id,
  desafio_id,
  titulo,
  descricao,
  evidencia_url,
  evidencia_tipo,
  tempo_execucao_minutos,
  auto_avaliacao,
  status,
  pontos_obtidos
) VALUES (
  'a57eeb22-a246-4243-8e32-98297c6f3bad', -- Nicolly (teclado)
  '4a7efa31-c005-4d9c-9298-613a46b1634a', -- Desafio: Toque "Parabéns pra Você"
  'Parabéns no Teclado',
  'Gravei tocando a música completa com mão direita e esquerda',
  'https://youtube.com/exemplo/parabens-teclado',
  'video',
  30,
  '{
    "dificuldade_percebida": 2,
    "tempo_pratica": "3 dias",
    "pontos_fortes": ["Coordenação das mãos"],
    "pontos_melhorar": ["Pedal"]
  }'::jsonb,
  'aprovado',
  80
);

-- EXEMPLO 3: Submissão de texto (Reflexão sobre música)
-- Aluno: Violoncelo
INSERT INTO alpha_submissoes (
  user_id,
  desafio_id,
  titulo,
  descricao,
  evidencia_url,
  evidencia_tipo,
  tempo_execucao_minutos,
  auto_avaliacao,
  status,
  pontos_obtidos
) VALUES (
  '9064ab32-12ce-415a-8c19-51b566608ee5', -- Aluno de violoncelo
  '7bb4c394-cca2-480b-854c-14de626ad8a6', -- Desafio: O que Música Significa para Você?
  'A Música na Minha Vida',
  'Para mim, música é uma forma de expressar sentimentos que palavras não conseguem. Quando toco violoncelo, sinto que posso compartilhar minha alegria, tristeza ou emoções complexas através das notas. A música me conecta com outras pessoas e com culturas diferentes. O som grave e profundo do violoncelo me permite expressar emoções que vão do mais profundo lamento à alegria mais intensa.',
  null, -- Texto não precisa de URL
  'texto',
  25,
  '{
    "dificuldade_percebida": 1,
    "reflexao_profunda": true,
    "pontos_fortes": ["Sinceridade", "Clareza", "Conexão com o instrumento"],
    "pontos_melhorar": ["Aprofundar exemplos musicais"]
  }'::jsonb,
  'aprovado',
  100
);

-- EXEMPLO 4: Submissão com feedback do professor
-- Aluno de flauta (primeiro da lista)
INSERT INTO alpha_submissoes (
  user_id,
  desafio_id,
  titulo,
  descricao,
  evidencia_url,
  evidencia_tipo,
  tempo_execucao_minutos,
  auto_avaliacao,
  status,
  pontos_obtidos,
  feedback_professor,
  avaliacao_professor,
  data_avaliacao
) VALUES (
  '54e79a05-59f7-4cc8-b67f-f522a1b452e4', -- Aluno de flauta
  'a47810f3-f995-44df-b6ce-e88afc9d1257', -- Desafio: Exercício Rítmico: Semínimas
  'Exercício Rítmico Completo',
  'Gravei batendo palmas no ritmo de semínimas',
  'https://soundcloud.com/exemplo/ritmo-seminimas',
  'audio',
  10,
  '{
    "dificuldade_percebida": 2,
    "tempo_pratica": "2 dias"
  }'::jsonb,
  'aprovado',
  90,
  'Muito bom! Seu ritmo está consistente. Para melhorar, tente adicionar variações dinâmicas (forte/piano) mantendo o mesmo pulso.',
  '{
    "criterios": {
      "precisao_ritmica": 9,
      "consistencia_tempo": 10,
      "expressividade": 7
    },
    "nota_geral": 9
  }'::jsonb,
  NOW()
);

-- ======================================
-- VERIFICAÇÃO DAS SUBMISSÕES
-- ======================================
SELECT 
  s.titulo,
  d.titulo as desafio,
  s.evidencia_tipo,
  s.status,
  s.pontos_obtidos,
  s.data_submissao
FROM alpha_submissoes s
JOIN alpha_desafios d ON d.id = s.desafio_id
ORDER BY s.data_submissao DESC;


| titulo                               | desafio                           | evidencia_tipo | status   | pontos_obtidos | data_submissao                |
| ------------------------------------ | --------------------------------- | -------------- | -------- | -------------- | ----------------------------- |
| Minha Escala de Dó Maior no Trompete | Grave sua Escala de Dó Maior      | audio          | pendente | 0              | 2025-12-08 15:15:17.045176+00 |
| Parabéns no Teclado                  | Toque "Parabéns pra Você"         | video          | aprovado | 80             | 2025-12-08 15:15:17.045176+00 |
| A Música na Minha Vida               | O que Música Significa para Você? | texto          | aprovado | 100            | 2025-12-08 15:15:17.045176+00 |
| Exercício Rítmico Completo           | Exercício Rítmico: Semínimas      | audio          | aprovado | 90             | 2025-12-08 15:15:17.045176+00 |


-- Contagem por status
SELECT 
  status,
  COUNT(*) as total
FROM alpha_submissoes
GROUP BY status;


| status   | total |
| -------- | ----- |
| aprovado | 3     |
| pendente | 1     |


-- Contagem por tipo de evidência
SELECT 
  evidencia_tipo,
  COUNT(*) as total
FROM alpha_submissoes
GROUP BY evidencia_tipo;


| evidencia_tipo | total |
| -------------- | ----- |
| texto          | 1     |
| audio          | 2     |
| video          | 1     |
