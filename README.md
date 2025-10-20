# 🚛 Pendataan Truk App

Aplikasi web untuk **pendataan truk, inspeksi kendaraan, dan pelaporan operasional**, dibangun dengan teknologi **React + Vite + Supabase** dan desain **mobile-first** menggunakan Tailwind CSS serta komponen modular.

---

## 🧱 **Struktur Proyek**

```
pendataan-truk-app/
├── public/
│   └── favicon.svg
│
├── src/
│   ├── api/
│   │   └── supabaseClient.js             # Inisialisasi koneksi Supabase
│   │
│   ├── components/                       # Komponen modular dan reusable
│   │   ├── inspections/
│   │   │   └── ChecklistCard.jsx         # Kartu checklist inspeksi
│   │   ├── layout/
│   │   │   └── AppLayout.jsx             # Layout utama dengan navigasi bawah
│   │   ├── shared/
│   │   │   ├── BottomNav.jsx             # Navigasi bawah (mobile)
│   │   │   ├── ExpiryBadge.jsx           # Penanda masa berlaku
│   │   │   └── KpiCard.jsx               # Kartu KPI ringkas
│   │   ├── trucks/
│   │   │   ├── TruckForm.jsx             # Form tambah/edit data truk
│   │   │   └── TruckTable.jsx            # Tabel daftar truk
│   │   └── ui/
│   │       ├── Button.jsx                # Tombol kustom
│   │       ├── Card.jsx                  # Kartu kontainer
│   │       └── Responsive.jsx            # Grid dan layout responsif
│   │
│   ├── context/
│   │   ├── AuthContext.jsx               # Konteks autentikasi pengguna
│   │   └── SettingsContext.jsx           # Konteks konfigurasi aplikasi
│   │
│   ├── hooks/
│   │   ├── useAuthRole.js                # Hook untuk role pengguna
│   │   ├── useDropdowns.js               # Hook dropdown dinamis
│   │   ├── useInspections.js             # Hook data inspeksi
│   │   └── useTrucks.js                  # Hook data truk
│   │
│   ├── pages/                            # Halaman utama aplikasi
│   │   ├── Dashboard.jsx
│   │   ├── Inspections.jsx
│   │   ├── Reports.jsx
│   │   ├── Settings.jsx
│   │   └── Trucks.jsx
│   │
│   ├── services/
│   │   ├── DataService.js                # Pusat logika bisnis & akses data
│   │   └── repositories/
│   │       ├── inspectionsRepo.js        # Query terkait inspeksi
│   │       ├── masterRepo.js             # Master data umum
│   │       └── trucksRepo.js             # Query terkait truk
│   │
│   ├── styles/
│   │   └── globals.css                   # Style global + import Tailwind
│   │
│   ├── utils/
│   │   ├── constants.js                  # Konstanta global
│   │   ├── date.js                       # Utilitas tanggal
│   │   ├── logger.js                     # Logging helper
│   │   └── validators.js                 # Validator input/form
│   │
│   ├── App.jsx                           # Root komponen aplikasi
│   ├── main.jsx                          # Entry point React + Router
│   └── theme.js                          # Konfigurasi tema MUI
│
├── .env.example                          # Template environment variables
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
└── README.md
```

---

## ⚙️ **Teknologi Utama**
| Kategori | Teknologi |
|-----------|------------|
| Frontend Framework | **React + Vite** |
| UI Framework | **Tailwind CSS**, komponen modular custom |
| Backend & Database | **Supabase** |
| State Management | React Context API |
| Routing | React Router DOM |
| Deployment | Vercel |
| Lainnya | Mobile-First Design, Modular Hooks, Repository Pattern |

---

## 🚀 **Fitur Utama**
- 📋 **Pendataan Truk** — tambah, ubah, dan lihat data truk.
- 🔍 **Inspeksi & Checklist** — pencatatan hasil pemeriksaan kendaraan.
- 📊 **Dashboard KPI** — menampilkan ringkasan kinerja operasional.
- ⚙️ **Pengaturan Aplikasi** — konfigurasi preferensi pengguna.
- 📱 **Desain Mobile-First** — optimal di layar kecil dengan bottom navigation.
- 🧩 **Struktur Modular** — pemisahan logika bisnis & tampilan (MV-style).

---

## 🧰 **Cara Menjalankan**
1. Clone repositori:
   ```bash
   git clone https://github.com/username/pendataan-truk-app.git
   cd pendataan-truk-app
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

3. Buat file `.env` berdasarkan `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Isi dengan kredensial Supabase kamu.

4. Jalankan proyek:
   ```bash
   npm run dev
   ```

5. Buka di browser:
   ```
   http://localhost:5173
   ```

---

## 📦 **Build & Deploy**
Untuk build production:
```bash
npm run build
```
Output akan tersimpan di folder `dist/`, siap untuk dideploy ke **Vercel** atau platform lain.

---

## 🧑‍💻 **Kontributor**
**Developer:** Nando Halim  
📍 Indonesia  
✉️ halimaprillia22@gmail.com
