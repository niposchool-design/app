import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * LandingPage - Página inicial do sistema
 * Localização: src_new/pages/landing.jsx
 */
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-red-600">
                🎵 Nipo School
              </div>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Sistema Oriental de
            <span className="text-red-600 block">Ensino Musical</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma completa para gestão de ensino musical com metodologias orientais.
            Conectando alunos, professores e administradores em uma experiência única.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Acessar Sistema
            </button>
            <button
              className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Saiba Mais
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Para cada tipo de usuário
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Alunos */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Alunos</h3>
              <p className="text-gray-600 mb-4">
                Acesse suas aulas, acompanhe seu progresso e pratique com materiais exclusivos.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Aulas online e presenciais</li>
                <li>• Acompanhamento de progresso</li>
                <li>• Material de apoio</li>
                <li>• Agenda personalizada</li>
              </ul>
            </div>

            {/* Professores */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professores</h3>
              <p className="text-gray-600 mb-4">
                Gerencie suas turmas, crie conteúdo e acompanhe o desenvolvimento dos alunos.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Gestão de turmas</li>
                <li>• Criação de conteúdo</li>
                <li>• Avaliações e feedback</li>
                <li>• Relatórios de progresso</li>
              </ul>
            </div>

            {/* Administradores */}
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Administradores</h3>
              <p className="text-gray-600 mb-4">
                Controle total do sistema, usuários e relatórios gerenciais completos.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Gestão de usuários</li>
                <li>• Relatórios gerenciais</li>
                <li>• Configurações do sistema</li>
                <li>• Analytics avançados</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Faça login e acesse seu dashboard personalizado baseado no seu perfil.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Entrar Agora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Nipo School - Sistema Oriental de Ensino Musical
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;