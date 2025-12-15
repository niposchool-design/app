import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 📎 EVIDENCE UPLOAD - NIPO SCHOOL
 *
 * Componente para upload de evidências em portfólios conforme blueprint
 */
import { useState, useRef } from 'react';
import { Upload, X, File, Image, Video, Music } from 'lucide-react';
export function EvidenceUpload({ onFilesChange, maxFiles = 5, maxSizePerFile = 10, acceptedTypes = ['image/*', 'video/*', 'audio/*', '.pdf', '.doc', '.docx'], className = '' }) {
    const [files, setFiles] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);
    const getFileType = (file) => {
        if (file.type.startsWith('image/'))
            return 'image';
        if (file.type.startsWith('video/'))
            return 'video';
        if (file.type.startsWith('audio/'))
            return 'audio';
        return 'document';
    };
    const getFileIcon = (type) => {
        switch (type) {
            case 'image': return _jsx(Image, { className: "w-6 h-6 text-blue-500" });
            case 'video': return _jsx(Video, { className: "w-6 h-6 text-purple-500" });
            case 'audio': return _jsx(Music, { className: "w-6 h-6 text-green-500" });
            default: return _jsx(File, { className: "w-6 h-6 text-gray-500" });
        }
    };
    const handleFiles = (newFiles) => {
        const validFiles = newFiles.filter(file => {
            // Verificar tamanho
            if (file.size > maxSizePerFile * 1024 * 1024) {
                alert(`Arquivo ${file.name} é muito grande. Máximo: ${maxSizePerFile}MB`);
                return false;
            }
            return true;
        });
        if (files.length + validFiles.length > maxFiles) {
            alert(`Máximo de ${maxFiles} arquivos permitidos`);
            return;
        }
        const evidenceFiles = validFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            type: getFileType(file),
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        }));
        const updatedFiles = [...files, ...evidenceFiles];
        setFiles(updatedFiles);
        onFilesChange(updatedFiles);
    };
    const removeFile = (id) => {
        const file = files.find(f => f.id === id);
        if (file?.preview) {
            URL.revokeObjectURL(file.preview);
        }
        const updatedFiles = files.filter(f => f.id !== id);
        setFiles(updatedFiles);
        onFilesChange(updatedFiles);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    };
    const handleFileSelect = (e) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            handleFiles(selectedFiles);
        }
    };
    return (_jsxs("div", { className: `space-y-4 ${className}`, children: [_jsxs("div", { className: `border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'}`, onDragEnter: () => setDragActive(true), onDragLeave: () => setDragActive(false), onDragOver: (e) => e.preventDefault(), onDrop: handleDrop, children: [_jsx(Upload, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-lg font-medium text-gray-700 mb-2", children: "Arraste arquivos aqui ou clique para selecionar" }), _jsxs("p", { className: "text-sm text-gray-500 mb-4", children: ["M\u00E1ximo ", maxFiles, " arquivos, ", maxSizePerFile, "MB cada"] }), _jsx("button", { type: "button", onClick: () => fileInputRef.current?.click(), className: "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors", children: "Selecionar Arquivos" }), _jsx("input", { ref: fileInputRef, type: "file", multiple: true, accept: acceptedTypes.join(','), onChange: handleFileSelect, className: "hidden" })] }), files.length > 0 && (_jsxs("div", { className: "space-y-3", children: [_jsxs("h4", { className: "font-medium text-gray-700", children: ["Arquivos Selecionados (", files.length, "/", maxFiles, ")"] }), files.map((evidenceFile) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-gray-50 rounded-lg", children: [evidenceFile.preview ? (_jsx("img", { src: evidenceFile.preview, alt: evidenceFile.file.name, className: "w-12 h-12 object-cover rounded" })) : (getFileIcon(evidenceFile.type)), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-medium text-gray-900 truncate", children: evidenceFile.file.name }), _jsxs("p", { className: "text-sm text-gray-500", children: [(evidenceFile.file.size / 1024 / 1024).toFixed(1), " MB"] })] }), _jsx("button", { type: "button", onClick: () => removeFile(evidenceFile.id), className: "text-red-500 hover:text-red-700 p-1", children: _jsx(X, { className: "w-5 h-5" }) })] }, evidenceFile.id)))] }))] }));
}
export default EvidenceUpload;
