import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">
        
        {/* Logo / Branding */}
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <Image 
              src="/logo.svg" 
              alt="Nipo School" 
              width={240} 
              height={60}
              priority
            />
          </div>
          <p className="text-lg text-gray-600 max-w-sm mx-auto">
            Sua jornada no aprendizado da cultura e música japonesa começa aqui.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link 
            href="/login"
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-red-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Entrar na Plataforma
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link 
            href="/register"
            className="block w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center"
          >
            Criar Nova Conta
          </Link>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Nipo School. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}
