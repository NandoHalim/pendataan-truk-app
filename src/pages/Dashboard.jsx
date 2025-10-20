import KpiCard from "../components/shared/KpiCard.jsx";

export default function Dashboard() {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Truk Aktif" value="—" />
        <KpiCard label="Inspeksi Hari Ini" value="—" />
        <KpiCard label="Dokumen Hampir Expired" value="—" />
        <KpiCard label="Total Truk" value="—" />
      </div>
      <p className="text-sm text-slate-500">
        KPI contoh. Nanti dihubungkan ke DataService.
      </p>
    </section>
  );
}
