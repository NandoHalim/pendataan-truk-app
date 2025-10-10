import React, { useMemo, useState } from 'react'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { SettingsProvider } from '@/context/SettingsContext'
import { useAuthRole } from '@/hooks/useAuthRole'
import { useTrucks } from '@/hooks/useTrucks'
import Dashboard from '@/pages/Dashboard'
import Trucks from '@/pages/Trucks'
import Inspections from '@/pages/Inspections'
import Reports from '@/pages/Reports'
import Settings from '@/pages/Settings'
import BottomNav from '@/components/shared/BottomNav'

function Shell(){
  const { user } = useAuth()
  const { showSettings } = useAuthRole(user)
  const { rows, filtered, search, setSearch, wilayah, setWilayah, jenis, setJenis } = useTrucks()
  const [tab, setTab] = useState('checklist') // checklist | data | riwayat -> riwayat di-skip untuk singkat; gunakan reports
  const [selectedTruck, setSelectedTruck] = useState(null)

  const items = useMemo(()=>{
    const base = [
      { k:'checklist', label:'Checklist' },
      { k:'data', label:'Data Truk' },
      { k:'laporan', label:'Laporan' },
    ]
    return showSettings ? [...base, { k:'pengaturan', label:'Pengaturan' }] : base
  },[showSettings])

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 text-xl">🚚</span>
            <h1 className="font-semibold text-lg">Pendataan Truk – Agen LPG</h1>
          </div>
          <div className="text-xs text-slate-500">{user?.email}</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-20 space-y-6">
        {tab === 'dashboard' && <Dashboard trucks={rows} />}
        {tab === 'data' && (
          <Trucks
            filtered={filtered}
            search={search} setSearch={setSearch}
            wilayah={wilayah} setWilayah={setWilayah}
            jenis={jenis} setJenis={setJenis}
            onChecklist={setSelectedTruck}
          />
        )}
        {tab === 'checklist' && (
          <Inspections trucks={rows} selectedTruck={selectedTruck} setSelectedTruck={setSelectedTruck} />
        )}
        {tab === 'laporan' && <Reports/>}
        {showSettings && tab === 'pengaturan' && <Settings/>}
      </main>

      <BottomNav items={items} value={tab} onChange={setTab} showSettings={showSettings} />
      <footer className="hidden md:block py-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} Pendataan Truk</footer>
    </div>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <SettingsProvider>
        <Shell/>
      </SettingsProvider>
    </AuthProvider>
  )
}
