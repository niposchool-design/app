// src/lib/supabase/queries/alpha-desafios.ts
// Queries relacionadas ao sistema Alpha de desafios

import { supabase } from '../client';
import type { Database } from '../database.types';

type AlphaDesafio = Database['public']['Tables']['alpha_desafios']['Row'];
type AlphaDesafioInsert = Database['public']['Tables']['alpha_desafios']['Insert'];
type AlphaDesafioUpdate = Database['public']['Tables']['alpha_desafios']['Update'];

/**
 * Listar todos os desafios ativos
 */
export const getActiveDesafios = async (): Promise<AlphaDesafio[]> => {
  const { data, error } = await supabase
    .from('alpha_desafios')
    .select('*')
    .eq('ativo', true)
    .order('nivel', { ascending: true });

  if (error) throw error;
  return data || [];
};

/**
 * Buscar desafio por ID
 */
export const getDesafioById = async (id: string): Promise<AlphaDesafio | null> => {
  const { data, error } = await supabase
    .from('alpha_desafios')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Listar desafios por nível
 */
export const getDesafiosByNivel = async (nivel: string): Promise<AlphaDesafio[]> => {
  const { data, error } = await supabase
    .from('alpha_desafios')
    .select('*')
    .eq('nivel', nivel)
    .eq('ativo', true)
    .order('pontos', { ascending: true });

  if (error) throw error;
  return data || [];
};

/**
 * Criar novo desafio
 */
export const createDesafio = async (
  desafio: AlphaDesafioInsert
): Promise<AlphaDesafio> => {
  const { data, error } = await supabase
    .from('alpha_desafios')
    .insert(desafio)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Atualizar desafio
 */
export const updateDesafio = async (
  id: string,
  updates: AlphaDesafioUpdate
): Promise<AlphaDesafio> => {
  const { data, error } = await supabase
    .from('alpha_desafios')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Desativar desafio
 */
export const deactivateDesafio = async (id: string): Promise<AlphaDesafio> => {
  return updateDesafio(id, { ativo: false });
};
