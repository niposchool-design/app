
import { Database } from '@/lib/supabase/database.types';

export type AchievementRow = Database['public']['Tables']['achievements']['Row'];

export type Nivel = {
    id: string;
    numero: number;
    titulo: string;
    xp_minimo: number;
};

export type Conquista = AchievementRow;

export type Desafio = {
    id: string;
    titulo: string;
    descricao: string;
    ativo: boolean;
};
