import React from 'react';

const CentroEstudosSimples = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🎓 Centro de Estudos
          </h1>
          <p className="text-gray-600 mb-6">
            Bem-vindo ao seu centro de aprendizado musical!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-100">
              <h3 className="font-semibold text-red-800 mb-2">📚 Biblioteca</h3>
              <p className="text-red-600 text-sm">Acesse materiais de estudo</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">🎵 Instrumentos</h3>
              <p className="text-blue-600 text-sm">Escolha seu instrumento</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="font-semibold text-green-800 mb-2">📈 Progresso</h3>
              <p className="text-green-600 text-sm">Veja seu desenvolvimento</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
              <h3 className="font-semibold text-purple-800 mb-2">❓ Dúvidas</h3>
              <p className="text-purple-600 text-sm">Sistema de perguntas</p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
              <h3 className="font-semibold text-yellow-800 mb-2">🎯 Metodologias</h3>
              <p className="text-yellow-600 text-sm">Técnicas de ensino</p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
              <h3 className="font-semibold text-indigo-800 mb-2">🎬 Vídeos</h3>
              <p className="text-indigo-600 text-sm">Aulas em vídeo</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              ✅ <strong>Status:</strong> Centro de Estudos funcionando corretamente!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentroEstudosSimples;