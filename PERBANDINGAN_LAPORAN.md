# 📊 PERBANDINGAN LAPORAN WEEK 10 VS WEEK 11

## Aplikasi "Lapor Mangan!" - Purwokerto Culinary Finder

---

## 🎯 Quick Summary

| Aspek | Week 10 (Use Case) | Week 11 (Database) |
|-------|-------------------|-------------------|
| **Judul Laporan** | Use Case Diagram & Analisis Sistem | Perancangan Basis Data |
| **File** | `Laporan_Week10_UseCase.md` | `Laporan_Week11_Database.md` |
| **Ukuran File** | ~39 KB (30 halaman) | ~19 KB (25 halaman) |
| **Fokus Utama** | Analisis kebutuhan & interaksi sistem | Struktur data & relasi database |
| **Perspektif** | User/Actor oriented | Data oriented |
| **Tools Diagram** | Use Case Diagram | Entity Relationship Diagram (ERD) |
| **Output Utama** | 24 Use Cases + Skenario | 7 Tabel Database + SQL |
| **Status** | ✅ Lengkap | ✅ Lengkap |

---

## 📋 Detail Konten

### 📘 WEEK 10: USE CASE & ANALISIS SISTEM

#### Struktur Dokumen:
```
1. PENDAHULUAN (3 halaman)
   ├── 1.1 Latar Belakang
   ├── 1.2 Tujuan Sistem
   └── 1.3 Ruang Lingkup

2. ANALISIS KEBUTUHAN SISTEM (6 halaman)
   ├── 2.1 Kebutuhan Fungsional (10 items)
   │   ├── KF-01: Manajemen Pengguna
   │   ├── KF-02: Pencarian Kuliner
   │   ├── KF-03: Informasi Detail Kuliner
   │   ├── KF-04: Manajemen Review
   │   ├── KF-05: Peta Interaktif
   │   ├── KF-06: Informasi Cuaca
   │   ├── KF-07: Chatbot Rekomendasi
   │   ├── KF-08: Manajemen Favorit
   │   ├── KF-09: Submission Kuliner
   │   └── KF-10: Informasi Promo & Berita
   └── 2.2 Kebutuhan Non-Fungsional (5 items)
       ├── KNF-01: Performa
       ├── KNF-02: Keamanan
       ├── KNF-03: Usability
       ├── KNF-04: Reliability
       └── KNF-05: Maintainability

3. USE CASE DIAGRAM (2 halaman)
   ├── 3.1 Diagram Use Case Lengkap (ASCII art)
   └── 3.2 Penjelasan Relasi (Include, Extend, Generalization)

4. DESKRIPSI USE CASE (12 halaman)
   ├── UC-01 hingga UC-07: Visitor (7 use cases)
   ├── UC-08 hingga UC-18: Registered User (11 use cases)
   └── UC-19 hingga UC-24: Admin (6 use cases)

5. ANALISIS AKTOR (3 halaman)
   ├── 5.1 Visitor (Guest User)
   ├── 5.2 Registered User
   ├── 5.3 Admin
   └── 5.4 External Systems (Google OAuth, OpenWeather, Leaflet)

6. SKENARIO USE CASE (3 halaman)
   ├── 6.1 Skenario: User Mencari dan Review Kuliner (8 steps)
   └── 6.2 Skenario: Admin Mengelola Submission (4 steps)

7. KESIMPULAN (1 halaman)
   ├── 7.1 Ringkasan
   ├── 7.2 Fitur Utama
   └── 7.3 Rekomendasi Pengembangan (Phase 1-3)

8. REFERENSI (1 halaman)
   └── 10 sumber referensi akademik
```

#### Statistik:
- **Total Use Cases:** 24
- **Aktor:** 3 (Visitor, User, Admin)
- **External Systems:** 3 (Google OAuth, OpenWeather, Leaflet)
- **Skenario Detail:** 2 (dengan step-by-step)
- **Kebutuhan Fungsional:** 10 kategori
- **Kebutuhan Non-Fungsional:** 5 kategori

---

### 📗 WEEK 11: DATABASE DESIGN

#### Struktur Dokumen:
```
1. PENDAHULUAN (2 halaman)
   ├── 1.1 Latar Belakang
   ├── 1.2 Tujuan Perancangan Database
   └── 1.3 Ruang Lingkup Database

2. ENTITY RELATIONSHIP DIAGRAM (ERD) (3 halaman)
   ├── 2.1 Diagram ERD Lengkap (ASCII art)
   └── 2.2 Penjelasan Relasi Antar Entitas
       ├── Relasi 1:M (One-to-Many)
       ├── Relasi 1:1 (One-to-One)
       └── Normalisasi 3NF

3. SKEMA RELASI DATABASE (12 halaman)
   ├── 3.1 Tabel Kuliner (17 atribut)
   ├── 3.2 Tabel User (7 atribut)
   ├── 3.3 Tabel Review (7 atribut)
   ├── 3.4 Tabel Submission (18 atribut)
   ├── 3.5 Tabel Favorite (4 atribut)
   ├── 3.6 Tabel News (10 atribut)
   └── 3.7 Tabel Promo (10 atribut)

4. PENJELASAN ATRIBUT (4 halaman)
   ├── Primary Key & Foreign Key
   ├── Tipe Data
   ├── Constraints (NOT NULL, UNIQUE, DEFAULT)
   └── Index Recommendations

5. KARDINALITAS RELASI (2 halaman)
   ├── User ──(1:M)── Review
   ├── User ──(1:M)── Favorite
   ├── User ──(1:M)── Submission
   ├── Kuliner ──(1:M)── Review
   ├── Kuliner ──(1:M)── Favorite
   ├── Kuliner ──(1:1)── Promo
   └── Kuliner ──(M:N)── News (via junction table)

6. CONTOH SQL QUERY (1 halaman)
   ├── CREATE TABLE statements
   ├── SELECT queries
   ├── JOIN operations
   └── Aggregate functions

7. REFERENSI (1 halaman)
   └── 10 sumber referensi database design
```

#### Statistik:
- **Total Tabel:** 7
- **Total Atribut:** 73 (across all tables)
- **Primary Keys:** 7
- **Foreign Keys:** 12
- **Relasi 1:M:** 6
- **Relasi 1:1:** 1
- **Index Recommended:** 15

---

## 🔗 Hubungan Antar Laporan

### Bagaimana Week 10 & Week 11 Saling Terkait?

```
┌─────────────────────────────────────────────────────────────┐
│                    WEEK 10: USE CASE                        │
│                                                             │
│  UC-01: Lihat Daftar Kuliner ──────────────────┐           │
│  UC-02: Lihat Detail Kuliner ──────────────────┤           │
│  UC-03: Filter Kuliner ────────────────────────┤           │
│  UC-04: Cari Kuliner ──────────────────────────┼──────┐    │
│  UC-11: Tambah Review ─────────────────────────┤      │    │
│  UC-14: Tambah ke Favorit ─────────────────────┤      │    │
│  UC-17: Submit Kuliner Baru ───────────────────┘      │    │
│                                                        │    │
└────────────────────────────────────────────────────────┼────┘
                                                         │
                     Mapping ke Database                │
                              ↓                          ↓
┌─────────────────────────────────────────────────────────────┐
│                  WEEK 11: DATABASE DESIGN                   │
│                                                             │
│  ┌──────────────┐                                          │
│  │ Tabel Kuliner│ ← stores data untuk UC-01, 02, 03, 04   │
│  └──────┬───────┘                                          │
│         │ 1:M                                              │
│  ┌──────▼───────┐                                          │
│  │ Tabel Review │ ← stores data untuk UC-11, 12, 13       │
│  └──────────────┘                                          │
│         │ M:1                                              │
│  ┌──────▼───────┐                                          │
│  │  Tabel User  │ ← stores data untuk UC-08, 09, 10       │
│  └──────┬───────┘                                          │
│         │ 1:M                                              │
│  ┌──────▼────────┐                                         │
│  │Tabel Favorite │ ← stores data untuk UC-14, 15, 16      │
│  └───────────────┘                                         │
│  ┌─────────────────┐                                       │
│  │Tabel Submission │ ← stores data untuk UC-17, 18, 19    │
│  └─────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

### Contoh Mapping Konkret:

| Use Case (Week 10) | Tabel Database (Week 11) | Action |
|-------------------|-------------------------|--------|
| UC-01: Lihat Daftar Kuliner | `Kuliner` | `SELECT * FROM Kuliner WHERE isActive=1` |
| UC-02: Lihat Detail Kuliner | `Kuliner`, `Review` | `SELECT k.*, AVG(r.rating) FROM Kuliner k JOIN Review r` |
| UC-08: Login | `User` | `INSERT INTO User (email, name, googleId)` |
| UC-11: Tambah Review | `Review` | `INSERT INTO Review (userId, kulinerId, rating, comment)` |
| UC-14: Tambah ke Favorit | `Favorite` | `INSERT INTO Favorite (userId, kulinerId)` |
| UC-17: Submit Kuliner | `Submission` | `INSERT INTO Submission (userId, name, address, status='pending')` |
| UC-19: Approve Submission | `Submission`, `Kuliner` | `UPDATE Submission SET status='approved'; INSERT INTO Kuliner` |
| UC-22: Tambah Promo | `Promo` | `INSERT INTO Promo (kulinerId, title, discount, startDate)` |

---

## 📊 Perbandingan Perspektif

| Aspek | Week 10 View | Week 11 View |
|-------|--------------|--------------|
| **Pertanyaan Utama** | "Apa yang bisa dilakukan user?" | "Bagaimana data disimpan?" |
| **Fokus** | Fungsionalitas & Flow | Struktur & Relasi |
| **Stakeholder** | End User, Client | Developer, DBA |
| **Output** | Use Case Specification | Database Schema |
| **Tools** | UML Use Case Diagram | ERD, SQL DDL |
| **Validasi** | Apakah kebutuhan user terpenuhi? | Apakah data konsisten & normalized? |
| **Contoh Konten** | "User dapat filter kuliner by kategori" | "`Kuliner.kategori VARCHAR(50) NOT NULL`" |

---

## 🎓 Untuk Presentasi

### Jika Ditanya tentang Week 10:
**"Jelaskan use case Tambah Review!"**

**Jawaban:**
> "Use Case UC-11 (Tambah Review) memungkinkan Registered User untuk menulis review kuliner. Flow-nya:
> 1. User harus login dulu (UC-08)
> 2. Buka detail kuliner (UC-02)
> 3. Klik 'Tulis Review'
> 4. Isi rating 1-5 bintang dan komentar
> 5. Upload foto (opsional, UC-13)
> 6. Submit
> 7. Review muncul di detail kuliner
> 
> Precondition: User sudah login
> Postcondition: Review tersimpan, rating rata-rata diupdate"

---

### Jika Ditanya tentang Week 11:
**"Bagaimana struktur tabel Review?"**

**Jawaban:**
> "Tabel Review memiliki 7 atribut:
> - `id` (PK, INT, AUTO_INCREMENT)
> - `userId` (FK ke User, INT, NOT NULL)
> - `kulinerId` (FK ke Kuliner, INT, NOT NULL)
> - `rating` (INT, 1-5, NOT NULL)
> - `comment` (TEXT, NOT NULL)
> - `photos` (JSON array, NULLABLE)
> - `createdAt` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
> 
> Relasi:
> - User 1:M Review (satu user bisa banyak review)
> - Kuliner 1:M Review (satu kuliner bisa banyak review)
> 
> Index pada: userId, kulinerId, rating untuk optimasi query"

---

## ✅ Checklist Sebelum Submit

### Untuk Kedua Laporan:

- [ ] **Cover Page**
  - [ ] Isi [Nomor Kelompok]
  - [ ] Isi [NIM] dan [Nama] semua anggota (4 orang)
  - [ ] Isi [Nama Dosen]
  - [ ] Isi [Program Studi] dan [Universitas]

- [ ] **Konten**
  - [ ] Semua diagram terbaca (ASCII art atau gambar)
  - [ ] Tabel terformat dengan rapi
  - [ ] Nomor halaman konsisten
  - [ ] Daftar isi update dengan page number
  - [ ] Tidak ada placeholder `[...]` yang terlewat

- [ ] **Referensi**
  - [ ] Minimal 10 referensi
  - [ ] Format APA/IEEE konsisten
  - [ ] Tahun publikasi jelas
  - [ ] URL valid (jika ada)

- [ ] **Export PDF**
  - [ ] Font terbaca (tidak corrupt)
  - [ ] Tabel tidak terpotong
  - [ ] Page break di tempat yang tepat
  - [ ] File size reasonable (<10MB per file)

- [ ] **Final Check**
  - [ ] Spell check bahasa Indonesia
  - [ ] Konsistensi istilah (User vs Pengguna)
  - [ ] Screenshot jika diperlukan
  - [ ] Nama file sesuai format: `Kelompok[X]_Week[10/11]_[Nama].pdf`

---

## 📦 File Deliverables

### Yang Harus Disubmit:

```
📁 TUBES_APPL_Kelompok[X]/
│
├── 📄 Kelompok[X]_Week10_UseCase.pdf      (dari Laporan_Week10_UseCase.md)
├── 📄 Kelompok[X]_Week11_Database.pdf     (dari Laporan_Week11_Database.md)
│
└── 📄 LAPORAN_README.pdf (opsional, sebagai cover/navigasi)
```

### Ukuran File Estimasi:
- Week 10 PDF: ~2-3 MB
- Week 11 PDF: ~1-2 MB
- **Total ZIP:** ~5 MB

---

## 💡 Tips Sukses

### 1. **Pahami Perbedaan**
   - Week 10 = APA yang sistem lakukan
   - Week 11 = BAGAIMANA data disimpan

### 2. **Konsistensi**
   - Gunakan istilah yang sama di kedua laporan
   - Contoh: `Kuliner` (bukan kadang `Tempat Kuliner`, kadang `Restaurant`)

### 3. **Mapping yang Jelas**
   - Setiap Use Case harus jelas tabelnya apa
   - Setiap Tabel harus jelas use case mana yang pakai

### 4. **Real Example**
   - Gunakan data nyata: "Soto Sokaraja", "Purwokerto"
   - Jangan contoh generik: "Item 1", "City A"

### 5. **Visual yang Baik**
   - Diagram harus jelas dan terbaca
   - Gunakan warna konsisten (jika PDF support)
   - Spasi yang cukup antar elemen

---

## 🚀 Next Steps

1. **Review Kedua Laporan** (30 menit)
   - Baca dari awal sampai akhir
   - Cek placeholder terisi semua
   - Pastikan konsistensi

2. **Edit & Finalisasi** (1 jam)
   - Isi data kelompok
   - Perbaiki typo
   - Update page numbers

3. **Convert to PDF** (15 menit)
   - Gunakan Markdown PDF extension
   - Cek hasil PDF
   - Pastikan formatting OK

4. **Compress & Upload** (10 menit)
   - Rename sesuai format
   - ZIP jika diminta
   - Upload ke LMS

**Total Time:** ~2 jam

---

## 📞 Contact Info

**Kelompok:** [Nomor Kelompok]  
**Email:** [email kelompok]  
**GitHub:** https://github.com/hanif-12-01/TUBES-APPL.git

---

**Good luck! 🎓✨**

*Laporan dibuat dengan ❤️ untuk Assignment APPL Week 10 & 11*
