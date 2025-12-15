/**
 * 🎵 PÁGINA DE INSTRUMENTOS - NIPO SCHOOL
 * 
 * Página para visualizar e gerenciar a biblioteca de instrumentos
 */

import React, { useState, useEffect } from 'react'
import { NipoCard, NipoCardBody, NipoCardStat } from '../../../../components/shared/NipoCard'
import { NipoButton } from '../../../../components/shared/NipoButton'
import { NipoInput } from '../../../../components/shared/NipoInput'
import { Badge } from '../../../../components/ui/Badge'
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/Card'
import { Button } from '../../../../components/ui/Button'
import { Input } from '../../../../components/ui/Input'
import { supabase } from '../../../../lib/supabase/client'
import {
  Music,
  Search,
  Filter,
  Heart,
  Star,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  Plus,
  BookOpen
} from 'lucide-react'

interface Categoria {
  id: string
  nome: string
  descricao?: string
  icone?: string
  ordem_exibicao?: number
}

interface Instrumento {
  id: string
  nome: string
  categoria: string
  descricao?: string
  nivel_dificuldade?: 'iniciante' | 'intermediario' | 'avancado'
  imagem_url?: string
  video_intro_url?: string
}

export default function InstrumentosPage() {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')

  // Carregar dados
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Carregar categorias
      const { data: categoriasData, error: categoriasError } = await supabase
        .from('categorias_instrumentos')
        .select('*')
        .order('ordem_exibicao', { ascending: true })

      if (categoriasError) {
        console.error('Erro ao carregar categorias:', categoriasError)
      } else {
        setCategorias(categoriasData || [])
      }

      // Carregar instrumentos
      const { data: instrumentosData, error: instrumentosError } = await supabase
        .from('instrumentos')
        .select('*')
        .order('nome', { ascending: true })

      if (instrumentosError) {
        console.error('Erro ao carregar instrumentos:', instrumentosError)
      } else {
        setInstrumentos(instrumentosData || [])
      }

    } catch (error) {
      console.error('Erro geral:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filtrar instrumentos
  const filteredInstrumentos = instrumentos.filter(instrumento => {
    const matchesSearch = instrumento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instrumento.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || instrumento.categoria === selectedCategory
    
    const matchesLevel = selectedLevel === 'all' || instrumento.nivel_dificuldade === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const InstrumentCard = ({ instrumento }: { instrumento: Instrumento }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                {instrumento.nome}
              </CardTitle>
              <p className="text-sm text-gray-500">{instrumento.categoria}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {instrumento.nivel_dificuldade && (
              <Badge variant="secondary">{instrumento.nivel_dificuldade}</Badge>
            )}
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {instrumento.descricao && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {instrumento.descricao}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>15 alunos</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <BookOpen className="w-4 h-4 mr-1" />
              Saiba Mais
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Começar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const CategoryCard = ({ categoria }: { categoria: Categoria }) => {
    const instrumentosDaCategoria = instrumentos.filter(i => i.categoria === categoria.nome)
    
    return (
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            onClick={() => setSelectedCategory(categoria.nome)}>
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
            {categoria.nome}
          </h3>
          <p className="text-sm text-gray-500 mb-3">{categoria.descricao}</p>
          <Badge variant="secondary" className="text-xs">
            {instrumentosDaCategoria.length} instrumentos
          </Badge>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando instrumentos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              🎵 Biblioteca de Instrumentos
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Descubra a rica tradição musical japonesa e explore instrumentos únicos
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Pesquise por instrumentos, categorias ou nível..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-purple-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Todas as Categorias</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nome}>
                {categoria.nome}
              </option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Todos os Níveis</option>
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSelectedCategory('all')
              setSelectedLevel('all')
              setSearchTerm('')
            }}
          >
            Limpar Filtros
          </Button>
        </div>

        {/* Categorias em Destaque */}
        {searchTerm === '' && selectedCategory === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore por Categoria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categorias.map((categoria) => (
                <CategoryCard key={categoria.id} categoria={categoria} />
              ))}
            </div>
          </div>
        )}

        {/* Lista de Instrumentos */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'Todos os Instrumentos' : `Instrumentos - ${selectedCategory}`}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredInstrumentos.length} instrumento{filteredInstrumentos.length !== 1 ? 's' : ''} encontrado{filteredInstrumentos.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {filteredInstrumentos.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum instrumento encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou termos de busca</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstrumentos.map((instrumento) => (
              <InstrumentCard key={instrumento.id} instrumento={instrumento} />
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas da Biblioteca</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{instrumentos.length}</div>
              <div className="text-sm text-gray-500">Instrumentos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{categorias.length}</div>
              <div className="text-sm text-gray-500">Categorias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {instrumentos.filter(i => i.nivel_dificuldade === 'iniciante').length}
              </div>
              <div className="text-sm text-gray-500">Para Iniciantes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">24</div>
              <div className="text-sm text-gray-500">Professores</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}