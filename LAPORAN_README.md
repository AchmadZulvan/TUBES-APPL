# 📚 DAFTAR LAPORAN TUGAS APPL
## Aplikasi "Lapor Mangan!" - Purwokerto Culinary Finder

---

## 📋 Ringkasan Project

**Nama Aplikasi:** Lapor Mangan!  
**Jenis:** Progressive Web Application (PWA)  
**Tujuan:** Platform pencarian dan informasi kuliner UMKM Purwokerto  
**Teknologi:** HTML, CSS, JavaScript, Leaflet.js, Firebase, LocalStorage  

---

## 📂 Daftar Laporan

### 1️⃣ Laporan Week #10: Use Case & Analisis Sistem
📄 **File:** [`Laporan_Week10_UseCase.md`](Laporan_Week10_UseCase.md)

**Isi Laporan:**
- ✅ Analisis Kebutuhan Sistem (10 Fungsional, 5 Non-Fungsional)
- ✅ Use Case Diagram lengkap (24 Use Cases)
- ✅ Deskripsi detail setiap Use Case
- ✅ Analisis 3 Aktor (Visitor, Registered User, Admin)
- ✅ Skenario Use Case dengan contoh nyata
- ✅ Relasi: Include, Extend, Generalization
- ✅ Integrasi External Systems (Google OAuth, OpenWeather API, Leaflet)

**Use Cases:**
- UC-01 s/d UC-07: Fitur Visitor (7 use cases)
- UC-08 s/d UC-18: Fitur Registered User (11 use cases)
- UC-19 s/d UC-24: Fitur Admin (6 use cases)

**Total Halaman:** ~30 halaman  
**Status:** ✅ Lengkap

---

### 2️⃣ Laporan Week #11: Database Design
📄 **File:** [`Laporan_Week11_Database.md`](Laporan_Week11_Database.md)

**Isi Laporan:**
- ✅ Entity Relationship Diagram (ERD) ASCII art
- ✅ Skema Relasi 7 Tabel Database
- ✅ Penjelasan detail atribut setiap tabel
- ✅ Kardinalitas relasi (1:1, 1:M, M:N)
- ✅ Normalisasi database (3NF)
- ✅ Contoh SQL Query
- ✅ Mapping 24 Use Case ke Database
- ✅ Index recommendations

**Tabel Database:**
1. **Kuliner** - 17 atribut (data tempat kuliner)
2. **User** - 7 atribut (data pengguna)
3. **Review** - 7 atribut (review & rating)
4. **Submission** - 18 atribut (submission kuliner baru)
5. **Favorite** - 4 atribut (daftar favorit user)
6. **News** - 10 atribut (berita & artikel)
7. **Promo** - 10 atribut (promo kuliner)

**Total Halaman:** ~25 halaman  
**Status:** ✅ Lengkap

---

## 🎯 Mapping Use Case ke Database

| Use Case | Tabel Terkait |
|----------|---------------|
| UC-01: Lihat Daftar Kuliner | Kuliner |
| UC-02: Lihat Detail Kuliner | Kuliner, Review |
| UC-03: Filter Kuliner | Kuliner |
| UC-04: Cari Kuliner | Kuliner |
| UC-05: Lihat Peta Lokasi | Kuliner |
| UC-06: Lihat Info Cuaca | - (External API) |
| UC-07: Chat dengan Bot | - (Knowledge Base) |
| UC-08: Login | User |
| UC-09: Logout | User |
| UC-10: Lihat Profil | User, Review, Favorite |
| UC-11: Tambah Review | Review |
| UC-12: Beri Rating | Review |
| UC-13: Upload Foto Review | Review |
| UC-14: Tambah ke Favorit | Favorite |
| UC-15: Hapus dari Favorit | Favorite |
| UC-16: Lihat Daftar Favorit | Favorite, Kuliner |
| UC-17: Submit Kuliner Baru | Submission |
| UC-18: Upload Foto Kuliner | Submission |
| UC-19: Approve Submission | Submission, Kuliner |
| UC-20: Edit Data Kuliner | Kuliner |
| UC-21: Hapus Kuliner | Kuliner |
| UC-22: Tambah Promo | Promo |
| UC-23: Edit Promo | Promo |
| UC-24: Tambah Berita | News |

---

## 📊 Statistik Project

### Fitur Aplikasi
- 🎯 **24 Use Cases** implemented
- 👥 **3 Tipe Aktor** (Visitor, User, Admin)
- 🗄️ **7 Tabel Database**
- 🔗 **3 External APIs** (Google, OpenWeather, Leaflet)

### Data Awal
- 📍 **10 Kuliner** default (initialKulinerData)
- 🏷️ **4 Kategori** (Makanan Berat, Ringan, Minuman, Dessert)
- ⭐ **Rating**: 1-5 bintang
- 💰 **Harga**: Rp5.000 - Rp100.000

### Teknologi Stack
```
Frontend:
- HTML5, CSS3, JavaScript ES6
- Leaflet.js v1.9.4 (Maps)
- Font Awesome 6.5.1 (Icons)

Backend:
- Firebase Authentication (OAuth)
- LocalStorage (Prototype)
- OpenWeather API (Weather)

Development:
- Python HTTP Server
- Git Version Control
- VS Code Editor
```

---

## 📝 Cara Menggunakan Laporan

### Untuk Convert ke PDF:

#### Opsi 1: VS Code Extension
1. Install extension "Markdown PDF"
2. Buka file `.md`
3. Klik kanan → "Markdown PDF: Export (pdf)"
4. PDF tersimpan di folder yang sama

#### Opsi 2: Online Converter
1. Buka https://www.markdowntopdf.com/
2. Upload file `.md`
3. Download PDF

#### Opsi 3: Pandoc (Command Line)
```bash
# Install pandoc terlebih dahulu
pandoc Laporan_Week10_UseCase.md -o Laporan_Week10_UseCase.pdf
pandoc Laporan_Week11_Database.md -o Laporan_Week11_Database.pdf
```

---

## ✏️ Yang Perlu Dilengkapi

Sebelum submit, pastikan mengisi informasi berikut di **KEDUA** file laporan:

### Di Halaman Cover:
- [ ] `[Nomor Kelompok]` → contoh: Kelompok 5
- [ ] `[NIM 1]` → contoh: 123456789
- [ ] `[Nama Anggota 1]` → contoh: Ahmad Rizki
- [ ] `[NIM 2]`, `[Nama Anggota 2]` → (dst untuk 4 anggota)
- [ ] `[Nama Dosen]` → contoh: Dr. Budi Santoso, M.Kom
- [ ] `[Program Studi]` → contoh: Teknik Informatika
- [ ] `[Nama Universitas]` → contoh: Universitas Jenderal Soedirman

### Checklist Submit:
- [ ] Isi semua placeholder di Laporan_Week10_UseCase.md
- [ ] Isi semua placeholder di Laporan_Week11_Database.md
- [ ] Convert kedua laporan ke PDF
- [ ] Periksa formatting PDF (tabel, diagram, daftar isi)
- [ ] Compress kedua PDF jadi 1 ZIP (jika diminta)
- [ ] Upload ke LMS sebelum deadline

---

## 🔗 Link Terkait

- **Repository GitHub:** https://github.com/hanif-12-01/TUBES-APPL.git
- **Live Demo:** https://hanif-12-01.github.io/TUBES-APPL/
- **API Documentation:**
  - Google OAuth: https://developers.google.com/identity/sign-in/web
  - OpenWeather API: https://openweathermap.org/api
  - Leaflet.js: https://leafletjs.com/

---

## 📞 Kontak

Jika ada pertanyaan terkait laporan atau project, hubungi:
- **Email:** [email kelompok]
- **WhatsApp:** [nomor ketua kelompok]

---

## 📅 Timeline

| Week | Deliverable | Status | Deadline |
|------|-------------|--------|----------|
| 10 | Use Case Diagram & Analisis | ✅ Selesai | [Tanggal] |
| 11 | Database Design | ✅ Selesai | [Tanggal] |
| 12 | Implementation Phase 1 | 🔄 Progress | [Tanggal] |
| 13 | Implementation Phase 2 | ⏳ Pending | [Tanggal] |
| 14 | Testing & Deployment | ⏳ Pending | [Tanggal] |

---

## 📌 Catatan Penting

### Perbedaan Kedua Laporan:

**Laporan Week 10 (Use Case):**
- Fokus pada **analisis kebutuhan** dan **interaksi sistem**
- Menjelaskan **APA** yang dilakukan sistem
- Perspektif: User/Actor oriented
- Tools: Use Case Diagram, Skenario

**Laporan Week 11 (Database):**
- Fokus pada **struktur data** dan **relasi**
- Menjelaskan **BAGAIMANA** data disimpan
- Perspektif: Data oriented
- Tools: ERD, Schema, SQL

### Tips Presentasi:
1. **Week 10**: Jelaskan flow user dari login sampai review kuliner
2. **Week 11**: Tunjukkan bagaimana data tersimpan di database saat user melakukan action
3. Gunakan contoh nyata dari aplikasi
4. Siapkan demo live jika diminta

---

**Terakhir diupdate:** 17 Desember 2024  
**Versi:** 1.0  
**Kelompok:** [Nomor Kelompok]  

---

*Semoga sukses! 🚀*
