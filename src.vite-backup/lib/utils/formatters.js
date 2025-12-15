export function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
}
export function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}
export function formatNumber(value) {
    return new Intl.NumberFormat('pt-BR').format(value);
}
