// Script para verificar dados básicos
export const verificarDados = () => {
  console.log('🔍 Verificando dados básicos...');
  console.log('URL atual:', window.location.href);
  console.log('Parâmetros da URL:', window.location.pathname);
  
  // Simular ID de teste
  const testId = '1';
  console.log('🆔 ID de teste que seria usado:', testId);
};

// Para executar no console do navegador:
// verificarDados();