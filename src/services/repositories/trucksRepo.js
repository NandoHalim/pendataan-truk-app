// src/services/repositories/trucksRepo.js
import { supabase } from "../../api/supabaseClient.js";

export async function listTrucks({ q = "", page = 1, pageSize = 20, order = "created_at.desc" } = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("trucks")
    .select(
      `
      id, nopol, engine_number, chassis_number,
      wilayah_id, agen_id, jenis_id,
      wilayah, agen, jenis,
      tahun, kir_exp, stnk_exp,
      active, notes, created_at, updated_at
      `,
      { count: "exact" }
    )
    .range(from, to);

  if (q) {
    query = query.or(`nopol.ilike.%${q}%,engine_number.ilike.%${q}%,chassis_number.ilike.%${q}%`);
  }

  if (order) {
    const [field, dir] = order.split(".");
    query = query.order(field, { ascending: dir !== "desc" });
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { rows: data ?? [], total: count ?? 0, page, pageSize };
}

export async function getTruck(id) {
  const { data, error } = await supabase
    .from("trucks")
    .select(
      `
      id, nopol, engine_number, chassis_number,
      wilayah_id, agen_id, jenis_id,
      wilayah, agen, jenis,
      tahun, kir_exp, stnk_exp,
      active, notes, created_at, updated_at
      `
    )
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function saveTruck(payload) {
  // insert jika tak ada id, else update
  const body = sanitize(payload);
  const { data, error } = await supabase
    .from("trucks")
    .upsert(body, { onConflict: "nopol" }) // tetap aman jika unique constraint ada
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTruck(id) {
  const { error } = await supabase.from("trucks").delete().eq("id", id);
  if (error) throw error;
  return { ok: true };
}

export async function isNopolTaken(nopol, excludeId = null) {
  let q = supabase.from("trucks").select("id").eq("nopol", (nopol || "").toUpperCase().trim());
  if (excludeId) q = q.neq("id", excludeId);
  const { data, error } = await q.limit(1);
  if (error) throw error;
  return (data ?? []).length > 0;
}

function sanitize(p) {
  return {
    id: p.id ?? undefined,
    nopol: (p.nopol || "").toUpperCase().replace(/\s+/g, " ").trim(),
    engine_number: (p.engine_number || "").trim() || null,
    chassis_number: (p.chassis_number || "").trim() || null,

    wilayah_id: p.wilayah_id || null,
    agen_id: p.agen_id || null,
    jenis_id: p.jenis_id || null,

    tahun: p.tahun ? Number(p.tahun) : null,
    kir_exp: p.kir_exp || null,
    stnk_exp: p.stnk_exp || null,

    active: typeof p.active === "boolean" ? p.active : true,
    notes: p.notes || null,
  };
}
