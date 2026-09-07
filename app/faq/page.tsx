import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  SealCheck,
  Tag,
  Percent,
  Handshake,
  Wrench,
  Storefront,
  WhatsappLogo,
  MapPinLine,
  ArrowUpRight,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr";
import { StatBar } from "@/components/site/StatBar";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Sticker } from "@/components/ui/Sticker";
import { faqPage, links } from "@/content";
import { BREADCRUMBS, BreadcrumbListJsonLd, FaqJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { TokenText } from "@/lib/tokens";

export const metadata: Metadata = pageMetadata({
  title: "FAQs: warranty, EMI, exchange, repairs",
  description:
    "Warranty, EMI, exchange, buy-back and repairs at 2nd Hand Wala JBP, Jabalpur.",
  path: "/faq",
  type: "article",
});

const ICONS: Record<string, typeof ShieldCheck> = {
  ShieldCheck,
  SealCheck,
  Tag,
  Percent,
  Handshake,
  Wrench,
  Storefront,
};

export default function FaqPage() {
  return (
    <main>
      <BreadcrumbListJsonLd items={BREADCRUMBS.faq} />
      <FaqJsonLd />

      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-10 md:pt-16 pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-9">
              <SectionHeader
                as="h1"
                size="hero"
                eyebrow={faqPage.hero.eyebrow}
                top={faqPage.hero.headlineTop}
                tail={faqPage.hero.headlineTail}
                align="stack"
              />

              <p className="mt-6 md:mt-8 max-w-[54ch] font-sans text-base md:text-lg text-ink-2">
                {faqPage.hero.sub}
              </p>

              <div className="mt-7 md:mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={links.whatsapp(faqPage.closing.waMessage)}
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

            <div className="lg:col-span-3 flex flex-row lg:flex-col flex-wrap items-start lg:items-end gap-3 mt-4 lg:mt-16">
              <Sticker tilt={4} tone="ink">
                {faqPage.hero.stickerA}
              </Sticker>
              <Sticker tilt={-3} tone="yellow">
                {faqPage.hero.stickerB}
              </Sticker>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category index */}
      <section
        aria-label="Jump to a category"
        className="bg-paper-2 border-b-2 border-ink"
      >
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-10 md:py-14">
          <div className="mb-6 md:mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Jump to a category
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 md:gap-4">
            {faqPage.categories.map((cat) => {
              const Icon = ICONS[cat.icon] ?? ShieldCheck;
              return (
                <li key={cat.id}>
                  <Link
                    href={`#${cat.id}`}
                    className="brick p-4 md:p-5 flex flex-col items-start gap-3 h-full hover:shadow-brick transition"
                  >
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-ink text-yellow">
                      <Icon weight="fill" size={20} />
                    </span>
                    <span className="font-display font-bold text-base md:text-lg leading-tight text-ink">
                      {cat.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 3. Category sections */}
      {faqPage.categories.map((cat, ci) => {
        const Icon = ICONS[cat.icon] ?? ShieldCheck;
        const isAlt = ci % 2 === 1;
        return (
          <section
            key={cat.id}
            id={cat.id}
            className={`${
              isAlt ? "bg-paper-2" : "bg-paper"
            } border-b-2 border-ink scroll-mt-24 md:scroll-mt-32`}
          >
            <div className="mx-auto max-w-[1000px] px-4 md:px-8 py-16 md:py-24">
              <div className="mb-10 md:mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-ink text-yellow">
                    <Icon weight="fill" size={20} />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                    {cat.eyebrow}
                  </span>
                </div>
                <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-4xl md:text-6xl text-ink">
                  {cat.title}
                </h2>
                <p className="mt-5 max-w-[60ch] text-ink-2 md:text-lg">
                  {cat.intro}
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {cat.items.map((f, i) => (
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
        );
      })}

      <StatBar />

      {/* 4. Closing CTA */}
      <section id="faq-cta" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="lg:col-span-8">
              <SectionHeader
                eyebrow={faqPage.closing.eyebrow}
                top={faqPage.closing.headlineTop}
                tail={faqPage.closing.headlineTail}
                size="hero"
                align="stack"
              />
              <p className="mt-6 md:mt-8 max-w-[52ch] text-ink-2 md:text-lg">
                {faqPage.closing.sub}
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
                href={links.whatsapp(faqPage.closing.waMessage)}
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
