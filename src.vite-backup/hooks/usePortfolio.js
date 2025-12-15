// src/hooks/usePortfolio.ts
// Hook para sistema de portfólios
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio, getPublicPortfolios, getPortfoliosByType } from '../lib/supabase/queries/portfolios';
import { CommonErrors } from '../utils/error-handler';
import { useCurrentUser } from './useAuth';
/**
 * Hook para obter portfólios do usuário
 */
export const useUserPortfolios = () => {
    const { data: user } = useCurrentUser();
    return useQuery({
        queryKey: ['portfolios', user?.id],
        queryFn: async () => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            return getUserPortfolios(user.id);
        },
        enabled: !!user?.id,
        staleTime: 2 * 60 * 1000 // 2 minutos
    });
};
/**
 * Hook para obter portfólio específico
 */
export const usePortfolio = (id) => {
    return useQuery({
        queryKey: ['portfolios', 'detail', id],
        queryFn: () => getPortfolioById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000
    });
};
/**
 * Hook para obter portfólios públicos
 */
export const usePublicPortfolios = () => {
    return useQuery({
        queryKey: ['portfolios', 'public'],
        queryFn: getPublicPortfolios,
        staleTime: 10 * 60 * 1000 // 10 minutos
    });
};
/**
 * Hook para obter portfólios por tipo
 */
export const usePortfoliosByType = (type) => {
    const { data: user } = useCurrentUser();
    return useQuery({
        queryKey: ['portfolios', 'type', type, user?.id],
        queryFn: () => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            return getPortfoliosByType(user.id, type);
        },
        enabled: !!type && !!user?.id,
        staleTime: 5 * 60 * 1000
    });
};
/**
 * Hook para criar novo portfólio
 */
export const useCreatePortfolio = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();
    return useMutation({
        mutationFn: async (portfolioData) => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            return createPortfolio({
                user_id: user.id,
                ...portfolioData
            });
        },
        onSuccess: () => {
            // Invalidar lista de portfólios do usuário
            queryClient.invalidateQueries({ queryKey: ['portfolios', user?.id] });
        },
        onError: (error) => {
            handleError(error);
        }
    });
};
/**
 * Hook para atualizar portfólio
 */
export const useUpdatePortfolio = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();
    return useMutation({
        mutationFn: async ({ id, updates }) => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            return updatePortfolio(id, updates);
        },
        // Optimistic update para melhor UX
        onMutate: async ({ id, updates }) => {
            // Cancelar queries em andamento
            await queryClient.cancelQueries({ queryKey: ['portfolios', 'detail', id] });
            // Snapshot do valor anterior
            const previousPortfolio = queryClient.getQueryData(['portfolios', 'detail', id]);
            // Atualizar otimisticamente
            queryClient.setQueryData(['portfolios', 'detail', id], (old) => ({
                ...old,
                ...updates
            }));
            return { previousPortfolio };
        },
        onError: (_error, { id }, context) => {
            // Reverter em caso de erro
            if (context?.previousPortfolio) {
                queryClient.setQueryData(['portfolios', 'detail', id], context.previousPortfolio);
            }
            handleError(_error);
        },
        onSuccess: (data) => {
            // Invalidar queries relacionadas
            queryClient.invalidateQueries({ queryKey: ['portfolios', 'detail', data.id] });
            queryClient.invalidateQueries({ queryKey: ['portfolios', user?.id] });
        }
    });
};
/**
 * Hook para deletar portfólio
 */
export const useDeletePortfolio = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();
    return useMutation({
        mutationFn: async (id) => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            await deletePortfolio(id);
            return id;
        },
        onSuccess: (deletedId) => {
            // Remover do cache
            queryClient.removeQueries({ queryKey: ['portfolios', 'detail', deletedId] });
            queryClient.invalidateQueries({ queryKey: ['portfolios', user?.id] });
        },
        onError: (error) => {
            handleError(error);
        }
    });
};
/**
 * Hook para obter estatísticas de portfólio
 */
export const usePortfolioStats = () => {
    const { data: portfolios } = useUserPortfolios();
    const stats = {
        total: portfolios?.length || 0,
        publicos: portfolios?.filter(p => p.visibilidade === 'publico').length || 0,
        privados: portfolios?.filter(p => p.visibilidade === 'privado').length || 0,
        professores: portfolios?.filter(p => p.visibilidade === 'professores').length || 0
    };
    return {
        data: stats,
        isLoading: !portfolios
    };
};
