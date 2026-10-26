# Rent It Campus

**Platform Penyewaan Perangkat Elektronik & Fasilitas Kampus untuk Mahasiswa.**

Rent It Campus adalah aplikasi web statis (front-end prototype) yang memudahkan mahasiswa menyewa laptop, kamera, proyektor, dan perlengkapan perkuliahan lain — lengkap dengan E-Tiket, kontrak sewa digital berformat PDF, dan sistem poin loyalty.

> Status: **prototipe front-end**. Semua data (akun, sesi, booking) disimpan di `localStorage` browser, belum ada backend/database.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_CDN-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)

---

## Fitur Utama

### 1. Katalog Produk & Penyewaan
Layanan sewa laptop, kamera, proyektor, dan perlengkapan perkuliahan. Katalog dirender dinamis dari JavaScript dengan filter kategori, pencarian, pilihan sub-model, add-on kontekstual, perhitungan durasi, biaya kurir, asuransi, serta penyesuaian harga *peak season*.

### 2. Sistem Otentikasi Prototipe
Fitur Login dan Register berbasis **Local Storage** dengan animasi transisi sinematik: logo dan tombol *Back* memudar naik, kartu auth membesar dari skala `0.99` ke `1`, dan baris headline muncul dengan efek *wipe up*. Halaman auth memakai layout dua kolom (hero + panel form) yang responsif menjadi satu kolom di mobile.

### 3. Fitur Kontrak & Sertifikat
Integrasi pencetakan **kontrak digital** dan **kode QR** menggunakan **jsPDF**: surat perjanjian sewa 13 pasal, sampul dengan blok verifikasi QR, lampiran daftar perangkat & rincian biaya, serta berita acara serah terima — bisa dipratinjau di tab baru dan diunduh sebagai `.pdf`.

---

## Teknologi yang Digunakan

| Lapisan | Teknologi & Pemanfaatan |
| --- | --- |
| **HTML5 & CSS3** | Struktur semantik, *responsive layout*, CSS *keyframe animations*, dan *custom properties* (`--ric-ink`, `--ric-card`, `--ric-amber`) untuk tema halaman auth. |
| **Tailwind CSS & Font Awesome** | Styling berbasis CDN untuk halaman katalog dan *UI icons* (Font Awesome 6). |
| **Vanilla JavaScript** | *Event handling* (filter, checkout, toggle password), *localStorage state management* (akun, sesi, poin), dan *dynamic rendering* katalog. |
| **JS Libraries** | **jsPDF 2.5.1** (generator PDF) dan **QRCode.js** (blok verifikasi) via CDN. |

---

## Struktur File Repositori

```
rent-it-campus/
├── index.html          # Beranda: hero, katalog produk, hubs & loyalty, modal auth/checkout/tiket
├── login.html          # Halaman login satu layar (hero + form, animasi masuk)
├── register.html       # Halaman pendaftaran (struktur sama dengan login, simpan ke localStorage)
├── css/
│   └── style.css       # Gaya kustom: modal, toast, kartu hub, tema & animasi halaman auth
├── js/
│   ├── app.js          # Data produk, rendering katalog, auth, checkout, E-Tiket, wiring PDF
│   └── contract.js     # Generator kontrak PDF (sampul, 13 pasal, lampiran, QR)
└── README.md
```

Tidak ada proses build — seluruh dependensi dimuat lewat CDN dan file dibuka langsung di browser.

---

## Cara Menjalankan

### Opsi 1 — Buka langsung
Klik dua kali `index.html`, atau buka di browser:

```
file:///path/ke/rent-it-campus/index.html
```

Semua fitur inti (katalog, login/register, E-Tiket, unduh kontrak PDF) berjalan tanpa server. Pastikan terhubung internet agar CDN Tailwind, Font Awesome, jsPDF, QRCode, dan gambar katalog termuat.

### Opsi 2 — Local server (disarankan)
Menjalankan lewat server lokal menghindari batasan `file://` pada beberapa browser:

```bash
# Python 3
python3 -m http.server 3000

# atau Node.js
npx serve .
```

Lalu buka <http://localhost:3000>.

### Opsi 3 — Live preview Netlify
Karena situs sepenuhnya statis, cukup buka [Netlify Drop](https://app.netlify.com/drop) dan tarik folder proyek ke sana — Netlify langsung memberi URL live preview tanpa konfigurasi build.

---

## Alur Demo Singkat

1. Buka `index.html` → pilih produk di katalog → klik tombol panah pada kartu produk.
2. Isi formulir sewa (tipe unit, durasi, tanggal, hub, asuransi, add-on) → konfirmasi untuk menerbitkan E-Tiket.
3. Di modal E-Tiket, klik **Preview** (PDF di tab baru) atau **Unduh (PDF)** untuk kontrak sewa.
4. Untuk mencoba akun: buka **`register.html`** → daftar → otomatis diarahkan ke **`login.html`** → masuk → kembali ke beranda dengan sesi aktif dan poin loyalty.

---

## Catatan Keamanan

Proyek ini adalah prototipe untuk keperluan demonstrasi UI/UX dan alur produk:

- Password disimpan **plaintext** di `localStorage` (`ric_users`) — jangan gunakan kredensial nyata.
- Autentikasi berjalan sepenuhnya di sisi klien, sehingga bisa dimanipulasi dari DevTools.
- Tombol **Continue with Google** belum terhubung OAuth (menampilkan notifikasi "sedang dalam pengembangan").
- Untuk produksi, perlu backend, hashing password, sesi server-side, dan validasi pembayaran.
