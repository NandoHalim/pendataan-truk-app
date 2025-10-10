import { useEffect, useState } from 'react'
import { DataService } from '@/services/DataService'

export function useWilayahAgen(){
  const [wilayah, setWilayah] = useState([])        // [{id,nama}]
  const [agen, setAgen] = useState([])              // [{id,nama}]
  const [wilayahSelId, setWilayahSelId] = useState('') // id wilayah
  const [agenSelId, setAgenSelId] = useState('')       // id agen

  useEffect(()=>{ DataService.listWilayah().then(setWilayah) },[])
  useEffect(()=>{
    if(!wilayahSelId){ setAgen([]); setAgenSelId(''); return }
    DataService.listAgenByWilayah(wilayahSelId).then(setAgen)
  },[wilayahSelId])

  return { wilayah, agen, wilayahSelId, setWilayahSelId, agenSelId, setAgenSelId }
}
