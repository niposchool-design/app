// 🎼 HOOK PRINCIPAL - HISTÓRIA DA MÚSICA
// ======================================
// Hook central para gerenciar estado e dados do módulo de História da Música
import { useState, useEffect, useCallback } from 'react';
import { HistoriaMusicaService } from '@/services';
export const useHistoriaMusica = () => {
    // ========================================
    // 📦 ESTADOS PRINCIPAIS
    // ========================================
    const [periodos, setPeriodos] = useState([]);
    const [compositores, setCompositores] = useState([]);
    const [obras, setObras] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [estatisticas, setEstatisticas] = useState(null);
    // Estados de controle
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [cache, setCache] = useState(new Map());
    // ========================================
    // 🔄 FUNÇÕES DE CARREGAMENTO
    // ========================================
    const carregarPeriodos = useCallback(async () => {
        const cacheKey = 'periodos';
        if (cache.has(cacheKey)) {
            setPeriodos(cache.get(cacheKey));
            return;
        }
        try {
            setCarregando(true);
            setErro(null);
            const dados = await HistoriaMusicaService.getAllPeriodos();
            setPeriodos(dados);
            // Atualizar cache
            setCache(prev => new Map(prev.set(cacheKey, dados)));
        }
        catch (error) {
            const mensagemErro = error instanceof Error ? error.message : 'Erro ao carregar períodos';
            setErro(mensagemErro);
            console.error('Erro no carregarPeriodos:', error);
        }
        finally {
            setCarregando(false);
        }
    }, [cache]);
    const carregarCompositores = useCallback(async (filtros) => {
        const cacheKey = `compositores_${JSON.stringify(filtros || {})}`;
        if (cache.has(cacheKey)) {
            setCompositores(cache.get(cacheKey));
            return;
        }
        try {
            setCarregando(true);
            setErro(null);
            const dados = await HistoriaMusicaService.getAllCompositores(filtros);
            setCompositores(dados);
            setCache(prev => new Map(prev.set(cacheKey, dados)));
        }
        catch (error) {
            const mensagemErro = error instanceof Error ? error.message : 'Erro ao carregar compositores';
            setErro(mensagemErro);
            console.error('Erro no carregarCompositores:', error);
        }
        finally {
            setCarregando(false);
        }
    }, [cache]);
    const carregarObras = useCallback(async (filtros) => {
        const cacheKey = `obras_${JSON.stringify(filtros || {})}`;
        if (cache.has(cacheKey)) {
            setObras(cache.get(cacheKey));
            return;
        }
        try {
            setCarregando(true);
            setErro(null);
            const dados = await HistoriaMusicaService.getAllObras(filtros);
            setObras(dados);
            setCache(prev => new Map(prev.set(cacheKey, dados)));
        }
        catch (error) {
            const mensagemErro = error instanceof Error ? error.message : 'Erro ao carregar obras';
            setErro(mensagemErro);
            console.error('Erro no carregarObras:', error);
        }
        finally {
            setCarregando(false);
        }
    }, [cache]);
    const carregarTimeline = useCallback(async (filtros) => {
        const cacheKey = `timeline_${JSON.stringify(filtros || {})}`;
        if (cache.has(cacheKey)) {
            setEventos(cache.get(cacheKey));
            return;
        }
        try {
            setCarregando(true);
            setErro(null);
            const dados = await HistoriaMusicaService.getEventosTimeline(filtros);
            setEventos(dados);
            setCache(prev => new Map(prev.set(cacheKey, dados)));
        }
        catch (error) {
            const mensagemErro = error instanceof Error ? error.message : 'Erro ao carregar timeline';
            setErro(mensagemErro);
            console.error('Erro no carregarTimeline:', error);
        }
        finally {
            setCarregando(false);
        }
    }, [cache]);
    const carregarEstatisticas = useCallback(async () => {
        const cacheKey = 'estatisticas';
        if (cache.has(cacheKey)) {
            setEstatisticas(cache.get(cacheKey));
            return;
        }
        try {
            setCarregando(true);
            setErro(null);
            const dados = await HistoriaMusicaService.getEstatisticasGerais();
            setEstatisticas(dados);
            setCache(prev => new Map(prev.set(cacheKey, dados)));
        }
        catch (error) {
            const mensagemErro = error instanceof Error ? error.message : 'Erro ao carregar estatísticas';
            setErro(mensagemErro);
            console.error('Erro no carregarEstatisticas:', error);
        }
        finally {
            setCarregando(false);
        }
    }, [cache]);
    // ========================================
    // 🔍 FUNÇÃO DE BUSCA
    // ========================================
    const buscarConteudo = useCallback(async (termo) => {
        const inicioTempo = performance.now();
        try {
            setCarregando(true);
            setErro(null);
            const resultado = await HistoriaMusicaService.buscarConteudo(termo);
            const tempoResposta = performance.now() - inicioTempo;
            const total = resultado.periodos.length +
                resultado.compositores.length +
                resultado.obras.length;
            return {
                ...resultado,
                total,
                tempoResposta
            };
        }
        catch (error) {
            const mensagemErro = error instanceof Error ? error.message : 'Erro na busca';
            setErro(mensagemErro);
            console.error('Erro no buscarConteudo:', error);
            return {
                periodos: [],
                compositores: [],
                obras: [],
                total: 0,
                tempoResposta: performance.now() - inicioTempo
            };
        }
        finally {
            setCarregando(false);
        }
    }, []);
    // ========================================
    // 🧹 FUNÇÕES DE LIMPEZA
    // ========================================
    const limparDados = useCallback(() => {
        setPeriodos([]);
        setCompositores([]);
        setObras([]);
        setEventos([]);
        setEstatisticas(null);
        setCache(new Map());
    }, []);
    const resetarErro = useCallback(() => {
        setErro(null);
    }, []);
    const limparCache = useCallback((chaves) => {
        if (!chaves) {
            setCache(new Map());
            return;
        }
        setCache(prev => {
            const novoCache = new Map(prev);
            chaves.forEach(chave => novoCache.delete(chave));
            return novoCache;
        });
    }, []);
    // ========================================
    // 🚀 EFEITOS DE INICIALIZAÇÃO
    // ========================================
    useEffect(() => {
        // Carregar dados essenciais na inicialização
        carregarPeriodos();
    }, [carregarPeriodos]);
    // ========================================
    // 📤 RETORNO DO HOOK
    // ========================================
    return {
        // Estado
        periodos,
        compositores,
        obras,
        eventos,
        estatisticas,
        // Status
        carregando,
        erro,
        cache: cache.size,
        // Ações de carregamento
        carregarPeriodos,
        carregarCompositores,
        carregarObras,
        carregarTimeline,
        carregarEstatisticas,
        buscarConteudo,
        // Limpeza
        limparDados,
        resetarErro,
        limparCache
    };
};
