"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * AnimatedWrapper — Framer Motion wrapper that fades + slides content up
 * when it enters the viewport (once). Use to wrap section bodies so the
 * entrance animation is consistent across the page.
 *
 * Server section components compose this inside themselves; AnimatedWrapper
 * itself is the only client boundary.
 */

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

type AnimatedWrapperProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "span";
};

export function AnimatedWrapper({
  children,
  className,
  delay = 0,
  as = "div",
}: AnimatedWrapperProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered container — for grids where children should animate in sequence.
 */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export function AnimatedStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * AnimatedItem — motion element meant to be used as a direct child of
 * AnimatedStagger. Renders the variants-based enter animation.
 *
 * Use this from server components instead of `motion.div` directly (which
 * would force the whole section to become a client component).
 */
type AnimatedItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "span";
};

export function AnimatedItem({
  children,
  className,
  as = "div",
}: AnimatedItemProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
