import { about } from "@/data/content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedWrapper, AnimatedStagger, AnimatedItem } from "@/components/shared/AnimatedWrapper";

/**
 * About — "CREATIVITY MEETS DISCIPLINE." section with paragraph + two skill
 * groups (Soft Skills + Hard Skills / Tools) rendered as brutalist tags.
 *
 * Server component; animations handled by AnimatedWrapper / AnimatedStagger.
 */
export function About() {
  return (
    <section
      id="about"
      className="section-light border-b border-[#0A0A0A]"
    >
      <div className="container-brutal py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Heading + paragraph */}
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Tentang Saya" title={about.heading} tone="dark" />
            <AnimatedWrapper delay={0.15} className="mt-6">
              <p className="font-body text-base md:text-lg text-[#0A0A0A]/80 leading-relaxed max-w-lg">
                {about.paragraph}
              </p>
            </AnimatedWrapper>
          </div>

          {/* Skills */}
          <div className="lg:col-span-6 lg:pl-8 lg:border-l lg:border-[#0A0A0A]/15">
            {/* Soft Skills */}
            <AnimatedWrapper delay={0.2}>
              <div className="mb-8">
                <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B] mb-4">
                  Soft Skills
                </h3>
                <AnimatedStagger className="flex flex-wrap gap-2">
                  {about.softSkills.map((skill) => (
                    <AnimatedItem
                      key={skill}
                      as="span"
                      className="tag-brutal text-[#0A0A0A]"
                    >
                      {skill}
                    </AnimatedItem>
                  ))}
                </AnimatedStagger>
              </div>
            </AnimatedWrapper>

            {/* Hard Skills / Tools */}
            <AnimatedWrapper delay={0.3}>
              <div>
                <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B] mb-4">
                  Hard Skills / Tools
                </h3>
                <AnimatedStagger className="flex flex-wrap gap-2">
                  {about.hardSkills.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <AnimatedItem
                        key={tool.name}
                        as="span"
                        className="tag-brutal text-[#0A0A0A] bg-[#D4FF00]/15 border-[#0A0A0A]"
                      >
                        <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                        {tool.name}
                      </AnimatedItem>
                    );
                  })}
                </AnimatedStagger>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
