import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * 📱 QR PRESENCE SYSTEM - Sistema QR de Presença Japonês
 *
 * Componente para sistema de presença por QR code
 * com design japonês e funcionalidade real-time
 */
import { useState, useEffect } from 'react';
import { QrCode, Check, Clock, Users, Smartphone } from 'lucide-react';
import { NipoCard, NipoCardBody } from '../shared/NipoCard';
import { NipoButton } from '../shared/NipoButton';
export const QRPresenceSystem = ({ aulaId, professorId, isStudent = false, className = '' }) => {
    const [presenceData, setPresenceData] = useState({
        qrCode: '',
        studentsPresent: 0,
        totalStudents: 15,
        isActive: false,
        timeRemaining: 0
    });
    const [scanStatus, setScanStatus] = useState('idle');
    const [userPresent, setUserPresent] = useState(false);
    // Mock data - em produção conectará com Supabase
    useEffect(() => {
        const mockData = {
            qrCode: `nipo-school-presence-${aulaId}-${Date.now()}`,
            studentsPresent: 8,
            totalStudents: 15,
            isActive: true,
            timeRemaining: 180 // 3 minutos
        };
        setPresenceData(mockData);
    }, [aulaId]);
    // Timer para QR code ativo
    useEffect(() => {
        if (presenceData.isActive && presenceData.timeRemaining > 0) {
            const timer = setInterval(() => {
                setPresenceData(prev => ({
                    ...prev,
                    timeRemaining: prev.timeRemaining - 1
                }));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [presenceData.isActive, presenceData.timeRemaining]);
    const handleGenerateQR = () => {
        setPresenceData(prev => ({
            ...prev,
            isActive: true,
            timeRemaining: 300, // 5 minutos
            qrCode: `nipo-school-presence-${aulaId}-${Date.now()}`
        }));
    };
    const handleScanQR = () => {
        setScanStatus('scanning');
        // Simula processo de scan
        setTimeout(() => {
            setScanStatus('success');
            setUserPresent(true);
            setPresenceData(prev => ({
                ...prev,
                studentsPresent: prev.studentsPresent + 1
            }));
        }, 2000);
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    return (_jsxs("div", { className: `space-y-6 ${className}`, children: [!isStudent && (_jsx(NipoCard, { title: "\u51FA\u5E2D Sistema de Presen\u00E7a QR", children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-4 bg-gradient-to-r from-matcha-50 to-matcha-100 rounded-xl", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Users, { className: "w-6 h-6 text-matcha-600" }), _jsxs("div", { children: [_jsxs("p", { className: "font-medium text-gray-900", children: [presenceData.studentsPresent, "/", presenceData.totalStudents, " presentes"] }), _jsxs("p", { className: "text-sm text-gray-600", children: [((presenceData.studentsPresent / presenceData.totalStudents) * 100).toFixed(0), "% presen\u00E7a"] })] })] }), presenceData.isActive && (_jsxs("div", { className: "flex items-center gap-2 text-matcha-600", children: [_jsx(Clock, { className: "w-5 h-5" }), _jsx("span", { className: "font-mono text-lg font-bold", children: formatTime(presenceData.timeRemaining) })] }))] }), presenceData.isActive ? (_jsxs("div", { className: "text-center space-y-4", children: [_jsxs("div", { className: "bg-white p-6 rounded-2xl shadow-lg border-2 border-matcha-200 inline-block", children: [_jsx("div", { className: "w-48 h-48 bg-gradient-to-br from-matcha-100 to-matcha-200 rounded-xl flex items-center justify-center", children: _jsx(QrCode, { className: "w-32 h-32 text-matcha-600" }) }), _jsx("p", { className: "mt-4 text-sm text-gray-600 font-mono", children: presenceData.qrCode })] }), _jsx("div", { className: "bg-zen-50 p-4 rounded-xl", children: _jsxs("p", { className: "text-zen-700 text-sm", children: ["QR Code ativo por mais ", formatTime(presenceData.timeRemaining)] }) })] })) : (_jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto", children: _jsx(QrCode, { className: "w-24 h-24 text-gray-400" }) }), _jsx(NipoButton, { onClick: handleGenerateQR, variant: "primary", leftIcon: _jsx(QrCode, { className: "w-5 h-5" }), children: "Gerar QR de Presen\u00E7a" })] }))] }) }) })), isStudent && (_jsx(NipoCard, { title: "\uD83D\uDCF1 Confirmar Presen\u00E7a", children: _jsx(NipoCardBody, { children: _jsx("div", { className: "text-center space-y-4", children: !userPresent ? (_jsxs(_Fragment, { children: [_jsx("div", { className: `w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full flex items-center justify-center ${scanStatus === 'scanning'
                                        ? 'bg-sakura-100 animate-zen-breath'
                                        : 'bg-gray-100'}`, children: _jsx(Smartphone, { className: `w-12 h-12 sm:w-16 sm:h-16 ${scanStatus === 'scanning' ? 'text-sakura-600' : 'text-gray-400'}` }) }), scanStatus === 'idle' && (_jsxs(_Fragment, { children: [_jsx("h3", { className: "text-base sm:text-lg font-medium text-gray-900", children: "Escaneie o QR Code da aula" }), _jsx("p", { className: "text-sm sm:text-base text-gray-600 px-4", children: "Aponte a c\u00E2mera para o QR code exibido pelo professor" }), _jsx(NipoButton, { onClick: handleScanQR, variant: "primary", leftIcon: _jsx(QrCode, { className: "w-4 h-4 sm:w-5 sm:h-5" }), className: "w-full sm:w-auto", children: "Escanear QR Code" })] })), scanStatus === 'scanning' && (_jsxs(_Fragment, { children: [_jsxs("h3", { className: "text-base sm:text-lg font-medium text-sakura-700", children: [_jsx("span", { className: "block sm:hidden", children: "Escaneando..." }), _jsx("span", { className: "hidden sm:block", children: "\u30B9\u30AD\u30E3\u30F3\u4E2D... Escaneando..." })] }), _jsx("p", { className: "text-sm sm:text-base text-sakura-600 px-4", children: "Mantenha a c\u00E2mera focada no QR code" })] }))] })) : (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-green-100 flex items-center justify-center", children: _jsx(Check, { className: "w-12 h-12 sm:w-16 sm:h-16 text-green-600" }) }), _jsxs("div", { className: "space-y-2", children: [_jsxs("h3", { className: "text-base sm:text-lg font-medium text-green-700", children: [_jsx("span", { className: "block sm:hidden", children: "Presen\u00E7a Confirmada!" }), _jsx("span", { className: "hidden sm:block", children: "\u51FA\u5E2D\u78BA\u8A8D Presen\u00E7a Confirmada!" })] }), _jsx("p", { className: "text-sm sm:text-base text-green-600", children: "Sua presen\u00E7a foi registrada com sucesso" })] }), _jsx("div", { className: "bg-green-50 p-3 sm:p-4 rounded-xl", children: _jsxs("p", { className: "text-green-700 text-xs sm:text-sm", children: ["\u2713 Registrado \u00E0s ", new Date().toLocaleTimeString('pt-BR')] }) })] })) }) }) }))] }));
};
