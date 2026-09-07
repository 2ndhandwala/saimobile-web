import type { Metadata } from "next";
import Link from "next/link";
import {
  WhatsappLogo,
  Phone,
  EnvelopeSimple,
  InstagramLogo,
  MapPinLine,
  ArrowUpRight,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { VisitShop } from "@/components/site/VisitShop";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Sticker } from "@/components/ui/Sticker";
import { contact, links, shop } from "@/content";
import { BREADCRUMBS, BreadcrumbListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact · Ekta Chowk, Jabalpur",
  description: `WhatsApp / call ${shop.phoneDisplay}. Ekta Chowk, Jabalpur. Open 11–10, all 7 days.`,
  path: "/contact",
  type: "article",
});

export default function ContactPage() {
  return (
    <main>
      <BreadcrumbListJsonLd items={BREADCRUMBS.contact} />

      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-10 md:pt-16 pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-9">
              <SectionHeader
                as="h1"
                size="hero"
                eyebrow={contact.hero.eyebrow}
                top={contact.hero.headlineTop}
                tail={contact.hero.headlineTail}
                align="stack"
              />
              <p className="mt-6 md:mt-8 max-w-[54ch] font-sans text-base md:text-lg text-ink-2">
                {contact.hero.sub}
              </p>
            </div>

            <div className="lg:col-span-3 flex flex-row lg:flex-col flex-wrap items-start lg:items-end gap-3 mt-4 lg:mt-16">
              <Sticker tilt={4} tone="ink">
                Open 7 days · {shop.hoursShort}
              </Sticker>
              <Sticker tilt={-3} tone="yellow">
                WhatsApp is fastest
              </Sticker>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Contact methods */}
      <section id="methods" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <SectionHeader
            eyebrow={contact.methods.eyebrow}
            top={contact.methods.headlineTop}
            tail={contact.methods.headlineTail}
            intro={contact.methods.intro}
            className="mb-10 md:mb-14"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            <a
              href={links.whatsapp(contact.methods.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Message us on WhatsApp at ${shop.phoneDisplay}`}
              className="group brick shadow-brick bg-yellow p-5 md:p-6 min-h-40 md:min-h-56 flex flex-col justify-between transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <WhatsappLogo weight="fill" size={30} className="text-ink" />
                <ArrowUpRight
                  weight="bold"
                  size={18}
                  className="text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
                  Primary
                </div>
                <div className="mt-1 font-display font-extrabold tracking-[-0.02em] text-xl md:text-2xl leading-tight text-ink">
                  WhatsApp
                </div>
                <div className="mt-1 font-mono text-xs md:text-sm text-ink break-all">
                  {shop.phoneDisplay}
                </div>
              </div>
            </a>

            <a
              href={links.call}
              aria-label={`Call ${shop.phoneDisplay}`}
              className="group brick shadow-brick bg-paper p-5 md:p-6 min-h-40 md:min-h-56 flex flex-col justify-between transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <Phone weight="fill" size={30} className="text-ink" />
                <ArrowUpRight
                  weight="bold"
                  size={18}
                  className="text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  Tap to dial
                </div>
                <div className="mt-1 font-display font-extrabold tracking-[-0.02em] text-xl md:text-2xl leading-tight text-ink">
                  Call
                </div>
                <div className="mt-1 font-mono text-xs md:text-sm text-ink-2 break-all">
                  {shop.phoneDisplay}
                </div>
              </div>
            </a>

            <a
              href={links.email}
              aria-label={`Email us at ${shop.email}`}
              className="group brick shadow-brick bg-paper p-5 md:p-6 min-h-40 md:min-h-56 flex flex-col justify-between transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <EnvelopeSimple weight="fill" size={30} className="text-ink" />
                <ArrowUpRight
                  weight="bold"
                  size={18}
                  className="text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  Slower, but works
                </div>
                <div className="mt-1 font-display font-extrabold tracking-[-0.02em] text-xl md:text-2xl leading-tight text-ink">
                  Email
                </div>
                <div className="mt-1 font-mono text-xs md:text-sm text-ink-2 break-all">
                  {shop.email}
                </div>
              </div>
            </a>

            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram · ${shop.handle}`}
              className="group brick shadow-brick bg-paper p-5 md:p-6 min-h-40 md:min-h-56 flex flex-col justify-between transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <InstagramLogo weight="fill" size={30} className="text-ink" />
                <ArrowUpRight
                  weight="bold"
                  size={18}
                  className="text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  {shop.followersShort} followers
                </div>
                <div className="mt-1 font-display font-extrabold tracking-[-0.02em] text-xl md:text-2xl leading-tight text-ink">
                  Instagram
                </div>
                <div className="mt-1 font-mono text-xs md:text-sm text-ink-2 break-all">
                  {shop.handle}
                </div>
              </div>
            </a>

            <a
              href={links.directions}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions on Google Maps"
              className="group brick shadow-brick bg-paper p-5 md:p-6 min-h-40 md:min-h-56 flex flex-col justify-between transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <MapPinLine weight="fill" size={30} className="text-ink" />
                <ArrowUpRight
                  weight="bold"
                  size={18}
                  className="text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  Google Maps
                </div>
                <div className="mt-1 font-display font-extrabold tracking-[-0.02em] text-xl md:text-2xl leading-tight text-ink">
                  Directions
                </div>
                <div className="mt-1 font-mono text-xs md:text-sm text-ink-2 leading-snug">
                  Ekta Chowk, MR4
                </div>
              </div>
            </a>
          </div>

          <div className="mt-6 md:mt-8 brick-ink p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
            <Clock weight="fill" size={22} className="text-yellow shrink-0" />
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-yellow">
              Hours
            </div>
            <div className="md:ml-2 font-display font-bold text-lg md:text-xl leading-tight">
              {shop.hours}
            </div>
            <div className="md:ml-auto font-mono text-xs md:text-sm text-paper/85 uppercase tracking-widest">
              {shop.daysOpen} · No off-days
            </div>
          </div>
        </div>
      </section>

      <VisitShop />

      {/* 4. Closing CTA */}
      <section id="contact-cta" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="lg:col-span-8">
              <SectionHeader
                top={contact.closing.headlineTop}
                tail={contact.closing.headlineTail}
                size="hero"
                align="stack"
              />
              <p className="mt-6 md:mt-8 max-w-[52ch] text-ink-2 md:text-lg">
                {contact.closing.sub}
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
                href={links.whatsapp(contact.closing.waMessage)}
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
