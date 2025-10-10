import React, { useMemo } from 'react'
import KpiCard from '@/components/shared/KpiCard'
import { daysLeft } from '@/utils/date'

export default function Dashboard({ trucks }){
  const kpis = useMemo(()=>{
    const total = trucks.length
    const expiringStnk = trucks.filter(t => { const d=daysLeft(t.stnk_exp); return d<=30 && d>=0 }).length
    const expiringKir  = trucks.filter(t => { const d=daysLeft(t.kir_exp);  return d<=30 && d>=0 }).length
    const expiredAge   = trucks.filter(t => (new Date().getFullYear() - t.tahun) > 10).length
    return { total, expiringStnk, expiringKir, expiredAge }
  },[trucks])

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard title="Total Truk" value={kpis.total} />
        <KpiCard title="STNK ≤30h" value={kpis.expiringStnk} tone="amber" />
        <KpiCard title="KIR ≤30h" value={kpis.expiringKir} tone="amber" />
        <KpiCard title=">10 Tahun" value={kpis.expiredAge} tone="red" />
      </section>
      <div className="card">
        <div className="card-header"><div className="card-title">To‑Do (Butuh Tindakan)</div></div>
        <div className="card-content text-sm text-slate-500">Daftar kendaraan dengan STNK/KIR merah/kuning akan muncul di sini.</div>
      </div>
    </div>
  )
}
