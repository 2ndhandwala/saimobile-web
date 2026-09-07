import type { Metadata } from "next";
import Image from "next/image";
import {
  WhatsappLogo,
  MapPinLine,
  ArrowUpRight,
  InstagramLogo,
} from "@phosphor-icons/react/dist/ssr";
import { StatBar } from "@/components/site/StatBar";
import { ReelGrid } from "@/components/site/ReelGrid";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Sticker } from "@/components/ui/Sticker";
import { about, links, reelPermalinks, shop } from "@/content";
import { BREADCRUMBS, BreadcrumbListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About the Ekta Chowk shop",
  description:
    "The Ekta Chowk shop Jabalpur follows. 200K+ on Instagram, 50,000+ phones sold, over a decade at the counter.",
  path: "/about",
  type: "article",
});

export default function AboutPage() {
  return (
    <main>
      <BreadcrumbListJsonLd items={BREADCRUMBS.about} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-10 md:pt-16 pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-9">
              <SectionHeader
                as="h1"
                size="hero"
                eyebrow={about.hero.eyebrow}
                top={about.hero.headlineTop}
                tail={about.hero.headlineTail}
                align="stack"
              />
              <p className="mt-6 md:mt-8 max-w-[52ch] font-sans text-base md:text-lg text-ink-2">
                {about.hero.sub}
              </p>
            </div>

            <div className="lg:col-span-3 flex flex-row lg:flex-col flex-wrap items-start lg:items-end gap-3 mt-4 lg:mt-16">
              <Sticker tilt={4} tone="ink">
                {shop.yearsRunning} years in Jabalpur
              </Sticker>
              <Sticker tilt={-3} tone="yellow">
                {shop.followers} on Instagram
              </Sticker>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="bg-paper border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <SectionHeader
            eyebrow={about.journey.eyebrow}
            top={about.journey.headlineTop}
            tail={about.journey.headlineTail}
            intro={about.journey.intro}
            className="mb-10 md:mb-14"
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {about.journey.milestones.map((m) => (
              <li key={m.n} className="brick p-5 md:p-6 flex flex-col gap-2">
                <span className="font-mono text-xs md:text-sm text-muted">
                  {m.n}
                </span>
                <span className="font-display font-bold text-lg md:text-xl leading-tight text-ink">
                  {m.label}
                </span>
                <span className="text-sm md:text-base text-ink-2 leading-snug">
                  {m.note}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="relative max-w-[520px] mx-auto lg:mx-0">
                <div className="relative aspect-[4/5] w-full brick shadow-brick overflow-hidden bg-paper">
                  <Image
                    src={about.founder.photo}
                    alt={about.founder.photoAlt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>

              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                {about.founder.eyebrow}
              </span>
              <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.9] text-4xl md:text-6xl">
                {about.founder.name}
              </h2>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                {about.founder.role}
              </div>
              <div className="mt-6 md:mt-8 flex flex-col gap-4 max-w-[62ch]">
                {about.founder.body.map((p, i) => (
                  <p key={i} className="text-ink-2 md:text-lg leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="bg-paper border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end mb-10 md:mb-14">
            <div className="lg:col-span-8">
              <SectionHeader
                eyebrow={about.instagram.eyebrow}
                top={about.instagram.headlineTop}
                tail={about.instagram.headlineTail}
                align="stack"
              />
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
              <Sticker tone="ink" tilt={-3}>
                {shop.followers} on Instagram
              </Sticker>
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-yellow"
              >
                <InstagramLogo weight="fill" size={18} />
                Follow {shop.handle}
                <ArrowUpRight weight="bold" size={16} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-14">
            {about.instagram.body.map((p, i) => (
              <p key={i} className="text-ink-2 md:text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <ReelGrid permalinks={reelPermalinks} />
        </div>
      </section>

      <StatBar />

      {/* Closing CTA */}
      <section id="visit-cta" className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="lg:col-span-8">
              <SectionHeader
                top={about.closing.headlineTop}
                tail={about.closing.headlineTail}
                size="hero"
                align="stack"
              />
              <p className="mt-6 md:mt-8 max-w-[52ch] text-ink-2 md:text-lg">
                {about.closing.sub}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap lg:flex-col gap-3 lg:items-end">
              <a
                href={links.whatsapp(about.closing.waMessage)}
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
