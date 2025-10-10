import { supabase } from '../api/supabaseClient'
export async function createInspection(payload){
  if (!supabase) return { ok:true, mock:true }
  const { data, error } = await supabase.from('truck_inspections').insert(payload).select().single()
  if (error) throw error
  return data
}
