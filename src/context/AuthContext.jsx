import React, { createContext, useContext, useState } from 'react'
const Ctx = createContext(null)
export function AuthProvider({ children }){
  // stub user, ganti dengan supabase auth listener
  const [user] = useState({ role:'petugas', email:'petugas@example.com' })
  return <Ctx.Provider value={{ user }}>{children}</Ctx.Provider>
}
export const useAuth = ()=> useContext(Ctx)
