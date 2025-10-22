# 🚛 Pendataan Truk App

Aplikasi **Pendataan Truk** adalah sistem web berbasis **React + Vite + Supabase** untuk mengelola data kendaraan (truk), wilayah penyaluran, agen, dan inspeksi berkala.  
Proyek ini dirancang dengan pendekatan modular, mobile-first, dan mudah dikembangkan.

---

## 🧩 Tech Stack
| Layer | Teknologi |
|-------|------------|
| Frontend | React 18, Vite, React Router DOM |
| UI Library | TailwindCSS |
| Backend | Supabase (PostgreSQL + Row Level Security) |
| Hosting | Vercel |
| Deployment | SPA Rewrite (via `vercel.json`) |

---

## 📁 Struktur Folder
```
pendataan-truk-app/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json                # Rewrite SPA untuk Vercel
├── public/
│   └── icons/
├── src/
│   ├── api/
│   │   └── supabaseClient.js  # Inisialisasi koneksi Supabase
│   ├── components/
│   │   ├── layout/            # Komponen global (navbar, header, dsb)
│   │   ├── shared/            # Komponen reusable (KpiCard, Badge, dll)
│   │   ├── trucks/            # Form & tabel data truk
│   │   └── inspections/       # Komponen checklist inspeksi
│   ├── context/               # Context global (Auth, Settings)
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Halaman utama aplikasi
│   ├── services/
│   │   ├── DataService.js     # Layer logika bisnis utama
│   │   └── repositories/      # Akses data ke tabel Supabase
│   ├── utils/                 # Helper & constants
│   ├── styles/                # Global CSS (Tailwind)
│   ├── App.jsx                # Root app (routing)
│   └── main.jsx               # Entry point
```

---

## ⚙️ Setup & Instalasi

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<username>/pendataan-truk-app.git
cd pendataan-truk-app
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Konfigurasi Environment
Buat file `.env.local` di root proyek:
```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx
```

### 4️⃣ Jalankan di Lokal
```bash
npm run dev
```
Akses di: [http://localhost:5173](http://localhost:5173)

---

## 🚀 Deployment (Vercel)
Aplikasi ini sudah dikonfigurasi untuk Vercel SPA routing.

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Langkah:
1. Deploy ke Vercel (hubungkan repo GitHub).
2. Set environment variables di Dashboard Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Jalankan redeploy.

---

## 🧠 Arsitektur Data (Supabase)
Tabel utama:
- `trucks` — data kendaraan
- `wilayah` — wilayah distribusi
- `agen` — data agen
- `jenis_kendaraan` — master jenis truk
- `truck_inspections` — hasil pemeriksaan kendaraan

Fungsi dan trigger utama:
- `propagate_wilayah_name()`
- `propagate_agen_name()`
- `propagate_jenis_name()`
- `trucks_set_denorm_names()`

Setiap perubahan nama di master otomatis memperbarui kolom denormalisasi di tabel `trucks`.

---

## 📊 Fitur Utama
- CRUD Data Truk  
- Data Master (Wilayah, Agen, Jenis Kendaraan)
- Checklist Inspeksi
- Validasi Input & Badge Masa Berlaku
- Dashboard KPI (Omzet, Total Truk, Piutang, dll)
- Mobile-first Layout dengan Bottom Navigation
- Integrasi penuh dengan Supabase

---

## 🧩 Rencana Pengembangan
- 📅 Laporan Inspeksi Mingguan / Bulanan
- 📊 Analitik Dashboard
- 🔐 Login / Role Management (Admin–User)
- ☁️ Sinkronisasi Offline (IndexedDB)

---

## 🧑‍💻 Kontributor
- **Nando Halim** — Fullstack Developer (React + Supabase)
- OpenAI ChatGPT-5 — Asisten pengembang & dokumentasi teknis
