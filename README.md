# ABDAL Portfolio

---

Neo-brutalist one-page portfolio website for Abdal, a UI/UX and brand designer.

The project is built with Next.js App Router, React, Tailwind CSS, Framer Motion, Lenis, Lucide, EmailJS, and Prisma. Portfolio content is centralized in `src/data/content.ts` so text, projects, contact details, and social links can be updated from one place.

## Features

- Responsive one-page portfolio layout
- Neo-brutalist visual system with Anton and Roboto typography
- Smooth scrolling with Lenis
- Framer Motion entrance and interaction animations
- EmailJS contact form with WhatsApp fallback
- Privacy-aware visitor counter using SHA-256 IP hashes
- Prisma visitor aggregation API
- Standalone Next.js production build configuration

## Requirements

- Node.js 20+ or Bun
- Git
- SQLite for local development
- PostgreSQL or another persistent database for production deployment

## Local setup

Install dependencies:

```bash
bun install
```

Create a local environment file:

```bash
cp .env.example .env
```

Set the database URL and, if the contact form is needed, add the EmailJS values:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_EMAILJS_SERVICE_ID=""
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=""
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=""
```

Generate Prisma Client and initialize the database:

```bash
bun run db:generate
bun run db:push
```

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
docs/                  Project context, specification, design, and architecture
prisma/                Prisma schema
src/app/               App Router pages, layout, styles, and visitor API
src/components/        Portfolio sections, shared components, and UI primitives
src/data/content.ts    Centralized portfolio content
src/lib/               Database, hashing, geo lookup, and smooth scrolling helpers
public/                Static public assets
```

## Visitor counter

`POST /api/visitor` hashes the client IP with SHA-256, performs a country lookup through `ip-api.com`, stores a unique visitor in Prisma, and returns aggregate country statistics. Raw IP addresses are not stored.

For production, use a persistent PostgreSQL database and configure `DATABASE_URL` through the deployment platform. Do not commit `.env` files or local database files.

## Production build

```bash
bun run build
bun run start
```

The project uses Next.js standalone output. The deployment scripts in `.zscripts/` package the standalone server, static assets, public files, and runtime database artifact.

## Content and assets

Update portfolio text, project cards, contact information, and social links in `src/data/content.ts`. Project and hero images currently use placeholders and should be replaced with final assets before launch.

## License

This project is a personal portfolio for Abdal.
