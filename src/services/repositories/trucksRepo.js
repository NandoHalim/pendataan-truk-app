import { supabase } from '../../api/supabaseClient.js'


const mockTrucks = [
  { id:1, nopol:'DD 1234 AB', wilayah:'Maros', agen:'Agen Alifa', jenis:'Colt Diesel', tahun:2012, kir_exp:'2025-12-10', stnk_exp:'2025-11-05' },
  { id:2, nopol:'DD 9876 CD', wilayah:'Makassar', agen:'Agen Citra', jenis:'Fuso', tahun:2009, kir_exp:'2025-09-20', stnk_exp:'2025-08-31' },
  { id:3, nopol:'DD 5555 EF', wilayah:'Pangkep', agen:'Agen Daya', jenis:'Engkel', tahun:2018, kir_exp:'2026-02-01', stnk_exp:'2026-01-15' },
]

export async function listTrucks() {
  if (!supabase) return mockTrucks
  const { data, error } = await supabase.from('trucks').select('*').limit(500)
  if (error) throw error
  return data
}
