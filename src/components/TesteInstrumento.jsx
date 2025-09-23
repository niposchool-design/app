import React, { useEffect } from 'react';
import { instrumentDetailService } from '../features/instrumentos/services/instrumentDetailService';

const TesteInstrumento = () => {
  useEffect(() => {
    const testar = async () => {
      console.log('🧪 Iniciando teste de instrumento...');
      
      // Testar com ID 1
      const resultado = await instrumentDetailService.getInstrumentoCompleto('1');
      console.log('📋 Resultado do teste:', resultado);
      
      // Testar com outros IDs se o primeiro não funcionar
      for (let i = 2; i <= 5; i++) {
        const teste = await instrumentDetailService.getInstrumentoCompleto(i.toString());
        console.log(`📋 Teste ID ${i}:`, teste.success ? 'SUCESSO' : 'FALHOU');
      }
    };
    
    testar();
  }, []);
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de Instrumento</h1>
      <p>Verifique o console para ver os resultados dos testes.</p>
    </div>
  );
};

export default TesteInstrumento;