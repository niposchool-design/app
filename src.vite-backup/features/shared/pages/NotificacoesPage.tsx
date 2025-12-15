/**
 * 🔔 NOTIFICAÇÕES PAGE - NIPO SCHOOL EVOLUTION
 * 
 * Central de notificações com design japonês
 * Features: Conquistas, Aulas, Mensagens, Sistema
 */

import React, { useState } from 'react'
import { 
  Bell, 
  Trophy, 
  Calendar, 
  MessageSquare, 
  Settings, 
  Check, 
  X,
  Star,
  Music,
  Users,
  Clock,
  Filter
} from 'lucide-react'
import { NipoCard, NipoCardBody } from '../../../components/shared/NipoCard'
import { NipoButton } from '../../../components/shared/NipoButton'

interface Notification {
  id: string
  type: 'conquista' | 'aula' | 'mensagem' | 'sistema'
  title: string
  message: string
  time: string
  read: boolean
  icon: React.ReactNode
  color: string
}

export function NotificacoesPage() {
  const [filter, setFilter] = useState<'all' | 'conquista' | 'aula' | 'mensagem' | 'sistema'>('all')
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'conquista',
      title: 'Nova Conquista Desbloqueada! 🏆',
      message: 'Parabéns! Você completou "Primeira Música no Piano"',
      time: '2 min atrás',
      read: false,
      icon: <Trophy className="w-5 h-5" />,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: '2',
      type: 'aula',
      title: 'Aula Agendada 🎵',
      message: 'Aula de Piano com Sensei Takeshi em 1 hora',
      time: '15 min atrás',
      read: false,
      icon: <Calendar className="w-5 h-5" />,
      color: 'from-blue-400 to-purple-500'
    },
    {
      id: '3',
      type: 'mensagem',
      title: 'Mensagem do Professor 💬',
      message: 'Ótimo progresso na técnica de respiração!',
      time: '1 hora atrás',
      read: true,
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'from-green-400 to-teal-500'
    },
    {
      id: '4',
      type: 'sistema',
      title: 'Atualização do Sistema ⚙️',
      message: 'Nova funcionalidade: Gravador de práticas disponível',
      time: '2 horas atrás',
      read: true,
      icon: <Settings className="w-5 h-5" />,
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: '5',
      type: 'conquista',
      title: 'Sequência de 7 Dias! 🔥',
      message: 'Você manteve uma sequência de prática por 7 dias consecutivos',
      time: '1 dia atrás',
      read: true,
      icon: <Star className="w-5 h-5" />,
      color: 'from-red-400 to-pink-500'
    }
  ])

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const filterOptions = [
    { key: 'all', label: 'Todas', icon: <Bell className="w-4 h-4" />, count: notifications.length },
    { key: 'conquista', label: 'Conquistas', icon: <Trophy className="w-4 h-4" />, count: notifications.filter(n => n.type === 'conquista').length },
    { key: 'aula', label: 'Aulas', icon: <Music className="w-4 h-4" />, count: notifications.filter(n => n.type === 'aula').length },
    { key: 'mensagem', label: 'Mensagens', icon: <MessageSquare className="w-4 h-4" />, count: notifications.filter(n => n.type === 'mensagem').length },
    { key: 'sistema', label: 'Sistema', icon: <Settings className="w-4 h-4" />, count: notifications.filter(n => n.type === 'sistema').length }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Japonês */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🔔 <span className="bg-gradient-to-r from-cherry-600 to-sakura-600 bg-clip-text text-transparent">
              Notificações
            </span>
          </h1>
          <p className="text-gray-600">
            通知 - Central de mensagens e atualizações
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-500 text-white text-sm rounded-full">
                {unreadCount} novas
              </span>
            )}
          </p>
        </div>

        {/* Filtros */}
        <NipoCard title="🔍 Filtros">
          <NipoCardBody>
            <div className="flex flex-wrap gap-3">
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setFilter(option.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    filter === option.key
                      ? 'border-cherry-500 bg-cherry-50 text-cherry-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {option.icon}
                  <span className="font-medium">{option.label}</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
            
            {unreadCount > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <NipoButton 
                  variant="outline" 
                  onClick={markAllAsRead}
                  className="text-sm"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Marcar todas como lidas
                </NipoButton>
              </div>
            )}
          </NipoCardBody>
        </NipoCard>

        {/* Lista de Notificações */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <NipoCard 
              key={notification.id}
              className={`transition-all duration-300 ${
                !notification.read 
                  ? 'ring-2 ring-cherry-200 shadow-lg' 
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              <NipoCardBody>
                <div className="flex items-start gap-4">
                  
                  {/* Ícone com Gradiente */}
                  <div className={`p-3 rounded-full bg-gradient-to-r ${notification.color} text-white shrink-0`}>
                    {notification.icon}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          {notification.time}
                          {!notification.read && (
                            <span className="w-2 h-2 bg-cherry-500 rounded-full"></span>
                          )}
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex items-center gap-2 shrink-0">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Marcar como lida"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir notificação"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </NipoCardBody>
            </NipoCard>
          ))}

          {filteredNotifications.length === 0 && (
            <NipoCard>
              <NipoCardBody>
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhuma notificação
                  </h3>
                  <p className="text-gray-600">
                    {filter === 'all' 
                      ? 'Você está em dia com todas as notificações!' 
                      : `Nenhuma notificação do tipo "${filterOptions.find(f => f.key === filter)?.label}"`
                    }
                  </p>
                </div>
              </NipoCardBody>
            </NipoCard>
          )}
        </div>

        {/* Filosofia Japonesa */}
        <div className="text-center p-6 bg-gradient-to-r from-cherry-100 to-sakura-100 rounded-2xl">
          <p className="text-gray-700 italic">
            "注意 (Chūi) - A atenção plena nos mantém conectados ao presente"
          </p>
        </div>

      </div>
    </div>
  )
}

export default NotificacoesPage