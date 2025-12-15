
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
    categoria?: string; // No banco é uma string (varchar), não FK
    descricao?: string;
    imagem_url?: string;
    ativo: boolean;
    nivel_dificuldade?: string;
    ordem_exibicao?: number;
    criado_em?: string;

    // Detalhes Ricos (Campos encontrados no banco)
    historia?: string;
    origem?: string;
    familia_instrumental?: string;
    material_principal?: string;
    tecnica_producao_som?: string;
    dificuldade_aprendizado?: string;
    
    // Campos JSONB
    anatomia_partes?: any; 
    curiosidades?: any; // Pode ser JSONB ou vir da tabela relacionada

    // Campos de compatibilidade (para não quebrar UI existente por enquanto)
    classificacao?: string; // Mapear de familia_instrumental
    
    // Relações (Preenchidas via query)
    midias?: InstrumentoMidia[];
    sons?: InstrumentoSom[];
    curiosidades_lista?: InstrumentoCuriosidade[];
    tecnicas?: InstrumentoTecnica[];
}

export interface InstrumentoCuriosidade {
    id: string;
    instrumento_id: string;
    titulo: string;
    descricao: string;
    tipo: string;
}

export interface InstrumentoMidia {
    id: string;
    instrumento_id: string;
    titulo: string;
    url: string;
    tipo: 'video' | 'audio' | 'imagem' | 'pdf';
    descricao?: string;
}

export interface InstrumentoSom {
    id: string;
    instrumento_id: string;
    titulo: string;
    descricao: string;
    audio_url: string;
    tipo: string;
    created_at: string;
}

export interface InstrumentoTecnica {
    id: string;
    instrumento_id: string;
    titulo: string;
    descricao: string;
    nivel_dificuldade?: string;
    video_url?: string;
    created_at: string;
}
