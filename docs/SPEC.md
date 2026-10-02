# SPEC.md

## 1. Ringkasan

Website portofolio one-page "ABDAL" bergaya brutalism. Lihat `CONTEXT.md` untuk
latar belakang, `ARCHITECTURE.md` untuk tech stack, `DESIGN.md` untuk design
system. Dokumen ini merinci **isi dan perilaku tiap section**, **Prisma schema**,
dan **kontrak API**.

## 2. Struktur Halaman (urutan section, top → bottom)

1. Navbar (sticky)
2. Hero
3. Stats
4. About
5. Services
6. Selected Work
7. CTA (Form + WhatsApp)
8. Footer

## 3. Navbar

- Logo/brand text: **"ABDAL"** (font Anton, kiri)
- Menu (tengah/kanan): **WORK · SERVICES · ABOUT · CONTACT** — tiap item scroll
  smooth (Lenis) ke `id` section terkait.
- Tombol kanan: ikon panah bulat kuning neon (lucide `ArrowUpRight`) → scroll ke
  section CTA/Contact.
- Mobile (<640px): menu disembunyikan, ganti ikon hamburger (lucide `Menu`) →
  buka overlay fullscreen hitam dengan daftar menu vertikal besar (font Anton) +
  tombol close (lucide `X`). Animasi slide/fade (Framer Motion `AnimatePresence`).
- Sticky di top saat scroll, background semi-transparan blur atau solid hitam
  (implementasi bebas, konsisten dengan tema).

## 4. Hero

- Badge kecil di atas headline: **"UI/UX & BRAND DESIGNER"** (background kuning
  neon, teks hitam, bentuk pill atau kotak tajam).
- Headline besar (font Anton, uppercase, multi-baris, highlight kata terakhir
  dengan warna aksen atau ikon):
  ```
  DESIGN
  THAT
  SPEAKS●
  ```
  (titik/ikon panah kecil di akhir kata terakhir sebagai aksen, seperti bola-O
  pada referensi "MOVES")
- Subteks singkat (Roboto): *"Saya Abdal — desainer UI/UX & brand fresh graduate
  yang membangun identitas visual dengan karakter kuat."*
- Tombol CTA: **"Lihat Karya Saya"** (scroll ke Selected Work) — gaya brutalist,
  border tajam, hover invert warna.
- Visual kanan (desktop) / bawah (mobile): **gambar placeholder** (lihat
  `DESIGN.md` → Placeholder Policy), rasio persegi atau sesuai referensi blob 3D.
- Elemen dekoratif kanan atas: angka "01 / 05" kecil (opsional, estetika saja,
  boleh dihilangkan jika tidak relevan tanpa sistem slide).

## 5. Stats

Grid 4 kolom (2 kolom di mobile):

| Angka | Label |
|---|---|
| 2+ | Years Learning |
| 15+ | Projects |
| 100% | Dedication |
| 5+ | Tools Mastered |

Setiap item: angka besar (Anton), label kecil (Roboto, uppercase, abu-abu muted).
Dipisah garis vertikal tipis antar kolom (desktop), animasi count-up opsional
(nice-to-have, tidak wajib).

## 6. About

- Judul section: **"CREATIVITY MEETS DISCIPLINE."**
- Paragraf (dari `CONTEXT.md`):
  > "Fresh graduate dengan minat tinggi di bidang kreativitas, kerja sama tim, dan
  > pengembangan diri. Memadukan dasar desain komik dengan semangat belajar cepat
  > untuk menciptakan karya visual yang punya karakter."
- Dua sub-blok skill, ditampilkan sebagai tag/pill (bukan progress bar — brutalist
  tidak pakai progress bar halus):

  **Soft Skills**: Scouting Skill · Desain Komik · Kerja Sama Tim · Komunikasi
  Dasar · Kreatif dan Adaptif

  **Hard Skills / Tools**: Figma · Photoshop · Canva — tiap tool boleh disertai
  ikon dari `lucide-react` (pakai ikon generik, mis. `PenTool`, `Image`,
  `Palette`) karena tidak ada ikon brand resmi di lucide.
- Gambar pendukung (opsional, mengikuti pola referensi "close-up eye" sebagai
  elemen grafis): **placeholder**, boleh dihilangkan jika layout lebih bersih
  tanpa gambar.

## 7. Services — "Apa yang Saya Kerjakan"

Grid 4 item (2 kolom tablet, 1 kolom mobile), tiap item: ikon (lucide) + judul +
deskripsi satu baris.

1. **UI/UX Design** — Merancang antarmuka digital yang fungsional dan enak
   digunakan. *(ikon: `LayoutGrid` atau `MousePointerClick`)*
2. **Desain Komik / Ilustrasi** — Menceritakan ide lewat visual naratif dan
   karakter. *(ikon: `PenTool`)*
3. **Branding Sederhana** — Membangun identitas visual dasar: logo, warna,
   tipografi. *(ikon: `Palette`)*
4. **Visual Design** — Materi visual pendukung untuk sosial media & presentasi.
   *(ikon: `Image`)*

## 8. Selected Work

Grid proyek **placeholder**, 4–6 kartu, masing-masing: gambar placeholder, judul
proyek, kategori kecil di bawah judul.

| Judul (placeholder) | Kategori |
|---|---|
| Project Alpha | UI/UX Design |
| Brand Nova | Branding |
| Comic Series — Episode 01 | Ilustrasi / Komik |
| Visual Identity Kit | Branding / Visual Design |
| Mobile App Concept | UI/UX Design |
| Social Media Kit | Visual Design |

Setiap kartu: hover scale ringan + overlay judul (sesuai `DESIGN.md`). Judul,
kategori, dan path gambar **harus** berasal dari `data/content.ts` (array
`projects`) — bukan hardcode di komponen — agar Abdal mudah mengganti konten dan
gambar nanti.

## 9. CTA — "Let's Build Something Iconic" (Form + WhatsApp)

- Judul besar: **"LET'S WORK TOGETHER."** (Anton, kuning neon sebagai background
  section penuh atau teks aksen besar — pilih salah satu sesuai referensi CTA
  block).
- **Form kontak (EmailJS)**:
  - Field: Nama (text, required), Email (email, required), Pesan (textarea,
    required)
  - Checkbox consent (custom, lihat `DESIGN.md`): *"Saya setuju pesan ini
    dikirim melalui email."* (required sebelum submit)
  - Tombol submit: **"Kirim Pesan"** — state loading saat mengirim, state
    sukses/gagal ditampilkan sebagai toast atau teks inline (boleh pakai
    `sonner`/toast dari shadcn jika tersedia, atau state sederhana).
  - Integrasi: `emailjs.send()` client-side memakai env var
    `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `_TEMPLATE_ID`, `_PUBLIC_KEY`.
- **Tombol WhatsApp cepat** (berdampingan dengan form, atas/bawah/samping sesuai
  layout): **"Chat via WhatsApp"** → link `https://wa.me/6282213998532` (format
  internasional tanpa simbol), buka tab baru, ikon lucide `MessageCircle`.

## 10. Footer

Grid **4 kolom** (mengikuti instruksi terbaru), responsive → 2 kolom tablet →
1 kolom (stack) mobile:

**Kolom 1 — Brand**: "ABDAL" + tagline singkat ulang ("Design That Speaks") +
copyright kecil (`© 2026 Abdal. All rights reserved.`)

**Kolom 2 — Kontak**:
- WhatsApp: +62 822-1399-8532 (link `wa.me`)
- Email: abdalnasution63@gmail.com (link `mailto:`)
- Lokasi: Pidie Jaya, Aceh, Indonesia

**Kolom 3 — Sosial Media** (tiap baris: ikon lucide generik + label, link
`target="_blank"`):
- GitHub → https://github.com/abdalqadarullah
- LinkedIn → https://linkedin.com/in/abdal
- Instagram → https://instagram.com/abdaalll_
- TikTok → https://tiktok.com/@_abdal_

**Kolom 4 — Visitor Counter Widget** (lihat detail di §11.4):
- Judul kecil: "PENGUNJUNG"
- Badge **● LIVE** (dot hijau, visual-only, tidak polling) + total pengunjung
  unik ("369 pengunjung unik" — angka dinamis dari API)
- Bar chart sederhana breakdown top negara (horizontal atau vertical bar, pakai
  `recharts` jika artifact/environment mendukung, atau custom CSS bar sederhana
  jika ingin ringan — **implementasi bebas**, boleh pilih yang paling mudah di
  z.ai)
- List baris: kode negara · nama negara — jumlah (mis. "ID · Indonesia — 369")

## 11. Visitor Counter — Spesifikasi Teknis

### 11.1 Prisma Schema

```prisma
// prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Visitor {
  id          String   @id @default(cuid())
  ipHash      String   @unique
  countryCode String   // "ID", "US", "XX" (unknown), dst
  countryName String   // "Indonesia", "Unknown", dst
  visitedAt   DateTime @default(now())
}
```

### 11.2 API Contract

**`POST /api/visitor`**
- Tidak perlu body dari client.
- Server: ambil IP dari header `x-forwarded-for` (ambil elemen pertama jika
  berupa list koma-separated) → fallback ke `request.ip` jika tersedia di
  platform deploy.
- Hash IP dengan SHA-256 (`lib/hash.ts`) → `ipHash`.
- Geo lookup: `GET http://ip-api.com/json/{ip}?fields=status,countryCode,country`
  - Sukses → `countryCode`, `countryName` dari response.
  - Gagal/timeout/rate-limited → `countryCode: "XX"`, `countryName: "Unknown"`.
  - IP localhost (`127.0.0.1`, `::1`) saat `NODE_ENV=development` → langsung pakai
    dummy `countryCode: "ID"`, `countryName: "Indonesia"` tanpa panggil API (hemat
    quota + bisa ditest offline).
- `prisma.visitor.upsert({ where: { ipHash }, update: {}, create: { ipHash,
  countryCode, countryName } })` — **visit lama tidak menambah count**, tapi
  tetap tercatat (idempotent).
- Response `200 OK`:
  ```json
  {
    "total": 369,
    "countries": [
      { "code": "ID", "name": "Indonesia", "count": 310 },
      { "code": "MY", "name": "Malaysia", "count": 40 },
      { "code": "XX", "name": "Unknown", "count": 19 }
    ]
  }
  ```
  (`countries` diurutkan descending by count, dibatasi top 5; "Unknown"
  ditampilkan di posisi terakhir meski countnya tinggi — opsional aturan sorting
  khusus agar tidak mendominasi chart).

**`GET /api/visitor`**
- Sama seperti response POST di atas, tapi **tidak** mencatat visit baru —
  hanya query agregat. Berguna kalau widget ingin refresh tanpa re-trigger count
  (tidak dipakai di MVP karena sudah cukup dengan POST sekali saat mount, tapi
  disediakan untuk fleksibilitas).

### 11.3 Error Handling

- Jika `ip-api.com` gagal total (network error) → tetap lanjut `upsert` dengan
  `"XX"/"Unknown"` (lihat §11.2), **jangan** gagalkan request visitor.
- Jika database error → widget fallback render state "—" (tidak crash footer),
  log error di server console.
- Rate limit `ip-api.com` free tier (~45 req/menit) dianggap cukup untuk skala
  portofolio personal; tidak perlu caching tambahan di MVP.

### 11.4 Komponen `VisitorWidget.tsx`

- `"use client"`, `useEffect` melakukan `POST /api/visitor` sekali saat mount,
  lalu `GET /api/visitor` setiap 60 detik untuk refresh agregat tanpa re-trigger
  pencatatan visitor.
- State: `loading`, `data` (`{ total, countries }`), `error`.
- Loading state: skeleton sederhana (kotak abu-abu pulsing) agar footer tidak
  "melompat" saat data masuk.
- Render sesuai mockup §10 kolom 4: badge LIVE (dot `●` warna hijau, CSS
  `animate-pulse`, **bukan** data real-time — murni visual), total besar, bar
  chart, list negara.

## 12. Data Statis (`src/data/content.ts`)

Semua konten di §4–§10 (stats, skills, services, projects, kontak, sosial)
**harus** dikumpulkan dalam satu file `src/data/content.ts` sebagai
array/object TypeScript ter-typed, diimpor oleh komponen section masing-masing.
Tujuannya: Abdal cukup edit satu file untuk mengubah hampir semua teks + path
gambar placeholder, tanpa menyentuh komponen JSX.

## 13. Non-Functional Requirements

- **Responsive**: wajib mobile (<640px), tablet (640–1024px), desktop (>1024px)
  — lihat breakpoint detail di `DESIGN.md`.
- **Accessibility dasar**: kontras warna cukup (teks di atas hitam/putih sudah
  tinggi kontras; teks di atas kuning neon pakai hitam, bukan putih), semua
  tombol/link punya `aria-label` jika hanya ikon, form punya `label` yang
  terasosiasi dengan input.
- **Performance**: gambar placeholder tetap pakai `next/image` (meski sumbernya
  placeholder) untuk lazy-loading otomatis.
- **SEO dasar**: `metadata` di `layout.tsx` (title: "ABDAL — Design That Speaks",
  description singkat dari tagline + bidang).
