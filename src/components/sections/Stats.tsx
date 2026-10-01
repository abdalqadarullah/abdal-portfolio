import { stats } from "@/data/content";
import { AnimatedStagger, AnimatedItem } from "@/components/shared/AnimatedWrapper";

/**
 * Stats — 4-column grid of big numbers + small labels.
 *
 * Server component: data is static (from content.ts). The only client bit
 * is the AnimatedStagger + AnimatedItem wrappers which handle the entrance
 * animation.
 */
export function Stats() {
  return (
    <section
      id="stats"
      className="section-dark border-b border-[#2A2A2A]"
    >
      <div className="container-brutal py-12 md:py-16 lg:py-20">
        <AnimatedStagger className="grid grid-cols-2 md:grid-cols-4 divide-brutal">
          {stats.map((s) => (
            <AnimatedItem
              key={s.label}
              className="px-4 py-6 md:py-8 flex flex-col items-start"
            >
              <div className="font-heading text-5xl md:text-6xl lg:text-7xl text-[#FAFAFA] leading-none mb-2">
                {s.value}
              </div>
              <div className="font-body text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#FAFAFA]/50">
                {s.label}
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}
