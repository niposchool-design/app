// src/hooks/useAlphaDesafios.ts
// Hook para sistema de desafios Alpha
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getActiveDesafios, getDesafioById, getDesafiosByNivel, createDesafio, updateDesafio, deactivateDesafio } from '../lib/supabase/queries/alpha-desafios';
import { CommonErrors } from '../utils/error-handler';
import { useCurrentUser } from './useAuth';
/**
 * Hook para obter desafios ativos
 */
export const useActiveDesafios = () => {
    return useQuery({
        queryKey: ['alpha-desafios', 'active'],
        queryFn: getActiveDesafios,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
};
/**
 * Hook para obter desafio específico por ID
 */
export const useDesafio = (id) => {
    return useQuery({
        queryKey: ['alpha-desafios', id],
        queryFn: () => getDesafioById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000
    });
};
/**
 * Hook para obter desafios por nível
 */
export const useDesafiosByNivel = (nivel) => {
    return useQuery({
        queryKey: ['alpha-desafios', 'nivel', nivel],
        queryFn: () => getDesafiosByNivel(nivel),
        enabled: !!nivel,
        staleTime: 5 * 60 * 1000
    });
};
/**
 * Hook para criar novo desafio (Admin/Professor apenas)
 */
export const useCreateDesafio = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();
    return useMutation({
        mutationFn: async (desafioData) => {
            if (!user)
                throw CommonErrors.AUTH_REQUIRED;
            return createDesafio(desafioData);
        },
        onSuccess: () => {
            // Invalidar queries de desafios para recarregar lista
            queryClient.invalidateQueries({ queryKey: ['alpha-desafios'] });
        },
        onError: (error) => {
            handleError(error);
        }
    });
};
/**
 * Hook para atualizar desafio existente
 */
export const useUpdateDesafio = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();
    return useMutation({
        mutationFn: async ({ id, updates }) => {
            if (!user)
                throw CommonErrors.AUTH_REQUIRED;
            return updateDesafio(id, updates);
        },
        onSuccess: (data) => {
            // Invalidar queries específicas
            queryClient.invalidateQueries({ queryKey: ['alpha-desafios', data.id] });
            queryClient.invalidateQueries({ queryKey: ['alpha-desafios', 'active'] });
        },
        onError: (error) => {
            handleError(error);
        }
    });
};
/**
 * Hook para desativar desafio
 */
export const useDeactivateDesafio = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();
    return useMutation({
        mutationFn: async (id) => {
            if (!user)
                throw CommonErrors.AUTH_REQUIRED;
            return deactivateDesafio(id);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['alpha-desafios', data.id] });
            queryClient.invalidateQueries({ queryKey: ['alpha-desafios', 'active'] });
        },
        onError: (error) => {
            handleError(error);
        }
    });
};
/**
 * Hook para obter desafios filtrados por dificuldade
 */
export const useDesafiosByDifficulty = () => {
    const { data: desafios } = useActiveDesafios();
    const byDifficulty = {
        iniciante: desafios?.filter(d => d.nivel === 'iniciante') || [],
        intermediario: desafios?.filter(d => d.nivel === 'intermediario') || [],
        avancado: desafios?.filter(d => d.nivel === 'avancado') || []
    };
    return {
        data: byDifficulty,
        isLoading: !desafios
    };
};
/**
 * Hook para estatísticas de desafios
 */
export const useDesafiosStats = () => {
    const { data: desafios } = useActiveDesafios();
    const stats = {
        total: desafios?.length || 0,
        iniciante: desafios?.filter(d => d.nivel === 'iniciante').length || 0,
        intermediario: desafios?.filter(d => d.nivel === 'intermediario').length || 0,
        avancado: desafios?.filter(d => d.nivel === 'avancado').length || 0,
        totalPontos: desafios?.reduce((sum, d) => sum + d.pontos, 0) || 0
    };
    return {
        data: stats,
        isLoading: !desafios
    };
};
