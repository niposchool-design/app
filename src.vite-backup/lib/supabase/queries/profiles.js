// src/lib/supabase/queries/profiles.ts
// Queries relacionadas a perfis de usuários
import { supabase } from '../client';
/**
 * Buscar perfil pelo ID do usuário
 */
export const getProfileById = async (userId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    if (error)
        throw error;
    return data;
};
/**
 * Buscar perfil pelo email
 */
export const getProfileByEmail = async (email) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();
    if (error)
        throw error;
    return data;
};
/**
 * Atualizar perfil do usuário
 */
export const updateProfile = async (userId, updates) => {
    const { data, error } = await supabase
        .from('profiles')
        .update({
        ...updates,
        updated_at: new Date().toISOString()
    })
        .eq('id', userId)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
/**
 * Criar novo perfil
 */
export const createProfile = async (profile) => {
    const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
/**
 * Listar todos os perfis por tipo
 */
export const listProfilesByType = async (tipo) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('tipo_usuario', tipo)
        .order('nome_completo', { ascending: true });
    if (error)
        throw error;
    return data || [];
};
/**
 * Buscar perfil atual (usuário logado)
 */
export const getCurrentProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        return null;
    return getProfileById(user.id);
};
