/**
 * 🔴 REAL-TIME COLLABORATION - Sistema de colaboração em tempo real
 * 
 * Componente para colaboração musical em tempo real
 * com design japonês e funcionalidades ao vivo
 */

import React, { useState, useEffect } from 'react'
import { 
  Users, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  MessageCircle, 
  Heart,
  Music,
  Headphones,
  Radio,
  Send
} from 'lucide-react'
import { NipoCard, NipoCardBody } from '../shared/NipoCard'
import { NipoButton } from '../shared/NipoButton'
import { Input } from '../ui/Input'

interface RealTimeCollaborationProps {
  sessionId: string
  userRole: 'professor' | 'aluno'
  className?: string
}

interface Participant {
  id: string
  name: string
  role: 'professor' | 'aluno'
  isOnline: boolean
  instrument?: string
  avatar?: string
  isMuted: boolean
  hasVideo: boolean
}

interface ChatMessage {
  id: string
  userId: string
  userName: string
  message: string
  timestamp: Date
  type: 'text' | 'emoji' | 'system'
}

interface MusicSync {
  currentMeasure: number
  tempo: number
  isPlaying: boolean
  currentPiece: string
}

export const RealTimeCollaboration: React.FC<RealTimeCollaborationProps> = ({
  sessionId,
  userRole,
  className = ''
}) => {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [musicSync, setMusicSync] = useState<MusicSync>({
    currentMeasure: 0,
    tempo: 120,
    isPlaying: false,
    currentPiece: 'Sakura Sakura - Arranjo Ensemble'
  })
  const [isConnected, setIsConnected] = useState(false)
  const [userSettings, setUserSettings] = useState({
    isMuted: false,
    hasVideo: false,
    isHandRaised: false
  })

  // Mock data e simulação de real-time
  useEffect(() => {
    // Simula participantes conectados
    const mockParticipants: Participant[] = [
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
    ]
    
    setParticipants(mockParticipants)
    setIsConnected(true)

    // Simula mensagens iniciais
    const initialMessages: ChatMessage[] = [
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
    ]
    
    setChatMessages(initialMessages)
  }, [sessionId])

  // Simula sincronização musical
  useEffect(() => {
    if (musicSync.isPlaying) {
      const interval = setInterval(() => {
        setMusicSync(prev => ({
          ...prev,
          currentMeasure: prev.currentMeasure + 1
        }))
      }, (60 / musicSync.tempo) * 1000) // Baseado no tempo

      return () => clearInterval(interval)
    }
  }, [musicSync.isPlaying, musicSync.tempo])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        userId: 'current-user',
        userName: 'Você',
        message: newMessage,
        timestamp: new Date(),
        type: 'text'
      }
      
      setChatMessages(prev => [...prev, message])
      setNewMessage('')
    }
  }

  const handleToggleMusic = () => {
    setMusicSync(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
      currentMeasure: prev.isPlaying ? 0 : prev.currentMeasure
    }))
  }

  const handleToggleMute = () => {
    setUserSettings(prev => ({
      ...prev,
      isMuted: !prev.isMuted
    }))
  }

  const handleToggleVideo = () => {
    setUserSettings(prev => ({
      ...prev,
      hasVideo: !prev.hasVideo
    }))
  }

  const sendEmoji = (emoji: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'Você',
      message: emoji,
      timestamp: new Date(),
      type: 'emoji'
    }
    
    setChatMessages(prev => [...prev, message])
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Status de Conexão */}
      <div className={`p-3 rounded-xl flex items-center gap-3 ${
        isConnected 
          ? 'bg-green-50 text-green-700 border border-green-200' 
          : 'bg-red-50 text-red-700 border border-red-200'
      }`}>
        <div className={`w-3 h-3 rounded-full ${
          isConnected ? 'bg-green-500 animate-zen-breath' : 'bg-red-500'
        }`}></div>
        <span className="font-medium">
          {isConnected ? 'リアルタイム接続中 (Conectado em tempo real)' : 'Desconectado'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Participantes e Controles */}
        <div className="lg:col-span-1 space-y-4">
          <NipoCard title="参加者 Participantes">
            <NipoCardBody>
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      participant.role === 'professor' ? 'bg-matcha-100 text-matcha-700' : 'bg-sakura-100 text-sakura-700'
                    }`}>
                      {participant.role === 'professor' ? '先' : '生'}
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{participant.name}</p>
                      <p className="text-sm text-gray-600">{participant.instrument}</p>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {participant.hasVideo ? (
                        <Video className="w-4 h-4 text-green-600" />
                      ) : (
                        <VideoOff className="w-4 h-4 text-gray-400" />
                      )}
                      {participant.isMuted ? (
                        <MicOff className="w-4 h-4 text-red-500" />
                      ) : (
                        <Mic className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </NipoCardBody>
          </NipoCard>

          {/* Controles do Usuário */}
          <NipoCard title="コントロール Controles">
            <NipoCardBody>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <NipoButton
                    variant={userSettings.isMuted ? "danger" : "outline"}
                    onClick={handleToggleMute}
                    leftIcon={userSettings.isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    fullWidth
                  >
                    {userSettings.isMuted ? 'Mudo' : 'Ativo'}
                  </NipoButton>
                  
                  <NipoButton
                    variant={userSettings.hasVideo ? "primary" : "outline"}
                    onClick={handleToggleVideo}
                    leftIcon={userSettings.hasVideo ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    fullWidth
                  >
                    Vídeo
                  </NipoButton>
                </div>
                
                {userRole === 'professor' && (
                  <NipoButton
                    variant={musicSync.isPlaying ? "danger" : "primary"}
                    onClick={handleToggleMusic}
                    leftIcon={<Music className="w-4 h-4" />}
                    fullWidth
                  >
                    {musicSync.isPlaying ? 'Parar' : 'Iniciar'} Sincronização
                  </NipoButton>
                )}
              </div>
            </NipoCardBody>
          </NipoCard>
        </div>

        {/* Área Principal e Chat */}
        <div className="lg:col-span-2 space-y-4">
          {/* Sincronização Musical */}
          {musicSync.isPlaying && (
            <NipoCard title="🎵 Sincronização Musical">
              <NipoCardBody>
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {musicSync.currentPiece}
                    </h3>
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-light text-sakura-600">
                          {musicSync.currentMeasure}
                        </p>
                        <p className="text-sm text-gray-600">Compasso</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-light text-matcha-600">
                          {musicSync.tempo}
                        </p>
                        <p className="text-sm text-gray-600">BPM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-sakura-100 to-matcha-100 p-4 rounded-xl">
                    <div className="flex items-center justify-center gap-2">
                      <Radio className="w-5 h-5 text-gray-600 animate-zen-breath" />
                      <span className="text-gray-700">Todos sincronizados</span>
                    </div>
                  </div>
                </div>
              </NipoCardBody>
            </NipoCard>
          )}

          {/* Chat em Tempo Real */}
          <NipoCard title="💬 Chat da Sessão">
            <NipoCardBody>
              <div className="space-y-4">
                {/* Mensagens */}
                <div className="h-64 overflow-y-auto space-y-3 p-2">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${
                      message.userId === 'current-user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <div className={`max-w-xs p-3 rounded-xl ${
                        message.type === 'system' 
                          ? 'bg-gray-100 text-gray-600 text-center text-sm'
                          : message.userId === 'current-user'
                          ? 'bg-sakura-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {message.type !== 'system' && (
                          <p className="text-xs opacity-70 mb-1">{message.userName}</p>
                        )}
                        <p className={message.type === 'emoji' ? 'text-2xl text-center' : ''}>
                          {message.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Emojis */}
                <div className="flex gap-2 justify-center">
                  {['👏', '🎵', '💯', '😊', '🙋‍♂️', '❤️'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => sendEmoji(emoji)}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {/* Input de mensagem */}
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <NipoButton
                    onClick={handleSendMessage}
                    variant="primary"
                    leftIcon={<Send className="w-4 h-4" />}
                  >
                    Enviar
                  </NipoButton>
                </div>
              </div>
            </NipoCardBody>
          </NipoCard>
        </div>
      </div>
    </div>
  )
}