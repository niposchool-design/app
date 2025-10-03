import { supabase } from '@new/lib/supabase/supabaseClient';

/**
 * Instruments API Service - Serviços para instrumentos
 * Migrado de: src/features/instrumentos/services/instrumentsService.js
 * Nova localização: src_new/services/api/instruments.js
 */

export const instrumentsApi = {
  // ==========================================
  // BUSCAR INSTRUMENTOS
  // ==========================================

  async getAll(filters = {}) {
    try {
      let query = supabase
        .from('instrumentos')
        .select(`
          id,
          nome,
          categoria,
          descricao,
          nivel_dificuldade,
          idade_minima,
          preco_aula,
          disponivel,
          imagem_url,
          created_at,
          updated_at
        `)
        .order('nome');

      // Aplicar filtros
      if (filters.category) {
        query = query.eq('categoria', filters.category);
      }

      if (filters.available !== undefined) {
        query = query.eq('disponivel', filters.available);
      }

      if (filters.difficulty) {
        query = query.eq('nivel_dificuldade', filters.difficulty);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Erro ao buscar instrumentos:', error);
      return { success: false, error: error.message };
    }
  },

  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Erro ao buscar instrumento:', error);
      return { success: false, error: error.message };
    }
  },

  async getByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .select('*')
        .eq('categoria', category)
        .eq('disponivel', true)
        .order('nome');

      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Erro ao buscar instrumentos por categoria:', error);
      return { success: false, error: error.message };
    }
  },

  // ==========================================
  // CRIAR E ATUALIZAR
  // ==========================================

  async create(instrumentData) {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .insert([{
          ...instrumentData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Erro ao criar instrumento:', error);
      return { success: false, error: error.message };
    }
  },

  async update(id, updates) {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Erro ao atualizar instrumento:', error);
      return { success: false, error: error.message };
    }
  },

  async delete(id) {
    try {
      const { error } = await supabase
        .from('instrumentos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar instrumento:', error);
      return { success: false, error: error.message };
    }
  },

  // ==========================================
  // ESTATÍSTICAS E ANÁLISES
  // ==========================================

  async getStats() {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .select('categoria, disponivel, nivel_dificuldade');

      if (error) throw error;

      const stats = {
        total: data.length,
        available: data.filter(i => i.disponivel).length,
        unavailable: data.filter(i => !i.disponivel).length,
        byCategory: {},
        byDifficulty: {}
      };

      // Agrupar por categoria
      data.forEach(instrument => {
        const cat = instrument.categoria || 'Sem categoria';
        stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;
      });

      // Agrupar por dificuldade
      data.forEach(instrument => {
        const diff = instrument.nivel_dificuldade || 'Não definido';
        stats.byDifficulty[diff] = (stats.byDifficulty[diff] || 0) + 1;
      });

      return { success: true, data: stats };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      return { success: false, error: error.message };
    }
  },

  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('instrumentos')
        .select('categoria')
        .not('categoria', 'is', null);

      if (error) throw error;

      const categories = [...new Set(data.map(i => i.categoria))].sort();
      return { success: true, data: categories };
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      return { success: false, error: error.message };
    }
  },

  // ==========================================
  // BUSCA E FILTROS
  // ==========================================

  async search(searchTerm, filters = {}) {
    try {
      let query = supabase
        .from('instrumentos')
        .select('*')
        .ilike('nome', `%${searchTerm}%`);

      // Aplicar filtros adicionais
      if (filters.category) {
        query = query.eq('categoria', filters.category);
      }

      if (filters.available !== undefined) {
        query = query.eq('disponivel', filters.available);
      }

      const { data, error } = await query
        .order('nome')
        .limit(20);

      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Erro na busca:', error);
      return { success: false, error: error.message };
    }
  }
};

export default instrumentsApi;