-- 🎼 ESTRUTURA DE BANCO PARA CENTRO DE ESTUDOS NIPO SCHOOL

-- ============================================
-- 📚 BIBLIOTECA DE INSTRUMENTOS
-- ============================================

-- Categoria de instrumentos (organizacional)
CREATE TABLE categorias_instrumentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL, -- Ex: Cordas, Percussão, Sopro, Teclados
    descricao TEXT,
    icone VARCHAR(50), -- Nome do ícone para UI
    ordem_exibicao INTEGER DEFAULT 0,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Biblioteca completa de instrumentos
CREATE TABLE biblioteca_instrumentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(150) NOT NULL,
    categoria_id UUID REFERENCES categorias_instrumentos(id),
    
    -- História e informações culturais
    origem VARCHAR(100), -- País/região de origem
    historia TEXT, -- História completa do instrumento
    curiosidades TEXT, -- Fatos interessantes
    uso_tradicional TEXT, -- Como é usado tradicionalmente
    uso_moderno TEXT, -- Uso contemporâneo
    
    -- Características técnicas
    classificacao VARCHAR(100), -- Classificação organológica
    material VARCHAR(200), -- Materiais de construção
    afinacao TEXT, -- Como é afinado
    tecnicas_basicas TEXT, -- Técnicas fundamentais de execução
    
    -- Recursos multimídia
    imagem_url TEXT, -- Foto principal do instrumento
    galeria_imagens JSONB, -- Array de URLs de imagens
    audio_exemplo_url TEXT, -- Som característico do instrumento
    video_demonstracao_url TEXT, -- Vídeo mostrando o instrumento
    
    -- Informações pedagógicas
    nivel_dificuldade VARCHAR(20) CHECK (nivel_dificuldade IN ('iniciante', 'intermediário', 'avançado')),
    idade_recomendada VARCHAR(50), -- Ex: "6 anos em diante"
    pre_requisitos TEXT, -- O que precisa saber antes
    
    -- Disponibilidade no Nipo School
    disponivel_escola BOOLEAN DEFAULT FALSE, -- Se a escola tem este instrumento
    pode_emprestar BOOLEAN DEFAULT FALSE, -- Se pode ser emprestado
    
    -- Metadados
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 🎵 SISTEMA DE REPERTÓRIO
-- ============================================

-- Categorias de repertório
CREATE TABLE categorias_repertorio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL, -- Ex: Tradicional Japonês, Gospel, Popular
    descricao TEXT,
    cor_tema VARCHAR(7), -- Hex color para UI
    ordem_exibicao INTEGER DEFAULT 0
);

-- Biblioteca de repertório
CREATE TABLE repertorio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(200) NOT NULL,
    categoria_id UUID REFERENCES categorias_repertorio(id),
    
    -- Informações da música
    compositor VARCHAR(150),
    arranjo_por VARCHAR(150),
    tonalidade VARCHAR(20),
    andamento VARCHAR(50),
    duracao_estimada INTEGER, -- em segundos
    
    -- Dificuldade e requisitos
    nivel_dificuldade VARCHAR(20) CHECK (nivel_dificuldade IN ('iniciante', 'intermediário', 'avançado')),
    instrumentos_necessarios JSONB, -- Array de instrumentos
    numero_minimo_participantes INTEGER DEFAULT 1,
    
    -- Recursos pedagógicos
    partitura_url TEXT, -- Link para partitura
    cifra_url TEXT, -- Link para cifra
    letra_url TEXT, -- Link para letra
    playback_url TEXT, -- Áudio de acompanhamento
    video_tutorial_url TEXT, -- Vídeo ensinando a música
    
    -- Controle de liberação
    publico BOOLEAN DEFAULT FALSE, -- Se está liberado para todos
    requer_aprovacao_professor BOOLEAN DEFAULT TRUE,
    
    -- Metadados
    tags JSONB, -- Array de tags para busca
    observacoes TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Liberação de repertório por professor
CREATE TABLE repertorio_liberacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repertorio_id UUID REFERENCES repertorio(id),
    professor_id UUID REFERENCES auth.users(id),
    aluno_id UUID REFERENCES auth.users(id), -- Se for liberação individual
    turma_id UUID, -- Se for liberação por turma
    
    data_liberacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_limite TIMESTAMP WITH TIME ZONE, -- Data limite para estudar
    observacoes TEXT,
    
    CONSTRAINT chk_liberacao_tipo CHECK (
        (aluno_id IS NOT NULL AND turma_id IS NULL) OR
        (aluno_id IS NULL AND turma_id IS NOT NULL)
    )
);

-- ============================================
-- 📖 METODOLOGIAS DE ENSINO
-- ============================================

-- Metodologias disponíveis (Orff, Suzuki, Kodály, etc.)
CREATE TABLE metodologias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    origem VARCHAR(100), -- País/região de origem
    criador VARCHAR(150), -- Quem desenvolveu
    
    -- Descrição completa
    resumo TEXT, -- Resumo executivo
    filosofia TEXT, -- Filosofia educacional
    principios JSONB, -- Array de princípios fundamentais
    caracteristicas JSONB, -- Array de características principais
    
    -- Aplicação prática
    faixa_etaria VARCHAR(100), -- Para que idades
    instrumentos_utilizados JSONB, -- Array de instrumentos
    sequencia_didatica TEXT, -- Como aplicar passo a passo
    
    -- Recursos
    imagem_representativa_url TEXT,
    video_explicativo_url TEXT,
    bibliografia JSONB, -- Array de livros/referências
    links_externos JSONB, -- Array de links úteis
    
    -- Uso no Nipo School
    aplicada_escola BOOLEAN DEFAULT FALSE,
    nivel_aplicacao VARCHAR(50), -- Ex: "Fundamental", "Todos os níveis"
    
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 🎬 BIBLIOTECA DE VÍDEOS
-- ============================================

-- Categorias de vídeos
CREATE TABLE categorias_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL, -- Ex: Técnicas, Teoria, Performance
    descricao TEXT,
    icone VARCHAR(50),
    cor_tema VARCHAR(7)
);

-- Biblioteca de vídeos dos professores
CREATE TABLE videos_professores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(200) NOT NULL,
    categoria_id UUID REFERENCES categorias_videos(id),
    professor_id UUID REFERENCES auth.users(id),
    
    -- Conteúdo do vídeo
    descricao TEXT,
    duracao INTEGER, -- em segundos
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    
    -- Organização pedagógica
    modulo VARCHAR(100), -- Qual módulo do curso
    aula_relacionada_id UUID REFERENCES aulas(id),
    instrumento_foco VARCHAR(100), -- Instrumento principal do vídeo
    nivel_dificuldade VARCHAR(20) CHECK (nivel_dificuldade IN ('iniciante', 'intermediário', 'avançado')),
    
    -- Controle de acesso
    publico BOOLEAN DEFAULT FALSE,
    requer_autenticacao BOOLEAN DEFAULT TRUE,
    liberado_para_nivel VARCHAR(20), -- Que nível pode ver
    
    -- Interação
    transcricao TEXT, -- Texto do vídeo para acessibilidade
    materiais_complementares JSONB, -- Links para PDFs, partituras, etc.
    
    -- Metadados
    tags JSONB,
    visualizacoes INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ❓ SISTEMA DE DÚVIDAS POR MÓDULO
-- ============================================

-- Dúvidas dos alunos organizadas por módulo
CREATE TABLE duvidas_alunos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aluno_id UUID REFERENCES auth.users(id),
    
    -- Organização
    modulo VARCHAR(100) NOT NULL,
    aula_id UUID REFERENCES aulas(id), -- Aula específica se aplicável
    topico VARCHAR(200), -- Assunto da dúvida
    
    -- Conteúdo da dúvida
    pergunta TEXT NOT NULL,
    contexto TEXT, -- Situação em que surgiu a dúvida
    urgencia VARCHAR(20) DEFAULT 'normal' CHECK (urgencia IN ('baixa', 'normal', 'alta')),
    
    -- Arquivos anexos
    anexos JSONB, -- Array de URLs de imagens, áudios, vídeos
    
    -- Status e resposta
    status VARCHAR(20) DEFAULT 'aberta' CHECK (status IN ('aberta', 'em_analise', 'respondida', 'fechada')),
    resposta TEXT,
    professor_responsavel_id UUID REFERENCES auth.users(id),
    data_resposta TIMESTAMP WITH TIME ZONE,
    
    -- Avaliação da resposta
    resposta_util BOOLEAN, -- Se o aluno achou útil
    nota_resposta INTEGER CHECK (nota_resposta >= 1 AND nota_resposta <= 5),
    
    -- Metadados
    publica BOOLEAN DEFAULT FALSE, -- Se pode ser vista por outros alunos
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Respostas adicionais para criar discussões
CREATE TABLE duvidas_respostas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    duvida_id UUID REFERENCES duvidas_alunos(id),
    autor_id UUID REFERENCES auth.users(id), -- Pode ser professor ou outro aluno
    tipo_autor VARCHAR(20) CHECK (tipo_autor IN ('professor', 'aluno', 'admin')),
    
    conteudo TEXT NOT NULL,
    anexos JSONB,
    
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 🏆 SISTEMA DE PROGRESSO E CONQUISTAS
-- ============================================

-- Progresso do aluno em cada instrumento/módulo
CREATE TABLE progresso_estudos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aluno_id UUID REFERENCES auth.users(id),
    
    -- O que está estudando
    tipo_estudo VARCHAR(50) CHECK (tipo_estudo IN ('instrumento', 'metodologia', 'repertorio', 'modulo')),
    referencia_id UUID, -- ID do instrumento, metodologia, etc.
    referencia_nome VARCHAR(200), -- Nome para facilitar consultas
    
    -- Progresso
    nivel_atual VARCHAR(20) CHECK (nivel_atual IN ('iniciante', 'intermediário', 'avançado')),
    porcentagem_conclusao INTEGER DEFAULT 0 CHECK (porcentagem_conclusao >= 0 AND porcentagem_conclusao <= 100),
    
    -- Tempo dedicado
    tempo_total_estudos INTEGER DEFAULT 0, -- em minutos
    sessoes_estudo INTEGER DEFAULT 0,
    ultima_sessao TIMESTAMP WITH TIME ZONE,
    
    -- Status
    ativo BOOLEAN DEFAULT TRUE,
    data_inicio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_conclusao TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- 📊 ÍNDICES PARA PERFORMANCE
-- ============================================

-- Índices principais para consultas rápidas
CREATE INDEX idx_biblioteca_instrumentos_categoria ON biblioteca_instrumentos(categoria_id);
CREATE INDEX idx_biblioteca_instrumentos_nivel ON biblioteca_instrumentos(nivel_dificuldade);
CREATE INDEX idx_biblioteca_instrumentos_ativo ON biblioteca_instrumentos(ativo) WHERE ativo = TRUE;

CREATE INDEX idx_repertorio_categoria ON repertorio(categoria_id);
CREATE INDEX idx_repertorio_nivel ON repertorio(nivel_dificuldade);
CREATE INDEX idx_repertorio_publico ON repertorio(publico) WHERE publico = TRUE;

CREATE INDEX idx_videos_professor ON videos_professores(professor_id);
CREATE INDEX idx_videos_categoria ON videos_professores(categoria_id);
CREATE INDEX idx_videos_modulo ON videos_professores(modulo);

CREATE INDEX idx_duvidas_aluno ON duvidas_alunos(aluno_id);
CREATE INDEX idx_duvidas_modulo ON duvidas_alunos(modulo);
CREATE INDEX idx_duvidas_status ON duvidas_alunos(status);

CREATE INDEX idx_progresso_aluno ON progresso_estudos(aluno_id);
CREATE INDEX idx_progresso_tipo ON progresso_estudos(tipo_estudo);

-- ============================================
-- 🔧 COMENTÁRIOS PARA DOCUMENTAÇÃO
-- ============================================

COMMENT ON TABLE biblioteca_instrumentos IS 'Biblioteca completa de instrumentos com história, sons e informações culturais';
COMMENT ON TABLE repertorio IS 'Biblioteca de músicas e partituras liberadas pelos professores';
COMMENT ON TABLE metodologias IS 'Metodologias de ensino musical (Orff, Suzuki, Kodály, etc.) com explicações completas';
COMMENT ON TABLE videos_professores IS 'Vídeos gravados pelos professores organizados por módulo e instrumento';
COMMENT ON TABLE duvidas_alunos IS 'Sistema de dúvidas dos alunos organizadas por módulo com respostas dos professores';
COMMENT ON TABLE progresso_estudos IS 'Acompanhamento do progresso individual dos alunos em cada área de estudo';