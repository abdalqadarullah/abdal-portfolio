# DESIGN.md

## Gaya Desain

**Neo-brutalism / brutalist web design** — mengikuti referensi "BRVND":
tipografi besar-kondensed-kapital sebagai elemen hero utama, kontras tinggi
hitam-putih, satu warna aksen neon mencolok, elemen grafis minimal (garis tipis,
tanda plus, lingkaran panah), tanpa gradient halus atau shadow lembut (shadow
kalau ada, tegas/hard-edge).

## Warna

```css
:root {
  --color-black: #0A0A0A;      /* basis background utama, bukan pure #000 */
  --color-white: #FAFAFA;      /* basis teks/background terang */
  --color-accent: #D4FF00;     /* kuning neon — aksen tunggal */
  --color-gray-muted: #6B6B6B; /* teks sekunder/caption */
  --color-gray-border: #2A2A2A;/* garis pembatas di atas dasar gelap */
}
```

Aturan pemakaian:
- Background utama section bergantian hitam (`--color-black`) dan putih
  (`--color-white`) untuk ritme visual, seperti referensi.
- `--color-accent` **hanya** untuk: badge kecil, tombol CTA utama, highlight kata
  dalam headline, indikator LIVE, hover state penting. **Jangan** dipakai sebagai
  warna besar/dominan di satu section penuh.
- Tidak ada dark/light mode toggle — tema fixed sesuai referensi.

## Tipografi

```css
--font-heading: 'Anton', sans-serif;   /* H1–H3, headline besar, SELALU UPPERCASE */
--font-body: 'Roboto', sans-serif;     /* paragraf, nav, label, button */
```

- H1 (Hero): ukuran sangat besar, `clamp(3rem, 10vw, 8rem)`, `line-height: 0.9`,
  huruf kapital, letter-spacing sedikit rapat.
- H2 (judul section): `clamp(2rem, 5vw, 3.5rem)`, kapital.
- Body: Roboto regular/medium, ukuran normal (16px base), `line-height: 1.6`.
- Nav & button: Roboto medium/bold, kapital, letter-spacing lebar (`tracking-wide`).

## Layout & Spacing

- Container max-width ~1400px, padding horizontal responsif (`1.25rem` mobile →
  `4rem` desktop).
- Grid system: CSS Grid/Flexbox Tailwind, bukan 12-kolom rigid — section bebas
  menentukan grid sendiri sesuai kebutuhan (mis. Stats 4 kolom, Selected Work 2-4
  kolom).
- Elemen dekoratif brutalist: garis tipis (`border: 1px solid var(--color-gray-border)`)
  sebagai pemisah antar section/kolom, tanda "+" kecil di pojok sebagai aksen
  (opsional, dekoratif saja).

## Komponen Custom

### Custom Scrollbar (WebKit + Firefox)
```css
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: var(--color-black); }
::-webkit-scrollbar-thumb {
  background: var(--color-accent);
  border-radius: 0; /* brutalist: hard edge, no rounded */
}
* { scrollbar-color: var(--color-accent) var(--color-black); } /* Firefox fallback */
```

### Custom Dropdown (nav mobile / jika ada filter)
Basis **shadcn/ui `DropdownMenu`** (Radix), di-restyle:
- Background hitam solid, border 1-2px putih/kuning, sudut tajam (`rounded-none`).
- Item hover: background kuning neon, teks jadi hitam.

### Custom Checkbox (form kontak — consent)
Basis **shadcn/ui `Checkbox`** (Radix), di-restyle:
- Kotak persegi tegas (`rounded-none`), border putih 2px di atas dasar hitam.
- Checked state: fill kuning neon + ikon check (lucide) hitam.

## Animasi (Framer Motion)

- **Entrance per section**: `whileInView` — fade in (`opacity 0→1`) + slide up
  (`y: 40→0`), `duration: 0.6`, `ease: "easeOut"`, `viewport={{ once: true }}`.
- **Hero headline**: staggered per baris teks (`staggerChildren: 0.08`), muncul
  dari bawah saat mount (bukan `whileInView`, karena ini elemen pertama yang
  terlihat).
- **Hover kartu proyek**: `scale: 1.02` + sedikit `translateY`, transisi cepat
  (`duration: 0.2`).
- **Hover tombol**: scale kecil (`1.03–1.05`) + perubahan warna background/border.
- **Exit transition**: dipakai untuk elemen yang bisa hilang (mis. mobile nav
  overlay) via `AnimatePresence`.

## Smooth Scroll (Lenis)

- Dipasang di root layout via provider client component, membungkus seluruh
  `{children}`.
- Konfigurasi standar: `duration: 1.2`, `easing` default Lenis, `smoothWheel: true`.
- Navbar link ("Work", "Services", dst) pakai `lenis.scrollTo('#section-id')`,
  bukan native anchor jump.

## Gambar & Media — PLACEHOLDER POLICY

**Semua gambar di seluruh situs adalah placeholder**, agar mudah diganti Abdal
tanpa membongkar kode:

- Gunakan `public/placeholders/` berisi file placeholder statis (abu-abu solid
  dengan label teks, mis. "HERO VISUAL 800x800", "PROJECT 01") — bisa dibuat
  sederhana sebagai SVG/CSS placeholder, **tidak perlu** generate gambar asli.
- Alternatif cepat: pakai service placeholder online (mis. `https://placehold.co/`)
  dengan warna sesuai tema (`placehold.co/800x800/0A0A0A/D4FF00?text=HERO`).
- Setiap komponen yang menampilkan gambar (`Hero`, `SelectedWork` cards, foto
  profil di `About` jika ada) harus menerima path/URL gambar sebagai **props atau
  dari `data/content.ts`** — bukan hardcode di JSX — supaya gampang diganti satu
  tempat.
- Beri komentar `{/* TODO: ganti dengan gambar asli */}` di setiap titik pemakaian
  gambar placeholder.

## Responsive Breakpoints

| Breakpoint | Lebar | Perilaku |
|---|---|---|
| Mobile | < 640px | Nav → hamburger + overlay fullscreen; grid 1 kolom semua section; H1 hero diperkecil signifikan (`clamp` menyesuaikan); Stats jadi 2 kolom; padding section dipersempit |
| Tablet | 640px–1024px | Selected Work grid 2 kolom; Stats grid 2x2; nav masih bisa horizontal ringkas atau tetap hamburger (keputusan implementasi) |
| Desktop | > 1024px | Layout penuh sesuai referensi — nav horizontal, Selected Work 2–4 kolom, Hero visual besar di samping headline |

Footer grid 4 kolom → otomatis menjadi 2 kolom di tablet, 1 kolom (stack) di mobile.
