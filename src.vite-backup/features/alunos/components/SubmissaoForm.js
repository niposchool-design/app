import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
/**
 * 📝 SUBMISSÃO FORM - NIPO SCHOOL
 *
 * Formulário para submissão de desafios conforme blueprint
 */
import { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import EvidenceUpload from './EvidenceUpload';
export function SubmissaoForm({ desafioId, desafioTitulo, onSubmit, onCancel, isLoading = false, className = '' }) {
    const [conteudo, setConteudo] = useState('');
    const [evidencias, setEvidencias] = useState([]);
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        if (!conteudo.trim()) {
            newErrors.conteudo = 'Descrição da submissão é obrigatória';
        }
        else if (conteudo.trim().length < 50) {
            newErrors.conteudo = 'Descrição deve ter pelo menos 50 caracteres';
        }
        if (evidencias.length === 0) {
            newErrors.evidencias = 'Pelo menos uma evidência é obrigatória';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        try {
            await onSubmit({
                conteudo: conteudo.trim(),
                evidencias
            });
        }
        catch (error) {
            console.error('Erro ao submeter:', error);
        }
    };
    return (_jsxs("div", { className: `bg-white rounded-lg shadow-lg ${className}`, children: [_jsxs("div", { className: "p-6 border-b border-gray-200", children: [_jsxs("h2", { className: "text-xl font-bold text-gray-900", children: ["Submeter Desafio: ", desafioTitulo] }), _jsx("p", { className: "text-gray-600 mt-1", children: "Descreva sua solu\u00E7\u00E3o e adicione evid\u00EAncias do seu trabalho" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "conteudo", className: "block text-sm font-medium text-gray-700 mb-2", children: "Descri\u00E7\u00E3o da Submiss\u00E3o *" }), _jsx("textarea", { id: "conteudo", value: conteudo, onChange: (e) => setConteudo(e.target.value), placeholder: "Descreva como voc\u00EA resolveu o desafio, quais t\u00E9cnicas usou, dificuldades encontradas, aprendizados...", rows: 6, className: `
              w-full px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.conteudo ? 'border-red-300' : 'border-gray-300'}
            `, disabled: isLoading }), errors.conteudo && (_jsxs("div", { className: "flex items-center gap-2 mt-1 text-red-600 text-sm", children: [_jsx(AlertCircle, { className: "w-4 h-4" }), errors.conteudo] })), _jsxs("div", { className: "text-sm text-gray-500 mt-1", children: [conteudo.length, "/500 caracteres"] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Evid\u00EAncias *" }), _jsx(EvidenceUpload, { onFilesChange: setEvidencias, maxFiles: 5, maxSizePerFile: 10, acceptedTypes: ['image/*', 'video/*', 'audio/*', '.pdf'] }), errors.evidencias && (_jsxs("div", { className: "flex items-center gap-2 mt-2 text-red-600 text-sm", children: [_jsx(AlertCircle, { className: "w-4 h-4" }), errors.evidencias] })), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Adicione fotos, v\u00EDdeos, \u00E1udios ou documentos que comprovem sua solu\u00E7\u00E3o" })] }), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-medium text-blue-900 mb-2", children: "\uD83D\uDCCB Dicas para uma boa submiss\u00E3o:" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 Seja detalhado na descri\u00E7\u00E3o do seu processo" }), _jsx("li", { children: "\u2022 Inclua evid\u00EAncias claras e de boa qualidade" }), _jsx("li", { children: "\u2022 Explique os desafios que enfrentou e como os superou" }), _jsx("li", { children: "\u2022 Mencione o que aprendeu com o desafio" })] })] }), _jsxs("div", { className: "flex items-center justify-end gap-3 pt-4 border-t border-gray-200", children: [_jsx("button", { type: "button", onClick: onCancel, disabled: isLoading, className: "px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50", children: "Cancelar" }), _jsxs("button", { type: "submit", disabled: isLoading || !conteudo.trim() || evidencias.length === 0, className: "px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2", children: [_jsx(Send, { className: "w-4 h-4" }), isLoading ? 'Submetendo...' : 'Submeter Desafio'] })] })] })] }));
}
export default SubmissaoForm;
