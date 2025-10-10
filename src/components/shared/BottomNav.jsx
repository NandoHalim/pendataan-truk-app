import React from 'react'
export default function BottomNav({ items, value, onChange, showSettings }){
  const cols = showSettings ? 'grid-cols-4' : 'grid-cols-3'
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t">
      <div className={`max-w-6xl mx-auto grid ${cols} text-xs`}>
        {items.map(it => (
          <button key={it.k} aria-label={it.label}
            onClick={()=>onChange(it.k)}
            className={`py-3 ${value===it.k ? 'text-white bg-emerald-600' : 'text-slate-700'}`}>
            {it.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
