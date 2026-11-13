// ============================================================
// TAILWIND CONFIG BERSAMA + HOVER HANYA UNTUK PERANGKAT BER-KURSOR
// ============================================================
// Masalah: di HP, CSS :hover "nyangkut" setelah elemen di-tap
// (browser mobile meng-emulasi hover saat tap). Solusi:
// 1. `future.hoverOnlyWhenSupported` → semua varian `hover:` Tailwind
//    hanya aktif di perangkat yang benar-benar mendukung hover
//    (@media (hover: hover)) — desktop/laptop dengan mouse.
// 2. Varian `group-hover:` (scale gambar kartu, judul berubah warna)
//    dinetralkan lewat CSS kustom di perangkat sentuh.
// 3. Slideshow hover JS di-gate oleh matchMedia (lihat js/js.js).

tailwind.config = {
  future: {
    // Varian `hover:` dibungkus @media (hover: hover) oleh Tailwind
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        brandYellow: '#FFCC00', // Kuning emas dari logo
        brandBlack: '#111111',  // Hitam pekat dari logo
        brandGray: '#F4F4F6',   // Abu-abu terang untuk seksi sekunder
      },
    },
  },
};

// CSS kustom: efek hover premium (desktop) + matikan efek yang
// "nyangkut" di layar sentuh.
(function () {
  const style = document.createElement('style');
  style.textContent = `
    /* ============ DESKTOP (perangkat ber-kursor) ============
       Card lift: card terangkat 4px + bayangan dalam saat hover,
       digabung zoom gambar (group-hover:scale-105) di dalamnya.
       Hanya pada card interaktif (produk, artikel, kategori, cabang). */
    @media (hover: hover) and (pointer: fine) {
      .card-hover {
        transition: transform .3s cubic-bezier(.4, 0, .2, 1),
                    box-shadow .3s cubic-bezier(.4, 0, .2, 1) !important;
        will-change: transform;
      }
      .card-hover:hover {
        transform: translateY(-4px);
        box-shadow: 0 14px 28px -10px rgba(17, 17, 17, .18),
                    0 8px 12px -8px rgba(17, 17, 17, .12);
      }
    }

    /* Feedback tekan halus untuk tombol utama (desktop & mobile) */
    a.bg-brandYellow:active,
    button.bg-brandBlack:active,
    button[type="submit"]:active {
      transform: scale(.97);
    }

    /* ============ LAYAR SENTUH (HP/tablet) ============ */
    @media (hover: none), (pointer: coarse) {
      /* Kartu produk/berita: jangan zoom gambar saat grup "ter-hover" (tap) */
      .group:hover .group-hover\\:scale-105 { transform: none; }
      /* Judul artikel: tetap warna dasar (hitam), jangan amber saat tap */
      .group:hover .group-hover\\:text-amber-500 { color: #111111; }
    }

    /* Perangkat DENGAN kursor asli (desktop): tidak ada override —
       semua efek hover bekerja persis seperti situs asli. */
  `;
  document.head.appendChild(style);
})();
