import React from 'react'
export default function KpiCard({ icon, title, value, tone }){
  const toneClass = tone === 'red' ? 'bg-red-50 border-red-100' : tone === 'amber' ? 'bg-amber-50 border-amber-100' : 'bg-emerald-50 border-emerald-100'
  return (
    <div className={`card border ${toneClass}`}>
      <div className="card-content p-4 flex items-center justify-between">
        <div><div className="text-xs text-slate-500">{title}</div><div className="text-2xl font-semibold">{value}</div></div>
        <div className="opacity-60">{icon}</div>
      </div>
    </div>
  )
}
