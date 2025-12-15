import React, { useState } from 'react'
import { QrCode, Camera, Info, CheckCircle } from 'lucide-react'
import QrScanner from 'react-qr-scanner'

export function ScannerPublicoPage() {
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [qrData, setQrData] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(true)
  const [cameraError, setCameraError] = useState<string | null>(null)

  const handleScan = async (data: any) => {
    if (!data || !isScanning) return

    const scannedCode = data.text || data

    if (scanResult === scannedCode) return

    setIsScanning(false)
    setScanResult(scannedCode)

    // Som de sucesso
    const audio = new Audio('/sounds/success.mp3')
    audio.play().catch(() => {})

    // Parse do código (formato esperado: TIPO-ID)
    const [tipo, id] = scannedCode.split('-')
    setQrData({
      codigo: scannedCode,
      tipo: tipo || 'desconhecido',
      id: id || 'N/A',
      timestamp: new Date()
    })
  }

  const handleError = (error: any) => {
    console.error('Erro da câmera:', error)
    setCameraError('Erro ao acessar a câmera. Verifique as permissões.')
  }

  const handleReset = () => {
    setScanResult(null)
    setQrData(null)
    setIsScanning(true)
    setCameraError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <QrCode className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Scanner QR Público
            </h1>
            <p className="text-gray-600">
              Teste o scanner sem necessidade de login
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 py-8">
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Modo de Teste</p>
            <p className="text-blue-700">
              Este scanner é apenas para visualização. Os dados não são salvos no banco de dados.
              Para registrar presença, use o scanner autenticado.
            </p>
          </div>
        </div>

        {/* Scanner Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {!scanResult ? (
            <>
              {/* Scanner Area */}
              <div className="relative">
                {!cameraError ? (
                  <div className="aspect-square max-w-md mx-auto relative">
                    <QrScanner
                      delay={300}
                      onError={handleError}
                      onScan={handleScan}
                      style={{ width: '100%' }}
                      constraints={{
                        video: { facingMode: 'environment' }
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Cantos */}
                      <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-blue-600 rounded-tl-lg"></div>
                      <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-blue-600 rounded-tr-lg"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-blue-600 rounded-bl-lg"></div>
                      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-blue-600 rounded-br-lg"></div>
                      
                      {/* Linha animada */}
                      {isScanning && (
                        <div className="absolute inset-x-0 top-0 h-1 bg-blue-600 animate-scan"></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square max-w-md mx-auto bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-2">{cameraError}</p>
                      <button
                        onClick={() => window.location.reload()}
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        Tentar novamente
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-blue-50 border-t border-blue-100">
                <p className="text-sm text-gray-700 text-center">
                  📱 Aponte a câmera para um QR Code
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Resultado */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    QR Code Detectado! ✅
                  </h2>
                  <p className="text-gray-600">
                    Informações extraídas do código
                  </p>
                </div>

                {/* Dados */}
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Código Completo</p>
                    <p className="text-lg font-mono font-bold text-gray-900 break-all">
                      {qrData?.codigo}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Tipo</p>
                      <p className="text-lg font-semibold text-gray-900 capitalize">
                        {qrData?.tipo === 'aula' && '🎓 Aula'}
                        {qrData?.tipo === 'instrumento' && '🎵 Instrumento'}
                        {qrData?.tipo === 'evento' && '🎉 Evento'}
                        {qrData?.tipo === 'desconhecido' && '❓ Desconhecido'}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">ID</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {qrData?.id}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Escaneado em</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {qrData?.timestamp?.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>

                {/* Aviso */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-900 text-center">
                    ⚠️ <strong>Modo Teste:</strong> Este scan não foi registrado no sistema.
                    Para registrar presença, faça login e use o scanner autenticado.
                  </p>
                </div>

                {/* Botão */}
                <button
                  onClick={handleReset}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Escanear Outro QR Code
                </button>
              </div>
            </>
          )}
        </div>

        {/* Link para Login */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-2">
            Quer registrar sua presença?
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            Fazer Login →
          </a>
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
