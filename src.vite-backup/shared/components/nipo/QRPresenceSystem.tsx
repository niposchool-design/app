/**
 * 📱 QR PRESENCE SYSTEM - Sistema QR de Presença Japonês
 * 
 * Componente para sistema de presença por QR code
 * com design japonês e funcionalidade real-time
 */

import React, { useState, useEffect } from 'react'
import { QrCode, Check, Clock, Users, AlertCircle, Smartphone } from 'lucide-react'
import { NipoCard, NipoCardBody } from '../shared/NipoCard'
import { NipoButton } from '../shared/NipoButton'

interface QRPresenceSystemProps {
  aulaId: string
  professorId?: string
  isStudent?: boolean
  className?: string
}

interface PresenceData {
  qrCode: string
  studentsPresent: number
  totalStudents: number
  isActive: boolean
  timeRemaining: number
}

export const QRPresenceSystem: React.FC<QRPresenceSystemProps> = ({
  aulaId,
  professorId,
  isStudent = false,
  className = ''
}) => {
  const [presenceData, setPresenceData] = useState<PresenceData>({
    qrCode: '',
    studentsPresent: 0,
    totalStudents: 15,
    isActive: false,
    timeRemaining: 0
  })
  
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle')
  const [userPresent, setUserPresent] = useState(false)

  // Mock data - em produção conectará com Supabase
  useEffect(() => {
    const mockData: PresenceData = {
      qrCode: `nipo-school-presence-${aulaId}-${Date.now()}`,
      studentsPresent: 8,
      totalStudents: 15,
      isActive: true,
      timeRemaining: 180 // 3 minutos
    }
    setPresenceData(mockData)
  }, [aulaId])

  // Timer para QR code ativo
  useEffect(() => {
    if (presenceData.isActive && presenceData.timeRemaining > 0) {
      const timer = setInterval(() => {
        setPresenceData(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }))
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [presenceData.isActive, presenceData.timeRemaining])

  const handleGenerateQR = () => {
    setPresenceData(prev => ({
      ...prev,
      isActive: true,
      timeRemaining: 300, // 5 minutos
      qrCode: `nipo-school-presence-${aulaId}-${Date.now()}`
    }))
  }

  const handleScanQR = () => {
    setScanStatus('scanning')
    
    // Simula processo de scan
    setTimeout(() => {
      setScanStatus('success')
      setUserPresent(true)
      setPresenceData(prev => ({
        ...prev,
        studentsPresent: prev.studentsPresent + 1
      }))
    }, 2000)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Professor View - Geração de QR */}
      {!isStudent && (
        <NipoCard title="出席 Sistema de Presença QR">
          <NipoCardBody>
            <div className="space-y-4">
              {/* Status da presença */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-matcha-50 to-matcha-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-matcha-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {presenceData.studentsPresent}/{presenceData.totalStudents} presentes
                    </p>
                    <p className="text-sm text-gray-600">
                      {((presenceData.studentsPresent / presenceData.totalStudents) * 100).toFixed(0)}% presença
                    </p>
                  </div>
                </div>
                
                {presenceData.isActive && (
                  <div className="flex items-center gap-2 text-matcha-600">
                    <Clock className="w-5 h-5" />
                    <span className="font-mono text-lg font-bold">
                      {formatTime(presenceData.timeRemaining)}
                    </span>
                  </div>
                )}
              </div>

              {/* QR Code Display */}
              {presenceData.isActive ? (
                <div className="text-center space-y-4">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-matcha-200 inline-block">
                    <div className="w-48 h-48 bg-gradient-to-br from-matcha-100 to-matcha-200 rounded-xl flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-matcha-600" />
                    </div>
                    <p className="mt-4 text-sm text-gray-600 font-mono">
                      {presenceData.qrCode}
                    </p>
                  </div>
                  
                  <div className="bg-zen-50 p-4 rounded-xl">
                    <p className="text-zen-700 text-sm">
                      QR Code ativo por mais {formatTime(presenceData.timeRemaining)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                    <QrCode className="w-24 h-24 text-gray-400" />
                  </div>
                  
                  <NipoButton 
                    onClick={handleGenerateQR}
                    variant="primary"
                    leftIcon={<QrCode className="w-5 h-5" />}
                  >
                    Gerar QR de Presença
                  </NipoButton>
                </div>
              )}
            </div>
          </NipoCardBody>
        </NipoCard>
      )}

      {/* Student View - Scanner */}
      {isStudent && (
        <NipoCard title="📱 Confirmar Presença">
          <NipoCardBody>
            <div className="text-center space-y-4">
              {!userPresent ? (
                <>
                  <div className={`w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full flex items-center justify-center ${
                    scanStatus === 'scanning' 
                      ? 'bg-sakura-100 animate-zen-breath' 
                      : 'bg-gray-100'
                  }`}>
                    <Smartphone className={`w-12 h-12 sm:w-16 sm:h-16 ${
                      scanStatus === 'scanning' ? 'text-sakura-600' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  {scanStatus === 'idle' && (
                    <>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">
                        Escaneie o QR Code da aula
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 px-4">
                        Aponte a câmera para o QR code exibido pelo professor
                      </p>
                      <NipoButton 
                        onClick={handleScanQR}
                        variant="primary"
                        leftIcon={<QrCode className="w-4 h-4 sm:w-5 sm:h-5" />}
                        className="w-full sm:w-auto"
                      >
                        Escanear QR Code
                      </NipoButton>
                    </>
                  )}
                  
                  {scanStatus === 'scanning' && (
                    <>
                      <h3 className="text-base sm:text-lg font-medium text-sakura-700">
                        <span className="block sm:hidden">Escaneando...</span>
                        <span className="hidden sm:block">スキャン中... Escaneando...</span>
                      </h3>
                      <p className="text-sm sm:text-base text-sakura-600 px-4">
                        Mantenha a câmera focada no QR code
                      </p>
                    </>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-medium text-green-700">
                      <span className="block sm:hidden">Presença Confirmada!</span>
                      <span className="hidden sm:block">出席確認 Presença Confirmada!</span>
                    </h3>
                    <p className="text-sm sm:text-base text-green-600">
                      Sua presença foi registrada com sucesso
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-3 sm:p-4 rounded-xl">
                    <p className="text-green-700 text-xs sm:text-sm">
                      ✓ Registrado às {new Date().toLocaleTimeString('pt-BR')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </NipoCardBody>
        </NipoCard>
      )}
    </div>
  )
}