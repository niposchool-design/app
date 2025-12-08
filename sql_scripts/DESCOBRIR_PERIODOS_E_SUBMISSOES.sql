-- ======================================
-- DESCOBRIR ESTRUTURA DE historia_periodos
-- ======================================

-- Ver colunas
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'historia_periodos'
ORDER BY ordinal_position;

| column_name                | data_type                | is_nullable |
| -------------------------- | ------------------------ | ----------- |
| id                         | uuid                     | NO          |
| nome                       | character varying        | NO          |
| periodo_inicio             | integer                  | YES         |
| periodo_fim                | integer                  | YES         |
| descricao_curta            | text                     | YES         |
| descricao_completa         | text                     | YES         |
| contexto_historico         | text                     | YES         |
| caracteristicas_principais | jsonb                    | YES         |
| imagem_capa_url            | text                     | YES         |
| cor_tematica               | character varying        | YES         |
| ordem_cronologica          | integer                  | YES         |
| ativo                      | boolean                  | YES         |
| created_at                 | timestamp with time zone | YES         |



-- Se der erro acima, tentar pegar dados diretamente
SELECT * FROM historia_periodos LIMIT 3;

| id                                   | nome         | periodo_inicio | periodo_fim | descricao_curta                                                                                                    | descricao_completa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | contexto_historico                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | caracteristicas_principais                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | imagem_capa_url                                                                                                                                                       | cor_tematica | ordem_cronologica | ativo | created_at                   |
| ------------------------------------ | ------------ | -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------- | ----- | ---------------------------- |
| db0214a5-ccf3-4068-ac3a-681450eaf06c | Medieval     | 500            | 1400        | Música da Idade Média, dominada pelo Cantochão e polifonia sacra da Igreja Católica                                | O período medieval da música ocidental abrange quase mil anos de desenvolvimento musical, desde a queda do Império Romano até o início do Renascimento. Caracteriza-se pela predominância da música litúrgica católica, com o desenvolvimento gradual do Cantochão (canto gregoriano) até formas polifônicas mais complexas como o organum e o moteto. A notação musical começou a ser sistematizada neste período por Guido dArezzo (século XI), permitindo a preservação e transmissão das obras. Os monastérios e catedrais eram os principais centros de criação musical, e a Igreja exercia controle absoluto sobre a produção musical erudita. A música secular também existia (trovadores, trouvères, Minnesänger), mas foi menos documentada. Compositores notáveis: Hildegard von Bingen, Léonin, Pérotin, Guillaume de Machaut.                                                                                                                                                                                                                                                                                                                                                   | Feudalismo, Cruzadas, surgimento de reinos nacionais, conflitos entre papado e império. Sociedade estamental, predominância da Igreja, surgimento de universidades medievais, Peste Negra (1347-1353). Arte românica e gótica, iluminuras de manuscritos, arquitetura de catedrais. Escolástica, tradução de textos árabes e gregos, desenvolvimento da medicina medieval.                                                                                                                                                                 | {"ritmo":"Livre e fluido no cantochão; desenvolvimento de modos rítmicos na polifonia (ars antiqua e ars nova no século XIV)","formas":"Cantochão/Canto Gregoriano, Organum, Moteto, Missa, Madrigal primitivo, formas seculares (balada, rondeau, virelai)","timbre":"Vozes masculinas predominantes, instrumentos de corda (vielle, alaúde) e sopro (flauta doce, charamela)","melodia":"Monódica (uma única linha melódica), modal (8 modos eclesiásticos), movimento predominante por graus conjuntos, âmbito melódico limitado","textura":"Monodia no canto gregoriano; desenvolvimento progressivo de polifonia de 2, 3 e até 4 vozes no final do período","harmonia":"Inicialmente inexistente; desenvolvimento gradual do organum (quintas e oitavas paralelas nos séculos IX-X), depois terças e sextas","inovacoes":["Notação neumática (séculos IX-X)","Sistema de tetragrama de Guido d'Arezzo (século XI)","Notação mensural (século XIII)","Solmização (ut-re-mi-fa-sol-la)"]}                                                                                                                                                                                                                                                                   | https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Meister_der_Manessischen_Liederhandschrift_004.jpg/800px-Meister_der_Manessischen_Liederhandschrift_004.jpg | #8B4513      | 1                 | true  | 2025-10-09 02:04:21.44846+00 |
| 40424e40-4c08-4885-a55f-a560c8dd90d7 | Renascimento | 1400           | 1600        | Florescimento da polifonia vocal, humanismo musical e surgimento da música instrumental autônoma                   | O Renascimento musical (c.1400-1600) representa a transição da música medieval para o período moderno. Caracteriza-se pelo desenvolvimento pleno da polifonia imitativa, com destaque para a missa e o moteto sacro, além do florescimento do madrigal secular italiano. O humanismo renascentista influenciou profundamente a música, com maior atenção ao texto e à expressão das palavras (madrigalismos, text painting). A imprensa musical, iniciada por Ottaviano Petrucci em Veneza (1501), revolucionou a disseminação de obras. Compositores como Josquin des Prez, Giovanni Pierluigi da Palestrina e Orlando di Lasso elevaram a polifonia vocal a níveis de sofisticação sem precedentes. A música instrumental começou a ganhar autonomia, deixando de ser apenas acompanhamento de danças. A Reforma Protestante (Lutero, 1517) e a Contrarreforma Católica (Concílio de Trento, 1545-1563) tiveram grande impacto na produção musical, com Palestrina respondendo às exigências de clareza textual. Escolas principais: Franco-flamenga (Josquin, Ockeghem), Italiana (Palestrina, Gabrieli), Espanhola (Victoria), Inglesa (Byrd, Tallis).                                   | Formação de estados nacionais, descobrimentos marítimos portugueses e espanhóis, Reforma Protestante (1517), Contrarreforma Católica, guerras religiosas. Ascensão da burguesia mercantil, mecenato artístico das famílias Medici e Este, surgimento do humanismo, imprensa de Gutenberg (1450). Perspectiva linear na pintura, arquitetura clássica revivida (Brunelleschi, Palladio), mestres: Leonardo da Vinci, Michelangelo, Rafael. Heliocentrismo de Copérnico (1543), anatomia de Vesalius, início do método científico.           | {"ritmo":"Mais livre e flexível que no Medieval, alinhamento texto-música (madrigalismos: figuralismos que pintam palavras)","formas":"Missa cíclica (Kyrie-Gloria-Credo-Sanctus-Agnus Dei), Moteto, Madrigal, Chanson francesa, Vilancico espanhol, Ricercar instrumental, Canzona","timbre":"Equilíbrio entre vozes, instrumentos de corda (família das violas da gamba, vihuela, alaúde) e sopro refinados (flauta doce, sacabuxa)","melodia":"Linhas vocais fluidas e cantáveis, imitativas, maior âmbito melódico do que na Idade Média, uso de ornamentação moderada","textura":"Polifonia imitativa plena (4-6 vozes iguais), desenvolvimento do contraponto florido, equilíbrio entre vozes (SATB)","harmonia":"Consolidação gradual do sistema tonal (tríades maior/menor), preparação de dissonâncias, cadências autênticas e plagais","inovacoes":["Notação mensural branca (século XV)","Impressão musical (Petrucci, Veneza 1501)","Desenvolvimento da tablatura para alaúde","Afinação mesotônica"]}                                                                                                                                                                                                                                             | https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Francesco_Rosselli_-_Ptolemaic_Chart.jpg/800px-Francesco_Rosselli_-_Ptolemaic_Chart.jpg                     | #DAA520      | 2                 | true  | 2025-10-09 02:04:21.44846+00 |
| d8c30e03-788e-4a90-970c-7585963b3949 | Barroco      | 1600           | 1750        | Época do baixo contínuo, nascimento da ópera e desenvolvimento do concerto. Ornamentação, drama e retórica musical | O período Barroco (1600-1750) é marcado pela dramaticidade, contraste dinâmico e ornamentação exuberante. Nasce a ópera em Florença (1600) com a Camerata Fiorentina (Peri, Caccini, Monteverdi), revolucionando a música dramática. O sistema tonal maior-menor se consolida definitivamente, substituindo os modos eclesiásticos. O baixo contínuo (basso continuo) torna-se a base harmônica obrigatória, com o cravo ou órgão realizando a harmonia cifrada sobre uma linha de baixo. Desenvolvem-se formas instrumentais: concerto grosso (Corelli, Vivaldi), sonata trio, suite de danças. A fuga atinge sua perfeição absoluta com J.S. Bach. A música serve à retórica dos afetos (Affektenlehre alemã): cada emoção tem sua representação musical codificada. O violino atinge maturidade técnica e acústica com os luthiers Stradivarius e Guarneri del Gesù. A música sacra luterana floresce (Bach, cantatas e paixões) enquanto a católica mantém tradição com música sacra italiana. Três estilos nacionais: italiano (ópera, concerto), francês (tragédie lyrique, suite), alemão (contraponto, música sacra). Compositores supremos: Monteverdi, Vivaldi, Handel, J.S. Bach. | Absolutismo (Luís XIV "Rei Sol", Versalhes), Guerra dos 30 Anos (1618-1648), colonização das Américas, ascensão da Prússia e Rússia como potências. Consolidação do sistema de cortes europeias, salões aristocráticos, primeiros teatros públicos de ópera (Veneza 1637). Caravaggio, Rembrandt, Velázquez, Rubens; arquitetura e escultura de Bernini, Palácio de Versalhes. Revolução científica: Galileu, Kepler, Newton (Principia 1687), Leibniz, telescópio, cálculo diferencial, física newtoniana, Harvey (circulação sanguínea). | {"ritmo":"Motórico (motor rítmico constante), ostinato rítmico, hemiola (3/2 vs 6/4), ritmos de dança estilizados (sarabanda grave, giga rápida, allemande, courante)","formas":"Fuga, Concerto Grosso, Sonata Trio (2 violinos + continuo), Suite de danças, Ópera seria/buffa, Oratório, Cantata, Paixão","timbre":"Violino substitui definitivamente as violas, orquestra barroca padrão (cordas + continuo + sopros dobrados), castrati na ópera italiana, trompete natural","melodia":"Fortemente ornamentada (trinados, mordentes, apogiaturas, gruppetti), contínua (técnica Fortspinnung: fiação contínua), sequências melódicas modulantes","textura":"Contraste tutti/soli (concerto grosso), terraced dynamics (mudanças súbitas de volume), policoralidade veneziana (Gabrieli), contrapontística (fuga)","harmonia":"Tonalismo consolidado (escala maior/menor), baixo contínuo cifrado, harmonia funcional (Tônica-Dominante-Subdominante), círculo de quintas, modulações para tons vizinhos","inovacoes":["Notação de baixo cifrado","Desenvolvimento da família do violino (Stradivarius 1644-1737, Guarneri del Gesù 1698-1744)","Sistema de afinação mesotônica evoluindo para temperamento igual","Codificação da notação de ornamentos"]} | https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Antonio_Stradivari.jpg/800px-Antonio_Stradivari.jpg                                                         | #4B0082      | 3                 | true  | 2025-10-09 02:04:21.44846+00 |


-- ======================================
-- PROBLEMA: DESAFIOS SEM METODOLOGIA
-- ======================================

-- Confirmar: quantos desafios têm metodologia?
    SELECT 
    COUNT(*) as total,
    COUNT(metodologia_id) as com_metodologia,
    COUNT(*) - COUNT(metodologia_id) as sem_metodologia
    FROM alpha_desafios;

| total | com_metodologia | sem_metodologia |
| ----- | --------------- | --------------- |
| 41    | 0               | 41              |



-- Ver alguns desafios com detalhes
SELECT 
  id,
  codigo,
  titulo,
  tipo_desafio,
  dificuldade,
  metodologia_id
FROM alpha_desafios 
LIMIT 10;

| id                                   | codigo     | titulo                             | tipo_desafio | dificuldade | metodologia_id |
| ------------------------------------ | ---------- | ---------------------------------- | ------------ | ----------- | -------------- |
| 2f3d37b2-8a8f-468a-8ba2-cfb20acdeff6 | AUDIO-001  | Grave sua Escala de Dó Maior       | semanal      | 1           | null           |
| 4a7efa31-c005-4d9c-9298-613a46b1634a | AUDIO-002  | Toque "Parabéns pra Você"          | semanal      | 1           | null           |
| 4379056d-d446-4a1d-9fba-daed126e091f | AUDIO-004  | Arpejo de Dó Maior                 | semanal      | 2           | null           |
| aa06bd63-a259-4780-a21b-630684361cd0 | AUDIO-005  | Improviso Livre - 30 segundos      | mensal       | 2           | null           |
| 3b022055-f164-42ee-8d4c-8d53f3dbf660 | VIDEO-001  | Apresentação Musical em Vídeo      | mensal       | 1           | null           |
| a47810f3-f995-44df-b6ce-e88afc9d1257 | AUDIO-003  | Exercício Rítmico: Semínimas       | semanal      | 1           | null           |
| 22f0a9f6-1cef-4ad0-ae4b-e131fc533571 | ALPHA_2025 | Desafio Alpha: Pioneiros da Música | especial     | 3           | null           |
| 86657191-13d6-4ae0-9645-fe78c7669ca1 | VIDEO-002  | Demonstração de Técnica            | mensal       | 2           | null           |
| 7bb4c394-cca2-480b-854c-14de626ad8a6 | TEXTO-001  | O que Música Significa para Você?  | diario       | 1           | null           |
| 55fb1327-1a05-4aaa-b125-8c5f52307aff | TEXTO-002  | Seu Compositor Favorito            | semanal      | 2           | null           |



-- IDs das metodologias disponíveis
SELECT id, nome, codigo 
FROM alpha_metodologias 
ORDER BY nome;

| id                                   | nome                           | codigo          |
| ------------------------------------ | ------------------------------ | --------------- |
| 5122d3b5-3f1e-4cb0-bc9b-ff6e140a51a2 | Berklee Method                 | berklee         |
| 99551ce6-bdc4-4cd2-b72f-728cc09f36ae | Dalcroze Eurythmics            | dalcroze        |
| 28ff3697-1df2-48a6-a961-2f10054a3720 | Lincoln Center Education       | LCE             |
| a5a5b85d-bace-4415-90bb-01c80cb1564c | Método Kodály                  | kodaly          |
| 8622a0d3-c389-47bf-a3a9-843bfcc293a2 | Método Suzuki                  | suzuki          |
| 68632b58-86b0-44e7-becc-69099e78764d | Musical Futures                | musical_futures |
| eaf8c6d8-d709-4b2a-8b6e-8ecdbbc772b0 | Music Learning Theory (Gordon) | gordon          |
| d64dac55-ed34-4f4d-93c7-d6fca955eff5 | Orff Schulwerk                 | orff_schulwerk  |
| a8a09c03-0771-4b2a-911b-8a357f312b63 | Pedagogia Waldorf Musical      | waldorf         |


-- ======================================
-- DESCOBRIR COLUNAS DE alpha_submissoes
-- ======================================

SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'alpha_submissoes'
ORDER BY ordinal_position;

| column_name            | data_type                | is_nullable | column_default                |
| ---------------------- | ------------------------ | ----------- | ----------------------------- |
| id                     | uuid                     | NO          | gen_random_uuid()             |
| user_id                | uuid                     | YES         | null                          |
| desafio_id             | uuid                     | YES         | null                          |
| titulo                 | character varying        | YES         | null                          |
| descricao              | text                     | YES         | null                          |
| evidencia_url          | text                     | YES         | null                          |
| evidencia_tipo         | character varying        | YES         | null                          |
| tempo_execucao_minutos | integer                  | YES         | null                          |
| auto_avaliacao         | jsonb                    | YES         | null                          |
| status                 | character varying        | YES         | 'pendente'::character varying |
| pontos_obtidos         | integer                  | YES         | 0                             |
| feedback_professor     | text                     | YES         | null                          |
| avaliacao_professor    | jsonb                    | YES         | null                          |
| data_submissao         | timestamp with time zone | YES         | now()                         |
| data_avaliacao         | timestamp with time zone | YES         | null                          |
| created_at             | timestamp with time zone | YES         | now()                         |
| updated_at             | timestamp with time zone | YES         | now()                         |

