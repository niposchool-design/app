// 🎵 INSTRUMENTOS PAGE - NIPO SCHOOL
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Music, Heart, Search, Filter } from 'lucide-react'
import { OrientalContainer } from '../../../components/oriental/OrientalContainer'
import { NipoCard } from '../../../components/ui/NipoCard'
import { InstrumentoCard } from '../components/InstrumentoCard'
import { useInstrumentos } from '../../instrumentos/hooks/useInstrumentos'

export const InstrumentosPage = () => {
  const navigate = useNavigate()
  const { data: instrumentos, isLoading } = useInstrumentos()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState<string | undefined>()

  const categorias = ['Cordas', 'Percussão', 'Sopro', 'Teclado']

  const instrumentosFiltrados = instrumentos?.filter(inst => {
    const matchSearch = !searchTerm || 
      inst.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchCategoria = !categoriaFiltro || inst.categoria === categoriaFiltro
    
    return matchSearch && matchCategoria
  })

  return (
    <OrientalContainer title="Instrumentos Musicais" icon={Music}>
      {/* Busca e Filtros */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar instrumentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setCategoriaFiltro(undefined)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !categoriaFiltro 
                ? 'bg-[#8B4513] text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Todos
          </button>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaFiltro(cat)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                categoriaFiltro === cat
                  ? 'bg-[#8B4513] text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Instrumentos */}
      {isLoading ? (
        <div className="text-center py-8">Carregando instrumentos...</div>
      ) : instrumentosFiltrados?.length === 0 ? (
        <NipoCard className="p-8 text-center">
          <Music size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Nenhum instrumento encontrado</p>
        </NipoCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instrumentosFiltrados?.map(instrumento => (
            <InstrumentoCard
              key={instrumento.id}
              instrumento={instrumento}
              onViewDetails={(id) => navigate(`/alunos/instrumentos/${id}`)}
            />
          ))}
        </div>
      )}
    </OrientalContainer>
  )
}
