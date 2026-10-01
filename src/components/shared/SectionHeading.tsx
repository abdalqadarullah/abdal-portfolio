import { AnimatedWrapper } from "./AnimatedWrapper";

/**
 * SectionHeading — consistent brutalist section title block.
 * Renders an eyebrow label + large Anton heading.
 *
 * `tone` controls color scheme: "dark" = for use on light bg,
 * "light" = for use on dark bg.
 */
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  tone = "dark",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const eyebrowColor = tone === "dark" ? "text-[#6B6B6B]" : "text-[#D4FF00]";
  const titleColor = tone === "dark" ? "text-[#0A0A0A]" : "text-[#FAFAFA]";
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <AnimatedWrapper className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <div
          className={`flex items-center gap-3 mb-4 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className={`w-8 h-px ${tone === "dark" ? "bg-[#0A0A0A]" : "bg-[#D4FF00]"}`} />
          <span
            className={`font-body text-xs font-bold uppercase tracking-[0.2em] ${eyebrowColor}`}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] ${titleColor}`}
      >
        {title}
      </h2>
    </AnimatedWrapper>
  );
}
