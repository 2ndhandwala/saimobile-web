import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  SealCheck,
  Percent,
  DeviceMobile,
  Handshake,
  IdentificationCard,
  CreditCard,
  Bank,
  Phone,
  UserCircle,
  FileText,
  WhatsappLogo,
  MapPinLine,
  ArrowUpRight,
  CaretDown,
  Check,
  Clock,
  Storefront,
} from "@phosphor-icons/react/dist/ssr";
import { StatBar } from "@/components/site/StatBar";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Sticker } from "@/components/ui/Sticker";
import { emi, links, shop } from "@/content";
import { BREADCRUMBS, BreadcrumbListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { TokenText } from "@/lib/tokens";

export const metadata: Metadata = pageMetadata({
  title: "Phone EMI in Jabalpur",
  description:
    "EMI on new AND used phones at Ekta Chowk. Minimum 10% down payment, set up at the counter through our finance partner.",
  path: "/emi",
  type: "article",
});

const ICONS: Record<string, typeof ShieldCheck> = {
  DeviceMobile,
  Percent,
  ShieldCheck,
  Handshake,
  SealCheck,
  IdentificationCard,
  CreditCard,
  Bank,
  Phone,
  UserCircle,
  FileText,
  WhatsappLogo,
  Storefront,
};

export default function EmiPage() {
  return (
    <main>
      <BreadcrumbListJsonLd items={BREADCRUMBS.emi} />

      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-10 md:pt-16 pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8">
              <SectionHeader
                as="h1"
                size="hero"
                eyebrow={emi.hero.eyebrow}
                top={emi.hero.headlineTop}
                tail={emi.hero.headlineTail}
                align="stack"
              />

              <p className="mt-6 md:mt-8 max-w-[54ch] font-sans text-base md:text-lg text-ink-2">
                {emi.hero.sub}
              </p>

              <div className="mt-7 md:mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={links.whatsapp(emi.hero.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-yellow"
                >
                  <WhatsappLogo weight="fill" size={20} />
                  Check your EMI on WhatsApp
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
                  <div className="font-display font-extrabold text-yellow leading-[0.85] tracking-[-0.05em] text-[120px] md:text-[144px]">
                    {emi.hero.downPct}
                  </div>
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70">
                    {emi.hero.downPctLabel}
                  </div>
                  <div className="mt-2 font-display font-extrabold text-2xl md:text-3xl text-paper leading-tight">
                    Rest on EMI
                  </div>
                </div>
                <div className="absolute -top-3 -right-2 md:-top-4 md:-right-4">
                  <Sticker tilt={8} tone="yellow" className="text-xs">
                    {emi.hero.stickerA}
                  </Sticker>
                </div>
                <div className="absolute -bottom-4 -left-3 md:-bottom-6 md:-left-6">
                  <Sticker tilt={-6} tone="paper" className="text-xs">
                    {emi.hero.stickerB}
                  </Sticker>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How it works */}
      <section id="how-it-works" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <SectionHeader
            eyebrow={emi.howItWorks.eyebrow}
            top={emi.howItWorks.headlineTop}
            tail={emi.howItWorks.headlineTail}
            intro={emi.howItWorks.intro}
            className="mb-10 md:mb-14"
          />

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {emi.howItWorks.steps.map((s) => {
              const Icon = ICONS[s.icon] ?? DeviceMobile;
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
        </div>
      </section>

      {/* 3. Down payment */}
      <section id="down-payment" className="bg-paper border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <SectionHeader
            eyebrow={emi.downPayment.eyebrow}
            top={emi.downPayment.headlineTop}
            tail={emi.downPayment.headlineTail}
            intro={emi.downPayment.intro}
            className="mb-10 md:mb-14"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-stretch">
            <div className="lg:col-span-5 brick bg-yellow shadow-brick p-8 md:p-10 flex flex-col justify-between min-h-[280px]">
              <div className="flex items-start justify-between">
                <Percent weight="fill" size={44} className="text-ink" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/70">
                  Down payment
                </span>
              </div>
              <div className="mt-6">
                <div className="font-display font-extrabold tracking-[-0.05em] leading-none text-ink text-[128px] md:text-[176px]">
                  10%
                </div>
                <div className="mt-2 font-display font-bold text-xl md:text-2xl text-ink leading-tight">
                  On every EMI purchase.
                  <br />
                  New or used.
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="brick bg-paper shadow-brick p-6 md:p-8 flex flex-col gap-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  The rules
                </div>
                <ul className="flex flex-col gap-3">
                  {emi.downPayment.points.map((p, i) => (
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
              </div>
              <div className="brick overflow-hidden shadow-brick bg-paper-2 relative min-h-[240px] md:min-h-full">
                <Image
                  src={emi.downPayment.photo}
                  alt={emi.downPayment.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. New vs Used */}
      <section id="compare" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <SectionHeader
            eyebrow={emi.compare.eyebrow}
            top={emi.compare.headlineTop}
            tail={emi.compare.headlineTail}
            intro={emi.compare.intro}
            className="mb-10 md:mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {emi.compare.cards.map((c) => {
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

      {/* 5. Documents needed */}
      <section id="documents" className="bg-paper border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <SectionHeader
            eyebrow={emi.documents.eyebrow}
            top={emi.documents.headlineTop}
            tail={emi.documents.headlineTail}
            intro={emi.documents.intro}
            className="mb-10 md:mb-14"
          />

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {emi.documents.items.map((d) => {
              const Icon = ICONS[d.icon] ?? FileText;
              return (
                <li key={d.title} className="brick p-5 md:p-6 flex flex-col gap-3">
                  <span className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-ink text-yellow">
                    <Icon weight="fill" size={22} />
                  </span>
                  <span className="font-display font-bold text-lg md:text-xl leading-tight text-ink">
                    {d.title}
                  </span>
                  <span className="text-sm text-ink-2 leading-snug">
                    <TokenText text={d.body} />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 6. Eligibility */}
      <section id="eligibility" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <SectionHeader
            eyebrow={emi.eligibility.eyebrow}
            top={emi.eligibility.headlineTop}
            tail={emi.eligibility.headlineTail}
            intro={emi.eligibility.intro}
            className="mb-10 md:mb-14"
          />

          <div className="brick shadow-brick p-6 md:p-8 bg-paper">
            <ul className="flex flex-col gap-3">
              {emi.eligibility.points.map((p, i) => (
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
          </div>
        </div>
      </section>

      <StatBar />

      {/* 7. FAQ */}
      <section id="emi-faq" className="bg-paper border-b-2 border-ink">
        <div className="mx-auto max-w-[1000px] px-4 md:px-8 py-16 md:py-24">
          <div className="mb-10 md:mb-14">
            <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-4xl md:text-6xl text-ink">
              EMI questions, <br />
              straight answers.
            </h2>
          </div>

          <ul className="flex flex-col gap-3">
            {emi.faq.map((f, i) => (
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
      <section id="emi-cta" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <SectionHeader
                  eyebrow={emi.closing.eyebrow}
                  top={emi.closing.headlineTop}
                  tail={emi.closing.headlineTail}
                  size="hero"
                  align="stack"
                />
                <p className="mt-6 md:mt-8 max-w-[52ch] text-ink-2 md:text-lg">
                  {emi.closing.sub}
                </p>
              </div>

              <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="brick p-5 md:p-6 flex items-start gap-3">
                  <Clock weight="fill" size={22} className="text-ink mt-1" />
                  <div>
                    <div className="font-display font-bold text-lg leading-tight text-ink">
                      Open all 7 days
                    </div>
                    <div className="mt-1 font-mono text-sm text-ink-2">
                      {shop.hours}
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {shop.address.line1}, {shop.address.line2}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap md:flex-col gap-3 md:items-end md:justify-center">
                  <a
                    href={links.whatsapp(emi.closing.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-yellow"
                  >
                    <WhatsappLogo weight="fill" size={20} />
                    Check your EMI on WhatsApp
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

              <div className="mt-6">
                <Link
                  href="/"
                  className="link-underline font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
                >
                  ← Back to home
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="brick overflow-hidden shadow-brick bg-paper-2 relative aspect-[4/5] md:aspect-[5/6] lg:aspect-auto lg:h-full min-h-[320px]">
                <Image
                  src={emi.closing.photo}
                  alt={emi.closing.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-3 -left-2 md:-top-4 md:-left-4">
                <Sticker tilt={-6} tone="yellow" className="text-xs">
                  10% down · rest on EMI
                </Sticker>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
