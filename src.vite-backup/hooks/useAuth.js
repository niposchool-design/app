// src/hooks/useAuth.ts
// Hook de autenticação usando React Query e Supabase
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, getCurrentUser, getCurrentSession, signOut } from '../lib/supabase/client';
import { getProfileByEmail, createProfile, updateProfile } from '../lib/supabase/queries/profiles';
import { handleError, AppError, CommonErrors } from '../utils/error-handler';
/**
 * Hook para obter usuário atual
 */
export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['auth', 'user'],
        queryFn: getCurrentUser,
        staleTime: 5 * 60 * 1000, // 5 minutos
        retry: 1
    });
};
/**
 * Hook para obter sessão atual
 */
export const useCurrentSession = () => {
    return useQuery({
        queryKey: ['auth', 'session'],
        queryFn: getCurrentSession,
        staleTime: 5 * 60 * 1000,
        retry: 1
    });
};
/**
 * Hook para login
 */
export const useSignIn = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ email, password }) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error)
                throw error;
            if (!data.user)
                throw new AppError('Falha ao fazer login', 401);
            return data;
        },
        onSuccess: () => {
            // Invalidar queries de auth para recarregar dados
            queryClient.invalidateQueries({ queryKey: ['auth'] });
        },
        onError: (error) => {
            handleError(error);
        }
    });
};
/**
 * Hook para registro de novo usuário
 */
export const useSignUp = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ email, password, full_name, role }) => {
            // 1. Criar usuário no Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name,
                        role
                    }
                }
            });
            if (authError)
                throw authError;
            if (!authData.user)
                throw new AppError('Falha ao criar usuário', 400);
            // 2. Criar perfil no banco de dados
            const profile = await createProfile({
                id: authData.user.id,
                email,
                full_name: full_name,
                tipo_usuario: role,
                avatar_url: null
            });
            return { user: authData.user, profile };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] });
        },
        onError: (error) => {
            handleError(error);
        }
    });
};
/**
 * Hook para logout
 */
export const useSignOut = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            // Limpar todas as queries do cache
            queryClient.clear();
        },
        onError: (error) => {
            handleError(error);
        }
    });
};
/**
 * Hook para obter perfil do usuário logado
 */
export const useCurrentProfile = () => {
    const { data: user } = useCurrentUser();
    return useQuery({
        queryKey: ['profile', user?.id],
        queryFn: async () => {
            if (!user?.email)
                throw CommonErrors.AUTH_REQUIRED;
            return getProfileByEmail(user.email);
        },
        enabled: !!user?.email, // Só executa se houver usuário
        staleTime: 5 * 60 * 1000
    });
};
/**
 * Hook para atualizar perfil
 */
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { data: user } = useCurrentUser();
    return useMutation({
        mutationFn: async (updates) => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            return updateProfile(user.id, updates);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
        },
        onError: (error) => {
            handleError(error);
        }
    });
};
/**
 * Hook para verificar se usuário está autenticado
 */
export const useIsAuthenticated = () => {
    const { data: user, isLoading } = useCurrentUser();
    return {
        isAuthenticated: !!user,
        isLoading
    };
};
