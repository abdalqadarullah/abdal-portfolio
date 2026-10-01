import type { Metadata } from "next";
import { Anton, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { LenisProvider } from "@/lib/lenis-provider";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ABDAL — Design That Speaks",
  description:
    "Abdal — UI/UX & Brand Designer, fresh graduate. Membangun identitas visual dengan karakter kuat: UI/UX design, branding, dan ilustrasi.",
  keywords: [
    "Abdal",
    "portfolio",
    "UI/UX design",
    "branding",
    "desain grafis",
    "neo-brutalism",
    "Pidie Jaya",
    "Aceh",
  ],
  authors: [{ name: "Abdal" }],
  openGraph: {
    title: "ABDAL — Design That Speaks",
    description:
      "UI/UX & Brand Designer. Membangun identitas visual dengan karakter kuat.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABDAL — Design That Speaks",
    description:
      "UI/UX & Brand Designer. Membangun identitas visual dengan karakter kuat.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${anton.variable} ${roboto.variable} antialiased`}
        style={{ backgroundColor: "#FAFAFA", color: "#0A0A0A" }}
      >
        <LenisProvider>
          <div className="min-h-screen-flex">
            {children}
          </div>
        </LenisProvider>
        <Toaster />
        <SonnerToaster position="top-right" />
      </body>
    </html>
  );
}
