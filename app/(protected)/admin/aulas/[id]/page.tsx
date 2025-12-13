
import { getAulaById } from '@/src/lib/supabase/queries/aulas';
import { AulaForm } from '../_components/AulaForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditarAulaPage({ params }: { params: { id: string } }) {
    const aula = await getAulaById(params.id);

    if (!aula) {
        notFound();
    }

    // Mapear dados para o formato esperado pelo form (tratamento de datas e nulos)
    const aulaData = {
        id: aula.id,
        numero: aula.numero,
        titulo: aula.titulo,
        data_programada: aula.data_programada,
        objetivo_didatico: aula.objetivo_didatico || '',
        resumo_atividades: aula.resumo_atividades || '',
        nivel: aula.nivel || 'iniciante',
        formato: aula.formato || 'presencial',
        status: aula.status || 'rascunho',
    };

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
                <h1 className="text-3xl font-bold text-gray-900">Editar Aula {aula.numero}</h1>
                <p className="text-gray-600">Atualize as informações desta aula</p>
            </div>

            <AulaForm initialData={aulaData} isEditing={true} />
        </div>
    );
}
