/**
 * 🎵 HOOKS REACT QUERY PARA INSTRUMENTOS
 *
 * Hooks para gerenciar estado e cache de dados de instrumentos
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategorias, getInstrumentos, getInstrumentosPorCategoria, getInstrumentosPorNivel, getInstrumentoPorId, buscarInstrumentos, getProgressoInstrumento, getInstrumentosDoAluno, getInstrumentoPrincipal, atualizarProgressoInstrumento, getEstatisticasBiblioteca } from '@/lib/supabase/queries/instrumentos';
// ============================================
// CATEGORIAS
// ============================================
export function useCategorias() {
    return useQuery({
        queryKey: ['categorias-instrumentos'],
        queryFn: getCategorias,
        staleTime: 1000 * 60 * 30, // 30 minutos
        gcTime: 1000 * 60 * 60 // 1 hora
    });
}
// ============================================
// BIBLIOTECA DE INSTRUMENTOS
// ============================================
export function useInstrumentos() {
    return useQuery({
        queryKey: ['instrumentos'],
        queryFn: getInstrumentos,
        staleTime: 1000 * 60 * 10, // 10 minutos
        gcTime: 1000 * 60 * 30 // 30 minutos
    });
}
export function useInstrumentosPorCategoria(categoria) {
    return useQuery({
        queryKey: ['instrumentos', 'categoria', categoria],
        queryFn: () => getInstrumentosPorCategoria(categoria),
        enabled: !!categoria,
        staleTime: 1000 * 60 * 10
    });
}
export function useInstrumentosPorNivel(nivel) {
    return useQuery({
        queryKey: ['instrumentos', 'nivel', nivel],
        queryFn: () => getInstrumentosPorNivel(nivel),
        enabled: !!nivel,
        staleTime: 1000 * 60 * 10
    });
}
export function useInstrumento(id) {
    return useQuery({
        queryKey: ['instrumento', id],
        queryFn: () => getInstrumentoPorId(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 15
    });
}
export function useBuscarInstrumentos(termo) {
    return useQuery({
        queryKey: ['instrumentos', 'busca', termo],
        queryFn: () => buscarInstrumentos(termo),
        enabled: termo.length >= 2,
        staleTime: 1000 * 60 * 5
    });
}
// ============================================
// PROGRESSO DO ALUNO
// ============================================
export function useProgressoInstrumento(alunoId, instrumentoId) {
    return useQuery({
        queryKey: ['progresso-instrumento', alunoId, instrumentoId],
        queryFn: () => getProgressoInstrumento(alunoId, instrumentoId),
        enabled: !!alunoId && !!instrumentoId,
        staleTime: 1000 * 60 * 5
    });
}
export function useInstrumentosDoAluno(alunoId) {
    return useQuery({
        queryKey: ['instrumentos-aluno', alunoId],
        queryFn: () => getInstrumentosDoAluno(alunoId),
        enabled: !!alunoId,
        staleTime: 1000 * 60 * 5
    });
}
export function useInstrumentoPrincipal(alunoId) {
    return useQuery({
        queryKey: ['instrumento-principal', alunoId],
        queryFn: () => getInstrumentoPrincipal(alunoId),
        enabled: !!alunoId,
        staleTime: 1000 * 60 * 10
    });
}
export function useAtualizarProgressoInstrumento() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ alunoId, instrumentoId, dados }) => atualizarProgressoInstrumento(alunoId, instrumentoId, dados),
        onSuccess: (_, variables) => {
            // Invalida queries relacionadas
            queryClient.invalidateQueries({
                queryKey: ['progresso-instrumento', variables.alunoId, variables.instrumentoId]
            });
            queryClient.invalidateQueries({
                queryKey: ['instrumentos-aluno', variables.alunoId]
            });
            queryClient.invalidateQueries({
                queryKey: ['instrumento-principal', variables.alunoId]
            });
        }
    });
}
// ============================================
// ESTATÍSTICAS
// ============================================
export function useEstatisticasBiblioteca() {
    return useQuery({
        queryKey: ['estatisticas-biblioteca'],
        queryFn: getEstatisticasBiblioteca,
        staleTime: 1000 * 60 * 15
    });
}
