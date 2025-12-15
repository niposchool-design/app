/**
 * 📝 SUBMISSÃO FORM - NIPO SCHOOL
 * 
 * Formulário para submissão de desafios conforme blueprint
 */

import React, { useState } from 'react'
import { Send, AlertCircle } from 'lucide-react'
import EvidenceUpload from './EvidenceUpload'

// Definir o tipo aqui para evitar problemas de import
interface EvidenceFile {
  id: string
  file: File
  type: 'image' | 'video' | 'audio' | 'document'
  preview?: string
}

interface SubmissaoFormProps {
  desafioId: string
  desafioTitulo: string
  onSubmit: (data: SubmissaoData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  className?: string
}

interface SubmissaoData {
  conteudo: string
  evidencias: EvidenceFile[]
}

export function SubmissaoForm({ 
  desafioId,
  desafioTitulo,
  onSubmit, 
  onCancel,
  isLoading = false,
  className = '' 
}: SubmissaoFormProps) {
  const [conteudo, setConteudo] = useState('')
  const [evidencias, setEvidencias] = useState<EvidenceFile[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!conteudo.trim()) {
      newErrors.conteudo = 'Descrição da submissão é obrigatória'
    } else if (conteudo.trim().length < 50) {
      newErrors.conteudo = 'Descrição deve ter pelo menos 50 caracteres'
    }

    if (evidencias.length === 0) {
      newErrors.evidencias = 'Pelo menos uma evidência é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      await onSubmit({
        conteudo: conteudo.trim(),
        evidencias
      })
    } catch (error) {
      console.error('Erro ao submeter:', error)
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">
          Submeter Desafio: {desafioTitulo}
        </h2>
        <p className="text-gray-600 mt-1">
          Descreva sua solução e adicione evidências do seu trabalho
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Descrição da Submissão */}
        <div>
          <label htmlFor="conteudo" className="block text-sm font-medium text-gray-700 mb-2">
            Descrição da Submissão *
          </label>
          <textarea
            id="conteudo"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            placeholder="Descreva como você resolveu o desafio, quais técnicas usou, dificuldades encontradas, aprendizados..."
            rows={6}
            className={`
              w-full px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.conteudo ? 'border-red-300' : 'border-gray-300'}
            `}
            disabled={isLoading}
          />
          {errors.conteudo && (
            <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.conteudo}
            </div>
          )}
          <div className="text-sm text-gray-500 mt-1">
            {conteudo.length}/500 caracteres
          </div>
        </div>

        {/* Upload de Evidências */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Evidências *
          </label>
          <EvidenceUpload
            onFilesChange={setEvidencias}
            maxFiles={5}
            maxSizePerFile={10}
            acceptedTypes={['image/*', 'video/*', 'audio/*', '.pdf']}
          />
          {errors.evidencias && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.evidencias}
            </div>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Adicione fotos, vídeos, áudios ou documentos que comprovem sua solução
          </p>
        </div>

        {/* Instruções */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">📋 Dicas para uma boa submissão:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Seja detalhado na descrição do seu processo</li>
            <li>• Inclua evidências claras e de boa qualidade</li>
            <li>• Explique os desafios que enfrentou e como os superou</li>
            <li>• Mencione o que aprendeu com o desafio</li>
          </ul>
        </div>

        {/* Ações */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            disabled={isLoading || !conteudo.trim() || evidencias.length === 0}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {isLoading ? 'Submetendo...' : 'Submeter Desafio'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SubmissaoForm