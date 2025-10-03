import React from 'react';
import { QrCode } from 'lucide-react';

/**
 * QRGenerator - Componente para geração de QR codes
 * Migrado de: src/shared/components/UI/QRCodeGenerator.jsx
 * Nova localização: src_new/components/ui/qr-generator.jsx
 * 
 * @param {Object} props
 * @param {string} props.value - Valor para gerar o QR code
 * @param {number} props.size - Tamanho do QR code
 * @param {string} props.className - Classes CSS adicionais
 */
const QRGenerator = ({ 
  value, 
  size = 200, 
  className = '' 
}) => {
  // Por agora, placeholder visual - depois integrar com biblioteca de QR
  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div 
        className="border-2 border-gray-200 rounded-lg p-4 bg-white flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div className="text-center">
          <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
          <p className="text-xs text-gray-500">QR Code</p>
          <p className="text-xs text-gray-400 mt-1 break-all">
            {value?.substring(0, 20)}...
          </p>
        </div>
      </div>
      
      {value && (
        <p className="text-xs text-gray-600 max-w-[200px] break-all text-center">
          {value}
        </p>
      )}
    </div>
  );
};

export default QRGenerator;