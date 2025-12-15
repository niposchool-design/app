/**
 * 📚 CONTEÚDOS PAGE - Área dos Professores
 * 
 * Lista todos os conteúdos criados pelo professor
 * Permite filtrar, buscar e gerenciar conteúdos
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Video, 
  BookOpen, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import { NipoCard, NipoCardBody } from '../../../components/shared/NipoCard'
import { NipoButton } from '../../../components/shared/NipoButton'

type ConteudoTipo = 'video' | 'sacada' | 'devocional' | 'material'

interface Conteudo {
  id: string
  titulo: string
  tipo: ConteudoTipo
  descricao: string
  criado_em: string
  visivel: boolean
  visualizacoes?: number
}

export const ConteudosPage: React.FC = () => {
  const [filtroTipo, setFiltroTipo] = useState<ConteudoTipo | 'todos'>('todos')
  const [busca, setBusca] = useState('')

  // Mock data - substituir por dados reais do Supabase
  const conteudos: Conteudo[] = [
    {
      id: '1',
      titulo: '5 Sacadas para Melhorar sua Aula',
      tipo: 'sacada',
      descricao: 'Dicas práticas para tornar suas aulas mais dinâmicas',
      criado_em: '2024-12-01',
      visivel: true,
      visualizacoes: 45
    },
    {
      id: '2',
      titulo: 'Introdução ao Shamisen',
      tipo: 'video',
      descricao: 'Vídeo aula sobre técnicas básicas do Shamisen',
      criado_em: '2024-11-28',
      visivel: true,
      visualizacoes: 78
    },
    {
      id: '3',
      titulo: 'Devocional Semanal - Louvor e Música',
      tipo: 'devocional',
      descricao: 'Reflexão sobre o papel da música no louvor',
      criado_em: '2024-12-03',
      visivel: true,
      visualizacoes: 32
    }
  ]

  const getIconByType = (tipo: ConteudoTipo) => {
    switch (tipo) {
      case 'video':
        return <Video className="w-5 h-5" />
      case 'sacada':
        return <FileText className="w-5 h-5" />
      case 'devocional':
        return <BookOpen className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getColorByType = (tipo: ConteudoTipo) => {
    switch (tipo) {
      case 'video':
        return 'bg-red-100 text-red-800'
      case 'sacada':
        return 'bg-blue-100 text-blue-800'
      case 'devocional':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const conteudosFiltrados = conteudos.filter(conteudo => {
    const matchTipo = filtroTipo === 'todos' || conteudo.tipo === filtroTipo
    const matchBusca = conteudo.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                       conteudo.descricao.toLowerCase().includes(busca.toLowerCase())
    return matchTipo && matchBusca
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 to-cherry-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              📚 Meus Conteúdos
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie seus materiais, vídeos e recursos educacionais
            </p>
          </div>
          <Link to="/professores/novo">
            <NipoButton variant="primary">
              <Plus className="w-5 h-5 mr-2" />
              Novo Conteúdo
            </NipoButton>
          </Link>
        </div>

        {/* Filtros e Busca */}
        <NipoCard>
          <NipoCardBody>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Busca */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar conteúdos..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filtro por Tipo */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value as ConteudoTipo | 'todos')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos os Tipos</option>
                  <option value="video">Vídeos</option>
                  <option value="sacada">Sacadas</option>
                  <option value="devocional">Devocionais</option>
                  <option value="material">Materiais</option>
                </select>
              </div>
            </div>
          </NipoCardBody>
        </NipoCard>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
            <p className="text-sm text-gray-600">Total de Conteúdos</p>
            <p className="text-2xl font-bold text-gray-900">{conteudos.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-500">
            <p className="text-sm text-gray-600">Vídeos</p>
            <p className="text-2xl font-bold text-gray-900">
              {conteudos.filter(c => c.tipo === 'video').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
            <p className="text-sm text-gray-600">Devocionais</p>
            <p className="text-2xl font-bold text-gray-900">
              {conteudos.filter(c => c.tipo === 'devocional').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
            <p className="text-sm text-gray-600">Total de Visualizações</p>
            <p className="text-2xl font-bold text-gray-900">
              {conteudos.reduce((acc, c) => acc + (c.visualizacoes || 0), 0)}
            </p>
          </div>
        </div>

        {/* Lista de Conteúdos */}
        <div className="space-y-4">
          {conteudosFiltrados.length === 0 ? (
            <NipoCard>
              <NipoCardBody>
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhum conteúdo encontrado
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {busca || filtroTipo !== 'todos' 
                      ? 'Tente ajustar os filtros ou busca'
                      : 'Comece criando seu primeiro conteúdo!'}
                  </p>
                  {!busca && filtroTipo === 'todos' && (
                    <Link to="/professores/novo">
                      <NipoButton variant="primary">
                        <Plus className="w-5 h-5 mr-2" />
                        Criar Primeiro Conteúdo
                      </NipoButton>
                    </Link>
                  )}
                </div>
              </NipoCardBody>
            </NipoCard>
          ) : (
            conteudosFiltrados.map((conteudo) => (
              <NipoCard key={conteudo.id}>
                <NipoCardBody>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${getColorByType(conteudo.tipo)}`}>
                        {getIconByType(conteudo.tipo)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {conteudo.titulo}
                          </h3>
                          {!conteudo.visivel && (
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                              Oculto
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {conteudo.descricao}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Criado em {new Date(conteudo.criado_em).toLocaleDateString('pt-BR')}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {conteudo.visualizacoes || 0} visualizações
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={`/professores/conteudos/${conteudo.id}`}>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                      </Link>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </NipoCardBody>
              </NipoCard>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ConteudosPage
