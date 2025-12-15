import React from 'react';

export function TestePage() {
  return (
    <div style={{
      background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        fontSize: '72px',
        fontWeight: 'bold',
        textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        🚨 TESTE VISUAL MÁXIMO 🚨
      </h1>
      
      <div style={{
        background: 'yellow',
        color: 'black',
        padding: '30px',
        borderRadius: '20px',
        fontSize: '36px',
        fontWeight: 'bold',
        border: '5px solid red',
        boxShadow: '0 0 20px rgba(255,255,0,0.8)',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        SE VOCÊ VÊ ISTO, AS MUDANÇAS FUNCIONAM!
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.2)',
        padding: '20px',
        borderRadius: '15px',
        fontSize: '24px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)'
      }}>
        Página de teste criada para verificar se as modificações<br/>
        no código estão sendo refletidas no navegador
      </div>
    </div>
  );
}

export default TestePage;