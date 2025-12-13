
export interface CategoriaInstrumento {
    id: string;
    nome: string;
    descricao?: string;
    icone?: string;
    ordem_exibicao: number;
}

export interface Instrumento {
    id: string;
    nome: string;
    categoria_id: string;
    categoria?: CategoriaInstrumento;

    // Detalhes Culturais
    origem?: string;
    historia?: string;
    curiosidades?: string;
    uso_tradicional?: string;
    uso_moderno?: string;

    // Técnico
    classificacao?: string;
    material?: string;
    afinacao?: string;
    tecnicas_basicas?: string;

    // Midia
    imagem_url?: string;
    galeria_imagens?: string[]; // JSONB
    audio_exemplo_url?: string;
    video_demonstracao_url?: string;

    // Pedagógico
    nivel_dificuldade?: 'iniciante' | 'intermediário' | 'avançado';
    idade_recomendada?: string;
    pre_requisitos?: string;

    // Logística
    disponivel_escola: boolean;
    pode_emprestar: boolean;
    ativo: boolean;
}
