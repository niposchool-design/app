import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ⚙️ CONFIGURAÇÕES PAGE - NIPO SCHOOL EVOLUTION
 *
 * Página de configurações com design japonês completo
 * Features: Perfil, Notificações, Preferências, Segurança
 */
import { useState } from 'react';
import { User, Shield, Palette, Globe, Moon, Sun, Save, Eye, EyeOff } from 'lucide-react';
import { NipoCard, NipoCardBody } from '../../../components/shared/NipoCard';
import { NipoButton } from '../../../components/shared/NipoButton';
import { NipoInput } from '../../../components/shared/NipoInput';
export function ConfiguracoesPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('pt-BR');
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        conquistas: true,
        aulas: true
    });
    const handleSave = () => {
        // Implementar salvamento
        console.log('Configurações salvas!');
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("h1", { className: "text-4xl font-bold text-gray-900 mb-2", children: ["\u2699\uFE0F ", _jsx("span", { className: "bg-gradient-to-r from-cherry-600 to-sakura-600 bg-clip-text text-transparent", children: "Configura\u00E7\u00F5es" })] }), _jsx("p", { className: "text-gray-600", children: "\u500B\u4EBA\u8A2D\u5B9A - Personalize sua experi\u00EAncia" })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsx(NipoCard, { title: "\uD83D\uDC64 Perfil do Usu\u00E1rio", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-4", children: [_jsx(NipoInput, { label: "Nome Completo", placeholder: "Digite seu nome", leftIcon: _jsx(User, { className: "w-4 h-4" }) }), _jsx(NipoInput, { label: "Email", type: "email", placeholder: "seu@email.com" }), _jsxs("div", { className: "relative", children: [_jsx(NipoInput, { label: "Nova Senha", type: showPassword ? "text" : "password", placeholder: "Digite nova senha", leftIcon: _jsx(Shield, { className: "w-4 h-4" }) }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-9 text-gray-400 hover:text-gray-600", children: showPassword ? _jsx(EyeOff, { className: "w-4 h-4" }) : _jsx(Eye, { className: "w-4 h-4" }) })] })] }) }) }), _jsx(NipoCard, { title: "\uD83C\uDFA8 Apar\u00EAncia", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [_jsx(Palette, { className: "w-4 h-4 inline mr-2" }), "Tema"] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("button", { onClick: () => setTheme('light'), className: `p-3 rounded-lg border-2 transition-all ${theme === 'light'
                                                                ? 'border-cherry-500 bg-cherry-50'
                                                                : 'border-gray-200 hover:border-gray-300'}`, children: [_jsx(Sun, { className: "w-5 h-5 mx-auto mb-1" }), _jsx("span", { className: "text-sm", children: "Claro" })] }), _jsxs("button", { onClick: () => setTheme('dark'), className: `p-3 rounded-lg border-2 transition-all ${theme === 'dark'
                                                                ? 'border-cherry-500 bg-cherry-50'
                                                                : 'border-gray-200 hover:border-gray-300'}`, children: [_jsx(Moon, { className: "w-5 h-5 mx-auto mb-1" }), _jsx("span", { className: "text-sm", children: "Escuro" })] })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [_jsx(Globe, { className: "w-4 h-4 inline mr-2" }), "Idioma"] }), _jsxs("select", { value: language, onChange: (e) => setLanguage(e.target.value), className: "w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cherry-500 focus:border-transparent", children: [_jsx("option", { value: "pt-BR", children: "\uD83C\uDDE7\uD83C\uDDF7 Portugu\u00EAs (Brasil)" }), _jsx("option", { value: "en-US", children: "\uD83C\uDDFA\uD83C\uDDF8 English (US)" }), _jsx("option", { value: "ja-JP", children: "\uD83C\uDDEF\uD83C\uDDF5 \u65E5\u672C\u8A9E (Japanese)" })] })] })] }) }) }), _jsx(NipoCard, { title: "\uD83D\uDD14 Notifica\u00E7\u00F5es", children: _jsx(NipoCardBody, { children: _jsx("div", { className: "space-y-4", children: [
                                        { key: 'email', label: 'Email', icon: '📧' },
                                        { key: 'push', label: 'Push Notifications', icon: '📱' },
                                        { key: 'conquistas', label: 'Conquistas', icon: '🏆' },
                                        { key: 'aulas', label: 'Lembretes de Aulas', icon: '🎵' }
                                    ].map(({ key, label, icon }) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-sm font-medium text-gray-700", children: [icon, " ", label] }), _jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: notifications[key], onChange: (e) => setNotifications(prev => ({
                                                            ...prev,
                                                            [key]: e.target.checked
                                                        })), className: "sr-only peer" }), _jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cherry-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cherry-600" })] })] }, key))) }) }) }), _jsx(NipoCard, { title: "\uD83D\uDD12 Seguran\u00E7a", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-green-50 border border-green-200 rounded-lg", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Shield, { className: "w-5 h-5 text-green-600 mr-2" }), _jsx("span", { className: "font-medium text-green-800", children: "Conta Segura" })] }), _jsx("p", { className: "text-sm text-green-700", children: "Sua conta est\u00E1 protegida e atualizada." })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(NipoButton, { variant: "outline", fullWidth: true, children: "\uD83D\uDCF2 Configurar 2FA" }), _jsx(NipoButton, { variant: "outline", fullWidth: true, children: "\uD83D\uDCDD Gerenciar Sess\u00F5es" }), _jsx(NipoButton, { variant: "outline", fullWidth: true, children: "\uD83D\uDCCA Ver Atividades" })] })] }) }) })] }), _jsx("div", { className: "text-center", children: _jsxs(NipoButton, { onClick: handleSave, size: "lg", className: "px-12", children: [_jsx(Save, { className: "w-5 h-5 mr-2" }), "Salvar Configura\u00E7\u00F5es"] }) }), _jsx("div", { className: "text-center p-6 bg-gradient-to-r from-cherry-100 to-sakura-100 rounded-2xl", children: _jsx("p", { className: "text-gray-700 italic", children: "\"\u6539\u5584 (Kaizen) - A melhoria cont\u00EDnua come\u00E7a com pequenos ajustes\"" }) })] }) }));
}
export default ConfiguracoesPage;
