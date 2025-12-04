/**
 * 🌱 SCRIPT DE POPULAÇÃO DE DADOS - NIPO SCHOOL
 * 
 * Dados de exemplo para desenvolvimento e testes
 */

-- ============================================
-- 🎼 CATEGORIAS DE INSTRUMENTOS
-- ============================================

INSERT INTO categorias_instrumentos (nome, descricao, icone, cor, ordem_exibicao) VALUES
('Cordas', 'Instrumentos de corda tradicionais japoneses e modernos', 'Music', '#8B5CF6', 1),
('Percussão', 'Instrumentos de percussão japoneses e ocidentais', 'Drum', '#F59E0B', 2),
('Sopro', 'Instrumentos de sopro e flautas', 'Wind', '#06B6D4', 3),
('Teclados', 'Pianos, teclados e instrumentos similares', 'Piano', '#10B981', 4),
('Tradicionais', 'Instrumentos exclusivamente japoneses', 'Cherry', '#EF4444', 5)
ON CONFLICT (nome) DO UPDATE SET
descricao = EXCLUDED.descricao,
icone = EXCLUDED.icone,
cor = EXCLUDED.cor,
ordem_exibicao = EXCLUDED.ordem_exibicao;

-- ============================================
-- 🎵 BIBLIOTECA DE INSTRUMENTOS
-- ============================================

-- Obter IDs das categorias
DO $$
DECLARE
    cat_cordas UUID;
    cat_percussao UUID;
    cat_sopro UUID;
    cat_teclados UUID;
    cat_tradicionais UUID;
BEGIN
    SELECT id INTO cat_cordas FROM categorias_instrumentos WHERE nome = 'Cordas';
    SELECT id INTO cat_percussao FROM categorias_instrumentos WHERE nome = 'Percussão';
    SELECT id INTO cat_sopro FROM categorias_instrumentos WHERE nome = 'Sopro';
    SELECT id INTO cat_teclados FROM categorias_instrumentos WHERE nome = 'Teclados';
    SELECT id INTO cat_tradicionais FROM categorias_instrumentos WHERE nome = 'Tradicionais';

    -- Instrumentos de Cordas
    INSERT INTO biblioteca_instrumentos (
        nome, categoria_id, origem, historia, curiosidades, uso_tradicional, uso_moderno,
        classificacao, material, afinacao, tecnicas_basicas, nivel_dificuldade, 
        idade_recomendada, disponivel_escola, pode_emprestar, preco_aula, tags
    ) VALUES 
    (
        'Shamisen',
        cat_tradicionais,
        'Japão',
        'O shamisen é um instrumento de três cordas tradicional japonês, desenvolvido no século XVI. Originou-se do sanshin de Okinawa, que por sua vez derivou do sanxian chinês.',
        'O corpo do shamisen é tradicionalmente coberto com pele de gato ou cachorro, mas versões modernas usam materiais sintéticos. É tocado com um plectro chamado bachi.',
        'Usado em teatro kabuki, bunraku (teatro de marionetes) e música folclórica japonesa. Acompanha narrativas e danças tradicionais.',
        'Muito popular na música contemporânea japonesa, fusão e world music. Bandas como Yoshida Daiiti exploram sua sonoridade única.',
        'Cordófono beliscado',
        'Corpo de madeira, braço de mogno, cordas de seda ou nylon',
        'Tradicionalmente Hon-choshi (C-F-C), Ni-agari (C-G-C), San-sagari (C-F-Bb)',
        'Técnicas de bachi (plectro), pizzicato, glissando, tremolo tradicional',
        'intermediario',
        '12 anos em diante',
        true,
        true,
        150.00,
        '["tradicional", "japones", "cordas", "teatro", "cultural"]'
    ),
    (
        'Violino',
        cat_cordas,
        'Itália',
        'O violino moderno foi desenvolvido no norte da Itália durante o século XVI. Famílias como Amati, Stradivarius e Guarneri estabeleceram os padrões de construção que perduram até hoje.',
        'Um violino Stradivarius pode valer milhões de dólares. O instrumento possui mais de 70 peças diferentes e leva cerca de 200 horas para ser construído à mão.',
        'Música clássica europeia, música de câmara, orquestras sinfônicas e ópera.',
        'Além da música clássica, é usado em jazz, rock, música eletrônica, trilhas sonoras e música pop contemporânea.',
        'Cordófono friccionado',
        'Tampo de abeto, fundo e laterais de ácer, braço de ácer',
        'G-D-A-E (de grave para agudo)',
        'Arco, pizzicato, vibrato, staccato, legato, harmonicos',
        'intermediario',
        '6 anos em diante',
        true,
        true,
        120.00,
        '["classico", "orquestra", "cordas", "versatil"]'
    ),
    (
        'Violão Clássico',
        cat_cordas,
        'Espanha',
        'O violão clássico evoluiu da vihuela e guitarra barroca espanholas. Sua forma moderna foi estabelecida por luthiers como Antonio Torres no século XIX.',
        'As cordas eram originalmente feitas de tripa de animal. Andrés Segovia foi fundamental para elevar o violão ao status de instrumento de concerto.',
        'Música folclórica espanhola, flamenco, música de câmara e solo.',
        'Ensino musical, acompanhamento, música popular, bossa nova, jazz e fusão.',
        'Cordófono beliscado',
        'Tampo de cedro ou abeto, fundo e laterais de jacarandá ou mogno',
        'E-A-D-G-B-E (de grave para agudo)',
        'Dedilhado, rasgueado, arpejos, ligados, harmonicos naturais',
        'iniciante',
        '8 anos em diante',
        true,
        true,
        80.00,
        '["acessivel", "versatil", "popular", "solo"]'
    );

    -- Instrumentos de Percussão
    INSERT INTO biblioteca_instrumentos (
        nome, categoria_id, origem, historia, curiosidades, uso_tradicional, uso_moderno,
        classificacao, material, afinacao, tecnicas_basicas, nivel_dificuldade,
        idade_recomendada, disponivel_escola, pode_emprestar, preco_aula, tags
    ) VALUES 
    (
        'Taiko',
        cat_tradicionais,
        'Japão',
        'Os tambores taiko têm mais de 1.400 anos de história no Japão. Originalmente usados em rituais religiosos e comunicação militar, evoluíram para uma forma de arte performática.',
        'O maior taiko do mundo, o Odaiko, pode ter mais de 2 metros de diâmetro. Um único tambor pode levar anos para ser construído artesanalmente.',
        'Festivais matsuri, cerimônias religiosas xintoístas e budistas, teatro noh e kabuki.',
        'Performances artísticas modernas, música de fusão, trilhas sonoras de filmes e terapia musical.',
        'Membranofone percutido',
        'Corpo de zelkova ou carvalho, pele de boi curtida',
        'Não aplicável (altura tonal varia por tamanho)',
        'Baquetas (bachi), técnicas de postura, ritmos tradicionais kata',
        'intermediario',
        '10 anos em diante',
        true,
        false,
        100.00,
        '["tradicional", "japones", "percussao", "performance", "energia"]'
    ),
    (
        'Bateria Acústica',
        cat_percussao,
        'Estados Unidos',
        'A bateria moderna foi desenvolvida no início do século XX em Nova Orleans, combinando instrumentos de percussão de diferentes culturas.',
        'O primeiro kit de bateria foi patenteado em 1909. Buddy Rich e John Bonham são considerados alguns dos maiores bateristas da história.',
        'Jazz, blues, swing e música popular americana.',
        'Rock, pop, funk, metal, reggae, hip-hop e praticamente todos os gêneros musicais contemporâneos.',
        'Conjunto de membranófonos e idiofones',
        'Madeira (casco), peles sintéticas ou naturais, pratos de bronze',
        'Afinação relativa entre os tambores',
        'Coordenação motora, técnicas de baquetas, rudimentos básicos',
        'intermediario',
        '8 anos em diante',
        true,
        false,
        90.00,
        '["ritmo", "popular", "versatil", "energia"]'
    );

    -- Instrumentos de Sopro
    INSERT INTO biblioteca_instrumentos (
        nome, categoria_id, origem, historia, curiosidades, uso_tradicional, uso_moderno,
        classificacao, material, afinacao, tecnicas_basicas, nivel_dificuldade,
        idade_recomendada, disponivel_escola, pode_emprestar, preco_aula, tags
    ) VALUES 
    (
        'Shakuhachi',
        cat_tradicionais,
        'Japão',
        'O shakuhachi é uma flauta de bambu japonesa com mais de 1.000 anos de história. Foi usado por monges zen como ferramenta de meditação (suizen).',
        'Cada shakuhachi é único, pois é feito de um único pedaço de bambu. A afinação varia conforme a umidade e temperatura.',
        'Meditação zen, música cortesã gagaku, acompanhamento de koto e shamisen.',
        'Música de câmara contemporânea, jazz experimental, world music e terapia sonora.',
        'Aerofone de bisel',
        'Bambu madake de 4-5 anos, laca natural urushi',
        'D (shakuhachi de 1.8 shaku = 54.5cm)',
        'Controle de respiração, embocadura, micro-tons, timbres especiais',
        'avancado',
        '16 anos em diante',
        true,
        true,
        130.00,
        '["tradicional", "meditacao", "zen", "bambu", "natural"]'
    ),
    (
        'Flauta Transversal',
        cat_sopro,
        'Alemanha',
        'A flauta moderna foi desenvolvida por Theobald Boehm no século XIX. O sistema de chaves e o material metálico revolucionaram o instrumento.',
        'Uma flauta de ouro maciço pode custar mais de $100.000. O instrumento pode produzir desde sussurros delicados até sons muito potentes.',
        'Música barroca, clássica e romântica europeia, música de câmara e orquestra.',
        'Jazz, música popular, world music, música de filme e fusão contemporânea.',
        'Aerofone de bisel',
        'Liga de prata ou níquel, chaves de prata',
        'C (dó central)',
        'Embocadura, digitação, respiração diafragmática, articulação',
        'intermediario',
        '10 anos em diante',
        true,
        true,
        110.00,
        '["classico", "versatil", "orquestra", "elegante"]'
    );

    -- Instrumentos de Teclado
    INSERT INTO biblioteca_instrumentos (
        nome, categoria_id, origem, historia, curiosidades, uso_tradicional, uso_moderno,
        classificacao, material, afinacao, tecnicas_basicas, nivel_dificuldade,
        idade_recomendada, disponivel_escola, pode_emprestar, preco_aula, tags
    ) VALUES 
    (
        'Piano Acústico',
        cat_teclados,
        'Itália',
        'Inventado por Bartolomeo Cristofori em 1700, o piano revolucionou a música por permitir dinâmicas variadas (forte e piano, daí o nome).',
        'Um piano de cauda de concerto tem mais de 12.000 peças e 220 cordas. As teclas pretas eram originalmente feitas de ébano real.',
        'Música clássica, romântica, impressionista e música de salão europeia.',
        'Jazz, blues, rock, pop, música eletrônica e praticamente todos os gêneros musicais.',
        'Cordófone percutido',
        'Madeira, ferro fundido, cordas de aço, feltro',
        'Temperamento igual, 88 teclas (A0 a C8)',
        'Postura, digitação, pedais, dinâmica, articulação',
        'iniciante',
        '5 anos em diante',
        true,
        false,
        100.00,
        '["fundamental", "versatil", "completo", "harmonico"]'
    );

END $$;

-- ============================================
-- 🏆 TIPOS DE CONQUISTAS
-- ============================================

INSERT INTO tipos_conquistas (nome, descricao, icone, cor, categoria) VALUES
('Primeiros Passos', 'Conquistas para iniciantes', 'Baby', '#10B981', 'iniciante'),
('Dedicação', 'Conquistas de prática e constância', 'Calendar', '#F59E0B', 'pratica'),
('Maestria', 'Conquistas de alto nível técnico', 'Crown', '#8B5CF6', 'tecnica'),
('Colaboração', 'Conquistas sociais e de grupo', 'Users', '#06B6D4', 'social'),
('Explorador', 'Conquistas de descoberta e variedade', 'Compass', '#EF4444', 'descoberta')
ON CONFLICT (nome) DO NOTHING;

-- ============================================
-- 🎯 CONQUISTAS ESPECÍFICAS
-- ============================================

DO $$
DECLARE
    tipo_primeiros UUID;
    tipo_dedicacao UUID;
    tipo_maestria UUID;
    tipo_colaboracao UUID;
    tipo_explorador UUID;
BEGIN
    SELECT id INTO tipo_primeiros FROM tipos_conquistas WHERE nome = 'Primeiros Passos';
    SELECT id INTO tipo_dedicacao FROM tipos_conquistas WHERE nome = 'Dedicação';
    SELECT id INTO tipo_maestria FROM tipos_conquistas WHERE nome = 'Maestria';
    SELECT id INTO tipo_colaboracao FROM tipos_conquistas WHERE nome = 'Colaboração';
    SELECT id INTO tipo_explorador FROM tipos_conquistas WHERE nome = 'Explorador';

    INSERT INTO conquistas (tipo_id, titulo, descricao, criterios, pontos, nivel_dificuldade, ordem_exibicao) VALUES
    -- Primeiros Passos
    (tipo_primeiros, 'Primeiro Login', 'Bem-vindo ao Nipo School!', 'Faça seu primeiro login no sistema', 10, 'facil', 1),
    (tipo_primeiros, 'Perfil Completo', 'Complete todas as informações do seu perfil', 'Preencha nome, foto, bio e preferências', 25, 'facil', 2),
    (tipo_primeiros, 'Primeira Aula', 'Assista sua primeira aula', 'Participe de uma aula presencial ou online', 50, 'medio', 3),
    
    -- Dedicação
    (tipo_dedicacao, 'Praticante Regular', 'Pratique por 7 dias consecutivos', 'Registre atividade musical por uma semana', 100, 'medio', 10),
    (tipo_dedicacao, 'Disciplina Zen', 'Pratique por 30 dias consecutivos', 'Mantenha constância por um mês completo', 500, 'dificil', 11),
    (tipo_dedicacao, 'Dedicação Total', 'Pratique por 100 dias consecutivos', 'Demonstre dedicação extraordinária', 1000, 'extremo', 12),
    
    -- Maestria
    (tipo_maestria, 'Primeiro Portfolio', 'Crie seu primeiro portfolio', 'Publique uma gravação ou composição', 75, 'medio', 20),
    (tipo_maestria, 'Artista Completo', 'Tenha 10 portfolios aprovados', 'Demonstre versatilidade artística', 300, 'dificil', 21),
    (tipo_maestria, 'Mestre dos Instrumentos', 'Domine 3 instrumentos diferentes', 'Alcance nível avançado em 3 instrumentos', 750, 'extremo', 22),
    
    -- Colaboração
    (tipo_colaboracao, 'Primeiro Amigo', 'Conecte-se com outro estudante', 'Adicione um colega como amigo', 30, 'facil', 30),
    (tipo_colaboracao, 'Espírito de Equipe', 'Participe de 5 atividades em grupo', 'Colabore em projetos e apresentações', 150, 'medio', 31),
    (tipo_colaboracao, 'Mentor', 'Ajude 10 estudantes iniciantes', 'Compartilhe conhecimento e experiência', 400, 'dificil', 32),
    
    -- Explorador
    (tipo_explorador, 'Curioso Cultural', 'Aprenda sobre 5 instrumentos tradicionais', 'Explore a riqueza da música japonesa', 100, 'medio', 40),
    (tipo_explorador, 'Globetrotter Musical', 'Estude instrumentos de 3 categorias diferentes', 'Amplie seus horizontes musicais', 200, 'medio', 41),
    (tipo_explorador, 'Descobridor de Talentos', 'Complete 20 desafios diferentes', 'Aceite novos desafios constantemente', 350, 'dificil', 42);

END $$;

-- ============================================
-- 📝 DESAFIOS DE EXEMPLO
-- ============================================

DO $$
DECLARE
    instr_shamisen UUID;
    instr_piano UUID;
    instr_violao UUID;
    instr_taiko UUID;
BEGIN
    SELECT id INTO instr_shamisen FROM biblioteca_instrumentos WHERE nome = 'Shamisen';
    SELECT id INTO instr_piano FROM biblioteca_instrumentos WHERE nome = 'Piano Acústico';
    SELECT id INTO instr_violao FROM biblioteca_instrumentos WHERE nome = 'Violão Clássico';
    SELECT id INTO instr_taiko FROM biblioteca_instrumentos WHERE nome = 'Taiko';

    INSERT INTO desafios (titulo, descricao, instrucoes, instrumento_id, nivel_dificuldade, pontos_recompensa, tipo, ativo) VALUES
    (
        'Primeiros Acordes no Violão',
        'Aprenda e execute os acordes básicos: Dó, Ré, Mi, Fá, Sol, Lá, Si',
        'Pratique cada acorde por 2 minutos, garantindo que todas as cordas soem claramente. Grave um vídeo tocando a sequência completa.',
        instr_violao,
        'iniciante',
        50,
        'pratica',
        true
    ),
    (
        'Escala Pentatônica no Shamisen',
        'Domine a escala pentatônica tradicional japonesa',
        'Execute a escala in-yo (陰陽) em diferentes posições do braço. Demonstre fluidez e afinação precisa.',
        instr_shamisen,
        'intermediario',
        100,
        'tecnica',
        true
    ),
    (
        'Ritmo Básico de Taiko',
        'Aprenda o padrão rítmico Don-Don-Ka fundamental',
        'Execute o padrão por 2 minutos mantendo tempo constante. Demonstre postura correta e força adequada.',
        instr_taiko,
        'iniciante',
        75,
        'pratica',
        true
    ),
    (
        'Minueto em Sol de Bach',
        'Interprete esta peça clássica com expressividade',
        'Toque o Minueto em Sol de Bach demonstrando dinâmica, articulação e fluidez melódica.',
        instr_piano,
        'intermediario',
        150,
        'performance',
        true
    ),
    (
        'Composição Livre - Fusion Japonesa',
        'Crie uma composição original misturando elementos tradicionais e modernos',
        'Componha uma peça de 2-3 minutos que combine instrumentos tradicionais japoneses com elementos contemporâneos.',
        NULL,
        'avancado',
        300,
        'composicao',
        true
    );

END $$;

-- ============================================
-- 👤 PERFIS DE EXEMPLO (OPCIONAL - APENAS PARA DESENVOLVIMENTO)
-- ============================================

-- NOTA: Em produção, os profiles são criados automaticamente via Supabase Auth
-- Este é apenas um exemplo da estrutura esperada

/*
INSERT INTO profiles (id, nome, email, tipo_usuario, bio, status) VALUES
(
    uuid_generate_v4(),
    'Takeshi Yamamoto',
    'professor.yamamoto@niposchool.com',
    'professor',
    'Mestre em shamisen com 20 anos de experiência. Especialista em música tradicional japonesa e fusão contemporânea.',
    'ativo'
),
(
    uuid_generate_v4(),
    'Maria Silva',
    'maria.silva@example.com',
    'aluno',
    'Estudante iniciante apaixonada pela cultura japonesa. Interesse especial em taiko e koto.',
    'ativo'
),
(
    uuid_generate_v4(),
    'João Santos',
    'joao.santos@example.com',
    'aluno',
    'Músico experiente buscando expandir horizontes com instrumentos orientais.',
    'ativo'
),
(
    uuid_generate_v4(),
    'Admin Nipo',
    'admin@niposchool.com',
    'admin',
    'Administrador do sistema Nipo School.',
    'ativo'
);
*/

-- ============================================
-- 📊 VIEWS ÚTEIS PARA RELATÓRIOS
-- ============================================

-- View: Instrumentos por categoria
CREATE OR REPLACE VIEW v_instrumentos_por_categoria AS
SELECT 
    c.nome as categoria,
    c.cor,
    COUNT(i.id) as total_instrumentos,
    COUNT(CASE WHEN i.disponivel_escola THEN 1 END) as disponiveis_escola,
    AVG(i.preco_aula) as preco_medio
FROM categorias_instrumentos c
LEFT JOIN biblioteca_instrumentos i ON c.id = i.categoria_id
GROUP BY c.id, c.nome, c.cor, c.ordem_exibicao
ORDER BY c.ordem_exibicao;

-- View: Estatísticas de usuários
CREATE OR REPLACE VIEW v_estatisticas_usuarios AS
SELECT 
    tipo_usuario,
    COUNT(*) as total,
    COUNT(CASE WHEN status = 'ativo' THEN 1 END) as ativos,
    COUNT(CASE WHEN DATE(criado_em) = CURRENT_DATE THEN 1 END) as criados_hoje
FROM profiles
GROUP BY tipo_usuario;

-- View: Top instrumentos mais populares
CREATE OR REPLACE VIEW v_instrumentos_populares AS
SELECT 
    i.nome,
    c.nome as categoria,
    i.popularidade,
    COUNT(DISTINCT t.id) as total_turmas,
    COUNT(DISTINCT m.aluno_id) as total_alunos
FROM biblioteca_instrumentos i
LEFT JOIN categorias_instrumentos c ON i.categoria_id = c.id
LEFT JOIN turmas t ON i.id = t.instrumento_id
LEFT JOIN matriculas m ON t.id = m.turma_id AND m.status = 'ativa'
GROUP BY i.id, i.nome, c.nome, i.popularidade
ORDER BY i.popularidade DESC, total_alunos DESC;

-- ============================================
-- ✅ COMENTÁRIOS FINAIS
-- ============================================

-- Mensagem de sucesso
DO $$
BEGIN
    RAISE NOTICE '🌸 DADOS DE EXEMPLO INSERIDOS COM SUCESSO! 🌸';
    RAISE NOTICE '📊 Estatísticas:';
    RAISE NOTICE '   • % categorias de instrumentos criadas', (SELECT COUNT(*) FROM categorias_instrumentos);
    RAISE NOTICE '   • % instrumentos adicionados à biblioteca', (SELECT COUNT(*) FROM biblioteca_instrumentos);
    RAISE NOTICE '   • % tipos de conquistas configurados', (SELECT COUNT(*) FROM tipos_conquistas);
    RAISE NOTICE '   • % conquistas específicas criadas', (SELECT COUNT(*) FROM conquistas);
    RAISE NOTICE '   • % desafios de exemplo criados', (SELECT COUNT(*) FROM desafios);
    RAISE NOTICE '🎯 O sistema está pronto para uso!';
END $$;