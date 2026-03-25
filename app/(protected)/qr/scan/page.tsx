'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { QRScanner } from '@/components/qr/QRScanner'
import { QrCode, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function QRScanPage() {
  const router = useRouter()
  const [result, setResult] = useState<{ type: string; message: string } | null>(null)

  const handleScan = useCallback((data: string) => {
    try {
      const url = new URL(data)
      const origin = typeof window !== 'undefined' ? window.location.origin : ''

      // Verify it's a Nipo School URL
      if (url.origin === origin) {
        setResult({
          type: 'success',
          message: `Redirecionando para ${url.pathname}...`,
        })
        // Navigate to the scanned path
        setTimeout(() => router.push(url.pathname), 800)
      } else {
        setResult({
          type: 'warning',
          message: `QR externo: ${data}`,
        })
      }
    } catch {
      // Not a URL - could be plain text identifier
      setResult({
        type: 'info',
        message: `Código lido: ${data}`,
      })
    }
  }, [router])

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <QrCode className="w-6 h-6 text-gray-700" />
          Escanear QR Code
        </h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <p className="text-sm text-gray-600">
          Use a câmera para escanear QR codes de presença, materiais ou desafios.
        </p>

        <QRScanner
          onScan={handleScan}
          instruction="Aponte para o QR Code da aula"
        />

        {result && (
          <div className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
            result.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : result.type === 'warning'
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}>
            {result.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            <p>{result.message}</p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 space-y-2">
        <p className="font-medium text-gray-700">Como usar:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>QR de presença: redireciona para registrar sua presença na aula</li>
          <li>QR de materiais: abre a biblioteca de recursos da aula</li>
          <li>QR de desafio: inicia um desafio ou atividade orientada</li>
        </ul>
      </div>
    </div>
  )
}
