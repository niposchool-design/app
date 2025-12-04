/**
 * 🗄️ SCRIPT DE CRIAÇÃO COMPLETA DO BANCO - NIPO SCHOOL
 * 
 * Script SQL para criar toda a estrutura necessária no Supabase
 */

-- ============================================
-- 🔧 EXTENSÕES NECESSÁRIAS
-- ============================================

-- Extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extensão para full-text search
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- 👤 PERFIS DE USUÁRIO (profiles)
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    tipo_usuario VARCHAR(20) CHECK (tipo_usuario IN ('aluno', 'professor', 'admin')) DEFAULT 'aluno',
    data_nascimento DATE,
    telefone VARCHAR(20),
    endereco JSONB,
    bio TEXT,
    configuracoes JSONB DEFAULT '{}',
    status VARCHAR(20) CHECK (status IN ('ativo', 'inativo', 'suspenso')) DEFAULT 'ativo',
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 🎼 BIBLIOTECA DE INSTRUMENTOS
-- ============================================

-- Categorias de instrumentos
CREATE TABLE IF NOT EXISTS categorias_instrumentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    icone VARCHAR(50),
    cor VARCHAR(7) DEFAULT '#8B5CF6', -- Cor hexadecimal
    ordem_exibicao INTEGER DEFAULT 0,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Biblioteca completa de instrumentos
CREATE TABLE IF NOT EXISTS biblioteca_instrumentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(150) NOT NULL,
    categoria_id UUID REFERENCES categorias_instrumentos(id),
    
    -- História e informações culturais
    origem VARCHAR(100),
    historia TEXT,
    curiosidades TEXT,
    uso_tradicional TEXT,
    uso_moderno TEXT,
    
    -- Características técnicas
    classificacao VARCHAR(100),
    material VARCHAR(200),
    afinacao TEXT,
    tecnicas_basicas TEXT,
    
    -- Recursos multimídia
    imagem_url TEXT,
    galeria_imagens JSONB DEFAULT '[]',
    audio_exemplo_url TEXT,
    video_demonstracao_url TEXT,
    
    -- Informações pedagógicas
    nivel_dificuldade VARCHAR(20) CHECK (nivel_dificuldade IN ('iniciante', 'intermediario', 'avancado')),
    idade_recomendada VARCHAR(50),
    pre_requisitos TEXT,
    
    -- Disponibilidade no Nipo School
    disponivel_escola BOOLEAN DEFAULT FALSE,
    pode_emprestar BOOLEAN DEFAULT FALSE,
    preco_aula DECIMAL(10,2),
    
    -- Metadados
    tags JSONB DEFAULT '[]',
    popularidade INTEGER DEFAULT 0,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 🎓 SISTEMA EDUCACIONAL
-- ============================================

-- Turmas
CREATE TABLE IF NOT EXISTS turmas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    professor_id UUID REFERENCES profiles(id),
    instrumento_id UUID REFERENCES biblioteca_instrumentos(id),
    
    -- Configurações da turma
    nivel VARCHAR(20) CHECK (nivel IN ('iniciante', 'intermediario', 'avancado')),
    max_alunos INTEGER DEFAULT 10,
    idade_minima INTEGER DEFAULT 6,
    idade_maxima INTEGER DEFAULT 99,
    
    -- Horários
    horarios JSONB, -- Array de objetos com dia_semana, hora_inicio, hora_fim
    data_inicio DATE,
    data_fim DATE,
    
    -- Financeiro
    valor_mensal DECIMAL(10,2),
    valor_matricula DECIMAL(10,2),
    
    -- Status
    status VARCHAR(20) CHECK (status IN ('ativa', 'inativa', 'completa', 'cancelada')) DEFAULT 'ativa',
    
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matrículas
CREATE TABLE IF NOT EXISTS matriculas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    aluno_id UUID REFERENCES profiles(id),
    turma_id UUID REFERENCES turmas(id),
    
    -- Datas
    data_matricula TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_inicio DATE,
    data_fim DATE,
    
    -- Status
    status VARCHAR(20) CHECK (status IN ('ativa', 'inativa', 'concluida', 'cancelada', 'suspensa')) DEFAULT 'ativa',
    
    -- Financeiro
    valor_pago DECIMAL(10,2),
    forma_pagamento VARCHAR(50),
    
    -- Progresso
    progresso_percentual INTEGER DEFAULT 0,
    notas JSONB DEFAULT '{}',
    
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(aluno_id, turma_id)
);

-- Presenças
CREATE TABLE IF NOT EXISTS presencas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    matricula_id UUID REFERENCES matriculas(id),
    data_aula DATE NOT NULL,
    presente BOOLEAN DEFAULT FALSE,
    justificativa TEXT,
    observacoes TEXT,
    
    -- QR Code para presença
    qr_code_usado VARCHAR(100),
    ip_registro INET,
    localizacao JSONB,
    
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(matricula_id, data_aula)
);

-- ============================================
-- 🏆 SISTEMA DE CONQUISTAS
-- ============================================

-- Tipos de conquistas
CREATE TABLE IF NOT EXISTS tipos_conquistas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    icone VARCHAR(50),
    cor VARCHAR(7) DEFAULT '#F59E0B',
    categoria VARCHAR(50),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conquistas específicas
CREATE TABLE IF NOT EXISTS conquistas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipo_id UUID REFERENCES tipos_conquistas(id),
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    criterios TEXT,
    
    -- Configurações
    pontos INTEGER DEFAULT 0,
    nivel_dificuldade VARCHAR(20) CHECK (nivel_dificuldade IN ('facil', 'medio', 'dificil', 'extremo')),
    disponivel BOOLEAN DEFAULT TRUE,
    
    -- Metadados
    imagem_url TEXT,
    ordem_exibicao INTEGER DEFAULT 0,
    
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conquistas dos usuários
CREATE TABLE IF NOT EXISTS user_conquistas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id),
    conquista_id UUID REFERENCES conquistas(id),
    
    -- Progresso
    progresso_atual INTEGER DEFAULT 0,
    progresso_necessario INTEGER DEFAULT 1,
    concluida BOOLEAN DEFAULT FALSE,
    data_conclusao TIMESTAMP WITH TIME ZONE,
    
    -- Metadados
    data_inicio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    dados_extra JSONB DEFAULT '{}',
    
    UNIQUE(user_id, conquista_id)
);

-- ============================================
-- 📁 SISTEMA DE PORTFÓLIOS
-- ============================================

-- Portfólios dos alunos
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    aluno_id UUID REFERENCES profiles(id),
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    
    -- Conteúdo
    tipo VARCHAR(50) CHECK (tipo IN ('audio', 'video', 'partitura', 'texto', 'projeto')),
    arquivo_url TEXT,
    thumbnail_url TEXT,
    duracao INTEGER, -- em segundos para áudio/vídeo
    
    -- Metadados
    instrumento_id UUID REFERENCES biblioteca_instrumentos(id),
    turma_id UUID REFERENCES turmas(id),
    tags JSONB DEFAULT '[]',
    
    -- Avaliação
    nota DECIMAL(3,1),
    feedback_professor TEXT,
    avaliado_por UUID REFERENCES profiles(id),
    data_avaliacao TIMESTAMP WITH TIME ZONE,
    
    -- Status
    status VARCHAR(20) CHECK (status IN ('rascunho', 'enviado', 'avaliado', 'publicado')) DEFAULT 'rascunho',
    publico BOOLEAN DEFAULT FALSE,
    
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 📝 SISTEMA DE DESAFIOS
-- ============================================

-- Desafios/exercícios
CREATE TABLE IF NOT EXISTS desafios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    instrucoes TEXT,
    
    -- Configurações
    instrumento_id UUID REFERENCES biblioteca_instrumentos(id),
    nivel_dificuldade VARCHAR(20) CHECK (nivel_dificuldade IN ('iniciante', 'intermediario', 'avancado')),
    pontos_recompensa INTEGER DEFAULT 10,
    tempo_limite INTEGER, -- em minutos
    
    -- Conteúdo
    tipo VARCHAR(50) CHECK (tipo IN ('pratica', 'teoria', 'composicao', 'performance')),
    arquivo_base_url TEXT, -- partitura, áudio de referência
    criterios_avaliacao JSONB,
    
    -- Status
    ativo BOOLEAN DEFAULT TRUE,
    data_inicio DATE,
    data_fim DATE,
    
    criado_por UUID REFERENCES profiles(id),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submissões dos desafios
CREATE TABLE IF NOT EXISTS desafio_submissoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    desafio_id UUID REFERENCES desafios(id),
    aluno_id UUID REFERENCES profiles(id),
    
    -- Submissão
    arquivo_url TEXT,
    observacoes TEXT,
    tempo_gasto INTEGER, -- em minutos
    
    -- Avaliação
    nota DECIMAL(3,1),
    feedback TEXT,
    avaliado_por UUID REFERENCES profiles(id),
    data_avaliacao TIMESTAMP WITH TIME ZONE,
    
    -- Status
    status VARCHAR(20) CHECK (status IN ('enviado', 'avaliando', 'avaliado', 'aprovado', 'rejeitado')) DEFAULT 'enviado',
    
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(desafio_id, aluno_id)
);

-- ============================================
-- 📊 SISTEMA DE ANALYTICS
-- ============================================

-- Eventos de atividade
CREATE TABLE IF NOT EXISTS eventos_atividade (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id),
    
    -- Evento
    tipo_evento VARCHAR(50) NOT NULL, -- login, aula_assistida, exercicio_completado, etc.
    categoria VARCHAR(50),
    detalhes JSONB DEFAULT '{}',
    
    -- Contexto
    sessao_id VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Métricas de progresso
CREATE TABLE IF NOT EXISTS metricas_progresso (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id),
    data_referencia DATE,
    
    -- Métricas gerais
    total_pontos INTEGER DEFAULT 0,
    total_conquistas INTEGER DEFAULT 0,
    total_aulas_assistidas INTEGER DEFAULT 0,
    total_exercicios_completados INTEGER DEFAULT 0,
    
    -- Métricas específicas por instrumento
    instrumentos_estudados JSONB DEFAULT '[]',
    tempo_total_pratica INTEGER DEFAULT 0, -- em minutos
    
    -- Streak (sequência)
    dias_consecutivos INTEGER DEFAULT 0,
    ultima_atividade DATE,
    
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, data_referencia)
);

-- ============================================
-- 🔔 SISTEMA DE NOTIFICAÇÕES
-- ============================================

CREATE TABLE IF NOT EXISTS notificacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id),
    
    -- Conteúdo
    titulo VARCHAR(200) NOT NULL,
    mensagem TEXT,
    tipo VARCHAR(50), -- info, sucesso, aviso, erro
    categoria VARCHAR(50), -- aula, conquista, sistema, etc.
    
    -- Ação
    acao_url TEXT,
    acao_texto VARCHAR(100),
    
    -- Status
    lida BOOLEAN DEFAULT FALSE,
    data_leitura TIMESTAMP WITH TIME ZONE,
    
    -- Agendamento
    enviar_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expirar_em TIMESTAMP WITH TIME ZONE,
    
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 🔐 ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias_instrumentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE biblioteca_instrumentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE matriculas ENABLE ROW LEVEL SECURITY;
ALTER TABLE presencas ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipos_conquistas ENABLE ROW LEVEL SECURITY;
ALTER TABLE conquistas ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_conquistas ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE desafios ENABLE ROW LEVEL SECURITY;
ALTER TABLE desafio_submissoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos_atividade ENABLE ROW LEVEL SECURITY;
ALTER TABLE metricas_progresso ENABLE ROW LEVEL SECURITY;
ALTER TABLE notificacoes ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 📇 ÍNDICES PARA PERFORMANCE
-- ============================================

-- Profiles
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_tipo_usuario ON profiles(tipo_usuario);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);

-- Instrumentos
CREATE INDEX IF NOT EXISTS idx_biblioteca_instrumentos_categoria ON biblioteca_instrumentos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_biblioteca_instrumentos_nivel ON biblioteca_instrumentos(nivel_dificuldade);
CREATE INDEX IF NOT EXISTS idx_biblioteca_instrumentos_disponivel ON biblioteca_instrumentos(disponivel_escola);

-- Educacional
CREATE INDEX IF NOT EXISTS idx_turmas_professor ON turmas(professor_id);
CREATE INDEX IF NOT EXISTS idx_turmas_instrumento ON turmas(instrumento_id);
CREATE INDEX IF NOT EXISTS idx_turmas_status ON turmas(status);
CREATE INDEX IF NOT EXISTS idx_matriculas_aluno ON matriculas(aluno_id);
CREATE INDEX IF NOT EXISTS idx_matriculas_turma ON matriculas(turma_id);
CREATE INDEX IF NOT EXISTS idx_matriculas_status ON matriculas(status);
CREATE INDEX IF NOT EXISTS idx_presencas_matricula ON presencas(matricula_id);
CREATE INDEX IF NOT EXISTS idx_presencas_data ON presencas(data_aula);

-- Conquistas
CREATE INDEX IF NOT EXISTS idx_user_conquistas_user ON user_conquistas(user_id);
CREATE INDEX IF NOT EXISTS idx_user_conquistas_conquista ON user_conquistas(conquista_id);
CREATE INDEX IF NOT EXISTS idx_user_conquistas_concluida ON user_conquistas(concluida);

-- Portfólios
CREATE INDEX IF NOT EXISTS idx_portfolios_aluno ON portfolios(aluno_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_instrumento ON portfolios(instrumento_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_status ON portfolios(status);
CREATE INDEX IF NOT EXISTS idx_portfolios_publico ON portfolios(publico);

-- Desafios
CREATE INDEX IF NOT EXISTS idx_desafios_instrumento ON desafios(instrumento_id);
CREATE INDEX IF NOT EXISTS idx_desafios_nivel ON desafios(nivel_dificuldade);
CREATE INDEX IF NOT EXISTS idx_desafios_ativo ON desafios(ativo);
CREATE INDEX IF NOT EXISTS idx_desafio_submissoes_desafio ON desafio_submissoes(desafio_id);
CREATE INDEX IF NOT EXISTS idx_desafio_submissoes_aluno ON desafio_submissoes(aluno_id);

-- Analytics
CREATE INDEX IF NOT EXISTS idx_eventos_atividade_user ON eventos_atividade(user_id);
CREATE INDEX IF NOT EXISTS idx_eventos_atividade_tipo ON eventos_atividade(tipo_evento);
CREATE INDEX IF NOT EXISTS idx_eventos_atividade_data ON eventos_atividade(criado_em);
CREATE INDEX IF NOT EXISTS idx_metricas_progresso_user ON metricas_progresso(user_id);
CREATE INDEX IF NOT EXISTS idx_metricas_progresso_data ON metricas_progresso(data_referencia);

-- Notificações
CREATE INDEX IF NOT EXISTS idx_notificacoes_user ON notificacoes(user_id);
CREATE INDEX IF NOT EXISTS idx_notificacoes_lida ON notificacoes(lida);
CREATE INDEX IF NOT EXISTS idx_notificacoes_data ON notificacoes(criado_em);

-- ============================================
-- 🚀 FUNCTIONS E TRIGGERS
-- ============================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_biblioteca_instrumentos_updated_at BEFORE UPDATE ON biblioteca_instrumentos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_turmas_updated_at BEFORE UPDATE ON turmas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_matriculas_updated_at BEFORE UPDATE ON matriculas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_desafios_updated_at BEFORE UPDATE ON desafios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_metricas_progresso_updated_at BEFORE UPDATE ON metricas_progresso FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ✅ COMENTÁRIOS FINAIS
-- ============================================

COMMENT ON SCHEMA public IS 'Schema principal do Nipo School - Sistema de Educação Musical Japonesa';
COMMENT ON TABLE profiles IS 'Perfis dos usuários do sistema (alunos, professores, admins)';
COMMENT ON TABLE biblioteca_instrumentos IS 'Catálogo completo de instrumentos musicais com informações culturais e técnicas';
COMMENT ON TABLE turmas IS 'Turmas de aulas organizadas por instrumento e nível';
COMMENT ON TABLE conquistas IS 'Sistema de gamificação com conquistas e pontuações';
COMMENT ON TABLE portfolios IS 'Portfólios dos alunos com suas criações e projetos';
COMMENT ON TABLE desafios IS 'Desafios e exercícios para prática dos alunos';