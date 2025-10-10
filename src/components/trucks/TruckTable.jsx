import React from 'react'
import ExpiryBadge from '@/components/shared/ExpiryBadge'
import { yearDiff } from '@/utils/date'

export default function TruckTable({ rows, onChecklist }){
  return (
    <div className="overflow-auto rounded-2xl border">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 sticky top-0">
          <tr>
            <th className="text-left p-3">Nopol</th>
            <th className="text-left p-3">Wilayah</th>
            <th className="text-left p-3">Agen</th>
            <th className="text-left p-3">Jenis</th>
            <th className="text-left p-3">Tahun</th>
            <th className="text-left p-3">STNK</th>
            <th className="text-left p-3">KIR</th>
            <th className="text-left p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(t => (
            <tr key={t.id} className="border-t">
              <td className="p-3 font-medium">{t.nopol}</td>
              <td className="p-3">{t.wilayah}</td>
              <td className="p-3">{t.agen || '-'}</td>
              <td className="p-3">{t.jenis}</td>
              <td className="p-3">
                {t.tahun}
                {yearDiff(t.tahun) > 10 && <span className="ml-2 px-2 py-0.5 bg-red-600 text-white text-xs rounded">EXPIRED</span>}
              </td>
              <td className="p-3"><ExpiryBadge date={t.stnk_exp}/></td>
              <td className="p-3"><ExpiryBadge date={t.kir_exp}/></td>
              <td className="p-3">
                <button className="px-2 py-1 border rounded" onClick={()=>onChecklist && onChecklist(t)}>Checklist</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
