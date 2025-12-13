
import { AulaForm } from '../_components/AulaForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NovaAulaPage() {
    return (
        <div className="p-6 lg:p-8 max-w-5xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/aulas"
                    className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Voltar para lista
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Nova Aula</h1>
                <p className="text-gray-600">Adicione uma nova aula ao cronograma Nipo School</p>
            </div>

            <AulaForm />
        </div>
    );
}
