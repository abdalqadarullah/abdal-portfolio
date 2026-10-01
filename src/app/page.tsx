import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

/**
 * ABDAL — one-page portfolio. Sections are ordered top → bottom per SPEC.md §2.
 *
 * The page itself is a server component. Client islands (Navbar, HeroClient,
 * CTA, VisitorWidget, AnimatedWrapper) are nested inside server sections.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <SelectedWork />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
