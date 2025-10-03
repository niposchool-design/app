/**
 * Formatters Utilities - Utilitários de formatação
 * Nova localização: src_new/lib/utils/formatters.js
 */

// ==========================================
// FORMATAÇÃO DE DATAS
// ==========================================

export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Date(date).toLocaleDateString('pt-BR', defaultOptions);
};

export const formatShortDate = (date) => {
  return formatDate(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDatetime = (date) => {
  if (!date) return '';
  
  return new Date(date).toLocaleString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now - targetDate) / 1000);
  
  if (diffInSeconds < 60) return 'agora há pouco';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutos atrás`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} horas atrás`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} dias atrás`;
  
  return formatShortDate(date);
};

// ==========================================
// FORMATAÇÃO DE MOEDA
// ==========================================

export const formatCurrency = (value) => {
  if (value === null || value === undefined) return 'R$ 0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const parseCurrency = (currencyString) => {
  if (!currencyString) return 0;
  
  return parseFloat(
    currencyString
      .replace(/[R$\s]/g, '')
      .replace('.', '')
      .replace(',', '.')
  ) || 0;
};

// ==========================================
// FORMATAÇÃO DE NÚMEROS
// ==========================================

export const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined) return '0';
  
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '0%';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value / 100);
};

// ==========================================
// FORMATAÇÃO DE TEXTO
// ==========================================

export const formatName = (name) => {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.slice(0, maxLength) + '...';
};

export const slugify = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim('-'); // Remove hífens das bordas
};

// ==========================================
// FORMATAÇÃO DE IDENTIFICADORES
// ==========================================

export const formatCPF = (cpf) => {
  if (!cpf) return '';
  
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length === 11) {
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  
  return cpf;
};

export const formatCNPJ = (cnpj) => {
  if (!cnpj) return '';
  
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  if (cleanCNPJ.length === 14) {
    return cleanCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  
  return cnpj;
};

// ==========================================
// FORMATAÇÃO DE STATUS
// ==========================================

export const formatStatus = (status) => {
  const statusMap = {
    active: 'Ativo',
    inactive: 'Inativo',
    pending: 'Pendente',
    approved: 'Aprovado',
    rejected: 'Rejeitado',
    draft: 'Rascunho',
    published: 'Publicado',
    archived: 'Arquivado'
  };
  
  return statusMap[status] || status;
};

export const getStatusColor = (status) => {
  const colorMap = {
    active: 'green',
    inactive: 'gray',
    pending: 'yellow',
    approved: 'green',
    rejected: 'red',
    draft: 'gray',
    published: 'blue',
    archived: 'gray'
  };
  
  return colorMap[status] || 'gray';
};

// ==========================================
// FORMATAÇÃO DE ARQUIVOS
// ==========================================

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.split('.').pop().toLowerCase();
};

export const isImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  return imageExtensions.includes(getFileExtension(filename));
};