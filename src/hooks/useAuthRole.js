import { useMemo } from 'react'
// Stub: ganti dengan pembacaan meta Supabase auth.user
export function useAuthRole(user){ 
  // user?.role could be 'admin' | 'petugas'
  const role = user?.role || 'petugas'
  const showSettings = role !== 'admin' // sesuai requirement
  return useMemo(()=>({ role, showSettings }),[role, showSettings])
}
