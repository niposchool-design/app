-- ============================================
-- 🎌 NIPO SCHOOL - SCHEMA PRINCIPAL
-- Sistema de Gestão Escolar Musical
-- ============================================

-- ============================================
-- 1. TABELA DE PERFIS DE USUÁRIO
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    nome TEXT,
    telefone TEXT,
    avatar_url TEXT,
    data_nascimento DATE,
    tipo_usuario TEXT CHECK (tipo_usuario IN ('admin', 'professor', 'aluno')),
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. TABELA DE ROLES (CONTROLE DE ACESSO)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role_type TEXT NOT NULL CHECK (role_type IN ('admin', 'professor', 'aluno')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, role_type)
);

-- ============================================
-- 3. TABELA DE AULAS
-- ============================================
CREATE TABLE IF NOT EXISTS public.aulas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    descricao TEXT,
    professor_id UUID REFERENCES auth.users(id),
    data TIMESTAMP WITH TIME ZONE NOT NULL,
    duracao_minutos INTEGER DEFAULT 60,
    status TEXT CHECK (status IN ('agendada', 'em_andamento', 'concluida', 'cancelada')) DEFAULT 'agendada',
    sala TEXT,
    instrumento TEXT,
    nivel TEXT CHECK (nivel IN ('iniciante', 'intermediario', 'avancado')),
    max_alunos INTEGER DEFAULT 10,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. TABELA DE INSCRIÇÕES EM AULAS
-- ============================================
CREATE TABLE IF NOT EXISTS public.aula_inscricoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aula_id UUID REFERENCES public.aulas(id) ON DELETE CASCADE,
    aluno_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('inscrito', 'presente', 'ausente', 'cancelado')) DEFAULT 'inscrito',
    nota_avaliacao INTEGER CHECK (nota_avaliacao >= 1 AND nota_avaliacao <= 5),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(aula_id, aluno_id)
);

-- ============================================
-- 5. TABELA DE INSTRUMENTOS
-- ============================================
CREATE TABLE IF NOT EXISTS public.instrumentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL UNIQUE,
    categoria TEXT, -- Cordas, Sopro, Percussão, Teclados
    descricao TEXT,
    imagem_url TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. TABELA DE PROGRESSO DOS ALUNOS
-- ============================================
CREATE TABLE IF NOT EXISTS public.aluno_progresso (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aluno_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    instrumento_id UUID REFERENCES public.instrumentos(id),
    nivel_atual TEXT CHECK (nivel_atual IN ('iniciante', 'intermediario', 'avancado')) DEFAULT 'iniciante',
    total_aulas INTEGER DEFAULT 0,
    total_horas DECIMAL DEFAULT 0,
    ultima_aula TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(aluno_id, instrumento_id)
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_type ON public.user_roles(role_type);
CREATE INDEX IF NOT EXISTS idx_aulas_professor_id ON public.aulas(professor_id);
CREATE INDEX IF NOT EXISTS idx_aulas_data ON public.aulas(data);
CREATE INDEX IF NOT EXISTS idx_aula_inscricoes_aula_id ON public.aula_inscricoes(aula_id);
CREATE INDEX IF NOT EXISTS idx_aula_inscricoes_aluno_id ON public.aula_inscricoes(aluno_id);
CREATE INDEX IF NOT EXISTS idx_aluno_progresso_aluno_id ON public.aluno_progresso(aluno_id);

-- ============================================
-- VIEWS PARA FACILITAR CONSULTAS
-- ============================================

-- View de Professores
CREATE OR REPLACE VIEW public.view_professores AS
SELECT 
    p.id,
    p.email,
    p.nome,
    p.telefone,
    p.avatar_url,
    p.ativo,
    ur.is_active as role_ativo,
    COUNT(DISTINCT a.id) as total_aulas,
    p.created_at
FROM public.profiles p
INNER JOIN public.user_roles ur ON ur.user_id = p.id AND ur.role_type = 'professor'
LEFT JOIN public.aulas a ON a.professor_id = p.id AND a.ativo = TRUE
GROUP BY p.id, p.email, p.nome, p.telefone, p.avatar_url, p.ativo, ur.is_active, p.created_at;

-- View de Alunos
CREATE OR REPLACE VIEW public.view_alunos AS
SELECT 
    p.id,
    p.email,
    p.nome,
    p.telefone,
    p.avatar_url,
    p.data_nascimento,
    p.ativo,
    ur.is_active as role_ativo,
    COUNT(DISTINCT ai.id) as total_inscricoes,
    COUNT(DISTINCT CASE WHEN ai.status = 'presente' THEN ai.id END) as total_presencas,
    p.created_at
FROM public.profiles p
INNER JOIN public.user_roles ur ON ur.user_id = p.id AND ur.role_type = 'aluno'
LEFT JOIN public.aula_inscricoes ai ON ai.aluno_id = p.id
GROUP BY p.id, p.email, p.nome, p.telefone, p.avatar_url, p.data_nascimento, p.ativo, ur.is_active, p.created_at;

-- View de Dashboard Stats
CREATE OR REPLACE VIEW public.view_dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM public.user_roles WHERE role_type = 'aluno' AND is_active = TRUE) as total_alunos,
    (SELECT COUNT(*) FROM public.user_roles WHERE role_type = 'professor' AND is_active = TRUE) as total_professores,
    (SELECT COUNT(*) FROM public.aulas WHERE ativo = TRUE) as total_aulas,
    (SELECT COUNT(*) FROM public.aulas WHERE DATE(data) = CURRENT_DATE AND ativo = TRUE) as aulas_hoje,
    (SELECT COUNT(*) FROM public.instrumentos WHERE ativo = TRUE) as total_instrumentos;

-- ============================================
-- POLÍTICAS RLS (ROW LEVEL SECURITY)
-- ============================================

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aula_inscricoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instrumentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aluno_progresso ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Usuários podem ver seu próprio perfil" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins e Professores podem ver todos os perfis" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role_type IN ('admin', 'professor')
            AND is_active = TRUE
        )
    );

-- Políticas para user_roles
CREATE POLICY "Usuários podem ver seus próprios roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins podem gerenciar roles" ON public.user_roles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role_type = 'admin'
            AND is_active = TRUE
        )
    );

-- Políticas para aulas
CREATE POLICY "Todos podem ver aulas ativas" ON public.aulas
    FOR SELECT USING (ativo = TRUE);

CREATE POLICY "Professores podem gerenciar suas aulas" ON public.aulas
    FOR ALL USING (
        auth.uid() = professor_id OR
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role_type = 'admin'
            AND is_active = TRUE
        )
    );

-- Políticas para inscrições
CREATE POLICY "Alunos podem ver suas inscrições" ON public.aula_inscricoes
    FOR SELECT USING (auth.uid() = aluno_id);

CREATE POLICY "Professores e Admins podem ver todas as inscrições" ON public.aula_inscricoes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role_type IN ('admin', 'professor')
            AND is_active = TRUE
        )
    );

-- Políticas para instrumentos (público)
CREATE POLICY "Todos podem ver instrumentos" ON public.instrumentos
    FOR SELECT USING (ativo = TRUE);

-- Políticas para progresso
CREATE POLICY "Alunos podem ver seu progresso" ON public.aluno_progresso
    FOR SELECT USING (auth.uid() = aluno_id);

CREATE POLICY "Professores e Admins podem ver todo progresso" ON public.aluno_progresso
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role_type IN ('admin', 'professor')
            AND is_active = TRUE
        )
    );

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_roles_updated_at BEFORE UPDATE ON public.user_roles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_aulas_updated_at BEFORE UPDATE ON public.aulas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_aula_inscricoes_updated_at BEFORE UPDATE ON public.aula_inscricoes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_aluno_progresso_updated_at BEFORE UPDATE ON public.aluno_progresso
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMENTÁRIOS
-- ============================================
COMMENT ON TABLE public.profiles IS 'Perfis dos usuários do sistema (admin, professor, aluno)';
COMMENT ON TABLE public.user_roles IS 'Controle de roles e permissões por usuário';
COMMENT ON TABLE public.aulas IS 'Aulas agendadas e realizadas';
COMMENT ON TABLE public.aula_inscricoes IS 'Inscrições de alunos em aulas';
COMMENT ON TABLE public.instrumentos IS 'Catálogo de instrumentos musicais';
COMMENT ON TABLE public.aluno_progresso IS 'Progresso dos alunos por instrumento';
