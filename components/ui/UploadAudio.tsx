'use client';

import { Upload, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadAudioProps {
    onUploadComplete?: (file: File) => void;
    onUploadError?: (error: string) => void;
    maxSizeMB?: number;
    acceptedFormats?: string[];
}

export default function UploadAudio({
    onUploadComplete,
    onUploadError,
    maxSizeMB = 50,
    acceptedFormats = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg', 'video/mp4']
}: UploadAudioProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        // Validar tipo
        if (!acceptedFormats.includes(file.type)) {
            return 'Formato de arquivo não suportado. Use MP3, WAV, OGG ou MP4.';
        }

        // Validar tamanho
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            return `Arquivo muito grande. Tamanho máximo: ${maxSizeMB}MB`;
        }

        return null;
    };

    const handleFileSelect = (selectedFile: File) => {
        setError(null);
        setSuccess(false);

        const validationError = validateFile(selectedFile);
        if (validationError) {
            setError(validationError);
            if (onUploadError) onUploadError(validationError);
            return;
        }

        setFile(selectedFile);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            handleFileSelect(selectedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    };

    const simulateUpload = () => {
        setUploading(true);
        setProgress(0);

        // Simular upload com progresso
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    setSuccess(true);
                    if (file && onUploadComplete) {
                        onUploadComplete(file);
                    }
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const handleUpload = async () => {
        if (!file) return;

        // TODO: Implementar upload real para o Supabase Storage
        simulateUpload();
    };

    const removeFile = () => {
        setFile(null);
        setProgress(0);
        setSuccess(false);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="space-y-4">
            {/* Área de Upload */}
            {!file && (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-3 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                        isDragging
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50/50'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={acceptedFormats.join(',')}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <Upload className={`w-16 h-16 mx-auto mb-4 ${isDragging ? 'text-red-600' : 'text-gray-400'}`} />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {isDragging ? 'Solte o arquivo aqui' : 'Upload de Áudio/Vídeo'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Arraste e solte ou clique para selecionar
                    </p>
                    <p className="text-sm text-gray-500">
                        Formatos aceitos: MP3, WAV, OGG, MP4 • Máximo: {maxSizeMB}MB
                    </p>
                </div>
            )}

            {/* Arquivo Selecionado */}
            <AnimatePresence>
                {file && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4 flex-1">
                                <div className="p-3 bg-red-100 rounded-xl">
                                    <Upload className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 mb-1">{file.name}</h4>
                                    <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                                </div>
                            </div>
                            {!uploading && !success && (
                                <button
                                    onClick={removeFile}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            )}
                        </div>

                        {/* Progress Bar */}
                        {uploading && (
                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Fazendo upload...</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        className="bg-gradient-to-r from-red-500 to-pink-500 h-full rounded-full"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-lg p-3 mb-4">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-bold">Upload concluído com sucesso!</span>
                            </div>
                        )}

                        {/* Upload Button */}
                        {!uploading && !success && (
                            <button
                                onClick={handleUpload}
                                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all shadow-lg"
                            >
                                Fazer Upload
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg p-4 border-2 border-red-200"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="font-bold">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
