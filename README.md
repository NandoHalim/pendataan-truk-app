# Pendataan Truk – Web (Vite + React) + Supabase

Aplikasi pendataan truk agen LPG. Siap deploy di **Vercel**, database **Supabase**.

## 🚀 Quick Start
```bash
npm i
cp .env.example .env
# isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY
npm run dev
```

## 🏗️ Build & Deploy (Vercel)
- Hubungkan repo ke Vercel → `Framework: Vite`
- Tambahkan **Environment Variables**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Deploy

## 📦 Struktur Folder
Lihat komentar di `src/` – modular (components/pages/services/hooks/utils/context).

## 🔐 Auth & Role
- `useAuthRole` saat ini stub; ganti membaca role dari Supabase (auth + table `app_user_meta`). 
- Sesuai requirement: **Admin menyembunyikan menu Pengaturan** (showSettings = role !== 'admin').

## 🔌 Supabase
- Client di `src/services/api/supabaseClient.js`
- Repos di `src/services/repositories/*`
- DataService sebagai façade satu pintu.

## 🧪 Mock Data
- Tanpa env Supabase, app pakai **mock data** agar bisa dilihat langsung.

## 📋 TODO (lanjutan)
- Tambah RLS & skema tabel (trucks, truck_inspections, wilayah, agen, jenis_kendaraan)
- Implement upload dokumen (STNK/KIR) via Supabase Storage
- Tanda tangan & GPS saat submit
- Export laporan (Excel/PDF)
