/**
 * 🗄️ USE SUPABASE - NIPO SCHOOL
 *
 * Hook para operações Supabase conforme blueprint
 */
import { supabase } from '../lib/supabase/client';
export function useSupabase() {
    return { supabase };
}
export default useSupabase;
