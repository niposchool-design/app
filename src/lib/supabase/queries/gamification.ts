import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

export interface Conquista {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  categoria: string;
  pontos_recompensa: number;
  badge_visual: string;
  raridade: 'comum' | 'raro' | 'epico' | 'lendario';
  dificuldade: 'facil' | 'medio' | 'dificil' | 'extremo';
  condicao_meta?: number;
}

export interface ConquistaUsuario {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
  achievement: Conquista;
}

export const getConquistasUsuario = cache(async () => {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievement:achievements (
        id,
        nome,
        descricao,
        icone,
        categoria,
        pontos_recompensa,
        badge_visual,
        raridade,
        dificuldade
      )
    `)
    .eq('user_id', user.id)
    .order('earned_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar conquistas do usuário:', error);
    return [];
  }

  return data as ConquistaUsuario[];
});

export const getTodasConquistas = cache(async () => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('ativo', true)
    .order('ordem_exibicao', { ascending: true });

  if (error) {
    console.error('Erro ao buscar todas as conquistas:', error);
    return [];
  }

  return data as Conquista[];
});

export const getProgressoConquistas = cache(async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];

    // Aqui idealmente buscaríamos da tabela achievements_progress se ela estiver sendo usada
    // Por enquanto vamos retornar vazio ou implementar se necessário
    return [];
});
