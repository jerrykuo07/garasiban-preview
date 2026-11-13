// ============================================================
// DATABASE ADAPTER LOKAL - Garasi Ban Indonesia
// ============================================================
// Fungsi: Memastikan data produk menggunakan source lokal (js/data.js)
// tanpa mengakses Supabase apapun. Data PRODUCTS, CATEGORIES, dst.
// tetap diambil dari file data.js yang sudah ada.
//
// Cara kerja:
// - Tidak membuat client Supabase sama sekali
// - Tidak mengubah PRODUCTS, CATEGORIES, NEWS_POSTS, WORKSHOPS
// - Fungsi ini adalah no-op (tidak efek) namun memastikan urutan load script
//   tidak memicu fetch dari database luar.
//
// ============================================================

// Module ekspor function yang dipakai oleh ui (js.js) tanpa efek samping.
// Semua referensi data (PRODUCTS, CATEGORIES, dll) berasal dari data.js yang
// sudah di-load sebelum file ini dieksekusi.

const DB = (() => {
  // Fungsi init: catatan saja, tidak melakukan fetch apapun.
  // Jika kode lain memanggil DB.init(), kita hanya log dan kembali.
  function init() {
    // Tidak ada init database — data sudah ada di global dari data.js
    // console.info("[DB] Using local data source only — no Supabase connection.");
  }

  // Fungsi mapping baris DB ke format produk — tidak digunakan karena
  // data sudah dalam format PRODUCTS di data.js.
  function mapRow() {
    return null;
  }

  // Fungsi ambil produk — mengembalikan referensi ke PRODUCTS dari data.js
  // agar komponen UI bisa mengaksesnya melalui objek DB jika perlu.
  function getProduk() {
    // PRODUCTS sudah ada di global scope dari <script src="js/data.js">
    return typeof PRODUCTS !== "undefined" ? PRODUCTS : [];
  }

  // Ekspor fungsi yang mungkin diambil oleh komponen lain
  return { init, mapRow, getProduk };
})();

// Pastikan global DB tersedia untuk kode yang mungkin referral-nya
window.DB = DB;

// Export untuk module system jika ada
if (typeof module !== "undefined" && module.exports) {
  module.exports = DB;
}