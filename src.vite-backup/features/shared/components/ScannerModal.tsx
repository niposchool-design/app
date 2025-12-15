import React, { useState } from 'react'
import { QrCode, X, CheckCircle, XCircle } from 'lucide-react'
import QrScanner from 'react-qr-scanner'

interface ScannerModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (code: string) => void
  onError?: (error: string) => void
  title?: string
  description?: string
}

export function ScannerModal({
  isOpen,
  onClose,
  onSuccess,
  onError,
  title = 'Escanear QR Code',
  description = 'Aponte a câmera para o QR Code'
}: ScannerModalProps) {
  const [isScanning, setIsScanning] = useState(true)
  const [scanStatus, setScanStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  if (!isOpen) return null

  const handleScan = (data: any) => {
    if (!data || !isScanning) return

    const scannedCode = data.text || data

    setIsScanning(false)
    setScanStatus('success')

    // Som de sucesso
    const audio = new Audio('/sounds/success.mp3')
    audio.play().catch(() => {})

    // Chamar callback após animação
    setTimeout(() => {
      onSuccess(scannedCode)
      handleClose()
    }, 1000)
  }

  const handleError = (error: any) => {
    console.error('Erro da câmera:', error)
    setIsScanning(false)
    setScanStatus('error')
    const message = 'Erro ao acessar a câmera. Verifique as permissões.'
    setErrorMessage(message)
    
    if (onError) {
      onError(message)
    }
  }

  const handleClose = () => {
    setIsScanning(true)
    setScanStatus('idle')
    setErrorMessage('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <QrCode className="w-6 h-6 text-red-600" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="relative">
          {scanStatus === 'idle' && (
            <div className="aspect-square relative">
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
                constraints={{
                  video: { facingMode: 'environment' }
                }}
              />
              
              {/* Overlay de scanning */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Cantos do frame */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-red-600 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-red-600 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-red-600 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-red-600 rounded-br-lg"></div>
                
                {/* Linha de scan animada */}
                {isScanning && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-red-600 animate-scan"></div>
                )}
              </div>
            </div>
          )}

          {scanStatus === 'success' && (
            <div className="aspect-square bg-green-50 flex items-center justify-center">
              <div className="text-center">
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-3 animate-bounce" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  QR Code detectado! ✅
                </h3>
                <p className="text-gray-600 text-sm">
                  Processando...
                </p>
              </div>
            </div>
          )}

          {scanStatus === 'error' && (
            <div className="aspect-square bg-red-50 flex items-center justify-center p-6">
              <div className="text-center">
                <XCircle className="w-20 h-20 text-red-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Erro na câmera
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {errorMessage}
                </p>
                <button
                  onClick={() => {
                    setScanStatus('idle')
                    setIsScanning(true)
                    setErrorMessage('')
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-red-50 border-t border-red-100">
          <p className="text-sm text-gray-700 text-center">
            📱 Posicione o QR Code dentro do quadrado
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  )
}
