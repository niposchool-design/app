// 🎵 INSTRUMENTO DETAIL PAGE - NIPO SCHOOL
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Music, Heart, Play, BookOpen, Star } from 'lucide-react'
import { OrientalContainer } from '../../../components/oriental/OrientalContainer'
import { NipoCard } from '../../../components/ui/NipoCard'
import { NipoButton } from '../../../components/ui/NipoButton'
import { useInstrumento } from '../../instrumentos/hooks/useInstrumentos'

export const InstrumentoDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: instrumento, isLoading } = useInstrumento(id || '')

  if (isLoading) return <div className="p-8 text-center">Carregando...</div>
  if (!instrumento) return <div className="p-8 text-center">Instrumento não encontrado</div>

  return (
    <OrientalContainer title={instrumento.nome} icon={Music}>
      <NipoButton
        variant="ghost"
        onClick={() => navigate('/alunos/instrumentos')}
        className="mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar para Instrumentos
      </NipoButton>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conteúdo Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Imagem */}
          {instrumento.imagem_url && (
            <NipoCard className="p-0 overflow-hidden">
              <img
                src={instrumento.imagem_url}
                alt={instrumento.nome}
                className="w-full h-64 object-cover"
              />
            </NipoCard>
          )}

          {/* Descrição */}
          <NipoCard className="p-6">
            <h2 className="text-xl font-bold text-[#8B4513] mb-4">Sobre o Instrumento</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{instrumento.descricao}</p>
          </NipoCard>

          {/* Técnicas */}
          {instrumento.instrumento_tecnicas && instrumento.instrumento_tecnicas.length > 0 && (
            <NipoCard className="p-6">
              <h2 className="text-xl font-bold text-[#8B4513] mb-4 flex items-center">
                <BookOpen size={24} className="mr-2" />
                Técnicas
              </h2>
              <div className="space-y-3">
                {instrumento.instrumento_tecnicas.map((tecnica: any) => (
                  <div key={tecnica.id} className="border-l-4 border-[#8B4513] pl-4">
                    <h3 className="font-bold text-gray-900">{tecnica.nome}</h3>
                    <p className="text-sm text-gray-600">{tecnica.descricao}</p>
                    <span className="text-xs text-gray-500">Nível: {tecnica.nivel_dificuldade}</span>
                  </div>
                ))}
              </div>
            </NipoCard>
          )}

          {/* Mídias */}
          {instrumento.instrumento_midias && instrumento.instrumento_midias.length > 0 && (
            <NipoCard className="p-6">
              <h2 className="text-xl font-bold text-[#8B4513] mb-4 flex items-center">
                <Play size={24} className="mr-2" />
                Recursos Multimídia
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {instrumento.instrumento_midias.map((midia: any) => (
                  <div key={midia.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{midia.tipo}</span>
                      <Play size={16} className="text-[#8B4513]" />
                    </div>
                    <h4 className="font-bold text-gray-900">{midia.titulo}</h4>
                    {midia.descricao && (
                      <p className="text-sm text-gray-600 mt-1">{midia.descricao}</p>
                    )}
                  </div>
                ))}
              </div>
            </NipoCard>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <NipoCard className="p-6">
            <h3 className="text-lg font-bold text-[#8B4513] mb-4">Informações</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Categoria</p>
                <p className="font-medium">{instrumento.categoria}</p>
              </div>
              {instrumento.origem && (
                <div>
                  <p className="text-sm text-gray-600">Origem</p>
                  <p className="font-medium">{instrumento.origem}</p>
                </div>
              )}
              {instrumento.dificuldade && (
                <div>
                  <p className="text-sm text-gray-600">Dificuldade</p>
                  <p className="font-medium">{instrumento.dificuldade}</p>
                </div>
              )}
              {instrumento.popularidade && (
                <div>
                  <p className="text-sm text-gray-600">Popularidade</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < instrumento.popularidade ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </NipoCard>

          <NipoButton className="w-full">
            <Heart size={20} className="mr-2" />
            Adicionar aos Favoritos
          </NipoButton>
        </div>
      </div>
    </OrientalContainer>
  )
}

export default InstrumentoDetailPage
