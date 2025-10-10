import React from 'react'
import { useWilayahAgen } from '@/hooks/useDropdowns'
import { DataService } from '@/services/DataService'
import { isPlate, alnum6to20 } from '@/utils/validators'

export default function TruckForm(){
  const { wilayah, agen, wilayahSel, setWilayahSel, agenSel, setAgenSel } = useWilayahAgen()
  // NOTE: submit handler dibelakang; ini mock form
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="space-y-1 md:col-span-1">
        <label className="text-xs">Wilayah Penyaluran</label>
        <select className="border rounded px-3 py-2 w-full" value={wilayahSel} onChange={e=>{ setWilayahSel(e.target.value); setAgenSel('') }}>
          <option value="">Pilih Wilayah</option>
          {wilayah.map(w => <option key={w} value={w}>{w}</option>)}
        </select>
      </div>

      <div className="space-y-1 md:col-span-1">
        <label className="text-xs">Nama Agen</label>
        <select className="border rounded px-3 py-2 w-full" value={agenSel} onChange={e=>setAgenSel(e.target.value)} disabled={!wilayahSel}>
          <option value="">{wilayahSel ? 'Pilih Agen' : 'Pilih Wilayah dulu'}</option>
          {agen.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-xs">Nomor Polisi</label>
        <input className="border rounded px-3 py-2 w-full" placeholder="DD 1234 AB" />
      </div>
      <div className="space-y-1">
        <label className="text-xs">Nomor Mesin</label>
        <input className="border rounded px-3 py-2 w-full" placeholder="Alfanumerik 6–20 char" />
      </div>
      <div className="space-y-1">
        <label className="text-xs">Nomor Rangka</label>
        <input className="border rounded px-3 py-2 w-full" placeholder="Alfanumerik 6–20 char" />
      </div>
      <div className="space-y-1">
        <label className="text-xs">Masa Berlaku KIR</label>
        <input type="date" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="space-y-1">
        <label className="text-xs">Masa Berlaku STNK</label>
        <input type="date" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="space-y-1 md:col-span-2">
        <label className="text-xs">Jenis Truk</label>
        <select className="border rounded px-3 py-2 w-full">
          {(await DataService.listJenis?.())?.map?.(j=> <option key={j} value={j}>{j}</option>) || ['Colt Diesel','Fuso','Engkel'].map(j=> <option key={j} value={j}>{j}</option>)}
        </select>
      </div>
      <div className="md:col-span-2 flex justify-end pt-2">
        <button type="button" className="px-3 py-2 bg-emerald-600 text-white rounded">Simpan</button>
      </div>
    </form>
  )
}
