import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  ShieldCheck,
  SealCheck,
  Receipt,
  Package,
  PlugCharging,
  WhatsappLogo,
  MapPinLine,
  ArrowUpRight,
  CaretDown,
  Check,
  X,
  BatteryFull,
  Monitor,
  HandTap,
  SpeakerHigh,
  Microphone,
  CameraRotate,
  Aperture,
  Barcode,
  CellSignalHigh,
  WifiHigh,
  Bluetooth,
  Compass,
  CursorClick,
  Fingerprint,
  DeviceMobile,
  Drop,
  PuzzlePiece,
  ArrowsClockwise,
  Timer,
  Storefront,
  Handshake,
  Scan,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { StatBar } from "@/components/site/StatBar";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Sticker } from "@/components/ui/Sticker";
import { qualityChecks, warranty, links, shop } from "@/content";
import { BREADCRUMBS, BreadcrumbListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { TokenText } from "@/lib/tokens";

export const metadata: Metadata = pageMetadata({
  title: "Used-phone warranty at Ekta Chowk",
  description:
    "Every used phone: 20 quality checks, warranty, bill, box and original accessories at handover.",
  path: "/warranty",
  type: "article",
});

/** Maps icon-name strings in content.ts to real Phosphor components. */
const ICONS: Record<string, typeof ShieldCheck> = {
  BatteryFull,
  Monitor,
  HandTap,
  PlugCharging,
  SpeakerHigh,
  Microphone,
  CameraRotate,
  Aperture,
  Barcode,
  CellSignalHigh,
  WifiHigh,
  Bluetooth,
  Compass,
  CursorClick,
  Fingerprint,
  DeviceMobile,
  Drop,
  PuzzlePiece,
  ArrowsClockwise,
  Timer,
  SealCheck,
  ShieldCheck,
  Receipt,
  Package,
  WhatsappLogo,
  Storefront,
  Scan,
  Handshake,
};

export default function WarrantyPage() {
  return (
    <main>
      <BreadcrumbListJsonLd items={BREADCRUMBS.warranty} />

      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-10 md:pt-16 pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8">
              <SectionHeader
                as="h1"
                size="hero"
                eyebrow={warranty.hero.eyebrow}
                top={warranty.hero.headlineTop}
                tail={warranty.hero.headlineTail}
                align="stack"
              />

              <p className="mt-6 md:mt-8 max-w-[54ch] font-sans text-base md:text-lg text-ink-2">
                {warranty.hero.sub}
              </p>

              <div className="mt-7 md:mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={links.whatsapp(warranty.closing.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-yellow"
                >
                  <WhatsappLogo weight="fill" size={20} />
                  Ask on WhatsApp
                </a>
                <a
                  href={links.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <MapPinLine weight="bold" size={20} />
                  Get directions
                  <ArrowUpRight weight="bold" size={16} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 relative mt-4 lg:mt-8">
              <div className="relative mx-auto lg:ml-auto max-w-[420px]">
                <div className="brick-ink shadow-brick-yellow p-8 md:p-10 flex flex-col items-center text-center">
                  <div className="relative">
                    <Shield weight="fill" size={128} className="text-yellow" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 pt-3 md:pt-4">
                      <span className="font-display font-extrabold text-ink text-3xl md:text-4xl leading-none">
                        20
                      </span>
                      <Check weight="bold" size={22} className="text-ink" />
                    </div>
                  </div>
                  <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-yellow">
                    Every used phone
                  </div>
                  <div className="mt-2 font-display font-extrabold text-2xl md:text-3xl text-paper leading-tight">
                    Warranty · Bill · Box
                  </div>
                </div>
                <div className="absolute -top-3 -right-2 md:-top-4 md:-right-4">
                  <Sticker tilt={8} tone="yellow" className="text-xs">
                    {warranty.hero.stickerA}
                  </Sticker>
                </div>
                <div className="absolute -bottom-4 -left-3 md:-bottom-6 md:-left-6">
                  <Sticker tilt={-6} tone="paper" className="text-xs">
                    {warranty.hero.stickerB}
                  </Sticker>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. New vs used */}
      <section id="compare" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <SectionHeader
            eyebrow={warranty.compare.eyebrow}
            top={warranty.compare.headlineTop}
            tail={warranty.compare.headlineTail}
            intro={warranty.compare.intro}
            className="mb-10 md:mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {warranty.compare.cards.map((c) => {
              const Icon = ICONS[c.icon];
              const isUsed = c.kind === "used";
              return (
                <article
                  key={c.kind}
                  className={`brick shadow-brick p-6 md:p-8 flex flex-col gap-5 ${
                    isUsed ? "bg-yellow" : "bg-paper"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon weight="fill" size={44} className="text-ink" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/70">
                      {c.eyebrow}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold tracking-[-0.02em] text-2xl md:text-3xl text-ink leading-tight">
                    {c.title}
                  </h3>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ink/70">
                    {c.who}
                  </div>
                  <ul className="mt-1 flex flex-col gap-3">
                    {c.points.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-ink-2 md:text-base leading-relaxed"
                      >
                        <Check weight="bold" size={20} className="shrink-0 mt-1 text-ink" />
                        <span>
                          <TokenText text={p} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Covered / Not covered */}
      <section id="coverage" className="bg-paper border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <SectionHeader
            eyebrow={warranty.coverage.eyebrow}
            top={warranty.coverage.headlineTop}
            tail={warranty.coverage.headlineTail}
            intro={warranty.coverage.intro}
            className="mb-10 md:mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="brick shadow-brick p-6 md:p-8 bg-paper">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-ink text-yellow">
                  <Check weight="bold" size={22} />
                </span>
                <h3 className="font-display font-extrabold tracking-[-0.02em] text-2xl md:text-3xl text-ink">
                  {warranty.coverage.covered.title}
                </h3>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {warranty.coverage.covered.items.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-ink-2 md:text-base leading-relaxed"
                  >
                    <Check weight="bold" size={18} className="shrink-0 mt-1 text-ink" />
                    <TokenText text={it} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="brick shadow-brick p-6 md:p-8 bg-paper">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-ink text-paper">
                  <X weight="bold" size={22} />
                </span>
                <h3 className="font-display font-extrabold tracking-[-0.02em] text-2xl md:text-3xl text-ink">
                  {warranty.coverage.notCovered.title}
                </h3>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {warranty.coverage.notCovered.items.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-ink-2 md:text-base leading-relaxed"
                  >
                    <X weight="bold" size={18} className="shrink-0 mt-1 text-ink" />
                    <TokenText text={it} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 md:mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {warranty.coverage.note}
          </p>
        </div>
      </section>

      {/* 4. The 20 checks */}
      <section id="checks-full" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <SectionHeader
            eyebrow={warranty.checks.eyebrow}
            top={warranty.checks.headlineTop}
            tail={warranty.checks.headlineTail}
            intro={warranty.checks.intro}
            className="mb-10 md:mb-14"
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {qualityChecks.map((c) => {
              const Icon = ICONS[c.icon] ?? ShieldCheck;
              return (
                <li key={c.n} className="brick p-5 md:p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-ink text-yellow">
                      <Icon weight="fill" size={22} />
                    </span>
                    <span className="font-mono text-xs md:text-sm text-muted">
                      {c.n}
                    </span>
                  </div>
                  <span className="font-display font-bold text-lg md:text-xl leading-tight text-ink">
                    {c.label}
                  </span>
                  {c.note && (
                    <span className="text-sm text-ink-2 leading-snug">
                      {c.note}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 5. What you take home */}
      <section id="take-home" className="bg-paper border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <SectionHeader
            eyebrow={warranty.takeHome.eyebrow}
            top={warranty.takeHome.headlineTop}
            tail={warranty.takeHome.headlineTail}
            intro={warranty.takeHome.intro}
            className="mb-10 md:mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {warranty.takeHome.cards.map((c) => {
              const Icon = ICONS[c.icon];
              return (
                <article
                  key={c.title}
                  className="brick shadow-brick overflow-hidden flex flex-col bg-paper"
                >
                  <div className="relative w-full aspect-[4/3] bg-paper-2 border-b-2 border-ink">
                    <Image
                      src={c.image}
                      alt={c.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col gap-3">
                    <Icon weight="fill" size={26} className="text-ink" />
                    <h3 className="font-display font-extrabold tracking-[-0.02em] text-xl md:text-2xl leading-tight text-ink">
                      {c.title}
                    </h3>
                    <p className="text-ink-2 leading-relaxed">{c.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <StatBar />

      {/* 6. How to claim */}
      <section id="claim" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <SectionHeader
            eyebrow={warranty.claim.eyebrow}
            top={warranty.claim.headlineTop}
            tail={warranty.claim.headlineTail}
            intro={warranty.claim.intro}
            className="mb-10 md:mb-14"
          />

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {warranty.claim.steps.map((s) => {
              const Icon = ICONS[s.icon] ?? Storefront;
              return (
                <li
                  key={s.n}
                  className="brick-ink p-6 md:p-7 flex flex-col gap-4 h-full"
                >
                  <div className="flex items-center justify-between">
                    <Icon weight="fill" size={30} className="text-yellow" />
                    <span className="font-mono text-xs text-paper/60">{s.n}</span>
                  </div>
                  <h3 className="font-display font-extrabold tracking-[-0.02em] text-xl md:text-2xl leading-tight text-paper">
                    {s.title}
                  </h3>
                  <p className="text-paper/80 leading-relaxed text-sm md:text-base">
                    <TokenText text={s.body} />
                  </p>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
            <div className="md:col-span-7 brick p-5 md:p-6 flex items-start gap-3">
              <Clock weight="fill" size={22} className="text-ink mt-1" />
              <div>
                <div className="font-display font-bold text-lg leading-tight text-ink">
                  Open all 7 days
                </div>
                <div className="mt-1 font-mono text-sm text-ink-2">
                  {warranty.claim.hours}
                </div>
                <p className="mt-2 text-sm text-muted">
                  {shop.address.line1}, {shop.address.line2}
                </p>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-wrap md:justify-end gap-3">
              <a
                href={links.whatsapp(warranty.claim.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-yellow"
              >
                <WhatsappLogo weight="fill" size={20} />
                WhatsApp us
              </a>
              <a
                href={links.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <MapPinLine weight="bold" size={20} />
                Directions
                <ArrowUpRight weight="bold" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="warranty-faq" className="bg-paper border-b-2 border-ink">
        <div className="mx-auto max-w-[1000px] px-4 md:px-8 py-16 md:py-24">
          <div className="mb-10 md:mb-14">
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-4xl md:text-6xl text-ink">
              Warranty questions, <br />
              straight answers.
            </h2>
          </div>

          <ul className="flex flex-col gap-3">
            {warranty.faq.map((f, i) => (
              <li key={i}>
                <details className="group brick p-5 md:p-6 open:shadow-brick transition-shadow">
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="font-display font-bold text-lg md:text-xl leading-snug text-ink">
                      {f.q}
                    </span>
                    <CaretDown
                      weight="bold"
                      size={22}
                      className="shrink-0 mt-1 text-ink transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-4 text-ink-2 leading-relaxed">
                    <TokenText text={f.a} />
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Closing CTA */}
      <section id="warranty-cta" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="lg:col-span-8">
              <SectionHeader
                eyebrow={warranty.closing.headlineTop}
                tail={warranty.closing.headlineTail}
                size="hero"
                align="stack"
              />
              <p className="mt-6 md:mt-8 max-w-[52ch] text-ink-2 md:text-lg">
                {warranty.closing.sub}
              </p>
              <div className="mt-4">
                <Link
                  href="/"
                  className="link-underline font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
                >
                  ← Back to home
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-wrap lg:flex-col gap-3 lg:items-end">
              <a
                href={links.whatsapp(warranty.closing.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-yellow"
              >
                <WhatsappLogo weight="fill" size={20} />
                Chat on WhatsApp
              </a>
              <a
                href={links.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <MapPinLine weight="bold" size={20} />
                Get directions
                <ArrowUpRight weight="bold" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
