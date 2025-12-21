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

## 2. USE CASE SCENARIO VERSI DESAIN

### 2.1 UC-08: Login dengan Google OAuth

**Nama Usecase:** Login dengan Google OAuth  
**Deskripsi:** User melakukan autentikasi menggunakan akun Google untuk mengakses fitur premium  
**Prekondisi:** User belum login dan mengklik tombol "Masuk dengan Google"

| No | Alur Utama |
|----|------------|
| 1  | User membuka aplikasi Lapor Mangan! |
| 2  | User melihat tombol "Masuk dengan Google" di header |
| 3  | User mengklik tombol "Masuk dengan Google" |
| 4  | Sistem membuka popup OAuth Google |
| 5  | User memilih akun Google dan memberikan permission |
| 6  | Google mengirim token ke sistem |
| 7  | Sistem menyimpan data user (uid, displayName, email, photoURL) |
| 8  | Sistem menutup popup dan update UI (tampilkan foto profil + nama) |
| 9  | Sistem unlock fitur premium (review, favorit, submit kuliner) |
| 10 | Sistem tampilkan toast notifikasi "Berhasil login sebagai [Nama]" |

| No | Alur Alternatif |
|----|-----------------|
| 1  | **[A1] User membatalkan login** - Jika user menutup popup OAuth di step 4, sistem kembali ke halaman sebelumnya tanpa perubahan |
| 2  | **[A2] Google OAuth gagal** - Jika Google API error di step 6, sistem tampilkan toast error "Gagal login. Silakan coba lagi" |
| 3  | **[A3] Firebase tidak dikonfigurasi** - Jika Firebase config kosong, sistem tampilkan peringatan "Firebase belum dikonfigurasi" |
| 4  | **[A4] Network error** - Jika tidak ada internet saat step 4, sistem tampilkan "Tidak ada koneksi internet" |

**Postkondisi:**  
- User berhasil login dan status autentikasi tersimpan di Firebase Auth
- UI berubah menampilkan foto profil dan nama user
- Fitur review, favorit, dan submission menjadi accessible

---

### 2.2 UC-11: Tambah Review dan Rating

**Nama Usecase:** Tambah Review dan Rating  
**Deskripsi:** User yang sudah login memberikan ulasan tekstual dan rating bintang untuk kuliner tertentu  
**Prekondisi:** User sudah login dan membuka detail kuliner

| No | Alur Utama |
|----|------------|
| 1  | User membuka detail kuliner dengan klik card |
| 2  | Sistem menampilkan modal detail kuliner dengan section review |
| 3  | User scroll ke bagian bawah dan klik tombol "Tulis Review" |
| 4  | Sistem menampilkan form review dengan field: rating (1-5 bintang) dan komentar (textarea) |
| 5  | User memilih rating dengan klik icon bintang (1-5) |
| 6  | User mengetik komentar minimal 10 karakter |
| 7  | User mengklik tombol "Kirim Review" |
| 8  | Sistem validasi input (rating harus >0, komentar minimal 10 karakter) |
| 9  | Sistem simpan review ke localStorage dengan data: userId, userName, rating, comment, timestamp |
| 10 | Sistem update rating rata-rata kuliner tersebut |
| 11 | Sistem refresh tampilan review list (review baru muncul di top) |
| 12 | Sistem tampilkan toast "Review berhasil ditambahkan!" dan tutup form |

| No | Alur Alternatif |
|----|-----------------|
| 1  | **[A1] User belum login** - Jika user klik "Tulis Review" tanpa login, sistem tampilkan toast "Anda harus login untuk menulis review" dan buka modal login |
| 2  | **[A2] Rating tidak dipilih** - Jika user submit tanpa pilih rating, sistem tampilkan error "Silakan pilih rating 1-5 bintang" |
| 3  | **[A3] Komentar terlalu pendek** - Jika komentar <10 karakter, sistem tampilkan error "Komentar minimal 10 karakter" |
| 4  | **[A4] Duplicate review** - Jika user sudah pernah review kuliner ini, sistem tampilkan warning "Anda sudah memberikan review untuk kuliner ini" |
| 5  | **[A5] User membatalkan** - Jika user klik "Batal", sistem tutup form tanpa menyimpan data |

**Postkondisi:**  
- Review tersimpan di localStorage array `reviewsData`
- Rating rata-rata kuliner terupdate
- Review baru muncul di top list dengan label "[Baru]"
- Total jumlah review bertambah 1

---

### 2.3 UC-17: Submit Kuliner Baru

**Nama Usecase:** Submit Kuliner Baru (Kontribusi User)  
**Deskripsi:** User registered mengirimkan data kuliner baru untuk ditambahkan ke database setelah disetujui admin  
**Prekondisi:** User sudah login dan mengklik tombol "Tambah Kuliner"

| No | Alur Utama |
|----|------------|
| 1  | User mengklik icon "+" atau menu "Tambah Kuliner" di sidebar |
| 2  | Sistem membuka modal form submission dengan field: Nama Tempat, Kategori (dropdown), Alamat, Jam Buka, Harga, Deskripsi, Upload Foto, Latitude, Longitude |
| 3  | User mengisi nama tempat (required, min 3 karakter) |
| 4  | User memilih kategori dari dropdown (Soto, Sate, Bakso, Dessert, dll) |
| 5  | User mengisi alamat lengkap (required) |
| 6  | User mengisi jam operasional (format: "08:00 - 20:00") |
| 7  | User mengisi rentang harga (format: "Rp15.000-Rp30.000") |
| 8  | User mengisi deskripsi kuliner (min 20 karakter) |
| 9  | User upload foto kuliner (maksimal 3 foto, each max 2MB) |
| 10 | User mengklik tombol "Dapatkan Koordinat" untuk auto-detect atau input manual lat/lng |
| 11 | User mengklik tombol "Kirim Submission" |
| 12 | Sistem validasi semua field (nama, kategori, alamat, harga wajib diisi) |
| 13 | Sistem generate submission ID (timestamp-based) |
| 14 | Sistem simpan ke localStorage `pendingSubmissions` dengan status "pending" |
| 15 | Sistem tampilkan toast "Terima kasih! Submission Anda akan direview oleh admin dalam 1-3 hari kerja" |
| 16 | Sistem tutup modal form dan clear input fields |

| No | Alur Alternatif |
|----|-----------------|
| 1  | **[A1] User belum login** - Jika user klik "Tambah Kuliner" tanpa login, sistem redirect ke halaman login dengan message "Login untuk berkontribusi" |
| 2  | **[A2] Field wajib kosong** - Jika ada field required kosong, sistem highlight field dengan border merah dan tampilkan tooltip error |
| 3  | **[A3] Format harga salah** - Jika harga tidak mengandung "Rp" atau format tidak valid, sistem tampilkan error "Format harga: Rp10.000-Rp20.000" |
| 4  | **[A4] Foto terlalu besar** - Jika foto >2MB, sistem reject upload dan tampilkan "Ukuran foto maksimal 2MB per file" |
| 5  | **[A5] Koordinat invalid** - Jika lat/lng di luar range Purwokerto, sistem tampilkan warning "Pastikan lokasi di area Purwokerto" |
| 6  | **[A6] User membatalkan** - Jika user klik "Batal", sistem tampilkan confirm dialog "Yakin ingin membatalkan? Data yang diisi akan hilang" |

**Postkondisi:**  
- Data submission tersimpan di localStorage dengan status "pending"
- Admin dapat melihat submission di panel moderasi
- User dapat tracking status submission di halaman "Kontribusi Saya"
- Email notifikasi dikirim ke admin (jika configured)

---

### 2.4 UC-02: Lihat Detail Kuliner

**Nama Usecase:** Lihat Detail Kuliner  
**Deskripsi:** User melihat informasi lengkap tentang satu tempat kuliner termasuk foto, lokasi, review, dan rating  
**Prekondisi:** User berada di halaman daftar kuliner (home)

| No | Alur Utama |
|----|------------|
| 1  | User melihat list card kuliner di halaman home |
| 2  | User mengklik salah satu card kuliner yang menarik |
| 3  | Sistem retrieve data kuliner berdasarkan index/id dari array `kulinerData` |
| 4  | Sistem membuka modal detail dengan layout: Header (foto carousel), Body (info kuliner), Footer (action buttons) |
| 5  | Sistem tampilkan foto kuliner di carousel (swipe left/right untuk multiple photos) |
| 6  | Sistem tampilkan informasi: Nama Tempat (h2), Kategori (badge), Rating (bintang + angka), Alamat lengkap, Jam operasional, Harga, Nomor telepon, Status halal |
| 7  | Sistem render map mini dengan marker lokasi kuliner (Leaflet.js) |
| 8  | Sistem tampilkan deskripsi kuliner (paragraph) |
| 9  | Sistem load dan render semua review untuk kuliner ini dari `reviewsData` |
| 10 | Sistem tampilkan action buttons: "Favorit" (heart icon), "Review" (star icon), "Navigasi" (map icon), "Tutup" (X) |
| 11 | User dapat scroll dalam modal untuk melihat semua konten |
| 12 | User menutup modal dengan klik tombol "X" atau klik overlay |

| No | Alur Alternatif |
|----|-----------------|
| 1  | **[A1] Data kuliner tidak ditemukan** - Jika index/id invalid, sistem tampilkan error toast "Data kuliner tidak ditemukan" dan tidak buka modal |
| 2  | **[A2] Foto tidak ada** - Jika property `foto` null/undefined, sistem tampilkan placeholder image dengan icon kuliner |
| 3  | **[A3] Tidak ada review** - Jika belum ada review, sistem tampilkan message "Belum ada ulasan. Jadilah yang pertama!" dengan CTA button "Tulis Review" |
| 4  | **[A4] Map gagal load** - Jika Leaflet.js error, sistem tampilkan static address text tanpa map |
| 5  | **[A5] Jam tutup** - Jika kuliner sedang tutup (current time di luar jam operasional), sistem tampilkan badge merah "TUTUP" |

**Postkondisi:**  
- Modal detail terbuka dengan semua informasi kuliner
- User dapat interact dengan action buttons (favorit, review, navigasi)
- View count untuk kuliner ini bertambah (analytics)

---

### 2.5 UC-19: Admin Approve Submission

**Nama Usecase:** Admin Approve/Reject Submission Kuliner  
**Deskripsi:** Admin mereview submission kuliner dari user dan memutuskan untuk approve (tambahkan ke database) atau reject  
**Prekondisi:** Admin sudah login dan ada submission dengan status "pending"

| No | Alur Utama |
|----|------------|
| 1  | Admin login dan membuka panel admin dashboard |
| 2  | Sistem tampilkan tab "Review Submission" dengan counter badge jumlah pending |
| 3  | Admin klik tab "Review Submission" |
| 4  | Sistem load data dari `localStorage.pendingSubmissions` dan filter status="pending" |
| 5  | Sistem render list submission card dengan info: Nama tempat, Kategori, Alamat, Foto preview, Submitter (user), Tanggal submit |
| 6  | Admin klik salah satu submission card untuk melihat detail lengkap |
| 7  | Sistem expand card atau buka modal dengan semua field submission |
| 8  | Admin verify data (cek alamat di map, validasi foto, baca deskripsi) |
| 9  | Admin memutuskan: APPROVE atau REJECT |
| 10 | Jika APPROVE: Admin klik tombol "Setujui" (hijau dengan icon checkmark) |
| 11 | Sistem pindahkan submission dari `pendingSubmissions` ke array `kulinerData` |
| 12 | Sistem ubah status submission menjadi "approved" dan simpan ke `submissionHistory` |
| 13 | Sistem tampilkan toast "Submission disetujui! Kuliner baru telah ditambahkan" |
| 14 | Sistem kirim notifikasi ke submitter (jika system configured) |
| 15 | Sistem refresh list submission (approved item hilang dari pending list) |

| No | Alur Alternatif |
|----|-----------------|
| 1  | **[A1] Admin REJECT submission** - Jika admin klik "Tolak", sistem buka dialog input alasan penolakan (required), lalu simpan ke history dengan status "rejected" dan reason |
| 2  | **[A2] Data tidak valid** - Jika admin temukan data palsu/spam, admin bisa flag submission sebagai "spam" dan blacklist user (optional) |
| 3  | **[A3] Request edit** - Admin bisa klik "Minta Revisi" untuk kirim feedback ke user tanpa approve/reject langsung |
| 4  | **[A4] Duplicate submission** - Jika kuliner sudah ada, admin reject dengan reason "Kuliner ini sudah terdaftar" |
| 5  | **[A5] Foto tidak sesuai** - Jika foto kuliner tidak relevan, admin bisa approve dengan catatan atau minta ganti foto |

**Postkondisi:**  
- Jika APPROVED: Kuliner baru muncul di halaman utama dan bisa dicari oleh semua user
- Jika REJECTED: Submission tersimpan di history dengan alasan penolakan
- Submitter menerima notifikasi tentang status submission
- Counter pending di admin panel berkurang 1

### 2.6 GAMBAR DESAIN UI dengan WIREFRAME

#### **UC-08: Login Google OAuth**

**Halaman Sebelum Login:**
```
┌─────────────────────────────────────────────┐
│  🍜 LAPOR MANGAN!        [Masuk dengan Google]│
├─────────────────────────────────────────────┤
│                                             │
│    🗺️ MAP VIEW dengan marker kuliner       │
│       (User belum login - fitur terbatas)   │
│                                             │
│  📍 Marker kuliner bisa diklik              │
│  🔍 Search bar aktif                        │
│  🏷️ Filter kategori tersedia               │
│                                             │
│  ⚠️ Banner: "Login untuk review & submit"   │
└─────────────────────────────────────────────┘
```

**OAuth Popup:**
```
┌────────────────────────────────┐
│  🔐 Google Sign-In              │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │ 👤 user@gmail.com        │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 👤 another@gmail.com     │  │
│  └──────────────────────────┘  │
│                                │
│  [➕ Gunakan akun lain]        │
│                                │
│  Lapor Mangan! ingin:          │
│  ✓ Lihat info dasar profil     │
│  ✓ Lihat alamat email          │
│                                │
│    [Batal]  [Lanjutkan]        │
└────────────────────────────────┘
```

**Halaman Setelah Login:**
```
┌─────────────────────────────────────────────┐
│  🍜 LAPOR MANGAN!    [👤 User Name ▼]       │
├─────────────────────────────────────────────┤
│                                             │
│  ✅ "Login berhasil! Selamat datang User"   │
│     (toast notification)                    │
│                                             │
│    🗺️ MAP VIEW - Full Features Unlocked     │
│                                             │
│  📝 Tombol "Submit Kuliner Baru" muncul     │
│  ⭐ Icon favorit di card kuliner aktif      │
│  💬 Bisa tambah review & rating             │
└─────────────────────────────────────────────┘
```

---

#### **UC-11: Tambah Review**

**Detail Modal dengan Form Review:**
```
┌──────────────────────────────────────────────────┐
│  ✕                 [Nama Kuliner]                │
├──────────────────────────────────────────────────┤
│  📸 [Foto Kuliner - Carousel]      < 1/3 >      │
├──────────────────────────────────────────────────┤
│  📍 Alamat: Jl. Contoh No. 123                   │
│  🏷️ Kategori: Warung Makan                       │
│  💰 Harga: Rp 10.000 - 25.000                    │
│  ⭐ Rating: 4.2 (15 ulasan)                       │
├──────────────────────────────────────────────────┤
│  📝 TULIS REVIEW:                                │
│  ┌────────────────────────────────────────────┐  │
│  │ Berikan Rating:                            │  │
│  │ ⭐⭐⭐⭐☆  (4/5 bintang)                       │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │ Tulis komentar Anda...                     │  │
│  │ (min 10 karakter)                          │  │
│  │                                            │  │
│  │                                            │  │
│  └────────────────────────────────────────────┘  │
│  150/500 karakter                                │
│                                                  │
│  [Batal]              [Kirim Review]             │
├──────────────────────────────────────────────────┤
│  💬 REVIEW LAINNYA (15):                         │
│  ┌────────────────────────────────────────────┐  │
│  │ 👤 Budi  ⭐⭐⭐⭐⭐  2 hari lalu              │  │
│  │ "Enak banget, harga terjangkau..."        │  │
│  └────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────┐  │
│  │ 👤 Ani   ⭐⭐⭐⭐    1 minggu lalu           │  │
│  │ "Tempatnya bersih, pelayanan ramah..."    │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

**Toast Notification Setelah Submit:**
```
┌────────────────────────────────┐
│ ✅ Review berhasil ditambahkan! │
│    Terima kasih atas review    │
│    Anda 😊                     │
└────────────────────────────────┘
```

---

#### **UC-17: Submit Kuliner Baru**

**Form Submission (Modal):**
```
┌───────────────────────────────────────────────────┐
│  ✕         SUBMIT KULINER BARU                    │
├───────────────────────────────────────────────────┤
│                                                   │
│  📝 Nama Kuliner: *                               │
│  ┌─────────────────────────────────────────────┐  │
│  │ [Input nama tempat...]                      │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  🏷️ Kategori: *                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │ [▼ Pilih kategori...]                       │  │
│  │    ○ Warung Makan                           │  │
│  │    ○ PKL (Pedagang Kaki Lima)               │  │
│  │    ○ Cafe/Resto                             │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  📍 Alamat: *                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │ [Input alamat lengkap...]                   │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  🗺️ Koordinat: *                                  │
│  ┌─────────────────────────────────────────────┐  │
│  │ Lat: -7.XXXX  Lng: 109.XXXX                 │  │
│  │ [📍 Gunakan Lokasi Saya]  [🗺️ Pilih di Map] │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  💰 Range Harga: *                                │
│  ┌─────────────────────────────────────────────┐  │
│  │ Min: Rp [5000]  Max: Rp [20000]             │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  📸 Upload Foto (Maks 3): *                       │
│  ┌─────────────────────────────────────────────┐  │
│  │  [📷 Pilih File]  atau  Drag & Drop         │  │
│  │                                             │  │
│  │  ┌────┐ ┌────┐ ┌────┐                      │  │
│  │  │IMG1│ │IMG2│ │ +  │                      │  │
│  │  └────┘ └────┘ └────┘                      │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  📝 Deskripsi (Optional):                         │
│  ┌─────────────────────────────────────────────┐  │
│  │ [Ceritakan tentang tempat ini...]           │  │
│  │                                             │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│     [Batal]                    [Submit Review]    │
│                                                   │
│  ⚠️ Submission akan direview admin dulu sebelum   │
│     muncul di map                                 │
└───────────────────────────────────────────────────┘
```

---

#### **UC-02: Lihat Detail Kuliner**

**Kuliner Card di Homepage:**
```
┌──────────────────────────────────────┐
│  ┌────────────────────────────────┐  │
│  │  📸 [Foto Kuliner]             │  │
│  │                                │  │
│  └────────────────────────────────┘  │
│  ⭐⭐⭐⭐☆ 4.2 (25)    ❤️ 15 Favorit  │
│  📍 Warung Bu Yati                   │
│  💰 Rp 5.000 - 15.000                │
│  📍 0.5 km dari lokasi Anda          │
│  ────────────────────────────────    │
│  [Lihat Detail]                      │
└──────────────────────────────────────┘
```

**Detail Modal (Full View):**
```
┌──────────────────────────────────────────────────┐
│  ✕              WARUNG BU YATI                   │
├──────────────────────────────────────────────────┤
│  📸 ┌──────────────────────────┐  < 1 / 3 >     │
│     │   [Foto Kuliner Utama]   │                │
│     └──────────────────────────┘                │
│     ● ○ ○ (Dot indicator)                        │
├──────────────────────────────────────────────────┤
│  📍 INFORMASI:                                   │
│  ├─ Alamat: Jl. Jenderal Sudirman No. 45        │
│  ├─ Kategori: Warung Makan                      │
│  ├─ Harga: Rp 5.000 - 15.000                    │
│  ├─ Rating: ⭐ 4.2 dari 5 (25 ulasan)            │
│  └─ Jarak: 0.5 km dari lokasi Anda              │
│                                                  │
│  📝 Deskripsi:                                   │
│  "Warung legendaris sejak 1995, spesialis soto  │
│   ayam dan nasi goreng. Tempat bersih, harga    │
│   terjangkau mahasiswa."                         │
│                                                  │
│  🗺️ PETA LOKASI:                                 │
│  ┌────────────────────────────────────────────┐  │
│  │     🗺️ [Leaflet Mini Map]                  │  │
│  │         📍 Marker Warung Bu Yati           │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌─────┐ ┌──────┐ ┌────────┐ ┌──────┐          │
│  │ ❤️   │ │ ⭐    │ │ 📱      │ │ 🧭    │          │
│  │Favorit│ │Review│ │Navigate│ │Share │          │
│  └─────┘ └──────┘ └────────┘ └──────┘          │
├──────────────────────────────────────────────────┤
│  💬 REVIEW (25):                                 │
│  ┌────────────────────────────────────────────┐  │
│  │ 👤 Budi Santoso  ⭐⭐⭐⭐⭐  2 hari lalu       │  │
│  │ "Soto ayamnya juara! Kuahnya gurih banget, │  │
│  │  daging ayam banyak. Harga 10rb worth it!" │  │
│  │  👍 15   💬 Balas                           │  │
│  └────────────────────────────────────────────┘  │
│  [Muat Lebih Banyak...]                          │
└──────────────────────────────────────────────────┘
```

---

#### **UC-19: Admin Approve Submission**

**Admin Dashboard:**
```
┌──────────────────────────────────────────────────┐
│  🛡️ ADMIN PANEL                  [👤 Admin ▼]   │
├──────────────────────────────────────────────────┤
│  [📝 Submission] [📰 Berita] [🎉 Promo] [👥 Users] │
├──────────────────────────────────────────────────┤
│                                                  │
│  📊 PENDING SUBMISSIONS (3)                      │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │ 🔴 NEW  Warung Pak Bondan                  │  │
│  │ ────────────────────────────────────────   │  │
│  │ 👤 Submitted by: Ahmad Zulvan              │  │
│  │ 📅 Tanggal: 17 Des 2025, 10:30             │  │
│  │ 🏷️ Kategori: Warung Makan                  │  │
│  │ 📍 Jl. Veteran No. 88, Purwokerto         │  │
│  │                                            │  │
│  │ 📸 [Foto 1] [Foto 2] [Foto 3]              │  │
│  │                                            │  │
│  │ 💰 Harga: Rp 8.000 - 20.000                │  │
│  │ 🗺️ Koordinat: -7.4234, 109.2345            │  │
│  │                                            │  │
│  │ 📝 "Warung dengan menu lengkap, spesialis │  │
│  │     nasi pecel dan soto. Tempatnya..."     │  │
│  │                                            │  │
│  │ ┌────────┐ ┌────────┐ ┌──────────────┐    │  │
│  │ │✅ SETUJUI│ │❌ TOLAK │ │✏️ MINTA REVISI│    │  │
│  │ └────────┘ └────────┘ └──────────────┘    │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │ 🔴 NEW  Cafe Aesthetic Corner              │  │
│  │ ────────────────────────────────────────   │  │
│  │ 👤 Submitted by: Rina Putri                │  │
│  │ 📅 Tanggal: 17 Des 2025, 09:15             │  │
│  │ [Detail serupa...]                         │  │
│  │ [✅ SETUJUI] [❌ TOLAK] [✏️ MINTA REVISI]    │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

**Dialog Konfirmasi Approve:**
```
┌────────────────────────────────┐
│  ✅ KONFIRMASI PERSETUJUAN      │
├────────────────────────────────┤
│                                │
│  Anda yakin ingin menyetujui   │
│  submission "Warung Pak Bondan"?│
│                                │
│  Kuliner ini akan langsung     │
│  muncul di map untuk semua user│
│                                │
│    [Batal]      [✅ Ya, Setujui]│
└────────────────────────────────┘
```

**Dialog Reject dengan Alasan:**
```
┌────────────────────────────────┐
│  ❌ TOLAK SUBMISSION            │
├────────────────────────────────┤
│                                │
│  Alasan Penolakan: *           │
│  ┌──────────────────────────┐  │
│  │ [Pilih alasan...]        │  │
│  │ ○ Foto tidak jelas       │  │
│  │ ○ Data tidak lengkap     │  │
│  │ ○ Duplikat kuliner       │  │
│  │ ○ Lokasi tidak valid     │  │
│  │ ● Lainnya (tulis)        │  │
│  └──────────────────────────┘  │
│                                │
│  Catatan Tambahan:             │
│  ┌──────────────────────────┐  │
│  │ [Jelaskan alasan...]     │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│    [Batal]      [❌ Tolak]      │
└────────────────────────────────┘
```

**Toast Notification:**
```
┌────────────────────────────────┐
│ ✅ Submission disetujui!        │
│    Kuliner "Warung Pak Bondan" │
│    telah ditambahkan ke map    │
└────────────────────────────────┘
```

---

## 3. IDENTIFIKASI OBJECT DALAM USE CASE SCENARIO

Berikut adalah identifikasi object-object yang muncul dalam Use Case Scenario yang telah dibuat. Object dikategorikan menjadi 3 jenis berdasarkan pattern MVC (Model-View-Controller):
- **Boundary (Interface)**: Object yang berinteraksi langsung dengan user (UI elements)
- **Entity (Basisdata)**: Object yang merepresentasikan data/model
- **Controller (Pemrosesan)**: Object yang mengatur logic dan proses bisnis

### TABEL OBJECT

| No | Nama Object | Jenis / Tipe Object | Keterangan |
|----|-------------|---------------------|------------|
| 1  | LoginButton | Boundary | Tombol "Masuk dengan Google" di header aplikasi |
| 2  | OAuthPopup | Boundary | Popup window Google OAuth untuk autentikasi |
| 3  | UserProfileWidget | Boundary | Widget menampilkan foto profil dan nama user setelah login |
| 4  | ToastNotification | Boundary | Pop-up notifikasi untuk feedback ke user (success/error) |
| 5  | User | Entity | Data pengguna (uid, displayName, email, photoURL, loginStatus) |
| 6  | AuthToken | Entity | Token autentikasi dari Google OAuth |
| 7  | AuthController | Controller | Mengatur proses login, logout, session management |
| 8  | FirebaseAuthService | Controller | Service untuk komunikasi dengan Firebase Authentication API |
| 9  | DetailModal | Boundary | Modal popup menampilkan detail lengkap kuliner |
| 10 | ReviewForm | Boundary | Form input untuk menulis review (rating + komentar) |
| 11 | StarRatingInput | Boundary | Input bintang 1-5 untuk rating kuliner |
| 12 | CommentTextarea | Boundary | Textarea untuk input komentar review |
| 13 | ReviewList | Boundary | List component menampilkan semua review kuliner |
| 14 | Review | Entity | Data review (userId, userName, rating, comment, timestamp, kulinerID) |
| 15 | Kuliner | Entity | Data kuliner (id, nama, kategori, alamat, harga, rating, foto, lat, lng) |
| 16 | ReviewController | Controller | Mengatur proses submit, validate, dan save review |
| 17 | RatingCalculator | Controller | Menghitung rating rata-rata dari semua review |
| 18 | SubmissionForm | Boundary | Form lengkap untuk submit kuliner baru (multi-field) |
| 19 | CategoryDropdown | Boundary | Dropdown select untuk pilih kategori kuliner |
| 20 | PhotoUploader | Boundary | Component upload foto (drag & drop atau browse) |
| 21 | CoordinatePicker | Boundary | Button/Input untuk dapatkan koordinat GPS (auto/manual) |
| 22 | Submission | Entity | Data submission (id, kulinerData, status, submitterId, submittedAt) |
| 23 | SubmissionController | Controller | Mengatur proses validasi, save, dan tracking submission |
| 24 | ValidationService | Controller | Service untuk validasi input form (format, required, size) |
| 25 | KulinerCard | Boundary | Card component di list kuliner (homepage) |
| 26 | PhotoCarousel | Boundary | Carousel untuk swipe multiple foto kuliner |
| 27 | MiniMap | Boundary | Leaflet map mini menampilkan marker lokasi kuliner |
| 28 | ActionButtonGroup | Boundary | Group button: Favorit, Review, Navigasi, Tutup |
| 29 | KulinerController | Controller | Mengatur logic retrieve dan display detail kuliner |
| 30 | MapService | Controller | Service untuk render Leaflet map dan marker |
| 31 | AdminDashboard | Boundary | Panel admin dengan tabs (submission, berita, promo, users) |
| 32 | SubmissionReviewPanel | Boundary | Panel khusus untuk review submission pending |
| 33 | SubmissionCard | Boundary | Card component menampilkan preview submission |
| 34 | ApproveButton | Boundary | Button hijau untuk approve submission |
| 35 | RejectButton | Boundary | Button merah untuk reject submission |
| 36 | ReasonDialog | Boundary | Dialog input alasan penolakan submission |
| 37 | SubmissionHistory | Entity | Data history submission (status, reviewedBy, reviewedAt, reason) |
| 38 | AdminController | Controller | Mengatur proses moderasi (approve/reject/request edit) |
| 39 | NotificationService | Controller | Service untuk kirim notifikasi ke user (email/push) |
| 40 | LocalStorageManager | Controller | Mengatur penyimpanan dan retrieval data dari localStorage |

### 3.1 Penjelasan Kategori Object

#### **Boundary Objects (Interface)**
Object yang berhubungan langsung dengan user interface dan interaksi user. Contoh:
- `LoginButton`, `OAuthPopup`: Interface untuk proses login
- `ReviewForm`, `StarRatingInput`: Interface untuk input review
- `DetailModal`, `PhotoCarousel`: Interface untuk menampilkan konten
- `AdminDashboard`, `SubmissionReviewPanel`: Interface untuk admin

**Total Boundary Objects: 19**

#### **Entity Objects (Basisdata)**
Object yang merepresentasikan data atau model dalam aplikasi. Contoh:
- `User`: Data pengguna (credentials, profile)
- `Kuliner`: Data tempat kuliner (info, lokasi, rating)
- `Review`: Data ulasan user
- `Submission`: Data kontribusi user
- `SubmissionHistory`: History moderasi admin

**Total Entity Objects: 7**

#### **Controller Objects (Pemrosesan)**
Object yang mengatur business logic, validasi, dan komunikasi antar layer. Contoh:
- `AuthController`: Mengatur authentication flow
- `ReviewController`: Mengatur proses review
- `SubmissionController`: Mengatur submission workflow
- `ValidationService`: Validasi input
- `NotificationService`: Kirim notifikasi
- `LocalStorageManager`: Data persistence

**Total Controller Objects: 14**

### 3.2 Mapping Object ke Use Case

| Use Case | Boundary Objects | Entity Objects | Controller Objects |
|----------|------------------|----------------|-------------------|
| **UC-08: Login Google OAuth** | LoginButton, OAuthPopup, UserProfileWidget, ToastNotification | User, AuthToken | AuthController, FirebaseAuthService |
| **UC-11: Tambah Review** | DetailModal, ReviewForm, StarRatingInput, CommentTextarea, ReviewList, ToastNotification | Review, Kuliner, User | ReviewController, RatingCalculator, ValidationService |
| **UC-17: Submit Kuliner** | SubmissionForm, CategoryDropdown, PhotoUploader, CoordinatePicker, ToastNotification | Submission, Kuliner | SubmissionController, ValidationService, LocalStorageManager |
| **UC-02: Lihat Detail** | KulinerCard, DetailModal, PhotoCarousel, MiniMap, ActionButtonGroup, ReviewList | Kuliner, Review | KulinerController, MapService |
| **UC-19: Admin Approve** | AdminDashboard, SubmissionReviewPanel, SubmissionCard, ApproveButton, RejectButton, ReasonDialog, ToastNotification | Submission, SubmissionHistory, Kuliner | AdminController, NotificationService, LocalStorageManager |

---

## 4. USE CASE DIAGRAM

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

## UPDATE FITUR TERBARU (18 Desember 2025)

### Fitur Enhancement yang Ditambahkan:

#### 1. **UC-01 Enhancement: Interactive Map dengan Scroll Zoom**
- **Fitur Baru**: Scroll mouse wheel untuk zoom in/out pada peta
- **Implementasi**: 
  - Scroll up = Zoom in (memperbesar peta)
  - Scroll down = Zoom out (memperkecil peta)
  - Support touchpad pinch gesture untuk mobile/laptop
  - Zoom range: Level 10-19 (dari view kota hingga level jalan detail)
  - Smooth animation saat zoom
- **Manfaat**: User dapat explore peta dengan lebih mudah dan cepat

#### 2. **UC-01 Enhancement: Fullscreen Map Mode**
- **Fitur Baru**: Mode peta fullscreen dengan kontrol lengkap
- **Implementasi**:
  - Tombol expand (↗️) di pojok kanan atas peta kecil
  - Modal peta fullscreen yang memenuhi seluruh layar
  - Kontrol zoom (+/-) built-in
  - Tombol "Lokasi Saya" untuk GPS tracking otomatis
  - Legend marker (🍴 Tetap vs 🛵 Keliling)
  - ESC key untuk close modal
- **Manfaat**: Eksplorasi peta lebih leluasa dan detail

#### 3. **UC-15 Enhancement: Marker Icons Improvement**
- **Fitur Lama**: Icon emoji sederhana (📍 dan 🛵)
- **Fitur Baru**: 
  - Icon 🍴 (makanan) untuk warung tetap dengan background putih dan border oranye
  - Icon 🛵 (motor) untuk pedagang keliling dengan background putih dan border kuning
  - Pin pointer (segitiga kecil) di bawah marker seperti Google Maps
  - Shadow effect untuk depth
  - Animasi goyang untuk pedagang keliling
- **Manfaat**: Marker lebih visible dan mudah dibedakan

#### 4. **UC-21, UC-22: Halaman Berita Kuliner**
- **Fitur Baru**: Section berita/artikel tentang kuliner Purwokerto
- **Konten**: 10 artikel meliputi:
  - Festival Kuliner Purwokerto 2025
  - Mendoan Bu Parti: Legenda Tempe Goreng
  - Soto Sokaraja: Warisan Kuliner Banyumas
  - 5 Tempat Makan Sate Terenak
  - Tips Mencari Kuliner Halal
  - Getuk Goreng, Kupat Glabed, Nasi Bogana
  - Kuliner Malam Purwokerto
  - Dukungan Pemerintah untuk UMKM
- **UI/UX**:
  - Grid layout responsif (1 kolom mobile, 2-3 kolom desktop)
  - Filter kategori: Semua, Kuliner, Event, Tips, Berita
  - Card hover effects (naik + gambar zoom)
  - Kategori badge berwarna
  - Format tanggal Indonesia
- **Manfaat**: User mendapat informasi terkini tentang kuliner Purwokerto

#### 5. **NFR-10: WCAG 2.1 Level AA Accessibility**
- **Fitur Baru**: Aksesibilitas untuk pengguna difabel
- **Implementasi**:
  - ARIA labels untuk semua elemen interaktif
  - Keyboard navigation (Tab untuk navigasi, Enter/Space untuk aksi)
  - Skip to content link (hidden, muncul saat focus)
  - Screen reader announcements untuk perubahan halaman
  - Focus visible styles (outline oranye tebal)
  - High contrast mode support
  - Reduced motion support (disable animation untuk yang sensitive)
- **Manfaat**: Aplikasi dapat digunakan oleh semua orang termasuk tunanetra

#### 6. **NFR-01, NFR-02: Security & Privacy**
- **Fitur Baru**: Manajemen privasi dan keamanan data
- **Implementasi**:
  - Privacy consent banner saat pertama kali buka aplikasi
  - Halaman kebijakan privasi lengkap
  - Secure cookie dengan flag SameSite=Strict
  - Session timeout otomatis
  - Clear sensitive data saat logout
  - User consent tracking dengan timestamp
- **Manfaat**: Kepatuhan GDPR dan perlindungan data pengguna

#### 7. **UC-13: Random/Acak Pilihan Enhancement**
- **Fitur Lama**: Tombol acak hanya buka detail random
- **Fitur Baru**: 
  - Toast notification menampilkan nama kuliner yang dipilih
  - Smooth animation saat membuka detail
  - Feedback visual yang jelas
- **Manfaat**: User experience lebih engaging

### Perubahan pada Use Case Existing:

#### UC-01: Melihat Peta Kuliner (Enhanced)
**Tambahan Post-condition:**
- User dapat scroll zoom pada peta untuk melihat detail area
- User dapat membuka fullscreen map untuk eksplorasi lebih luas
- User dapat menggunakan tombol "Lokasi Saya" untuk auto-center ke GPS

#### UC-15: Melihat Detail Kuliner (Enhanced)
**Tambahan di Main Flow:**
- Step tambahan: User dapat klik marker di peta untuk buka detail
- Step tambahan: Di fullscreen map, popup menampilkan info singkat + tombol "Lihat Detail"

### Testing Status:
✅ Semua fitur baru telah ditest dan berfungsi dengan baik
✅ Compatible dengan Chrome, Firefox, Safari, Edge
✅ Responsive di mobile, tablet, desktop
✅ Performance tetap optimal (<3 detik load time)
✅ No breaking changes pada fitur existing

---

**Catatan:**
- Laporan ini disusun untuk memenuhi Assignment Week #10
- Use case dapat berubah sesuai feedback dari stakeholder
- Untuk detail teknis implementasi, lihat dokumentasi kode dan API
- **Update terakhir: 18 Desember 2025** dengan penambahan fitur enhancement

---

*Dibuat: 17 Desember 2024*  
*Update: 18 Desember 2025*  
*Kelompok: [Nomor Kelompok]*  
*Aplikasi: Lapor Mangan! - Purwokerto Culinary Finder*
