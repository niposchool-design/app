/**
 * 🛠️ UTILS - NIPO SCHOOL
 *
 * Funções utilitárias para o projeto
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Combina classes CSS de forma inteligente
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
/**
 * Formata texto em slug
 */
export function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9]+/g, '-') // Substitui caracteres especiais por hífen
        .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim
}
/**
 * Formata moeda brasileira
 */
export function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}
/**
 * Formata data em português
 */
export function formatDate(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR').format(d);
}
/**
 * Formata data e hora em português
 */
export function formatDateTime(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(d);
}
/**
 * Trunca texto com reticências
 */
export function truncate(text, length = 100) {
    if (text.length <= length)
        return text;
    return text.substring(0, length).trim() + '...';
}
/**
 * Capitaliza primeira letra
 */
export function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
/**
 * Gera ID único simples
 */
export function generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
/**
 * Debounce function
 */
export function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
/**
 * Sleep/delay function
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * Verifica se é email válido
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Formata telefone brasileiro
 */
export function formatPhone(phone) {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length === 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    if (numbers.length === 11) {
        return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone;
}
/**
 * Converte bytes para formato legível
 */
export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
/**
 * Cria range de números
 */
export function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
/**
 * Remove elementos duplicados de array
 */
export function unique(array) {
    return Array.from(new Set(array));
}
/**
 * Agrupa array por propriedade
 */
export function groupBy(array, key) {
    return array.reduce((groups, item) => {
        const group = String(item[key]);
        groups[group] = groups[group] || [];
        groups[group].push(item);
        return groups;
    }, {});
}
/**
 * Ordena array por propriedade
 */
export function sortBy(array, key, direction = 'asc') {
    return [...array].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
        if (aVal < bVal)
            return direction === 'asc' ? -1 : 1;
        if (aVal > bVal)
            return direction === 'asc' ? 1 : -1;
        return 0;
    });
}
export default {
    cn,
    slugify,
    formatCurrency,
    formatDate,
    formatDateTime,
    truncate,
    capitalize,
    generateId,
    debounce,
    sleep,
    isValidEmail,
    formatPhone,
    formatBytes,
    range,
    unique,
    groupBy,
    sortBy
};
