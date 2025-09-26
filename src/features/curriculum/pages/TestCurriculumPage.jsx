import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TestCurriculumPage = () => {
  const { methodId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/modulos')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Módulos
          </button>
          
          <h1 className="text-4xl font-bold text-gray-800">
            Página de Teste - Metodologia: {methodId}
          </h1>
          
          <p className="text-gray-600 mt-2">
            Esta é uma página de teste para verificar se a navegação está funcionando.
          </p>
        </div>

        {/* Conteúdo de teste */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Informações da Metodologia</h2>
          <div className="space-y-4">
            <p><strong>ID da Metodologia:</strong> {methodId}</p>
            <p><strong>URL Atual:</strong> /curriculum/metodologia/{methodId}</p>
            <p><strong>Status:</strong> Página carregada com sucesso! ✅</p>
          </div>
          
          {/* Lista de metodologias disponíveis */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Metodologias Disponíveis:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'orff-schulwerk',
                'metodo-suzuki', 
                'metodo-kodaly',
                'musical-futures',
                'dalcroze-euritmia',
                'gordon-music-learning-theory',
                'waldorf-steiner',
                'berklee-contemporanea',
                'lincoln-center',
                'presto-project',
                'experiencias-brasileiras'
              ].map(slug => (
                <button
                  key={slug}
                  onClick={() => navigate(`/curriculum/metodologia/${slug}`)}
                  className={`p-3 rounded-lg text-left transition-all ${
                    slug === methodId 
                      ? 'bg-blue-100 border-2 border-blue-500 text-blue-800' 
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {slug}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCurriculumPage;