
export interface CategoriaVideo {
    id: string;
    nome: string;
    descricao?: string;
    icone?: string;
    cor_tema?: string;
}

export interface VideoProfessor {
    id: string;
    titulo: string;
    categoria_id: string;
    professor_id: string;

    descricao?: string;
    duracao?: number;
    video_url: string;
    thumbnail_url?: string;

    modulo?: string;
    aula_relacionada_id?: string;
    instrumento_foco?: string;
    nivel_dificuldade?: 'iniciante' | 'intermediário' | 'avançado';

    publico: boolean;
    requer_autenticacao: boolean;
    liberado_para_nivel?: string;

    transcricao?: string;
    materiais_complementares?: string; // JSONB

    tags?: string[];
    visualizacoes: number;
    ativo: boolean;

    // Joins
    categoria?: CategoriaVideo;
    professor?: {
        full_name?: string;
        avatar_url?: string;
    };
}
