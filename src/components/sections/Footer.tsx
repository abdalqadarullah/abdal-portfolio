import { footer } from "@/data/content";
import { VisitorWidget } from "@/components/visitor/VisitorWidget";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";

/**
 * Footer — 4-column grid (responsive: 2 cols on tablet, 1 col on mobile).
 *
 * Server shell (data is static from content.ts). The only client island is
 * VisitorWidget in column 4 — it fetches visitor stats on mount.
 */
export function Footer() {
  return (
    <footer
      id="footer"
      className="section-dark mt-auto"
    >
      <div className="container-brutal py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Col 1 — Brand */}
          <AnimatedWrapper>
            <div className="lg:border-r lg:border-[#2A2A2A] lg:pr-8 h-full">
              <div className="font-heading text-3xl md:text-4xl text-[#FAFAFA] mb-2">
                {footer.brandBlock.name}
              </div>
              <div className="font-body text-xs uppercase tracking-[0.15em] text-[#D4FF00] mb-4">
                {footer.brandBlock.tagline}
              </div>
              <p className="font-body text-[11px] text-[#FAFAFA]/40 leading-relaxed">
                {footer.brandBlock.copyright}
              </p>
            </div>
          </AnimatedWrapper>

          {/* Col 2 — Contact */}
          <AnimatedWrapper delay={0.1}>
            <div className="lg:border-r lg:border-[#2A2A2A] lg:pr-8 h-full">
              <h4 className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAFAFA]/50 mb-4">
                {footer.contact.title}
              </h4>
              <ul className="space-y-3">
                {footer.contact.items.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <Icon
                        className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-body text-[10px] uppercase tracking-[0.12em] text-[#FAFAFA]/40 mb-0.5">
                          {item.label}
                        </div>
                        <div className="font-body text-sm text-[#FAFAFA] break-words">
                          {item.value}
                        </div>
                      </div>
                    </>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-start gap-3 hover:text-[#D4FF00] transition-colors"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-start gap-3">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </AnimatedWrapper>

          {/* Col 3 — Socials */}
          <AnimatedWrapper delay={0.2}>
            <div className="lg:border-r lg:border-[#2A2A2A] lg:pr-8 h-full">
              <h4 className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAFAFA]/50 mb-4">
                {footer.socials.title}
              </h4>
              <ul className="space-y-2">
                {footer.socials.items.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 py-1.5 hover:text-[#D4FF00] transition-colors"
                      >
                        <span className="w-8 h-8 border border-[#2A2A2A] flex items-center justify-center text-[#FAFAFA] group-hover:bg-[#D4FF00] group-hover:text-[#0A0A0A] group-hover:border-[#D4FF00] transition-colors">
                          <Icon className="w-4 h-4" strokeWidth={2} />
                        </span>
                        <span className="font-body text-sm text-[#FAFAFA] group-hover:text-[#D4FF00] transition-colors">
                          {s.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </AnimatedWrapper>

          {/* Col 4 — Visitor counter widget (client island) */}
          <AnimatedWrapper delay={0.3}>
            <div className="h-full">
              <VisitorWidget />
            </div>
          </AnimatedWrapper>
        </div>

        {/* Bottom strip — fine print */}
        <div className="mt-10 pt-6 border-t border-[#2A2A2A] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="font-body text-[10px] uppercase tracking-[0.15em] text-[#FAFAFA]/30">
            Dibangun dengan Next.js · Prisma · Tailwind
          </div>
          <div className="font-body text-[10px] uppercase tracking-[0.15em] text-[#FAFAFA]/30">
            Neo-Brutalist · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
