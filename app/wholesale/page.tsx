import type { Metadata } from "next";
import Link from "next/link";
import {
  Storefront,
  Handshake,
  Package,
  Truck,
  Phone,
  WhatsappLogo,
  ArrowUpRight,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { Sticker } from "@/components/ui/Sticker";
import { WholesaleForm } from "./WholesaleForm";
import { links, shop } from "@/content";
import { BREADCRUMBS, BreadcrumbListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Wholesale · dealer pricing, Jabalpur",
  description:
    "Bulk phones for dealers and resellers. Second-hand and new inventory at dealer pricing, out of Jabalpur.",
  path: "/wholesale",
});

// PLACEHOLDER: replace with actual bulk categories once the owner confirms.
const supplyCategories: { label: string; note: string }[] = [
  { label: "Used iPhones", note: "Graded, tested, boxed" },
  { label: "Used Android flagships", note: "Samsung, OnePlus, Pixel" },
  { label: "Used mid-range", note: "Redmi, Vivo, Oppo, Realme" },
  { label: "New sealed stock", note: "Latest launches, on request" },
];

const pillars = [
  {
    icon: Package,
    title: "Consistent inventory",
    body: "Fresh stock rolling in weekly: used phones through trade-ins, new phones through brand channels.",
  },
  {
    icon: Handshake,
    title: "Dealer pricing",
    body: "Rates negotiated per lot. The bigger and more repeatable your order, the sharper the number.",
  },
  {
    icon: Storefront,
    title: `${shop.yearsRunning} years in the market`,
    body: `${shop.phonesSold} phones sold from the counter at Ekta Chowk. Real invoices, real numbers.`,
  },
  {
    icon: Truck,
    title: "Pickup or delivery",
    body: "Pick up at the shop, or we arrange courier / transport across MP and beyond, on you.",
  },
];

export default function WholesalePage() {
  return (
    <main>
      <BreadcrumbListJsonLd items={BREADCRUMBS.wholesale} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-10 md:pt-16 pb-10 md:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] text-muted">
                  Wholesale · dealer sourcing · Jabalpur
                </span>
              </div>

              <h1 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-ink text-[42px] xs:text-[50px] sm:text-6xl md:text-7xl lg:text-[80px]">
                Bulk phones.{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Dealer pricing.</span>
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 bottom-1 md:bottom-2 h-3 md:h-4 bg-yellow -z-0 -rotate-1"
                  />
                </span>
                <br />
                Straight out of Jabalpur.
              </h1>

              <p className="mt-6 md:mt-8 max-w-[58ch] font-sans text-base md:text-lg text-ink-2">
                We supply second-hand and new phones in bulk to shops and
                resellers across Madhya Pradesh. {shop.yearsRunning} years
                at the counter,{" "}
                <strong className="text-ink">{shop.phonesSold}</strong>{" "}
                handsets sold, and a supply chain that keeps stock moving,
                every week, every month.
              </p>

              <div className="mt-6 brick-ink p-4 md:p-5 flex items-start gap-3 max-w-[58ch]">
                <Warning weight="fill" size={20} className="text-yellow shrink-0 mt-0.5" />
                <p className="text-sm md:text-[15px] text-paper leading-snug">
                  This page is for{" "}
                  <strong className="text-yellow">
                    other shop owners and resellers
                  </strong>{" "}
                  sourcing inventory. Buying a single phone for yourself?{" "}
                  <Link
                    href="/"
                    className="underline underline-offset-4 hover:text-yellow"
                  >
                    Head to the retail site
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-row lg:flex-col flex-wrap items-start lg:items-end gap-3 mt-4 lg:mt-16">
              <Sticker tilt={-4} tone="yellow" className="text-base md:text-lg px-4 py-2">
                Trade-ready lots
              </Sticker>
              <Sticker tilt={3} tone="ink" className="text-base md:text-lg px-4 py-2">
                GST invoice · IMEI list
              </Sticker>
              <Sticker tilt={-2} tone="paper" className="text-base md:text-lg px-4 py-2">
                Serving MP · pan-India on request
              </Sticker>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-paper border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Why source from us
              </span>
              <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.9] text-3xl md:text-5xl">
                Built for shops that resell.
              </h2>
            </div>
            <p className="text-ink-2 md:text-lg max-w-md">
              Same 20-point check we run for the retail counter runs on every
              wholesale lot. Nothing goes out untested.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {pillars.map((p) => (
              <li key={p.title} className="brick p-5 flex flex-col gap-3">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-ink text-yellow">
                  <p.icon weight="fill" size={20} />
                </span>
                <span className="font-display font-bold text-lg leading-tight text-ink">
                  {p.title}
                </span>
                <span className="text-sm text-ink-2 leading-snug">
                  {p.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we supply */}
      <section className="bg-paper-2 border-b-2 border-ink">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                What we supply
              </span>
              <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.9] text-3xl md:text-5xl">
                Broadly, this is what moves.
              </h2>
            </div>
            <p className="text-ink-2 md:text-base max-w-sm">
              Specific models and grades change week to week. Tell us what
              you need in the form and we&apos;ll come back with what&apos;s
              on the floor.
            </p>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {supplyCategories.map((c) => (
              <li key={c.label} className="brick p-5 flex flex-col gap-2">
                <span className="font-display font-bold text-base md:text-lg text-ink leading-tight">
                  {c.label}
                </span>
                <span className="text-xs md:text-sm text-muted font-mono uppercase tracking-widest">
                  {c.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form */}
      <section id="inquiry" className="bg-paper border-b-2 border-ink scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Send an enquiry
              </span>
              <h2 className="mt-3 font-display font-extrabold tracking-[-0.03em] leading-[0.9] text-3xl md:text-5xl">
                Tell us{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">what you need.</span>
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 bottom-1 h-3 bg-yellow -z-0 -rotate-1"
                  />
                </span>
              </h2>
              <p className="mt-5 text-ink-2 max-w-sm">
                A few fields on your business, what you&apos;re sourcing,
                and how often. The more detail up front, the faster we can
                come back with a lot, pricing, and delivery.
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-ink-2">
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-ink text-yellow text-[11px] font-mono shrink-0">
                    1
                  </span>
                  You submit the form or WhatsApp us.
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-ink text-yellow text-[11px] font-mono shrink-0">
                    2
                  </span>
                  We come back with what&apos;s on the floor + a price.
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-ink text-yellow text-[11px] font-mono shrink-0">
                    3
                  </span>
                  You confirm, we invoice, we hand over or ship.
                </li>
              </ul>
              <div className="mt-6 hidden lg:flex flex-col gap-3">
                <Link
                  href={links.whatsapp(
                    "Hi, I'm interested in bulk sourcing from 2nd Hand Wala.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost self-start text-sm"
                >
                  <WhatsappLogo weight="fill" size={16} />
                  WhatsApp instead
                  <ArrowUpRight weight="bold" size={14} />
                </Link>
                <a
                  href={links.call}
                  className="inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.22em] text-ink link-underline"
                >
                  <Phone weight="bold" size={14} />
                  Call {shop.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="lg:col-span-8">
              <WholesaleForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
