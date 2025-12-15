/**
 * Validation utilities
 */

import { VALIDATION } from './constants';

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION.EMAIL_REGEX.test(email);
}

/**
 * Validate phone
 */
export function isValidPhone(phone: string): boolean {
  return VALIDATION.PHONE_REGEX.test(phone);
}

/**
 * Validate password
 */
export function isValidPassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    errors.push(`A senha deve ter no mínimo ${VALIDATION.MIN_PASSWORD_LENGTH} caracteres`);
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate required field
 */
export function isRequired(value: any): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

/**
 * Validate max length
 */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}

/**
 * Validate min length
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

/**
 * Validate number range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validate CPF (Brazilian ID)
 */
export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit === 10 || digit === 11) digit = 0;
  if (digit !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit === 10 || digit === 11) digit = 0;
  if (digit !== parseInt(cpf.charAt(10))) return false;

  return true;
}
