"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { smoothScrollTo } from "@/lib/lenis-provider";

/**
 * HeroClient — client-only renderer for the Hero section.
 *
 * Contains:
 * - Staggered headline animation (mount-time, not whileInView, since hero
 *   is above the fold and immediately visible)
 * - CTA button (smooth-scrolls to #work via Lenis)
 * - Hero image with entrance animation
 *
 * The parent Hero.tsx is a server component; this is the only client
 * boundary for the hero section.
 */

type HeroClientProps = {
  badge: string;
  headlineLines: string[];
  subtext: string;
  ctaLabel: string;
  ctaTarget: string;
  heroImageSrc: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const lineVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function HeroClient({
  badge,
  headlineLines,
  subtext,
  ctaLabel,
  ctaTarget,
  heroImageSrc,
}: HeroClientProps) {
  const onCtaClick = () => smoothScrollTo(ctaTarget);

  return (
    <div className="container-brutal pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-28 lg:pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left: badge + headline + subtext + CTA */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4FF00] text-[#0A0A0A] font-body text-[10px] font-bold uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 bg-[#0A0A0A]" />
                {badge}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-heading text-[clamp(3rem,10vw,8rem)] leading-[0.85] text-[#0A0A0A] mb-6">
              {headlineLines.map((line, i) => (
                <motion.span
                  key={line}
                  variants={lineVariants}
                  className="block"
                >
                  {i === headlineLines.length - 1 ? (
                    <span className="inline-flex items-baseline">
                      {line}
                      <span
                        aria-hidden="true"
                        className="inline-block ml-2 w-4 h-4 md:w-6 md:h-6 bg-[#D4FF00] border-2 border-[#0A0A0A] -translate-y-1"
                      />
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subtext */}
            <motion.p
              variants={fadeVariants}
              className="font-body text-base md:text-lg text-[#6B6B6B] max-w-md mb-8 leading-relaxed"
            >
              {subtext}
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeVariants}>
              <button type="button" onClick={onCtaClick} className="btn-brutal">
                {ctaLabel}
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: hero image */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none border-2 border-[#0A0A0A] shadow-brutal"
          >
            {/* TODO: ganti dengan gambar asli */}
            <Image
              src={heroImageSrc}
              alt="Hero visual — placeholder karya Abdal"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            {/* Decorative + corners */}
            <div
              aria-hidden="true"
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#D4FF00] border-2 border-[#0A0A0A]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#D4FF00] border-2 border-[#0A0A0A]"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-12 lg:mt-16 flex items-center gap-3 text-[#6B6B6B]"
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
        <span className="font-body text-[10px] uppercase tracking-[0.2em]">
          Scroll untuk menjelajah
        </span>
      </motion.div>
    </div>
  );
}
