// ============================================================
// KOMPONEN BERSAMA + ENGINE KATALOG - Garasi Ban Indonesia (Clone)
// ============================================================

const PER_PAGE = 16; // infinity scroll: jumlah produk awal, ditambah 16 tiap scroll

// Prefix path relatif (naik 1 folder jika halaman berada di dalam subfolder, mis. /berita/)
const BASE = window.location.pathname.includes("/") && /\/berita\//.test(window.location.pathname) ? "../" : "";

// Nomor WA untuk tombol chat & form kontak — sumber utamanya SITE_CONTACT.whatsapp di js/data.js
const WA_NUMBER = (typeof SITE_CONTACT !== "undefined" && SITE_CONTACT.whatsapp) ? SITE_CONTACT.whatsapp : "6281908028911";

// ---------- MULTI-VARIAN PRODUK (harga berbeda per ukuran) ----------
// Produk bisa punya daftar `variants` (label/width/price/priceValue/sku per varian).
// Kalau tidak punya, dianggap "varian tunggal" yang dibungkus dari field produk utama
// — jadi seluruh kode di bawah (kartu, filter, modal, WA) cukup menangani SATU bentuk.
function PRODUCT_VARIANTS(p) {
  if (Array.isArray(p.variants) && p.variants.length) return p.variants;
  return [{ label: "", width: p.width, price: p.price, priceValue: p.priceValue, sku: p.sku }];
}

// Harga yang tampil di kartu: varian termurah ("Mulai dari" saat lebih dari 1 varian)
function productStartingPrice(p) {
  const v = PRODUCT_VARIANTS(p);
  const denganHarga = v.filter(x => x.priceValue !== null && x.priceValue !== undefined);
  if (!denganHarga.length) return { text: v[0]?.price || p.price || "Hubungi Kami", multi: false };
  const murah = denganHarga.reduce((a, b) => (b.priceValue < a.priceValue ? b : a));
  return { text: murah.price, multi: v.length > 1 };
}

// priceValue efektif untuk pengurutan harga: varian termurah
function sortPriceValue(p) {
  const denganHarga = PRODUCT_VARIANTS(p).filter(x => x.priceValue !== null && x.priceValue !== undefined);
  if (!denganHarga.length) return p.priceValue ?? null;
  return Math.min(...denganHarga.map(x => x.priceValue));
}

// ---------- NAVBAR ----------
function renderNavbar(active) {
  const links = [
    { href: "index.html",           label: "Home" },
    { href: "katalog.html",         label: "Katalog" },
    { href: "berita.html",          label: "Berita" },
    { href: "bengkel-rekanan.html", label: "Bengkel Rekanan" },
    { href: "kontak-kami.html",     label: "Kontak Kami" },
  ];

  const desktop = links.map(l =>
    l.label === active
      ? `<a href="${BASE}${l.href}" class="text-brandBlack border-b-2 border-brandYellow pb-1">${l.label}</a>`
      : `<a href="${BASE}${l.href}" class="hover:text-brandYellow transition">${l.label}</a>`
  ).join("\n");

  const mobile = links.map(l =>
    l.label === active
      ? `<a href="${BASE}${l.href}" class="block py-2 text-brandBlack border-l-4 border-brandYellow pl-2">${l.label}</a>`
      : `<a href="${BASE}${l.href}" class="block py-3 text-gray-700 hover:text-brandYellow">${l.label}</a>`
  ).join("\n");

  // PENTING: display:contents membuat <nav> berperilaku seperti anak langsung <body>
  // sehingga position:sticky (navbar selalu di atas saat discroll) berfungsi,
  // sama seperti struktur asli garasiban.com.
  const navHost = document.getElementById("navbar");
  navHost.style.display = "contents";
  navHost.innerHTML = `
  <nav class="sticky top-0 z-50 relative border-b border-gray-200 bg-white/90 backdrop-blur-md text-brandBlack">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="flex items-center gap-3">
          <a href="${BASE}index.html" class="flex items-center">
            <img src="${BASE}assets/img/garasiban.png" alt="Garasi Ban Indonesia" class="h-12 sm:h-14 w-auto object-contain">
          </a>
        </div>

        <div class="hidden md:flex items-center space-x-8 font-bold text-sm tracking-wide text-gray-700">
          ${desktop}
        </div>

        <div class="flex items-center gap-4">
          <a href="${BASE}katalog.html" class="hidden sm:inline-block bg-brandBlack text-brandYellow px-5 py-2.5 rounded-md font-extrabold text-sm hover:bg-gray-800 transition shadow-md flex items-center gap-2">
            <i class="fa-solid fa-magnifying-glass text-xs"></i> Cari Ban
          </a>
          <button type="button" aria-label="Buka menu" class="md:hidden text-gray-700 text-xl p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none cursor-pointer" onclick="toggleMobileMenu()">
            <i id="menu-icon" class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>

    <div id="mobile-menu" class="hidden md:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 font-bold text-sm shadow-lg">
      ${mobile}
      <a href="${BASE}katalog.html" class="flex w-full items-center justify-center text-center bg-brandBlack text-brandYellow min-h-[44px] py-3 rounded-md font-extrabold text-xs uppercase tracking-wider mt-2">Cari Ban</a>
    </div>
  </nav>`;
}

// ---------- FOOTER (data kontak dari SITE_CONTACT di js/data.js) ----------
function renderFooter() {
  const c = (typeof SITE_CONTACT !== "undefined") ? SITE_CONTACT : {};
  const footerHost = document.getElementById("footer");
  footerHost.style.display = "contents";
  footerHost.innerHTML = `
  <footer class="pt-16 pb-8 bg-white text-brandBlack border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      <div>
        <img src="${BASE}assets/img/garasiban.png" alt="Garasi Ban Indonesia" class="h-16 w-auto object-contain mb-4">
        <p class="text-sm text-gray-600 leading-relaxed">
          Penyedia ban motor terlengkap dengan standar pelayanan profesional montir balap. Keamanan dan kepuasan Anda adalah prioritas utama kami.
        </p>
      </div>
      <div>
        <h4 class="font-bold text-brandBlack text-sm uppercase mb-4 tracking-wider border-l-4 border-brandYellow pl-2">Kontak Kami</h4>
        <ul class="space-y-3 text-sm text-gray-600">
          <li><i class="fa-solid fa-phone text-brandYellow mr-2"></i><a href="tel:${c.phoneHref || ""}" class="hover:text-brandYellow transition">${c.phoneDisplay || ""}</a></li>
          <li><i class="fa-solid fa-envelope text-brandYellow mr-2"></i><a href="mailto:${c.email || ""}" class="hover:text-brandYellow transition">${c.email || ""}</a></li>
          <li><i class="fa-solid fa-location-dot text-brandYellow mr-2"></i><a href="${c.mapsUrl || "#"}" target="_blank" rel="noopener" class="hover:text-brandYellow transition">${c.address || ""}</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold text-brandBlack text-sm uppercase mb-4 tracking-wider border-l-4 border-brandYellow pl-2">Social Media</h4>
        <div class="flex space-x-3 mt-4">
          <a href="#" class="w-10 h-10 border border-gray-200 bg-gray-50 flex items-center justify-center rounded-md hover:bg-brandYellow hover:text-brandBlack transition text-lg"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" class="w-10 h-10 border border-gray-200 bg-gray-50 flex items-center justify-center rounded-md hover:bg-brandYellow hover:text-brandBlack transition text-lg"><i class="fa-brands fa-facebook"></i></a>
          <a href="#" class="w-10 h-10 border border-gray-200 bg-gray-50 flex items-center justify-center rounded-md hover:bg-brandYellow hover:text-brandBlack transition text-lg"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
      &copy; 2026 Garasi Ban Indonesia. All Rights Reserved.
    </div>
  </footer>`;
}

// ---------- DAFTAR BERITA & SEKSI "BACA JUGA" (dari data di js/data.js) ----------
// Daftar kartu berita untuk halaman berita.html — dirender dari NEWS_POSTS
function renderNewsList() {
  const host = document.getElementById("news-list");
  if (!host) return;
  host.innerHTML = NEWS_POSTS.map(p => `
    <article class="card-hover cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm transition duration-300 border border-gray-200/80 flex flex-col justify-between group" data-href="${BASE}berita/${p.slug}.html" onclick="cardNavigate(event, this)">
      <div>
        <div class="h-48 overflow-hidden relative bg-gray-100">
          <a href="${BASE}berita/${p.slug}.html">
            <img src="${BASE}${p.image}" alt="${p.title}" class="w-full h-full object-cover transition duration-500">
          </a>
        </div>
        <div class="p-6">
          <div class="flex items-center gap-3 text-xs text-gray-400 font-semibold mb-2">
            <span><i class="fa-regular fa-calendar text-brandYellow me-1"></i> ${p.date}</span>
            <span>&bull;</span>
            <span><i class="fa-regular fa-eye text-brandYellow me-1"></i> ${p.views} views</span>
          </div>
          <h3 class="font-extrabold text-base text-brandBlack leading-snug line-clamp-2 group-hover:text-amber-500 transition">
            <a href="${BASE}berita/${p.slug}.html">${p.title}</a>
          </h3>
          <p class="text-xs text-gray-600 mt-3 line-clamp-3 leading-relaxed">${p.excerpt}</p>
        </div>
      </div>
      <div class="px-6 pb-6 pt-0">
        <a href="${BASE}berita/${p.slug}.html" class="inline-flex items-center gap-2 text-xs font-extrabold text-brandBlack hover:text-amber-500 transition uppercase tracking-wider">
          Baca Selengkapnya <i class="fa-solid fa-arrow-right text-xs"></i>
        </a>
      </div>
    </article>`).join("\n");
}

// Acak urutan daftar (Fisher-Yates) — dipakai mode "random" baca juga
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Seksi "Baca Juga Berita Lainnya" di bawah setiap artikel.
// Jumlah & isinya diatur lewat NEWS_SETTINGS di js/data.js (lihat komentar di sana).
function initRelatedNews() {
  const host = document.getElementById("related-news");
  if (!host || typeof NEWS_POSTS === "undefined") return;

  // Slug artikel yang sedang dibaca = nama file tanpa .html
  const slugIni = location.pathname.split("/").pop().replace(/\.html$/, "");

  let daftar;
  const pilihan = NEWS_SETTINGS.pilihan;
  const kandidat = NEWS_POSTS.filter(p => p.slug !== slugIni); // selalu kecualikan artikel ini
  if (Array.isArray(pilihan)) {
    // Mode manual: ambil sesuai urutan slug yang ditentukan user
    daftar = pilihan.map(s => NEWS_POSTS.find(p => p.slug === s)).filter(Boolean);
  } else if (pilihan === "random") {
    // Mode acak: urutan diacak setiap halaman dimuat
    daftar = shuffleArray(kandidat);
  } else {
    // Mode "otomatis": berita terbaru dulu (urutan di NEWS_POSTS)
    daftar = kandidat;
  }
  daftar = daftar.slice(0, NEWS_SETTINGS.jumlahTampil);

  if (!daftar.length) { host.closest("div.mt-10")?.classList.add("hidden"); return; }

  host.innerHTML = daftar.map(p => `
    <a href="${p.slug}.html" class="group flex gap-4 bg-white rounded-xl border border-gray-200/80 p-3 shadow-sm hover:border-brandYellow transition">
      <img src="${BASE}${p.image}" alt="${p.title}" class="w-20 h-20 rounded-lg object-cover flex-shrink-0">
      <div class="flex flex-col justify-center min-w-0">
        <span class="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Tips &amp; Artikel &bull; ${p.date}</span>
        <h4 class="text-sm font-bold text-brandBlack leading-snug group-hover:text-amber-500 transition line-clamp-3">${p.title}</h4>
      </div>
    </a>`).join("\n");
}

// Kartu bengkel rekanan untuk halaman bengkel-rekanan.html — dirender dari WORKSHOPS
function renderWorkshops() {
  const host = document.getElementById("workshop-list");
  if (!host || typeof WORKSHOPS === "undefined") return;
  host.innerHTML = WORKSHOPS.map((w, i) => `
    <div class="card-hover bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row md:h-72 transition">
      <div class="w-full md:w-1/3 h-52 md:h-full relative bg-gray-100 shrink-0">
        <img src="${w.image}" alt="${w.name}" class="w-full h-full object-cover">
        <span class="absolute top-3 left-3 bg-brandBlack text-brandYellow text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide shadow-sm">
          Cabang ${String(i + 1).padStart(2, "0")}
        </span>
      </div>

      <div class="p-5 sm:p-6 flex flex-col justify-between flex-grow">
        <div>
          <div class="flex justify-between items-start gap-4">
            <div>
              <h2 class="text-lg sm:text-xl font-extrabold text-brandBlack">${w.name}</h2>
            </div>
            <div class="text-brandYellow text-xl hidden sm:block"><i class="fa-solid fa-warehouse"></i></div>
          </div>

          <p class="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 leading-relaxed md:line-clamp-2" title="${w.address}">
            <i class="fa-solid fa-location-dot text-gray-400 mr-2"></i> ${w.address}
          </p>

          <div class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100 text-xs">
            <div>
              <h4 class="font-bold text-gray-400 uppercase tracking-wider text-[10px]">Jam Operasional</h4>
              <p class="text-gray-700 font-semibold mt-1">${w.hours}</p>
            </div>
            <div>
              <h4 class="font-bold text-gray-400 uppercase tracking-wider text-[10px]">Koordinat GPS</h4>
              <p class="text-gray-700 font-semibold mt-1">${w.gps}</p>
            </div>
          </div>
        </div>

        <div class="mt-6 flex flex-col sm:flex-row gap-3">
          <a href="${w.mapsUrl}" target="_blank" rel="noopener" class="inline-flex w-full sm:w-auto bg-brandYellow hover:bg-yellow-400 text-brandBlack font-bold px-6 py-2.5 rounded-lg text-xs transition uppercase tracking-wider text-center items-center justify-center gap-2 shadow-sm">
            <i class="fa-solid fa-map-location-dot"></i> Petunjuk Rute Maps
          </a>
        </div>
      </div>
    </div>`).join("\n");
}

// ---------- FILTER UKURAN & MERK (dipakai Home & Katalog) ----------
// Ukuran hanya relevan untuk ban: opsi dropdown diambil dari produk ban saja
// (kategori grup "Ban Motor", atau nama/kategori/keywords mengandung kata "ban").
// Produk lain (busi, wax, aki, dll.) tidak ikut menyumbang opsi ukuran.
function isBanProduct(p) {
  const cat = CATEGORIES.find(c => c.name === p.category);
  if (cat && cat.parent === "Ban Motor") return true;
  const text = [p.name, p.category, p.keywords || ""].join(" ").toLowerCase();
  return /\bban\b/.test(text); // kata "ban" berdiri sendiri (bukan di dalam kata lain)
}

// Ukuran dibaca dari teks nama/keywords produk (mis. "120/70-17", "ring 17")
// atau field opsional rim:/width: di data produk. Opsi dropdown dibangun dari
// data nyata — jadi tidak pernah ada opsi yang menghasilkan 0 produk karena salah ketik.
function sizeOptions() {
  const widths = new Set(), rims = new Set();
  // Opsi manual tambahan dari data.js (SIZE_EXTRA) — untuk ukuran yang belum ada produknya
  const extra = (typeof SIZE_EXTRA !== "undefined") ? SIZE_EXTRA : {};
  (extra.widths || []).forEach(n => widths.add(String(n)));
  (extra.rims || []).forEach(n => rims.add(String(n)));
  PRODUCTS.forEach(p => {
    if (!isBanProduct(p)) return; // hanya produk ban yang menyumbang opsi ukuran
    PRODUCT_VARIANTS(p).forEach(v => {
      const rimVarian = (v.rim !== undefined && v.rim !== null) ? v.rim : p.rim;
      const text = [p.name, p.keywords || "", v.label || ""].join(" ");
      if (v.width) widths.add(String(v.width));
      if (rimVarian) rims.add(String(rimVarian));
      (text.match(/(\d{2,3})\s*\//g) || []).forEach(m => {
        const n = parseInt(m, 10);
        if (n >= 70 && n <= 250) widths.add(String(n));   // lebar ban wajar: 70-250mm (di bawah 70 = bohlam/watt, bukan ban)
      });
      (text.match(/(?:ring\s*|r|[-\/])(\d{1,2})\b/gi) || []).forEach(m => {
        const n = parseInt(m.replace(/[^\d]/g, ""), 10);
        if (n >= 10 && n <= 21) rims.add(String(n));      // ring wajar: 10-21 inci
      });
      // Format "13 - NAMA PRODUK": angka di awal nama = ring
      const awalan = (p.name || "").match(/^\s*(\d{1,2})\s*[-\u2013]/);
      if (awalan) {
        const n = parseInt(awalan[1], 10);
        if (n >= 10 && n <= 21) rims.add(String(n));
      }
    });
  });
  const num = (a, b) => a - b;
  return { widths: [...widths].sort(num), rims: [...rims].sort(num) };
}

// Cocokkan produk dengan filter lebar/ring yang dipilih (dari Home atau katalog).
// Produk multi-varian lolos jika SALAH SATU variannya memenuhi kedua syarat.
function sizeMatch(p, filters) {
  const { width, rim } = filters;
  if (!width && !rim) return true;
  const awalanRim = ((p.name || "").match(/^\s*(\d{1,2})\s*[-\u2013]/) || [])[1];
  return PRODUCT_VARIANTS(p).some(v => {
    const vrim = (v.rim !== undefined && v.rim !== null) ? v.rim : p.rim;
    const text = [p.name, v.label || "", p.keywords || ""].join(" ").toLowerCase();
    if (rim) {
      const n = String(rim).replace(/^r/i, "");
      const ok = (vrim && String(vrim) === n) || awalanRim === n ||
        new RegExp(`(?:r|ring\\s*)${n}\\b|[-\\/]${n}\\b`).test(text);
      if (!ok) return false;
    }
    if (width) {
      const ok = (v.width && String(v.width) === String(width)) || new RegExp(`${width}\\s*[/\\-]`).test(text);
      if (!ok) return false;
    }
    return true;
  });
}

// Isi dropdown Lebar/Ring/Merk di semua form cari (mis. halaman Home) dari data produk
function initSizeFilters() {
  const forms = document.querySelectorAll('form[action="katalog.html"]');
  if (!forms.length) return;
  const { widths, rims } = sizeOptions();
  const brands = [...new Set(PRODUCTS.map(p => p.brand))].sort();
  forms.forEach(form => {
    if (form.closest("#katalog-app")) return; // dropdown katalog dirender lengkap oleh renderKatalog() — jangan diganti
    const w = form.querySelector('select[name="width"]');
    const r = form.querySelector('select[name="rim_size"]');
    const b = form.querySelector('select[name="brand"]');
    if (w) w.innerHTML = '<option value="">Semua Ukuran</option>' + widths.map(x => `<option value="${x}">${x}</option>`).join("");
    if (r) r.innerHTML = '<option value="">Semua Ring</option>' + rims.map(x => `<option value="R${x}">Ring ${x}</option>`).join("");
    if (b) b.innerHTML = '<option value="">Semua Merk</option>' + brands.map(x => `<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`).join("");
  });
}

// Dropdown filter di katalog: simpan pilihan ke URL lalu render ulang tanpa reload
function onFilterChange(select) {
  const params = new URLSearchParams(window.location.search);
  if (select.value) params.set(select.name, select.value);
  else params.delete(select.name);
  params.delete("per_page"); // filter baru → kembali ke halaman 1
  history.replaceState(null, "", "katalog.html" + (params.toString() ? "?" + params.toString() : ""));
  renderResultsLive(document.querySelector('form input[name="search"]')?.value || "");
  perbaruiBadgeFilter();
}

// ---------- MENU MOBILE & SIDEBAR KATEGORI (MOBILE) ----------
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    icon.classList.replace('fa-bars', 'fa-xmark');
  } else {
    menu.classList.add('hidden');
    icon.classList.replace('fa-xmark', 'fa-bars');
  }
}

// Menu mobile menutupi konten (overlay): tutup otomatis saat klik link di dalamnya
// atau klik di luar area menu + tombol hamburger.
document.addEventListener("click", e => {
  const menu = document.getElementById("mobile-menu");
  if (!menu || menu.classList.contains("hidden")) return;
  if (e.target.closest("#mobile-menu") || e.target.closest('[onclick*="toggleMobileMenu"]')) return;
  toggleMobileMenu();
});
document.addEventListener("click", e => {
  const link = e.target.closest("#mobile-menu a");
  if (link) {
    const menu = document.getElementById("mobile-menu");
    const icon = document.getElementById("menu-icon");
    menu.classList.add("hidden");
    if (icon) icon.classList.replace("fa-xmark", "fa-bars");
  }
});

function toggleLeftPane() {
  const pane = document.getElementById('left-pane');
  const overlay = document.getElementById('left-pane-overlay');
  if (pane.classList.contains('-translate-x-full')) {
    pane.classList.remove('-translate-x-full');
    pane.classList.add('translate-x-0');
    overlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  } else {
    pane.classList.remove('translate-x-0');
    pane.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

// ---------- PRODUK CARD ----------
// Teks pesan WA untuk satu varian produk (atau produk tanpa varian)
function variantWaText(p, v) {
  const nama = v && v.label ? `${p.name} (${v.label})` : p.name;
  const sku = (v && v.sku) ? v.sku : p.sku;
  return "Halo+Garasi+Ban%2C+saya+berminat+dengan+produk%3A+" +
    encodeURIComponent(nama).replace(/%20/g, "+") +
    "+%28SKU%3A+" + encodeURIComponent(sku).replace(/%20/g, "+") + "%29";
}

function productCard(p) {
  const imagesJson = JSON.stringify(p.images).replace(/"/g, "&quot;");
  const varianJson = JSON.stringify(PRODUCT_VARIANTS(p)).replace(/"/g, "&quot;");
  const watexts = PRODUCT_VARIANTS(p).map(v => variantWaText(p, v));
  const watextsJson = JSON.stringify(watexts).replace(/"/g, "&quot;");
  const waText = watexts[0];
  const displayTitle = (p.variant && p.variant !== "-") ? `${p.name} - ${p.variant}` : p.name;
  const harga = productStartingPrice(p);
  const jumlahVarian = PRODUCT_VARIANTS(p).length;

  return `
  <div class="card-hover cursor-pointer bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition flex flex-col justify-between group"
       onclick="cardOpenDetail(event, this)"
       data-name="${p.name}"
       data-brand="${p.brand}"
       data-category="${p.category}"
       data-price="${harga.text}"
       data-variants="${varianJson}"
       data-watexts="${watextsJson}"
       data-sku="${p.sku}"
       data-variant="${p.variant}"
       data-weight="${p.weight}"
       data-description="${p.description || "Belum ada deskripsi spesifik untuk produk ini."}"
       data-images='${imagesJson}'
       data-watext="${waText}">
    <div>
      <div class="aspect-square bg-gray-100 relative overflow-hidden product-image-box cursor-pointer" data-images='${imagesJson}'>
        <span class="absolute top-2 left-2 z-10 max-w-[calc(100%-1rem)] truncate bg-brandBlack text-brandYellow text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded uppercase tracking-wider">${p.category}</span>
        ${jumlahVarian > 1 ? `<span class="absolute top-2 right-2 z-10 bg-brandYellow text-brandBlack text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded uppercase tracking-wider">${jumlahVarian} Ukuran</span>` : ""}

        <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-contain transition-transform duration-500 main-img">
      </div>

      <div class="p-3 sm:p-4">
        <h4 class="font-bold text-gray-500 uppercase tracking-wider text-[9px] sm:text-[11px]">${p.brand}</h4>
        <h3 class="font-extrabold text-brandBlack text-xs sm:text-base mt-0.5 line-clamp-2 leading-tight" title="${p.name}">
          ${displayTitle}
        </h3>
        <p class="text-brandBlack font-extrabold text-sm sm:text-lg mt-1 sm:mt-2">${harga.multi ? `<span class="block text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mulai dari</span>` : ""}${harga.text}</p>
      </div>
    </div>

    <div class="p-3 sm:p-4 pt-0">
      <a href="https://wa.me/${WA_NUMBER}?text=${waText}" target="_blank" class="w-full bg-brandYellow hover:bg-yellow-400 text-brandBlack font-bold min-h-[44px] py-2.5 rounded-lg text-[10px] sm:text-xs transition uppercase tracking-wide flex items-center justify-center gap-1.5">
        <i class="fa-brands fa-whatsapp text-xs sm:text-sm"></i> <span class="hidden xs:inline">Hubungi Admin</span><span class="inline xs:hidden">Chat</span>
      </a>
    </div>
  </div>`;
}

// ---------- MODAL DETAIL PRODUK ----------
function showDetailModal(el) {
  const data = el.dataset;
  let variants = [];
  try { variants = JSON.parse(data.variants || "[]"); } catch (e) { variants = []; }
  if (!variants.length) variants = [{ label: "", price: data.price, priceValue: null, sku: data.sku }];
  let watexts = [];
  try { watexts = JSON.parse(data.watexts || "[]"); } catch (e) { watexts = []; }

  document.getElementById('modal-name').innerText = data.name;
  document.getElementById('modal-brand').innerText = data.brand;
  document.getElementById('modal-category').innerText = data.category;
  document.getElementById('modal-sku').innerText = data.sku;
  document.getElementById('modal-weight').innerText = data.weight;
  document.getElementById('modal-description').innerText = data.description;
  const varEl = document.getElementById('modal-variant');
  if (varEl) varEl.innerText = variants.length > 1 ? "-" : (variants[0].label || data.variant || "-");

  // Harga & tombol WA mengikuti ukuran yang dipilih (multi-varian)
  const box = document.getElementById('modal-variant-box');
  const priceEl = document.getElementById('modal-price');
  const waBtn = document.getElementById('modal-wa-btn');

  function applyVariant(i) {
    const v = variants[i] || variants[0];
    priceEl.innerText = v.price || data.price;
    const t = watexts[i] || data.watext || "";
    waBtn.href = "https://wa.me/" + WA_NUMBER + "?text=" + t;
    box.querySelectorAll("button[data-vi]").forEach(b => {
      const aktif = parseInt(b.dataset.vi, 10) === i;
      b.className = aktif
        ? "px-4 min-h-[44px] rounded-lg text-xs font-bold border transition bg-brandBlack text-brandYellow border-brandBlack"
        : "px-4 min-h-[44px] rounded-lg text-xs font-bold border transition bg-white text-gray-700 border-gray-200 hover:border-brandYellow";
    });
  }

  if (variants.length > 1 && box) {
    box.innerHTML = `
      <span class="text-gray-400 font-semibold block">Pilih Ukuran:</span>
      <div class="flex flex-wrap gap-1.5 mt-1">
        ${variants.map((v, i) => `<button type="button" data-vi="${i}" class="px-3 py-1.5 rounded-lg text-xs font-bold border transition">${escapeHtml(v.label || String(i + 1))}</button>`).join("")}
      </div>`;
    box.querySelectorAll("button[data-vi]").forEach(b => {
      b.addEventListener("click", () => applyVariant(parseInt(b.dataset.vi, 10)));
    });
  }
  applyVariant(0);

  const images = JSON.parse(data.images || '[]');
  const displayImg = document.getElementById('modal-img-display');
  const thumbsContainer = document.getElementById('modal-thumbnails');

  thumbsContainer.innerHTML = '';
  if (images.length > 0) {
    displayImg.src = images[0];
    images.forEach((imgUrl, idx) => {
      const thumb = document.createElement('img');
      thumb.src = imgUrl;
      thumb.className = `w-12 h-12 object-cover rounded-md border-2 cursor-pointer transition ${idx === 0 ? 'border-brandYellow' : 'border-gray-200'}`;
      thumb.onclick = () => {
        displayImg.src = imgUrl;
        thumbsContainer.querySelectorAll('img').forEach(t => t.classList.replace('border-brandYellow', 'border-gray-200'));
        thumb.classList.replace('border-gray-200', 'border-brandYellow');
      };
      thumbsContainer.appendChild(thumb);
    });
  }

  const modal = document.getElementById('modal-detail');
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeDetailModal() {
  const modal = document.getElementById('modal-detail');
  modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

// Klik di mana saja pada kartu produk (gambar/judul/harga) membuka modal.
// Klik link Chat/WA tetap menjalankan aksinya dan tidak membuka modal.
// Data detail produk disimpan sebagai data-* pada elemen kartu itu sendiri.
function cardOpenDetail(event, card) {
  if (event.target.closest('a')) return;
  showDetailModal(card);
}

// Klik di mana saja pada kartu navigasi (kategori di Home, artikel di Berita)
// menuju tautan yang disimpan di data-href pada kartu.
// Klik pada <a> di dalam kartu tetap berjalan normal (termasuk ctrl/middle-click).
function cardNavigate(event, card) {
  if (event.defaultPrevented) return;
  if (event.target.closest('a')) return;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const href = card.dataset.href;
  if (href) window.location.href = href;
}

// ---------- HOVER SLIDESHOW GAMBAR PRODUK ----------
// Efek hover hanya aktif di perangkat dengan kursor asli (desktop).
// Di layar sentuh, tap tidak boleh memicu slideshow yang tak pernah berhenti.
function supportsHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function initHoverSlideshow() {
  if (!supportsHover()) return; // lewati pemasangan listener di perangkat sentuh

  document.querySelectorAll('.product-image-box').forEach(box => {
    let intervalId = null;
    const imgElement = box.querySelector('.main-img');
    if (!imgElement) return;
    let images = [];
    try { images = JSON.parse(box.getAttribute('data-images') || '[]'); } catch (e) { images = []; }
    const originalSrc = imgElement.src;

    if (images.length > 1) {
      box.addEventListener('mouseenter', () => {
        let index = 0;
        intervalId = setInterval(() => {
          index = (index + 1) % images.length;
          imgElement.src = images[index];
        }, 1000);
      });
      box.addEventListener('mouseleave', () => {
        if (intervalId) clearInterval(intervalId);
        imgElement.src = originalSrc;
      });
    }
  });
}

// ============================================================
// ENGINE KATALOG
// ============================================================
// URL dibaca FRESH setiap dipakai (bukan snapshot saat load) agar render ulang
// tanpa reload (kategori/sort/pagination live) selalu memakai state URL terkini.
function urlParams() {
  return new URLSearchParams(window.location.search);
}

function activeCategory() {
  const id = parseInt(urlParams().get("category") || "", 10);
  if (isNaN(id)) return null;
  return CATEGORIES.find(c => c.id === id) || null;
}

// Jika kategori induk dipilih, filter mencakup semua sub-kategorinya
function activeCategoryNames() {
  const cat = activeCategory();
  if (!cat) return null;
  if (cat.parent === cat.name) {
    return CATEGORIES.filter(c => c.parent === cat.name).map(c => c.name);
  }
  return [cat.name];
}

// Pencarian multi-kata: tiap kata HARUS cocok (AND) di salah satu bidang
// nama produk / brand / kategori / grup induk / keywords (OR antar bidang).
// Contoh "ban tubeless": kata "ban" kena kategori, kata "tubeless" kena judul.
// Bidang keywords berisi istilah sehari-hari (mis. "sokbrek", "accu", "sampo")
// yang sering diketik user tapi tidak ada di nama produk resmi.
function matchQuery(p, q) {
  const words = q.split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const cat = CATEGORIES.find(c => c.name === p.category);
  const parentName = cat ? cat.parent : "";
  const labelVarian = PRODUCT_VARIANTS(p).map(v => v.label || "").join(" ");
  const haystack = [p.name, p.brand, p.category, parentName, p.keywords || "", labelVarian].join(" ").toLowerCase();
  return words.every(w => haystack.includes(w));
}

function applySort(list, sort) {
  // Produk multi-varian diurutkan memakai harga varian termurahnya
  if (sort === "price_low")  list.sort((a, b) => (sortPriceValue(a) ?? Infinity)  - (sortPriceValue(b) ?? Infinity));
  if (sort === "price_high") list.sort((a, b) => (sortPriceValue(b) ?? -Infinity) - (sortPriceValue(a) ?? -Infinity));
  return list;
}

// qOverride/sortOverride dipakai live search (nilai langsung dari UI, bukan dari URL)
// filterOverrides = { width, rim, brand } dari dropdown filter (fallback: URL)
function getFilteredProducts(qOverride, sortOverride, filterOverrides) {
  const catNames = activeCategoryNames();
  const q = (qOverride !== undefined ? qOverride : (urlParams().get("search") || "")).trim().toLowerCase();
  const sort = sortOverride !== undefined ? sortOverride : (urlParams().get("sort") || "");
  const f = filterOverrides || {
    width: urlParams().get("width") || "",
    rim: urlParams().get("rim_size") || "",
    brand: urlParams().get("brand") || ""
  };

  let list = PRODUCTS.slice();
  if (catNames) list = list.filter(p => catNames.includes(p.category));
  if (q) list = list.filter(p => matchQuery(p, q));
  if (f.brand) list = list.filter(p => p.brand.toLowerCase() === f.brand.toLowerCase());
  list = list.filter(p => sizeMatch(p, f));
  return applySort(list, sort);
}

// ---------- HELPER RENDER HASIL (dipakai render awal & live search) ----------
// Infinity scroll: grid dirender bertahap; di bawahnya ada counter progres.
function renderGridHTML(pageItems, total) {
  if (!pageItems.length) {
    return `<div class="bg-white rounded-xl border border-gray-200 p-12 text-center">
         <i class="fa-solid fa-box-open text-4xl text-gray-300 mb-3"></i>
         <h4 class="font-bold text-gray-700">Produk Tidak Ditemukan</h4>
         <p class="text-xs text-gray-500 mt-1">Coba ubah kata kunci, kategori, atau filter lebar/ring/merk di atas.</p>
       </div>`;
  }
  const info = (typeof total === "number" && total > pageItems.length)
    ? `<p class="produk-counter text-center text-xs text-gray-400 mt-6">Menampilkan ${pageItems.length} dari ${total} produk — scroll ke bawah untuk memuat lagi</p>`
    : (typeof total === "number" ? `<p class="produk-counter text-center text-xs text-gray-400 mt-6">Semua ${total} produk ditampilkan</p>` : "");
  return `<div class="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">${pageItems.map(productCard).join("\n")}</div>${info}`;
}

function renderSearchInfoHTML(total, q) {
  return q
    ? `<p class="mb-4 text-xs sm:text-sm text-gray-500">
         <strong class="text-brandBlack">${total}</strong> produk ditemukan untuk
         &ldquo;<strong class="text-brandBlack">${escapeHtml(q)}</strong>&rdquo;
       </p>`
    : "";
}

function renderCategorySidebar() {
  const active = activeCategory();
  // Urutan grup dibaca dari CATEGORY_ORDER di js/data.js (bisa diatur user)
  const order = (typeof CATEGORY_ORDER !== "undefined" && CATEGORY_ORDER.length)
    ? CATEGORY_ORDER
    : [...new Set(CATEGORIES.map(c => c.parent))]; // fallback: urutan kemunculan di data

  const groups = order.map(parent => {
    // Anak kategori: kecualikan baris induk itu sendiri; id induk diambil dari baris induk
    const parentRow = CATEGORIES.find(c => c.parent === parent && c.name === parent);
    const parentId = parentRow ? parentRow.id : "";
    // Salah satu anak dari grup ini sedang terpilih → sorot judul grupnya
    const isParentActive = !!active && active.parent === parent;
    const items = CATEGORIES.filter(c => c.parent === parent && c.name !== parent);
    const subItems = items.map(c => {
      const isActive = active && active.name === c.name;
      // Kategori terpilih: teks kuning + titik penanda, jelas terlihat di desktop & mobile drawer
      const cls = isActive
        ? "transition block font-semibold text-amber-500 py-3"
        : "hover:text-brandBlack transition block py-3";
      return `<li><a href="katalog.html?category=${c.id}" class="${cls}" ${isActive ? 'aria-current="page"' : ""}>${c.name}</a></li>`;
    }).join("\n");

    return `
      <div>
        <a href="katalog.html?category=${parentId}" class="font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 mb-2 transition ${isParentActive ? "text-amber-500" : "text-brandBlack hover:text-amber-500"}">
          <i class="fa-solid fa-circle-dot text-brandYellow text-[10px]"></i> ${parent}
        </a>
        <ul class="pl-4 space-y-2 border-l border-gray-200 text-gray-600 font-medium">
          ${subItems}
        </ul>
      </div>`;
  }).join("\n");

  return `
  <aside id="left-pane" class="fixed inset-y-0 left-0 z-50 w-72 bg-white p-6 shadow-xl transform -translate-x-full transition-transform duration-300 ease-in-out overflow-y-auto custom-scrollbar lg:relative lg:transform-none lg:z-0 lg:w-1/4 lg:p-6 lg:shadow-sm lg:rounded-xl lg:border lg:border-gray-200 lg:h-fit lg:max-h-[85vh] lg:sticky lg:top-28">
    <div class="flex items-center justify-between lg:hidden mb-6 border-b border-gray-100 pb-3">
      <span class="text-brandBlack font-extrabold text-lg flex items-center gap-2">
        <i class="fa-solid fa-bars-staggered text-brandYellow"></i> Kategori
      </span>
      <button class="text-gray-500 hover:text-brandBlack text-lg p-1" onclick="toggleLeftPane()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
      <h3 class="hidden lg:flex text-brandBlack font-extrabold text-lg items-center gap-2">
        <i class="fa-solid fa-bars-staggered text-brandYellow"></i> Kategori Produk
      </h3>
      <a href="katalog.html" class="text-xs text-amber-600 font-bold hover:underline">Reset</a>
    </div>

    <div class="space-y-5 text-sm">${groups}</div>
  </aside>`;
}

// ---------- INFINITY SCROLL (pengganti pagination) ----------
// Hasil filter dirender bertahap: PER_PAGE produk pertama, lalu +PER_PAGE setiap
// kali sentinel menyentuh viewport (IntersectionObserver). Loading terasa instan
// walau produk ratusan — hanya sebagian kecil kartu yang dirender di awal.
const KATALOG_STATE = { shown: PER_PAGE, observer: null };

function sentinelHTML() {
  return `<div id="load-more-sentinel" class="h-10"></div>`;
}

function initInfinityScroll() {
  const sentinel = document.getElementById("load-more-sentinel");
  if (!sentinel) return;
  if (KATALOG_STATE.observer) KATALOG_STATE.observer.disconnect();
  KATALOG_STATE.observer = new IntersectionObserver(entries => {
    if (entries.some(en => en.isIntersecting)) loadMoreProducts();
  }, { rootMargin: "400px 0px" }); // mulai memuat sedikit sebelum sentinel terlihat
  KATALOG_STATE.observer.observe(sentinel);
}

function perbaruiCounter(tampil, total) {
  const el = document.querySelector("#hasil-produk .produk-counter");
  if (!el) return;
  el.textContent = tampil >= total
    ? `Semua ${total} produk ditampilkan`
    : `Menampilkan ${tampil} dari ${total} produk — scroll ke bawah untuk memuat lagi`;
}

function loadMoreProducts() {
  const sentinel = document.getElementById("load-more-sentinel");
  if (!sentinel || sentinel.dataset.busy) return;
  const region = document.getElementById("hasil-produk");
  if (!region) return;

  // Baca ulang kondisi filter terkini (sama seperti renderResultsLive)
  const qInput = document.querySelector('form input[name="search"]');
  const sortSel = document.querySelector('form select[name="sort"]');
  const list = getFilteredProducts(
    qInput ? qInput.value : undefined,
    sortSel ? sortSel.value : undefined,
    {
      width: document.querySelector('form select[name="width"]')?.value || "",
      rim: document.querySelector('form select[name="rim_size"]')?.value || "",
      brand: document.querySelector('form select[name="brand"]')?.value || ""
    }
  );
  if (KATALOG_STATE.shown >= list.length) { sentinel.remove(); return; }

  sentinel.dataset.busy = "1";
  const tambahan = list.slice(KATALOG_STATE.shown, KATALOG_STATE.shown + PER_PAGE);
  KATALOG_STATE.shown += tambahan.length;

  const grid = region.querySelector(".grid");
  if (grid) grid.insertAdjacentHTML("beforeend", tambahan.map(productCard).join("\n"));
  perbaruiCounter(KATALOG_STATE.shown, list.length);
  initHoverSlideshow();

  if (KATALOG_STATE.shown >= list.length) sentinel.remove();
  else delete sentinel.dataset.busy;
}

function renderKatalog() {
  const app = document.getElementById("katalog-app");
  if (!app) return;

  const cat = activeCategory();
  const list = getFilteredProducts();
  // Infinity scroll: render awal hanya PER_PAGE produk pertama
  KATALOG_STATE.shown = Math.min(PER_PAGE, list.length);
  const pageItems = list.slice(0, KATALOG_STATE.shown);
  const sort = urlParams().get("sort") || "";

  const grid = renderGridHTML(pageItems, list.length);

  // Info jumlah hasil pencarian: hanya tampil jika ada query search di URL
  const q = (urlParams().get("search") || "").trim();
  const searchInfo = renderSearchInfoHTML(list.length, q);

  // Panel kategori punya scroll internal sendiri (desktop: max-h 85vh). Tanpa ini,
  // setiap klik kategori me-reset posisi scroll di dalam panelnya ke paling atas.
  const sidebarScroll = document.getElementById("left-pane")?.scrollTop || 0;

  app.innerHTML = `
  <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
    <div id="left-pane-overlay" class="fixed inset-0 bg-black/50 z-50 hidden lg:hidden transition-opacity duration-300" onclick="toggleLeftPane()"></div>

    ${renderCategorySidebar()}

    <main class="w-full lg:w-3/4">
      <form method="GET" action="katalog.html" class="sticky top-20 z-30 bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row flex-wrap gap-4 justify-between items-center shadow-md">
        ${cat ? `<input type="hidden" name="category" value="${cat.id}">` : ""}

        <div class="flex items-center gap-2 w-full sm:w-72">
          <button type="button" class="lg:hidden bg-brandBlack text-white p-3 rounded-lg text-xs font-bold flex items-center gap-2 flex-shrink-0" onclick="toggleLeftPane()">
            <i class="fa-solid fa-filter text-brandYellow"></i> Kategori
          </button>
          <div class="relative w-full">
            <input type="text" name="search" value="${urlParams().get("search") || ""}" placeholder="Cari nama, kategori, atau merek..." enterkeyhint="search" oninput="onSearchInput(this)" class="w-full bg-gray-50 border border-gray-200 text-base sm:text-sm py-2.5 pl-10 pr-8 rounded-lg focus:outline-none focus:border-brandYellow font-semibold">
            <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-gray-400 text-xs"></i>
            <button type="button" onclick="clearSearch()" title="Hapus pencarian" aria-label="Hapus pencarian" class="search-clear hidden absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 text-white text-[10px] items-center justify-center transition">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Mobile: dropdown filter disembunyikan di balik tombol ini agar bar sticky ramping -->
          <button type="button" class="sm:hidden bg-brandBlack text-white px-3 py-3 rounded-lg text-xs font-bold flex items-center gap-1.5 flex-shrink-0" onclick="toggleFilterDropdown()" aria-expanded="false" aria-controls="filter-dropdown">
            <i class="fa-solid fa-sliders text-brandYellow"></i>
            <span class="hidden xs:inline">Filter</span>
            <span id="filter-badge" class="hidden min-w-[18px] h-[18px] px-1 bg-brandYellow text-brandBlack text-[10px] font-extrabold rounded-full items-center justify-center">0</span>
          </button>
        </div>

        <!-- Desktop: dropdown selalu tampil; Mobile: tersembunyi sampai tombol Filter diklik -->
        <div id="filter-dropdown" class="hidden grid grid-cols-2 gap-3 w-full sm:flex sm:flex-wrap sm:gap-4 sm:w-auto">
        <div class="w-full sm:w-40">
          <select name="width" onchange="onFilterChange(this)" class="w-full bg-gray-50 border border-gray-200 text-base sm:text-xs font-bold py-2.5 px-4 rounded-lg focus:outline-none">
            <option value="" ${!urlParams().get("width") ? "selected" : ""}>Lebar: Semua</option>
            ${sizeOptions().widths.map(w => `<option value="${w}" ${urlParams().get("width") === w ? "selected" : ""}>Lebar: ${w}</option>`).join("")}
          </select>
        </div>

        <div class="w-full sm:w-40">
          <select name="rim_size" onchange="onFilterChange(this)" class="w-full bg-gray-50 border border-gray-200 text-base sm:text-xs font-bold py-2.5 px-4 rounded-lg focus:outline-none">
            <option value="" ${!urlParams().get("rim_size") ? "selected" : ""}>Ring: Semua</option>
            ${sizeOptions().rims.map(r => `<option value="R${r}" ${urlParams().get("rim_size") === "R" + r ? "selected" : ""}>Ring ${r}</option>`).join("")}
          </select>
        </div>

        <div class="w-full sm:w-40">
          <select name="brand" onchange="onFilterChange(this)" class="w-full bg-gray-50 border border-gray-200 text-base sm:text-xs font-bold py-2.5 px-4 rounded-lg focus:outline-none">
            <option value="" ${!urlParams().get("brand") ? "selected" : ""}>Merk: Semua</option>
            ${[...new Set(PRODUCTS.map(p => p.brand))].sort().map(b => `<option value="${escapeHtml(b)}" ${urlParams().get("brand") === b ? "selected" : ""}>${escapeHtml(b)}</option>`).join("")}
          </select>
        </div>

        <div class="w-full sm:w-40">
          <select name="sort" onchange="onSortChange(this)" class="w-full bg-gray-50 border border-gray-200 text-base sm:text-xs font-bold py-2.5 px-4 rounded-lg focus:outline-none">
            <option value="" ${sort === "" ? "selected" : ""}>Urutkan: Terpopuler</option>
            <option value="price_low" ${sort === "price_low" ? "selected" : ""}>Harga: Terendah</option>
            <option value="price_high" ${sort === "price_high" ? "selected" : ""}>Harga: Tertinggi</option>
          </select>
        </div>
        </div>
      </form>

      <div id="hasil-produk">${searchInfo}${grid}${sentinelHTML()}</div>
    </main>
  </div>`;

  // Pulihkan posisi scroll panel kategori — user tidak kehilangan tempat di daftar
  const asideBaru = document.getElementById("left-pane");
  if (asideBaru) asideBaru.scrollTop = sidebarScroll;

  initHoverSlideshow();
  initInfinityScroll(); // aktifkan pemuatan produk berikutnya saat discroll
  const searchInput = app.querySelector('input[name="search"]');
  if (searchInput) toggleSearchClear(searchInput);

  // Katalog baru saja dirender ulang → pasang ulang dropdown custom untuk <select> yang baru
  initCustomDropdowns();
  perbaruiBadgeFilter();
}

// Escape teks agar aman disisipkan ke HTML (untuk input pengguna, mis. query search)
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

// Tombol X pada kolom search: tampil hanya saat input berisi teks
function toggleSearchClear(input) {
  const btn = input.parentElement.querySelector('.search-clear');
  if (btn) {
    const adaIsi = !!input.value.trim();
    btn.classList.toggle('hidden', !adaIsi);
    btn.classList.toggle('flex', adaIsi);
  }
}

// Klik X: bersihkan query tanpa reload — input dikosongkan & hasil langsung di-render ulang
function clearSearch() {
  const input = document.querySelector('input[name="search"]');
  if (input) {
    input.value = "";
    toggleSearchClear(input);
    input.focus();
  }
  renderResultsLive("");
}

// ---------- LIVE SEARCH: hasil muncul langsung saat mengetik ----------
let liveSearchTimer = null;

function onSearchInput(input) {
  toggleSearchClear(input);
  clearTimeout(liveSearchTimer);
  liveSearchTimer = setTimeout(() => renderResultsLive(input.value), 250);
}

// ---------- PANEL FILTER MOBILE ----------
// Bar sticky mobile hanya berisi: Kategori + pencarian + tombol Filter.
// Dropdown Lebar/Ring/Merk/Urutkan disembunyikan di balik tombol Filter.
function toggleFilterDropdown() {
  const panel = document.getElementById("filter-dropdown");
  if (!panel) return;
  const buka = panel.classList.contains("hidden"); // sedang tersembunyi → akan dibuka
  panel.classList.toggle("hidden", !buka);
  const tombol = document.querySelector('[aria-controls="filter-dropdown"]');
  if (tombol) tombol.setAttribute("aria-expanded", String(buka));
}

// Badge jumlah filter aktif (lebar/ring/merk; urutan tidak dihitung) di tombol Filter mobile
function perbaruiBadgeFilter() {
  const badge = document.getElementById("filter-badge");
  if (!badge) return;
  let n = 0;
  ["width", "rim_size", "brand"].forEach(nm => {
    if (document.querySelector(`form select[name="${nm}"]`)?.value) n++;
  });
  badge.textContent = String(n);
  badge.classList.toggle("hidden", n === 0);
  badge.classList.toggle("flex", n > 0);
}

// Dropdown urutkan: simpan pilihan ke URL lalu render ulang hasil tanpa reload
function onSortChange(select) {
  const params = new URLSearchParams(window.location.search);
  if (select.value) params.set("sort", select.value);
  else params.delete("sort");
  params.delete("per_page"); // urutan baru → kembali ke halaman 1
  history.replaceState(null, "", "katalog.html" + (params.toString() ? "?" + params.toString() : ""));
  renderResultsLive(document.querySelector('input[name="search"]')?.value || "");
}

// Render ulang area hasil (info jumlah + grid + pagination) secara live, tanpa reload.
// Query diambil dari isi input terkini, sort dari dropdown terkini — bukan dari URL.
function renderResultsLive(rawValue) {
  const region = document.getElementById("hasil-produk");
  if (!region) return;

  const qRaw = (rawValue || "").trim();
  const q = qRaw.toLowerCase();
  const sortSel = document.querySelector('form select[name="sort"]');
  const sort = sortSel ? sortSel.value : "";
  // Nilai filter ukuran/merk diambil dari dropdown terkini (bukan URL) agar live
  const filterSel = {
    width: document.querySelector('form select[name="width"]')?.value || "",
    rim: document.querySelector('form select[name="rim_size"]')?.value || "",
    brand: document.querySelector('form select[name="brand"]')?.value || ""
  };
  const list = getFilteredProducts(q, sort, filterSel);

  // Infinity scroll: setiap perubahan filter/pencarian → mulai lagi dari PER_PAGE pertama
  KATALOG_STATE.shown = Math.min(PER_PAGE, list.length);
  const pageItems = list.slice(0, KATALOG_STATE.shown);

  // Sinkronkan URL DULU tanpa reload (agar hasil bisa di-share/di-bookmark),
  // mengetik selalu mengembalikan ke pemuatan awal.
  const params = new URLSearchParams(window.location.search);
  if (qRaw) params.set("search", qRaw); else params.delete("search");
  if (sort) params.set("sort", sort); else params.delete("sort");
  history.replaceState(null, "", "katalog.html" + (params.toString() ? "?" + params.toString() : ""));

  region.innerHTML =
    renderSearchInfoHTML(list.length, qRaw) +
    renderGridHTML(pageItems, list.length) +
    sentinelHTML();

  initHoverSlideshow();
  initInfinityScroll();
}

// ---------- DROPDOWN CUSTOM (PENGGANTI <select> DEFAULT) ----------
// <select> asli tetap ada di DOM (tersembunyi visual, tapi tetap focusable & terbaca
// screen reader) sebagai penyimpan nilai, sehingga handler form lama (onchange,
// form.submit, getElementById().value) tidak perlu diubah sama sekali.
const dropdownStack = [];

function initCustomDropdowns(root = document) {
  root.querySelectorAll("select").forEach(select => {
    if (select.dataset.ddReady) return;
    select.dataset.ddReady = "1";
    select.classList.add("sr-only");
    select.tabIndex = -1; // tab order fokus ke trigger yang terlihat; nilai tetap ikut tersubmit

    const wrap = document.createElement("div");
    wrap.className = "relative";
    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(select);
    wrap.insertAdjacentHTML("beforeend", `
      <button type="button" class="dd-trigger w-full bg-gray-50 border border-gray-200 rounded-lg text-left text-gray-700 font-semibold text-sm py-3 px-4 flex items-center justify-between gap-2 hover:border-gray-300 focus:outline-none focus:border-brandYellow focus:ring-2 focus:ring-brandYellow/30 transition" aria-haspopup="listbox" aria-expanded="false">
        <span class="dd-label truncate text-gray-500">${escapeHtml(select.options[select.selectedIndex]?.text || "")}</span>
        <i class="fa-solid fa-chevron-down text-xs text-gray-400 transition-transform"></i>
      </button>
      <ul class="dd-menu hidden absolute z-40 mt-1.5 w-full max-h-60 overflow-y-auto custom-scrollbar bg-white border border-gray-200 rounded-lg shadow-xl py-1.5" role="listbox" tabindex="-1"></ul>
    `);

    const trigger = wrap.querySelector(".dd-trigger");
    const label = wrap.querySelector(".dd-label");
    const menu = wrap.querySelector(".dd-menu");

    // Baris opsi; value kosong dianggap "placeholder" → tampil abu-abu
    function renderMenu() {
      menu.innerHTML = [...select.options].map((opt, i) => `
        <li role="option" data-i="${i}" aria-selected="${i === select.selectedIndex}"
            class="px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between gap-2 ${i === select.selectedIndex ? "font-bold text-brandBlack bg-brandYellow/15" : "text-gray-700 hover:bg-gray-50"}">
          <span>${escapeHtml(opt.text)}</span>
          ${i === select.selectedIndex ? '<i class="fa-solid fa-check text-xs text-brandBlack"></i>' : ""}
        </li>`).join("");
    }

    function openMenu() {
      closeAllDropdowns();
      renderMenu();
      menu.classList.remove("hidden");
      trigger.setAttribute("aria-expanded", "true");
      trigger.querySelector(".fa-chevron-down").classList.replace("fa-chevron-down", "fa-chevron-up");
      dropdownStack.push(closeMenu);
      const sel = menu.querySelector('[aria-selected="true"]');
      if (sel) sel.scrollIntoView({ block: "nearest" });
    }
    function closeMenu() {
      menu.classList.add("hidden");
      trigger.setAttribute("aria-expanded", "false");
      trigger.querySelector(".fa-chevron-up")?.classList.replace("fa-chevron-up", "fa-chevron-down");
      const i = dropdownStack.indexOf(closeMenu);
      if (i > -1) dropdownStack.splice(i, 1);
    }

    function pilih(i) {
      select.selectedIndex = i;
      label.textContent = select.options[i].text;
      label.classList.toggle("text-gray-500", !select.options[i].value);
      label.classList.toggle("text-gray-800", !!select.options[i].value);
      closeMenu();
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }

    trigger.addEventListener("click", () => menu.classList.contains("hidden") ? openMenu() : closeMenu());
    trigger.addEventListener("focus", () => label.classList.add("text-gray-800"));
    trigger.addEventListener("blur", () => { if (!select.value) label.classList.add("text-gray-500"); });
    menu.addEventListener("click", e => {
      const li = e.target.closest("li[role='option']");
      if (li) pilih(parseInt(li.dataset.i, 10));
    });
    trigger.addEventListener("keydown", e => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") { e.preventDefault(); menu.classList.contains("hidden") ? openMenu() : null; }
    });
    menu.addEventListener("keydown", e => {
      if (e.key === "Escape") { closeMenu(); trigger.focus(); }
    });

    // Kondisi awal: placeholder abu-abu, nilai terisi gelap
    label.classList.toggle("text-gray-500", !select.value);
    label.classList.toggle("text-gray-800", !!select.value);
  });
}

function closeAllDropdowns() {
  while (dropdownStack.length) dropdownStack.pop()();
}

document.addEventListener("click", e => {
  if (!e.target.closest(".dd-trigger") && !e.target.closest(".dd-menu")) closeAllDropdowns();
});

// ---------- NAVIGASI KATALOG TANPA RELOAD ----------
// Dulu: klik kategori/pagination = reload penuh → scroll melompat ke atas & halaman "kedip".
// Kini: link ditangkap, URL dicatat ke riwayat browser (pushState), lalu katalog
// dirender ulang di tempat — posisi scroll, drawer mobile, dan dropdown tetap terjaga.
function navigateKatalog(href) {
  const scrollY = window.scrollY;
  history.pushState(null, "", href);

  renderKatalog(); // baca ulang URL terkini + pasang ulang dropdown & slideshow

  // Drawer kategori mobile: pastikan tertutup setelah memilih kategori.
  // renderKatalog() sudah mengganti DOM (drawer baru selalu tertutup), jadi yang
  // perlu dibersihkan adalah sisa efek pembukanya: body overflow & overlay.
  document.body.classList.remove("overflow-hidden");
  document.getElementById("left-pane-overlay")?.classList.add("hidden");

  // Pertahankan posisi bacaan user (dibatasi tinggi konten terbaru)
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  window.scrollTo(0, Math.max(0, Math.min(scrollY, maxScroll)));
}

// Tangkap klik link internal katalog (kategori, reset, pagination) di dalam area katalog
// saja — link navbar/menuju halaman lain tetap berperilaku normal.
document.addEventListener("click", e => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (e.target.closest(".dd-menu")) return; // opsi dropdown custom jangan dianggap link katalog
  const appEl = document.getElementById("katalog-app");
  if (!appEl) return; // bukan halaman katalog → biarkan navigasi normal
  const link = e.target.closest('a[href^="katalog.html"]');
  if (!link || !appEl.contains(link) || link.target === "_blank") return;
  e.preventDefault();
  navigateKatalog(link.getAttribute("href"));
});

// Enter di kolom pencarian: cukup render live, tanpa reload
// (form GET tetap ada sebagai fallback bila JavaScript nonaktif)
document.addEventListener("submit", e => {
  const form = e.target.closest('form[action="katalog.html"]');
  if (!form || !document.getElementById("katalog-app")) return;
  e.preventDefault();
  const input = form.querySelector('input[name="search"]');
  renderResultsLive(input ? input.value : "");
});

// Tombol back/forward browser: render ulang sesuai URL entri riwayat tersebut
window.addEventListener("popstate", () => {
  if (document.getElementById("katalog-app")) renderKatalog();
});

// ---------- HALAMAN LOADING (overlay saat berpindah halaman) ----------
// Overlay penuh muncul saat user mengeklik link ke halaman lain, lalu hilang
// otomatis saat halaman tujuan selesai dimuat. Fungsi ganda: memberi jeda
// visual yang halus DAN memblokir klik beruntun selagi halaman dimuat.
// Visual memakai inline style agar tidak bergantung pada timing Tailwind.
let pageLoaderTimer = null;

function ensurePageLoader() {
  let l = document.getElementById("page-loader");
  if (l) return l;
  l = document.createElement("div");
  l.id = "page-loader";
  l.style.cssText = "position:fixed;inset:0;z-index:9999;background:#ffffff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;opacity:0;pointer-events:none;transition:opacity .2s ease";
  l.innerHTML = `
    <i class="fa-solid fa-circle-notch fa-spin" style="font-size:34px;color:#FACC15"></i>
    <span style="font-family:Montserrat,sans-serif;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#111111">Memuat halaman</span>`;
  document.body.appendChild(l);
  return l;
}

function showPageLoader() {
  const l = ensurePageLoader();
  l.style.opacity = "1";
  l.style.pointerEvents = "auto";
  clearTimeout(pageLoaderTimer);
  pageLoaderTimer = setTimeout(hidePageLoader, 6000); // pengaman: tidak pernah lengket selamanya
}

function hidePageLoader() {
  clearTimeout(pageLoaderTimer);
  const l = document.getElementById("page-loader");
  if (!l) return;
  l.style.opacity = "0";
  l.style.pointerEvents = "none";
}

// Hilangkan saat halaman tujuan siap (termasuk restore dari cache back/forward)
window.addEventListener("load", hidePageLoader);
window.addEventListener("pageshow", hidePageLoader);

// Tangkap klik link internal → tampilkan overlay sebelum browser berpindah.
// Link yang dikecualikan: anchor (#), tel:, mailto:, javascript:, tab baru,
// download, dan link katalog internal di halaman katalog (sudah SPA tanpa reload).
document.addEventListener("click", e => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (e.defaultPrevented) return;
  const a = e.target.closest("a[href]");
  if (!a) return;
  const href = a.getAttribute("href") || "";
  if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("javascript:")) return;
  if (a.target === "_blank" || a.hasAttribute("download")) return;
  if (document.getElementById("katalog-app") && href.startsWith("katalog.html")) return;
  showPageLoader();
}, true);

// ---------- INIT ----------
// Terapkan SITE_CONTACT ke elemen kontak yang ditulis statis di halaman
// (kontak-kami.html, index.html) — sumber tetap satu: js/data.js
function applySiteContact() {
  if (typeof SITE_CONTACT === "undefined") return;
  const tel = document.getElementById("kontak-tel");
  if (tel) {
    tel.href = "tel:" + (SITE_CONTACT.phoneHref || "");
    tel.textContent = SITE_CONTACT.phoneDisplay || "";
  }
}

// Muat produk dari Supabase (jika dikonfigurasi) sebelum render pertama.
// Semua render mengambil data dari array PRODUCTS saat dipanggil, jadi
// cukup menunggu DB.init() selesai di sini — tidak ada perubahan lain.
async function initKatalogData() {
  if (typeof DB !== "undefined") await DB.init();
}

document.addEventListener("DOMContentLoaded", async () => {
  await initKatalogData();
  if (document.getElementById("navbar")) renderNavbar(window.ACTIVE_PAGE || "");
  if (document.getElementById("footer")) renderFooter();
  if (document.getElementById("katalog-app")) renderKatalog();
  applySiteContact();
  renderNewsList();      // halaman berita.html (tidak ber efek jika host tidak ada)
  initRelatedNews();     // halaman artikel berita (tidak ber efek jika host tidak ada)
  renderWorkshops();     // halaman bengkel-rekanan.html (tidak ber efek jika host tidak ada)
  initSizeFilters();     // isi dropdown Lebar/Ring/Merk di form cari (halaman Home)
  initCustomDropdowns();
});
