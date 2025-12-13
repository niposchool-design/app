
export type TipoConquista = 'medalha' | 'trofeu' | 'badge';
export type CategoriaConquista = 'tecnica' | 'repertorio' | 'teoria' | 'evento' | 'social';

export interface Conquista {
    id: string;
    titulo: string;
    descricao: string;
    tipo: TipoConquista;
    categoria: CategoriaConquista;
    xp_recompensa: number;
    imagem_url?: string;
    criterio_desbloqueio?: string; // Descrição de como ganhar (ex: "Concluir 5 aulas")
    ativo: boolean;
    criado_em?: string;
}

export interface Nivel {
    id: string;
    numero: number;
    titulo: string; // Ex: "Iniciante I", "Samurai da Música"
    xp_minimo: number;
    descricao?: string;
    recompensa_desbloqueio?: string; // Ex: "Acesso a partituras avançadas"
}

export interface Desafio {
    id: string;
    titulo: string;
    descricao: string;
    xp_recompensa: number;
    data_inicio?: string;
    data_fim?: string;
    ativo: boolean;
    requisitos?: string;
}

export interface AlunoGamificacao {
    aluno_id: string;
    nivel_atual: number;
    xp_total: number;
    conquistas_desbloqueadas: string[]; // IDs das conquistas
    streak_dias: number;
    ultima_atividade?: string;
}
