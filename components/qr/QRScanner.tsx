'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import jsQR from 'jsqr'
import { Camera, CameraOff, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'

interface QRScannerProps {
  /** Called when a QR code is successfully scanned */
  onScan: (data: string) => void
  /** Optional: auto-close after scan */
  autoClose?: boolean
  /** Optional: restrict to specific URL pattern */
  urlPattern?: RegExp
  /** Optional: custom instruction text */
  instruction?: string
}

type ScanState = 'idle' | 'scanning' | 'success' | 'error'

export function QRScanner({
  onScan,
  autoClose = false,
  urlPattern,
  instruction = 'Aponte a câmera para o QR Code',
}: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef<number>(0)
  const [state, setState] = useState<ScanState>('idle')
  const [scannedData, setScannedData] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment')

  const stopCamera = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = 0
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }, [])

  const startCamera = useCallback(async () => {
    try {
      setError('')
      setState('scanning')

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
    } catch (err: any) {
      console.error('Camera error:', err)
      setState('error')
      if (err.name === 'NotAllowedError') {
        setError('Permissão de câmera negada. Habilite nas configurações do navegador.')
      } else if (err.name === 'NotFoundError') {
        setError('Nenhuma câmera encontrada neste dispositivo.')
      } else {
        setError('Erro ao acessar câmera: ' + (err.message || 'desconhecido'))
      }
    }
  }, [facingMode])

  // QR scanning loop
  useEffect(() => {
    if (state !== 'scanning') return

    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let active = true

    function scan() {
      if (!active || !video || !canvas || !ctx) return

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        })

        if (code?.data) {
          // Validate URL pattern if provided
          if (urlPattern && !urlPattern.test(code.data)) {
            // Keep scanning - QR doesn't match expected pattern
          } else {
            setState('success')
            setScannedData(code.data)
            onScan(code.data)
            stopCamera()
            return
          }
        }
      }

      animationRef.current = requestAnimationFrame(scan)
    }

    scan()

    return () => {
      active = false
    }
  }, [state, onScan, urlPattern, stopCamera])

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera()
  }, [stopCamera])

  const toggleCamera = () => {
    stopCamera()
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'))
  }

  // Re-start when facingMode changes
  useEffect(() => {
    if (state === 'scanning') {
      startCamera()
    }
  }, [facingMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    setScannedData('')
    setError('')
    setState('idle')
  }

  return (
    <div className="space-y-4">
      {/* Viewfinder */}
      <div className="relative bg-black rounded-2xl overflow-hidden aspect-[4/3]">
        {state === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">
            <Camera className="w-16 h-16 text-gray-400" />
            <p className="text-sm text-gray-400">{instruction}</p>
            <button
              onClick={startCamera}
              className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Abrir Câmera
            </button>
          </div>
        )}

        {state === 'scanning' && (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            {/* Scanning overlay with crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-2 border-white/60 rounded-2xl relative">
                <div className="absolute -top-0.5 -left-0.5 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                <div className="absolute -top-0.5 -right-0.5 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
                <div className="absolute -bottom-0.5 -left-0.5 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
                <div className="absolute -bottom-0.5 -right-0.5 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />
                {/* Scanning line animation */}
                <div className="absolute left-2 right-2 h-0.5 bg-emerald-400 animate-pulse top-1/2 -translate-y-1/2 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
            </div>
            {/* Controls */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
              <button
                onClick={toggleCamera}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                title="Alternar câmera"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => { stopCamera(); setState('idle') }}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                title="Parar câmera"
              >
                <CameraOff className="w-5 h-5" />
              </button>
            </div>
          </>
        )}

        {state === 'success' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-3 bg-emerald-900/80">
            <CheckCircle2 className="w-16 h-16 text-emerald-400" />
            <p className="text-lg font-bold">QR Code lido!</p>
            <p className="text-sm text-emerald-200 max-w-xs text-center break-all px-4">
              {scannedData}
            </p>
            {!autoClose && (
              <button
                onClick={reset}
                className="mt-2 px-4 py-2 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                Escanear outro
              </button>
            )}
          </div>
        )}

        {state === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-3 bg-red-900/80">
            <XCircle className="w-16 h-16 text-red-400" />
            <p className="text-sm text-red-200 max-w-xs text-center px-4">{error}</p>
            <button
              onClick={reset}
              className="mt-2 px-4 py-2 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
