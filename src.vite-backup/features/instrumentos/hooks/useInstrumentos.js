/**
 * 🎵 HOOKS DE INSTRUMENTOS - NIPO SCHOOL
 *
 * Funcionalidades da biblioteca de instrumentos
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase/client';
import { CommonErrors } from '../../../lib/constants/errors';
export function useInstrumentos() {
    return useQuery({
        queryKey: ['instrumentos'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('instrumentos')
                .select(`
          *,
          categorias_instrumentos (
            nome,
            descricao
          )
        `)
                .eq('ativo', true)
                .order('nome');
            if (error)
                throw CommonErrors.SUPABASE_ERROR(error.message);
            return data || [];
        },
    });
}
export function useInstrumentosPorCategoria(categoria) {
    return useQuery({
        queryKey: ['instrumentos', 'categoria', categoria],
        queryFn: async () => {
            let query = supabase
                .from('instrumentos')
                .select(`
          *,
          categorias_instrumentos (
            nome,
            descricao
          )
        `)
                .eq('ativo', true);
            if (categoria) {
                query = query.eq('categoria', categoria);
            }
            const { data, error } = await query.order('nome');
            if (error)
                throw CommonErrors.SUPABASE_ERROR(error.message);
            return data || [];
        },
        enabled: !!categoria,
    });
}
export function useInstrumento(id) {
    return useQuery({
        queryKey: ['instrumento', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('instrumentos')
                .select(`
          *,
          categorias_instrumentos (
            nome,
            descricao
          ),
          instrumento_midias (
            id,
            tipo,
            url,
            titulo,
            descricao
          ),
          instrumento_tecnicas (
            id,
            nome,
            descricao,
            nivel_dificuldade
          )
        `)
                .eq('id', id)
                .single();
            if (error)
                throw CommonErrors.SUPABASE_ERROR(error.message);
            return data;
        },
        enabled: !!id,
    });
}
export function useMeusInstrumentos() {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['meus-instrumentos', user?.id],
        queryFn: async () => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            const { data, error } = await supabase
                .from('instrumentos_alunos')
                .select(`
          *,
          instrumentos (
            *,
            categorias_instrumentos (
              nome,
              descricao
            )
          )
        `)
                .eq('aluno_id', user.id)
                .order('updated_at', { ascending: false });
            if (error)
                throw CommonErrors.SUPABASE_ERROR(error.message);
            return data || [];
        },
        enabled: !!user?.id,
    });
}
export function useAdicionarMeuInstrumento() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (instrumentoId) => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            const { data, error } = await supabase
                .from('instrumentos_alunos')
                .insert({
                aluno_id: user.id,
                instrumento_id: instrumentoId,
                data_inicio: new Date().toISOString(),
                nivel_atual: 'iniciante',
                ativo: true
            })
                .select()
                .single();
            if (error)
                throw CommonErrors.SUPABASE_ERROR(error.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meus-instrumentos', user?.id] });
            queryClient.invalidateQueries({ queryKey: ['aluno-stats', user?.id] });
        },
    });
}
export function useAtualizarProgressoInstrumento() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ instrumentoId, progresso }) => {
            if (!user?.id)
                throw CommonErrors.AUTH_REQUIRED;
            const updateData = {
                ...progresso,
                ultima_pratica: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            const { data, error } = await supabase
                .from('instrumentos_alunos')
                .update(updateData)
                .eq('aluno_id', user.id)
                .eq('instrumento_id', instrumentoId)
                .select()
                .single();
            if (error)
                throw CommonErrors.SUPABASE_ERROR(error.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meus-instrumentos', user?.id] });
        },
    });
}
export function useCategorias() {
    return useQuery({
        queryKey: ['categorias-instrumentos'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('categorias_instrumentos')
                .select('*')
                .eq('ativo', true)
                .order('nome');
            if (error)
                throw CommonErrors.SUPABASE_ERROR(error.message);
            return data || [];
        },
    });
}
export function useInstrumentosStats() {
    const instrumentos = useInstrumentos();
    const meusInstrumentos = useMeusInstrumentos();
    const stats = {
        total: instrumentos.data?.length || 0,
        meusInstrumentos: meusInstrumentos.data?.length || 0,
        tempoTotalPratica: meusInstrumentos.data?.reduce((total, item) => total + (item.tempo_pratica_minutos || 0), 0) || 0,
        instrumentosFavoritos: meusInstrumentos.data?.filter(item => item.favorito).length || 0
    };
    return {
        data: stats,
        isLoading: instrumentos.isLoading || meusInstrumentos.isLoading,
        error: instrumentos.error || meusInstrumentos.error
    };
}
