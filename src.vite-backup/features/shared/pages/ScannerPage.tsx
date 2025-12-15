import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QrCode, Camera, CheckCircle, XCircle, History, ArrowLeft } from 'lucide-react'
import QrScanner from 'react-qr-scanner'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../contexts/AuthContext'

interface ScanResult {
  text: string
  timestamp: Date
  type?: string
  success: boolean
}

export function ScannerPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isScanning, setIsScanning] = useState(true)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    loadScanHistory()
  }, [user])

  const loadScanHistory = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('qr_scans')
        .select(`
          *,
          qr_codes (
            tipo,
            codigo
          )
        `)
        .eq('user_id', user.id)
        .order('scanned_at', { ascending: false })
        .limit(10)

      if (error) throw error

      const history: ScanResult[] = data?.map((scan: any) => ({
        text: scan.qr_codes?.codigo || 'Código não encontrado',
        timestamp: new Date(scan.scanned_at),
        type: scan.qr_codes?.tipo,
        success: true
      })) || []

      setScanHistory(history)
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
    }
  }

  const handleScan = async (data: any) => {
    if (!data || !isScanning) return

    const scannedCode = data.text || data

    // Evitar scans duplicados
    if (scanResult?.text === scannedCode) return

    setIsScanning(false)
    setError(null)

    try {
      // Buscar QR code no banco
      const { data: qrCode, error: qrError } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('codigo', scannedCode)
        .eq('ativo', true)
        .single()

      if (qrError || !qrCode) {
        throw new Error('QR Code inválido ou inativo')
      }

      // Registrar o scan
      const { error: scanError } = await supabase
        .from('qr_scans')
        .insert({
          qr_code_id: qrCode.id,
          user_id: user?.id,
          scanned_at: new Date().toISOString()
        })

      if (scanError) throw scanError

      // Registrar presença se for QR de aula
      if (qrCode.tipo === 'aula' && qrCode.referencia_id) {
        await registrarPresenca(qrCode.referencia_id)
      }

      const result: ScanResult = {
        text: scannedCode,
        timestamp: new Date(),
        type: qrCode.tipo,
        success: true
      }

      setScanResult(result)
      setScanHistory([result, ...scanHistory])

      // Som de sucesso
      playSuccessSound()

      // Resetar após 3 segundos
      setTimeout(() => {
        setScanResult(null)
        setIsScanning(true)
      }, 3000)

    } catch (error: any) {
      console.error('Erro ao processar QR:', error)
      
      const result: ScanResult = {
        text: scannedCode,
        timestamp: new Date(),
        success: false
      }

      setScanResult(result)
      setError(error.message || 'Erro ao processar QR Code')

      // Som de erro
      playErrorSound()

      // Resetar após 3 segundos
      setTimeout(() => {
        setScanResult(null)
        setError(null)
        setIsScanning(true)
      }, 3000)
    }
  }

  const registrarPresenca = async (aulaId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('presencas')
        .insert({
          aula_id: aulaId,
          aluno_id: user.id,
          presente: true,
          data_presenca: new Date().toISOString()
        })

      if (error) throw error
    } catch (error) {
      console.error('Erro ao registrar presença:', error)
    }
  }

  const playSuccessSound = () => {
    const audio = new Audio('/sounds/success.mp3')
    audio.play().catch(() => {})
  }

  const playErrorSound = () => {
    const audio = new Audio('/sounds/error.mp3')
    audio.play().catch(() => {})
  }

  const handleError = (error: any) => {
    console.error('Erro da câmera:', error)
    setCameraError('Erro ao acessar a câmera. Verifique as permissões.')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Scanner QR</h1>
                <p className="text-sm text-gray-600">Escaneie para registrar presença</p>
              </div>
            </div>
            <QrCode className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Scanner Area */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="relative">
            {/* Câmera */}
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

                {/* Status overlay */}
                {!isScanning && scanResult && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 max-w-sm mx-4 text-center">
                      {scanResult.success ? (
                        <>
                          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" />
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Sucesso! 🎉
                          </h3>
                          <p className="text-gray-600 text-sm mb-1">
                            {scanResult.type === 'aula' ? 'Presença registrada' : 'QR Code válido'}
                          </p>
                          <p className="text-xs text-gray-500 font-mono mt-2">
                            {scanResult.text}
                          </p>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-16 h-16 text-red-600 mx-auto mb-3" />
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Erro
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {error || 'QR Code inválido'}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-square max-w-md mx-auto bg-gray-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">{cameraError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Tentar novamente
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Instruções */}
          <div className="p-4 bg-red-50 border-t border-red-100">
            <p className="text-sm text-gray-700 text-center">
              📱 Aponte a câmera para o QR Code
            </p>
          </div>
        </div>

        {/* Histórico */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">Histórico Recente</h2>
          </div>

          {scanHistory.length > 0 ? (
            <div className="space-y-3">
              {scanHistory.map((scan, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  {scan.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {scan.type === 'aula' ? '🎓 Aula' : scan.type === 'instrumento' ? '🎵 Instrumento' : 'QR Code'}
                    </p>
                    <p className="text-xs text-gray-500 font-mono truncate">
                      {scan.text}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {scan.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              Nenhum scan realizado ainda
            </p>
          )}
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
