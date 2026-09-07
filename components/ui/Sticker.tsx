import { ReactNode } from "react";

/**
 * A rotated sticker/badge, poster-style.
 * Uses inline transform so tilt is deterministic (no CSS var math).
 */
export function Sticker({
  children,
  tilt = -4,
  tone = "yellow",
  className = "",
}: {
  children: ReactNode;
  tilt?: number;
  tone?: "yellow" | "ink" | "paper";
  className?: string;
}) {
  const bg =
    tone === "yellow"
      ? "bg-yellow text-ink"
      : tone === "ink"
        ? "bg-ink text-paper"
        : "bg-paper text-ink";
  return (
    <span
      style={{ transform: `rotate(${tilt}deg)` }}
      className={`inline-flex items-center gap-2 border-2 border-ink px-3 py-1.5 font-display font-bold uppercase tracking-tight rounded-full shadow-[3px_3px_0_0_#0f0f0f] ${bg} ${className}`}
    >
      {children}
    </span>
  );
}
