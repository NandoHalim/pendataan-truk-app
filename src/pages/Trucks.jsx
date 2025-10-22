// src/pages/Trucks.jsx
import { useEffect, useMemo, useState } from "react";
import TruckForm from "../components/trucks/TruckForm.jsx";
import { listTrucks, saveTruck, deleteTruck } from "../services/repositories/trucksRepo.js";
import { listRegions, listAgentsByRegion } from "../services/repositories/masterRepo.js";
import ExpiryBadge from "../components/shared/ExpiryBadge.jsx";

export default function Trucks() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // masters
  const [wilayahList, setWilayahList] = useState([]);
  const [agenList, setAgenList] = useState([]);
  const [jenisList, setJenisList] = useState([]); // jika ada repo jenis, isi; sementara kosong

  // form state
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const pageSize = 20;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { rows, total } = await listTrucks({ q, page, pageSize });
        setRows(rows);
        setTotal(total);
      } finally {
        setLoading(false);
      }
    })();
  }, [q, page]);

  useEffect(() => {
    (async () => {
      const wl = await listRegions(); // returns [{id, name}]
      setWilayahList(wl);
      // preload agen: semua agen, nanti di form difilter by wilayah
      const ag = await listAgentsByRegion(); // tanpa arg → semua
      setAgenList(ag);
      // jenisList: kalau sudah ada repo, pakai; sementara nanti isi manual
      setJenisList(await safeJenisList());
    })();
  }, []);

  const masters = useMemo(() => ({
    wilayahList,
    agenList: agenList.map(a => ({ ...a, wilayah_id: a.region_id || a.wilayah_id })), // jaga-jaga alias
    jenisList,
  }), [wilayahList, agenList, jenisList]);

  const refresh = async () => {
    const { rows, total } = await listTrucks({ q, page, pageSize });
    setRows(rows); setTotal(total);
  };

  const onCreate = () => { setEditing(null); setShowForm(true); };
  const onEdit = (r) => { setEditing(r); setShowForm(true); };
  const onDelete = async (id) => {
    if (!confirm("Hapus data truk ini?")) return;
    await deleteTruck(id);
    await refresh();
  };
  const onSubmit = async (data) => {
    await saveTruck(data);
    setShowForm(false);
    await refresh();
  };

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Data Truk</h1>
        <div className="flex items-center gap-2">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Cari nopol/mesin/rangka…" className="input" />
          <button className="btn-primary" onClick={onCreate}>+ Tambah</button>
        </div>
      </header>

      {loading ? (
        <div className="text-sm text-slate-500">Memuat data…</div>
      ) : rows.length === 0 ? (
        <div className="text-sm text-slate-500">Belum ada data.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <Th>Nopol</Th>
                <Th>Wilayah / Agen</Th>
                <Th>Jenis</Th>
                <Th>Tahun</Th>
                <Th>KIR</Th>
                <Th>STNK</Th>
                <Th>Status</Th>
                <Th>Aksi</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <Td className="font-medium">{r.nopol}</Td>
                  <Td>
                    <div className="text-slate-800">{r.wilayah || "-"}</div>
                    <div className="text-xs text-slate-500">{r.agen || "-"}</div>
                  </Td>
                  <Td>{r.jenis || "-"}</Td>
                  <Td>{r.tahun || "-"}</Td>
                  <Td><ExpiryBadge date={r.kir_exp} /></Td>
                  <Td><ExpiryBadge date={r.stnk_exp} /></Td>
                  <Td>{r.active ? "Aktif" : "Nonaktif"}</Td>
                  <Td>
                    <div className="flex gap-2">
                      <button className="btn-ghost" onClick={()=>onEdit(r)}>Edit</button>
                      <button className="btn-ghost text-red-600" onClick={()=>onDelete(r.id)}>Hapus</button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-semibold">{editing?.id ? "Edit Truk" : "Tambah Truk"}</div>
              <button className="text-slate-500" onClick={()=>setShowForm(false)}>✕</button>
            </div>
            <TruckForm initial={editing} masters={masters} onCancel={()=>setShowForm(false)} onSubmit={onSubmit} />
          </div>
        </div>
      )}

      <style>{`.input{border:1px solid #e5e7eb;border-radius:.5rem;padding:.5rem .75rem}.btn-primary{background:#111827;color:#fff;border-radius:.5rem;padding:.5rem .75rem}.btn-ghost{border:1px solid #e5e7eb;border-radius:.5rem;padding:.5rem .75rem}.th,th{padding:.5rem .75rem;text-align:left}.td,td{padding:.5rem .75rem;vertical-align:top}`}</style>
    </section>
  );
}

function Th({ children }) { return <th className="th">{children}</th>; }
function Td({ children, className = "" }) { return <td className={`td ${className}`}>{children}</td>; }

// helpers
async function safeJenisList() {
  // jika kamu sudah punya tabel jenis_kendaraan, sebaiknya buat repo-nya.
  // sementara, fallback statis:
  return [
    { id: "static-pickup", nama: "Pickup" },
    { id: "static-box", nama: "Truk Box" },
    { id: "static-tangki", nama: "Truk Tangki" },
  ];
}
