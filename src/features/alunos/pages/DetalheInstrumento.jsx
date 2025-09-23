import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Music, Users, Volume2, Image, ArrowLeft, RefreshCw, Star, Target, Tag, User } from 'lucide-react';

import { useInstrumentosReal } from '@/shared/hooks/useInstrumentosReal';
import { instrumentDetailService } from '@/features/instrumentos/services/instrumentDetailService';
import { AdvancedAlunoLayout } from '@/shared/components/layout/AdvancedAlunoLayout';

const DetalheInstrumento = () => {
  const { instrumentoId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instrumentoCompleto, setInstrumentoCompleto] = useState(null);

  const { instrumentos: instrumentosData } = useInstrumentosReal();

  const carregarDados = useCallback(async () => {
    if (!instrumentoId) return;
    
    setLoading(true);
    setError(null);

    try {
      const resultado = await instrumentDetailService.getInstrumentoCompleto(instrumentoId);
      
      if (resultado.success) {
        setInstrumentoCompleto(resultado.data);
      } else {
        setError(resultado.error);
      }
    } catch (err) {
      setError('Erro inesperado ao carregar o instrumento.');
    } finally {
      setLoading(false);
    }
  }, [instrumentoId]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const instrumentoBasico = instrumentosData?.find(inst => inst.id.toString() === instrumentoId);
  const instrumentoInfo = instrumentoCompleto?.instrumentoDetalhado || instrumentoBasico;

  const {
    sons = [],
    midias = [],
    curiosidades = []
  } = instrumentoCompleto || {};

  if (loading) {
    return (
      <AdvancedAlunoLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center animate-pulse shadow-xl">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Carregando Instrumento</h3>
            <p className="text-base text-gray-600">Buscando todos os detalhes...</p>
          </div>
        </div>
      </AdvancedAlunoLayout>
    );
  }

  if (error || !instrumentoInfo) {
    return (
      <AdvancedAlunoLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center p-4 max-w-md">
            <div className="text-8xl mb-6">���</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instrumento não encontrado</h2>
            <p className="text-base text-gray-700 mb-8 leading-relaxed">
              {error || 'Esse instrumento não existe ou não está disponível.'}
            </p>
            <button 
              onClick={() => navigate('/alunos/biblioteca-instrumentos')} 
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              Voltar à Biblioteca
            </button>
          </div>
        </div>
      </AdvancedAlunoLayout>
    );
  }

  return (
    <AdvancedAlunoLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <button 
                    onClick={() => navigate('/alunos')} 
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Meu Painel</span>
                  </button>
                  <span>/</span>
                  <button 
                    onClick={() => navigate('/alunos/biblioteca-instrumentos')} 
                    className="hover:text-blue-600 transition-colors"
                  >
                    Instrumentos
                  </button>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">{instrumentoInfo.nome}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300">
                    <span className="text-4xl">���</span>
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-light mb-2 text-gray-900">{instrumentoInfo.nome}</h1>
                    <p className="text-gray-600 flex items-center gap-2 flex-wrap">
                      <span className="font-medium capitalize">{instrumentoInfo.categoria}</span>
                      {instrumentoInfo.origem && (
                        <>
                          <span>•</span>
                          <span className="text-sm">{instrumentoInfo.origem}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/alunos/biblioteca-instrumentos')} 
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all hover:scale-105"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Voltar</span>
                </button>
                
                <button 
                  onClick={carregarDados} 
                  disabled={loading} 
                  className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 hover:scale-105"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Atualizar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Cards de estatísticas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border-l-4 border-amber-500 text-center hover:scale-105 transition-all duration-300">
              <Volume2 className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">{sons.length}</p>
              <p className="text-sm text-gray-600">Sons Disponíveis</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border-l-4 border-purple-500 text-center hover:scale-105 transition-all duration-300">
              <Image className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">{midias.length}</p>
              <p className="text-sm text-gray-600">Mídias</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border-l-4 border-yellow-500 text-center hover:scale-105 transition-all duration-300">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">{curiosidades.length}</p>
              <p className="text-sm text-gray-600">Curiosidades</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border-l-4 border-green-500 text-center hover:scale-105 transition-all duration-300">
              <Users className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">{instrumentoInfo.total_professores || 0}</p>
              <p className="text-sm text-gray-600">Professores</p>
            </div>
          </div>

          {/* Informações do instrumento */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-blue-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <Music className="w-6 h-6 text-blue-500" />
              Sobre o {instrumentoInfo.nome}
            </h3>
            
            <div className="prose prose-gray max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-lg">
                {instrumentoInfo.descricao || `O ${instrumentoInfo.nome} é um instrumento da família ${instrumentoInfo.categoria}, conhecido por sua versatilidade e sonoridade única. É uma excelente escolha para estudantes que desejam explorar a música de forma criativa e expressiva.`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Tag className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Categoria</h4>
                <p className="text-gray-600 capitalize text-lg">{instrumentoInfo.categoria}</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Dificuldade</h4>
                <p className="text-gray-600 capitalize text-lg">{instrumentoInfo.dificuldade_aprendizado || 'Intermediária'}</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Disponibilidade</h4>
                <p className="text-gray-600 text-lg">{instrumentoInfo.disponivel_escola ? 'Disponível na escola' : 'Consultar disponibilidade'}</p>
              </div>
            </div>

            {/* Seção de interesse do aluno */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">��� Interessado em aprender?</h4>
                <p className="text-gray-700 mb-4">
                  O {instrumentoInfo.nome} é uma excelente escolha para expandir seus horizontes musicais. 
                  Entre em contato conosco para saber mais sobre aulas e disponibilidade.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Quero Aprender
                  </button>
                  <button className="px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                    Mais Informações
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdvancedAlunoLayout>
  );
};

export default DetalheInstrumento;
