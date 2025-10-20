import BottomNav from "../shared/BottomNav.jsx";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 text-slate-800">
      {/* Header sederhana (opsional, bisa diganti komponen lain) */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <h1 className="font-semibold tracking-tight">Pendataan Truk</h1>
          <div className="text-xs text-slate-500">v0.1</div>
        </div>
      </header>

      {/* Konten */}
      <main className="mx-auto w-full max-w-5xl px-4 py-4 pb-24">
        {children}
      </main>

      {/* Bottom Navigation untuk mobile */}
      <BottomNav />
    </div>
  );
}
