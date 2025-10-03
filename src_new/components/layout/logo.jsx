import React from 'react';

/**
 * Logo - Componente de logo principal da aplicação
 * Migrado de: src/shared/components/UI/NipoLogo.jsx
 * Nova localização: src_new/components/layout/logo.jsx
 * 
 * @param {Object} props
 * @param {number} props.size - Tamanho do logo
 * @param {string} props.className - Classes CSS adicionais
 * @param {boolean} props.showText - Mostra texto ao lado do logo
 */
const Logo = ({ 
  size = 40, 
  className = "", 
  showText = true 
}) => {
  // Logo SVG simplificado - Nota Musical
  const LogoSVG = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Nota Colcheia */}
      <rect x="72" y="20" width="3" height="55" fill="#dc2626" />
      <circle cx="65" cy="70" r="8" fill="#dc2626" />
      <path d="M75 20 Q85 25 85 35 Q85 45 75 45" stroke="#dc2626" strokeWidth="2" fill="none" />
      
      {/* Caractere Japonês estilizado */}
      <path d="M25 30 L45 30 M35 25 L35 45 M30 40 L40 40" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <LogoSVG />
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-xl text-gray-800 leading-none">
            Nipo School
          </span>
          <span className="text-xs text-red-500 font-medium">
            音楽教育 • Musical Education
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;