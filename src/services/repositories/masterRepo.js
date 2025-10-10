import { supabase } from '../api/supabaseClient'

const mock = {
  wilayah: ['Maros','Makassar','Pangkep'],
  agenByWilayah: {
    Maros: ['Agen Alifa','Agen Balla'],
    Makassar: ['Agen Citra'],
    Pangkep: ['Agen Daya','Agen Elang']
  },
  jenis: ['Colt Diesel','Fuso','Engkel']
}

export async function listWilayah(){
  if (!supabase) return mock.wilayah
  const { data, error } = await supabase.from('wilayah').select('nama').order('nama')
  if (error) throw error
  return data.map(r=>r.nama)
}
export async function listAgenByWilayah(w){
  if (!supabase) return mock.agenByWilayah[w] || []
  const { data, error } = await supabase.from('agen').select('nama').eq('wilayah', w).order('nama')
  if (error) throw error
  return data.map(r=>r.nama)
}
export async function listJenis(){
  if (!supabase) return mock.jenis
  const { data, error } = await supabase.from('jenis_kendaraan').select('nama').order('nama')
  if (error) throw error
  return data.map(r=>r.nama)
}
