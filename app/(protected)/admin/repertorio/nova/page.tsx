
import { RepertorioForm } from '../_components/RepertorioForm'
import { getCategoriasRepertorio } from '@/src/lib/supabase/queries/repertorio'

export default async function NovaMusicaPage() {
    // Fetch categories for the dropdown
    const categorias = await getCategoriasRepertorio()

    // Transform to simple array for the form
    const categoriasSimple = categorias.map(c => ({
        id: c.id,
        nome: c.nome
    }))

    return (
        <div className="p-6">
            <RepertorioForm categorias={categoriasSimple} />
        </div>
    )
}
