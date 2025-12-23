// ============================================
// LAPOR MANGAN! - Main Application Script
// Consolidated Logic for FR & NFR Compliance
// ============================================

// ============================================
// DATABASE (LocalStorage Simulation)
// ============================================
const DB = {
    get(key, defaultValue = []) {
        try {
            const data = localStorage.getItem(`lm_${key}`);
            return data ? JSON.parse(data) : defaultValue;
        } catch { return defaultValue; }
    },

    set(key, value) {
        localStorage.setItem(`lm_${key}`, JSON.stringify(value));
    },

    init() {
        // Updated to v2 to load new CSV data
        if (!localStorage.getItem('lm_initialized_v3')) {
            DB.set('kuliner', initialKulinerData);
            DB.set('berita', initialBeritaData);
            DB.set('promo', initialPromoData);
            DB.set('users', [
                { id: 1, email: 'admin@lapormangan.id', name: 'Admin', password: 'admin123', role: 'admin' },
                { id: 2, email: 'user@test.com', name: 'User Test', password: '123456', role: 'user' }
            ]);
            DB.set('submissions', []);
            DB.set('initialized', true);
            localStorage.setItem('lm_initialized_v3', 'true');
        }

        // Seed demo submission (one-time) so UC-19 can be demonstrated immediately.
        // This runs even for existing users who already have lm_initialized_v3.
        try {
            if (!localStorage.getItem('lm_seeded_submissions_v1')) {
                const submissions = DB.get('submissions', []);
                const list = Array.isArray(submissions) ? submissions : [];
                const hasPending = list.some(s => s && (s.status || 'pending') === 'pending');

                if (!hasPending) {
                    const example = {
                        id: Date.now() - 12345,
                        status: 'pending',
                        submittedAt: new Date().toISOString(),
                        userId: 2,
                        userName: 'User Test',
                        data: {
                            nama: 'Bakso Pak Joko (Contoh)',
                            kategori: 'Bakso',
                            alamat: 'Jl. Jenderal Sudirman, Purwokerto',
                            jam: '10:00 - 21:00',
                            harga: 'Rp12.000 - Rp25.000',
                            deskripsi: 'Ini adalah contoh submission untuk demo UC-19. Bakso urat, bakso halus, dan mie ayam dengan kuah gurih. (Data dapat dihapus/ditolak/di-approve oleh admin.)',
                            foto: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
                            fotos: [
                                'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
                                'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800'
                            ],
                            lat: -7.4249,
                            lng: 109.2416,
                            keliling: false,
                            halal: 'halal-self',
                            kontak: '0812-0000-0000',
                            parkir: 'Tersedia',
                            verified: false,
                            reviews: []
                        }
                    };
                    list.unshift(example);
                    DB.set('submissions', list);
                }

                localStorage.setItem('lm_seeded_submissions_v1', 'true');
            }
        } catch {
            // ignore
        }
    }
};

// ============================================
// INITIAL DATA
// ============================================
const initialKulinerData = [
    {
        id: 1,
        nama: "Soto Sokaraja",
        kategori: "Soto",
        alamat: "Jl. Jend. Sudirman No.58, Purwokerto",
        jam: "07:00 - 15:00",
        harga: "Rp15.000 - Rp20.000",
        deskripsi: "Kuah kental dengan irisan daging sapi, khas Sokaraja yang legendaris.",
        foto: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400",
        lat: -7.421, lng: 109.242,
        keliling: false,
        halal: "halal",
        kontak: "081234567890",
        parkir: "Tersedia luas",
        rute: "Area Sokaraja, dekat pasar",
        verified: true,
        reviews: [
            { userId: 1, name: "Budi", rating: 5, comment: "Soto terenak di Purwokerto!", date: "2025-12-10" },
            { userId: 2, name: "Ani", rating: 4, comment: "Kuahnya gurih, porsi pas", date: "2025-12-08" }
        ],
        menu: [
            { name: "Soto Daging Sapi", price: "20k" },
            { name: "Soto Ayam Kampung", price: "18k" },
            { name: "Soto Babat", price: "20k" },
            { name: "Mendoan (per biji)", price: "2k" },
            { name: "Es Teh Manis", price: "4k" },
            { name: "Es Jeruk", price: "5k" }
        ]
    },
    {
        id: 2,
        nama: "Sate Bebek Tambak",
        kategori: "Sate",
        alamat: "Jl. Tambak, Purwokerto",
        jam: "16:00 - 22:00",
        harga: "Rp25.000 - Rp40.000",
        deskripsi: "Sate bebek gurih dengan bumbu kacang dan arang khas, favorit malam hari.",
        foto: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=400",
        lat: -7.423, lng: 109.240,
        keliling: false,
        halal: "halal",
        kontak: "081234567891",
        parkir: "Tersedia",
        rute: "Jl. Tambak",
        verified: true,
        reviews: [{ userId: 3, name: "Dimas", rating: 5, comment: "Wajib coba!", date: "2025-12-05" }],
        menu: [
            { name: "Sate Bebek (10 tusuk)", price: "35k" },
            { name: "Sate Bebek (5 tusuk)", price: "20k" },
            { name: "Gulai Bebek", price: "25k" },
            { name: "Nasi Putih", price: "5k" },
            { name: "Teh Hangat", price: "3k" }
        ]
    },
    {
        id: 3,
        nama: "Mendoan Bu Parti",
        kategori: "Jajanan Tradisional",
        alamat: "Pasar Sokaraja, Purwokerto",
        jam: "06:00 - 18:00",
        harga: "Rp2.000 - Rp5.000",
        deskripsi: "Tempe tipis digoreng renyah, disajikan dengan sambal kecap pedas.",
        foto: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400",
        lat: -7.420, lng: 109.230,
        keliling: true,
        halal: "halal-self",
        kontak: "081234567892",
        parkir: "Area Pasar",
        rute: "Berkeliling Pasar Sokaraja",
        verified: true,
        reviews: []
    },
    {
        id: 4,
        nama: "Nasi Liwet Mbah Maimun",
        kategori: "Makanan Berat",
        alamat: "Jl. Pahlawan No.123, Purwokerto",
        jam: "16:00 - 22:00",
        harga: "Rp18.000 - Rp25.000",
        deskripsi: "Nasi gurih santan dengan lauk ayam suwir, telur, dan tempe orek.",
        foto: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
        lat: -7.425, lng: 109.250,
        keliling: false,
        halal: "halal",
        kontak: "081234567893",
        parkir: "Tersedia",
        rute: "Jl. Pahlawan",
        verified: true,
        reviews: []
    },
    {
        id: 5,
        nama: "Bakso President",
        kategori: "Bakso",
        alamat: "Jl. Dr. Angka No.88, Purwokerto",
        jam: "08:00 - 21:00",
        harga: "Rp15.000 - Rp25.000",
        deskripsi: "Bakso besar dengan kuah gurih dan tekstur kenyal, ikonik di Purwokerto.",
        foto: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
        lat: -7.418, lng: 109.245,
        keliling: false,
        halal: "halal",
        kontak: "081234567894",
        parkir: "Luas",
        rute: "Jl. Dr. Angka",
        verified: true,
        reviews: [],
        menu: [
            { name: "Bakso Komplit", price: "25k" },
            { name: "Bakso Urat", price: "20k" },
            { name: "Mie Ayam Bakso", price: "18k" },
            { name: "Es Campur", price: "12k" }
        ]
    },
    {
        id: 6,
        nama: "Gudeg Mbah Siti",
        kategori: "Gudeg",
        alamat: "Jl. Slamet Riyadi No.45, Purwokerto",
        jam: "09:00 - 19:00",
        harga: "Rp20.000 - Rp30.000",
        deskripsi: "Gudeg manis khas Jawa dengan krengsengan ayam.",
        foto: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        lat: -7.430, lng: 109.235,
        keliling: false,
        halal: "halal-self",
        kontak: "081234567895",
        parkir: "Tersedia",
        rute: "Jl. Slamet Riyadi",
        verified: true,
        reviews: []
    },
    {
        id: 7,
        nama: "Cilok Bang Jali",
        kategori: "Jajanan Tradisional",
        alamat: "Keliling area GOR Satria",
        jam: "14:00 - 21:00",
        harga: "Rp5.000 - Rp10.000",
        deskripsi: "Cilok kenyal dengan bumbu kacang spesial.",
        foto: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400",
        lat: -7.424, lng: 109.244,
        keliling: true,
        halal: "unknown",
        kontak: "081234567896",
        parkir: "-",
        rute: "Keliling GOR Satria",
        verified: true,
        reviews: []
    },
    {
        id: 8,
        nama: "Es Dawet Ayu",
        kategori: "Minuman",
        alamat: "Alun-alun Purwokerto",
        jam: "10:00 - 22:00",
        harga: "Rp5.000 - Rp8.000",
        deskripsi: "Es dawet segar dengan santan dan gula merah.",
        foto: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400",
        lat: -7.422, lng: 109.241,
        keliling: true,
        halal: "halal-self",
        kontak: "081234567897",
        parkir: "Area Alun-alun",
        rute: "Alun-alun Purwokerto",
        verified: true,
        reviews: []
    },
    {
        id: 9,
        nama: "Ayam Bakar Pak Tono",
        kategori: "Ayam",
        alamat: "Jl. Diponegoro No.78, Purwokerto",
        jam: "11:00 - 23:00",
        harga: "Rp25.000 - Rp40.000",
        deskripsi: "Ayam bakar bumbu rempah dengan sambal matah.",
        foto: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400",
        lat: -7.422, lng: 109.248,
        keliling: false,
        halal: "halal",
        kontak: "081234567898",
        parkir: "Luas",
        rute: "Jl. Diponegoro",
        verified: true,
        reviews: []
    },
    {
        id: 10,
        nama: "Lontong Sayur Mbah Rini",
        kategori: "Lontong",
        alamat: "Jl. Ahmad Yani No.90, Purwokerto",
        jam: "07:00 - 14:00",
        harga: "Rp12.000 - Rp18.000",
        deskripsi: "Lontong dengan sayur labu siam santan.",
        foto: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
        lat: -7.415, lng: 109.240,
        keliling: false,
        halal: "halal-self",
        kontak: "081234567899",
        parkir: "Tersedia",
        rute: "Jl. Ahmad Yani",
        verified: true,
        reviews: []
    },
    { "id": 200, "nama": "Soto Sokaraja Pak Min", "kategori": "Makanan Berat", "alamat": "Sokaraja", "jam": "06:00 - 14:00", "harga": "Rp15000 - Rp25000", "deskripsi": "Soto Daging. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Soto+Sokaraja+Pak+Min", "lat": -7.40245, "lng": 109.23824, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Sokaraja", "verified": true, "reviews": [] },
    { "id": 201, "nama": "Mie Ayam Bakso Pak Kumis", "kategori": "Makanan Berat", "alamat": "Jl. Jenderal Sudirman", "jam": "08:00 - 21:00", "harga": "Rp12000 - Rp20000", "deskripsi": "Mie Ayam Bakso. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Mie+Ayam+Bakso+Pak+Kumis", "lat": -7.44096, "lng": 109.24148, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Jenderal Sudirman", "verified": true, "reviews": [] },
    { "id": 202, "nama": "Warung Nasi Pecel Bu Tinuk", "kategori": "Makanan Berat", "alamat": "Pasar Wage", "jam": "06:00 - 12:00", "harga": "Rp8000 - Rp15000", "deskripsi": "Pecel Sayur. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Warung+Nasi+Pecel+Bu+Tinuk", "lat": -7.41849, "lng": 109.25384, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Pasar Wage", "verified": true, "reviews": [] },
    { "id": 203, "nama": "Sate Ambal Pak Kasno", "kategori": "Makanan Berat", "alamat": "Ambal", "jam": "16:00 - 22:00", "harga": "Rp25000 - Rp40000", "deskripsi": "Sate Kambing. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Sate+Ambal+Pak+Kasno", "lat": -7.43262, "lng": 109.22971, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Ambal", "verified": true, "reviews": [] },
    { "id": 204, "nama": "Mendoan Pak Dhuwur", "kategori": "Makanan Berat", "alamat": "Area Alun-alun", "jam": "15:00 - 21:00", "harga": "Rp5000 - Rp10000", "deskripsi": "Mendoan Tempe. Pedagang Keliling.", "foto": "https://via.placeholder.com/400x200?text=Mendoan+Pak+Dhuwur", "lat": -7.42569, "lng": 109.23408, "keliling": true, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Area Alun-alun", "verified": true, "reviews": [] },
    { "id": 205, "nama": "Lotek Kupat Tahu Bu Sri", "kategori": "Makanan Berat", "alamat": "Jl. Veteran", "jam": "07:00 - 13:00", "harga": "Rp10000 - Rp18000", "deskripsi": "Lotek Kupat Tahu. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Lotek+Kupat+Tahu+Bu+Sri", "lat": -7.42469, "lng": 109.26197, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Veteran", "verified": true, "reviews": [] },
    { "id": 206, "nama": "Bakmi Jawa Pak Karno", "kategori": "Makanan Berat", "alamat": "Jl. Ahmad Yani", "jam": "10:00 - 21:00", "harga": "Rp15000 - Rp25000", "deskripsi": "Bakmi Jawa. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Bakmi+Jawa+Pak+Karno", "lat": -7.41655, "lng": 109.22911, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Ahmad Yani", "verified": true, "reviews": [] },
    { "id": 207, "nama": "Nasi Gandul Yu Tum", "kategori": "Makanan Berat", "alamat": "Jl. Overste Isdiman", "jam": "08:00 - 15:00", "harga": "Rp18000 - Rp28000", "deskripsi": "Nasi Gandul. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Nasi+Gandul+Yu+Tum", "lat": -7.42992, "lng": 109.25763, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Overste Isdiman", "verified": true, "reviews": [] },
    { "id": 208, "nama": "Es Dawet Ayu Telasih", "kategori": "Minuman", "alamat": "Jl. Sunan Kalijaga", "jam": "08:00 - 17:00", "harga": "Rp8000 - Rp12000", "deskripsi": "Es Dawet. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Es+Dawet+Ayu+Telasih", "lat": -7.41737, "lng": 109.24994, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Sunan Kalijaga", "verified": true, "reviews": [] },
    { "id": 209, "nama": "Kopi Progo", "kategori": "Minuman", "alamat": "Jl. Jenderal Sudirman", "jam": "07:00 - 22:00", "harga": "Rp12000 - Rp35000", "deskripsi": "Kopi Manual Brew. Kafe Tetap.", "foto": "https://via.placeholder.com/400x200?text=Kopi+Progo", "lat": -7.43216, "lng": 109.23963, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Jenderal Sudirman", "verified": true, "reviews": [] },
    { "id": 210, "nama": "Tahu Gimbal Pak Hadi", "kategori": "Makanan Berat", "alamat": "Alun-alun Purwokerto", "jam": "16:00 - 21:00", "harga": "Rp12000 - Rp20000", "deskripsi": "Tahu Gimbal. Gerobak Tetap.", "foto": "https://via.placeholder.com/400x200?text=Tahu+Gimbal+Pak+Hadi", "lat": -7.41403, "lng": 109.22742, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Alun-alun Purwokerto", "verified": true, "reviews": [] },
    { "id": 211, "nama": "Warung Nasi Ayam Bu Yanti", "kategori": "Makanan Berat", "alamat": "Berkoh", "jam": "10:00 - 20:00", "harga": "Rp15000 - Rp25000", "deskripsi": "Nasi Ayam Kampung. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Warung+Nasi+Ayam+Bu+Yanti", "lat": -7.40769, "lng": 109.22363, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Berkoh", "verified": true, "reviews": [] },
    { "id": 212, "nama": "Sate Blater Pak Bambang", "kategori": "Makanan Berat", "alamat": "Jl. Mayjend Sungkono", "jam": "17:00 - 23:00", "harga": "Rp20000 - Rp35000", "deskripsi": "Sate Ayam. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Sate+Blater+Pak+Bambang", "lat": -7.43205, "lng": 109.25495, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Mayjend Sungkono", "verified": true, "reviews": [] },
    { "id": 213, "nama": "Angkringan Mbah Paijo", "kategori": "Makanan Berat", "alamat": "Jl. Gatot Subroto", "jam": "18:00 - 02:00", "harga": "Rp5000 - Rp15000", "deskripsi": "Nasi Kucing. Gerobak Tetap.", "foto": "https://via.placeholder.com/400x200?text=Angkringan+Mbah+Paijo", "lat": -7.40877, "lng": 109.23017, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Gatot Subroto", "verified": true, "reviews": [] },
    { "id": 214, "nama": "Wedang Ronde Pak Tirto", "kategori": "Minuman", "alamat": "Grendeng", "jam": "18:00 - 23:00", "harga": "Rp8000 - Rp15000", "deskripsi": "Wedang Ronde. Gerobak Tetap.", "foto": "https://via.placeholder.com/400x200?text=Wedang+Ronde+Pak+Tirto", "lat": -7.43535, "lng": 109.25574, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Grendeng", "verified": true, "reviews": [] },
    { "id": 215, "nama": "Getuk Goreng Bu Siti", "kategori": "Makanan Berat", "alamat": "Pasar Manis", "jam": "08:00 - 17:00", "harga": "Rp5000 - Rp10000", "deskripsi": "Getuk Goreng. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Getuk+Goreng+Bu+Siti", "lat": -7.42261, "lng": 109.24116, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Pasar Manis", "verified": true, "reviews": [] },
    { "id": 216, "nama": "Bubur Ayam Barito", "kategori": "Makanan Berat", "alamat": "Jl. Barito", "jam": "06:00 - 11:00", "harga": "Rp10000 - Rp18000", "deskripsi": "Bubur Ayam. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Bubur+Ayam+Barito", "lat": -7.42141, "lng": 109.26026, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Barito", "verified": true, "reviews": [] },
    { "id": 217, "nama": "Nasi Uduk Bu Retno", "kategori": "Makanan Berat", "alamat": "Purwokerto Lor", "jam": "06:00 - 12:00", "harga": "Rp12000 - Rp20000", "deskripsi": "Nasi Uduk. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Nasi+Uduk+Bu+Retno", "lat": -7.41907, "lng": 109.25102, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Purwokerto Lor", "verified": true, "reviews": [] },
    { "id": 218, "nama": "Bakso Malang Cak Eko", "kategori": "Makanan Berat", "alamat": "Jl. HR Bunyamin", "jam": "10:00 - 21:00", "harga": "Rp15000 - Rp30000", "deskripsi": "Bakso Malang. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Bakso+Malang+Cak+Eko", "lat": -7.41917, "lng": 109.23763, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. HR Bunyamin", "verified": true, "reviews": [] },
    { "id": 219, "nama": "Es Cao Purwokerto", "kategori": "Minuman", "alamat": "Purwokerto Kidul", "jam": "09:00 - 17:00", "harga": "Rp10000 - Rp20000", "deskripsi": "Es Cao. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Es+Cao+Purwokerto", "lat": -7.43533, "lng": 109.23085, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Purwokerto Kidul", "verified": true, "reviews": [] },
    { "id": 220, "nama": "Ayam Geprek Bensu", "kategori": "Makanan Berat", "alamat": "Jl. Yos Sudarso", "jam": "10:00 - 22:00", "harga": "Rp18000 - Rp35000", "deskripsi": "Ayam Geprek. Resto Tetap.", "foto": "https://via.placeholder.com/400x200?text=Ayam+Geprek+Bensu", "lat": -7.42163, "lng": 109.2513, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Yos Sudarso", "verified": true, "reviews": [] },
    { "id": 221, "nama": "Soto Ayam Lamongan", "kategori": "Makanan Berat", "alamat": "Jl. Gerilya", "jam": "07:00 - 15:00", "harga": "Rp12000 - Rp22000", "deskripsi": "Soto Ayam. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Soto+Ayam+Lamongan", "lat": -7.43189, "lng": 109.24806, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Gerilya", "verified": true, "reviews": [] },
    { "id": 222, "nama": "Pecel Lele Lela", "kategori": "Makanan Berat", "alamat": "Jl. Overste Isdiman", "jam": "15:00 - 23:00", "harga": "Rp15000 - Rp28000", "deskripsi": "Pecel Lele. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Pecel+Lele+Lela", "lat": -7.44069, "lng": 109.24463, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Overste Isdiman", "verified": true, "reviews": [] },
    { "id": 223, "nama": "Es Kelapa Muda Pak Naryo", "kategori": "Minuman", "alamat": "Pasar Wage", "jam": "08:00 - 16:00", "harga": "Rp8000 - Rp15000", "deskripsi": "Es Kelapa Muda. Gerobak Tetap.", "foto": "https://via.placeholder.com/400x200?text=Es+Kelapa+Muda+Pak+Naryo", "lat": -7.42844, "lng": 109.24531, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Pasar Wage", "verified": true, "reviews": [] },
    { "id": 224, "nama": "Nasi Goreng Pak Gemblung", "kategori": "Makanan Berat", "alamat": "Jl. Jenderal Sudirman", "jam": "18:00 - 02:00", "harga": "Rp12000 - Rp20000", "deskripsi": "Nasi Goreng. Gerobak Tetap.", "foto": "https://via.placeholder.com/400x200?text=Nasi+Goreng+Pak+Gemblung", "lat": -7.43278, "lng": 109.24738, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Jenderal Sudirman", "verified": true, "reviews": [] },
    { "id": 225, "nama": "Warung Tegal Bu Slamet", "kategori": "Makanan Berat", "alamat": "Purwokerto Kulon", "jam": "06:00 - 14:00", "harga": "Rp10000 - Rp25000", "deskripsi": "Aneka Lauk Warteg. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Warung+Tegal+Bu+Slamet", "lat": -7.42951, "lng": 109.22904, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Purwokerto Kulon", "verified": true, "reviews": [] },
    { "id": 226, "nama": "Mie Koclok Cirebon", "kategori": "Makanan Berat", "alamat": "Jl. Gerilya", "jam": "08:00 - 16:00", "harga": "Rp15000 - Rp25000", "deskripsi": "Mie Koclok. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Mie+Koclok+Cirebon", "lat": -7.4246, "lng": 109.24268, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Gerilya", "verified": true, "reviews": [] },
    { "id": 227, "nama": "Pisang Goreng Ponorogo", "kategori": "Makanan Berat", "alamat": "Terminal Purwokerto", "jam": "14:00 - 21:00", "harga": "Rp5000 - Rp12000", "deskripsi": "Pisang Goreng. Gerobak Tetap.", "foto": "https://via.placeholder.com/400x200?text=Pisang+Goreng+Ponorogo", "lat": -7.41237, "lng": 109.2226, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Terminal Purwokerto", "verified": true, "reviews": [] },
    { "id": 228, "nama": "Kopi Tuku Purwokerto", "kategori": "Minuman", "alamat": "Jl. Ahmad Yani", "jam": "08:00 - 21:00", "harga": "Rp15000 - Rp40000", "deskripsi": "Kopi Susu Kekinian. Kafe Tetap.", "foto": "https://via.placeholder.com/400x200?text=Kopi+Tuku+Purwokerto", "lat": -7.40367, "lng": 109.24452, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Ahmad Yani", "verified": true, "reviews": [] },
    { "id": 229, "nama": "Geprek Bensu", "kategori": "Makanan Berat", "alamat": "Jl. HR Bunyamin", "jam": "10:00 - 22:00", "harga": "Rp18000 - Rp35000", "deskripsi": "Ayam Geprek. Resto Tetap.", "foto": "https://via.placeholder.com/400x200?text=Geprek+Bensu", "lat": -7.42735, "lng": 109.23298, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. HR Bunyamin", "verified": true, "reviews": [] },
    { "id": 230, "nama": "Rawon Nguling Bu Pur", "kategori": "Makanan Berat", "alamat": "Bancarkembar", "jam": "07:00 - 14:00", "harga": "Rp18000 - Rp30000", "deskripsi": "Rawon Daging. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Rawon+Nguling+Bu+Pur", "lat": -7.40946, "lng": 109.24082, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Bancarkembar", "verified": true, "reviews": [] },
    { "id": 231, "nama": "Martabak Orins", "kategori": "Makanan Berat", "alamat": "Jl. Mayjend Sungkono", "jam": "16:00 - 23:00", "harga": "Rp20000 - Rp50000", "deskripsi": "Martabak Manis Telur. Gerobak Tetap.", "foto": "https://via.placeholder.com/400x200?text=Martabak+Orins", "lat": -7.4195, "lng": 109.23562, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Mayjend Sungkono", "verified": true, "reviews": [] },
    { "id": 232, "nama": "Cendol Dawet Bu Dermi", "kategori": "Minuman", "alamat": "Pasar Pon", "jam": "09:00 - 17:00", "harga": "Rp8000 - Rp12000", "deskripsi": "Cendol Dawet. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Cendol+Dawet+Bu+Dermi", "lat": -7.4263, "lng": 109.25588, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Pasar Pon", "verified": true, "reviews": [] },
    { "id": 233, "nama": "Gado-gado Bu Tini", "kategori": "Makanan Berat", "alamat": "Purwokerto Lor", "jam": "07:00 - 13:00", "harga": "Rp12000 - Rp20000", "deskripsi": "Gado-gado. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Gado-gado+Bu+Tini", "lat": -7.41396, "lng": 109.25702, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Purwokerto Lor", "verified": true, "reviews": [] },
    { "id": 234, "nama": "Bakwan Malang Cak Man", "kategori": "Makanan Berat", "alamat": "Jl. Veteran", "jam": "15:00 - 22:00", "harga": "Rp15000 - Rp25000", "deskripsi": "Bakwan Malang. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Bakwan+Malang+Cak+Man", "lat": -7.42813, "lng": 109.24995, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Veteran", "verified": true, "reviews": [] },
    { "id": 235, "nama": "Juice Buah Segar Pak Wito", "kategori": "Minuman", "alamat": "Jl. Sunan Kalijaga", "jam": "08:00 - 20:00", "harga": "Rp10000 - Rp25000", "deskripsi": "Jus Buah. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Juice+Buah+Segar+Pak+Wito", "lat": -7.4282, "lng": 109.24238, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Sunan Kalijaga", "verified": true, "reviews": [] },
    { "id": 236, "nama": "Nasi Liwet Bu Wongso", "kategori": "Makanan Berat", "alamat": "Berkoh", "jam": "17:00 - 23:00", "harga": "Rp18000 - Rp30000", "deskripsi": "Nasi Liwet. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Nasi+Liwet+Bu+Wongso", "lat": -7.44077, "lng": 109.24926, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Berkoh", "verified": true, "reviews": [] },
    { "id": 237, "nama": "Ketoprak Jakarta", "kategori": "Makanan Berat", "alamat": "Jl. Gatot Subroto", "jam": "08:00 - 15:00", "harga": "Rp10000 - Rp18000", "deskripsi": "Ketoprak. Gerobak Tetap.", "foto": "https://via.placeholder.com/400x200?text=Ketoprak+Jakarta", "lat": -7.40527, "lng": 109.23869, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Gatot Subroto", "verified": true, "reviews": [] },
    { "id": 238, "nama": "Sate Maranggi Purwokerto", "kategori": "Makanan Berat", "alamat": "Jl. Yos Sudarso", "jam": "16:00 - 22:00", "harga": "Rp25000 - Rp45000", "deskripsi": "Sate Maranggi. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Sate+Maranggi+Purwokerto", "lat": -7.4352, "lng": 109.2435, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Yos Sudarso", "verified": true, "reviews": [] },
    { "id": 239, "nama": "Warung Kopi Klotok", "kategori": "Minuman", "alamat": "Sokaraja", "jam": "06:00 - 12:00", "harga": "Rp5000 - Rp15000", "deskripsi": "Kopi Klotok. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Warung+Kopi+Klotok", "lat": -7.41848, "lng": 109.23775, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Sokaraja", "verified": true, "reviews": [] },
    { "id": 240, "nama": "Lumpia Semarang Bu Mul", "kategori": "Makanan Berat", "alamat": "Jl. Ahmad Yani", "jam": "09:00 - 20:00", "harga": "Rp15000 - Rp30000", "deskripsi": "Lumpia Basah. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Lumpia+Semarang+Bu+Mul", "lat": -7.40683, "lng": 109.24045, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Ahmad Yani", "verified": true, "reviews": [] },
    { "id": 241, "nama": "Pempek Palembang Asli", "kategori": "Makanan Berat", "alamat": "Jl. HR Bunyamin", "jam": "10:00 - 21:00", "harga": "Rp12000 - Rp35000", "deskripsi": "Pempek Kapal Selam. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Pempek+Palembang+Asli", "lat": -7.40302, "lng": 109.23961, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. HR Bunyamin", "verified": true, "reviews": [] },
    { "id": 242, "nama": "Klepon Bu Niken", "kategori": "Makanan Berat", "alamat": "Pasar Manis", "jam": "07:00 - 16:00", "harga": "Rp5000 - Rp10000", "deskripsi": "Klepon Kue Basah. Pedagang Keliling.", "foto": "https://via.placeholder.com/400x200?text=Klepon+Bu+Niken", "lat": -7.43737, "lng": 109.22743, "keliling": true, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Pasar Manis", "verified": true, "reviews": [] },
    { "id": 243, "nama": "Es Teler 77", "kategori": "Minuman", "alamat": "Rita Mall", "jam": "10:00 - 22:00", "harga": "Rp15000 - Rp35000", "deskripsi": "Es Teler. Resto Tetap.", "foto": "https://via.placeholder.com/400x200?text=Es+Teler+77", "lat": -7.43606, "lng": 109.23922, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Rita Mall", "verified": true, "reviews": [] },
    { "id": 244, "nama": "Nasi Bakar Cianjur", "kategori": "Makanan Berat", "alamat": "Jl. Gerilya", "jam": "11:00 - 22:00", "harga": "Rp18000 - Rp35000", "deskripsi": "Nasi Bakar Ayam. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Nasi+Bakar+Cianjur", "lat": -7.42463, "lng": 109.22344, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Gerilya", "verified": true, "reviews": [] },
    { "id": 245, "nama": "Depot Es Durian", "kategori": "Minuman", "alamat": "Purwokerto Kidul", "jam": "09:00 - 21:00", "harga": "Rp15000 - Rp40000", "deskripsi": "Es Durian. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Depot+Es+Durian", "lat": -7.4244, "lng": 109.25922, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Purwokerto Kidul", "verified": true, "reviews": [] },
    { "id": 246, "nama": "Ayam Goreng Mbok Berek", "kategori": "Makanan Berat", "alamat": "Jl. Overste Isdiman", "jam": "10:00 - 20:00", "harga": "Rp20000 - Rp35000", "deskripsi": "Ayam Goreng Kampung. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Ayam+Goreng+Mbok+Berek", "lat": -7.42863, "lng": 109.2234, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Overste Isdiman", "verified": true, "reviews": [] },
    { "id": 247, "nama": "Tengkleng Kambing Solo", "kategori": "Makanan Berat", "alamat": "Jl. Mayjend Sungkono", "jam": "08:00 - 16:00", "harga": "Rp25000 - Rp45000", "deskripsi": "Tengkleng Kambing. Warung Tetap.", "foto": "https://via.placeholder.com/400x200?text=Tengkleng+Kambing+Solo", "lat": -7.43247, "lng": 109.24349, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Jl. Mayjend Sungkono", "verified": true, "reviews": [] },
    { "id": 248, "nama": "Serabi Notosuman", "kategori": "Makanan Berat", "alamat": "Alun-alun Purwokerto", "jam": "14:00 - 21:00", "harga": "Rp8000 - Rp15000", "deskripsi": "Serabi Solo. Gerobak Tetap.", "foto": "https://via.placeholder.com/400x200?text=Serabi+Notosuman", "lat": -7.40135, "lng": 109.25312, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Alun-alun Purwokerto", "verified": true, "reviews": [] },
    { "id": 249, "nama": "Susu Jahe Pak Kumis", "kategori": "Minuman", "alamat": "Terminal Purwokerto", "jam": "17:00 - 23:00", "harga": "Rp7000 - Rp12000", "deskripsi": "Susu Jahe Hangat. Gerobak Tetap.", "foto": "https://via.placeholder.com/400x200?text=Susu+Jahe+Pak+Kumis", "lat": -7.41054, "lng": 109.25758, "keliling": false, "halal": "halal", "kontak": "-", "parkir": "Tersedia", "rute": "Terminal Purwokerto", "verified": true, "reviews": [] },
];

const initialBeritaData = [
    {
        id: 1,
        judul: "Festival Kuliner Purwokerto 2025",
        konten: "Festival kuliner terbesar di Purwokerto akan diselenggarakan pada tanggal 20-25 Desember 2025 di Alun-alun Purwokerto.",
        gambar: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
        tanggal: "2025-12-15",
        kategori: "Event",
        author: "Admin"
    },
    {
        id: 2,
        judul: "Tips Mencari Kuliner Halal",
        konten: "Pastikan tempat makan memiliki sertifikat halal MUI atau minimal sudah dikenal masyarakat sebagai tempat makan halal.",
        gambar: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
        tanggal: "2025-12-12",
        kategori: "Tips",
        author: "Admin"
    }
];

const initialPromoData = [
    {
        id: 1,
        judul: "Diskon 20% Soto Sokaraja",
        deskripsi: "Dapatkan diskon 20% untuk pembelian minimal Rp50.000",
        kulinerId: 1,
        berlakuSampai: "2025-12-31",
        kode: "SOTO20",
        aktif: true
    }
];

// ============================================
// STATE MANAGEMENT
// ============================================
let state = {
    currentUser: null,
    isAdmin: false, // Admin Simulation
    currentPage: 'home',
    kulinerData: [],
    favorites: new Set(),
    map: null,
    detailMap: null,
    detailMarker: null,
    submissionsFilter: 'pending',
    submissionMap: null,
    submissionMarker: null,
    markers: [],
    weather: null
};

// ============================================
// ADMIN & BUSINESS LOGIC
// ============================================
const AdminManager = {
    toggle() {
        state.isAdmin = !state.isAdmin;
        DB.set('adminMode', state.isAdmin);
        showToast(state.isAdmin ? "Mode Admin: ON 🔧" : "Mode Admin: OFF");
        location.reload();
    },
    deleteKuliner(id) {
        if (!confirm("Hapus data kuliner ini? (Admin Only)")) return;
        state.kulinerData = state.kulinerData.filter(k => k.id !== id);
        DB.set('kuliner', state.kulinerData);
        showToast("Data berhasil dihapus");
        renderKulinerList();
        renderMarkers();
        closeModal();
    },
    approveSubmission(id, isApprove) {
        showToast(isApprove ? "Pengajuan disetujui 🟢" : "Pengajuan ditolak 🔴");
    },
    manageNews() {
        if (!state.isAdmin) return;
        const title = prompt("Judul Berita Baru:");
        if (title) {
            const berita = DB.get('berita') || [];
            berita.unshift({
                id: Date.now(),
                judul: title,
                konten: "Konten berita baru... (Edit di database untuk detail)",
                tanggal: new Date().toISOString().split('T')[0],
                kategori: "Info",
                author: "Admin"
            });
            DB.set('berita', berita);
            showToast("Berita berhasil ditambahkan");
            renderNews();
        }
    }
};

window.toggleAdmin = AdminManager.toggle;
window.AdminManager = AdminManager;

function claimBusiness(id) {
    const item = state.kulinerData.find(k => k.id === id);
    if (item.claimStatus === 'pending') {
        showToast("Bisnis ini sedang menunggu verifikasi klaim. ⏳");
        return;
    }
    if (item.claimStatus === 'verified') {
        showToast("Bisnis ini sudah terverifikasi pemiliknya. ✅");
        return;
    }

    if (confirm(`Apakah Anda pemilik "${item.nama}"?\nKlaim bisnis ini untuk mengelola informasi.`)) {
        item.claimStatus = 'pending';
        DB.set('kuliner', state.kulinerData);
        showToast("Klaim berhasil dikirim! Tim kami akan memverifikasi. ✅");
        showDetail(id); // Refresh modal
    }
}
window.claimBusiness = claimBusiness;

function setSessionCookie(token) {
    document.cookie = `session_token=${token}; path=/; SameSite=Strict; Secure;`;
    console.log("Secure cookie set:", document.cookie);
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    DB.init();
    loadState();
    initApp();
});

function loadState() {
    state.kulinerData = DB.get('kuliner', initialKulinerData);
    state.favorites = new Set(DB.get('favorites', []));
    state.currentUser = DB.get('currentUser', null);

    // Admin mode can come from user role or persisted toggle
    const adminMode = DB.get('adminMode', false);
    const role = String(state.currentUser?.role ?? '').toLowerCase().trim();
    const email = String(state.currentUser?.email ?? '').toLowerCase().trim();
    const isRoleAdmin = !!(
        state.currentUser && (
            role === 'admin' ||
            email === 'admin@lapormangan.id' ||
            state.currentUser?.isAdmin === true
        )
    );
    state.isAdmin = !!(adminMode || isRoleAdmin);
}

// Some parts of the UI call updateAuthUI(); older versions of this repo had it in another file.
// If it's missing, initApp() will throw and admin-only UI (like Review Submission) won't render.
function updateAuthUI() {
    try {
        const raw = localStorage.getItem('lm_currentUser');
        if (!raw) return;
        const user = JSON.parse(raw);

        // Keep state in sync (defensive)
        state.currentUser = user;
        const role = String(user?.role ?? '').toLowerCase().trim();
        const email = String(user?.email ?? '').toLowerCase().trim();
        const isRoleAdmin = role === 'admin' || email === 'admin@lapormangan.id' || user?.isAdmin === true;
        if (isRoleAdmin) state.isAdmin = true;

        // Update header/sidebar buttons if present (index.html uses these IDs)
        const loginBtn = document.getElementById('loginHeaderBtn');
        const sidebarAuthBtn = document.getElementById('authBtnSidebar');

        if (loginBtn) {
            const firstName = String(user?.name ?? 'User').split(' ')[0] || 'User';
            loginBtn.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <span>${escapeHtml(firstName)}</span>
            `;
        }

        if (sidebarAuthBtn) {
            sidebarAuthBtn.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <span>${escapeHtml(String(user?.name ?? 'User'))}</span>
            `;
        }
    } catch {
        // never block app init
    }
}

function initApp() {
    initMap();
    renderKulinerList();
    populateFilters();
    fetchWeather();
    setupEventListeners();
    updateAuthUI();
    checkUrlHash();

    // Admin UI hooks
    updateAdminUI();

    // Init Chatbot
    const fab = document.querySelector('.chatbot-fab') || document.querySelector('.chat-fab');
    if (fab) fab.onclick = toggleChat;
}

// ============================================
// MAP (FR-01, FR-02)
// ============================================
function initMap() {
    if (!document.getElementById('map')) return;
    state.map = L.map('map', { zoomControl: false }).setView([-7.4212, 109.2422], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(state.map);
    renderMarkers();
    startLiveTracking(); // Start simulation

    // Re-locate user button
    const locateBtn = document.querySelector('.map-locate-btn');
    if (locateBtn) locateBtn.onclick = sortByDistance;
}

function renderMarkers(data = state.kulinerData) {
    if (!state.map) return;
    state.markers.forEach(m => state.map.removeLayer(m));
    state.markers = [];

    data.forEach((item) => {
        const icon = item.keliling ? '🛵' : '📍';
        const marker = L.marker([item.lat, item.lng], {
            icon: L.divIcon({
                html: `<div class="marker-icon ${item.keliling ? 'keliling' : ''}" style="background:white; padding:5px; border-radius:50%; box-shadow:0 2px 5px rgba(0,0,0,0.3); font-size:20px; transition: all 0.5s ease;">${icon}</div>`,
                className: '',
                iconSize: [32, 32]
            })
        }).addTo(state.map);

        marker.itemData = item; // Store ref
        marker.bindPopup(`<strong>${item.nama}</strong><br>${item.kategori}<br><button onclick="showDetail(${item.id})" class="btn-xs btn-primary" style="margin-top:5px;">Lihat Detail</button>`);
        state.markers.push(marker);
    });
}

// Live Tracking Simulation for "Gerobak Keliling"
function startLiveTracking() {
    setInterval(() => {
        state.markers.forEach(marker => {
            if (marker.itemData && marker.itemData.keliling) {
                // Simulate small random movement
                const oldLat = marker.getLatLng().lat;
                const oldLng = marker.getLatLng().lng;
                const newLat = oldLat + (Math.random() * 0.0002 - 0.0001);
                const newLng = oldLng + (Math.random() * 0.0002 - 0.0001);

                marker.setLatLng([newLat, newLng]);

                // Update internal state slightly to persist if saved (optional)
                marker.itemData.lat = newLat;
                marker.itemData.lng = newLng;
            }
        });
    }, 3000); // Move every 3 seconds
}

function sortByDistance() {
    if (!navigator.geolocation) {
        showToast('Geolocation tidak didukung', 'error');
        return;
    }

    showToast('Mencari lokasi...', 'info');
    navigator.geolocation.getCurrentPosition(pos => {
        const sorted = [...state.kulinerData].sort((a, b) => {
            const distA = getDistance(pos.coords.latitude, pos.coords.longitude, a.lat, a.lng);
            const distB = getDistance(pos.coords.latitude, pos.coords.longitude, b.lat, b.lng);
            return distA - distB;
        });
        renderKulinerList(sorted);
        renderMarkers(sorted);
        state.map.setView([pos.coords.latitude, pos.coords.longitude], 15);

        // Add user marker
        L.marker([pos.coords.latitude, pos.coords.longitude], {
            icon: L.divIcon({ html: '🔵', className: 'user-marker', iconSize: [20, 20] })
        }).addTo(state.map).bindPopup('Lokasi Anda').openPopup();

        showToast('Diurutkan berdasarkan jarak terdekat');
    }, () => {
        showToast('Gagal mengakses lokasi', 'error');
    });
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ============================================
// FILTERS & SORTING
// ============================================
function populateFilters() {
    const categories = ["Soto", "Sate", "Bakso", "Gudeg", "Ayam", "Lontong", "Jajanan Tradisional", "Makanan Berat", "Minuman"];
    const select = document.getElementById('categoryFilter');
    if (select) {
        select.innerHTML = '<option value="">🏷️ Semua Kategori</option>';
        categories.forEach(cat => {
            select.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    }
    renderCategoryButtons(categories);
}

function renderCategoryButtons(categories) {
    const container = document.getElementById('menuCategories');
    if (!container) return;

    container.innerHTML = categories.map(cat => `
        <button class="category-btn" onclick="quickFilter('${cat}')">
            ${getCategoryIcon(cat)} ${cat}
        </button>
    `).join('');
}

function getCategoryIcon(cat) {
    const icons = {
        'Soto': '🍲', 'Sate': '🍢', 'Bakso': '🍜', 'Gudeg': '🍛',
        'Ayam': '🍗', 'Lontong': '🥘', 'Minuman': '🥤',
        'Jajanan Tradisional': '🍡', 'Makanan Berat': '🍽️'
    };
    return icons[cat] || '🍴';
}

function setupEventListeners() {
    // Search Input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            applyFilters();
        });
    }

    // Dropdown Filters
    ['categoryFilter', 'typeFilter', 'halalFilter', 'sortFilter'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', applyFilters);
    });

    // Checkbox Filter
    const openNow = document.getElementById('openNowFilter');
    if (openNow) openNow.addEventListener('change', applyFilters);

    // Detail modal close on backdrop click + ESC
    wireDetailModalClose();

    // Submissions modals close wiring
    wireSimpleModalClose('submissionsModal', closeSubmissionsModal);
    wireSimpleModalClose('submissionDetailModal', closeSubmissionDetail);
}

// ============================================
// UC-19: ADMIN APPROVE/REJECT SUBMISSION
// ============================================
function getAllSubmissions() {
    const list = DB.get('submissions', []);
    return Array.isArray(list) ? list : [];
}

function getPendingCount() {
    return getAllSubmissions().filter(s => (s && s.status === 'pending')).length;
}

function updateAdminUI() {
    const nav = document.getElementById('reviewSubmissionsNav');
    if (nav) nav.style.display = state.isAdmin ? '' : 'none';

    const dd = document.getElementById('reviewSubmissionsDropdown');
    if (dd) dd.style.display = state.isAdmin ? '' : 'none';

    // If the HTML is stale/cached and the dropdown item doesn't exist yet, inject it.
    // This prevents "admin but no Review Submission" issues caused by old cached index.html.
    ensureAdminReviewSubmissionLinks();

    updatePendingBadge();
}

function ensureAdminReviewSubmissionLinks() {
    if (!state.isAdmin) return;

    // --- User dropdown ---
    const dropdown = document.getElementById('userDropdownMenu');
    if (dropdown && !document.getElementById('reviewSubmissionsDropdown')) {
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'dropdown-item';
        link.id = 'reviewSubmissionsDropdown';
        link.onclick = (e) => {
            e.preventDefault();
            openSubmissionsFromDropdown();
        };
        link.innerHTML = `
            <i class="fas fa-clipboard-check"></i>
            <span>Review Submission</span>
            <span class="nav-badge" id="pendingSubmissionsBadgeDropdown" style="display:none;">0</span>
        `;

        // Insert before the divider that precedes Settings (best match for the design in the screenshot)
        const settingsLink = dropdown.querySelector('a[onclick*="openSettings"], a.dropdown-item[onclick*="openSettings"]');
        const insertBefore = settingsLink?.previousElementSibling?.classList?.contains('dropdown-divider')
            ? settingsLink.previousElementSibling
            : settingsLink;

        if (insertBefore) dropdown.insertBefore(link, insertBefore);
        else dropdown.appendChild(link);
    }

    // --- Sidebar (optional safety if cached HTML also missed it) ---
    const sidebarNav = document.querySelector('#sidebar .sidebar-nav');
    if (sidebarNav && !document.getElementById('reviewSubmissionsNav')) {
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'nav-item';
        a.id = 'reviewSubmissionsNav';
        a.onclick = (e) => {
            e.preventDefault();
            openSubmissionsModal();
        };
        a.innerHTML = `
            <i class="fas fa-clipboard-check"></i>
            <span>Review Submission</span>
            <span class="nav-badge" id="pendingSubmissionsBadge" style="display:none;">0</span>
        `;

        // Place it above "Tambah Kuliner" in the sidebar
        const addKuliner = Array.from(sidebarNav.querySelectorAll('a.nav-item')).find(x => (x.textContent || '').includes('Tambah Kuliner'));
        if (addKuliner) sidebarNav.insertBefore(a, addKuliner);
        else sidebarNav.appendChild(a);
    }
}

function updatePendingBadge() {
    const count = getPendingCount();

    const badges = [
        document.getElementById('pendingSubmissionsBadge'),
        document.getElementById('pendingSubmissionsBadgeDropdown')
    ].filter(Boolean);

    badges.forEach((badge) => {
        badge.textContent = String(count);
        badge.style.display = (state.isAdmin && count > 0) ? '' : 'none';
    });
}

function openSubmissionsFromDropdown() {
    const dropdown = document.getElementById('userDropdownMenu');
    if (dropdown) dropdown.classList.remove('show');
    openSubmissionsModal();
}

function setSubmissionFilter(status) {
    state.submissionsFilter = status;
    // update tab UI
    document.querySelectorAll('.submissions-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.status === status);
    });
    renderSubmissionsList();
}

function openSubmissionsModal() {
    if (!state.isAdmin) {
        showToast('Fitur ini khusus admin.', 'warning');
        return;
    }
    const modal = document.getElementById('submissionsModal');
    if (!modal) return;
    modal.classList.add('show');

    // default filter
    if (!state.submissionsFilter) state.submissionsFilter = 'pending';
    setSubmissionFilter(state.submissionsFilter);
}

function closeSubmissionsModal() {
    const modal = document.getElementById('submissionsModal');
    if (modal) modal.classList.remove('show');
}

function renderSubmissionsList() {
    const listEl = document.getElementById('submissionsList');
    const emptyEl = document.getElementById('submissionsEmpty');
    const counterEl = document.getElementById('submissionsCounter');
    if (!listEl || !emptyEl || !counterEl) return;

    const submissions = getAllSubmissions();
    const filtered = submissions.filter(s => (s && (s.status || 'pending') === state.submissionsFilter));
    counterEl.textContent = `${filtered.length} item`;

    if (!filtered.length) {
        listEl.innerHTML = '';
        emptyEl.style.display = '';
        return;
    }

    emptyEl.style.display = 'none';
    listEl.innerHTML = filtered.map(s => {
        const data = s.data || {};
        const foto = (data.fotos && data.fotos[0]) || data.foto || 'https://via.placeholder.com/200x200?text=No+Image';
        const status = String(s.status || 'pending');
        const submittedAt = s.submittedAt ? new Date(s.submittedAt).toLocaleString() : '-';

        return `
            <div class="submission-card">
                <div class="submission-thumb">
                    <img src="${escapeHtml(foto)}" alt="Foto ${escapeHtml(data.nama || 'Kuliner')}" loading="lazy" onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
                </div>
                <div class="submission-main">
                    <div class="submission-title-row">
                        <h4 class="submission-title">${escapeHtml(data.nama || 'Tanpa Nama')}</h4>
                        <span class="submission-status ${escapeHtml(status)}">${escapeHtml(status.toUpperCase())}</span>
                    </div>
                    <div class="submission-meta">
                        <div><b>Kategori:</b> ${escapeHtml(data.kategori || '-')}</div>
                        <div><b>Alamat:</b> ${escapeHtml(data.alamat || '-')}</div>
                        <div><b>Submitter:</b> ${escapeHtml(s.userName || 'User')}</div>
                        <div><b>Tanggal:</b> ${escapeHtml(submittedAt)}</div>
                    </div>
                    <div class="submission-actions">
                        <button class="btn btn-primary btn-sm" onclick="openSubmissionDetail(${Number(s.id)}); return false;">
                            <i class="fas fa-eye"></i> Detail
                        </button>
                        ${status === 'pending' ? `
                            <button class="btn btn-success btn-sm" onclick="approveSubmission(${Number(s.id)}); return false;">
                                <i class="fas fa-check"></i> Approve
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="rejectSubmission(${Number(s.id)}); return false;">
                                <i class="fas fa-times"></i> Reject
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function openSubmissionDetail(submissionId) {
    if (!state.isAdmin) return;
    const submissions = getAllSubmissions();
    const sub = submissions.find(s => Number(s.id) === Number(submissionId));
    if (!sub) {
        showToast('Submission tidak ditemukan.', 'error');
        return;
    }
    const modal = document.getElementById('submissionDetailModal');
    const content = document.getElementById('submissionModalContent');
    if (!modal || !content) return;

    const data = sub.data || {};
    const photos = getItemPhotos(data);
    const halalInfo = getHalalInfo(data.halal);
    const status = String(sub.status || 'pending');
    const submittedAt = sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : '-';

    modal.dataset.submissionId = String(sub.id);

    content.innerHTML = `
        <div class="detail-layout">
            <div class="detail-hero">
                <div class="detail-carousel" aria-label="Foto submission">
                    <div class="detail-carousel-track" id="submissionCarouselTrack">
                        ${photos.map((src, i) => `
                            <div class="detail-carousel-slide">
                                <img src="${escapeHtml(src)}" alt="Foto ${i + 1} ${escapeHtml(data.nama || '')}" loading="lazy" onerror="this.src='https://via.placeholder.com/800x400?text=No+Image'">
                            </div>
                        `).join('')}
                    </div>

                    ${photos.length > 1 ? `
                        <button type="button" class="carousel-btn prev" id="submissionCarouselPrev" aria-label="Foto sebelumnya">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button type="button" class="carousel-btn next" id="submissionCarouselNext" aria-label="Foto berikutnya">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <div class="carousel-dots" id="submissionCarouselDots" aria-label="Indikator foto">
                            ${photos.map((_, i) => `<button type="button" class="carousel-dot" data-index="${i}" aria-label="Foto ${i + 1}"></button>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="detail-body">
                <div class="detail-title-row">
                    <h2 class="detail-title">${escapeHtml(data.nama || 'Tanpa Nama')}</h2>
                    <span class="detail-badge">${escapeHtml(data.kategori || '-')}</span>
                </div>

                <div class="detail-meta">
                    <span class="detail-chip ${escapeHtml(status)}">${escapeHtml(status.toUpperCase())}</span>
                    <span class="detail-chip halal">${escapeHtml(halalInfo.label)}</span>
                    <span class="detail-chip">Submitter: ${escapeHtml(sub.userName || 'User')}</span>
                    <span class="detail-chip">${escapeHtml(submittedAt)}</span>
                </div>

                <div class="detail-info">
                    <div class="detail-info-row"><i class="fas fa-map-marker-alt"></i><span>${escapeHtml(data.alamat || '-')}</span></div>
                    <div class="detail-info-grid">
                        <div class="detail-info-card"><small>Jam Operasional</small><div><b>${escapeHtml(data.jam || '-')}</b></div></div>
                        <div class="detail-info-card"><small>Harga</small><div><b>${escapeHtml(data.harga || '-')}</b></div></div>
                        <div class="detail-info-card"><small>Kontak</small><div><b>${escapeHtml(data.kontak || '-')}</b></div></div>
                        <div class="detail-info-card"><small>Parkir</small><div><b>${escapeHtml(data.parkir || '-')}</b></div></div>
                        <div class="detail-info-card"><small>Tipe</small><div><b>${data.keliling ? 'Keliling' : 'Tetap'}</b></div></div>
                        <div class="detail-info-card"><small>Status Halal</small><div><b>${escapeHtml(halalInfo.text)}</b></div></div>
                    </div>
                </div>

                <div class="detail-mini-map-wrap" aria-label="Peta lokasi">
                    <div id="submissionMiniMap" class="detail-mini-map"></div>
                </div>

                <div class="detail-section">
                    <h3>Deskripsi</h3>
                    <p>${escapeHtml(data.deskripsi || '-')}</p>
                </div>
            </div>

            <div class="detail-footer-actions" role="group" aria-label="Aksi submission">
                <button type="button" class="detail-action" onclick="closeSubmissionDetail(); return false;" aria-label="Tutup">
                    <i class="fas fa-times"></i>
                    <span>Tutup</span>
                </button>
                <button type="button" class="detail-action primary" onclick="openNavigation(${Number(data.lat)}, ${Number(data.lng)}); return false;" aria-label="Navigasi">
                    <i class="fas fa-directions"></i>
                    <span>Navigasi</span>
                </button>
                ${status === 'pending' ? `
                    <button type="button" class="detail-action" onclick="rejectSubmission(${Number(sub.id)}); return false;" aria-label="Reject">
                        <i class="fas fa-times"></i>
                        <span>Reject</span>
                    </button>
                    <button type="button" class="detail-action primary" onclick="approveSubmission(${Number(sub.id)}); return false;" aria-label="Approve">
                        <i class="fas fa-check"></i>
                        <span>Approve</span>
                    </button>
                ` : ''}
            </div>
        </div>
    `;

    modal.classList.add('show');
    initSubmissionCarousel();
    setTimeout(() => initSubmissionMiniMap(data), 50);
}

function closeSubmissionDetail() {
    const modal = document.getElementById('submissionDetailModal');
    if (modal) modal.classList.remove('show');
    if (state.submissionMap) {
        try { state.submissionMap.remove(); } catch { /* ignore */ }
        state.submissionMap = null;
        state.submissionMarker = null;
    }
}

function initSubmissionCarousel() {
    const track = document.getElementById('submissionCarouselTrack');
    if (!track) return;
    const slides = Array.from(track.children || []);
    const total = slides.length;
    let index = 0;

    const dotsWrap = document.getElementById('submissionCarouselDots');
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.carousel-dot')) : [];
    const prevBtn = document.getElementById('submissionCarouselPrev');
    const nextBtn = document.getElementById('submissionCarouselNext');

    const setIndex = (i) => {
        if (!total) return;
        index = ((i % total) + total) % total;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, di) => d.classList.toggle('active', di === index));
    };

    setIndex(0);
    if (prevBtn) prevBtn.onclick = () => setIndex(index - 1);
    if (nextBtn) nextBtn.onclick = () => setIndex(index + 1);
    dots.forEach((d) => { d.onclick = () => setIndex(Number(d.dataset.index || '0')); });
}

function initSubmissionMiniMap(data) {
    if (typeof L === 'undefined') return;
    const el = document.getElementById('submissionMiniMap');
    if (!el) return;

    if (state.submissionMap) {
        try { state.submissionMap.remove(); } catch { /* ignore */ }
        state.submissionMap = null;
        state.submissionMarker = null;
    }

    const lat = Number(data?.lat);
    const lng = Number(data?.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    state.submissionMap = L.map(el, {
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false
    }).setView([lat, lng], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(state.submissionMap);

    state.submissionMarker = L.marker([lat, lng]).addTo(state.submissionMap);
    try { state.submissionMap.invalidateSize(); } catch { /* ignore */ }
}

function approveSubmission(submissionId) {
    if (!state.isAdmin) return;
    const submissions = getAllSubmissions();
    const idx = submissions.findIndex(s => Number(s.id) === Number(submissionId));
    if (idx === -1) {
        showToast('Submission tidak ditemukan.', 'error');
        return;
    }
    const sub = submissions[idx];
    if ((sub.status || 'pending') !== 'pending') {
        showToast('Submission ini sudah diproses.', 'info');
        return;
    }

    const data = sub.data || {};
    const maxId = Math.max(0, ...state.kulinerData.map(k => Number(k.id) || 0));
    const newItem = {
        id: maxId + 1,
        ...data,
        verified: true,
        reviews: Array.isArray(data.reviews) ? data.reviews : []
    };

    state.kulinerData.unshift(newItem);
    DB.set('kuliner', state.kulinerData);

    submissions[idx] = {
        ...sub,
        status: 'approved',
        reviewedAt: new Date().toISOString(),
        reviewedBy: state.currentUser?.id ?? null
    };
    DB.set('submissions', submissions);

    showToast('Submission disetujui! Kuliner baru telah ditambahkan ✅');
    trySendAdminNotification('Submission disetujui', `${newItem.nama} telah ditambahkan.`);

    renderKulinerList();
    renderMarkers();
    updatePendingBadge();
    renderSubmissionsList();
    closeSubmissionDetail();
}

function rejectSubmission(submissionId) {
    if (!state.isAdmin) return;
    const submissions = getAllSubmissions();
    const idx = submissions.findIndex(s => Number(s.id) === Number(submissionId));
    if (idx === -1) {
        showToast('Submission tidak ditemukan.', 'error');
        return;
    }
    const sub = submissions[idx];
    if ((sub.status || 'pending') !== 'pending') {
        showToast('Submission ini sudah diproses.', 'info');
        return;
    }
    const reason = prompt('Alasan reject (opsional):', '') || '';

    submissions[idx] = {
        ...sub,
        status: 'rejected',
        rejectReason: reason.trim(),
        reviewedAt: new Date().toISOString(),
        reviewedBy: state.currentUser?.id ?? null
    };
    DB.set('submissions', submissions);

    showToast('Submission ditolak.');
    updatePendingBadge();
    renderSubmissionsList();
    closeSubmissionDetail();
}

function trySendAdminNotification(title, body) {
    try {
        if (!('Notification' in window)) return;
        if (Notification.permission === 'granted') {
            // eslint-disable-next-line no-new
            new Notification(title, { body });
        }
    } catch {
        // ignore
    }
}

function wireSimpleModalClose(modalId, onClose) {
    const modal = document.getElementById(modalId);
    if (modal && !modal.dataset.backdropWired) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) onClose();
        });
        modal.dataset.backdropWired = 'true';
    }
}

// Expose handlers (inline onclick)
window.openSubmissionsModal = openSubmissionsModal;
window.openSubmissionsFromDropdown = openSubmissionsFromDropdown;
window.closeSubmissionsModal = closeSubmissionsModal;
window.setSubmissionFilter = setSubmissionFilter;
window.openSubmissionDetail = openSubmissionDetail;
window.closeSubmissionDetail = closeSubmissionDetail;
window.approveSubmission = approveSubmission;
window.rejectSubmission = rejectSubmission;

function applyFilters() {
    const search = document.getElementById('searchInput')?.value?.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const type = document.getElementById('typeFilter')?.value || '';
    const halal = document.getElementById('halalFilter')?.value || '';
    const sort = document.getElementById('sortFilter')?.value || '';
    const openNow = document.getElementById('openNowFilter')?.checked || false;

    let filtered = state.kulinerData.filter(k => {
        const matchSearch = k.nama.toLowerCase().includes(search) || k.kategori.toLowerCase().includes(search);
        const matchCategory = !category || k.kategori === category;
        const matchType = !type || (type === 'tetap' ? !k.keliling : k.keliling);
        const matchHalal = !halal || k.halal === halal;
        const matchOpen = !openNow || isOpen(k.jam);
        return matchSearch && matchCategory && matchType && matchHalal && matchOpen;
    });

    // Sorting
    if (sort === 'nama') filtered.sort((a, b) => a.nama.localeCompare(b.nama, 'id'));
    else if (sort === 'rating') filtered.sort((a, b) => getAvgRating(b) - getAvgRating(a));
    else if (sort === 'harga-asc') filtered.sort((a, b) => parsePrice(a.harga) - parsePrice(b.harga));
    else if (sort === 'harga-desc') filtered.sort((a, b) => parsePrice(b.harga) - parsePrice(a.harga));

    renderKulinerList(filtered);
    renderMarkers(filtered);

    document.getElementById('resultCount').textContent = `${filtered.length} hasil`;
}

function isOpen(jam) {
    if (!jam) return false;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [start, end] = jam.split(' - ').map(t => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + (m || 0);
    });
    return currentMinutes >= start && currentMinutes <= end;
}

function parsePrice(harga) {
    const match = harga.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
}

function getAvgRating(item) {
    if (!item.reviews || item.reviews.length === 0) return 0;
    return item.reviews.reduce((sum, r) => sum + r.rating, 0) / item.reviews.length;
}

function filterOpenNow() {
    const chk = document.getElementById('openNowFilter');
    if (chk) {
        chk.checked = !chk.checked;
        applyFilters();
    }
}

function showRandom() {
    const random = state.kulinerData[Math.floor(Math.random() * state.kulinerData.length)];
    if (random) showDetail(random.id);
}

// ============================================
// KULINER LIST & DETAIL
// ============================================
function renderKulinerList(data = state.kulinerData) {
    const list = document.getElementById('kulinerList');
    if (!list) return;

    if (data.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>Tidak ada hasil ditemukan</p></div>';
        const countEl = document.getElementById('resultCount');
        if (countEl) countEl.innerText = '0 hasil';
        return;
    }

    const countEl = document.getElementById('resultCount');
    if (countEl) countEl.innerText = `${data.length} hasil`;

    list.innerHTML = data.map(item => `
        <div class="kuliner-card" onclick="showDetail(${item.id})" style="cursor:pointer; margin-bottom:15px; background:white; border-radius:10px; overflow:hidden; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
            <div style="height:120px; overflow:hidden;">
                <img src="${item.foto}" alt="${item.nama}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://via.placeholder.com/300x150?text=No+Image'">
            </div>
            <div class="card-body" style="padding:12px;">
                <h3 style="margin:0 0 5px 0; font-size:16px;">${item.nama}</h3>
                <p style="margin:0; color:#666; font-size:12px;">${item.kategori} • ${item.harga}</p>
                <div style="margin-top:8px; display:flex; justify-content:space-between; align-items:center;">
                   <span style="font-size:12px; color:${isOpen(item.jam) ? 'green' : 'red'}">${isOpen(item.jam) ? '● Buka' : '○ Tutup'}</span>
                   <span style="color:#FF6B35; font-size:12px;">★ ${getAvgRating(item).toFixed(1)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function showDetail(id) {
    const item = state.kulinerData.find(k => k.id === id);
    if (!item) return;

    // Normalize reviews so rendering & submit logic are safe
    if (!Array.isArray(item.reviews)) item.reviews = [];

    const isFav = state.favorites.has(id);
    const modal = document.getElementById('detailModal');
    const detailContent = document.getElementById('modalContent');
    if (!modal || !detailContent) return;
    const adminControls = state.isAdmin ?
        `<div style="background:#ffebee; padding:10px; margin-top:10px; border-radius:8px; border:1px solid red;">
            <b>🔧 Admin Zone</b><br>
            <button onclick="showSubmitForm(${item.id}); closeModal();" class="btn-xs" style="background:#ffc107; color:black; margin-top:5px; margin-right:5px;">Edit Data</button>
            <button onclick="AdminManager.deleteKuliner(${item.id})" class="btn-xs" style="background:red; color:white; margin-top:5px;">Hapus Data</button>
         </div>` : '';

    const reviews = item.reviews;
    const avgRating = getAvgRating(item);
    const openNow = isOpen(item.jam);
    const halalInfo = getHalalInfo(item.halal);
    const photos = getItemPhotos(item);

    modal.dataset.kulinerId = String(id);

    detailContent.innerHTML = `
        <div class="detail-layout">
            <div class="detail-hero">
                <div class="detail-carousel" aria-label="Foto kuliner">
                    <div class="detail-carousel-track" id="detailCarouselTrack">
                        ${photos.map((src, i) => `
                            <div class="detail-carousel-slide">
                                <img src="${escapeHtml(src)}" alt="Foto ${i + 1} ${escapeHtml(item.nama)}" loading="lazy" onerror="this.src='https://via.placeholder.com/800x400?text=No+Image'">
                            </div>
                        `).join('')}
                    </div>

                    ${photos.length > 1 ? `
                        <button type="button" class="carousel-btn prev" id="detailCarouselPrev" aria-label="Foto sebelumnya">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button type="button" class="carousel-btn next" id="detailCarouselNext" aria-label="Foto berikutnya">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <div class="carousel-dots" id="detailCarouselDots" aria-label="Indikator foto">
                            ${photos.map((_, i) => `<button type="button" class="carousel-dot" data-index="${i}" aria-label="Foto ${i + 1}"></button>`).join('')}
                        </div>
                    ` : ''}

                    <button type="button" class="detail-fav-btn" id="detailFavBtn" aria-label="Favorit" aria-pressed="${isFav ? 'true' : 'false'}" onclick="toggleFavorite(${item.id}); return false;">
                        <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>

            <div class="detail-body">
                <div class="detail-title-row">
                    <h2 class="detail-title">${escapeHtml(item.nama)}</h2>
                    <span class="detail-badge">${escapeHtml(item.kategori || '-')}</span>
                </div>

                <div class="detail-meta">
                    <div class="detail-rating" title="Rating">
                        <span class="stars">${renderStars(avgRating)}</span>
                        <span class="rating-num">${Number.isFinite(avgRating) ? avgRating.toFixed(1) : '0.0'}</span>
                    </div>
                    <span class="detail-chip ${openNow ? 'open' : 'closed'}">${openNow ? 'Buka' : 'Tutup'}</span>
                    <span class="detail-chip halal">${escapeHtml(halalInfo.label)}</span>
                </div>

                <div class="detail-info">
                    <div class="detail-info-row"><i class="fas fa-map-marker-alt"></i><span>${escapeHtml(item.alamat || '-')}</span></div>
                    <div class="detail-info-grid">
                        <div class="detail-info-card"><small>Jam Operasional</small><div><b>${escapeHtml(item.jam || '-')}</b></div></div>
                        <div class="detail-info-card"><small>Harga</small><div><b>${escapeHtml(item.harga || '-')}</b></div></div>
                        <div class="detail-info-card"><small>Kontak</small><div><b>${escapeHtml(item.kontak || '-')}</b></div></div>
                        <div class="detail-info-card"><small>Parkir</small><div><b>${escapeHtml(item.parkir || '-')}</b></div></div>
                        <div class="detail-info-card"><small>Tipe</small><div><b>${item.keliling ? 'Keliling' : 'Tetap'}</b></div></div>
                        <div class="detail-info-card"><small>Status Halal</small><div><b>${escapeHtml(halalInfo.text)}</b></div></div>
                    </div>
                </div>

                <div class="detail-mini-map-wrap" aria-label="Peta lokasi">
                    <div id="detailMiniMap" class="detail-mini-map"></div>
                </div>

                <div class="detail-section">
                    <h3>Deskripsi</h3>
                    <p>${escapeHtml(item.deskripsi || '-')}</p>
                </div>

                <div class="detail-section">
                    <div class="detail-section-header">
                        <h3>Daftar Menu</h3>
                        <button onclick="claimBusiness(${item.id}); return false;" class="btn btn-secondary btn-sm ${item.claimStatus ? 'is-disabled' : ''}">
                            <i class="fas fa-store-alt"></i>
                            ${item.claimStatus === 'pending' ? 'Menunggu Verifikasi' : (item.claimStatus === 'verified' ? 'Milik Anda' : 'Klaim Bisnis')}
                        </button>
                    </div>
                    <div class="detail-menu-grid">
                        ${item.menu && item.menu.length > 0 ? item.menu.map(m => `
                            <div class="detail-menu-item">
                                <span class="detail-menu-name">${escapeHtml(m.name || '')}</span>
                                <span class="detail-menu-price">${escapeHtml(m.price || '')}</span>
                            </div>
                        `).join('') : '<div class="detail-empty">Informasi menu belum tersedia.</div>'}
                    </div>
                </div>

                <div class="detail-section" id="detailReviewSection">
                    <div class="detail-section-header">
                        <h3>Ulasan (${reviews.length})</h3>
                        <button onclick="toggleReviewForm(); return false;" class="btn btn-primary btn-sm">
                            <i class="fas fa-star"></i> Tulis Review
                        </button>
                    </div>

                    <div id="reviewForm" class="detail-review-form" style="display:none;">
                        <h4>Bagikan Pengalamanmu</h4>
                        <select id="reviewRating" class="detail-review-input">
                            <option value="5">⭐⭐⭐⭐⭐ (Sangat Enak)</option>
                            <option value="4">⭐⭐⭐⭐ (Enak)</option>
                            <option value="3">⭐⭐⭐ (Biasa Aja)</option>
                            <option value="2">⭐⭐ (Kurang)</option>
                            <option value="1">⭐ (Sangat Kurang)</option>
                        </select>
                        <textarea id="reviewText" class="detail-review-input" placeholder="Tulis ulasanmu di sini..."></textarea>
                        <button onclick="submitReview(${item.id}); return false;" class="btn btn-primary" style="width:100%;">
                            Kirim Ulasan
                        </button>
                    </div>

                    <div class="detail-review-list">
                        ${reviews.length > 0 ? reviews.map(r => `
                            <div class="detail-review-item">
                                <div class="detail-review-head">
                                    <b>${escapeHtml(r.name || 'Pengunjung')}</b>
                                    <span class="detail-review-stars">${'⭐'.repeat(Math.min(5, Math.max(1, Number(r.rating) || 1)))}</span>
                                </div>
                                <p>${escapeHtml(r.comment || '')}</p>
                                <small>${escapeHtml(r.date || '')}</small>
                            </div>
                        `).join('') : '<div class="detail-empty">Belum ada ulasan. Jadilah yang pertama!</div>'}
                    </div>
                </div>

                ${adminControls}
            </div>

            <div class="detail-footer-actions" role="group" aria-label="Aksi">
                <button type="button" class="detail-action" id="detailFavFooterBtn" onclick="toggleFavorite(${item.id}); return false;" aria-label="Favorit" aria-pressed="${isFav ? 'true' : 'false'}">
                    <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                    <span>Favorit</span>
                </button>
                <button type="button" class="detail-action" onclick="openDetailReview(); return false;" aria-label="Review">
                    <i class="fas fa-star"></i>
                    <span>Review</span>
                </button>
                <button type="button" class="detail-action primary" onclick="openNavigation(${Number(item.lat)}, ${Number(item.lng)}); return false;" aria-label="Navigasi">
                    <i class="fas fa-directions"></i>
                    <span>Navigasi</span>
                </button>
                <button type="button" class="detail-action" onclick="closeDetail(); return false;" aria-label="Tutup">
                    <i class="fas fa-times"></i>
                    <span>Tutup</span>
                </button>
            </div>
        </div>
    `;

    modal.classList.add('show');

    // Init carousel & mini map after modal is visible
    initDetailCarousel();
    setTimeout(() => initDetailMiniMap(item), 50);
}

// ============================================
// REVIEWS (Ulasan)
// ============================================
function toggleReviewForm() {
    const form = document.getElementById('reviewForm');
    if (!form) return;

    const isHidden = form.style.display === 'none' || form.style.display === '';
    form.style.display = isHidden ? 'block' : 'none';

    // focus textarea when opened
    if (isHidden) {
        const textarea = document.getElementById('reviewText');
        if (textarea) textarea.focus();
    }
}

function submitReview(kulinerId) {
    const item = state.kulinerData.find(k => k.id === kulinerId);
    if (!item) return;
    if (!Array.isArray(item.reviews)) item.reviews = [];

    const ratingEl = document.getElementById('reviewRating');
    const textEl = document.getElementById('reviewText');
    const rating = ratingEl ? parseInt(ratingEl.value, 10) : 5;
    const comment = textEl ? textEl.value.trim() : '';

    if (!comment) {
        showToast('Komentar tidak boleh kosong', 'error');
        return;
    }

    // Use logged-in user if available, otherwise ask for a name
    let userName = (state.currentUser && state.currentUser.name) ? state.currentUser.name : '';
    let userId = (state.currentUser && state.currentUser.id) ? state.currentUser.id : null;

    if (!userName) {
        userName = prompt('Nama kamu untuk ulasan ini:', 'Pengunjung') || 'Pengunjung';
        userName = userName.trim() || 'Pengunjung';
    }

    item.reviews.unshift({
        userId,
        name: userName,
        rating: Number.isFinite(rating) ? Math.min(5, Math.max(1, rating)) : 5,
        comment,
        date: new Date().toISOString().split('T')[0]
    });

    DB.set('kuliner', state.kulinerData);
    showToast('Ulasan berhasil dikirim ✅');

    // Re-render modal so count/list updates, and hide the form again
    showDetail(kulinerId);
    const form = document.getElementById('reviewForm');
    if (form) form.style.display = 'none';
}

// Expose for inline onclick handlers
window.toggleReviewForm = toggleReviewForm;
window.submitReview = submitReview;

function closeModal() {
    const modal = document.getElementById('detailModal');
    if (modal) modal.classList.remove('show');

    // Clean up mini map to avoid memory leaks
    if (state.detailMap) {
        try { state.detailMap.remove(); } catch { /* ignore */ }
        state.detailMap = null;
        state.detailMarker = null;
    }
}

// ============================================
// DETAIL MODAL (UC-02 Enhancements)
// ============================================
function getItemPhotos(item) {
    const out = [];
    const add = (u) => {
        const s = String(u || '').trim();
        if (!s) return;
        if (!out.includes(s)) out.push(s);
    };
    if (item && Array.isArray(item.fotos)) item.fotos.forEach(add);
    if (item && item.foto) add(item.foto);
    if (!out.length) out.push('https://via.placeholder.com/800x400?text=No+Image');
    return out;
}

function renderStars(avg) {
    const v = Number.isFinite(avg) ? avg : 0;
    const full = Math.round(v);
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<i class="${i <= full ? 'fas' : 'far'} fa-star"></i>`;
    }
    return html;
}

function getHalalInfo(value) {
    const v = String(value || 'unknown');
    if (v === 'halal') return { label: 'Halal', text: 'Halal MUI' };
    if (v === 'halal-self') return { label: 'Halal', text: 'Halal (Self-Declared)' };
    return { label: 'Halal?', text: 'Belum Diketahui' };
}

function initDetailCarousel() {
    const track = document.getElementById('detailCarouselTrack');
    if (!track) return;

    const slides = Array.from(track.children || []);
    const total = slides.length;
    let index = 0;

    const dotsWrap = document.getElementById('detailCarouselDots');
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.carousel-dot')) : [];
    const prevBtn = document.getElementById('detailCarouselPrev');
    const nextBtn = document.getElementById('detailCarouselNext');

    const setIndex = (i) => {
        if (!total) return;
        index = ((i % total) + total) % total;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, di) => d.classList.toggle('active', di === index));
    };

    setIndex(0);

    if (prevBtn) prevBtn.onclick = () => setIndex(index - 1);
    if (nextBtn) nextBtn.onclick = () => setIndex(index + 1);
    dots.forEach((d) => {
        d.onclick = () => setIndex(Number(d.dataset.index || '0'));
    });

    // Swipe support
    let startX = null;
    let startY = null;
    track.onpointerdown = (e) => {
        startX = e.clientX;
        startY = e.clientY;
    };
    track.onpointerup = (e) => {
        if (startX == null || startY == null) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        startX = null;
        startY = null;
        // Ignore vertical scroll intent
        if (Math.abs(dy) > Math.abs(dx)) return;
        if (Math.abs(dx) < 30) return;
        if (dx < 0) setIndex(index + 1);
        else setIndex(index - 1);
    };
}

function initDetailMiniMap(item) {
    if (typeof L === 'undefined') return;
    const el = document.getElementById('detailMiniMap');
    if (!el) return;

    // Destroy previous instance
    if (state.detailMap) {
        try { state.detailMap.remove(); } catch { /* ignore */ }
        state.detailMap = null;
        state.detailMarker = null;
    }

    const lat = Number(item?.lat);
    const lng = Number(item?.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    state.detailMap = L.map(el, {
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false
    }).setView([lat, lng], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(state.detailMap);

    state.detailMarker = L.marker([lat, lng]).addTo(state.detailMap);
    try { state.detailMap.invalidateSize(); } catch { /* ignore */ }
}

function openNavigation(lat, lng) {
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
}

function openDetailReview() {
    // ensure review form visible
    const form = document.getElementById('reviewForm');
    if (form && (form.style.display === 'none' || form.style.display === '')) {
        toggleReviewForm();
    }
    const section = document.getElementById('detailReviewSection');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleFavorite(id) {
    const numId = Number(id);
    if (!Number.isFinite(numId)) return;

    const willFav = !state.favorites.has(numId);
    if (willFav) state.favorites.add(numId);
    else state.favorites.delete(numId);

    DB.set('favorites', Array.from(state.favorites));
    updateFavoriteUI(numId);
    showToast(willFav ? 'Ditambahkan ke favorit' : 'Dihapus dari favorit');
}

function updateFavoriteUI(id) {
    const isFav = state.favorites.has(id);
    const setBtn = (btn) => {
        if (!btn) return;
        btn.setAttribute('aria-pressed', isFav ? 'true' : 'false');
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = `${isFav ? 'fas' : 'far'} fa-heart`;
        }
    };
    setBtn(document.getElementById('detailFavBtn'));
    setBtn(document.getElementById('detailFavFooterBtn'));
}

function wireDetailModalClose() {
    const modal = document.getElementById('detailModal');
    if (modal && !modal.dataset.backdropWired) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        modal.dataset.backdropWired = 'true';
    }

    if (!window.__lm_detailEscWired) {
        window.__lm_detailEscWired = true;
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            const m = document.getElementById('detailModal');
            if (m && m.classList.contains('show')) closeModal();
        });
    }
}

// Expose new handlers for inline onclick
window.toggleFavorite = toggleFavorite;
window.openNavigation = openNavigation;
window.openDetailReview = openDetailReview;

// ============================================
// CHATBOT AI (MakanBot)
// ============================================
function toggleChat() {
    const panel = document.getElementById('chatbot'); // Fixed ID from chatPanel to chatbot
    if (!panel) return;
    panel.classList.toggle('active');
    // Ensure display logic in CSS handles .active
    if (panel.style.display === 'flex') {
        panel.style.display = 'none';
        panel.classList.remove('active');
    } else {
        panel.style.display = 'flex';
        panel.classList.add('active');
    }
}

function sendChat() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const msg = String(input.value || '').trim();
    if (!msg) return;

    const messages = document.getElementById('chatMessages');
    if (!messages) return;
    messages.innerHTML += `<div class="chat-msg user" style="align-self:flex-end; background:#dcf8c6; padding:8px 12px; border-radius:15px; margin:5px 0; max-width:80%;">${msg}</div>`;
    input.value = '';

    // Typing simulation
    const id = Date.now();
    messages.innerHTML += `<div id="typing-${id}" class="chat-msg bot" style="align-self:flex-start; background:white; padding:8px 12px; border-radius:15px; margin:5px 0; border:1px solid #eee;">...</div>`;
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
        document.getElementById(`typing-${id}`).remove();
        const reply = MakanBotAI.generateResponse(msg);
        messages.innerHTML += `<div class="chat-msg bot" style="align-self:flex-start; background:white; padding:8px 12px; border-radius:15px; margin:5px 0; border:1px solid #eee;">${reply.replace(/\n/g, '<br>')}</div>`;
        messages.scrollTop = messages.scrollHeight;
    }, 800);
}

function handleChatKey(e) {
    if (!e) return;
    if (e.key === 'Enter') {
        try { e.preventDefault(); } catch { /* ignore */ }
        sendChat();
    }
}

// Compatibility aliases for inline handlers in index.html
// (index.html uses sendMessage(), handleChatInput(event), sendQuickMessage(text))
window.toggleChat = toggleChat;
window.sendMessage = sendChat;
window.handleChatInput = handleChatKey;
window.sendQuickMessage = function sendQuickMessage(text) {
    const input = document.getElementById('chatInput');
    if (input) {
        input.value = String(text || '');
        try { input.focus(); } catch { /* ignore */ }
    }
    sendChat();
};

const MakanBotAI = {
    intents: {
        greeting: ['halo', 'hai', 'hi', 'pagi', 'siang'],
        askFood: ['makan', 'kuliner', 'lapar', 'cari makan'],
        askCheap: ['murah', 'hemat', 'budget', 'terjangkau'],
        askOpen: ['buka', 'open', 'sekarang'],
        askLegendary: ['legendaris', 'legend', 'terkenal', 'hits'],
        askTakeaway: ['take away', 'bungkus', 'bawa pulang', 'dibungkus'],
        askSouvenir: ['oleh-oleh', 'buah tangan', 'khas'],
        askWeather: ['hujan', 'panas', 'cuaca'],
        askHelp: ['help', 'bantuan', 'bisa apa']
    },

    generateResponse(msg) {
        const lower = msg.toLowerCase();

        // Help
        if (this.match(lower, 'askHelp')) return "Aku bisa bantu cari kuliner:\n- 'Yang murah apa?'\n- 'Rekomendasi soto legendaris'\n- 'Oleh-oleh khas Purwokerto'\n- 'Makanan pas hujan'";

        // Greeting
        if (this.match(lower, 'greeting')) return "Halo! 👋 MakanBot di sini. Lagi cari kuliner apa?";

        // Legendary (Use Case 6)
        if (this.match(lower, 'askLegendary') || lower.includes('legendaris')) {
            const legends = state.kulinerData.filter(k => k.nama.includes('Soto') || k.nama.includes('Bebek') || k.nama.includes('President'));
            const pick = this.pick(legends);
            return `Purwokerto punya banyak kuliner legendaris! Salah satunya **${pick.nama}**. Wajib coba! 🌟`;
        }

        // Take Away (Use Case 8)
        if (this.match(lower, 'askTakeaway')) {
            return "Buat dibawa pulang, **Sate Bebek Tambak** atau **Ayam Bakar Pak Tono** paling pas! Praktis dan tetap enak sampai rumah. 🏠";
        }

        // Souvenir (Use Case 9)
        if (this.match(lower, 'askSouvenir')) {
            return "Oleh-oleh khas Purwokerto paling top ya **Tempe Mendoan**! Bisa beli mentah atau matang di Pasar Sokaraja (Mendoan Bu Parti). 🎁";
        }

        // Weather (Use Case 2)
        if (this.match(lower, 'askWeather') || lower.includes('hujan')) {
            if (lower.includes('hujan')) return "Wah lagi hujan ya? 🌧️ Enaknya makan yang anget-anget kayak **Soto Sokaraja** atau **Bakso President**! 🍜";
            return "Cek ikon cuaca di pojok kanan atas ya! Aku bisa kasih rekomendasi sesuai cuaca. 😉";
        }

        // Cheap (Use Case 5)
        if (this.match(lower, 'askCheap')) {
            const cheap = state.kulinerData.filter(k => parsePrice(k.harga) <= 15000);
            const pick = this.pick(cheap);
            return `Mau yang hemat? Coba **${pick.nama}** (${pick.harga}). Dijamin kenyang tapi dompet aman! 💸`;
        }

        // Default Logic
        if (lower.includes('soto')) return this.recommend('Soto');
        if (lower.includes('sate')) return this.recommend('Sate');
        if (lower.includes('makan')) return "Bingung mau makan apa? Coba fitur 'Acak' di menu filter, atau aku pilihkan **Gudeg Mbah Siti**? 😋";

        return "Maaf, aku kurang ngerti. Coba tanya 'kuliner legendaris' atau 'makan murah'. 😊";
    },

    match(text, intent) {
        return this.intents[intent].some(keyword => text.includes(keyword));
    },

    pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)] || arr[0];
    },

    recommend(cat) {
        const items = state.kulinerData.filter(k => k.kategori.includes(cat));
        if (!items.length) return `Belum ada data ${cat} nih.`;
        return `Rekomendasi ${cat}: **${items[0].nama}** di ${items[0].alamat}.`;
    }
};

// ============================================
// WEATHER & UTILS
// ============================================
async function fetchWeather() {
    try {
        const res = await fetch('https://wttr.in/Purwokerto?format=j1');
        const data = await res.json();
        const temp = data.current_condition[0].temp_C;
        const code = data.current_condition[0].weatherCode; // Wttr.in code

        state.weather = { temp, code };
        updateWeatherUI();
    } catch (e) {
        console.warn('Weather fetch failed');
        state.weather = { temp: 28, code: '113' }; // Fallback
        updateWeatherUI();
    }
}

function updateWeatherUI() {
    // Target specific elements instead of replacing the entire widget
    const tempEl = document.getElementById('weatherTemp');
    const iconEl = document.getElementById('weatherIcon');

    if (!state.weather) return;

    if (tempEl) tempEl.innerText = `${state.weather.temp}°C`;

    if (iconEl) {
        let iconClass = 'fa-cloud-sun';
        // Simplified mapping
        if (['119', '122'].includes(state.weather.code)) iconClass = 'fa-cloud';
        if (['266', '296', '308'].includes(state.weather.code)) iconClass = 'fa-cloud-showers-heavy';

        iconEl.className = `fas ${iconClass}`;
    }
}

function getWeatherRecommendation() {
    if (!state.weather) return;
    let msg = `Cuaca: ${state.weather.temp}°C. `;
    if (state.weather.temp < 26) {
        msg += "Adem nih! Makan Soto Sokaraja enak kayaknya.";
        alert(msg);
    } else {
        msg += "Panas ya? Minum Es Dawet Ayu seger banget!";
        alert(msg);
    }
}

function showToast(msg, type = 'info') {
    // Simple toast
    const div = document.createElement('div');
    div.className = 'toast show';
    div.innerText = msg;
    div.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:#333; color:white; padding:10px 20px; border-radius:20px; z-index:9999;";
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

function escapeHtml(str) {
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function normalizeTimeRange(input) {
    const raw = String(input || '').trim();
    if (!raw) return { ok: true, value: '' };

    // Accept: 08:00 - 20:00, 08:00-20:00, 8:00 - 20:00
    const m = raw.match(/^\s*(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})\s*$/);
    if (!m) return { ok: false, error: "Format jam harus seperti '08:00 - 20:00'" };
    const h1 = Number(m[1]);
    const min1 = Number(m[2]);
    const h2 = Number(m[3]);
    const min2 = Number(m[4]);
    const valid = (h) => Number.isInteger(h) && h >= 0 && h <= 23;
    const validMin = (mm) => Number.isInteger(mm) && mm >= 0 && mm <= 59;
    if (!valid(h1) || !valid(h2) || !validMin(min1) || !validMin(min2)) {
        return { ok: false, error: "Jam operasional tidak valid" };
    }
    const pad2 = (n) => String(n).padStart(2, '0');
    return { ok: true, value: `${pad2(h1)}:${pad2(min1)} - ${pad2(h2)}:${pad2(min2)}` };
}

function validatePriceInput(input) {
    const raw = String(input || '').trim();
    if (!raw) return { ok: false, error: 'Rentang harga wajib diisi' };
    // Require at least a digit; allow common formats e.g. Rp15.000 - Rp30.000 / 15000-30000
    if (!/\d/.test(raw)) return { ok: false, error: 'Rentang harga harus mengandung angka' };
    // If there's a dash, require digits on both sides
    if (raw.includes('-')) {
        const parts = raw.split('-').map(s => s.trim());
        if (parts.length < 2 || !/\d/.test(parts[0]) || !/\d/.test(parts[1])) {
            return { ok: false, error: "Format harga tidak valid. Contoh: 'Rp15.000 - Rp30.000'" };
        }
    }
    return { ok: true, value: raw };
}

async function filesToDataUrls(files) {
    const list = Array.from(files || []);
    const results = [];
    for (const f of list) {
        // eslint-disable-next-line no-await-in-loop
        const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ''));
            reader.onerror = () => reject(new Error('Gagal membaca file foto'));
            reader.readAsDataURL(f);
        });
        results.push(dataUrl);
    }
    return results;
}

// ============================================
// FORM HANDLING (Add & Edit)
// ============================================
function showSubmitForm(editId = null) {
    // UC-17 precondition: user sudah login
    if (!state.currentUser && !state.isAdmin) {
        showToast('Silakan login terlebih dulu untuk menambah kuliner.', 'warning');
        // Redirect to login page (existing flow)
        window.location.href = 'login.html';
        return;
    }

    const modal = document.getElementById('submitModal');
    const form = document.getElementById('addKulinerForm');
    if (!modal || !form) return;

    // Ensure kategori dropdown populated
    const kategoriSelect = document.getElementById('add-kategori');
    if (kategoriSelect && (!kategoriSelect.options || kategoriSelect.options.length <= 1)) {
        const categories = ["Soto", "Sate", "Bakso", "Gudeg", "Ayam", "Lontong", "Jajanan Tradisional", "Makanan Berat", "Minuman"];
        kategoriSelect.innerHTML = '<option value="">Pilih Kategori</option>';
        categories.forEach(cat => {
            kategoriSelect.innerHTML += `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`;
        });
    }

    // Reset or Populate
    if (editId) {
        const item = state.kulinerData.find(k => k.id === editId);
        if (item) {
            form.dataset.editId = String(editId);
            const setVal = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.value = val ?? '';
            };
            setVal('add-nama', item.nama);
            setVal('add-kategori', item.kategori);
            setVal('add-alamat', item.alamat);
            setVal('add-jam', item.jam);
            setVal('add-harga', item.harga);
            setVal('add-deskripsi', item.deskripsi);
            setVal('add-foto', item.foto);
            setVal('add-kontak', item.kontak);
            setVal('add-lat', item.lat);
            setVal('add-lng', item.lng);
            setVal('add-tipe', String(!!item.keliling));
            setVal('add-halal', item.halal || 'unknown');
            setVal('add-parkir', item.parkir || '');
        }
    } else {
        delete form.dataset.editId;
        form.reset();
        // keep coords empty; user can fill manually or via button
    }

    modal.classList.add('show');
}

function closeSubmitModal() {
    const modal = document.getElementById('submitModal');
    const form = document.getElementById('addKulinerForm');
    if (modal) modal.classList.remove('show');
    if (form) {
        delete form.dataset.editId;
        form.reset();
        const fileInput = document.getElementById('add-foto-files');
        if (fileInput) fileInput.value = '';
    }
}

async function getCoordsForAddForm() {
    if (!navigator.geolocation) {
        showToast('Geolocation tidak didukung', 'error');
        return;
    }
    showToast('Mengambil koordinat...', 'info');
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const latEl = document.getElementById('add-lat');
            const lngEl = document.getElementById('add-lng');
            if (latEl) latEl.value = Number(pos.coords.latitude).toFixed(6);
            if (lngEl) lngEl.value = Number(pos.coords.longitude).toFixed(6);
            showToast('Koordinat berhasil diisi ✅');
        },
        () => showToast('Gagal mengambil lokasi. Pastikan izin lokasi diaktifkan.', 'error'),
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

async function submitKuliner(e) {
    e.preventDefault();
    const form = e.target;
    if (!form) return;

    // UC-17: user harus login (kecuali admin mode)
    if (!state.currentUser && !state.isAdmin) {
        showToast('Silakan login terlebih dulu untuk mengirim submission.', 'warning');
        window.location.href = 'login.html';
        return;
    }

    const getVal = (id) => (document.getElementById(id)?.value ?? '').toString().trim();

    const nama = getVal('add-nama');
    const kategori = getVal('add-kategori');
    const alamat = getVal('add-alamat');
    const jamRaw = getVal('add-jam');
    const hargaRaw = getVal('add-harga');
    const deskripsi = getVal('add-deskripsi');
    const fotoUrl = getVal('add-foto');
    const kontak = getVal('add-kontak');
    const latStr = getVal('add-lat');
    const lngStr = getVal('add-lng');
    const keliling = getVal('add-tipe') === 'true';
    const halal = getVal('add-halal') || 'unknown';
    const parkir = getVal('add-parkir');

    // Validasi UC-17
    if (!nama || nama.length < 3) {
        showToast('Nama tempat wajib diisi (min 3 karakter).', 'error');
        return;
    }
    if (!kategori) {
        showToast('Kategori wajib dipilih.', 'error');
        return;
    }
    if (!alamat) {
        showToast('Alamat wajib diisi.', 'error');
        return;
    }
    const hargaCheck = validatePriceInput(hargaRaw);
    if (!hargaCheck.ok) {
        showToast(hargaCheck.error, 'error');
        return;
    }
    if (!deskripsi || deskripsi.length < 20) {
        showToast('Deskripsi wajib diisi (min 20 karakter).', 'error');
        return;
    }
    const jamCheck = normalizeTimeRange(jamRaw);
    if (!jamCheck.ok) {
        showToast(jamCheck.error, 'error');
        return;
    }
    const lat = Number(latStr);
    const lng = Number(lngStr);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        showToast('Latitude & Longitude wajib diisi dengan angka yang valid.', 'error');
        return;
    }

    // Foto: max 3 file, max 2MB/file
    const fileInput = document.getElementById('add-foto-files');
    const files = fileInput ? Array.from(fileInput.files || []) : [];
    if (files.length > 3) {
        showToast('Maksimal 3 foto.', 'error');
        return;
    }
    const maxBytes = 2 * 1024 * 1024;
    for (const f of files) {
        if (f.size > maxBytes) {
            showToast(`Foto "${f.name}" melebihi 2MB.`, 'error');
            return;
        }
    }

    let uploadedFotos = [];
    try {
        if (files.length) uploadedFotos = await filesToDataUrls(files);
    } catch {
        showToast('Gagal memproses foto. Coba lagi atau gunakan URL foto.', 'error');
        return;
    }

    const primaryFoto = uploadedFotos[0] || fotoUrl || 'https://via.placeholder.com/400x200?text=No+Image';

    const now = Date.now();
    const editId = form.dataset.editId ? Number(form.dataset.editId) : null;

    // Jika edit (admin), update langsung kuliner
    if (editId) {
        const index = state.kulinerData.findIndex(k => k.id === editId);
        if (index === -1) {
            showToast('Data yang ingin diedit tidak ditemukan.', 'error');
            return;
        }
        state.kulinerData[index] = {
            ...state.kulinerData[index],
            nama,
            kategori,
            alamat,
            jam: jamCheck.value || state.kulinerData[index].jam,
            harga: hargaCheck.value,
            deskripsi,
            foto: primaryFoto,
            fotos: uploadedFotos.length ? uploadedFotos : (state.kulinerData[index].fotos || []),
            lat,
            lng,
            keliling,
            halal,
            kontak,
            parkir
        };
        DB.set('kuliner', state.kulinerData);
        renderKulinerList();
        renderMarkers();
        showToast('Data kuliner berhasil diperbarui! ✨');
        closeSubmitModal();
        return;
    }

    // Jika tambah (user), simpan sebagai submission pending
    const submissions = DB.get('submissions', []);
    const submission = {
        id: now, // timestamp-based
        status: 'pending',
        submittedAt: new Date().toISOString(),
        userId: state.currentUser?.id ?? null,
        userName: state.currentUser?.name ?? 'User',
        data: {
            nama,
            kategori,
            alamat,
            jam: jamCheck.value || '08:00 - 20:00',
            harga: hargaCheck.value,
            deskripsi,
            foto: primaryFoto,
            fotos: uploadedFotos,
            lat,
            lng,
            keliling,
            halal,
            kontak,
            parkir,
            verified: false,
            reviews: []
        }
    };
    submissions.unshift(submission);
    DB.set('submissions', submissions);

    showToast('Terima kasih! Submission Anda akan direview oleh admin dalam 1-3 hari kerja. ✅');
    closeSubmitModal();
}

function wireAddKulinerForm() {
    const form = document.getElementById('addKulinerForm');
    if (form && !form.dataset.wired) {
        form.addEventListener('submit', submitKuliner);
        form.dataset.wired = 'true';
    }
    const btn = document.getElementById('getCoordsBtn');
    if (btn && !btn.dataset.wired) {
        btn.addEventListener('click', getCoordsForAddForm);
        btn.dataset.wired = 'true';
    }
}

function loginWithGoogle() {
    setSessionCookie("simulated-secure-token-xyz123"); // NFR-01
    showToast("Login berhasil! (Simulasi Secure Cookie)");
    document.getElementById('authBtn').innerHTML = `<button onclick="location.reload()" class="btn-xs">Logout</button>`;
    document.getElementById('loginModal').classList.remove('show');

    // Simulate Admin Check (Updated to 12345)
    if (prompt("Masukkan Kode Admin (Opsional)", "") === "12345") {
        AdminManager.toggle();
    }
}
function closeLoginModal() { document.getElementById('loginModal').classList.remove('show'); }
function toggleAuthModal() { 
    // Redirect to login page
    window.location.href = 'login.html';
}

// Run
window.showDetail = showDetail; // Expose
window.navigate = (p) => showToast("Navigasi ke " + p);

// HTML Event Handlers
window.closeDetail = closeModal;
window.closeAddKulinerModal = closeSubmitModal;
window.toggleAuthModal = toggleAuthModal;
window.showRandomKuliner = showRandom;
window.showWeatherRec = getWeatherRecommendation;
window.locateUser = sortByDistance;

window.filterHalal = () => {
    setActiveChip('halal');
    const el = document.getElementById('halalFilter');
    if (el) {
        el.value = el.value === 'halal' ? '' : 'halal'; // Toggle
        applyFilters();
        if (el.value === 'halal') showToast("Menampilkan Kuliner Halal ✅");
    }
};

window.sortPrice = () => {
    setActiveChip('budget');
    const el = document.getElementById('sortFilter');
    if (el) {
        el.value = 'harga-asc';
        applyFilters();
        showToast("Diurutkan: Harga Terhemat 💰");
    }
};

window.sortRating = () => {
    setActiveChip('best');
    const el = document.getElementById('sortFilter');
    if (el) {
        el.value = 'rating';
        applyFilters();
        showToast("Diurutkan: Rating Tertinggi ⭐");
    }
};

window.quickFilter = (val) => {
    if (val === 'all') {
        document.querySelectorAll('select').forEach(s => s.value = '');
        const search = document.getElementById('searchInput');
        if (search) search.value = '';
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        document.querySelector('.chip[data-filter="all"]').classList.add('active');
        // Reset category buttons
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        applyFilters();
    } else {
        // Assume val is a category name
        const catFilter = document.getElementById('categoryFilter');
        if (catFilter) {
            catFilter.value = val;
            applyFilters();
        }

        // Highlight category button
        document.querySelectorAll('.category-btn').forEach(b => {
            if (b.textContent.includes(val)) b.classList.add('active');
            else b.classList.remove('active');
        });

        // Unset "All" chip
        document.querySelector('.chip[data-filter="all"]').classList.remove('active');
    }
};

function setActiveChip(type) {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    const target = document.querySelector(`.chip[data-filter="${type}"]`);
    if (target) target.classList.add('active');
}

window.showAddKulinerModal = showSubmitForm;
window.toggleSidebar = () => {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('sidebarOverlay');
    const willOpen = sb ? !sb.classList.contains('open') : false;

    if (sb) sb.classList.toggle('open', willOpen);
    if (ov) ov.classList.toggle('show', willOpen);
    document.body.classList.toggle('sidebar-open', willOpen);
};
window.toggleAdvancedFilters = () => {
    const el = document.getElementById('advancedFilters');
    const btn = document.querySelector('button[onclick="toggleAdvancedFilters()"]');
    if (el.style.display === 'none') {
        el.style.display = 'grid'; // Change to grid for better layout
        el.style.gridTemplateColumns = '1fr 1fr';
        el.style.gap = '10px';
        btn.innerHTML = '<i class="fas fa-chevron-up"></i> Sembunyikan Filter';
    } else {
        el.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-sliders-h"></i> Filter Lainnya';
    }
};

window.showPrivacyPolicy = () => alert("Kebijakan Privasi:\nData disimpan lokal di browser Anda. Kami menjamin keamanan data pengguna.");

// Wire form (idempotent) on load
document.addEventListener('DOMContentLoaded', wireAddKulinerForm);