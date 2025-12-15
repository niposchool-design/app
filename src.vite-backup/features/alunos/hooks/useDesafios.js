import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
export const useDesafios = (userId) => {
    const [desafios, setDesafios] = useState([]);
    const [submissoes, setSubmissoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Buscar desafios disponíveis
    const buscarDesafios = async (nivel) => {
        try {
            setLoading(true);
            let query = supabase
                .from('alpha_desafios')
                .select('*')
                .eq('ativo', true);
            if (nivel) {
                query = query.eq('nivel', nivel);
            }
            const { data, error } = await query.order('created_at', { ascending: false });
            if (error)
                throw error;
            setDesafios(data || []);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar desafios');
        }
        finally {
            setLoading(false);
        }
    };
    // Buscar submissões do usuário
    const buscarSubmissoes = async () => {
        if (!userId)
            return;
        try {
            const { data, error } = await supabase
                .from('desafio_submissions')
                .select(`
          *,
          alpha_desafios!inner (
            titulo,
            tipo,
            pontos
          )
        `)
                .eq('user_id', userId)
                .order('submitted_at', { ascending: false });
            if (error)
                throw error;
            setSubmissoes(data || []);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar submissões');
        }
    };
    // Submeter desafio
    const submeterDesafio = async (desafioId, submissionData) => {
        if (!userId)
            throw new Error('Usuário não autenticado');
        try {
            const { data, error } = await supabase
                .from('desafio_submissions')
                .insert([
                {
                    user_id: userId,
                    desafio_id: desafioId,
                    submission_data: submissionData,
                    status: 'pendente'
                }
            ])
                .select();
            if (error)
                throw error;
            // Atualizar submissões locais
            await buscarSubmissoes();
            return data[0];
        }
        catch (err) {
            throw new Error(err instanceof Error ? err.message : 'Erro ao submeter desafio');
        }
    };
    // Obter estatísticas dos desafios do usuário
    const obterEstatisticas = async () => {
        if (!userId) {
            return { submetidos: 0, avaliados: 0, aprovados: 0, pontosGanhos: 0 };
        }
        try {
            const submissoes = await supabase
                .from('desafio_submissions')
                .select(`
          *,
          alpha_desafios!inner (pontos)
        `)
                .eq('user_id', userId);
            if (submissoes.error)
                throw submissoes.error;
            const data = submissoes.data || [];
            return {
                submetidos: data.length,
                avaliados: data.filter(s => s.status === 'aprovado' || s.status === 'rejeitado').length,
                aprovados: data.filter(s => s.status === 'aprovado').length,
                pontosGanhos: data.reduce((total, s) => {
                    return total + (s.status === 'aprovado' ? s.alpha_desafios?.pontos || 0 : 0);
                }, 0)
            };
        }
        catch (err) {
            console.error('Erro ao obter estatísticas:', err);
            return { submetidos: 0, avaliados: 0, aprovados: 0, pontosGanhos: 0 };
        }
    };
    // Verificar se usuário já submeteu um desafio específico
    const verificarSubmissao = (desafioId) => {
        return submissoes.find(s => s.desafio_id === desafioId);
    };
    // Carregar dados iniciais
    useEffect(() => {
        buscarDesafios();
        if (userId) {
            buscarSubmissoes();
        }
    }, [userId]);
    return {
        desafios,
        submissoes,
        loading,
        error,
        buscarDesafios,
        buscarSubmissoes,
        submeterDesafio,
        obterEstatisticas,
        verificarSubmissao
    };
};
