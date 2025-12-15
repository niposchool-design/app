// src/lib/supabase/queries/portfolios.ts
// Queries relacionadas ao portfólio do aluno

import { supabase } from '../client';
import type { Database } from '../database.types';

type Portfolio = Database['public']['Tables']['portfolios']['Row'];
type PortfolioInsert = Database['public']['Tables']['portfolios']['Insert'];
type PortfolioUpdate = Database['public']['Tables']['portfolios']['Update'];

/**
 * Listar portfólios do usuário
 */
export const getUserPortfolios = async (userId: string): Promise<Portfolio[]> => {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * Buscar portfólio por ID
 */
export const getPortfolioById = async (id: string): Promise<Portfolio | null> => {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Criar novo item no portfólio
 */
export const createPortfolio = async (
  portfolio: PortfolioInsert
): Promise<Portfolio> => {
  const { data, error } = await supabase
    .from('portfolios')
    .insert(portfolio)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Atualizar item do portfólio
 */
export const updatePortfolio = async (
  id: string,
  updates: PortfolioUpdate
): Promise<Portfolio> => {
  const { data, error } = await supabase
    .from('portfolios')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Deletar item do portfólio
 */
export const deletePortfolio = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('portfolios')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

/**
 * Listar portfólios públicos (feed)
 */
export const getPublicPortfolios = async (): Promise<Portfolio[]> => {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('visibilidade', 'publico')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  return data || [];
};

/**
 * Listar portfólios por tipo
 */
export const getPortfoliosByType = async (
  userId: string,
  tipo: string
): Promise<Portfolio[]> => {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', userId)
    .eq('tipo', tipo)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};
