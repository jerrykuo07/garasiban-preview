// ============================================================
// DATA PRODUK KATALOG - Garasi Ban Indonesia (Clone)
// Sumber: data contoh garasiban.com — id diurut rapi mengikuti urutan baris
// Ganti gambar di assets/products/ sesuai kebutuhan.
// ============================================================

const NO_IMAGE = "https://placehold.co/400x300?text=No+Image";

// ============================================================
// DATA KONTAK SITUS — dipakai footer (semua halaman) & tombol chat WA
// ============================================================
const SITE_CONTACT = {
  phoneDisplay: "+62 851-1130-9169",   // teks nomor yang tampil di footer
  phoneHref: "+6285111309169",         // link tel: (format internasional, tanpa spasi)
  email: "info@garasiban.com",         // link mailto:
  address: "Jl. Otomotif No. 88, Jakarta, Indonesia",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Garasi+Ban+Indonesia+Jl.+Otomotif+No.+88+Jakarta",
  whatsapp: "6285111309169"            // nomor WA semua tombol chat (format 62..., tanpa +)
};

const PRODUCTS = [
  // CONTOH PRODUK MULTI-VARIAN: 1 produk, beberapa ukuran, harga bisa berbeda
  // per ukuran. Harga/SKU pindah ke dalam variants; width/rim per varian otomatis
  // ikut mengisi dropdown filter Lebar & Ring. Lihat PANDUAN-EDIT-DATA.md.
  { id: 1, name: "FDR Sport XR Evo TUBELESS - Ring 13", brand: "FDR", category: "Ban Motor Matic", rim: 13, sku: "-", variant: "-", weight: "3.50 kg", images: ["assets/products/prod_1_1786277898_6a78700acd10f.png"], keywords: "ban matic, ban matic besar, ban depan, ban belakang, ban beat, ban mio, ban vario, ban nmax, ban pcx, ban tubeless, 110/70-13, 130/70-13",
    variants: [
      { label: "110/70-13 (Depan)",    width: 110, price: "Rp 50.000", priceValue: 50000, sku: "FDR-XR-1107" },
      { label: "130/70-13 (Belakang)", width: 130, price: "Rp 65.000", priceValue: 65000, sku: "FDR-XR-1307" }
    ] },
  { id: 2,  name: "IRC Ecotrax NR96", brand: "IRC Tire", category: "Ban Motor Matic", price: "Hubungi Kami", priceValue: null, sku: "12345", variant: "-", weight: "0.00 kg", images: ["assets/products/prod_1784987902_6a64c0fe6500d.jpg"], keywords: "ban harian, ban awet, ban depan motor, ban tubeless" },
  { id: 3,  name: "Tekiro Socket Wrench Set 24 Pcs 1/2 Inch", brand: "Tekiro", category: "Toolkit", price: "Rp 720.000", priceValue: 720000, sku: "TKR-SKT-24", variant: "Chrome Vanadium", weight: "4.20 kg", images: [NO_IMAGE], keywords: "kunci sok, sok set, kunci socket, kunci set" },
  { id: 4,  name: "Tekiro Tire Repair Kit Set Tubeless Heavy Duty", brand: "Tekiro", category: "Tire Repair Kit", price: "Rp 85.000", priceValue: 85000, sku: "TKR-TRK-81", variant: "Complete 8 in 1", weight: "0.65 kg", images: [NO_IMAGE], keywords: "alat tambal ban, tambal bocor, tambal ban tubeless" },
  { id: 5,  name: "Bosch Cordless Air Compressor EasyPump 10.3 Bar", brand: "Bosch", category: "Kompresor", price: "Rp 950.000", priceValue: 950000, sku: "BSH-PUMP-EASY", variant: "Portable Digital", weight: "0.85 kg", images: [NO_IMAGE], keywords: "pompa ban, pompa angin, kompresor portable" },
  { id: 6,  name: "Tekiro Dongkrak Botol / Hydraulic Bottle Jack 2 Ton", brand: "Tekiro", category: "Dongkrak", price: "Rp 275.000", priceValue: 275000, sku: "TKR-DJ-2T", variant: "2 Ton Heavy Duty", weight: "2.80 kg", images: [NO_IMAGE], keywords: "dongkrak, jack mobil, sokbrek, alat angkat" },
  { id: 7,  name: "Cover Mobil Waterproof Premium SUV", brand: "Astra Otoparts", category: "Eksterior", price: "Rp 380.000", priceValue: 380000, sku: "ASP-ACC-CM-SUV", variant: "4-Layer Protection", weight: "3.00 kg", images: [NO_IMAGE], keywords: "sarung mobil, selimut mobil, cover body" },
  { id: 8,  name: "Karpet Mobil Universal PVC Premium 5 Sheet", brand: "Astra Otoparts", category: "Interior", price: "Rp 325.000", priceValue: 325000, sku: "ASP-ACC-KM05", variant: "Black Edition", weight: "4.50 kg", images: [NO_IMAGE], keywords: "karpet dasar mobil, alas lantai mobil" },
  // (urutan baris = urutan tampil di katalog)
  { id: 9,  name: "Tail Bag / Side Bag Touring Waterproof", brand: "Astra Otoparts", category: "Touring", price: "Rp 290.000", priceValue: 290000, sku: "ASP-ACC-TB30", variant: "Capacity 30L", weight: "1.20 kg", images: [NO_IMAGE], keywords: "tas motor, tas touring, bagasi motor, tas waterproof" },
  { id: 10, name: "Aki Motor GS Astra GTZ5S", brand: "GS Astra", category: "Kelistrikan", price: "Rp 245.000", priceValue: 245000, sku: "GSA-GTZ5S", variant: "Dry Charged", weight: "1.80 kg", images: [NO_IMAGE], keywords: "aki motor, accu motor, baterai motor" },
  { id: 11, name: "Aki GS Astra Maintenance Free NS60", brand: "GS Astra", category: "Kelistrikan", price: "Rp 840.000", priceValue: 840000, sku: "GSA-MF-NS60", variant: "MF 45Ah", weight: "11.50 kg", images: [NO_IMAGE], keywords: "aki mobil, accu mobil, baterai mobil" },
  { id: 12, name: "Lampu LED Mobil Bosch Iris LED H7", brand: "Bosch", category: "Lampu", price: "Rp 580.000", priceValue: 580000, sku: "BSH-LED-H7", variant: "6000K White", weight: "0.30 kg", images: [NO_IMAGE], keywords: "lampu mobil, lampu led mobil, lampu depan mobil" },
  { id: 13, name: "Bohlam Utama Osram Allseason Super H4 12V 60/55W", brand: "Osram", category: "Lampu", price: "Rp 95.000", priceValue: 95000, sku: "OSR-H4-ALLS", variant: "Allseason Yellow", weight: "0.15 kg", images: [NO_IMAGE], keywords: "bohlam, lampu motor, lampu depan motor" },
  { id: 14, name: "Rantai Motor Aspira Heavy Duty 428H-112L", brand: "Astra Otoparts", category: "Rantai & Gear", price: "Rp 175.000", priceValue: 175000, sku: "ASP-RN-428H", variant: "Gold 428H", weight: "1.80 kg", images: [NO_IMAGE], keywords: "rantai, gear set, gearset, drive chain" },
  { id: 15, name: "Busi Bosch Double Iridium FR7DI", brand: "Bosch", category: "Busi", price: "Rp 120.000", priceValue: 120000, sku: "BSH-IR-FR7DI", variant: "Double Iridium", weight: "0.06 kg", images: [NO_IMAGE], keywords: "busi motor, busi iridium" },
  { id: 16, name: "Busi NGK Iridium IX CPR9EAIX-9", brand: "NGK", category: "Busi", price: "Rp 110.000", priceValue: 110000, sku: "NGK-IR-CPR9", variant: "Iridium IX", weight: "0.05 kg", images: [NO_IMAGE], keywords: "busi motor, busi racing" },
  { id: 17, name: "Meguiar's Supreme Shine Protectant", brand: "Meguiar's", category: "Interior Care", price: "Rp 185.000", priceValue: 185000, sku: "MEG-SSP-473", variant: "473 ml", weight: "0.55 kg", images: [NO_IMAGE], keywords: "pengkilap dashboard, perawatan interior, penampil dashboard" },
  
  { id: 18, name: "Meguiar's Ultimate Liquid Wax", brand: "Meguiar's", category: "Wax & Coating", price: "Rp 350.000", priceValue: 350000, sku: "MEG-ULW-473", variant: "473 ml", weight: "0.60 kg", images: [NO_IMAGE], keywords: "wax mobil, poles mobil, pengkilap cat mobil" },
  { id: 19, name: "Meguiar's Gold Class Car Wash & Conditioner", brand: "Meguiar's", category: "Car Shampoo", price: "Rp 245.000", priceValue: 245000, sku: "MEG-GCW-189", variant: "1.89 Liter", weight: "2.00 kg", images: [NO_IMAGE], keywords: "sampo mobil, sabun cuci mobil, sampo" },
  { id: 20, name: "Meguiar's Ultimate Wheel Cleaner", brand: "Meguiar's", category: "Wheel Cleaner", price: "Rp 225.000", priceValue: 225000, sku: "MEG-UWC-710", variant: "24 oz / 710ml", weight: "0.85 kg", images: [NO_IMAGE], keywords: "pembersih velg, cairan cuci velg" },
  { id: 21, name: "Digital Tire Pressure Gauge", brand: "Pirelli", category: "Pressure Gauge", price: "Rp 180.000", priceValue: 180000, sku: "PIR-ACC-TPG01", variant: "Precision Display", weight: "0.25 kg", images: [NO_IMAGE], keywords: "alat ukur angin ban, cek tekanan angin, tire gauge" },
  { id: 22, name: "Bridgestone Premium Tire Gloss", brand: "Bridgestone", category: "Tire Shine", price: "Rp 75.000", priceValue: 75000, sku: "BS-CARE-TG500", variant: "500ml Spray", weight: "0.60 kg", images: [NO_IMAGE], keywords: "pengkilap ban, penyembang ban, tire shine" },
  { id: 23, name: "Wiper Hybrid Blade 22 Inch", brand: "Astra Otoparts", category: "Wiper", price: "Rp 95.000", priceValue: 95000, sku: "ASP-WP-22H", variant: "Silicone Coating", weight: "0.45 kg", images: [NO_IMAGE], keywords: "wiper mobil, pembersih kaca, bar wiper" },
  { id: 24, name: "Filter Oli Aspira Super", brand: "Astra Otoparts", category: "Filter", price: "Rp 40.000", priceValue: 40000, sku: "ASP-FO-002", variant: "OEM Spec", weight: "0.35 kg", images: [NO_IMAGE], keywords: "filter oli, saringan oli" },
  { id: 25, name: "Kampas Rem Depan Brembo Prime", brand: "Brembo", category: "Rem", price: "Rp 450.000", priceValue: 450000, sku: "BRM-BP-FR01", variant: "Brembo Red", weight: "0.80 kg", images: [NO_IMAGE], keywords: "kampas rem, brake pad, kampas ganda" },
  { id: 26, name: "Diablo Rosso Corsa II 120/70-17", brand: "Pirelli", category: "Ban Motor Sport", price: "Rp 1.050.000", priceValue: 1050000, sku: "PIR-DRC2-12070", variant: "Soft Compound", weight: "4.10 kg", images: [NO_IMAGE], keywords: "ban sport, ban balap, ban ring 17, ban ninja, ban r25" },
  { id: 27, name: "Enduro Racing 10W-40", brand: "Enduro", category: "Oli", price: "Rp 85.000", priceValue: 85000, sku: "END-OLI-1040", variant: "1 Liter", weight: "0.95 kg", images: [NO_IMAGE], keywords: "oli motor, oli mesin, oli matic, sae 10w-40" },
  { id: 28, name: "Castrol Activ 10W-30", brand: "Castrol", category: "Oli", price: "Rp 95.000", priceValue: 95000, sku: "CAS-ACT-1030", variant: "0.8 Liter", weight: "0.85 kg", images: [NO_IMAGE], keywords: "oli motor, oli bebek, oli harian" },
  { id: 29, name: "Selant Anti Bocor Ban Tubeless 1000ml", brand: "OK Tire", category: "Selant", price: "Rp 60.000", priceValue: 60000, sku: "OKT-SEL-1000", variant: "1000 ml", weight: "1.05 kg", images: [NO_IMAGE], keywords: "selant, cairan anti bocor, tambal ban otomatis" },
];

// Kategori: id = nilai ?category= di URL (dinomori urut sesuai urutan tampil), parent = kategori induk
const CATEGORIES = [
  { id: 1,  name: "Aksesoris", parent: "Aksesoris" },
  { id: 2,  name: "Eksterior", parent: "Aksesoris" },
  { id: 3,  name: "Interior", parent: "Aksesoris" },
  { id: 4,  name: "Mobil", parent: "Aksesoris" },
  { id: 5,  name: "Motor", parent: "Aksesoris" },
  { id: 6,  name: "Touring", parent: "Aksesoris" },
  { id: 7,  name: "Ban Motor", parent: "Ban Motor" },
  { id: 8,  name: "Ban Motor Bebek", parent: "Ban Motor" },
  { id: 9,  name: "Ban Motor Matic", parent: "Ban Motor" },
  { id: 10, name: "Ban Motor Matic Besar", parent: "Ban Motor" },
  { id: 11, name: "Ban Motor Sport", parent: "Ban Motor" },
  { id: 12, name: "Ban Motor Trail", parent: "Ban Motor" },
  { id: 13, name: "Ban Motor Vespa", parent: "Ban Motor" },
  { id: 14, name: "Ban Motor Touring", parent: "Ban Motor" },
  { id: 15, name: "Peralatan", parent: "Peralatan" },
  { id: 16, name: "Dongkrak", parent: "Peralatan" },
  { id: 17, name: "Kompresor", parent: "Peralatan" },
  { id: 18, name: "Pressure Gauge", parent: "Peralatan" },
  { id: 19, name: "Tire Repair Kit", parent: "Peralatan" },
  { id: 20, name: "Toolkit", parent: "Peralatan" },
  { id: 21, name: "Perawatan Kendaraan", parent: "Perawatan Kendaraan" },
  { id: 22, name: "Car Shampoo", parent: "Perawatan Kendaraan" },
  { id: 23, name: "Interior Care", parent: "Perawatan Kendaraan" },
  { id: 24, name: "Tire Shine", parent: "Perawatan Kendaraan" },
  { id: 25, name: "Wax & Coating", parent: "Perawatan Kendaraan" },
  { id: 26, name: "Wheel Cleaner", parent: "Perawatan Kendaraan" },
  { id: 27, name: "Sparepart", parent: "Sparepart" },
  { id: 28, name: "Ban", parent: "Sparepart" },
  { id: 29, name: "Busi", parent: "Sparepart" },
  { id: 30, name: "Filter", parent: "Sparepart" },
  { id: 31, name: "Kelistrikan", parent: "Sparepart" },
  { id: 32, name: "Lampu", parent: "Sparepart" },
  { id: 33, name: "Rantai & Gear", parent: "Sparepart" },
  { id: 34, name: "Rem", parent: "Sparepart" },
  { id: 35, name: "Wiper", parent: "Sparepart" },
  { id: 36, name: "Oli", parent: "Perawatan Kendaraan" },
  { id: 37, name: "Selant", parent: "Perawatan Kendaraan" },
];

// Nama kategori -> id kategori (untuk pencarian URL)
const CATEGORY_ID_BY_NAME = {};
CATEGORIES.forEach(c => { CATEGORY_ID_BY_NAME[c.name] = c.id; });

// ============================================================
// URUTAN GRUP KATEGORI DI SIDEBAR KATALOG (opsional)
// ============================================================
// Urutan grup (judul tebal: AKSESORIS, BAN MOTOR, dst.) mengikuti daftar ini.
// Urutan sub-kategori di dalam grup = urutan barisnya di CATEGORIES di atas.
// Grup yang tidak dicantumkan di sini tampil paling bawah.
const CATEGORY_ORDER = [
  "Aksesoris",
  "Ban Motor",
  "Peralatan",
  "Perawatan Kendaraan",
  "Sparepart"
];

// ============================================================
// DATA BERITA — satu sumber untuk daftar berita & seksi "Baca Juga"
// ============================================================
// CARA MENAMBAH BERITA BARU:
//   1. Buat file HTML artikel di folder /berita/ (copy salah satu artikel lama).
//   2. Tambahkan entri baru di daftar NEWS_POSTS di bawah ini.
//   3. Selesai — daftar berita & seksi "Baca Juga" di semua artikel terisi otomatis.
//
// PENGATURAN SEKSI "BACA JUGA" (tampil di bawah setiap artikel):
//   jumlahTampil : berapa kartu berita lain yang tampil (mis. 3).
//   pilihan      : "random"   = acak setiap halaman dibuka (tetap sejumlah jumlahTampil)
//                  "otomatis" = berita terbaru dulu (urutan di NEWS_POSTS)
//                  ATAU array slug untuk menentukan sendiri manual,
//                  contoh: ["slug-artikel-a", "slug-artikel-b"]
//                  (slug = nama file artikel tanpa .html)
//   Catatan: artikel yang sedang dibaca SELALU dikecualikan di semua mode.
const NEWS_SETTINGS = {
  jumlahTampil: 3,
  pilihan: "random"
};

// ============================================================
// OPSI UKURAN TAMBAHAN UNTUK DROPDOWN FILTER (opsional)
// ============================================================
// Dropdown Lebar & Ring di katalog otomatis terisi dari data produk.
// Kalau ingin sebuah ukuran TETAP tampil di dropdown walau belum ada
// produknya (mis. Ring 20 untuk stok yang akan datang), isi di sini:
//   contoh: rims: [20, 21]  atau  widths: [90]
const SIZE_EXTRA = {
  widths: [],
  rims: []        // contoh isi: [20, 21] → Ring 20 & 21 selalu tampil di dropdown
};

const NEWS_POSTS = [
  {
    slug: "mengenal-kode-ukuran-ban-motor-dan-cara-membacanya-dengan-benar",
    title: "Mengenal Kode Ukuran Ban Motor dan Cara Membacanya dengan Benar",
    date: "25 Jul 2026",
    views: "234",
    image: "assets/news/news_1784988200_6a65a103.jpg",
    excerpt: "Bingung membaca arti angka 120/70-R17 pada ban? Simak panduan mudah membaca spesifikasi ban motor berikut ini."
  },
  {
    slug: "perbedaan-ban-tubeless-dan-ban-biasa-mana-yang-lebih-cocok-untuk-harian",
    title: "Perbedaan Ban Tubeless dan Ban Biasa: Mana yang Lebih Cocok untuk Harian?",
    date: "25 Jul 2026",
    views: "109",
    image: "assets/news/news_1784988100_6a65a102.jpg",
    excerpt: "Ketahui kelebihan serta kekurangan ban tubeless vs ban biasa (tube type) sebelum Anda memutuskan untuk membelinya."
  },
  {
    slug: "5-cara-merawat-ban-motor-agar-awet-dan-tidak-mudah-licin",
    title: "5 Cara Merawat Ban Motor Agar Awet dan Tidak Mudah Licin",
    date: "25 Jul 2026",
    views: "143",
    image: "assets/news/news_1784988000_6a65a101.jpg",
    excerpt: "Tips praktis merawat ban motor harian agar tekanan angin tetap stabil, alur tidak cepat gundul, dan aman di jalan basah."
  },
  {
    slug: "kapan-waktu-tepat-ganti-ban-motor",
    title: "Kapan Waktu yang Tepat Mengganti Ban Motor? Ini 4 Tandanya",
    date: "18 Jul 2026",
    views: "87",
    image: "assets/news/news_1784988000_6a65a101.jpg",
    excerpt: "Ban bocor berulang, alur mulai gundul, atau sudah melewati usia pakai — kenali 4 tanda ban motor wajib segera diganti."
  },
  {
    slug: "cara-memilih-ban-motor-yang-tepat-sesuai-gaya-berkendara",
    title: "Cara Memilih Ban Motor yang Tepat Sesuai Gaya Berkendara Anda",
    date: "10 Jul 2026",
    views: "65",
    image: "assets/news/news_1784988200_6a65a103.jpg",
    excerpt: "Ban harian, sport, atau touring? Pahami karakter masing-masing tipe ban agar berkendara lebih nyaman dan aman."
  }
];

// ============================================================
// DATA BENGKEL REKANAN — tampil di halaman bengkel-rekanan.html
// ============================================================
// Nomor urut "Cabang 01/02/..." diambil otomatis dari urutan di daftar ini.
// mapsUrl: link share dari Google Maps (buka Maps tempat itu > Share > Copy link).
const WORKSHOPS = [
  {
    name: "Depot Ban Marunda",
    address: "Jl. Marunda Makmur No. 49B, Kel. Sagara Makmur, Kec. Tarumajaya, Kabupaten Bekasi, Jawa Barat 17211",
    hours: "08:00 - 17:00 WIB",
    gps: "-6.15180900, 106.91028600",
    mapsUrl: "https://maps.app.goo.gl/HU7HgruUKo15sj5P9",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Depot Ban Babelan",
    address: "Desa Kedungjaya, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17610",
    hours: "08:00 - 17:00 WIB",
    gps: "-6.15988242, 107.03988920",
    mapsUrl: "https://maps.app.goo.gl/PaJnwkiPGPfcobhbA",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Depot Ban Teluk Pucung",
    address: "Jalan KH Noer Ali Blok AA, Jl. Taman Wisma Asri II No.38 No 7, RT. 005, RW. 026, Kel. Teluk Pucung, Kec. Bekasi Utara, Kota Bekasi, Jawa Barat 17121",
    hours: "08:00 - 17:00 WIB",
    gps: "-6.20106782, 107.02863728",
    mapsUrl: "https://maps.app.goo.gl/5u18CjWHJ2emHYfm7",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Depot Ban Tarumajaya",
    address: "Jl. Boulevard Raya No. 12, Kelapa Gading, Jakarta Utara",
    hours: "08:00 - 17:00 WIB",
    gps: "-6.15160400, 106.91041600",
    mapsUrl: "https://maps.app.goo.gl/hcKXRNjLdRAioqwH9",
    image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=600"
  }
];
