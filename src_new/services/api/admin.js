import { supabase } from '@new/lib/supabase/supabaseClient';

/**
 * Admin API Service - Serviços administrativos
 * Migrado de: src/features/admin/services/adminService.js
 * Nova localização: src_new/services/api/admin.js
 */

// Cache simples para otimização
const cache = new Map();
const CACHE_DURATION = 30000; // 30 segundos

const createCacheKey = (method, params = '') => `${method}_${JSON.stringify(params)}`;

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const adminApi = {
  // ==========================================
  // ESTATÍSTICAS GERAIS
  // ==========================================

  async getGeneralStats() {
    const cacheKey = createCacheKey('general_stats');
    const cached = getCachedData(cacheKey);
    
    if (cached) {
      return { success: true, data: cached };
    }

    try {
      // Buscar dados de todas as tabelas principais
      const [
        studentsRes,
        teachersRes,
        instrumentsRes,
        classesRes
      ] = await Promise.all([
        supabase.from('profiles').select('id').eq('role', 'student'),
        supabase.from('profiles').select('id').eq('role', 'teacher'),
        supabase.from('instrumentos').select('id, disponivel'),
        supabase.from('turmas').select('id, ativa')
      ]);

      const stats = {
        students: {
          total: studentsRes.data?.length || 0,
          active: studentsRes.data?.length || 0
        },
        teachers: {
          total: teachersRes.data?.length || 0,
          active: teachersRes.data?.length || 0
        },
        instruments: {
          total: instrumentsRes.data?.length || 0,
          available: instrumentsRes.data?.filter(i => i.disponivel).length || 0
        },
        classes: {
          total: classesRes.data?.length || 0,
          active: classesRes.data?.filter(c => c.ativa).length || 0
        },
        lastUpdated: new Date().toISOString()
      };

      setCachedData(cacheKey, stats);
      return { success: true, data: stats };

    } catch (error) {
      console.error('Erro ao buscar estatísticas gerais:', error);
      return { success: false, error: error.message };
    }
  },

  // ==========================================
  // GESTÃO DE USUÁRIOS
  // ==========================================

  async getUsers(filters = {}) {
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.role) {
        query = query.eq('role', filters.role);
      }

      if (filters.active !== undefined) {
        query = query.eq('ativo', filters.active);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return { success: false, error: error.message };
    }
  },

  async getUserById(id) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return { success: false, error: error.message };
    }
  },

  async updateUser(id, updates) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Limpar cache relacionado
      cache.clear();

      return { success: true, data };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return { success: false, error: error.message };
    }
  },

  // ==========================================
  // GESTÃO DE INSTRUMENTOS
  // ==========================================

  async getInstruments(filters = {}) {
    try {
      let query = supabase
        .from('instrumentos')
        .select('*')
        .order('nome');

      if (filters.category) {
        query = query.eq('categoria', filters.category);
      }

      if (filters.available !== undefined) {
        query = query.eq('disponivel', filters.available);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Erro ao buscar instrumentos:', error);
      return { success: false, error: error.message };
    }
  },

  async createInstrument(instrumentData) {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .insert([instrumentData])
        .select()
        .single();

      if (error) throw error;

      // Limpar cache
      cache.clear();

      return { success: true, data };
    } catch (error) {
      console.error('Erro ao criar instrumento:', error);
      return { success: false, error: error.message };
    }
  },

  async updateInstrument(id, updates) {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Limpar cache
      cache.clear();

      return { success: true, data };
    } catch (error) {
      console.error('Erro ao atualizar instrumento:', error);
      return { success: false, error: error.message };
    }
  },

  async deleteInstrument(id) {
    try {
      const { error } = await supabase
        .from('instrumentos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Limpar cache
      cache.clear();

      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar instrumento:', error);
      return { success: false, error: error.message };
    }
  },

  // ==========================================
  // UTILITÁRIOS
  // ==========================================

  clearCache() {
    cache.clear();
  },

  getCacheStats() {
    return {
      size: cache.size,
      keys: Array.from(cache.keys())
    };
  }
};

export default adminApi;