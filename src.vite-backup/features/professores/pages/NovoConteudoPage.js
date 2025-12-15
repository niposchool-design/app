import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ➕ NOVO CONTEÚDO PAGE - Área dos Professores
 *
 * Formulário para criar novo conteúdo educacional
 * Suporta vídeos, sacadas, devocionais e materiais
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Video, BookOpen, Upload, Link as LinkIcon, Save, X, AlertCircle } from 'lucide-react';
import { NipoCard, NipoCardBody } from '../../../components/shared/NipoCard';
import { NipoButton } from '../../../components/shared/NipoButton';
export const NovoConteudoPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        titulo: '',
        tipo: 'sacada',
        descricao: '',
        url_video: '',
        url_arquivo: '',
        visivel: true
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // TODO: Implementar criação no Supabase
            console.log('Criar conteúdo:', formData);
            // Simular delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Redirecionar para lista
            navigate('/professores/conteudos');
        }
        catch (error) {
            console.error('Erro ao criar conteúdo:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleCancel = () => {
        navigate('/professores/conteudos');
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "\u2795 Criar Novo Conte\u00FAdo" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Compartilhe conhecimento com outros professores e alunos" })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(NipoCard, { children: _jsx(NipoCardBody, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Tipo de Conte\u00FAdo *" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
                                                        { value: 'video', label: 'Vídeo', icon: Video, color: 'red' },
                                                        { value: 'sacada', label: 'Sacada', icon: FileText, color: 'blue' },
                                                        { value: 'devocional', label: 'Devocional', icon: BookOpen, color: 'purple' },
                                                        { value: 'material', label: 'Material', icon: Upload, color: 'green' }
                                                    ].map((tipo) => {
                                                        const Icon = tipo.icon;
                                                        const isSelected = formData.tipo === tipo.value;
                                                        return (_jsxs("button", { type: "button", onClick: () => setFormData({ ...formData, tipo: tipo.value }), className: `
                            p-4 rounded-lg border-2 transition-all
                            ${isSelected
                                                                ? `border-${tipo.color}-500 bg-${tipo.color}-50`
                                                                : 'border-gray-200 hover:border-gray-300'}
                          `, children: [_jsx(Icon, { className: `w-6 h-6 mx-auto mb-2 ${isSelected ? `text-${tipo.color}-600` : 'text-gray-600'}` }), _jsx("p", { className: `text-sm font-medium ${isSelected ? `text-${tipo.color}-900` : 'text-gray-700'}`, children: tipo.label })] }, tipo.value));
                                                    }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "titulo", className: "block text-sm font-medium text-gray-700 mb-2", children: "T\u00EDtulo *" }), _jsx("input", { type: "text", id: "titulo", required: true, value: formData.titulo, onChange: (e) => setFormData({ ...formData, titulo: e.target.value }), placeholder: "Ex: 5 Sacadas para Melhorar sua Aula", className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "descricao", className: "block text-sm font-medium text-gray-700 mb-2", children: "Descri\u00E7\u00E3o *" }), _jsx("textarea", { id: "descricao", required: true, value: formData.descricao, onChange: (e) => setFormData({ ...formData, descricao: e.target.value }), placeholder: "Descreva o conte\u00FAdo e o que os outros professores/alunos aprender\u00E3o...", rows: 4, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" })] }), formData.tipo === 'video' && (_jsxs("div", { children: [_jsx("label", { htmlFor: "url_video", className: "block text-sm font-medium text-gray-700 mb-2", children: "URL do V\u00EDdeo (YouTube, Vimeo, etc.)" }), _jsxs("div", { className: "relative", children: [_jsx(LinkIcon, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }), _jsx("input", { type: "url", id: "url_video", value: formData.url_video, onChange: (e) => setFormData({ ...formData, url_video: e.target.value }), placeholder: "https://youtube.com/watch?v=...", className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] })] })), formData.tipo === 'material' && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Arquivo (PDF, DOC, etc.)" }), _jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors", children: [_jsx(Upload, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: "Arraste e solte ou clique para selecionar" }), _jsx("input", { type: "file", accept: ".pdf,.doc,.docx,.ppt,.pptx", className: "hidden", onChange: (e) => {
                                                                // TODO: Implementar upload
                                                                console.log('Arquivo selecionado:', e.target.files?.[0]);
                                                            } }), _jsx("button", { type: "button", className: "text-sm text-blue-600 hover:text-blue-700 font-medium", children: "Selecionar Arquivo" })] })] })), _jsxs("div", { className: "flex items-center gap-3 p-4 bg-gray-50 rounded-lg", children: [_jsx("input", { type: "checkbox", id: "visivel", checked: formData.visivel, onChange: (e) => setFormData({ ...formData, visivel: e.target.checked }), className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" }), _jsxs("label", { htmlFor: "visivel", className: "text-sm text-gray-700 cursor-pointer", children: [_jsx("span", { className: "font-medium", children: "Tornar vis\u00EDvel imediatamente" }), _jsx("p", { className: "text-gray-500 mt-1", children: "Se desmarcado, o conte\u00FAdo ficar\u00E1 oculto at\u00E9 voc\u00EA public\u00E1-lo manualmente" })] })] }), _jsxs("div", { className: "flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" }), _jsxs("div", { className: "text-sm text-blue-800", children: [_jsx("p", { className: "font-medium mb-1", children: "Dica de Qualidade" }), _jsx("p", { children: "Use t\u00EDtulos claros e descritivos. Adicione tags relevantes para facilitar a busca. Conte\u00FAdos bem estruturados t\u00EAm melhor engajamento!" })] })] })] }) }) }), _jsxs("div", { className: "flex items-center justify-end gap-4 mt-6", children: [_jsxs(NipoButton, { type: "button", variant: "secondary", onClick: handleCancel, disabled: loading, children: [_jsx(X, { className: "w-5 h-5 mr-2" }), "Cancelar"] }), _jsxs(NipoButton, { type: "submit", variant: "primary", disabled: loading, children: [_jsx(Save, { className: "w-5 h-5 mr-2" }), loading ? 'Salvando...' : 'Salvar Conteúdo'] })] })] })] }) }));
};
export default NovoConteudoPage;
