
'use server'

import { createClient } from '@/lib/supabase/server';
import { Aula } from '@/lib/types/aulas';

export async function createAula(aula: Partial<Aula>) {
  const supabase = await createClient();

  // Remove campos que não devem ser enviados na criação (como id se for serial, mas aqui é uuid gerado pelo banco ou passado?)
  // Geralmente o banco gera o ID. Vamos remover undefineds.
  
  const { data, error } = await supabase
    .from('aulas')
    .insert([aula])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar aula:', error);
    throw new Error('Falha ao criar aula');
  }

  return data;
}

export async function updateAula(id: string, aula: Partial<Aula>) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('aulas')
    .update(aula)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar aula:', error);
    throw new Error('Falha ao atualizar aula');
  }

  return data;
}

export async function deleteAula(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('aulas')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar aula:', error);
    throw new Error('Falha ao deletar aula');
  }

  return true;
}
