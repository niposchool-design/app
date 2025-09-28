import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../shared/lib/supabase/supabaseClient';
import { useAuth } from '../../../shared/contexts/AuthContext';

export const useDevotionals = () => {
  const [devotionals, setDevotionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Buscar devocionais publicados
  const fetchDevotionals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('devotional_content')
        .select('*')
        .eq('is_published', true)
        .order('published_date', { ascending: false });

      if (error) throw error;

      // Se usuário logado, buscar progresso de leitura
      let devotionalsWithProgress = data;
      if (user) {
        const { data: progressData } = await supabase
          .from('user_devotional_progress')
          .select('devotional_id, read_at, is_favorite, personal_notes')
          .eq('user_id', user.id);

        const progressMap = new Map(
          (progressData || []).map(p => [p.devotional_id, p])
        );

        devotionalsWithProgress = data.map(devotional => ({
          ...devotional,
          is_read: progressMap.has(devotional.id),
          read_at: progressMap.get(devotional.id)?.read_at || null,
          is_favorite: progressMap.get(devotional.id)?.is_favorite || false,
          personal_notes: progressMap.get(devotional.id)?.personal_notes || null
        }));
      }

      setDevotionals(devotionalsWithProgress);
    } catch (err) {
      console.error('Erro ao buscar devocionais:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Marcar devocional como lido
  const markAsRead = async (devotionalId, personalNotes = null) => {
    if (!user) throw new Error('Usuário não autenticado');

    try {
      // Verificar se já foi lido antes (para pontuação)
      const { data: existingProgress } = await supabase
        .from('user_devotional_progress')
        .select('is_read')
        .eq('user_id', user.id)
        .eq('devotional_id', devotionalId)
        .single();

      const wasAlreadyRead = existingProgress?.is_read || false;

      const { data, error } = await supabase
        .from('user_devotional_progress')
        .upsert({
          user_id: user.id,
          devotional_id: devotionalId,
          is_read: true,
          read_at: new Date().toISOString(),
          personal_notes: personalNotes
        }, {
          onConflict: 'user_id,devotional_id'
        })
        .select()
        .single();

      if (error) throw error;

      // Atualizar view count do devocional
      await supabase.rpc('increment_devotional_view_count', {
        devotional_id: devotionalId
      });

      // 🎮 INTEGRAÇÃO GAMIFICAÇÃO: Atribuir pontos apenas na primeira leitura
      if (!wasAlreadyRead) {
        await awardDevotionalPoints(user.id);
      }

      // Atualizar estado local
      setDevotionals(prev => prev.map(d => 
        d.id === devotionalId 
          ? { 
              ...d, 
              is_read: true, 
              read_at: data.read_at,
              personal_notes: data.personal_notes,
              view_count: (d.view_count || 0) + 1
            }
          : d
      ));

      return data;
    } catch (err) {
      console.error('Erro ao marcar como lido:', err);
      throw err;
    }
  };

  // Função para atribuir pontos pela leitura do devocional
  const awardDevotionalPoints = async (userId) => {
    try {
      // Buscar progresso de devocionais dos últimos 30 dias para calcular streak
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      
      const { data: recentProgress } = await supabase
        .from('user_devotional_progress')
        .select('read_at')
        .eq('user_id', userId)
        .eq('is_read', true)
        .gte('read_at', thirtyDaysAgo)
        .order('read_at', { ascending: false });

      // Calcular streak de leitura consecutiva
      let currentStreak = 1; // Hoje conta como 1
      const today = new Date();
      const readDates = recentProgress?.map(p => new Date(p.read_at).toDateString()) || [];
      
      // Verificar dias consecutivos
      for (let i = 1; i <= 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        
        if (readDates.includes(checkDate.toDateString())) {
          currentStreak++;
        } else {
          break;
        }
      }

      // Pontuação base: 10 pontos por devocional
      let points = 10;
      
      // Bônus por streak
      if (currentStreak >= 3) points += 5;   // 3+ dias: +5 pontos
      if (currentStreak >= 7) points += 15;  // 7+ dias: +20 pontos total
      if (currentStreak >= 30) points += 30; // 30+ dias: +50 pontos total

      // Buscar perfil atual
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_points, current_devotional_streak, best_devotional_streak, devotional_count')
        .eq('id', userId)
        .single();

      if (profile) {
        const newTotalPoints = (profile.total_points || 0) + points;
        const newDevotionalCount = (profile.devotional_count || 0) + 1;
        const bestStreak = Math.max(profile.best_devotional_streak || 0, currentStreak);

        // Atualizar perfil
        await supabase
          .from('profiles')
          .update({
            total_points: newTotalPoints,
            current_devotional_streak: currentStreak,
            best_devotional_streak: bestStreak,
            devotional_count: newDevotionalCount,
            last_devotional_read: new Date().toISOString().split('T')[0]
          })
          .eq('id', userId);

        // Verificar conquistas
        await checkDevotionalAchievements(userId, {
          devotional_count: newDevotionalCount,
          current_streak: currentStreak,
          best_streak: bestStreak
        });

        console.log(`✨ Devocional: +${points} pontos (Streak: ${currentStreak} dias)`);
      }

    } catch (error) {
      console.error('Erro ao atribuir pontos do devocional:', error);
    }
  };

  // Verificar conquistas relacionadas a devocionais
  const checkDevotionalAchievements = async (userId, stats) => {
    try {
      // Conquistas disponíveis para devocionais
      const achievementsToCheck = [
        { id: 'first_devotional', condition: stats.devotional_count === 1 },
        { id: 'devotional_streak_3', condition: stats.current_streak === 3 },
        { id: 'devotional_streak_7', condition: stats.current_streak === 7 },
        { id: 'devotional_streak_30', condition: stats.current_streak === 30 },
        { id: 'devotional_reader_10', condition: stats.devotional_count === 10 },
        { id: 'devotional_reader_50', condition: stats.devotional_count === 50 },
        { id: 'devotional_champion', condition: stats.best_streak >= 14 }
      ];

      for (const achievement of achievementsToCheck) {
        if (achievement.condition) {
          // Verificar se já tem a conquista
          const { data: existing } = await supabase
            .from('user_achievements')
            .select('id')
            .eq('user_id', userId)
            .eq('achievement_id', achievement.id)
            .single();

          if (!existing) {
            // Atribuir nova conquista
            const { error } = await supabase
              .from('user_achievements')
              .insert([{
                user_id: userId,
                achievement_id: achievement.id,
                earned_at: new Date().toISOString()
              }]);

            if (!error) {
              console.log(`🏆 Nova conquista: ${achievement.id}`);
            }
          }
        }
      }
    } catch (error) {
      console.error('Erro ao verificar conquistas:', error);
    }
  };

  // Favoritar/desfavoritar devocional
  const toggleFavorite = async (devotionalId) => {
    if (!user) throw new Error('Usuário não autenticado');

    try {
      const devotional = devotionals.find(d => d.id === devotionalId);
      const newFavoriteStatus = !devotional?.is_favorite;

      const { data, error } = await supabase
        .from('user_devotional_progress')
        .upsert({
          user_id: user.id,
          devotional_id: devotionalId,
          is_favorite: newFavoriteStatus,
          read_at: devotional?.is_read ? devotional.read_at : new Date().toISOString()
        }, {
          onConflict: 'user_id,devotional_id'
        })
        .select()
        .single();

      if (error) throw error;

      // Atualizar estado local
      setDevotionals(prev => prev.map(d => 
        d.id === devotionalId 
          ? { 
              ...d, 
              is_favorite: newFavoriteStatus,
              is_read: true,
              read_at: data.read_at
            }
          : d
      ));

      return data;
    } catch (err) {
      console.error('Erro ao favoritar:', err);
      throw err;
    }
  };

  // Adicionar/atualizar anotações pessoais
  const updatePersonalNotes = async (devotionalId, notes) => {
    if (!user) throw new Error('Usuário não autenticado');

    try {
      const { data, error } = await supabase
        .from('user_devotional_progress')
        .upsert({
          user_id: user.id,
          devotional_id: devotionalId,
          personal_notes: notes,
          read_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,devotional_id'
        })
        .select()
        .single();

      if (error) throw error;

      // Atualizar estado local
      setDevotionals(prev => prev.map(d => 
        d.id === devotionalId 
          ? { 
              ...d, 
              personal_notes: notes,
              is_read: true,
              read_at: data.read_at
            }
          : d
      ));

      return data;
    } catch (err) {
      console.error('Erro ao atualizar anotações:', err);
      throw err;
    }
  };

  // Obter devocional do dia
  const getTodayDevotional = () => {
    const today = new Date().toISOString().split('T')[0];
    return devotionals.find(d => 
      d.published_date === today || 
      (d.category === 'daily' && !d.is_read)
    ) || devotionals[0];
  };

  // Filtrar por categoria
  const filterByCategory = (category) => {
    if (!category) return devotionals;
    return devotionals.filter(d => d.category === category);
  };

  // Obter favoritos
  const getFavorites = () => {
    return devotionals.filter(d => d.is_favorite);
  };

  // Obter devocionais lidos
  const getReadDevotionals = () => {
    return devotionals.filter(d => d.is_read);
  };

  // Obter estatísticas de leitura
  const getReadingStats = () => {
    const totalDevotionals = devotionals.length;
    const readDevotionals = devotionals.filter(d => d.is_read).length;
    const favoriteDevotionals = devotionals.filter(d => d.is_favorite).length;
    const withNotes = devotionals.filter(d => d.personal_notes).length;

    const categoryStats = devotionals.reduce((stats, devotional) => {
      const category = devotional.category;
      if (!stats[category]) {
        stats[category] = { total: 0, read: 0 };
      }
      stats[category].total += 1;
      if (devotional.is_read) {
        stats[category].read += 1;
      }
      return stats;
    }, {});

    return {
      total: totalDevotionals,
      read: readDevotionals,
      favorites: favoriteDevotionals,
      withNotes,
      readingPercentage: totalDevotionals > 0 
        ? Math.round((readDevotionals / totalDevotionals) * 100) 
        : 0,
      categoryStats
    };
  };

  // Buscar devocional específico
  const getDevotional = async (devotionalId) => {
    try {
      const { data, error } = await supabase
        .from('devotional_content')
        .select('*')
        .eq('id', devotionalId)
        .eq('is_published', true)
        .single();

      if (error) throw error;

      // Se usuário logado, buscar progresso
      if (user) {
        const { data: progressData } = await supabase
          .from('user_devotional_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('devotional_id', devotionalId)
          .single();

        return {
          ...data,
          is_read: !!progressData,
          read_at: progressData?.read_at || null,
          is_favorite: progressData?.is_favorite || false,
          personal_notes: progressData?.personal_notes || null
        };
      }

      return data;
    } catch (err) {
      console.error('Erro ao buscar devocional:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      fetchDevotionals();
    }
  }, [user, fetchDevotionals]);

  return {
    devotionals,
    loading,
    error,
    fetchDevotionals,
    markAsRead,
    toggleFavorite,
    updatePersonalNotes,
    getTodayDevotional,
    filterByCategory,
    getFavorites,
    getReadDevotionals,
    getReadingStats,
    getDevotional,
    refetch: fetchDevotionals
  };
};