import React from 'react';

// Componente simples para renderizar markdown básico
export const MarkdownRenderer = ({ content }) => {
  if (!content) return null;

  // Função para converter markdown básico para HTML
  const parseMarkdown = (text) => {
    return text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-800 mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-800 mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-800 mt-8 mb-6">$1</h1>')
      
      // Lists
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
      
      // Paragraphs
      .replace(/\n\n/gim, '</p><p class="mb-4">')
      
      // Line breaks
      .replace(/\n/gim, '<br/>');
  };

  const htmlContent = parseMarkdown(content);

  return (
    <div 
      className="prose prose-gray max-w-none"
      dangerouslySetInnerHTML={{ 
        __html: `<p class="mb-4">${htmlContent}</p>` 
      }}
    />
  );
};

export default MarkdownRenderer;