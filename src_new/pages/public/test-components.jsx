import React from 'react';
import { Search, User } from 'lucide-react';

// ✅ TESTE - Imports da nova estrutura
import { Button, Input, QRGenerator } from '@new/components/ui';
import { Header, Logo } from '@new/components/layout';

/**
 * TestPage - Página para testar componentes da nova estrutura
 * Localização: src_new/pages/public/test-components.jsx
 * 
 * Esta página será removida após validação completa
 */
const TestComponentsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Testando Header */}
      <Header showVersion={true} />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          
          {/* Título */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🧪 Teste dos Novos Componentes
            </h1>
            <p className="text-gray-600">
              Validação da nova estrutura de componentes - FASE 2
            </p>
          </div>

          {/* Testando Logo */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Logo Component</h2>
            <div className="space-y-4">
              <Logo showText={true} />
              <Logo showText={false} size={60} />
            </div>
          </div>

          {/* Testando Buttons */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Button Component</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button loading={true}>Loading...</Button>
              <Button disabled={true}>Disabled</Button>
            </div>
          </div>

          {/* Testando Inputs */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Input Component</h2>
            <div className="space-y-4 max-w-md">
              <Input 
                label="Nome completo"
                placeholder="Digite seu nome"
                required
              />
              <Input 
                label="Email"
                type="email"
                placeholder="seu@email.com"
                icon={<User className="w-4 h-4" />}
              />
              <Input 
                label="Buscar"
                placeholder="Buscar algo..."
                icon={<Search className="w-4 h-4" />}
              />
              <Input 
                label="Campo com erro"
                placeholder="Campo inválido"
                error="Este campo é obrigatório"
              />
            </div>
          </div>

          {/* Testando QR Generator */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">QR Generator Component</h2>
            <div className="flex justify-center">
              <QRGenerator 
                value="https://niposchool.com/test"
                size={150}
              />
            </div>
          </div>

          {/* Status da Migração */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-green-800 font-semibold mb-2">
              ✅ Status da FASE 2
            </h3>
            <ul className="text-green-700 space-y-1 text-sm">
              <li>✅ Componentes UI básicos migrados</li>
              <li>✅ Barrel exports funcionando</li>
              <li>✅ Aliases @new/* configurados</li>
              <li>✅ Sistema antigo mantido funcionando</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestComponentsPage;