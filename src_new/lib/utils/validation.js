/**
 * Validation Utilities - Utilitários de validação
 * Nova localização: src_new/lib/utils/validation.js
 */

// ==========================================
// VALIDAÇÕES DE EMAIL
// ==========================================

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ==========================================
// VALIDAÇÕES DE SENHA
// ==========================================

export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    checks: {
      minLength: password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    },
    strength: calculatePasswordStrength(password)
  };
};

const calculatePasswordStrength = (password) => {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score < 3) return 'weak';
  if (score < 5) return 'medium';
  return 'strong';
};

// ==========================================
// VALIDAÇÕES DE TELEFONE
// ==========================================

export const validatePhone = (phone) => {
  // Remove todos os caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Verifica se tem 10 ou 11 dígitos (Brasil)
  return cleanPhone.length === 10 || cleanPhone.length === 11;
};

export const formatPhone = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
};

// ==========================================
// VALIDAÇÕES DE FORM
// ==========================================

export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = data[field];
    
    // Campo obrigatório
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = rule.message || `${field} é obrigatório`;
      return;
    }
    
    // Se não há valor e não é obrigatório, pular outras validações
    if (!value) return;
    
    // Validação de email
    if (rule.email && !validateEmail(value)) {
      errors[field] = 'Email inválido';
      return;
    }
    
    // Validação de tamanho mínimo
    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `Mínimo de ${rule.minLength} caracteres`;
      return;
    }
    
    // Validação de tamanho máximo
    if (rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `Máximo de ${rule.maxLength} caracteres`;
      return;
    }
    
    // Validação customizada
    if (rule.validate && typeof rule.validate === 'function') {
      const customError = rule.validate(value);
      if (customError) {
        errors[field] = customError;
        return;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// ==========================================
// VALIDAÇÕES ESPECÍFICAS DO DOMÍNIO
// ==========================================

export const validateInstrument = (instrumentData) => {
  const rules = {
    nome: {
      required: true,
      minLength: 2,
      maxLength: 100,
      message: 'Nome do instrumento é obrigatório'
    },
    categoria: {
      required: true,
      message: 'Categoria é obrigatória'
    },
    preco_aula: {
      validate: (value) => {
        const price = parseFloat(value);
        if (isNaN(price) || price < 0) {
          return 'Preço deve ser um número válido e positivo';
        }
        return null;
      }
    },
    idade_minima: {
      validate: (value) => {
        const age = parseInt(value);
        if (isNaN(age) || age < 3 || age > 18) {
          return 'Idade mínima deve estar entre 3 e 18 anos';
        }
        return null;
      }
    }
  };
  
  return validateForm(instrumentData, rules);
};

export const validateStudent = (studentData) => {
  const rules = {
    nome: {
      required: true,
      minLength: 2,
      maxLength: 100,
      message: 'Nome é obrigatório'
    },
    email: {
      required: true,
      email: true,
      message: 'Email válido é obrigatório'
    },
    telefone: {
      validate: (value) => {
        if (value && !validatePhone(value)) {
          return 'Telefone inválido';
        }
        return null;
      }
    },
    data_nascimento: {
      validate: (value) => {
        if (!value) return null;
        
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (age < 3 || age > 100) {
          return 'Idade deve estar entre 3 e 100 anos';
        }
        return null;
      }
    }
  };
  
  return validateForm(studentData, rules);
};