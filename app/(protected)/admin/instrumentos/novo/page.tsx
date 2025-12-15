
'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { InstrumentoForm } from '../_components/InstrumentoForm';

export default function NovoInstrumentoPage() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/instrumentos" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Novo Instrumento</h1>
                    <p className="text-gray-600">Adicione um novo instrumento à biblioteca.</p>
                </div>
            </div>

            <InstrumentoForm />
        </div>
    );
}
