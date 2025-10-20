import { NavLink, useLocation } from "react-router-dom";

const tabs = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/trucks", label: "Truk", icon: "🚛" },
  { to: "/inspections", label: "Inspeksi", icon: "🧾" },
  { to: "/reports", label: "Laporan", icon: "📊" },
  { to: "/settings", label: "Pengaturan", icon: "⚙️" },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 border-t border-slate-200 bg-white/90 backdrop-blur">
      <ul className="mx-auto max-w-5xl grid grid-cols-5">
        {tabs.map((t) => {
          const active = pathname === t.to;
          return (
            <li key={t.to}>
              <NavLink
                to={t.to}
                className={`flex flex-col items-center justify-center py-2 text-xs
                  ${active ? "text-blue-600 font-semibold" : "text-slate-500"}`}
              >
                <span className="text-lg leading-none">{t.icon}</span>
                <span className="mt-0.5">{t.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
