/**
 * 📎 EVIDENCE UPLOAD - NIPO SCHOOL
 * 
 * Componente para upload de evidências em portfólios conforme blueprint
 */

import React, { useState, useRef } from 'react'
import { Upload, X, File, Image, Video, Music } from 'lucide-react'

interface EvidenceFile {
  id: string
  file: File
  type: 'image' | 'video' | 'audio' | 'document'
  preview?: string
}

interface EvidenceUploadProps {
  onFilesChange: (files: EvidenceFile[]) => void
  maxFiles?: number
  maxSizePerFile?: number // em MB
  acceptedTypes?: string[]
  className?: string
}

export function EvidenceUpload({ 
  onFilesChange, 
  maxFiles = 5,
  maxSizePerFile = 10,
  acceptedTypes = ['image/*', 'video/*', 'audio/*', '.pdf', '.doc', '.docx'],
  className = '' 
}: EvidenceUploadProps) {
  const [files, setFiles] = useState<EvidenceFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileType = (file: File): EvidenceFile['type'] => {
    if (file.type.startsWith('image/')) return 'image'
    if (file.type.startsWith('video/')) return 'video'
    if (file.type.startsWith('audio/')) return 'audio'
    return 'document'
  }

  const getFileIcon = (type: EvidenceFile['type']) => {
    switch (type) {
      case 'image': return <Image className="w-6 h-6 text-blue-500" />
      case 'video': return <Video className="w-6 h-6 text-purple-500" />
      case 'audio': return <Music className="w-6 h-6 text-green-500" />
      default: return <File className="w-6 h-6 text-gray-500" />
    }
  }

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      // Verificar tamanho
      if (file.size > maxSizePerFile * 1024 * 1024) {
        alert(`Arquivo ${file.name} é muito grande. Máximo: ${maxSizePerFile}MB`)
        return false
      }
      return true
    })

    if (files.length + validFiles.length > maxFiles) {
      alert(`Máximo de ${maxFiles} arquivos permitidos`)
      return
    }

    const evidenceFiles: EvidenceFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      type: getFileType(file),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }))

    const updatedFiles = [...files, ...evidenceFiles]
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const removeFile = (id: string) => {
    const file = files.find(f => f.id === id)
    if (file?.preview) {
      URL.revokeObjectURL(file.preview)
    }
    
    const updatedFiles = files.filter(f => f.id !== id)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      handleFiles(selectedFiles)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Área de upload */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Arraste arquivos aqui ou clique para selecionar
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Máximo {maxFiles} arquivos, {maxSizePerFile}MB cada
        </p>
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Selecionar Arquivos
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Lista de arquivos */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Arquivos Selecionados ({files.length}/{maxFiles})</h4>
          {files.map((evidenceFile) => (
            <div key={evidenceFile.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {evidenceFile.preview ? (
                <img 
                  src={evidenceFile.preview} 
                  alt={evidenceFile.file.name}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                getFileIcon(evidenceFile.type)
              )}
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {evidenceFile.file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(evidenceFile.file.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => removeFile(evidenceFile.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EvidenceUpload