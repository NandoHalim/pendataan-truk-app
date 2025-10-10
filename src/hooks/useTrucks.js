import { useEffect, useMemo, useState } from 'react'
import { DataService } from '@/services/DataService'

export function useTrucks(){
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [wilayah, setWilayah] = useState('')
  const [jenis, setJenis] = useState('')

  useEffect(()=>{
    let alive = true
    DataService.listTrucks().then(d=>{ if(alive){ setRows(d); setLoading(false)} })
    return ()=>{ alive=false }
  },[])

  const filtered = useMemo(()=>{
    const q = search.trim().toLowerCase()
    return rows.filter(t=>{
      const matchQ = !q || `${t.nopol} ${t.wilayah} ${t.jenis}`.toLowerCase().includes(q)
      const matchWil = !wilayah || t.wilayah === wilayah
      const matchJen = !jenis || t.jenis === jenis
      return matchQ && matchWil && matchJen
    })
  },[rows, search, wilayah, jenis])

  return { rows, loading, filtered, search, setSearch, wilayah, setWilayah, jenis, setJenis }
}
