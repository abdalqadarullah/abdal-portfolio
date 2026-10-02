"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav } from "@/data/content";
import { smoothScrollTo } from "@/lib/lenis-provider";

/**
 * Navbar — sticky top nav with brutalist styling.
 *
 * Client component because of:
 * - Mobile hamburger open/close state + AnimatePresence overlay
 * - Scroll-aware background (transparent at top, solid on scroll)
 * - Smooth-scroll via Lenis on menu click
 */

const MENU_IDS = nav.menu.map((m) => m.href);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide the navbar while scrolling down and reveal it while scrolling up.
  // Keep it visible near the top and whenever the mobile menu is open.
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frameId = 0;

    const onScroll = () => {
      if (frameId) return;

      frameId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;

        if (currentScrollY <= 24 || scrollDelta < -4) {
          setHidden(false);
        } else if (scrollDelta > 4 && !open) {
          setHidden(true);
        }

        lastScrollY = currentScrollY;
        frameId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameId);
    };
  }, [open]);

  // Lock body scroll when mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    setHidden(false);
    // Small timeout so the overlay finishes closing first
    setTimeout(() => smoothScrollTo(href), open ? 200 : 0);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transform transition-[transform,background-color,border-color] duration-300 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-[#0A0A0A] text-[#FAFAFA] border-b border-[#2A2A2A]"
            : "bg-[#0A0A0A]/95 backdrop-blur-sm text-[#FAFAFA] border-b border-transparent"
        }`}
      >
        <div className="container-brutal flex items-center justify-between h-16 md:h-20">
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="font-heading text-2xl md:text-3xl tracking-tight leading-none text-[#FAFAFA] hover:text-[#D4FF00] transition-colors"
            aria-label="ABDAL — kembali ke atas"
          >
            {nav.brand}
          </a>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.menu.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-body text-xs font-bold uppercase tracking-[0.15em] text-[#FAFAFA]/80 hover:text-[#D4FF00] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: CTA arrow button (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#D4FF00] text-[#0A0A0A] hover:scale-110 hover:rotate-12 transition-transform"
              aria-label="Hubungi saya — scroll ke kontak"
            >
              <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-[#FAFAFA]/30 text-[#FAFAFA]"
              aria-label="Buka menu"
              aria-expanded={open}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] text-[#FAFAFA] flex flex-col"
          >
            {/* Top bar */}
            <div className="container-brutal flex items-center justify-between h-16">
              <span className="font-heading text-2xl text-[#FAFAFA]">
                {nav.brand}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center w-10 h-10 border border-[#FAFAFA]/30 text-[#FAFAFA]"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vertical menu */}
            <nav className="flex-1 flex flex-col justify-center container-brutal gap-2">
              {nav.menu.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="font-heading text-5xl sm:text-6xl uppercase text-[#FAFAFA] hover:text-[#D4FF00] transition-colors py-3 border-b border-[#2A2A2A]"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="container-brutal pb-8 pt-4">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="btn-brutal-accent btn-brutal w-full"
              >
                Hubungi Saya
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
