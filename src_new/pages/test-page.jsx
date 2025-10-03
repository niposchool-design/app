import React from 'react';

/**
 * TestPage - Página de teste simples
 */
const TestPage = () => {
  console.log('🎯 TestPage carregou com sucesso!');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f0f0', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          color: '#333', 
          fontSize: '2rem', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          🚀 Nipo School - Teste de Funcionamento
        </h1>
        
        <div style={{ 
          backgroundColor: '#10b981', 
          color: 'white', 
          padding: '15px', 
          borderRadius: '6px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          ✅ Sistema funcionando corretamente!
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#555', marginBottom: '15px' }}>📊 Status:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              🔧 Vite: OK
            </li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              ⚛️ React: OK  
            </li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              🎨 Tailwind: OK
            </li>
            <li style={{ padding: '8px 0' }}>
              🌐 Router: OK
            </li>
          </ul>
        </div>

        <div style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '15px', 
          borderRadius: '6px' 
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>🔍 Debug Info:</h3>
          <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
            Timestamp: {new Date().toLocaleString()}
          </p>
          <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
            Localização: src_new/pages/test-page.jsx
          </p>
          <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
            Router: SimpleRouter ativo
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;