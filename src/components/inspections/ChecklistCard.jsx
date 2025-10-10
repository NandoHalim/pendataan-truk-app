import React, { useState } from 'react'
import { CHECKLIST_TEMPLATE, THREE_STATE } from '@/utils/constants'
import { DataService } from '@/services/DataService'

export default function ChecklistCard({ trucks, selectedTruck, setSelectedTruck }){
  const [checklist, setChecklist] = useState({})
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  const setThree = (key,val)=> setChecklist(p=>({ ...p, [key]:val }))

  async function handleSave(){
    if(!selectedTruck){ alert('Pilih kendaraan dulu'); return }
    setSaving(true)
    try{
      await DataService.createInspection({
        truck_id: selectedTruck.id,
        checklist,
        catatan: notes,
        petugas: 'petugas-demo',  // nanti ganti dengan user email dari Auth
        lokasi: null
      })
      alert('Checklist tersimpan')
      setChecklist({})
      setNotes('')
    }catch(e){
      console.error(e)
      alert('Gagal menyimpan checklist. Cek policy RLS insert untuk anon/auth.')
    }finally{
      setSaving(false)
    }
  }

  // ... (UI tetap)
  // Ganti tombol:
  // <button ... onClick={async()=>{ await DataService.createInspection({}); alert('Checklist tersimpan (mock).') }}>
  //   Simpan Checklist
  // </button>

  // Menjadi:
  // ...
  return (
    // ...
    <div className="flex justify-end">
      <button className="px-3 py-2 bg-emerald-600 text-white rounded disabled:opacity-60"
        disabled={saving}
        onClick={handleSave}>
        {saving ? 'Menyimpan...' : 'Simpan Checklist'}
      </button>
    </div>
    // ...
  )
}
