
export interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    role: 'admin' | 'professor' | 'aluno';
    matricula?: string;
    data_nascimento?: string;
    telefone?: string;
    nivel_atual?: string;
    criado_em: string;
}

export interface Turma {
    id: string;
    nome: string;
    professor_id?: string;
    professor?: UserProfile;
    sala?: string;
    horario_padrao?: string;
    capacidade_maxima: number;
    nivel?: 'iniciante' | 'intermediário' | 'avançado';
    ano_letivo: number;
    semestre: number;
    ativo: boolean;
    qtd_alunos?: number; // Campo computado/join
}

export interface Matricula {
    id: string;
    turma_id: string;
    aluno_id: string;
    turma?: Turma;
    aluno?: UserProfile;
    status: 'ativo' | 'trancado' | 'concluido' | 'reprovado';
    data_matricula: string;
    nota_final?: number;
    frequencia_porcentagem?: number;
}
