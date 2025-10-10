import { useState } from 'react'
import { DataService } from '@/services/DataService'

export function useInspectionForm(){
  const [payload, setPayload] = useState({ checklist:{}, notes:'' })
  const setThree = (key, val) => setPayload(p => ({...p, checklist:{...p.checklist, [key]: val}}))
  async function submit(truck){
    return DataService.createInspection({ truck_id: truck?.id, checklist: payload.checklist, catatan: payload.notes })
  }
  return { payload, setPayload, setThree, submit }
}
