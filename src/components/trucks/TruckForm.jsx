import React, { useEffect, useState } from "react";
import { useWilayahAgen } from "@/hooks/useDropdowns";
import { DataService } from "@/services/DataService";

export default function TruckForm(){
  const { wilayah, agen, wilayahSelId, setWilayahSelId, agenSelId, setAgenSelId } = useWilayahAgen()
  const [jenisOptions, setJenisOptions] = useState([])
  const [loadingJenis, setLoadingJenis] = useState(true)

  useEffect(()=>{
    let alive = true
    ;(async()=>{
      try{
        const list = (await DataService.listJenis?.()) ?? []
        if(alive) setJenisOptions(list.length? list : ['Colt Diesel','Fuso','Engkel'])
      } finally { if(alive) setLoadingJenis(false) }
    })()
    return ()=>{ alive=false }
  },[])

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Wilayah → Agen (PK by id) */}
      <div className="space-y-1">
        <label className="text-xs">Wilayah Penyaluran</label>
        <select className="border rounded px-3 py-2 w-full"
          value={wilayahSelId}
          onChange={e=>{ setWilayahSelId(e.target.value); setAgenSelId('') }}>
          <option value="">Pilih Wilayah</option>
          {wilayah.map(w => <option key={w.id} value={w.id}>{w.nama}</option>)}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-xs">Nama Agen</label>
        <select className="border rounded px-3 py-2 w-full"
          value={agenSelId}
          onChange={e=> setAgenSelId(e.target.value)}
          disabled={!wilayahSelId}>
          <option value="">{wilayahSelId ? 'Pilih Agen' : 'Pilih Wilayah dulu'}</option>
          {agen.map(a => <option key={a.id} value={a.id}>{a.nama}</option>)}
        </select>
      </div>

      {/* isian lain tetap */}
      <div className="space-y-1">
        <label className="text-xs">Nomor Polisi</label>
        <input className="border rounded px-3 py-2 w-full" placeholder="DD 1234 AB" />
      </div>

      {/* … dst (mesin, rangka, kir, stnk) … */}

      <div className="space-y-1 md:col-span-2">
        <label className="text-xs">Jenis Truk</label>
        <select className="border rounded px-3 py-2 w-full" disabled={loadingJenis}>
          {(loadingJenis ? ['Memuat...'] : jenisOptions).map(j => (
            <option key={j} value={j}>{j}</option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2 flex justify-end pt-2">
        <button type="button" className="px-3 py-2 bg-emerald-600 text-white rounded">Simpan</button>
      </div>
    </form>
  )
}
