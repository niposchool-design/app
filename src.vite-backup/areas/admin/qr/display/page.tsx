import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { QrCode, X, RefreshCw, Maximize2, ArrowLeft } from 'lucide-react'
import QRCodeLib from 'qrcode'
import { supabase } from '../../../lib/supabase'

export function QRDisplayPage() {
  const { aulaId } = useParams()
  const navigate = useNavigate()
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [qrData, setQrData] = useState<any>(null)
  const [qrImage, setQrImage] = useState<string>('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    if (aulaId) {
      loadQRCode()
    }
  }, [aulaId])

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1)
        if (timer % 30 === 0) { // Refresh a cada 30s
          loadQRCode()
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, timer])

  useEffect(() => {
    if (qrCode) {
      generateQRImage()
    }
  }, [qrCode])

  const loadQRCode = async () => {
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select(`
          *,
          aulas:referencia_id (
            numero,
            titulo
          )
        `)
        .eq('referencia_id', aulaId)
        .eq('tipo', 'aula')
        .eq('ativo', true)
        .single()

      if (error) throw error

      setQrData(data)
      setQrCode(data.codigo)
    } catch (error) {
      console.error('Erro ao carregar QR code:', error)
    }
  }

  const generateQRImage = async () => {
    if (!qrCode) return

    try {
      const url = await QRCodeLib.toDataURL(qrCode, {
        width: 800,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      setQrImage(url)
    } catch (error) {
      console.error('Erro ao gerar QR:', error)
    }
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  if (!qrData || !qrImage) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando QR Code...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      {!isFullscreen && (
        <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    autoRefresh 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                  Auto-Refresh {autoRefresh ? 'ON' : 'OFF'}
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                  Tela Cheia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Display */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8">
        {/* Título da Aula */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Aula {qrData.aulas?.numero}
          </h1>
          <p className="text-2xl text-gray-300">
            {qrData.aulas?.titulo}
          </p>
        </div>

        {/* QR Code */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl">
          <img
            src={qrImage}
            alt="QR Code"
            className="w-full max-w-2xl"
          />
        </div>

        {/* Código */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">Código QR</p>
          <p className="text-2xl font-mono font-bold tracking-wider">
            {qrCode}
          </p>
        </div>

        {/* Instruções */}
        <div className="mt-12 max-w-2xl text-center">
          <p className="text-xl text-gray-300 mb-4">
            📱 Escaneie este QR Code com seu celular para registrar presença
          </p>
          <p className="text-gray-400">
            Aponte a câmera do aplicativo para o código acima
          </p>
        </div>

        {/* Timer (se auto-refresh ativo) */}
        {autoRefresh && (
          <div className="mt-8 text-gray-500">
            Próxima atualização em {30 - (timer % 30)}s
          </div>
        )}

        {/* Botão sair fullscreen */}
        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="fixed top-4 right-4 p-3 bg-red-600 hover:bg-red-700 rounded-full shadow-lg transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Footer */}
      {!isFullscreen && (
        <div className="bg-gray-800 border-t border-gray-700 py-4">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
            Pressione F11 ou clique em "Tela Cheia" para melhor visualização
          </div>
        </div>
      )}
    </div>
  )
}

export default QRDisplayPage
