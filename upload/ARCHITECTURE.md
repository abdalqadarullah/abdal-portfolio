# ARCHITECTURE.md

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend framework | React + **Next.js 14+ (App Router)** |
| Backend | **Next.js API Routes** (Route Handlers) |
| Database / ORM | **Prisma** — SQLite untuk development |
| Component library | **shadcn/ui** (berbasis Radix UI) |
| Icon | **lucide-react** |
| Animasi | **Framer Motion** (entrance/exit transitions) |
| Smooth scroll | **Lenis** |
| Styling | Tailwind CSS (basis shadcn/ui) + custom CSS (scrollbar, dropdown, checkbox) |
| Font | **Anton** (heading), **Roboto** (body) — via `next/font/google` |
| Form kontak | **EmailJS** (client-side, `@emailjs/browser`) |
| Geolocation IP | **ip-api.com** (free tier, no API key) |

> **Catatan deployment**: SQLite tidak cocok untuk environment serverless (Vercel).
> Untuk production, ganti `DATABASE_URL` Prisma ke PostgreSQL (mis. Neon atau
> Supabase) — schema tidak perlu berubah, cukup provider di `schema.prisma`.

## Struktur Folder

```
abdal-portfolio/
├── prisma/
│   ├── schema.prisma          # Model Visitor
│   └── dev.db                 # SQLite (development)
├── public/
│   └── placeholders/          # semua gambar placeholder (hero, proyek, foto profil)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Setup font (Anton+Roboto), LenisProvider, metadata
│   │   ├── page.tsx           # Merakit seluruh section jadi satu halaman
│   │   ├── globals.css        # Custom scrollbar, CSS variables warna, base style
│   │   └── api/
│   │       └── visitor/
│   │           └── route.ts   # POST: catat visit + GET: ambil data agregat
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Navbar.tsx         # Sticky nav + hamburger mobile
│   │   │   ├── Hero.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── About.tsx          # "Creativity Meets Discipline" + skills
│   │   │   ├── Services.tsx       # "Apa yang Saya Kerjakan"
│   │   │   ├── SelectedWork.tsx   # Grid proyek placeholder
│   │   │   ├── CTA.tsx            # Form EmailJS + tombol WhatsApp
│   │   │   └── Footer.tsx         # Grid 4 kolom + VisitorWidget
│   │   ├── ui/                    # shadcn/ui generated components
│   │   ├── visitor/
│   │   │   └── VisitorWidget.tsx  # Client component: fetch + render widget
│   │   └── shared/
│   │       ├── SectionHeading.tsx
│   │       └── AnimatedWrapper.tsx # wrapper Framer Motion whileInView
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client singleton
│   │   ├── geo.ts              # fetch ip-api.com + fallback
│   │   ├── hash.ts             # hash IP (SHA-256)
│   │   └── lenis-provider.tsx  # Context provider Lenis smooth scroll
│   └── data/
│       └── content.ts          # Semua teks statis: stats, skills, services, projects
├── .env                        # DATABASE_URL, NEXT_PUBLIC_EMAILJS_*
├── .env.example
└── tailwind.config.ts
```

## Alur Data (Data Flow)

### Konten statis (Hero, Stats, About, Services, Selected Work)
```
src/data/content.ts  →  Server Component (section)  →  render langsung (no fetch)
```
Tidak ada roundtrip API — semua di-import sebagai object/array TypeScript.

### Visitor Counter
```
VisitorWidget.tsx (Client Component, "use client")
  → useEffect on mount
  → POST /api/visitor
      → ambil IP dari header (x-forwarded-for)
      → hash IP (lib/hash.ts)
      → geo lookup via ip-api.com (lib/geo.ts) — fallback "XX"/"Unknown" jika gagal
      → prisma.visitor.upsert({ where: { ipHash }, ... })
      → query agregat: total unique + groupBy countryCode (top 5)
      → return JSON { total, countries: [...] }
  → widget render: total + bar chart + badge LIVE (visual only, no polling)
```

### Form Kontak
```
CTA.tsx (Client Component)
  → user isi form (nama, email, pesan, checkbox consent)
  → emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
  → tidak menyentuh API Routes / Prisma sama sekali
```

## Komponen Server vs Client

- **Server Components (default)**: semua `sections/*` yang murni render konten statis
  (Hero, Stats, About, Services, SelectedWork, Footer shell).
- **Client Components** (`"use client"`): `Navbar` (state hamburger mobile),
  `VisitorWidget`, `CTA` (form state), `AnimatedWrapper` (Framer Motion),
  `LenisProvider` (akses `window`).
- `layout.tsx` tetap Server Component; `LenisProvider` dipasang sebagai child client
  component yang membungkus `{children}`.

## Environment Variables

```
DATABASE_URL="file:./dev.db"          # ganti ke postgres:// saat production
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```
