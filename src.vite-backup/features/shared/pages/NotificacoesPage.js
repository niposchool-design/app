import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 🔔 NOTIFICAÇÕES PAGE - NIPO SCHOOL EVOLUTION
 *
 * Central de notificações com design japonês
 * Features: Conquistas, Aulas, Mensagens, Sistema
 */
import { useState } from 'react';
import { Bell, Trophy, Calendar, MessageSquare, Settings, Check, X, Star, Music, Clock } from 'lucide-react';
import { NipoCard, NipoCardBody } from '../../../components/shared/NipoCard';
import { NipoButton } from '../../../components/shared/NipoButton';
export function NotificacoesPage() {
    const [filter, setFilter] = useState('all');
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            type: 'conquista',
            title: 'Nova Conquista Desbloqueada! 🏆',
            message: 'Parabéns! Você completou "Primeira Música no Piano"',
            time: '2 min atrás',
            read: false,
            icon: _jsx(Trophy, { className: "w-5 h-5" }),
            color: 'from-yellow-400 to-orange-500'
        },
        {
            id: '2',
            type: 'aula',
            title: 'Aula Agendada 🎵',
            message: 'Aula de Piano com Sensei Takeshi em 1 hora',
            time: '15 min atrás',
            read: false,
            icon: _jsx(Calendar, { className: "w-5 h-5" }),
            color: 'from-blue-400 to-purple-500'
        },
        {
            id: '3',
            type: 'mensagem',
            title: 'Mensagem do Professor 💬',
            message: 'Ótimo progresso na técnica de respiração!',
            time: '1 hora atrás',
            read: true,
            icon: _jsx(MessageSquare, { className: "w-5 h-5" }),
            color: 'from-green-400 to-teal-500'
        },
        {
            id: '4',
            type: 'sistema',
            title: 'Atualização do Sistema ⚙️',
            message: 'Nova funcionalidade: Gravador de práticas disponível',
            time: '2 horas atrás',
            read: true,
            icon: _jsx(Settings, { className: "w-5 h-5" }),
            color: 'from-gray-400 to-gray-600'
        },
        {
            id: '5',
            type: 'conquista',
            title: 'Sequência de 7 Dias! 🔥',
            message: 'Você manteve uma sequência de prática por 7 dias consecutivos',
            time: '1 dia atrás',
            read: true,
            icon: _jsx(Star, { className: "w-5 h-5" }),
            color: 'from-red-400 to-pink-500'
        }
    ]);
    const filteredNotifications = filter === 'all'
        ? notifications
        : notifications.filter(n => n.type === filter);
    const unreadCount = notifications.filter(n => !n.read).length;
    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };
    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };
    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };
    const filterOptions = [
        { key: 'all', label: 'Todas', icon: _jsx(Bell, { className: "w-4 h-4" }), count: notifications.length },
        { key: 'conquista', label: 'Conquistas', icon: _jsx(Trophy, { className: "w-4 h-4" }), count: notifications.filter(n => n.type === 'conquista').length },
        { key: 'aula', label: 'Aulas', icon: _jsx(Music, { className: "w-4 h-4" }), count: notifications.filter(n => n.type === 'aula').length },
        { key: 'mensagem', label: 'Mensagens', icon: _jsx(MessageSquare, { className: "w-4 h-4" }), count: notifications.filter(n => n.type === 'mensagem').length },
        { key: 'sistema', label: 'Sistema', icon: _jsx(Settings, { className: "w-4 h-4" }), count: notifications.filter(n => n.type === 'sistema').length }
    ];
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("h1", { className: "text-4xl font-bold text-gray-900 mb-2", children: ["\uD83D\uDD14 ", _jsx("span", { className: "bg-gradient-to-r from-cherry-600 to-sakura-600 bg-clip-text text-transparent", children: "Notifica\u00E7\u00F5es" })] }), _jsxs("p", { className: "text-gray-600", children: ["\u901A\u77E5 - Central de mensagens e atualiza\u00E7\u00F5es", unreadCount > 0 && (_jsxs("span", { className: "ml-2 px-2 py-1 bg-red-500 text-white text-sm rounded-full", children: [unreadCount, " novas"] }))] })] }), _jsx(NipoCard, { title: "\uD83D\uDD0D Filtros", children: _jsxs(NipoCardBody, { children: [_jsx("div", { className: "flex flex-wrap gap-3", children: filterOptions.map((option) => (_jsxs("button", { onClick: () => setFilter(option.key), className: `flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${filter === option.key
                                        ? 'border-cherry-500 bg-cherry-50 text-cherry-700'
                                        : 'border-gray-200 hover:border-gray-300 text-gray-600'}`, children: [option.icon, _jsx("span", { className: "font-medium", children: option.label }), _jsx("span", { className: "bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs", children: option.count })] }, option.key))) }), unreadCount > 0 && (_jsx("div", { className: "mt-4 pt-4 border-t border-gray-200", children: _jsxs(NipoButton, { variant: "outline", onClick: markAllAsRead, className: "text-sm", children: [_jsx(Check, { className: "w-4 h-4 mr-2" }), "Marcar todas como lidas"] }) }))] }) }), _jsxs("div", { className: "space-y-4", children: [filteredNotifications.map((notification) => (_jsx(NipoCard, { className: `transition-all duration-300 ${!notification.read
                                ? 'ring-2 ring-cherry-200 shadow-lg'
                                : 'opacity-75 hover:opacity-100'}`, children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: `p-3 rounded-full bg-gradient-to-r ${notification.color} text-white shrink-0`, children: notification.icon }), _jsx("div", { className: "flex-1 min-w-0", children: _jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: `font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`, children: notification.title }), _jsx("p", { className: "text-gray-600 mt-1", children: notification.message }), _jsxs("div", { className: "flex items-center gap-2 mt-2 text-sm text-gray-500", children: [_jsx(Clock, { className: "w-3 h-3" }), notification.time, !notification.read && (_jsx("span", { className: "w-2 h-2 bg-cherry-500 rounded-full" }))] })] }), _jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [!notification.read && (_jsx("button", { onClick: () => markAsRead(notification.id), className: "p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors", title: "Marcar como lida", children: _jsx(Check, { className: "w-4 h-4" }) })), _jsx("button", { onClick: () => deleteNotification(notification.id), className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors", title: "Excluir notifica\u00E7\u00E3o", children: _jsx(X, { className: "w-4 h-4" }) })] })] }) })] }) }) }, notification.id))), filteredNotifications.length === 0 && (_jsx(NipoCard, { children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "text-center py-12", children: [_jsx(Bell, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Nenhuma notifica\u00E7\u00E3o" }), _jsx("p", { className: "text-gray-600", children: filter === 'all'
                                                ? 'Você está em dia com todas as notificações!'
                                                : `Nenhuma notificação do tipo "${filterOptions.find(f => f.key === filter)?.label}"` })] }) }) }))] }), _jsx("div", { className: "text-center p-6 bg-gradient-to-r from-cherry-100 to-sakura-100 rounded-2xl", children: _jsx("p", { className: "text-gray-700 italic", children: "\"\u6CE8\u610F (Ch\u016Bi) - A aten\u00E7\u00E3o plena nos mant\u00E9m conectados ao presente\"" }) })] }) }));
}
export default NotificacoesPage;
