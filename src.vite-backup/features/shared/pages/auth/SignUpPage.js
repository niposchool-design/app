import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * 📝 SIGNUP PAGE - Página de Cadastro
 *
 * Design com portal Torii japonês
 */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { ROUTES } from '../../../../lib/constants/routes';
import { useAuth } from '../../../../contexts/AuthContext';
export const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [userType, setUserType] = useState('aluno');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            setLoading(false);
            return;
        }
        try {
            const result = await signUp(email, password, fullName, userType);
            if (result.error) {
                setError(result.error);
                setLoading(false);
                return;
            }
            setSuccess(true);
            setTimeout(() => {
                navigate(ROUTES.LOGIN);
            }, 2000);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar conta');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "relative overflow-hidden min-h-screen", children: [_jsxs("div", { className: "fixed inset-0 z-0", children: [_jsx("img", { src: "/paisagem.png", alt: "Paisagem Japonesa", className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" })] }), _jsx("div", { className: "fixed inset-0 z-40 pointer-events-none flex items-center justify-center", children: _jsxs("svg", { width: "100%", height: "100%", viewBox: "0 0 1920 1080", preserveAspectRatio: "xMidYMid slice", className: "opacity-100", children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "torii-frame-gradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [_jsx("stop", { offset: "0%", style: { stopColor: '#dc2626', stopOpacity: 1 } }), _jsx("stop", { offset: "50%", style: { stopColor: '#b91c1c', stopOpacity: 0.95 } }), _jsx("stop", { offset: "100%", style: { stopColor: '#991b1b', stopOpacity: 0.9 } })] }), _jsxs("linearGradient", { id: "torii-wood-texture", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [_jsx("stop", { offset: "0%", style: { stopColor: '#7c2d12', stopOpacity: 1 } }), _jsx("stop", { offset: "50%", style: { stopColor: '#dc2626', stopOpacity: 1 } }), _jsx("stop", { offset: "100%", style: { stopColor: '#7c2d12', stopOpacity: 1 } })] })] }), _jsx("rect", { x: "50", y: "100", width: "150", height: "980", fill: "url(#torii-wood-texture)", stroke: "#7c2d12", strokeWidth: "4" }), _jsx("rect", { x: "1720", y: "100", width: "150", height: "980", fill: "url(#torii-wood-texture)", stroke: "#7c2d12", strokeWidth: "4" }), _jsx("path", { d: "M 0 80 Q 960 50 1920 80 L 1920 140 Q 960 110 0 140 Z", fill: "url(#torii-frame-gradient)", stroke: "#7c2d12", strokeWidth: "3" }), _jsx("rect", { x: "30", y: "240", width: "1860", height: "100", fill: "url(#torii-wood-texture)", stroke: "#7c2d12", strokeWidth: "3", rx: "10" }), _jsx("circle", { cx: "100", cy: "290", r: "20", fill: "#fbbf24", opacity: "0.6" }), _jsx("circle", { cx: "1820", cy: "290", r: "20", fill: "#fbbf24", opacity: "0.6" })] }) }), _jsxs("div", { className: "fixed top-0 left-0 right-0 z-50 pointer-events-none", style: { height: '340px' }, children: [_jsx("div", { className: "absolute left-[280px] flex items-center gap-3 pointer-events-auto", style: { top: '181px' }, children: _jsxs(Link, { to: "/", className: "flex items-center gap-3 group", children: [_jsx("div", { className: "relative", children: _jsx("img", { src: "/logo-icon.svg", alt: "Nipo School", className: "w-12 h-12 transform group-hover:scale-110 transition-transform drop-shadow-lg" }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-xl font-bold text-white drop-shadow-lg tracking-tight", children: "Nipo School" }), _jsx("span", { className: "text-xs text-white/95 drop-shadow-md font-medium", children: "Alpha Method" })] })] }) }), _jsx("div", { className: "absolute right-[280px] flex items-center gap-3 pointer-events-auto", style: { top: '181px' }, children: _jsx(Link, { to: "/", children: _jsx("button", { className: "px-6 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full hover:bg-white/30 transition-all shadow-lg", children: "\u2190 Voltar" }) }) })] }), _jsx("div", { className: "relative z-10 min-h-screen flex items-center justify-center px-[280px] pt-[380px] pb-20", children: _jsx("div", { className: "w-full max-w-md", children: _jsxs("div", { className: "bg-white/98 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-200", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2", children: "\u3088\u3046\u3053\u305D" }), _jsx("p", { className: "text-gray-600 text-lg", children: "Comece sua jornada musical" })] }), error && (_jsxs("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" }), _jsx("p", { className: "text-sm text-red-600", children: error })] })), success && (_jsxs("div", { className: "mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3", children: [_jsx("div", { className: "w-5 h-5 text-green-600 flex-shrink-0", children: "\u2713" }), _jsx("p", { className: "text-sm text-green-600 font-medium", children: "Conta criada! Redirecionando..." })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Nome Completo" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Seu nome", value: fullName, onChange: (e) => setFullName(e.target.value), required: true, className: "w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }), _jsx("input", { type: "email", placeholder: "seu@email.com", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Tipo de Conta" }), _jsxs("select", { value: userType, onChange: (e) => setUserType(e.target.value), className: "w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white", children: [_jsx("option", { value: "aluno", children: "\uD83C\uDF93 Aluno - Aprender m\u00FAsica" }), _jsx("option", { value: "professor", children: "\uD83D\uDC68\u200D\uD83C\uDFEB Professor - Ensinar m\u00FAsica" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Senha" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }), _jsx("input", { type: showPassword ? 'text' : 'password', placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600", children: showPassword ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Confirmar Senha" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }), _jsx("input", { type: showConfirmPassword ? 'text' : 'password', placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, className: "w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" }), _jsx("button", { type: "button", onClick: () => setShowConfirmPassword(!showConfirmPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600", children: showConfirmPassword ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) })] })] }), _jsx("button", { type: "submit", disabled: loading || success, className: "w-full py-4 bg-gradient-to-r from-orange-500 via-red-600 to-red-700 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2", children: loading ? (_jsxs("span", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }), "Criando..."] })) : success ? ('✓ Conta criada!') : (_jsxs(_Fragment, { children: ["Criar Conta Gratuita", _jsx(ArrowRight, { className: "w-5 h-5" })] })) })] }), _jsxs("div", { className: "relative my-8", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t-2 border-gray-200" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-4 bg-white text-gray-500 font-medium", children: "ou" }) })] }), _jsx("div", { className: "text-center", children: _jsxs("p", { className: "text-gray-600", children: ["J\u00E1 tem uma conta?", ' ', _jsx(Link, { to: ROUTES.LOGIN, className: "text-red-600 hover:text-red-700 font-bold transition-colors", children: "Fazer login" })] }) })] }) }) })] }));
};
