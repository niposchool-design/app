// =============================================
// Sanitização de input para prompts de IA
// =============================================
// Defesa contra prompt injection (R-024 / OWASP LLM01).
// Texto livre do aluno NUNCA pode virar instrução para o modelo.
// Ver: Cockpit/security/apps/nipo_school.md QW-2

/** Limite de caracteres por campo de input — evita estouro de tokens/custo. */
const MAX_INPUT_CHARS = 4000

// Caracteres de controle a remover (preserva tab \x09, newline \x0A e CR \x0D).
const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g

/**
 * Neutraliza texto livre do usuário antes de embuti-lo num prompt de LLM.
 *
 * - Remove os tokens delimitadores (`<ALUNO_INPUT>`) para o aluno não conseguir
 *   forjar uma fronteira e "escapar" do bloco de dados.
 * - Remove caracteres de controle (mantém tab, quebra de linha e retorno).
 * - Limita o tamanho para conter custo/abuso.
 *
 * O conteúdo retornado deve ser sempre embrulhado entre as tags
 * `<ALUNO_INPUT>` / `</ALUNO_INPUT>` no prompt, e o system prompt deve
 * conter o `INJECTION_GUARD` instruindo o modelo a tratá-lo como dado bruto.
 */
export function sanitizeForPrompt(input: unknown): string {
  if (input == null) return ''
  let text = String(input)

  // Impede forjar a fronteira do bloco de dados
  text = text.replace(/<\/?\s*ALUNO_INPUT\s*>/gi, '')

  text = text.replace(CONTROL_CHARS, '')

  text = text.trim()

  if (text.length > MAX_INPUT_CHARS) {
    text = text.slice(0, MAX_INPUT_CHARS) + '\n[...texto truncado]'
  }

  return text
}
