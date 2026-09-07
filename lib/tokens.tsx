import type { ReactNode } from "react";

type Tone = "marketing" | "legal";

const PLACEHOLDER_CLASS: Record<Tone, string> = {
  marketing:
    "inline-block rounded-md bg-yellow/70 border-2 border-dashed border-ink px-2 py-0.5 font-mono text-[0.85em] uppercase tracking-wide text-ink",
  legal:
    "inline-block rounded-md bg-yellow/70 border border-dashed border-ink px-1.5 py-0.5 font-mono text-[0.8em] uppercase tracking-wide text-ink",
};

const PLACEHOLDER_TITLE: Record<Tone, string> = {
  marketing: "Placeholder, owner to confirm real wording",
  legal: "Placeholder, owner / legal to confirm real wording",
};

function Placeholder({ children, tone }: { children: ReactNode; tone: Tone }) {
  return (
    <span className={PLACEHOLDER_CLASS[tone]} title={PLACEHOLDER_TITLE[tone]}>
      {children}
    </span>
  );
}

/** Splits a string on [BRACKETED TOKENS] and renders each token as a loud
 * unfilled-copy marker. `tone` picks between the marketing (louder) and
 * legal (subtler) treatments. */
export function TokenText({
  text,
  tone = "marketing",
}: {
  text: string;
  tone?: Tone;
}) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <Placeholder key={i} tone={tone}>
            {part}
          </Placeholder>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
