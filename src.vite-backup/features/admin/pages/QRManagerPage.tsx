import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QrCode, Plus, Trash2, Download, Eye, Search, Filter, Calendar } from 'lucide-react'
import QRCodeLib from 'qrcode'
import { supabase } from '../../../lib/supabase'

interface QRCodeData {
  id: string
  tipo: string
  referencia_id: string
  codigo: string
  ativo: boolean
  created_at: string
  scans_count?: number
}

export function QRManagerPage() {
  const navigate = useNavigate()
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filter, setFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadQRCodes()
  }, [])

  const loadQRCodes = async () => {
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select(`
          *,
          qr_scans (count)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      const qrCodesWithCount = data?.map((qr: any) => ({
        ...qr,
        scans_count: qr.qr_scans?.[0]?.count || 0
      })) || []

      setQrCodes(qrCodesWithCount)
    } catch (error) {
      console.error('Erro ao carregar QR codes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateQR = async (tipo: string, referenciaId: string) => {
    try {
      const codigo = `${tipo.toUpperCase()}-${referenciaId.substring(0, 8)}-${Date.now()}`

      const { error } = await supabase
        .from('qr_codes')
        .insert({
          tipo,
          referencia_id: referenciaId,
          codigo,
          ativo: true
        })

      if (error) throw error

      await loadQRCodes()
      setShowCreateModal(false)
    } catch (error) {
      console.error('Erro ao criar QR code:', error)
    }
  }

  const handleToggleAtivo = async (id: string, ativo: boolean) => {
    try {
      const { error } = await supabase
        .from('qr_codes')
        .update({ ativo: !ativo })
        .eq('id', id)

      if (error) throw error
      await loadQRCodes()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este QR Code?')) return

    try {
      const { error } = await supabase
        .from('qr_codes')
        .delete()
        .eq('id', id)

      if (error) throw error
      await loadQRCodes()
    } catch (error) {
      console.error('Erro ao excluir QR code:', error)
    }
  }

  const handleDownloadQR = async (codigo: string) => {
    try {
      const canvas = document.createElement('canvas')
      await QRCodeLib.toCanvas(canvas, codigo, {
        width: 400,
        margin: 2
      })

      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `qr-${codigo}.png`
      link.href = url
      link.click()
    } catch (error) {
      console.error('Erro ao gerar QR code:', error)
    }
  }

  const handleViewQR = (id: string) => {
    navigate(`/admin/qr-display/${id}`)
  }

  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesFilter = filter === 'all' || qr.tipo === filter
    const matchesSearch = qr.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          qr.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Gerenciador QR Code
              </h1>
              <p className="text-gray-600">
                Crie e gerencie QR codes para aulas e instrumentos
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Criar QR Code
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por código ou tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Filtro de tipo */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">Todos os tipos</option>
                <option value="aula">🎓 Aulas</option>
                <option value="instrumento">🎵 Instrumentos</option>
                <option value="evento">🎉 Eventos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de QR Codes */}
        <div className="grid gap-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            </div>
          ) : filteredQRCodes.length > 0 ? (
            filteredQRCodes.map((qr) => (
              <div
                key={qr.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">
                        {qr.tipo === 'aula' && '🎓'}
                        {qr.tipo === 'instrumento' && '🎵'}
                        {qr.tipo === 'evento' && '🎉'}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 capitalize">
                          {qr.tipo}
                        </h3>
                        <p className="text-sm text-gray-600 font-mono">
                          {qr.codigo}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mt-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(qr.created_at).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {qr.scans_count} scans
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          qr.ativo 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {qr.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewQR(qr.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Visualizar em tela cheia"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDownloadQR(qr.codigo)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Baixar QR Code"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleToggleAtivo(qr.id, qr.ativo)}
                      className={`p-2 rounded-lg transition-colors ${
                        qr.ativo 
                          ? 'text-yellow-600 hover:bg-yellow-50' 
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                      title={qr.ativo ? 'Desativar' : 'Ativar'}
                    >
                      <QrCode className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(qr.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">Nenhum QR Code encontrado</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Criar QR Code */}
      {showCreateModal && (
        <CreateQRModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateQR}
        />
      )}
    </div>
  )
}

// Modal de Criação
function CreateQRModal({ onClose, onCreate }: any) {
  const [tipo, setTipo] = useState('aula')
  const [referenciaId, setReferenciaId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!referenciaId.trim()) return
    onCreate(tipo, referenciaId)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Criar Novo QR Code
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="aula">🎓 Aula</option>
              <option value="instrumento">🎵 Instrumento</option>
              <option value="evento">🎉 Evento</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID de Referência (UUID)
            </label>
            <input
              type="text"
              value={referenciaId}
              onChange={(e) => setReferenciaId(e.target.value)}
              placeholder="00000000-0000-0000-0000-000000000000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              UUID da aula, instrumento ou evento
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
