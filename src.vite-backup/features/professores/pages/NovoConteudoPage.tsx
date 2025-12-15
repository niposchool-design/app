/**
 * ➕ NOVO CONTEÚDO PAGE - Área dos Professores
 * 
 * Formulário para criar novo conteúdo educacional
 * Suporta vídeos, sacadas, devocionais e materiais
 */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FileText, 
  Video, 
  BookOpen, 
  Upload,
  Link as LinkIcon,
  Save,
  X,
  AlertCircle
} from 'lucide-react'
import { NipoCard, NipoCardBody } from '../../../components/shared/NipoCard'
import { NipoButton } from '../../../components/shared/NipoButton'

type ConteudoTipo = 'video' | 'sacada' | 'devocional' | 'material'

export const NovoConteudoPage: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: 'sacada' as ConteudoTipo,
    descricao: '',
    url_video: '',
    url_arquivo: '',
    visivel: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Implementar criação no Supabase
      console.log('Criar conteúdo:', formData)
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirecionar para lista
      navigate('/professores/conteudos')
    } catch (error) {
      console.error('Erro ao criar conteúdo:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/professores/conteudos')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            ➕ Criar Novo Conteúdo
          </h1>
          <p className="text-gray-600 mt-1">
            Compartilhe conhecimento com outros professores e alunos
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <NipoCard>
            <NipoCardBody>
              <div className="space-y-6">
                
                {/* Tipo de Conteúdo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Conteúdo *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: 'video', label: 'Vídeo', icon: Video, color: 'red' },
                      { value: 'sacada', label: 'Sacada', icon: FileText, color: 'blue' },
                      { value: 'devocional', label: 'Devocional', icon: BookOpen, color: 'purple' },
                      { value: 'material', label: 'Material', icon: Upload, color: 'green' }
                    ].map((tipo) => {
                      const Icon = tipo.icon
                      const isSelected = formData.tipo === tipo.value
                      return (
                        <button
                          key={tipo.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, tipo: tipo.value as ConteudoTipo })}
                          className={`
                            p-4 rounded-lg border-2 transition-all
                            ${isSelected
                              ? `border-${tipo.color}-500 bg-${tipo.color}-50`
                              : 'border-gray-200 hover:border-gray-300'}
                          `}
                        >
                          <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? `text-${tipo.color}-600` : 'text-gray-600'}`} />
                          <p className={`text-sm font-medium ${isSelected ? `text-${tipo.color}-900` : 'text-gray-700'}`}>
                            {tipo.label}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Título */}
                <div>
                  <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    id="titulo"
                    required
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    placeholder="Ex: 5 Sacadas para Melhorar sua Aula"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Descrição */}
                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição *
                  </label>
                  <textarea
                    id="descricao"
                    required
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    placeholder="Descreva o conteúdo e o que os outros professores/alunos aprenderão..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* URL do Vídeo (se tipo for vídeo) */}
                {formData.tipo === 'video' && (
                  <div>
                    <label htmlFor="url_video" className="block text-sm font-medium text-gray-700 mb-2">
                      URL do Vídeo (YouTube, Vimeo, etc.)
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        id="url_video"
                        value={formData.url_video}
                        onChange={(e) => setFormData({ ...formData, url_video: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* Upload de Arquivo (se tipo for material) */}
                {formData.tipo === 'material' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arquivo (PDF, DOC, etc.)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Arraste e solte ou clique para selecionar
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        className="hidden"
                        onChange={(e) => {
                          // TODO: Implementar upload
                          console.log('Arquivo selecionado:', e.target.files?.[0])
                        }}
                      />
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Selecionar Arquivo
                      </button>
                    </div>
                  </div>
                )}

                {/* Visibilidade */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="visivel"
                    checked={formData.visivel}
                    onChange={(e) => setFormData({ ...formData, visivel: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="visivel" className="text-sm text-gray-700 cursor-pointer">
                    <span className="font-medium">Tornar visível imediatamente</span>
                    <p className="text-gray-500 mt-1">
                      Se desmarcado, o conteúdo ficará oculto até você publicá-lo manualmente
                    </p>
                  </label>
                </div>

                {/* Aviso */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Dica de Qualidade</p>
                    <p>
                      Use títulos claros e descritivos. Adicione tags relevantes para facilitar a busca.
                      Conteúdos bem estruturados têm melhor engajamento!
                    </p>
                  </div>
                </div>

              </div>
            </NipoCardBody>
          </NipoCard>

          {/* Ações */}
          <div className="flex items-center justify-end gap-4 mt-6">
            <NipoButton
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              <X className="w-5 h-5 mr-2" />
              Cancelar
            </NipoButton>
            <NipoButton
              type="submit"
              variant="primary"
              disabled={loading}
            >
              <Save className="w-5 h-5 mr-2" />
              {loading ? 'Salvando...' : 'Salvar Conteúdo'}
            </NipoButton>
          </div>
        </form>

      </div>
    </div>
  )
}

export default NovoConteudoPage
