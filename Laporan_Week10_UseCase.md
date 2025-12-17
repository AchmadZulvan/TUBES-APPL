# ASSIGNMENT WEEK #10: USE CASE DIAGRAM
## Aplikasi Lapor Mangan! - Pencarian Kuliner Purwokerto

**Kelompok:** [Nomor Kelompok]  
**Anggota:**
- [NIM 1] - [Nama 1]
- [NIM 2] - [Nama 2]
- [NIM 3] - [Nama 3]
- [NIM 4] - [Nama 4]

---

## 1. USE CASE DIAGRAM

#### KNF-01: Performa
- Waktu loading halaman maksimal 3 detik
- Waktu response API maksimal 2 detik
- Aplikasi dapat berjalan di browser modern (Chrome, Firefox, Safari, Edge)

#### KNF-02: Keamanan
- Data pengguna harus terenkripsi
- Authentication menggunakan OAuth 2.0
- Validasi input untuk mencegah SQL injection dan XSS

#### KNF-03: Usability
- Interface harus intuitif dan mudah digunakan
- Responsive design untuk mobile, tablet, dan desktop
- Konsistensi warna dan typography

#### KNF-04: Reliability
- Aplikasi harus available 99% (downtime maksimal 1%)
- Error handling yang proper
- Fallback mechanism jika API external gagal

#### KNF-05: Maintainability
- Kode harus modular dan well-documented
- Menggunakan version control (Git)
- Testing coverage minimal 70%

---

## 3. USE CASE DIAGRAM

### 3.1 Diagram Use Case Lengkap

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Aplikasi Lapor Mangan!                           │
│                                                                     │
│                                                                     │
│  ┌─────────────┐                                                   │
│  │   Visitor   │                                                   │
│  │  (Guest)    │                                                   │
│  └──────┬──────┘                                                   │
│         │                                                          │
│         ├──────► (UC-01) Lihat Daftar Kuliner                     │
│         │                                                          │
│         ├──────► (UC-02) Lihat Detail Kuliner                     │
│         │                                                          │
│         ├──────► (UC-03) Filter Kuliner                           │
│         │                                                          │
│         ├──────► (UC-04) Cari Kuliner                             │
│         │                                                          │
│         ├──────► (UC-05) Lihat Peta Lokasi                        │
│         │                                                          │
│         ├──────► (UC-06) Lihat Info Cuaca                         │
│         │                                                          │
│         └──────► (UC-07) Chat dengan Bot                          │
│                                                                     │
│                                                                     │
│  ┌─────────────┐                                                   │
│  │ Registered  │                                                   │
│  │    User     │────────────────────────────────┐                 │
│  └──────┬──────┘                                │                 │
│         │                                        │                 │
│         ├──────► (UC-08) Login                   │                 │
│         │                                        │                 │
│         ├──────► (UC-09) Logout                  │                 │
│         │                                        │                 │
│         ├──────► (UC-10) Lihat Profil            │                 │
│         │                                        │                 │
│         ├──────► (UC-11) Tambah Review           │                 │
│         │                                        │                 │
│         ├──────► (UC-12) Beri Rating             │                 │
│         │                                        │                 │
│         ├──────► (UC-13) Upload Foto Review      │                 │
│         │                                        │                 │
│         ├──────► (UC-14) Tambah ke Favorit       │                 │
│         │                                        │                 │
│         ├──────► (UC-15) Hapus dari Favorit      │                 │
│         │                                        │                 │
│         ├──────► (UC-16) Lihat Daftar Favorit    │                 │
│         │                                        │                 │
│         ├──────► (UC-17) Submit Kuliner Baru     │                 │
│         │                                        │                 │
│         └──────► (UC-18) Upload Foto Kuliner     │                 │
│                                                   │                 │
│                                                   │                 │
│  ┌─────────────┐                                │                 │
│  │    Admin    │                                │                 │
│  └──────┬──────┘                                │                 │
│         │                                        │                 │
│         ├──────► (UC-19) Approve Submission      │                 │
│         │                                        │                 │
│         ├──────► (UC-20) Edit Data Kuliner       │                 │
│         │                                        │                 │
│         ├──────► (UC-21) Hapus Kuliner           │                 │
│         │                                        │                 │
│         ├──────► (UC-22) Tambah Promo            │                 │
│         │                                        │                 │
│         ├──────► (UC-23) Edit Promo              │                 │
│         │                                        │                 │
│         └──────► (UC-24) Tambah Berita           │                 │
│                                                   │                 │
│                                                   │                 │
│  ┌─────────────────┐                            │                 │
│  │  Google OAuth   │◄───────────────────────────┘                 │
│  │   (External)    │   <<include>>                                │
│  └─────────────────┘   untuk UC-08                                │
│                                                                     │
│  ┌─────────────────┐                                               │
│  │  OpenWeather    │◄───────────────────────────────────────────┐ │
│  │   API (Ext)     │   <<include>> untuk UC-06                   │ │
│  └─────────────────┘                                              │ │
│                                                                     │
│  ┌─────────────────┐                                               │
│  │   Leaflet.js    │◄───────────────────────────────────────────┘ │
│  │   (External)    │   <<include>> untuk UC-05                     │
│  └─────────────────┘                                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Penjelasan Relasi

#### Include Relationship
- UC-08 (Login) **includes** Google OAuth API
- UC-06 (Lihat Info Cuaca) **includes** OpenWeather API
- UC-05 (Lihat Peta Lokasi) **includes** Leaflet.js Map API

#### Extend Relationship
- UC-02 (Lihat Detail Kuliner) **extends** UC-01 (Lihat Daftar Kuliner)
- UC-11 (Tambah Review) **extends** UC-02 (Lihat Detail Kuliner)
- UC-14 (Tambah ke Favorit) **extends** UC-02 (Lihat Detail Kuliner)

#### Generalization
- Registered User **inherits** semua use case dari Visitor
- Admin **inherits** semua use case dari Registered User

---

## 4. DESKRIPSI USE CASE

### UC-01: Lihat Daftar Kuliner
**Aktor:** Visitor, Registered User, Admin  
**Deskripsi:** Menampilkan daftar kuliner UMKM Purwokerto dalam bentuk card grid  
**Precondition:** Aplikasi telah terbuka  
**Postcondition:** Daftar kuliner ditampilkan  

**Main Flow:**
1. Sistem memuat data kuliner dari localStorage
2. Sistem menampilkan 10 kuliner default (initialKulinerData)
3. Setiap card menampilkan: foto, nama, kategori, harga, rating, lokasi
4. User dapat scroll untuk melihat lebih banyak

**Alternate Flow:**
- Jika data kosong, tampilkan pesan "Belum ada data kuliner"

---

### UC-02: Lihat Detail Kuliner
**Aktor:** Visitor, Registered User, Admin  
**Deskripsi:** Menampilkan informasi lengkap tentang satu kuliner  
**Precondition:** User telah klik salah satu card kuliner  
**Postcondition:** Detail kuliner ditampilkan dalam modal  

**Main Flow:**
1. User klik card kuliner
2. Sistem menampilkan modal detail dengan informasi:
   - Foto kuliner (carousel jika multiple)
   - Nama tempat
   - Kategori makanan
   - Rentang harga
   - Rating rata-rata (bintang)
   - Alamat lengkap
   - Jam operasional
   - Nomor telepon
   - Daftar review
3. User dapat tutup modal

**Alternate Flow:**
- Jika foto tidak ada, tampilkan placeholder image

---

### UC-03: Filter Kuliner
**Aktor:** Visitor, Registered User, Admin  
**Deskripsi:** Menyaring daftar kuliner berdasarkan kriteria tertentu  
**Precondition:** Halaman daftar kuliner terbuka  
**Postcondition:** Daftar kuliner tersaring sesuai filter  

**Main Flow:**
1. User klik tombol filter
2. Sistem menampilkan opsi filter:
   - Kategori (Makanan Berat, Makanan Ringan, Minuman, Dessert, Semua)
   - Harga (< Rp20.000, Rp20.000-50.000, > Rp50.000)
   - Rating (≥4.0, ≥3.0, Semua)
3. User pilih filter yang diinginkan
4. Sistem filter data dan tampilkan hasil
5. Jumlah hasil filter ditampilkan

**Alternate Flow:**
- Jika tidak ada hasil, tampilkan "Tidak ada kuliner yang sesuai filter"

---

### UC-04: Cari Kuliner
**Aktor:** Visitor, Registered User, Admin  
**Deskripsi:** Mencari kuliner berdasarkan nama atau kata kunci  
**Precondition:** Halaman daftar kuliner terbuka  
**Postcondition:** Hasil pencarian ditampilkan  

**Main Flow:**
1. User ketik kata kunci di search bar
2. Sistem melakukan pencarian real-time (debounce 300ms)
3. Sistem cari berdasarkan: nama tempat, kategori, alamat
4. Hasil pencarian ditampilkan
5. Jumlah hasil ditampilkan

**Alternate Flow:**
- Jika tidak ada hasil, tampilkan "Tidak ditemukan"

---

### UC-05: Lihat Peta Lokasi
**Aktor:** Visitor, Registered User, Admin  
**Deskripsi:** Menampilkan peta interaktif dengan marker lokasi kuliner  
**Precondition:** Tab "Peta" dibuka  
**Postcondition:** Peta dan marker ditampilkan  

**Main Flow:**
1. User klik tab "Peta"
2. Sistem inisialisasi Leaflet map
3. Sistem set center ke koordinat Purwokerto [-7.4212, 109.2422]
4. Sistem tambahkan marker untuk setiap kuliner
5. User dapat:
   - Zoom in/out
   - Pan/drag peta
   - Klik marker untuk info popup
6. Popup menampilkan: nama, alamat, rating, tombol "Lihat Detail"

**Alternate Flow:**
- Jika Leaflet.js gagal load, tampilkan error message

---

### UC-06: Lihat Info Cuaca
**Aktor:** Visitor, Registered User, Admin  
**Deskripsi:** Menampilkan informasi cuaca Purwokerto saat ini  
**Precondition:** Aplikasi telah terbuka  
**Postcondition:** Widget cuaca ditampilkan di header  

**Main Flow:**
1. Sistem call OpenWeather API dengan koordinat Purwokerto
2. API key: 80fa2675a270d693f2a2ac21865a6eba
3. Sistem terima data: temp, description, icon code
4. Sistem tampilkan di widget cuaca:
   - Ikon cuaca
   - Suhu dalam Celsius
   - Deskripsi (cerah, berawan, hujan, dll)
5. Data di-refresh setiap 30 menit

**Alternate Flow:**
- Jika API timeout (>5 detik), gunakan simulateWeather() untuk data dummy
- Jika API error, tampilkan "Cuaca tidak tersedia"

---

### UC-07: Chat dengan Bot
**Aktor:** Visitor, Registered User, Admin  
**Deskripsi:** Berkomunikasi dengan chatbot untuk rekomendasi kuliner  
**Precondition:** Chatbot button diklik  
**Postcondition:** Chatbot window terbuka dan merespon  

**Main Flow:**
1. User klik icon chatbot
2. Sistem tampilkan chat window
3. Bot kirim greeting: "Halo! Ada yang bisa saya bantu?"
4. User ketik pertanyaan
5. Sistem proses dengan pattern matching (knowledge-base.js):
   - Greeting → respond greeting
   - Kategori → recommend by category
   - Lokasi → filter by location
   - Default → show help menu
6. Bot kirim response
7. Conversation history disimpan di session

**Alternate Flow:**
- Jika input tidak dikenali, bot berikan opsi menu kategori

---

### UC-08: Login
**Aktor:** Registered User, Admin  
**Deskripsi:** Masuk ke sistem menggunakan Google OAuth  
**Precondition:** User belum login  
**Postcondition:** User berhasil login, session tersimpan  

**Main Flow:**
1. User klik tombol "Masuk dengan Google"
2. Sistem redirect ke Google OAuth consent screen
3. User pilih akun Google
4. User berikan permission
5. Google return authorization code
6. Sistem exchange code untuk access token
7. Sistem ambil user profile (name, email, photo)
8. Sistem simpan session di Firebase Auth
9. UI update: tampilkan nama user dan foto profil
10. Unlock fitur: review, favorit, submission

**Alternate Flow:**
- Jika user cancel OAuth, kembali ke halaman semula
- Jika network error, tampilkan "Login gagal, coba lagi"

---

### UC-09: Logout
**Aktor:** Registered User, Admin  
**Deskripsi:** Keluar dari sistem  
**Precondition:** User sudah login  
**Postcondition:** User logout, session dihapus  

**Main Flow:**
1. User klik menu profil
2. User klik tombol "Keluar"
3. Sistem hapus session dari Firebase Auth
4. Sistem hapus localStorage user data
5. UI update: tampilkan tombol "Masuk"
6. Lock fitur premium
7. Redirect ke halaman home

---

### UC-10: Lihat Profil
**Aktor:** Registered User, Admin  
**Deskripsi:** Melihat informasi profil pengguna  
**Precondition:** User sudah login  
**Postcondition:** Profil ditampilkan  

**Main Flow:**
1. User klik foto profil di navbar
2. Sistem tampilkan modal profil dengan:
   - Foto profil dari Google
   - Nama lengkap
   - Email
   - Jumlah review yang ditulis
   - Jumlah favorit
   - Member since (tanggal registrasi)
3. User dapat edit profil atau logout

---

### UC-11: Tambah Review
**Aktor:** Registered User, Admin  
**Deskripsi:** Menulis review untuk kuliner tertentu  
**Precondition:** User sudah login dan membuka detail kuliner  
**Postcondition:** Review tersimpan dan ditampilkan  

**Main Flow:**
1. User di halaman detail kuliner
2. User klik "Tulis Review"
3. Sistem tampilkan form review:
   - Rating (1-5 bintang) - required
   - Komentar (textarea) - required
   - Upload foto (optional)
4. User isi form dan submit
5. Sistem validasi:
   - Rating tidak boleh kosong
   - Komentar minimal 10 karakter
   - Foto maksimal 5MB
6. Sistem simpan review dengan:
   - userId
   - userName (dari Google profile)
   - userPhoto
   - timestamp
   - kulinerDetail_id
7. Sistem update rating rata-rata kuliner
8. Review baru muncul di top list
9. Tampilkan notifikasi sukses

**Alternate Flow:**
- Jika validasi gagal, tampilkan error message
- Jika belum login, redirect ke login page

---

### UC-12: Beri Rating
**Aktor:** Registered User, Admin  
**Deskripsi:** Memberikan rating bintang untuk kuliner  
**Precondition:** User sudah login  
**Postcondition:** Rating tersimpan dan rata-rata diupdate  

**Main Flow:**
1. User pilih jumlah bintang (1-5)
2. Sistem simpan rating
3. Sistem hitung ulang average rating
4. Sistem update tampilan rating di card dan detail
5. Rating disimpan per user (tidak bisa double rating)

---

### UC-13: Upload Foto Review
**Aktor:** Registered User, Admin  
**Deskripsi:** Mengunggah foto sebagai bagian dari review  
**Precondition:** Form review terbuka  
**Postcondition:** Foto ter-upload dan preview ditampilkan  

**Main Flow:**
1. User klik "Tambah Foto" di form review
2. Sistem buka file picker
3. User pilih foto dari device
4. Sistem validasi:
   - Format: JPG, PNG, WebP
   - Size maksimal: 5MB
   - Dimensi minimal: 200x200px
5. Sistem compress foto jika > 1MB
6. Sistem tampilkan preview
7. User dapat hapus foto sebelum submit
8. Saat submit review, foto ikut tersimpan

**Alternate Flow:**
- Jika validasi gagal, tampilkan error dan reject upload

---

### UC-14: Tambah ke Favorit
**Aktor:** Registered User, Admin  
**Deskripsi:** Menyimpan kuliner ke daftar favorit  
**Precondition:** User sudah login  
**Postcondition:** Kuliner masuk ke daftar favorit  

**Main Flow:**
1. User klik icon heart di card/detail kuliner
2. Sistem cek apakah sudah ada di favorit
3. Jika belum, sistem simpan ke:
   - localStorage: favoritesData array
   - Format: {userId, kulinerDetail_id, timestamp}
4. Icon heart berubah dari outline ke solid
5. Tampilkan toast "Ditambahkan ke favorit"
6. Counter favorit bertambah

**Alternate Flow:**
- Jika sudah favorit, tampilkan pesan "Sudah ada di favorit"

---

### UC-15: Hapus dari Favorit
**Aktor:** Registered User, Admin  
**Deskripsi:** Menghapus kuliner dari daftar favorit  
**Precondition:** Kuliner sudah ada di favorit  
**Postcondition:** Kuliner dihapus dari favorit  

**Main Flow:**
1. User klik icon heart solid di card/detail
2. Sistem konfirmasi: "Hapus dari favorit?"
3. User klik "Ya"
4. Sistem hapus dari favoritesData
5. Icon heart kembali ke outline
6. Tampilkan toast "Dihapus dari favorit"
7. Counter favorit berkurang

---

### UC-16: Lihat Daftar Favorit
**Aktor:** Registered User, Admin  
**Deskripsi:** Menampilkan semua kuliner yang difavoritkan  
**Precondition:** User sudah login  
**Postcondition:** Daftar favorit ditampilkan  

**Main Flow:**
1. User klik tab "Favorit"
2. Sistem load favoritesData dari localStorage
3. Sistem filter berdasarkan userId
4. Sistem tampilkan grid card favorit
5. User dapat:
   - Klik card untuk lihat detail
   - Hapus dari favorit
   - Sort by: terbaru, nama, rating

**Alternate Flow:**
- Jika favorit kosong, tampilkan empty state dengan ilustrasi

---

### UC-17: Submit Kuliner Baru
**Aktor:** Registered User, Admin  
**Deskripsi:** Mengajukan kuliner baru untuk ditambahkan ke database  
**Precondition:** User sudah login  
**Postcondition:** Submission tersimpan dan menunggu approval  

**Main Flow:**
1. User klik "Tambah Kuliner" di navbar
2. Sistem tampilkan form submission:
   - Nama Tempat* (text)
   - Kategori* (dropdown)
   - Alamat Lengkap* (textarea)
   - Koordinat (auto-detect atau manual)
   - Nomor Telepon (text)
   - Jam Operasional* (time range)
   - Rentang Harga* (number)
   - Deskripsi* (textarea)
   - Upload Foto* (multiple)
3. User isi form dan upload minimal 1 foto
4. User submit
5. Sistem validasi semua field required
6. Sistem simpan ke submissionsData dengan status: "pending"
7. Tampilkan notifikasi: "Terima kasih! Submission Anda akan direview"
8. Admin dapat review dan approve/reject

**Alternate Flow:**
- Jika validasi gagal, highlight field error
- Jika belum login, redirect ke login

---

### UC-18: Upload Foto Kuliner
**Aktor:** Registered User, Admin  
**Deskripsi:** Mengunggah foto kuliner untuk submission  
**Precondition:** Form submission terbuka  
**Postcondition:** Foto ter-upload dan preview ditampilkan  

**Main Flow:**
1. User klik "Pilih Foto" (multiple select)
2. User pilih 1-10 foto
3. Sistem validasi per foto:
   - Format: JPG, PNG, WebP
   - Size: max 5MB
   - Minimal 1 foto wajib
4. Sistem compress dan resize
5. Sistem tampilkan preview grid
6. User dapat:
   - Hapus foto tertentu
   - Reorder foto (drag-drop)
   - Set foto utama

**Alternate Flow:**
- Jika upload > 10 foto, tampilkan warning dan ambil 10 pertama

---

### UC-19: Approve Submission
**Aktor:** Admin  
**Deskripsi:** Menyetujui submission kuliner baru dari user  
**Precondition:** Admin sudah login, ada submission pending  
**Postcondition:** Submission approved, data masuk ke kulinerData  

**Main Flow:**
1. Admin buka panel admin
2. Sistem tampilkan list pending submissions
3. Admin klik "Review" pada submission
4. Sistem tampilkan detail submission
5. Admin dapat:
   - Edit data jika perlu
   - Approve → data masuk ke kulinerData
   - Reject → kirim feedback ke submitter
6. Jika approve:
   - Submission status: "approved"
   - Data ditambahkan ke kulinerData
   - Notifikasi dikirim ke submitter
7. Jika reject:
   - Submission status: "rejected"
   - Reason disimpan
   - Email notifikasi ke submitter

---

### UC-20: Edit Data Kuliner
**Aktor:** Admin  
**Deskripsi:** Mengubah informasi kuliner yang sudah ada  
**Precondition:** Admin sudah login  
**Postcondition:** Data kuliner terupdate  

**Main Flow:**
1. Admin cari kuliner yang akan diedit
2. Admin klik "Edit" di detail kuliner
3. Sistem tampilkan form edit (semua field terisi)
4. Admin ubah data yang perlu
5. Admin klik "Simpan"
6. Sistem validasi
7. Sistem update kulinerData
8. Sistem update localStorage
9. Tampilkan notifikasi sukses
10. Changes langsung terlihat di frontend

---

### UC-21: Hapus Kuliner
**Aktor:** Admin  
**Deskripsi:** Menghapus kuliner dari database  
**Precondition:** Admin sudah login  
**Postcondition:** Kuliner dihapus  

**Main Flow:**
1. Admin klik "Hapus" di detail kuliner
2. Sistem tampilkan konfirmasi: "Yakin hapus? Ini akan menghapus semua review dan data terkait"
3. Admin klik "Ya, Hapus"
4. Sistem soft delete: set isDeleted = true
5. Sistem hapus dari tampilan frontend
6. Data masih tersimpan di database (audit trail)
7. Tampilkan notifikasi: "Kuliner berhasil dihapus"

---

### UC-22: Tambah Promo
**Aktor:** Admin  
**Deskripsi:** Menambahkan promo kuliner baru  
**Precondition:** Admin sudah login  
**Postcondition:** Promo ditampilkan di halaman home  

**Main Flow:**
1. Admin klik "Tambah Promo"
2. Sistem tampilkan form:
   - Judul Promo* (text)
   - Deskripsi* (textarea)
   - Kuliner terkait* (dropdown)
   - Diskon* (percentage atau nominal)
   - Tanggal Mulai* (date)
   - Tanggal Berakhir* (date)
   - Banner Image* (upload)
   - Syarat & Ketentuan (textarea)
3. Admin isi dan submit
4. Sistem validasi
5. Sistem simpan ke promosData
6. Promo muncul di carousel homepage
7. Promo muncul di detail kuliner terkait

---

### UC-23: Edit Promo
**Aktor:** Admin  
**Deskripsi:** Mengubah informasi promo yang ada  
**Precondition:** Admin sudah login, promo sudah ada  
**Postcondition:** Promo terupdate  

**Main Flow:**
1. Admin klik "Edit" di card promo
2. Sistem tampilkan form edit (terisi data lama)
3. Admin ubah field yang diperlukan
4. Admin submit
5. Sistem validasi
6. Sistem update promosData
7. Changes langsung terlihat
8. Tampilkan notifikasi sukses

---

### UC-24: Tambah Berita
**Aktor:** Admin  
**Deskripsi:** Menambahkan berita/artikel kuliner  
**Precondition:** Admin sudah login  
**Postcondition:** Berita dipublikasi  

**Main Flow:**
1. Admin klik "Tambah Berita"
2. Sistem tampilkan rich text editor:
   - Judul* (text)
   - Kategori* (dropdown: Tips, Review, Event, Info)
   - Konten* (rich text editor)
   - Featured Image* (upload)
   - Tags (multiselect)
   - Status* (draft/published)
3. Admin tulis artikel
4. Admin preview sebelum publish
5. Admin set status "published" dan submit
6. Sistem simpan ke newsData
7. Berita muncul di section "Berita & Tips"
8. Notifikasi push ke user (optional)

---

## 5. ANALISIS AKTOR

### 5.1 Visitor (Guest User)
**Karakteristik:**
- Belum melakukan registrasi/login
- Hanya dapat mengakses fitur publik
- Tidak dapat melakukan interaksi yang memerlukan autentikasi

**Hak Akses:**
- ✅ Lihat daftar kuliner
- ✅ Lihat detail kuliner
- ✅ Filter dan cari kuliner
- ✅ Lihat peta lokasi
- ✅ Lihat info cuaca
- ✅ Chat dengan bot
- ❌ Tidak dapat review
- ❌ Tidak dapat favorit
- ❌ Tidak dapat submission

**Use Cases:** UC-01 hingga UC-07

---

### 5.2 Registered User
**Karakteristik:**
- Sudah melakukan login dengan Google OAuth
- Dapat mengakses semua fitur visitor + fitur premium
- Memiliki profil dan history interaksi

**Hak Akses:**
- ✅ Semua fitur Visitor
- ✅ Login/Logout
- ✅ Lihat dan edit profil
- ✅ Tambah review dan rating
- ✅ Upload foto review
- ✅ Tambah/hapus favorit
- ✅ Lihat daftar favorit
- ✅ Submit kuliner baru
- ✅ Upload foto kuliner
- ❌ Tidak dapat approve submission
- ❌ Tidak dapat edit/hapus kuliner
- ❌ Tidak dapat kelola promo/berita

**Use Cases:** UC-01 hingga UC-18

---

### 5.3 Admin
**Karakteristik:**
- User dengan role "admin" di sistem
- Memiliki kontrol penuh atas konten
- Bertanggung jawab atas moderasi dan kualitas data

**Hak Akses:**
- ✅ Semua fitur Registered User
- ✅ Approve/reject submission
- ✅ Edit data kuliner
- ✅ Hapus kuliner
- ✅ Tambah/edit promo
- ✅ Tambah berita
- ✅ Moderate review (hapus jika spam)
- ✅ View analytics dashboard
- ✅ Export data

**Use Cases:** UC-01 hingga UC-24 (semua)

---

### 5.4 External Systems

#### 5.4.1 Google OAuth API
**Fungsi:** Autentikasi pengguna  
**Integrasi:** Firebase Authentication  
**Data yang diberikan:** email, name, photoURL, uid  

#### 5.4.2 OpenWeather API
**Fungsi:** Data cuaca real-time  
**Endpoint:** api.openweathermap.org/data/2.5/weather  
**Parameter:** lat=-7.4212, lon=109.2422, units=metric  
**Response:** temp, description, icon  

#### 5.4.3 Leaflet.js Map
**Fungsi:** Menampilkan peta interaktif  
**Tile Server:** OpenStreetMap  
**Features:** markers, popups, zoom, pan  

---

## 6. SKENARIO USE CASE

### 6.1 Skenario: User Mencari dan Review Kuliner

**Actors:** Registered User (Budi)

**Narrative:**
Budi adalah mahasiswa di Purwokerto yang ingin mencari tempat makan siang dengan budget terbatas. Ia membuka aplikasi Lapor Mangan! dan mencari rekomendasi.

**Detailed Scenario:**

1. **Membuka Aplikasi (UC-01)**
   - Budi buka browser dan akses aplikasi
   - Splash screen muncul 2 detik
   - Homepage load dengan 10 kuliner default

2. **Filter Kuliner (UC-03)**
   - Budi klik filter button
   - Pilih kategori: "Makanan Berat"
   - Pilih harga: "< Rp20.000"
   - Klik "Terapkan Filter"
   - Muncul 3 hasil: Soto Sokaraja, Mie Ayam Tumini, Nasi Goreng Pak Joko

3. **Lihat Detail (UC-02)**
   - Budi klik card "Soto Sokaraja"
   - Modal detail terbuka dengan info:
     * Foto: 3 foto soto
     * Harga: Rp15.000 - Rp25.000
     * Rating: 4.7 ⭐ (127 reviews)
     * Alamat: Jl. Jend. Soedirman No.123
     * Jam: 06:00 - 14:00
     * Telp: 0281-1234567

4. **Cek Lokasi di Peta (UC-05)**
   - Budi klik tab "Peta"
   - Peta load dengan marker Soto Sokaraja
   - Klik marker → popup muncul
   - Jarak dari kampus: 2.3 km

5. **Login untuk Review (UC-08)**
   - Budi klik "Masuk dengan Google"
   - Redirect ke Google OAuth
   - Pilih akun: budi@gmail.com
   - Allow permissions
   - Redirect kembali, sekarang logged in

6. **Tulis Review (UC-11, UC-12)**
   - Di detail Soto Sokaraja, klik "Tulis Review"
   - Rating: 5 bintang
   - Komentar: "Sotonya enak banget, kuahnya gurih dan dagingnya empuk. Harga murah pula!"
   - Upload 2 foto soto
   - Klik "Kirim Review"
   - Review muncul di top list
   - Rating rata-rata update: 4.7 → 4.8

7. **Tambah ke Favorit (UC-14)**
   - Budi klik icon heart di detail
   - Icon berubah jadi solid red
   - Toast: "Ditambahkan ke favorit"

8. **Logout (UC-09)**
   - Klik foto profil Budi
   - Klik "Keluar"
   - Redirect ke homepage
   - Sekarang status: visitor

---

### 6.2 Skenario: Admin Mengelola Submission

**Actors:** Admin (Siti), Registered User (Andi)

**Narrative:**
Andi menemukan warung bakso baru yang enak dan ingin menambahkannya ke aplikasi. Admin Siti akan mereview submission tersebut.

**Detailed Scenario:**

1. **Andi Submit Kuliner Baru (UC-17, UC-18)**
   - Andi login dan klik "Tambah Kuliner"
   - Isi form:
     * Nama: "Bakso Mas Joni"
     * Kategori: "Makanan Berat"
     * Alamat: "Jl. HR Bunyamin No.45, Purwokerto"
     * Koordinat: auto-detect GPS
     * Telp: "0812-3456-7890"
     * Jam: "10:00 - 22:00"
     * Harga: "Rp12.000 - Rp25.000"
     * Deskripsi: "Bakso dengan kuah segar, daging kenyal, dan isian lengkap"
   - Upload 4 foto bakso
   - Klik "Submit"
   - Notifikasi: "Terima kasih! Submission akan direview dalam 1x24 jam"

2. **Admin Review Submission (UC-19)**
   - Siti login ke admin panel
   - Buka menu "Pending Submissions" → badge: 1 new
   - Klik submission "Bakso Mas Joni"
   - Review data yang disubmit:
     * Cek foto: jelas dan menarik ✅
     * Cek alamat di Google Maps: valid ✅
     * Cek nomor telepon: format benar ✅
     * Cek deskripsi: tidak ada spam ✅
   - Siti klik "Approve"
   - Confirmation: "Approve submission ini?"
   - Klik "Ya"

3. **Submission Approved**
   - Status submission: pending → approved
   - Data ditambahkan ke kulinerData
   - Bakso Mas Joni muncul di homepage
   - Andi dapat notifikasi: "Submission Anda disetujui!"

4. **Admin Tambah Promo (UC-22)**
   - Siti ingin promosikan warung baru
   - Klik "Tambah Promo"
   - Isi form:
     * Judul: "Grand Opening Bakso Mas Joni!"
     * Deskripsi: "Diskon 20% untuk semua menu"
     * Kuliner: Bakso Mas Joni
     * Diskon: 20%
     * Tanggal: 17 Dec 2024 - 24 Dec 2024
   - Upload banner promo
   - Klik "Publikasi"
   - Promo muncul di carousel homepage

---

## 7. KESIMPULAN

### 7.1 Ringkasan
Aplikasi Lapor Mangan! memiliki 24 use case yang terbagi menjadi:
- **7 use case** untuk Visitor (fitur publik)
- **11 use case** untuk Registered User (fitur premium)
- **6 use case** untuk Admin (manajemen konten)

### 7.2 Fitur Utama
1. **Pencarian & Filter Kuliner** - Memudahkan user menemukan kuliner sesuai preferensi
2. **Peta Interaktif** - Visualisasi lokasi kuliner dengan Leaflet.js
3. **Review & Rating** - Community-driven content untuk kualitas informasi
4. **Authentication** - Keamanan dengan Google OAuth
5. **Submission System** - Crowdsourcing data kuliner baru
6. **Admin Panel** - Kontrol kualitas dan moderasi konten

### 7.3 Rekomendasi Pengembangan

#### Phase 1 (Current - MVP)
- ✅ CRUD kuliner
- ✅ Filter dan search
- ✅ Google OAuth
- ✅ Review dan rating
- ✅ Peta interaktif

#### Phase 2 (Next Sprint)
- 🔄 Submission approval workflow
- 🔄 Admin dashboard
- 🔄 Promo management
- 🔄 Email notifications

#### Phase 3 (Future)
- 📋 Mobile app (React Native)
- 📋 Payment gateway untuk order online
- 📋 Loyalty program
- 📋 Analytics dashboard
- 📋 AI recommendation system

---

## 8. REFERENSI

1. Pressman, R. S., & Maxim, B. R. (2014). *Software Engineering: A Practitioner's Approach* (8th ed.). McGraw-Hill Education.

2. Sommerville, I. (2015). *Software Engineering* (10th ed.). Pearson Education.

3. Larman, C. (2004). *Applying UML and Patterns: An Introduction to Object-Oriented Analysis and Design* (3rd ed.). Prentice Hall.

4. Fowler, M., & Scott, K. (1999). *UML Distilled: A Brief Guide to the Standard Object Modeling Language* (3rd ed.). Addison-Wesley Professional.

5. Cockburn, A. (2000). *Writing Effective Use Cases*. Addison-Wesley Professional.

6. Google Developers. (2024). *Google Sign-In for Websites*. Retrieved from https://developers.google.com/identity/sign-in/web

7. OpenWeather. (2024). *Weather API Documentation*. Retrieved from https://openweathermap.org/api

8. Leaflet. (2024). *Leaflet - An Open-Source JavaScript Library for Interactive Maps*. Retrieved from https://leafletjs.com/

9. Mozilla Developer Network. (2024). *Progressive Web Apps (PWA)*. Retrieved from https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps

10. Jacobson, I., Booch, G., & Rumbaugh, J. (1999). *The Unified Software Development Process*. Addison-Wesley Professional.

---

**Catatan:**
- Laporan ini disusun untuk memenuhi Assignment Week #10
- Use case dapat berubah sesuai feedback dari stakeholder
- Untuk detail teknis implementasi, lihat dokumentasi kode dan API

---

*Dibuat: 17 Desember 2024*  
*Kelompok: [Nomor Kelompok]*  
*Aplikasi: Lapor Mangan! - Purwokerto Culinary Finder*

## 9. MAPPING IMPLEMENTASI (Use Case → Kode)

Berikut peta cepat bagaimana setiap use case diimplementasikan dalam kode proyek (file dan fungsi utama):

- **UC-01 (Lihat Daftar Kuliner)**: render dan template daftar
   - File: [app-complete.js](app-complete.js)
   - Fungsi utama: `renderKulinerList()` — menempelkan card ke elemen `#kulinerList` dan menggunakan `initialKulinerData` / `DB.get('kuliner')`.

- **UC-02 (Lihat Detail Kuliner)**: modal detail dan tampilan review
   - File: [app-complete.js](app-complete.js)
   - Fungsi utama: `showDetail(id)`, `closeModal()` — menulis konten ke `#modalContent` dan membuka `#detailModal`.

- **UC-03 / UC-04 (Filter & Cari Kuliner)**
   - File: [app-complete.js](app-complete.js)
   - Fungsi utama: `populateFilters()`, `applyFilters()` — menangani input `#searchInput`, filter dropdown, dan memanggil `renderKulinerList(filtered)`.

- **UC-05 (Lihat Peta Lokasi)**
   - File: [app-complete.js](app-complete.js)
   - Fungsi utama: `initMap()`, `renderMarkers()` — inisialisasi Leaflet pada elemen `#map` dan menambahkan marker dengan popup yang memanggil `showDetail()`.

- **UC-06 (Lihat Info Cuaca)**
   - File: [app-complete.js](app-complete.js)
   - Fungsi utama: `fetchWeather()`, `updateWeatherUI()` — menggunakan `wttr.in` sebagai fallback gratis dan menampilkan widget di `#weatherWidget`.

- **UC-07 / UC-11 (Chatbot & Review)**
   - File: [app-complete.js](app-complete.js), [knowledge-base.js](knowledge-base.js), [chatbot.js](chatbot.js)
   - Modul/Objek: `MakanBotAI` (dalam `app-complete.js`) dan `knowledge-base.js` untuk kosakata/aturan; fungsi `sendChat()` membuka interaksi chatbot.
   - Review: `submitReview(kulinerId)` menyimpan review ke `state.kulinerData` dan `DB.set('kuliner', ...)`.

- **UC-08 / UC-09 / UC-10 (Auth & Profil)**
   - File: [app-complete.js](app-complete.js), [index.html](index.html)
   - Fungsi: `loginWithGoogle()` (simulasi OAuth dalam kode; production: gunakan Firebase/Auth), `logout()`, `updateAuthUI()`.

- **UC-14 / UC-15 / UC-16 (Favorit)**
   - File: [app-complete.js](app-complete.js)
   - Fungsi: `toggleFavorite(id)`, `renderFavorites()` — favorites disimpan di localStorage dengan key `lm_favorites`.

- **UC-17 / UC-18 / UC-19 (Submission & Moderation)**
   - File: [app-complete.js](app-complete.js)
   - Fungsi: `submitKuliner(e)` (menyimpan ke `submissions`), `renderAdmin()`, `approveSubmission(id)`, `rejectSubmission(id)`.

- **UC-21..UC-24 (Admin: CRUD / Promo / Berita)**
   - File: [app-complete.js](app-complete.js), [app-complete.css](app-complete.css)
   - Fungsi: `renderAdmin()`, `renderPromo()`, `renderBerita()`, `approveSubmission()`, `deleteKuliner()`.

- **PWA & Offline**
   - File: [sw.js](sw.js), [manifest.json](manifest.json), [offline.html](offline.html)
   - Fungsi: service worker untuk caching, manifest untuk instalasi PWA.

- **Styling & Layout**
   - File: [app-complete.css](app-complete.css), [style.css](style.css)
   - Sumber gaya untuk modal, peta, daftar, dan komponen UI.

Catatan: sebagian besar logika frontend berada di `app-complete.js` (single-page, localStorage as DB). Untuk implementasi production, beberapa fungsi (auth, file upload, persistence) perlu dihubungkan ke backend nyata atau Firebase.
