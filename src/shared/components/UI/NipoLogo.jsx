import React from 'react';

/**
 * 🎵 Logo Oficial Nipo School - Nota Colcheia Vencedora
 * Logo real vencedor da votação da comunidade
 * URL: https://eehidnwlwrzqzgytbfsd.supabase.co/storage/v1/object/public/logos/logo_colcheia.png
 */
const NipoLogo = ({ 
  size = 40, 
  className = "", 
  showText = true,
  fallbackColor = "#2563eb" 
}) => {

  // Fallback SVG caso não tenha logo vencedor
  const FallbackLogo = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Nota Colcheia SVG */}
      <rect
        x="72"
        y="20"
        width="3"
        height="55"
        fill={fallbackColor}
        rx="1.5"
      />
      
      <ellipse
        cx="65"
        cy="68"
        rx="12"
        ry="8"
        fill={fallbackColor}
        transform="rotate(-20 65 68)"
      />
      
      <path
        d="M75 20 C85 22, 90 28, 88 35 C86 42, 82 45, 75 43 L75 20 Z"
        fill={fallbackColor}
      />
    </svg>
  );

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Real da Nota Colcheia - Vencedor da Votação */}
      <img
        src="https://eehidnwlwrzqzgytbfsd.supabase.co/storage/v1/object/public/logos/logo_colcheia.png"
        alt="Nipo School - Logo Vencedor Colcheia"
        width={size}
        height={size}
        className="flex-shrink-0 object-contain"
        style={{ 
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' 
        }}
        onError={(e) => {
          // Em caso de erro, substitui pelo fallback SVG
          e.target.style.display = 'none';
          const fallbackDiv = document.createElement('div');
          fallbackDiv.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="${fallbackColor}">
              <rect x="72" y="20" width="3" height="55" rx="1.5"/>
              <ellipse cx="65" cy="68" rx="12" ry="8" transform="rotate(-20 65 68)"/>
              <path d="M75 20 C85 22, 90 28, 88 35 C86 42, 82 45, 75 43 L75 20 Z"/>
            </svg>
          `;
          e.target.parentNode.insertBefore(fallbackDiv.firstElementChild, e.target);
        }}
      />

      {/* Texto do Logo */}
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight text-gray-800">
            NIPO
          </span>
          <span className="text-xs font-medium tracking-wider text-gray-600">
            SCHOOL
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Versão simplificada só com o ícone
 */
export const NipoIcon = ({ size = 32, className = "" }) => (
  <NipoLogo 
    size={size} 
    className={className} 
    showText={false} 
  />
);

/**
 * Versão para header/navbar
 */
export const NipoHeaderLogo = ({ className = "" }) => (
  <NipoLogo 
    size={36} 
    fallbackColor="#2563eb"
    className={`hover:scale-105 transition-transform cursor-pointer ${className}`} 
    showText={true} 
  />
);

/**
 * Versão para landing page (maior)
 */
export const NipoLandingLogo = ({ className = "", color = "#1d4ed8" }) => (
  <NipoLogo 
    size={60} 
    fallbackColor={color}
    className={className} 
    showText={true} 
  />
);

/**
 * 🏆 Componente especial para mostrar o logo vencedor
 */
export const LogoVencedor = ({ className = "" }) => {
  return (
    <div className={`bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200 ${className}`}>
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-2xl">🏆</span>
          <h3 className="text-lg font-bold text-yellow-700">
            Logo Vencedor da Votação!
          </h3>
        </div>
        
        <div className="flex justify-center mb-4">
          <NipoLogo size={80} showText={false} />
        </div>
        
        <div className="text-center">
          <p className="text-sm text-yellow-600 font-medium mb-2">
            🎵 Nota Colcheia - Escolhido pela comunidade
          </p>
          <p className="text-xs text-yellow-500">
            Este logo representa nossa paixão pela música!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NipoLogo;