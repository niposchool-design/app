
import { RepertorioForm } from '../../_components/RepertorioForm'
import { getCategoriasRepertorio, getRepertorioById } from '@/src/lib/supabase/queries/repertorio'
import { notFound } from 'next/navigation'

interface PageProps {
    params: {
        id: string
    }
}

export default async function EditarMusicaPage({ params }: PageProps) {
    const [repertorio, categorias] = await Promise.all([
        getRepertorioById(params.id),
        getCategoriasRepertorio()
    ])

    if (!repertorio) {
        notFound()
    }

    const categoriasSimple = categorias.map(c => ({
        id: c.id,
        nome: c.nome
    }))

    return (
        <div className="p-6">
            <RepertorioForm initialData={repertorio as any} categorias={categoriasSimple} />
        </div>
    )
}
