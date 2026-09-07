import type { Metadata } from "next";
import Link from "next/link";
import {
  WhatsappLogo,
  ArrowRight,
  ArrowUpRight,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Sticker } from "@/components/ui/Sticker";
import { notFound, links, shop } from "@/content";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page doesn't exist at the shop. Head back to the home page or message us on WhatsApp.",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-10 md:pt-16 pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8">
              <SectionHeader
                as="h1"
                size="hero"
                eyebrow={notFound.eyebrow}
                top={notFound.headlineTop}
                tail={notFound.headlineTail}
                align="stack"
              />

              <p className="mt-6 md:mt-8 max-w-[58ch] font-sans text-base md:text-lg text-ink-2">
                {notFound.sub}
              </p>

              <div className="mt-7 md:mt-9 flex flex-wrap items-center gap-3">
                <Link href="/" className="btn">
                  <ArrowRight weight="bold" size={20} />
                  {notFound.primaryCta}
                </Link>
                <a
                  href={links.whatsapp(notFound.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-yellow"
                >
                  <WhatsappLogo weight="fill" size={20} />
                  {notFound.secondaryCta}
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 relative mt-4 lg:mt-8">
              <div className="relative mx-auto lg:ml-auto max-w-[420px]">
                <div className="brick-ink shadow-brick-yellow p-8 md:p-10 flex flex-col items-center text-center">
                  <MagnifyingGlass weight="bold" size={28} className="text-yellow" />
                  <div className="mt-3 font-display font-extrabold text-yellow leading-[0.85] tracking-[-0.05em] text-[120px] md:text-[144px]">
                    404
                  </div>
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70">
                    Page not found
                  </div>
                  <div className="mt-2 font-display font-extrabold text-2xl md:text-3xl text-paper leading-tight">
                    But the shop&apos;s still here.
                  </div>
                </div>
                <div className="absolute -top-3 -right-2 md:-top-4 md:-right-4">
                  <Sticker tilt={8} tone="yellow" className="text-xs">
                    {notFound.stickerA}
                  </Sticker>
                </div>
                <div className="absolute -bottom-4 -left-3 md:-bottom-6 md:-left-6">
                  <Sticker tilt={-6} tone="paper" className="text-xs">
                    {notFound.stickerB}
                  </Sticker>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quick-links" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-14 md:py-20">
          <div className="mb-8 md:mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              Quick links
            </span>
            <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-3xl md:text-5xl lg:text-6xl">
              {notFound.linksHeading}
            </h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {notFound.quickLinks.map((q) => (
              <li key={q.href}>
                <Link
                  href={q.href}
                  className="group brick shadow-brick p-5 md:p-6 flex items-center justify-between gap-4 min-h-24 md:min-h-28 transition hover:-translate-y-0.5"
                >
                  <span className="font-display font-extrabold tracking-[-0.02em] text-xl md:text-2xl leading-tight text-ink">
                    {q.label}
                  </span>
                  <ArrowUpRight
                    weight="bold"
                    size={22}
                    className="text-ink shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-3">
            <a
              href={links.whatsapp(notFound.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-yellow"
            >
              <WhatsappLogo weight="fill" size={20} />
              Still stuck? Ask on WhatsApp
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              {shop.hoursShort} · {shop.daysOpen}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
