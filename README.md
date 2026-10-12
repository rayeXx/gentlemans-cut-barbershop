# Aslab SIBER — Portal Web & Autentikasi (CPMK Ready)

Repositori resmi untuk proyek laboratorium **Aslab SIBER (Keamanan Siber & Jaringan)**. Dibuat dengan metode **vibe coding di Antigravity** dan siap diedit/diinspeksi di **Cursor**.

---

## 📋 Dekode Catatan Rapat Aslab & Glosarium Istilah

Berikut terjemahan istilah dan catatan rapat dari Rayhan F:

| Istilah di Catatan | Istilah Teknis yang Benar | Penjelasan & Fungsi |
|---|---|---|
| **anti gravity** | **Google Antigravity** | AI coding agent untuk scaffolding proyek besar secara menyeluruh & otomatis (*vibe coding*). |
| **cursor** | **Cursor IDE** | Code editor berbasis AI (fork VS Code) untuk inspeksi kode, minor edit, dan perapian. |
| **engirox** | **ngrok** | Tool reverse proxy / tunneling localhost ke URL publik HTTPS (agar dosen bisa tes dari HP/jaringan luar). |
| **exkiro** | **Excalidraw** | Papan gambar virtual (whiteboard) untuk membuat wireframe, sketsa UI, dan diagram alur sistem/PRD. |
| **9 router** | **OpenRouter** | Gateway API untuk mengakses berbagai model AI (Claude, GPT, Gemini) secara terpadu di Cursor. |
| **suppa base** | **Supabase** | Backend-as-a-Service (BaaS) berbasis PostgreSQL dengan fitur Google Auth bawaan. |
| **hermes web di docker** | **Hermes Web / Docker** | Containerization aplikasi web/runtime di atas Docker engine. |
| **PRD** | **Product Requirement Document** | Dokumen acuan fitur, user persona, dan arsitektur sebelum coding (lihat file `PRD.md`). |
| **Ujian CPMK** | **Evaluasi Capaian Pembelajaran** | Target minggu depan: UI login web yang bisa sign-in dengan Gmail. |

---

## 🚀 Cara Menjalankan Aplikasi Web

### 1. Masuk ke Direktori Web
```bash
cd web
```

### 2. Jalankan Server Development
```bash
npm run dev
```

Buka browser di: [http://localhost:3000](http://localhost:3000)

### 3. Demonstrasi Login with Gmail
- **Mode Demo (Default)**: Klik tombol putih **"Lanjutkan dengan Google"**. Sistem akan mensimulasikan login akun Google Aslab secara instan dan langsung menampilkan dashboard terverifikasi CPMK!
- **Mode Supabase Live**: Buat file `.env.local` di folder `web/` (salin dari `.env.local.example`), lalu masukkan kunci Supabase Anda.

---

## 🌐 Alur Deployment (Antigravity → GitHub → Vercel)

1. **Inisialisasi Git di Root**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete UI login with gmail and PRD for CPMK"
   ```
2. **Push ke GitHub**:
   - Buat repositori baru di GitHub (misal: `aslab-siber-web`).
   - Sambungkan remote:
     ```bash
     git remote add origin https://github.com/<username>/aslab-siber-web.git
     git branch -M main
     git push -u origin main
     ```
3. **Deploy ke Vercel**:
   - Buka [vercel.com](https://vercel.com) > **Add New Project**.
   - Pilih repositori GitHub Anda.
   - Atur **Root Directory** ke: `web`.
   - Klik **Deploy**! Web langsung live dengan URL HTTPS gratis.
