// 🎵 HOOK DE AUDIO PLAYER - HISTÓRIA DA MÚSICA
// ============================================
// Hook para gerenciar reprodução de áudio das obras musicais
import { useState, useRef, useCallback, useEffect } from 'react';
export const useAudioPlayer = () => {
    // ========================================
    // 📦 ESTADOS E REFS
    // ========================================
    const audioRef = useRef(null);
    const [status, setStatus] = useState({
        obraAtual: undefined,
        isPlaying: false,
        posicao: 0,
        duracao: 0,
        volume: 0.7,
        playlist: [],
        indiceAtual: 0,
        modoRepeticao: 'none',
        aleatorio: false
    });
    // ========================================
    // 🎵 CONTROLES BÁSICOS
    // ========================================
    const play = useCallback((obra) => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
            // Event listeners
            audioRef.current.addEventListener('loadedmetadata', () => {
                setStatus(prev => ({
                    ...prev,
                    duracao: audioRef.current?.duration || 0
                }));
            });
            audioRef.current.addEventListener('timeupdate', () => {
                setStatus(prev => ({
                    ...prev,
                    posicao: audioRef.current?.currentTime || 0
                }));
            });
            audioRef.current.addEventListener('ended', () => {
                handleFimMusica();
            });
            audioRef.current.addEventListener('error', (e) => {
                console.error('Erro no áudio:', e);
                setStatus(prev => ({ ...prev, isPlaying: false }));
            });
        }
        if (obra) {
            // Nova obra selecionada
            if (!obra.audio_url) {
                console.warn('Obra sem URL de áudio:', obra.titulo);
                return;
            }
            audioRef.current.src = obra.audio_url;
            audioRef.current.volume = status.volume;
            setStatus(prev => ({
                ...prev,
                obraAtual: obra,
                posicao: 0
            }));
        }
        // Reproduzir
        audioRef.current?.play()
            .then(() => {
            setStatus(prev => ({ ...prev, isPlaying: true }));
        })
            .catch(error => {
            console.error('Erro ao reproduzir áudio:', error);
            setStatus(prev => ({ ...prev, isPlaying: false }));
        });
    }, [status.volume]);
    const pause = useCallback(() => {
        audioRef.current?.pause();
        setStatus(prev => ({ ...prev, isPlaying: false }));
    }, []);
    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setStatus(prev => ({
            ...prev,
            isPlaying: false,
            posicao: 0
        }));
    }, []);
    // ========================================
    // ⏭️ NAVEGAÇÃO NA PLAYLIST
    // ========================================
    const proximaObra = useCallback(() => {
        const { playlist, indiceAtual, aleatorio } = status;
        if (playlist.length === 0)
            return;
        let proximoIndice;
        if (aleatorio) {
            // Modo aleatório
            do {
                proximoIndice = Math.floor(Math.random() * playlist.length);
            } while (proximoIndice === indiceAtual && playlist.length > 1);
        }
        else {
            // Sequencial
            proximoIndice = indiceAtual + 1;
            if (proximoIndice >= playlist.length) {
                proximoIndice = 0; // Volta ao início
            }
        }
        const proximaObra = playlist[proximoIndice];
        if (proximaObra) {
            setStatus(prev => ({ ...prev, indiceAtual: proximoIndice }));
            play(proximaObra);
        }
    }, [status, play]);
    const anteriorObra = useCallback(() => {
        const { playlist, indiceAtual, aleatorio } = status;
        if (playlist.length === 0)
            return;
        let anteriorIndice;
        if (aleatorio) {
            // Em modo aleatório, simplesmente escolhe uma aleatória
            do {
                anteriorIndice = Math.floor(Math.random() * playlist.length);
            } while (anteriorIndice === indiceAtual && playlist.length > 1);
        }
        else {
            // Sequencial
            anteriorIndice = indiceAtual - 1;
            if (anteriorIndice < 0) {
                anteriorIndice = playlist.length - 1; // Vai para a última
            }
        }
        const obraAnterior = playlist[anteriorIndice];
        if (obraAnterior) {
            setStatus(prev => ({ ...prev, indiceAtual: anteriorIndice }));
            play(obraAnterior);
        }
    }, [status, play]);
    const handleFimMusica = useCallback(() => {
        const { modoRepeticao } = status;
        switch (modoRepeticao) {
            case 'single':
                // Repetir a mesma música
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                }
                break;
            case 'playlist':
                // Próxima música ou reiniciar playlist
                proximaObra();
                break;
            default:
                // Parar reprodução
                setStatus(prev => ({ ...prev, isPlaying: false }));
                break;
        }
    }, [status.modoRepeticao, proximaObra]);
    // ========================================
    // ⚙️ CONFIGURAÇÕES
    // ========================================
    const definirVolume = useCallback((volume) => {
        const novoVolume = Math.max(0, Math.min(1, volume));
        if (audioRef.current) {
            audioRef.current.volume = novoVolume;
        }
        setStatus(prev => ({ ...prev, volume: novoVolume }));
    }, []);
    const definirPosicao = useCallback((posicao) => {
        if (audioRef.current && audioRef.current.duration) {
            const novaPosicao = Math.max(0, Math.min(audioRef.current.duration, posicao));
            audioRef.current.currentTime = novaPosicao;
            setStatus(prev => ({ ...prev, posicao: novaPosicao }));
        }
    }, []);
    const alternarModoAleatorio = useCallback(() => {
        setStatus(prev => ({ ...prev, aleatorio: !prev.aleatorio }));
    }, []);
    const alternarModoRepeticao = useCallback(() => {
        setStatus(prev => {
            const modos = ['none', 'single', 'playlist'];
            const indiceAtual = modos.indexOf(prev.modoRepeticao);
            const proximoIndice = (indiceAtual + 1) % modos.length;
            return { ...prev, modoRepeticao: modos[proximoIndice] };
        });
    }, []);
    // ========================================
    // 📝 GERENCIAMENTO DE PLAYLIST
    // ========================================
    const adicionarPlaylist = useCallback((obras) => {
        const obrasComAudio = obras.filter(obra => obra.audio_url);
        setStatus(prev => ({
            ...prev,
            playlist: obrasComAudio,
            indiceAtual: 0
        }));
        // Se não há música tocando, inicia a primeira
        if (!status.isPlaying && obrasComAudio.length > 0) {
            play(obrasComAudio[0]);
        }
    }, [status.isPlaying, play]);
    const removerDaPlaylist = useCallback((indice) => {
        setStatus(prev => {
            const novaPlaylist = prev.playlist.filter((_, i) => i !== indice);
            let novoIndice = prev.indiceAtual;
            // Ajustar índice atual se necessário
            if (indice < prev.indiceAtual) {
                novoIndice = prev.indiceAtual - 1;
            }
            else if (indice === prev.indiceAtual) {
                // Se removeu a música atual, parar reprodução
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
                novoIndice = 0;
                return {
                    ...prev,
                    playlist: novaPlaylist,
                    indiceAtual: novoIndice,
                    isPlaying: false,
                    obraAtual: novaPlaylist[0] || undefined
                };
            }
            return {
                ...prev,
                playlist: novaPlaylist,
                indiceAtual: Math.max(0, Math.min(novoIndice, novaPlaylist.length - 1))
            };
        });
    }, []);
    const limparPlaylist = useCallback(() => {
        stop();
        setStatus(prev => ({
            ...prev,
            playlist: [],
            indiceAtual: 0,
            obraAtual: undefined
        }));
    }, [stop]);
    // ========================================
    // 🧹 CLEANUP
    // ========================================
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('loadedmetadata', () => { });
                audioRef.current.removeEventListener('timeupdate', () => { });
                audioRef.current.removeEventListener('ended', () => { });
                audioRef.current.removeEventListener('error', () => { });
            }
        };
    }, []);
    // ========================================
    // 📤 RETORNO DO HOOK
    // ========================================
    return {
        // Estado
        status,
        // Controles básicos
        play,
        pause,
        stop,
        anterior: anteriorObra,
        proximo: proximaObra,
        // Configurações
        definirVolume,
        definirPosicao,
        alternarModoAleatorio,
        alternarModoRepeticao,
        // Playlist
        adicionarPlaylist,
        removerDaPlaylist,
        limparPlaylist
    };
};
