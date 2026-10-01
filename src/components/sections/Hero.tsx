import { brand, heroImage } from "@/data/content";
import { HeroClient } from "./HeroClient";

/**
 * Hero — server component shell.
 *
 * Static content (brand, heroImage, subtext) stays server-rendered. All
 * interactive bits (Framer Motion staggered headline, CTA button scroll,
 * image entrance animation) live in HeroClient ("use client") to keep the
 * server/client boundary clean.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="section-light relative overflow-hidden border-b border-[#0A0A0A]"
    >
      <HeroClient
        badge={brand.role}
        headlineLines={["DESIGN", "THAT", "SPEAKS"]}
        subtext={brand.shortBio}
        ctaLabel="Lihat Karya Saya"
        ctaTarget="#work"
        heroImageSrc={heroImage}
      />
    </section>
  );
}
