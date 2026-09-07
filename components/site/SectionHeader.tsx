import type { ReactNode } from "react";

/**
 * The eyebrow + `top` + yellow-underlined `tail` block used by every marketing
 * page section. Two size presets so pages can pick "hero" (h1, 88px) vs
 * "section" (h2, 72px). Extract-first, ceremony-later.
 */
export function SectionHeader({
  eyebrow,
  top,
  tail,
  as = "h2",
  size = "section",
  intro,
  className = "",
  align = "row",
}: {
  eyebrow?: string;
  top?: string;
  tail: string;
  as?: "h1" | "h2";
  size?: "hero" | "section";
  intro?: ReactNode;
  className?: string;
  /** row = eyebrow/heading left, intro right (default). stack = all stacked. */
  align?: "row" | "stack";
}) {
  const H = as;
  const heading =
    size === "hero"
      ? "font-display font-extrabold tracking-[-0.03em] leading-[0.92] text-ink text-[44px] xs:text-[52px] sm:text-6xl md:text-7xl lg:text-[88px]"
      : "font-display font-extrabold tracking-[-0.03em] leading-[0.9] text-4xl md:text-6xl lg:text-7xl text-ink";
  const highlight =
    size === "hero"
      ? "absolute left-0 right-0 bottom-1 md:bottom-2 h-3 md:h-5 bg-yellow -z-0 -rotate-1"
      : "absolute left-0 right-0 bottom-1 md:bottom-2 h-3 md:h-4 bg-yellow -z-0 -rotate-1";

  const headingBlock = (
    <div>
      {eyebrow && (
        <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] text-muted">
          {eyebrow}
        </span>
      )}
      <H className={`${eyebrow ? "mt-3" : ""} ${heading}`}>
        {top && (
          <>
            {top}
            <br />
          </>
        )}
        <span className="relative inline-block">
          <span className="relative z-10">{tail}</span>
          <span aria-hidden className={highlight} />
        </span>
      </H>
    </div>
  );

  if (align === "stack" || !intro) {
    return <div className={className}>{headingBlock}</div>;
  }

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 ${className}`}
    >
      {headingBlock}
      <div className="max-w-md text-ink-2 md:text-lg">{intro}</div>
    </div>
  );
}
