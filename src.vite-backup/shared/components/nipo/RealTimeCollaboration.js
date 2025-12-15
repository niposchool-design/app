import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🔴 REAL-TIME COLLABORATION - Sistema de colaboração em tempo real
 *
 * Componente para colaboração musical em tempo real
 * com design japonês e funcionalidades ao vivo
 */
import { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, Music, Radio, Send } from 'lucide-react';
import { NipoCard, NipoCardBody } from '../shared/NipoCard';
import { NipoButton } from '../shared/NipoButton';
import { Input } from '../ui/Input';
export const RealTimeCollaboration = ({ sessionId, userRole, className = '' }) => {
    const [participants, setParticipants] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [musicSync, setMusicSync] = useState({
        currentMeasure: 0,
        tempo: 120,
        isPlaying: false,
        currentPiece: 'Sakura Sakura - Arranjo Ensemble'
    });
    const [isConnected, setIsConnected] = useState(false);
    const [userSettings, setUserSettings] = useState({
        isMuted: false,
        hasVideo: false,
        isHandRaised: false
    });
    // Mock data e simulação de real-time
    useEffect(() => {
        // Simula participantes conectados
        const mockParticipants = [
            {
                id: '1',
                name: 'Tanaka Sensei',
                role: 'professor',
                isOnline: true,
                instrument: 'Koto',
                isMuted: false,
                hasVideo: true
            },
            {
                id: '2',
                name: 'Yuki Sato',
                role: 'aluno',
                isOnline: true,
                instrument: 'Shamisen',
                isMuted: true,
                hasVideo: false
            },
            {
                id: '3',
                name: 'Hiroshi Nakamura',
                role: 'aluno',
                isOnline: true,
                instrument: 'Taiko',
                isMuted: false,
                hasVideo: true
            }
        ];
        setParticipants(mockParticipants);
        setIsConnected(true);
        // Simula mensagens iniciais
        const initialMessages = [
            {
                id: '1',
                userId: 'system',
                userName: 'Sistema',
                message: 'Sessão de ensaio iniciada',
                timestamp: new Date(),
                type: 'system'
            },
            {
                id: '2',
                userId: '1',
                userName: 'Tanaka Sensei',
                message: 'こんにちは！今日は「桜」を練習しましょう',
                timestamp: new Date(),
                type: 'text'
            }
        ];
        setChatMessages(initialMessages);
    }, [sessionId]);
    // Simula sincronização musical
    useEffect(() => {
        if (musicSync.isPlaying) {
            const interval = setInterval(() => {
                setMusicSync(prev => ({
                    ...prev,
                    currentMeasure: prev.currentMeasure + 1
                }));
            }, (60 / musicSync.tempo) * 1000); // Baseado no tempo
            return () => clearInterval(interval);
        }
    }, [musicSync.isPlaying, musicSync.tempo]);
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: Date.now().toString(),
                userId: 'current-user',
                userName: 'Você',
                message: newMessage,
                timestamp: new Date(),
                type: 'text'
            };
            setChatMessages(prev => [...prev, message]);
            setNewMessage('');
        }
    };
    const handleToggleMusic = () => {
        setMusicSync(prev => ({
            ...prev,
            isPlaying: !prev.isPlaying,
            currentMeasure: prev.isPlaying ? 0 : prev.currentMeasure
        }));
    };
    const handleToggleMute = () => {
        setUserSettings(prev => ({
            ...prev,
            isMuted: !prev.isMuted
        }));
    };
    const handleToggleVideo = () => {
        setUserSettings(prev => ({
            ...prev,
            hasVideo: !prev.hasVideo
        }));
    };
    const sendEmoji = (emoji) => {
        const message = {
            id: Date.now().toString(),
            userId: 'current-user',
            userName: 'Você',
            message: emoji,
            timestamp: new Date(),
            type: 'emoji'
        };
        setChatMessages(prev => [...prev, message]);
    };
    return (_jsxs("div", { className: `space-y-6 ${className}`, children: [_jsxs("div", { className: `p-3 rounded-xl flex items-center gap-3 ${isConnected
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'}`, children: [_jsx("div", { className: `w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-zen-breath' : 'bg-red-500'}` }), _jsx("span", { className: "font-medium", children: isConnected ? 'リアルタイム接続中 (Conectado em tempo real)' : 'Desconectado' })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-1 space-y-4", children: [_jsx(NipoCard, { title: "\u53C2\u52A0\u8005 Participantes", children: _jsx(NipoCardBody, { children: _jsx("div", { className: "space-y-3", children: participants.map((participant) => (_jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-gray-50", children: [_jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center ${participant.role === 'professor' ? 'bg-matcha-100 text-matcha-700' : 'bg-sakura-100 text-sakura-700'}`, children: participant.role === 'professor' ? '先' : '生' }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium text-gray-900", children: participant.name }), _jsx("p", { className: "text-sm text-gray-600", children: participant.instrument })] }), _jsxs("div", { className: "flex items-center gap-1", children: [participant.hasVideo ? (_jsx(Video, { className: "w-4 h-4 text-green-600" })) : (_jsx(VideoOff, { className: "w-4 h-4 text-gray-400" })), participant.isMuted ? (_jsx(MicOff, { className: "w-4 h-4 text-red-500" })) : (_jsx(Mic, { className: "w-4 h-4 text-green-600" }))] })] }, participant.id))) }) }) }), _jsx(NipoCard, { title: "\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB Controles", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsx(NipoButton, { variant: userSettings.isMuted ? "danger" : "outline", onClick: handleToggleMute, leftIcon: userSettings.isMuted ? _jsx(MicOff, { className: "w-4 h-4" }) : _jsx(Mic, { className: "w-4 h-4" }), fullWidth: true, children: userSettings.isMuted ? 'Mudo' : 'Ativo' }), _jsx(NipoButton, { variant: userSettings.hasVideo ? "primary" : "outline", onClick: handleToggleVideo, leftIcon: userSettings.hasVideo ? _jsx(Video, { className: "w-4 h-4" }) : _jsx(VideoOff, { className: "w-4 h-4" }), fullWidth: true, children: "V\u00EDdeo" })] }), userRole === 'professor' && (_jsxs(NipoButton, { variant: musicSync.isPlaying ? "danger" : "primary", onClick: handleToggleMusic, leftIcon: _jsx(Music, { className: "w-4 h-4" }), fullWidth: true, children: [musicSync.isPlaying ? 'Parar' : 'Iniciar', " Sincroniza\u00E7\u00E3o"] }))] }) }) })] }), _jsxs("div", { className: "lg:col-span-2 space-y-4", children: [musicSync.isPlaying && (_jsx(NipoCard, { title: "\uD83C\uDFB5 Sincroniza\u00E7\u00E3o Musical", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: musicSync.currentPiece }), _jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-2xl font-light text-sakura-600", children: musicSync.currentMeasure }), _jsx("p", { className: "text-sm text-gray-600", children: "Compasso" })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-2xl font-light text-matcha-600", children: musicSync.tempo }), _jsx("p", { className: "text-sm text-gray-600", children: "BPM" })] })] })] }), _jsx("div", { className: "bg-gradient-to-r from-sakura-100 to-matcha-100 p-4 rounded-xl", children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx(Radio, { className: "w-5 h-5 text-gray-600 animate-zen-breath" }), _jsx("span", { className: "text-gray-700", children: "Todos sincronizados" })] }) })] }) }) })), _jsx(NipoCard, { title: "\uD83D\uDCAC Chat da Sess\u00E3o", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-64 overflow-y-auto space-y-3 p-2", children: chatMessages.map((message) => (_jsx("div", { className: `flex ${message.userId === 'current-user' ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `max-w-xs p-3 rounded-xl ${message.type === 'system'
                                                            ? 'bg-gray-100 text-gray-600 text-center text-sm'
                                                            : message.userId === 'current-user'
                                                                ? 'bg-sakura-500 text-white'
                                                                : 'bg-gray-100 text-gray-900'}`, children: [message.type !== 'system' && (_jsx("p", { className: "text-xs opacity-70 mb-1", children: message.userName })), _jsx("p", { className: message.type === 'emoji' ? 'text-2xl text-center' : '', children: message.message })] }) }, message.id))) }), _jsx("div", { className: "flex gap-2 justify-center", children: ['👏', '🎵', '💯', '😊', '🙋‍♂️', '❤️'].map((emoji) => (_jsx("button", { onClick: () => sendEmoji(emoji), className: "text-2xl hover:scale-110 transition-transform", children: emoji }, emoji))) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { value: newMessage, onChange: (e) => setNewMessage(e.target.value), placeholder: "Digite sua mensagem...", onKeyPress: (e) => e.key === 'Enter' && handleSendMessage(), className: "flex-1" }), _jsx(NipoButton, { onClick: handleSendMessage, variant: "primary", leftIcon: _jsx(Send, { className: "w-4 h-4" }), children: "Enviar" })] })] }) }) })] })] })] }));
};
