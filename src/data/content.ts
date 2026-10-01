/**
 * ABDAL — Centralized content data
 * --------------------------------
 * Semua teks konten portofolio (stats, skills, services, projects, kontak,
 * sosial) didefinisikan di sini. Untuk mengubah isi portofolio, edit file ini
 * saja — tidak perlu menyentuh komponen JSX.
 *
 * Path gambar juga didefinisikan di sini (BUKAN hardcode di komponen) supaya
 * mudah diganti dari satu tempat. Saat ini semua gambar memakai placehold.co
 * dengan warna tema (lihat DESIGN.md → Placeholder Policy).
 * TODO: ganti dengan gambar asli saat Abdal sudah punya aset final.
 */

import type { LucideIcon, LucideProps } from "lucide-react";
import {
  LayoutGrid,
  PenTool,
  Palette,
  Image as ImageIcon,
  Figma,
  MessageCircle,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Music2,
} from "lucide-react";

/* ------------------------------------------------------------
   Brand & tagline
   ------------------------------------------------------------ */
export const brand = {
  name: "ABDAL",
  tagline: "DESIGN THAT SPEAKS",
  role: "UI/UX & BRAND DESIGNER",
  shortBio:
    "Saya Abdal — desainer UI/UX & brand fresh graduate yang membangun identitas visual dengan karakter kuat.",
  copyright: "© 2026 Abdal. All rights reserved.",
};

/* ------------------------------------------------------------
   Hero — visual placeholder (kanan desktop / bawah mobile)
   ------------------------------------------------------------ */
export const heroImage =
  "https://placehold.co/900x900/0A0A0A/D4FF00?text=HERO+VISUAL";

/* ------------------------------------------------------------
   Stats — grid 4 kolom (2 kolom mobile)
   ------------------------------------------------------------ */
export const stats: { value: string; label: string }[] = [
  { value: "2+", label: "Years Learning" },
  { value: "15+", label: "Projects" },
  { value: "100%", label: "Dedication" },
  { value: "5+", label: "Tools Mastered" },
];

/* ------------------------------------------------------------
   About — headline, paragraph, skills
   ------------------------------------------------------------ */
export const about = {
  heading: "CREATIVITY MEETS DISCIPLINE.",
  paragraph:
    "Fresh graduate dengan minat tinggi di bidang kreativitas, kerja sama tim, dan pengembangan diri. Memadukan dasar desain komik dengan semangat belajar cepat untuk menciptakan karya visual yang punya karakter.",
  softSkills: [
    "Scouting Skill",
    "Desain Komik",
    "Kerja Sama Tim",
    "Komunikasi Dasar",
    "Kreatif dan Adaptif",
  ],
  hardSkills: [
    { name: "Figma", icon: Figma },
    { name: "Photoshop", icon: ImageIcon },
    { name: "Canva", icon: Palette },
  ],
};

/* ------------------------------------------------------------
   Services — "Apa yang Saya Kerjakan"
   ------------------------------------------------------------ */
export const services: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: LayoutGrid,
    title: "UI/UX Design",
    description:
      "Merancang antarmuka digital yang fungsional dan enak digunakan.",
  },
  {
    icon: PenTool,
    title: "Desain Komik / Ilustrasi",
    description: "Menceritakan ide lewat visual naratif dan karakter.",
  },
  {
    icon: Palette,
    title: "Branding Sederhana",
    description:
      "Membangun identitas visual dasar: logo, warna, tipografi.",
  },
  {
    icon: ImageIcon,
    title: "Visual Design",
    description:
      "Materi visual pendukung untuk sosial media & presentasi.",
  },
];

/* ------------------------------------------------------------
   Selected Work — grid kartu proyek placeholder
   ------------------------------------------------------------ */
export const projects: {
  title: string;
  category: string;
  image: string;
}[] = [
  {
    title: "Project Alpha",
    category: "UI/UX Design",
    image: "https://placehold.co/800x600/0A0A0A/D4FF00?text=PROJECT+ALPHA",
  },
  {
    title: "Brand Nova",
    category: "Branding",
    image: "https://placehold.co/800x600/D4FF00/0A0A0A?text=BRAND+NOVA",
  },
  {
    title: "Comic Series — Episode 01",
    category: "Ilustrasi / Komik",
    image:
      "https://placehold.co/800x600/0A0A0A/FAFAFA?text=COMIC+EP+01",
  },
  {
    title: "Visual Identity Kit",
    category: "Branding / Visual Design",
    image:
      "https://placehold.co/800x600/FAFAFA/0A0A0A?text=VISUAL+ID+KIT",
  },
  {
    title: "Mobile App Concept",
    category: "UI/UX Design",
    image:
      "https://placehold.co/800x600/0A0A0A/D4FF00?text=MOBILE+APP",
  },
  {
    title: "Social Media Kit",
    category: "Visual Design",
    image:
      "https://placehold.co/800x600/D4FF00/0A0A0A?text=SOCIAL+KIT",
  },
];

/* ------------------------------------------------------------
   CTA — WhatsApp + EmailJS config
   ------------------------------------------------------------ */
export const cta = {
  heading: "LET'S WORK TOGETHER.",
  subheading:
    "Punya proyek desain atau sekadar ingin berdiskusi? Kirim pesan singkat — saya biasanya balas dalam 1–2 hari.",
  whatsapp: {
    label: "Chat via WhatsApp",
    href: "https://wa.me/6282213998532",
    display: "+62 822-1399-8532",
    icon: MessageCircle,
  },
  form: {
    nameLabel: "Nama",
    namePlaceholder: "NAMA LENGKAP",
    emailLabel: "Email",
    emailPlaceholder: "EMAIL@DOMAIN.COM",
    messageLabel: "Pesan",
    messagePlaceholder: "CERITAKAN PROYEK ATAU PERTANYAAN ANDA…",
    consentLabel: "Saya setuju pesan ini dikirim melalui email.",
    submitLabel: "Kirim Pesan",
    submittingLabel: "Mengirim…",
    successMessage: "Pesan terkirim! Saya akan segera membalas email Anda.",
    errorMessage:
      "Gagal mengirim pesan. Coba lagi atau hubungi saya via WhatsApp.",
  },
};

/* ------------------------------------------------------------
   Footer — kontak, sosial
   ------------------------------------------------------------ */
export const footer = {
  brandBlock: {
    name: brand.name,
    tagline: brand.tagline,
    copyright: brand.copyright,
  },
  contact: {
    title: "Kontak",
    items: [
      {
        icon: MessageCircle,
        label: "WhatsApp",
        value: "+62 822-1399-8532",
        href: "https://wa.me/6282213998532",
      },
      {
        icon: Mail,
        label: "Email",
        value: "abdalnasution63@gmail.com",
        href: "mailto:abdalnasution63@gmail.com",
      },
      {
        icon: MapPin,
        label: "Lokasi",
        value: "Pidie Jaya, Aceh, Indonesia",
        href: undefined,
      },
    ] as {
      icon: React.ComponentType<LucideProps>;
      label: string;
      value: string;
      href?: string;
    }[],
  },
  socials: {
    title: "Sosial",
    items: [
      { icon: Github, label: "GitHub", href: "https://github.com/abdalqadarullah" },
      { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/abdal" },
      { icon: Instagram, label: "Instagram", href: "https://instagram.com/abdaalll_" },
      { icon: Music2, label: "TikTok", href: "https://tiktok.com/@_abdal_" },
    ],
  },
  visitor: {
    title: "PENGUNJUNG",
    liveLabel: "LIVE",
    totalLabel: "pengunjung unik",
    noDataLabel: "—",
  },
};

/* ------------------------------------------------------------
   Navbar — menu items (smooth-scroll ke section id)
   ------------------------------------------------------------ */
export const nav = {
  brand: brand.name,
  menu: [
    { label: "WORK", href: "#work" },
    { label: "SERVICES", href: "#services" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ],
};
