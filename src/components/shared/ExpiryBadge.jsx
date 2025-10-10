import React from 'react'
import { daysLeft } from '@/utils/date'
export default function ExpiryBadge({ date }){
  const d = daysLeft(date)
  if (Number.isNaN(d)) return <span className="px-2 py-1 rounded bg-slate-200 text-slate-700 text-xs">-</span>
  if (d < 0) return <span className="px-2 py-1 rounded bg-red-600 text-white text-xs">Kadaluarsa</span>
  if (d <= 30) return <span className="px-2 py-1 rounded bg-amber-500 text-white text-xs">{d}h lagi</span>
  return <span className="px-2 py-1 rounded bg-emerald-600 text-white text-xs">{d}h</span>
}
