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
  phoneDisplay: "+62 819-0802-8911",   // teks nomor yang tampil di footer
  phoneHref: "+6281908028911",         // link tel: (format internasional, tanpa spasi)
  email: "info@garasiban.com",         // link mailto:
  address: "Jl. Otomotif No. 88, Jakarta, Indonesia",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Garasi+Ban+Indonesia+Jl.+Otomotif+No.+88+Jakarta",
  whatsapp: "6281908028911"            // nomor WA semua tombol chat (format 62..., tanpa +)
};

const PRODUCTS = [
  // CONTOH PRODUK MULTI-VARIAN: 1 produk, beberapa ukuran, harga bisa berbeda
  // per ukuran. Harga/SKU pindah ke dalam variants; width/rim per varian otomatis
  // ikut mengisi dropdown filter Lebar & Ring. Lihat PANDUAN-EDIT-DATA.md.
  { id: 1, name: "Zenios Ionity TUBELESS - Ring 13", brand: "Zenios", category: "Ban Motor Matic", rim: 13, sku: "-", variant: "-", weight: "3.50 kg", images: ["assets/products/Zenios Ionity.jpg"], keywords: "ban matic, ban matic besar, ban depan, ban belakang, ban beat, ban mio, ban vario, ban nmax, ban pcx, ban tubeless, 110/70-13, 130/70-13",
    variants: [
      { label: "110/70-13",    width: 110, price: "Rp 50.000", priceValue: 50000, sku: "-" },
      { label: "130/70-13", width: 130, price: "Rp 65.000", priceValue: 65000, sku: "-" },
      { label: "140/80-13", width: 130, price: "Rp 65.000", priceValue: 65000, sku: "-" }
    ] },
  { id: 2, name: "Zenios Milano TUBELESS - Ring 13", brand: "Zenios", category: "Ban Motor Matic", rim: 13, sku: "-", variant: "-", weight: "3.50 kg", images: ["assets/products/Zenios Ionity.jpg"], keywords: "ban matic, ban matic besar, ban depan, ban belakang, ban beat, ban mio, ban vario, ban nmax, ban pcx, ban tubeless, 110/70-13, 130/70-13",
    variants: [
      { label: "110/70-13",    width: 110, price: "Rp 50.000", priceValue: 50000, sku: "-" },
      { label: "130/70-13", width: 130, price: "Rp 65.000", priceValue: 65000, sku: "-" },
      { label: "140/80-13", width: 130, price: "Rp 65.000", priceValue: 65000, sku: "-" }
    ] },
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
