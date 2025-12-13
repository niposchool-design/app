
-- 👤 PERFIS DE USUÁRIOS (Sincronizado com Auth)
-- ============================================

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'aluno' CHECK (role IN ('admin', 'professor', 'aluno')),
    
    -- Dados adicionais do aluno
    matricula VARCHAR(20),
    data_nascimento DATE,
    telefone VARCHAR(20),
    nivel_atual VARCHAR(20) DEFAULT 'Iniciante',
    
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para criar perfil automaticamente no cadastro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    COALESCE(new.raw_user_meta_data->>'role', 'aluno')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================
-- 🏫 GESTÃO DE TURMAS
-- ============================================

CREATE TABLE public.turmas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL, -- Ex: "Violino Iniciante A", "Teoria Musical III"
    professor_id UUID REFERENCES public.profiles(id),
    
    -- Configuração
    sala VARCHAR(50),
    horario_padrao VARCHAR(100), -- Ex: "Terças e Quintas, 14h"
    capacidade_maxima INTEGER DEFAULT 20,
    nivel VARCHAR(20) CHECK (nivel IN ('iniciante', 'intermediário', 'avançado')),
    
    ano_letivo INTEGER NOT NULL,
    semestre INTEGER CHECK (semestre IN (1, 2)),
    
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Relacionamento Alunos <-> Turmas
CREATE TABLE public.matriculas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    turma_id UUID REFERENCES public.turmas(id) ON DELETE CASCADE,
    aluno_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'trancado', 'concluido', 'reprovado')),
    data_matricula TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    nota_final DECIMAL(4,2),
    frequencia_porcentagem INTEGER,
    
    UNIQUE(turma_id, aluno_id)
);

-- ============================================
-- 📊 ÍNDICES
-- ============================================
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_turmas_professor ON public.turmas(professor_id);
CREATE INDEX idx_matriculas_aluno ON public.matriculas(aluno_id);
CREATE INDEX idx_matriculas_turma ON public.matriculas(turma_id);

-- Comentários para IA e Devs
COMMENT ON TABLE public.profiles IS 'Tabela pública de perfis de usuários espelhada de auth.users';
COMMENT ON TABLE public.turmas IS 'Turmas de alunos gerenciadas por professores';
