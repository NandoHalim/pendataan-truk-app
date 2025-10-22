// src/components/trucks/TruckForm.jsx
import { useEffect, useMemo, useState } from "react";
import { isNopolValid, isYearValid, isFutureOrToday } from "../../utils/validators.js";
import { isNopolTaken } from "../../services/repositories/trucksRepo.js";

const empty = {
  nopol: "",
  wilayah_id: "",
  agen_id: "",
  jenis_id: "",
  tahun: "",
  kir_exp: "",
  stnk_exp: "",
  engine_number: "",
  chassis_number: "",
  active: true,
  notes: "",
};

export default function TruckForm({ initial, masters, onCancel, onSubmit }) {
  const [f, setF] = useState({ ...empty, ...(initial || {}) });
  const [errors, setErrors] = useState({});
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    setF({ ...empty, ...(initial || {}) });
    setErrors({});
  }, [initial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setF((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = async () => {
    const e = {};
    // nopol
    if (!f.nopol) e.nopol = "Nopol wajib diisi";
    else if (!isNopolValid(f.nopol)) e.nopol = "Format nopol tidak valid (contoh: DB 1234 AB)";
    else {
      setChecking(true);
      try {
        const taken = await isNopolTaken(f.nopol, f.id);
        if (taken) e.nopol = "Nopol sudah terdaftar";
      } finally {
        setChecking(false);
      }
    }

    // relasi
    if (!f.wilayah_id) e.wilayah_id = "Pilih wilayah";
    if (!f.agen_id) e.agen_id = "Pilih agen";
    if (!f.jenis_id) e.jenis_id = "Pilih jenis";

    // tahun
    if (f.tahun && !isYearValid(f.tahun)) e.tahun = "Tahun di luar rentang wajar";

    // tanggal
    if (f.kir_exp && !isFutureOrToday(f.kir_exp)) e.kir_exp = "Tanggal KIR harus ≥ hari ini";
    if (f.stnk_exp && !isFutureOrToday(f.stnk_exp)) e.stnk_exp = "Tanggal STNK harus ≥ hari ini";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (await validate()) onSubmit?.(normalize(f));
  };

  const { wilayahList = [], agenList = [], jenisList = [] } = masters || {};

  return (
    <form className="space-y-3" onSubmit={submit}>
      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Nopol" error={errors.nopol}>
          <input name="nopol" value={f.nopol} onChange={handleChange} className="input" placeholder="DB 1234 AB" />
        </Field>

        <Field label="Jenis" error={errors.jenis_id}>
          <select name="jenis_id" value={f.jenis_id || ""} onChange={handleChange} className="input">
            <option value="">-- Pilih --</option>
            {jenisList.map((x) => <option key={x.id} value={x.id}>{x.nama || x.name}</option>)}
          </select>
        </Field>

        <Field label="Wilayah" error={errors.wilayah_id}>
          <select name="wilayah_id" value={f.wilayah_id || ""} onChange={handleChange} className="input">
            <option value="">-- Pilih --</option>
            {wilayahList.map((x) => <option key={x.id} value={x.id}>{x.nama || x.name}</option>)}
          </select>
        </Field>

        <Field label="Agen" error={errors.agen_id}>
          <select name="agen_id" value={f.agen_id || ""} onChange={handleChange} className="input">
            <option value="">-- Pilih --</option>
            {agenList
              .filter((a) => !f.wilayah_id || a.wilayah_id === f.wilayah_id) // filter by wilayah
              .map((x) => <option key={x.id} value={x.id}>{x.nama || x.name}</option>)}
          </select>
        </Field>

        <Field label="Tahun" error={errors.tahun}>
          <input name="tahun" value={f.tahun || ""} onChange={handleChange} className="input" type="number" min="1990" max={new Date().getFullYear() + 1} />
        </Field>

        <Field label="KIR Exp" error={errors.kir_exp}>
          <input name="kir_exp" value={f.kir_exp || ""} onChange={handleChange} className="input" type="date" />
        </Field>

        <Field label="STNK Exp" error={errors.stnk_exp}>
          <input name="stnk_exp" value={f.stnk_exp || ""} onChange={handleChange} className="input" type="date" />
        </Field>

        <Field label="Engine Number">
          <input name="engine_number" value={f.engine_number || ""} onChange={handleChange} className="input" />
        </Field>

        <Field label="Chassis Number">
          <input name="chassis_number" value={f.chassis_number || ""} onChange={handleChange} className="input" />
        </Field>

        <Field label="Aktif">
          <input type="checkbox" name="active" checked={!!f.active} onChange={handleChange} />
        </Field>
      </div>

      <Field label="Catatan">
        <textarea name="notes" value={f.notes || ""} onChange={handleChange} className="input" rows={3} />
      </Field>

      <div className="flex items-center gap-2">
        <button className="btn-primary" type="submit" disabled={checking}>
          {initial?.id ? "Simpan Perubahan" : "Simpan"}
        </button>
        <button className="btn-ghost" type="button" onClick={onCancel}>Batal</button>
        {checking && <span className="text-xs text-slate-500">cek nopol…</span>}
      </div>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <div className="text-sm font-medium mb-1">{label}</div>
      {children}
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
      <style>{`.input{width:100%;border:1px solid #e5e7eb;border-radius:.5rem;padding:.5rem .75rem}.btn-primary{background:#111827;color:#fff;border-radius:.5rem;padding:.5rem .75rem}.btn-ghost{border:1px solid #e5e7eb;border-radius:.5rem;padding:.5rem .75rem}`}</style>
    </label>
  );
}

function normalize(x) {
  return {
    ...x,
    nopol: (x.nopol || "").toUpperCase().replace(/\s+/g, " ").trim(),
    tahun: x.tahun ? Number(x.tahun) : null,
  };
}
