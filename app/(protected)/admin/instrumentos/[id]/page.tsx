
import { getInstrumentoById } from '@/src/lib/supabase/queries/instrumentos';
import { InstrumentoForm } from '../_components/InstrumentoForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditInstrumentoPage({ params }: PageProps) {
    const { id } = await params;
    const instrumento = await getInstrumentoById(id);

    if (!instrumento) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/instrumentos" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Editar Instrumento</h1>
                    <p className="text-gray-600">Gerenciar informações e conteúdo do instrumento.</p>
                </div>
            </div>

            <InstrumentoForm initialData={instrumento} />
        </div>
    );
}
