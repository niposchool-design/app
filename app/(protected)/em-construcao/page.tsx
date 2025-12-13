
'use client'

import { Construction, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PaginaEmConstrucao() {
    const router = useRouter()

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-yellow-50 p-6 rounded-full mb-6">
                <Construction className="w-16 h-16 text-yellow-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Em Construção 🚧
            </h1>

            <p className="text-gray-600 max-w-md mb-8 text-lg">
                Esta funcionalidade está sendo preparada com muito carinho e estará disponível em breve.
            </p>

            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
                <ArrowLeft className="w-5 h-5" />
                Voltar para a página anterior
            </button>
        </div>
    )
}
