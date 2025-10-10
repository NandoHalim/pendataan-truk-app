import React, { createContext, useContext, useState } from 'react'
const Ctx = createContext(null)
export function SettingsProvider({ children }){
  const [settings, setSettings] = useState({}) 
  return <Ctx.Provider value={{ settings, setSettings }}>{children}</Ctx.Provider>
}
export const useSettings = ()=> useContext(Ctx)
