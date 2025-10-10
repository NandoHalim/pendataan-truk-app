import React from 'react'
import ChecklistCard from '@/components/inspections/ChecklistCard'
export default function Inspections({ trucks, selectedTruck, setSelectedTruck }){
  return <ChecklistCard trucks={trucks} selectedTruck={selectedTruck} setSelectedTruck={setSelectedTruck} />
}
