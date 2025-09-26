# Course Web Landing Page

Landing page sederhana untuk website kursus / kelas online.  
Repository ini berisi kode **HTML, CSS, dan JavaScript statis** untuk menampilkan halaman informasi kursus.  
👉 Live site: [home.fahimturast.com](https://home.fahimturast.com)

---

## 🎯 Fitur Utama

- ✅ Halaman beranda (`index.html`)
- ✅ Halaman kelas (`kelas.html`)
- ✅ Halaman kitab (`kitab.html`)
- ✅ Halaman tentang (`tentang.html`)
- ✅ Halaman kontak (`kontak.html`)
- ✅ Sitemap (`sitemap.xml`) untuk SEO
- ✅ Data FAQ dalam format JSON (`faq.json`)
- ✅ CSS kustom & JavaScript ringan

---

## 📂 Struktur Direktori

/
├── components/ # Komponen HTML (opsional)
├── css/ # File CSS styling
├── image/ # Asset gambar (logo, ilustrasi, dsb)
├── js/ # File JavaScript frontend
├── faq.json # Data FAQ
├── index.html # Halaman utama
├── kelas.html # Halaman kursus
├── kitab.html # Halaman "kitab"
├── kontak.html # Halaman kontak
├── tentang.html # Halaman profil / tentang
└── sitemap.xml # Sitemap untuk SEO

---

## 🛠 Cara Menjalankan di Lokal

Karena ini adalah proyek **statis**, tidak ada setup rumit. Cukup ikuti langkah berikut:

1. Clone repository
   ```bash
   git clone https://github.com/Mihalhayail/course-web.git
   cd course-web
   ```

Buka file HTML langsung di browser (contoh: index.html), atau gunakan server lokal:

# Menggunakan Python 3

python3 -m http.server 8000

Lalu akses di: http://localhost:8000

⚠️ Catatan: Jika ingin load faq.json, jalankan lewat server lokal, jangan langsung buka file via file:// agar tidak kena masalah CORS.

📦 Requirement

Browser modern (Chrome, Firefox, Edge, Safari)

Tidak butuh Node.js / database

Opsional: VSCode + Live Server untuk preview cepat

🌐 Deployment

Proyek ini bisa di-deploy ke layanan hosting statis, seperti:

GitHub Pages

Vercel / Netlify

Firebase Hosting

Shared hosting (upload ke folder public_html)

Pastikan semua file (HTML, CSS, JS, JSON, gambar, dan sitemap) diikutkan ke folder publik.

🤝 Kontribusi

Kontribusi sangat terbuka!
Langkah umum:

Fork repository

Buat branch baru (feature/nama-fitur)

Commit perubahan

Ajukan Pull Request

👤 Tentang

Author: Mihalhayail

Live site: home.fahimturast.com

Deskripsi: Website statis untuk kebutuhan kursus / kelas online.

🚀 Ide Pengembangan ke Depan

Tambah desain responsive penuh untuk mobile

Integrasi dengan CMS (misalnya Notion API / Headless CMS)

Tambah form kontak dengan backend / email API

Optimasi SEO & performa

Animasi / interaktivitas UI yang lebih halus
