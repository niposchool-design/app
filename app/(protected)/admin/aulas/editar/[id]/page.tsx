
import { AulaForm } from '../../_components/AulaForm';
import { getAulaById } from '@/src/lib/supabase/queries/aulas';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
    params: {
        id: string
    }
}

export default async function EditarAulaPage({ params }: PageProps) {
    const aula = await getAulaById(params.id);

    if (!aula) {
        notFound();
    }

    // Adaptação dos dados para o formato que o form espera, se necessário
    // Como AulaData é uma interface local no form e pode divergir ligeiramente do tipo do banco, 
    // garantimos a conversão segura aqui.

    // Convertendo dados do banco para o formato do form
    const initialData = {
        id: aula.id,
        numero: aula.numero,
        titulo: aula.titulo,
        data_programada: aula.data_programada || '',
        objetivo_didatico: aula.objetivo_didatico || '',
        resumo_atividades: aula.resumo_atividades || '',
        nivel: aula.nivel || 'iniciante',
        formato: aula.formato || 'presencial',
        status: aula.status || 'rascunho'
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
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900">Editar Aula</h1>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">
                        #{aula.numero}
                    </span>
                </div>
                <p className="text-gray-600 mt-1">Atualize as informações e o conteúdo didático.</p>
            </div>

            <AulaForm initialData={initialData} isEditing={true} />
        </div>
    );
}
