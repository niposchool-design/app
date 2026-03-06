import { ZodSchema, ZodError } from 'zod'

/**
 * Resultado da validação
 */
export type ValidationResult<T> = 
  | { success: true; data: T; error?: never; errors?: never }
  | { success: false; error: string; errors?: Array<{ field: string; message: string }>; data?: never }

/**
 * Valida dados usando schema Zod
 * 
 * @param schema - Schema Zod para validação
 * @param data - Dados a serem validados
 * @returns Resultado da validação com dados tipados ou erro
 */
export async function validateAction<T>(
  schema: ZodSchema<T>,
  data: unknown
): Promise<ValidationResult<T>> {
  try {
    const validated = await schema.parseAsync(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof ZodError) {
      const firstError = error.issues[0]
      const field = firstError.path.join('.')
      const message = firstError.message
      
      return {
        success: false,
        error: `${field}: ${message}`,
        errors: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      }
    }
    return {
      success: false,
      error: 'Validação falhou',
    }
  }
}

/**
 * Valida dados de FormData
 * 
 * @param schema - Schema Zod para validação
 * @param formData - FormData do formulário
 * @returns Resultado da validação
 */
export async function validateFormData<T>(
  schema: ZodSchema<T>,
  formData: FormData
): Promise<ValidationResult<T>> {
  const data = Object.fromEntries(formData.entries())
  return validateAction(schema, data)
}
