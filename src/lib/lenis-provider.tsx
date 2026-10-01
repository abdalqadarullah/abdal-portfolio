"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * LenisProvider — installs Lenis smooth scroll at the app root.
 *
 * Exposes a global `window.__lenis` reference so the Navbar (and any other
 * component) can call `window.__lenis.scrollTo('#section-id')` for smooth
 * anchor navigation instead of native jump.
 *
 * Provider itself is a client component; the root layout stays a server
 * component and just renders this as a child wrapper.
 */

type LenisProviderProps = {
  children: ReactNode;
};

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // touch behavior stays native for mobile UX
      smoothTouch: false,
    });
    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        delete window.__lenis;
      }
    };
  }, []);

  return <>{children}</>;
}

/**
 * Smooth-scroll to a CSS selector (e.g. "#work").
 * Falls back to native scrollIntoView if Lenis isn't ready yet.
 */
export function smoothScrollTo(selector: string) {
  if (typeof window === "undefined") return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(selector, { offset: -80, duration: 1.2 });
  } else {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
