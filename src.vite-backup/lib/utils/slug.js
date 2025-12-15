/**
 * 🔧 UTILITÁRIOS DE SLUG - NIPO SCHOOL
 * ===================================
 * Funções para geração e manipulação de slugs seguros
 * Mantém compatibilidade total com sistema existente
 */
/**
 * Gera slug a partir de texto
 * Usado para criar URLs amigáveis
 */
export function generateSlug(text) {
    if (!text || typeof text !== 'string') {
        return '';
    }
    return text
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
        .replace(/\s+/g, '-') // Espaços → hífens
        .replace(/-+/g, '-') // Múltiplos hífens → único
        .replace(/^-|-$/g, '') // Remove hífens do início/fim
        .trim();
}
/**
 * Converte slug de volta para título
 */
export function slugToTitle(slug) {
    if (!slug || typeof slug !== 'string') {
        return '';
    }
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
/**
 * Valida se string é um slug válido
 */
export function isValidSlug(slug) {
    if (!slug || typeof slug !== 'string') {
        return false;
    }
    // Slug deve conter apenas letras minúsculas, números e hífens
    const slugPattern = /^[a-z0-9-]+$/;
    return slugPattern.test(slug) && slug.length > 0;
}
/**
 * Cria slug único adicionando sufixo se necessário
 */
export function createUniqueSlug(baseText, existingSlugs = []) {
    let baseSlug = generateSlug(baseText);
    if (!baseSlug) {
        baseSlug = 'item';
    }
    // Se não há conflito, retorna o slug base
    if (!existingSlugs.includes(baseSlug)) {
        return baseSlug;
    }
    // Adiciona número incremental até encontrar slug único
    let counter = 1;
    let uniqueSlug = `${baseSlug}-${counter}`;
    while (existingSlugs.includes(uniqueSlug)) {
        counter++;
        uniqueSlug = `${baseSlug}-${counter}`;
    }
    return uniqueSlug;
}
/**
 * Exemplos de uso e casos de teste
 */
export const slugExamples = {
    "Meu Portfólio Musical 2024": "meu-portfolio-musical-2024",
    "Desafio: Criar Melodia": "desafio-criar-melodia",
    "Clarinete em Bb": "clarinete-em-bb",
    "História da Música Barroca": "historia-da-musica-barroca",
    "Violão Clássico": "violao-classico",
    "Johann Sebastian Bach": "johann-sebastian-bach",
    "Sinfonia nº 9 - Beethoven": "sinfonia-n-9-beethoven"
};
/**
 * Testa se os exemplos funcionam corretamente
 */
export function testSlugGeneration() {
    try {
        for (const [input, expected] of Object.entries(slugExamples)) {
            const result = generateSlug(input);
            if (result !== expected) {
                console.warn(`Slug test failed: "${input}" -> expected "${expected}", got "${result}"`);
                return false;
            }
        }
        return true;
    }
    catch (error) {
        console.error('Erro nos testes de slug:', error);
        return false;
    }
}
