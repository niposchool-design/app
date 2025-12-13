
export interface CategoriaRepertorio {
    id: string;
    nome: string;
    descricao?: string;
    cor_tema?: string;
    ordem_exibicao: number;
}

export interface Repertorio {
    id: string;
    titulo: string;
    categoria_id: string;
    categoria?: CategoriaRepertorio;

    compositor?: string;
    arranjo_por?: string;
    tonalidade?: string;
    andamento?: string;
    duracao_estimada?: number;

    nivel_dificuldade?: 'iniciante' | 'intermediário' | 'avançado';
    instrumentos_necessarios?: string[]; // JSONB array de strings ou objetos
    numero_minimo_participantes: number;

    partitura_url?: string;
    cifra_url?: string;
    letra_url?: string;
    playback_url?: string;
    video_tutorial_url?: string;

    publico: boolean;
    requer_aprovacao_professor: boolean;

    tags?: string[];
    observacoes?: string;
    ativo: boolean;
}
