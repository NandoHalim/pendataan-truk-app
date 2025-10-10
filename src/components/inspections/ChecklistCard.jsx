import React, { useState } from 'react'
import { CHECKLIST_TEMPLATE, THREE_STATE } from '@/utils/constants'
import { DataService } from '@/services/DataService'

export default function ChecklistCard({ trucks, selectedTruck, setSelectedTruck }){
  const [checklist, setChecklist] = useState({})
  const [notes, setNotes] = useState('')

  const setThree = (key,val)=> setChecklist(p=>({ ...p, [key]:val }))

  return (
    <div className="card">
      <div className="card-header"><div className="card-title">Checklist Pemeriksaan</div></div>
      <div className="card-content space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs">Pilih Kendaraan</label>
            <select className="border rounded px-3 py-2 w-full"
              onChange={e=> setSelectedTruck?.(trucks.find(t=> String(t.id)===e.target.value))}
              value={selectedTruck?.id || ''}>
              <option value="">Pilih Nopol</option>
              {trucks.map(t=> <option key={t.id} value={String(t.id)}>{t.nopol} — {t.wilayah}</option>)}
            </select>
          </div>
          <div className="flex items-end text-xs text-slate-500">GPS otomatis saat submit</div>
        </div>

        {selectedTruck ? (
          <div className="space-y-3">
            <div className="text-sm text-slate-700">{selectedTruck.nopol} • {selectedTruck.jenis} • {selectedTruck.wilayah}</div>
            <div className="grid md:grid-cols-2 gap-3">
              {CHECKLIST_TEMPLATE.map(item => (
                <div key={item.key} className="p-3 rounded-xl border bg-white">
                  <div className="text-sm font-medium mb-2">{item.label}</div>
                  <div className="flex gap-2">
                    {THREE_STATE.map(state => (
                      <button key={state}
                        onClick={()=>setThree(item.key, state)}
                        className={`px-3 py-1 border rounded ${checklist[item.key]===state?'bg-emerald-600 text-white':''}`}>
                        {state}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs">Catatan</label>
                <textarea className="border rounded px-3 py-2 w-full" rows={3} value={notes} onChange={e=>setNotes(e.target.value)} />
              </div>
              <div className="flex items-center text-xs text-slate-500">Tanda tangan petugas & sopir diambil saat submit</div>
            </div>
            <div className="flex justify-end">
              <button className="px-3 py-2 bg-emerald-600 text-white rounded"
                onClick={async()=>{ await DataService.createInspection({}); alert('Checklist tersimpan (mock).') }}>
                Simpan Checklist
              </button>
            </div>
          </div>
        ) : <div className="text-sm text-slate-500">Pilih kendaraan terlebih dahulu.</div>}
      </div>
    </div>
  )
}
