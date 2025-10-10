import { supabase } from '../api/supabaseClient'

export async function listWilayah(){
  if (!supabase) return [
    { id: 'mock-maros', nama: 'Maros' },
    { id: 'mock-makassar', nama: 'Makassar' },
    { id: 'mock-pangkep', nama: 'Pangkep' },
  ]
  const { data, error } = await supabase.from('wilayah').select('id,nama').order('nama')
  if (error) throw error
  return data // [{id,nama}]
}

export async function listAgenByWilayah(wilayahId){
  if (!supabase) {
    const map = {
      'mock-maros': [{id:'a1', nama:'Agen Alifa'},{id:'a2', nama:'Agen Balla'}],
      'mock-makassar': [{id:'a3', nama:'Agen Citra'}],
      'mock-pangkep': [{id:'a4', nama:'Agen Daya'},{id:'a5', nama:'Agen Elang'}],
    }
    return map[wilayahId] || []
  }
  const { data, error } = await supabase
    .from('agen')
    .select('id,nama')
    .eq('wilayah_id', wilayahId)
    .order('nama')
  if (error) throw error
  return data // [{id,nama}]
}

export async function listJenis(){
  if (!supabase) return ['Colt Diesel','Fuso','Engkel']
  const { data, error } = await supabase.from('jenis_kendaraan').select('nama').order('nama')
  if (error) throw error
  return data.map(r=>r.nama)
}
