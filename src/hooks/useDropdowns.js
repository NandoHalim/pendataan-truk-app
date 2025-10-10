import { useEffect, useState } from 'react'
import { DataService } from '@/services/DataService'

export function useWilayahAgen(){
  const [wilayah, setWilayah] = useState([])
  const [agen, setAgen] = useState([])
  const [wilayahSel, setWilayahSel] = useState('')
  const [agenSel, setAgenSel] = useState('')

  useEffect(()=>{ DataService.listWilayah().then(setWilayah) },[])
  useEffect(()=>{
    if(!wilayahSel){ setAgen([]); setAgenSel(''); return }
    DataService.listAgenByWilayah(wilayahSel).then(setAgen)
  },[wilayahSel])

  return { wilayah, agen, wilayahSel, setWilayahSel, agenSel, setAgenSel }
}
