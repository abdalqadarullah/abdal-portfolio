import { services } from "@/data/content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedStagger, AnimatedItem } from "@/components/shared/AnimatedWrapper";

/**
 * Services — "Apa yang Saya Kerjakan" 4-item grid with lucide icons.
 * Server component; animations via AnimatedStagger + AnimatedItem.
 */
export function Services() {
  return (
    <section
      id="services"
      className="section-dark border-b border-[#2A2A2A]"
    >
      <div className="container-brutal py-16 md:py-24 lg:py-32">
        <SectionHeading
          eyebrow="Apa yang Saya Kerjakan"
          title="LAYANAN"
          tone="light"
          className="mb-12"
        />

        <AnimatedStagger className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#2A2A2A] border border-[#2A2A2A]">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <AnimatedItem
                key={service.title}
                className="group p-6 md:p-8 lg:p-10 bg-[#0A0A0A] hover:bg-[#1A1A1A] transition-colors cursor-default"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 border-2 border-[#D4FF00] text-[#D4FF00] flex items-center justify-center group-hover:bg-[#D4FF00] group-hover:text-[#0A0A0A] transition-colors">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl md:text-2xl text-[#FAFAFA] mb-2 leading-tight">
                      {service.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-[#FAFAFA]/60 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-[#FAFAFA]/30 group-hover:text-[#D4FF00] transition-colors">
                    0{idx + 1}
                  </span>
                </div>
              </AnimatedItem>
            );
          })}
        </AnimatedStagger>
      </div>
    </section>
  );
}
