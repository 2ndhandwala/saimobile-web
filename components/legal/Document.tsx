import type { ReactNode } from "react";
import Link from "next/link";
import { TokenText as BaseTokenText } from "@/lib/tokens";

/** Legal-tone TokenText: the subtler yellow chip variant. */
export function LegalTokenText({ text }: { text: string }) {
  return <BaseTokenText text={text} tone="legal" />;
}

/** "§ N. Title" heading with anchor id for TOC deep-links. */
export function SectionHeading({
  n,
  id,
  title,
}: {
  n: string;
  id: string;
  title: string;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 mt-14 md:mt-16 mb-4 font-sans font-bold text-2xl md:text-3xl leading-tight text-ink"
    >
      <span className="font-mono text-base md:text-lg text-muted mr-2 align-baseline">
        § {n}.
      </span>
      {title}
    </h2>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 mb-2 font-sans font-semibold text-lg md:text-xl leading-snug text-ink">
      {children}
    </h3>
  );
}

export function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 font-sans text-base md:text-[17px] leading-relaxed text-ink-2">
      {children}
    </p>
  );
}

export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-3 font-sans text-base md:text-[17px] leading-relaxed text-ink-2 list-disc pl-6 marker:text-muted">
      {items.map((it, i) => (
        <li key={i}>
          <LegalTokenText text={it} />
        </li>
      ))}
    </ul>
  );
}

/** Table-of-contents block used by every legal document. */
export function TableOfContents({
  items,
}: {
  items: readonly { n: string; id: string; title: string }[];
}) {
  return (
    <nav
      aria-label="Contents"
      className="mt-10 mb-2 border border-line rounded-md bg-paper-2/60 p-5 md:p-6"
    >
      <div className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">
        Contents
      </div>
      <ol className="flex flex-col gap-1.5 font-sans text-sm md:text-base text-ink-2">
        {items.map((t) => (
          <li key={t.id} className="flex gap-2">
            <span className="font-mono text-muted min-w-[1.75rem]">{t.n}.</span>
            <a href={`#${t.id}`} className="link-underline text-ink">
              {t.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Wraps a legal document header (title + meta + intro). */
export function DocumentHeader({
  title,
  effectiveDate,
  appliesTo,
  contactHref,
  contactLabel,
  intro,
}: {
  title: string;
  effectiveDate: string;
  appliesTo: string;
  contactHref: string;
  contactLabel: string;
  intro: string;
}) {
  return (
    <header className="pb-8 md:pb-10 border-b border-line">
      <h1 className="font-sans font-bold tracking-tight text-3xl md:text-4xl text-ink">
        {title}
      </h1>
      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-x-4 gap-y-2 font-mono text-xs md:text-sm text-muted">
        <dt className="uppercase tracking-widest">Effective date</dt>
        <dd className="text-ink-2">
          <LegalTokenText text={effectiveDate} />
        </dd>
        <dt className="uppercase tracking-widest">Applies to</dt>
        <dd className="text-ink-2">{appliesTo}</dd>
        <dt className="uppercase tracking-widest">Contact</dt>
        <dd className="text-ink-2">
          <a href={contactHref} className="link-underline text-ink hover:text-ink">
            {contactLabel}
          </a>
        </dd>
      </dl>
      <Paragraph>{intro}</Paragraph>
    </header>
  );
}

/** End-of-document footer strip common to every legal page. */
export function DocumentFooter({
  kind,
  effectiveDate,
}: {
  kind: "Policy" | "Terms";
  effectiveDate: string;
}) {
  return (
    <footer className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-muted">
      <div>
        End of {kind} · Effective <LegalTokenText text={effectiveDate} />
      </div>
      <Link href="/" className="link-underline text-muted">
        ← Back to home
      </Link>
    </footer>
  );
}
