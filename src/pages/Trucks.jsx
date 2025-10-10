import React from 'react'
import TruckTable from '@/components/trucks/TruckTable'
import TruckForm from '@/components/trucks/TruckForm'

export default function Trucks({ filtered, search, setSearch, wilayah, setWilayah, jenis, setJenis, onChecklist }){
  return (
    <div className="card">
      <div className="card-header"><div className="card-title">Master Kendaraan</div></div>
      <div className="card-content space-y-3">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <div className="relative flex-1">
            <input className="border rounded pl-8 pr-3 py-2 w-full" placeholder="Cari nopol / wilayah / jenis" value={search} onChange={e=>setSearch(e.target.value)}/>
            <span className="absolute left-2 top-2.5 text-slate-400">🔎</span>
          </div>
          <select className="border rounded px-3 py-2 w-full md:w-40" value={wilayah} onChange={e=>setWilayah(e.target.value)}>
            <option value="">Wilayah</option>
            {[...new Set(filtered.map(t=>t.wilayah))].map(w => <option key={w} value={w}>{w}</option>)}
          </select>
          <select className="border rounded px-3 py-2 w-full md:w-40" value={jenis} onChange={e=>setJenis(e.target.value)}>
            <option value="">Jenis</option>
            {[...new Set(filtered.map(t=>t.jenis))].map(j => <option key={j} value={j}>{j}</option>)}
          </select>
        </div>
        <TruckTable rows={filtered} onChecklist={onChecklist} />
        <div className="pt-2">
          <details className="border rounded p-3">
            <summary className="cursor-pointer font-medium">Tambah Kendaraan</summary>
            <div className="pt-3"><TruckForm/></div>
          </details>
        </div>
      </div>
    </div>
  )
}
