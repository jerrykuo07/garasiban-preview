# Garasi Ban Indonesia: Perbandingan Tampilan Visual

## 📸 Quick Comparison: Live Site vs Local Project

Perbandingan ini fokus **hanya pada perbedaan tampilan visual (style)** antara website live dan proyek lokal Anda. Logika backend akan dibahas terpisah.

---

## 🌐 Website Live: https://garasiban.com/

### Visual Style
- **Hero image**: Gambar dengan rotasi -3deg, border radius rounded-2xl, shadow-xl
- **Hover effect**: `hover:rotate-0` — gambar rotate kembali ke posisi normal saat di-hover
- **Object fit**: `object-cover` → gambar **crop** ke dalam kotak yang ditentukan
- **Container height**: `max-h-[380px]` — tinggi gambar fixed, bisa memotong bagian atas/bawah
- **Color gradient**: `bg-gradient-to-r from-brandBlack to-gray-600` di atas teks
- **Text style**: `bg-clip-text bg-gradient-to-r` — teks warna gradient

### Gambar Produk (Katalog)
- **Container**: `h-44` tinggi fixed, `overflow-hidden`
- **Gambar**: `object-cover` → **crop gambar** jika rasio gambar berbeda dengan kotak
- **Hover**: `group-hover:scale-105` → gambar **diperbesar 105%** saat di-hover di dalam card
- **Transition**: `transition duration-300` — animasi smooth saat hover

### Filter Section
- **Background**: `bg-white rounded-xl shadow-xl border border-gray-200/60`
- **Input select**: `bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg`
- **Focus state**: `focus:outline-none focus:border-brandYellow`

### Kategori Cards
- **Container**: `card-hover cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm transition border border-gray-200/80`
- **Gambar dalam card**: `w-full h-full object-cover transition duration-300`
- **Title text**: `font-extrabold text-base text-brandBlack uppercase`
- **Description**: `text-xs text-gray-500 mt-1`

### Navigation Hover
- **Links**: `hover:bg-brandYellow hover:text-brandBlack transition text-lg`
- **Icons**: `hover:bg-brandYellow hover:text-brandBlack transition`

### Footer
- **Links**: `hover:text-brandYellow transition`
- **Social icons**: `hover:bg-brandYellow hover:text-brandBlack transition`

---

## 📁 Proyek Lokal (Ini)

### Visual Style
- **Hero image**: Sama — rotasi -3deg, border radius, shadow
- **Hover effect**: `hover:rotate-0` — sama, gambar rotate kembali ke normal
- **Object fit**: **`object-contain`** → gambar **TIDAK crop**, menampilkan seluruh gambar di dalam kontainer
- **Container**: `aspect-square` → kontainer persegi 1:1, tinggi menyesuaikan lebar
- **Text style**: Biasa (tidak gradient), `text-brandBlack` warna solid

### Gambar Produk (Katalog)
- **Container**: `aspect-square` → kotak persegi 1:1 (tidak ada tinggi fixed)
- **Gambar**: `object-contain` → **TIDAK crop**, gambar utuh muat di dalam kotak persegi
- **Hover**: **TIDAK ADA `scale-105`** → gambar tetap ukuran original, tidak diperbesar
- **Transition**: `transition duration-500` — animasi pada border/tekst, bukan gambar
- **Perbedaan kunci**: Gambar product tetap ukuran original, hanya border/ketebalan text berubah saat hover

### Filter Section
- **Background**: `bg-white rounded-xl shadow-xl border border-gray-200/60` — sama
- **Input select**: Sama — `bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg`
- **Focus state**: Sama — `focus:outline-none focus:border-brandYellow`

### Kategori Cards
- **Container**: `card-hover cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm transition border border-gray-200/80` — sama
- **Gambar dalam card**: **`object-contain` dalam `aspect-square`** → gambar utuh, tidak crop
- **Title text**: `font-extrabold text-base text-brandBlack uppercase` — sama
- **Description**: `text-xs text-gray-500 mt-1` — sama
- **Perbedaan kunci**: Container `aspect-square` memaksa bentuk persegi 1:1

### Navigation Hover
- **Links**: Sama — `hover:bg-brandYellow hover:text-brandBlack transition text-lg`
- **Icons**: Sama

### Footer
- **Links**: Sama — `hover:text-brandYellow transition`
- **Social icons**: Sama

---

## 🔍 Perbedaan Visual Utama

| Elemen | Live Site (garasiban.com) | Proyek Lokal (Ini) |
|--------|--------------------------|--------------------|
| **Gambar hero** | `object-cover` (crop possible) | `object-contain` (no crop) |
| **Gambar produk di card** | `object-cover` + `group-hover:scale-105` (zoom + crop) | `object-contain` (no zoom, no crop) |
| **Hover effect gambar** | ✅ Diperbesar 105% | ✅ **TIDAK diperbesar** |
| **Container gambar** | `h-44` (tinggi fixed) | `aspect-square` (persegi 1:1, lebar bebas) |
| **Aspect ratio** | Bisa non-square (crop) | **Wajib 1:1 (square)** |
| **Teks headline** | Gradient `bg-gradient-to-r` | Warna solid `text-brandBlack` |

---

## 📸 Screenshot Visual Check

Jika ingin melihat perbedaan secara visual, bisa:
1. **Buka https://garasiban.com/** di browser
2. **Buka file index.html lokal** di browser
3. **Bandingkan gambar-produk** di kedua situs:
   - Di live site: gambar kemungkinan terpotong (crop) di sudut
   - Di lokal: gambar utuh muat di dalam kotak persegi
   - Di live site: hover memantik gambar 105%
   - Di lokal: hover hanya memantik border kartu, gambar tetap

---

## ✅ Yang Sudah Tersedia di Proyek Lokal

Sudah completed (dari pembahasan sebelumnya):

- ✅ **Phone numbers**: Semua diupdate ke `+62 819-0802-8911`
- ✅ **Image fill**: Dari `object-cover` ke `object-contain` di product cards
- ✅ **Hover zoom**: Dihapus — gambar tidak diperbesar saat di-hover
- ✅ **Container**: Dari `h-32 sm:h-48` ke `aspect-square` (1:1 ratio)
- ✅ **Admin page**: `admingarasiban341.html` dihapus
- ✅ **Supabase files**: Dihapus total (0 dependensi database)

---

## 🎯 Tujuan Perbandingan

README ini dibuat agar pembaca paham:

1. **Perbedaan visual**: Apa yang kelihatan berbeda antara keduanya
2. **Fokus style**: Perbaikan pada bagaimana gambar ditampilkan (crop vs no crop)
3. **Hover behavior**: Perbedaan interaksi saat mouse di-hover
4. **Container design**: Dari tinggi fixed ke aspect ratio square

**Belum dibahas (akan datang)**:
- Logika backend dan database
- Fitur admin panel
- Logika filter dan search
- Data produk dan harga

---

**Catatan**: Jika butuh perbandingan logika/backend mendetail, silakan minta secara terpisah. README ini khusus visual/style saja.