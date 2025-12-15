-- ========================================
-- POPULAR HISTÓRIA DA MÚSICA - JAPÃO + BRASIL
-- ========================================
-- Este script COMPLEMENTA o banco com dados de história da música
-- focando em tradições japonesas e brasileiras
-- O banco já contém: Medieval (1-8), Jazz (9), MPB (10), Bossa Nova (11), Rock (12)
-- Começaremos a numeração em 13 para não conflitar
-- ========================================

-- ========================================
-- 1. PERÍODOS HISTÓRICOS - JAPÃO
-- ========================================

INSERT INTO historia_periodos (
  nome, 
  periodo_inicio, 
  periodo_fim, 
  descricao_curta, 
  descricao_completa,
  contexto_historico,
  caracteristicas_principais,
  cor_tematica,
  ordem_cronologica,
  ativo
) VALUES 

-- Período Heian (794-1185)
(
  'Período Heian (Japão)',
  794,
  1185,
  'Era dourada da cultura japonesa, origem do gagaku e música de corte',
  'O Período Heian marca o apogeu da cultura aristocrática japonesa. A música gagaku (música da corte imperial) foi consolidada nesta época, combinando influências chinesas, coreanas e tradições nativas japonesas. Instrumentos como biwa, koto e shakuhachi começaram a ser refinados.',
  'Transferência da capital para Heian-kyō (Kyoto). Era de paz e florescimento cultural. Isolamento gradual da China. Desenvolvimento da escrita kana.',
  '{"topicos": ["Gagaku - música da corte imperial", "Instrumentos: biwa, koto, fue", "Influências chinesas e coreanas", "Música budista shomyo"], "instrumentos_principais": ["biwa", "koto", "shakuhachi", "hichiriki"], "compositores_destaque": []}',
  '#9b59b6',
  13,
  true
),

-- Período Kamakura (1185-1333)
(
  'Período Kamakura (Japão)',
  1185,
  1333,
  'Surgimento do teatro Noh e música dos samurais',
  'Com o estabelecimento do shogunato em Kamakura, emerge uma cultura mais austera dos samurais. O teatro Noh começa a se desenvolver, combinando dança, drama e música. O shakuhachi torna-se instrumento dos monges zen.',
  'Primeira era do shogunato. Ascensão da classe samurai. Difusão do budismo zen. Ameaça das invasões mongóis.',
  '{"topicos": ["Teatro Noh nascente", "Shakuhachi zen", "Música militar taiko", "Cantos budistas"], "instrumentos_principais": ["shakuhachi", "taiko", "fue", "tsuzumi"], "compositores_destaque": ["Kan''ami", "Zeami"]}',
  '#3498db',
  14,
  true
),

-- Período Edo (1603-1868)
(
  'Período Edo (Japão)',
  1603,
  1868,
  'Florescimento do kabuki, shamisen e música popular urbana',
  'O longo período de paz Tokugawa permitiu extraordinário desenvolvimento cultural urbano. O teatro kabuki floresce nas grandes cidades. O shamisen torna-se extremamente popular. Surgem os primeiros estilos de música popular japonesa.',
  'Isolamento do Japão (sakoku). Crescimento urbano de Edo (Tóquio). Florescimento da cultura popular. Paz prolongada sob os Tokugawa.',
  '{"topicos": ["Teatro Kabuki", "Shamisen e música narrativa", "Música popular urbana", "Tradições matsuri"], "instrumentos_principais": ["shamisen", "koto", "shakuhachi", "taiko"], "compositores_destaque": ["Yatsuhashi Kengyō", "Ikuta Kengyō"]}',
  '#e74c3c',
  15,
  true
),

-- Período Meiji (1868-1912)
(
  'Era Meiji (Japão)',
  1868,
  1912,
  'Modernização e fusão com música ocidental',
  'A Restauração Meiji traz profundas mudanças. Música ocidental é introduzida nas escolas. Primeiros compositores japoneses treinados em técnicas europeias. Início da música híbrida nipônica-ocidental.',
  'Fim do shogunato. Restauração imperial. Modernização acelerada. Abertura ao Ocidente. Industrialização.',
  '{"topicos": ["Introdução da música ocidental", "Educação musical moderna", "Primeiros compositores híbridos", "Bandas militares"], "instrumentos_principais": ["piano", "violino", "flauta transversal", "koto modernizado"], "compositores_destaque": ["Rentarō Taki", "Kōsaku Yamada"]}',
  '#f39c12',
  16,
  true
),

-- Período Shōwa Pós-Guerra (1945-1989)
(
  'Shōwa Pós-Guerra (Japão)',
  1945,
  1989,
  'Reconstrução, enka e primeiros passos do J-Pop',
  'Após a Segunda Guerra, o Japão reconstrói sua identidade musical. O enka preserva tradições melódicas japonesas. Surgem as primeiras influências do rock e pop ocidental. Desenvolvimento da indústria musical moderna.',
  'Ocupação americana. Reconstrução. Milagre econômico japonês. Influências culturais ocidentais. Modernização tecnológica.',
  '{"topicos": ["Enka tradicional", "Primeiras bandas de rock", "Influências do jazz americano", "TV e rádio nacionais"], "instrumentos_principais": ["guitarra elétrica", "piano", "bateria", "shamisen no enka"], "compositores_destaque": ["Masao Koga", "Ryōichi Hattori"]}',
  '#16a085',
  17,
  true
),

-- J-Pop Contemporâneo (1990-hoje)
(
  'J-Pop Contemporâneo',
  1990,
  2025,
  'J-Pop, J-Rock, música anime e influência global',
  'O J-Pop torna-se fenômeno global. Música para anime e games atinge audiência mundial. Artistas como Hikaru Utada, Perfume e BABYMETAL reinventam o pop japonês. Vocaloid e música eletrônica ganham destaque.',
  'Bolha econômica e recessão. Era digital. Internet e streaming. Cool Japan. Globalização cultural.',
  '{"topicos": ["J-Pop mainstream", "Anime music", "Vocaloid (Hatsune Miku)", "Visual Kei e J-Rock"], "instrumentos_principais": ["sintetizadores", "DAW digital", "guitarra", "bateria eletrônica"], "compositores_destaque": ["Yoko Kanno", "Yuki Kajiura", "Hiroyuki Sawano"]}',
  '#e91e63',
  18,
  true
);

-- ========================================
-- 2. PERÍODOS HISTÓRICOS - BRASIL
-- ========================================

INSERT INTO historia_periodos (
  nome, 
  periodo_inicio, 
  periodo_fim, 
  descricao_curta, 
  descricao_completa,
  contexto_historico,
  caracteristicas_principais,
  cor_tematica,
  ordem_cronologica,
  ativo
) VALUES 

-- Brasil Colonial (1500-1822)
(
  'Brasil Colonial',
  1500,
  1822,
  'Encontro de culturas: indígena, africana e portuguesa',
  'A música colonial brasileira resulta do encontro de três matrizes culturais. Música sacra europeia trazida pelos jesuítas. Ritmos e instrumentos africanos dos escravizados. Tradições musicais indígenas. Destaque para o barroco mineiro.',
  'Colonização portuguesa. Escravidão africana. Catequização indígena. Ciclos do açúcar e ouro. Missões jesuítas.',
  '{"topicos": ["Música sacra barroca", "Tradições indígenas", "Influências africanas", "Compositores mulatos mineiros"], "instrumentos_principais": ["viola", "berimbau", "atabaque", "maracá"], "compositores_destaque": ["José Maurício Nunes Garcia", "Lobo de Mesquita"]}',
  '#8b4513',
  19,
  true
),

-- Brasil Imperial (1822-1889)
(
  'Brasil Imperial',
  1822,
  1889,
  'Consolidação do choro, modinha e música de salão',
  'Com a independência, o Brasil desenvolve identidade musical própria. Surgem o choro no Rio de Janeiro e a modinha romântica. Influências europeias mesclam-se com ritmos afro-brasileiros. Carlos Gomes leva ópera brasileira à Europa.',
  'Independência. Monarquia. Café como motor econômico. Urbanização do Rio de Janeiro. Abolição gradual da escravidão.',
  '{"topicos": ["Choro carioca nascente", "Modinha romântica", "Óperas de Carlos Gomes", "Música de salão"], "instrumentos_principais": ["cavaquinho", "violão", "flauta", "piano"], "compositores_destaque": ["Carlos Gomes", "Chiquinha Gonzaga", "Joaquim Callado"]}',
  '#1abc9c',
  20,
  true
),

-- Era do Rádio (1930-1950)
(
  'Era do Rádio (Brasil)',
  1930,
  1950,
  'Samba, marchinha de carnaval e ouro da música popular',
  'A era de ouro da música brasileira. Samba se consolida como identidade nacional. Rádio Nacional difunde música por todo o país. Surgem grandes intérpretes e compositores. Carmen Miranda conquista Hollywood.',
  'Era Vargas. Consolidação urbana. Rádio como mídia de massa. Exaltação do samba. Segunda Guerra Mundial.',
  '{"topicos": ["Samba de morro", "Marchinha de carnaval", "Samba-canção", "Era de ouro"], "instrumentos_principais": ["violão de 7 cordas", "cavaquinho", "pandeiro", "tamborim"], "compositores_destaque": ["Noel Rosa", "Ary Barroso", "Dorival Caymmi", "Pixinguinha"]}',
  '#f1c40f',
  21,
  true
),

-- MPB e Tropicália (1965-1980) - complementando o período MPB existente
(
  'MPB e Tropicália',
  1965,
  1980,
  'Experimentação, protesto e fusão de estilos',
  'Período de intensa criatividade e experimentação. Festivais de MPB revelam novos talentos. Tropicália mistura rock, baião, samba e vanguarda. Música torna-se veículo de protesto contra ditadura.',
  'Ditadura militar. Censura. Festivais de TV. Exílio de artistas. Contracultura. AI-5.',
  '{"topicos": ["Festivais da Record e Globo", "Tropicália antropofágica", "Canção de protesto", "MPB consolidada"], "instrumentos_principais": ["guitarra elétrica", "berimbau", "teclados", "bateria"], "compositores_destaque": ["Caetano Veloso", "Gilberto Gil", "Chico Buarque", "Elis Regina"]}',
  '#9b59b6',
  22,
  true
),

-- Música Brasileira Contemporânea (1980-hoje)
(
  'Música Brasileira Contemporânea',
  1980,
  2025,
  'Sertanejo, funk, rap, samba e diversidade sem limites',
  'A música brasileira diversifica-se enormemente. Sertanejo universitário domina charts. Funk carioca conquista periferias e elite. Rap e hip-hop ganham voz política. Samba e MPB renovam-se. Música brasileira é remix cultural constante.',
  'Redemocratização. Internet e streaming. Globalização. Diversidade de nichos. Independentes e majors.',
  '{"topicos": ["Sertanejo universitário", "Funk carioca", "Rap e hip-hop brasileiro", "Nova MPB"], "instrumentos_principais": ["violão", "guitarra", "teclados", "samples digitais"], "compositores_destaque": ["Djavan", "Milton Nascimento", "Emicida", "Anitta"]}',
  '#e74c3c',
  23,
  true
);

-- ========================================
-- 3. COMPOSITORES JAPONESES
-- ========================================

INSERT INTO historia_compositores (
  nome_completo,
  nome_artistico,
  data_nascimento,
  data_falecimento,
  pais_nascimento,
  biografia_curta,
  biografia_completa,
  principais_obras,
  periodo_id,
  estilo_musical,
  curiosidades,
  nivel_importancia,
  ativo
) VALUES

-- Yatsuhashi Kengyō (Período Edo)
(
  'Yatsuhashi Kengyō',
  'Yatsuhashi',
  '1614-01-01',
  '1685-01-01',
  'Japão',
  'Considerado fundador da escola de koto moderna. Revolucionou a técnica e composição para koto, criando o estilo danmono e adaptando músicas populares.',
  'Yatsuhashi Kengyō nasceu em Kyoto durante o início do período Edo. Cego desde a infância, dedicou-se completamente à música do koto. Revolucionou o instrumento ao criar o estilo danmono (composições em seções) e ao adaptar músicas populares para koto solo, antes tocado apenas como acompanhamento. Suas inovações permitiram que o koto se tornasse um instrumento de concerto. Fundou a escola Yatsuhashi de koto, que influencia músicos até hoje.',
  ARRAY['Rokudan no Shirabe', 'Midare'],
  (SELECT id FROM historia_periodos WHERE nome = 'Período Edo' LIMIT 1),
  'Música de corte japonesa, Koto clássico',
  '[{"titulo": "O koto de 13 cordas", "texto": "Antes de Yatsuhashi, o koto tinha principalmente papel de acompanhamento. Ele desenvolveu técnicas que permitiram ao instrumento de 13 cordas contar histórias musicais complexas sozinho."},
    {"titulo": "Cegueira e genialidade", "texto": "Como muitos músicos japoneses da época, Yatsuhashi era cego. A tradição de músicos cegos (mōsō) era respeitada no Japão, e muitos dos maiores mestres de koto eram cegos."}]',
  5,
  true
),

-- Rentarō Taki (Era Meiji)
(
  'Rentarō Taki',
  'Taki',
  '1879-11-24',
  '1903-06-29',
  'Japão',
  'Primeiro compositor japonês a estudar música ocidental profissionalmente. Suas canções líricas mesclam sensibilidade japonesa com técnicas europeias. Morreu jovem, mas deixou legado importante.',
  'Rentarō Taki foi pioneiro na fusão da música ocidental com a sensibilidade japonesa. Estudou no Conservatório de Música de Tóquio, onde aprendeu piano e composição ocidental. Suas composições, especialmente "Kōjō no Tsuki" (Lua sobre Castelo em Ruínas), tornaram-se parte do coração cultural japonês. Morreu tragicamente aos 23 anos de tuberculose, mas suas poucas obras criaram um modelo para gerações de compositores japoneses que buscavam unir duas tradições musicais.',
  ARRAY['Kōjō no Tsuki (Lua sobre castelo em ruínas)', 'Hana (Flores)'],
  (SELECT id FROM historia_periodos WHERE nome = 'Era Meiji' LIMIT 1),
  'Lied japonês, Canção artística',
  '[{"titulo": "Morreu aos 23 anos", "texto": "Taki morreu jovem de tuberculose, mas suas canções tornaram-se eternamente populares no Japão. Kōjō no Tsuki é ensinada em todas as escolas japonesas."},
    {"titulo": "Ponte entre dois mundos", "texto": "Suas composições usam harmonia ocidental mas mantêm a alma melancólica das escalas pentatônicas japonesas, criando um estilo único que definiu a canção japonesa moderna."}]',
  4,
  true
),

-- Kōsaku Yamada (Moderno)
(
  'Kōsaku Yamada',
  'Yamada',
  '1886-06-09',
  '1965-12-29',
  'Japão',
  'Pioneiro da música sinfônica japonesa. Estudou em Berlim com Max Bruch. Fundou a primeira orquestra sinfônica profissional do Japão. Compôs óperas, sinfonias e canções.',
  'Kōsaku Yamada foi o arquiteto da música orquestral japonesa moderna. Estudou composição em Berlim com Max Bruch e foi influenciado pelo romantismo alemão. Ao retornar ao Japão, fundou a primeira orquestra sinfônica profissional do país e compôs a primeira ópera japonesa em estilo ocidental. Sua obra "Kurai Tobira" (Porta Escura) tornou-se uma das canções mais amadas do Japão. Durante sua longa vida, foi mentor de toda uma geração de compositores japoneses.',
  ARRAY['Kurai Tobira (Porta Escura)', 'Nagauta Symphony'],
  (SELECT id FROM historia_periodos WHERE nome = 'Era Meiji' LIMIT 1),
  'Sinfonia, Ópera, Lied',
  '[{"titulo": "Estudou com Max Bruch", "texto": "Em Berlim, Yamada foi aluno de Max Bruch, compositor alemão famoso pelo Concerto para Violino nº 1. Essa formação europeia foi crucial para sua missão de criar música orquestral japonesa."},
    {"titulo": "Fundador de orquestras", "texto": "Yamada não apenas compôs, mas construiu a infraestrutura musical do Japão moderno, fundando orquestras e instituições de ensino musical."}]',
  5,
  true
),

-- Tōru Takemitsu (Contemporâneo)
(
  'Tōru Takemitsu',
  'Takemitsu',
  '1930-10-08',
  '1996-02-20',
  'Japão',
  'Compositor mais influente do Japão pós-guerra. Mesclou técnicas de vanguarda ocidental com estética japonesa. Compôs para filmes de Kurosawa e para principais orquestras mundiais.',
  'Tōru Takemitsu é considerado o maior compositor japonês do século XX. Autodidata, foi profundamente influenciado por Debussy e pela música concreta francesa, mas sempre manteve conexão profunda com a estética japonesa do ma (間 - espaço/silêncio). Suas obras como "November Steps" combinam orquestra ocidental com instrumentos tradicionais como biwa e shakuhachi. Compôs mais de 90 trilhas sonoras para cinema, incluindo filmes de Akira Kurosawa. Suas composições são tocadas pelas principais orquestras mundiais.',
  ARRAY['November Steps', 'Requiem for Strings', 'From Me Flows What You Call Time'],
  (SELECT id FROM historia_periodos WHERE nome = 'Shōwa Pós-Guerra' LIMIT 1),
  'Música contemporânea, Avant-garde, Trilhas sonoras',
  '[{"titulo": "O conceito de Ma (間)", "texto": "Takemitsu incorporou o conceito japonês de ma - o espaço e silêncio significativo - em sua música. Para ele, o silêncio não era ausência, mas presença."},
    {"titulo": "Trilhas para Kurosawa", "texto": "Compôs música para filmes de Akira Kurosawa, incluindo \"Ran\" e \"Kagemusha\", levando a música japonesa contemporânea ao cinema mundial."}]',
  5,
  true
),

-- Yoko Kanno (J-Pop/Anime)
(
  'Yoko Kanno',
  'Kanno',
  '1963-03-18',
  NULL,
  'Japão',
  'Compositora prolífica de trilhas sonoras para anime. Versatilidade impressionante: jazz, rock, eletrônica, orquestral. Conhecida por Cowboy Bebop, Ghost in the Shell e Macross Plus.',
  'Yoko Kanno é uma das compositoras mais versáteis e respeitadas da música japonesa. Conhecida principalmente por suas trilhas sonoras de anime, domina praticamente todos os gêneros musicais: jazz fusion, rock, eletrônica, música clássica, folk, e muito mais. "Tank!", tema de abertura de Cowboy Bebop, é considerada uma das melhores músicas de anime de todos os tempos. Trabalha frequentemente com a banda The Seatbelts e já compôs para jogos, filmes live-action e comerciais. Sua habilidade de capturar a essência emocional de uma narrativa através da música é lendária.',
  ARRAY['Tank! (Cowboy Bebop)', 'Inner Universe (Ghost in the Shell)', 'Voices'],
  (SELECT id FROM historia_periodos WHERE nome = 'J-Pop Contemporâneo' LIMIT 1),
  'Trilhas sonoras, Jazz fusion, J-Pop, Eletrônica',
  '[{"titulo": "Mestre de todos os gêneros", "texto": "Kanno pode compor big band jazz numa semana, música eletrônica experimental na seguinte, e uma balada orquestral depois. Sua versatilidade é incomparável."},
    {"titulo": "The Seatbelts", "texto": "Formou a banda The Seatbelts especificamente para Cowboy Bebop, reunindo músicos de jazz de elite do Japão para criar o som único da série."}]',
  5,
  true
),

-- Ryuichi Sakamoto
(
  'Ryuichi Sakamoto',
  'Sakamoto',
  '1952-01-17',
  '2023-03-28',
  'Japão',
  'Músico visionário. Pioneiro da música eletrônica com Yellow Magic Orchestra. Oscar por trilha de "O Último Imperador". Ativista ambiental. Mesclou eletrônica, clássico e experimental.',
  'Ryuichi Sakamoto foi um dos músicos mais influentes e inovadores do Japão. Começou como pioneiro da música eletrônica nos anos 1970 com o Yellow Magic Orchestra, que influenciou techno, hip-hop e música eletrônica mundial. Venceu o Oscar de Melhor Trilha Sonora por "O Último Imperador" (1987). Sua carreira solo explorou fusões únicas de eletrônica, música clássica contemporânea e sons ambientais. Ativista anti-nuclear após Fukushima, usou sua música para causas humanitárias. Continuou criando até sua morte em 2023, deixando legado imenso.',
  ARRAY['Merry Christmas Mr. Lawrence', 'Energy Flow', 'Async'],
  (SELECT id FROM historia_periodos WHERE nome = 'J-Pop Contemporâneo' LIMIT 1),
  'Música eletrônica, Avant-garde, Trilhas sonoras',
  '[{"titulo": "Yellow Magic Orchestra", "texto": "Nos anos 1970-80, YMO foi pioneiro absoluto da música eletrônica, influenciando Kraftwerk, hip-hop e techno. Foram os primeiros a usar sintetizadores e samplers de forma criativa."},
    {"titulo": "Oscar e ativismo", "texto": "Ganhou Oscar por \"O Último Imperador\" e usou sua fama para ativismo ambiental e anti-nuclear, especialmente após o desastre de Fukushima."}]',
  5,
  true
),

-- Joe Hisaishi
(
  'Mamoru Fujisawa',
  'Joe Hisaishi',
  '1950-12-06',
  NULL,
  'Japão',
  'Compositor das trilhas dos filmes de Hayao Miyazaki (Studio Ghibli). Suas melodias emocionantes definem a sonoridade dos animes japoneses. Minimalismo orquestral com toques japoneses.',
  'Joe Hisaishi (nome artístico de Mamoru Fujisawa) é o compositor por trás da magia sonora do Studio Ghibli. Sua parceria com Hayao Miyazaki produziu algumas das trilhas de anime mais amadas: "Meu Amigo Totoro", "A Viagem de Chihiro", "O Castelo Animado", "Princesa Mononoke". Seu estilo combina minimalismo inspirado em Philip Glass com melodias profundamente emotivas e toques da música tradicional japonesa. Suas trilhas não apenas acompanham os filmes - elas contam histórias paralelas que capturam a essência mágica dos mundos de Miyazaki.',
  ARRAY['Tonari no Totoro Theme', 'One Summer''s Day (A Viagem de Chihiro)', 'The Wind Forest'],
  (SELECT id FROM historia_periodos WHERE nome = 'J-Pop Contemporâneo' LIMIT 1),
  'Trilhas sonoras, Orquestral, Minimalismo',
  '[{"titulo": "Parceria com Miyazaki", "texto": "Hisaishi e Miyazaki têm uma das parcerias mais icônicas da história do cinema. Hisaishi compôs para praticamente todos os filmes de Miyazaki desde Nausicaä."},
    {"titulo": "Influência de Philip Glass", "texto": "Começou carreira compondo música minimalista influenciada por Philip Glass e Steve Reich, antes de se tornar o compositor definitivo do anime."}]',
  5,
  true
);

-- ========================================
-- 4. COMPOSITORES BRASILEIROS
-- ========================================

INSERT INTO historia_compositores (
  nome_completo,
  nome_artistico,
  data_nascimento,
  data_falecimento,
  pais_nascimento,
  biografia_curta,
  biografia_completa,
  principais_obras,
  periodo_id,
  estilo_musical,
  curiosidades,
  nivel_importancia,
  ativo
) VALUES

-- Carlos Gomes (Imperial)
(
  'Antônio Carlos Gomes',
  'Carlos Gomes',
  '1836-07-11',
  '1896-09-16',
  'Brasil',
  'Primeiro compositor brasileiro de projeção internacional. Suas óperas, especialmente "Il Guarany", foram aclamadas na Europa. Levou temática brasileira para a ópera italiana.',
  'Carlos Gomes nasceu em Campinas, São Paulo, filho de maestro. Estudou no Conservatório do Rio de Janeiro e, com bolsa de Dom Pedro II, foi para a Itália estudar no Conservatório de Milão. Sua ópera "Il Guarany" (1870), baseada no romance de José de Alencar, estreou no Teatro alla Scala com sucesso triunfal. Foi o primeiro compositor das Américas a ter uma ópera encenada no Scala. Suas óperas mesclam bel canto italiano com temáticas indigenistas e brasileiras. É patrono da cadeira nº 15 da Academia Brasileira de Música.',
  ARRAY['Il Guarany', 'Lo Schiavo', 'Fosca'],
  (SELECT id FROM historia_periodos WHERE nome = 'Brasil Imperial' LIMIT 1),
  'Ópera, Música sacra',
  '[{"titulo": "Sucesso no La Scala", "texto": "Il Guarany foi aclamado no Teatro alla Scala de Milão em 1870. Para um brasileiro conquistar o templo da ópera italiana foi feito histórico sem precedentes."},
    {"titulo": "Protegido de D. Pedro II", "texto": "O imperador Dom Pedro II financiou seus estudos na Itália e sempre apoiou sua carreira. Carlos Gomes ficou devastado com a Proclamação da República que exilou seu patrono."}]',
  5,
  true
),

-- Chiquinha Gonzaga (Imperial/República)
(
  'Francisca Edwiges Neves Gonzaga',
  'Chiquinha Gonzaga',
  '1847-10-17',
  '1935-02-28',
  'Brasil',
  'Primeira compositora popular brasileira de destaque. Pioneira em direitos autorais. Compôs mais de 2000 obras, incluindo a primeira marchinha de carnaval. Ativista abolicionista.',
  'Chiquinha Gonzaga foi revolucionária em todos os sentidos. Em uma época em que mulheres não tinham direitos, divorciou-se, perdeu a guarda dos filhos e tornou-se pianeira profissional. Compôs "Ó Abre Alas" (1899), a primeira marchinha de carnaval do Brasil. Foi abolicionista e republicana fervorosa. Fundou a Sociedade Brasileira de Autores Teatrais (SBAT), lutando pelos direitos autorais dos compositores. Compôs mais de 2000 músicas, incluindo operetas, maxixes, valsas e choros. Tocou piano até os 87 anos, sendo uma das artistas mais longevas e produtivas do Brasil.',
  ARRAY['Ó Abre Alas', 'Forrobodó', 'Corta-Jaca'],
  (SELECT id FROM historia_periodos WHERE nome = 'Brasil Imperial' LIMIT 1),
  'Choro, Maxixe, Marchinha',
  '[{"titulo": "Primeira compositora brasileira", "texto": "Em uma época dominada por homens, Chiquinha quebrou todas as barreiras: divorciou-se, perdeu os filhos, e tornou-se pianeira profissional, algo escandaloso para a sociedade imperial."},
    {"titulo": "Criadora de SBAT", "texto": "Fundou a Sociedade Brasileira de Autores Teatrais (1917), primeira organização de direitos autorais do Brasil, garantindo que compositores fossem pagos por suas obras."}]',
  5,
  true
),

-- Pixinguinha (Era do Rádio)
(
  'Alfredo da Rocha Viana Filho',
  'Pixinguinha',
  '1897-04-23',
  '1973-02-17',
  'Brasil',
  'Gênio do choro e um dos maiores músicos brasileiros. Flautista e saxofonista virtuoso. Suas composições e arranjos definiram a estrutura do choro moderno. Revolucionou a música instrumental brasileira.',
  'Pixinguinha é considerado um dos maiores músicos da história do Brasil. Nascido no bairro de Piedade, Rio de Janeiro, filho de músico, aos 14 anos já era flautista profissional. Revolucionou o choro com suas composições sofisticadas e arranjos inovadores. "Carinhoso" é uma das músicas mais gravadas da história brasileira. Viajou a Paris com o grupo Os Oito Batutas em 1922, levando música brasileira à Europa. Como arranjador da Rádio Nacional, orquestrou centenas de músicas. Seu estilo único combinou o choro tradicional com influências do jazz, criando a sonoridade que define a música brasileira instrumental.',
  ARRAY['Carinhoso', 'Lamentos', 'Um a Zero', 'Rosa'],
  (SELECT id FROM historia_periodos WHERE nome = 'Era do Rádio' LIMIT 1),
  'Choro, Samba, Maxixe',
  '[{"titulo": "Os Oito Batutas em Paris", "texto": "Em 1922, levou o grupo Os Oito Batutas para tocar em Paris, apresentando choro e samba para a Europa pela primeira vez, seis meses antes da Semana de Arte Moderna."},
    {"titulo": "Arranjador da Rádio Nacional", "texto": "Orquestrou centenas de sambas e marchinhas para a Rádio Nacional, criando a sonoridade característica da Era de Ouro da música brasileira."}]',
  5,
  true
),

-- Tom Jobim (Bossa Nova)
(
  'Antônio Carlos Brasileiro de Almeida Jobim',
  'Tom Jobim',
  '1927-01-25',
  '1994-12-08',
  'Brasil',
  'Maior compositor brasileiro. Criador da bossa nova com João Gilberto. Suas canções são standards mundiais do jazz. "Garota de Ipanema" é a segunda música mais gravada da história.',
  'Tom Jobim é o compositor brasileiro mais importante de todos os tempos. Pianista, compositor e arranjador, criou a bossa nova ao lado de João Gilberto e Vinicius de Moraes no final dos anos 1950. "Garota de Ipanema", composta com Vinicius, é a segunda música mais gravada da história (depois de Yesterday dos Beatles). Suas composições são standards do jazz mundial, gravadas por Frank Sinatra, Ella Fitzgerald, Stan Getz e inúmeros outros. Mestre das harmonias sofisticadas, influenciado por Debussy e Villa-Lobos, criou um idioma musical único que definiu o Brasil para o mundo. O Aeroporto Internacional do Rio de Janeiro leva seu nome.',
  ARRAY['Garota de Ipanema', 'Chega de Saudade', 'Águas de Março', 'Desafinado', 'Wave'],
  (SELECT id FROM historia_periodos WHERE nome = 'Bossa Nova' LIMIT 1),
  'Bossa Nova, MPB, Jazz brasileiro',
  '[{"titulo": "Garota de Ipanema", "texto": "Segunda música mais gravada da história mundial, atrás apenas de Yesterday dos Beatles. Já foram registradas mais de 3000 versões em dezenas de idiomas."},
    {"titulo": "Harmonias de Debussy no samba", "texto": "Tom Jobim estudou profundamente Debussy e Villa-Lobos, trazendo harmonias impressionistas francesas para o ritmo do samba, criando a sofisticação única da bossa nova."}]',
  5,
  true
),

-- Vinicius de Moraes (Bossa Nova)
(
  'Marcus Vinicius da Cruz e Mello Moraes',
  'Vinicius de Moraes',
  '1913-10-19',
  '1980-07-09',
  'Brasil',
  'Poeta e compositor. Parceiro de Tom Jobim na criação da bossa nova. Diplomata que escolheu a música. Suas letras elevam a canção popular brasileira à poesia maior.',
  'Vinicius de Moraes foi poeta, dramaturgo, diplomata e compositor. Conhecido como "o poetinha", suas letras transformaram a canção popular brasileira em alta poesia. Diplomata de carreira, serviu em Los Angeles, Paris e Montevidéu, mas a música sempre foi sua paixão. Parceiro de Tom Jobim, Baden Powell, Toquinho e muitos outros, escreveu algumas das mais belas letras da música brasileira. "Garota de Ipanema", "Chega de Saudade", "Aquarela do Brasil" - todas com letras que são poemas. Casou-se nove vezes e dizia: "Sou essencialmente um homem de amor". Sua obra poético-musical é patrimônio da língua portuguesa.',
  ARRAY['Garota de Ipanema', 'Chega de Saudade', 'Eu Sei Que Vou Te Amar', 'Aquarela do Brasil'],
  (SELECT id FROM historia_periodos WHERE nome = 'Bossa Nova' LIMIT 1),
  'Bossa Nova, MPB, Samba-canção',
  '[{"titulo": "Diplomata poeta", "texto": "Foi diplomata brasileiro servindo em vários países, mas pediu demissão em 1968 para se dedicar à música. O Itamaraty considerava suas atividades boêmias \"incompatíveis\" com a carreira diplomática."},
    {"titulo": "Nove casamentos", "texto": "Casou-se nove vezes e dizia que era \"essencialmente um homem de amor\". Suas canções românticas refletem essa paixão intensa pela vida e pelo amor."}]',
  5,
  true
),

-- Chico Buarque (MPB/Tropicália)
(
  'Francisco Buarque de Hollanda',
  'Chico Buarque',
  '1944-06-19',
  NULL,
  'Brasil',
  'Compositor, escritor e dramaturgo. Mestre da palavra na canção. Suas músicas denunciaram a ditadura com sofisticação poética. Vencedor de múltiplos festivais. Um dos maiores letristas da língua portuguesa.',
  'Chico Buarque é um dos maiores artistas brasileiros vivos. Filho do historiador Sérgio Buarque de Hollanda, desde jovem mostrou talento extraordinário para a palavra. Venceu festivais nos anos 1960 com "A Banda" e "Roda Viva". Durante a ditadura militar, suas letras inteligentes e metafóricas driblavam a censura enquanto denunciavam o regime - "Apesar de Você", "Cálice". Criou heterônimos como Julinho da Adelaide para burlar censores. Além de compositor, é romancista premiado ("Budapeste", "Leite Derramado"). Suas letras têm qualidade literária rara, trabalhando com trocadilhos, metáforas e estruturas poéticas complexas como em "Construção".',
  ARRAY['Construção', 'Apesar de Você', 'Cálice', 'Gota d''Água', 'O Que Será'],
  (SELECT id FROM historia_periodos WHERE nome = 'MPB e Tropicália' LIMIT 1),
  'MPB, Samba, Canção de protesto',
  '[{"titulo": "Construção", "texto": "Em \"Construção\", todas as palavras terminam em proparoxítonas, criando efeito poético único. A letra genial narra a morte de um operário, denunciando condições de trabalho desumanas."},
    {"titulo": "Julinho da Adelaide", "texto": "Criou o heterônimo Julinho da Adelaide para burlar a censura da ditadura. Músicas censuradas eram \"liberadas\" quando atribuídas ao jovem compositor desconhecido."}]',
  5,
  true
),

-- Caetano Veloso (Tropicália)
(
  'Caetano Emanuel Viana Teles Veloso',
  'Caetano Veloso',
  '1942-08-07',
  NULL,
  'Brasil',
  'Líder do movimento Tropicália. Revolucionou a MPB misturando rock, baião, samba e vanguarda. Exilado pela ditadura. Sua obra questiona e reinventa continuamente a música brasileira.',
  'Caetano Veloso é um dos artistas mais importantes da cultura brasileira. Nascido em Santo Amaro da Purificação, Bahia, foi líder do movimento Tropicália (1967-68), que revolucionou a música brasileira ao incorporar rock, guitarras elétricas, poesia concreta e antropofagia oswaldiana. "Alegria, Alegria" e "Tropicália" chocaram e renovaram a MPB. Preso e exilado pela ditadura militar (1969-72), viveu em Londres. Sua obra é marcada pela experimentação constante e reflexão sobre identidade brasileira. Além de músico, é ensaísta e pensador cultural. Influenciou gerações de artistas e continua produzindo aos 80 anos.',
  ARRAY['Tropicália', 'Alegria, Alegria', 'Sampa', 'O Quereres', 'Cucurrucucu Paloma'],
  (SELECT id FROM historia_periodos WHERE nome = 'MPB e Tropicália' LIMIT 1),
  'Tropicália, MPB, Rock, Experimental',
  '[{"titulo": "Prisão e exílio", "texto": "Em 1968, foi preso pela ditadura militar junto com Gilberto Gil. Depois de meses presos, foram exilados. Viveu em Londres de 1969 a 1972."},
    {"titulo": "Tropicália antropofágica", "texto": "O movimento Tropicália retomou a ideia de antropofagia de Oswald de Andrade: devorar influências estrangeiras e recriá-las com identidade brasileira."}]',
  5,
  true
),

-- Gilberto Gil (Tropicália)
(
  'Gilberto Passos Gil Moreira',
  'Gilberto Gil',
  '1942-06-26',
  NULL,
  'Brasil',
  'Cofundador da Tropicália. Mescla rock, reggae, baião e samba. Ex-Ministro da Cultura. Guitarrista virtuoso. Sua obra une tradição e experimentação. Ativista cultural e político.',
  'Gilberto Gil é um dos maiores nomes da música brasileira. Nascido em Salvador, Bahia, foi cofundador do movimento Tropicália ao lado de Caetano Veloso. Mestre em mesclar estilos - do baião ao reggae, do samba ao rock - sua versatilidade musical é impressionante. Guitarrista virtuoso, foi um dos primeiros a usar guitarra elétrica na MPB. Preso e exilado pela ditadura (1969-72), voltou e continuou produzindo obras seminais. Foi Ministro da Cultura (2003-2008), onde defendeu cultura digital livre e software livre. "Aquele Abraço" virou hino do Rio. Sua música "Toda Menina Baiana" celebra a cultura afro-baiana. Continua em atividade, ícone da cultura brasileira.',
  ARRAY['Aquele Abraço', 'Toda Menina Baiana', 'Refazenda', 'Expresso 2222', 'Parabolicamará'],
  (SELECT id FROM historia_periodos WHERE nome = 'MPB e Tropicália' LIMIT 1),
  'Tropicália, MPB, Reggae, Afro-brasileiro',
  '[{"titulo": "Ministro da Cultura", "texto": "Foi Ministro da Cultura do Brasil de 2003 a 2008, defendendo democratização cultural, pontos de cultura e cultura digital livre."},
    {"titulo": "Aquele Abraço", "texto": "Composta em 1969 antes do exílio forçado, a música despede-se do Brasil com ironia e afeto. Tornou-se hino carioca e é tocada em toda festa."}]',
  5,
  true
),

-- Milton Nascimento (MPB Contemporânea)
(
  'Milton Silva Campos do Nascimento',
  'Milton Nascimento',
  '1942-10-26',
  NULL,
  'Brasil',
  'Voz inconfundível, considerada uma das maiores do mundo. Suas harmonias sofisticadas e melodias emocionantes transcendem gêneros. Clube da Esquina renovou a MPB. Admirado por músicos de jazz mundialmente.',
  'Milton Nascimento possui uma das vozes mais extraordinárias da história da música. Nascido no Rio de Janeiro, criado em Três Pontas, Minas Gerais, sua voz tem alcance e timbre únicos. Venceu o II Festival Internacional da Canção com "Travessia" (1967). Líder do movimento Clube da Esquina, ao lado de Lô Borges, Fernando Brant e Toninho Horta, criou um som que mescla MPB, jazz, rock, música erudita e raízes mineiras. Álbuns como "Clube da Esquina" (1972) e "Minas" (1975) são obras-primas absolutas. Suas harmonias sofisticadas influenciaram jazz musicians como Wayne Shorter e Herbie Hancock. "Maria Maria" e "Ponta de Areia" são hinos brasileiros.',
  ARRAY['Travessia', 'Clube da Esquina', 'Maria Maria', 'Ponta de Areia', 'Encontros e Despedidas'],
  (SELECT id FROM historia_periodos WHERE nome = 'Música Contemporânea' LIMIT 1),
  'MPB, Jazz brasileiro, Clube da Esquina',
  '[{"titulo": "Voz única", "texto": "Sua voz tem alcance de três oitavas e um timbre impossível de classificar. Wayne Shorter disse que a voz de Milton é um dos sons mais bonitos que já ouviu."},
    {"titulo": "Clube da Esquina", "texto": "O movimento Clube da Esquina (nome de uma esquina em Belo Horizonte onde os músicos se reuniam) criou uma fusão única de MPB, jazz, rock e música mineira."}]',
  5,
  true
);

-- ========================================
-- 5. OBRAS MUSICAIS - JAPÃO
-- ========================================

INSERT INTO historia_obras (
  titulo,
  compositor_id,
  periodo_id,
  ano_composicao,
  duracao_minutos,
  tipo_obra,
  descricao,
  ativo
) VALUES

-- Rokudan no Shirabe
(
  'Rokudan no Shirabe',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Yatsuhashi' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'Período Edo' LIMIT 1),
  1614,
  10,
  'Instrumental',
  'Obra fundamental do repertório de koto. Estruturada em seis movimentos (dan), exemplifica o estilo danmono. Melodia contemplativa que explora as possibilidades técnicas do koto.',
  true
),

-- Kōjō no Tsuki
(
  'Kōjō no Tsuki (Lua sobre Castelo em Ruínas)',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Taki' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'Era Meiji' LIMIT 1),
  1901,
  3,
  'Canção',
  'Canção melancólica sobre ruínas de castelos japoneses. Melodia que mescla escalas pentatônicas japonesas com harmonias ocidentais. Uma das canções mais amadas do Japão.',
  true
),

-- November Steps
(
  'November Steps',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Takemitsu' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'Shōwa Pós-Guerra' LIMIT 1),
  1967,
  15,
  'Orquestral',
  'Obra revolucionária que combina orquestra ocidental com biwa e shakuhachi tradicionais. Encomendada pela Filarmônica de Nova York. Marco da fusão entre Oriente e Ocidente.',
  true
),

-- Tank! (Cowboy Bebop)
(
  'Tank!',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Kanno' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'J-Pop Contemporâneo' LIMIT 1),
  1998,
  4,
  'Trilha Sonora',
  'Tema de abertura do anime Cowboy Bebop. Jazz fusion energético com big band. Uma das músicas de anime mais icônicas de todos os tempos.',
  true
),

-- Merry Christmas Mr. Lawrence
(
  'Merry Christmas Mr. Lawrence',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Sakamoto' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'J-Pop Contemporâneo' LIMIT 1),
  1983,
  5,
  'Trilha Sonora',
  'Tema principal do filme homônimo. Melodia minimalista hipnótica que mescla tristeza e esperança. Uma das composições mais reconhecidas de Sakamoto.',
  true
),

-- Tonari no Totoro Theme
(
  'Tonari no Totoro - Tema Principal',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Joe Hisaishi' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'J-Pop Contemporâneo' LIMIT 1),
  1988,
  3,
  'Trilha Sonora',
  'Tema do filme Meu Amigo Totoro (Studio Ghibli). Melodia alegre e infantil que captura a magia da infância. Reconhecida mundialmente.',
  true
);

-- ========================================
-- 6. OBRAS MUSICAIS - BRASIL
-- ========================================

INSERT INTO historia_obras (
  titulo,
  compositor_id,
  periodo_id,
  ano_composicao,
  duracao_minutos,
  tipo_obra,
  descricao,
  ativo
) VALUES

-- Il Guarany
(
  'Il Guarany (Ópera)',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Carlos Gomes' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'Brasil Imperial' LIMIT 1),
  1870,
  180,
  'Ópera',
  'Ópera em quatro atos baseada no romance de José de Alencar. Estreou no Teatro alla Scala de Milão com grande sucesso. Temática indígena brasileira em formato operístico italiano.',
  true
),

-- Ó Abre Alas
(
  'Ó Abre Alas',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Chiquinha Gonzaga' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'Brasil Imperial' LIMIT 1),
  1899,
  3,
  'Marchinha de Carnaval',
  'Primeira marchinha de carnaval da história brasileira. Composta para o cordão carnavalesco Rosa de Ouro. Marco inaugural do carnaval carioca moderno.',
  true
),

-- Carinhoso
(
  'Carinhoso',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Pixinguinha' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'Era do Rádio' LIMIT 1),
  1917,
  4,
  'Choro',
  'Choro-canção mais famoso do Brasil. Melodia inesquecível que virou símbolo da música brasileira. Gravado por inúmeros artistas em diferentes estilos.',
  true
),

-- Garota de Ipanema
(
  'Garota de Ipanema (The Girl from Ipanema)',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Tom Jobim' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'Bossa Nova' LIMIT 1),
  1962,
  3,
  'Bossa Nova',
  'Segunda música mais gravada da história (depois de Yesterday dos Beatles). Hino da bossa nova. Harmonias sofisticadas em melodia aparentemente simples.',
  true
),

-- Águas de Março
(
  'Águas de Março',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Tom Jobim' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'Bossa Nova' LIMIT 1),
  1972,
  4,
  'Canção',
  'Obra-prima de Tom Jobim. Letra que é poesia pura, enumerando imagens cotidianas. Melodia que sobe e desce como chuva. Eleita a melhor canção brasileira de todos os tempos.',
  true
),

-- Construção
(
  'Construção',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Chico Buarque' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'MPB e Tropicália' LIMIT 1),
  1971,
  6,
  'MPB',
  'Obra-prima da canção brasileira. Letra genial com todas as palavras terminadas em proparoxítonas. Denúncia social da vida do operário. Revolucionou a poesia na música.',
  true
),

-- Tropicália
(
  'Tropicália',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Caetano Veloso' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'MPB e Tropicália' LIMIT 1),
  1968,
  4,
  'Tropicália',
  'Manifesto musical do movimento tropicalista. Mescla alegoria, crítica social, poesia concreta e sons experimentais. Guitarra elétrica encontra berimbau.',
  true
),

-- Aquele Abraço
(
  'Aquele Abraço',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Gilberto Gil' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'MPB e Tropicália' LIMIT 1),
  1969,
  3,
  'MPB',
  'Despedida do Brasil antes do exílio forçado pela ditadura. Celebra o Rio de Janeiro com ironia e afeto. Tornou-se hino carioca.',
  true
),

-- Travessia
(
  'Travessia',
  (SELECT id FROM historia_compositores WHERE nome_artistico = 'Milton Nascimento' LIMIT 1),
  (SELECT id FROM historia_periodos WHERE nome = 'Música Contemporânea' LIMIT 1),
  1967,
  4,
  'MPB',
  'Canção de estreia de Milton Nascimento. Vencedora do II Festival Internacional da Canção. Voz e melodia que anunciam um dos maiores talentos da MPB.',
  true
);

-- ========================================
-- 7. INSTRUMENTOS TRADICIONAIS - JAPÃO E BRASIL
-- ========================================
-- Nota: A tabela historia_instrumentos_evolucao requer instrumento_id da tabela instrumentos
-- Como essa tabela pode não estar populada, os instrumentos serão adicionados
-- via interface administrativa ou script separado após popular a tabela instrumentos

-- Comentário: Dados de instrumentos tradicionais estão documentados mas requerem
-- que a tabela 'instrumentos' seja populada primeiro
-- 
-- INSTRUMENTOS JAPONESES PLANEJADOS:
-- - Koto (Cítara de 13 cordas, Período Heian)
-- - Shamisen (Alaúde de 3 cordas, Período Edo)
-- - Shakuhachi (Flauta de bambu, Período Kamakura)
-- - Taiko (Tambores japoneses, Período Antigo)
--
-- INSTRUMENTOS BRASILEIROS PLANEJADOS:
-- - Berimbau (Arco musical afro-brasileiro, Brasil Colonial)
-- - Cavaquinho (4 cordas, Brasil Colonial)
-- - Pandeiro (Percussão versátil, Brasil Colonial)
-- - Violão de 7 Cordas (Choro carioca, Era do Rádio)

-- ========================================
-- 9. GÊNEROS MUSICAIS - Complementando com estilos japoneses
-- ========================================
-- Nota: Samba, Bossa Nova e MPB já existem no banco
-- Usando ON CONFLICT para evitar duplicatas

INSERT INTO historia_generos (
  nome,
  slug,
  periodo_origem_id,
  descricao,
  caracteristicas_musicais,
  ativo
) VALUES

-- Gagaku (Japão)
(
  'Gagaku',
  'gagaku',
  (SELECT id FROM historia_periodos WHERE nome = 'Período Heian (Japão)' LIMIT 1),
  'Música clássica da corte imperial japonesa. Uma das formas de música orquestral mais antigas do mundo ainda praticadas. Solene e ritualística.',
  '{"estrutura": "Ensemble orquestral", "instrumentos": ["hichiriki", "ryuteki", "biwa", "koto"], "ritmo": "Lento e majestoso", "escalas": "Modi japoneses"}',
  true
),

-- Enka (Japão)
(
  'Enka',
  'enka',
  (SELECT id FROM historia_periodos WHERE nome = 'Shōwa Pós-Guerra (Japão)' LIMIT 1),
  'Estilo de balada melancólica japonesa. Letras sobre amor perdido, saudade e nostalgia. Popular entre gerações mais velhas.',
  '{"estrutura": "Balada", "instrumentos": ["shamisen", "piano", "orquestra"], "vocal": "Vibratos e inflexões tradicionais", "temas": "Saudade, amor, perda"}',
  true
),

-- J-Pop (Japão)
(
  'J-Pop',
  'j-pop',
  (SELECT id FROM historia_periodos WHERE nome = 'J-Pop Contemporâneo' LIMIT 1),
  'Pop japonês mainstream. Produção sofisticada, melodias cativantes, influências de rock, eletrônica e R&B. Fenômeno cultural global.',
  '{"estrutura": "Pop comercial", "instrumentos": ["sintetizadores", "guitarra", "bateria", "programação"], "producao": "Alta qualidade", "caracteristicas": "Melodias complexas, mudanças de tonalidade"}',
  true
),

-- Choro (Brasil)
(
  'Choro',
  'choro',
  (SELECT id FROM historia_periodos WHERE nome = 'Brasil Imperial' LIMIT 1),
  'Primeiro gênero de música popular urbana do Brasil. Instrumental virtuoso com flauta, violão e cavaquinho. Contraponto melódico sofisticado.',
  '{"estrutura": "Forma rondó (ABACA)", "instrumentos": ["flauta", "cavaquinho", "violão 7 cordas", "pandeiro"], "ritmo": "Sincopado", "caracteristicas": "Improvisação, virtuosismo"}',
  true
),

-- Tropicália (Brasil)
(
  'Tropicália',
  'tropicalia',
  (SELECT id FROM historia_periodos WHERE nome = 'MPB e Tropicália' LIMIT 1),
  'Movimento de vanguarda que revolucionou a MPB. Mistura antropofágica de rock, samba, baião, música regional e experimentação. Letras poéticas e crítica social.',
  '{"estrutura": "Experimental", "instrumentos": ["guitarra elétrica", "berimbau", "instrumentos regionais", "eletrônica"], "caracteristicas": "Antropofagia cultural, fusão radical, engajamento político"}',
  true
)
ON CONFLICT (nome) DO NOTHING;

-- ========================================
-- VERIFICAÇÃO DOS DADOS INSERIDOS
-- ========================================

SELECT '=== PERÍODOS INSERIDOS ===' AS status;
SELECT nome, ordem_cronologica, periodo_inicio, periodo_fim 
FROM historia_periodos 
ORDER BY ordem_cronologica;


| nome                            | ordem_cronologica | periodo_inicio | periodo_fim |
| ------------------------------- | ----------------- | -------------- | ----------- |
| Medieval                        | 1                 | 500            | 1400        |
| Renascimento                    | 2                 | 1400           | 1600        |
| Barroco                         | 3                 | 1600           | 1750        |
| Clássico                        | 4                 | 1750           | 1820        |
| Romântico                       | 5                 | 1820           | 1900        |
| Impressionismo                  | 6                 | 1890           | 1920        |
| Modernismo                      | 7                 | 1900           | 1950        |
| Contemporâneo                   | 8                 | 1950           | 2024        |
| Jazz                            | 9                 | 1895           | 2024        |
| MPB - Música Popular Brasileira | 10                | 1960           | 2024        |
| Bossa Nova                      | 11                | 1958           | 1970        |
| Rock e Música Popular           | 12                | 1950           | 2024        |
| Período Heian (Japão)           | 13                | 794            | 1185        |
| Período Heian (Japão)           | 13                | 794            | 1185        |
| Período Kamakura (Japão)        | 14                | 1185           | 1333        |
| Período Kamakura (Japão)        | 14                | 1185           | 1333        |
| Período Edo (Japão)             | 15                | 1603           | 1868        |
| Período Edo (Japão)             | 15                | 1603           | 1868        |
| Era Meiji (Japão)               | 16                | 1868           | 1912        |
| Era Meiji (Japão)               | 16                | 1868           | 1912        |
| Shōwa Pós-Guerra (Japão)        | 17                | 1945           | 1989        |
| Shōwa Pós-Guerra (Japão)        | 17                | 1945           | 1989        |
| J-Pop Contemporâneo             | 18                | 1990           | 2025        |
| J-Pop Contemporâneo             | 18                | 1990           | 2025        |
| Brasil Colonial                 | 19                | 1500           | 1822        |
| Brasil Colonial                 | 19                | 1500           | 1822        |
| Brasil Imperial                 | 20                | 1822           | 1889        |
| Brasil Imperial                 | 20                | 1822           | 1889        |
| Era do Rádio (Brasil)           | 21                | 1930           | 1950        |
| Era do Rádio (Brasil)           | 21                | 1930           | 1950        |
| MPB e Tropicália                | 22                | 1965           | 1980        |
| MPB e Tropicália                | 22                | 1965           | 1980        |
| Música Brasileira Contemporânea | 23                | 1980           | 2025        |
| Música Brasileira Contemporânea | 23                | 1980           | 2025        |


devemos trazer para o frontend na ordem correta de datas

SELECT '=== COMPOSITORES INSERIDOS ===' AS status;
SELECT nome_completo, pais_nascimento, 
       (SELECT nome FROM historia_periodos WHERE id = periodo_id) as periodo
FROM historia_compositores 
ORDER BY data_nascimento;


| nome_completo                                          | pais_nascimento                         | periodo             |
| ------------------------------------------------------ | --------------------------------------- | ------------------- |
| Yatsuhashi Kengyō                                      | Japão                                   | null                |
| Yatsuhashi Kengyō                                      | Japão                                   | null                |
| Johann Sebastian Bach                                  | Alemanha                                | Barroco             |
| Franz Joseph Haydn                                     | Áustria                                 | Clássico            |
| Wolfgang Amadeus Mozart                                | Áustria                                 | Clássico            |
| Ludwig van Beethoven                                   | Alemanha                                | Clássico            |
| Jakob Ludwig Felix Mendelssohn Bartholdy               | Alemanha                                | Romântico           |
| Frédéric François Chopin                               | Polônia                                 | Romântico           |
| Robert Alexander Schumann                              | Alemanha                                | Romântico           |
| Franz Liszt                                            | Hungria                                 | Romântico           |
| Wilhelm Richard Wagner                                 | Alemanha                                | Romântico           |
| Giuseppe Fortunino Francesco Verdi                     | Itália                                  | Romântico           |
| Johann Strauss II                                      | Áustria                                 | Romântico           |
| Johannes Brahms                                        | Alemanha                                | Romântico           |
| Antônio Carlos Gomes                                   | Brasil                                  | Brasil Imperial     |
| Antônio Carlos Gomes                                   | Brasil                                  | Brasil Imperial     |
| Pyotr Ilyich Tchaikovsky                               | Rússia                                  | Romântico           |
| Francisca Edwiges Neves Gonzaga                        | Brasil                                  | Brasil Imperial     |
| Francisca Edwiges Neves Gonzaga                        | Brasil                                  | Brasil Imperial     |
| Giacomo Antonio Domenico Michele Secondo Maria Puccini | Itália                                  | Romântico           |
| Gustav Mahler                                          | Império Austro-Húngaro (atual Tchéquia) | Romântico           |
| Achille-Claude Debussy                                 | França                                  | Impressionismo      |
| Sergei Vasilyevich Rachmaninoff                        | Rússia                                  | Romântico           |
| Rentarō Taki                                           | Japão                                   | null                |
| Rentarō Taki                                           | Japão                                   | null                |
| Béla Viktor János Bartók                               | Hungria                                 | Modernismo          |
| Kōsaku Yamada                                          | Japão                                   | null                |
| Kōsaku Yamada                                          | Japão                                   | null                |
| Alfredo da Rocha Viana Filho                           | Brasil                                  | null                |
| Alfredo da Rocha Viana Filho                           | Brasil                                  | null                |
| Aaron Copland                                          | Estados Unidos                          | Modernismo          |
| Dmitri Dmitriyevich Shostakovich                       | Rússia/URSS                             | Modernismo          |
| Marcus Vinicius da Cruz e Mello Moraes                 | Brasil                                  | Bossa Nova          |
| Marcus Vinícius da Cruz e Mello Moraes                 | Brasil                                  | Bossa Nova          |
| Marcus Vinicius da Cruz e Mello Moraes                 | Brasil                                  | Bossa Nova          |
| Antônio Carlos Brasileiro de Almeida Jobim             | Brasil                                  | Bossa Nova          |
| Antônio Carlos Brasileiro de Almeida Jobim             | Brasil                                  | Bossa Nova          |
| Tōru Takemitsu                                         | Japão                                   | null                |
| Tōru Takemitsu                                         | Japão                                   | null                |
| Gilberto Passos Gil Moreira                            | Brasil                                  | MPB e Tropicália    |
| Gilberto Passos Gil Moreira                            | Brasil                                  | MPB e Tropicália    |
| Caetano Emanuel Viana Teles Veloso                     | Brasil                                  | MPB e Tropicália    |
| Caetano Emanuel Viana Teles Veloso                     | Brasil                                  | MPB e Tropicália    |
| Milton Silva Campos do Nascimento                      | Brasil                                  | null                |
| Milton Silva Campos do Nascimento                      | Brasil                                  | null                |
| Francisco Buarque de Hollanda                          | Brasil                                  | MPB e Tropicália    |
| Francisco Buarque de Hollanda                          | Brasil                                  | MPB e Tropicália    |
| Mamoru Fujisawa                                        | Japão                                   | J-Pop Contemporâneo |
| Mamoru Fujisawa                                        | Japão                                   | J-Pop Contemporâneo |
| Ryuichi Sakamoto                                       | Japão                                   | J-Pop Contemporâneo |
| Ryuichi Sakamoto                                       | Japão                                   | J-Pop Contemporâneo |
| Yoko Kanno                                             | Japão                                   | J-Pop Contemporâneo |
| Yoko Kanno                                             | Japão                                   | J-Pop Contemporâneo |


devemos ligar os compositores ao periodo e as obras completss

SELECT '=== OBRAS INSERIDAS ===' AS status;
SELECT titulo, ano_composicao,
       (SELECT nome_artistico FROM historia_compositores WHERE id = compositor_id) as compositor
FROM historia_obras 
ORDER BY ano_composicao;

| titulo                                      | ano_composicao | compositor        |
| ------------------------------------------- | -------------- | ----------------- |
| Rokudan no Shirabe                          | 1614           | Yatsuhashi        |
| Rokudan no Shirabe                          | 1614           | Yatsuhashi        |
| Canon em Ré maior                           | 1680           | null              |
| Toccata e Fuga em Ré menor                  | 1704           | J.S. Bach         |
| Concertos de Brandemburgo                   | 1721           | J.S. Bach         |
| Concertos de Brandemburgo                   | 1721           | J.S. Bach         |
| O Cravo Bem Temperado                       | 1722           | J.S. Bach         |
| O Cravo Bem Temperado                       | 1722           | J.S. Bach         |
| As Quatro Estações                          | 1725           | null              |
| As Quatro Estações                          | 1725           | null              |
| Messias                                     | 1741           | null              |
| Pequena Serenata Noturna                    | 1787           | W.A. Mozart       |
| Sinfonia nº 40 em Sol menor                 | 1788           | W.A. Mozart       |
| A Criação                                   | 1798           | Papa Haydn        |
| Sinfonia nº 5 em Dó menor                   | 1808           | Beethoven         |
| Sinfonia nº 5 em Dó menor                   | 1808           | Beethoven         |
| Sinfonia nº 9 em Ré menor (Coral)           | 1824           | Beethoven         |
| Sinfonia nº 9 em Ré menor (Coral)           | 1824           | Beethoven         |
| Il Guarany (Ópera)                          | 1870           | Carlos Gomes      |
| Il Guarany (Ópera)                          | 1870           | Carlos Gomes      |
| Ó Abre Alas                                 | 1899           | Chiquinha Gonzaga |
| Ó Abre Alas                                 | 1899           | Chiquinha Gonzaga |
| Kōjō no Tsuki (Lua sobre Castelo em Ruínas) | 1901           | Taki              |
| Kōjō no Tsuki (Lua sobre Castelo em Ruínas) | 1901           | Taki              |
| Carinhoso                                   | 1917           | Pixinguinha       |
| Carinhoso                                   | 1917           | Pixinguinha       |
| Garota de Ipanema (The Girl from Ipanema)   | 1962           | Tom Jobim         |
| Garota de Ipanema (The Girl from Ipanema)   | 1962           | Tom Jobim         |
| Travessia                                   | 1967           | Milton Nascimento |
| November Steps                              | 1967           | Takemitsu         |
| Travessia                                   | 1967           | Milton Nascimento |
| November Steps                              | 1967           | Takemitsu         |
| Tropicália                                  | 1968           | Caetano Veloso    |
| Tropicália                                  | 1968           | Caetano Veloso    |
| Aquele Abraço                               | 1969           | Gilberto Gil      |
| Aquele Abraço                               | 1969           | Gilberto Gil      |
| Construção                                  | 1971           | Chico Buarque     |
| Construção                                  | 1971           | Chico Buarque     |
| Águas de Março                              | 1972           | Tom Jobim         |
| Águas de Março                              | 1972           | Tom Jobim         |
| Merry Christmas Mr. Lawrence                | 1983           | Sakamoto          |
| Merry Christmas Mr. Lawrence                | 1983           | Sakamoto          |
| Tonari no Totoro - Tema Principal           | 1988           | Joe Hisaishi      |
| Tonari no Totoro - Tema Principal           | 1988           | Joe Hisaishi      |
| Tank!                                       | 1998           | Kanno             |
| Tank!                                       | 1998           | Kanno             |

devemos nos focar em fazer todo o cruzamento nos hooks para as informações aparecerem corretas para o usuario final

-- SELECT '=== INSTRUMENTOS INSERIDOS ===' AS status;
-- Instrumentos serão adicionados após popular tabela 'instrumentos'
-- SELECT versao_historica, periodo_id FROM historia_instrumentos_evolucao;

SELECT '=== GÊNEROS INSERIDOS ===' AS status;
SELECT nome, slug,
       (SELECT nome FROM historia_periodos WHERE id = periodo_origem_id) as periodo
FROM historia_generos 
ORDER BY nome;


| nome               | slug            | periodo                  |
| ------------------ | --------------- | ------------------------ |
| Afrobeat           | afrobeat        | null                     |
| Balada             | balada          | Romântico                |
| Blues              | blues           | null                     |
| Bossa Nova         | bossa-nova      | null                     |
| Cantata            | cantata         | null                     |
| Choro              | choro           | Brasil Imperial          |
| Concerto           | concerto        | Barroco                  |
| Enka               | enka            | Shōwa Pós-Guerra (Japão) |
| Forró              | forro           | null                     |
| Fuga               | fuga            | Barroco                  |
| Gagaku             | gagaku          | Período Heian (Japão)    |
| Hip-Hop            | hip-hop         | null                     |
| Jazz               | jazz            | null                     |
| J-Pop              | j-pop           | J-Pop Contemporâneo      |
| MPB                | mpb             | null                     |
| Música de Câmara   | musica-camara   | null                     |
| Música Eletrônica  | eletronica      | null                     |
| Noturno            | noturno         | Romântico                |
| Ópera              | opera           | Barroco                  |
| Oratório           | oratorio        | null                     |
| Poema Sinfônico    | poema-sinfonico | Romântico                |
| Pop                | pop             | null                     |
| Prelúdio           | preludio        | Barroco                  |
| Quarteto de Cordas | quarteto-cordas | Clássico                 |
| Reggae             | reggae          | null                     |
| Rock               | rock            | null                     |
| Samba              | samba           | null                     |
| Sinfonia           | sinfonia        | Clássico                 |
| Sinfonia Coral     | sinfonia-coral  | Romântico                |
| Sonata             | sonata          | Clássico                 |
| Suíte              | suite           | Barroco                  |
| Tropicália         | tropicalia      | MPB e Tropicália         |

fique a vontade para o frontend consumir tudo e o mais correto possivel