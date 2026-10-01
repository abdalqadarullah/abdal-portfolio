import Image from "next/image";
import { projects } from "@/data/content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedStagger, AnimatedItem } from "@/components/shared/AnimatedWrapper";
import { ArrowUpRight } from "lucide-react";

/**
 * SelectedWork — grid of project cards (image + title + category).
 * Hover: scale + overlay title appears.
 * Server component; data from content.ts. Hover animation is pure CSS
 * (transform on hover), entrance animation via AnimatedStagger + AnimatedItem.
 */
export function SelectedWork() {
  return (
    <section
      id="work"
      className="section-light border-b border-[#0A0A0A]"
    >
      <div className="container-brutal py-16 md:py-24 lg:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Portfolio"
            title="SELECTED WORK"
            tone="dark"
          />
          <div className="font-body text-xs uppercase tracking-[0.15em] text-[#6B6B6B]">
            {projects.length} proyek · placeholder
          </div>
        </div>

        <AnimatedStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <AnimatedItem
              key={project.title}
              as="article"
              className={`group relative overflow-hidden border-2 border-[#0A0A0A] bg-[#0A0A0A] ${
                i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  i === 0 ? "aspect-square sm:aspect-[4/3]" : "aspect-[4/3]"
                }`}
              >
                {/* TODO: ganti dengan gambar asli */}
                <Image
                  src={project.image}
                  alt={`${project.title} — placeholder`}
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 640px) 100vw, 66vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/40 transition-colors duration-300" />
                {/* Top-right arrow icon on hover */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-[#D4FF00] text-[#0A0A0A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 md:p-5 bg-[#FAFAFA] border-t-2 border-[#0A0A0A]">
                <h3 className="font-heading text-lg md:text-xl text-[#0A0A0A] leading-tight mb-1">
                  {project.title}
                </h3>
                <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B]">
                  {project.category}
                </p>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}
